-- ============================================
-- LEAD QUALITY SCORE FIX - RLS Hata Toleransı
-- ============================================
-- Bu migration, lead_quality_scores tablosuna yazılamasa bile
-- ilan oluşturma işleminin devam etmesini sağlar
-- ============================================

-- ============================================
-- 1. update_lead_quality_score FONKSİYONUNU GÜNCELLE
-- ============================================
CREATE OR REPLACE FUNCTION update_lead_quality_score(
  p_listing_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_score DECIMAL;
  v_description_quality DECIMAL;
  v_category_match DECIMAL;
  v_location_quality DECIMAL;
  v_urgency_score DECIMAL;
  v_budget_score DECIMAL;
BEGIN
  -- Skoru hesapla
  v_score := calculate_lead_quality_score(p_listing_id);

  -- Detaylı skorları hesapla (basitleştirilmiş)
  SELECT 
    CASE 
      WHEN LENGTH(COALESCE(description, '')) >= 200 THEN 30
      WHEN LENGTH(COALESCE(description, '')) >= 100 THEN 20
      WHEN LENGTH(COALESCE(description, '')) >= 50 THEN 10
      ELSE 0
    END,
    CASE WHEN service_category_id IS NOT NULL THEN 20 ELSE 0 END,
    CASE WHEN address IS NOT NULL AND LENGTH(address) > 0 THEN 20 ELSE 0 END,
    CASE 
      WHEN priority = 'acil' THEN 15
      WHEN priority = 'normal' THEN 10
      ELSE 5
    END,
    CASE WHEN price_range IS NOT NULL AND LENGTH(price_range) > 0 THEN 15 ELSE 0 END
  INTO v_description_quality, v_category_match, v_location_quality, v_urgency_score, v_budget_score
  FROM listings
  WHERE id = p_listing_id;

  -- listings tablosundaki quality_score'u güncelle (bu kritik, her zaman yapılmalı)
  UPDATE listings
  SET quality_score = v_score
  WHERE id = p_listing_id;

  -- lead_quality_scores tablosuna kaydet (opsiyonel - RLS hatası olsa bile devam et)
  -- NOT: Bu tablo opsiyonel, RLS hatası olsa bile ilan oluşturma işlemi başarılı sayılır
  BEGIN
    INSERT INTO lead_quality_scores (
      listing_id,
      overall_score,
      description_quality_score,
      category_match_score,
      location_quality_score,
      urgency_score,
      budget_indication_score,
      calculated_at,
      updated_at
    ) VALUES (
      p_listing_id,
      v_score,
      v_description_quality,
      v_category_match,
      v_location_quality,
      v_urgency_score,
      v_budget_score,
      NOW(),
      NOW()
    )
    ON CONFLICT (listing_id) DO UPDATE
    SET overall_score = v_score,
        description_quality_score = v_description_quality,
        category_match_score = v_category_match,
        location_quality_score = v_location_quality,
        urgency_score = v_urgency_score,
        budget_indication_score = v_budget_score,
        updated_at = NOW();
  EXCEPTION
    WHEN OTHERS THEN
      -- RLS veya başka bir hata olsa bile sessizce devam et
      -- lead_quality_scores tablosu opsiyonel, ilan oluşturma işlemi başarılı sayılır
      -- Hata loglanabilir ama ana işlemi etkilemez
      RAISE WARNING 'lead_quality_scores insert hatası (RLS veya başka sebep): % - %', SQLSTATE, SQLERRM;
      -- Hata yutuldu, fonksiyon başarıyla tamamlanır
  END;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 2. trigger_calculate_lead_quality_score FONKSİYONUNU GÜNCELLE
-- ============================================
CREATE OR REPLACE FUNCTION trigger_calculate_lead_quality_score()
RETURNS TRIGGER AS $$
BEGIN
  -- İlan oluşturulduğunda veya güncellendiğinde skor hesapla
  -- NOT: update_lead_quality_score içinde hata yakalanıyor, burada da güvenlik için try-catch
  BEGIN
    PERFORM update_lead_quality_score(NEW.id);
  EXCEPTION
    WHEN OTHERS THEN
      -- Trigger hatası olsa bile ilan oluşturma işlemi başarılı sayılır (AFTER INSERT olduğu için)
      -- Hata loglanabilir ama ana işlemi etkilemez
      RAISE WARNING 'Trigger: lead_quality_score hesaplama hatası: % - %', SQLSTATE, SQLERRM;
      -- Hata yutuldu, trigger başarıyla tamamlanır
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

