import type { UnitModule } from "./types";
import { StrawberryLab } from "@/helix/components/labs/labs-unit3";

export const unit3: UnitModule = {
  unit: {
    id: "u3",
    num: 3,
    title: "The Kitchen Capstone",
    blurb:
      "Three units of theory, cashed in: pull real DNA out of a strawberry with washing-up liquid, salt and cold spirit, and lift it out on a stick.",
  },
  lessons: [
    {
      slug: "strawberry-dna",
      unitId: "u3",
      title: "Capstone: Extract DNA from a Strawberry",
      subtitle:
        "Twenty minutes, four supermarket ingredients, and white strands of the molecule this whole course has been about — visible without a microscope.",
      buildsOn: ["membrane", "dna", "protein-synthesis"],
      Theory: () => (
        <>
          <h2>What you are about to do</h2>
          <p>
            Every step of this protocol is something you have already studied. You are going to
            break open cells, dissolve two lipid membranes, neutralise the charge on the DNA
            backbone, and then exploit the fact that DNA is soluble in water but not in alcohol.
            Nothing here is a trick; it is Units 0 to 2, applied with kitchen equipment.
          </p>
          <p>
            The result is genuinely visible. Not a stain, not a colour change — actual strands of
            DNA you can lift out on a cocktail stick.
          </p>

          <h2>What you need</h2>
          <ul>
            <li>2–3 <strong>strawberries</strong> (fresh or frozen and thawed)</li>
            <li>A <strong>zip-lock bag</strong></li>
            <li>1 tsp <strong>washing-up liquid</strong></li>
            <li>½ tsp <strong>table salt</strong></li>
            <li>100 ml <strong>water</strong></li>
            <li>A <strong>coffee filter</strong> or piece of muslin, and a clear glass</li>
            <li>
              50 ml <strong>surgical spirit or vodka</strong>, kept in the freezer for at least an
              hour — it must be properly cold
            </li>
            <li>A cocktail stick or thin glass rod</li>
          </ul>

          <h2>Why a strawberry</h2>
          <p>
            Because strawberries are <strong>octoploid</strong> — eight complete sets of
            chromosomes per cell, where you have two. Gram for gram there is far more DNA in a
            strawberry than in most tissue, and they mash easily. Bananas and kiwis also work; a
            strawberry works best.
          </p>

          <h2>Why each step works</h2>
          <p>
            <strong>Mashing</strong> breaks cell walls mechanically. <strong>Detergent</strong>{" "}
            dissolves the phospholipid bilayer of both the cell membrane and the nuclear membrane —
            the same chemistry that lifts grease off a plate, applied to the structure from Unit 0.2.{" "}
            <strong>Salt</strong> supplies Na⁺ ions that shield the negative charges along DNA&rsquo;s
            phosphate backbone, so the strands stop repelling one another and can clump together
            instead. <strong>Filtering</strong> removes debris.
          </p>
          <p>
            The final step is the one worth savouring. <strong>Cold alcohol</strong> is poured
            gently on top so it does <em>not</em> mix. DNA dissolves in water but not in alcohol, so
            at the boundary between the two layers it precipitates out — coming out of solution as
            white, stringy threads that gather at the interface within seconds. Cold matters
            because it slows the enzymes that would otherwise chop the DNA into invisible pieces.
          </p>

          <div className="callout warn">
            <span className="co-title">Sensible precautions</span>
            <p>
              Surgical spirit is flammable and not drinkable — keep it away from flames and label
              the glass. Do not eat anything from this experiment. Wash up properly afterwards.
              Nothing here is dangerous, but it stops being food the moment the detergent goes in.
            </p>
          </div>

          <h2>What you are looking at</h2>
          <p>
            The white mass on your stick is not one molecule — it is the tangled DNA of millions of
            cells, clumped together. A single DNA molecule is about 2 nm wide and completely
            invisible. What makes this collection visible is sheer number, the same way one strand
            of hair is thin but a ponytail is not.
          </p>
          <p>
            And it is the real thing: the same molecule, using the same four bases and the same
            genetic code, that you spent Unit 2 learning to read. A strawberry&rsquo;s genes and yours are
            written in the identical alphabet.
          </p>
        </>
      ),
      lab: {
        title: "Digital Twin: The Extraction",
        intro: (
          <>
            <p>Walk the protocol before you do it for real. Each step says what it is for.</p>
            <ul>
              <li>Step 2 is the membrane lesson: detergent takes a lipid bilayer apart.</li>
              <li>Step 5 is the whole trick — DNA is not soluble in alcohol, so it drops out at the boundary.</li>
              <li>Then go and do it. The digital version is a rehearsal, not a substitute.</li>
            </ul>
          </>
        ),
        Component: StrawberryLab,
      },
      checklist: [
        { id: "gather", text: "Gathered everything, and put the spirit in the freezer at least an hour ahead." },
        { id: "mash", text: "Mashed 2–3 strawberries in a sealed bag for a full minute — properly to slurry." },
        { id: "buffer", text: "Mixed 100 ml water + 1 tsp washing-up liquid + ½ tsp salt, and stirred it in gently (no foam)." },
        { id: "rest", text: "Left the mixture to stand for 5–10 minutes so the detergent can dissolve the membranes." },
        { id: "filter", text: "Filtered the mixture through a coffee filter or muslin into a clear glass." },
        { id: "alcohol", text: "Tilted the glass and poured ice-cold spirit gently down the side to form a separate layer." },
        { id: "watch", text: "Watched white strands appear at the boundary between the two layers." },
        { id: "spool", text: "Lifted the DNA out on a stick — and had a proper look at it." },
        { id: "why", text: "Can explain, without looking, what the detergent, the salt and the alcohol each did." },
      ],
    },
  ],
};
