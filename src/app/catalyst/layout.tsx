import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProgressProvider } from "@/shared/progress";
import { LanguageProvider } from "@/catalyst/lib/i18n";
import TopBar from "@/catalyst/components/TopBar";
import SiteFooter from "@/catalyst/components/SiteFooter";

export const metadata: Metadata = {
  title: "Catalyst Academy — Learn Chemistry by Experimenting",
  description:
    "An interactive course from the structure of the atom to real experiments on your kitchen table. Theory, simulations and quizzes in every lesson — plus all 118 elements with an Eselsbrücke for each symbol.",
};

export default function CatalystLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-catalyst">
      <LanguageProvider>
        <ProgressProvider course="catalyst">
          <TopBar />
          <main>{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </LanguageProvider>
    </div>
  );
}
