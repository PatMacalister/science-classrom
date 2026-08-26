/**
 * Minimal Web Serial API declarations (Chrome/Edge). Only the surface the
 * app uses — enough for type-safe feature detection and streaming reads.
 */

interface SerialPortOpenOptions {
  baudRate: number;
}

interface SerialPort {
  readable: ReadableStream<Uint8Array> | null;
  open(options: SerialPortOpenOptions): Promise<void>;
  close(): Promise<void>;
}

interface Serial {
  requestPort(): Promise<SerialPort>;
}

interface Navigator {
  readonly serial?: Serial;
}
