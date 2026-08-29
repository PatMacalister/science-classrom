import type { UnitModule } from "./types";
import { PunnettLab, MeiosisLab } from "@/helix/components/labs/labs-unit4";

export const unit4: UnitModule = {
  unit: {
    id: "u4",
    num: 4,
    title: "Heredity",
    blurb:
      "How the code gets passed on: why traits skip generations, why siblings differ, and why a monk counting peas got there before anyone had seen a chromosome.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "mendel",
      unitId: "u4",
      title: "Mendel: Traits Come in Units",
      subtitle:
        "Inheritance is not paint mixing. Traits are carried as discrete units that can hide for a generation and reappear intact.",
      buildsOn: ["dna", "mutations"],
      Theory: () => (
        <>
          <h2>The blending problem</h2>
          <p>
            Before 1865 the common assumption was that inheritance <em>blends</em>: cross a tall
            plant with a short one and get medium offspring, like mixing paint. It is intuitive, and
            it is fatal to Darwin&rsquo;s theory — blending halves variation every generation, so within a
            few dozen generations everything is uniform and selection has nothing left to act on.
            Darwin knew this was a problem and never solved it.
          </p>
          <p>
            The solution had already been published, by an Augustinian friar counting peas in a
            monastery garden, and was ignored for thirty-five years.
          </p>

          <h2>What Gregor Mendel did</h2>
          <p>
            Mendel picked pea plants with clean either/or traits — tall or short, round or wrinkled,
            yellow or green — and, crucially, <strong>counted</strong> his offspring. Thousands of
            them. Biology at the time described; Mendel measured.
          </p>
          <p>
            Crossing pure tall with pure short, he got no medium plants. The first generation was{" "}
            <strong>all tall</strong>. Shortness had vanished. Then he let those plants
            self-pollinate, and shortness came back — in almost exactly one quarter of the
            offspring.
          </p>
          <div className="formula">
            F₂ ratio ≈ 3 : 1
            <span className="note">Mendel counted 787 tall to 277 short — 2.84 : 1</span>
          </div>
          <p>
            A trait that disappears completely and returns intact cannot have been blended. It was
            carried, unchanged and hidden, by the first generation. Inheritance is{" "}
            <strong>particulate</strong>.
          </p>

          <h2>The vocabulary</h2>
          <ul>
            <li>
              <strong>Gene</strong> — a stretch of DNA specifying a trait. <strong>Allele</strong> —
              one particular version of it (tall or short).
            </li>
            <li>
              Every organism carries <strong>two alleles</strong> per gene, one from each parent.
            </li>
            <li>
              <strong>Dominant</strong> (written capital, A) shows whenever present;{" "}
              <strong>recessive</strong> (lowercase, a) shows only when both copies are recessive.
            </li>
            <li>
              <strong>Genotype</strong> — the alleles you carry (AA, Aa, aa).{" "}
              <strong>Phenotype</strong> — what you can actually observe.
            </li>
            <li>
              <strong>Homozygous</strong> — two matching alleles. <strong>Heterozygous</strong> — one
              of each, a <em>carrier</em> of the recessive.
            </li>
          </ul>
          <p>
            AA and Aa look identical. That single fact explains almost every puzzle in family
            genetics — including two brown-eyed parents having a blue-eyed child, and why cystic
            fibrosis can appear in a family with no history of it.
          </p>

          <h2>The Punnett square</h2>
          <p>
            Cross two heterozygotes (Aa × Aa). Each parent gives A or a with equal probability, so
            the four equally likely combinations are AA, Aa, aA and aa:
          </p>
          <div className="formula">
            1 AA : 2 Aa : 1 aa &nbsp;→&nbsp; 3 showing dominant : 1 showing recessive
            <span className="note">the genotype ratio is 1:2:1; the phenotype ratio is 3:1</span>
          </div>
          <p>
            Note that these are <strong>probabilities, not guarantees</strong>. Four offspring from
            an Aa × Aa cross will not reliably be 3:1 any more than four coin flips give exactly two
            heads. Mendel&rsquo;s ratios emerged because he counted thousands. Every genetic counsellor
            has to explain this: a 1-in-4 risk applies afresh to each child, and does not become
            0-in-4 because the first three were unaffected.
          </p>

          <div className="callout note">
            <span className="co-title">Mendel had no idea what a gene was</span>
            <p>
              He knew nothing of DNA, chromosomes or meiosis — none had been described. He inferred
              discrete hereditary units purely from ratios in counted offspring. His paper sat unread
              until 1900, when three researchers independently rediscovered the same rules and found
              he had beaten them by a generation. It is one of the best arguments in science for
              counting things.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Punnett Square",
        intro: (
          <>
            <p>Pick two parents and read the offspring straight off the grid.</p>
            <ul>
              <li>Cross Aa × Aa — the classic 3:1. One in four offspring shows the recessive trait.</li>
              <li>Now cross AA × aa. Every offspring is Aa: the recessive vanishes entirely for a generation.</li>
              <li>Find the only cross where the recessive appears in <em>half</em> the offspring.</li>
            </ul>
          </>
        ),
        Component: PunnettLab,
      },
      problems: [
        {
          prompt:
            "In an Aa × Aa cross, what percentage of offspring are expected to show the recessive phenotype?",
          answer: 25,
          unit: "%",
          hint: "Only aa shows it, and that is one box of four.",
          explain: "1 in 4 = 25%. The other three (AA, Aa, Aa) all show the dominant phenotype.",
        },
        {
          prompt:
            "Two carriers (Aa) have four children. What is the probability that all four are unaffected (not aa)? Give it as a percentage.",
          answer: 31.6,
          unit: "%",
          tolerancePct: 4,
          hint: "Each child has a 3/4 chance of being unaffected, and the children are independent.",
          explain: "(3/4)⁴ = 81/256 ≈ 0.316, so about 32%. Each child is an independent 1-in-4 risk.",
        },
      ],
      quiz: [
        {
          q: "Why is blending inheritance fatal to Darwin's theory?",
          choices: [
            "It is too slow",
            "It halves variation each generation, leaving selection nothing to act on",
            "It requires DNA, which was unknown",
            "It only works in plants",
          ],
          answer: 1,
          explain:
            "Blending destroys variation. Particulate inheritance preserves alleles intact even when hidden, which is exactly what selection needs.",
        },
        {
          q: "A tall plant crossed with a short plant gives all tall offspring. What does that tell you?",
          choices: [
            "Tallness is recessive",
            "Tallness is dominant, and the offspring are heterozygous carriers of shortness",
            "The short plant had no alleles for height",
            "The traits blended",
          ],
          answer: 1,
          explain:
            "The recessive allele is present but masked. It reappears in about a quarter of the next generation, proving it was never lost.",
        },
        {
          q: "What is the phenotype ratio from an Aa × Aa cross?",
          choices: ["1:1", "3:1 dominant to recessive", "1:2:1", "9:3:3:1"],
          answer: 1,
          explain:
            "Genotypes are 1 AA : 2 Aa : 1 aa, and since AA and Aa look the same, three of four show the dominant phenotype.",
        },
        {
          q: "Two brown-eyed parents have a blue-eyed child. How?",
          choices: [
            "A new mutation must have occurred",
            "Both parents are heterozygous carriers, and the child inherited the recessive allele from each",
            "Blue eyes are dominant",
            "This is impossible",
          ],
          answer: 1,
          explain:
            "Both parents are Aa, showing brown but carrying blue. There is a 1-in-4 chance per child of inheriting a recessive allele from both.",
        },
        {
          q: "Two carriers already have three unaffected children. What is the risk for the fourth?",
          choices: [
            "Zero — the risk is used up",
            "Still 1 in 4 — each conception is independent",
            "1 in 2, because the odds must even out",
            "It depends on the sexes of the first three",
          ],
          answer: 1,
          explain:
            "Each conception is an independent event. Previous outcomes change nothing — the gambler's fallacy is a genuine hazard in genetic counselling.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "meiosis",
      unitId: "u4",
      title: "Meiosis: Why No Two Siblings Are Alike",
      subtitle:
        "One cell divides twice into four, each with half the chromosomes — and three separate mechanisms guarantee that no two are the same.",
      buildsOn: ["mendel", "replication"],
      Theory: () => (
        <>
          <h2>The halving problem</h2>
          <p>
            You have 46 chromosomes, in 23 pairs — one of each pair from each parent. If a sperm and
            an egg each carried 46, your children would have 92, their children 184, and the whole
            thing collapses within a few generations.
          </p>
          <p>
            So gametes must carry <strong>half</strong>: 23 chromosomes, one from each pair. Cells
            with the full set are <strong>diploid (2n)</strong>; gametes are{" "}
            <strong>haploid (n)</strong>. The division that halves the number is{" "}
            <strong>meiosis</strong>, and it is used for nothing else.
          </p>
          <p>
            Compare it with <strong>mitosis</strong>, the ordinary division that grows you and
            repairs you: one cell → two <em>identical</em> diploid cells. Meiosis: one cell → four{" "}
            <em>different</em> haploid cells. Different purpose, different outcome.
          </p>

          <h2>Two divisions, four cells</h2>
          <p>
            The chromosomes are copied once, then the cell divides <em>twice</em>. That is what gets
            you from 2n to n.
          </p>
          <ul>
            <li>
              <strong>Division I</strong> separates the <em>pairs</em> — one whole chromosome of
              each pair to each side. This is the reduction step.
            </li>
            <li>
              <strong>Division II</strong> separates the copies within each chromosome, giving four
              haploid cells in total.
            </li>
          </ul>

          <h2>Three sources of variety</h2>
          <p>
            Meiosis is not just division — it is a shuffling machine, and it has three independent
            mechanisms.
          </p>
          <p>
            <strong>1. Independent assortment.</strong> When the 23 pairs line up before Division I,
            each pair orients at random, independently of the others. Whether you pass on your
            mother&rsquo;s chromosome 7 has nothing to do with whose chromosome 12 you pass on. That gives{" "}
            2²³ = <strong>8,388,608</strong> possible combinations from assortment alone.
          </p>
          <p>
            <strong>2. Crossing over.</strong> Before separating, paired chromosomes physically
            swap matching segments. The chromosome you pass on is therefore not your mother&rsquo;s or
            your father&rsquo;s — it is a mosaic of both, in a new combination that has never existed.
          </p>
          <p>
            <strong>3. Random fertilisation.</strong> Any one of millions of possible sperm meets
            any one of millions of possible eggs.
          </p>
          <div className="formula">
            2²³ × 2²³ ≈ 7 × 10¹³ combinations, before crossing over
            <span className="note">and crossing over makes the real number effectively unbounded</span>
          </div>
          <p>
            This is why siblings resemble each other without being identical, and why identical
            twins — who skip the shuffle entirely by splitting from one fertilised egg — are so
            striking.
          </p>

          <h2>The link back to Mendel</h2>
          <p>
            Mendel&rsquo;s rules are meiosis, described before anyone had seen it. His &ldquo;units&rdquo;
            separate cleanly because homologous chromosomes physically separate at Division I. They
            assort independently because the pairs line up independently. Mendel inferred the
            mechanism from ratios alone; when chromosomes were finally watched under a microscope
            decades later, they were doing exactly what he had predicted.
          </p>
          <div className="callout warn">
            <span className="co-title">When separation fails</span>
            <p>
              If a pair fails to separate — <em>nondisjunction</em> — a gamete ends up with an extra
              chromosome or none. An extra chromosome 21 gives Down syndrome. The risk rises with
              maternal age because human egg cells begin meiosis before birth and pause partway
              through, sometimes for decades, before finishing.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Meiosis Stepper",
        intro: (
          <>
            <p>Step through one cell becoming four, and watch where the variety comes from.</p>
            <ul>
              <li>At step 2, chromosomes swap segments — the colours mix. Turn crossing over off and compare.</li>
              <li>At step 3, notice the pairs line up independently. That alone gives 2²³ possibilities.</li>
              <li>The final four gametes are all different. Mitosis would have produced two identical cells.</li>
            </ul>
          </>
        ),
        Component: MeiosisLab,
      },
      problems: [
        {
          prompt:
            "Humans have 23 chromosome pairs. How many chromosome combinations can independent assortment alone produce in one gamete?",
          answer: 8388608,
          unit: "combinations",
          tolerancePct: 1,
          hint: "Each pair orients independently: 2 to the power of the number of pairs.",
          explain: "2²³ = 8,388,608 — and that is before crossing over adds any mixing.",
        },
        {
          prompt:
            "An organism has 4 chromosome pairs. How many genetically distinct gametes can independent assortment produce?",
          answer: 16,
          unit: "gametes",
          hint: "2 to the power of the number of pairs.",
          explain: "2⁴ = 16 distinct combinations.",
        },
      ],
      quiz: [
        {
          q: "Why must gametes be haploid?",
          choices: [
            "They are smaller",
            "Otherwise the chromosome number would double every generation",
            "Haploid cells divide faster",
            "To prevent mutations",
          ],
          answer: 1,
          explain:
            "Fertilisation combines two gametes. Each must carry half the set for the offspring to end up with a full one.",
        },
        {
          q: "How does meiosis differ from mitosis in outcome?",
          choices: [
            "Meiosis gives two identical diploid cells",
            "Meiosis gives four genetically different haploid cells",
            "They are the same process",
            "Meiosis produces no new cells",
          ],
          answer: 1,
          explain:
            "Mitosis copies a cell for growth and repair. Meiosis halves the chromosome number and shuffles the alleles, producing four unique gametes.",
        },
        {
          q: "What is crossing over?",
          choices: [
            "Chromosomes from different species combining",
            "Paired chromosomes physically exchanging matching segments before they separate",
            "Two gametes fusing",
            "A copying error in DNA",
          ],
          answer: 1,
          explain:
            "Homologous chromosomes swap equivalent stretches, so each one passed on is a mosaic of both parents rather than an intact copy of either.",
        },
        {
          q: "Which stage of meiosis actually halves the chromosome number?",
          choices: [
            "Division I, when homologous pairs separate",
            "Division II, when chromatids separate",
            "DNA replication beforehand",
            "Fertilisation",
          ],
          answer: 0,
          explain:
            "Division I sends one whole chromosome of each pair to each side — that is the reduction. Division II just separates the copies.",
        },
        {
          q: "Why do identical twins look so much more alike than ordinary siblings?",
          choices: [
            "They were conceived at the same time",
            "They come from one fertilised egg, so they skip meiotic shuffling and random fertilisation entirely",
            "They share a placenta",
            "They have twice as many chromosomes in common",
          ],
          answer: 1,
          explain:
            "Ordinary siblings are two independent draws from ~7 × 10¹³ combinations. Identical twins are one draw, split in two.",
        },
      ],
    },
  ],
};
