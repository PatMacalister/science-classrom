import type { UnitModule } from "./types";
import {
  BasePairLab,
  ReplicationLab,
  TranslationLab,
  MutationLab,
} from "@/helix/components/labs/labs-unit2";

export const unit2: UnitModule = {
  unit: {
    id: "u2",
    num: 2,
    title: "DNA & Proteins",
    blurb:
      "The molecule that stores the instructions, the machinery that copies it, and the code that turns four letters into every protein you are made of.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "dna",
      unitId: "u2",
      title: "DNA: Four Letters, One Molecule",
      subtitle:
        "A ladder whose rungs can only pair one way — which is what makes it both an archive and a template.",
      buildsOn: ["cells"],
      seeAlso: [
        {
          course: "catalyst",
          slug: "intermolecular",
          label: {
            en: "⚗️ Catalyst 1.5 — the hydrogen bonds that hold the rungs together",
            de: "⚗️ Catalyst 1.5 — die Wasserstoffbrücken, die die Sprossen halten",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>An alphabet of four</h2>
          <p>
            DNA — deoxyribonucleic acid — is a chain built from four units called{" "}
            <strong>nucleotides</strong>. Each has three parts: a sugar (deoxyribose), a phosphate
            group, and one of four <strong>bases</strong>:
          </p>
          <ul>
            <li><strong>A</strong> — adenine</li>
            <li><strong>T</strong> — thymine</li>
            <li><strong>C</strong> — cytosine</li>
            <li><strong>G</strong> — guanine</li>
          </ul>
          <p>
            The sugars and phosphates link into a backbone; the bases stick out sideways. That is
            the whole molecule: a monotonous rail with a sequence of four symbols attached to it.
            The information is entirely in the <em>order</em> of the bases, exactly as the
            information in this sentence is in the order of its letters and not in the ink.
          </p>

          <h2>The pairing rule</h2>
          <p>
            DNA is two such chains wound around each other — the <strong>double helix</strong>,
            worked out by Watson and Crick in 1953 using Rosalind Franklin&rsquo;s X-ray
            diffraction images. The two strands are held together by hydrogen bonds between the
            bases, and here is the rule everything else depends on:
          </p>
          <div className="formula">
            A pairs only with T &nbsp;·&nbsp; C pairs only with G
            <span className="note">A–T with two hydrogen bonds, C–G with three</span>
          </div>
          <p>
            It is not arbitrary. A and G are large two-ring bases; T and C are small single-ring
            ones. A large must pair with a small or the ladder would bulge and pinch, and only these
            combinations put hydrogen-bond donors opposite acceptors. Chemistry allows exactly two
            pairings, and biology has used both ever since.
          </p>
          <p>
            Two consequences follow immediately. First, the strands are{" "}
            <strong>complementary</strong>: given one, you can write the other with no extra
            information. That is what makes copying possible, and it is the subject of the next
            lesson. Second, C–G pairs have three hydrogen bonds to A–T&rsquo;s two, so{" "}
            <strong>GC-rich DNA is harder to pull apart</strong> — which is why organisms living in
            hot springs tend to have GC-rich genomes.
          </p>

          <h2>Antiparallel, and why it matters later</h2>
          <p>
            The two strands run in opposite directions. Each has a 5′ end and a 3′ end (named for
            carbon positions on the sugar), and where one strand runs 5′→3′ the other runs 3′→5′.
            This sounds like bookkeeping until the next lesson, where it forces DNA replication into
            a distinctly awkward compromise.
          </p>

          <h2>Genes, chromosomes, genome</h2>
          <p>
            A <strong>gene</strong> is a stretch of DNA that specifies one product — usually one
            protein. A <strong>chromosome</strong> is one very long DNA molecule wound around
            packing proteins; you have 46, in 23 pairs. Your <strong>genome</strong> — the whole
            set — is about 3 billion base pairs, of which only around 1–2% actually codes for
            proteins. Much of the rest regulates <em>when</em> and <em>where</em> those genes are
            switched on, which turns out to matter enormously.
          </p>
          <div className="callout note">
            <span className="co-title">The scale is hard to believe</span>
            <p>
              Stretched out, the DNA in a single one of your cells is about two metres long, packed
              into a nucleus roughly 6 µm across. End to end, the DNA in your whole body would reach
              the Sun and back many times over. And it is copied, at speed, every time a cell
              divides.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Base-Pairing Bench",
        intro: (
          <>
            <p>Type a strand and its partner writes itself. Count the rungs.</p>
            <ul>
              <li>Note the bond count: A–T gets two rungs, C–G gets three.</li>
              <li>Try the all-GC preset, then the all-AT one, and compare the total hydrogen bonds.</li>
              <li>The strands are labelled 5′→3′ and 3′←5′. They run in opposite directions — that becomes a problem next lesson.</li>
            </ul>
          </>
        ),
        Component: BasePairLab,
      },
      quiz: [
        {
          q: "In DNA, which pairings occur?",
          choices: ["A–C and G–T", "A–T and C–G", "A–G and C–T", "Any base with any base"],
          answer: 1,
          explain:
            "A pairs with T (two hydrogen bonds), C pairs with G (three). Size and bonding pattern permit nothing else.",
        },
        {
          q: "Where is the information in DNA actually stored?",
          choices: [
            "In the sugar-phosphate backbone",
            "In the length of the molecule",
            "In the number of strands",
            "In the sequence of bases",
          ],
          answer: 3,
          explain:
            "The backbone is identical all the way along. Only the order of A, T, C and G varies, and that order is the message.",
        },
        {
          q: "Why is GC-rich DNA harder to separate into single strands?",
          choices: [
            "C–G pairs have three hydrogen bonds, A–T pairs only two",
            "G and C are heavier",
            "GC-rich DNA is more tightly coiled",
            "It has a different backbone",
          ],
          answer: 0,
          explain:
            "More hydrogen bonds per rung means more energy to break. Organisms in hot environments tend to have GC-rich genomes for this reason.",
        },
        {
          q: "One strand reads 5′-ATCG-3′. What is the complementary strand?",
          choices: ["5′-TAGC-3′", "3′-TAGC-5′", "3′-ATCG-5′", "5′-GCTA-3′"],
          answer: 1,
          explain:
            "Pair each base (A–T, T–A, C–G, G–C) to get TAGC, and remember the strands are antiparallel — so it runs 3′→5′ alongside.",
        },
        {
          q: "What does 'complementary strands' make possible?",
          choices: [
            "Faster mutation",
            "The molecule can store more information",
            "Either strand can act as a template to rebuild the other exactly",
            "The strands can swap places",
          ],
          answer: 2,
          explain:
            "Because the pairing rule is strict, one strand fully determines the other. Copying is therefore just a matter of unzipping and filling in.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "replication",
      unitId: "u2",
      title: "Replication: Copying Three Billion Letters",
      subtitle:
        "Unzip the ladder, and each half specifies its own replacement. The proofreading is what makes it astonishing.",
      buildsOn: ["dna"],
      Theory: () => (
        <>
          <h2>The mechanism is in the structure</h2>
          <p>
            Watson and Crick&rsquo;s paper ends with one of the most restrained sentences in
            science: they had not failed to notice that the pairing they proposed immediately
            suggests a copying mechanism. It does. Unzip the two strands, and each one carries the
            full instructions for rebuilding its partner.
          </p>
          <p>The process, in order:</p>
          <ol>
            <li>
              <strong>Helicase</strong> unwinds the helix and breaks the hydrogen bonds, opening a
              Y-shaped <strong>replication fork</strong>.
            </li>
            <li>
              <strong>DNA polymerase</strong> runs along each exposed strand, matching free
              nucleotides to the template — A opposite T, C opposite G.
            </li>
            <li>
              The result is two double helices, each made of one old strand and one new one. That
              is why replication is called <strong>semi-conservative</strong>.
            </li>
          </ol>

          <h2>The awkward compromise</h2>
          <p>
            Here is where being antiparallel bites. DNA polymerase can only build in one direction:
            5′→3′. At a fork, one template runs the convenient way, so its new strand is built
            smoothly and continuously — the <strong>leading strand</strong>.
          </p>
          <p>
            The other template runs the wrong way. Polymerase cannot reverse, so it does something
            distinctly inelegant: it waits for a stretch to open, builds a short fragment{" "}
            <em>backwards</em> relative to the fork, jumps ahead, and does it again. Those pieces
            (Okazaki fragments) are then stitched together by <strong>ligase</strong>. This is the{" "}
            <strong>lagging strand</strong>, and it is a genuine kludge — the sort of thing that
            makes far more sense as the outcome of evolution than of design.
          </p>

          <h2>How accurate is it?</h2>
          <p>
            DNA polymerase makes roughly one mistake per 100,000 bases — which sounds fine until you
            remember the genome is 3 billion bases, giving about 30,000 errors per copy. So the
            enzyme <strong>proofreads</strong>: it checks each base it has just added and excises
            wrong ones. A separate mismatch-repair system sweeps through afterwards for anything
            missed.
          </p>
          <div className="formula">
            ≈ 1 error per 10⁹ base pairs, after proofreading and repair
            <span className="note">roughly one uncorrected mistake per cell division, in the whole genome</span>
          </div>
          <p>
            That is an error rate of about one in a billion — comparable to copying every book in a
            large library by hand and making a single typo. And the residual errors are not purely a
            defect: they are <strong>mutations</strong>, and without them there would be no
            variation for evolution to act on. Copy too sloppily and the organism fails; copy
            perfectly and the lineage cannot adapt.
          </p>

          <div className="callout tip">
            <span className="co-title">Meselson and Stahl settled it</span>
            <p>
              Three models were on the table: conservative (old helix intact, new one built fresh),
              semi-conservative, and dispersive (fragments mixed). In 1958 Meselson and Stahl grew
              bacteria on heavy nitrogen, switched them to light nitrogen and spun the DNA in a
              density gradient. After one round every molecule was intermediate in density — killing
              the conservative model. After two rounds there were two bands, half intermediate and
              half light — killing the dispersive one. It is often called the most beautiful
              experiment in biology, and it fits on one page.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Replication Fork",
        intro: (
          <>
            <p>Drag the fork open and watch both new strands appear.</p>
            <ul>
              <li>The top strand is built continuously; the bottom one comes in fragments. That is the antiparallel problem made visible.</li>
              <li>Hide the lagging strand to see how tidy replication <em>would</em> be if polymerase could work in both directions.</li>
              <li>Every finished helix is one old strand plus one new — semi-conservative.</li>
            </ul>
          </>
        ),
        Component: ReplicationLab,
      },
      problems: [
        {
          prompt:
            "The human genome is 3.0 × 10⁹ base pairs. At an uncorrected error rate of 1 in 10⁵, how many errors would one copy contain without proofreading?",
          answer: 30000,
          unit: "errors",
          tolerancePct: 2,
          hint: "Divide the genome size by 10⁵.",
          explain: "3.0 × 10⁹ ÷ 10⁵ = 3.0 × 10⁴ = 30,000 errors per copy.",
        },
        {
          prompt:
            "With proofreading and repair the rate falls to about 1 in 10⁹. How many errors remain in one copy of a 3.0 × 10⁹ bp genome?",
          answer: 3,
          unit: "errors",
          tolerancePct: 5,
          hint: "3.0 × 10⁹ ÷ 10⁹.",
          explain: "About 3 uncorrected errors per genome copy — a ten-thousand-fold improvement.",
        },
      ],
      quiz: [
        {
          q: "Why is DNA replication called semi-conservative?",
          choices: [
            "Half the DNA is discarded",
            "Each new double helix keeps one original strand and one newly built strand",
            "Only half the genome is copied",
            "It conserves energy",
          ],
          answer: 1,
          explain:
            "Meselson and Stahl demonstrated exactly this: after one round every molecule was half old and half new.",
        },
        {
          q: "Why is one new strand built in fragments rather than continuously?",
          choices: [
            "The enzyme gets tired",
            "To introduce mutations deliberately",
            "To save energy",
            "DNA polymerase can only build 5′→3′, and the two templates are antiparallel",
          ],
          answer: 3,
          explain:
            "One template happens to run the right way for continuous synthesis; the other does not, so it is copied in short backwards pieces that ligase joins up.",
        },
        {
          q: "What does DNA polymerase's proofreading do?",
          choices: [
            "Speeds up replication",
            "Checks each newly added base and removes wrong ones, cutting the error rate enormously",
            "Unwinds the helix",
            "Joins Okazaki fragments",
          ],
          answer: 1,
          explain:
            "It takes the raw rate of about 1 in 10⁵ down towards 1 in 10⁹ once mismatch repair has also run.",
        },
        {
          q: "Which enzyme opens the double helix at the start?",
          choices: ["Ligase", "Polymerase", "Helicase", "Protease"],
          answer: 2,
          explain:
            "Helicase breaks the hydrogen bonds between base pairs and unwinds the strands, creating the replication fork.",
        },
        {
          q: "Why is a perfect, error-free copying system NOT what evolution has produced?",
          choices: [
            "Perfect copying is chemically impossible",
            "Residual errors are mutations, and without variation a lineage cannot adapt",
            "Perfect copying would be too fast",
            "Cells cannot afford the enzymes",
          ],
          answer: 1,
          explain:
            "There is a trade-off. Too many errors and the organism fails; none at all and there is nothing for selection to work with.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "protein-synthesis",
      unitId: "u2",
      title: "The Genetic Code: From Gene to Protein",
      subtitle:
        "Three bases name one amino acid. That lookup table is shared by every organism on Earth, and it is the closest thing biology has to a universal constant.",
      buildsOn: ["dna", "enzymes"],
      Theory: () => (
        <>
          <h2>Why proteins are the point</h2>
          <p>
            DNA does almost nothing directly. It is an archive. The molecules that actually do the
            work are <strong>proteins</strong>: enzymes that catalyse reactions, channels that
            ferry things across membranes, antibodies, haemoglobin, keratin, muscle fibres. A gene
            is worth having because it specifies a protein.
          </p>
          <p>
            A protein is a chain of <strong>amino acids</strong>, of which there are twenty. The
            chain folds into a shape determined by its sequence, and — as the enzyme lesson
            established — the shape <em>is</em> the function. So the entire problem is: how do you
            get from an order of four bases to an order of twenty amino acids?
          </p>

          <h2>Three letters at a time</h2>
          <p>
            One base per amino acid gives 4 possibilities — not enough. Two bases give 4² = 16 —
            still short of 20. Three bases give <strong>4³ = 64</strong>, which is more than
            enough. Nature uses three, and a triplet is called a <strong>codon</strong>.
          </p>
          <p>
            Sixty-four codons for twenty amino acids means the code is{" "}
            <strong>degenerate</strong>: most amino acids have several codons. The redundancy is not
            random — it sits mostly in the <em>third</em> base. GGU, GGC, GGA and GGG all mean
            glycine, so the third letter can be anything at all. This is called{" "}
            <strong>wobble</strong>, and it is a genuine error-tolerance feature: many single-base
            mutations change a codon without changing the amino acid, and are therefore silent.
          </p>
          <p>Three codons name no amino acid at all — they are <strong>STOP</strong> signals:</p>
          <div className="formula">
            UAA · UAG · UGA
            <span className="note">
              U Are Away · U Are Gone · U Go Away — the classic hook, and it works
            </span>
          </div>
          <p>
            And <strong>AUG</strong> does double duty: it means methionine, and it is the{" "}
            <strong>START</strong> codon that sets the reading frame. Where translation begins
            decides how every subsequent triplet is grouped, which is why frameshifts are so
            destructive.
          </p>

          <h2>The two steps</h2>
          <p>
            <strong>Transcription</strong>, in the nucleus. One gene is copied into{" "}
            <strong>mRNA</strong> — single-stranded, and with <strong>U</strong> (uracil) wherever
            DNA would use T. The working copy leaves; the archive never does. This is the same
            reason a library lends photocopies of a rare manuscript.
          </p>
          <p>
            <strong>Translation</strong>, at the ribosome. The ribosome reads the mRNA three bases
            at a time. For each codon, a <strong>tRNA</strong> molecule carrying the matching amino
            acid docks, its anticodon pairing with the codon, and the amino acid is added to the
            growing chain. At a stop codon the ribosome releases the finished protein.
          </p>
          <div className="formula">
            DNA → (transcription) → mRNA → (translation) → protein
            <span className="note">the central dogma, in its everyday form</span>
          </div>

          <div className="callout note">
            <span className="co-title">One code, all of life</span>
            <p>
              The same 64 codons mean the same amino acids in bacteria, yeast, oak trees and you,
              with only tiny exceptions. That is why a human insulin gene inserted into{" "}
              <em>E. coli</em> produces human insulin — which is how insulin has been manufactured
              since 1982. The universality is also the strongest single piece of evidence that
              everything alive shares one ancestor: an arbitrary code, frozen in before the
              lineages split.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Transcribe & Translate",
        intro: (
          <>
            <p>A DNA template at the top, a protein at the bottom. Step through it codon by codon.</p>
            <ul>
              <li>Start with the default gene: TAC transcribes to AUG, so translation begins with methionine.</li>
              <li>Drag the codon slider one triplet at a time and watch each tRNA deliver its amino acid.</li>
              <li>Change a third base — say GGA to GGG. The protein does not change. That is wobble.</li>
            </ul>
          </>
        ),
        Component: TranslationLab,
      },
      quiz: [
        {
          q: "Why does the genetic code use three bases per amino acid rather than two?",
          choices: [
            "Two bases give only 16 combinations — fewer than the 20 amino acids needed",
            "Three bases fit the ribosome better",
            "Three is more stable",
            "Historical accident with no reason",
          ],
          answer: 0,
          explain: "4² = 16 is not enough for 20 amino acids; 4³ = 64 is comfortably more than enough.",
        },
        {
          q: "What does it mean that the genetic code is 'degenerate'?",
          choices: [
            "It is decaying over time",
            "Most amino acids are specified by more than one codon",
            "Some codons mean nothing",
            "It differs between species",
          ],
          answer: 1,
          explain:
            "64 codons cover 20 amino acids plus stop, so there is redundancy — concentrated in the third base, which is the wobble position.",
        },
        {
          q: "Which codon is the START signal, and which amino acid does it also specify?",
          choices: ["UAA, stop", "UGG, tryptophan", "AUG, methionine", "GGG, glycine"],
          answer: 2,
          explain:
            "AUG does both jobs: it sets the reading frame and codes for methionine, so newly made proteins begin with Met.",
        },
        {
          q: "What is transcribed from a DNA template strand reading TAC?",
          choices: ["ATG", "AUG", "UAC", "TAC"],
          answer: 1,
          explain:
            "Pair each base and swap T for U: T→A, A→U, C→G gives AUG — which is, appropriately, the start codon.",
        },
        {
          q: "Why can a human gene inserted into a bacterium produce a working human protein?",
          choices: [
            "Bacteria can read any code",
            "It cannot — that does not work",
            "The gene is translated by human enzymes carried along with it",
            "The genetic code is essentially universal — the same codons mean the same amino acids in nearly all life",
          ],
          answer: 3,
          explain:
            "Shared ancestry left every lineage using the same lookup table. It is why bacterially produced human insulin has been on the market since 1982.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "mutations",
      unitId: "u2",
      title: "Mutations: When the Copy Is Wrong",
      subtitle:
        "One base in three billion. Sometimes it means nothing at all, sometimes it means sickle-cell anaemia — and the difference is mostly about reading frames.",
      buildsOn: ["protein-synthesis", "replication"],
      Theory: () => (
        <>
          <h2>A change in the sequence</h2>
          <p>
            A <strong>mutation</strong> is any change to the DNA sequence. Most arise as
            uncorrected copying errors; others are caused by <strong>mutagens</strong> —
            UV light, X-rays, tobacco smoke, certain chemicals. They occur constantly, and the vast
            majority are harmless because they land in non-coding DNA or get repaired.
          </p>
          <p>The ones inside a gene fall into two very different classes.</p>

          <h2>Substitutions: one letter swapped</h2>
          <p>One base is replaced by another. Three outcomes are possible:</p>
          <ul>
            <li>
              <strong>Silent</strong> — the new codon still means the same amino acid. GGA → GGG is
              still glycine. Thank wobble; these do nothing at all.
            </li>
            <li>
              <strong>Missense</strong> — a different amino acid is inserted. The effect depends
              entirely on which one and where. Often harmless; occasionally decisive.
            </li>
            <li>
              <strong>Nonsense</strong> — the codon becomes a STOP. The protein is cut short and
              almost always useless.
            </li>
          </ul>
          <p>
            The famous missense case is <strong>sickle-cell anaemia</strong>. One base changes GAG
            to GTG in the haemoglobin gene, swapping glutamate for valine — a single amino acid out
            of 146. Glutamate is charged and water-friendly; valine is oily. That one substitution
            makes haemoglobin molecules stick together into fibres, deforming red blood cells into
            crescents that jam capillaries. One letter in three billion, and a serious disease.
          </p>
          <p>
            The same mutation, in a single copy, also confers resistance to malaria — which is why
            it stayed common in populations where malaria was endemic. Whether a mutation is
            &ldquo;bad&rdquo; depends on the environment, which is precisely the point of Unit 4.
          </p>

          <h2>Frameshifts: everything after it</h2>
          <p>
            Insert or delete a base and you do not change one codon — you change{" "}
            <em>the grouping of every codon downstream</em>. The reading frame slips by one, and
            everything after the mutation is read as a different set of triplets entirely.
          </p>
          <div className="equation">
            THE BIG RED CAT ATE — delete one letter → THE BGR EDC ATA TE…
          </div>
          <p>
            The sentence does not lose a word; it loses all meaning from that point on. A
            frameshift usually produces a garbled protein and hits a premature STOP somewhere in the
            nonsense. This is why insertions and deletions are, on average, far more damaging than
            substitutions — and why a deletion of exactly three bases is much milder, since it
            removes one amino acid and leaves the frame intact.
          </p>

          <h2>Where the mutation happens matters</h2>
          <ul>
            <li>
              <strong>Somatic</strong> — in a body cell. Affects you, is not inherited. Cancer is
              what happens when somatic mutations accumulate in genes controlling cell division.
            </li>
            <li>
              <strong>Germline</strong> — in eggs or sperm. Does not affect you, but is passed to
              every cell of your children. Only germline mutations feed evolution.
            </li>
          </ul>
          <div className="callout tip">
            <span className="co-title">Mutations are the raw material</span>
            <p>
              It is tempting to treat mutation as purely damage, but every allele that ever existed
              — every eye colour, every enzyme variant, every adaptation in the history of life —
              began as a copying error. Selection can only choose among variants that already
              exist, and mutation is the only thing that makes new ones.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Mutation Bench",
        intro: (
          <>
            <p>One gene, before and after. Pick a mutation and see what reaches the protein.</p>
            <ul>
              <li>Substitute a third base in a codon. Often the protein is unchanged — a silent mutation.</li>
              <li>Now delete a single base. Compare how much of the protein survives.</li>
              <li>Find a substitution that creates an early STOP. That is a nonsense mutation.</li>
            </ul>
          </>
        ),
        Component: MutationLab,
      },
      quiz: [
        {
          q: "A substitution changes GGA to GGG. Both code for glycine. What is this called?",
          choices: ["Missense", "Nonsense", "Silent", "Frameshift"],
          answer: 2,
          explain:
            "The codon changed but the amino acid did not, so the protein is identical. Wobble in the third base makes this common.",
        },
        {
          q: "Why is a single-base deletion usually more damaging than a single-base substitution?",
          choices: [
            "It removes more genetic material",
            "It shifts the reading frame, so every codon after it is misread",
            "It always creates a stop codon immediately",
            "It cannot be repaired",
          ],
          answer: 1,
          explain:
            "A substitution changes one codon. A frameshift regroups every triplet downstream, so the whole rest of the protein is garbage.",
        },
        {
          q: "Sickle-cell anaemia is caused by…",
          choices: [
            "One base substitution swapping glutamate for valine in haemoglobin",
            "A missing chromosome",
            "A frameshift in the haemoglobin gene",
            "A mutagen in the diet",
          ],
          answer: 0,
          explain:
            "A single missense mutation — one amino acid out of 146 — makes haemoglobin molecules stack into fibres that deform the cell.",
        },
        {
          q: "Which mutations can be passed to offspring?",
          choices: [
            "All mutations",
            "Only germline mutations, in eggs or sperm",
            "Only somatic mutations",
            "Only mutations caused by mutagens",
          ],
          answer: 1,
          explain:
            "Somatic mutations affect only the individual. Only changes in the cells that make gametes reach the next generation, so only those feed evolution.",
        },
        {
          q: "Why does a 3-base deletion usually cause less damage than a 1-base deletion?",
          choices: [
            "Three bases are easier to repair",
            "It removes one whole codon and leaves the reading frame intact",
            "It always lands in non-coding DNA",
            "It does not — it is three times worse",
          ],
          answer: 1,
          explain:
            "Removing a multiple of three deletes whole amino acids without shifting the frame, so the rest of the protein is still read correctly.",
        },
      ],
    },
  ],
};
