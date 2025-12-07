/**
 * Çalışma saatleri kontrolü
 */

export type WorkingHours = {
  [key: string]: {
    open: string; // "09:00"
    close: string; // "19:00"
  } | null;
};

const DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"] as const;
type DayKey = (typeof DAYS)[number];

/**
 * Bugünün gün adını küçük harfle döndürür (mon, tue, ...)
 */
export function getTodayDayKey(): DayKey {
  const day = new Date().getDay();
  // JavaScript: 0 = Pazar, 1 = Pazartesi, ...
  // Bizim sistem: mon = Pazartesi
  const mapping: DayKey[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return mapping[day];
}

/**
 * İşletme şu an açık mı kontrol eder
 */
export function isBusinessOpenNow(workingHours: WorkingHours | null): boolean {
  if (!workingHours) return false;

  const today = getTodayDayKey();
  const todayHours = workingHours[today];

  if (!todayHours) return false;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return currentTime >= todayHours.open && currentTime <= todayHours.close;
}

/**
 * Mesai saati bitmiş mi kontrol eder
 */
export function isWorkingHoursEnded(
  workingHours: WorkingHours | null,
): boolean {
  if (!workingHours) return false;

  const today = getTodayDayKey();
  const todayHours = workingHours[today];

  if (!todayHours) return false;

  const now = new Date();
  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

  return currentTime > todayHours.close;
}
