"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { getLesson } from "@/spark/lib/curriculum/registry";
import { useT } from "@/spark/lib/i18n";
import LessonView from "@/spark/components/LessonView";

export default function LessonPage() {
  const params = useParams<{ slug: string }>();
  const t = useT();
  const lesson = getLesson(params.slug);

  if (!lesson) {
    return (
      <div className="hero">
        <h1>{t("lessonNotFound")}</h1>
        <p className="lead">{t("lessonNotFoundBody")}</p>
        <Link className="btn" href="/spark">
          {t("backToCurriculum")}
        </Link>
      </div>
    );
  }
  return <LessonView key={lesson.slug} lesson={lesson} />;
}
