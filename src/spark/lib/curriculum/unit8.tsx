import type { UnitModule } from "./types";
import { PwmDimmerLab } from "@/spark/components/labs/labs-unit8";

const W = "#94a3b3";

export function PwmSchematic() {
  return (
    <div className="diagram">
      <svg viewBox="0 0 620 300" width="620" height="300" role="img" aria-label="555 PWM dimmer schematic">
        <g stroke={W} strokeWidth="2" fill="none">
          {/* 555 body */}
          <rect x="200" y="80" width="120" height="130" rx="8" fill="#1c2635" stroke="#3d4f6b" />
          {/* power stubs */}
          <line x1="240" y1="80" x2="240" y2="52" />
          <line x1="280" y1="80" x2="280" y2="52" />
          <line x1="260" y1="210" x2="260" y2="240" />
          {/* pins 2+6 node bus to the left */}
          <line x1="110" y1="140" x2="200" y2="140" />
          {/* C to ground */}
          <line x1="110" y1="140" x2="110" y2="168" />
          <line x1="96" y1="168" x2="124" y2="168" strokeWidth="3" />
          <line x1="96" y1="178" x2="124" y2="178" strokeWidth="3" />
          <line x1="110" y1="178" x2="110" y2="206" />
          <line x1="96" y1="206" x2="124" y2="206" />
          <line x1="101" y1="212" x2="119" y2="212" />
          <line x1="106" y1="218" x2="114" y2="218" />
          {/* D1 branch: node up and over to pot top */}
          <line x1="150" y1="140" x2="150" y2="118" />
          <line x1="150" y1="84" x2="150" y2="60" />
          <line x1="150" y1="60" x2="435" y2="60" />
          <line x1="435" y1="60" x2="435" y2="90" />
          {/* D2 branch: node down and over to pot bottom */}
          <line x1="170" y1="140" x2="170" y2="160" />
          <line x1="170" y1="196" x2="170" y2="252" />
          <line x1="170" y1="252" x2="435" y2="252" />
          <line x1="435" y1="252" x2="435" y2="190" />
          {/* pot body */}
          <polyline points="435,90 427,98 443,106 427,114 443,122 427,130 443,138 427,146 443,154 427,162 443,170 427,178 435,186" />
          {/* wiper from pin 3 */}
          <line x1="320" y1="140" x2="370" y2="140" />
          <line x1="370" y1="140" x2="370" y2="138" />
          <line x1="370" y1="138" x2="418" y2="138" />
          <polygon points="418,133 418,143 428,138" fill={W} />
          {/* LED branch off pin-3 wire */}
          <line x1="352" y1="140" x2="352" y2="200" />
          <polyline points="352,200 344,206 360,212 344,218 360,224 344,230 352,236" />
          <line x1="352" y1="236" x2="352" y2="248" />
          <polygon points="344,248 360,248 352,262" fill={W} />
          <line x1="344" y1="262" x2="360" y2="262" strokeWidth="2.5" />
          <line x1="352" y1="262" x2="352" y2="272" />
          <line x1="340" y1="272" x2="364" y2="272" />
          <line x1="344" y1="278" x2="360" y2="278" />
          <line x1="348" y1="284" x2="356" y2="284" />
        </g>
        {/* D1 pointing DOWN toward the node bus (cathode/band toward the chip side) */}
        <g transform="translate(150,101) rotate(90)">
          <polygon points="-9,-9 -9,9 8,0" fill={W} />
          <line x1="8" y1="-9" x2="8" y2="9" stroke={W} strokeWidth="2.5" />
        </g>
        {/* D2 pointing DOWN away from the node bus (band toward the pot side) */}
        <g transform="translate(170,178) rotate(90)">
          <polygon points="-9,-9 -9,9 8,0" fill={W} />
          <line x1="8" y1="-9" x2="8" y2="9" stroke={W} strokeWidth="2.5" />
        </g>
        <g fill="#8fa0b3" fontSize="11" fontFamily="sans-serif">
          <text x="260" y="150" fill="#dde6f0" fontSize="16" fontWeight="bold" textAnchor="middle" fontFamily="monospace">555</text>
          <text x="228" y="44">8</text>
          <text x="274" y="44">4</text>
          <text x="230" y="34" fill="#f26d6d" fontWeight="bold">+9 V</text>
          <text x="252" y="256">1 ⏚</text>
          <text x="140" y="128" textAnchor="end">pins 2+6</text>
          <text x="60" y="176">C 10 nF</text>
          <text x="128" y="98" textAnchor="end">D1 (band ↓)</text>
          <text x="196" y="176">D2 (band ↓)</text>
          <text x="455" y="142">100 kΩ pot</text>
          <text x="382" y="128">wiper → pin 3</text>
          <text x="300" y="222" textAnchor="end">470 Ω</text>
          <text x="300" y="258" textAnchor="end">LED</text>
          <text x="475" y="78">charge path (Ra)</text>
          <text x="475" y="212">discharge path (Rb)</text>
        </g>
      </svg>
      <div className="caption">
        The output itself charges and discharges the capacitor through the two halves of the pot,
        steered by D1 and D2. Turning the knob trades charge-time for discharge-time — duty
        changes, frequency doesn&rsquo;t.
      </div>
    </div>
  );
}

