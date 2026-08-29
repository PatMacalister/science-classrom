import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProgressProvider } from "@/shared/progress";
import { LanguageProvider } from "@/helix/lib/i18n";
import TopBar from "@/helix/components/TopBar";
import SiteFooter from "@/helix/components/SiteFooter";

export const metadata: Metadata = {
  title: "Helix Academy — Learn Biology by Looking Closer",
  description:
    "An interactive course from a single cell to whole ecosystems: membranes, enzymes, DNA, heredity, evolution and ecology. Theory, simulations and quizzes in every lesson — plus the genetic code with a memory hook for every amino acid.",
};

export default function HelixLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-helix">
      <LanguageProvider>
        <ProgressProvider course="helix">
          <TopBar />
          <main>{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </LanguageProvider>
    </div>
  );
}
