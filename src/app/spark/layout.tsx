import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProgressProvider } from "@/shared/progress";
import { LanguageProvider } from "@/spark/lib/i18n";
import TopBar from "@/spark/components/TopBar";
import SiteFooter from "@/spark/components/SiteFooter";

export const metadata: Metadata = {
  title: "Spark Academy — Learn Electrical Engineering by Building",
  description:
    "An interactive course from the physics of charge to a real 555-timer circuit blinking on your desk. Theory, simulations and quizzes in every lesson.",
};

export default function SparkLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-spark">
      <LanguageProvider>
        <ProgressProvider course="spark">
          <TopBar />
          <main>{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </LanguageProvider>
    </div>
  );
}
