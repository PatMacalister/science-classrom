import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProgressProvider } from "@/shared/progress";
import { LanguageProvider } from "@/vector/lib/i18n";
import TopBar from "@/vector/components/TopBar";
import SiteFooter from "@/vector/components/SiteFooter";

export const metadata: Metadata = {
  title: "Vector Academy — Learn Physics by Watching Things Fall",
  description:
    "An interactive course from a rolling cart to the edge of the quantum world: motion, forces, energy, waves, light and heat. Theory, simulations and quizzes in every lesson — plus every SI unit, prefix and constant with a memory hook, and g measured by your own hand.",
};

export default function VectorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-vector">
      <LanguageProvider>
        <ProgressProvider course="vector">
          <TopBar />
          <main>{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </LanguageProvider>
    </div>
  );
}
