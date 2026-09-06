import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProgressProvider } from "@/shared/progress";
import { LanguageProvider } from "@/servo/lib/i18n";
import TopBar from "@/servo/components/TopBar";
import SiteFooter from "@/servo/components/SiteFooter";

export const metadata: Metadata = {
  title: "Servo Academy — Learn Robotics by Closing the Loop",
  description:
    "An interactive course from a blinking PWM signal to a robot that learns from your demonstrations: motors, sensors, control, kinematics and navigation. Theory, simulations and quizzes in every lesson — plus the whole parts bench with a memory hook for every component.",
};

export default function ServoLayout({ children }: { children: ReactNode }) {
  return (
    <div className="theme-servo">
      <LanguageProvider>
        <ProgressProvider course="servo">
          <TopBar />
          <main>{children}</main>
          <SiteFooter />
        </ProgressProvider>
      </LanguageProvider>
    </div>
  );
}
