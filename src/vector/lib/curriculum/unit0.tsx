import type { UnitModule } from "./types";
import { MotionGraphLab, FreeFallLab, ProjectileLab } from "@/vector/components/labs/labs-unit0";

export const unit0: UnitModule = {
  unit: {
    id: "u0",
    num: 0,
    title: "Motion",
    blurb:
      "Before asking why things move, learn to say precisely how: position, velocity, acceleration — and the graphs that turn motion into something you can read.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "velocity",
      unitId: "u0",
      title: "Position & Velocity: Saying Where, Precisely",
      subtitle:
        "Physics starts by replacing 'it moved' with numbers — and the graph of those numbers already answers questions your eyes can't.",
      Theory: () => (
        <>
          <h2>Two numbers beat a description</h2>
          <p>
            Everything in this course begins with the same move: replace words with measurements.
            For motion the measurements are <strong>position</strong> — where something is,
            relative to a chosen zero — and time. Position needs a sign: +3 m and −3 m are
            different places on either side of your zero. Choosing the zero and the positive
            direction is yours to do; nature doesn&rsquo;t care, but your equations will.
          </p>
          <p>
            <strong>Velocity</strong> is how fast position changes, and in which direction:
          </p>
          <div className="formula">
            v = Δx / Δt
            <span className="note">change in position over change in time — metres per second, sign included</span>
          </div>
          <p>
            The sign matters as much as the size. A car at −20 m/s is not slower than one at
            +20 m/s; it is driving the other way. <strong>Speed</strong> is velocity with the sign
            stripped off — useful for speedometers, not enough for physics.
          </p>

          <h2>Average hides, instantaneous tells</h2>
          <p>
            Drive 100 km in two hours and your <em>average</em> velocity is 50 km/h — even if you
            spent twenty minutes parked and ten doing 130. The <strong>instantaneous</strong>{" "}
            velocity is what the speedometer shows right now: the average over a vanishingly
            small Δt. Most physics statements are about the instantaneous kind.
          </p>

          <h2>Read the graph like a sentence</h2>
          <p>
            Plot position against time and the motion becomes legible at a glance:
          </p>
          <ul>
            <li><strong>Flat line</strong> — parked. Position isn&rsquo;t changing.</li>
            <li><strong>Straight slope</strong> — steady velocity. Steeper = faster.</li>
            <li><strong>Slope downhill</strong> — moving in the negative direction.</li>
            <li><strong>Curving</strong> — the velocity itself is changing: next lesson&rsquo;s subject.</li>
          </ul>
          <p>
            The rule underneath: <strong>the slope of the position graph is the velocity</strong>.
            That one idea — a graph&rsquo;s slope meaning something physical — repeats through
            all of physics, so the lab below is about making it reflexive.
          </p>

          <div className="callout note">
            <span className="co-title">Relative to what?</span>
            <p>
              You are sitting still — and moving at 30 km/s around the Sun. Both are true;
              velocity only ever means velocity <em>relative to something</em>. Physics lets you
              pick the reference that makes the problem easy, which is why train-and-platform
              puzzles feel like tricks: they are just two valid zeros disagreeing.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Motion Grapher",
        intro: (
          <>
            <p>Drive a cart with a velocity dial and watch both graphs write themselves.</p>
            <ul>
              <li>Hold a steady positive velocity: the position graph draws a straight ramp.</li>
              <li>Set velocity to zero mid-run — the position line goes flat exactly there.</li>
              <li>Go negative and watch position head back down. Slope is velocity, everywhere and always.</li>
            </ul>
          </>
        ),
        Component: MotionGraphLab,
      },
      problems: [
        {
          prompt: "A runner covers 400 m in 50 s at steady pace. What is their velocity in m/s?",
          answer: 8,
          unit: "m/s",
          hint: "v = Δx / Δt.",
          explain: "400 ÷ 50 = 8 m/s — world-class pace, held for a full lap.",
        },
        {
          prompt:
            "A cyclist rides at 5 m/s for 120 s, then is stopped at a light for 60 s. What is the average velocity over the whole 180 s, in m/s?",
          answer: 3.33,
          unit: "m/s",
          tolerancePct: 3,
          hint: "Total distance first: only the riding part covers ground.",
          explain: "Distance = 5 × 120 = 600 m over 180 s → 600/180 ≈ 3.33 m/s. Averages absorb the red light.",
        },
      ],
      quiz: [
        {
          q: "What does the slope of a position–time graph tell you?",
          choices: ["The acceleration", "The velocity", "The distance travelled", "Nothing physical"],
          answer: 1,
          explain:
            "Slope is rise over run — Δx over Δt — which is the definition of velocity. Steeper means faster; downhill means the negative direction.",
        },
        {
          q: "A car's velocity is −15 m/s. What does the minus sign mean?",
          choices: [
            "It is slowing down",
            "It is below average speed",
            "It is moving in the direction you chose as negative",
            "The measurement failed",
          ],
          answer: 2,
          explain:
            "Sign encodes direction, nothing else. −15 m/s is exactly as fast as +15 m/s, pointed the other way.",
        },
        {
          q: "How do average and instantaneous velocity differ?",
          choices: [
            "Average is over an interval; instantaneous is the value at one moment",
            "Average is always larger",
            "Instantaneous ignores direction",
            "They are the same thing",
          ],
          answer: 0,
          explain:
            "The average over two hours can hide a parked stretch and a fast stretch. The speedometer shows the instantaneous value.",
        },
        {
          q: "On a position–time graph, a horizontal (flat) segment means…",
          choices: [
            "constant velocity forward",
            "the object returned to the start",
            "steady acceleration",
            "the object is not moving",
          ],
          answer: 3,
          explain: "Position isn't changing while time passes — the object is parked. Zero slope, zero velocity.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "acceleration",
      unitId: "u0",
      title: "Acceleration: When Velocity Itself Changes",
      subtitle:
        "The hardest idea in kinematics is that speeding up, slowing down and turning are all the same thing — and that falling is its purest example.",
      buildsOn: ["velocity"],
      Theory: () => (
        <>
          <h2>The rate of the rate</h2>
          <p>
            Velocity says how fast position changes. <strong>Acceleration</strong> says how fast{" "}
            <em>velocity</em> changes:
          </p>
          <div className="formula">
            a = Δv / Δt
            <span className="note">metres per second, per second — written m/s²</span>
          </div>
          <p>
            The double &ldquo;per second&rdquo; trips everyone once. An acceleration of 3 m/s²
            means: every second, the velocity grows by 3 m/s. After one second, 3 m/s faster;
            after two, 6 m/s faster. Nothing about it says how fast you <em>are</em> — a jet at
            cruise has enormous velocity and zero acceleration; a dragster off the line has low
            velocity and brutal acceleration.
          </p>
          <p>
            Braking is acceleration too (opposite the motion), and — subtler — so is turning at
            constant speed, because the <em>direction</em> of the velocity is changing. For now
            we stay on straight lines; the turning case returns with orbits.
          </p>

          <h2>Two formulas carry the unit</h2>
          <p>Start from rest with constant acceleration, and:</p>
          <div className="formula">
            v = a·t &nbsp;&nbsp;·&nbsp;&nbsp; x = ½·a·t²
            <span className="note">velocity grows linearly; distance grows with the square of time</span>
          </div>
          <p>
            The ½t² is worth staring at: in twice the time you go <em>four</em> times as far,
            because you are covering the later ground at a higher speed. On a position–time
            graph, constant acceleration draws a parabola — the curve you met as
            &ldquo;curving&rdquo; last lesson.
          </p>

          <h2>Free fall: gravity’s clean experiment</h2>
          <p>
            Drop anything near the Earth&rsquo;s surface and — if air resistance stays small — it
            gains <strong>9.81 m/s of speed every second</strong>. That number is{" "}
            <strong>g</strong>. Heavy or light does not matter: Galileo&rsquo;s claim, Apollo
            15&rsquo;s demonstration (a hammer and a falcon feather on the Moon, landing
            together), and the single most useful constant in this course. You will measure it
            yourself with string and a stopwatch in Unit 3.
          </p>
          <p>
            Air resistance is the everyday spoiler: it grows with speed until it balances gravity
            and the velocity stops climbing — <strong>terminal velocity</strong>. A skydiver
            belly-down: about 55 m/s. A feather: centimetres per second, which is why Aristotle
            got twenty centuries of benefit of the doubt.
          </p>

          <div className="callout note">
            <span className="co-title">Your body is an accelerometer</span>
            <p>
              You cannot feel velocity — a smooth train at 300 km/h feels like your sofa. You
              feel <em>acceleration</em>: the push of the seat, the lurch of the lift. That is
              also why the astronauts on the ISS float: they and their station accelerate toward
              Earth identically, and what vanishes is the <em>relative</em> push you call weight.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Drop Tower",
        intro: (
          <>
            <p>Drop a ball, watch v climb and x curve — with or without air.</p>
            <ul>
              <li>In vacuum, check the odometer at 1 s and 2 s: four times the distance in twice the time.</li>
              <li>Turn on air resistance and find the terminal velocity where the speed stops growing.</li>
              <li>Try the Moon’s gravity. Same physics, lazier parabola.</li>
            </ul>
          </>
        ),
        Component: FreeFallLab,
      },
      problems: [
        {
          prompt: "A stone is dropped from rest (g = 9.81 m/s², no air). How fast is it falling after 3 s, in m/s?",
          answer: 29.4,
          unit: "m/s",
          tolerancePct: 2,
          hint: "v = g·t.",
          explain: "9.81 × 3 ≈ 29.4 m/s — over 100 km/h after just three seconds of falling.",
        },
        {
          prompt: "How far has that stone fallen in those 3 s, in metres? (x = ½·g·t²)",
          answer: 44.1,
          unit: "m",
          tolerancePct: 2,
          hint: "Half of 9.81, times nine.",
          explain: "½ × 9.81 × 9 ≈ 44.1 m — a 14-storey building. The square in t² does the damage.",
        },
      ],
      quiz: [
        {
          q: "What does an acceleration of 2 m/s² mean?",
          choices: [
            "The object moves 2 m every second",
            "The object's velocity is 2 m/s",
            "The object gains 2 m/s of velocity every second",
            "The object travels 2 m in total",
          ],
          answer: 2,
          explain:
            "Acceleration is change in velocity per second — the 'per second per second' is the whole idea.",
        },
        {
          q: "A ball is dropped and another thrown horizontally at the same instant from the same height (no air). Which hits the ground first?",
          choices: [
            "The dropped one",
            "The thrown one",
            "They land at the same time",
            "It depends on their masses",
          ],
          answer: 2,
          explain:
            "Vertical motion doesn't care about horizontal motion — both fall with the same g from the same height. Next lesson makes this the main event.",
        },
        {
          q: "Why does a feather fall slowly on Earth but drop like a hammer on the Moon?",
          choices: [
            "The Moon's gravity is stronger",
            "On Earth, air resistance balances the feather's small weight almost immediately",
            "Feathers are lighter on the Moon",
            "It doesn't — feathers fall slowly everywhere",
          ],
          answer: 1,
          explain:
            "Free fall is only 'free' without air. Remove the atmosphere and hammer and feather land together — Apollo 15 filmed exactly that.",
        },
        {
          q: "In free fall from rest, doubling the fall time multiplies the fall distance by…",
          choices: ["four", "two", "eight", "the same distance"],
          answer: 0,
          explain: "x = ½·g·t²: distance grows with the square of time. Twice the time, four times the drop.",
        },
        {
          q: "Which of these involves acceleration?",
          choices: [
            "A car cruising straight at a steady 120 km/h",
            "A parked truck",
            "A satellite coasting in a straight line at constant speed in deep space",
            "A car rounding a bend at a steady 60 km/h",
          ],
          answer: 3,
          explain:
            "Velocity has direction. Turning changes the direction, so the velocity changes — that is acceleration even at constant speed.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "projectiles",
      unitId: "u0",
      title: "Projectiles: Two Motions That Ignore Each Other",
      subtitle:
        "A thrown ball is two easy problems wearing a trench coat: steady sideways motion, plus plain free fall. Split them and everything computes.",
      buildsOn: ["velocity", "acceleration"],
      Theory: () => (
        <>
          <h2>The great decoupling</h2>
          <p>
            Throw a ball and its path looks complicated — a curve through the air, position and
            speed changing everywhere. The trick that tames it is almost suspiciously simple:{" "}
            <strong>horizontal and vertical motion run independently</strong>.
          </p>
          <ul>
            <li>
              <strong>Horizontally</strong> nothing pushes or pulls (ignoring air), so the
              sideways velocity just… stays. Steady motion, last lesson&rsquo;s easiest case.
            </li>
            <li>
              <strong>Vertically</strong> the ball is in ordinary free fall: gravity feeds it
              −9.81 m/s of vertical speed every second, whether or not it also moves sideways.
            </li>
          </ul>
          <p>
            The curved path — a <strong>parabola</strong> — is what you get when a steady march
            and an accelerating fall are stapled together. The bullet-drop version: fire a bullet
            horizontally and drop one from the same height at the same instant, and they hit the
            ground <em>together</em>. The fired one just lands very far away.
          </p>

          <h2>Splitting a launch</h2>
          <p>
            A launch at speed v and angle θ is handled by splitting v into components — the
            sideways share and the upward share:
          </p>
          <div className="formula">
            vₓ = v·cos θ &nbsp;&nbsp;·&nbsp;&nbsp; v_y = v·sin θ
            <span className="note">then treat each as its own one-dimensional problem</span>
          </div>
          <p>
            The vertical share buys airtime: the ball rises until gravity has eaten all of v_y,
            then falls symmetrically. The horizontal share spends that airtime covering ground.
            Range is the product of the two — which is why <strong>45°</strong> is the ideal
            compromise on flat ground (in a vacuum): tilt higher and you gain airtime but waste
            speed going up; flatter and you fly fast but land too soon.
          </p>

          <h2>Where the ideal breaks</h2>
          <p>
            Real projectiles feel air resistance, which steals range and drags the ideal angle
            below 45° — footballs and javelins do best around 35–40°. The parabola is the clean
            limit, and knowing the clean limit is what lets you see what air is doing: the
            difference between the model and the throw <em>is</em> the drag.
          </p>

          <div className="callout note">
            <span className="co-title">The monkey and the hunter</span>
            <p>
              Classic physics puzzle: a hunter aims a tranquiliser dart <em>directly</em> at a
              monkey in a tree; the monkey lets go the instant the dart leaves. Where should the
              hunter have aimed? Exactly where they did: dart and monkey both fall with the same
              g from the moment of release, so gravity bends the dart precisely onto the falling
              monkey. Independence of motions, dressed as a joke.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Launcher",
        intro: (
          <>
            <p>Angle, speed, fire. The trajectory is drawn with its two shadows: one falling, one marching.</p>
            <ul>
              <li>At the same speed, compare 30° and 60° — same range, different flight (the two halves of the 45° compromise).</li>
              <li>Find the angle that maximises range, then the one that maximises hang time.</li>
              <li>Watch the vertical shadow: it is exactly last lesson’s drop, no matter the angle.</li>
            </ul>
          </>
        ),
        Component: ProjectileLab,
      },
      problems: [
        {
          prompt:
            "A ball rolls off a 1.25 m high table at 4 m/s. How long is it in the air, in seconds? (fall time depends only on height: t = √(2h/g), g ≈ 10 m/s²)",
          answer: 0.5,
          unit: "s",
          tolerancePct: 3,
          hint: "The 4 m/s is a red herring for this part.",
          explain: "t = √(2×1.25/10) = √0.25 = 0.5 s. Horizontal speed has no vote on fall time.",
        },
        {
          prompt: "How far from the table's edge does it land, in metres?",
          answer: 2,
          unit: "m",
          tolerancePct: 3,
          hint: "Steady sideways speed × the airtime you just found.",
          explain: "4 m/s × 0.5 s = 2 m. Two one-dimensional problems, multiplied at the end.",
        },
      ],
      quiz: [
        {
          q: "What happens to a projectile's horizontal velocity during flight (no air)?",
          choices: [
            "It stays constant — nothing acts horizontally",
            "It decreases steadily",
            "Gravity slowly turns it downward",
            "It increases as the ball falls",
          ],
          answer: 0,
          explain:
            "Gravity only pulls vertically. With no horizontal force, the sideways velocity is untouched from launch to landing.",
        },
        {
          q: "A bullet is fired horizontally and another dropped from the same height at the same moment. Which lands first?",
          choices: [
            "The dropped one — it has less distance to cover",
            "The fired one — it is moving faster",
            "Both land at the same time",
            "The fired one never lands",
          ],
          answer: 2,
          explain:
            "Both start with zero vertical velocity and fall with the same g. The fired bullet's huge horizontal speed is irrelevant to its fall.",
        },
        {
          q: "Why is 45° the range-maximising launch angle on flat ground (in vacuum)?",
          choices: [
            "It is the angle of least air resistance",
            "It best balances airtime (from the vertical share) against ground speed (the horizontal share)",
            "Gravity is weakest at 45°",
            "It maximises the launch speed",
          ],
          answer: 1,
          explain:
            "Range ≈ airtime × ground speed. Steeper buys time but wastes speed upward; flatter is fast but brief. 45° splits the speed evenly.",
        },
        {
          q: "In the monkey-and-hunter puzzle, the dart hits the falling monkey because…",
          choices: [
            "the hunter aimed below the monkey",
            "darts fly in straight lines",
            "the monkey falls faster than the dart",
            "both fall with the same g from the same instant, so gravity bends the dart onto the monkey",
          ],
          answer: 3,
          explain:
            "Aim straight at the target: from release, both gain identical downward motion, so the dart's aim point falls with the monkey.",
        },
      ],
    },
  ],
};
