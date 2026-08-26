import type { UnitModule } from "./types";
import { CapstoneLab } from "@/spark/components/labs/labs-unit4";

/* ---------- diagram: how a breadboard connects ---------- */

export function MiniBoard() {
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];
  const topRows = [64, 86, 108, 130, 152];
  const botRows = [188, 210, 232, 254, 276];
  const cx = (i: number) => 56 + i * 34;
  return (
    <div className="diagram">
      <svg viewBox="0 0 360 320" width="360" height="320" role="img" aria-label="Breadboard internal connections">
        <rect x="10" y="10" width="340" height="300" rx="10" fill="#2b3440" />
        {/* power rails */}
        <rect x="30" y="26" width="300" height="8" rx="4" fill="rgba(242,109,109,0.35)" />
        <text x="22" y="36" fill="#f26d6d" fontSize="13" fontWeight="bold">+</text>
        {cols.map((i) => (
          <circle key={`rp${i}`} cx={cx(i)} cy={30} r="4" fill="#151d29" />
        ))}
        {/* one column strip highlighted */}
        <rect x={cx(2) - 8} y={56} width="16" height="104" rx="8" fill="rgba(71,194,107,0.3)" />
        {/* top block holes */}
        {topRows.map((y) =>
          cols.map((i) => <circle key={`t${y}${i}`} cx={cx(i)} cy={y} r="4" fill="#151d29" />)
        )}
        {/* centre gap */}
        <rect x="10" y="164" width="340" height="16" fill="#232c39" />
        {/* bottom block holes */}
        {botRows.map((y) =>
          cols.map((i) => <circle key={`b${y}${i}`} cx={cx(i)} cy={y} r="4" fill="#151d29" />)
        )}
        <rect x={cx(5) - 8} y={180} width="16" height="104" rx="8" fill="rgba(76,201,240,0.3)" />
        <text x="188" y="305" fill="#8fa0b3" fontSize="11" textAnchor="middle">
          strips of 5 connect vertically · rails connect horizontally · the gap fits a chip
        </text>
      </svg>
      <div className="caption">
        Inside a breadboard: each vertical strip of five holes is one electrical node; the long
        rails run the board&rsquo;s full length. The centre gap keeps a chip&rsquo;s two pin rows
        separate.
      </div>
    </div>
  );
}

/* ---------- diagram: the full build layout ---------- */

