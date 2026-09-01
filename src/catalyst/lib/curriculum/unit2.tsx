import type { UnitModule } from "./types";
import {
  BalanceLab,
  MoleLab,
  LimitingLab,
  ReactionTypeLab,
  ConservationLab,
} from "@/catalyst/components/labs/labs-unit2";

export const unit2: UnitModule = {
  unit: {
    id: "u2",
    num: 2,
    title: "Reactions & the Mole",
    blurb:
      "Reactions rearrange atoms but never create or destroy them — and the mole is the trick that lets you weigh the invisible.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "reactions",
      unitId: "u2",
      title: "Chemical Reactions & Balancing",
      subtitle:
        "Burning, rusting, baking — every reaction is the same move: old bonds break, new bonds form, and every single atom survives.",
      buildsOn: ["covalent"],
      Theory: () => (
        <>
          <h2>Rearrangement, not magic</h2>
          <p>
            When methane burns, it looks like the gas vanishes into heat. It doesn&rsquo;t. A{" "}
            <strong>chemical reaction</strong> only does one thing: it{" "}
            <strong>breaks some bonds and forms others</strong>. The atoms themselves — every
            carbon, every hydrogen, every oxygen — come out the other side, merely reshuffled
            into new molecules. Antoine Lavoisier nailed this in 1789 by weighing everything
            obsessively: in a closed system, mass before equals mass after. This is the{" "}
            <strong>law of conservation of mass</strong>, and it is bookkeeping you can bet your
            life on (your cells do, constantly).
          </p>

          <h2>The chemical sentence</h2>
          <p>
            We write reactions as equations: <strong>reactants → products</strong>. The arrow
            reads &ldquo;react to form&rdquo;. But a raw equation like{" "}
            <code>H₂ + O₂ → H₂O</code> is a lie — count the oxygens: two on the left, one on the
            right. An atom vanished, which Lavoisier forbids. The fix is{" "}
            <strong>balancing</strong>: put multipliers (<strong>coefficients</strong>) in front
            of whole molecules until every element counts equal on both sides:
          </p>
          <div className="formula">
            2 H₂ + O₂ → 2 H₂O
            <span className="note">4 H and 2 O on each side — the books balance</span>
          </div>
          <p>
            The iron rule: you may <strong>only change coefficients, never the little
            subscripts</strong>. Writing H₂O₂ to &ldquo;fix&rdquo; the oxygen count doesn&rsquo;t
            balance water — it invents hydrogen peroxide, a completely different substance
            (please don&rsquo;t drink it).
          </p>

          <h2>A strategy that always works</h2>
          <ol>
            <li>Balance elements that appear in only one place on each side first.</li>
            <li>Save lone elements (like O₂ or Fe) for last — their coefficient is a free knob.</li>
            <li>If you end up with a fraction, multiply everything to clear it.</li>
            <li>Finish by checking every element — and that the coefficients can&rsquo;t be divided down.</li>
          </ol>

          <div className="callout note">
            <span className="co-title">What coefficients really say</span>
            <p>
              <code>2 H₂ + O₂ → 2 H₂O</code> doesn&rsquo;t just mean &ldquo;2 molecules + 1
              molecule&rdquo;. It means <em>any</em> 2 : 1 : 2 ratio — 2 dozen, 2 billion, or 2
              moles. Coefficients are the recipe&rsquo;s proportions, and the next two lessons
              turn that recipe into grams you can weigh.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Atom Accountant",
        intro: (
          <>
            <p>Four unbalanced equations, one balance beam per element. Make every beam level.</p>
            <ul>
              <li>Start with H₂ + O₂ → H₂O — two sliders solve it.</li>
              <li>Rust (Fe + O₂ → Fe₂O₃) needs the fraction-clearing trick: it balances at 4 : 3 : 2.</li>
              <li>Balance one with doubled coefficients and read the fine print.</li>
            </ul>
          </>
        ),
        Component: BalanceLab,
      },
      extraLab: {
        title: "Lavoisier's Balance",
        intro: (
          <>
            <p>
              Balancing an equation only makes sense because mass is conserved. Here is the
              experiment that settled it — three reactions on a scale, in an open or a sealed vessel.
            </p>
            <ul>
              <li>Run baking soda + vinegar in the <em>open</em> beaker. The mass drops. Now seal the jar and run it again.</li>
              <li>Burn magnesium in the open and the mass goes <em>up</em>. Where did it come from?</li>
              <li>Seal every reaction and the needle never moves. That is the law, demonstrated.</li>
            </ul>
          </>
        ),
        Component: ConservationLab,
      },
      quiz: [
        {
          q: "What does a chemical reaction do to atoms?",
          choices: [
            "Rearranges them into new combinations — none appear or vanish",
            "Creates new atoms and destroys old ones",
            "Converts them into pure energy",
            "Melts them together",
          ],
          answer: 0,
          explain:
            "Reactions break and form bonds; the atoms all survive. Conservation of mass is why equations must balance.",
        },
        {
          q: "To balance an equation you may change…",
          choices: [
            "the subscripts inside formulas",
            "the coefficients in front of formulas",
            "both freely",
            "neither — some equations just don't balance",
          ],
          answer: 1,
          explain:
            "Coefficients multiply whole molecules and are yours to adjust. Changing a subscript changes the substance itself (H₂O → H₂O₂ is a different chemical).",
        },
        {
          q: "In 2 H₂ + O₂ → 2 H₂O, the coefficients 2 : 1 : 2 tell you…",
          choices: [
            "the masses of each substance",
            "how fast the reaction runs",
            "the temperature required",
            "the reacting ratio — valid for molecules, dozens or moles alike",
          ],
          answer: 3,
          explain:
            "Coefficients are proportions, like a recipe: two parts hydrogen to one part oxygen gives two parts water, whatever the batch size.",
        },
        {
          q: "Methane burns in a sealed 100 g container. After the burn, the container weighs…",
          choices: ["less — gas escaped as energy", "more — heat added mass", "exactly 100 g", "it depends on the flame"],
          answer: 2,
          explain:
            "Closed system, same atoms, same mass. The energy released comes from bond rearrangement, not from destroying matter (nuclear reactions are another course).",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "reaction-types",
      unitId: "u2",
      title: "The Five Kinds of Reaction",
      subtitle:
        "Most reactions you will ever meet follow one of five patterns. Recognise the pattern and you can predict the products of a reaction you have never seen.",
      buildsOn: ["reactions"],
      Theory: () => (
        <>
          <h2>Patterns, not memorisation</h2>
          <p>
            There are millions of known reactions, which sounds hopeless until you notice that the
            overwhelming majority fall into five structural patterns. Learn the patterns and you can
            often write the products yourself.
          </p>

          <h3>1. Synthesis (combination) — A + B → AB</h3>
          <p>Two or more simple things join into one more complex thing.</p>
          <div className="formula">
            2 Mg + O₂ → 2 MgO &nbsp;·&nbsp; N₂ + 3 H₂ → 2 NH₃
            <span className="note">the second is the Haber process — it is fair to say it feeds about half of everyone alive</span>
          </div>

          <h3>2. Decomposition — AB → A + B</h3>
          <p>One compound splits into simpler pieces, usually driven by heat or electricity.</p>
          <div className="formula">
            2 H₂O → 2 H₂ + O₂ &nbsp;·&nbsp; CaCO₃ → CaO + CO₂
            <span className="note">roasting limestone gives quicklime — how cement is made, and a large slice of global CO₂</span>
          </div>

          <h3>3. Single replacement — A + BC → AC + B</h3>
          <p>
            One element pushes another out of its compound. Whether it can depends on the{" "}
            <strong>reactivity series</strong>: a more reactive metal displaces a less reactive one.
          </p>
          <div className="formula">Zn + CuSO₄ → ZnSO₄ + Cu</div>
          <p>
            Drop a zinc strip into blue copper sulfate and the blue fades while the strip turns
            coppery — you can watch the swap happen. Reverse it and nothing occurs, because copper is
            the less reactive of the two. Unit 6 wires exactly this eagerness into a battery.
          </p>

          <h3>4. Double replacement — AB + CD → AD + CB</h3>
          <p>
            Two compounds exchange partners. Common in solution, and usually driven by something
            leaving the mixture:
          </p>
          <div className="formula">
            AgNO₃ + NaCl → AgCl↓ + NaNO₃
            <span className="note">silver chloride is insoluble, so it drops out as a white precipitate</span>
          </div>
          <p>
            <strong>Neutralisation</strong> is a double replacement too — acid plus base giving a
            salt plus water, which is the whole of Unit 4:
          </p>
          <div className="formula">HCl + NaOH → NaCl + H₂O</div>

          <h3>5. Combustion — fuel + O₂ → CO₂ + H₂O</h3>
          <p>
            Technically a subtype, but so common it earns its own name. Burn any hydrocarbon in
            plenty of oxygen and you always get carbon dioxide and water:
          </p>
          <div className="formula">CH₄ + 2 O₂ → CO₂ + 2 H₂O</div>
          <p>
            The energy released is the point: it heats homes, drives engines and — as respiration,
            which is combustion run slowly and carefully inside cells — powers you.
          </p>
          <div className="callout warn">
            <span className="co-title">Incomplete combustion</span>
            <p>
              Starve the flame of oxygen and you get carbon monoxide (CO) and soot instead. CO binds
              to haemoglobin roughly 200 times more strongly than oxygen does, is colourless and
              odourless, and is why a blocked flue kills people. A yellow, sooty flame where a blue
              one belongs is the visible warning.
            </p>
          </div>

          <h2>Predicting products</h2>
          <p>
            Recognising the pattern lets you write the products before looking them up. Given
            &ldquo;magnesium + hydrochloric acid&rdquo;: a metal plus an acid is single replacement,
            so magnesium displaces hydrogen, giving <strong>MgCl₂ + H₂</strong>. Magnesium is 2+ and
            chloride 1−, so the formula follows from Unit 1 — and then you balance it. Three lessons
            combining into a prediction.
          </p>
        </>
      ),
      lab: {
        title: "Reaction Sorter",
        intro: (
          <>
            <p>Ten reactions, one at a time. Name the pattern, then see why.</p>
            <ul>
              <li>Count how many things are on each side first — that alone separates synthesis from decomposition.</li>
              <li>If a lone element appears on both sides, it is a replacement. One swap = single, two = double.</li>
              <li>O₂ on the left with CO₂ and H₂O on the right is always combustion.</li>
            </ul>
          </>
        ),
        Component: ReactionTypeLab,
      },
      quiz: [
        {
          q: "2 Mg + O₂ → 2 MgO is an example of…",
          choices: ["Decomposition", "Synthesis", "Single replacement", "Double replacement"],
          answer: 1,
          explain: "Two simple substances combine into one compound: A + B → AB, a synthesis reaction.",
        },
        {
          q: "Which pattern does AgNO₃ + NaCl → AgCl + NaNO₃ follow?",
          choices: [
            "Single replacement",
            "Combustion",
            "Double replacement — the two compounds swap partners",
            "Decomposition",
          ],
          answer: 2,
          explain:
            "Silver pairs with chloride and sodium with nitrate: AB + CD → AD + CB. The insoluble AgCl precipitating out is what drives it.",
        },
        {
          q: "Zinc displaces copper from copper sulfate, but copper will not displace zinc from zinc sulfate. Why?",
          choices: [
            "Copper is heavier",
            "The reaction needs light",
            "Copper sulfate is a gas",
            "Zinc is more reactive than copper, so only that direction is favourable",
          ],
          answer: 3,
          explain:
            "In a single replacement the more reactive metal takes the anion. Zinc sits above copper in the reactivity series, so only zinc → copper works.",
        },
        {
          q: "What are the products of the complete combustion of any hydrocarbon?",
          choices: [
            "Carbon dioxide and water",
            "Carbon monoxide and hydrogen",
            "Soot and oxygen",
            "It depends on the hydrocarbon",
          ],
          answer: 0,
          explain:
            "With enough oxygen every carbon ends up in CO₂ and every hydrogen in H₂O. Too little oxygen gives incomplete combustion — CO and soot.",
        },
        {
          q: "Magnesium is added to hydrochloric acid. Using the patterns, what should you expect?",
          choices: [
            "MgCl₂ + H₂ — a single replacement, with hydrogen gas bubbling off",
            "MgH₂ + Cl₂",
            "No reaction",
            "MgCl + HCl₂",
          ],
          answer: 0,
          explain:
            "A metal plus an acid is single replacement: the metal displaces hydrogen. Mg is 2+ and Cl is 1−, giving MgCl₂ plus H₂ gas. Balanced: Mg + 2 HCl → MgCl₂ + H₂.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "mole",
      unitId: "u2",
      title: "The Mole: Chemistry's Dozen",
      subtitle:
        "Atoms are too small to count, so chemists count in batches of 6 × 10²³ — a batch sized so the scale does the counting for you.",
      buildsOn: ["atoms", "reactions"],
      Theory: () => (
        <>
          <h2>A counting unit, nothing more</h2>
          <p>
            A pair is 2, a dozen is 12, a <strong>mole</strong> is 6.022 × 10²³ — that&rsquo;s
            the whole definition. The number (<strong>Avogadro&rsquo;s number, N<sub>A</sub></strong>)
            looks absurd, but it&rsquo;s chosen with surgical cunning:{" "}
            <strong>one mole of any substance weighs its atomic/molecular mass in grams</strong>.
            Carbon-12 atoms have mass number 12 → one mole of carbon weighs 12 g. Water molecules
            weigh 18 u → one mole of water is 18 g, about one gulp.
          </p>
          <div className="formula">
            n = m / M
            <span className="note">moles = mass in grams ÷ molar mass in g/mol (read M off the periodic table)</span>
          </div>
          <p>
            This is the bridge between the invisible and the weighable. You cannot count
            molecules, but you <em>can</em> weigh 18 g of water — and then you know, with
            certainty, that you hold 6.022 × 10²³ molecules. The scale becomes a particle
            counter.
          </p>

          <h2>Molar mass from a formula</h2>
          <p>
            Add up the atomic masses from the periodic table. Water H₂O: 2 × 1.008 + 16.00 =
            18.02 g/mol. Carbon dioxide CO₂: 12.01 + 2 × 16.00 = 44.01 g/mol. Table sugar
            C₁₂H₂₂O₁₁: 342.3 g/mol. That&rsquo;s the entire skill — addition with a map.
          </p>

          <h2>Counting particles</h2>
          <div className="formula">
            N = n · N<sub>A</sub>
            <span className="note">particles = moles × 6.022 × 10²³</span>
          </div>

          <div className="callout note">
            <span className="co-title">How big is 6 × 10²³ really?</span>
            <p>
              A mole of marshmallows would cover Germany roughly 1000 km deep. A mole of water
              molecules fits in a shot glass. That contrast — a number too big to imagine,
              hiding inside amounts you handle daily — is why chemistry needs the mole: reality
              operates in armies, and the mole is the army&rsquo;s name.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Particle Counter",
        intro: (
          <>
            <p>A scale on the left, the conversion chain on the right.</p>
            <ul>
              <li>Set water to exactly 18 g — read off precisely one mole.</li>
              <li>Same 100 g of water vs. iron: which holds more particles, and why?</li>
              <li>Watch the particle count: it never leaves the 10²³–10²⁴ neighbourhood for lab-sized amounts.</li>
            </ul>
          </>
        ),
        Component: MoleLab,
      },
      quiz: [
        {
          q: "One mole of a substance always contains…",
          choices: [
            "1 gram of matter",
            "6.022 × 10²³ particles",
            "22.4 litres",
            "the same number of protons",
          ],
          answer: 1,
          explain:
            "The mole is a count, like 'dozen': 6.022 × 10²³ of whatever you're counting — atoms, molecules, ions.",
        },
        {
          q: "Why is Avogadro's number chosen to be exactly that odd value?",
          choices: [
            "It was picked at random",
            "To honour Avogadro's birthday",
            "It's the number of atoms in the human body",
            "So that one mole of a substance weighs its particle mass in grams",
          ],
          answer: 3,
          explain:
            "N_A converts atomic mass units to grams: a 12 u carbon atom → 12 g per mole of carbon. That makes the scale a particle counter.",
        },
        {
          q: "What is the molar mass of CO₂ (C = 12.01, O = 16.00)?",
          choices: ["28.01 g/mol", "32.00 g/mol", "44.01 g/mol", "12.01 g/mol"],
          answer: 2,
          explain: "12.01 + 2 × 16.00 = 44.01 g/mol. Molar mass is just adding up the table values in the formula.",
        },
        {
          q: "You have 100 g of water and 100 g of iron. Which contains more particles?",
          choices: [
            "The water — its molar mass (18) is much smaller than iron's (56)",
            "The iron — metal atoms are packed tighter",
            "Both the same — same mass, same particles",
            "Cannot be determined",
          ],
          answer: 0,
          explain:
            "n = m/M: 100/18 ≈ 5.6 mol of water vs 100/55.85 ≈ 1.8 mol of iron. Lighter particles → more of them per gram.",
        },
      ],
      problems: [
        {
          prompt: "How many moles are in 90 g of water (M = 18.02 g/mol)?",
          answer: 4.994,
          unit: "mol",
          hint: "n = m / M.",
          explain: "90 / 18.02 ≈ 5.0 mol.",
        },
        {
          prompt: "What is the mass of 0.25 mol of CO₂ (M = 44.01 g/mol)?",
          answer: 11.0,
          unit: "g",
          hint: "Rearrange n = m/M to m = n × M.",
          explain: "0.25 × 44.01 ≈ 11.0 g.",
        },
        {
          prompt: "What is the molar mass of glucose, C₆H₁₂O₆ (C = 12.01, H = 1.008, O = 16.00)?",
          answer: 180.16,
          unit: "g/mol",
          hint: "6 carbons + 12 hydrogens + 6 oxygens — add them all.",
          explain: "6×12.01 + 12×1.008 + 6×16.00 = 180.16 g/mol.",
        },
        {
          prompt: "How many molecules are in 2.5 mol of water? (Answer in molecules; suffixes like 1.5e24 work.)",
          answer: 1.5055e24,
          unit: "molecules",
          hint: "N = n × N_A = n × 6.022 × 10²³.",
          explain: "2.5 × 6.022 × 10²³ ≈ 1.51 × 10²⁴ molecules.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "stoichiometry",
      unitId: "u2",
      title: "Stoichiometry: Recipe Math",
      subtitle:
        "Balanced equation + mole bridge = the power to predict exactly how many grams come out — and which ingredient runs out first.",
      buildsOn: ["reactions", "mole"],
      Theory: () => (
        <>
          <h2>The three-step machine</h2>
          <p>
            <strong>Stoichiometry</strong> (from Greek <em>stoicheion</em>, element) answers
            questions like: &ldquo;How much CO₂ does burning 10 g of methane release?&rdquo; The
            machine has three gears, always the same:
          </p>
          <ol>
            <li>
              <strong>Grams → moles</strong> for what you know (n = m/M).
            </li>
            <li>
              <strong>Moles → moles</strong> via the balanced equation&rsquo;s coefficient ratio.
            </li>
            <li>
              <strong>Moles → grams</strong> for what you want (m = n·M).
            </li>
          </ol>
          <div className="formula">
            CH₄ + 2 O₂ → CO₂ + 2 H₂O
            <span className="note">1 mol CH₄ yields 1 mol CO₂ — so 10 g CH₄ (0.62 mol) yields 0.62 mol = 27.4 g CO₂</span>
          </div>
          <p>
            Notice the shape of the trick: <em>never</em> compare grams to grams directly. Grams
            of different substances aren&rsquo;t comparable — moles are. Convert in, ratio
            across, convert out.
          </p>

          <h2>The limiting reagent</h2>
          <p>
            Recipes fail realistically: you have flour for 30 pancakes but eggs for 12 — you get
            12 pancakes and leftover flour. Reactions are identical. Whichever reactant runs out
            first is the <strong>limiting reagent</strong>; it alone decides the yield, and the
            excess of the other just sits there. To find it, convert both reactants to moles,
            divide each by its coefficient, and the <strong>smaller quotient loses</strong>.
          </p>

          <div className="callout tip">
            <span className="co-title">Why engineers care</span>
            <p>
              Industrial chemistry is stoichiometry with money attached: feed a reactor the wrong
              ratio and you either waste expensive reagent or leave product unmade. The same math
              sizes the CO₂ balloon in your Unit 4 kitchen capstone — baking soda and vinegar in
              the right proportion, nothing wasted.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Limiting-Reagent Mixer",
        intro: (
          <>
            <p>Mix hydrogen and oxygen in any amounts; the reaction 2 H₂ + O₂ → 2 H₂O takes what it can.</p>
            <ul>
              <li>Set 4 mol H₂ and 4 mol O₂ — oxygen is left over. Why?</li>
              <li>Find the perfect ratio where both bars empty together.</li>
              <li>Double only the oxygen — does more O₂ make more water?</li>
            </ul>
          </>
        ),
        Component: LimitingLab,
      },
      quiz: [
        {
          q: "Why must stoichiometry convert grams to moles before comparing substances?",
          choices: [
            "Equation coefficients count particles (moles), not mass",
            "Grams are imprecise",
            "Moles are easier to weigh",
            "It's tradition",
          ],
          answer: 0,
          explain:
            "The balanced equation speaks in particle ratios. 2 g of H₂ and 2 g of O₂ are wildly different particle counts — moles make them comparable.",
        },
        {
          q: "For 2 H₂ + O₂ → 2 H₂O, you mix 6 mol H₂ with 2 mol O₂. The limiting reagent is…",
          choices: ["H₂", "O₂ — it runs out after making 4 mol water", "water", "neither"],
          answer: 1,
          explain:
            "Divide by coefficients: H₂ gives 6/2 = 3 'servings', O₂ gives 2/1 = 2. Oxygen's smaller quotient limits the yield to 4 mol H₂O, leaving 2 mol H₂ unused.",
        },
        {
          q: "Adding more of the excess reagent to a reaction…",
          choices: [
            "increases the yield proportionally",
            "speeds up time",
            "changes nothing — the limiting reagent still decides",
            "always doubles the product",
          ],
          answer: 2,
          explain:
            "Yield hangs on whatever runs out first. Extra excess reagent just deepens the leftover pile.",
        },
        {
          q: "Burning 1 mol of CH₄ (CH₄ + 2 O₂ → CO₂ + 2 H₂O) consumes how much O₂?",
          choices: ["1 mol", "4 mol", "0.5 mol", "2 mol"],
          answer: 3,
          explain: "The coefficients say 1 : 2 — every mole of methane burns two moles of oxygen.",
        },
      ],
      problems: [
        {
          prompt: "Burning methane: CH₄ + 2 O₂ → CO₂ + 2 H₂O. How many grams of CO₂ (M = 44.01) come from 16.04 g of CH₄ (M = 16.04)?",
          answer: 44.01,
          unit: "g",
          hint: "16.04 g CH₄ is exactly 1 mol; the ratio CH₄:CO₂ is 1:1.",
          explain: "1 mol CH₄ → 1 mol CO₂ = 44.01 g.",
        },
        {
          prompt: "2 H₂ + O₂ → 2 H₂O. How many moles of water can you make from 3 mol H₂ and plenty of O₂?",
          answer: 3,
          unit: "mol",
          hint: "The H₂ : H₂O ratio is 2 : 2 = 1 : 1.",
          explain: "Ratio 1:1 → 3 mol H₂ gives 3 mol H₂O.",
        },
        {
          prompt: "Baking-soda volcano: NaHCO₃ + CH₃COOH → CO₂ + … . With M(NaHCO₃) = 84.01 and M(CO₂) = 44.01, how many grams of CO₂ does 10 g of baking soda release (1:1 ratio)?",
          answer: 5.24,
          unit: "g",
          hint: "Grams → moles (÷84.01), ratio 1:1, moles → grams (×44.01).",
          explain: "10/84.01 = 0.119 mol → 0.119 × 44.01 ≈ 5.24 g of CO₂.",
        },
        {
          prompt: "2 H₂ + O₂ → 2 H₂O with 5 mol H₂ and 2 mol O₂. How many moles of H₂ are left over?",
          answer: 1,
          unit: "mol",
          hint: "O₂ limits: 2 mol O₂ consumes 4 mol H₂.",
          explain: "Servings: H₂ 5/2 = 2.5, O₂ 2/1 = 2 → O₂ limits, uses 4 mol H₂, leaving 1 mol.",
        },
      ],
    },
  ],
};
