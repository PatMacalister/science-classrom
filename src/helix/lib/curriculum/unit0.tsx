import type { UnitModule } from "./types";
import { CellLab, OsmosisLab, EnzymeLab } from "@/helix/components/labs/labs-unit0";

export const unit0: UnitModule = {
  unit: {
    id: "u0",
    num: 0,
    title: "The Cell",
    blurb:
      "Everything alive is made of cells, and every cell is a bag of water that controls what crosses its border and runs its chemistry with protein machines.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "cells",
      unitId: "u0",
      title: "What Is Alive, and What a Cell Is",
      subtitle:
        "Biology's one universal claim: every living thing is made of cells, and every cell comes from another cell.",
      Theory: () => (
        <>
          <h2>The awkward question first</h2>
          <p>
            Biology is the study of life, which would be tidier if anyone could define life. There
            is no single property that separates the living from the non-living — only a list of
            things living systems do, and every item on it has an exception. Fire consumes fuel and
            grows. Crystals self-assemble. A virus carries genes and evolves, but cannot do anything
            at all without a host cell to work in.
          </p>
          <p>The working list is still worth having. Living things generally:</p>
          <ul>
            <li>are made of <strong>cells</strong></li>
            <li>take in energy and use it to stay organised (<strong>metabolism</strong>)</li>
            <li>hold their internal conditions steady (<strong>homeostasis</strong>)</li>
            <li>respond to their surroundings</li>
            <li>grow and reproduce, passing on <strong>heritable information</strong></li>
            <li>change over generations (<strong>evolution</strong>)</li>
          </ul>
          <p>
            The last two carry the most weight. A candle flame does the first four in a loose sense;
            what it cannot do is copy itself with heritable variation. That is the property this
            whole course circles back to.
          </p>

          <h2>Cell theory</h2>
          <p>
            The one genuinely universal statement in biology is the <strong>cell theory</strong>,
            assembled in the 1830s–50s:
          </p>
          <ol>
            <li>Every living thing is made of one or more cells.</li>
            <li>The cell is the smallest unit that is itself alive.</li>
            <li>
              Every cell comes from a pre-existing cell — <em>omnis cellula e cellula</em>.
            </li>
          </ol>
          <p>
            The third point is the sharpest. It killed spontaneous generation: maggots do not
            condense out of meat, and broth does not brew its own bacteria — Pasteur showed that a
            flask sealed against airborne cells stays sterile indefinitely. Every cell alive today
            is the end of an unbroken chain of divisions stretching back billions of years. Nothing
            in that lineage has ever once been non-living.
          </p>

          <h2>Two kinds of cell</h2>
          <p>
            The deepest division in life is not plant versus animal — it is whether a cell keeps its
            DNA in a separate compartment.
          </p>
          <p>
            <strong>Prokaryotes</strong> (bacteria and archaea) do not. Their DNA sits loose in the
            cytoplasm as a single circular loop. They are small, typically 1–5 µm, and have no
            membrane-bound organelles at all. They are also, by count, most of life on Earth.
          </p>
          <p>
            <strong>Eukaryotes</strong> (everything else — animals, plants, fungi, protists) keep
            their DNA inside a <strong>nucleus</strong>, and run their chemistry in specialised
            compartments called <strong>organelles</strong>. They are 10–100× larger in diameter,
            which is the whole point: compartments let a cell run incompatible reactions at once.
          </p>

          <h2>The organelles worth knowing now</h2>
          <ul>
            <li>
              <strong>Cell membrane</strong> — the border, present in every cell. Next lesson.
            </li>
            <li>
              <strong>Nucleus</strong> — the DNA archive. Copies leave; the original never does.
            </li>
            <li>
              <strong>Ribosomes</strong> — protein factories. Universal, in every cell of every
              organism, which is a strong hint about how old they are.
            </li>
            <li>
              <strong>Mitochondria</strong> — burn glucose with oxygen to make ATP.
            </li>
            <li>
              <strong>Chloroplasts</strong> — capture light to build sugar. Plants only.
            </li>
            <li>
              <strong>Cell wall</strong> and a large <strong>vacuole</strong> — plants (and, with a
              different chemistry, bacteria and fungi). The wall stops the cell bursting.
            </li>
          </ul>

          <div className="callout note">
            <span className="co-title">Mitochondria used to be bacteria</span>
            <p>
              Mitochondria and chloroplasts have their own circular DNA, their own ribosomes, and a
              double membrane, and they divide on their own schedule. The reason is that they{" "}
              <em>were</em> free-living bacteria, swallowed and kept rather than digested —
              endosymbiosis. Your cells are a merger, and the mitochondrial DNA you carry came only
              from your mother.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Cell Explorer",
        intro: (
          <>
            <p>Three cell types, cut open. Click any part to find out what it does.</p>
            <ul>
              <li>Start with the animal cell and find the nucleus, then switch to bacterial — the nucleus is simply gone.</li>
              <li>Only the plant cell has both a wall and a chloroplast. Both explain something you can see from outside.</li>
              <li>Ribosomes are in all three. That is a clue about what came first.</li>
            </ul>
          </>
        ),
        Component: CellLab,
      },
      quiz: [
        {
          q: "What is the sharpest claim of cell theory?",
          choices: [
            "Cells are made of molecules",
            "Every cell arises from a pre-existing cell",
            "All cells have a nucleus",
            "Cells are visible under any microscope",
          ],
          answer: 1,
          explain:
            "It rules out spontaneous generation. Every cell alive today is the end of an unbroken chain of divisions — no link in it was ever non-living.",
        },
        {
          q: "What actually separates a prokaryote from a eukaryote?",
          choices: [
            "Size alone",
            "Prokaryotes have no membrane-bound nucleus; their DNA sits loose in the cytoplasm",
            "Prokaryotes have no DNA",
            "Eukaryotes have no ribosomes",
          ],
          answer: 1,
          explain:
            "The defining difference is compartmentalisation. Prokaryotes keep a single circular chromosome free in the cytoplasm and have no membrane-bound organelles.",
        },
        {
          q: "Which structure is found in animal, plant AND bacterial cells?",
          choices: ["Nucleus", "Chloroplast", "Ribosome", "Cell wall"],
          answer: 2,
          explain:
            "Ribosomes are universal — every organism builds proteins the same way. That universality is evidence of common ancestry.",
        },
        {
          q: "Why do mitochondria have their own DNA and a double membrane?",
          choices: [
            "To store spare genes",
            "Because they descend from free-living bacteria that were engulfed and kept",
            "Because they are the oldest part of the nucleus",
            "It is a random quirk with no explanation",
          ],
          answer: 1,
          explain:
            "Endosymbiosis. They retain circular DNA and their own ribosomes because they were once independent organisms — and in humans they are inherited only from the mother.",
        },
        {
          q: "A virus carries genes and evolves. Why is it usually not counted as alive?",
          choices: [
            "It has no DNA or RNA",
            "It is too small to see",
            "It has no cell and cannot metabolise or reproduce without hijacking a host cell",
            "It does not change over generations",
          ],
          answer: 2,
          explain:
            "It fails the cell criterion and has no metabolism of its own. Viruses sit awkwardly on the boundary — which is exactly why the boundary is hard to draw.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "membrane",
      unitId: "u0",
      title: "The Membrane & Getting Things Across",
      subtitle:
        "A cell is defined by its border. Two layers of fat decide what enters, what leaves, and what it costs.",
      buildsOn: ["cells"],
      seeAlso: [
        {
          course: "catalyst",
          slug: "intermolecular",
          label: {
            en: "⚗️ Catalyst 1.5 — why the fatty tails avoid water in the first place",
            de: "⚗️ Catalyst 1.5 — warum die Fettschwänze das Wasser überhaupt meiden",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>A wall that builds itself</h2>
          <p>
            The cell membrane is made of <strong>phospholipids</strong>: molecules with a
            water-loving phosphate head and two water-hating fatty tails. Drop them in water and
            they arrange themselves — heads out towards the water on both sides, tails hidden in the
            middle. The result is a <strong>bilayer</strong> two molecules thick, and nobody has to
            assemble it. It forms because any other arrangement exposes the tails to water.
          </p>
          <p>
            That is the same &ldquo;like dissolves like&rdquo; logic Catalyst covers under
            intermolecular forces, applied to the single most consequential structure in biology.
            The membrane is not a rigid skin either: the lipids drift sideways past each other like
            people in a crowd, with proteins floating among them. Hence the name for the standard
            picture — the <strong>fluid mosaic model</strong>.
          </p>

          <h2>What gets through, and what does not</h2>
          <p>
            The oily middle is the filter. Small and nonpolar passes easily; large or charged does
            not:
          </p>
          <table>
            <thead>
              <tr>
                <th>Crosses freely</th>
                <th>Needs help</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>O₂, CO₂, N₂ (small, nonpolar)</td>
                <td>Glucose and amino acids (large, polar)</td>
              </tr>
              <tr>
                <td>Water — slowly, and fast through aquaporins</td>
                <td>Na⁺, K⁺, Cl⁻ (charged — the tails repel them)</td>
              </tr>
            </tbody>
          </table>
          <p>
            The membrane is therefore <strong>selectively permeable</strong>, and the things it
            blocks are exactly the things the cell wants to control.
          </p>

          <h2>Three ways across</h2>
          <p>
            <strong>Diffusion</strong> — molecules move randomly, so they spread from where they are
            crowded to where they are not. No energy is spent: the cell is simply exploiting the
            fact that random motion evens things out. This is how oxygen enters and CO₂ leaves.
          </p>
          <p>
            <strong>Facilitated diffusion</strong> — still down the gradient, still free, but
            through a protein channel because the molecule cannot cross the oil. Glucose enters
            your cells this way.
          </p>
          <p>
            <strong>Active transport</strong> — <em>up</em> the gradient, from low to high, which
            never happens by itself and therefore costs ATP. The sodium–potassium pump throws 3 Na⁺
            out and hauls 2 K⁺ in per ATP, all day, in every one of your cells. It is thought to
            consume something like a fifth of your resting energy, and it is the reason your nerves
            can fire at all.
          </p>

          <h2>Osmosis, and why it matters at dinner</h2>
          <p>
            <strong>Osmosis</strong> is just diffusion of water across a selectively permeable
            membrane — but stated in terms of the solute, because that is what you can control:
            water moves towards the side with <em>more dissolved stuff</em>.
          </p>
          <div className="formula">
            water moves from dilute → concentrated
            <span className="note">
              hypotonic = outside more dilute · isotonic = equal · hypertonic = outside more concentrated
            </span>
          </div>
          <p>
            Put an animal cell in pure water and water floods in until the membrane fails —{" "}
            <strong>lysis</strong>. Put it in strong brine and it shrivels. Your blood is kept
            isotonic for exactly this reason, and a saline drip is mixed to match rather than to be
            pure.
          </p>
          <p>
            A plant cell has a wall, so it cannot burst: it swells until the wall pushes back, and
            that pressure — <strong>turgor</strong> — is what holds a non-woody plant upright. Let
            it dry and the plant wilts. Salt a slug, salt a slice of aubergine, or watch lettuce go
            limp in dressing: same physics every time.
          </p>
        </>
      ),
      lab: {
        title: "The Osmosis Bench",
        intro: (
          <>
            <p>One cell, one dial: how salty the outside is.</p>
            <ul>
              <li>Drag the concentration to zero — pure water. The animal cell bursts; switch to a plant cell and the wall saves it.</li>
              <li>Find the isotonic point, where the arrows balance and nothing moves on net.</li>
              <li>Push it to 0.9 M and watch the plant cell plasmolyse — the membrane peels off the wall.</li>
            </ul>
          </>
        ),
        Component: OsmosisLab,
      },
      quiz: [
        {
          q: "Why does a phospholipid bilayer form on its own in water?",
          choices: [
            "Proteins assemble it",
            "The water-hating tails are pushed together, leaving the heads facing the water",
            "It is held together by covalent bonds between layers",
            "Electrical attraction between the two sheets",
          ],
          answer: 1,
          explain:
            "It is the hydrophobic effect: any arrangement that exposes the fatty tails to water is higher energy, so the bilayer forms spontaneously.",
        },
        {
          q: "Which molecule crosses the membrane WITHOUT help?",
          choices: ["Glucose", "Na⁺", "Oxygen", "A protein"],
          answer: 2,
          explain:
            "Oxygen is small and nonpolar, so it slips through the oily core. Glucose is too polar, and ions are repelled outright — both need proteins.",
        },
        {
          q: "What makes active transport different from diffusion?",
          choices: [
            "It moves substances up their concentration gradient and costs ATP",
            "It is faster",
            "It only works for water",
            "It does not need proteins",
          ],
          answer: 0,
          explain:
            "Diffusion runs down a gradient for free. Going the other way is not spontaneous, so it must be paid for — the Na⁺/K⁺ pump is the classic example.",
        },
        {
          q: "A red blood cell is placed in pure water. What happens and why?",
          choices: [
            "It shrivels — water leaves",
            "It swells and may burst — water enters, towards the higher solute concentration inside",
            "Nothing — cells are sealed",
            "It divides",
          ],
          answer: 1,
          explain:
            "Pure water is hypotonic to the cell's contents, so water moves in. With no cell wall, the membrane eventually fails: lysis.",
        },
        {
          q: "Why does a wilting plant recover when watered, and what is the pressure called?",
          choices: [
            "Osmosis refills the vacuoles and the cells press on their walls — turgor",
            "The wall regrows",
            "Water makes the cell wall rigid by freezing",
            "Active transport pumps in air",
          ],
          answer: 0,
          explain:
            "Water enters by osmosis, the vacuole fills, and the cell pushes outwards against its wall. That turgor pressure is what holds a non-woody plant up.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "enzymes",
      unitId: "u0",
      title: "Enzymes: Why Biology Happens at All",
      subtitle:
        "Most of life's reactions are far too slow at body temperature. Enzymes lower the hill — and their shape is the whole trick.",
      buildsOn: ["cells"],
      seeAlso: [
        {
          course: "catalyst",
          slug: "rates",
          label: {
            en: "⚗️ Catalyst 5.2 — activation energy and what a catalyst does to it",
            de: "⚗️ Catalyst 5.2 — Aktivierungsenergie und was ein Katalysator mit ihr macht",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>The problem: everything is too slow</h2>
          <p>
            The reactions that keep you alive are thermodynamically fine — they release energy and
            would happen on their own. The trouble is <em>when</em>. Left to itself, the sugar in
            your blood would take years to react with oxygen at 37 °C, because the molecules must
            first be jostled over an energy barrier: the <strong>activation energy</strong>.
          </p>
          <p>
            Chemistry&rsquo;s usual answer is heat, which makes collisions harder and more frequent. That
            is not available to you: raise your body temperature by fifteen degrees and you die
            long before the reaction speeds up usefully. Biology&rsquo;s answer is a{" "}
            <strong>catalyst</strong> — something that lowers the barrier instead of raising the
            energy. Biological catalysts are called <strong>enzymes</strong>, and they are almost
            all proteins.
          </p>
          <div className="formula">
            enzyme + substrate → enzyme–substrate complex → enzyme + product
            <span className="note">the enzyme is unchanged at the end and immediately does it again</span>
          </div>
          <p>
            The numbers are startling. Catalase, which breaks down the hydrogen peroxide your cells
            produce as waste, handles millions of molecules per second per enzyme. Drop liver on
            supermarket peroxide and it foams like a shaken bottle — that is one enzyme, working at
            full speed.
          </p>

          <h2>Shape is function</h2>
          <p>
            An enzyme is a protein folded into a specific three-dimensional shape, and somewhere on
            it is a pocket called the <strong>active site</strong> whose contours match one
            particular substrate. That match is why enzymes are <strong>specific</strong>: lactase
            digests lactose and nothing else, which is why the enzyme in a lactose-intolerance
            tablet does not also digest your dinner.
          </p>
          <p>
            The old picture was a rigid lock and key. The better one is{" "}
            <strong>induced fit</strong>: the site is flexible and closes around the substrate as it
            arrives, straining the bonds that need to break. The enzyme is not a passive hole — it
            actively distorts its target.
          </p>

          <h2>What changes the rate</h2>
          <p>
            <strong>Substrate concentration.</strong> More substrate means more collisions with
            active sites, so the rate climbs — but only until every enzyme is permanently busy.
            After that, adding substrate does nothing: the enzyme is <strong>saturated</strong> and
            the rate has hit its ceiling. (Exactly the limiting-reagent logic from Catalyst, with
            the enzyme as the limit.)
          </p>
          <p>
            <strong>Temperature.</strong> Warmer means faster — up to an optimum, around 37 °C in
            humans. Past it the rate does not merely level off, it <em>collapses</em>. The heat
            shakes the protein apart: the fold unravels, the active site loses its shape, and since
            the shape was the function, the enzyme is finished. This is{" "}
            <strong>denaturation</strong>, and it is usually irreversible — which is what you are
            watching when egg white turns from clear to solid white and never turns back.
          </p>
          <p>
            <strong>pH.</strong> Same story, different cause: extremes of pH alter the charges on
            the amino acids holding the fold together. Most human enzymes prefer pH ≈ 7, but pepsin
            in your stomach is built for pH 2 and stops working when it reaches the intestine.
          </p>
          <div className="callout warn">
            <span className="co-title">&ldquo;Denatured&rdquo; does not mean &ldquo;destroyed&rdquo;</span>
            <p>
              A denatured protein has lost its <em>shape</em>, not its amino acid sequence — the
              chain is intact, just no longer folded correctly. That distinction matters in the next
              unit: the sequence is what DNA specifies, and the fold follows from the sequence. Cook
              the egg and you have not edited the gene.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Enzyme Bench",
        intro: (
          <>
            <p>Three dials, one enzyme. The curve on the right is rate against substrate.</p>
            <ul>
              <li>Raise the substrate with everything else optimal. The curve flattens — that is saturation, not a bug.</li>
              <li>Push the temperature past 55 °C and watch the fold come apart. Cooling it back down does not help.</li>
              <li>Move the pH away from 7 in either direction. Both extremes cost you the same way.</li>
            </ul>
          </>
        ),
        Component: EnzymeLab,
      },
      problems: [
        {
          prompt:
            "An enzyme converts 6.0 × 10⁵ substrate molecules per second. How many does one enzyme convert in one minute?",
          answer: 3.6e7,
          unit: "molecules",
          tolerancePct: 2,
          hint: "Multiply by 60.",
          explain: "6.0 × 10⁵ × 60 = 3.6 × 10⁷ molecules per minute — from a single enzyme.",
        },
        {
          prompt:
            "A reaction takes 2.0 years without an enzyme and 0.20 seconds with one. By what factor does the enzyme speed it up? (1 year = 3.15 × 10⁷ s)",
          answer: 3.15e8,
          unit: "times",
          tolerancePct: 5,
          hint: "Convert 2 years to seconds, then divide by 0.20 s.",
          explain: "2 × 3.15 × 10⁷ = 6.3 × 10⁷ s; divided by 0.20 s gives about 3.2 × 10⁸ times faster.",
        },
      ],
      quiz: [
        {
          q: "What does an enzyme actually do to a reaction?",
          choices: [
            "It supplies the energy the reaction needs",
            "It lowers the activation energy, so the reaction happens far faster at body temperature",
            "It makes an impossible reaction possible",
            "It raises the temperature locally",
          ],
          answer: 1,
          explain:
            "Enzymes are catalysts: they lower the barrier, not the energy difference. A reaction that would not happen at all still will not — it just gets there much sooner if it would.",
        },
        {
          q: "Why is each enzyme specific to one substrate?",
          choices: [
            "Each enzyme is a different size",
            "Its active site has a shape that fits only that substrate",
            "Enzymes carry an identifying label",
            "They are not — enzymes work on anything",
          ],
          answer: 1,
          explain:
            "The active site's three-dimensional contours match one substrate, closing around it on arrival (induced fit). Shape is the specificity.",
        },
        {
          q: "Substrate is added until the rate stops rising. Why does it stop?",
          choices: [
            "The substrate has been used up",
            "Every active site is occupied — the enzymes are saturated",
            "The enzyme denatures",
            "The pH changes",
          ],
          answer: 1,
          explain:
            "At saturation the enzyme, not the substrate, is the limiting factor. Adding more substrate cannot help until you add more enzyme.",
        },
        {
          q: "Above its optimum temperature, an enzyme's rate collapses rather than levelling off. Why?",
          choices: [
            "The substrate evaporates",
            "The protein unfolds, so the active site loses the shape that made it work",
            "The enzyme is used up faster",
            "Heat reverses the reaction",
          ],
          answer: 1,
          explain:
            "Denaturation. The fold — held by relatively weak interactions — comes apart, and since shape is function, the enzyme stops. It usually does not recover on cooling.",
        },
        {
          q: "Pepsin works in the stomach at pH 2 but stops in the small intestine. Why?",
          choices: [
            "It runs out of substrate",
            "Its optimum pH is around 2, and the intestine's near-neutral pH disrupts the fold",
            "It is digested by acid",
            "The intestine is colder",
          ],
          answer: 1,
          explain:
            "Every enzyme has a pH optimum. pH changes the charges holding the fold together, so moving far from the optimum costs the enzyme its shape and its activity.",
        },
      ],
    },
  ],
};
