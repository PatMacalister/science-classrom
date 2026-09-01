import type { UnitModule } from "./types";
import { PHLab, TitrationLab, CabbageLab } from "@/catalyst/components/labs/labs-unit4";

export const unit4: UnitModule = {
  unit: {
    id: "u4",
    num: 4,
    title: "Acids, Bases & the Kitchen Capstone",
    blurb:
      "The chemistry of sour and slippery, the logarithmic scale that measures it — and a capstone you cook at home.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "acids-bases",
      unitId: "u4",
      title: "Acids & Bases: The pH Scale",
      subtitle:
        "Sour foods, stinging cleaners, and your own stomach share one particle: H⁺. Counting it takes a logarithm.",
      buildsOn: ["solutions"],
      Theory: () => (
        <>
          <h2>What acids and bases really are</h2>
          <p>
            Dissolve an <strong>acid</strong> in water and it releases <strong>H⁺ ions</strong>{" "}
            (bare protons, immediately grabbed by water to ride as H₃O⁺). Hydrochloric acid:
            HCl → H⁺ + Cl⁻. A <strong>base</strong> does the mirror image: it releases{" "}
            <strong>OH⁻</strong> (like NaOH → Na⁺ + OH⁻) or swallows H⁺ directly (like
            ammonia). Sourness, the sting of citrus in a cut, limescale dissolving in vinegar —
            all of it is H⁺ at work; the slippery feel of soap is OH⁻ attacking the oils of your
            skin.
          </p>
          <p>
            The two are made for each other. H⁺ meets OH⁻ and they vanish into the most harmless
            substance there is:
          </p>
          <div className="formula">
            H⁺ + OH⁻ → H₂O
            <span className="note">neutralization — acid and base cancel into water (plus a salt from the leftover ions)</span>
          </div>

          <h2>pH: a logarithmic ruler</h2>
          <p>
            H⁺ concentrations span an absurd range — from ~1 mol/L in battery acid to
            10⁻¹⁴ mol/L in drain cleaner. Writing fourteen zeros is no way to live, so chemistry
            compresses the range with a logarithm:
          </p>
          <div className="formula">
            pH = −log₁₀ [H⁺]
            <span className="note">pH 7 = neutral · below 7 acidic · above 7 basic — and each step is a factor of TEN</span>
          </div>
          <p>
            The factor of ten is the part everyone forgets. Cola (pH 2.5) isn&rsquo;t &ldquo;a
            bit&rdquo; more acidic than coffee (pH 5) — it carries about <em>300 times</em> the
            H⁺ concentration. And pure water isn&rsquo;t H⁺-free: water itself splits ever so
            slightly, giving 10⁻⁷ mol/L of each ion — that <em>is</em> the definition of
            neutral.
          </p>

          <h2>Dilution and its limit</h2>
          <p>
            Diluting an acid tenfold raises its pH by one step — but you can never dilute your
            way past 7. Add water to vinegar forever and you approach <em>water</em>, not a
            base. The scale&rsquo;s two halves can only be crossed by chemistry
            (neutralization), never by plumbing.
          </p>

          <div className="callout warn">
            <span className="co-title">Strong vs. concentrated — two different words</span>
            <p>
              A <em>strong</em> acid (HCl) releases every H⁺ it has; a <em>weak</em> acid
              (vinegar&rsquo;s acetic acid) releases only a small fraction. Concentration says
              how much acid is in the bottle. Dilute HCl is strong but harmless-ish;
              glacial acetic acid is weak but will burn you. Chemistry&rsquo;s vocabulary is
              precise where everyday language is sloppy.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The pH Playground",
        intro: (
          <>
            <p>Twelve everyday liquids on a 14-step ruler, with a dilution tap.</p>
            <ul>
              <li>Compare cola and coffee — read the ×10-per-step fine print below the scale.</li>
              <li>Dilute lemon juice ×10 repeatedly. Where does the pH get stuck, and why?</li>
              <li>Note where blood sits — your body holds it within ±0.05 of pH 7.4.</li>
            </ul>
          </>
        ),
        Component: PHLab,
      },
      quiz: [
        {
          q: "An acid, dissolved in water, is a substance that…",
          choices: ["releases OH⁻ ions", "absorbs water", "releases H⁺ ions", "conducts electricity"],
          answer: 2,
          explain:
            "Acids donate H⁺ (riding as H₃O⁺); bases supply OH⁻ or swallow H⁺. The H⁺ concentration is what pH measures.",
        },
        {
          q: "A liquid at pH 3 compared to one at pH 6 has…",
          choices: ["1000× the H⁺", "3× the H⁺", "twice the H⁺", "half the H⁺"],
          answer: 0,
          explain: "Three pH steps = 10 × 10 × 10 = 1000× the H⁺ concentration. The scale is logarithmic.",
        },
        {
          q: "You dilute vinegar with water over and over. Its pH…",
          choices: [
            "rises without limit, becoming a strong base",
            "drops toward 0",
            "stays exactly constant",
            "approaches 7 but cannot cross it",
          ],
          answer: 3,
          explain:
            "Dilution replaces acid with water, so the mixture tends toward water's pH 7. Crossing 7 needs an actual base, not more water.",
        },
        {
          q: "Mixing an acid with a base produces…",
          choices: [
            "a stronger acid",
            "water and a salt — neutralization",
            "pure hydrogen gas",
            "nothing; they ignore each other",
          ],
          answer: 1,
          explain:
            "H⁺ + OH⁻ → H₂O, and the leftover ions (e.g. Na⁺ and Cl⁻) make a salt. This is the reaction behind every antacid tablet.",
        },
      ],
      problems: [
        {
          prompt: "What is the pH of a solution with [H⁺] = 0.001 mol/L?",
          answer: 3,
          unit: "",
          hint: "pH = −log₁₀[H⁺]; 0.001 = 10⁻³.",
          explain: "−log₁₀(10⁻³) = 3.",
        },
        {
          prompt: "What is [H⁺] (mol/L) in a pH 5 solution? (SI suffixes ok, e.g. 10u)",
          answer: 0.00001,
          unit: "mol/L",
          hint: "[H⁺] = 10^−pH.",
          explain: "10⁻⁵ = 0.00001 mol/L = 10 µmol/L.",
        },
        {
          prompt: "0.1 mol/L HCl (fully dissociated). What is its pH?",
          answer: 1,
          unit: "",
          hint: "Strong acid: [H⁺] = 0.1 = 10⁻¹.",
          explain: "−log₁₀(0.1) = 1 — roughly your stomach on a bad day.",
        },
        {
          prompt: "How many times more H⁺ does lemon juice (pH 2) hold than milk (pH 6.5)? (tolerance ±5%)",
          answer: 31623,
          unit: "×",
          tolerancePct: 5,
          hint: "Factor = 10^(6.5 − 2).",
          explain: "10^4.5 ≈ 31 600× — logarithms hide enormous ratios.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "titration",
      unitId: "u4",
      title: "Neutralization & Titration",
      subtitle:
        "Drip base into acid until one drop flips the color — and you've counted particles you can't see, to three digits.",
      buildsOn: ["acids-bases", "stoichiometry"],
      Theory: () => (
        <>
          <h2>The question titration answers</h2>
          <p>
            You have a bottle of acid of unknown strength — how much acid is really in there?
            You can&rsquo;t see H⁺ or weigh it. But you <em>can</em> feed it exactly enough OH⁻
            to eat every last H⁺, and count what you fed. That is <strong>titration</strong>:
            neutralization used as a measuring instrument, and it&rsquo;s stoichiometry (Unit 2)
            with glassware.
          </p>

          <h2>The procedure</h2>
          <ol>
            <li>Put a measured volume of the unknown acid in a flask, add a drop of <strong>indicator</strong>.</li>
            <li>Fill a <strong>burette</strong> (a graduated tap-tube) with base of exactly known concentration.</li>
            <li>Drip. Swirl. Watch. At the <strong>equivalence point</strong>, moles of OH⁻ = moles of H⁺, and the very next drop flips the indicator&rsquo;s color.</li>
            <li>Read the volume used and compute:</li>
          </ol>
          <div className="formula">
            c₁ · V₁ = c₂ · V₂
            <span className="note">at equivalence: acid moles = base moles (for 1:1 reactions like HCl + NaOH)</span>
          </div>

          <h2>The shape of the curve</h2>
          <p>
            Plot pH against base added and you get titration&rsquo;s signature: a long lazy
            drift, then a <strong>cliff</strong>. Far from equivalence, added OH⁻ barely dents
            the surplus H⁺ (logarithms flatten it). But near equivalence the surplus is nearly
            gone, and one 0.1 mL drop can hurl the pH from 4 to 10. That cliff is a feature:
            it&rsquo;s what makes the endpoint razor-sharp — a single drop of precision.
          </p>

          <div className="callout note">
            <span className="co-title">Indicators are weak acids with a wardrobe</span>
            <p>
              Phenolphthalein is itself a weak acid whose two forms have different colors:
              colorless with its H⁺ attached (acidic solution), pink without it (basic). It
              switches around pH 8.2–10 — right on the cliff of a strong-acid titration, which
              is why one drop turns the whole flask pink. Your Unit 4 capstone brews a homemade
              indicator that does the same trick with cabbage pigments.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Virtual Burette",
        intro: (
          <>
            <p>25 mL of 0.1 M HCl in the flask, 0.1 M NaOH in the burette, phenolphthalein standing by.</p>
            <ul>
              <li>Open the burette slowly and watch the curve crawl… then find the cliff.</li>
              <li>Stop the instant the flask turns pink — how many mL did you use? Does c₁V₁ = c₂V₂ check out?</li>
              <li>Overshoot to 50 mL and see how far past neutral you land.</li>
            </ul>
          </>
        ),
        Component: TitrationLab,
      },
      quiz: [
        {
          q: "What does titration measure?",
          choices: [
            "The color of an acid",
            "The boiling point of a solution",
            "The unknown concentration of an acid (or base), by neutralizing it with a known one",
            "The mass of the flask",
          ],
          answer: 2,
          explain:
            "At the equivalence point, base moles = acid moles. Knowing the base's concentration and volume used reveals the acid's concentration.",
        },
        {
          q: "The equivalence point is reached when…",
          choices: [
            "moles of added OH⁻ exactly equal the moles of H⁺ present",
            "the flask is full",
            "the pH reaches 14",
            "the indicator dissolves",
          ],
          answer: 0,
          explain: "Exactly enough base to neutralize every H⁺ — for HCl + NaOH that lands the solution at pH 7.",
        },
        {
          q: "Why does the pH curve jump so steeply near equivalence?",
          choices: [
            "The burette speeds up",
            "Almost no surplus H⁺ remains, so one drop changes the ratio — and the log scale — enormously",
            "The indicator releases ions",
            "Water starts boiling",
          ],
          answer: 1,
          explain:
            "pH tracks the logarithm of a vanishing surplus. When the surplus is tiny, a single drop shifts it by orders of magnitude — hence the cliff.",
        },
        {
          q: "25 mL of unknown HCl needs 20 mL of 0.5 M NaOH to reach equivalence. The acid's concentration is…",
          choices: ["0.2 M", "0.625 M", "0.5 M", "0.4 M"],
          answer: 3,
          explain: "c₁ = c₂V₂/V₁ = 0.5 × 20 / 25 = 0.4 mol/L.",
        },
      ],
      problems: [
        {
          prompt: "10 mL of vinegar needs 24 mL of 0.35 M NaOH to neutralize. What is the vinegar's acid concentration?",
          answer: 0.84,
          unit: "mol/L",
          hint: "c₁ = c₂ × V₂ / V₁.",
          explain: "0.35 × 24 / 10 = 0.84 mol/L — typical household vinegar (~5%).",
        },
        {
          prompt: "How many mL of 0.1 M NaOH neutralize 50 mL of 0.06 M HCl?",
          answer: 30,
          unit: "mL",
          hint: "V₂ = c₁V₁ / c₂.",
          explain: "0.06 × 50 / 0.1 = 30 mL.",
        },
        {
          prompt: "You add 30 mL of 0.1 M NaOH to 25 mL of 0.1 M HCl. How many mmol of OH⁻ are in excess?",
          answer: 0.5,
          unit: "mmol",
          hint: "Excess = (30 − 25) mL × 0.1 mol/L.",
          explain: "5 mL × 0.1 M = 0.5 mmol OH⁻ — enough to land far up the basic side.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "kitchen-lab",
      unitId: "u4",
      title: "Capstone: The Kitchen Lab",
      subtitle:
        "Three real experiments with supermarket chemicals: brew a pH indicator, size a CO₂ balloon by stoichiometry, and grow crystals.",
      buildsOn: ["acids-bases", "stoichiometry", "solutions"],
      Theory: () => (
        <>
          <h2>Everything you need is in a supermarket</h2>
          <p>
            This capstone needs no lab: red cabbage, vinegar, baking soda (Natron), salt, a
            lemon, glasses, a bottle and a balloon. Total cost: a few euros. What it proves:
            everything from Units 0–4, running on your own table.
          </p>

          <h2>Experiment 1 — the red-cabbage pH rainbow</h2>
          <p>
            Chop a few red-cabbage leaves, pour boiling water over them, wait ten minutes, and
            strain. The purple liquid is an <strong>anthocyanin indicator</strong> — the same
            trick as phenolphthalein, courtesy of a vegetable. Line up glasses of household
            liquids, add a splash of juice to each, and photograph your rainbow: red in lemon
            juice, purple in tap water, green in soap water. You are literally seeing H⁺
            concentrations.
          </p>

          <h2>Experiment 2 — the stoichiometric balloon</h2>
          <div className="formula">
            NaHCO₃ + CH₃COOH → CO₂↑ + H₂O + CH₃COONa
            <span className="note">baking soda + vinegar: 1 mol soda (84 g) releases 1 mol CO₂ (~24 L at room conditions)</span>
          </div>
          <p>
            Put vinegar in a bottle, baking soda in a balloon, stretch the balloon over the
            neck, and tip. The fizz is CO₂ inflating the balloon. The capstone twist: <em>predict
            first</em>. Weigh your baking soda, compute the moles, and estimate the litres of
            CO₂ before you tip. 4 g of soda ≈ 0.048 mol ≈ 1.1 L — a nicely fist-sized balloon.
            Chemistry that forecasts is chemistry you understand.
          </p>

          <h2>Experiment 3 — crystals on a string</h2>
          <p>
            Stir salt into hot water until no more dissolves (saturation, Unit 3). Hang a
            thread from a pencil into the solution and park the glass somewhere quiet. Over days,
            as water evaporates and the solution cools, the excess ions must rejoin a lattice —
            and they prefer to join <em>your thread&rsquo;s</em> growing crystals. You are
            watching the ionic bonding of Unit 1 build architecture at visible scale.
          </p>

          <div className="callout warn">
            <span className="co-title">Kitchen safety — the honest version</span>
            <p>
              Everything here is food-grade, but treat it like a lab anyway: no glass near the
              stove&rsquo;s edge, label your glasses, don&rsquo;t drink the experiments (the
              cabbage juice is technically edible; the soap water is not), and cap the vinegar
              bottle <em>after</em> the balloon is on — sealed pressure has no balloon-shaped
              escape route.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Digital Twin: The Cabbage Rainbow",
        intro: (
          <>
            <p>
              A preview of your kitchen counter: seven liquids plus cabbage juice, and a mixer
              glass to explore the full color range before you brew the real thing.
            </p>
            <ul>
              <li>Match each glass color to its pH — this is the cheat sheet for your photo.</li>
              <li>Slide your own mix from 1 to 14 and memorize the red → purple → green → yellow arc.</li>
            </ul>
          </>
        ),
        Component: CabbageLab,
      },
      checklist: [
        { id: "brew", text: "Brew the indicator: pour boiling water over chopped red cabbage, steep 10 minutes, strain into a jar." },
        { id: "rainbow", text: "Set up 5+ glasses (lemon juice, vinegar, tap water, baking-soda water, soap water), add a splash of indicator to each." },
        { id: "photo", text: "Sort the glasses by color and photograph your pH rainbow — red to green in order." },
        { id: "predict", text: "Weigh your baking soda (kitchen scale), compute moles (M = 84 g/mol) and predict the CO₂ volume (~24 L/mol)." },
        { id: "balloon", text: "Balloon over the bottle neck, tip the soda into the vinegar — compare the balloon to your prediction." },
        { id: "crystal", text: "Make a saturated salt solution in hot water and hang a thread in it." },
        { id: "harvest", text: "After 3–7 days: inspect your crystals with a magnifier — look for the cubic lattice shape of NaCl." },
      ],
    },
  ],
};
