"use client";

import { useMemo } from "react";
import qrcode from "qrcode-generator";

/**
 * Renders a value as a crisp SVG QR code (white quiet zone included).
 * Used by the sync panels: the QR encodes a link like
 *   https://…/<course>#sync=<code>
 * so scanning it on another device opens the course and links the sync code
 * automatically (the code rides in the hash — it never reaches server logs).
 */
export default function SyncQr({ value, caption }: { value: string; caption?: string }) {
  const { path, size } = useMemo(() => {
    const qr = qrcode(0, "M"); // auto version, medium error correction
    qr.addData(value);
    qr.make();
    const n = qr.getModuleCount();
    let d = "";
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        if (qr.isDark(row, col)) d += `M${col} ${row}h1v1h-1z`;
      }
    }
    return { path: d, size: n };
  }, [value]);

  return (
    <div className="sync-qr">
      <svg
        viewBox={`0 0 ${size + 8} ${size + 8}`}
        role="img"
        aria-label={value}
        shapeRendering="crispEdges"
      >
        <rect width={size + 8} height={size + 8} fill="#ffffff" rx="4" />
        <g transform="translate(4 4)">
          <path d={path} fill="#10151d" />
        </g>
      </svg>
      {caption ? <p className="sync-qr-caption">{caption}</p> : null}
    </div>
  );
}
