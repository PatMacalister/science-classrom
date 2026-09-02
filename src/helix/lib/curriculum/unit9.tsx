import type { UnitModule } from "./types";
import { PcrLab, CrisprLab } from "@/helix/components/labs/labs-unit9";

export const unit9: UnitModule = {
  unit: {
    id: "u9",
    num: 9,
    title: "Biotechnology: Reading & Editing Life",
    blurb:
      "The course ends where biology becomes engineering: a machine that photocopies DNA a billionfold, and a programmable pair of scissors borrowed from bacteria.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "pcr",
      unitId: "u9",
      title: "PCR: The Molecular Photocopier",
      subtitle:
        "Thirty cycles of heating and cooling turn one DNA molecule into a billion. It is the trick behind every DNA test — and it is just Unit 2's replication, run in a tube.",
      buildsOn: ["replication", "strawberry-dna"],
      Theory: () => (
        <>
          <h2>The problem: too little to see</h2>
          <p>
            A crime-scene hair, a drop of ancient bone, a nose swab early in an infection — each
            might hold a few hundred copies of the DNA you care about. No instrument on Earth
            detects that directly. The strawberry lesson needed millions of cells&rsquo; worth of
            DNA just to make threads you could see. What forensics, medicine and archaeology
            needed was an amplifier.
          </p>

          <h2>The solution: borrow replication</h2>
          <p>
            You already know a machine that copies DNA — Unit 2&rsquo;s replication. The{" "}
            <strong>polymerase chain reaction</strong> puts a stripped-down version in a tube and
            drives it with nothing but temperature, cycling through three steps:
          </p>
          <ul>
            <li>
              <strong>95 °C — denature.</strong> Heat breaks the hydrogen bonds and the double
              helix falls into two single strands. (GC-rich DNA, with its three bonds per pair,
              holds on hardest — Unit 2 again.)
            </li>
            <li>
              <strong>55 °C — anneal.</strong> Two short synthetic DNA pieces called{" "}
              <strong>primers</strong> base-pair onto the strands, one on each side of the target
              region. Primers are the address label: only the stretch between them gets copied.
            </li>
            <li>
              <strong>72 °C — extend.</strong> A polymerase builds new complementary strands
              starting from the primers. Two molecules now exist where one did.
            </li>
          </ul>
          <p>
            Repeat. Each cycle takes about ninety seconds and <strong>doubles</strong> the count:
          </p>
          <div className="formula">
            copies = 2<sup>cycles</sup>
            <span className="note">30 cycles ≈ a billion copies from a single molecule</span>
          </div>

          <h2>The enzyme from a hot spring</h2>
          <p>
            One catch: 95&nbsp;°C destroys ordinary enzymes — that is what denaturation meant in
            Unit 0.3, and early PCR needed fresh polymerase added by hand every single cycle. The
            fix came from an organism that thinks 70&nbsp;°C is comfortable:{" "}
            <em>Thermus aquaticus</em>, a bacterium from Yellowstone&rsquo;s hot springs, whose
            polymerase (&ldquo;<strong>Taq</strong>&rdquo;) shrugs off the heat. Drop it in once
            and the whole reaction runs unattended in a benchtop thermal cycler.
          </p>

          <h2>Seeing the result</h2>
          <p>
            A billion copies is still invisible until you sort them.{" "}
            <strong>Gel electrophoresis</strong> uses a fact from the strawberry extraction: the
            phosphate backbone makes DNA negatively charged. Pull it through a gel with an
            electric field and short fragments slip through faster than long ones, so each length
            gathers into a <strong>band</strong>. Right length, right band, bright enough to
            photograph — that is a positive test.
          </p>

          <div className="callout note">
            <span className="co-title">Invented on a night drive</span>
            <p>
              Kary Mullis said the idea hit him on a California highway in 1983, and he pulled
              over to scribble the arithmetic. The chemistry was all known; the loop was the
              invention. It won the 1993 Nobel Prize and sits under every COVID PCR test,
              paternity test and genome project since.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Thermal Cycler",
        intro: (
          <>
            <p>Three temperatures on repeat, and an exponential doing the rest.</p>
            <ul>
              <li>Step the cycles up one at a time and watch the copy count — each bar is ×32 the one before.</li>
              <li>Find how many cycles one molecule needs to become detectable (~10⁶ copies).</li>
              <li>Drop the efficiency to 85%. Compounding works against you just as hard.</li>
            </ul>
          </>
        ),
        Component: PcrLab,
      },
      problems: [
        {
          prompt: "Starting from one DNA molecule at 100% efficiency, how many copies exist after 10 PCR cycles?",
          answer: 1024,
          unit: "copies",
          hint: "Each cycle doubles the count.",
          explain: "2¹⁰ = 1,024. Ten more cycles multiplies by another thousand — that is exponential growth in your favour.",
        },
        {
          prompt:
            "Detection needs about one million copies. Starting from a single molecule, how many doubling cycles are required to exceed that?",
          answer: 20,
          unit: "cycles",
          tolerancePct: 5,
          hint: "2¹⁰ ≈ a thousand, so 2²⁰ ≈ …",
          explain: "2²⁰ = 1,048,576 — just over a million. Thirty cycles gives a billion; the machine takes under an hour.",
        },
      ],
      quiz: [
        {
          q: "What decides which stretch of DNA gets amplified?",
          choices: [
            "The temperature of the extend step",
            "The primers — copying happens only between where the two of them bind",
            "The polymerase chooses the most common sequence",
            "The whole genome is always copied",
          ],
          answer: 1,
          explain:
            "Primers are the address label. Design them to flank your target and PCR ignores the other 99.99…% of the DNA in the tube.",
        },
        {
          q: "What happens at 95 °C, and why does it work?",
          choices: [
            "The strands separate — heat breaks the hydrogen bonds between base pairs",
            "The polymerase copies fastest",
            "The primers bind",
            "The DNA is destroyed and rebuilt",
          ],
          answer: 0,
          explain:
            "Denaturation: the two strands of the helix let go. The covalent backbones survive; only the A–T and C–G pairing is undone.",
        },
        {
          q: "Why is Taq polymerase, from a hot-spring bacterium, essential to practical PCR?",
          choices: [
            "It copies DNA faster than any other enzyme",
            "It never makes copying errors",
            "It survives the 95 °C step that would denature ordinary enzymes, so it is added once, not every cycle",
            "It works without primers",
          ],
          answer: 2,
          explain:
            "An enzyme that shrugs off boiling heat turned a tedious manual procedure into an unattended benchtop loop.",
        },
        {
          q: "Roughly how many copies does 30 cycles make from one molecule?",
          choices: ["Thirty", "About a thousand", "About thirty thousand", "About a billion"],
          answer: 3,
          explain:
            "2³⁰ ≈ 1.07 × 10⁹. Doubling is deceptively fast: the last single cycle creates as many copies as all twenty-nine before it combined.",
        },
        {
          q: "In gel electrophoresis, why does DNA move through the gel at all?",
          choices: [
            "The gel dissolves it",
            "Its phosphate backbone is negatively charged, so an electric field pulls it",
            "Enzymes push it along",
            "Heat makes it diffuse",
          ],
          answer: 1,
          explain:
            "The same backbone charge you neutralised with salt in the strawberry extraction becomes the handle an electric field can pull on.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "crispr",
      unitId: "u9",
      title: "CRISPR: Editing the Text Itself",
      subtitle:
        "Bacteria evolved a programmable defense that finds one sequence among billions and cuts it. We borrowed it — and edited humans with it.",
      buildsOn: ["pcr", "dna", "mutations"],
      Theory: () => (
        <>
          <h2>Reading was solved. Writing wasn’t.</h2>
          <p>
            By the 2000s, sequencing and PCR made DNA cheap to read and copy. Changing a chosen
            letter inside a living cell was another matter — the tools of the day either cut at
            fixed sequences they happened to like (restriction enzymes) or took months of protein
            engineering to re-aim. What was missing was a cutter you could{" "}
            <em>program with an address</em>.
          </p>

          <h2>Bacteria got there first</h2>
          <p>
            The answer was sitting in last unit&rsquo;s subject matter. Bacteria suffer viruses
            too, and some keep an archive of the attackers they have survived: short chunks of
            viral DNA pasted into their own genome, in a region called <strong>CRISPR</strong>.
            It is adaptive immunity, Unit 7 style, implemented in a single cell — the archive is
            the memory. The archive is transcribed into short <strong>guide RNAs</strong>, each
            of which loads into a protein called <strong>Cas9</strong>. The guide base-pairs with
            any DNA matching its sequence — A with T, C with G, the same rule you have used since
            Unit 2 — and when all ~20 letters line up, Cas9 cuts both strands.
          </p>
          <p>
            In 2012, Jennifer Doudna and Emmanuelle Charpentier showed the payoff: swap the guide
            sequence and Cas9 cuts wherever <em>you</em> choose. A programmable scissors, aimed by
            base-pairing. Nobel Prize, 2020.
          </p>

          <h2>The cell does the actual editing</h2>
          <p>
            Cas9 only cuts. What happens next is the cell&rsquo;s own repair machinery — and
            there are two roads:
          </p>
          <ul>
            <li>
              <strong>Quick and sloppy:</strong> the cut ends are glued back directly, often
              gaining or losing a few letters. Recall the mutations lesson: an insertion that is
              not a multiple of three shifts the reading frame and wrecks the gene. Sloppy repair
              is therefore a reliable way to <em>knock a gene out</em>.
            </li>
            <li>
              <strong>Slow and faithful:</strong> supply a DNA template alongside Cas9, and the
              repair machinery may copy it across the break — installing exactly the sequence you
              provided. That is true editing: a chosen letter, changed on purpose.
            </li>
          </ul>

          <h2>One guard against chaos: the PAM</h2>
          <p>
            Cas9 refuses to cut unless the match sits next to a short marker (the{" "}
            <strong>PAM</strong>, typically <code>-NGG</code>) — a safety inherited from bacteria,
            which must not shred their own CRISPR archive. Even so, a site that matches 19 of 20
            letters can sometimes be cut anyway. These <strong>off-target</strong> cuts are the
            central safety problem of gene editing, and the lab below lets you feel exactly what
            they are.
          </p>

          <h2>From hot springs to hospitals</h2>
          <p>
            In 2023, the first CRISPR medicine was approved: it edits a patient&rsquo;s own
            blood stem cells to treat sickle-cell disease — the very disease this course used to
            introduce point mutations. Edits like that affect one patient&rsquo;s body and die
            with them (<strong>somatic</strong> editing). Editing embryos
            (<strong>germline</strong>) would pass changes to all descendants; when one scientist
            did it to twin girls in 2018, the near-universal reaction of the field was
            condemnation, and he went to prison. The technology does not draw that line. People
            have to.
          </p>

          <div className="callout note">
            <span className="co-title">The full circle</span>
            <p>
              A bacterial immune system, aimed by Unit 2&rsquo;s base-pairing, exploiting Unit
              2&rsquo;s frameshift mutations, delivered to fix the mutation from Unit 2&rsquo;s
              own case study. The last lesson of this course is every earlier lesson, pointed at
              a genome on purpose.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Guide RNA Targeting",
        intro: (
          <>
            <p>Slide a 10-letter guide along a stretch of genome and watch it check base-pairing.</p>
            <ul>
              <li>Find the perfect match with a PAM next door — the only place Cas9 truly cuts.</li>
              <li>There is a 9-of-10 site with a PAM further along. That is an off-target risk, the field’s biggest worry.</li>
              <li>One site matches perfectly but has no PAM. No cut — the safety works.</li>
            </ul>
          </>
        ),
        Component: CrisprLab,
      },
      problems: [
        {
          prompt:
            "How many different 10-letter DNA sequences exist? (four letters per position)",
          answer: 1048576,
          unit: "sequences",
          hint: "4 multiplied by itself 10 times.",
          explain:
            "4¹⁰ = 1,048,576. Real guides use ~20 letters: 4²⁰ ≈ 10¹² — a trillion addresses, enough to single out one site in a 3-billion-letter genome.",
        },
      ],
      quiz: [
        {
          q: "What does the guide RNA contribute to CRISPR-Cas9?",
          choices: [
            "It cuts the DNA",
            "It repairs the cut",
            "The address — it base-pairs with the matching DNA sequence, aiming Cas9 there",
            "It protects the cell from viruses",
          ],
          answer: 2,
          explain:
            "Targeting is pure base-pairing: swap the ~20-letter guide and the same protein cuts somewhere else entirely.",
        },
        {
          q: "Where did CRISPR-Cas9 originally come from?",
          choices: [
            "It is a bacterial adaptive immune system that archives and attacks viral DNA",
            "It was designed from scratch in a lab",
            "It comes from human immune cells",
            "It is a modified restriction enzyme",
          ],
          answer: 0,
          explain:
            "Bacteria paste chunks of past attackers' DNA into a CRISPR archive — single-cell immune memory — and use guides made from it to destroy repeat offenders.",
        },
        {
          q: "Cas9 has cut a gene and the cell glued the ends sloppily, inserting one extra letter. What is the likely result?",
          choices: [
            "The gene works normally",
            "A frameshift — every codon downstream misreads, and the gene is knocked out",
            "The cell dies immediately",
            "The gene is duplicated",
          ],
          answer: 1,
          explain:
            "One inserted letter shifts the three-letter reading frame — the mutations lesson's worst case, here used deliberately to switch a gene off.",
        },
        {
          q: "What is an 'off-target' edit?",
          choices: [
            "An edit that fails to change anything",
            "An edit rejected by the immune system",
            "A cut at the intended site but on one strand only",
            "A cut at a near-match site elsewhere in the genome",
          ],
          answer: 3,
          explain:
            "A 19-of-20 match can sometimes be cut anyway. Minimising off-targets is the central engineering and safety problem of gene editing.",
        },
        {
          q: "Why is germline editing treated so differently from somatic editing?",
          choices: [
            "It is technically much harder",
            "Germline changes are inherited by all future generations; somatic edits die with the patient",
            "Somatic editing is painless",
            "There is no real difference",
          ],
          answer: 1,
          explain:
            "Editing an embryo edits every descendant who never consented. The approved sickle-cell therapy is somatic — one patient, one body, one lifetime.",
        },
      ],
    },
  ],
};
