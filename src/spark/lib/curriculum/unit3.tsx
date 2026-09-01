import type { UnitModule } from "./types";
import { DiodeLab, TransistorLab, Timer555Lab } from "@/spark/components/labs/labs-unit3";

export function Pinout555() {
  const pinsBottom = [
    ["1", "GND", "0 V supply"],
    ["2", "TRIG", "below ⅓ Vcc → output HIGH"],
    ["3", "OUT", "the output!"],
    ["4", "RESET", "tie to + to enable"],
  ];
  const pinsTop = [
    ["8", "VCC", "+ supply (4.5–15 V)"],
    ["7", "DISCH", "drains the capacitor"],
    ["6", "THRESH", "above ⅔ Vcc → output LOW"],
    ["5", "CTRL", "usually unused"],
  ];
  return (
    <div className="diagram">
      <svg viewBox="0 0 640 260" width="640" height="260" role="img" aria-label="555 timer pinout">
        <rect x="200" y="70" width="240" height="120" rx="8" fill="#1c2635" stroke="#3d4f6b" strokeWidth="2" />
        <path d="M 200 115 A 15 15 0 0 1 200 145" fill="#0c1017" stroke="#3d4f6b" strokeWidth="2" />
        <text x="320" y="138" fill="#dde6f0" fontSize="22" fontWeight="bold" textAnchor="middle" fontFamily="monospace">555</text>
        {pinsBottom.map(([n, name], i) => {
          const x = 230 + i * 60;
          return (
            <g key={n}>
              <rect x={x - 7} y="190" width="14" height="18" fill="#3d4f6b" />
              <text x={x} y="225" fill="#4cc9f0" fontSize="12" textAnchor="middle" fontFamily="monospace">{n}</text>
              <text x={x} y="242" fill="#8fa0b3" fontSize="11" textAnchor="middle">{name}</text>
            </g>
          );
        })}
        {pinsTop.map(([n, name], i) => {
          const x = 230 + i * 60;
          return (
            <g key={n}>
              <rect x={x - 7} y="52" width="14" height="18" fill="#3d4f6b" />
              <text x={x} y="42" fill="#4cc9f0" fontSize="12" textAnchor="middle" fontFamily="monospace">{n}</text>
              <text x={x} y="26" fill="#8fa0b3" fontSize="11" textAnchor="middle">{name}</text>
            </g>
          );
        })}
        <text x="180" y="134" fill="#8fa0b3" fontSize="11" textAnchor="end">notch marks pin 1 side ⟶</text>
      </svg>
      <div className="caption">
        The 555 in its 8-pin DIP package, viewed from above. Pin 1 is the first pin
        counter-clockwise from the notch — bottom-left here.
      </div>
    </div>
  );
}

