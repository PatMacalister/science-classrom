import type { UnitModule } from "./types";
import { PhagocyteLab, ImmunityLab } from "@/helix/components/labs/labs-unit7";

export const unit7: UnitModule = {
  unit: {
    id: "u7",
    num: 7,
    title: "The Body's Defenses",
    blurb:
      "Two immune systems share your body: one answers in minutes and asks no questions, the other takes a week to learn an enemy's face — and then never forgets it.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "innate-immunity",
      unitId: "u7",
      title: "Innate Immunity: The First Wall",
      subtitle:
        "Skin, mucus, fever and cells that eat intruders — the defense you were born with responds in minutes and treats every germ the same.",
      buildsOn: ["cells", "enzymes"],
      Theory: () => (
        <>
          <h2>Most infections never happen</h2>
          <p>
            You inhale, swallow and touch millions of microbes a day, and almost none of them make
            you ill. That is not luck; it is a layered defense that starts before anything gets
            in. <strong>Skin</strong> is a dry, slightly acidic wall of dead cells that is
            constantly shed. <strong>Mucus</strong> traps whatever lands in your airways, and
            beating cilia sweep it out. Tears and saliva carry <strong>lysozyme</strong> — an
            enzyme, in the Unit 0 sense, whose active site happens to fit and break bacterial cell
            walls. Stomach acid finishes most of what you swallow.
          </p>
          <p>
            Everything on that list works against <em>any</em> microbe. That is the signature of
            the <strong>innate</strong> immune system: fast, ancient, and completely generic. It
            recognises broad patterns — “this looks bacterial”, “this looks like a virus” — never
            individual species.
          </p>

          <h2>When something gets through: eat it</h2>
          <p>
            Past the barriers, the front-line responders are <strong>phagocytes</strong> —
            “eating cells” — chiefly <strong>macrophages</strong> stationed in your tissues and{" "}
            <strong>neutrophils</strong> that pour in from the blood. They engulf microbes whole
            and digest them with enzymes. A single macrophage can eat about a hundred bacteria in
            its lifetime; a serious infection is a numbers race between bacterial doubling and
            phagocyte clearance, and the lab below lets you run exactly that race.
          </p>

          <h2>Inflammation is your doing, not the germ’s</h2>
          <p>
            An infected cut goes red, hot, swollen and sore. Every one of those is a defensive
            act. Damaged cells and sentries release <strong>histamine</strong>, which widens local
            blood vessels (red, hot) and makes their walls leaky (swollen) so that phagocytes and
            antibacterial proteins can flood out of the blood into the tissue. The soreness is
            local nerves being sensitised so you protect the site. Inflammation feels like the
            disease; it is actually the fire brigade.
          </p>

          <h2>Fever: fighting with the thermostat</h2>
          <p>
            The same logic scales up to the whole body. Immune signals reset the brain&rsquo;s
            thermostat a couple of degrees higher, and Unit 0.3 tells you why that helps: rates of
            enzyme-run processes are temperature-sensitive. Many pathogens are tuned to 37&nbsp;°C
            and divide more slowly at 39&nbsp;°C, while several of your own defensive processes
            speed up. A moderate fever is not damage — it is deliberately tilting a race you
            intend to win.
          </p>

          <div className="callout note">
            <span className="co-title">Why pus is white</span>
            <p>
              Pus is mostly dead neutrophils — millions of short-lived eating cells that rushed
              in, engulfed what they could, and died at their posts. A visibly messy wound is
              often evidence of a defense that worked.
            </p>
          </div>

          <h2>The limits of asking no questions</h2>
          <p>
            The innate system is fast precisely because it is generic — nothing needs to be
            learned. But generic has a ceiling: it cannot get better at fighting{" "}
            <em>this particular</em> pathogen, and some invaders evolve past its standard tricks.
            For those, you need a system that learns. That is the next lesson.
          </p>
        </>
      ),
      lab: {
        title: "Growth vs. Clearance",
        intro: (
          <>
            <p>Bacteria double; phagocytes eat. Whoever compounds faster wins.</p>
            <ul>
              <li>With a 2 h doubling time, find the fewest phagocytes that still clear the infection.</li>
              <li>Set a fast doubler (0.5 h). Watch it overwhelm a defense that was winning easily before.</li>
              <li>Now switch on fever. Slower germs, faster defenders — see which lost races it flips.</li>
            </ul>
          </>
        ),
        Component: PhagocyteLab,
      },
      problems: [
        {
          prompt:
            "One bacterium doubles every 20 minutes. How many bacteria after 4 hours, if nothing eats them?",
          answer: 4096,
          unit: "bacteria",
          hint: "4 hours is 12 doublings.",
          explain: "12 doublings: 2¹² = 4,096. Unchecked exponential growth is why the response must be fast.",
        },
        {
          prompt:
            "A macrophage clears about 3 bacteria per hour. How many macrophages are needed to clear 600 bacteria per hour?",
          answer: 200,
          unit: "macrophages",
          hint: "Divide the workload by the per-cell rate.",
          explain: "600 ÷ 3 = 200 cells — which is why the body keeps millions on patrol.",
        },
      ],
      quiz: [
        {
          q: "What makes a defense 'innate' rather than adaptive?",
          choices: [
            "It is generic and needs no learning — the same response for every pathogen",
            "It only works against bacteria",
            "It is slower but stronger",
            "It is found only in humans",
          ],
          answer: 0,
          explain:
            "Innate defenses recognise broad patterns ('bacterial', 'viral') and respond in minutes — but they never improve against a specific enemy.",
        },
        {
          q: "Why does an infected cut become red, hot and swollen?",
          choices: [
            "The bacteria produce heat as they grow",
            "Histamine widens and leaks local blood vessels so defenders can flood into the tissue",
            "The skin is dissolving",
            "Blood is clotting inside the wound",
          ],
          answer: 1,
          explain:
            "Inflammation is your own response: wider, leakier vessels deliver phagocytes and defensive proteins to the site. It feels like the disease but is the defense.",
        },
        {
          q: "How does a moderate fever help fight infection?",
          choices: [
            "Heat sterilises the blood directly",
            "It burns energy the pathogen needs",
            "Many pathogens divide more slowly above 37 °C while defensive processes speed up",
            "It does not — fever is purely harmful",
          ],
          answer: 2,
          explain:
            "Enzyme-run processes are temperature-tuned. Resetting the thermostat tilts the growth-versus-clearance race in your favour.",
        },
        {
          q: "What is a phagocyte doing when it fights infection?",
          choices: [
            "Producing antibodies",
            "Remembering the pathogen for next time",
            "Blocking the pathogen from entering cells",
            "Engulfing microbes whole and digesting them with enzymes",
          ],
          answer: 3,
          explain:
            "Phagocytes like macrophages and neutrophils literally eat intruders. Antibodies and memory belong to the adaptive system — the next lesson.",
        },
        {
          q: "Lysozyme in tears breaks bacterial cell walls. What kind of molecule is it?",
          choices: [
            "An enzyme — a protein with an active site that fits its substrate",
            "An antibody",
            "A hormone",
            "A lipid",
          ],
          answer: 0,
          explain:
            "It is Unit 0's enzyme story in action: a protein catalyst whose active site happens to fit the bonds in bacterial cell walls.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "adaptive-immunity",
      unitId: "u7",
      title: "Adaptive Immunity: Memory of the Enemy",
      subtitle:
        "B cells, T cells and antibodies — a defense that learns each enemy individually, and the trick vaccines play on it.",
      buildsOn: ["innate-immunity", "protein-synthesis", "natural-selection"],
      Theory: () => (
        <>
          <h2>A key for a lock you have never seen</h2>
          <p>
            The adaptive immune system solves an absurd-sounding problem: recognising enemies that
            do not exist yet. It cannot know in advance what next year&rsquo;s virus will look
            like — so it does not try. Instead, your body generates{" "}
            <strong>billions of lymphocytes</strong> (B cells and T cells), each carrying{" "}
            <em>one</em> randomly assembled receptor. The receptor genes are shuffled and spliced
            during the cell&rsquo;s development, so the population as a whole covers an
            astronomical range of shapes. Somewhere in you, right now, is a cell whose receptor
            fits a pathogen no human has ever met.
          </p>

          <h2>Clonal selection — Darwin, internally</h2>
          <p>
            When a pathogen arrives, its surface molecules — <strong>antigens</strong> — are a
            shape test applied to that entire population. The rare lymphocytes whose receptor
            happens to fit are <strong>selected</strong>: they activate and divide furiously,
            roughly every 12 hours, building an army of clones. This is natural selection from
            Unit 5 running inside your body on a timescale of days: random variation first,
            selection by the environment second, amplification of the winners third.
          </p>
          <p>
            The division of labour: <strong>B cells</strong> mature into plasma cells that pump
            out <strong>antibodies</strong> — free-floating versions of their receptor that stick
            to the pathogen, gum up its machinery, and tag it for the phagocytes you met last
            lesson. <strong>Killer T cells</strong> handle the harder case: they detect your own
            cells that are already infected, and order them to self-destruct before the virus
            inside can finish replicating.
          </p>

          <h2>Why you are sick for a week</h2>
          <p>
            Selection plus expansion takes time. From first exposure it is typically{" "}
            <strong>five to seven days</strong> before antibody levels are high enough to matter,
            and during that lag the pathogen multiplies freely — that lag largely <em>is</em> the
            illness. The innate system holds the line; the adaptive system arrives like heavy
            cavalry, late but decisive.
          </p>

          <h2>Memory: the whole point</h2>
          <p>
            After victory, most of the clone army dies back — but a reserve of long-lived{" "}
            <strong>memory cells</strong> remains, sometimes for decades. On second exposure
            there is no searching and little lag: the response starts within a day, from a far
            larger base, and usually clears the pathogen before you notice symptoms. That is why
            most people get chickenpox once.
          </p>
          <div className="formula">
            first exposure: ~6 days of lag &nbsp;·&nbsp; second exposure: ~1 day
            <span className="note">the memory response is faster, higher, and usually invisible</span>
          </div>

          <h2>Vaccines: the first exposure, without the disease</h2>
          <p>
            A vaccine shows your immune system an antigen — a killed or weakened pathogen, a
            harmless fragment, or (mRNA vaccines) instructions for your own cells to build the
            fragment using Unit 2&rsquo;s protein synthesis. The adaptive system runs its full
            programme: selection, expansion, memory. What you skip is the part where a live
            pathogen multiplies unchecked for six days. When the real thing arrives, it meets a
            memory response — and the lab below shows what a difference that makes.
          </p>

          <div className="callout note">
            <span className="co-title">Friendly fire</span>
            <p>
              A system this powerful needs an off-switch for &ldquo;self&rdquo;. Lymphocytes that
              react to your own molecules are normally deleted during development; when that
              screening fails, the result is autoimmune disease. Allergies are the related error —
              a full military response to pollen, which was never a threat.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "First vs. Second Exposure",
        intro: (
          <>
            <p>One pathogen, met twice. Watch what memory does to the second round.</p>
            <ul>
              <li>Run a first infection: nearly two weeks over the sickness line while the response ramps up.</li>
              <li>Move the second exposure later. The antibodies have decayed — but memory answers in a day anyway.</li>
              <li>Switch day 0 to a vaccine: same memory, zero sick days at any point.</li>
            </ul>
          </>
        ),
        Component: ImmunityLab,
      },
      problems: [
        {
          prompt:
            "An activated B cell divides every 12 hours. Starting from one cell, how many after 5 days?",
          answer: 1024,
          unit: "cells",
          hint: "5 days = 10 divisions.",
          explain: "2¹⁰ = 1,024. Clonal expansion is exponential — which is why a few days of lag buys a real army.",
        },
        {
          prompt:
            "For a disease where each case infects 5 others (R₀ = 5), what fraction of the population must be immune to stop spread? (herd immunity threshold = 1 − 1/R₀, as a percentage)",
          answer: 80,
          unit: "%",
          hint: "1 − 1/5, then convert to percent.",
          explain:
            "1 − 1/5 = 0.8 = 80%. Above that, each case infects fewer than one other on average, and outbreaks die out.",
        },
      ],
      quiz: [
        {
          q: "How can the immune system recognise a pathogen that has never existed before?",
          choices: [
            "It analyses the pathogen's DNA first",
            "Antibodies reshape themselves to fit",
            "It pre-builds billions of lymphocytes with random receptors — some happen to fit anything that arrives",
            "It cannot — only known pathogens are fought",
          ],
          answer: 2,
          explain:
            "Random generation first, selection second. The pathogen itself picks out the few cells that fit it — no foresight required.",
        },
        {
          q: "Clonal selection resembles which process from earlier in the course?",
          choices: [
            "Osmosis",
            "Natural selection — random variation, selection by the environment, amplification of winners",
            "DNA replication",
            "The ten percent rule",
          ],
          answer: 1,
          explain:
            "It is Unit 5's algorithm on a timescale of days: the antigen 'environment' selects among randomly varied receptors, and the winners are amplified.",
        },
        {
          q: "Why does a first infection make you ill for roughly a week?",
          choices: [
            "Antibodies are toxic while they work",
            "The innate system must fail first",
            "Fever takes a week to develop",
            "Finding and expanding the few matching lymphocytes takes days, and the pathogen multiplies during the lag",
          ],
          answer: 3,
          explain:
            "The lag between exposure and a full antibody response is the illness. On re-exposure, memory cells cut that lag to about a day.",
        },
        {
          q: "What does a vaccine actually give your immune system?",
          choices: [
            "A first exposure to the antigen — selection, expansion and memory — without a multiplying pathogen",
            "Ready-made antibodies that stay forever",
            "A stronger innate response",
            "Drugs that kill the pathogen directly",
          ],
          answer: 0,
          explain:
            "The adaptive programme runs in full; only the disease is skipped. The real pathogen then meets a memory response from day one.",
        },
        {
          q: "What do killer T cells do that antibodies cannot?",
          choices: [
            "Digest bacteria in the blood",
            "Produce histamine",
            "Detect and destroy the body's own cells that are already infected",
            "Remember pathogens for longer",
          ],
          answer: 2,
          explain:
            "Antibodies work on what floats outside cells. Once a virus is inside, only a killer T cell can order the infected cell to self-destruct.",
        },
      ],
    },
  ],
};