export function BuildBoard() {
  const X = (i: number) => 40 + i * 24;
  const RAIL_P = 40;
  const RAIL_N = 62;
  const TOP_ROWS = [100, 124, 148, 172, 196]; // j i h g f
  const BOT_ROWS = [248, 272, 296, 320, 344]; // e d c b a
  const cols = Array.from({ length: 29 }, (_, i) => i);
  const holes: Array<[number, number]> = [];
  for (const i of cols) {
    holes.push([X(i), RAIL_P], [X(i), RAIL_N]);
    for (const y of TOP_ROWS) holes.push([X(i), y]);
    for (const y of BOT_ROWS) holes.push([X(i), y]);
  }
  return (
    <div className="diagram">
      <svg viewBox="0 0 760 400" width="760" height="400" role="img" aria-label="Breadboard layout of the 555 blinker">
        <rect x="10" y="14" width="740" height="370" rx="10" fill="#2b3440" />
        <rect x="28" y={RAIL_P - 5} width="704" height="10" rx="5" fill="rgba(242,109,109,0.3)" />
        <rect x="28" y={RAIL_N - 5} width="704" height="10" rx="5" fill="rgba(76,201,240,0.3)" />
        <text x="20" y={RAIL_P + 5} fill="#f26d6d" fontSize="14" fontWeight="bold">+</text>
        <text x="20" y={RAIL_N + 5} fill="#4cc9f0" fontSize="14" fontWeight="bold">−</text>
        <rect x="10" y="212" width="740" height="24" fill="#232c39" />
        {holes.map(([x, y], k) => (
          <circle key={k} cx={x} cy={y} r="3.4" fill="#151d29" />
        ))}

        {/* ---- the 555 across the gap, pins on columns 8..11 ---- */}
        <rect x={X(8) - 12} y="206" width={X(11) - X(8) + 24} height="36" rx="4" fill="#1c2635" stroke="#3d4f6b" strokeWidth="2" />
        <circle cx={X(8) - 2} cy="224" r="4" fill="#0c1017" stroke="#3d4f6b" />
        <text x={(X(8) + X(11)) / 2 + 6} y="229" fill="#dde6f0" fontSize="13" fontWeight="bold" textAnchor="middle" fontFamily="monospace">555</text>
        {/* pin stubs into rows f (top block bottom row) and e (bottom block top row) */}
        {[8, 9, 10, 11].map((i) => (
          <g key={`p${i}`}>
            <rect x={X(i) - 3} y="196" width="6" height="12" fill="#3d4f6b" />
            <rect x={X(i) - 3} y="240" width="6" height="12" fill="#3d4f6b" />
          </g>
        ))}
        {/* pin numbers (names are in the pinout diagram + wiring table) */}
        {(["8", "7", "6", "5"] as const).map((t, k) => (
          <text key={t} x={X(8 + k)} y="190" fill="#dde6f0" fontSize="11" fontWeight="bold" textAnchor="middle">{t}</text>
        ))}
        {(["1", "2", "3", "4"] as const).map((t, k) => (
          <text key={t} x={X(8 + k)} y="266" fill="#dde6f0" fontSize="11" fontWeight="bold" textAnchor="middle">{t}</text>
        ))}

        {/* ---- battery clip ---- */}
        <path d={`M 16 96 C 30 96 ${X(1) - 10} ${RAIL_P + 20} ${X(1)} ${RAIL_P}`} stroke="#f26d6d" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d={`M 16 116 C 40 116 ${X(2) - 10} ${RAIL_N + 24} ${X(2)} ${RAIL_N}`} stroke="#222" strokeWidth="4" fill="none" strokeLinecap="round" />
        <text x="14" y="86" fill="#8fa0b3" fontSize="10">9 V battery clip</text>

        {/* ---- jumper: pin 8 column (top strip) to + rail ---- */}
        <path d={`M ${X(8)} 148 Q ${X(8) - 26} 94 ${X(8)} ${RAIL_P}`} stroke="#d94040" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* ---- jumper: pin 4 column (bottom strip) around the chip to + rail ---- */}
        <path d={`M ${X(11)} 320 C ${X(14) + 30} 320 ${X(14) + 20} 70 ${X(14)} ${RAIL_P}`} stroke="#d94040" strokeWidth="4" fill="none" strokeLinecap="round" />
        {/* ---- jumper: pin 1 column (bottom strip) to − rail ---- */}
        <path d={`M ${X(8)} 320 C ${X(4) - 20} 320 ${X(4) - 16} 100 ${X(4)} ${RAIL_N}`} stroke="#222" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* ---- R1: + rail to pin 7 column (top strip) ---- */}
        <line x1={X(9)} y1={RAIL_P} x2={X(9)} y2="100" stroke="#94a3b3" strokeWidth="2" />
        <rect x={X(9) - 7} y="56" width="14" height="30" rx="7" fill="#c9a876" stroke="#8a7350" />
        <line x1={X(9) - 7} y1="64" x2={X(9) + 7} y2="64" stroke="#7a4a21" strokeWidth="3" />
        <line x1={X(9) - 7} y1="70" x2={X(9) + 7} y2="70" stroke="#1c1c1c" strokeWidth="3" />
        <line x1={X(9) - 7} y1="76" x2={X(9) + 7} y2="76" stroke="#d94040" strokeWidth="3" />
        <text x={X(9) + 14} y="66" fill="#8fa0b3" fontSize="10">R1 1 kΩ</text>

        {/* ---- R2: pin 7 column to pin 6 column (top strips) ---- */}
        <line x1={X(9)} y1="124" x2={X(9)} y2="112" stroke="#94a3b3" strokeWidth="2" />
        <line x1={X(10)} y1="124" x2={X(10)} y2="112" stroke="#94a3b3" strokeWidth="2" />
        <rect x={X(9) - 4} y="102" width={X(10) - X(9) + 8} height="12" rx="6" fill="#c9a876" stroke="#8a7350" />
        <text x={(X(9) + X(10)) / 2 + 40} y="106" fill="#8fa0b3" fontSize="10">R2 47 kΩ</text>

        {/* ---- jumper: pin 6 column (top) around the chip to pin 2 column (bottom) ---- */}
        <path d={`M ${X(10)} 100 C ${X(17)} 100 ${X(17)} 344 ${X(9)} 344`} stroke="#ef8420" strokeWidth="4" fill="none" strokeLinecap="round" />
        <text x={X(17) + 8} y="230" fill="#ef8420" fontSize="10">pin 6 → pin 2</text>

        {/* ---- capacitor: pin 2 column to a free column, then to − rail ---- */}
        <line x1={X(9)} y1="344" x2={X(8) + 8} y2="360" stroke="#94a3b3" strokeWidth="2" />
        <line x1={X(7)} y1="344" x2={X(7) + 10} y2="360" stroke="#94a3b3" strokeWidth="2" />
        <circle cx={(X(7) + X(9)) / 2} cy="364" r="15" fill="#324055" stroke="#4a5b74" strokeWidth="2" />
        <rect x={(X(7) + X(9)) / 2 - 15} y="356" width="7" height="16" fill="#c9d4e0" />
        <text x={(X(7) + X(9)) / 2 + 24} y="368" fill="#8fa0b3" fontSize="10">C 10 µF (stripe = −)</text>
        <path d={`M ${X(7)} 320 C ${X(6) - 30} 320 ${X(6) - 20} 100 ${X(6)} ${RAIL_N}`} stroke="#222" strokeWidth="4" fill="none" strokeLinecap="round" />

        {/* ---- 470 Ω from pin 3 column to LED, LED to − rail ---- */}
        <line x1={X(10)} y1="296" x2={X(11) + 6} y2="306" stroke="#94a3b3" strokeWidth="2" />
        <rect x={X(11) + 2} y="300" width={X(13) - X(11)} height="12" rx="6" fill="#c9a876" stroke="#8a7350" />
        <line x1={X(13) + 2} y1="306" x2={X(14)} y2="296" stroke="#94a3b3" strokeWidth="2" />
        <text x={(X(11) + X(13)) / 2 + 6} y="330" fill="#8fa0b3" fontSize="10">470 Ω</text>
        <circle cx={X(15)} cy="290" r="11" fill="#f26d6d" opacity="0.9" />
        <line x1={X(14)} y1="296" x2={X(15) - 6} y2="293" stroke="#94a3b3" strokeWidth="2" />
        <line x1={X(15) + 6} y1="293" x2={X(16)} y2="296" stroke="#94a3b3" strokeWidth="2" />
        <text x={X(15)} y="272" fill="#f26d6d" fontSize="10" textAnchor="middle">LED</text>
        <path d={`M ${X(16)} 296 C ${X(19)} 296 ${X(19) - 6} 96 ${X(19)} ${RAIL_N}`} stroke="#222" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>
      <div className="caption">
        The finished blinker. Colours: red = to +, black = to −, orange = the pin 6 → pin 2 signal
        jumper. Exact columns don&rsquo;t matter — <em>connections</em> do; use the wiring table as
        the source of truth.
      </div>
    </div>
  );
}

