import type { UnitModule } from "./types";
import { AtomBuilderLab, ShellLab, PeriodicTableLab, TrendsLab } from "@/catalyst/components/labs/labs-unit0";

export const unit0: UnitModule = {
  unit: {
    id: "u0",
    num: 0,
    title: "The Atom",
    blurb:
      "Matter's alphabet: what atoms are made of, where their electrons live, and the one chart that organizes all of chemistry.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "atoms",
      unitId: "u0",
      title: "Atoms: The Alphabet of Matter",
      subtitle:
        "Everything you can touch is spelled with just 118 letters. Each letter is an atom — and three tiny particles decide which one.",
      Theory: () => (
        <>
          <h2>Three particles, endless matter</h2>
          <p>
            Cut any piece of matter smaller and smaller and you eventually hit a limit: the{" "}
            <strong>atom</strong>. Atoms themselves are built from just three ingredients. In the
            centre sits a tiny, dense <strong>nucleus</strong> containing{" "}
            <strong>protons</strong> (positively charged) and <strong>neutrons</strong> (no
            charge). Around it buzz <strong>electrons</strong> (negatively charged), so light
            that the nucleus holds more than 99.9% of the atom&rsquo;s mass while filling almost
            none of its space. If an atom were a football stadium, the nucleus would be a pea on
            the centre spot — the rest is electron territory and emptiness.
          </p>

          <h2>The proton count is the element</h2>
          <p>
            Here is the single most important sentence in chemistry:{" "}
            <strong>the number of protons decides which element an atom is</strong>. Six protons?
            Carbon — always, everywhere in the universe. Seven? Nitrogen. Seventy-nine? Gold.
            This number is the <strong>atomic number Z</strong>, and it is why the periodic table
            is numbered: it simply counts protons from 1 (hydrogen) to 118 (oganesson).
          </p>
          <div className="formula">
            Z = protons&nbsp;&nbsp;·&nbsp;&nbsp;A = protons + neutrons
            <span className="note">Z picks the element; A is the mass number of this particular atom</span>
          </div>
          <p>
            Neutrons, by contrast, are negotiable. Carbon usually carries 6 of them (carbon-12),
            but some carbon atoms carry 7 or 8. Same element, different mass — these siblings are
            called <strong>isotopes</strong>. Most are perfectly stable; some, like carbon-14,
            slowly decay, which is exactly what makes radiocarbon dating work.
          </p>

          <h2>Ions: when the bookkeeping doesn&rsquo;t balance</h2>
          <p>
            A neutral atom has exactly as many electrons as protons. But electrons are the
            atom&rsquo;s loose change — they can be lost or gained. An atom that has lost
            electrons is positively charged (a <strong>cation</strong>); one that has gained
            electrons is negative (an <strong>anion</strong>). Note what did <em>not</em> change:
            the proton count. A sodium ion is still sodium. Ions are not exotic — the salt on
            your table is nothing but Na⁺ and Cl⁻ ions holding hands.
          </p>

          <div className="callout note">
            <span className="co-title">How small is small?</span>
            <p>
              A single water droplet contains about 10²¹ molecules — a thousand billion billion.
              If you could count one per second you&rsquo;d need thirty thousand times the age of
              the universe. Chemistry never handles atoms one at a time; it handles them in
              armies. (Unit 2 gives that army a name: the mole.)
            </p>
          </div>

          <p>
            In the lab below you are the architect: set the particle counts and watch the
            identity, mass and charge of your atom follow. One slider matters more than the
            others — find out which.
          </p>
        </>
      ),
      lab: {
        title: "The Atom Builder",
        intro: (
          <>
            <p>Assemble atoms particle by particle and watch the name plate react.</p>
            <ul>
              <li>Slide protons up and down — the element name changes with every step.</li>
              <li>Add neutrons: the mass number A climbs, the element stays put (isotopes!).</li>
              <li>Remove an electron from a neutral atom — you just made a cation.</li>
            </ul>
          </>
        ),
        Component: AtomBuilderLab,
      },
      quiz: [
        {
          q: "What decides which element an atom is?",
          choices: ["The number of neutrons", "The number of protons", "The number of electrons", "Its mass"],
          answer: 1,
          explain:
            "The proton count (atomic number Z) is the element's identity. Neutrons make isotopes, electrons make ions — but 6 protons is always carbon.",
        },
        {
          q: "Carbon-12 and carbon-14 are…",
          choices: [
            "different elements",
            "isotopes — same protons, different neutrons",
            "ions — same protons, different electrons",
            "molecules",
          ],
          answer: 1,
          explain:
            "Both have 6 protons (that's what makes them carbon). Carbon-12 has 6 neutrons, carbon-14 has 8 — same element, different mass number A.",
        },
        {
          q: "An atom loses two electrons. What is it now?",
          choices: ["An anion with charge 2−", "A cation with charge 2+", "A different element", "An isotope"],
          answer: 1,
          explain:
            "Losing negative charge leaves the atom net positive: a 2+ cation. Its proton count — and therefore its element — is unchanged.",
        },
        {
          q: "Where is nearly all of an atom's mass?",
          choices: [
            "Spread evenly through the atom",
            "In the electron shells",
            "In the nucleus",
            "Atoms have no mass",
          ],
          answer: 2,
          explain:
            "Protons and neutrons are each ~1800× heavier than an electron, and they sit in the nucleus — a pea in a stadium carrying 99.9% of the mass.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "shells",
      unitId: "u0",
      title: "Electron Shells: Where Electrons Live",
      subtitle:
        "Electrons don't orbit anywhere they like — they stack into shells. The outermost shell writes all the chemistry.",
      buildsOn: ["atoms"],
      Theory: () => (
        <>
          <h2>Floors in the electron hotel</h2>
          <p>
            Electrons around a nucleus behave like guests in a strange hotel: they must occupy
            fixed floors — <strong>shells</strong> — and each floor has a strict capacity. The
            first shell (closest to the nucleus) holds at most <strong>2</strong> electrons, the
            second holds <strong>8</strong>, and for the elements you&rsquo;ll meet first, the
            third also fills with <strong>8</strong> before anything else happens. Electrons fill
            from the ground floor up: sodium&rsquo;s 11 electrons arrange as 2 · 8 · 1.
          </p>

          <h2>Only the top floor does chemistry</h2>
          <p>
            The electrons in the outermost occupied shell are called{" "}
            <strong>valence electrons</strong>, and they are the only ones other atoms ever see.
            Full inner shells are sealed off. That single number — how many electrons sit on the
            top floor — predicts almost everything: how an element bonds, what it reacts with,
            and how violently.
          </p>
          <div className="formula">
            Na: 2 · 8 · <b>1</b> &nbsp;&nbsp;&nbsp; Cl: 2 · 8 · <b>7</b> &nbsp;&nbsp;&nbsp; Ar: 2 · 8 · <b>8</b>
            <span className="note">bold = valence electrons: eager to lose one, eager to gain one, perfectly content</span>
          </div>

          <h2>The octet rule: everyone wants a full shell</h2>
          <p>
            Atoms are at their most stable when their outer shell is <strong>full</strong> —
            usually 8 electrons (the <em>octet</em>), or 2 for the tiny first shell. The noble
            gases (helium, neon, argon…) are born that way, which is why they react with almost
            nothing: they have nothing to gain. Every other element schemes its way to a full
            shell by <strong>losing</strong>, <strong>gaining</strong> or{" "}
            <strong>sharing</strong> electrons. Sodium happily dumps its lone outer electron;
            chlorine hungrily grabs one more. Put them together and you can guess what happens —
            that story is Unit 1.
          </p>

          <div className="callout tip">
            <span className="co-title">Why 2 · 8 · 8 and not just 8 · 8 · 8?</span>
            <p>
              Shell capacities come from quantum mechanics (2n² states per shell, and the third
              shell&rsquo;s upper rooms only fill after the fourth opens). You don&rsquo;t need
              the machinery yet — the 2 · 8 · 8 pattern is exact for the first 20 elements, which
              is all this course needs until the advanced tier.
            </p>
          </div>

          <p>
            In the lab, fill atoms one electron at a time. Watch which shell each electron
            chooses, then read the verdict: does this element want to lose, gain, or is it
            already noble?
          </p>
        </>
      ),
      lab: {
        title: "The Shell Filler",
        intro: (
          <>
            <p>Pick an element, then drag the electron count up from zero and watch the floors fill.</p>
            <ul>
              <li>Fill sodium (11): two floors seal shut, one electron is left exposed on top.</li>
              <li>Fill chlorine (17): the top floor lacks exactly one electron.</li>
              <li>Fill neon (10) and argon (18): full house — that&rsquo;s why they&rsquo;re called noble.</li>
            </ul>
          </>
        ),
        Component: ShellLab,
      },
      quiz: [
        {
          q: "How many electrons fit in the first two shells?",
          choices: ["8 and 8", "2 and 8", "2 and 6", "8 and 18"],
          answer: 1,
          explain: "The first shell holds 2, the second holds 8 — that's why the first period of the table has 2 elements and the second has 8.",
        },
        {
          q: "Which electrons take part in chemical reactions?",
          choices: [
            "The ones closest to the nucleus",
            "All of them equally",
            "The valence electrons in the outermost shell",
            "None — reactions only involve the nucleus",
          ],
          answer: 2,
          explain:
            "Inner shells are full and sealed. Only the outermost (valence) electrons touch other atoms — they alone write the element's chemistry.",
        },
        {
          q: "Magnesium has 12 electrons (2 · 8 · 2). What does the octet rule predict?",
          choices: [
            "It gains 6 electrons",
            "It loses its 2 outer electrons, becoming Mg²⁺",
            "It does nothing — its shell is full",
            "It splits into two atoms",
          ],
          answer: 1,
          explain:
            "Dropping 2 electrons is far cheaper than gaining 6. Magnesium sheds its top floor and becomes a 2+ cation with a sealed shell beneath.",
        },
        {
          q: "Why are noble gases so unreactive?",
          choices: [
            "They are too heavy to react",
            "Their outer shell is already full",
            "They have no electrons",
            "They are always ions",
          ],
          answer: 1,
          explain:
            "Reactivity is the hunt for a full outer shell. Noble gases start with one — they have nothing to gain, lose or share.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "periodic-table",
      unitId: "u0",
      title: "The Periodic Table: Chemistry's Map",
      subtitle:
        "118 elements, one chart — and once you see how it's sorted, you can predict chemistry you've never been taught.",
      buildsOn: ["atoms", "shells"],
      Theory: () => (
        <>
          <h2>Not a list — a map</h2>
          <p>
            In 1869 Dmitri Mendeleev sorted the known elements by weight and noticed properties
            repeating in waves — so he stacked the waves. The result is the{" "}
            <strong>periodic table</strong>: elements ordered by atomic number Z, arranged so
            that <strong>columns share chemistry</strong>. It was such a good map that Mendeleev
            left gaps and predicted the missing elements&rsquo; properties — gallium and
            germanium showed up years later, matching his guesses almost exactly.
          </p>

          <h2>Rows are shells, columns are valence</h2>
          <p>
            With Unit 0 behind you, the table&rsquo;s layout is no longer arbitrary. Each{" "}
            <strong>row (period)</strong> corresponds to one electron shell being filled: period
            1 fills the 2-slot first shell (2 elements), periods 2 and 3 fill 8-slot shells
            (8 elements each). Each <strong>column (group)</strong> collects elements with the
            same number of valence electrons — and since valence electrons <em>are</em> an
            element&rsquo;s chemistry, columns behave like families:
          </p>
          <ul>
            <li>
              <strong>Group 1 — alkali metals</strong> (Li, Na, K…): one lonely outer electron,
              desperate to lose it. Soft metals that hiss, fizz or explode in water.
            </li>
            <li>
              <strong>Group 2 — alkaline earth metals</strong> (Mg, Ca…): two outer electrons,
              still eager to shed them — just less dramatically.
            </li>
            <li>
              <strong>Group 17 — halogens</strong> (F, Cl, Br, I): one electron short of a full
              shell, aggressive electron thieves. Fluorine is the most reactive element known.
            </li>
            <li>
              <strong>Group 18 — noble gases</strong> (He, Ne, Ar…): full shells, chemically
              asleep.
            </li>
            <li>
              The wide middle block — <strong>transition metals</strong> — and the two detached
              rows below (<strong>lanthanides</strong> and <strong>actinides</strong>) fill inner
              floors of the electron hotel; they are the table&rsquo;s more intricate districts.
            </li>
          </ul>

          <div className="callout note">
            <span className="co-title">Why the symbols need memory hooks</span>
            <p>
              The symbols are international, but their roots are Latin and Greek: iron is{" "}
              <strong>Fe</strong> (<em>ferrum</em>), sodium is <strong>Na</strong> (
              <em>natrium</em>), potassium is <strong>K</strong> (<em>kalium</em>), tungsten is{" "}
              <strong>W</strong> (German <em>Wolfram</em>!). No one guesses these — everyone
              memorizes them. That&rsquo;s exactly what a <strong>memory hook</strong> — in
              German, an <em>Eselsbrücke</em>, a &ldquo;donkey bridge&rdquo; — is for: a little
              story that carries you from the name to the symbol. Every element in the lab below
              has one in both languages (switch with the EN/DE toggle).
            </p>
          </div>

          <h2>Trends you can read off the map</h2>
          <p>
            Two rules of thumb cover most of the table. Moving <strong>left → right</strong>{" "}
            across a period, the nucleus gains charge and pulls electrons in tighter: atoms get
            smaller and hold electrons more greedily. Moving <strong>top → bottom</strong> down a
            group, new shells stack on: atoms get bigger and their outer electrons easier to
            steal. That is why the most violent metal (caesium, bottom-left) and the most violent
            non-metal (fluorine, top-right) live in opposite corners.
          </p>
        </>
      ),
      lab: {
        title: "The Periodic Table — with a Memory Hook for Every Element",
        intro: (
          <>
            <p>
              The full map, 118 tiles. Click any element for its data and its memory hook — the
              little story linking its name to its symbol (in German mode you get the
              Eselsbrücke instead). The standalone page under <strong>🧪 Elements</strong> in
              the top bar adds a searchable list view.
            </p>
            <ul>
              <li>Walk down group 1, then across period 3 — watch the categories change color.</li>
              <li>Find the four elements named after the village of Ytterby (Y, Tb, Er, Yb).</li>
              <li>Check the &ldquo;deceptive&rdquo; symbols: Na, K, Fe, Sn, Pb, Ag, Au, W, Hg.</li>
            </ul>
          </>
        ),
        Component: PeriodicTableLab,
      },
      extraLab: {
        title: "Trend Explorer",
        intro: (
          <>
            <p>
              The table is not a list, it is a map — and the map has slopes. The first twenty
              elements, coloured by whichever property you pick. Hover any tile for the exact value.
            </p>
            <ul>
              <li>Pick <em>Atomic radius</em> and read across period 2: Li to Ne shrinks by a factor of four, even though electrons are being added.</li>
              <li>Switch to <em>Ionization energy</em>. The pattern flips — the small atoms hold on hardest.</li>
              <li>Compare Li, Na and K on all three. Going down a group undoes what going across a period did.</li>
            </ul>
          </>
        ),
        Component: TrendsLab,
      },
      quiz: [
        {
          q: "Elements in the same column (group) of the periodic table have…",
          choices: [
            "the same mass",
            "the same number of shells",
            "the same number of valence electrons — and similar chemistry",
            "nothing in common",
          ],
          answer: 2,
          explain:
            "Columns collect elements whose outer shells look alike. Same valence electrons → same chemical behaviour: that's the table's whole point.",
        },
        {
          q: "A new row (period) of the table begins whenever…",
          choices: [
            "an element becomes radioactive",
            "a new electron shell starts filling",
            "the element's mass doubles",
            "Mendeleev ran out of paper",
          ],
          answer: 1,
          explain:
            "Period number = number of occupied shells. Sodium starts period 3 because its 11th electron opens the third shell.",
        },
        {
          q: "The symbol for potassium is K because…",
          choices: [
            "K is the first letter of potassium",
            "it comes from the Latin name kalium",
            "it was discovered by a Mr. K",
            "P was already taken, so they picked K at random",
          ],
          answer: 1,
          explain:
            "Kalium (from Arabic al-qalya, plant ash) is the element's Latin name — English kept 'potassium', but the symbol follows the Latin. An Eselsbrücke bridges the gap.",
        },
        {
          q: "Which element is the most reactive non-metal, and where does it sit?",
          choices: [
            "Caesium — bottom left",
            "Helium — top right",
            "Fluorine — top right, one electron short of a full shell",
            "Iron — dead centre",
          ],
          answer: 2,
          explain:
            "Fluorine combines the two trends: small, highly charged nucleus and a shell lacking exactly one electron. It attacks almost everything — even glass.",
        },
      ],
    },
  ],
};
