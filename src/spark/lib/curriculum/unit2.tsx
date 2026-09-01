import type { UnitModule } from "./types";
import {
  KirchhoffLab,
  DividerLab,
  CapacitorLab,
  InductorLab,
} from "@/spark/components/labs/labs-unit2";

export const unit2: UnitModule = {
  unit: {
    id: "u2",
    num: 2,
    title: "Analyzing Circuits",
    blurb:
      "The conservation laws that crack any circuit, the divider trick you'll use forever, and the components that bend time.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "kirchhoff",
      unitId: "u2",
      title: "Kirchhoff's Laws",
      subtitle:
        "Two statements of pure common sense — charge doesn't vanish, energy doesn't appear — that unlock every circuit ever built.",
      buildsOn: ["series-parallel"],
      Theory: () => (
        <>
          <h2>KCL: what flows in, flows out</h2>
          <p>
            Gustav Kirchhoff (1845) wrote down the two bookkeeping rules of circuits. The{" "}
            <strong>current law (KCL)</strong> says: at any junction, the total current flowing
            in equals the total current flowing out. It has to — charge is conserved (Lesson
            0.1) and it has nowhere to pile up. If 0.8 A and 0.4 A arrive at a node, exactly
            1.2 A leaves.
          </p>
          <div className="formula">Σ I_in = Σ I_out<span className="note">at every node, at every instant</span></div>
          <p>
            You&rsquo;ve already used KCL without the name: it is why parallel branch currents
            add up (Lesson 1.5), and why the current is the same everywhere in a series loop —
            a two-wire junction has one way in, one way out.
          </p>

          <h2>KVL: the energy books must balance</h2>
          <p>
            The <strong>voltage law (KVL)</strong> says: walk around any closed loop and the
            voltage gains (through sources) exactly equal the voltage drops (across loads).
            A coulomb arriving back where it started must have the same energy it left with —
            otherwise circuits would be perpetual-motion machines.
          </p>
          <div className="formula">Σ V_rises = Σ V_drops<span className="note">around every closed loop</span></div>
          <p>
            In a 9 V loop with two resistors, the drops V₁ + V₂ always total exactly 9 V — no
            matter what the resistors are. Change them and the <em>shares</em> shift, never the
            sum. Each resistor&rsquo;s share is proportional to its resistance (V = I·R with the
            same I) — hold that thought for the next lesson.
          </p>

          <h2>Why these two laws matter so much</h2>
          <p>
            KCL and KVL plus Ohm&rsquo;s law form a complete toolkit: write KCL at the nodes,
            KVL around the loops, and you get a system of simple equations that determines every
            voltage and current in <em>any</em> resistor network, no matter how tangled. Circuit
            simulators like SPICE do exactly this, millions of equations at a time. You&rsquo;ll
            mostly use them informally — as sanity checks that make wrong answers obvious.
          </p>
          <div className="callout tip">
            <span className="co-title">Debugging superpower</span>
            <p>
              Measuring a real circuit? Voltages around a loop that don&rsquo;t sum to the supply
              mean you&rsquo;ve missed a drop — often a bad connection quietly eating volts.
              KVL turns a multimeter into a lie detector.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Conservation, Live",
        intro: (
          <>
            <p>Left: a junction obeying KCL. Right: a loop obeying KVL.</p>
            <ul>
              <li>Push I₁ and I₂ around — I₃ has no choice at all.</li>
              <li>Make R₂ ten times R₁ and watch it grab ten times the voltage — the stack always totals 9 V.</li>
              <li>Try to break either law. You can&rsquo;t. That&rsquo;s the point.</li>
            </ul>
          </>
        ),
        Component: KirchhoffLab,
      },
      quiz: [
        {
          q: "Currents of 2 A and 3 A flow into a node; one wire leaves. Its current is…",
          choices: ["1 A", "2.5 A", "6 A", "5 A"],
          answer: 3,
          explain: "KCL: in = out, so 2 + 3 = 5 A must leave.",
        },
        {
          q: "Kirchhoff's voltage law is really a statement of…",
          choices: [
            "Conservation of charge",
            "Conservation of energy",
            "Conservation of momentum",
            "Ohm's law",
          ],
          answer: 1,
          explain:
            "A charge returning to its starting point must have its starting energy — so gains around a loop equal drops. (KCL is the charge-conservation one.)",
        },
        {
          q: "In a 12 V loop, one resistor drops 7.5 V. The other drops…",
          choices: ["7.5 V", "12 V", "4.5 V", "Cannot be known"],
          answer: 2,
          explain: "KVL: drops must total the source. 12 − 7.5 = 4.5 V.",
        },
        {
          q: "You measure the drops around a real 9 V loop and get only 8.1 V total. Most likely…",
          choices: [
            "There's an unmeasured drop — e.g. a poor connection eating ~0.9 V",
            "KVL doesn't hold in real circuits",
            "The battery created extra energy",
            "Your multimeter breaks KCL",
          ],
          answer: 0,
          explain:
            "KVL always holds. Missing volts means a drop you didn't measure — corroded contacts and loose wires are classic culprits.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "voltage-divider",
      unitId: "u2",
      title: "Voltage Dividers",
      subtitle:
        "Two resistors that turn any voltage into any smaller voltage — the most-reused pattern in electronics.",
      buildsOn: ["series-parallel", "kirchhoff"],
      Theory: () => (
        <>
          <h2>Deriving it in three lines</h2>
          <p>
            Stack two resistors between a supply and ground and tap the midpoint. Series rules
            (Lesson 1.5): I = V<sub>in</sub>/(R₁+R₂). The output is just R₂&rsquo;s share:
            V<sub>out</sub> = I·R₂. Substitute:
          </p>
          <div className="formula">
            V_out = V_in × R₂ / (R₁ + R₂)
            <span className="note">equal resistors → exactly half · bigger R₂ → bigger share</span>
          </div>
          <p>
            The ratio is everything, the absolute values secondary: 1 k/1 k divides exactly like
            100 k/100 k (the difference is how much current the divider itself wastes — larger
            values sip, smaller values gulp but are stiffer under load).
          </p>

          <h2>Where you&rsquo;ll meet it</h2>
          <ul>
            <li>
              <strong>Sensors:</strong> swap R₂ for a thermistor or photoresistor and
              V<sub>out</sub> becomes a voltage that tracks temperature or light — this is how
              microcontrollers read the analog world.
            </li>
            <li>
              <strong>Volume knobs:</strong> a <strong>potentiometer</strong> is a resistor with
              a sliding tap — a divider whose ratio you turn. Audio has ridden on this for a
              century.
            </li>
            <li>
              <strong>Level shifting:</strong> feeding a 5 V signal to a 3.3 V input? A divider
              scales it down. Reference voltages, biasing — dividers everywhere.
            </li>
          </ul>

          <h2>The loading trap</h2>
          <p>
            The formula assumes nothing is connected to the output. Attach a load and it sits{" "}
            <em>in parallel with R₂</em>, lowering the effective bottom resistance — and the
            output sags. Rule of thumb: keep the load at least 10× R₂, or account for the
            parallel combination explicitly.
          </p>
          <div className="callout warn">
            <span className="co-title">Dividers set voltages, they don&rsquo;t supply power</span>
            <p>
              Never try to power a motor or bright LED &ldquo;at 4.5 V&rdquo; from a divider —
              the load collapses the ratio and the resistors burn your energy as heat. For
              signals and references, dividers; for power, regulators (a great advanced-unit
              topic).
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Ratio Machine",
        intro: (
          <>
            <p>A live divider with an optional 10 kΩ load on its output.</p>
            <ul>
              <li>Set R₁ = R₂ and confirm the output is exactly half of any input.</li>
              <li>Attach the load with R₂ = 10 k — watch the sag. Now set R₁, R₂ = 1 k. Stiffer?</li>
              <li>Switch to potentiometer mode and ride the wiper from 0 to 100%.</li>
            </ul>
          </>
        ),
        Component: DividerLab,
      },
      problems: [
        {
          prompt: "Vin = 9 V, R₁ = 4.7 kΩ (top), R₂ = 10 kΩ (bottom). What is Vout?",
          answer: (9 * 10000) / 14700,
          unit: "V",
          hint: "Vout = Vin · R₂ / (R₁ + R₂).",
          explain: "9 × 10k/14.7k ≈ 6.12 V — R₂'s share of the stack.",
        },
        {
          prompt: "You need 3.3 V from a 5 V rail. R₁ (top) is 10 kΩ — what must R₂ be?",
          answer: (10000 * 3.3) / 1.7,
          unit: "Ω",
          hint: "Rearrange the divider: R₂ = R₁ · Vout / (Vin − Vout).",
          explain: "R₂ = 10k · 3.3/1.7 ≈ 19.4 kΩ (grab a 20 kΩ, or 18 k + 1.5 k).",
        },
        {
          prompt: "A 10 kΩ pot sits across 12 V with the wiper 35% of the way up from the bottom. Wiper voltage?",
          answer: 4.2,
          unit: "V",
          hint: "A pot is a divider whose ratio is the wiper position.",
          explain: "12 × 0.35 = 4.2 V — the track above and below the wiper are R₁ and R₂.",
        },
      ],
      quiz: [
        {
          q: "Vin = 9 V, R₁ = 10 kΩ (top), R₂ = 10 kΩ (bottom). Vout is…",
          choices: ["4.5 V", "6 V", "9 V", "3 V"],
          answer: 0,
          explain: "Equal resistors split evenly: 9 × 10k/(10k+10k) = 4.5 V.",
        },
        {
          q: "To get a LARGER Vout from the same Vin you should…",
          choices: [
            "Increase R₁ relative to R₂",
            "Increase R₂ relative to R₁",
            "Increase both equally",
            "Decrease Vin",
          ],
          answer: 1,
          explain: "Vout follows R₂'s share of the total: grow R₂ (or shrink R₁) and the output rises.",
        },
        {
          q: "A potentiometer is best described as…",
          choices: [
            "A variable capacitor",
            "A current amplifier",
            "A type of battery",
            "A voltage divider with a movable tap",
          ],
          answer: 3,
          explain:
            "The wiper slides along a resistive track, continuously re-splitting it into R₁ and R₂.",
        },
        {
          q: "You attach a small speaker to a divider output and the voltage collapses. Why?",
          choices: [
            "The speaker generates negative voltage",
            "Dividers only work with LEDs",
            "The speaker's low resistance sits in parallel with R₂, wrecking the ratio",
            "KVL stops applying",
          ],
          answer: 2,
          explain:
            "A low-resistance load in parallel with R₂ makes the effective bottom leg tiny — the divider was never a power supply.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "capacitors",
      unitId: "u2",
      title: "Capacitors & the RC Time Constant",
      subtitle:
        "A component that stores charge and, paired with a resistor, tells time. This lesson powers your final build's heartbeat.",
      buildsOn: ["charge", "voltage", "ohms-law"],
      Theory: () => (
        <>
          <h2>A bucket for charge</h2>
          <p>
            A <strong>capacitor</strong> is two conducting plates separated by an insulator. Push
            current in and charge piles onto one plate while the other is drained, building a
            voltage across the gap — Lesson 0.2&rsquo;s charged plates, now as a component. How
            much charge it holds per volt is its <strong>capacitance</strong>:
          </p>
          <div className="formula">Q = C × V<span className="note">farads = coulombs per volt · practical parts: pF, nF, µF</span></div>
          <p>
            One farad is enormous; real circuits use microfarads and smaller. Two habits to build
            now: electrolytic capacitors (the little cans, µF range) are <strong>polarized</strong>{" "}
            — the striped leg must go to the lower voltage or they can fail dramatically. And
            big charged capacitors keep their charge after power-off; treat them with respect.
          </p>

          <h2>Charging through a resistor: the exponential</h2>
          <p>
            Feed a capacitor through a resistor and it can&rsquo;t fill instantly: the fuller it
            gets, the smaller the remaining voltage across R, the smaller the current refilling
            it. The result is the most famous curve in electronics — fast at first, ever slower,
            never quite arriving:
          </p>
          <div className="formula">
            V(t) = V_s (1 − e^(−t/RC)) &nbsp;·&nbsp; τ = R × C
            <span className="note">τ in seconds when R in ohms, C in farads</span>
          </div>
          <table>
            <thead>
              <tr><th>elapsed</th><th>charged to</th></tr>
            </thead>
            <tbody>
              <tr><td>1τ</td><td>63%</td></tr>
              <tr><td>2τ</td><td>86%</td></tr>
              <tr><td>3τ</td><td>95%</td></tr>
              <tr><td>5τ</td><td>≈ 99% — call it done</td></tr>
            </tbody>
          </table>
          <p>
            The shape is universal. 1 kΩ × 100 µF gives τ = 0.1 s; 10 kΩ × 100 µF gives 1 s —
            same curve, different clock speed. Discharging mirrors it: down to 37% after one τ.
          </p>

          <h2>What capacitors are for</h2>
          <ul>
            <li><strong>Timing:</strong> charge to a threshold, trigger something, repeat — this is precisely how your 555 blinker will tick.</li>
            <li><strong>Smoothing:</strong> a capacitor across a supply is a reservoir that fills the dips — every power supply has them.</li>
            <li><strong>Blocking DC:</strong> once charged, no steady current flows through — but wiggles pass. Audio circuits couple stages this way.</li>
            <li><strong>Energy storage:</strong> camera flashes dump a capacitor in a millisecond — power no small battery could deliver.</li>
          </ul>
        </>
      ),
      lab: {
        title: "The Universal Curve",
        intro: (
          <>
            <p>An RC circuit on a live oscilloscope. The time axis re-scales to whatever τ you dial in.</p>
            <ul>
              <li>Watch one full charge. Confirm it crosses the 63% line after one grid division (1τ).</li>
              <li>Flip to discharge mid-curve — the capacitor doesn&rsquo;t care, it just heads for its new target.</li>
              <li>Change R and C wildly: the axis labels change, the shape never does.</li>
            </ul>
          </>
        ),
        Component: CapacitorLab,
      },
      problems: [
        {
          prompt: "R = 10 kΩ charges C = 47 µF. What is the time constant τ?",
          answer: 0.47,
          unit: "s",
          hint: "τ = R · C, ohms times farads gives seconds.",
          explain: "10 000 × 47×10⁻⁶ = 0.47 s.",
        },
        {
          prompt: "Same circuit: after how long is the capacitor essentially full (the 5τ rule)?",
          answer: 2.35,
          unit: "s",
          hint: "Five time constants ≈ 99%.",
          explain: "5 × 0.47 = 2.35 s.",
        },
        {
          prompt: "A capacitor charges toward 12 V. What voltage has it reached at exactly t = τ?",
          answer: 12 * (1 - Math.exp(-1)),
          unit: "V",
          hint: "One τ = 63.2% of the way there.",
          explain: "12 × 0.632 ≈ 7.59 V — the landmark every RC circuit shares.",
        },
      ],
      quiz: [
        {
          q: "τ for R = 1 kΩ and C = 100 µF is…",
          choices: ["0.1 ms", "10 ms", "10 s", "0.1 s"],
          answer: 3,
          explain: "τ = RC = 1000 × 0.0001 = 0.1 seconds.",
        },
        {
          q: "After one time constant of charging, the capacitor has reached about…",
          choices: ["37%", "50%", "63%", "99%"],
          answer: 2,
          explain: "1 − e⁻¹ ≈ 0.632. The 63% figure is the working engineer's landmark.",
        },
        {
          q: "A fully charged capacitor in a DC circuit carries how much steady current?",
          choices: ["Maximum current", "Essentially none", "Half the initial current", "It depends on its colour"],
          answer: 1,
          explain:
            "Once charged to the source voltage there's no voltage difference left to drive current — capacitors block steady DC.",
        },
        {
          q: "Your timer runs too fast. Using τ = RC, you could slow it by…",
          choices: [
            "Increasing C (or R)",
            "Decreasing R",
            "Decreasing C",
            "Removing the resistor",
          ],
          answer: 0,
          explain: "Bigger R or C → bigger τ → slower timing. (You'll do exactly this to your blinker.)",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "inductors",
      unitId: "u2",
      title: "Inductors & Electromagnetism",
      subtitle:
        "Coils store energy in magnetic fields, hate changes in current, and bite when interrupted. Also: how motors happen.",
      buildsOn: ["current", "capacitors"],
      Theory: () => (
        <>
          <h2>Every current makes a magnet</h2>
          <p>
            In 1820 Ørsted noticed a compass twitch beside a current-carrying wire: moving
            charge creates a <strong>magnetic field</strong>. Wind the wire into a coil and the
            field concentrates — an <strong>electromagnet</strong>, strengthened by more turns,
            more current, or an iron core. This is half of the deepest link in physics
            (electricity ⇄ magnetism), and the other half is just as good: a <em>changing</em>{" "}
            magnetic field pushes charges — <strong>induction</strong>. Generators spin coils
            near magnets to make electricity; motors run the trick backwards; transformers pass
            power between coils with no moving parts at all.
          </p>

          <h2>The inductor: inertia for current</h2>
          <p>
            A coil used as a component is an <strong>inductor</strong>. Its magnetic field
            stores energy, and that field resists being changed — so an inductor resists{" "}
            <em>changes in current</em>, the perfect mirror of the capacitor resisting changes
            in voltage:
          </p>
          <div className="formula">
            V = L × dI/dt &nbsp;·&nbsp; τ = L / R
            <span className="note">L in henries · energy stored: ½ L I²</span>
          </div>
          <p>
            Close a switch on an RL circuit and the current doesn&rsquo;t jump — it ramps along
            the same exponential curve you met last lesson, reaching 63% of V/R after one
            τ = L/R. Steady current eventually flows as if the inductor were plain wire.
          </p>

          <h2>The inductive kick</h2>
          <p>
            Now open the switch. The current must stop almost instantly — so dI/dt is huge, and
            V = L·dI/dt means the coil generates a <em>huge</em> voltage spike (hundreds of
            volts from a 9 V circuit) trying to keep its current flowing. The spike arcs across
            switch contacts and kills transistors. The standard cure is beautifully simple: a{" "}
            <strong>flyback diode</strong> across the coil gives the current a safe loop to
            decay through, clamping the spike to under a volt. Every relay and motor-driver
            schematic you ever see will have one — now you know why.
          </p>
          <div className="callout note">
            <span className="co-title">Where this goes next</span>
            <p>
              Inductors + capacitors together make resonant circuits — the tuned heart of every
              radio. And induction at grid scale is why mains power is AC: transformers only
              work with changing current. The advanced course picks this thread up directly in
              Unit 5.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Ramp Up, Kick Back",
        intro: (
          <>
            <p>An RL circuit on the scope: current in amber, coil voltage in cyan.</p>
            <ul>
              <li>Close the switch and watch current ramp — 63% of V/R after one division.</li>
              <li>Open the switch with no diode. Read the spike meter. From a 9 V battery!</li>
              <li>Fit the flyback diode and open it again — gentle decay, clamped voltage.</li>
            </ul>
          </>
        ),
        Component: InductorLab,
      },
      quiz: [
        {
          q: "An inductor most strongly resists…",
          choices: [
            "Changes in current",
            "Steady current",
            "Changes in voltage",
            "Being near capacitors",
          ],
          answer: 0,
          explain:
            "V = L·dI/dt: voltage appears only when current *changes*. Steady current sails through.",
        },
        {
          q: "The RL time constant is…",
          choices: ["τ = L × R", "τ = L / R", "τ = R / L", "τ = 1 / (LR)"],
          answer: 1,
          explain: "τ = L/R — e.g. 0.1 H over 100 Ω gives 1 ms.",
        },
        {
          q: "Why does opening a switch on a coil make a big voltage spike?",
          choices: [
            "The battery voltage doubles",
            "The coil short-circuits",
            "Interrupting current means an enormous dI/dt, and V = L·dI/dt",
            "Magnetic fields attract sparks",
          ],
          answer: 2,
          explain:
            "The collapsing field forces the current to continue somewhere; with no path, the voltage rises until something (an arc) gives way.",
        },
        {
          q: "A flyback diode across a relay coil…",
          choices: [
            "Speeds up the relay",
            "Blocks the relay from turning on",
            "Increases the coil's inductance",
            "Gives the interrupted current a safe path, clamping the spike",
          ],
          answer: 3,
          explain:
            "When the switch opens, current freewheels through the diode and decays gently instead of arcing — cheap insurance fitted to every coil you'll ever drive.",
        },
      ],
    },
  ],
};
