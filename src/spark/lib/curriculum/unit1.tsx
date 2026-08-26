import type { UnitModule } from "./types";
import {
  FirstCircuitLab,
  OhmsLawLab,
  ResistorCodeLab,
  PowerLab,
  SeriesParallelLab,
} from "@/spark/components/labs/labs-unit1";

const WIRE = "#94a3b3";

export function SymbolLegend() {
  return (
    <div className="diagram">
      <svg viewBox="0 0 720 130" width="720" height="130" role="img" aria-label="Common schematic symbols">
        <g stroke={WIRE} strokeWidth="2" fill="none">
          {/* battery */}
          <g transform="translate(30,30)">
            <line x1="0" y1="20" x2="24" y2="20" />
            <line x1="24" y1="4" x2="24" y2="36" />
            <line x1="34" y1="12" x2="34" y2="28" strokeWidth="5" />
            <line x1="34" y1="20" x2="58" y2="20" />
          </g>
          {/* resistor */}
          <g transform="translate(150,30)">
            <polyline points="0,20 12,20 17,8 27,32 37,8 47,32 57,8 62,20 74,20" />
          </g>
          {/* switch */}
          <g transform="translate(270,30)">
            <line x1="0" y1="20" x2="18" y2="20" />
            <circle cx="21" cy="20" r="3" fill={WIRE} />
            <line x1="21" y1="20" x2="48" y2="2" />
            <circle cx="52" cy="20" r="3" fill={WIRE} />
            <line x1="55" y1="20" x2="74" y2="20" />
          </g>
          {/* lamp */}
          <g transform="translate(390,30)">
            <line x1="0" y1="20" x2="18" y2="20" />
            <circle cx="37" cy="20" r="18" />
            <line x1="25" y1="8" x2="49" y2="32" />
            <line x1="49" y1="8" x2="25" y2="32" />
            <line x1="55" y1="20" x2="74" y2="20" />
          </g>
          {/* LED */}
          <g transform="translate(510,30)">
            <line x1="0" y1="20" x2="20" y2="20" />
            <polygon points="20,6 20,34 44,20" fill={WIRE} />
            <line x1="44" y1="6" x2="44" y2="34" />
            <line x1="44" y1="20" x2="64" y2="20" />
            <line x1="34" y1="0" x2="44" y2="-8" />
            <line x1="42" y1="4" x2="52" y2="-4" />
          </g>
          {/* ground */}
          <g transform="translate(646,30)">
            <line x1="20" y1="8" x2="20" y2="22" />
            <line x1="6" y1="22" x2="34" y2="22" />
            <line x1="11" y1="28" x2="29" y2="28" />
            <line x1="16" y1="34" x2="24" y2="34" />
          </g>
        </g>
        <g fill="#8fa0b3" fontSize="12" textAnchor="middle" fontFamily="sans-serif">
          <text x="59" y="95">battery</text>
          <text x="187" y="95">resistor</text>
          <text x="307" y="95">switch</text>
          <text x="427" y="95">lamp</text>
          <text x="542" y="95">LED</text>
          <text x="666" y="95">ground</text>
        </g>
      </svg>
      <div className="caption">The schematic symbols you&rsquo;ll meet throughout this course.</div>
    </div>
  );
}