export const unit4: UnitModule = {
  unit: {
    id: "u4",
    num: 4,
    title: "The Capstone Build",
    blurb:
      "Leave the simulator. Buy a handful of parts, wire a real 555 astable on a breadboard, and watch your own LED blink.",
  },
  lessons: [
    {
      slug: "capstone",
      unitId: "u4",
      title: "Build the Blinker",
      subtitle:
        "A real 555-timer LED flasher on a breadboard — every component chosen with the theory you now own.",
      buildsOn: ["timer-555", "diodes", "capacitors", "resistors"],
      Theory: () => (
        <>
          <h2>The mission</h2>
          <p>
            You will build the astable circuit from Lesson 3.3 physically: a 555 blinking an LED
            at about <strong>1.5 flashes per second</strong>, powered by a 9 V battery. Total
            cost: roughly $12 if you buy parts individually — less from any electronics starter
            kit, which will contain everything below and plenty more. Nothing here can hurt you:
            9 V through these components is entirely safe (just never short the battery&rsquo;s
            terminals directly — Lesson 1.1).
          </p>
          <p>Everything in this circuit is something you&rsquo;ve already mastered:</p>
          <ul>
            <li>The RC pair sets the tempo — <em>Lesson 2.3</em> (τ = RC).</li>
            <li>R1 = 1 kΩ and R2 = 47 kΩ pick f ≈ 1.5 Hz — <em>Lesson 3.3</em> (f = 1.44/((R1+2R2)C)).</li>
            <li>The 470 Ω sets the LED to ~15 mA — <em>Lesson 3.1</em> (R = (V−Vf)/I).</li>
            <li>Reading the resistors&rsquo; stripes — <em>Lesson 1.3</em>.</li>
            <li>Why one loop, why polarity matters — <em>Lessons 1.1 and 2.3</em>.</li>
          </ul>

          <h2>Shopping list</h2>
          <table>
            <thead>
              <tr><th>Part</th><th>Spec</th><th>Qty</th><th>≈ Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>Breadboard</td><td>400-point (half-size) or larger</td><td>1</td><td>$3</td></tr>
              <tr><td>555 timer IC</td><td>NE555 (or NE555P / LM555)</td><td>1</td><td>$0.50</td></tr>
              <tr><td>Resistor R1</td><td>1 kΩ ¼ W — brown·black·red</td><td>1</td><td rowSpan={3}>$0.30</td></tr>
              <tr><td>Resistor R2</td><td>47 kΩ ¼ W — yellow·violet·orange</td><td>1</td></tr>
              <tr><td>LED resistor</td><td>470 Ω ¼ W — yellow·violet·brown</td><td>1</td></tr>
              <tr><td>Capacitor C</td><td>10 µF electrolytic, ≥ 16 V</td><td>1</td><td>$0.30</td></tr>
              <tr><td>LED</td><td>5 mm, any colour (red is classic)</td><td>1</td><td>$0.20</td></tr>
              <tr><td>Jumper wires</td><td>male–male, a small pack</td><td>~6</td><td>$3</td></tr>
              <tr><td>9 V battery + clip</td><td>clip with bare or pin leads</td><td>1</td><td>$4</td></tr>
              <tr>
                <td colSpan={4}>
                  <em>Nice extras for the experiments:</em> 100 µF and 0.1 µF (100 nF)
                  capacitors, 4.7 kΩ and 470 kΩ resistors, a piezo buzzer, a 100 kΩ
                  potentiometer.
                </td>
              </tr>
            </tbody>
          </table>

          <h2>Know your breadboard</h2>
          <p>
            A breadboard is a grid of spring-loaded holes with hidden connections — no soldering
            needed. The wiring below relies on knowing exactly what connects to what:
          </p>
          <MiniBoard />

          <h2>The wiring, precisely</h2>
          <p>
            Place the 555 first, straddling the centre gap, <strong>notch/dot to the left</strong>
            — then pin 1 is bottom-left and the numbers run counter-clockwise (Lesson 3.3&rsquo;s
            pinout). Then make these nine connections. &ldquo;Pin n&rdquo; always means{" "}
            <em>any free hole in that pin&rsquo;s 5-hole strip</em>:
          </p>
          <table>
            <thead>
              <tr><th>#</th><th>From</th><th>To</th><th>With</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>555 pin 8 (VCC)</td><td>+ rail</td><td>jumper</td></tr>
              <tr><td>2</td><td>555 pin 4 (RESET)</td><td>+ rail</td><td>jumper</td></tr>
              <tr><td>3</td><td>555 pin 1 (GND)</td><td>− rail</td><td>jumper</td></tr>
              <tr><td>4</td><td>+ rail</td><td>pin 7</td><td><strong>R1</strong> 1 kΩ</td></tr>
              <tr><td>5</td><td>pin 7</td><td>pin 6</td><td><strong>R2</strong> 47 kΩ</td></tr>
              <tr><td>6</td><td>pin 6</td><td>pin 2</td><td>jumper</td></tr>
              <tr><td>7</td><td>pin 2</td><td>− rail</td><td><strong>C</strong> 10 µF — striped leg to the − rail!</td></tr>
              <tr><td>8</td><td>pin 3 (OUT)</td><td>LED anode (long leg)</td><td><strong>470 Ω</strong> in series</td></tr>
              <tr><td>9</td><td>LED cathode (flat side)</td><td>− rail</td><td>direct / jumper</td></tr>
            </tbody>
          </table>
          <p>
            Pin 5 stays unconnected — fine for this build. Battery clip last: red lead to the +
            rail, black to the − rail.
          </p>
          <BuildBoard />

          <div className="callout warn">
            <span className="co-title">The three classic mistakes (check before power!)</span>
            <p>
              ① Electrolytic capacitor backwards — the stripe must go to the − rail. ② LED
              backwards — long leg toward the 470 Ω, flat side to −. ③ Chip rotated 180° — the
              notch must be on the left, or the chip loses its ground connection and every
              timing pin lands on the wrong strip. Thirty seconds of checking beats a dead
              evening of debugging.
            </p>
          </div>

          <h2>Power up</h2>
          <p>
            Snap the battery in. The LED should begin blinking immediately: on for ~⅓ s, off for
            ~⅓ s, about 90 blinks a minute. That number isn&rsquo;t luck — you can derive it:
            f = 1.44/((1k + 94k)·10µF) ≈ 1.5 Hz, exactly what the simulator below predicts.
          </p>

          <h3>If it doesn&rsquo;t blink</h3>
          <table>
            <thead>
              <tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>Completely dead</td>
                <td>No power reaching the chip</td>
                <td>Check battery, clip leads on the correct rails, pins 8 &amp; 4 to +, pin 1 to −</td>
              </tr>
              <tr>
                <td>LED solid on, never blinks</td>
                <td>Timing loop broken</td>
                <td>Check the pin 6 → pin 2 jumper, and that R2 really bridges pin 7 to pin 6</td>
              </tr>
              <tr>
                <td>Nothing works, behaviour erratic</td>
                <td>Chip rotated 180° (it lost its ground)</td>
                <td>Disconnect power; reseat with the notch on the left</td>
              </tr>
              <tr>
                <td>LED never lights, chip cool</td>
                <td>LED backwards or wrong resistor</td>
                <td>Flip the LED; confirm 470 Ω is yellow·violet·brown</td>
              </tr>
              <tr>
                <td>Wrong blink speed</td>
                <td>Wrong R2 or C value</td>
                <td>Re-read the stripes (47 k = yellow·violet·orange); check C is 10 µF</td>
              </tr>
            </tbody>
          </table>

          <h2>Experiments — you&rsquo;ve earned them</h2>
          <ul>
            <li>
              <strong>Slow heartbeat:</strong> swap C for 100 µF → f ≈ 0.15 Hz, one stately blink
              every 7 seconds.
            </li>
            <li>
              <strong>Flicker-fusion test:</strong> R2 = 4.7 kΩ → ≈ 14 Hz. Can your eye still see
              it blink? Find your own fusion threshold by mixing parts.
            </li>
            <li>
              <strong>Make it sing:</strong> R2 = 4.7 kΩ and C = 0.1 µF pushes f to ≈ 1.4 kHz —
              replace the LED+resistor with a piezo buzzer from pin 3 to − and it plays a tone.
              The same circuit, a thousand times faster: blinkers and buzzers are one idea.
            </li>
            <li>
              <strong>Add a knob:</strong> a 100 kΩ potentiometer in series with R2 gives you a
              blink-rate dial — a potentiometer doing real work (Lesson 2.2).
            </li>
          </ul>

          <h2>Where to go from here</h2>
          <p>
            You now read schematics, size components with Ohm&rsquo;s law, think in time
            constants, and debug with Kirchhoff. Two suggestions: pick up a cheap multimeter —
            your first real instrument — and then keep going, because the{" "}
            <strong>advanced course starts right after this lesson</strong>: AC and signals,
            op-amps, digital logic, and a second build that turns this very blinker into a
            knob-controlled PWM dimmer. The breadboard on your desk is no longer a mystery box.
            It&rsquo;s a lab.
          </p>
        </>
      ),
      lab: {
        title: "Digital Twin — Predict, Then Build",
        intro: (
          <>
            <p>
              The exact circuit you are about to build, limited to the parts in your kit. Use it
              to <em>predict</em> what the real board will do — before and after every swap.
            </p>
            <ul>
              <li>Confirm the stock build: R2 = 47 k, C = 10 µF → ≈ 1.5 Hz.</li>
              <li>Predict the 100 µF swap, then do it for real and compare.</li>
              <li>Set R2 = 4.7 k and decide: will your eye see the flicker?</li>
            </ul>
          </>
        ),
        Component: CapstoneLab,
      },
      checklist: [
        { id: "parts", text: "Gathered all parts from the shopping list (or a starter kit)" },
        { id: "resistors", text: "Identified all three resistors by their colour bands (1 k, 47 k, 470 Ω) — without a chart if you can" },
        { id: "polarity", text: "Found the capacitor's − stripe and the LED's flat side / short leg (cathode)" },
        { id: "chip", text: "Seated the 555 across the centre gap, notch to the LEFT, pins gently and fully in" },
        { id: "power-pins", text: "Wired pin 8 and pin 4 to the + rail, pin 1 to the − rail" },
        { id: "r1", text: "R1 (1 kΩ) from + rail to pin 7" },
        { id: "r2", text: "R2 (47 kΩ) from pin 7 to pin 6" },
        { id: "jumper62", text: "Jumper from pin 6 to pin 2" },
        { id: "cap", text: "10 µF capacitor from pin 2 to the − rail, stripe to −" },
        { id: "led", text: "470 Ω from pin 3 to the LED's long leg; LED's flat side to the − rail" },
        { id: "inspect", text: "Triple-checked the three classic mistakes: cap stripe, LED direction, chip orientation" },
        { id: "predict", text: "Predicted the blink rate with the simulator above (~1.5 Hz)" },
        { id: "blinks", text: "Connected the 9 V battery — IT BLINKS! 🎉" },
        { id: "experiment", text: "Ran at least one experiment (slow blink, flicker test, buzzer, or speed knob)" },
      ],
    },
  ],
};
