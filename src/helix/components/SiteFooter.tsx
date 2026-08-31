"use client";

import { useT } from "@/helix/lib/i18n";

export default function SiteFooter() {
  const t = useT();
  return (
    <footer className="site-footer">
      <p>{t("footer")}</p>
    </footer>
  );
}
