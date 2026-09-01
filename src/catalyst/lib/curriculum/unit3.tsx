import type { UnitModule } from "./types";
import { StatesLab, GasLab, DissolveLab } from "@/catalyst/components/labs/labs-unit3";

export const unit3: UnitModule = {
  unit: {
    id: "u3",
    num: 3,
    title: "States of Matter & Solutions",
    blurb:
      "The same particles, dancing three different dances — and what happens when one substance disappears into another.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "states",
      unitId: "u3",
      title: "Solid, Liquid, Gas",
      subtitle:
        "Ice, water and steam are the same molecule at three energy levels. Temperature just changes the dance.",
      buildsOn: ["bond-spectrum", "intermolecular"],
      Theory: () => (
        <>
          <h2>Three dances, one dancer</h2>
          <p>
            Nothing about an H₂O molecule changes when ice melts. What changes is the{" "}
            <strong>motion</strong>. Particles always attract each other (those polar-molecule
            forces from Unit 1), and they always jiggle with thermal energy. The state of matter
            is simply the scoreboard of that fight:
          </p>
          <ul>
            <li>
              <strong>Solid</strong> — attraction wins. Particles lock into a lattice and can
              only vibrate in place. Fixed shape, fixed volume.
            </li>
            <li>
              <strong>Liquid</strong> — a draw. Particles still touch but slide past one
              another. Fixed volume, borrowed shape.
            </li>
            <li>
              <strong>Gas</strong> — motion wins. Particles tear free and fly, meeting only in
              collisions. No shape, no volume of their own.
            </li>
          </ul>

          <h2>Melting and boiling points are tug-of-war scores</h2>
          <p>
            The stronger the forces between particles, the more thermal energy it takes to break
            the dance formation. That&rsquo;s the entire secret behind melting points: nitrogen&rsquo;s
            feeble intermolecular grip gives up at −210 °C, water&rsquo;s hydrogen bonds hold to
            0 °C, and iron&rsquo;s metallic bond fights to 1538 °C. Read a melting point and you
            are reading bond strength.
          </p>

          <div className="formula">
            solid ⇌ liquid ⇌ gas
            <span className="note">melting / freezing at one temperature, boiling / condensing at another — energy in going right, energy out going left</span>
          </div>

          <h2>The plateau mystery</h2>
          <p>
            Heat ice steadily and watch the thermometer: it climbs to 0 °C, then <strong>stalls</strong>{" "}
            while the ice melts, then climbs again. During the stall, every joule goes into
            breaking lattice bonds instead of speeding particles up. Temperature measures average
            particle speed — and the speed isn&rsquo;t changing, the <em>structure</em> is. The
            same plateau repeats at 100 °C, and it is huge: turning hot water into steam takes
            about five times more energy than heating it from 0 to 100.
          </p>

          <div className="callout note">
            <span className="co-title">Evaporation without boiling</span>
            <p>
              Puddles dry at 20 °C because temperature is an <em>average</em>. In every liquid a
              few lucky particles at the surface are moving fast enough to escape. They leave,
              taking their above-average energy with them — which is why evaporation cools
              what&rsquo;s left, why sweating works, and why wet clothes feel cold.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Particle Dance Floor",
        intro: (
          <>
            <p>48 particles, one temperature slider, three dances.</p>
            <ul>
              <li>Sweep water from −60 to 160 °C and watch the lattice break twice.</li>
              <li>Switch to nitrogen: same three dances, crammed below −196 °C.</li>
              <li>Iron needs 1538 °C to melt — same physics, stronger grip.</li>
            </ul>
          </>
        ),
        Component: StatesLab,
      },
      quiz: [
        {
          q: "What changes when ice melts into water?",
          choices: [
            "The molecules' motion and arrangement — the molecules themselves are unchanged",
            "The H₂O molecules break into H and O",
            "The molecules get smaller",
            "Hydrogen bonds get stronger",
          ],
          answer: 0,
          explain:
            "Melting is a change of state, not of substance. The same H₂O molecules stop vibrating in a lattice and start sliding past each other.",
        },
        {
          q: "Iron melts at 1538 °C, nitrogen at −210 °C. The difference tells you…",
          choices: [
            "iron atoms are faster",
            "nothing — melting points are random",
            "nitrogen contains more energy",
            "the forces between iron atoms are far stronger than those between N₂ molecules",
          ],
          answer: 3,
          explain:
            "Melting point measures how much thermal jiggling the inter-particle forces can withstand. Metallic bonds beat weak intermolecular forces by a factor of thousands of degrees.",
        },
        {
          q: "While water boils, its temperature stays pinned at 100 °C because…",
          choices: [
            "thermometers fail in steam",
            "water cannot get hotter",
            "the added energy is breaking intermolecular bonds, not speeding particles up",
            "the stove weakens",
          ],
          answer: 2,
          explain:
            "During a phase change, energy goes into tearing the structure apart. Only when every molecule has escaped does further heating raise the speed (and temperature) again.",
        },
        {
          q: "Why does sweating cool you down?",
          choices: [
            "Sweat is colder than skin",
            "The fastest water molecules evaporate, carrying away above-average energy",
            "Salt in sweat absorbs heat",
            "It doesn't — it's psychological",
          ],
          answer: 1,
          explain:
            "Evaporation is selective emigration of the most energetic molecules. The average energy of what remains drops — that average is your skin temperature.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "gas-laws",
      unitId: "u3",
      title: "Gases & the Ideal Gas Law",
      subtitle:
        "A gas is chaos with rules. Four knobs — pressure, volume, temperature, amount — locked together by one equation.",
      buildsOn: ["states", "mole"],
      Theory: () => (
        <>
          <h2>Pressure is drumming</h2>
          <p>
            A gas particle hits the container wall and bounces off, giving the wall a tiny shove.
            Multiply by 10²³ collisions per second and the drumming blurs into a steady push:{" "}
            <strong>pressure</strong>. This picture makes gas behaviour almost obvious. Shrink
            the volume → particles hit walls more often → pressure rises. Heat the gas →
            particles hit harder and more often → pressure rises. Add more gas → more drummers →
            pressure rises.
          </p>

          <h2>One law to rule the knobs</h2>
          <div className="formula">
            P V = n R T
            <span className="note">pressure × volume = moles × gas constant × absolute temperature (in kelvin!)</span>
          </div>
          <p>
            Everything above is packed into this one line, with R ≈ 8.314 J/(mol·K) as the
            conversion constant. The non-negotiable detail: <strong>T must be in kelvin</strong>{" "}
            (K = °C + 273.15). Celsius has its zero at an arbitrary point — water&rsquo;s
            freezing — while gas physics cares about absolute motion. At 0 K motion stops;
            doubling kelvin genuinely doubles the pressure. Doubling &ldquo;degrees
            Celsius&rdquo; means nothing.
          </p>
          <p>
            A famous consequence: at room conditions, one mole of <em>any</em> ideal gas fills
            about <strong>24 litres</strong> — hydrogen, oxygen, CO₂ alike. The identity of the
            particles barely matters when they spend their lives far apart.
          </p>

          <h2>Special cases you already know</h2>
          <ul>
            <li>
              <strong>Squeeze at constant T</strong> (Boyle): halve V → double P. Syringes,
              pistons, diving.
            </li>
            <li>
              <strong>Heat at constant V</strong> (Gay-Lussac): P rises with T. Why aerosol cans
              say &ldquo;never throw into fire&rdquo;.
            </li>
            <li>
              <strong>Heat at constant P</strong> (Charles): V grows with T. Why a hot-air
              balloon rises and a sealed bag puffs up in the sun.
            </li>
          </ul>

          <div className="callout tip">
            <span className="co-title">&ldquo;Ideal&rdquo;?</span>
            <p>
              The law assumes point-particles with no attractions — nearly true for ordinary
              gases at ordinary conditions. Squeeze hard or cool near condensation and the
              intermolecular forces from the last lesson reappear; that&rsquo;s exactly when real
              gases start to liquefy and the law bends.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Piston Machine",
        intro: (
          <>
            <p>A gas in a cylinder with three knobs and one pressure gauge.</p>
            <ul>
              <li>Halve the volume at fixed T — watch P double as the wall-drumming doubles.</li>
              <li>Heat from 300 K to 600 K at fixed volume: the particles blush red and P doubles.</li>
              <li>Find settings where the gauge reads ≈ 101 kPa — that&rsquo;s the air around you.</li>
            </ul>
          </>
        ),
        Component: GasLab,
      },
      quiz: [
        {
          q: "What is gas pressure, microscopically?",
          choices: [
            "The weight of the gas",
            "The combined force of countless particle collisions with the walls",
            "Particles pushing each other",
            "Heat radiation",
          ],
          answer: 1,
          explain:
            "Each collision gives the wall a tiny impulse; 10²³ per second of them average into the steady push we call pressure.",
        },
        {
          q: "Why must T be in kelvin in PV = nRT?",
          choices: [
            "Kelvin numbers are bigger",
            "Celsius is only for liquids",
            "Kelvin starts at absolute zero, so it's proportional to actual particle motion",
            "Tradition from Lord Kelvin",
          ],
          answer: 2,
          explain:
            "Pressure is proportional to absolute molecular kinetic energy. Only a scale with zero at zero-motion makes 'double T → double P' true.",
        },
        {
          q: "You squeeze a syringe (sealed, constant temperature) to half its volume. The pressure…",
          choices: ["doubles", "halves", "stays the same", "drops to zero"],
          answer: 0,
          explain: "PV = const at fixed n and T (Boyle). Half the space → twice the collision rate → twice the pressure.",
        },
        {
          q: "Why do aerosol cans warn against fire?",
          choices: [
            "The paint burns",
            "Metal melts at low temperature",
            "The gas becomes toxic",
            "At constant volume, heating raises pressure until the can bursts",
          ],
          answer: 3,
          explain:
            "The can's volume is fixed, so P grows in lockstep with T (Gay-Lussac). Enough heat and the pressure exceeds what the seams can hold.",
        },
      ],
      problems: [
        {
          prompt: "What pressure (kPa) does 1 mol of gas exert in 10 L at 300 K? (R = 8.314)",
          answer: 249.4,
          unit: "kPa",
          hint: "P = nRT / V, with V in litres giving kPa directly.",
          explain: "P = 1 × 8.314 × 300 / 10 ≈ 249 kPa — two and a half atmospheres.",
        },
        {
          prompt: "A balloon holds 24 L at 300 K. You heat it to 350 K at constant pressure. New volume?",
          answer: 28,
          unit: "L",
          hint: "At constant P and n: V/T = const, so V₂ = V₁ × T₂/T₁.",
          explain: "24 × 350/300 = 28 L (Charles's law).",
        },
        {
          prompt: "Convert 25 °C to kelvin.",
          answer: 298.15,
          unit: "K",
          hint: "K = °C + 273.15.",
          explain: "25 + 273.15 = 298.15 K — 'room temperature' in gas-law problems.",
        },
        {
          prompt: "A sealed 2 L bottle at 100 kPa is squeezed to 0.8 L at constant temperature. New pressure?",
          answer: 250,
          unit: "kPa",
          hint: "Boyle: P₁V₁ = P₂V₂.",
          explain: "100 × 2 / 0.8 = 250 kPa.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "solutions",
      unitId: "u3",
      title: "Solutions & Concentration",
      subtitle:
        "Where does salt go when it dissolves — and how much can water hold? Enter saturation, solubility curves and molarity.",
      buildsOn: ["bond-spectrum", "mole"],
      Theory: () => (
        <>
          <h2>Dissolving is disassembly</h2>
          <p>
            Stir salt into water and it &ldquo;vanishes&rdquo; — but you know better by now.
            Water&rsquo;s polar molecules (Unit 1) pry Na⁺ and Cl⁻ ions off the lattice, surround
            each one in a jacket of oriented dipoles, and carry them away. The salt is still
            there, disassembled into invisible, hydrated ions. The water is the{" "}
            <strong>solvent</strong>, the salt the <strong>solute</strong>, and the mixture a{" "}
            <strong>solution</strong> — transparent because the dissolved pieces are smaller than
            wavelengths of light.
          </p>

          <h2>Saturation: the parking garage fills up</h2>
          <p>
            Water&rsquo;s capacity is finite. Keep adding salt and at some point the solution is{" "}
            <strong>saturated</strong> — every new crystal just sinks undissolved. The limit is
            the <strong>solubility</strong>, usually quoted in g per 100 mL, and for most solids
            it <strong>rises with temperature</strong> (hotter water = more energetic prying).
            Different substances have wildly different curves: NaCl&rsquo;s is almost flat
            (36 g cold, 39 g hot), while saltpetre&rsquo;s rockets from 13 g to over 240 g.
          </p>
          <p>
            Steep curves enable a beautiful trick: dissolve much solute hot, cool the solution,
            and the excess must exit — as <strong>crystals</strong>. That is how you&rsquo;ll
            grow salt crystals in the Unit 4 capstone, and how sugar becomes rock candy.
          </p>

          <h2>Molarity: the chemist&rsquo;s concentration</h2>
          <div className="formula">
            c = n / V
            <span className="note">concentration (mol/L) = moles of solute ÷ litres of solution — &ldquo;a 2-molar solution&rdquo; means c = 2 mol/L</span>
          </div>
          <p>
            Grams-per-litre depends on the substance; <strong>moles-per-litre</strong> speaks
            particle language. If a bottle says 0.1 M HCl, you know exactly how many reactive
            particles each millilitre delivers — which is what makes the titration in Unit 4
            an act of counting, not guessing.
          </p>

          <div className="callout note">
            <span className="co-title">Gases dissolve backwards</span>
            <p>
              Solids dissolve better hot; gases dissolve better <em>cold</em> (heat helps them
              escape). Warm cola goes flat fast, and warming oceans hold less CO₂ and less O₂ —
              one solubility curve with planetary consequences.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Saturation Point",
        intro: (
          <>
            <p>Add solute, heat the water, and watch the solubility curve decide what dissolves.</p>
            <ul>
              <li>Add 50 g of NaCl at 20 °C — a pile stays on the bottom. Now heat: does it help much?</li>
              <li>Switch to KNO₃: 50 g won&rsquo;t dissolve cold but vanishes completely at 45 °C.</li>
              <li>Dissolve 150 g of KNO₃ hot, then slide the temperature down — crystal rain.</li>
            </ul>
          </>
        ),
        Component: DissolveLab,
      },
      quiz: [
        {
          q: "What happens to salt when it dissolves in water?",
          choices: [
            "It melts",
            "It evaporates",
            "It reacts to form a new compound",
            "Its lattice is taken apart into ions, each surrounded by water dipoles",
          ],
          answer: 3,
          explain:
            "Dissolving is disassembly, not disappearance: polar water molecules pry Na⁺ and Cl⁻ from the lattice and escort them individually.",
        },
        {
          q: "A saturated solution is one where…",
          choices: [
            "all the water is used up",
            "the solvent holds the maximum solute at that temperature — extra just sits undissolved",
            "the solution is boiling",
            "the solute and solvent are equal in mass",
          ],
          answer: 1,
          explain:
            "Saturation is the capacity limit. It's temperature-dependent: heat usually raises it for solids, lowers it for gases.",
        },
        {
          q: "You dissolve lots of KNO₃ in hot water, then let it cool. What happens?",
          choices: [
            "Nothing — dissolving is permanent",
            "The water evaporates",
            "The excess crystallizes out as the solubility limit drops",
            "The solution gets hotter",
          ],
          answer: 2,
          explain:
            "Cooling slides you down the steep solubility curve; whatever exceeds the new limit must leave the solution as crystals. That's how rock candy is grown.",
        },
        {
          q: "What is the molarity of 0.5 mol of salt dissolved in 2 L of solution?",
          choices: ["0.25 mol/L", "1 mol/L", "0.5 mol/L", "4 mol/L"],
          answer: 0,
          explain: "c = n/V = 0.5 / 2 = 0.25 mol/L.",
        },
      ],
      problems: [
        {
          prompt: "You dissolve 58.44 g of NaCl (exactly 1 mol) in water to make 0.5 L of solution. What is the concentration?",
          answer: 2,
          unit: "mol/L",
          hint: "c = n / V.",
          explain: "1 mol / 0.5 L = 2 mol/L — a '2-molar' brine.",
        },
        {
          prompt: "How many moles of HCl are in 250 mL of a 0.1 mol/L solution?",
          answer: 0.025,
          unit: "mol",
          hint: "n = c × V; convert mL to L first.",
          explain: "0.1 × 0.25 = 0.025 mol.",
        },
        {
          prompt: "KNO₃ solubility is about 110 g/100 mL at 60 °C and 32 g/100 mL at 20 °C. You saturate 100 mL at 60 °C and cool to 20 °C. How many grams crystallize out?",
          answer: 78,
          unit: "g",
          hint: "The difference between the two limits must leave the solution.",
          explain: "110 − 32 = 78 g of crystals — the rock-candy principle.",
        },
      ],
    },
  ],
};
