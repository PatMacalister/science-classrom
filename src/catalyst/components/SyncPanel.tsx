"use client";

import { useRef, useState } from "react";
import { useT } from "@/catalyst/lib/i18n";
import { useProgress } from "@/shared/progress";

export default function SyncPanel() {
  const progress = useProgress();
  const t = useT();
  const [linkCode, setLinkCode] = useState("");
  const [message, setMessage] = useState<{ text: string; error?: boolean } | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const say = (text: string, error = false) => setMessage({ text, error });

  const onEnable = async () => {
    setBusy(true);
    try {
      await progress.enableSync();
      say(t("syncEnabled"));
    } catch {
      say(t("syncFailed"), true);
    } finally {
      setBusy(false);
    }
  };

  const onLink = async () => {
    if (!linkCode.trim()) return;
    setBusy(true);
    try {
      await progress.linkWithCode(linkCode);
      setLinkCode("");
      say(t("syncLinked"));
    } catch (err) {
      say(err instanceof Error ? err.message : t("syncLinkFailed"), true);
    } finally {
      setBusy(false);
    }
  };

  const onImportFile = async (file: File) => {
    try {
      progress.importJson(await file.text());
      say(t("syncImported"));
    } catch {
      say(t("syncBadFile"), true);
    }
  };

  const copyCode = async () => {
    if (!progress.syncCode) return;
    try {
      await navigator.clipboard.writeText(progress.syncCode);
      say(t("syncCopied"));
    } catch {
      say(t("syncCopyFailed"), true);
    }
  };

  const statusLabel =
    progress.syncStatus === "off"
      ? t("syncBrowserOnly")
      : progress.syncStatus === "syncing"
        ? t("syncSyncing")
        : progress.syncStatus === "synced"
          ? t("syncSynced")
          : t("syncError");

  return (
    <section className="sync-card">
      <div className="sync-head">
        <h3>{t("syncHead")}</h3>
        <span className={`sync-status ${progress.syncStatus}`}>{statusLabel}</span>
      </div>

      {progress.syncCode ? (
        <div className="sync-row">
          <span className="sync-label">{t("syncCodeLabel")}</span>
          <code className="sync-code" onClick={copyCode}>
            {progress.syncCode}
          </code>
          <button type="button" className="btn secondary small" onClick={copyCode}>
            {t("syncCopy")}
          </button>
          <button type="button" className="btn secondary small" onClick={() => progress.disableSync()}>
            {t("syncUnlink")}
          </button>
        </div>
      ) : (
        <div className="sync-row">
          <span className="sync-label">{t("syncAcross")}</span>
          <button type="button" className="btn small" onClick={onEnable} disabled={busy}>
            {t("syncEnable")}
          </button>
          <input
            className="sync-input"
            placeholder={t("syncEnterCode")}
            value={linkCode}
            onChange={(e) => setLinkCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onLink()}
          />
          <button type="button" className="btn secondary small" onClick={onLink} disabled={busy || !linkCode.trim()}>
            {t("syncLink")}
          </button>
        </div>
      )}

      <div className="sync-row">
        <span className="sync-label">{t("syncBackupFile")}</span>
        <button type="button" className="btn secondary small" onClick={() => progress.exportJson()}>
          {t("syncExport")}
        </button>
        <button type="button" className="btn secondary small" onClick={() => fileRef.current?.click()}>
          {t("syncImport")}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          style={{ display: "none" }}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) onImportFile(f);
            e.target.value = "";
          }}
        />
      </div>

      {message ? (
        <p className={`sync-msg${message.error ? " error" : ""}`}>{message.text}</p>
      ) : (
        <p className="sync-msg muted">{t("syncFootnote")}</p>
      )}
    </section>
  );
}
