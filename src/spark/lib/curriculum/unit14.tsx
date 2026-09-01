import type { UnitModule } from "./types";
import { PControlLab, PidLab } from "@/spark/components/labs/labs-unit14";

export const unit14: UnitModule = {
  unit: {
    id: "u14",
    num: 14,
    title: "Control Systems",
    blurb:
      "Feedback grows up: not just holding an op-amp's gain steady, but steering ovens, drones and rockets — and the three-letter algorithm that runs most of industry.",
    track: "master",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "feedback-control",
      unitId: "u14",
      title: "Closing the Loop",
      subtitle:
        "Measure, compare, correct, repeat. Proportional control is the obvious first idea — and it fails in two beautifully instructive ways.",
      buildsOn: ["feedback", "op-amps", "night-light"],
      Theory: () => (
        <>
          <h2>Open loop vs closed loop</h2>
          <p>
            A toaster is <strong>open-loop</strong>: it runs its heater for a fixed time and
            hopes. Change the bread, the room, the mains voltage — and hope is all it has. A{" "}
            <strong>closed-loop</strong> controller instead <em>measures</em> the result,
            compares it with the goal, and corrects continuously:
          </p>
          <div className="formula">
            error = setpoint − measurement → drive = f(error)
            <span className="note">the loop: sense → compare → actuate → the world responds → sense again</span>
          </div>
          <p>
            You have built this twice without the vocabulary: the op-amp with negative feedback
            (6.2) closes a loop a million times a second to hold V₋ equal to V₊; your
            night-light (12.1) closes one twenty times a second. Control theory is the study of
            what happens in between the corrections — because in between is where the trouble
            lives.
          </p>

          <h2>Proportional control and its two failures</h2>
          <p>
            The obvious rule: push proportionally to the error — <code>drive = Kp × error</code>.
            It works! And it fails twice:
          </p>
          <ul>
            <li>
              <strong>Steady-state offset.</strong> Holding a heater above room temperature
              needs <em>nonzero</em> drive — but P-control's drive is zero when the error is
              zero. So it settles where the leftover error, times Kp, exactly sustains the
              temperature: always a little short. Raise Kp and the offset shrinks… but:
            </li>
            <li>
              <strong>Oscillation.</strong> Real systems answer late — heat takes time to travel
              from element to sensor (a <em>deadtime</em>). A high-gain controller keeps pushing
              on stale information, overshoots, slams the other way, overshoots again: the loop
              rings like your LC tank (9.1), and past a critical gain the ringing grows instead
              of dying. Feedback + delay + too much gain = an oscillator. (Sometimes on
              purpose — that's precisely how oscillators are built. In a heater, it's a defect.)
            </li>
          </ul>
          <div className="callout note">
            <span className="co-title">The tension to feel in the lab</span>
            <p>
              Low gain: sluggish and permanently short of the target. High gain: fast and
              wobbling on the edge of instability. Proportional control alone cannot give you
              both accuracy and calm — that impasse is exactly why the next lesson exists.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Stubborn Heater",
        intro: (
          <>
            <p>A heater with realistic lag and deadtime, under P-only control.</p>
            <ul>
              <li>Kp = 1: settles calmly — well short of the setpoint. Compare with the theory meter.</li>
              <li>Kp = 6: closer and wobblier. Kp = 15: a full-blown oscillator.</li>
              <li>Open the window at each gain and watch how each recovers (or doesn't).</li>
            </ul>
          </>
        ),
        Component: PControlLab,
      },
      quiz: [
        {
          q: "A purely proportional heater controller always settles below its setpoint because…",
          choices: [
            "Zero error would mean zero drive — but holding temperature needs nonzero drive",
            "Heaters are weak",
            "The sensor reads high",
            "Kp is negative",
          ],
          answer: 0,
          explain:
            "P-drive exists only while error exists. The system settles at the error whose drive exactly balances the heat loss — the famous P offset.",
        },
        {
          q: "What turns a high-gain feedback loop into an oscillator?",
          choices: [
            "Too much electrical noise",
            "Delay: the controller acts on stale measurements, overshooting each way in turn",
            "Weak batteries",
            "The setpoint being too high",
          ],
          answer: 1,
          explain: "Gain + delay = corrections that arrive too late and too strong. Past the critical gain the wobble grows instead of decaying.",
        },
        {
          q: "A toaster on a timer is an example of…",
          choices: ["Closed-loop control", "PID control", "Open-loop control", "Hysteresis"],
          answer: 2,
          explain: "It never measures the toast. Fixed action, hoped-for result — open loop.",
        },
        {
          q: "Which earlier circuit was already a closed feedback loop?",
          choices: [
            "The resistor colour-code decoder",
            "The LC tank",
            "The half-wave rectifier",
            "The op-amp amplifier holding V₋ equal to V₊",
          ],
          answer: 3,
          explain: "Negative feedback (6.2) is control theory at electronic speed: measure the output, compare, correct — continuously.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "pid",
      unitId: "u14",
      title: "PID Control",
      subtitle:
        "Add a term that remembers and a term that predicts, and the stubborn heater becomes obedient. Meet the algorithm running most of industry.",
      buildsOn: ["feedback-control", "digital-filters"],
      Theory: () => (
        <>
          <h2>Three terms, three tenses</h2>
          <p>
            The fix for proportional control&rsquo;s failures is to let the controller consider
            more than the present moment:
          </p>
          <div className="formula">
            drive = Kp·e + Ki·∫e·dt + Kd·de/dt
            <span className="note">present · past · future — the PID controller, workhorse of industry since the 1920s</span>
          </div>
          <ul>
            <li>
              <strong>P — the present.</strong> The muscle. Reacts to the error that exists right
              now.
            </li>
            <li>
              <strong>I — the past.</strong> The grudge-keeper: it accumulates error over time.
              Any persistent offset makes the integral grow until the offset is gone — this term{" "}
              <em>kills the P-controller&rsquo;s permanent shortfall</em>. (In code: two lines —
              an accumulator and a clamp, the clamp being &ldquo;anti-windup&rdquo; so a long
              saturation doesn&rsquo;t store a mountain of pent-up push.)
            </li>
            <li>
              <strong>D — the future.</strong> The damper: it reacts to how fast the error is{" "}
              <em>changing</em>, braking the approach before overshoot happens — the same job
              damping resistance did for your ringing LC tank. Its weakness: derivatives amplify
              noise, which is why real D-terms are filtered (Lesson 13.3, reporting for duty)
              and why many industrial loops run PI only.
            </li>
          </ul>

          <h2>Tuning: engineering as negotiation</h2>
          <p>
            Choosing Kp, Ki, Kd is a genuine craft. The practical amateur recipe: raise Kp until
            the response wobbles, back off a third; add Ki until the offset dies in reasonable
            time; add a pinch of Kd if overshoot needs taming. Formal methods exist
            (Ziegler–Nichols, from 1942, starts from that same critical wobble), but every
            tuning is a negotiation between speed, overshoot and calm — the control-theory
            version of the trade you&rsquo;ve met in every filter.
          </p>

          <h2>Where PID runs</h2>
          <p>
            Your car&rsquo;s cruise control, the oven that holds 180° through a roast, drone
            attitude (three nested PIDs per axis, hundreds of updates per second), 3D-printer
            hotends, chemical plants by the thousand-loop, the buck converter&rsquo;s feedback
            (10.2) — and, gloriously, it is about ten lines of MicroPython, which means your
            Pico can do all of this. The loop skeleton is your night-light&rsquo;s superloop
            with better manners.
          </p>
          <div className="callout tip">
            <span className="co-title">The master's habit</span>
            <p>
              When any regulated thing misbehaves — a wobbling drone, a thermostat that
              overshoots, a shower that alternates scald and freeze — diagnose it in PID terms:
              too much P? starving I? missing D? You now own the vocabulary of every feedback
              system on Earth.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Obedient Heater",
        intro: (
          <>
            <p>The same stubborn plant, now with all three knobs and a tuning challenge.</p>
            <ul>
              <li>Start P-only (Ki = Kd = 0): the familiar offset. Add Ki and watch the grudge-keeper close it.</li>
              <li>Restart from cold with high Kp and no Kd: overshoot. Add Kd: damped.</li>
              <li>Pass the challenge: under 2 °C overshoot, zero final error, and survive the open window.</li>
            </ul>
          </>
        ),
        Component: PidLab,
      },
      quiz: [
        {
          q: "Which PID term eliminates steady-state offset?",
          choices: ["P", "None of them", "D", "I — it accumulates error until the offset is driven to zero"],
          answer: 3,
          explain: "The integral keeps growing while any error persists, supplying the standing drive that P alone couldn't.",
        },
        {
          q: "The derivative term's job is to…",
          choices: [
            "Brake the response as it approaches the target, damping overshoot",
            "Increase the final accuracy",
            "Speed up the sensor",
            "Remove the need for a setpoint",
          ],
          answer: 0,
          explain: "It reacts to the error's rate of change — easing off before impact, like damping in your ringing LC tank.",
        },
        {
          q: "'Integral windup' is the problem of…",
          choices: [
            "Kp being set to zero",
            "The derivative amplifying noise",
            "The integral accumulating a huge backlog while the actuator is saturated, causing massive overshoot later",
            "The loop running too fast",
          ],
          answer: 2,
          explain: "During saturation the error persists and the accumulator balloons. The cure is a clamp — anti-windup, standard in every real PID.",
        },
        {
          q: "Why do many industrial loops run PI without D?",
          choices: [
            "D is patented",
            "The derivative term amplifies measurement noise",
            "D only works on motors",
            "Two letters are cheaper than three",
          ],
          answer: 1,
          explain: "Differentiating a noisy signal magnifies the noise (13.3's lesson inverted). Unless overshoot demands damping, engineers often leave D out or filter it heavily.",
        },
      ],
    },
  ],
};
