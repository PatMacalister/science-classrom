import type { UnitModule } from "./types";
import { TeachLab, SimGapLab } from "@/servo/components/labs/labs-unit6";

export const unit6: UnitModule = {
  unit: {
    id: "u6",
    num: 6,
    title: "Robot School",
    blurb:
      "The frontier, honestly told: robots that learn tasks from your demonstrations instead of your code — and the stubborn gap between the simulator where they practise and the world where they must perform.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "teach-by-demo",
      unitId: "u6",
      title: "Capstone: Teach the Arm by Hand",
      subtitle:
        "No angles, no gains, no code: guide the arm through the task a few dozen times and let a policy learn the pattern. What you curate is no longer software — it is a dataset.",
      buildsOn: ["inverse-kinematics", "pid"],
      Theory: () => (
        <>
          <h2>Programming by showing</h2>
          <p>
            Everything so far had a human translate the task into mathematics — setpoints, gains,
            waypoints. <strong>Imitation learning</strong> removes the translator: guide the
            robot&rsquo;s own body through the task (grab the arm, do the motion — called{" "}
            <em>teleoperation</em> when done through a twin controller), while it records what it
            sensed and what its joints did. Do that a few dozen times. Then train a{" "}
            <strong>policy</strong> — a function from sensed situation to action — to reproduce
            the pattern:
          </p>
          <div className="formula">
            demos: (situation → action)… · policy: new situation → most similar demos’ action
            <span className="note">behaviour cloning — the simplest honest recipe: act as the demonstrations acted</span>
          </div>
          <p>
            The humble version is nearest-neighbour: find the recorded situations most like this
            one, do what they did, blended. The frontier versions are deep networks trained on
            the same kind of data, with the same soul. Between them lies mostly capacity, not
            concept.
          </p>

          <h2>The dataset is the program</h2>
          <p>
            The consequences invert habits. The policy is only defined where demonstrations{" "}
            <em>were</em>: teach only pickups from the left and the right side is terra
            incognita — the policy extrapolates, badly, with full confidence. Sloppy
            demonstrations train sloppy behaviour; ten careful, varied demos beat fifty rushed
            ones. Debugging changes character entirely: the fix for a failing region is rarely
            code — it is <strong>more demonstrations, there</strong>. Coverage, variety and care
            replace cleverness as the engineering virtues.
          </p>

          <h2>Measure it like an engineer</h2>
          <p>
            A learned policy has no spec sheet — it has a <strong>success rate</strong>, and you
            owe it an honest one: test on <em>fresh</em> targets it never saw (testing on the
            demos themselves only measures memory), count successes, note <em>where</em> the
            failures cluster, teach there, retrain, measure again. That loop — measure, find the
            gap, fill it with data — is the daily craft of the field, and it is exactly what this
            capstone has you do.
          </p>

          <div className="callout note">
            <span className="co-title">Why this took over robotics</span>
            <p>
              Decades of hand-coded grasp geometry lost, in the span of a few years, to
              &ldquo;record 50 demos and train&rdquo; — because contact-rich tasks (folding,
              inserting, wiping) resist equations but yield to examples. The open frameworks
              driving hobby-arm learning today are this lesson&rsquo;s recipe with bigger
              networks: teleoperate, record, train, deploy.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Teaching Studio",
        intro: (
          <>
            <p>The two-link arm, a spawn zone for targets, and a recorder. Drag the arm through pickups to record demos; flip to policy mode and let it try fresh targets alone.</p>
            <ul>
              <li>Record five quick demos on the left side only, then test everywhere — watch the right side fail with perfect confidence.</li>
              <li>Add demos where the failures cluster; retrain; re-measure. The success meter is your judge.</li>
              <li>The checklist is the capstone: work it top to bottom.</li>
            </ul>
          </>
        ),
        Component: TeachLab,
      },
      checklist: [
        { id: "first-demos", text: "Record five demonstrations and run the policy on ten fresh targets — note your baseline success rate." },
        { id: "find-gap", text: "Identify where the failures cluster (the coverage map shows demo-poor regions)." },
        { id: "close-gap", text: "Record five more demos aimed at the weak region, retrain, and beat your baseline." },
        { id: "eighty", text: "Reach an 80% success rate on fresh targets across the whole spawn zone." },
        { id: "spoil", text: "Deliberately record three sloppy demos and watch the rate drop — then delete them. Data quality is real; you have now measured it." },
      ],
    },

    /* ================================================================ */
    {
      slug: "sim-to-real",
      unitId: "u6",
      title: "Sim-to-Real: The Gap Between Practice and the World",
      subtitle:
        "Simulation grants a million cheap rehearsals — of a world subtly wrong in a hundred ways. The fix is deliberately sloppy practice: vary the wrongness until only robustness survives.",
      buildsOn: ["teach-by-demo", "pid"],
      Theory: () => (
        <>
          <h2>Why robots rehearse in software</h2>
          <p>
            Real-robot practice is expensive in every currency: hours per attempt, wear per
            fall, one robot per experimenter. A physics simulation runs thousands of attempts per
            minute, in parallel, for free, and a crashed simulated robot is a resurrected one at
            the next reset. Modern locomotion and manipulation training happens overwhelmingly in
            simulation — there is no other way to afford the millions of trials learning needs.
          </p>

          <h2>The gap</h2>
          <p>
            But the simulator is a model, and models are wrong in detail: real friction differs
            from modelled friction, real motors lag and sag, the real chassis flexes, sensor
            noise has texture no random-number generator quite matches. A controller tuned to
            perfection in simulation has effectively memorised the simulator&rsquo;s particular
            lies — deployed on hardware, it meets different lies and stumbles. That performance
            cliff is the <strong>sim-to-real gap</strong>, and closing it is a discipline of its
            own.
          </p>

          <h2>Domain randomization: sloppy on purpose</h2>
          <p>
            The counterintuitive cure: make the simulation <em>less</em> consistent, not more
            accurate. Each training episode, randomly perturb the physics — friction ±30%, mass
            ±20%, sensor noise doubled, motor strength wobbled:
          </p>
          <div className="formula">
            train across many wrong worlds → survive the one real world
            <span className="note">domain randomization — the real world becomes ‘just another sample’ from the training distribution</span>
          </div>
          <p>
            A policy that must succeed across a thousand differently-wrong worlds cannot lean on
            any single world&rsquo;s quirks; it is forced to find strategies that work{" "}
            <em>because they are robust</em>, not because they exploit a simulator&rsquo;s
            particular fiction. When the real world turns out to be one more sample from the
            spread, the policy shrugs and performs. The trade is honest: peak performance in any
            one world drops; performance in the unknown world — the only one that matters —
            soars.
          </p>

          <h2>The whole course, in one loop</h2>
          <p>
            Notice what closed the gap: not a truer model, but tolerance of model error —
            the same humility that made the complementary filter work (Unit 2), that made
            feedback beat open-loop (Unit 3), that inflated obstacles rather than trusting
            perfect paths (Unit 5). Robotics&rsquo; deepest habit is designing for being
            somewhat wrong. Machines built on that habit are the ones that keep working when the
            world declines to match the datasheet — which it always, always does.
          </p>

          <div className="callout note">
            <span className="co-title">A famous hand</span>
            <p>
              The result that made this canon: a robot hand trained purely in randomized
              simulation — gravity, friction, even visual appearance scrambled per episode —
              solved a Rubik&rsquo;s cube one-handed on the first hardware deployment. The
              simulator was never right; it was <em>variously wrong</em>, and that was enough.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Reality Check",
        intro: (
          <>
            <p>Tune a cart controller in simulation, then hit DEPLOY: it runs on a ‘real’ cart whose hidden physics differ. A randomization slider varies the training worlds.</p>
            <ul>
              <li>Randomization at zero: tune to a perfect sim score, deploy — and watch the score cliff. You have met the gap.</li>
              <li>Raise randomization and retune: sim score drops, deployed score climbs. Find the sweet spot.</li>
              <li>Hit RE-ROLL REALITY a few times at your best setting — robustness means the deployed score stops caring which reality you get.</li>
            </ul>
          </>
        ),
        Component: SimGapLab,
      },
      quiz: [
        {
          q: "Robot learning leans on simulation chiefly because…",
          choices: [
            "simulated robots move more precisely",
            "learning needs millions of trials, and only simulation makes attempts cheap, fast, parallel and crash-proof",
            "real sensors cannot record training data",
            "simulation removes the need for safety testing",
          ],
          answer: 1,
          explain:
            "Hours per real attempt versus thousands of simulated attempts per minute. The economics of trial-and-error learning simply don't close on hardware alone.",
        },
        {
          q: "A controller that scores perfectly in simulation stumbles on the real robot because it has…",
          choices: [
            "too little computing power on board",
            "worn out the motors",
            "effectively memorised the simulator's particular inaccuracies, which reality doesn't share",
            "been trained on too many trials",
          ],
          answer: 2,
          explain:
            "Optimising hard against one model means exploiting that model's quirks. Reality has different quirks — the cliff between them is the sim-to-real gap.",
        },
        {
          q: "Domain randomization closes the gap by…",
          choices: [
            "measuring the real robot's parameters and copying them into the simulator",
            "slowing the robot down until physics stops mattering",
            "running the simulation at higher resolution",
            "varying the simulated physics every episode, so only strategies robust across many wrong worlds survive training",
          ],
          answer: 3,
          explain:
            "If every rehearsal happens in a differently-wrong world, no single world's lies are learnable. The real world then arrives as just another sample from the spread.",
        },
        {
          q: "The honest cost of domain randomization is…",
          choices: [
            "lower peak performance in any single world, traded for performance in the unknown real one",
            "longer wall-clock training with no other downside",
            "it only works for wheeled robots",
            "the policy no longer runs in real time",
          ],
          answer: 0,
          explain:
            "A policy robust across a thousand worlds can't also be perfectly tuned to one. You give up the memorisation bonus — which was fiction anyway — for transfer, which is the point.",
        },
      ],
    },
  ],
};
