import type { UnitModule } from "./types";
import { BangBangLab, PidLab, LineFollowerLab } from "@/servo/components/labs/labs-unit3";

export const unit3: UnitModule = {
  unit: {
    id: "u3",
    num: 3,
    title: "Control",
    blurb:
      "The theory of the loop itself: why on/off control must oscillate, how three little terms tame it — and a capstone where you tune a line follower from lurching to lapping.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "feedback",
      unitId: "u3",
      title: "Feedback: Why On/Off Must Wobble",
      subtitle:
        "The simplest controller has two settings and no shame: full power below the target, none above. It works — thermostats prove it daily — and it can never, ever hold still.",
      buildsOn: ["sense-think-act", "signals"],
      seeAlso: [
        {
          course: "spark",
          slug: "feedback-control",
          label: { en: "Spark: feedback in circuits", de: "Spark: Rückkopplung in Schaltungen" },
        },
      ],
      Theory: () => (
        <>
          <h2>Error: the one number that matters</h2>
          <p>
            Every controller in this unit lives on a single quantity — the gap between wanted and
            measured:
          </p>
          <div className="formula">
            e = setpoint − measured
            <span className="note">the error — control is the art of spending effort to shrink this number</span>
          </div>
          <p>
            The <em>setpoint</em> is the wish (22 °C, 50 cm/s, the line&rsquo;s centre); the
            measurement is Unit 2&rsquo;s hard-won truth. Everything a controller does, it does by
            looking at e.
          </p>

          <h2>Bang-bang: two settings, no shame</h2>
          <p>
            The simplest possible policy: error positive → full power; error negative → off.
            This is <strong>bang-bang control</strong>, and it runs your home: thermostats,
            ovens, kettles, fridges. It is robust, needs no tuning, and has one structural
            signature — <strong>it can never rest</strong>. Full effort overshoots the target;
            zero effort undershoots; the system saws forever between the two. The oscillation is
            not a bug to be fixed; it is the shape of the policy.
          </p>
          <p>
            Worse, a naive bang-bang chatters: near the setpoint, the tiniest sensor noise
            flips it on-off-on-off many times a second — relays click themselves to death.
            The practical patch is <strong>hysteresis</strong>: switch on below 21.5°, off above
            22.5°. The one-degree gap sets a calm, honest rhythm — wider gap, slower and deeper
            swings; narrower, faster and shallower, until noise takes over again.
          </p>

          <h2>The missing idea: proportion</h2>
          <p>
            The deep flaw is that bang-bang cannot answer &ldquo;how wrong am I?&rdquo; — only
            &ldquo;am I wrong?&rdquo;. Ten degrees below target and half a degree below get the
            same full blast. The obvious refinement — <em>push proportionally to the size of the
            error</em> — is next lesson, and it changes the game so much it earns three letters of
            its own. But do not condescend to bang-bang: where the actuator only <em>has</em> two
            settings (a heater relay, a valve), it is not the naive choice — it is the only one.
          </p>

          <div className="callout note">
            <span className="co-title">You bang-bang, too</span>
            <p>
              Steer a shopping trolley with your eyes closed, opening them once a second, and you
              will correct in over-large jerks — sense rarely, act coarsely, oscillate. The lab
              lets you feel exactly this with a fan-driven cart, and the wobble you cannot remove
              is this lesson&rsquo;s entire point.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Thermostat Cart",
        intro: (
          <>
            <p>A fan-driven cart chasing a target line under bang-bang control — with a hysteresis knob and a noise knob.</p>
            <ul>
              <li>Zero hysteresis: watch the fan chatter madly near the target as noise flips the decision.</li>
              <li>Widen the hysteresis band: chattering stops, replaced by a calm, deep sawtooth. Measure its amplitude — it tracks the band width.</li>
              <li>Try to make the cart sit still on the line. Report your best oscillation amplitude; zero is not on the menu.</li>
            </ul>
          </>
        ),
        Component: BangBangLab,
      },
      quiz: [
        {
          q: "A bang-bang controller can never hold its target steadily because…",
          choices: [
            "its sensor is too noisy",
            "its only tools are overshooting effort and undershooting rest — so it must saw between them",
            "it runs too slowly",
            "the setpoint keeps changing",
          ],
          answer: 1,
          explain:
            "Full power carries the system past the target; zero power lets it fall back. With no in-between setting, oscillation is structural, not accidental.",
        },
        {
          q: "Hysteresis fixes which specific problem?",
          choices: [
            "Overshoot on large errors",
            "Slow warm-up",
            "Rapid chattering near the setpoint, where tiny noise flips the decision back and forth",
            "Sensor drift",
          ],
          answer: 2,
          explain:
            "Separate on- and off-thresholds mean noise inside the band flips nothing. The price: a deliberate, calm oscillation the width of the band.",
        },
        {
          q: "Widening the hysteresis band makes the oscillation…",
          choices: ["slower and deeper", "faster and shallower", "disappear", "chaotic"],
          answer: 0,
          explain:
            "The system must traverse the whole band before the controller reacts: longer swings, longer periods. Narrow the band and you speed toward chatter again.",
        },
        {
          q: "The structural blindness of bang-bang control is that it cannot sense…",
          choices: [
            "which direction the error points",
            "the sign of the setpoint",
            "the loop rate",
            "how large the error is — half a degree and ten degrees get the same full blast",
          ],
          answer: 3,
          explain:
            "It answers 'am I wrong?' but never 'how wrong?'. Making effort proportional to error size is exactly the next lesson's upgrade.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "pid",
      unitId: "u3",
      title: "PID: Three Letters That Run the World",
      subtitle:
        "Push proportionally to the error, remember what refuses to close, brake before you arrive. Present, past, future — every factory floor hums with this one line.",
      buildsOn: ["feedback"],
      seeAlso: [
        {
          course: "spark",
          slug: "pid",
          label: { en: "Spark: PID on real hardware", de: "Spark: PID auf echter Hardware" },
        },
      ],
      Theory: () => (
        <>
          <h2>P: push like you mean it, proportionally</h2>
          <p>
            Replace bang-bang&rsquo;s two settings with a dial: effort proportional to error,
            u = Kp·e. Far from the target, push hard; close, ease off. One gain to tune, and the
            behaviour is already recognisably civilised — mostly. Two failures remain. Set Kp
            timidly and the system crawls; worse, a steady disturbance (gravity on an arm, a hill
            under a cart) leaves a permanent <strong>steady-state error</strong> — P needs some
            error to output any effort at all, so it settles where push equals pull, short of the
            target. Set Kp fiercely and you re-invent bang-bang with extra steps: overshoot,
            oscillation.
          </p>

          <h2>I: the grudge. D: the brake</h2>
          <p>
            The <strong>integral</strong> term accumulates error over time — a grudge account.
            That stubborn last half-degree that P alone would tolerate forever? It builds in the
            sum until the controller pushes it away. I erases steady-state error. Its dark side:
            during long errors the grudge overfills (<em>windup</em>) and spends itself as a
            wild overshoot on arrival.
          </p>
          <p>
            The <strong>derivative</strong> term watches the error&rsquo;s <em>speed</em>.
            Closing fast on the target? D pushes against the rush — a brake applied before
            arrival, which is exactly what kills overshoot and calms oscillation. Its dark side:
            differentiating a noisy sensor amplifies every jitter into effort, so real D terms are
            always filtered, and often small.
          </p>
          <div className="formula">
            u = Kp·e + Ki·∫e·dt + Kd·de/dt
            <span className="note">present, past, future — one line, most of industrial civilisation</span>
          </div>

          <h2>Tuning without tears</h2>
          <p>
            The bench recipe, good enough for nearly everything: zero out I and D. Raise Kp until
            the response oscillates, then back off a third. Add a whisper of D to squash the
            remaining overshoot. Add just enough I to close the last stubborn gap — and no more.
            Tune in that order, one knob at a time, watching a plot. You will do exactly this in
            the lab, and again — under race conditions — in the capstone.
          </p>

          <div className="callout note">
            <span className="co-title">Why settle for a 1940s controller?</span>
            <p>
              Fancier control exists and Unit 6 gestures at it. But PID needs no model of the
              world — only the error signal — and that ignorance is a superpower: it works on
              ovens and quadcopters alike, unchanged. Estimates put PID in the vast majority of
              all industrial loops. Learn its three temperaments and you can talk to most of the
              machines on Earth.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Tuning Bench",
        intro: (
          <>
            <p>A weighted arm commanded to hold an angle — gravity is the steady disturbance. Three gain sliders, a live plot, and readouts for overshoot, settling and the leftover gap.</p>
            <ul>
              <li>P only: raise Kp till it oscillates, back off. Note the arm hangs stubbornly below the target — the steady-state error.</li>
              <li>Add I and watch the last gap close… then set Ki huge and watch windup fling the arm past the mark.</li>
              <li>Add D to calm the arrival. Then follow the full recipe and log your best settling time.</li>
            </ul>
          </>
        ),
        Component: PidLab,
      },
      problems: [
        {
          prompt:
            "A P-controller with Kp = 4 sees an error of 2.5 (target 10, measured 7.5). What effort u does it output?",
          answer: 10,
          unit: "",
          hint: "u = Kp · e.",
          explain: "4 × 2.5 = 10 units of effort. Double the error would mean double the push — that proportionality is the entire P idea.",
        },
        {
          prompt:
            "That arm settles where the P-push equals gravity's pull of 6 units. With Kp = 4, how large is the steady-state error it settles at?",
          answer: 1.5,
          unit: "",
          tolerancePct: 2,
          hint: "Solve Kp · e = disturbance for e.",
          explain: "e = 6/4 = 1.5. P needs error to produce effort, so it parks exactly where push balances pull — short of the target. This is the gap the I term exists to erase.",
        },
      ],
      quiz: [
        {
          q: "Why does a pure P-controller leave a steady-state error against gravity?",
          choices: [
            "It outputs effort only in proportion to error — zero error would mean zero effort, so it must settle where push balances pull",
            "Its loop runs too slowly",
            "Gravity changes the setpoint",
            "The sensor saturates",
          ],
          answer: 0,
          explain:
            "Holding position against a constant pull requires constant effort, and P can only fund effort with error. It parks at e = disturbance/Kp.",
        },
        {
          q: "The integral term's job and its characteristic failure are…",
          choices: [
            "predicting the future; lag",
            "erasing steady-state error by accumulating it; windup overshoot after long errors",
            "damping oscillation; noise amplification",
            "speeding response; steady-state error",
          ],
          answer: 1,
          explain:
            "The grudge account closes gaps P would tolerate forever — and overfills during long errors, spending itself as overshoot. Anti-windup logic exists for exactly this.",
        },
        {
          q: "The derivative term reduces overshoot because it…",
          choices: [
            "increases the total effort",
            "resets the integral",
            "pushes against rapid error change — braking the approach before arrival",
            "filters the sensor signal",
          ],
          answer: 2,
          explain:
            "D reads the closing speed and leans against it, like braking before a stop sign instead of at it. That anticipation is what calms the arrival.",
        },
        {
          q: "The sensible tuning order on the bench is…",
          choices: [
            "I first, then P, then D",
            "all three simultaneously by trial and error",
            "D first to stabilise, then I, then P",
            "P up to the edge of oscillation and back off; a little D against overshoot; just enough I for the last gap",
          ],
          answer: 3,
          explain:
            "One knob at a time, each fixing the specific failure the previous one left: P for muscle, D for manners, I for the final centimetre.",
        },
        {
          q: "Why is the D term always filtered on real robots?",
          choices: [
            "To save CPU cycles",
            "Differentiation amplifies sensor noise — every jitter becomes a spike of effort",
            "Because Kd must stay below Kp",
            "To prevent integral windup",
          ],
          answer: 1,
          explain:
            "The derivative of a jittery signal is jitter, magnified. Unfiltered D turns measurement noise straight into motor chatter.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "line-follower",
      unitId: "u3",
      title: "Capstone: Tune the Line Follower",
      subtitle:
        "Everything so far on one small robot: sensors report the line, PWM drives the wheels, and your gains decide between lurching, wobbling and one clean fast lap.",
      buildsOn: ["pid", "signals", "dc-motors"],
      seeAlso: [
        {
          course: "spark",
          slug: "line-follower",
          label: { en: "Spark: building the hardware itself", de: "Spark: der Bau der Hardware selbst" },
        },
      ],
      Theory: () => (
        <>
          <h2>The classic first robot, and why</h2>
          <p>
            A line follower is a robotics degree in miniature: reflectance sensors under the nose
            report where a dark line lies (sense), a controller turns that into a steering
            decision (think), and two PWM duty cycles steer by wheel-speed difference (act) —
            around again, hundreds of times a second. Every part is one you now know by name.
          </p>

          <h2>From five sensors to one error</h2>
          <p>
            The sensor array yields one number: the line&rsquo;s position under the robot, from
            −2 (far left) to +2 (far right). Centre reads zero — and zero is the setpoint. The
            whole seeing-problem compresses into the error e, and steering becomes last
            lesson&rsquo;s formula:
          </p>
          <div className="formula">
            steer = Kp·e + Kd·de/dt
            <span className="note">left wheel slows by steer, right wheel speeds by it — PD, no I: a moving robot carries no steady gravity-like pull</span>
          </div>
          <p>
            Why no integral? A line follower rarely suffers constant one-sided disturbance — its
            error swings through zero constantly — so the grudge account would mostly collect
            noise and windup. Real racers run PD. (If one wheel were weaker than the other,{" "}
            <em>that</em> would be a steady pull, and a small I would earn its keep: know the
            rule, then know when you&rsquo;re in the exception.)
          </p>

          <h2>Speed is the difficulty dial</h2>
          <p>
            At crawling pace, almost any Kp follows any curve. Raise the speed and every sin gets
            expensive: corners arrive faster than the loop corrects, P-only tuning oscillates
            into oblivion, and the D term stops being optional. The capstone is exactly this
            climb: tune clean at low speed, then raise the pace and re-earn stability with better
            gains. Your lap time and off-line count are the honest judges.
          </p>

          <div className="callout note">
            <span className="co-title">This transfers whole</span>
            <p>
              Swap &ldquo;line position&rdquo; for &ldquo;heading to waypoint&rdquo; and this
              exact structure drives warehouse robots down aisles. Tune this well and you have
              tuned most of mobile robotics&rsquo; inner loop once already.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Racing Line",
        intro: (
          <>
            <p>A top-down track with straights, sweepers and one hairpin. Sliders for speed, Kp and Kd; meters for lap time, worst error and departures.</p>
            <ul>
              <li>Start slow, Kd = 0: find a Kp that laps cleanly. It works because the sensor bar rides ahead of the axle — free damping at crawling speed. Raise speed and watch that gift erode.</li>
              <li>Bring in Kd and re-tame it. Push speed again. Repeat — this ladder is the whole capstone.</li>
              <li>The checklist below is your race stewards: work through it and the lesson completes.</li>
            </ul>
          </>
        ),
        Component: LineFollowerLab,
      },
      checklist: [
        { id: "clean-lap", text: "Complete one full lap with zero line departures at any speed — your baseline tune." },
        { id: "oscillate", text: "Raise speed until the robot visibly oscillates around the line, then note the failing Kp — you have found P-only's ceiling." },
        { id: "pd-lap", text: "Add derivative gain and complete a clean lap at a speed where P-only failed." },
        { id: "fast-lap", text: "Set a clean-lap time under 12 seconds — tune, don't hope." },
        { id: "explain", text: "Say out loud, in one sentence each, what raising Kp did and what raising Kd did. If you can't, re-run the ladder." },
      ],
    },
  ],
};