export const unit3: UnitModule = {
  unit: {
    id: "u3",
    num: 3,
    title: "Semiconductors",
    blurb:
      "One-way valves, tiny amplifiers, and the legendary chip that ties the whole course together.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "diodes",
      unitId: "u3",
      title: "Diodes & LEDs",
      subtitle:
        "The one-way valve of electronics — and its glowing cousin that you must never connect without a resistor.",
      buildsOn: ["ohms-law", "power"],
      Theory: () => (
        <>
          <h2>Semiconductors in sixty seconds</h2>
          <p>
            Silicon sits between conductor and insulator — nearly useless pure, magical when{" "}
            <strong>doped</strong>. Sprinkle in atoms with a spare electron and you get{" "}
            <strong>n-type</strong> material (mobile negative carriers); atoms one electron
            short give <strong>p-type</strong> (mobile positive &ldquo;holes&rdquo;). The entire
            modern world is built on what happens where a p region meets an n region: a{" "}
            <strong>junction</strong> that conducts in one direction only.
          </p>

          <h2>The diode</h2>
          <p>
            A <strong>diode</strong> is one p–n junction with two legs: the <strong>anode</strong>{" "}
            (+ side, the triangle in the symbol) and <strong>cathode</strong> (− side, the bar).
            Push conventional current from anode to cathode (<em>forward</em>) and it flows
            freely — but only after the voltage across the junction exceeds the{" "}
            <strong>forward voltage</strong> V<sub>f</sub>, about 0.7 V for silicon. Reverse it
            and essentially nothing flows. Unlike a resistor&rsquo;s gentle straight line, the
            diode&rsquo;s I–V curve is a hockey stick: flat, flat, flat, then nearly vertical.
            Diodes rectify AC into DC, protect circuits from reversed batteries, and clamp
            inductive kicks (your flyback diode from Lesson 2.4).
          </p>

          <h2>LEDs: diodes that pay you in photons</h2>
          <p>
            In a <strong>light-emitting diode</strong>, each electron crossing the junction drops
            an energy step and emits that energy as a photon. The step size sets both the colour
            and the forward voltage: red ≈ 1.8 V, green ≈ 2.2 V, blue/white ≈ 3.0–3.2 V. Physical
            markers: the long leg and the rounded side are the anode; short leg and flat side,
            the cathode.
          </p>

          <h2>The most important calculation in hobby electronics</h2>
          <p>
            Past V<sub>f</sub> the curve is nearly vertical — the LED itself does almost nothing
            to limit current. Connect one straight across a battery and the current skyrockets
            until the LED dies (took our simulated one ~a millisecond). The fix: a series
            resistor sized with Ohm&rsquo;s law. The resistor sees whatever voltage is left over:
          </p>
          <div className="formula">
            R = (V_s − V_f) / I
            <span className="note">9 V supply, red LED, 15 mA: R = (9 − 1.8) / 0.015 = 480 Ω → use 470 Ω</span>
          </div>
          <div className="callout warn">
            <span className="co-title">Never bare-wire an LED</span>
            <p>
              Every LED in every circuit needs something limiting its current — usually 10–20 mA
              for the small ones. This rule has no exceptions, and the lab below lets you learn
              it the fun way (on a simulated casualty).
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Light It — or Cook It",
        intro: (
          <>
            <p>An LED, a supply and a resistor you choose. The LED can genuinely die in here.</p>
            <ul>
              <li>With a red LED on 9 V, find the resistor that gives 15 mA. Compare with the recipe readout.</li>
              <li>Now slide R down and watch the operating point climb the hockey stick… 💀</li>
              <li>Reverse the LED — the curve explains what you see.</li>
              <li>Switch to blue at low supply voltages. Why does it stay dark longer than red?</li>
            </ul>
          </>
        ),
        Component: DiodeLab,
      },
      problems: [
        {
          prompt: "A white LED (Vf = 3.2 V) should run at 10 mA from a 12 V supply. What series resistor?",
          answer: 880,
          unit: "Ω",
          hint: "R = (Vs − Vf) / I — the resistor only sees the leftover voltage.",
          explain: "(12 − 3.2)/0.010 = 880 Ω → use the standard 820 Ω or 1 kΩ.",
        },
        {
          prompt: "A red LED (Vf = 1.8 V) with a 330 Ω resistor on a 5 V rail. What current flows?",
          answer: 3.2 / 330,
          unit: "A",
          hint: "The resistor drops Vs − Vf; Ohm's law does the rest.",
          explain: "(5 − 1.8)/330 ≈ 9.7 mA — comfortably bright, comfortably safe.",
        },
        {
          prompt: "In that same circuit, how much power does the 330 Ω resistor dissipate?",
          answer: (3.2 * 3.2) / 330,
          unit: "W",
          hint: "It has 3.2 V across it: P = V²/R.",
          explain: "3.2²/330 ≈ 0.031 W — nowhere near the ¼ W rating.",
        },
      ],
      quiz: [
        {
          q: "A diode conducts when…",
          choices: [
            "It is forward-biased and the voltage across it exceeds Vf",
            "Current flows cathode → anode",
            "Any voltage at all is applied",
            "It is cooled below room temperature",
          ],
          answer: 0,
          explain:
            "Forward bias (anode positive) plus at least the forward voltage (~0.7 V silicon, 1.8–3.2 V LEDs) opens the valve.",
        },
        {
          q: "For a 9 V supply and a red LED (Vf = 1.8 V) at 15 mA, the series resistor should be about…",
          choices: ["47 Ω", "480 Ω", "4.8 kΩ", "600 Ω"],
          answer: 1,
          explain: "R = (9 − 1.8)/0.015 = 480 Ω — grab the standard 470 Ω.",
        },
        {
          q: "Which physical feature marks an LED's cathode?",
          choices: ["The longer leg", "The thicker leg", "A red dot", "The flat side / shorter leg"],
          answer: 3,
          explain: "Flat side and short leg = cathode (−). Long leg = anode (+). Worth memorising before the capstone build.",
        },
        {
          q: "Why does an LED need a resistor when a lamp doesn't?",
          choices: [
            "LEDs are more expensive",
            "Lamps run on AC only",
            "Past Vf an LED barely limits current itself — its I–V curve is nearly vertical",
            "Resistors make the light brighter",
          ],
          answer: 2,
          explain:
            "A filament's resistance limits its own current. An LED conducting past Vf is almost a short — something else must set the current.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "transistors",
      unitId: "u3",
      title: "Transistors",
      subtitle:
        "A whisper of current controlling a shout — the amplifying switch that makes every modern machine possible.",
      buildsOn: ["diodes", "ohms-law"],
      Theory: () => (
        <>
          <h2>The problem it solves</h2>
          <p>
            Suppose a sensor produces a feeble signal — microamps, far too weak to light an LED,
            let alone spin a motor. You need a component where a <em>small</em> current controls
            a <em>large</em> one. That is the <strong>transistor</strong>, invented at Bell Labs
            in 1947, and comfortably the most manufactured object in human history — you own
            trillions.
          </p>

          <h2>The BJT: two junctions, three legs</h2>
          <p>
            The classic <strong>NPN bipolar transistor</strong> is a p–n junction sandwich with
            three terminals: <strong>collector</strong>, <strong>base</strong>,{" "}
            <strong>emitter</strong>. The rule of the device:
          </p>
          <div className="formula">
            I_C ≈ β × I_B
            <span className="note">β (current gain) is typically ~100 · base–emitter behaves like a diode (0.7 V)</span>
          </div>
          <p>
            Feed a small current into the base (it costs about 0.7 V, like a diode) and the
            transistor permits β times more current to flow from collector to emitter. 50 µA in,
            5 mA controlled. The transistor doesn&rsquo;t create the big current — the supply
            provides it; the base just opens the tap.
          </p>

          <h2>Three regions, two jobs</h2>
          <ul>
            <li><strong>Cutoff</strong> — no base current, no collector current. The switch is OFF.</li>
            <li><strong>Active</strong> — I_C tracks β·I_B proportionally. This is amplifier territory: audio, radio, sensors.</li>
            <li><strong>Saturation</strong> — the base asks for more than the collector circuit can supply; the transistor is fully ON, dropping only ~0.2 V. Digital electronics lives at the two extremes: cutoff = 0, saturation = 1.</li>
          </ul>
          <p>
            To use one as a switch: collector load (LED + resistor) to the supply, emitter to
            ground, and a <strong>base resistor</strong> sized so the &ldquo;on&rdquo; signal
            drives it well into saturation — with, say, 5× the minimum base current. The base
            resistor also protects the base junction, which is a diode and would otherwise gulp
            unlimited current (Lesson 3.1&rsquo;s rule again!).
          </p>

          <div className="callout note">
            <span className="co-title">From one to a trillion</span>
            <p>
              Modern chips use MOSFETs — transistors switched by voltage on an insulated gate
              rather than base current — because they can be shrunk to nanometres and switched
              billions of times a second. A CPU is simply billions of transistor switches wired
              into logic. The chip in your next lesson contains about twenty-five of them, which
              is exactly why it&rsquo;s understandable — and why it&rsquo;s the perfect bridge.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Small Current, Big Current",
        intro: (
          <>
            <p>An NPN switch driving an LED. Watch the µA-vs-mA bars — they tell the whole story.</p>
            <ul>
              <li>Raise Vin slowly. Nothing until 0.7 V — the base is a diode.</li>
              <li>In the active region, check Ic/Ib ≈ 100 on the readout.</li>
              <li>Keep raising Vin: Ic hits a ceiling. That&rsquo;s saturation — the LED circuit is giving all it has.</li>
              <li>With Rb = 1 MΩ, can you still reach saturation? Why not?</li>
            </ul>
          </>
        ),
        Component: TransistorLab,
      },
      quiz: [
        {
          q: "A BJT with β = 100 gets 50 µA of base current (active region). Collector current?",
          choices: ["50 µA", "0.5 mA", "50 mA", "5 mA"],
          answer: 3,
          explain: "I_C = β·I_B = 100 × 50 µA = 5000 µA = 5 mA.",
        },
        {
          q: "In saturation, a transistor switch…",
          choices: [
            "Blocks all current",
            "Is fully on, dropping only ~0.2 V",
            "Amplifies proportionally",
            "Is destroyed",
          ],
          answer: 1,
          explain:
            "Saturation = fully on: the collector circuit's own resistance limits the current and the transistor drops almost nothing.",
        },
        {
          q: "Why does the base connection need a resistor?",
          choices: [
            "The base–emitter junction is a diode — without limiting, it draws destructive current",
            "To make the transistor slower",
            "To increase β",
            "Tradition",
          ],
          answer: 0,
          explain:
            "Same rule as the LED: a forward-biased junction won't limit its own current. The base resistor sets it.",
        },
        {
          q: "Digital circuits use transistors mainly in which regions?",
          choices: [
            "Active only",
            "Saturation only",
            "Cutoff and saturation — fully off and fully on",
            "None: digital chips contain no transistors",
          ],
          answer: 2,
          explain:
            "Logic wants unambiguous 0s and 1s: cutoff and saturation are the two clean, low-waste states. A CPU is billions of such switches.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "timer-555",
      unitId: "u3",
      title: "The 555 Timer",
      subtitle:
        "Twenty-five transistors, eight pins, fifty years of blinking, beeping and timing — meet the chip you'll build with.",
      buildsOn: ["capacitors", "voltage-divider", "transistors"],
      Theory: () => (
        <>
          <h2>A chip you can actually understand</h2>
          <p>
            Designed by Hans Camenzind in 1971, the <strong>555 timer</strong> is the
            best-selling chip of all time — billions made every year, half a century on. Inside
            are just ~25 transistors implementing three things you already know:
          </p>
          <ul>
            <li>
              A <strong>voltage divider</strong> — three internal 5 kΩ resistors (often said,
              a little apocryphally, to be the origin of the name) — creating two reference
              levels: ⅓ Vcc and ⅔ Vcc.
            </li>
            <li>
              Two <strong>comparators</strong> watching pins 2 and 6 against those references,
              flipping an internal memory (a flip-flop) that drives the output pin 3.
            </li>
            <li>
              A <strong>discharge transistor</strong> on pin 7 that can drain an external
              capacitor on command.
            </li>
          </ul>
          <Pinout555 />

          <h2>Astable mode: the electronic heartbeat</h2>
          <p>
            Wire R1 from Vcc to pin 7, R2 from pin 7 down to the capacitor, and the capacitor to
            ground, with pins 2 and 6 watching the capacitor. Now trace one cycle:
          </p>
          <ol>
            <li>
              <strong>Charge:</strong> output HIGH, discharge transistor off. C charges through{" "}
              <strong>R1 + R2</strong>, its voltage climbing your Lesson 2.3 curve.
            </li>
            <li>
              <strong>Trip high:</strong> C reaches ⅔ Vcc → the threshold comparator flips the
              flip-flop. Output snaps LOW, pin 7 switches on.
            </li>
            <li>
              <strong>Discharge:</strong> C drains through <strong>R2 only</strong> into pin 7,
              sliding back down the curve.
            </li>
            <li>
              <strong>Trip low:</strong> C hits ⅓ Vcc → the trigger comparator flips everything
              back. Output HIGH, and the cycle repeats — forever.
            </li>
          </ol>
          <div className="formula">
            t_high = 0.693·(R1+R2)·C · t_low = 0.693·R2·C
            <span className="note">f = 1.44 / ((R1 + 2·R2)·C) · the capacitor ping-pongs between ⅓ and ⅔ Vcc</span>
          </div>
          <p>
            Every piece of this you have already mastered: the RC curve sets the pace
            (Lesson 2.3), a divider defines the thresholds (Lesson 2.2), a transistor does the
            draining (Lesson 3.2), and Ohm&rsquo;s law picks the part values (Lesson 1.2). The
            555 just packages the loop.
          </p>
          <div className="callout tip">
            <span className="co-title">Same chip, endless tricks</span>
            <p>
              Slow it to ~1.5 Hz and you have your capstone blinker. Speed it to 440 Hz on a
              piezo and it plays an A. One-shot (&ldquo;monostable&rdquo;) wiring gives timed
              pulses — toasters, game-show buzzers, windshield-wiper delays. All from R, C and
              two thresholds.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Astable Heartbeat",
        intro: (
          <>
            <p>
              A full 555 astable on the scope: capacitor voltage in cyan ping-ponging between the
              ⅓ and ⅔ lines, output in amber, LED blinking along.
            </p>
            <ul>
              <li>Start with R1 = 1 k, R2 = 47 k, C = 10 µF — your exact capstone values. Note f ≈ 1.5 Hz.</li>
              <li>Grow C to 100 µF: ten times slower. Shrink R2: faster — but the duty cycle heads toward 100%. Grow R2 to approach 50%… why?</li>
              <li>At faster settings the sim slows the display so you can still see the shape (your eye couldn&rsquo;t).</li>
            </ul>
          </>
        ),
        Component: Timer555Lab,
      },
      problems: [
        {
          prompt: "An astable 555 with R1 = 10 kΩ, R2 = 68 kΩ, C = 1 µF. What frequency does it run at?",
          answer: 1.44 / ((10000 + 2 * 68000) * 1e-6),
          unit: "Hz",
          hint: "f = 1.44 / ((R1 + 2·R2) · C).",
          explain: "1.44/(146 000 × 10⁻⁶) ≈ 9.9 Hz.",
        },
        {
          prompt: "Same circuit: how long is each HIGH phase?",
          answer: 0.693 * 78000 * 1e-6,
          unit: "s",
          hint: "t_high = 0.693 · (R1 + R2) · C.",
          explain: "0.693 × 78 k × 1 µ ≈ 54 ms.",
        },
        {
          prompt: "Same circuit: what is the duty cycle, in percent HIGH?",
          answer: (78000 / 146000) * 100,
          unit: "%",
          hint: "duty = (R1 + R2)/(R1 + 2·R2) — charge path over full period.",
          explain: "78/146 ≈ 53.4% — always above 50% in this classic wiring.",
        },
      ],
      quiz: [
        {
          q: "In astable mode, the capacitor voltage oscillates between…",
          choices: ["0 V and Vcc", "0 V and ⅓ Vcc", "⅓ Vcc and ⅔ Vcc", "⅔ Vcc and Vcc"],
          answer: 2,
          explain:
            "The internal divider sets the two comparator thresholds at ⅓ and ⅔ of the supply; the capacitor ping-pongs between them.",
        },
        {
          q: "With R1 = 1 kΩ, R2 = 47 kΩ, C = 10 µF, the frequency f = 1.44/((R1+2R2)C) is about…",
          choices: ["0.15 Hz", "1.5 Hz", "15 Hz", "150 Hz"],
          answer: 1,
          explain: "f = 1.44/(95 000 × 10⁻⁵) = 1.44/0.95 ≈ 1.5 Hz — your blinker's heartbeat.",
        },
        {
          q: "The output of a 555 appears on pin…",
          choices: ["3", "1", "7", "8"],
          answer: 0,
          explain: "Pin 3 is OUT. (1 = GND, 8 = VCC, 7 = discharge — worth knowing cold before you build.)",
        },
        {
          q: "Why is the astable's HIGH time always longer than its LOW time?",
          choices: [
            "The chip is slow to react",
            "It isn't — LOW is longer",
            "LEDs slow the rising edge",
            "C charges through R1+R2 but discharges through R2 alone",
          ],
          answer: 3,
          explain:
            "Charging fights through both resistors; discharging only R2. More resistance = more time (τ = RC), so HIGH > LOW always.",
        },
      ],
    },
  ],
};
