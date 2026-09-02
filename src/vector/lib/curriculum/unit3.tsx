import type { UnitModule } from "./types";
import { PendulumLab } from "@/vector/components/labs/labs-unit3";

export const unit3: UnitModule = {
  unit: {
    id: "u3",
    num: 3,
    title: "The Backyard Capstone",
    blurb:
      "Three units of mechanics, cashed in: measure the Earth's gravitational acceleration with a shoelace, a weight and a phone — to within a percent or two.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "measure-g",
      unitId: "u3",
      title: "Capstone: Measure g with a String",
      subtitle:
        "A pendulum's swing time depends on just two things — its length and the planet it hangs on. Time it, and the planet is the unknown you solve for.",
      buildsOn: ["acceleration", "energy"],
      Theory: () => (
        <>
          <h2>Why a pendulum knows g</h2>
          <p>
            A swinging weight is gravity&rsquo;s metronome. Pull it aside and gravity hauls it
            back, overshooting through the middle, forever trading height for speed — Unit
            2&rsquo;s energy swap on a string. How <em>quickly</em> each swing completes depends
            on how hard gravity pulls, and — remarkably — on almost nothing else:
          </p>
          <div className="formula">
            T = 2π·√(L/g)
            <span className="note">T: time for one full back-and-forth · L: string length · g: what you’re after</span>
          </div>
          <p>
            Not in the formula: the <strong>mass</strong> (heavier bobs are pulled harder but
            are harder to move — the same cancellation that makes hammer and feather fall
            together) and, for small swings, the <strong>amplitude</strong> (wider swings travel
            farther but faster; below ~15° the trade balances to within a fraction of a
            percent). Galileo reportedly noticed this in a swinging cathedral lamp, timing it
            against his pulse.
          </p>

          <h2>Rearranged, it is a g-meter</h2>
          <div className="formula">
            g = 4π²·L / T²
            <span className="note">measure a length and a time — get a planet’s gravity</span>
          </div>
          <p>
            The T² is your accuracy lever and your accuracy trap at once: timing errors get
            squared. The fix is old and beautiful — <strong>time twenty swings, not one</strong>,
            and divide by twenty. Your ±0.2 s reaction error stays ±0.2 s, but is now spread
            over ~28 s of measurement: a one-percent error instead of twenty.
          </p>

          <h2>What you need</h2>
          <ul>
            <li>A <strong>string</strong>, 1 m or longer — thin and non-stretchy (shoelace, kitchen twine)</li>
            <li>A small <strong>heavy weight</strong> — a nut, a padlock, a ring of keys</li>
            <li>A <strong>tape measure</strong> and your phone&rsquo;s <strong>stopwatch</strong></li>
            <li>Somewhere to hang it: a door frame, a shelf edge, a broom across two chairs</li>
          </ul>

          <h2>The technique that makes it accurate</h2>
          <ul>
            <li>Measure L from the pivot to the <em>centre</em> of the weight — the largest single error source.</li>
            <li>Keep the swing narrow: a hand-width of displacement on a metre of string.</li>
            <li>Start counting at &ldquo;zero&rdquo; (not one!) as it passes an extreme, and time 20 full periods.</li>
            <li>Repeat three times; if a count disagrees wildly, you miscounted — drop it and redo.</li>
          </ul>
          <p>
            Done with care, a shoelace and a phone deliver g to within one or two percent of
            9.81 m/s² — a measurement Galileo would have traded years for, performed before
            breakfast.
          </p>

          <div className="callout note">
            <span className="co-title">This was the world’s clock</span>
            <p>
              From Huygens (1656) to the 1930s, the best clocks on Earth were pendulums — the
              formula you are using kept trains scheduled and longitude found for three
              centuries. And because T depends on g, a pendulum clock taken up a mountain runs
              measurably slow: your experiment, run in reverse, is a gravity survey.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Digital Twin: The Pendulum",
        intro: (
          <>
            <p>Rehearse the experiment before doing it for real — and see why the rules matter.</p>
            <ul>
              <li>Time 20 swings with the on-screen stopwatch, then check your g against the slider’s true value.</li>
              <li>Push the amplitude past 40° and watch the small-angle formula start to lie.</li>
              <li>Set lunar gravity: same string, swings six times… well, √6 times slower. T² sees it.</li>
            </ul>
          </>
        ),
        Component: PendulumLab,
      },
      problems: [
        {
          prompt:
            "Your 1.00 m pendulum completes 20 swings in 40.1 s. First: what is the period T, in seconds?",
          answer: 2.005,
          unit: "s",
          tolerancePct: 1,
          hint: "Divide by the count.",
          explain: "40.1 ÷ 20 = 2.005 s — and your timing error just got divided by twenty as well.",
        },
        {
          prompt: "Now compute g = 4π²·L/T² from L = 1.00 m and T = 2.005 s, in m/s².",
          answer: 9.82,
          unit: "m/s²",
          tolerancePct: 2,
          hint: "4π² ≈ 39.48.",
          explain: "39.48 × 1.00 / 4.02 ≈ 9.82 m/s² — within half a percent of the textbook 9.81.",
        },
        {
          prompt:
            "A pendulum on the Moon (g = 1.62 m/s²) has L = 1.00 m. What is its period, in seconds?",
          answer: 4.94,
          unit: "s",
          tolerancePct: 2,
          hint: "T = 2π√(L/g).",
          explain: "T = 2π√(1/1.62) ≈ 4.94 s — the lazy swing of a world with a sixth of the pull.",
        },
      ],
      checklist: [
        { id: "rig", text: "Hung a small heavy weight on a metre or more of non-stretch string, free to swing without hitting anything." },
        { id: "length", text: "Measured L from the pivot to the centre of the weight, to the nearest few millimetres — and wrote it down." },
        { id: "predict", text: "Predicted the period first with T = 2π√(L/g) using g = 9.81. The point is to know the answer before nature confirms it." },
        { id: "narrow", text: "Pulled it aside only a hand-width — small angles are what the formula is honest about." },
        { id: "twenty", text: "Timed 20 full back-and-forth swings, starting the count at ZERO as it passed an extreme." },
        { id: "repeat", text: "Repeated the 20-swing timing three times and averaged; redid any count that disagreed wildly." },
        { id: "compute", text: "Computed g = 4π²L/T² from the average — by hand, calculator allowed, no lab needed." },
        { id: "compare", text: "Compared with 9.81 m/s² and got within a few percent — and can name the biggest remaining error source." },
        { id: "moon", text: "Bonus thought experiment answered: how would the same rig behave on the Moon, and why?" },
      ],
    },
  ],
};