export const unit1: UnitModule = {
  unit: {
    id: "u1",
    num: 1,
    title: "Circuits & Ohm's Law",
    blurb:
      "Closed loops, the law that governs them, and the components that put electricity to work.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "first-circuit",
      unitId: "u1",
      title: "Your First Circuit",
      subtitle:
        "A battery, a lamp and a loop of wire — plus the two classic ways to get it wrong.",
      buildsOn: ["current"],
      Theory: () => (
        <>
          <h2>The loop is everything</h2>
          <p>
            An electric <strong>circuit</strong> is exactly what the word says: a closed circle.
            Charge leaves the battery&rsquo;s + terminal (following convention from last lesson),
            travels through wires and components, and returns to the − terminal, where the
            battery pumps it back up to full energy and sends it around again. Every useful
            circuit has at least a <strong>source</strong> (something that supplies energy — a
            battery here) and a <strong>load</strong> (something that usefully spends it — a
            lamp, a motor, a chip).
          </p>
          <p>
            Because the loop is completely full of charge, the flow everywhere in a simple loop
            is the same — you can&rsquo;t have more current entering the lamp than leaving it,
            any more than a circle of marbles can bunch up. Break the loop at <em>any</em> point
            and the current stops <em>everywhere</em>, instantly. That is all a switch is: a
            deliberate, re-closable break.
          </p>

          <h2>Reading schematics</h2>
          <p>
            Engineers draw circuits with standard symbols connected by lines (the lines are
            ideal wires — zero resistance, just connections). The physical layout on your desk
            can look completely different from the drawing; what matters is only{" "}
            <em>what connects to what</em>. Here are the symbols you&rsquo;ll need:
          </p>
          <SymbolLegend />

          <h2>The two failure modes</h2>
          <p>
            <strong>Open circuit:</strong> the loop is broken — a switch is off, a wire came
            loose, a bulb filament snapped. Current: zero. Nothing happens. Annoying, but safe.
          </p>
          <p>
            <strong>Short circuit:</strong> the opposite and far more dramatic failure. If a
            stray wire connects the battery&rsquo;s terminals <em>without</em> passing through a
            load, almost nothing limits the flow. The current is held back only by the
            battery&rsquo;s tiny internal resistance, so it becomes enormous — the wire and the
            battery heat up fast, and things can melt or catch fire. The word &ldquo;short&rdquo;
            literally means the current found a shorter path than the one you built for it.
          </p>
          <div className="callout warn">
            <span className="co-title">Respect the short circuit</span>
            <p>
              Never connect a wire directly across a battery&rsquo;s terminals. Even a small 9 V
              battery will get hot enough to burn you; larger batteries (and especially lithium
              cells) can be genuinely dangerous. This is also why buildings have fuses and
              circuit breakers — they are automatic switches that open the loop when the current
              gets suspiciously large.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Break It, Fix It, Abuse It",
        intro: (
          <>
            <p>A 9 V battery, a switch and a 90 Ω lamp in one loop.</p>
            <ul>
              <li>Click the switch (or use the buttons) to open and close the loop. Watch every dot stop at once.</li>
              <li>Try the short circuit. Compare the current with and without the lamp in the path — 0.1 A versus 18 A!</li>
              <li>Notice the lamp goes dark when shorted: the current takes the easy path around it.</li>
            </ul>
          </>
        ),
        Component: FirstCircuitLab,
      },
      quiz: [
        {
          q: "Why does opening a switch anywhere in a loop stop the current everywhere?",
          choices: [
            "Electrons are afraid of gaps",
            "Charge can't pile up or vanish — flow in a loop is continuous, so one break halts it all",
            "The switch absorbs all the electrons",
            "It doesn't — current keeps flowing on the battery side",
          ],
          answer: 1,
          explain:
            "A circuit is like a ring of marbles: none can move unless all move. A break anywhere stops the whole loop.",
        },
        {
          q: "What makes a short circuit dangerous?",
          choices: [
            "The voltage becomes very high",
            "Electrons leak out of the wire",
            "With no load, almost nothing limits the current, so it becomes huge and things overheat",
            "The battery reverses polarity",
          ],
          answer: 2,
          explain:
            "The load normally limits current. Bypass it and only the battery's tiny internal resistance remains — the current becomes enormous and turns into heat.",
        },
        {
          q: "In a schematic, the lines between symbols represent…",
          choices: [
            "The exact physical position of wires",
            "Ideal connections — what connects to what, with zero resistance",
            "The direction electrons must take",
            "Insulated tubes",
          ],
          answer: 1,
          explain:
            "Schematics show connectivity, not geometry. A schematic wire is an ideal conductor: same voltage at both ends.",
        },
        {
          q: "Every useful circuit needs at least…",
          choices: [
            "A source of energy and a load that uses it, in a closed loop",
            "A switch and a fuse",
            "Two batteries",
            "A lamp",
          ],
          answer: 0,
          explain:
            "Source + load + closed path: the source gives each coulomb energy, the load spends it doing something useful.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "ohms-law",
      unitId: "u1",
      title: "Ohm's Law",
      subtitle:
        "The single most useful equation in electronics: how voltage, current and resistance bind each other.",
      buildsOn: ["voltage", "current", "first-circuit"],
      Theory: () => (
        <>
          <h2>Resistance: friction for charge</h2>
          <p>
            As electrons drift through a material they constantly collide with its atoms, giving
            up energy as heat. How much a component impedes flow is its{" "}
            <strong>resistance</strong>, measured in <strong>ohms (Ω)</strong>. Thin wires resist
            more than thick ones, long more than short, and some materials vastly more than
            others — that&rsquo;s why we build heaters out of nichrome and wires out of copper.
          </p>

          <h2>The law</h2>
          <p>
            In 1827 Georg Ohm found that for most conductors, the current is simply proportional
            to the voltage pushing it. Double the push, double the flow. The constant between
            them is the resistance:
          </p>
          <div className="formula">
            V = I × R
            <span className="note">volts = amps × ohms · also I = V/R and R = V/I</span>
          </div>
          <p>
            This one line answers three everyday questions. <em>How much current will flow?</em>{" "}
            I&nbsp;=&nbsp;V/R. <em>What resistor do I need to get a wanted current?</em>{" "}
            R&nbsp;=&nbsp;V/I. <em>What voltage appears across this part?</em> V&nbsp;=&nbsp;I·R.
            You will use it in literally every lesson from here on.
          </p>

          <h3>Worked examples</h3>
          <ul>
            <li>
              A 9 V battery across a 450 Ω resistor: I = 9 / 450 = <strong>0.02 A = 20 mA</strong>.
            </li>
            <li>
              You want 15 mA to flow from a 5 V supply: R = 5 / 0.015 ≈ <strong>333 Ω</strong>{" "}
              (you&rsquo;d grab the standard 330 Ω part).
            </li>
            <li>
              2 A flows through a car headlight on a 12 V battery: the filament&rsquo;s hot
              resistance is R = 12 / 2 = <strong>6 Ω</strong>.
            </li>
          </ul>

          <div className="callout tip">
            <span className="co-title">Intuition anchor</span>
            <p>
              Voltage is the push, resistance is the squeeze, current is the result. More push →
              more flow. More squeeze → less flow. If you remember nothing else from this course,
              remember V&nbsp;=&nbsp;I·R.
            </p>
          </div>

          <h2>Ohmic and non-ohmic</h2>
          <p>
            Components that obey V = I·R with a constant R are called <em>ohmic</em> — resistors
            and wires behave this way. Plenty of interesting parts do <em>not</em>: a lamp
            filament&rsquo;s resistance rises as it heats, and diodes and LEDs (Unit 3) barely
            conduct at all until the voltage crosses a threshold, then conduct furiously. Ohm's
            law still applies to every resistor <em>in</em> those circuits — it just doesn&rsquo;t
            describe the exotic parts themselves.
          </p>
        </>
      ),
      lab: {
        title: "The V–I–R Machine",
        intro: (
          <>
            <p>One loop, two knobs, one law.</p>
            <ul>
              <li>Hold R constant and sweep V: current tracks it in perfect proportion.</li>
              <li>Hold V at 9 V and sweep R across three decades — watch the current dive.</li>
              <li>Find settings that give exactly 20 mA. There is more than one way!</li>
            </ul>
          </>
        ),
        Component: OhmsLawLab,
      },
      problems: [
        {
          prompt: "A 12 V supply drives a 2.2 kΩ resistor. What current flows?",
          answer: 12 / 2200,
          unit: "A",
          hint: "I = V / R — and remember the answer will be in milliamps.",
          explain: "I = 12 / 2200 = 5.45 mA.",
        },
        {
          prompt: "You want 25 mA to flow from a 9 V battery through a test load. What resistance do you need?",
          answer: 360,
          unit: "Ω",
          hint: "R = V / I, with the current in amps (25 mA = 0.025 A).",
          explain: "R = 9 / 0.025 = 360 Ω.",
        },
        {
          prompt: "A cheap charging cable has 0.4 Ω of round-trip resistance and carries 2 A. How much voltage is lost in the cable itself?",
          answer: 0.8,
          unit: "V",
          hint: "The cable is just a resistor: V = I · R.",
          explain: "V = 2 × 0.4 = 0.8 V — nearly a fifth of a 5 V supply, gone in the wire. This is why cable quality matters.",
        },
      ],
      quiz: [
        {
          q: "A 9 V battery is connected across 450 Ω. What current flows?",
          choices: ["50 mA", "20 mA", "2 A", "0.5 A"],
          answer: 1,
          explain: "I = V/R = 9/450 = 0.02 A = 20 mA.",
        },
        {
          q: "You measure 0.5 A through a component with 6 V across it. Its resistance is…",
          choices: ["3 Ω", "12 Ω", "0.083 Ω", "30 Ω"],
          answer: 1,
          explain: "R = V/I = 6/0.5 = 12 Ω.",
        },
        {
          q: "At a fixed voltage, doubling the resistance…",
          choices: ["Doubles the current", "Halves the current", "Halves the voltage", "Has no effect"],
          answer: 1,
          explain: "I = V/R: with V fixed, R doubling means I halves.",
        },
        {
          q: "You need about 15 mA from a 5 V supply. Which standard resistor is closest to right?",
          choices: ["33 Ω", "330 Ω", "3.3 kΩ", "33 kΩ"],
          answer: 1,
          explain: "R = V/I = 5/0.015 ≈ 333 Ω → the standard 330 Ω value.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "resistors",
      unitId: "u1",
      title: "Resistors in Practice",
      subtitle:
        "The humble striped cylinder: why circuits are full of them, and how to read their colour code at a glance.",
      buildsOn: ["ohms-law"],
      Theory: () => (
        <>
          <h2>Why deliberately resist?</h2>
          <p>
            It sounds odd to buy a component whose whole job is to impede current — but{" "}
            <strong>resistors are how you tell a circuit how much current to use</strong>. They
            protect delicate parts (an LED without its resistor dies in a blink — you&rsquo;ll
            prove this in Unit 3), set voltage levels, control timing, and convert current into
            measurable voltages. A typical circuit board carries dozens.
          </p>

          <h2>The colour code</h2>
          <p>
            Common resistors are too small to print numbers on, so since the 1920s they&rsquo;ve
            worn coloured bands. On a 4-band resistor: the first two bands are digits, the third
            multiplies by a power of ten, and the fourth states the tolerance.
          </p>
          <table>
            <thead>
              <tr>
                <th>Colour</th>
                <th>Digit</th>
                <th>Multiplier</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><span className="color-chip" style={{ background: "#1c1c1c" }} />Black</td><td>0</td><td>×1</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#7a4a21" }} />Brown</td><td>1</td><td>×10</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#d94040" }} />Red</td><td>2</td><td>×100</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#ef8420" }} />Orange</td><td>3</td><td>×1 k</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#e8cf3a" }} />Yellow</td><td>4</td><td>×10 k</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#3fae4c" }} />Green</td><td>5</td><td>×100 k</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#3f6fdb" }} />Blue</td><td>6</td><td>×1 M</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#8e4ae0" }} />Violet</td><td>7</td><td>—</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#999" }} />Grey</td><td>8</td><td>—</td></tr>
              <tr><td><span className="color-chip" style={{ background: "#f2f2f2" }} />White</td><td>9</td><td>—</td></tr>
            </tbody>
          </table>
          <p>
            Tolerance band: <span className="color-chip" style={{ background: "#cfa53a" }} />
            gold = ±5%, <span className="color-chip" style={{ background: "#c0c0c0" }} />
            silver = ±10%, brown = ±1%. Example:{" "}
            <strong>yellow–violet–red–gold</strong> reads 4, 7, ×100 → <strong>4.7 kΩ ±5%</strong>.
            That exact resistor appears in your final build.
          </p>

          <h2>Why the weird values?</h2>
          <p>
            Resistors come in standard series like <strong>E12</strong>: 10, 12, 15, 18, 22, 27,
            33, 39, 47, 56, 68, 82 (then ×10, ×100, …). The numbers look random but are spaced
            evenly in <em>ratio</em> (each ≈ 1.21× the last), so that with ±10% tolerance the
            ranges tile the number line with no gaps. You never need exactly 500 Ω — the 470 Ω
            or 560 Ω bin has you covered.
          </p>

          <div className="callout note">
            <span className="co-title">Power rating</span>
            <p>
              Besides its resistance, a resistor has a maximum power it can dissipate without
              cooking — the common little ones are rated <strong>¼ W</strong>. What that means
              and how to check it is exactly the next lesson.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Colour-Code Decoder & Trainer",
        intro: (
          <>
            <p>Build any resistor from its bands — or decode a random one.</p>
            <ul>
              <li>Set yellow–violet–red–gold and confirm you get 4.7 kΩ ±5%.</li>
              <li>Make 1 kΩ, 330 Ω and 47 kΩ — the three other values in your final build.</li>
              <li>Hit 🎲 and decode the mystery resistor before revealing.</li>
            </ul>
          </>
        ),
        Component: ResistorCodeLab,
      },
      quiz: [
        {
          q: "Brown–black–red–gold is…",
          choices: ["100 Ω ±5%", "1 kΩ ±5%", "10 kΩ ±5%", "1.2 kΩ ±10%"],
          answer: 1,
          explain: "Digits 1 and 0 → 10, red multiplier ×100 → 1000 Ω = 1 kΩ; gold = ±5%.",
        },
        {
          q: "Orange–orange–brown reads…",
          choices: ["33 Ω", "330 Ω", "3.3 kΩ", "303 Ω"],
          answer: 1,
          explain: "3 and 3 → 33, brown ×10 → 330 Ω. This is the classic LED resistor value.",
        },
        {
          q: "A gold tolerance band means the true value is within…",
          choices: ["±1%", "±5%", "±10%", "±20%"],
          answer: 1,
          explain: "Gold = ±5%. Silver = ±10%, brown = ±1%.",
        },
        {
          q: "Why do standard resistors come in odd values like 4.7 k instead of a round 5 k?",
          choices: [
            "Manufacturing can't hit round numbers",
            "E-series values are spaced by equal ratios so tolerance ranges tile without gaps",
            "Tradition from the vacuum-tube era",
            "Round values are patented",
          ],
          answer: 1,
          explain:
            "Each E12 value is ~21% above the last, so ±10% parts cover the whole range seamlessly — a beautifully practical piece of engineering.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "power",
      unitId: "u1",
      title: "Power & Energy",
      subtitle:
        "Watts, joules, kilowatt-hours — where the energy goes, how fast it goes, and why components have ratings.",
      buildsOn: ["voltage", "current", "ohms-law"],
      Theory: () => (
        <>
          <h2>Power is the rate of energy flow</h2>
          <p>
            Put the last lessons together. Voltage is joules per coulomb; current is coulombs per
            second. Multiply them and the coulombs cancel — leaving{" "}
            <strong>joules per second</strong>, which is <strong>watts</strong>: the rate at
            which electrical energy is being converted into light, heat or motion.
          </p>
          <div className="formula">
            P = V × I
            <span className="note">watts = volts × amps · with Ohm&rsquo;s law: P = I²R = V²/R</span>
          </div>
          <p>
            The two derived forms come free by substituting V=IR or I=V/R, and each has its
            moment: P&nbsp;=&nbsp;I²R when you know the current through a part,
            P&nbsp;=&nbsp;V²/R when you know the voltage across it. Sense of scale: an LED runs
            at ~0.04 W, a phone charger ~10 W, a bright old-style bulb 60 W, a kettle 2000 W.
          </p>

          <h2>Energy is power × time — and it costs money</h2>
          <p>
            Your electricity meter counts energy in <strong>kilowatt-hours</strong>: one kWh is
            1000 W flowing for one hour (3.6 million joules). At a typical $0.30/kWh, a 60 W bulb
            burning 4 hours a day costs about $2.20 a month, while an LED bulb doing the same job
            at 8 W costs $0.29. Multiply by every lamp in a country and you see why lighting
            technology mattered so much.
          </p>

          <h2>Ratings: why parts burn</h2>
          <p>
            Every real component can only shed heat so fast. A standard small resistor is rated{" "}
            <strong>¼ watt</strong> — ask it to dissipate more and it cooks, drifts, smokes, and
            eventually opens. Checking is a one-liner with P = V²/R. Put 330 Ω straight across
            9 V: P = 81/330 ≈ 0.245 W — that is 98% of the rating, technically survivable but
            bad practice. The same resistor across 12 V: 0.44 W — it will burn. This tiny
            calculation is a professional habit worth building now.
          </p>
          <div className="callout tip">
            <span className="co-title">Rule of thumb</span>
            <p>
              Keep parts below about half their rated power for a long, cool life. If the math
              says more, use a higher-value resistor, a beefier part, or rethink the circuit.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Watts, Heat & the Bill",
        intro: (
          <>
            <p>Left: a bulb whose brightness is pure P = V×I. Right: a ¼ W resistor being heat-checked at your chosen voltage.</p>
            <ul>
              <li>Find three different V–I combinations that give exactly 6 W.</li>
              <li>Put 330 Ω across 9 V and read the rating bar — then try 12 V. 🔥</li>
              <li>Set your local electricity price and see the bulb&rsquo;s monthly cost.</li>
            </ul>
          </>
        ),
        Component: PowerLab,
      },
      problems: [
        {
          prompt: "A motor draws 1.5 A from a 12 V battery. How much power is it taking?",
          answer: 18,
          unit: "W",
          hint: "P = V · I.",
          explain: "P = 12 × 1.5 = 18 W.",
        },
        {
          prompt: "A 470 Ω resistor is connected straight across a 9 V rail. How much power must it dissipate?",
          answer: 81 / 470,
          unit: "W",
          hint: "You know the voltage across it: P = V² / R.",
          explain: "P = 81 / 470 ≈ 0.172 W — that's 69% of a ¼ W rating: warm but survivable.",
        },
        {
          prompt: "A 40 W soldering iron runs for 2.5 hours. How much energy did it use, in watt-hours?",
          answer: 100,
          unit: "Wh",
          hint: "Energy = power × time. Watts × hours gives watt-hours directly.",
          explain: "40 W × 2.5 h = 100 Wh = 0.1 kWh — about three cents of electricity.",
        },
      ],
      quiz: [
        {
          q: "A component drops 5 V while 2 A flows through it. Its power dissipation is…",
          choices: ["2.5 W", "7 W", "10 W", "3 W"],
          answer: 2,
          explain: "P = V × I = 5 × 2 = 10 W.",
        },
        {
          q: "Which formula gives a resistor's power directly from the voltage across it?",
          choices: ["P = V × R", "P = V²/R", "P = I²/R", "P = R/V"],
          answer: 1,
          explain: "Substituting I = V/R into P = VI gives P = V²/R.",
        },
        {
          q: "A 100 W device runs 10 hours. Energy used?",
          choices: ["0.1 kWh", "1 kWh", "10 kWh", "1000 kWh"],
          answer: 1,
          explain: "100 W × 10 h = 1000 Wh = 1 kWh — one 'unit' on your electricity bill.",
        },
        {
          q: "A ¼ W, 330 Ω resistor is placed straight across 12 V. What happens?",
          choices: [
            "Nothing — resistors can't overheat",
            "P = 144/330 ≈ 0.44 W, far over its rating: it overheats",
            "The voltage drops to protect it",
            "It works because 12 V is a safe voltage",
          ],
          answer: 1,
          explain:
            "P = V²/R = 0.44 W ≈ 175% of the ¼ W rating. Safe voltage for you is not the same as safe power for the part.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "series-parallel",
      unitId: "u1",
      title: "Series & Parallel",
      subtitle:
        "The two ways to wire anything — and the rules that let you collapse a network into one number.",
      buildsOn: ["ohms-law", "first-circuit"],
      Theory: () => (
        <>
          <h2>Series: one path</h2>
          <p>
            Components in <strong>series</strong> form a single chain — the same current
            threads through every one of them (there&rsquo;s nowhere else to go). Each resistor
            takes its own bite of the battery&rsquo;s voltage (V<sub>i</sub> = I·R<sub>i</sub>),
            and the bites always add up to the full supply. Total resistance simply adds:
          </p>
          <div className="formula">R_series = R₁ + R₂ + R₃ + …</div>
          <p>
            Old-fashioned Christmas lights were wired in series — one dead bulb broke the single
            path and the whole string went dark. Series is also why adding resistance anywhere
            in a chain throttles the current everywhere in it.
          </p>

          <h2>Parallel: many paths</h2>
          <p>
            Components in <strong>parallel</strong> connect across the same two nodes — so they
            all see the <em>same voltage</em>, and each draws its own current by Ohm&rsquo;s law.
            The currents add. More paths mean <em>easier</em> flow overall, so the combined
            resistance is always <em>smaller than the smallest branch</em>:
          </p>
          <div className="formula">
            1/R_parallel = 1/R₁ + 1/R₂ + 1/R₃ + …
            <span className="note">two resistors: R = R₁R₂ / (R₁ + R₂) · two equal Rs → R/2</span>
          </div>
          <p>
            Your house is wired in parallel: every outlet gets the full mains voltage, every
            appliance draws what it needs, and switching one off doesn&rsquo;t darken the rest.
          </p>

          <h2>Intuition for mixed networks</h2>
          <p>
            Real circuits mix both. The strategy is always the same: find a purely-series or
            purely-parallel cluster, replace it with its equivalent single resistor, redraw, and
            repeat until one resistor remains. Two anchors keep you sane:{" "}
            <strong>in series the biggest resistor dominates</strong> (it hogs the voltage);{" "}
            <strong>in parallel the smallest dominates</strong> (it hogs the current).
          </p>
          <div className="callout note">
            <span className="co-title">Sanity checks worth memorising</span>
            <p>
              Two equal resistors: in series double, in parallel halve. Adding any resistor in
              parallel always <em>lowers</em> total resistance. If your computed parallel result
              is bigger than the smallest branch, you made an arithmetic slip.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "One Path or Many",
        intro: (
          <>
            <p>Three resistors on a 9 V battery, wired your way.</p>
            <ul>
              <li>In series, make R3 huge — watch it hog the voltage while the current collapses.</li>
              <li>Flip to parallel with the same resistors: total current jumps. Why?</li>
              <li>Set all three to 100 Ω in parallel and check R_eq is exactly 33.3 Ω.</li>
            </ul>
          </>
        ),
        Component: SeriesParallelLab,
      },
      problems: [
        {
          prompt: "1 kΩ, 2.2 kΩ and 470 Ω in series. Total resistance?",
          answer: 3670,
          unit: "Ω",
          hint: "Series simply adds.",
          explain: "1000 + 2200 + 470 = 3670 Ω = 3.67 kΩ.",
        },
        {
          prompt: "Two 1 kΩ resistors in parallel. Combined resistance?",
          answer: 500,
          unit: "Ω",
          hint: "Equal pair in parallel → half.",
          explain: "1k·1k/(1k+1k) = 500 Ω.",
        },
        {
          prompt: "A 470 Ω in parallel with a 1 kΩ. Combined resistance?",
          answer: (470 * 1000) / 1470,
          unit: "Ω",
          hint: "Product over sum: R₁R₂/(R₁+R₂). Sanity check: below 470!",
          explain: "470·1000/1470 ≈ 320 Ω — below the smallest branch, as parallel always is.",
        },
      ],
      quiz: [
        {
          q: "Two 100 Ω resistors in series total…",
          choices: ["50 Ω", "100 Ω", "200 Ω", "10 kΩ"],
          answer: 2,
          explain: "Series resistances add: 100 + 100 = 200 Ω.",
        },
        {
          q: "Two 100 Ω resistors in parallel total…",
          choices: ["200 Ω", "100 Ω", "50 Ω", "25 Ω"],
          answer: 2,
          explain: "Equal pair in parallel halves: 100·100/(100+100) = 50 Ω.",
        },
        {
          q: "Which is always true of a parallel combination?",
          choices: [
            "It's larger than the largest branch",
            "It's smaller than the smallest branch",
            "It equals the average",
            "It equals the sum",
          ],
          answer: 1,
          explain:
            "Every added path makes flow easier, so the combination is below even the smallest single branch.",
        },
        {
          q: "In a series chain, which quantity is identical in every component?",
          choices: ["The voltage across each", "The power in each", "The current through each", "The resistance of each"],
          answer: 2,
          explain:
            "One path → one current. Voltages divide in proportion to each resistance; the current is common.",
        },
      ],
    },
  ],
};
