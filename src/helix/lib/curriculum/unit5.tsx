import type { UnitModule } from "./types";
import { SelectionLab, PhylogenyLab } from "@/helix/components/labs/labs-unit5";

export const unit5: UnitModule = {
  unit: {
    id: "u5",
    num: 5,
    title: "Evolution",
    blurb:
      "Mutation makes variety, and the environment keeps score. One mechanism, and it explains why life looks designed without anyone designing it.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "natural-selection",
      unitId: "u5",
      title: "Natural Selection",
      subtitle:
        "Four observations, one inescapable conclusion — and no organism ever has to try to change.",
      buildsOn: ["mutations", "meiosis"],
      Theory: () => (
        <>
          <h2>The argument, in four steps</h2>
          <p>
            Darwin&rsquo;s mechanism is not complicated. It is a logical consequence of four things that
            are separately, obviously true:
          </p>
          <ol>
            <li>
              <strong>Variation.</strong> Individuals in a population differ — in size, colour,
              speed, resistance to disease. (Unit 2 explained where that comes from: mutation, plus
              meiotic shuffling.)
            </li>
            <li>
              <strong>Heritability.</strong> Much of that variation is passed to offspring. (Unit 4.)
            </li>
            <li>
              <strong>Overproduction.</strong> Every species produces far more offspring than can
              survive. A single cod lays millions of eggs; the population does not explode, so
              nearly all of them die.
            </li>
            <li>
              <strong>Differential survival.</strong> Which ones die is not entirely random. Traits
              that help in <em>this</em> environment make survival and reproduction more likely.
            </li>
          </ol>
          <p>
            Grant those four and the conclusion is forced: helpful variants become more common each
            generation, and over enough generations the population changes. That is{" "}
            <strong>natural selection</strong>. It requires no foresight, no goal, and no
            intervention — only the four facts above.
          </p>

          <h2>What selection is not</h2>
          <p>
            This is where intuition misleads almost everybody, so it is worth being blunt.
          </p>
          <p>
            <strong>Individuals do not evolve. Populations do.</strong> A pale beetle does not
            darken because the tree bark is dark. It gets eaten. The <em>population</em> shifts
            because the pale ones leave fewer offspring — every individual stays exactly the shade
            it was born.
          </p>
          <p>
            <strong>Organisms do not try.</strong> Giraffes did not develop long necks by stretching
            for leaves and passing the stretch on — that is Lamarck&rsquo;s version, and it is wrong.
            Giraffes varied in neck length; longer-necked ones ate better and left more offspring.
            The mutations came first, blindly, and the environment sorted them afterwards.
          </p>
          <p>
            <strong>&ldquo;Fitness&rdquo; is not strength.</strong> It means reproductive success in
            a particular environment, nothing more. A slow, weak, drab organism that leaves more
            surviving offspring is fitter than a fast, strong, spectacular one that leaves fewer.
          </p>
          <p>
            <strong>There is no direction and no progress.</strong> A trait that is advantageous now
            can be lethal when the environment changes. Cave fish lost their eyes; parasites lost
            entire organ systems. Selection has no memory and no plan.
          </p>

          <h2>Seeing it happen</h2>
          <p>
            Evolution is not confined to deep time. It is observable, and inconveniently so:
          </p>
          <ul>
            <li>
              <strong>Antibiotic resistance.</strong> A few bacteria in any large population happen
              to carry a resistance mutation. Antibiotics kill the rest, leaving the resistant ones
              to inherit the patient. This is why finishing a course matters, and why resistance is
              now a serious clinical problem.
            </li>
            <li>
              <strong>Peppered moths.</strong> As industrial soot darkened English tree bark, the
              dark form went from rare to dominant in decades; after the Clean Air Acts, the pale
              form returned. The moths never changed. The proportions did.
            </li>
            <li>
              <strong>Pesticide resistance</strong> in insects and <strong>herbicide resistance</strong>{" "}
              in weeds — the same process, repeated in agriculture every few years.
            </li>
          </ul>

          <div className="callout tip">
            <span className="co-title">Why the design intuition is so strong</span>
            <p>
              An eye looks designed because it is well matched to its job. But selection produces
              exactly that appearance without a designer, by keeping whatever worked slightly better
              than the alternative, for millions of generations. The tell is the imperfections:
              your retina is wired backwards, with the nerves in front of the light-sensing cells and
              a blind spot where they exit. No designer would do that. An accumulation of workable
              small changes would — and did.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Selection, Live",
        intro: (
          <>
            <p>Sixty beetles on a background. Press &ldquo;next generation&rdquo; and watch.</p>
            <ul>
              <li>The population shifts towards the background shade. No individual beetle ever changes colour.</li>
              <li>Drop the selection pressure to zero. The mean wanders aimlessly — that is drift, not selection.</li>
              <li>Let it adapt, then move the background sharply. Watch a well-adapted population become badly adapted overnight.</li>
            </ul>
          </>
        ),
        Component: SelectionLab,
      },
      quiz: [
        {
          q: "Which is NOT one of the four requirements for natural selection?",
          choices: [
            "Variation between individuals",
            "That variation being heritable",
            "Organisms striving to improve",
            "More offspring produced than can survive",
          ],
          answer: 2,
          explain:
            "Striving plays no part. Variation, heritability, overproduction and differential survival are sufficient on their own.",
        },
        {
          q: "A population of beetles becomes darker over 20 generations. What happened?",
          choices: [
            "Individual beetles darkened to match the bark",
            "Darker beetles survived and reproduced more, so their proportion rose",
            "The beetles chose darker mates for camouflage",
            "The bark changed the beetles' DNA",
          ],
          answer: 1,
          explain:
            "Individuals do not change. The population's composition shifts because some variants leave more offspring than others.",
        },
        {
          q: "In evolutionary terms, 'fitness' means…",
          choices: [
            "Physical strength",
            "Reproductive success in a particular environment",
            "Health and longevity",
            "Speed and agility",
          ],
          answer: 1,
          explain:
            "Only offspring count. A drab, slow organism that reproduces more is fitter than a spectacular one that reproduces less.",
        },
        {
          q: "Why does antibiotic resistance spread?",
          choices: [
            "Bacteria learn to resist the drug",
            "The antibiotic causes resistance mutations",
            "A few bacteria already carry resistance, and killing the rest leaves them to reproduce",
            "Bacteria share the drug between them",
          ],
          answer: 2,
          explain:
            "The variation exists beforehand. The antibiotic is the selective agent, not the cause of the mutation — a textbook case of selection in real time.",
        },
        {
          q: "Why is the backwards wiring of the vertebrate retina evidence for evolution?",
          choices: [
            "It shows the eye is badly made",
            "It is the kind of workable-but-imperfect outcome expected from accumulated small changes, not from design",
            "It proves eyes evolved twice",
            "It has no bearing on evolution",
          ],
          answer: 1,
          explain:
            "Selection cannot restart from scratch; it can only modify what is already there. Constraints like this are a signature of history rather than planning.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "evidence",
      unitId: "u5",
      title: "The Evidence: Reading the Family Tree",
      subtitle:
        "Fossils, anatomy and DNA are three independent records — and they agree, which is the part that matters.",
      buildsOn: ["natural-selection", "protein-synthesis"],
      Theory: () => (
        <>
          <h2>Three independent lines</h2>
          <p>
            Any single line of evidence can be argued about. The reason common descent is not
            seriously disputed in biology is that several completely independent methods produce the{" "}
            <em>same</em> tree — and they had every opportunity not to.
          </p>

          <h3>1. Fossils</h3>
          <p>
            The record is patchy — fossilisation is rare and needs particular conditions — but it is
            ordered. Nothing appears out of sequence: no rabbits in Precambrian rock, no flowering
            plants beneath the first land plants. And transitional forms keep turning up where the
            theory says to dig. <em>Tiktaalik</em> was found in 2004 after a deliberate search of
            375-million-year-old rock chosen because that was where a fish-to-tetrapod intermediate
            should be. It had gills and fins, and also a neck, a flat skull and wrist bones.
          </p>

          <h3>2. Anatomy</h3>
          <p>
            A human arm, a whale flipper, a bat wing and a horse leg do entirely different jobs, yet
            all contain the same bones in the same arrangement: one upper bone, two lower, a cluster
            of wrist bones, five digits. These are <strong>homologous structures</strong> — the same
            inherited plan, modified. There is no engineering reason a swimming limb and a flying
            limb should share a skeleton; there is an obvious historical one.
          </p>
          <p>
            <strong>Vestigial structures</strong> make the point sharper: leftovers with no current
            function. Whales and pythons carry reduced hip and leg bones. Flightless birds have
            wings. You have an appendix, a tailbone, and muscles for moving ears you cannot move.
          </p>

          <h3>3. Molecules</h3>
          <p>
            This is the strongest line, and the newest. Compare the same protein or gene across
            species and count the differences. The more differences, the longer since the lineages
            split — and the resulting tree matches the one built from fossils and anatomy, despite
            being derived from completely different data.
          </p>
          <p>
            Cytochrome c, a respiratory protein present in nearly everything, differs from the human
            version by 0% in chimpanzees, about 12% in horses, 21% in tuna and 45% in yeast. That
            ordering is exactly the fossil ordering. Nobody arranged it that way.
          </p>
          <div className="formula">
            more sequence difference ⇒ longer since the lineages diverged
            <span className="note">the molecular clock — the basis of the tree in this lesson&rsquo;s lab</span>
          </div>
          <p>
            And recall Unit 2: the genetic code itself is shared by essentially all life. An
            arbitrary lookup table, identical across bacteria and oak trees and you, is very hard to
            explain except as inheritance from a common ancestor that already used it.
          </p>

          <h2>Speciation: how one lineage becomes two</h2>
          <p>
            Species split when populations stop interbreeding. Most commonly a physical barrier — a
            river changing course, a rising mountain range, a few birds blown to an island — divides
            them. The isolated populations then accumulate different mutations and face different
            selection, and after enough divergence they can no longer produce fertile offspring even
            if reunited. They are now two species.
          </p>
          <p>
            Darwin&rsquo;s finches are the standard example: one founding population across the Galápagos,
            differing beak shapes suited to different food, and no interbreeding between them today.
          </p>

          <div className="callout note">
            <span className="co-title">The test that could have failed</span>
            <p>
              When protein sequencing arrived in the 1950s, it could have produced a tree
              contradicting a century of comparative anatomy. It did not. Every subsequent method —
              whole genomes, retroviral insertions, pseudogenes — could have broken the pattern, and
              instead reproduced it. A theory that survives that many independent chances to be
              wrong has earned its place.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Molecular Clock",
        intro: (
          <>
            <p>One protein, cytochrome c, compared across eight species.</p>
            <ul>
              <li>Pick the chimpanzee: zero differences from a human. Then pick yeast: 45%.</li>
              <li>Read the branch points. Sequence difference and divergence time rise together.</li>
              <li>This tree was built from molecules alone — and it matches the fossil one.</li>
            </ul>
          </>
        ),
        Component: PhylogenyLab,
      },
      quiz: [
        {
          q: "What makes a human arm and a bat wing homologous structures?",
          choices: [
            "They perform the same function",
            "They share the same underlying bone arrangement, inherited from a common ancestor",
            "They are the same size",
            "They evolved independently for flight",
          ],
          answer: 1,
          explain:
            "Same plan, different jobs. Shared structure despite different function points to inheritance, not to engineering necessity.",
        },
        {
          q: "What is a vestigial structure?",
          choices: [
            "A structure still under construction",
            "A reduced leftover with little or no current function, inherited from an ancestor that used it",
            "A structure found only in fossils",
            "A structure that appears in embryos only",
          ],
          answer: 1,
          explain:
            "Whale hip bones, flightless-bird wings and your tailbone. They make sense as history, not as design.",
        },
        {
          q: "Cytochrome c differs from the human version by 12% in horses and 45% in yeast. What does that indicate?",
          choices: [
            "Yeast is more primitive",
            "Human and yeast lineages diverged far longer ago than human and horse",
            "Yeast has a faster metabolism",
            "The protein does a different job in yeast",
          ],
          answer: 1,
          explain:
            "Differences accumulate with time since divergence. The molecular ordering reproduces the fossil and anatomical ordering.",
        },
        {
          q: "Why is agreement between fossil, anatomical and molecular evidence significant?",
          choices: [
            "It is not — they all come from the same theory",
            "They are independent methods that could easily have disagreed, and did not",
            "Molecular evidence is derived from fossils",
            "It shows fossils are unnecessary",
          ],
          answer: 1,
          explain:
            "Independent lines converging on one tree is the strongest kind of scientific support. Each was a genuine opportunity to falsify the theory.",
        },
        {
          q: "How does a single species typically split into two?",
          choices: [
            "One individual mutates into a new species",
            "Populations become isolated, diverge genetically, and eventually can no longer interbreed",
            "A species decides to specialise",
            "Two species merge and then separate",
          ],
          answer: 1,
          explain:
            "Isolation stops gene flow; separate mutation and selection then push the populations apart until reproductive compatibility is lost.",
        },
      ],
    },
  ],
};
