import type { UnitModule } from "./types";
import { ScopeTwinLab } from "@/spark/components/labs/labs-unit16";

export const LIVE_CODE = `from machine import ADC
from time import sleep_ms

probe = ADC(26)

# LIVE MODE - open Thonny's View > Plotter and watch
while True:
    v = probe.read_u16() * 3.3 / 65535
    print(v * 3.128)      # undo the 100k/47k divider (which divides by 3.13)
    sleep_ms(2)           # ~400 samples per second`;

export const BURST_CODE = `from machine import ADC
from time import ticks_us, ticks_diff

probe = ADC(26)

def capture(n=2000):
    buf = bytearray(2 * n)
    t0 = ticks_us()
    for i in range(n):                 # tight loop: tens of kS/s
        x = probe.read_u16()
        buf[2*i] = x & 0xFF
        buf[2*i + 1] = x >> 8
    us = ticks_diff(ticks_us(), t0) / n
    print("# sample interval:", us, "us  ->  fs =", 1e6 / us, "Hz")
    for i in range(n):
        x = buf[2*i] | (buf[2*i + 1] << 8)
        print(x * 3.3 / 65535 * 3.128)

capture()`;

export const unit16: UnitModule = {
  unit: {
    id: "u16",
    num: 16,
    title: "The Master Capstone",
    blurb:
      "For 33 lessons you watched simulated oscilloscopes. Now build the real instrument — and point it at everything you've made.",
    track: "master",
  },
  lessons: [
    {
      slug: "oscilloscope",
      unitId: "u16",
      title: "Build Your Own Oscilloscope",
      subtitle:
        "A Pico, a divider probe and two short programs turn into a working scope — then your blinker, your dimmer and your night-light become its first test subjects.",
      buildsOn: ["night-light", "sampling", "voltage-divider", "debugging"],
      Theory: () => (
        <>
          <h2>The mission</h2>
          <p>
            Every lab in this course drew an oscilloscope trace for you. This build closes the
            loop on the entire curriculum: you will make a real sampling oscilloscope from your
            Pico, use it to <em>measure</em> the RC charging curve, the blinker&rsquo;s
            3-to-6-volt sawtooth and the dimmer&rsquo;s PWM — and compare physics against
            everything the simulators promised. An instrument you built, verifying circuits you
            built, using theory you own. That is what mastery looks like.
          </p>
          <p>
            Everything needed is already on your desk: the Pico&rsquo;s ADC (11.2) is the
            sampler, Nyquist (13.1) sets its honest limits, a voltage divider (2.2!) becomes
            the probe, and Thonny&rsquo;s built-in plotter is the screen. New parts required:{" "}
            <strong>none</strong> — two resistors from your kit build the probe.
          </p>

          <h2>The probe: a divider with a job title</h2>
          <p>
            Your circuits under test run at 9 V; the Pico&rsquo;s ADC dies above ~3.6 V. The
            fix is the very first trick this course taught you — a <strong>3:1 voltage
            divider</strong>: 100 kΩ from the probe tip to GP26, 47 kΩ from GP26 to ground
            (÷3.13; software multiplies back). Real 10:1 scope probes are exactly this idea
            with fancier tolerances. Two fine points, both old friends:
          </p>
          <ul>
            <li>
              <strong>Loading (2.2's trap):</strong> the probe's ~150 kΩ hangs on whatever you
              touch. On the 555's <em>output</em> pin — a stiff, low-impedance source — it's
              invisible. Directly on the high-impedance cap node it would gently distort the
              timing. Probe outputs by preference; probe delicate nodes knowingly.
            </li>
            <li>
              <strong>Common ground:</strong> voltage is between two points (0.2's oldest
              lesson). The Pico's GND and the blinker's − rail must be wired together, or your
              readings are fiction.
            </li>
          </ul>
          <div className="formula">
            probe tip → 100 kΩ → GP26 → 47 kΩ → GND · reading × 3.13 in software
            <span className="note">never probe mains or anything not battery/USB powered — this scope is for your own low-voltage bench</span>
          </div>

          <h2>Two firmwares, one instrument</h2>
          <p>
            <strong>Live mode</strong> streams readings for Thonny&rsquo;s plotter (View →
            Plotter) — a few hundred samples per second, perfect for the slow beauties: RC
            curves, blinker sawtooth, the night-light&rsquo;s dusk.
          </p>
          <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "14px 18px", overflowX: "auto", fontSize: "0.86rem", lineHeight: 1.6 }}>
            <code>{LIVE_CODE}</code>
          </pre>
          <p>
            <strong>Burst mode</strong> samples flat-out into memory first (tens of thousands
            of samples per second — MicroPython&rsquo;s honest limit), then prints the capture:
            enough to resolve your 1.4 kHz PWM cleanly. It even measures its own sample rate,
            because an instrument that doesn&rsquo;t know its own f<sub>s</sub> can&rsquo;t
            warn you about Nyquist.
          </p>
          <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "14px 18px", overflowX: "auto", fontSize: "0.86rem", lineHeight: 1.6 }}>
            <code>{BURST_CODE}</code>
          </pre>

          <h2>The measurement campaign</h2>
          <table>
            <thead>
              <tr><th>Target</th><th>Probe point</th><th>You should see</th><th>Closes the loop on</th></tr>
            </thead>
            <tbody>
              <tr><td>RC charge: 10 µF via 100 kΩ to 9 V</td><td>capacitor top</td><td>the exponential; 63% at τ ≈ 1 s</td><td>Lesson 2.3</td></tr>
              <tr><td>555 blinker</td><td>pin 3 (output)</td><td>square, ~1.5 Hz — measure it against f = 1.44/((R1+2R2)C)</td><td>Lessons 3.3 & 4.1</td></tr>
              <tr><td>555 blinker</td><td>pins 2+6 (gently!)</td><td>the sawtooth between ⅓ and ⅔ of 9 V</td><td>the simulator's signature trace</td></tr>
              <tr><td>PWM dimmer</td><td>pin 3, burst mode</td><td>duty following the knob at ~1.4 kHz</td><td>Unit 8 & Nyquist (13.1)</td></tr>
              <tr><td>Night-light at dusk</td><td>GP26 divider node</td><td>the slow slide your twin predicted</td><td>Unit 12</td></tr>
            </tbody>
          </table>

          <h3>If it misbehaves</h3>
          <table>
            <thead>
              <tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
            </thead>
            <tbody>
              <tr><td>Readings pinned at 3.3 V</td><td>probing 9 V without the divider — the input was overdriven</td><td>build the 100k/47k probe, then check the pin still reads sensibly (above ~3.6 V you may have damaged it)</td></tr>
              <tr><td>Readings are noise/garbage</td><td>no common ground</td><td>jumper Pico GND to the target's − rail</td></tr>
              <tr><td>PWM looks like a slow wave</td><td>aliasing in live mode</td><td>that's Lesson 13.1 in the wild! use burst mode</td></tr>
              <tr><td>Sawtooth timing looks stretched</td><td>probe loading the cap node</td><td>expected (2.2!) — measure frequency at pin 3 instead</td></tr>
              <tr><td>Plotter shows nothing</td><td>plotter window closed / prints too fast</td><td>View → Plotter in Thonny; keep the sleep_ms in live mode</td></tr>
            </tbody>
          </table>

          <h2>Graduation</h2>
          <p>
            Look at the bench: a blinker designed with RC arithmetic, a dimmer steered with
            diodes, a night-light running your firmware, and now a measuring instrument that
            audits them all — every one built from parts you understand down to the drifting
            electron. There is no fifth tier — the ladder ends here, on purpose. What remains
            are the <strong>specializations</strong>: parallel branches, in any order, into
            CPUs, the radio spectrum, and robots. Pick whichever pulls hardest — you are fully
            equipped to debug the gap between the idea and the working thing. That gap has a
            name. It&rsquo;s called engineering. Welcome to it. ⚡
          </p>
        </>
      ),
      lab: {
        title: "Digital Twin & Live Mode",
        intro: (
          <>
            <p>
              Two modes. <strong>Digital twin</strong>: rehearse every measurement in
              simulation. <strong>LIVE</strong>: this very page becomes your
              oscilloscope&rsquo;s display — in Chrome/Edge it connects straight to the Pico
              over USB (Web Serial) and plots the real voltages your firmware streams. Flash
              the live firmware above, close Thonny (only one program can hold the port), hit
              Connect, and watch actual electrons from your breadboard draw the curves this
              course has been simulating for 53 lessons. No hardware yet? The demo stream
              fakes a blinker so you can learn the display first.
            </p>
            <ul>
              <li>Probe the PWM at 1 kHz: a phantom 400 Hz wave (1.4 kHz, folded — Lesson 13.1). At 200 Hz the samples flatline, because 1 400 is an exact multiple of 200. Only the fastest rate tells the truth.</li>
              <li>Switch to a direct wire on a 9 V target and watch the trace clip at 3.3 V.</li>
              <li>Sawtooth at 1 kHz with the divider probe: the textbook capture. Do this one for real first.</li>
            </ul>
          </>
        ),
        Component: ScopeTwinLab,
      },
      checklist: [
        { id: "probe", text: "Built the 3:1 probe: 100 kΩ from probe tip to GP26, 47 kΩ from GP26 to GND" },
        { id: "ground", text: "Wired Pico GND to the target circuit's − rail (common ground — no exceptions)" },
        { id: "live", text: "Live mode running — in Thonny's Plotter or right on this page via Connect (Chrome) — wiggled a finger on the probe and saw it" },
        { id: "rc", text: "Captured a real RC charging curve and eyeballed 63% at t ≈ τ" },
        { id: "blinker-out", text: "Probed the blinker's pin 3: measured its frequency and checked it against the 555 formula" },
        { id: "sawtooth", text: "Probed pins 2+6 and saw the ⅓→⅔ sawtooth — the course's signature trace, in real electrons" },
        { id: "loading", text: "Noticed (and explained!) the slight timing stretch the probe causes on the cap node" },
        { id: "burst", text: "Ran burst mode; noted the fs it reported for your Pico" },
        { id: "pwm", text: "Captured the PWM dimmer at full speed: duty follows the knob" },
        { id: "alias", text: "Deliberately under-sampled the PWM in live mode and identified the alias by name" },
        { id: "dusk", text: "Recorded the night-light's dusk transition — your firmware, audited by your instrument" },
        { id: "graduate", text: "Looked at the bench: four builds, all yours, all understood. Course complete. ⚡🎓" },
      ],
    },
  ],
};
