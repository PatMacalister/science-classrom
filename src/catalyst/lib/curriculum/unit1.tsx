import type { UnitModule } from "./types";
import { IonicLab, CovalentLab, BondLab } from "@/catalyst/components/labs/labs-unit1";

export const unit1: UnitModule = {
  unit: {
    id: "u1",
    num: 1,
    title: "Chemical Bonds",
    blurb:
      "Why atoms stick together at all: electron theft, electron sharing, and the electron sea — three deals, one goal: a full outer shell.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "ionic",
      unitId: "u1",
      title: "Ionic Bonds: Give and Take",
      subtitle:
        "Sodium wants to lose an electron; chlorine wants to gain one. The deal of the century — and the reason salt exists.",
      buildsOn: ["shells", "periodic-table"],
      Theory: () => (
        <>
          <h2>A trade both sides win</h2>
          <p>
            Remember the two frustrated families from Unit 0: alkali metals carry{" "}
            <strong>one electron too many</strong> on their top shell, halogens are{" "}
            <strong>one electron short</strong>. Bring sodium and chlorine together and the
            solution is obvious — sodium&rsquo;s outer electron simply <em>moves house</em>:
          </p>
          <div className="formula">
            Na (2·8·1) + Cl (2·8·7) → Na⁺ (2·8) + Cl⁻ (2·8·8)
            <span className="note">one electron transfers; both ions end with sealed, full shells</span>
          </div>
          <p>
            After the trade, sodium is a <strong>cation</strong> (Na⁺) and chlorine an{" "}
            <strong>anion</strong> (Cl⁻) — and here electrostatics takes over: opposite charges
            attract with brutal strength. That attraction <em>is</em> the{" "}
            <strong>ionic bond</strong>. Nothing is glued or hooked; the ions are simply unable
            to leave each other&rsquo;s electric field.
          </p>

          <h2>Not pairs — lattices</h2>
          <p>
            An Na⁺ ion doesn&rsquo;t bond to <em>one</em> Cl⁻; it attracts every negative ion
            around it. The result is a <strong>crystal lattice</strong>: alternating + and −
            ions stacked in a perfect 3D grid, each ion held by six neighbours. That&rsquo;s why
            &ldquo;a molecule of salt&rdquo; doesn&rsquo;t really exist — NaCl is a{" "}
            <em>ratio</em>, not a molecule. It&rsquo;s also why salts are hard, brittle
            crystals with high melting points: to melt salt you must overpower the attraction of
            an entire lattice (801 °C for NaCl).
          </p>

          <h2>Charges must balance</h2>
          <p>
            Magnesium (2·8·2) sheds <em>two</em> electrons and becomes Mg²⁺. Oxygen (2·6) wants
            two and becomes O²⁻ — so MgO pairs one-to-one. But chlorine only accepts <em>one</em>{" "}
            electron, so magnesium must serve two customers: MgCl₂. The formula of any ionic
            compound is just charge bookkeeping — total + must cancel total −.
          </p>

          <div className="callout warn">
            <span className="co-title">Ionic compounds ≠ their elements</span>
            <p>
              Sodium is a metal that explodes in water; chlorine is a poison gas used in WWI.
              Their ionic compound is something you sprinkle on chips. A compound&rsquo;s
              properties belong to the compound, not to its ingredients — one of chemistry&rsquo;s
              most useful surprises.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Electron Handover",
        intro: (
          <>
            <p>Make an ionic bond happen one electron at a time.</p>
            <ul>
              <li>Transfer sodium&rsquo;s outer electron — watch both ions light up charged and both shells seal.</li>
              <li>Switch to Mg + O: now it takes <em>two</em> transfers to satisfy both sides.</li>
              <li>After the handover, notice the attraction arrows — that pull is the bond.</li>
            </ul>
          </>
        ),
        Component: IonicLab,
      },
      quiz: [
        {
          q: "What actually holds Na⁺ and Cl⁻ together in salt?",
          choices: [
            "A shared pair of electrons",
            "Electrostatic attraction between opposite charges",
            "Tiny hooks on the atoms",
            "Gravity",
          ],
          answer: 1,
          explain:
            "After the electron transfer both particles are charged ions, and + attracts −. The ionic bond is pure electrostatics — no sharing involved.",
        },
        {
          q: "Why does magnesium form MgCl₂ but MgO (not MgO₂)?",
          choices: [
            "Chlorine is bigger than oxygen",
            "Charges must balance: Mg²⁺ needs two Cl⁻ but only one O²⁻",
            "Oxygen is a gas",
            "It's a historical convention",
          ],
          answer: 1,
          explain:
            "Mg gives 2 electrons. Each Cl accepts one (so two are needed); one O accepts both. Formulas of ionic compounds are charge bookkeeping.",
        },
        {
          q: "Why do salts have such high melting points?",
          choices: [
            "Their atoms are unusually heavy",
            "Melting must overcome the attraction of an entire ion lattice",
            "They contain water",
            "They don't — salts melt easily",
          ],
          answer: 1,
          explain:
            "Every ion is held by all its oppositely-charged neighbours in a 3D lattice. Breaking that collective grip takes serious heat — 801 °C for NaCl.",
        },
        {
          q: "Sodium metal explodes in water; chlorine is toxic. Why is NaCl safe on your chips?",
          choices: [
            "The dangerous parts evaporate",
            "A compound's properties are its own, not a mix of its elements'",
            "Table salt contains almost no sodium",
            "Cooking neutralizes them",
          ],
          answer: 1,
          explain:
            "Na⁺ ions with sealed shells are chemically nothing like neutral Na atoms with a loose electron. New electron structure, new properties.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "covalent",
      unitId: "u1",
      title: "Covalent Bonds: Sharing Pairs",
      subtitle:
        "When neither atom will surrender an electron, they compromise: shared pairs that count for both. Welcome to molecules.",
      buildsOn: ["ionic"],
      Theory: () => (
        <>
          <h2>The non-metal compromise</h2>
          <p>
            Two chlorine atoms meet. Both are one electron short; neither will give one up. The
            way out: each contributes one electron to a <strong>shared pair</strong> that sits
            between the two nuclei and — here&rsquo;s the trick —{" "}
            <strong>counts toward both atoms&rsquo; shells at once</strong>. Each Cl now
            &ldquo;sees&rdquo; 8 outer electrons. This shared pair is a{" "}
            <strong>covalent bond</strong>, and the bonded unit is a <strong>molecule</strong>.
          </p>

          <h2>Single, double, triple</h2>
          <p>
            One shared pair makes a <strong>single bond</strong> (H–H). If one pair isn&rsquo;t
            enough, atoms share two (a <strong>double bond</strong>, O=O) or even three (a{" "}
            <strong>triple bond</strong>, N≡N). More shared pairs bind tighter: nitrogen&rsquo;s
            triple bond is so strong that N₂ — 78% of the air you breathe — behaves almost like a
            noble gas. Breaking it to make fertilizer (the Haber process) consumes about 1% of
            humanity&rsquo;s entire energy supply.
          </p>
          <div className="formula">
            H needs 2 · most others need 8
            <span className="note">count each atom&rsquo;s own electrons + one per shared pair — the octet check</span>
          </div>

          <h2>Reading a molecule</h2>
          <p>
            Carbon has 4 valence electrons and needs 4 more, so it makes <strong>four bonds</strong>{" "}
            — the four hands that let it build chains, rings and eventually DNA. Oxygen makes
            two bonds, nitrogen three, hydrogen exactly one. With just that counting rule you can
            predict the shape of most small molecules: H₂O is oxygen with two hands holding two
            hydrogens; CO₂ is carbon double-handing two oxygens; CH₄ is carbon holding four
            hydrogens.
          </p>

          <div className="callout note">
            <span className="co-title">Lone pairs matter too</span>
            <p>
              Electrons that stay home (not shared) are <strong>lone pairs</strong>. They take up
              space and shove the bonds around — that&rsquo;s why water is bent at ~104.5° rather
              than straight. And a bent molecule with unevenly shared electrons becomes a little
              magnet… which is the next lesson, and ultimately the reason ice floats and life
              works.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Molecule Workshop",
        intro: (
          <>
            <p>Six molecules, from a single shared pair to a triple bond.</p>
            <ul>
              <li>Check the octet counter under every atom: own electrons + shared pairs.</li>
              <li>Compare O₂ and N₂ — count the cyan pairs in the bond.</li>
              <li>Look at H₂O&rsquo;s violet lone pairs pushing the molecule into its bent shape.</li>
            </ul>
          </>
        ),
        Component: CovalentLab,
      },
      quiz: [
        {
          q: "In a covalent bond, the shared electron pair…",
          choices: [
            "belongs to the bigger atom",
            "counts toward the shells of both atoms simultaneously",
            "is lost by both atoms",
            "orbits the whole molecule randomly",
          ],
          answer: 1,
          explain:
            "That's the covalent trick: one pair, two ledgers. Each atom counts the shared pair toward its own full shell.",
        },
        {
          q: "Why is N₂ so unreactive that it makes up 78% of air without doing much?",
          choices: [
            "Nitrogen is a noble gas",
            "Its atoms are too far apart",
            "Its triple bond is extremely strong and hard to break",
            "It is lighter than oxygen",
          ],
          answer: 2,
          explain:
            "Three shared pairs bind the two N atoms with one of the strongest bonds in chemistry. Breaking it (e.g. in the Haber process) costs enormous energy.",
        },
        {
          q: "How many covalent bonds does carbon typically form, and why?",
          choices: [
            "2 — it has 2 spare electrons",
            "4 — it has 4 valence electrons and needs 4 more",
            "8 — one per octet electron",
            "It varies randomly",
          ],
          answer: 1,
          explain:
            "With 4 valence electrons and 4 vacancies, carbon shares four pairs. Those four hands make it the backbone element of organic chemistry.",
        },
        {
          q: "Why is the water molecule bent instead of straight?",
          choices: [
            "Hydrogen atoms repel each other",
            "Oxygen's two lone pairs take up space and push the bonds together",
            "Gravity bends it",
            "It isn't — water is linear",
          ],
          answer: 1,
          explain:
            "Oxygen carries two unshared (lone) pairs. Electron clouds repel, so the lone pairs squeeze the two O–H bonds to ~104.5°.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "bond-spectrum",
      unitId: "u1",
      title: "Metallic Bonds & the Bond Spectrum",
      subtitle:
        "Metals share an electron sea; molecules share unevenly. One number — electronegativity — sorts every bond in between.",
      buildsOn: ["ionic", "covalent"],
      Theory: () => (
        <>
          <h2>The third deal: the electron sea</h2>
          <p>
            Metal atoms all want to <em>lose</em> electrons — so when only metal atoms are
            around, nobody will take them. The solution is collective: every atom releases its
            valence electrons into a shared, mobile <strong>&ldquo;electron sea&rdquo;</strong>{" "}
            that washes around a grid of positive metal ions. The sea glues the lattice together
            — that is the <strong>metallic bond</strong> — and because the electrons are free to
            drift, metals conduct electricity and heat, and can be bent without shattering (the
            ions slide; the sea flows around them). One picture explains a wire, a mirror and a
            horseshoe.
          </p>

          <h2>Electronegativity: the pull rating</h2>
          <p>
            Ionic and covalent are not two boxes — they are ends of a slider. What sets the
            slider is <strong>electronegativity (χ)</strong>: how strongly an atom pulls on
            shared electrons. Fluorine is the champion (χ = 3.98); francium and caesium barely
            pull at all (χ ≈ 0.8). For any bond, compute the difference:
          </p>
          <div className="formula">
            Δχ &lt; 0.4: nonpolar covalent&nbsp;&nbsp;·&nbsp;&nbsp;0.4 – 1.7: polar covalent&nbsp;&nbsp;·&nbsp;&nbsp;Δχ &gt; 1.7: ionic
            <span className="note">rules of thumb — the boundaries are fuzzy, the idea is not</span>
          </div>
          <p>
            A <strong>polar covalent</strong> bond is a tug-of-war one side is winning: the pair
            is shared, but it sags toward the stronger atom, which turns slightly negative
            (δ−) while the weaker end turns slightly positive (δ+). The molecule becomes a tiny
            two-poled magnet — a <strong>dipole</strong>.
          </p>

          <h2>Why polarity runs the world</h2>
          <p>
            Water is the poster child: O–H bonds are strongly polar (Δχ = 1.24), and the bent
            shape (last lesson!) keeps the two dipoles from cancelling. So every water molecule
            has a − side and a + side, and neighbouring molecules snap together like weak
            magnets — <strong>hydrogen bonds</strong>. That&rsquo;s why water boils at 100 °C
            instead of −80 °C, why it dissolves salts (its poles pry ions from the lattice), and
            why ice floats. No polarity, no oceans, no you.
          </p>

          <div className="callout tip">
            <span className="co-title">Like dissolves like</span>
            <p>
              Polar solvents (water) dissolve polar and ionic stuff (salt, sugar). Nonpolar
              solvents (oil) dissolve nonpolar stuff (fat, wax). This single rule explains
              why oil and water refuse to mix — and why you need soap, a molecule with one polar
              end and one nonpolar tail, to bridge the two worlds.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Tug-of-War Classifier",
        intro: (
          <>
            <p>Pick any two atoms and watch the electron cloud settle the argument.</p>
            <ul>
              <li>Na + Cl: watch the cloud get ripped clean off — ionic.</li>
              <li>H + O: the cloud sags — polar covalent, with δ+ and δ− poles.</li>
              <li>C + H: an almost fair fight — this near-nonpolar pair is why oil ignores water.</li>
              <li>Cu + Fe: two metals — no tug-of-war at all, just the electron sea.</li>
            </ul>
          </>
        ),
        Component: BondLab,
      },
      quiz: [
        {
          q: "Why do metals conduct electricity?",
          choices: [
            "Their nuclei are charged",
            "Their valence electrons form a mobile sea that can drift through the lattice",
            "They contain trapped lightning",
            "Their atoms vibrate quickly",
          ],
          answer: 1,
          explain:
            "In the metallic bond, valence electrons belong to no atom in particular. Free-drifting charge is precisely what an electric current needs.",
        },
        {
          q: "Electronegativity measures…",
          choices: [
            "an atom's mass",
            "how strongly an atom pulls on shared bonding electrons",
            "how negative an ion can get",
            "an atom's size",
          ],
          answer: 1,
          explain:
            "χ rates the pull in the tug-of-war over shared pairs. The difference Δχ between two atoms predicts the bond type.",
        },
        {
          q: "H–Cl has Δχ ≈ 0.96. This bond is…",
          choices: ["ionic", "nonpolar covalent", "polar covalent — shared but shifted toward Cl", "metallic"],
          answer: 2,
          explain:
            "0.4 < 0.96 < 1.7: shared, but chlorine wins the tug-of-war. Cl turns δ−, H turns δ+ — the molecule is a dipole.",
        },
        {
          q: "Why does salt dissolve in water but not in oil?",
          choices: [
            "Oil is too thick",
            "Water's polar molecules pry ions from the lattice; nonpolar oil offers no such grip",
            "Salt is afraid of oil",
            "Oil molecules are too large",
          ],
          answer: 1,
          explain:
            "Water's δ+/δ− poles surround and stabilize the ions, out-competing the lattice. Nonpolar oil has no poles to offer — like dissolves like.",
        },
      ],
    },
  ],
};
