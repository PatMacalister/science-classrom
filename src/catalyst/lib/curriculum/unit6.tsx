import type { UnitModule } from "./types";
import { RedoxLab, GalvanicLab, ElectrolysisLab, LemonLab } from "@/catalyst/components/labs/labs-unit6";

export const unit6: UnitModule = {
  unit: {
    id: "u6",
    num: 6,
    title: "Electrochemistry",
    blurb:
      "Electron transfer as a power source: redox, batteries, electrolysis — closing the circle from chemistry to electricity, capped by a lemon that lights an LED.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "redox",
      unitId: "u6",
      title: "Redox: Electron Bookkeeping",
      subtitle:
        "Ionic bonding was electron transfer standing still. Redox is electron transfer as an event — and some metals always pay.",
      buildsOn: ["ionic", "reactions"],
      seeAlso: [
        {
          course: "spark",
          slug: "charge",
          label: {
            en: "⚡ Spark 0.1 — Electric Charge & the Atom",
            de: "⚡ Spark 0.1 — Elektrische Ladung & das Atom",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>Oxidation and reduction — always in pairs</h2>
          <p>
            Whenever an electron changes owners, chemistry gives the two halves names:{" "}
            <strong>oxidation</strong> is <em>losing</em> electrons, <strong>reduction</strong>{" "}
            is <em>gaining</em> them. (Merkspruch from the German classroom: <em>&ldquo;Oxidation —
            Elektronen-Abgabe; Reduktion — Elektronen-Aufnahme.&rdquo;</em> Or in English:{" "}
            <strong>OIL RIG</strong> — Oxidation Is Loss, Reduction Is Gain.) One never happens
            without the other — an electron lost must land somewhere — so the whole event is a{" "}
            <strong>redox reaction</strong>.
          </p>
          <div className="formula">
            Zn + Cu²⁺ → Zn²⁺ + Cu
            <span className="note">zinc is oxidized (loses 2 e⁻), copper ion is reduced (gains 2 e⁻)</span>
          </div>
          <p>
            You&rsquo;ve seen redox all your life under other names: <strong>combustion</strong>{" "}
            (fuel oxidized by oxygen), <strong>rusting</strong> (iron oxidized, slowly),{" "}
            <strong>bleaching</strong>, <strong>batteries dying</strong>, and your cells burning
            glucose — a redox cascade run in exquisitely controlled slow motion.
          </p>

          <h2>The activity series: who pays whom</h2>
          <p>
            Drop a zinc strip into blue copper-sulfate solution and it exits copper-plated while
            the blue fades: zinc <em>forces</em> its electrons onto Cu²⁺. Try the reverse —
            copper in zinc sulfate — and nothing happens at all. Metals form a strict pecking
            order, the <strong>activity series</strong>: from electron-pushers (magnesium, zinc,
            iron) down to electron-hoarders (copper, silver, gold). A metal can only displace
            metals <em>below</em> it. Gold sits at the very bottom — it refuses to be oxidized,
            which is precisely why it&rsquo;s still shiny after 5000 years in a pharaoh&rsquo;s
            tomb.
          </p>

          <div className="callout note">
            <span className="co-title">&ldquo;Noble&rdquo; is a chemical term</span>
            <p>
              Noble metals (gold, silver, platinum) hold their electrons tightly; base metals
              (zinc, iron) give theirs up readily. Everyday corrosion follows the table:
              iron rusts, gold doesn&rsquo;t — and galvanizing works by bolting a{" "}
              <em>more</em> eager metal (zinc) onto iron, so the zinc corrodes sacrificially
              first. You will exploit exactly this hierarchy to build a battery in the next
              lesson.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Displacement Duel",
        intro: (
          <>
            <p>One beaker, two experiments — and only one of them works.</p>
            <ul>
              <li>Run zinc in CuSO₄: watch the blue fade and copper crust grow on the strip.</li>
              <li>Now try copper in ZnSO₄ — and stare at a beaker where nothing will ever happen.</li>
              <li>Say it in redox terms: who is oxidized, who is reduced, and why only one way?</li>
            </ul>
          </>
        ),
        Component: RedoxLab,
      },
      quiz: [
        {
          q: "Oxidation means…",
          choices: ["gaining electrons", "losing electrons", "gaining oxygen atoms only", "becoming a gas"],
          answer: 1,
          explain:
            "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain. Oxygen was just the historical first-known electron thief.",
        },
        {
          q: "Why must oxidation and reduction always occur together?",
          choices: [
            "Tradition",
            "A lost electron must be gained by something — electrons don't vanish",
            "They don't; each can occur alone",
            "Because reactions need heat",
          ],
          answer: 1,
          explain:
            "Electron bookkeeping must balance. Every redox reaction is a donor-acceptor pair — hence 'red-ox' as one word.",
        },
        {
          q: "Zinc displaces copper from CuSO₄ solution, but copper won't displace zinc from ZnSO₄ because…",
          choices: [
            "copper is heavier",
            "zinc sits higher in the activity series — it gives up electrons more readily",
            "ZnSO₄ isn't blue",
            "copper dissolves too fast",
          ],
          answer: 1,
          explain:
            "The activity series is a one-way hierarchy of electron-pushing eagerness. The more 'base' metal reduces ions of the more 'noble' one — never the reverse.",
        },
        {
          q: "Why is gold found shiny in ancient tombs while iron artifacts crumble?",
          choices: [
            "Gold is denser",
            "Gold resists oxidation — it sits at the noble bottom of the activity series",
            "Tombs are oxygen-free",
            "Ancient iron was low quality",
          ],
          answer: 1,
          explain:
            "Corrosion is slow oxidation. Iron gives up electrons to oxygen readily; gold essentially never does — nobility is corrosion resistance.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "galvanic",
      unitId: "u6",
      title: "Batteries: The Galvanic Cell",
      subtitle:
        "Separate the two halves of a redox reaction and force the electrons through a wire — that detour is every battery ever made.",
      buildsOn: ["redox"],
      seeAlso: [
        {
          course: "spark",
          slug: "voltage",
          label: {
            en: "⚡ Spark 0.2 — Voltage: Energy per Charge",
            de: "⚡ Spark 0.2 — Spannung: Energie pro Ladung",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>The trick: separate the halves</h2>
          <p>
            In the beaker, zinc handed Cu²⁺ its electrons directly — energy released as useless
            heat. A <strong>galvanic cell</strong> splits the reaction into two rooms: zinc in
            one beaker, copper ions in another, the metals joined by a <strong>wire</strong> and
            the solutions by a <strong>salt bridge</strong> (which lets ions drift across to keep
            both sides electrically neutral). Zinc still insists on shedding electrons — but now
            the only route to the waiting Cu²⁺ is <em>through the wire</em>. An electron current
            you can harvest: chemistry become electricity.
          </p>
          <div className="formula">
            E°<sub>cell</sub> = E°(cathode) − E°(anode)
            <span className="note">each metal has a standard potential E°; the cell voltage is the gap between them</span>
          </div>
          <p>
            Every half-reaction has a measured <strong>standard potential E°</strong> — the
            activity series with numbers attached (Zn: −0.76 V, Cu: +0.34 V, Ag: +0.80 V). The
            voltage of a cell is simply the <em>difference</em>: Zn/Cu gives 1.10 V. Want more?
            Pick metals farther apart, or stack cells in <strong>series</strong> — a 9 V block
            battery is literally six 1.5 V cells in a trench coat.
          </p>

          <h2>Anode, cathode, and the naming fog</h2>
          <p>
            The electrode being <em>oxidized</em> (zinc, dissolving away) is the{" "}
            <strong>anode</strong> — the battery&rsquo;s − terminal. The electrode where{" "}
            <em>reduction</em> happens (copper, growing plating) is the <strong>cathode</strong>,
            the + terminal. Electrons flow anode → cathode through the outside wire. Every
            battery you own — from the AA in a remote to the lithium cell in your phone — is
            this same architecture with fancier chemistry: two half-reactions of different
            eagerness, separated, and taxed at the wire.
          </p>

          <div className="callout tip">
            <span className="co-title">For Spark Academy graduates</span>
            <p>
              This is where the two courses shake hands: the voltage source you treated as a
              given in every circuit — the &ldquo;charge pump&rdquo; — is a redox reaction held
              apart. The pump&rsquo;s pressure is E°<sub>cell</sub>; the pump runs down when a
              reactant runs out. And internal resistance? Mostly the sluggishness of ions
              crossing the electrolyte — as your lemon will demonstrate, pointedly, in the
              capstone.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Build-a-Battery",
        intro: (
          <>
            <p>Two half-cells, a salt bridge, a lamp — and your choice of electrodes.</p>
            <ul>
              <li>Classic Zn/Cu: confirm 1.10 V. Then chase the maximum — which pair wins?</li>
              <li>Pick the same metal twice. Why exactly does the lamp stay dark?</li>
              <li>Swap anode and cathode into a negative voltage — which way would electrons actually flow?</li>
            </ul>
          </>
        ),
        Component: GalvanicLab,
      },
      quiz: [
        {
          q: "In a galvanic cell, why must the electrons cross through the external wire?",
          choices: [
            "Wires attract electrons",
            "The two half-reactions are physically separated — the wire is the only path to the acceptor",
            "The salt bridge blocks electrons on purpose",
            "They don't; they swim through the solution",
          ],
          answer: 1,
          explain:
            "Separation is the whole invention: the donor metal and the acceptor ions never touch, so the mandatory electron transfer is routed through your circuit.",
        },
        {
          q: "What does the salt bridge do?",
          choices: [
            "Carries the electrons",
            "Lets ions drift between the beakers to keep both sides neutral",
            "Adds salt for flavor… of conductivity in the wire",
            "Heats the reaction",
          ],
          answer: 1,
          explain:
            "As electrons leave one beaker and arrive in the other, charge would pile up and stall the cell within microseconds. Migrating ions cancel the buildup.",
        },
        {
          q: "Zn has E° = −0.76 V and Ag has E° = +0.80 V. A Zn/Ag cell delivers…",
          choices: ["0.04 V", "1.56 V", "0.76 V", "−1.56 V"],
          answer: 1,
          explain: "E°cell = E°(cathode) − E°(anode) = 0.80 − (−0.76) = 1.56 V. Farther apart in the series = more volts.",
        },
        {
          q: "The anode of a battery is the electrode where…",
          choices: [
            "reduction happens; it is the + terminal",
            "oxidation happens; it is the − terminal",
            "nothing happens",
            "ions are created from nothing",
          ],
          answer: 1,
          explain:
            "AnOde = Oxidation (both start with vowels, as the classic mnemonic goes). It dissolves, shedding the electrons that make it the − terminal.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "electrolysis",
      unitId: "u6",
      title: "Electrolysis: Reactions in Reverse",
      subtitle:
        "A battery lets a willing reaction pay you in volts. Electrolysis is you paying volts to force an unwilling reaction backwards.",
      buildsOn: ["galvanic"],
      Theory: () => (
        <>
          <h2>Running chemistry uphill</h2>
          <p>
            Water will never split into hydrogen and oxygen by itself — that reaction runs
            steeply uphill (it&rsquo;s the reverse of hydrogen&rsquo;s explosive combustion). But
            push electrons in with a power supply and you can <em>force</em> it:{" "}
            <strong>electrolysis</strong>, the galvanic cell run in reverse. Below a threshold
            voltage nothing happens at all; past it, the current drives the reaction and gases
            bloom at the electrodes:
          </p>
          <div className="formula">
            2 H₂O → 2 H₂ + O₂
            <span className="note">needs ≥ 1.23 V in theory, ~1.8 V in practice — and note the 2:1 gas ratio, the formula of water made visible</span>
          </div>
          <p>
            Hydrogen appears at the cathode (− terminal: reduction, electrons in), oxygen at the
            anode (+ terminal: oxidation, electrons out) — and twice as much hydrogen as oxygen,
            because every water molecule carries two H for one O. Electrolysis is a chemical
            formula you can watch fill two test tubes.
          </p>

          <h2>Where the forced reaction earns its keep</h2>
          <ul>
            <li>
              <strong>Aluminium</strong> — locked in its ore so tightly that only brute
              electrochemical force frees it. Smelters consume country-scale electricity;
              recycling a can costs 5% of making a new one.
            </li>
            <li>
              <strong>Electroplating</strong> — a thin forced deposit of chromium, silver or
              gold onto a cheaper metal. Jewellery, cutlery, corrosion armor.
            </li>
            <li>
              <strong>Charging a battery</strong> — the everyday one: charging is literally
              electrolysis of the battery&rsquo;s own discharged chemistry, shoving it back
              uphill so it can run down again through your phone.
            </li>
            <li>
              <strong>Green hydrogen</strong> — surplus solar/wind electricity stored as H₂,
              re-payable later in a fuel cell (a galvanic cell burning hydrogen politely).
            </li>
          </ul>

          <div className="callout note">
            <span className="co-title">The energy ledger always balances</span>
            <p>
              The volts you invest in splitting water come back — no more, in practice less —
              when the hydrogen recombines. Electrolysis doesn&rsquo;t create energy; it{" "}
              <em>stores</em> it in bonds. Thermodynamics keeps flawless books; the profit is in
              the <em>when</em> and <em>where</em>, not the <em>how much</em>.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Water Splitter",
        intro: (
          <>
            <p>Two electrodes, two collection tubes, one voltage knob.</p>
            <ul>
              <li>Creep the voltage up — find the threshold below which nothing bubbles.</li>
              <li>Let the tubes fill and check the ratio meter: why 2 : 1?</li>
              <li>Which tube fills at the − electrode, and what redox half is happening there?</li>
            </ul>
          </>
        ),
        Component: ElectrolysisLab,
      },
      quiz: [
        {
          q: "Electrolysis differs from a galvanic cell in that…",
          choices: [
            "it uses no electrodes",
            "external electrical energy forces a non-spontaneous reaction",
            "it only works with molten metals",
            "it produces electricity",
          ],
          answer: 1,
          explain:
            "Galvanic: willing reaction pays out volts. Electrolytic: you pay volts to drive the reaction backwards. Same architecture, reversed energy flow.",
        },
        {
          q: "Splitting water yields twice as much H₂ as O₂ because…",
          choices: [
            "hydrogen is lighter",
            "each H₂O contains two hydrogen atoms per oxygen",
            "oxygen escapes the tube",
            "the cathode is bigger",
          ],
          answer: 1,
          explain:
            "Stoichiometry made visible: 2 H₂O → 2 H₂ + O₂. The tubes read out the molecular formula of water.",
        },
        {
          q: "Below about 1.2 V, water electrolysis produces…",
          choices: [
            "half as much gas",
            "nothing — the applied push is smaller than the reaction's uphill grade",
            "only hydrogen",
            "steam",
          ],
          answer: 1,
          explain:
            "The threshold is the energy price per electron of the uphill reaction. Pay less and no electrons take the deal.",
        },
        {
          q: "Charging a rechargeable battery is really…",
          choices: [
            "refilling it with fresh electrons",
            "electrolysis: forcing its discharge reaction to run backwards",
            "warming its chemicals",
            "a software process",
          ],
          answer: 1,
          explain:
            "The charger drives the cell's spent chemistry uphill, restoring the reactants. Discharge then runs the galvanic direction again — a chemical cycle.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "lemon-battery",
      unitId: "u6",
      title: "Capstone: The Lemon Battery",
      subtitle:
        "Zinc screw + copper coin + citrus = a real galvanic cell. Stack a few and light an actual LED with fruit.",
      buildsOn: ["galvanic", "redox"],
      seeAlso: [
        {
          course: "spark",
          slug: "first-circuit",
          label: {
            en: "⚡ Spark 1.1 — Your First Circuit (what to wire the lemons into)",
            de: "⚡ Spark 1.1 — Deine erste Schaltung (wohin mit den Zitronen)",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>The shopping list</h2>
          <p>
            3–4 lemons (or potatoes — the vegetable is only the electrolyte, not the fuel!),
            galvanized (zinc-coated) screws, copper coins or stripped copper wire, alligator
            leads or taped wire, and one <strong>red LED</strong> — red, because it has the
            lowest turn-on voltage (~1.9 V; blue needs ~3 V and will humble your fruit).
          </p>

          <h2>What you are actually building</h2>
          <p>
            Each lemon is a Zn/Cu galvanic cell from lesson 6.2: the zinc screw is the anode
            (oxidized, dissolving invisibly slowly), the copper coin the cathode, the citric
            acid the electrolyte-slash-salt-bridge. Theory says ~1.1 V; a real lemon delivers
            about <strong>0.9 V</strong> — and, crucially, only a trickle of current, because
            ions crossing lemon pulp meet enormous <strong>internal resistance</strong> (your
            Spark Academy vocabulary, now with juice).
          </p>
          <div className="formula">
            V<sub>total</sub> = cells × ~0.9 V
            <span className="note">series stacking: Zn of one lemon wired to Cu of the next — voltages add, the resistance sadly too</span>
          </div>
          <p>
            One lemon (0.9 V) cannot open a 1.9 V LED — the electron push is simply too weak, no
            matter how long you wait. Two lemons (1.8 V) sit agonizingly at the doorstep. At{" "}
            <strong>three lemons (~2.7 V)</strong> the LED opens and glows — dimly, honestly,
            because the stacked internal resistance chokes the current to some tens of
            microamps. That dim glow is the point: you can <em>reason</em> about its dimness,
            quantitatively, with two courses&rsquo; worth of understanding.
          </p>

          <div className="callout warn">
            <span className="co-title">Troubleshooting the real build</span>
            <p>
              Dark LED? Check polarity first (long leg = +, toward the last copper). Then
              squeeze and roll each lemon to break cell walls, push the electrodes deeper (but
              never touching each other inside), sand the zinc shiny, and make sure each link
              goes Zn → Cu, not Zn → Zn. An LED is a diode — backwards it blocks completely,
              as a Spark graduate would expect.
            </p>
          </div>

          <div className="callout tip">
            <span className="co-title">Where this leaves you</span>
            <p>
              You have now travelled the whole arc: atoms → bonds → reactions → moles → acids →
              energy → electrons doing work in a wire. The lemon on your desk is the course
              diploma before the certificate: a chemical energy source you understand from the
              electron shell up. Check every box below — the certificate unlocks when both
              capstones are done.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Digital Twin: The Lemon Stack",
        intro: (
          <>
            <p>Simulate the build before you juice up the real one.</p>
            <ul>
              <li>One lemon: 0.9 V — dark. Two: 1.8 V — still dark. Find the magic number.</li>
              <li>Watch the current meter: even lit, it&rsquo;s microamps. Blame the internal resistance.</li>
              <li>Would six lemons make it dazzling? Check how much the brightness actually gains.</li>
            </ul>
          </>
        ),
        Component: LemonLab,
      },
      checklist: [
        { id: "gather", text: "Gather: 3–4 lemons, galvanized (zinc) screws, copper coins/wire, connecting wires, one red LED." },
        { id: "roll", text: "Roll and squeeze each lemon firmly to break the inner cell walls (better electrolyte contact)." },
        { id: "electrodes", text: "Push one zinc screw and one copper piece into each lemon, a few cm apart, never touching inside." },
        { id: "series", text: "Wire the lemons in series: each lemon's copper to the next lemon's zinc." },
        { id: "measure", text: "If you have a multimeter (Spark grads do): measure one lemon (~0.9 V) and the full stack." },
        { id: "led", text: "Connect the LED — long leg (+) to the final copper, short leg to the first zinc — and dim the room lights." },
        { id: "explain", text: "Explain to someone (or a rubber duck) why one lemon can't do it and why the glow is dim — using anode, cathode and internal resistance." },
      ],
    },
  ],
};
