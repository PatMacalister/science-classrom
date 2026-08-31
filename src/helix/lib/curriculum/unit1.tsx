import type { UnitModule } from "./types";
import { PhotosynthesisLab, RespirationLab } from "@/helix/components/labs/labs-unit1";

export const unit1: UnitModule = {
  unit: {
    id: "u1",
    num: 1,
    title: "Energy",
    blurb:
      "Two reactions, run in opposite directions, power almost everything alive: one stores sunlight in sugar, the other spends it again.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "photosynthesis",
      unitId: "u1",
      title: "Photosynthesis: Making Food from Light",
      subtitle:
        "Plants build sugar out of air and water using sunlight. Almost every calorie you have ever eaten started here.",
      buildsOn: ["cells", "enzymes"],
      Theory: () => (
        <>
          <h2>Where your food comes from</h2>
          <p>
            A tree does not grow out of the soil. Weigh the soil in a pot before and after growing a
            sapling and you will find it barely changed — van Helmont did roughly this experiment in
            the 1600s and was baffled by the result. Nearly all the added mass came from{" "}
            <strong>carbon dioxide in the air</strong> and water. A log is, in a real sense,
            solidified air.
          </p>
          <p>
            The reaction that does it is <strong>photosynthesis</strong>: light energy is used to
            join CO₂ and water into glucose, releasing oxygen as waste.
          </p>
          <div className="formula">
            6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂
            <span className="note">carbon dioxide + water + light → glucose + oxygen</span>
          </div>
          <p>
            Two things about that equation deserve more attention than they usually get. First, the
            oxygen is <em>waste</em> — a by-product the plant does not want, which happens to be
            what the rest of us breathe. Every oxygen molecule in the atmosphere was exhaled by
            something photosynthetic. Second, the reaction runs energetically uphill: it stores
            energy rather than releasing it. That is what makes glucose worth eating.
          </p>

          <h2>Where it happens</h2>
          <p>
            In the <strong>chloroplast</strong>, using the green pigment{" "}
            <strong>chlorophyll</strong>. Chlorophyll absorbs red and blue light strongly and
            reflects green — which is the entire reason plants look green to you. Leaves are
            radiating the one part of the spectrum they decided not to use.
          </p>
          <p>The process runs in two stages:</p>
          <ul>
            <li>
              <strong>The light-dependent reactions</strong>, in the stacked membranes. Light splits
              water, releasing O₂ and loading energy onto carrier molecules.
            </li>
            <li>
              <strong>The Calvin cycle</strong>, in the fluid around them. That energy is spent
              fixing CO₂ into sugar. It needs no light directly, only the carriers the first stage
              charged up — which is why calling it the &ldquo;dark reaction&rdquo; is a misnomer
              worth avoiding.
            </li>
          </ul>

          <h2>Limiting factors</h2>
          <p>
            Photosynthesis needs light, CO₂ and a workable temperature. Here is the rule that
            matters, and it is one of the most transferable ideas in biology:{" "}
            <strong>the rate is set by whichever requirement is scarcest.</strong> Everything else
            is in surplus and raising it changes nothing.
          </p>
          <p>
            Put a plant in dim light and doubling the CO₂ does nothing at all — light is the{" "}
            <strong>limiting factor</strong>. Turn the lights up and the rate climbs, until CO₂ or
            temperature becomes the new ceiling. It is precisely the limiting-reagent logic from
            Catalyst, and commercial greenhouses run on it: they pump CO₂ to about three times
            atmospheric level, because once light and warmth are handled, CO₂ is what is left
            holding the crop back.
          </p>
          <p>
            Temperature behaves differently from the other two, and the reason is the previous
            lesson. The Calvin cycle is run by enzymes, so warmth speeds it up to an optimum and
            then <em>denatures</em> them. Light and CO₂ merely plateau; temperature has a cliff.
          </p>

          <div className="callout note">
            <span className="co-title">The Great Oxidation Event</span>
            <p>
              For the first two billion years there was essentially no free oxygen on Earth. Then
              photosynthetic bacteria filled the atmosphere with their waste — and to the anaerobic
              life of the time, oxygen was a poison. It was probably the largest mass extinction in
              history, caused by pollution, from organisms that could not have known. It also made
              aerobic respiration, and therefore you, possible.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Limiting Factor Bench",
        intro: (
          <>
            <p>Pondweed in a beaker. The oxygen bubbles tell you the rate.</p>
            <ul>
              <li>Drop the light to 10% and then raise CO₂ all the way. Nothing happens — light is the ceiling.</li>
              <li>Now raise the light. The moment CO₂ becomes the scarcest input, the bar switches.</li>
              <li>Push the temperature past 40 °C. Unlike the other two, it does not plateau — it collapses.</li>
            </ul>
          </>
        ),
        Component: PhotosynthesisLab,
      },
      quiz: [
        {
          q: "Where does most of the mass of a growing tree come from?",
          choices: ["The soil", "Carbon dioxide from the air", "Water alone", "Fertiliser"],
          answer: 1,
          explain:
            "Carbon fixed from atmospheric CO₂, plus water. The soil barely changes in mass — a log is close to solidified air.",
        },
        {
          q: "Why do leaves look green?",
          choices: [
            "Chlorophyll absorbs green light most strongly",
            "Chlorophyll reflects green light, absorbing red and blue",
            "Green is the colour of glucose",
            "The cell wall is green",
          ],
          answer: 1,
          explain:
            "You see the light the plant rejected. Chlorophyll uses red and blue and reflects green straight back at you.",
        },
        {
          q: "A plant in dim light gets three times as much CO₂. What happens to the rate?",
          choices: [
            "It triples",
            "It rises slightly",
            "It does not change — light is the limiting factor",
            "It falls",
          ],
          answer: 2,
          explain:
            "Only the scarcest input sets the rate. Adding more of something already in surplus does nothing until the true ceiling is raised.",
        },
        {
          q: "The oxygen released by photosynthesis is…",
          choices: [
            "The point of the reaction",
            "Produced only at night",
            "Taken back in by the Calvin cycle",
            "A waste product, which happens to be what we breathe",
          ],
          answer: 3,
          explain:
            "It comes from splitting water and is simply discarded. Every O₂ molecule in the atmosphere is photosynthetic waste.",
        },
        {
          q: "Why does the rate collapse above about 40 °C rather than just levelling off?",
          choices: [
            "The light stops working",
            "CO₂ escapes faster",
            "The enzymes of the Calvin cycle denature and lose their shape",
            "Chlorophyll changes colour",
          ],
          answer: 2,
          explain:
            "Temperature acts through enzymes. Past the optimum they unfold, so the reaction does not plateau — it falls off a cliff.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "respiration",
      unitId: "u1",
      title: "Respiration: Spending the Sugar",
      subtitle:
        "Every cell runs the same reaction in reverse to get ATP — and how much it gets depends entirely on whether oxygen is available.",
      buildsOn: ["photosynthesis"],
      seeAlso: [
        {
          course: "catalyst",
          slug: "energy",
          label: {
            en: "⚗️ Catalyst 5.1 — exothermic reactions and where the energy actually goes",
            de: "⚗️ Catalyst 5.1 — exotherme Reaktionen und wohin die Energie wirklich geht",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>ATP: the cell&rsquo;s small change</h2>
          <p>
            Cells do not spend glucose directly, any more than you pay for coffee with a gold bar.
            Glucose is bulk storage; the working currency is <strong>ATP</strong> (adenosine
            triphosphate). Snapping off its third phosphate releases a usable packet of energy and
            leaves ADP, which gets recharged and used again.
          </p>
          <p>
            The turnover is extraordinary. You hold only about 250 g of ATP at any moment, and you
            cycle through roughly your own body weight of it every day. ATP is not a battery you
            fill; it is a bucket brigade that never stops moving.
          </p>

          <h2>The reaction, backwards</h2>
          <p>
            <strong>Cellular respiration</strong> is photosynthesis run in reverse — and it happens
            in <em>every</em> living cell, plants included. Plants photosynthesise in the light and
            respire around the clock.
          </p>
          <div className="formula">
            C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP
            <span className="note">glucose + oxygen → carbon dioxide + water + usable energy</span>
          </div>
          <p>
            This is combustion, carried out carefully. Burning sugar in a flame releases the same
            energy in one useless burst; the cell extracts it down a staircase of small steps, each
            catalysed by an enzyme, capturing energy as ATP along the way instead of losing it all
            as heat. The reason you are warm rather than on fire is entirely one of pacing.
          </p>
          <p>
            Note the symmetry with the previous lesson: what photosynthesis produces, respiration
            consumes, and vice versa. Together they form a loop through the whole biosphere.
          </p>

          <h2>With oxygen, and without</h2>
          <p>
            <strong>Aerobic respiration</strong> — with oxygen, mostly in the mitochondria — extracts
            around <strong>30 ATP per glucose</strong>. Oxygen&rsquo;s role is to sit at the end of the
            chain and accept spent electrons; without it the whole line backs up and stops.
          </p>
          <p>
            <strong>Anaerobic respiration</strong> — without oxygen — gets only through the first
            stage, glycolysis, in the cytoplasm. Yield: <strong>2 ATP per glucose</strong>. Roughly
            a fifteenth as much from the same sugar, because most of the energy is still locked in
            the partly-broken molecule.
          </p>
          <p>What that leftover molecule becomes depends on the organism:</p>
          <ul>
            <li>
              <strong>Your muscles</strong> make <strong>lactic acid</strong>. It lets you sprint
              past the rate your lungs can supply, and you repay the oxygen debt afterwards — which
              is why you keep panting after you stop.
            </li>
            <li>
              <strong>Yeast</strong> makes <strong>ethanol and CO₂</strong>. This is fermentation:
              the CO₂ raises bread, the ethanol makes beer, and the same organism does both. Unit 6&rsquo;s
              capstone measures it with a balloon.
            </li>
          </ul>

          <div className="callout tip">
            <span className="co-title">Why exercise burns</span>
            <p>
              The ache during hard effort is not lactic acid &ldquo;building up&rdquo; the way gym
              folklore says — lactate clears within an hour and is itself a useful fuel. The burning
              is the acidity that comes with it, and the soreness two days later is microscopic
              muscle damage, a different thing entirely.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Aerobic vs Anaerobic",
        intro: (
          <>
            <p>The same glucose, two routes, wildly different returns.</p>
            <ul>
              <li>Run it aerobically and count the ATP dots. Now switch off the oxygen.</li>
              <li>Switch the organism between human muscle and yeast — the yield is identical, the waste is not.</li>
              <li>Note where each route happens: mitochondrion versus bare cytoplasm.</li>
            </ul>
          </>
        ),
        Component: RespirationLab,
      },
      problems: [
        {
          prompt: "Aerobic respiration yields about 30 ATP per glucose. How many ATP from 12 glucose molecules?",
          answer: 360,
          unit: "ATP",
          hint: "Multiply.",
          explain: "12 × 30 = 360 ATP.",
        },
        {
          prompt:
            "Anaerobic respiration yields 2 ATP per glucose. How many glucose molecules would a muscle need to match the ATP from 4 glucose respired aerobically (30 each)?",
          answer: 60,
          unit: "molecules",
          hint: "Work out the aerobic total first, then divide by 2.",
          explain: "4 × 30 = 120 ATP; 120 ÷ 2 = 60 glucose molecules — fifteen times as many.",
        },
      ],
      quiz: [
        {
          q: "Why do cells use ATP rather than spending glucose directly?",
          choices: [
            "Glucose is toxic",
            "Glucose cannot enter cells",
            "ATP releases a small, usable packet of energy on demand — glucose is bulk storage",
            "ATP contains more total energy",
          ],
          answer: 2,
          explain:
            "It is a denomination problem. Glucose is the gold bar; ATP is the coin every cellular process is priced in.",
        },
        {
          q: "How does respiration relate to photosynthesis?",
          choices: [
            "They are unrelated",
            "Respiration is essentially photosynthesis reversed — its products are the other's reactants",
            "Only plants respire",
            "Respiration also needs light",
          ],
          answer: 1,
          explain:
            "Glucose + O₂ → CO₂ + H₂O is the reverse of CO₂ + H₂O + light → glucose + O₂. Together they cycle carbon and oxygen through the biosphere.",
        },
        {
          q: "Aerobic respiration yields about 30 ATP per glucose; anaerobic yields 2. Why the difference?",
          choices: [
            "Anaerobic respiration uses a different sugar",
            "Without oxygen only glycolysis runs — most of the energy stays locked in a partly-broken molecule",
            "Anaerobic respiration wastes ATP as heat",
            "Oxygen itself contains the extra energy",
          ],
          answer: 1,
          explain:
            "Oxygen accepts spent electrons at the end of the chain. Without it the chain stops after glycolysis, and lactate or ethanol still holds most of the energy.",
        },
        {
          q: "Which cells carry out respiration?",
          choices: [
            "Only animal cells",
            "Only cells without chloroplasts",
            "Every living cell, plants included",
            "Only muscle cells during exercise",
          ],
          answer: 2,
          explain:
            "Every cell needs ATP. Plants photosynthesise in the light and respire continuously, day and night.",
        },
        {
          q: "Yeast respiring anaerobically produces…",
          choices: ["Lactic acid", "Ethanol and CO₂", "Oxygen", "Glucose"],
          answer: 1,
          explain:
            "Fermentation. The CO₂ raises bread and the ethanol makes beer — the same organism, the same reaction, two industries.",
        },
      ],
    },
  ],
};
