import type { UnitModule } from "./types";
import { CoulombLab, VoltageLab, CurrentLab } from "@/spark/components/labs/labs-unit0";

export const unit0: UnitModule = {
  unit: {
    id: "u0",
    num: 0,
    title: "The Physics of Electricity",
    blurb:
      "Where charge comes from, what voltage really is, and what it means for current to flow — the foundation everything else stands on.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "charge",
      unitId: "u0",
      seeAlso: [
        {
          course: "catalyst",
          slug: "atoms",
          label: {
            en: "⚗️ Catalyst 0.1 — Atoms: the same particles, counted instead of pushed",
            de: "⚗️ Catalyst 0.1 — Atome: dieselben Teilchen, gezählt statt geschoben",
          },
        },
      ],
      title: "Electric Charge & the Atom",
      subtitle:
        "Everything electrical begins with a property of matter so fundamental we can only describe what it does: charge.",
      Theory: () => (
        <>
          <h2>It all starts inside the atom</h2>
          <p>
            Every object around you is made of atoms, and every atom is a tiny bundle of
            electricity. Its nucleus contains <strong>protons</strong>, each carrying a{" "}
            <strong>positive charge</strong>, and around the nucleus move{" "}
            <strong>electrons</strong>, each carrying an exactly equal and opposite{" "}
            <strong>negative charge</strong>. Normally the counts match, the charges cancel, and
            the atom looks neutral from the outside. All of electrical engineering comes down to
            one trick: <em>separating and moving those charges on purpose</em>.
          </p>
          <p>
            Charge is measured in <strong>coulombs (C)</strong>. A single electron carries a
            minuscule <code>−1.602 × 10⁻¹⁹ C</code>, so one coulomb corresponds to about{" "}
            <code>6.24 × 10¹⁸</code> electrons — six billion billion of them. Charge comes in
            whole-electron steps and it is never created or destroyed, only moved around.
          </p>

          <h2>The force between charges</h2>
          <p>
            Two charges push or pull on each other without touching:{" "}
            <strong>like charges repel, opposite charges attract</strong>. In 1785,
            Charles-Augustin de Coulomb measured exactly how strong that force is:
          </p>
          <div className="formula">
            F = k · q₁ · q₂ / r²
            <span className="note">k ≈ 8.99 × 10⁹ N·m²/C² — q in coulombs, r in metres</span>
          </div>
          <p>
            Two things matter here. The force grows with the <em>product</em> of the charges —
            double either one and the force doubles. And it falls with the{" "}
            <strong>square of the distance</strong>: pull the charges twice as far apart and the
            force drops to a quarter. This inverse-square law is the same mathematical shape as
            gravity — but electricity is astonishingly stronger. The electric repulsion between
            two protons is about 10³⁶ times larger than their gravitational attraction. The only
            reason you don&rsquo;t notice this colossal force in daily life is that positive and
            negative charges are almost perfectly mixed everywhere.
          </p>

          <h2>Conductors and insulators</h2>
          <p>
            In metals like copper, the outermost electron of each atom isn&rsquo;t attached to
            any particular atom — it drifts freely through the whole material as part of a
            shared &ldquo;sea&rdquo; of electrons. Materials like that are{" "}
            <strong>conductors</strong>: charge can move through them. In glass, rubber or
            plastic, every electron is held tightly to its atom, so charge stays put — those are{" "}
            <strong>insulators</strong>. A wire is exactly this idea made practical: a conducting
            copper core wearing an insulating plastic jacket so the charge goes only where we
            want it.
          </p>

          <div className="callout note">
            <span className="co-title">You already know static electricity</span>
            <p>
              Rub a balloon on your hair and you scrape electrons from hair onto balloon. The
              balloon becomes negative, your hair positive — and Coulomb&rsquo;s force makes your
              hair reach for the balloon. A doorknob shock in winter is the same thing at higher
              stakes: your body accumulated extra charge, and it all jumped the gap at once.
            </p>
          </div>

          <p>
            Static tricks are fun, but engineering needs charge that moves <em>continuously and
            controllably</em>. For that, we first need a way to give charges energy — which is
            the next lesson.
          </p>
        </>
      ),
      lab: {
        title: "Coulomb's Force Playground",
        intro: (
          <>
            <p>Two charges, one law. Drag them around and watch the force respond.</p>
            <ul>
              <li>Drag a charge slowly closer — notice how violently the force grows near the end (that&rsquo;s the 1/r²).</li>
              <li>Make both charges positive, then give them opposite signs. Watch the arrows flip.</li>
              <li>Set either charge to 0 µC. What happens to the force?</li>
            </ul>
          </>
        ),
        Component: CoulombLab,
      },
      quiz: [
        {
          q: "In a metal wire, which particles actually move to carry charge?",
          choices: ["Protons", "Neutrons", "Electrons", "Whole atoms"],
          answer: 2,
          explain:
            "Protons are locked inside atomic nuclei. In metals, the outer electrons form a free-moving 'sea' — they are the charge carriers.",
        },
        {
          q: "Two charges attract each other with a force F. If you double the distance between them, the force becomes…",
          choices: ["F/2", "F/4", "2F", "Unchanged"],
          answer: 1,
          explain:
            "Coulomb's law has r² in the denominator: doubling r divides the force by 2² = 4.",
        },
        {
          q: "What is the unit of electric charge?",
          choices: ["The volt", "The ampere", "The watt", "The coulomb"],
          answer: 3,
          explain:
            "Charge is measured in coulombs (C). One coulomb is the charge of about 6.24 × 10¹⁸ electrons.",
        },
        {
          q: "Why is copper used for wires while its plastic coating keeps you safe?",
          choices: [
            "Copper has free electrons; plastic holds its electrons tightly",
            "Copper is positively charged; plastic is negative",
            "Copper is heavier than plastic",
            "Plastic conducts, copper insulates",
          ],
          answer: 0,
          explain:
            "Copper is a conductor — its outer electrons drift freely. Plastic is an insulator — its electrons are bound, so charge can't flow through it into you.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "voltage",
      unitId: "u0",
      seeAlso: [
        {
          course: "catalyst",
          slug: "galvanic",
          label: {
            en: "⚗️ Catalyst 6.2 — where a battery's voltage actually comes from",
            de: "⚗️ Catalyst 6.2 — woher die Spannung einer Batterie wirklich kommt",
          },
        },
      ],
      title: "Voltage: Energy per Charge",
      subtitle:
        "Separating charges stores energy, like lifting a weight. Voltage measures how much energy every coulomb gets.",
      buildsOn: ["charge"],
      Theory: () => (
        <>
          <h2>Pushing charges apart stores energy</h2>
          <p>
            Coulomb&rsquo;s law from the last lesson cuts both ways. Opposite charges pull toward
            each other — so if you drag them <em>apart</em>, you have to do work against that
            pull, exactly like lifting a rock against gravity. That work doesn&rsquo;t vanish: it
            is stored as <strong>electric potential energy</strong>. Let go, and the charge
            &ldquo;falls&rdquo; back, converting that stored energy into motion.
          </p>
          <p>
            Here&rsquo;s the key move: instead of talking about the total energy (which depends
            on how much charge you have), we talk about the{" "}
            <strong>energy per unit of charge</strong>. That quantity is{" "}
            <strong>voltage</strong>, also called <em>potential difference</em>:
          </p>
          <div className="formula">
            V = W / Q
            <span className="note">1 volt = 1 joule of energy per coulomb of charge</span>
          </div>
          <p>
            A 9 V battery gives every coulomb that passes through it 9 joules of energy. A 1.5 V
            AA cell gives 1.5 joules per coulomb. Notice what voltage is <em>not</em>: it is not
            a thing that flows, and it is not energy by itself. It is a measure of how hard
            charges are being pushed from one point to another.
          </p>

          <h2>Always between two points</h2>
          <p>
            &ldquo;The voltage at this wire is 5 V&rdquo; is secretly a comparison — 5 V{" "}
            <em>relative to somewhere else</em>. Voltage is always measured{" "}
            <strong>between two points</strong>, like height: the top of a ladder is 2 m above
            the floor, but 0 m above the top of the ladder. In circuits we pick one reference
            point, call it <strong>ground (0 V)</strong>, and quote everything relative to it.
          </p>

          <h2>What a battery actually does</h2>
          <p>
            A battery is a chemical <strong>charge pump</strong>. Reactions inside push electrons
            toward one terminal (making it negative) and pull them from the other (making it
            positive), and keep pumping until the potential difference between the terminals
            reaches the battery&rsquo;s rated voltage. Connect a wire path between the terminals
            and the pump drives charge around the loop, spending its chemical energy at a rate
            set by the circuit. The battery doesn&rsquo;t <em>store</em> electrons — it stores
            energy and hands it to each coulomb passing through.
          </p>

          <div className="callout note">
            <span className="co-title">The water analogy (and its limits)</span>
            <p>
              Voltage is like water pressure: a taller water tower pushes water harder through a
              pipe. It&rsquo;s a genuinely useful mental picture — higher voltage, stronger push.
              Just remember the electrons don&rsquo;t get &ldquo;used up&rdquo; any more than
              water disappears in a water wheel; it is the <em>energy</em> that gets delivered.
            </p>
          </div>

          <h2>Fields: how the push travels</h2>
          <p>
            Between two oppositely charged plates there is an <strong>electric field</strong> —
            at every point in the gap, a positive charge feels a force from the + plate toward
            the − plate. The field is the invisible machinery behind voltage: a charge moving
            with the field gains energy, and moving it against the field costs energy. In the
            lab below you can feel this directly.
          </p>
        </>
      ),
      lab: {
        title: "The Potential Playground",
        intro: (
          <>
            <p>
              Two charged plates make a uniform field. Drag the test charge around, then let it
              fly.
            </p>
            <ul>
              <li>Drag the charge close to the + plate — watch its potential energy climb.</li>
              <li>Move it straight up and down along a dashed line. Does its energy change?</li>
              <li>Press <em>Release</em> at different voltages — higher voltage, harder launch.</li>
            </ul>
          </>
        ),
        Component: VoltageLab,
      },
      quiz: [
        {
          q: "One volt equals…",
          choices: [
            "One coulomb per second",
            "One electron per joule",
            "One newton per metre",
            "One joule per coulomb",
          ],
          answer: 3,
          explain: "V = W/Q: voltage is energy (joules) per charge (coulombs).",
        },
        {
          q: "A 9 V battery pushes 2 coulombs of charge through a circuit. How much energy did it deliver?",
          choices: ["4.5 J", "18 J", "9 J", "11 J"],
          answer: 1,
          explain: "W = V × Q = 9 V × 2 C = 18 joules.",
        },
        {
          q: "Which statement about voltage is correct?",
          choices: [
            "Voltage flows through wires",
            "Voltage is the number of electrons in a wire",
            "Voltage is always measured between two points",
            "A battery stores extra electrons",
          ],
          answer: 2,
          explain:
            "Voltage is a difference in potential between two points — like height, it needs a reference. Nothing called 'voltage' flows.",
        },
        {
          q: "In the plate lab, moving the test charge straight up or down (parallel to the plates) changed nothing about its energy. Why?",
          choices: [
            "It stayed on the same equipotential — same potential, same energy",
            "The simulation is simplified",
            "The charge was too small to matter",
            "The field only exists near the plates",
          ],
          answer: 0,
          explain:
            "Lines parallel to the plates are equipotentials: every point on one has the same potential, so moving along one costs no energy.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "current",
      unitId: "u0",
      title: "Current: Charge in Motion",
      subtitle:
        "Give charges a push and a path, and they flow. Current measures how much charge streams past per second.",
      buildsOn: ["charge", "voltage"],
      Theory: () => (
        <>
          <h2>Defining the flow</h2>
          <p>
            Put a voltage across a conductor and its free electrons drift. The amount of charge
            passing a point per second is the <strong>electric current</strong>:
          </p>
          <div className="formula">
            I = Q / t
            <span className="note">1 ampere = 1 coulomb per second</span>
          </div>
          <p>
            One <strong>ampere</strong> (amp, A) sounds modest until you remember what a coulomb
            is: at 1 A, about <code>6.24 × 10¹⁸</code> electrons cross any cross-section of the
            wire <em>every second</em>. Typical currents you&rsquo;ll meet: an LED sips about
            0.02 A (20 mA), a phone charger supplies a couple of amps, a kettle draws around 10 A.
          </p>

          <h2>Slow drift, instant signal</h2>
          <p>
            Here is the misconception-buster of the whole unit. The electrons themselves crawl —
            in a typical copper wire their average <em>drift speed</em> is well under a
            millimetre per second. Yet the light turns on the instant you flip the switch. How?
          </p>
          <p>
            Because the wire is already packed full of free electrons, end to end. Flipping the
            switch applies a field that starts <em>all of them moving at once</em> — like a tube
            completely full of marbles: push one in at this end and one pops out the far end
            immediately, even though each marble barely moved. The <em>push</em> travels near the
            speed of light; the electrons themselves amble.
          </p>

          <h2>Which way does it flow?</h2>
          <p>
            Benjamin Franklin guessed the direction of flow before anyone knew about electrons —
            and guessed wrong. By convention, current flows{" "}
            <strong>from + to −</strong> (&ldquo;conventional current&rdquo;), while the
            electrons actually drift from − to +. Engineers everywhere use conventional current;
            every formula, every datasheet, every arrow on every circuit symbol assumes it. It
            works perfectly, because negative charge moving left is mathematically identical to
            positive charge moving right. Follow the convention and forget the embarrassment.
          </p>

          <div className="callout warn">
            <span className="co-title">Current needs a closed loop</span>
            <p>
              Charge doesn&rsquo;t pile up in a wire or vanish at the end — it circulates.
              Current only flows when there is an unbroken conducting path from one battery
              terminal, through the circuit, back to the other terminal. Break the path anywhere
              and the current stops <em>everywhere</em>. This is why the next unit is about
              circuits: complete loops are where electricity does its work.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Charge Counter",
        intro: (
          <>
            <p>A magnified view inside a copper wire, with a counter across one cross-section.</p>
            <ul>
              <li>Set 1 A and watch the electron counter — that&rsquo;s 10¹⁸ electrons per second.</li>
              <li>Turn the current to zero. The electrons stop; the counter holds its total.</li>
              <li>Note the two arrows: conventional current one way, electron drift the other.</li>
            </ul>
          </>
        ),
        Component: CurrentLab,
      },
      quiz: [
        {
          q: "One ampere is…",
          choices: [
            "One joule per second",
            "One volt per metre",
            "One coulomb per second",
            "One electron per second",
          ],
          answer: 2,
          explain: "I = Q/t. A current of 1 A means 1 coulomb of charge passes per second.",
        },
        {
          q: "A steady 2 A flows for 10 seconds. How much charge passed?",
          choices: ["20 C", "5 C", "12 C", "0.2 C"],
          answer: 0,
          explain: "Q = I × t = 2 A × 10 s = 20 coulombs.",
        },
        {
          q: "Why does a lamp light instantly even though electrons drift slower than 1 mm/s?",
          choices: [
            "Electrons actually travel at light speed",
            "Heat from the switch travels down the wire",
            "The lamp stores electrons in advance",
            "The wire is already full of electrons that all start moving at once",
          ],
          answer: 3,
          explain:
            "The electric field propagates near light speed and sets the whole electron sea moving simultaneously — like a tube already full of marbles.",
        },
        {
          q: "Conventional current in a circuit flows…",
          choices: [
            "From − to +, the same direction as the electrons",
            "From + to −, opposite to the electron drift",
            "In both directions at once",
            "Only inside the battery",
          ],
          answer: 1,
          explain:
            "By historical convention current arrows point from + to −. The electrons drift the other way — both descriptions are physically equivalent.",
        },
      ],
    },
  ],
};
