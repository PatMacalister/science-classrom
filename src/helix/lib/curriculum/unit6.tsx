import type { UnitModule } from "./types";
import { EnergyPyramidLab, PopulationLab, FermentationLab } from "@/helix/components/labs/labs-unit6";

export const unit6: UnitModule = {
  unit: {
    id: "u6",
    num: 6,
    title: "Ecology & the Yeast Capstone",
    blurb:
      "Zoom out from the cell to the whole system: where the energy goes, why populations stop growing — and a balloon you inflate with living cells.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "energy-flow",
      unitId: "u6",
      title: "Energy Flow: Why Food Chains Are Short",
      subtitle:
        "About a tenth of the energy survives each step up a food chain. That single number explains the shape of every ecosystem.",
      buildsOn: ["photosynthesis", "respiration"],
      Theory: () => (
        <>
          <h2>Energy enters once and leaves as heat</h2>
          <p>
            Nutrients cycle — the carbon in you has been through countless organisms and will go
            round again. <strong>Energy does not.</strong> It arrives as sunlight, is captured by
            photosynthesis, passes up the food chain, and leaves as heat at every step. An ecosystem
            needs a continuous supply because it is constantly leaking.
          </p>
          <p>The levels are called <strong>trophic levels</strong>:</p>
          <ul>
            <li>
              <strong>Producers</strong> — plants and algae, capturing light. Everything above them
              is spending their work.
            </li>
            <li>
              <strong>Primary consumers</strong> — herbivores.
            </li>
            <li>
              <strong>Secondary consumers</strong> — carnivores that eat herbivores.
            </li>
            <li>
              <strong>Tertiary consumers</strong> — carnivores that eat carnivores.
            </li>
            <li>
              <strong>Decomposers</strong> — bacteria and fungi, feeding on every level and
              returning the nutrients.
            </li>
          </ul>

          <h2>The ten percent rule</h2>
          <p>
            Only about <strong>10%</strong> of the energy at one level ends up in the next. The
            other 90% is lost, and the reasons are all things you have already studied:
          </p>
          <ul>
            <li>
              <strong>Respiration.</strong> Most of what an organism eats is burnt for ATP, and that
              energy leaves as heat. It was never available to whatever eats it.
            </li>
            <li>
              <strong>Undigested waste.</strong> Cellulose, bone, fur — eaten but not absorbed.
            </li>
            <li>
              <strong>Parts never eaten.</strong> Roots, skeletons, anything that dies unconsumed
              (though decomposers get it).
            </li>
          </ul>
          <div className="formula">
            10% per level ⇒ level 4 receives 0.1% of what the producers captured
            <span className="note">1,000,000 kJ → 100,000 → 10,000 → 1,000</span>
          </div>
          <p>
            This is why food chains are rarely longer than four or five links: there is simply not
            enough energy left to support another level. It is also why top predators are
            necessarily rare and need enormous territories, and why losing them destabilises an
            ecosystem — nothing else is holding that position.
          </p>

          <h2>The uncomfortable arithmetic</h2>
          <p>
            The same rule explains a fact about food production. Feeding grain to cattle and then
            eating the cattle throws away roughly 90% of the energy in the grain. Eating the grain
            directly does not. That is why a given area of land can support far more people on a
            plant-based diet than on a meat-heavy one — a conclusion that falls straight out of
            trophic efficiency, whatever anyone&rsquo;s preferences.
          </p>
          <p>
            <strong>Biomagnification</strong> follows the same pyramid. Persistent poisons — DDT,
            mercury — are not excreted, so they concentrate as they move up. A predator eating a
            thousand contaminated fish accumulates the poison of all thousand. This is why{" "}
            <em>Silent Spring</em> found eagles, not insects, with collapsing eggshells, and why
            advice on mercury in fish singles out large predatory species.
          </p>

          <div className="callout note">
            <span className="co-title">Pyramids that stand on their heads</span>
            <p>
              In the open ocean, a pyramid of <em>biomass</em> can be inverted: the mass of
              phytoplankton at any instant is less than the mass of the zooplankton eating them.
              That is not a violation — the phytoplankton reproduce so fast that the small standing
              stock supplies far more energy over time than a single snapshot suggests. Energy
              pyramids are never inverted; biomass pyramids sometimes are.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Energy Pyramid",
        intro: (
          <>
            <p>Four trophic levels, one dial for how much energy survives each step.</p>
            <ul>
              <li>At 10%, look at what reaches level 4 — a thousandth of what the plants captured.</li>
              <li>Raise the efficiency to 25% and see how much more a top predator could be supported.</li>
              <li>Drop it to 2%. A fourth level becomes effectively impossible.</li>
            </ul>
          </>
        ),
        Component: EnergyPyramidLab,
      },
      problems: [
        {
          prompt:
            "Producers capture 500,000 kJ. Using the 10% rule, how much energy reaches the tertiary consumers (level 4)?",
          answer: 500,
          unit: "kJ",
          hint: "Multiply by 0.1 three times.",
          explain: "500,000 × 0.1 × 0.1 × 0.1 = 500 kJ — one thousandth of what was captured.",
        },
        {
          prompt:
            "If a food chain transfers 10% per level, what percentage of the producers' energy reaches level 3?",
          answer: 1,
          unit: "%",
          hint: "Two transfers.",
          explain: "0.1 × 0.1 = 0.01 = 1%.",
        },
      ],
      quiz: [
        {
          q: "Roughly how much energy passes from one trophic level to the next?",
          choices: ["90%", "50%", "10%", "99%"],
          answer: 2,
          explain:
            "About a tenth. The rest is lost to respiration as heat, to undigested waste, and to parts that are never eaten.",
        },
        {
          q: "Why are food chains rarely longer than four or five levels?",
          choices: [
            "Predators run out of prey species",
            "Too little energy remains to support another level",
            "Larger animals cannot digest smaller ones",
            "Decomposers interrupt the chain",
          ],
          answer: 1,
          explain:
            "With ~90% lost per step, a fifth level would receive about 0.01% of the original energy — not enough to sustain a population.",
        },
        {
          q: "Why does a given area of farmland feed more people on a plant-based diet?",
          choices: [
            "Plants grow faster than animals",
            "Eating plants directly skips a trophic transfer, avoiding a ~90% energy loss",
            "Animals need more water",
            "Plants contain more energy per gram",
          ],
          answer: 1,
          explain:
            "Feeding grain to livestock adds a trophic level, and each level discards about nine-tenths of the energy.",
        },
        {
          q: "What is biomagnification?",
          choices: [
            "Populations growing at higher trophic levels",
            "Persistent toxins concentrating as they move up the food chain",
            "Energy increasing at each level",
            "Predators growing larger over generations",
          ],
          answer: 1,
          explain:
            "A predator accumulates the toxin load of everything it eats. It is why top predators are hit hardest by pollutants like DDT and mercury.",
        },
        {
          q: "How do energy flow and nutrient cycling differ?",
          choices: [
            "Both cycle endlessly",
            "Energy flows through once and is lost as heat; nutrients are recycled indefinitely",
            "Nutrients are lost as heat; energy is recycled",
            "Neither is recycled",
          ],
          answer: 1,
          explain:
            "Carbon atoms go round and round. Energy makes one pass, degrading to heat at every step, which is why sunlight must keep arriving.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "populations",
      unitId: "u6",
      title: "Populations: Growth and Its Limits",
      subtitle:
        "Nothing grows exponentially for long. What stops it — and what happens when the ceiling itself moves.",
      buildsOn: ["energy-flow", "natural-selection"],
      Theory: () => (
        <>
          <h2>The exponential trap</h2>
          <p>
            Populations grow by multiplication, not addition: every individual can produce more
            individuals, who can produce more still. Unchecked, that gives an{" "}
            <strong>exponential</strong> curve — slow at first, then explosively steep.
          </p>
          <p>
            Darwin liked the elephant example: the slowest breeder known, yet from one pair, with
            every calf surviving, you would have millions within a few centuries. You do not see
            elephants filling continents, which means almost every elephant that is ever born dies
            before reproducing. That gap between potential and reality is exactly where natural
            selection operates.
          </p>

          <h2>Carrying capacity</h2>
          <p>
            Real populations run into limits: food, water, space, nesting sites, predators, disease.
            The maximum an environment can sustain indefinitely is its{" "}
            <strong>carrying capacity</strong>, written <code>K</code>.
          </p>
          <p>The result is an S-shaped (<strong>logistic</strong>) curve with four phases:</p>
          <ul>
            <li><strong>Lag</strong> — few individuals, slow absolute growth.</li>
            <li><strong>Exponential</strong> — resources plentiful, growth accelerating.</li>
            <li><strong>Slowing</strong> — competition bites as the population nears K.</li>
            <li><strong>Plateau</strong> — births ≈ deaths, fluctuating around K.</li>
          </ul>
          <div className="formula">
            growth = r · N · (1 − N/K)
            <span className="note">
              the bracket is the brake: near zero when N is small, and zero when N reaches K
            </span>
          </div>
          <p>
            The structure of that equation is worth a moment. When N is small the bracket is close
            to 1 and growth is nearly exponential. As N approaches K the bracket approaches zero and
            growth stops. The population does not need to know anything about K — the limitation
            emerges from competition.
          </p>

          <h2>Two kinds of limit</h2>
          <p>
            <strong>Density-dependent</strong> factors bite harder as the population gets denser:
            competition for food, disease transmission, predation, accumulating waste. These are
            what actually produce the plateau — they are a feedback loop.
          </p>
          <p>
            <strong>Density-independent</strong> factors hit regardless of numbers: a hard frost, a
            flood, a wildfire. A drought kills the same fraction of a sparse population as a dense
            one, so these cause crashes rather than smooth regulation.
          </p>

          <h2>Overshoot</h2>
          <p>
            Populations can exceed K temporarily, especially when they respond slowly — and the
            correction can be brutal. Reindeer introduced to St Matthew Island in 1944 grew from 29
            to 6,000 by 1963, stripped the slow-growing lichen they depended on, and crashed to
            about 42 animals in a single winter. The carrying capacity had not just been exceeded;
            it had been <em>damaged</em>, so the population could not recover to its old level.
          </p>
          <p>
            That is the general lesson, and it is why K is not simply a fixed number. It changes with
            conditions, and a population that overshoots badly enough can lower it.
          </p>

          <div className="callout tip">
            <span className="co-title">Where humans sit</span>
            <p>
              Human population growth has looked exponential for centuries because we keep raising
              our own carrying capacity — agriculture, sanitation, fertiliser, medicine. Each is a
              genuine increase in K, not an exemption from it. The open question is not whether K
              exists but where it currently is, and whether we are drawing it down the way the
              reindeer drew down their lichen.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Growth Curves",
        intro: (
          <>
            <p>One population, two models. Compare what they predict.</p>
            <ul>
              <li>Run the exponential model. It never stops — which should tell you it is wrong past a point.</li>
              <li>Switch to logistic and watch the curve bend over as it approaches K.</li>
              <li>Raise the growth rate with K fixed. It gets there sooner, but it does not get further.</li>
            </ul>
          </>
        ),
        Component: PopulationLab,
      },
      quiz: [
        {
          q: "What is carrying capacity?",
          choices: [
            "The largest population ever recorded",
            "The maximum population an environment can sustain indefinitely",
            "The rate at which a population grows",
            "The number of offspring per individual",
          ],
          answer: 1,
          explain:
            "K is set by resources and conditions. Populations tend to level off around it — and can damage it by overshooting.",
        },
        {
          q: "In growth = r · N · (1 − N/K), what does the bracket do?",
          choices: [
            "It speeds growth up as the population grows",
            "It acts as a brake, falling to zero as N approaches K",
            "It converts the population into a rate",
            "It has no effect",
          ],
          answer: 1,
          explain:
            "Near zero population the bracket is ~1 and growth is nearly exponential; at N = K it is 0 and growth stops.",
        },
        {
          q: "Which is a density-dependent limiting factor?",
          choices: ["A wildfire", "A hard frost", "Competition for food", "A flood"],
          answer: 2,
          explain:
            "Competition intensifies as density rises, so it feeds back and regulates. Frost and fire strike regardless of numbers.",
        },
        {
          q: "The St Matthew Island reindeer grew to 6,000 and crashed to about 42. Why did they not stabilise at K?",
          choices: [
            "They were hunted",
            "They overshot and destroyed the slow-growing lichen, lowering the carrying capacity itself",
            "A disease arrived",
            "They emigrated",
          ],
          answer: 1,
          explain:
            "Overshoot can damage the resource base. K is not a fixed line — a population can push it downwards and then crash below it.",
        },
        {
          q: "Why has human population growth looked exponential for so long?",
          choices: [
            "Humans are exempt from carrying capacity",
            "We have repeatedly raised our own carrying capacity through agriculture, sanitation and medicine",
            "Human populations do not compete",
            "Birth rates are constant",
          ],
          answer: 1,
          explain:
            "Each innovation raised K rather than removing it. The question is where K now sits, and whether it is being drawn down.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "yeast-balloon",
      unitId: "u6",
      title: "Capstone: The Yeast Balloon",
      subtitle:
        "Feed living cells, capture their waste gas, and check the volume against a number you calculated in advance.",
      buildsOn: ["respiration", "enzymes", "populations"],
      seeAlso: [
        {
          course: "catalyst",
          slug: "stoichiometry",
          label: {
            en: "⚗️ Catalyst 2.3 — the mole arithmetic this capstone runs on",
            de: "⚗️ Catalyst 2.3 — die Mol-Rechnung, auf der dieses Projekt läuft",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>What you are measuring</h2>
          <p>
            Yeast is a single-celled fungus. Give it sugar and no oxygen and it respires
            anaerobically — fermentation — producing ethanol and carbon dioxide. You are going to
            capture that CO₂ in a balloon and compare the volume against a prediction.
          </p>
          <div className="formula">
            C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂
            <span className="note">one glucose gives two ethanol and two carbon dioxide</span>
          </div>
          <p>
            This is the reaction behind bread and beer, running in front of you, at a rate you set.
          </p>

          <h2>Predict before you measure</h2>
          <p>
            Do this arithmetic first — the point of the experiment is that you knew the answer
            beforehand. It is Catalyst&rsquo;s stoichiometry, applied to a living organism.
          </p>
          <ul>
            <li>Glucose has a molar mass of 180 g/mol.</li>
            <li>10 g of sugar is 10 ÷ 180 = <strong>0.056 mol</strong>.</li>
            <li>Each glucose gives 2 CO₂, so 0.056 × 2 = <strong>0.111 mol of CO₂</strong>.</li>
            <li>
              One mole of any gas occupies about 24 litres at room temperature, so 0.111 × 24 ≈{" "}
              <strong>2.7 litres</strong>.
            </li>
          </ul>
          <p>
            That is the maximum, if every molecule of sugar is fermented. In practice you will get
            less, and the gap is itself informative: yeast uses some sugar for growth, some CO₂
            dissolves in the water, and the reaction will not have finished.
          </p>

          <h2>What you need</h2>
          <ul>
            <li>A sachet of <strong>dried yeast</strong> (about 7 g)</li>
            <li>2 tbsp <strong>sugar</strong> (roughly 25 g — weigh it if you can)</li>
            <li>250 ml <strong>warm water</strong>, around 35–40 °C</li>
            <li>A <strong>narrow-necked bottle</strong> (a 500 ml plastic one is ideal)</li>
            <li>A <strong>balloon</strong>, and a tape measure or string</li>
          </ul>

          <h2>Temperature is the variable to play with</h2>
          <p>
            Fermentation is run by enzymes, so Unit 0.3 applies directly: too cold and the yeast is
            sluggish, too hot and the enzymes denature and the cells die. Around 35 °C is close to
            optimal; above about 50 °C you will kill it outright. Running the same experiment at
            three temperatures turns this from a demonstration into an actual investigation — and if
            you do, keep everything else identical, or you will not know what caused the difference.
          </p>

          <div className="callout warn">
            <span className="co-title">Sensible precautions</span>
            <p>
              Do not seal the bottle with a cap — the balloon must be the only outlet, and pressure
              needs somewhere to go. Do not drink it: this is not a brewing kit, and what you have is
              unsanitised. Rinse everything afterwards.
            </p>
          </div>

          <h2>Estimating the volume</h2>
          <p>
            Measure the balloon&rsquo;s circumference <em>C</em> with string, then radius <em>r</em> = C ÷ 2π,
            and volume ≈ (4/3)πr³. A balloon 30 cm around has a radius of about 4.8 cm and holds
            roughly 0.46 litres. It is a rough estimate — balloons are not spheres — but good enough
            to compare against your prediction, and being explicit about that is part of doing it
            properly.
          </p>
        </>
      ),
      lab: {
        title: "Digital Twin: The Balloon",
        intro: (
          <>
            <p>Model it before you run it — sugar, temperature and time.</p>
            <ul>
              <li>Set 10 g of sugar and read the maximum volume. That is the number to predict.</li>
              <li>Push the temperature to 55 °C. The yeast dies and the balloon stops growing.</li>
              <li>Compare 15 °C and 35 °C at the same time setting — that is the investigation worth doing for real.</li>
            </ul>
          </>
        ),
        Component: FermentationLab,
      },
      problems: [
        {
          prompt:
            "You use 18 g of sugar (M = 180 g/mol). How many moles of CO₂ can fermentation produce? (1 glucose → 2 CO₂)",
          answer: 0.2,
          unit: "mol",
          tolerancePct: 3,
          hint: "Moles of glucose first, then double it.",
          explain: "18 ÷ 180 = 0.10 mol glucose → 0.20 mol CO₂.",
        },
        {
          prompt:
            "How many litres would 0.20 mol of CO₂ occupy at room temperature (24 L/mol)?",
          answer: 4.8,
          unit: "L",
          tolerancePct: 3,
          hint: "Multiply moles by the molar volume.",
          explain: "0.20 × 24 = 4.8 L — a substantially inflated balloon.",
        },
        {
          prompt:
            "Your balloon measures 30 cm around. Estimate its volume in litres, treating it as a sphere. (r = C/2π, V = 4/3·π·r³, and 1000 cm³ = 1 L)",
          answer: 0.46,
          unit: "L",
          tolerancePct: 10,
          hint: "r = 30 / 6.28 ≈ 4.8 cm. Then V = 4/3 × π × 4.8³ cm³.",
          explain: "r ≈ 4.77 cm, V ≈ 455 cm³ ≈ 0.46 L.",
        },
      ],
      checklist: [
        { id: "predict", text: "Calculated the predicted CO₂ volume from the mass of sugar BEFORE starting, and wrote it down." },
        { id: "mix", text: "Dissolved the sugar in 250 ml of warm water (35–40 °C) in the bottle." },
        { id: "yeast", text: "Added the yeast and swirled gently to mix." },
        { id: "balloon", text: "Stretched the balloon over the neck — and left the bottle otherwise unsealed." },
        { id: "wait", text: "Left it somewhere warm and checked after 10, 30 and 60 minutes." },
        { id: "measure", text: "Measured the balloon's circumference and estimated the volume." },
        { id: "compare", text: "Compared the measured volume with the prediction, and can explain why the real one is lower." },
        { id: "vary", text: "Ran it again at a clearly different temperature, changing nothing else." },
        { id: "smell", text: "Smelled the bottle at the end — that is the ethanol, the other product of the equation." },
      ],
    },
  ],
};
