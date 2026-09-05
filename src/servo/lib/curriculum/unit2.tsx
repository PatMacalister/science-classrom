import type { UnitModule } from "./types";
import { EchoLab, DriftLab, FilterLab } from "@/servo/components/labs/labs-unit2";

export const unit2: UnitModule = {
  unit: {
    id: "u2",
    num: 2,
    title: "Senses & Estimation",
    blurb:
      "Sensors never hand you the truth — they hand you noisy, drifting, cone-shaped hints. The craft is squeezing one honest number out of two dishonest ones.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "rangefinders",
      unitId: "u2",
      title: "Rangefinders: Distance by Stopwatch",
      subtitle:
        "Ultrasonic and laser rangefinders play the same trick — shout, listen, halve the round trip. The differences that matter are the width of the shout and what the wall is made of.",
      buildsOn: ["sense-think-act"],
      seeAlso: [
        {
          course: "vector",
          slug: "sound",
          label: { en: "Vector: the speed of sound, measured by echo", de: "Vector: die Schallgeschwindigkeit, per Echo gemessen" },
        },
      ],
      Theory: () => (
        <>
          <h2>The stopwatch trick</h2>
          <p>
            Send a pulse, start a timer, catch the reflection, stop. The pulse travelled out{" "}
            <em>and back</em>, so:
          </p>
          <div className="formula">
            d = v · t / 2
            <span className="note">half the round trip — forget the ÷2 and every wall is twice as far as it is</span>
          </div>
          <p>
            An <strong>ultrasonic</strong> ranger does it with a chirp of sound at v ≈ 343 m/s:
            a wall 1 m away answers in about 6 ms — leisurely time for a microcontroller. A{" "}
            <strong>time-of-flight</strong> sensor does it with light at 300,000,000 m/s, where the
            same wall answers in 6.7 <em>nanoseconds</em> — which is why ToF sensors need clever
            timing silicon, and why they cost more.
          </p>

          <h2>The cone is the catch</h2>
          <p>
            The sound chirp spreads as it travels — a cone of 15° or more. The sensor reports the{" "}
            <em>nearest</em> echo from anywhere inside that cone: a chair leg half a metre to the
            side reads as an obstacle dead ahead. The laser stays a pencil-thin line and measures
            what you actually pointed it at. Width is the deep difference between the two — not
            price, not precision.
          </p>
          <p>
            Materials play favourites, each sensor its own: sound bounces off hard surfaces but is
            swallowed by curtains, foam and thick sweaters — soft rooms are sonically dark. Light
            bounces off almost everything but comes back weak from black velvet, or from glass,
            which reflects the beam <em>away</em> like a mirror unless hit square. Every
            rangefinder has a material that makes it lie.
          </p>

          <h2>From one beam to a picture</h2>
          <p>
            One rangefinder gives a number. Spin one on a turret and you get hundreds of numbers a
            revolution — a floor plan drawn in polar coordinates. That is all a{" "}
            <strong>lidar</strong> is, and it is the sensor behind every robot-vacuum map in Unit
            5. Keep the humble formula in mind when the maps arrive: each pixel of them is one
            stopwatch click.
          </p>

          <div className="callout note">
            <span className="co-title">Why not just use a camera?</span>
            <p>
              A camera sees everything and measures nothing: one image, by itself, does not
              contain distance. Rangefinders are the opposite — nearly blind, but every reading is
              a measurement. Real robots carry both and let each answer the question it is good
              at.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Echo Chamber",
        intro: (
          <>
            <p>An ultrasonic cone and a laser beam aimed down the same corridor, with a movable target you can also re-upholster.</p>
            <ul>
              <li>Slide the target and watch both sensors track it — and watch the ping’s round trip tick by in milliseconds vs nanoseconds.</li>
              <li>Move the side obstacle into the sound cone: the ultrasonic reading jumps to the nearer object while the laser stays honest.</li>
              <li>Switch the target from plywood to curtain, then to glass — find which sensor each material blinds.</li>
            </ul>
          </>
        ),
        Component: EchoLab,
      },
      problems: [
        {
          prompt:
            "An ultrasonic sensor hears its echo after 12 ms (speed of sound 343 m/s). How far away is the wall, in metres?",
          answer: 2.06,
          unit: "m",
          tolerancePct: 3,
          hint: "d = v·t/2 — the pulse went there and back.",
          explain: "343 × 0.012 = 4.12 m of round trip → 2.06 m of distance. Forgetting the ÷2 is the classic first-week bug.",
        },
        {
          prompt:
            "A time-of-flight sensor measures a 20 ns round trip (light: 3×10⁸ m/s). Distance in metres?",
          answer: 3,
          unit: "m",
          tolerancePct: 3,
          hint: "Same formula, much faster messenger.",
          explain: "3×10⁸ × 20×10⁻⁹ = 6 m round trip → 3 m. Nanoseconds are why ToF needs special silicon.",
        },
      ],
      quiz: [
        {
          q: "A rangefinder measures a 10 ms round trip. Why divide by two?",
          choices: [
            "Sensors are calibrated in half-seconds",
            "To average out noise",
            "Because the second half of the pulse is weaker",
            "The pulse travelled to the wall and back — the distance is half the trip",
          ],
          answer: 3,
          explain: "The stopwatch runs for the full out-and-back journey. The wall sits at the halfway point of what the pulse flew.",
        },
        {
          q: "A chair leg 40 cm to the side of an ultrasonic sensor's aim reads as an obstacle straight ahead because…",
          choices: [
            "the chirp spreads in a wide cone and the sensor reports the nearest echo from anywhere inside it",
            "sound bends around corners",
            "the sensor is miscalibrated",
            "chair legs resonate at ultrasonic frequencies",
          ],
          answer: 0,
          explain:
            "The sensor cannot know where in its cone the echo came from — it only knows 'something, this close'. The cone is the price of using sound.",
        },
        {
          q: "Which target is nearly invisible to an ultrasonic ranger but fine for a laser?",
          choices: ["A brick wall", "A thick curtain", "A steel door", "A whiteboard"],
          answer: 1,
          explain:
            "Soft, porous materials swallow sound instead of bouncing it. Light reflects enough from fabric to measure — each sensor has its own blind spot.",
        },
        {
          q: "A lidar is essentially…",
          choices: [
            "a camera with a telephoto lens",
            "an array of ultrasonic sensors",
            "a time-of-flight rangefinder spun on a turret, taking hundreds of measurements per turn",
            "a radar operating at radio frequencies",
          ],
          answer: 2,
          explain:
            "One stopwatch-click per angle, one floor plan per revolution. Every robot-vacuum map is this humble trick, repeated fast.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "imu",
      unitId: "u2",
      title: "The IMU: Two Flawed Witnesses",
      subtitle:
        "The accelerometer knows which way is down but trembles at every bump; the gyro turns smoothly but slowly forgets where zero was. Neither is fixable — and that's fine.",
      buildsOn: ["rangefinders"],
      seeAlso: [
        {
          course: "vector",
          slug: "acceleration",
          label: { en: "Vector: acceleration, the quantity itself", de: "Vector: die Beschleunigung selbst" },
        },
      ],
      Theory: () => (
        <>
          <h2>The accelerometer: honest but nervous</h2>
          <p>
            An accelerometer feels accelerations — including gravity, a permanent 9.81 m/s²
            pointing down. Tilt the sensor and gravity&rsquo;s pull redistributes across its axes;
            a little trigonometry turns that split into a tilt angle. The deep virtue: gravity
            never wanders, so the accelerometer&rsquo;s idea of &ldquo;down&rdquo; is{" "}
            <strong>drift-free</strong>. Ask it twice a year apart and it answers the same.
          </p>
          <p>
            The vice: it cannot tell gravity from any <em>other</em> acceleration. Every motor
            vibration, every bump, every jerk of the chassis masquerades as a momentary new
            &ldquo;down&rdquo;. The signal is truthful on average and hysterical in the moment —
            <strong> noisy but unbiased</strong>.
          </p>

          <h2>The gyroscope: smooth but forgetful</h2>
          <p>
            A gyroscope measures rotation <em>rate</em> — degrees per second — cleanly and
            calmly; vibration barely touches it. But you want the angle, not the rate, so you
            integrate: add up rate × dt, loop after loop.
          </p>
          <div className="formula">
            angle ← angle + rate · dt
            <span className="note">integration — and with it, every tiny error joins the sum forever</span>
          </div>
          <p>
            Therein the vice: the gyro&rsquo;s rate reading is off by some whisker — a fraction of
            a degree per second. Integration never forgets a whisker. Hold the sensor perfectly
            still and watch its computed angle crawl away at a steady rate: <strong>drift</strong>,
            the signature failure of dead reckoning, smooth and confident and increasingly wrong.
          </p>

          <h2>Complementary vices</h2>
          <p>
            Look at the two failure modes side by side. The accelerometer is wrong{" "}
            <em>right now</em> but right <em>on average</em>. The gyro is right <em>right now</em>{" "}
            but wrong <em>on average</em>. Their flaws live at opposite ends of the time scale —
            fast noise versus slow drift — which means each has exactly what the other lacks.
            Merging them is next lesson&rsquo;s four lines of code, and those four lines keep
            drones level.
          </p>

          <div className="callout note">
            <span className="co-title">Why not buy a better gyro?</span>
            <p>
              You can — for navigation-grade money, the drift shrinks to degrees per{" "}
              <em>hour</em>. It never reaches zero: integration amplifies whatever error remains,
              however small, without limit. Drift is not a defect of cheap parts; it is the
              arithmetic of adding up. The cure is never a purer witness — it is a second,
              differently-flawed one.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Drift Bench",
        intro: (
          <>
            <p>One tilting board, both witnesses reporting its angle live — with knobs for vibration and gyro bias.</p>
            <ul>
              <li>Hold the board still: the accelerometer trace shivers around the truth while the gyro trace glides slowly away from it.</li>
              <li>Crank the vibration (motors on!): the accelerometer becomes unreadable; the gyro barely notices.</li>
              <li>Tilt the board sharply: the gyro follows instantly, the accelerometer panics first, settles later. Two witnesses, opposite alibis.</li>
            </ul>
          </>
        ),
        Component: DriftLab,
      },
      problems: [
        {
          prompt:
            "A gyro's rate reading has a constant bias of 0.5°/s. After 4 minutes of integration, how far has the computed angle drifted, in degrees?",
          answer: 120,
          unit: "°",
          tolerancePct: 2,
          hint: "Bias × time — integration adds it up relentlessly.",
          explain: "0.5 × 240 s = 120°. A third of a full turn of pure fiction, from half a degree per second of humility-free adding.",
        },
      ],
      quiz: [
        {
          q: "How does an accelerometer measure tilt?",
          choices: [
            "It integrates rotation rate over time",
            "Gravity's constant pull splits across its axes as it tilts, and the split reveals the angle",
            "It tracks the horizon optically",
            "It measures air pressure differences",
          ],
          answer: 1,
          explain:
            "Gravity is a permanent 9.81 m/s² reference pointing down. Tilting redistributes it across the sensor's axes — trigonometry does the rest.",
        },
        {
          q: "Why does a gyro-derived angle drift even when the sensor sits perfectly still?",
          choices: [
            "Temperature changes the chip's clock",
            "The Earth rotates underneath it",
            "Its rate reading carries a tiny bias, and integration accumulates that bias forever",
            "Vibration shakes the reading",
          ],
          answer: 2,
          explain:
            "angle ← angle + rate·dt never forgets an error. A constant whisker of bias becomes a steadily growing angle of fiction.",
        },
        {
          q: "Motors switch on and the chassis buzzes. Which witness suffers?",
          choices: [
            "The accelerometer — every vibration masquerades as changing acceleration",
            "The gyro — vibration integrates into drift",
            "Both equally",
            "Neither; IMUs are vibration-proof",
          ],
          answer: 0,
          explain:
            "The accelerometer cannot distinguish gravity from any other acceleration, and a buzzing chassis is nothing but other accelerations. The gyro's rate channel stays calm.",
        },
        {
          q: "The two sensors' flaws are called complementary because…",
          choices: [
            "they come packaged in one chip",
            "both are caused by temperature",
            "each error can be calibrated away at the factory",
            "one fails fast (noise) and the other slow (drift) — each is strong exactly where the other is weak",
          ],
          answer: 3,
          explain:
            "Accelerometer: wrong now, right on average. Gyro: right now, wrong on average. Opposite ends of the timescale — which is what makes the merge next lesson work.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "filters",
      unitId: "u2",
      title: "The Complementary Filter: One Truth from Two Liars",
      subtitle:
        "Four lines of code that keep drones level: trust the gyro for this instant, let gravity pull the estimate home over seconds — and one knob, alpha, to split the trust.",
      buildsOn: ["imu"],
      Theory: () => (
        <>
          <h2>Split the trust by timescale</h2>
          <p>
            Last lesson ended with two witnesses whose flaws live at opposite ends of the clock:
            accelerometer wrong in the moment, gyro wrong over the minutes. So assign trust by
            timescale — <strong>believe the gyro about change, believe gravity about where home
            is</strong>:
          </p>
          <div className="formula">
            angle = α · (angle + gyro·dt) + (1 − α) · accel_angle
            <span className="note">the complementary filter — with α ≈ 0.98, run every loop tick</span>
          </div>
          <p>
            Read it as a recipe: advance the estimate with the gyro (smooth, instant), then blend
            in a pinch — 2% — of the accelerometer&rsquo;s opinion. Each tick, that pinch tugs the
            estimate toward gravity&rsquo;s drift-free &ldquo;down&rdquo;. Noise, arriving fresh
            and different every tick, gets multiplied by 0.02 and never accumulates. Drift, which
            needs the sum to build up, gets bled away faster than it grows. Both vices treated,
            with one another&rsquo;s virtues.
          </p>

          <h2>Alpha is a timescale dial</h2>
          <p>
            α sets where &ldquo;fast&rdquo; ends and &ldquo;slow&rdquo; begins. At α = 0.98
            and a 100 Hz loop, disturbances shorter than a couple of seconds are ruled by the
            gyro; anything steadier belongs to gravity. Push α to 0.999 and the filter trusts the
            gyro for minutes — drift creeps back in. Drop α to 0.5 and vibration floods through.
            The right value is a property of <em>your</em> robot: how buzzy its motors, how lazy
            its gyro.
          </p>

          <h2>The idea, not the trick</h2>
          <p>
            What you just built is <strong>sensor fusion</strong> — the general craft of merging
            differently-flawed measurements into one estimate better than any of them. The famous
            grown-up version is the <strong>Kalman filter</strong>, which does the same blend but
            recomputes the trust split every tick from how uncertain each source currently is —
            α, made self-adjusting, with proofs. Under the mathematics, the same soul: fast
            witness for the moment, steady witness for the long run.
          </p>

          <div className="callout note">
            <span className="co-title">Four lines, straight face</span>
            <p>
              The complementary filter is unreasonably effective for its size, and engineers
              write it with a slightly guilty grin. Start here, always. Graduate to Kalman when
              you can name the failure — not because the fancier filter must be better, but
              because you have measured why the simple one isn&rsquo;t enough.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Fusion Desk",
        intro: (
          <>
            <p>The drift bench again — but now a third trace: the fused estimate, with the α knob under your thumb.</p>
            <ul>
              <li>Set α = 0.98: the fused line hugs the truth through tilts, shrugs off vibration, and never drifts. Enjoy the moment.</li>
              <li>Slide α to 1.0 — you have unplugged gravity. Watch drift return. Slide toward 0.5 — hello vibration.</li>
              <li>Max the vibration knob, then find the α that best hides it. Notice you paid for it with sluggish response.</li>
            </ul>
          </>
        ),
        Component: FilterLab,
      },
      quiz: [
        {
          q: "In the complementary filter, the (1 − α) share of trust goes to…",
          choices: [
            "the accelerometer's angle, tugging the estimate toward drift-free gravity",
            "the gyro's rate reading",
            "the previous estimate",
            "the loop timer",
          ],
          answer: 0,
          explain:
            "The gyro advances the estimate each tick; the small (1−α) pinch of accelerometer opinion is what pulls it home over seconds.",
        },
        {
          q: "Why doesn't accelerometer noise pile up in the estimate?",
          choices: [
            "The filter averages ten readings first",
            "Each tick's noise enters multiplied by the small (1 − α) and is fresh each time — it never gets to accumulate",
            "Noise cancels drift exactly",
            "The gyro subtracts it",
          ],
          answer: 1,
          explain:
            "Noise is a new random error every tick; scaled by 0.02, its jitters stay tiny and uncorrelated. Only steady signals — like gravity's true direction — survive the blend.",
        },
        {
          q: "Set α = 1.0 and the filter…",
          choices: [
            "responds twice as fast",
            "weights both sensors equally",
            "becomes pure gyro integration — the drift of two lessons ago returns",
            "stops updating",
          ],
          answer: 2,
          explain: "α = 1 removes the gravity correction entirely. You are back to angle ← angle + rate·dt, drifting with a straight face.",
        },
        {
          q: "The Kalman filter's essential upgrade over the complementary filter is that it…",
          choices: [
            "uses better sensors",
            "runs on a faster processor",
            "eliminates noise completely",
            "recomputes the trust split every tick from each source's current uncertainty, instead of a fixed α",
          ],
          answer: 3,
          explain:
            "Same soul — blend a fast witness with a steady one — but the blend ratio becomes self-adjusting, with the mathematics to justify it.",
        },
      ],
    },
  ],
};
