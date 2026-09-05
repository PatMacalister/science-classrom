import type { UnitModule } from "./types";
import { BumpBotLab, PwmLab } from "@/servo/components/labs/labs-unit0";

export const unit0: UnitModule = {
  unit: {
    id: "u0",
    num: 0,
    title: "The Loop",
    blurb:
      "What separates a robot from a machine is one idea: sense, think, act — around and around, fast. Meet the loop, and the signal trick that lets a computer whisper to a motor.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "sense-think-act",
      unitId: "u0",
      title: "Sense, Think, Act: What Makes a Robot",
      subtitle:
        "A drill is a machine; a thermostat is almost a robot. The difference is a loop that reads the world before pushing on it — and how often that loop runs decides everything.",
      Theory: () => (
        <>
          <h2>One loop, three verbs</h2>
          <p>
            Strip any robot to its skeleton — a vacuum, a rover, a factory arm — and the same
            three-step loop is running underneath:
          </p>
          <ul>
            <li><strong>Sense</strong> — read something about the world: a distance, an angle, a brightness.</li>
            <li><strong>Think</strong> — compare the reading to what you want and decide what to do about the difference.</li>
            <li><strong>Act</strong> — push on the world with a motor, then go straight back to step one.</li>
          </ul>
          <p>
            That last clause is the whole trick. A machine acts; a robot acts, <em>checks what
            happened</em>, and corrects. The loop is called <strong>feedback</strong>, and Unit 3
            is devoted to doing it well — but every lesson between here and there is really about
            feeding this loop better senses and stronger muscles.
          </p>

          <h2>The loop has a heartbeat</h2>
          <p>
            How often the loop runs is its <strong>loop rate</strong>, and it is a spec, not a
            detail. A thermostat deciding every few seconds is fine — rooms drift slowly. A
            two-wheeled robot balancing on the spot must sense and correct hundreds of times per
            second, because it starts falling <em>between</em> the corrections:
          </p>
          <div className="formula">
            react late → correct harder → overshoot → oscillate
            <span className="note">the universal failure of a slow loop — you will meet it again, tunable, in Unit 3</span>
          </div>
          <p>
            This is why robots keep a small, single-minded computer close to the motors. It does
            nothing clever — it just never, ever misses a beat.
          </p>

          <h2>Where the loop lives</h2>
          <p>
            In a real robot the loop is split across parts you will meet all course: sensors feed
            a <strong>microcontroller</strong> (the metronome that never misses a millisecond),
            which drives motors through power electronics; bigger thoughts — maps, plans, vision —
            live upstairs in a larger computer that talks to the metronome. The split matters:
            thinking may hesitate, but the loop may not.
          </p>

          <div className="callout note">
            <span className="co-title">Is a washing machine a robot?</span>
            <p>
              It senses (water level), decides (program step), acts (spin). Most engineers still
              say no — its loop never looks at the <em>result</em> of its actions and corrects.
              It follows a recipe. The line is fuzzy, and the useful question is never
              &ldquo;is it a robot?&rdquo; but &ldquo;<em>where is its feedback loop, and how fast?</em>&rdquo;
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Bump Bot",
        intro: (
          <>
            <p>A one-sensor robot in a corridor: it drives until its rangefinder says stop. You set the speed and the stop distance — and how often the loop runs.</p>
            <ul>
              <li>With a fast loop, it parks neatly at any speed. Now slow the loop down and watch the same settings smack the wall.</li>
              <li>Find the highest speed each loop rate can survive. That number is why balance robots run at hundreds of hertz.</li>
              <li>Set the stop distance to zero: sense–think–act becomes think-too-late.</li>
            </ul>
          </>
        ),
        Component: BumpBotLab,
      },
      quiz: [
        {
          q: "What distinguishes a robot's loop from a machine following a recipe?",
          choices: [
            "The robot reads the result of its own actions and corrects",
            "The robot has more powerful motors",
            "The robot runs a longer program",
            "The robot is connected to the internet",
          ],
          answer: 0,
          explain:
            "Sense–think–act is a circle, not a list: the sensing happens again after the acting. A recipe never checks what actually happened.",
        },
        {
          q: "A self-balancing robot needs its loop to run hundreds of times a second because…",
          choices: [
            "faster loops save battery",
            "it starts falling between corrections, so late corrections must be harder and overshoot",
            "motors only understand fast signals",
            "the sensors stop working at low rates",
          ],
          answer: 1,
          explain:
            "The world doesn't pause while the robot thinks. The slower the loop, the further the robot has fallen by the time it reacts — react late, correct hard, oscillate.",
        },
        {
          q: "Why do robots keep a small dedicated microcontroller next to the motors even when they carry a big computer?",
          choices: [
            "Small chips are more accurate",
            "The big computer has no output pins",
            "Big computers are too heavy to mount near motors",
            "The control loop must never miss a beat, and a single-minded chip guarantees that",
          ],
          answer: 3,
          explain:
            "A Linux computer might pause for a moment to do something else; a microcontroller running one loop cannot be distracted. Thinking may hesitate — the loop may not.",
        },
        {
          q: "In the sense–think–act loop, 'think' means…",
          choices: [
            "running artificial intelligence",
            "waiting for the next sensor reading",
            "comparing what is measured to what is wanted, and deciding from the difference",
            "storing the sensor data for later",
          ],
          answer: 2,
          explain:
            "The decision can be one line of code: too close? slow down. What makes it 'thinking' is that it is driven by the gap between measured and wanted.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "signals",
      unitId: "u0",
      title: "PWM: How a Computer Whispers to a Motor",
      subtitle:
        "A chip's pin knows only on and off — yet motors need anything in between. The trick is to blink faster than the motor can feel and let the average do the talking.",
      buildsOn: ["sense-think-act"],
      seeAlso: [
        {
          course: "spark",
          slug: "pwm-dimmer",
          label: { en: "Spark: PWM from the electronics side", de: "Spark: PWM von der Elektronik-Seite" },
        },
      ],
      Theory: () => (
        <>
          <h2>Digital pins, analog world</h2>
          <p>
            A microcontroller pin is a light switch: fully on (say 5 V) or fully off (0 V), nothing
            between. But the world the loop acts on is smooth — a motor wants 40% effort, a lamp
            wants half brightness. Buying a true in-between voltage costs precious hardware.
            Robotics instead uses a beautiful cheat: <strong>pulse-width modulation</strong>, PWM.
          </p>
          <p>
            Switch the pin on and off very fast, and control what <em>fraction</em> of each cycle
            is spent on. That fraction is the <strong>duty cycle</strong>:
          </p>
          <div className="formula">
            V_avg = D · V_supply
            <span className="note">duty cycle D from 0 to 1 — 30% on-time delivers 30% of the supply, on average</span>
          </div>
          <p>
            The load never notices the blinking if the blinking is fast enough. A motor&rsquo;s
            spinning mass smooths thousands of pulses per second into steady torque, the way a
            ceiling fan keeps turning between pushes. An LED does flicker — but above a few hundred
            hertz your eye averages just like the motor does.
          </p>

          <h2>Frequency and duty are different knobs</h2>
          <p>
            Two numbers describe a PWM signal, and beginners blur them at their peril. The{" "}
            <strong>duty cycle</strong> is the message — how much effort. The{" "}
            <strong>frequency</strong> is how often the message repeats — chosen once, high enough
            that the load can&rsquo;t feel individual pulses, then left alone. Change duty
            constantly; change frequency almost never.
          </p>
          <p>
            Too low a frequency and the cheat collapses: the motor growls and jerks, the LED
            strobes. Too high and the switching electronics waste power warming up. Motor drivers
            typically sit near 20 kHz — just above human hearing, so the motor doesn&rsquo;t{" "}
            <em>sing</em> its duty cycle out loud.
          </p>

          <h2>Why robotics runs on it</h2>
          <p>
            PWM is how the think-step&rsquo;s decision physically reaches the act-step: the control
            loop computes an effort, sets a duty cycle, and the motor feels an average voltage. One
            digital pin, zero extra parts, effort in a thousand shades. Every motor command in the
            rest of this course — line follower, robot arm, all of it — is at the bottom a duty
            cycle being nudged up or down.
          </p>

          <div className="callout note">
            <span className="co-title">Half voltage is not half speed under load</span>
            <p>
              PWM delivers a clean average voltage — but what the motor does with it depends on the
              fight against friction and load, which is Unit 1&rsquo;s story. The signal is honest;
              the mechanics negotiate.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Duty Dial",
        intro: (
          <>
            <p>One PWM channel, three victims: an oscilloscope trace, an LED and a motor. Turn the two knobs and watch who cares about which.</p>
            <ul>
              <li>Sweep the duty cycle and watch the average voltage track it exactly.</li>
              <li>Drop the frequency below ~50 Hz: the LED starts strobing and the motor speed gets lumpy — same duty, broken illusion.</li>
              <li>Find the lowest frequency where the motor runs smooth. Notice the LED needs more than the motor.</li>
            </ul>
          </>
        ),
        Component: PwmLab,
      },
      problems: [
        {
          prompt: "A 12 V supply is PWM-switched at 25% duty cycle. What is the average voltage, in volts?",
          answer: 3,
          unit: "V",
          hint: "V_avg = D · V_supply.",
          explain: "0.25 × 12 = 3 V. The load feels a quarter of the supply because the pin is on a quarter of the time.",
        },
        {
          prompt:
            "A PWM signal runs at 20 kHz. How long is one full cycle, in microseconds? (T = 1/f)",
          answer: 50,
          unit: "µs",
          tolerancePct: 2,
          hint: "1 / 20,000 s, then convert to microseconds.",
          explain: "1/20,000 = 0.00005 s = 50 µs. At 40% duty the pin is on for 20 of those microseconds, off for 30.",
        },
      ],
      quiz: [
        {
          q: "What does a PWM signal's duty cycle control?",
          choices: [
            "How often the signal repeats each second",
            "The supply voltage of the chip",
            "The colour of the LED",
            "The fraction of each cycle the pin spends on — and so the average voltage",
          ],
          answer: 3,
          explain:
            "Duty is the message: 30% on-time means 30% of the supply on average. Frequency just repeats the message often enough to blur.",
        },
        {
          q: "Why doesn't a motor jerk forward and stop thousands of times a second under PWM?",
          choices: [
            "Its spinning mass smooths the fast pulses into steady motion",
            "The motor driver converts PWM to a true steady voltage first",
            "Motors only respond to the peak voltage",
            "It does, but too quietly to notice",
          ],
          answer: 0,
          explain:
            "Inertia is the low-pass filter: like a fan coasting between pushes, the rotor can't follow pulses that fast, so it rides the average.",
        },
        {
          q: "You lower a motor's PWM frequency from 20 kHz to 30 Hz at the same 50% duty. What changes?",
          choices: [
            "The motor runs at half the speed",
            "The illusion breaks — the motor growls and jerks because it can feel individual pulses",
            "Nothing — average voltage is unchanged",
            "The motor runs faster because pulses are longer",
          ],
          answer: 1,
          explain:
            "The average is indeed the same — but averages only rule when the load can't resolve single pulses. At 30 Hz the rotor speeds up and slows down inside every cycle.",
        },
        {
          q: "Why do motor drivers often switch at about 20 kHz, specifically?",
          choices: [
            "It is the fastest a microcontroller can switch",
            "Below that, motors overheat",
            "It sits just above human hearing, so the motor doesn't audibly whine at its switching frequency",
            "It matches the mains frequency",
          ],
          answer: 2,
          explain:
            "A motor is also a little loudspeaker: it vibrates at the PWM frequency. Park that frequency above ~20 kHz and the whine is there — just not for your ears.",
        },
      ],
    },
  ],
};
