"use client";

import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface RelatedQuestion {
  id: string;
  question: string;
  category: string;
}

interface RelatedQuestionsProps {
  currentCategory: string;
  currentQuestionId: string;
  allQuestions: Array<{
    id: string;
    question: string;
    category: string;
  }>;
}

export default function RelatedQuestions({
  currentCategory,
  currentQuestionId,
  allQuestions,
}: RelatedQuestionsProps) {
  // Aynı kategorideki diğer soruları bul (mevcut soru hariç)
  const related = allQuestions
    .filter((q) => q.category === currentCategory && q.id !== currentQuestionId)
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <Card className="mt-6 bg-gradient-to-br from-brand-50 to-white border-2 border-brand-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-brand-600" />
          <h3 className="font-semibold text-gray-900">İlgili Sorular</h3>
        </div>
        <div className="space-y-2">
          {related.map((item) => (
            <Link
              key={item.id}
              href={`/support/faq#${item.id}`}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white transition-colors group"
            >
              <span className="text-sm text-gray-700 group-hover:text-brand-600">
                {item.question}
              </span>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-brand-600" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

