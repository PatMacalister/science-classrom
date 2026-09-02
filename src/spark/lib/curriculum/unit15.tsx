import type { UnitModule } from "./types";
import { MonteCarloLab, FaultFinderLab } from "@/spark/components/labs/labs-unit15";

export const unit15: UnitModule = {
  unit: {
    id: "u15",
    num: 15,
    title: "The Art of Real Circuits",
    blurb:
      "Ideal components exist only in simulators — including this one. Master the two skills that separate builders from engineers: designing for the tolerance cloud, and hunting faults like a professional.",
    track: "master",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "real-components",
      unitId: "u15",
      title: "Nothing Is Ideal",
      subtitle:
        "Every part you buy is a cloud of possibilities, not a number. Design for the cloud or be surprised by production.",
      buildsOn: ["resistors", "voltage-divider", "power"],
      Theory: () => (
        <>
          <h2>The lies simulators tell</h2>
          <p>
            Every lab in this course — and every SPICE simulation ever run — used ideal parts:
            resistors that are exactly their value, wires with zero resistance, capacitors that
            are only capacitors. Real parts are messier in ways that eventually matter:
          </p>
          <ul>
            <li>
              <strong>Tolerance:</strong> your ±5% gold-band resistor (1.3) is a promise, not a
              value: a 10 kΩ part is <em>somewhere</em> between 9.5 k and 10.5 k. Stack several
              in a circuit and the uncertainties combine.
            </li>
            <li>
              <strong>Temperature:</strong> resistance drifts with heat (~100 ppm/°C for common
              parts); a ceramic capacitor can lose half its capacitance between winter shed and
              summer car.
            </li>
            <li>
              <strong>Parasitics:</strong> every wire is a small resistor <em>and</em> a small
              inductor; every capacitor hides series resistance (ESR) and inductance; every
              adjacent pair of traces is a tiny capacitor. Below ~1 MHz you can mostly ignore
              this; your PWM’s crisp edges (spectrum lesson!) cannot.
            </li>
            <li>
              <strong>Ratings and datasheets:</strong> the manufacturer’s datasheet is the
              part’s contract. The master habit: design to the <em>recommended operating</em>{" "}
              table, treat <em>absolute maximum</em> as the cliff edge you never picnic on.
            </li>
          </ul>

          <h2>Designing for the cloud</h2>
          <p>
            One prototype working proves that <em>one point</em> of the tolerance cloud works.
            Production builds thousands of points. Two professional defences:
          </p>
          <div className="formula">
            worst-case: check the corners · Monte Carlo: roll the dice thousands of times
            <span className="note">the lab below builds 800 “identical” dividers and lets you meet the cloud in person</span>
          </div>
          <p>
            The design conclusions are wonderfully practical: make behaviour depend on{" "}
            <strong>ratios</strong> of like parts where possible (ratios track better than
            absolutes — the trick op-amp circuits exploit), buy precision only for the parts
            that set accuracy, and leave margin everywhere else. A ±3% output spec built from
            ±10% parts is not frugality; it&rsquo;s a scrap bin.
          </p>
          <div className="callout note">
            <span className="co-title">One rule worth its own box: decoupling</span>
            <p>
              Every chip’s supply pin gets a 100 nF capacitor, millimetres away, to the ground
              plane. Fast digital edges demand gulps of current that the distant supply (through
              its parasitic wire inductance — Lesson 2.4!) cannot deliver in time; the local
              capacitor is the chip’s personal reservoir. The 555 datasheet asks for it, the
              Pico has a forest of them, and forgetting it is the classic source of
              &ldquo;works on the bench, glitches in the field.&rdquo;
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Meet the Cloud",
        intro: (
          <>
            <p>A production line building 800 “identical” 4.5 V dividers from real, toleranced resistors.</p>
            <ul>
              <li>±1% parts: a tight spike, everything in spec. Ship it.</li>
              <li>±5%: the bell curve spreads to the spec fences. Count the red tails.</li>
              <li>±10%: read the scrap counter. Precision parts suddenly look cheap.</li>
            </ul>
          </>
        ),
        Component: MonteCarloLab,
      },
      quiz: [
        {
          q: "A ±5% 10 kΩ resistor guarantees…",
          choices: [
            "A value somewhere between 9.5 kΩ and 10.5 kΩ",
            "Exactly 10 kΩ",
            "10 kΩ that drifts ±5% per year",
            "5% failure rate",
          ],
          answer: 0,
          explain: "Tolerance bounds the manufacturing spread. The actual value is one point inside that range — you don't know where.",
        },
        {
          q: "Why does one working prototype not prove a design?",
          choices: [
            "Prototypes use better solder",
            "Prototypes run at lower voltage",
            "It samples one point of the tolerance cloud; production samples thousands",
            "It does prove it",
          ],
          answer: 2,
          explain: "Every unit gets a different roll of the dice on every part. Worst-case and Monte Carlo analysis exist to face the whole cloud.",
        },
        {
          q: "A 100 nF decoupling capacitor next to every chip exists to…",
          choices: [
            "Filter the audio",
            "Locally supply fast current gulps that the wiring's inductance can't deliver in time",
            "Protect against reversed batteries",
            "Increase the supply voltage",
          ],
          answer: 1,
          explain: "Fast edges need instant charge; wire inductance (2.4) says no. The local reservoir says yes. Non-negotiable practice.",
        },
        {
          q: "'Absolute maximum ratings' in a datasheet mean…",
          choices: [
            "The recommended operating point",
            "Marketing numbers",
            "Values guaranteed for 10 years",
            "Limits you may never exceed even briefly — not a design target",
          ],
          answer: 3,
          explain: "Design inside the recommended table; absolute max is where damage begins, not where headroom ends.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "debugging",
      unitId: "u15",
      title: "The Debugging Mindset",
      subtitle:
        "Circuits fail — yours, everyone's, forever. The master's edge is not avoiding faults but cornering them in a handful of measurements.",
      buildsOn: ["kirchhoff", "capstone", "real-components"],
      Theory: () => (
        <>
          <h2>Debugging is measurement plus logic</h2>
          <p>
            A broken circuit feels like chaos; it is actually a logic puzzle with physical
            clues. The professional method, distilled:
          </p>
          <ul>
            <li>
              <strong>1. Believe the symptom.</strong> &ldquo;LED dark&rdquo;, &ldquo;stuck
              on&rdquo;, &ldquo;too fast&rdquo; — each already excludes most faults. Write it
              down before touching anything.
            </li>
            <li>
              <strong>2. Check power first.</strong> The most common fault class by far. One
              probe on the supply rail eliminates (or convicts) it instantly.
            </li>
            <li>
              <strong>3. Split the circuit in half.</strong> Probe the middle of the signal
              chain: healthy upstream + dead downstream = the fault is between your last two
              probes. Each measurement halves the suspect territory — a 16-stage chain
              surrenders in 4 probes.
            </li>
            <li>
              <strong>4. Let the laws testify.</strong> KVL (2.1) as lie detector: voltages
              around a loop that don&rsquo;t sum are pointing at your missing drop. A node
              stuck where the divider math says it can&rsquo;t be is telling you which part
              isn&rsquo;t the part you think it is.
            </li>
            <li>
              <strong>5. Change one thing.</strong> Swap-and-hope with three simultaneous
              changes destroys the evidence. One change, one observation, like any experiment.
            </li>
          </ul>

          <h2>Know the classics</h2>
          <p>
            Experienced engineers diagnose fast because most faults are old acquaintances:
            reversed polarity (LED, electrolytic, chip orientation — your capstone&rsquo;s
            three classic mistakes), wrong value from a misread band (470 Ω vs 47 kΩ is one
            colour apart!), broken or missing jumpers, floating pins that should be tied
            (RESET!), dead or sagging batteries, and — on soldered boards — the cold joint.
            Notice something: every one of these appeared somewhere in this course&rsquo;s
            troubleshooting tables. The tables were the training; this lesson is the exam.
          </p>
          <div className="formula">
            symptom → power → split the chain → one change at a time
            <span className="note">boring, methodical, unreasonably effective</span>
          </div>
          <div className="callout tip">
            <span className="co-title">The emotional half of the skill</span>
            <p>
              The circuit is not gaslighting you. It is obeying physics perfectly — just not
              the circuit you <em>think</em> you built. The moment debugging feels mystical,
              re-measure your assumptions, starting with the power rail. The fault is always
              embarrassingly reasonable in hindsight; masters just reach the hindsight sooner.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Repair Bench",
        intro: (
          <>
            <p>
              A blinker board with a hidden fault, a virtual multimeter, and your reputation.
              Probe nodes, then name the culprit — masters average under 3 probes.
            </p>
            <ul>
              <li>Read the symptom first: it splits the seven suspects into families.</li>
              <li>Four faults share the symptom &ldquo;LED dark&rdquo; — find the single probe that separates each pair.</li>
              <li>Two faults both say &ldquo;stuck ON&rdquo; — the cap node reads 0 V in one and 9 V in the other. Why?</li>
            </ul>
          </>
        ),
        Component: FaultFinderLab,
      },
      quiz: [
        {
          q: "The first measurement on any dead circuit should be…",
          choices: [
            "The output",
            "The most expensive component",
            "The supply rail — power faults are the most common class",
            "The temperature",
          ],
          answer: 2,
          explain: "One probe either convicts the most likely suspect or eliminates a whole category. Always power first.",
        },
        {
          q: "Half-splitting a 16-stage signal chain finds the broken stage in about…",
          choices: ["4 probes", "8 probes", "16 probes", "1 probe"],
          answer: 0,
          explain: "Each measurement halves the territory: 16 → 8 → 4 → 2 → 1. Binary search, with a multimeter.",
        },
        {
          q: "You probe an oscillating pin 3 but the LED never lights. The fault is…",
          choices: [
            "In the 555's timing network",
            "In the battery",
            "Impossible to localise",
            "Downstream of pin 3 — the LED branch",
          ],
          answer: 3,
          explain: "Healthy upstream + dead downstream brackets the fault between them. The oscillator is exonerated; the LED branch is under arrest.",
        },
        {
          q: "Why change only one thing at a time while debugging?",
          choices: [
            "To save components",
            "So the observation you make can be attributed to the change you made",
            "Because circuits can only handle one change",
            "Tradition",
          ],
          answer: 1,
          explain: "Three simultaneous changes that 'fix' it teach you nothing — and often hide a second fault. Debugging is an experiment; keep it controlled.",
        },
      ],
    },
  ],
};