export const unit8: UnitModule = {
  unit: {
    id: "u8",
    num: 8,
    title: "The Advanced Capstone",
    blurb:
      "Back to the breadboard: turn your blinker into a PWM dimmer with a real knob — the technique that drives every LED strip, motor controller and audio Class-D amp.",
    track: "advanced",
  },
  lessons: [
    {
      slug: "pwm-dimmer",
      unitId: "u8",
      title: "Build the PWM Dimmer",
      subtitle:
        "A 555, a potentiometer and two steering diodes: smooth 0–100% LED brightness from a knob, at a frequency your eye can't see.",
      buildsOn: ["timer-555", "capstone", "filters", "flip-flops"],
      Theory: () => (
        <>
          <h2>The idea: dim by blinking fast</h2>
          <p>
            How do you make an LED half as bright? A resistor wastes power as heat, and LEDs
            dim unevenly with current. The modern answer is sneakier:{" "}
            <strong>blink it faster than the eye can see and control the ratio</strong>. On 30%
            of the time → 30% brightness, with the switch (a transistor) either fully on or
            fully off, wasting almost nothing — the same cutoff/saturation efficiency argument
            from Lessons 1.4 and 3.2. This is <strong>pulse-width modulation</strong>: fixed
            frequency, adjustable <strong>duty cycle</strong>. Your capstone blinker at 14 Hz
            (the flicker-fusion experiment) was already teetering on this idea; now we push it
            to 1.4 kHz and add a knob.
          </p>
          <div className="formula">
            perceived brightness ≈ duty cycle = t_high / T
            <span className="note">PWM drives LED strips, motor speed, servo position, heaters, Class-D audio, and every `analogWrite()`</span>
          </div>

          <h2>The circuit: your blinker, upgraded</h2>
          <p>
            Start from the astable you already understand (Lesson 3.3) and change the timing
            network. The output pin itself now charges and discharges the capacitor{" "}
            <em>through the two halves of a potentiometer</em>, with two small diodes steering
            the traffic: charging current flows through the upper half (R<sub>a</sub>) via D1,
            discharging current returns through the lower half (R<sub>b</sub>) via D2.
          </p>
          <div className="formula">
            t_high = 0.693·R_a·C · t_low = 0.693·R_b·C
            <span className="note">Ra + Rb is always the full 100 kΩ → T and f stay fixed (~1.4 kHz); only the ratio moves. (Exact with a rail-to-rail CMOS 555 — a classic NE555's output doesn&rsquo;t quite reach the rail, skewing duty upward a little. It still works.)</span>
          </div>
          <p>
            Turn the knob and you slide the wiper: more R<sub>a</sub>, less R<sub>b</sub> —
            longer highs, shorter lows, same total. Duty from ~5% to ~95%, frequency rock
            steady. Every lesson is on stage: RC timing (2.3), the divider-as-knob (2.2), diode
            steering (3.1), the 555&rsquo;s thresholds (3.3), and duty cycle as digital-analog
            bridge (Unit 7 meets Unit 5 — a low-pass filter on this output would literally turn
            duty into a DC voltage).
          </p>
          <PwmSchematic />

          <h2>Shopping list (beyond the blinker kit)</h2>
          <table>
            <thead>
              <tr><th>Part</th><th>Spec</th><th>Qty</th><th>≈ Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>Potentiometer</td><td>100 kΩ linear, breadboard-friendly legs</td><td>1</td><td>$1.50</td></tr>
              <tr><td>Signal diodes</td><td>1N4148 (glass body, black band = cathode)</td><td>2</td><td>$0.20</td></tr>
              <tr><td>Capacitor</td><td>10 nF ceramic — marked “103”; no polarity</td><td>1</td><td>$0.20</td></tr>
              <tr><td colSpan={4}>Reused from the blinker: breadboard, 555, 470 Ω, LED, 9 V battery + clip, jumpers.
              <em> Optional: a TLC555/LMC555 (CMOS 555, ~$1) makes the duty and frequency match the math exactly; for the motor experiment: 2N2222 transistor, small DC motor, 1N4007 diode, 1 kΩ.</em></td></tr>
            </tbody>
          </table>

          <h2>The wiring, precisely</h2>
          <p>
            Strip the old timing parts (R1, R2, big capacitor) off your blinker but keep the
            555, its power wiring and the LED branch. Then:
          </p>
          <table>
            <thead>
              <tr><th>#</th><th>From</th><th>To</th><th>With</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>555 pin 8 + pin 4</td><td>+ rail</td><td>jumpers (unchanged from blinker)</td></tr>
              <tr><td>2</td><td>555 pin 1</td><td>− rail</td><td>jumper (unchanged)</td></tr>
              <tr><td>3</td><td>pin 2</td><td>pin 6</td><td>jumper (unchanged)</td></tr>
              <tr><td>4</td><td>pin 2</td><td>− rail</td><td><strong>C</strong> 10 nF ceramic (“103”) — either way round</td></tr>
              <tr><td>5</td><td>Potentiometer</td><td>three separate columns</td><td>all 3 legs in their own strip</td></tr>
              <tr><td>6</td><td>pot middle leg (wiper)</td><td>pin 3</td><td>jumper</td></tr>
              <tr><td>7</td><td>pot outer leg A</td><td>pin 6</td><td><strong>D1</strong> — band toward the 555</td></tr>
              <tr><td>8</td><td>pot outer leg B</td><td>pin 6</td><td><strong>D2</strong> — band toward the pot</td></tr>
              <tr><td>9</td><td>pin 3</td><td>LED anode via 470 Ω, cathode to − rail</td><td>unchanged from blinker</td></tr>
            </tbody>
          </table>
          <div className="callout warn">
            <span className="co-title">The two classic mistakes here</span>
            <p>
              ① Diode bands: D1 and D2 must point <em>opposite ways</em> relative to pin 6 — one
              band toward the chip, one toward the pot. Same direction = no oscillation. ② The
              wiper is the <em>middle</em> leg. Wire an outer leg to pin 3 by mistake and the
              knob does nothing.
            </p>
          </div>

          <h2>Power up</h2>
          <p>
            The LED lights immediately — at 1.4 kHz it looks perfectly steady. Turn the knob:
            brightness glides smoothly from near-dark to full. There is no flicker to see, but
            there <em>is</em> one to hear about: wave the board (or your eyes) quickly and
            you&rsquo;ll catch a dotted-line trail — your own flicker-fusion experiment at
            1.4 kHz.
          </p>
          <h3>If it misbehaves</h3>
          <table>
            <thead>
              <tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
            </thead>
            <tbody>
              <tr><td>LED stuck at full brightness</td><td>A diode reversed, or oscillation dead</td><td>Check the two bands point opposite ways relative to pin 6</td></tr>
              <tr><td>Knob does nothing</td><td>Wrong pot leg on pin 3</td><td>The middle leg is the wiper</td></tr>
              <tr><td>Visible flicker</td><td>Wrong capacitor (µF instead of nF)</td><td>Use the ceramic “103”; your 10 µF blinker cap makes ~1.4 Hz!</td></tr>
              <tr><td>Dead entirely</td><td>Power pins</td><td>Re-check pins 8 & 4 to +, pin 1 to − (blinker rules apply)</td></tr>
            </tbody>
          </table>

          <h2>Experiments</h2>
          <ul>
            <li>
              <strong>Slow-motion PWM:</strong> swap C back to 10 µF — the dimmer becomes a
              blinker whose knob adjusts on/off ratio at ~1.4 Hz. PWM and blinking are the same
              circuit at different speeds.
            </li>
            <li>
              <strong>Drive a motor:</strong> pin 3 → 1 kΩ → 2N2222 base, motor from + rail to
              collector, <em>flyback diode across the motor</em> (Lesson 2.4 — the coil will
              kick!). The knob is now a speed control.
            </li>
            <li>
              <strong>PWM → analog:</strong> feed pin 3 through your Lesson 5.3 low-pass filter
              (10 kΩ + 1 µF, fc ≈ 16 Hz) and measure the output with a multimeter: a steady DC
              voltage that follows the knob. You&rsquo;ve built a digital-to-analog converter.
            </li>
          </ul>

          <h2>Where you stand</h2>
          <p>
            You&rsquo;ve now completed the core and advanced courses: from a balloon rubbing on
            hair to a knob-controlled switching power stage — the exact technique inside EV
            motor drives and phone-screen dimming. And the mountains this course kept pointing
            at are now on the map: the <strong>expert course starts next</strong> — resonance
            and radio, power electronics, and finally a microcontroller that puts your PWM
            under software control.
          </p>
        </>
      ),
      lab: {
        title: "Digital Twin — the Knob Before the Build",
        intro: (
          <>
            <p>The exact dimmer you&rsquo;re about to wire, knob included.</p>
            <ul>
              <li>Sweep the knob: duty slides 5–95% while frequency pins near 1.4 kHz.</li>
              <li>Compare “the LED itself” (slowed strobe) with “what your eye sees”.</li>
              <li>Note t_high + t_low never changes — the pot is a fixed total, split two ways.</li>
            </ul>
          </>
        ),
        Component: PwmDimmerLab,
      },
      checklist: [
        { id: "parts", text: "Gathered the pot, two 1N4148 diodes and the 10 nF ceramic ('103') capacitor" },
        { id: "strip", text: "Removed the blinker's R1, R2 and 10 µF cap — kept the 555, power wiring and LED branch" },
        { id: "cap", text: "10 nF ceramic from pin 2 to the − rail (no polarity to worry about — it's not electrolytic)" },
        { id: "pot", text: "Potentiometer seated with all three legs in separate columns" },
        { id: "wiper", text: "Middle leg (wiper) jumpered to pin 3" },
        { id: "d1", text: "D1 from pot leg A to pin 6 — black band toward the 555" },
        { id: "d2", text: "D2 from pot leg B to pin 6 — black band toward the pot" },
        { id: "inspect", text: "Verified the two diode bands point OPPOSITE ways relative to pin 6" },
        { id: "predict", text: "Predicted with the simulator: knob at 25% → about quarter brightness" },
        { id: "power", text: "Battery connected — LED lit and looking rock steady" },
        { id: "dim", text: "Turned the knob through its full travel: smooth dimming, no visible flicker" },
        { id: "experiment", text: "Ran an experiment (slow-motion 10 µF swap, motor drive, or the low-pass DAC)" },
      ],
    },
  ],
};
