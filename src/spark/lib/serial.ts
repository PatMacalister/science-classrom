"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/*
 * useSerialNumbers — connect to a serial device (the Pico running the Unit 16
 * live firmware) and stream the numbers it prints, one per line.
 *
 * Line protocol (matches the course firmwares exactly):
 *   - a line whose leading token parses as a float is a sample (volts)
 *   - lines starting with '#' (or anything unparsable) are passed through as
 *     status text — burst mode prints its measured sample rate this way
 *
 * PLACEHOLDER (hardware validation): built against that exact protocol and
 * exercised with a synthetic stream; the physical path (Pico → USB → Chrome
 * permission prompt → plot) still needs a real board. See PLACEHOLDERS.md.
 */

export type SerialStatus = "unsupported" | "idle" | "connecting" | "open" | "error";

export interface SerialSample {
  /** ms since the connection opened */
  t: number;
  v: number;
}

const MAX_SAMPLES = 4000;

export function useSerialNumbers() {
  const [status, setStatus] = useState<SerialStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [lastText, setLastText] = useState<string | null>(null);
  const [sampleRate, setSampleRate] = useState(0);

  const samplesRef = useRef<SerialSample[]>([]);
  const portRef = useRef<SerialPort | null>(null);
  const readerRef = useRef<ReadableStreamDefaultReader<Uint8Array> | null>(null);
  const closingRef = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time Web Serial feature detection at mount
    if (typeof navigator !== "undefined" && !navigator.serial) setStatus("unsupported");
  }, []);

  const disconnect = useCallback(async () => {
    closingRef.current = true;
    try {
      await readerRef.current?.cancel();
    } catch {}
    try {
      await portRef.current?.close();
    } catch {}
    readerRef.current = null;
    portRef.current = null;
    setStatus((s) => (s === "unsupported" ? s : "idle"));
  }, []);

  const connect = useCallback(async () => {
    if (!navigator.serial) {
      setStatus("unsupported");
      return;
    }
    setError(null);
    setStatus("connecting");
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 115200 }); // USB-CDC ignores baud; required anyway
      portRef.current = port;
      closingRef.current = false;
      samplesRef.current = [];
      setStatus("open");

      const t0 = performance.now();
      const decoder = new TextDecoder();
      let buf = "";
      let rateWindow: number[] = [];

      const reader = port.readable!.getReader();
      readerRef.current = reader;
      (async () => {
        try {
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            buf += decoder.decode(value, { stream: true });
            let nl;
            while ((nl = buf.indexOf("\n")) >= 0) {
              const line = buf.slice(0, nl).trim();
              buf = buf.slice(nl + 1);
              if (!line) continue;
              const v = Number.parseFloat(line);
              if (Number.isFinite(v) && !line.startsWith("#")) {
                const t = performance.now() - t0;
                samplesRef.current.push({ t, v });
                if (samplesRef.current.length > MAX_SAMPLES) samplesRef.current.shift();
                rateWindow.push(t);
                rateWindow = rateWindow.filter((x) => t - x < 2000);
                setSampleRate(rateWindow.length / 2);
              } else {
                setLastText(line.slice(0, 120));
              }
            }
          }
        } catch (err) {
          if (!closingRef.current) {
            setError(err instanceof Error ? err.message : "the connection dropped");
            setStatus("error");
          }
        } finally {
          try {
            reader.releaseLock();
          } catch {}
        }
      })();
    } catch (err) {
      // user dismissing the port picker is not an error state
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("No port selected")) {
        setStatus("idle");
      } else {
        setError(msg);
        setStatus("error");
      }
    }
  }, []);

  /** Drop the buffered samples (e.g. when switching to the demo stream). */
  const clearSamples = useCallback(() => {
    samplesRef.current = [];
  }, []);

  useEffect(() => () => void disconnect(), [disconnect]);

  return { status, error, lastText, sampleRate, samplesRef, connect, disconnect, clearSamples };
}
