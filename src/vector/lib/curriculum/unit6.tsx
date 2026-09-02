import type { UnitModule } from "./types";
import { HeatFlowLab, PhotoelectricLab, DecayLab } from "@/vector/components/labs/labs-unit6";

export const unit6: UnitModule = {
  unit: {
    id: "u6",
    num: 6,
    title: "Heat & the Edge of the Classical World",
    blurb:
      "Temperature demystified as motion, then two cracks in the classical facade: light that arrives in packets, and nuclei that keep perfect time by pure chance.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "heat",
      unitId: "u6",
      title: "Temperature & Heat: Jiggling, Quantified",
      subtitle:
        "Temperature is not a substance — it is the average kinetic energy of molecules. Get that straight and heat flow, thermometers and 'cold' door handles all make sense.",
      buildsOn: ["energy"],
      Theory: () => (
        <>
          <h2>What a thermometer actually measures</h2>
          <p>
            Every molecule in this room is in motion — colliding, rebounding, jiggling.{" "}
            <strong>Temperature is the average kinetic energy of that motion.</strong> Hot
            coffee: fast molecules. Cold air: slow ones. Absolute zero (0 K, −273.15 °C) is
            where the jiggling reaches its minimum — you cannot get colder, because there is no
            motion left to remove. That is why the kelvin scale starts there and counts up, and
            why physics equations want kelvins: −10 °C is not &ldquo;twice as cold&rdquo; as
            −5 °C, but 400 K really is twice 200 K.
          </p>
          <p>
            <strong>Heat</strong> is different from temperature: it is energy <em>in
            transit</em> from hot to cold, measured in the joules you already own. A bathtub at
            30 °C holds far more thermal energy than a teaspoon of boiling water — lower
            temperature, vastly more jiggling molecules.
          </p>

          <h2>Heat flows one way — and equilibrium is a compromise</h2>
          <p>
            Put hot and cold in contact and collisions relentlessly hand energy from faster
            molecules to slower ones, until both sides share one temperature:{" "}
            <strong>thermal equilibrium</strong>. Never the reverse — a lukewarm coffee has
            never spontaneously sorted itself into hot coffee and a cold spot. (Refrigerators
            move heat uphill only by spending electrical work; the universe keeps its books.)
          </p>
          <p>How far the compromise lands depends on each side&rsquo;s thermal bulk:</p>
          <div className="formula">
            Q = m·c·ΔT
            <span className="note">c is specific heat: joules to lift 1 kg by 1 K — water’s 4,186 is famously huge</span>
          </div>
          <p>
            Water&rsquo;s enormous <strong>c</strong> is a planetary fact: oceans absorb summer
            and release it in winter, which is why coastal towns have mild years while
            continental interiors swing wildly — and why your pasta pot takes so long to boil
            yet the empty pan scorches in seconds.
          </p>

          <h2>Why metal feels cold</h2>
          <p>
            A metal handle and a wooden door are the <em>same temperature</em> — your hand
            disagrees because it measures <strong>heat flow</strong>, not temperature. Metal
            conducts heat out of your skin fast (free electrons ferry the energy — the same
            electrons Spark uses for current); wood ferries it slowly. Your skin is a flow
            meter mislabelled as a thermometer. Conduction has two siblings:{" "}
            <strong>convection</strong> (hot fluid physically rising — radiators, sea breezes)
            and <strong>radiation</strong> (infrared light — the campfire on your face, the
            Sun across vacuum).
          </p>

          <div className="callout note">
            <span className="co-title">The mystery of the missing warmth</span>
            <p>
              Rub your hands: friction &ldquo;loses&rdquo; mechanical energy — into faster
              molecular jiggling. This lesson closes Unit 2&rsquo;s open loop: heat is not a
              leak out of the energy books; it is the ledger&rsquo;s most disordered account,
              and James Joule earned the unit&rsquo;s name by proving the exchange rate with
              paddle wheels and thermometers.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Equilibrium Bench",
        intro: (
          <>
            <p>Two blocks, adjustable masses, materials and temperatures — bring them together.</p>
            <ul>
              <li>Equal masses of the same stuff: the meeting point is the simple average.</li>
              <li>Give one block four times the mass and watch the compromise shift toward it.</li>
              <li>Swap iron (c = 449) for water (c = 4,186) and see ’thermal bulk’ beat temperature.</li>
            </ul>
          </>
        ),
        Component: HeatFlowLab,
      },
      problems: [
        {
          prompt:
            "How much energy heats 1.5 kg of water from 20 °C to 100 °C, in joules? (c = 4,186 J/kg·K)",
          answer: 502320,
          unit: "J",
          tolerancePct: 2,
          hint: "Q = m·c·ΔT with ΔT = 80.",
          explain: "1.5 × 4,186 × 80 ≈ 502,000 J — four minutes flat-out for a 2 kW kettle, all spent on jiggling.",
        },
        {
          prompt: "Convert 22 °C to kelvins.",
          answer: 295.15,
          unit: "K",
          tolerancePct: 1,
          hint: "Add 273.15.",
          explain: "22 + 273.15 = 295.15 K. Same step size, honest zero.",
        },
      ],
      quiz: [
        {
          q: "What is temperature, microscopically?",
          choices: [
            "The amount of heat a body contains",
            "A fluid that flows from hot to cold",
            "The average kinetic energy of molecular motion",
            "The number of molecules present",
          ],
          answer: 2,
          explain:
            "Faster jiggling is all 'hotter' means. Heat, by contrast, is energy in transit between bodies at different temperatures.",
        },
        {
          q: "Why can't anything be colder than absolute zero?",
          choices: [
            "Thermometers stop working below it",
            "Temperature measures motion, and at 0 K there is no motion left to remove",
            "The air would freeze solid first",
            "It can, with enough refrigeration",
          ],
          answer: 1,
          explain:
            "You can't have less than none. 0 K is the floor of jiggling — which is also why physics prefers the kelvin scale's honest zero.",
        },
        {
          q: "A metal railing and a wooden bench sit outside all night. At dawn the metal feels colder because…",
          choices: [
            "metal is genuinely colder at night",
            "wood generates its own warmth",
            "metal reflects the cold sky",
            "both are the same temperature, but metal conducts heat out of your hand much faster",
          ],
          answer: 3,
          explain:
            "Your skin senses heat flow, not temperature. Metal's free electrons drain your hand's warmth quickly; wood barely can.",
        },
        {
          q: "Why do coastal cities have milder climates than inland ones?",
          choices: [
            "Water's huge specific heat lets the sea soak up summer heat and release it in winter",
            "Sea air is thinner",
            "Salt lowers the air temperature",
            "The sea reflects sunlight away",
          ],
          answer: 0,
          explain:
            "c = 4,186 J/kg·K makes the ocean a colossal thermal flywheel — the same property that makes your pasta pot slow to boil.",
        },
        {
          q: "A teaspoon of boiling water or a bathtub at 30 °C — which holds more thermal energy?",
          choices: [
            "The teaspoon — it is hotter",
            "The bathtub — vastly more molecules jiggling, despite the lower temperature",
            "Equal, since heat and temperature are the same",
            "Neither holds energy; only fuel does",
          ],
          answer: 1,
          explain:
            "Temperature is the average per molecule; thermal energy is the total. A hundred litres of moderate jiggling beats five grams of fast.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "quanta",
      unitId: "u6",
      title: "Quanta: Where the Smooth World Turns Grainy",
      subtitle:
        "Shine light on metal and electrons pop out — but only if the colour is right, no matter how bright the beam. Explaining that one stubborn fact broke classical physics.",
      buildsOn: ["spectrum", "energy"],
      Theory: () => (
        <>
          <h2>An experiment that shouldn’t have mattered</h2>
          <p>
            Light falling on a metal can kick electrons off its surface — the{" "}
            <strong>photoelectric effect</strong>. Classically, light is a wave delivering
            energy continuously, so brighter light should kick harder, and even dim light
            should manage eventually. The metal disagreed on every count:
          </p>
          <ul>
            <li>Below a <strong>threshold frequency</strong>, <em>nothing</em> — however blinding the beam, however long you wait.</li>
            <li>Above it, electrons leave <em>instantly</em>, even in the dimmest light.</li>
            <li>Brighter light: <em>more</em> electrons, but not faster ones. Only bluer light makes faster ones.</li>
          </ul>

          <h2>Einstein’s uncomfortable answer</h2>
          <p>
            In 1905 Einstein took Planck&rsquo;s bookkeeping trick literally: light arrives in
            indivisible packets — <strong>photons</strong> — each carrying an energy set only by
            frequency:
          </p>
          <div className="formula">
            E = h·f
            <span className="note">h = 6.63 × 10⁻³⁴ J·s — the granularity of the universe, in one tiny constant</span>
          </div>
          <p>
            Now the stubborn facts are obvious. An electron is freed by absorbing{" "}
            <em>one</em> photon; if that photon&rsquo;s E is below the escape cost (the{" "}
            <strong>work function</strong>), nothing happens — a million weak packets
            don&rsquo;t pool. Brightness is just packet <em>count</em>: more electrons, same
            energy each. Red light is cheap coins, ultraviolet is high-denomination notes, and
            the metal is a vending machine that takes exact change only. This — not
            relativity — is what Einstein&rsquo;s Nobel Prize cites.
          </p>

          <h2>Matter is grainy too</h2>
          <p>
            The graininess spreads. Atoms hold electrons only on discrete energy rungs — which
            is why heated elements emit sharp spectral <em>lines</em> (last lesson&rsquo;s
            fingerprints): each line is a photon of exactly one rung-to-rung drop. A neon
            sign&rsquo;s orange and a sodium lamp&rsquo;s yellow are quantum leaps you can see
            from the street. Yet waves refuse to leave the story: streams of single electrons
            build up interference patterns, and Unit 4&rsquo;s wave-test says <em>wave</em>{" "}
            while the clicks of detectors say <em>particle</em>. Both, in honesty, are true —
            the quantum world&rsquo;s standing offer of humility.
          </p>

          <div className="callout note">
            <span className="co-title">You use this daily</span>
            <p>
              Solar panels are the photoelectric effect monetised — photons promoting electrons
              into a current. Camera sensors count photons; LEDs run the effect in reverse,
              each electron dropping a rung and paying out one photon whose colour <em>is</em>{" "}
              the rung height. E = hf is consumer electronics now.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Photoelectric Bench",
        intro: (
          <>
            <p>A metal plate, a light source with frequency and brightness dials, an electron counter.</p>
            <ul>
              <li>Start deep in the red and crank the brightness to maximum: nothing. Not one electron.</li>
              <li>Now slide the frequency up — at the threshold, electrons instantly, even at minimum brightness.</li>
              <li>Above threshold, compare the dials: brightness moves the count; frequency moves the speed.</li>
            </ul>
          </>
        ),
        Component: PhotoelectricLab,
      },
      problems: [
        {
          prompt:
            "A photon of blue light has f = 6.6 × 10¹⁴ Hz. What is its energy, in joules? (h = 6.63 × 10⁻³⁴; answer like 4.4e-19)",
          answer: 4.4e-19,
          unit: "J",
          tolerancePct: 3,
          hint: "E = h·f.",
          explain: "6.63×10⁻³⁴ × 6.6×10¹⁴ ≈ 4.4×10⁻¹⁹ J — a tiny coin, but the only currency the metal accepts.",
        },
      ],
      quiz: [
        {
          q: "Dim ultraviolet light frees electrons from a metal; blinding red light frees none. Why?",
          choices: [
            "Each electron absorbs one photon, and only UV photons individually carry enough energy",
            "Red light is absorbed by air first",
            "UV light is always brighter",
            "Electrons prefer shorter wavelengths aesthetically",
          ],
          answer: 0,
          explain:
            "E = hf per packet, exact change only. A million cheap red coins never sum to one escape fare — that's the graininess classical physics couldn't allow.",
        },
        {
          q: "Making the (above-threshold) light brighter changes…",
          choices: [
            "how fast each electron leaves",
            "the threshold frequency",
            "how many electrons leave per second — not their individual energy",
            "the metal's work function",
          ],
          answer: 2,
          explain:
            "Brightness is photon count. Each ejection is still a one-photon transaction, so per-electron energy only follows frequency.",
        },
        {
          q: "Why do heated elements emit sharp spectral lines instead of a smooth rainbow?",
          choices: [
            "Their light is filtered by the glass",
            "Electrons sit on discrete energy rungs, and each line is one exact rung-to-rung jump's photon",
            "The atoms vibrate at one temperature",
            "They emit sound as well",
          ],
          answer: 1,
          explain:
            "Quantised levels mean quantised photon energies — each element's ladder is unique, which is why lines identify elements across light-years.",
        },
        {
          q: "What is the energy of a photon set by?",
          choices: [
            "The brightness of its source",
            "How long the light has travelled",
            "The size of the emitting atom",
            "Its frequency alone: E = h·f",
          ],
          answer: 3,
          explain:
            "One packet, one frequency, one energy. Blue costs more than red by exactly h times the frequency difference.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "half-life",
      unitId: "u6",
      title: "Half-Life: Perfect Clocks from Pure Chance",
      subtitle:
        "No nucleus knows when it will decay — yet a trillion of them keep time better than any watch. Randomness, aggregated, is how we date pharaohs and planets.",
      buildsOn: ["quanta"],
      Theory: () => (
        <>
          <h2>The most honest randomness there is</h2>
          <p>
            Some nuclei are unstable: sooner or later each one spits out radiation and becomes
            something else. When? <strong>Genuinely unknowable.</strong> A given carbon-14
            nucleus might decay in the next second or outlast civilisation — it has no age, no
            wear, no schedule; a five-thousand-year-old nucleus is exactly as likely to decay
            this second as a fresh one. This is not ignorance to be fixed by better
            instruments; as far as physics can tell, it is chance all the way down — the
            quantum graininess of the last lesson, running the show inside the nucleus.
          </p>

          <h2>Chance, aggregated, is a clock</h2>
          <p>
            Now take a trillion of them. Each has a fixed probability per unit time, so a fixed{" "}
            <em>fraction</em> of the population decays per unit time — and that yields an
            unmistakable pattern:
          </p>
          <div className="formula">
            N(t) = N₀ · (½)^(t / T½)
            <span className="note">every half-life T½, whatever is left halves again — 100% → 50% → 25% → 12.5%…</span>
          </div>
          <p>
            The half-life is the signature of the isotope: carbon-14, 5,730 years;
            uranium-238, 4.5 billion; some medical isotopes, hours. Individually lawless,
            collectively metronomic — the same statistical magic that lets casinos budget
            precisely on games of pure chance.
          </p>

          <h2>Reading the clock backwards</h2>
          <p>
            Living things constantly refresh their carbon, holding a known trace of C-14.
            Death stops the refresh, and the clock starts draining. Measure how far a
            sample&rsquo;s C-14 has fallen and the formula runs in reverse: an eighth of the
            original means three half-lives — about 17,000 years. This is{" "}
            <strong>radiocarbon dating</strong>, and it put honest dates on Ötzi, the Dead Sea
            Scrolls and every charcoal hearth archaeology has ever argued about. For rocks and
            planets, slower isotopes take over: uranium-lead dating is how we know the Earth is
            4.54 billion years old — a number this course can now defend, not just quote.
          </p>

          <h2>What decay is not</h2>
          <p>
            Half-life describes populations, not appointments: after one half-life your
            <em> particular</em> nucleus hasn&rsquo;t &ldquo;half-decayed&rdquo; — it is
            either gone or untouched. And decay is a nuclear event: burning, freezing or
            crushing a sample changes its chemistry, never its half-life. That indifference is
            exactly what makes the clock trustworthy across billions of years.
          </p>

          <div className="callout note">
            <span className="co-title">The dice model you can run at home</span>
            <p>
              Roll 100 dice; remove every six; repeat. Each die is lawless, yet the population
              falls exponentially with a &ldquo;half-life&rdquo; of about 3.8 rolls — and your
              curve will wobble around the ideal one exactly the way real decay counts wobble.
              The lab below throws thousands so your wrists don&rsquo;t have to.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Decay Farm",
        intro: (
          <>
            <p>Ten thousand unstable nuclei, one probability dial, and time. Watch law emerge from chaos.</p>
            <ul>
              <li>Run it and watch the count halve on schedule — while any single nucleus stays unpredictable.</li>
              <li>Shrink the population to 20 and re-run: the clean curve turns ragged. Statistics needs numbers.</li>
              <li>Load the ’ancient sample’ and read its age off the fraction remaining — dating in one division.</li>
            </ul>
          </>
        ),
        Component: DecayLab,
      },
      problems: [
        {
          prompt:
            "A sample starts with 8,000 radioactive nuclei (T½ = 10 min). How many remain after 30 minutes?",
          answer: 1000,
          unit: "nuclei",
          hint: "Three half-lives.",
          explain: "8,000 → 4,000 → 2,000 → 1,000. Three halvings, right on schedule.",
        },
        {
          prompt:
            "A bone retains 25% of its original C-14 (T½ = 5,730 years). How old is it, in years?",
          answer: 11460,
          unit: "years",
          tolerancePct: 2,
          hint: "25% is two half-lives.",
          explain: "½ × ½ = ¼ → two half-lives → 2 × 5,730 = 11,460 years since the refreshing stopped.",
        },
      ],
      quiz: [
        {
          q: "When will one particular unstable nucleus decay?",
          choices: [
            "Exactly one half-life after it forms",
            "It is genuinely unpredictable — only the probability is fixed",
            "When it collides with another nucleus",
            "Sooner if the sample is heated",
          ],
          answer: 1,
          explain:
            "No age, no wear, no schedule — pure chance with a fixed rate. The clock only exists at the population level.",
        },
        {
          q: "After two half-lives, what fraction of a large sample remains undecayed?",
          choices: ["None", "Half", "A third", "A quarter"],
          answer: 3,
          explain: "Each half-life halves what's left: ½ × ½ = ¼. After ten, about a thousandth.",
        },
        {
          q: "Why does radiocarbon dating work on a bone but not on a living sheep?",
          choices: [
            "Living tissue blocks radiation",
            "Sheep contain no carbon-14",
            "Life constantly refreshes C-14 — the clock only starts draining at death",
            "The half-life is different in living things",
          ],
          answer: 2,
          explain:
            "Eating and breathing top the C-14 back up to the atmospheric level. Death cuts the supply, and the known decay does the timekeeping.",
        },
        {
          q: "Why does a tiny sample (say 20 nuclei) show a ragged, unreliable decay curve?",
          choices: [
            "The exponential law is only a large-number statistical pattern — few random events wobble hard",
            "Small samples decay faster",
            "The detector can't see small samples",
            "Half-life shrinks with sample size",
          ],
          answer: 0,
          explain:
            "Same physics per nucleus; the smoothness was always an average. Casinos and isotopes both need volume to be predictable.",
        },
        {
          q: "Heating, crushing or chemically burning a radioactive sample will…",
          choices: [
            "speed up its decay",
            "stop its decay",
            "randomise its half-life",
            "change nothing about its decay — half-life is a nuclear property",
          ],
          answer: 3,
          explain:
            "Chemistry happens to electrons; decay happens in the nucleus, orders of magnitude below. That indifference is why the clock survives geology.",
        },
      ],
    },
  ],
};
