import type { UnitModule } from "./types";
import { IonicLab, CovalentLab, BondLab, ShapeLab, IMFLab } from "@/catalyst/components/labs/labs-unit1";

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
            "Electrostatic attraction between opposite charges",
            "A shared pair of electrons",
            "Tiny hooks on the atoms",
            "Gravity",
          ],
          answer: 0,
          explain:
            "After the electron transfer both particles are charged ions, and + attracts −. The ionic bond is pure electrostatics — no sharing involved.",
        },
        {
          q: "Why does magnesium form MgCl₂ but MgO (not MgO₂)?",
          choices: [
            "Chlorine is bigger than oxygen",
            "It's a historical convention",
            "Oxygen is a gas",
            "Charges must balance: Mg²⁺ needs two Cl⁻ but only one O²⁻",
          ],
          answer: 3,
          explain:
            "Mg gives 2 electrons. Each Cl accepts one (so two are needed); one O accepts both. Formulas of ionic compounds are charge bookkeeping.",
        },
        {
          q: "Why do salts have such high melting points?",
          choices: [
            "Their atoms are unusually heavy",
            "They contain water",
            "Melting must overcome the attraction of an entire ion lattice",
            "They don't — salts melt easily",
          ],
          answer: 2,
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
            "Its triple bond is extremely strong and hard to break",
            "Its atoms are too far apart",
            "Nitrogen is a noble gas",
            "It is lighter than oxygen",
          ],
          answer: 0,
          explain:
            "Three shared pairs bind the two N atoms with one of the strongest bonds in chemistry. Breaking it (e.g. in the Haber process) costs enormous energy.",
        },
        {
          q: "How many covalent bonds does carbon typically form, and why?",
          choices: [
            "2 — it has 2 spare electrons",
            "It varies randomly",
            "8 — one per octet electron",
            "4 — it has 4 valence electrons and needs 4 more",
          ],
          answer: 3,
          explain:
            "With 4 valence electrons and 4 vacancies, carbon shares four pairs. Those four hands make it the backbone element of organic chemistry.",
        },
        {
          q: "Why is the water molecule bent instead of straight?",
          choices: [
            "Hydrogen atoms repel each other",
            "Gravity bends it",
            "Oxygen's two lone pairs take up space and push the bonds together",
            "It isn't — water is linear",
          ],
          answer: 2,
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
            "Their atoms vibrate quickly",
            "They contain trapped lightning",
            "Their valence electrons form a mobile sea that can drift through the lattice",
          ],
          answer: 3,
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
          choices: ["polar covalent — shared but shifted toward Cl", "nonpolar covalent", "ionic", "metallic"],
          answer: 0,
          explain:
            "0.4 < 0.96 < 1.7: shared, but chlorine wins the tug-of-war. Cl turns δ−, H turns δ+ — the molecule is a dipole.",
        },
        {
          q: "Why does salt dissolve in water but not in oil?",
          choices: [
            "Oil is too thick",
            "Salt is afraid of oil",
            "Water's polar molecules pry ions from the lattice; nonpolar oil offers no such grip",
            "Oil molecules are too large",
          ],
          answer: 2,
          explain:
            "Water's δ+/δ− poles surround and stabilize the ions, out-competing the lattice. Nonpolar oil has no poles to offer — like dissolves like.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "molecular-shapes",
      unitId: "u1",
      title: "Molecular Shapes & Why Water Is Bent",
      subtitle:
        "Electron groups repel and push as far apart as they can. The shape that results decides whether a molecule is polar — and water's shape decides most of biology.",
      buildsOn: ["covalent"],
      Theory: () => (
        <>
          <h2>One rule: electron groups repel</h2>
          <p>
            Molecules are three-dimensional objects with definite shapes, and you can predict those
            shapes from a single idea called <strong>VSEPR</strong> (Valence Shell Electron Pair
            Repulsion). It says: <em>groups of electrons around a central atom all repel each other,
            so they arrange themselves as far apart as possible.</em>
          </p>
          <p>
            A &ldquo;group&rdquo; is either a bond (single, double or triple — each counts once) or a{" "}
            <strong>lone pair</strong>: a pair of valence electrons on the central atom that is not
            bonded to anything. Count the groups, and geometry does the rest:
          </p>
          <table>
            <thead>
              <tr>
                <th>Groups</th>
                <th>Arrangement</th>
                <th>Angle</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>2</td><td>linear</td><td>180°</td></tr>
              <tr><td>3</td><td>trigonal planar</td><td>120°</td></tr>
              <tr><td>4</td><td>tetrahedral</td><td>109.5°</td></tr>
            </tbody>
          </table>
          <p>
            Methane, CH₄, has four bonds and no lone pairs, so the hydrogens sit at the four corners
            of a tetrahedron at 109.5°. Not flat — a genuinely three-dimensional shape, and the
            reason organic chemistry is so rich.
          </p>

          <h2>Lone pairs push harder</h2>
          <p>
            A lone pair is held by only one nucleus, so it spreads out more and pushes{" "}
            <em>harder</em> than a bonding pair. And when you name a shape, you name what you can
            see — the atoms — not the invisible lone pairs.
          </p>
          <p>Take the three neighbours in period 2, each with four electron groups:</p>
          <ul>
            <li>
              <strong>Methane CH₄</strong>: 4 bonds, 0 lone pairs → <em>tetrahedral</em>, 109.5°.
            </li>
            <li>
              <strong>Ammonia NH₃</strong>: 3 bonds, 1 lone pair → the pair presses down, giving a{" "}
              <em>trigonal pyramid</em> at 107°.
            </li>
            <li>
              <strong>Water H₂O</strong>: 2 bonds, 2 lone pairs → two pairs press down, giving a{" "}
              <em>bent</em> molecule at 104.5°.
            </li>
          </ul>
          <p>
            The same underlying tetrahedral arrangement every time; the shape you observe changes
            because some corners are occupied by things you cannot see.
          </p>

          <h2>Polar bonds do not always make a polar molecule</h2>
          <p>
            This is the payoff, and the part most often got wrong. A molecule&rsquo;s overall
            polarity depends on <strong>both</strong> its bond dipoles and its shape, because
            dipoles are vectors — they can cancel.
          </p>
          <p>
            <strong>Carbon dioxide, O=C=O</strong>, has two strongly polar bonds. But the molecule
            is linear, so the two pulls point in exactly opposite directions and cancel perfectly.
            CO₂ is <em>nonpolar</em> despite its polar bonds.
          </p>
          <p>
            <strong>Water, H₂O</strong>, has two polar bonds too — but it is bent at 104.5°, so the
            pulls do <em>not</em> cancel. They add to give a strong net dipole pointing from the
            hydrogens towards the oxygen. Water is a strongly polar molecule.
          </p>
          <div className="callout tip">
            <span className="co-title">Everything downstream depends on that 104.5°</span>
            <p>
              Because water is bent and polar, it dissolves salts and sugars, it climbs tree trunks,
              it has a huge heat capacity that stabilises the climate, and its solid form is less
              dense than its liquid, so ice floats and lakes freeze from the top down. Had oxygen
              lacked those two lone pairs, water would be a linear, nonpolar gas at room
              temperature — and none of that, including you, would be here.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Shape & Polarity Explorer",
        intro: (
          <>
            <p>Five molecules, drawn with their lone pairs and their net dipole.</p>
            <ul>
              <li>Step CH₄ → NH₃ → H₂O and watch the lone pairs squeeze the bond angle down each time.</li>
              <li>Compare CO₂ and H₂O: both have two polar bonds, but only one is a polar molecule. Shape decides.</li>
              <li>Hide the lone pairs. The shape suddenly looks arbitrary — that is why VSEPR counts what you cannot see.</li>
            </ul>
          </>
        ),
        Component: ShapeLab,
      },
      quiz: [
        {
          q: "What does VSEPR theory say determines molecular shape?",
          choices: [
            "Molecules always adopt the flattest possible shape",
            "Atoms arrange themselves by atomic mass",
            "Electron groups around the central atom repel and get as far apart as possible",
            "The nucleus pulls all the atoms into a line",
          ],
          answer: 2,
          explain:
            "Bonds and lone pairs are regions of negative charge. They repel, and the shape is whatever arrangement maximises their separation.",
        },
        {
          q: "Water's bond angle is 104.5°, less than methane's 109.5°. Why?",
          choices: [
            "Oxygen is heavier than carbon",
            "Water's two lone pairs repel more strongly than bonding pairs and squeeze the bonds together",
            "Water has only two bonds, so they spread out less",
            "Water molecules vibrate constantly",
          ],
          answer: 1,
          explain:
            "A lone pair is held by one nucleus only, spreads out more, and pushes harder — compressing the H–O–H angle below the ideal tetrahedral value.",
        },
        {
          q: "CO₂ has two polar C=O bonds but is a nonpolar molecule. Why?",
          choices: [
            "It is linear, so the two bond dipoles point opposite each other and cancel",
            "The bonds are actually nonpolar",
            "Carbon dioxide is ionic",
            "Oxygen and carbon have the same electronegativity",
          ],
          answer: 0,
          explain:
            "Dipoles are vectors. In a linear O=C=O the two equal pulls point 180° apart and sum to zero, leaving no net dipole.",
        },
        {
          q: "A central atom has 3 bonds and 1 lone pair. What shape is the molecule?",
          choices: ["Tetrahedral", "Trigonal planar", "Linear", "Trigonal pyramidal"],
          answer: 3,
          explain:
            "Four electron groups arrange tetrahedrally, but you name only the atoms you can see: three bonds pushed down by a lone pair form a trigonal pyramid, like NH₃.",
        },
        {
          q: "Which pair of facts together makes a molecule polar overall?",
          choices: [
            "Polar bonds and an asymmetric shape that stops them cancelling",
            "Polar bonds and a symmetric shape",
            "Nonpolar bonds and an asymmetric shape",
            "Any molecule that contains oxygen",
          ],
          answer: 0,
          explain:
            "You need both: bond dipoles to exist, and a geometry in which they do not cancel. Symmetric molecules with polar bonds (CO₂, CH₄, BF₃) come out nonpolar.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "intermolecular",
      unitId: "u1",
      title: "Intermolecular Forces",
      subtitle:
        "The weak attractions between molecules decide whether something is a gas, a liquid or a solid — and they are the reason water behaves like nothing else.",
      buildsOn: ["molecular-shapes", "bond-spectrum"],
      Theory: () => (
        <>
          <h2>The forces between, not within</h2>
          <p>
            Covalent bonds hold a molecule together. <strong>Intermolecular forces</strong> hold
            separate molecules to <em>each other</em>. They are far weaker — typically a few percent
            as strong — and they never appear in a chemical equation. But they decide almost every
            physical property you can observe: melting point, boiling point, viscosity, surface
            tension, whether something dissolves.
          </p>
          <p>Three kinds matter, weakest first.</p>

          <h3>1. London dispersion forces (in everything)</h3>
          <p>
            Electrons move. At any instant they may happen to bunch on one side of a molecule,
            creating a fleeting dipole, which induces an opposite fleeting dipole in a neighbour —
            and for that moment the two attract. Averaged over time it is a real, if feeble, force.
          </p>
          <p>
            Dispersion forces exist in <em>every</em> substance and grow with the number of
            electrons. That is why the noble gases liquefy in order down the group, and why methane
            is a gas while candle wax — the same kind of molecule, just far longer — is a solid.
          </p>

          <h3>2. Dipole–dipole forces (in polar molecules)</h3>
          <p>
            Polar molecules have permanent δ+ and δ− ends, so they line up and attract head to tail.
            Stronger than dispersion for molecules of similar size, which is why polar substances
            generally boil higher than nonpolar ones of comparable mass.
          </p>

          <h3>3. Hydrogen bonding (the strong one)</h3>
          <p>
            A special, unusually strong case of dipole–dipole. It requires hydrogen bonded directly
            to <strong>N, O or F</strong> — the three small, greedy atoms. Hydrogen has just one
            electron, so when oxygen or fluorine pulls that electron away, what remains is close to
            a bare proton: a very concentrated positive charge that can get very close to a lone
            pair on a neighbouring molecule.
          </p>
          <div className="callout note">
            <span className="co-title">Remember the three: N, O, F</span>
            <p>
              Hydrogen bonds need H attached to <strong>N</strong>itrogen, <strong>O</strong>xygen
              or <strong>F</strong>luorine. H–Cl does not qualify: chlorine is polar enough but too
              large, so its charge is too spread out. The German memory hook is short:{" "}
              <em>„NOF — sonst nix.“</em>
            </p>
          </div>

          <h2>The anomaly that proves it</h2>
          <p>
            Compare the hydrides of group 16 — H₂O, H₂S, H₂Se, H₂Te. Dispersion forces grow with
            size, so boiling points should rise steadily down the group. They do, for the last
            three. Water, the smallest and lightest, should boil around −80 °C.
          </p>
          <p>
            It boils at <strong>+100 °C</strong>. That 180-degree discrepancy is hydrogen bonding,
            and it is why there is liquid water on this planet at all.
          </p>
          <p>
            Water is exceptional even among hydrogen-bonded substances, because of its shape. Each
            molecule has two hydrogens to donate <em>and</em> two lone pairs to accept — so every
            water molecule can hold four neighbours at once, building a continuous network. Ammonia
            has three hydrogens but only one lone pair; hydrogen fluoride has one hydrogen and three
            lone pairs. Only water is balanced.
          </p>
          <p>Follow the consequences:</p>
          <ul>
            <li>
              <strong>Ice floats.</strong> Freezing locks the network into an open hexagonal cage
              that is <em>less</em> dense than the liquid. Almost every other substance sinks in
              itself. Lakes therefore freeze from the top down, and life survives underneath.
            </li>
            <li>
              <strong>Huge heat capacity.</strong> Warming water means loosening a vast web of
              hydrogen bonds, which absorbs enormous energy — oceans moderate the climate, and sweat
              cools you efficiently.
            </li>
            <li>
              <strong>Surface tension.</strong> Molecules at the surface are pulled inwards by
              neighbours with nothing above to balance them. Insects walk on it.
            </li>
            <li>
              <strong>&ldquo;Like dissolves like.&rdquo;</strong> Polar water dissolves polar and
              ionic things and refuses nonpolar ones, because it would have to break its own
              hydrogen-bond network to make room for a molecule that offers nothing in return.
            </li>
          </ul>
        </>
      ),
      lab: {
        title: "Boiling Point Lab",
        intro: (
          <>
            <p>
              Four small molecules, one thermometer. The purple lines are the attractions between
              molecules.
            </p>
            <ul>
              <li>Set the temperature to −50 °C and step through all four substances. Two are gases, two are liquids.</li>
              <li>Compare CH₄ (M = 16) with H₂O (M = 18) — nearly the same mass, 261 degrees apart in boiling point.</li>
              <li>Raise the temperature past the boiling point and watch the attraction lines let go.</li>
            </ul>
          </>
        ),
        Component: IMFLab,
      },
      quiz: [
        {
          q: "Which forces are broken when a molecular substance boils?",
          choices: [
            "The covalent bonds inside the molecules",
            "The intermolecular forces between molecules",
            "Ionic bonds",
            "Nuclear forces",
          ],
          answer: 1,
          explain:
            "Boiling separates whole molecules from each other. The covalent bonds inside them survive intact — steam is still H₂O.",
        },
        {
          q: "Hydrogen bonding requires hydrogen to be bonded to which atoms?",
          choices: ["Nitrogen, oxygen or fluorine", "Carbon, nitrogen or sulfur", "Any nonmetal", "Only oxygen"],
          answer: 0,
          explain:
            "Only N, O and F are small and electronegative enough to strip hydrogen nearly bare and leave a concentrated positive charge — „NOF, sonst nix“.",
        },
        {
          q: "Water (M = 18) boils at 100 °C while methane (M = 16) boils at −161 °C. Why?",
          choices: [
            "Water molecules are much heavier",
            "Methane has stronger covalent bonds",
            "Water forms hydrogen bonds; methane is nonpolar and has only weak dispersion forces",
            "Water is ionic",
          ],
          answer: 2,
          explain:
            "At nearly identical mass the only difference is intermolecular attraction. Water's hydrogen-bond network is dramatically stronger.",
        },
        {
          q: "Why does ice float on water?",
          choices: [
            "Ice contains trapped air",
            "Cold water expands because its covalent bonds lengthen",
            "Ice molecules are lighter than water molecules",
            "Hydrogen bonds lock the molecules into an open cage that is less dense than the liquid",
          ],
          answer: 3,
          explain:
            "Freezing fixes each molecule to four neighbours in a hexagonal lattice with gaps in it. That open structure is less dense than liquid water, so ice floats.",
        },
        {
          q: "Why does oil refuse to dissolve in water?",
          choices: [
            "Oil is nonpolar and offers nothing to replace the hydrogen bonds water would have to break",
            "Oil molecules are too large",
            "Oil is denser than water",
            "Oil reacts with water",
          ],
          answer: 0,
          explain:
            "Dissolving would cost water its hydrogen-bond network with no compensating attraction to nonpolar oil. 'Like dissolves like' is that energy balance stated briefly.",
        },
      ],
    },
  ],
};
