import type { UnitModule } from "./types";
import { EnergyLab, RateLab, EquilibriumLab } from "@/catalyst/components/labs/labs-unit5";

export const unit5: UnitModule = {
  unit: {
    id: "u5",
    num: 5,
    title: "Energy & Change",
    blurb:
      "Why reactions release or swallow heat, what makes them fast or slow — and the two-way street that looks like standstill.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "energy",
      unitId: "u5",
      title: "Exothermic & Endothermic",
      subtitle:
        "Every reaction climbs a hill before it can fall. The hill's height sets the drama; the landing height sets the heat.",
      buildsOn: ["reactions"],
      Theory: () => (
        <>
          <h2>Bonds are energy accounts</h2>
          <p>
            Breaking a bond always <em>costs</em> energy; forming one always <em>pays out</em>.
            A reaction does both, so its net heat is a simple balance: energy of bonds formed
            minus energy of bonds broken. Pay out more than you spent and the difference leaves
            as heat — the reaction is <strong>exothermic</strong> (burning, rusting, your
            metabolism). Spend more than you recoup and the reaction drinks heat from its
            surroundings — <strong>endothermic</strong> (photosynthesis, cold packs, baking
            soda in vinegar).
          </p>
          <div className="formula">
            ΔH &lt; 0: exothermic (releases heat)&nbsp;&nbsp;·&nbsp;&nbsp;ΔH &gt; 0: endothermic (absorbs heat)
            <span className="note">ΔH — the enthalpy change: products&rsquo; energy minus reactants&rsquo; energy</span>
          </div>

          <h2>The hill in the middle</h2>
          <p>
            If burning releases energy, why doesn&rsquo;t the wood pile ignite itself? Because
            before new bonds can form, old ones must be <em>loosened</em> — and that upfront cost
            is the <strong>activation energy E<sub>a</sub></strong>. Picture the reaction as a
            ball that must be shoved over a hill before it can roll down into the valley of
            products. Wood + oxygen sit behind a high hill: at room temperature almost no
            collision carries enough energy to cross it. A match delivers the shove — and once
            some molecules cross, the heat they release shoves their neighbours. That chain
            hand-off is what a flame <em>is</em>.
          </p>

          <h2>Catalysts: a tunnel through the hill</h2>
          <p>
            A <strong>catalyst</strong> offers the reaction an alternative route with a lower
            E<sub>a</sub> — and emerges unchanged, ready to serve again. It doesn&rsquo;t alter
            ΔH: the start and end valleys stay where they were; only the pass between them drops.
            Your car&rsquo;s catalytic converter, the enzymes running your cells and the
            industrial catalysts behind fertilizer all play the same trick: lower the hill,
            multiply the crossings.
          </p>

          <div className="callout note">
            <span className="co-title">Diamonds are only mostly forever</span>
            <p>
              Diamond is <em>less</em> stable than graphite — turning into pencil lead would
              release energy. It never visibly happens because the activation hill is
              astronomically high. Chemistry has two separate questions: &ldquo;downhill or
              uphill?&rdquo; (thermodynamics, ΔH) and &ldquo;how high is the pass?&rdquo;
              (kinetics, E<sub>a</sub>). Diamond is thermodynamically doomed and kinetically
              immortal.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Energy Landscape",
        intro: (
          <>
            <p>Shape the reaction profile yourself, then fire collisions at the hill.</p>
            <ul>
              <li>Set a collision weaker than E<sub>a</sub> — the ball rolls back: no reaction.</li>
              <li>Add the catalyst and retry the same collision through the lowered pass.</li>
              <li>Make ΔH positive and see what an endothermic landscape looks like.</li>
            </ul>
          </>
        ),
        Component: EnergyLab,
      },
      quiz: [
        {
          q: "An exothermic reaction is one where…",
          choices: [
            "the reactants explode",
            "forming the new bonds releases more energy than breaking the old ones cost",
            "heat must be added continuously",
            "no bonds change",
          ],
          answer: 1,
          explain:
            "ΔH < 0: the bond-energy balance is positive for the surroundings — the surplus leaves as heat (and sometimes light).",
        },
        {
          q: "Why doesn't wood ignite spontaneously at room temperature?",
          choices: [
            "Burning wood is endothermic",
            "Air lacks oxygen",
            "The activation energy is too high for room-temperature collisions",
            "Wood contains water",
          ],
          answer: 2,
          explain:
            "Combustion is steeply downhill, but there's a high pass in the way. A match gives some molecules the crossing energy; their released heat recruits the rest.",
        },
        {
          q: "What does a catalyst change — and what does it leave alone?",
          choices: [
            "It changes ΔH but not Ea",
            "It lowers Ea but leaves ΔH untouched",
            "It raises the temperature",
            "It is consumed to fuel the reaction",
          ],
          answer: 1,
          explain:
            "A catalyst is a tunnel through the hill: lower pass, same two valleys. And it's regenerated — one catalyst molecule serves millions of reactions.",
        },
        {
          q: "Diamond converting to graphite would release energy, yet diamonds persist because…",
          choices: [
            "diamond is the more stable form",
            "the activation energy for the conversion is enormous",
            "graphite is rarer",
            "jewellers stabilize them",
          ],
          answer: 1,
          explain:
            "Thermodynamics says 'downhill'; kinetics says 'over an impossibly high pass'. With no route across, the unstable form lasts billions of years.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "rates",
      unitId: "u5",
      title: "Reaction Rates & Collisions",
      subtitle:
        "Reactions happen one collision at a time — so everything that makes collisions harder, faster or more frequent makes chemistry quicker.",
      buildsOn: ["energy", "gas-laws"],
      Theory: () => (
        <>
          <h2>Collision theory in one sentence</h2>
          <p>
            Two particles react only if they <strong>collide</strong>, collide{" "}
            <strong>hard enough</strong> (≥ E<sub>a</sub>), and collide{" "}
            <strong>pointing the right way</strong>. Reaction rate is just successful collisions
            per second — so every rate trick in chemistry is a way of rigging that count.
          </p>

          <h2>The four levers</h2>
          <ul>
            <li>
              <strong>Temperature</strong> — hotter particles move faster: more collisions,{" "}
              <em>and</em> a far bigger share of them clear the energy bar. Rule of thumb: +10 °C
              roughly doubles many everyday reaction rates. This is why fridges exist — food
              spoilage is chemistry, and cold chemistry is slow chemistry.
            </li>
            <li>
              <strong>Concentration</strong> (or gas pressure) — more particles per litre, more
              meetings per second. Pure oxygen turns a glowing ember into a torch.
            </li>
            <li>
              <strong>Surface area</strong> — reactions happen where phases touch. A log burns
              for an hour; the same wood as flour dust can explode (a genuine hazard in mills
              and silos).
            </li>
            <li>
              <strong>Catalyst</strong> — last lesson&rsquo;s tunnel: same collisions, lower bar,
              vastly more of them count.
            </li>
          </ul>

          <div className="formula">
            rate ∝ collisions/s × fraction with E ≥ E<sub>a</sub>
            <span className="note">temperature raises both factors at once — that&rsquo;s why it is the strongest lever</span>
          </div>

          <div className="callout tip">
            <span className="co-title">Why the temperature effect is so violent</span>
            <p>
              The energetic tail of the speed distribution grows <em>exponentially</em> with
              temperature. A modest 10% rise in average speed can double or triple the tiny
              fraction of collisions that clear the bar — small cause, huge effect. Life
              exploits the same math in reverse: a fever of just +3 °C measurably accelerates
              your immune chemistry.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Collision Counter",
        intro: (
          <>
            <p>Red A and cyan B particles react to green AB — but only fast collisions count.</p>
            <ul>
              <li>Raise the temperature and watch the rate meter respond disproportionately.</li>
              <li>Double the concentration at fixed temperature — roughly what happens to the rate?</li>
              <li>Add the catalyst: same speeds, lower bar, green everywhere.</li>
            </ul>
          </>
        ),
        Component: RateLab,
      },
      quiz: [
        {
          q: "According to collision theory, a reaction occurs only when particles…",
          choices: [
            "touch each other at all",
            "collide with enough energy and the right orientation",
            "have the same mass",
            "are at the same temperature",
          ],
          answer: 1,
          explain:
            "Most collisions are too soft or badly aimed and just bounce. Rate = the count of collisions that clear both conditions.",
        },
        {
          q: "Why does refrigeration keep food fresh?",
          choices: [
            "Cold kills all bacteria instantly",
            "Low temperature slows the spoilage reactions dramatically",
            "The dark inhibits chemistry",
            "Humidity is lower",
          ],
          answer: 1,
          explain:
            "Spoilage is a web of chemical reactions. Cooling shrinks the fraction of collisions clearing Ea exponentially — days become weeks.",
        },
        {
          q: "Wood dust can explode while a log merely burns because…",
          choices: [
            "dust contains more energy per gram",
            "dust exposes vastly more surface for oxygen collisions",
            "logs are wetter",
            "dust is hotter",
          ],
          answer: 1,
          explain:
            "Combustion happens at the wood-air interface. Milling multiplies that interface a million-fold, so the same total reaction finishes in milliseconds.",
        },
        {
          q: "Doubling the concentration of a reactant typically…",
          choices: [
            "halves the rate",
            "roughly doubles the rate — twice the meetings per second",
            "changes nothing",
            "doubles the activation energy",
          ],
          answer: 1,
          explain:
            "Twice the particles per litre means collisions with them happen about twice as often. (Exact exponents vary by mechanism — advanced kinetics.)",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "equilibrium",
      unitId: "u5",
      title: "Equilibrium & Le Chatelier",
      subtitle:
        "Some reactions run both ways at once. When the two directions tie, nothing seems to happen — and everything is happening.",
      buildsOn: ["rates"],
      Theory: () => (
        <>
          <h2>The two-way street</h2>
          <p>
            Many reactions are reversible: A turns into B <em>while</em> B turns back into A.
            Start with pure A and the forward traffic dominates; as B piles up, the reverse
            traffic grows. Eventually the two rates <strong>tie</strong> — and from the outside
            all change stops. This is <strong>dynamic equilibrium</strong>: not a ceasefire but
            a perfectly balanced exchange. Every second, millions of particles convert each way;
            the <em>totals</em> just no longer move.
          </p>
          <div className="formula">
            K<sub>c</sub> = [products] / [reactants]
            <span className="note">the equilibrium constant: where the tie settles — big K favors products, small K favors reactants</span>
          </div>

          <h2>Le Chatelier: the stubborn system</h2>
          <p>
            Disturb an equilibrium and it <strong>shifts to partially undo the disturbance</strong>.
            That one sentence — Le Chatelier&rsquo;s principle — predicts an enormous amount of
            chemistry:
          </p>
          <ul>
            <li>
              <strong>Add reactant</strong> → the system burns some of it off: shifts toward
              products.
            </li>
            <li>
              <strong>Remove product</strong> (siphon it away as it forms) → the system replaces
              it: shifts toward products. This is industry&rsquo;s favourite lever.
            </li>
            <li>
              <strong>Heat an exothermic reaction</strong> → heat is a product, so adding it
              pushes <em>backwards</em>. Cooling pulls forward.
            </li>
            <li>
              <strong>Compress a gas equilibrium</strong> → it shifts toward the side with fewer
              gas molecules, relieving the pressure.
            </li>
          </ul>

          <div className="callout note">
            <span className="co-title">The equilibrium that feeds the world</span>
            <p>
              N₂ + 3 H₂ ⇌ 2 NH₃ (ammonia for fertilizer) is exothermic and shrinks 4 gas
              molecules into 2. Le Chatelier prescribes: high pressure (shift right), moderate
              temperature (too cold is slow — kinetics again!), and constantly siphoning off the
              ammonia. The Haber-Bosch plants built on this reasoning feed roughly half of
              humanity. One principle, four billion lunches.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Two-Way Street",
        intro: (
          <>
            <p>80 particles flicker between A (red) and B (cyan); the forward reaction is exothermic.</p>
            <ul>
              <li>Wait for Q ≈ K — the bars freeze while the particles never do. That&rsquo;s &ldquo;dynamic&rdquo;.</li>
              <li>Dump in 20 A and watch the system eat most of them into B.</li>
              <li>Remove B repeatedly — can you starve the equilibrium? Now heat it and watch it run backwards.</li>
            </ul>
          </>
        ),
        Component: EquilibriumLab,
      },
      quiz: [
        {
          q: "At dynamic equilibrium…",
          choices: [
            "all reactions have stopped",
            "forward and reverse reactions run at equal rates, so totals stay constant",
            "only the forward reaction runs",
            "the temperature is zero",
          ],
          answer: 1,
          explain:
            "Individual particles convert constantly in both directions; the two flows cancel. Stillness at the macro level, frenzy at the micro level.",
        },
        {
          q: "You add extra reactant to a system at equilibrium. Le Chatelier predicts…",
          choices: [
            "nothing changes",
            "the system shifts toward products, consuming part of the addition",
            "the reaction stops",
            "K changes to a new value",
          ],
          answer: 1,
          explain:
            "The system partially undoes the disturbance: more reactant → more forward collisions → extra product until the ratio matches K again. (K itself only changes with temperature.)",
        },
        {
          q: "For an exothermic equilibrium, raising the temperature…",
          choices: [
            "shifts it toward products",
            "shifts it toward reactants — heat acts like an added product",
            "has no effect",
            "destroys the catalyst",
          ],
          answer: 1,
          explain:
            "Treat heat as a product of the forward reaction. Adding product pushes the balance backwards — warm equilibria of exothermic reactions hold less product.",
        },
        {
          q: "Why do ammonia plants continuously remove NH₃ from the reactor?",
          choices: [
            "Ammonia would poison the catalyst",
            "Removing product makes the equilibrium continuously shift forward to replace it",
            "To keep the reactor cool",
            "For easier storage only",
          ],
          answer: 1,
          explain:
            "Siphoning the product is Le Chatelier's most profitable lever: the system never reaches its tie and keeps producing. Half the world's food depends on it.",
        },
      ],
    },
  ],
};
