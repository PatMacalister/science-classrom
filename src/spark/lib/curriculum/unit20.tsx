import type { UnitModule } from "./types";
import {
  LayerExplorerLab,
  RoutePuzzleLab,
  LayoutMistakesLab,
  AssemblyOrderLab,
} from "@/spark/components/labs/labs-unit20";

export const unit20: UnitModule = {
  unit: {
    id: "u20",
    num: 20,
    title: "From Breadboard to PCB",
    blurb:
      "The last physical threshold: turn your blinker into a real, manufactured circuit board — designed by you, fabbed for pocket money, soldered at your own bench.",
    track: "specialization",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "pcb-anatomy",
      unitId: "u20",
      title: "What a PCB Actually Is",
      subtitle:
        "A printed circuit board is your breadboard's wiring, frozen into a copper-and-fibreglass sandwich. Learn to read the layers.",
      buildsOn: ["capstone", "real-components"],
      Theory: () => (
        <>
          <h2>The sandwich</h2>
          <p>
            Every gadget you own is built on <strong>printed circuit boards</strong> — and a
            PCB is nothing more exotic than your breadboard wiring made permanent. A slab of{" "}
            <strong>FR-4</strong> (woven fibreglass in epoxy — an excellent insulator, Lesson
            0.1&rsquo;s vocabulary) carries thin sheets of copper that are etched away until
            only the connections you designed remain: <strong>traces</strong> (the wires),{" "}
            <strong>pads</strong> (where component legs land), and <strong>planes</strong>{" "}
            (whole regions of copper, usually ground).
          </p>
          <p>On top of the copper come two finishing layers:</p>
          <ul>
            <li>
              <strong>Soldermask</strong> — the famous green (or black, blue, purple…) lacquer.
              It insulates every trace and stays open only over the pads, so solder wets
              exactly where it should and nowhere else.
            </li>
            <li>
              <strong>Silkscreen</strong> — white ink for humans: component outlines,
              reference labels (R1, C3, U1 — the same convention your schematics have used
              since Unit 1), polarity marks, and the board&rsquo;s name.
            </li>
          </ul>

          <h2>Two floors and the elevators between them</h2>
          <p>
            Cheap standard boards have copper on <em>both</em> faces — two wiring floors. A
            plated hole connecting them is a <strong>via</strong>: an elevator for signals.
            Component legs pushed through the board (<strong>through-hole</strong> parts, like
            everything in your kit) get plated holes too, and connect to both floors
            automatically. Modern gadgets mostly use <strong>SMD</strong> — surface-mounted
            parts that sit on one face like grains of rice — but through-hole is the right
            first soldering experience, and your blinker is entirely through-hole.
          </p>
          <div className="formula">
            FR-4 core · copper top+bottom · soldermask · silkscreen · drills &amp; vias
            <span className="note">read any board bottom-up with these five words and nothing on it is mysterious</span>
          </div>

          <h2>Why leave the breadboard at all?</h2>
          <p>
            Breadboards are for thinking; PCBs are for keeping. Spring contacts loosen, jumper
            wires fall out in a backpack, and anything above a few MHz turns a breadboard into
            an antenna farm (13.2&rsquo;s fast edges!). A PCB is mechanically solid,
            electrically quiet, repeatable — you can make ten — and it is the difference
            between &ldquo;my project&rdquo; and &ldquo;my product.&rdquo; Since about 2015,
            hobbyists have been able to buy professional fabrication for the price of a coffee:
            five copies of a small two-layer board for roughly $2 plus shipping.
          </p>
          <div className="callout note">
            <span className="co-title">The board in the lab</span>
            <p>
              The explorer below shows your 555 blinker as a real two-layer layout. Every trace
              corresponds to a jumper wire you placed in Unit 4 — find the pin 6→2 jumper
              living on the bottom copper.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Layer Explorer",
        intro: (
          <>
            <p>Your blinker as a PCB — peel it apart layer by layer.</p>
            <ul>
              <li>Toggle the soldermask: see how much copper it protects, and what stays bare (pads only).</li>
              <li>Explode the sandwich and find the two vias diving to the bottom floor.</li>
              <li>Hide everything but silkscreen — could you assemble the board from ink alone?</li>
            </ul>
          </>
        ),
        Component: LayerExplorerLab,
      },
      quiz: [
        {
          q: "The soldermask's job is to…",
          choices: [
            "Conduct signals between layers",
            "Insulate the copper everywhere except the pads, so solder goes only where intended",
            "Label the components",
            "Strengthen the board mechanically",
          ],
          answer: 1,
          explain: "It's a lacquer with holes over the pads — solder wets copper, not mask, so joints form exactly where designed.",
        },
        {
          q: "A via is…",
          choices: [
            "A plated hole connecting copper layers — an elevator for signals",
            "A wide power trace",
            "A type of component",
            "The board's outline",
          ],
          answer: 0,
          explain: "Two wiring floors need connections between them; the plated barrel of a via is that connection.",
        },
        {
          q: "FR-4 is…",
          choices: [
            "A conductive alloy",
            "A soldering technique",
            "The fibreglass-epoxy insulator the board is made of",
            "A component package",
          ],
          answer: 2,
          explain: "Woven glass in epoxy: stiff, flame-retardant (the FR), and an excellent insulator between the copper layers.",
        },
        {
          q: "Compared to a breadboard, a PCB is worse at exactly one of these:",
          choices: [
            "Surviving vibration",
            "High-frequency behaviour",
            "Being reproduced ten times",
            "Being rewired in thirty seconds",
          ],
          answer: 3,
          explain: "The copper is fixed — changes mean a new revision. Everything else (rigidity, signal quality, repeatability) improves.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "pcb-routing",
      unitId: "u20",
      title: "From Schematic to Routed Board",
      subtitle:
        "The design flow: draw the circuit, place the parts, then turn a tangle of rubber-band connections into clean copper — by hand, on two floors.",
      buildsOn: ["pcb-anatomy", "kirchhoff"],
      Theory: () => (
        <>
          <h2>The flow every tool shares</h2>
          <p>
            PCB design (in KiCad or any other tool) is a pipeline, and you already own the
            hard parts of it:
          </p>
          <ul>
            <li>
              <strong>1. Schematic capture</strong> — draw the circuit with the same symbols
              you&rsquo;ve read since Lesson 1.1. The tool extracts the{" "}
              <strong>netlist</strong>: the list of which pins are electrically connected
              (a <em>net</em> is just a node from Kirchhoff&rsquo;s lessons).
            </li>
            <li>
              <strong>2. Footprint assignment</strong> — each symbol gets a physical land
              pattern: pad sizes, hole diameters, courtyard. Libraries supply thousands.
            </li>
            <li>
              <strong>3. Placement</strong> — arrange parts on the board outline. The unrouted
              connections appear as straight &ldquo;rubber bands&rdquo;: the{" "}
              <strong>ratsnest</strong>. Good placement makes the ratsnest short and untangled
              — it is 80% of a good layout.
            </li>
            <li>
              <strong>4. Routing</strong> — replace each rubber band with copper. Traces on one
              layer may never cross; when two nets must pass, one takes a via to the other
              floor and back. (You&rsquo;ll feel this in your fingers in the lab.)
            </li>
            <li>
              <strong>5. DRC & gerbers</strong> — next lesson: the automated rule check, and
              the files the factory eats.
            </li>
          </ul>

          <h2>Routing wisdom, compressed</h2>
          <p>
            Route the critical nets first (power, and anything fast or sensitive), keep traces
            as short as the placement allows, and don&rsquo;t fear vias — each one costs
            nothing at hobby scale, though high-speed designs count them. Where a trace turns,
            use two 45° bends rather than a hard 90° — mostly for manufacturability and habit;
            the old &ldquo;acid trap&rdquo; horror stories are largely historical. And when a
            region gets hopeless, <em>rip it up and improve the placement</em> — the pros do,
            constantly.
          </p>
          <div className="formula">
            placement is 80% of routing · one layer = no crossings · a via is a legal crossing
            <span className="note">the entire craft, in one line — the lab makes your hands believe it</span>
          </div>
          <div className="callout tip">
            <span className="co-title">Autorouters exist. Learn by hand anyway.</span>
            <p>
              Every tool offers automatic routing, and for a blinker it would do fine. Route
              your first boards manually anyway: the constraints you feel — the crossing that
              forces a via, the placement that untangles three nets at once — are the actual
              skill. Ten minutes of the puzzle below teaches more than an hour of watching an
              autorouter.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Routing Puzzle",
        intro: (
          <>
            <p>Four nets, two copper layers, one chip squatting in the middle. Connect every pad.</p>
            <ul>
              <li>VCC and GND are easy warm-ups along the edges.</li>
              <li>TRIG must cross the others — impossible on one layer. Stop, switch to bottom copper, drag on: that’s a via.</li>
              <li>The chip body blocks the top layer only — the bottom floor runs right under it, exactly like real boards.</li>
            </ul>
          </>
        ),
        Component: RoutePuzzleLab,
      },
      quiz: [
        {
          q: "A 'net' in PCB design is…",
          choices: [
            "A set of pins that must be electrically connected — one node of the circuit",
            "The board outline",
            "The grid the parts snap to",
            "A type of via",
          ],
          answer: 0,
          explain: "Straight from Kirchhoff: a node. The netlist is the schematic reduced to pure connectivity.",
        },
        {
          q: "The 'ratsnest' is…",
          choices: [
            "A routing error",
            "A dense via cluster",
            "Leftover copper scraps",
            "The straight-line preview of every unrouted connection",
          ],
          answer: 3,
          explain: "Rubber-band lines from pin to pin. Watching the ratsnest untangle as you move parts is how placement is judged.",
        },
        {
          q: "Two traces on the same layer need to cross. The legal solution is…",
          choices: [
            "Let them touch briefly",
            "Delete one of the nets",
            "One net takes a via to the other layer, passes, and vias back",
            "Make one trace thinner",
          ],
          answer: 2,
          explain: "Same-layer crossing is a short (your fault-finder knows). The via is the crossing that isn't.",
        },
        {
          q: "Experienced designers say layout quality is decided mostly by…",
          choices: [
            "Trace colour",
            "Component placement, before any trace is drawn",
            "Using the maximum number of vias",
            "Routing at 90° angles",
          ],
          answer: 1,
          explain: "Good placement makes routing almost fall out on its own; bad placement makes it a war. 80% of the craft.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "pcb-layout-rules",
      unitId: "u20",
      title: "Layout Rules & Design Review",
      subtitle:
        "Width for current, clearance for safety, decoupling up close — and the automated inspector that checks it all before the factory does.",
      buildsOn: ["pcb-routing", "real-components", "power"],
      Theory: () => (
        <>
          <h2>Traces are resistors (still)</h2>
          <p>
            A copper trace is a thin, wide resistor — Unit 1 never stops applying. Standard
            &ldquo;1 oz&rdquo; copper is ~35 µm thick, so a 0.25 mm signal trace runs about
            0.02 Ω per centimetre: irrelevant for signals, very relevant once amps flow.
            Undersized power traces heat up (P = I²R, Lesson 1.4) and drop voltage exactly
            like the cheap cable in your problems set. The industry&rsquo;s IPC-2221 charts —
            wrapped into the lab&rsquo;s calculator — turn &ldquo;how much current, how much
            heating is acceptable&rdquo; into a required width. For your blinker: signals at
            0.25 mm, power at 0.5 mm, and you&rsquo;re comfortable.
          </p>

          <h2>Clearance, and the rules file</h2>
          <p>
            Copper that must not touch needs a guaranteed gap — through fab tolerance, over
            years, with humidity. Budget fabs happily do 0.15 mm minimum trace/gap; sane
            designs stay comfortably above it. All of these constraints live in your
            tool&rsquo;s <strong>design rules</strong>, and the{" "}
            <strong>Design Rule Check (DRC)</strong> audits every trace against them plus the
            netlist: shorts, opens, too-thin, too-close — the same class of faults your Unit 15
            fault-finder diagnosed, caught before they are etched into copper.{" "}
            <em>Never order a board with DRC errors.</em>
          </p>
          <div className="formula">
            width ∝ current · clearance ∝ voltage &amp; tolerance · DRC before every order
            <span className="note">plus the one placement law: decoupling capacitors live millimetres from their pin (15.1!)</span>
          </div>

          <h2>The review eye</h2>
          <p>
            DRC catches what is <em>formally</em> wrong. A human review catches what is{" "}
            <em>unwisely</em> right: the decoupling cap exiled across the board, the floating
            copper island acting as an antenna, silkscreen ink across a pad, a pad kissing the
            routed edge. Professionals review each other&rsquo;s boards exactly like code.
            The lab below hands you a board that passes a squint but hides six sins — find
            them all and you have performed your first design review.
          </p>
          <div className="callout warn">
            <span className="co-title">Ground is a circuit too</span>
            <p>
              Every current loops back (Lesson 1.1 — the loop is everything). On PCBs the
              return path matters as much as the outbound trace: a solid ground plane on the
              bottom layer gives every signal a short way home and quiets the whole board.
              When in doubt: pour a ground plane, stitch it with vias.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Spot the Six Sins",
        intro: (
          <>
            <p>A board that would pass a casual glance — and fail review. Click what’s wrong; the width calculator below backs one of the finds.</p>
            <ul>
              <li>Two sins are electrical faults DRC would flag. Four are legal-but-foolish.</li>
              <li>One of them you met in Lesson 15.1’s decoupling callout.</li>
              <li>Use the calculator: how wide must a 2 A trace be for a 10 °C rise?</li>
            </ul>
          </>
        ),
        Component: LayoutMistakesLab,
      },
      quiz: [
        {
          q: "A power trace carrying real current should be wide because…",
          choices: [
            "Wide traces look professional",
            "DRC requires all traces equal",
            "Narrow traces can't be soldered",
            "The trace is a resistor: too thin means I²R heating and voltage drop",
          ],
          answer: 3,
          explain: "Copper is thin (~35 µm); cross-section comes from width. Current × resistance = heat and lost volts — Unit 1 on a board.",
        },
        {
          q: "The DRC (Design Rule Check)…",
          choices: [
            "Routes the board automatically",
            "Audits the layout against clearance/width rules and the netlist before you order",
            "Simulates the circuit's behaviour",
            "Generates the silkscreen",
          ],
          answer: 1,
          explain: "Shorts, opens, too-close, too-thin — machine-checkable sins, caught before the fab etches them permanent.",
        },
        {
          q: "Where does a decoupling capacitor belong?",
          choices: [
            "Anywhere on the board — nets are nets",
            "Next to the power connector",
            "Millimetres from the supply pin it serves",
            "On the bottom layer only",
          ],
          answer: 2,
          explain: "Its job is instant local charge (15.1); every millimetre of trace adds the inductance that defeats it. Placement IS the function.",
        },
        {
          q: "Why does a solid ground plane improve a board?",
          choices: [
            "Every current loop gets a short return path home, right under its outbound trace",
            "It adds mechanical weight",
            "It replaces the soldermask",
            "It makes the board cheaper",
          ],
          answer: 0,
          explain: "The loop is everything (1.1): return currents want to flow under their signal. A plane gives every net that highway.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "pcb-blinker",
      unitId: "u20",
      title: "Capstone: Fab the Blinker",
      subtitle:
        "Design the board in KiCad, order five copies for pocket money, and learn to solder on hardware you designed yourself. Breadboard → product.",
      buildsOn: ["pcb-layout-rules", "capstone", "debugging"],
      Theory: () => (
        <>
          <h2>The mission</h2>
          <p>
            Recreate your Unit 4 blinker as a real manufactured PCB: schematic and layout in{" "}
            <strong>KiCad</strong> (free, open source, professional-grade; version 9 as of
            this writing), fabricated by a board house, assembled at your own bench with your
            first soldering iron. At the end, a board with <em>your name in silkscreen</em>{" "}
            blinks on your desk — and &ldquo;I design circuit boards&rdquo; becomes a plain
            statement of fact.
          </p>

          <h2>Shopping list</h2>
          <table>
            <thead>
              <tr><th>Item</th><th>Notes</th><th>≈ Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>KiCad</td><td>kicad.org — Windows/Mac/Linux</td><td>free</td></tr>
              <tr><td>Board fabrication</td><td>JLCPCB or PCBWay: 5× two-layer boards ≤100×100 mm</td><td>~$2 + $10–20 shipping</td></tr>
              <tr><td>Soldering iron</td><td>temperature-controlled, ~350 °C; fine conical or chisel tip</td><td>$20–30</td></tr>
              <tr><td>Solder</td><td>0.8 mm wire, lead-free SAC305 (or 60/40 where legal) with flux core</td><td>$5</td></tr>
              <tr><td>Extras</td><td>brass-wool tip cleaner, and an 8-pin DIP socket so the 555 never feels the iron</td><td>$4</td></tr>
              <tr><td colSpan={2}><em>Components: the same 555, resistors, capacitor, LED and battery clip from your Unit 4 kit.</em></td><td>—</td></tr>
            </tbody>
          </table>

          <h2>The design, step by step</h2>
          <ul>
            <li>
              <strong>Schematic:</strong> redraw the Unit 4 astable in KiCad&rsquo;s editor —
              555, R1 1 k, R2 47 k, C 10 µF, 470 Ω, LED, a two-pin power header. Run the ERC
              (electrical rule check) until it&rsquo;s silent.
            </li>
            <li>
              <strong>Footprints:</strong> everything through-hole — DIP-8 socket for the 555,
              axial resistors, 2.5 mm-pitch radial cap, 5 mm LED, 2.54 mm pin header.
            </li>
            <li>
              <strong>Layout:</strong> a 50 × 40 mm outline leaves acres of room. Place for a
              short ratsnest (20.2), route with 0.25/0.5 mm widths (20.3), pour a bottom
              ground plane, and put your name and &ldquo;rev A&rdquo; in silkscreen — the rite.
            </li>
            <li>
              <strong>DRC → gerbers:</strong> zero errors, then export gerbers + drill file
              (KiCad has a one-click preset for the big fabs).
            </li>
            <li>
              <strong>Order:</strong> upload the zip to the fab&rsquo;s site, watch their
              viewer render your board, pay, wait roughly a week. (Your account, your address —
              the course walks you to the upload screen and stops.)
            </li>
          </ul>

          <h2>Your first soldering, honestly described</h2>
          <p>
            Through-hole soldering is a four-second skill practiced for a lifetime: touch the
            iron so it heats <em>pad and leg together</em> (~2 s), feed a little solder into
            the joint — not onto the iron — let it flow into a shiny cone (~1 s), remove
            solder then iron. A good joint looks like a tiny volcano hugging the leg; a bad
            one is a dull ball sitting on top. Assembly order is lowest-profile first — the
            lab below drills it. Ventilate the room, wash hands afterwards, and park the iron
            in its stand like it&rsquo;s always hot, because it is.
          </p>

          <h3>If the assembled board doesn&rsquo;t blink</h3>
          <table>
            <thead>
              <tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
            </thead>
            <tbody>
              <tr><td>Dead, chip cool</td><td>power path — clip, header joint, or a cold joint on pin 8/1</td><td>15.2’s method: rail first; reflow dull joints</td></tr>
              <tr><td>Dead, worked on breadboard</td><td>a bridge between neighbouring pads</td><td>inspect with light at an angle; wick or drag the iron to split it</td></tr>
              <tr><td>LED dark, oscillator fine</td><td>LED reversed against the silkscreen</td><td>the classic; desolder or fit a new LED the right way</td></tr>
              <tr><td>Blinks wrong speed</td><td>wrong resistor stuffed — bands read in haste</td><td>1.3 skills; measure across it in-circuit first</td></tr>
              <tr><td>Works when pressed</td><td>a cracked or cold joint flexing</td><td>reflow every joint on the suspect net</td></tr>
            </tbody>
          </table>

          <h2>Graduation, again</h2>
          <p>
            This branch ends the only way this course knows how: with hardware. But notice
            what changed — in Unit 4 you assembled a circuit; today you <em>manufactured</em>{" "}
            one. Schematic, layout, fab, assembly, bring-up: that is the entire product
            lifecycle of every electronic device on Earth, executed once, by you, end to end.
            Rev B is yours to invent — more LEDs, the PWM dimmer as a board, a Pico carrier…
            The gerbers are cheap. The skill is now permanent. ⚡
          </p>
        </>
      ),
      lab: {
        title: "The Assembly Bench",
        intro: (
          <>
            <p>Your fabbed board, an empty bench, and the one rule of population order.</p>
            <ul>
              <li>Click the part you’d solder next — lowest profile first, so the flipped board lies flat.</li>
              <li>Note the socket goes in, never the chip — the 555 is inserted iron-free at the end.</li>
              <li>Watch the bench notes: each part carries its real-world gotcha (LED flat side, cap stripe).</li>
            </ul>
          </>
        ),
        Component: AssemblyOrderLab,
      },
      checklist: [
        { id: "kicad", text: "Installed KiCad and completed its built-in Getting Started tour" },
        { id: "schematic", text: "Drew the blinker schematic; ERC runs clean" },
        { id: "footprints", text: "Assigned through-hole footprints (DIP-8 socket, axial R, radial C, 5 mm LED, header)" },
        { id: "placement", text: "Placed parts for a short, untangled ratsnest on a ~50×40 mm outline" },
        { id: "routed", text: "Routed everything — 0.25 mm signals, 0.5 mm power, ground pour stitched on the bottom" },
        { id: "silk", text: "Put my name and 'rev A' in the silkscreen (the rite)" },
        { id: "drc", text: "DRC: zero errors, zero unrouted nets" },
        { id: "gerbers", text: "Exported gerbers + drill file and sanity-checked them in the fab's online viewer" },
        { id: "ordered", text: "Ordered 5 boards — and saved the project for rev B" },
        { id: "bench", text: "Bench ready: temperature-controlled iron, solder, brass wool, ventilation" },
        { id: "soldered", text: "Populated the board lowest-first: resistors → socket → LED → cap → header" },
        { id: "joints", text: "Inspected every joint at an angle: shiny cones, no bridges, no dull balls" },
        { id: "blinks", text: "Inserted the 555, connected 9 V — MY OWN PCB BLINKS 🎉" },
        { id: "spare", text: "Gave one of the spare four boards to someone and explained every layer on it" },
      ],
    },
  ],
};
