import type { UnitModule } from "./types";
import { NightLightLab } from "@/spark/components/labs/labs-unit12";

export const CODE = `from machine import Pin, ADC, PWM
from time import sleep_ms

ldr = ADC(26)            # light sensor divider  -> GP26
knob = ADC(27)           # threshold potentiometer -> GP27
led = PWM(Pin(15))       # night-light LED       -> GP15
led.freq(1000)           # 1 kHz: your Unit 8 dimmer, in code

HYST = 3000              # Lesson 6.1: no chatter at dusk

lamp_on = False
while True:
    light = ldr.read_u16()        # 0 (dark) .. 65535 (bright)
    threshold = knob.read_u16()   # set by the knob

    if light < threshold - HYST:  # definitely dark
        lamp_on = True
    if light > threshold + HYST:  # definitely bright
        lamp_on = False

    if lamp_on:
        darkness = max(0.0, min(1.0, (threshold - light) / 20000))
        led.duty_u16(int(20000 + 45535 * darkness))
    else:
        led.duty_u16(0)

    sleep_ms(50)                  # 20 decisions per second`;

export const unit12: UnitModule = {
  unit: {
    id: "u12",
    num: 12,
    title: "The Expert Capstone",
    blurb:
      "Cross the last threshold: wire sensors to a $5 computer and write the firmware yourself. An automatic night-light — and your entry into the programmable world.",
    track: "expert",
  },
  lessons: [
    {
      slug: "night-light",
      unitId: "u12",
      title: "Program the Night-Light",
      subtitle:
        "A Raspberry Pi Pico, a light sensor and two dozen lines of MicroPython: a lamp that decides for itself — with every threshold and fade under your editorial control.",
      buildsOn: ["adc-sensors", "microcontrollers", "pwm-dimmer", "op-amps"],
      Theory: () => (
        <>
          <h2>The mission</h2>
          <p>
            Build a lamp that switches itself on at dusk, off at dawn, with a knob to set{" "}
            <em>your</em> idea of &ldquo;dark&rdquo; — and, because software makes it a
            two-line change, a fade mode where brightness grows with darkness. This is the
            complete embedded-systems loop: <strong>sense → decide → act</strong>, and every
            stage is a lesson you own: divider sensing (2.2), ADC (11.2), hysteresis (6.1),
            PWM dimming (Unit 8).
          </p>

          <h2>Shopping list (beyond your kit)</h2>
          <table>
            <thead>
              <tr><th>Part</th><th>Spec</th><th>Qty</th><th>≈ Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>Raspberry Pi Pico</td><td>Pico or Pico W, with header pins (or solder them — a rite of passage)</td><td>1</td><td>$5–7</td></tr>
              <tr><td>Micro-USB cable</td><td>data-capable, not charge-only!</td><td>1</td><td>$2</td></tr>
              <tr><td>Photoresistor (LDR)</td><td>GL5528 or similar</td><td>1</td><td>$0.50</td></tr>
              <tr><td>Resistor</td><td>10 kΩ — brown·black·orange</td><td>1</td><td>$0.10</td></tr>
              <tr>
                <td colSpan={4}>
                  Reused: breadboard, LED, 470 Ω, jumpers, and the 100 kΩ potentiometer from Unit 8.
                  The 9 V battery retires — the Pico runs from USB and its pins speak <strong>3.3 V</strong>.
                </td>
              </tr>
            </tbody>
          </table>
          <div className="callout warn">
            <span className="co-title">New voltage, new rule</span>
            <p>
              The Pico is a 3.3 V citizen. Power your breadboard rails from its{" "}
              <strong>3V3(OUT)</strong> pin — never connect the old 9 V battery to any Pico pin,
              and never feed a GPIO more than 3.3 V. (Your LED at 3.3 V through the same 470 Ω
              still lights fine: (3.3 − 1.8)/470 ≈ 3 mA — dimmer than before, and PWM at 100%
              is its new maximum.)
            </p>
          </div>

          <h2>The wiring</h2>
          <p>
            Seat the Pico across the breadboard&rsquo;s centre gap (USB connector at one end,
            like the 555&rsquo;s notch rule at a bigger scale). Pin numbers below are the{" "}
            <em>physical</em> pins counted counter-clockwise from the USB end — the same DIP
            convention you learned on the 555, forty pins instead of eight:
          </p>
          <table>
            <thead>
              <tr><th>#</th><th>From</th><th>To</th><th>With</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Pico 3V3(OUT) — physical pin 36</td><td>+ rail</td><td>jumper (red)</td></tr>
              <tr><td>2</td><td>Pico GND — physical pin 38</td><td>− rail</td><td>jumper (black)</td></tr>
              <tr><td>3</td><td>+ rail</td><td>a free column (the sensor node)</td><td><strong>LDR</strong></td></tr>
              <tr><td>4</td><td>sensor node</td><td>− rail</td><td><strong>10 kΩ</strong> (divider's bottom leg)</td></tr>
              <tr><td>5</td><td>sensor node</td><td>GP26 / ADC0 — physical pin 31</td><td>jumper</td></tr>
              <tr><td>6</td><td>pot outer legs</td><td>+ rail and − rail</td><td>the pot IS a divider (2.2)</td></tr>
              <tr><td>7</td><td>pot wiper (middle leg)</td><td>GP27 / ADC1 — physical pin 32</td><td>jumper</td></tr>
              <tr><td>8</td><td>GP15 — physical pin 20</td><td>LED anode via 470 Ω, cathode to − rail</td><td>your standard LED branch</td></tr>
              <tr><td>9</td><td>Pico USB</td><td>computer</td><td>the data cable</td></tr>
            </tbody>
          </table>
          <p>
            Notice what the divider does here: bright room → LDR small → sensor node pulled
            toward 3.3 V → <em>high</em> ADC reading. Dark room → low reading. The code&rsquo;s
            comparisons follow from that one sentence.
          </p>

          <h2>Breathing life into it</h2>
          <ol>
            <li>Download the MicroPython firmware file (a <code>.uf2</code>) for the Pico from micropython.org.</li>
            <li>Hold the Pico&rsquo;s <strong>BOOTSEL</strong> button while plugging in the USB — it appears as a tiny flash drive.</li>
            <li>Drag the .uf2 onto it. The drive vanishes; the Pico reboots as a Python machine.</li>
            <li>Install <strong>Thonny</strong> (free, thonny.org), choose <em>MicroPython (Raspberry Pi Pico)</em> as the interpreter — bottom-right corner.</li>
            <li>Paste the program below and press Run. Cover the LDR with your hand.</li>
            <li>When it behaves, save it to the Pico as <code>main.py</code> — from then on it runs on power-up, no computer needed. Congratulations: you have shipped firmware.</li>
          </ol>

          <h2>The firmware</h2>
          <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "16px 20px", overflowX: "auto", fontSize: "0.88rem", lineHeight: 1.6 }}>
            <code>{CODE}</code>
          </pre>
          <p>
            Two dozen lines, and every one traceable to a lesson: the two ADC reads (11.2),
            the hysteresis pair of ifs (6.1), the PWM duty computation (Unit 8), the superloop
            with its polite <code>sleep_ms(50)</code> (11.1).
          </p>

          <h3>If it misbehaves</h3>
          <table>
            <thead>
              <tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
            </thead>
            <tbody>
              <tr><td>No board in Thonny</td><td>Charge-only USB cable, or interpreter not selected</td><td>Use a data cable; pick the Pico interpreter bottom-right</td></tr>
              <tr><td>LED never lights</td><td>LED direction or wrong pin</td><td>Long leg toward the 470 Ω on GP15 (physical pin 20)</td></tr>
              <tr><td>Lamp logic inverted</td><td>LDR and 10 kΩ swapped in the divider</td><td>LDR to +, fixed resistor to − (or swap the comparisons)</td></tr>
              <tr><td>Knob does nothing</td><td>Outer leg wired instead of the wiper</td><td>Middle leg to GP27 — same mistake, same fix as Unit 8</td></tr>
              <tr><td>Flickers at dusk</td><td>HYST too small for your room</td><td>Raise HYST — you have a lab above to pick a value</td></tr>
            </tbody>
          </table>

          <h2>Experiments — now it's software</h2>
          <ul>
            <li><strong>Breathe:</strong> replace the fade math with a slow sine of duty — a MacBook-style breathing lamp. Three lines.</li>
            <li><strong>Log the dawn:</strong> <code>print(light)</code> each loop and watch sunrise as a column of numbers in Thonny. Your first data logger.</li>
            <li><strong>Average 16 ADC reads</strong> (11.2's tip) and watch the dusk transition steady itself.</li>
            <li><strong>Pico W owners:</strong> the same chip has Wi-Fi — a web-controlled lamp is a weekend, not a career.</li>
          </ul>

          <h2>Where you stand now</h2>
          <p>
            Three builds sit on your desk: a blinker you sized with RC math, a dimmer you
            steered with diodes, and a lamp that senses and decides because you told it how.
            You can read schematics, size components, debug with Kirchhoff and a multimeter,
            reason about signals in time and frequency, follow logic from gate to program
            counter — and now flash firmware. One summit remains: the{" "}
            <strong>master course</strong> — sampling and Fourier, PID control, the art of
            real-world tolerances and debugging — ending with the finest full-circle build
            this course could offer: your own oscilloscope, pointed back at everything you
            have made.
          </p>
        </>
      ),
      lab: {
        title: "Digital Twin — the Whole Signal Chain",
        intro: (
          <>
            <p>
              Every block of the night-light, live: room light → LDR → divider → ADC →
              decision → PWM → LED. Play with dusk before you wire it.
            </p>
            <ul>
              <li>Sweep room light down slowly, then back up — the on and off points differ. That&rsquo;s your HYST.</li>
              <li>Set the threshold knob low: the lamp waits for deep darkness.</li>
              <li>Compare switch mode and fade mode — one variable in the firmware.</li>
            </ul>
          </>
        ),
        Component: NightLightLab,
      },
      checklist: [
        { id: "parts", text: "Gathered Pico (with pins), data USB cable, LDR and 10 kΩ resistor" },
        { id: "firmware", text: "Held BOOTSEL, dragged the MicroPython .uf2 onto the Pico drive" },
        { id: "thonny", text: "Thonny installed and talking to the Pico (>>> prompt appears)" },
        { id: "seated", text: "Pico seated across the centre gap, USB end at the board's edge" },
        { id: "rails", text: "3V3(OUT) (pin 36) to + rail, GND (pin 38) to − rail — the 9 V battery stays retired" },
        { id: "ldr", text: "LDR from + rail to the sensor node; 10 kΩ from the node to − rail" },
        { id: "adc0", text: "Sensor node jumpered to GP26 (physical pin 31)" },
        { id: "pot", text: "Pot across the rails, wiper to GP27 (physical pin 32)" },
        { id: "led", text: "470 Ω + LED from GP15 (physical pin 20) to the − rail, long leg toward the resistor" },
        { id: "run", text: "Program pasted and running in Thonny with no errors" },
        { id: "hand", text: "Covered the LDR with a hand — lamp on. Uncovered — lamp off, at a *different* light level" },
        { id: "knob", text: "Turned the knob and shifted the dusk point to taste" },
        { id: "mainpy", text: "Saved to the Pico as main.py, unplugged from the computer, powered it — it still works. Shipped! 🚀" },
        { id: "experiment", text: "Changed the firmware at least once (breathe, logging, averaging — anything). It's yours now." },
      ],
    },
  ],
};
