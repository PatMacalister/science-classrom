"use client";

import { useEffect } from "react";
import type { ChecklistItem } from "@/spark/lib/curriculum/types";
import { useT } from "@/spark/lib/i18n";
import { useProgress } from "@/shared/progress";

export default function Checklist({
  lessonSlug,
  items,
}: {
  lessonSlug: string;
  items: ChecklistItem[];
}) {
  const progress = useProgress();
  const t = useT();
  const doneCount = items.filter((it) => progress.getCheck(`${lessonSlug}:${it.id}`)).length;
  const allDone = doneCount === items.length;
  const complete = progress.isComplete(lessonSlug);

  useEffect(() => {
    if (progress.ready && allDone && !complete) progress.markComplete(lessonSlug);
  }, [progress, allDone, complete, lessonSlug]);

  return (
    <section className="quiz-section">
      <h2>{t("checklistHead", { done: doneCount, total: items.length })}</h2>
      <div className="checklist">
        {items.map((it) => {
          const key = `${lessonSlug}:${it.id}`;
          const checked = progress.getCheck(key);
          return (
            <label key={it.id} className={`check-item${checked ? " checked" : ""}`}>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => progress.setCheck(key, e.target.checked)}
              />
              <span className="check-text">{it.text}</span>
            </label>
          );
        })}
      </div>
      {allDone ? (
        <div className="complete-banner">
          <h3>{t("checklistDoneHead")}</h3>
          <p>{t("checklistDoneBody")}</p>
        </div>
      ) : null}
    </section>
  );
}
