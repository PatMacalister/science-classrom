import type { UnitModule } from "./types";
import { MotorLab, ServoStepperLab, GearLab } from "@/servo/components/labs/labs-unit1";

export const unit1: UnitModule = {
  unit: {
    id: "u1",
    num: 1,
    title: "Motors & Muscle",
    blurb:
      "Everything a robot does to the world, it does through a motor. Learn the three kinds that matter, the four-switch trick that reverses them — and why every motor hides a gearbox behind it.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "dc-motors",
      unitId: "u1",
      title: "DC Motors: Fast, Weak and Hungry",
      subtitle:
        "Two wires and it spins — but volts buy speed, load steals it, and a stalled motor turns into a heater. Meet the H-bridge, the four switches that give a motor a reverse gear.",
      buildsOn: ["signals"],
      seeAlso: [
        {
          course: "spark",
          slug: "h-bridge",
          label: { en: "Spark: the H-bridge circuit itself", de: "Spark: die H-Brücken-Schaltung selbst" },
        },
      ],
      Theory: () => (
        <>
          <h2>What the volts actually buy</h2>
          <p>
            A brushed DC motor is the simplest deal in robotics: voltage in, rotation out. More
            volts, more speed — nearly proportionally, when spinning free. But the fine print is
            where all the engineering lives:
          </p>
          <ul>
            <li><strong>Speed</strong> is set by voltage — minus what the load claws back.</li>
            <li><strong>Torque</strong> — turning force — is set by <em>current</em>. A hard push means a big draw.</li>
            <li><strong>Stall</strong> — blocked completely — means maximum current and zero motion: all that power becomes heat in the windings.</li>
          </ul>
          <div className="formula">
            speed ∝ voltage · torque ∝ current
            <span className="note">the two halves of every motor spec sheet — and the reason a stalled motor smells</span>
          </div>
          <p>
            Stall is the classic robot murder weapon, and not only for the motor: the sudden gulp
            of current drags the battery voltage down, the regulator loses its footing, and the
            robot&rsquo;s brain browns out and reboots. A wheel jammed against a wall can reset a
            whole robot — remember that the first time yours mysteriously restarts mid-run.
          </p>

          <h2>The H-bridge: a reverse gear made of switches</h2>
          <p>
            A motor reverses when current flows through it backwards. To manage that with digital
            switches, put <strong>four</strong> of them around the motor in a diamond — the circuit
            diagram spells the letter H, motor as the crossbar. Close the top-left and bottom-right
            switches: current flows one way. Close the other diagonal: it flows the other way.
          </p>
          <p>
            Feed one side of the bridge with your PWM signal and you have the complete motor
            vocabulary of last lesson plus a sign: <strong>duty cycle for how hard, diagonal for
            which way</strong>. Close both switches on the same side and you have built a short
            circuit — which is why nobody wires an H-bridge from bare switches: driver chips add
            the interlocks that make the smoke optional.
          </p>

          <h2>Reading the fight: current is truth</h2>
          <p>
            You cannot see load from speed alone, but current never lies: it is a live gauge of how
            hard the motor is fighting. Smart robots watch it — a gripper senses &ldquo;I am
            holding something&rdquo; as a current rise, and a vacuum senses a jammed brush the same
            way. The cheapest force sensor on the bench is the motor you already own.
          </p>

          <div className="callout note">
            <span className="co-title">Why not just a bigger motor?</span>
            <p>
              A bare DC motor spins thousands of RPM with barely the torque to turn a doorknob —
              exactly backwards from what robots need. You could buy a huge motor… or trade the
              useless speed for useful torque with a handful of gears. That trade is lesson three,
              and it is why almost every &ldquo;motor&rdquo; in a robot is secretly a{" "}
              <em>gearmotor</em>.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Motor Bench",
        intro: (
          <>
            <p>One DC motor on a test stand: PWM duty on one knob, mechanical load on the other, live meters for speed and current.</p>
            <ul>
              <li>Sweep the duty at zero load: speed follows almost linearly.</li>
              <li>Now add load at fixed duty — watch speed sag while current climbs. Volts promise, load negotiates.</li>
              <li>Push the load until the motor stalls and watch the current peg while the brown-out warning fires. Flip the H-bridge diagonal to reverse.</li>
            </ul>
          </>
        ),
        Component: MotorLab,
      },
      problems: [
        {
          prompt:
            "A motor stalls at 2.4 A on a 6 V supply. How much power is turning into heat in its windings, in watts? (P = V · I)",
          answer: 14.4,
          unit: "W",
          tolerancePct: 2,
          hint: "All of it is heat — nothing is moving.",
          explain: "6 × 2.4 = 14.4 W of pure heating in a package the size of a thumb. This is why stall is a time-limited event.",
        },
        {
          prompt:
            "That same motor spins free at 3000 RPM on 6 V. Roughly what free speed would you expect at 40% PWM duty, in RPM?",
          answer: 1200,
          unit: "RPM",
          tolerancePct: 5,
          hint: "Free speed tracks average voltage — and duty sets the average.",
          explain: "0.4 × 3000 = 1200 RPM. Unloaded, speed follows the average voltage nearly proportionally.",
        },
      ],
      quiz: [
        {
          q: "In a brushed DC motor, torque is most directly tied to…",
          choices: ["the voltage", "the current", "the PWM frequency", "the motor's temperature"],
          answer: 1,
          explain:
            "Volts set how fast it wants to spin; amps measure how hard it is pushing. That is why a hard-working motor is a hungry one.",
        },
        {
          q: "Why can a single jammed wheel reboot a robot's computer?",
          choices: [
            "The stalled motor draws a huge current, sagging the battery until the logic voltage dips",
            "The jam sends an interrupt signal to the processor",
            "The motor's magnets disturb the memory",
            "Software detects the jam and restarts as a safety measure",
          ],
          answer: 0,
          explain:
            "Stall current is the motor's maximum draw. The battery voltage sags under the gulp, the regulator drops out, and the brain browns out — an electrical failure wearing a mechanical costume.",
        },
        {
          q: "An H-bridge reverses a motor by…",
          choices: [
            "reversing the battery with a relay",
            "doubling the PWM frequency",
            "closing the opposite diagonal pair of its four switches, sending current through backwards",
            "spinning a second motor the other way",
          ],
          answer: 2,
          explain:
            "Four switches in an H: each diagonal is one direction of current flow. The forbidden move — both switches on one side — is a short circuit.",
        },
        {
          q: "A gripper motor's current suddenly rises while its speed drops. The robot should conclude…",
          choices: [
            "the battery is fully charged",
            "the PWM frequency drifted",
            "the motor is broken",
            "the fingers have met an object — current is a free force sensor",
          ],
          answer: 3,
          explain:
            "Current tracks the fight. Rising current at falling speed means rising mechanical resistance — which, for a closing gripper, means contact.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "servos-steppers",
      unitId: "u1",
      title: "Servos & Steppers: Position Without Guesswork",
      subtitle:
        "Two opposite answers to 'go to this angle': the servo closes a loop and fights for its position; the stepper counts perfect steps — until it silently loses count.",
      buildsOn: ["dc-motors"],
      seeAlso: [
        {
          course: "spark",
          slug: "servos-steppers",
          label: { en: "Spark: driving them from firmware", de: "Spark: Ansteuerung aus der Firmware" },
        },
      ],
      Theory: () => (
        <>
          <h2>The servo: a control loop in a box</h2>
          <p>
            A hobby servo is a whole robotics course in a plastic case: DC motor, gearbox, a
            potentiometer watching the output shaft, and a tiny controller comparing that measured
            angle with the one you asked for. Command 90° and it <em>fights</em> its way there —
            push it off with a finger and it pushes back. That is sense–think–act, purchased
            whole.
          </p>
          <p>
            The classic limits: about 180° of travel, and no report back — you command, you trust.
            Its grown-up sibling, the <strong>smart bus servo</strong>, fixes exactly that: servos
            daisy-chained on one cable, each with an address, each answering with its true angle,
            speed and current. Ask a modern low-cost robot arm what it is, and the honest answer is
            six smart servos and some bolts.
          </p>

          <h2>The stepper: position by arithmetic</h2>
          <p>
            A stepper motor takes the opposite bet. Its rotor clicks between magnetic detents —
            typically <strong>200 per revolution</strong>, 1.8° each. Pulse it 50 times and it has
            turned exactly 90°. No sensor, no loop: position is just counting.
          </p>
          <div className="formula">
            angle = steps × 1.8°
            <span className="note">for a 200-step motor — position bought with arithmetic instead of feedback</span>
          </div>
          <p>
            The fine print is brutal in a specific way: overload a stepper — too much torque, too
            fast a start — and it <strong>skips steps silently</strong>. The electronics keep
            counting pulses that the rotor never made. Nothing errors; the robot&rsquo;s idea of
            where it is simply becomes fiction. This is why 3D printers re-home against limit
            switches: to reconcile the count with reality.
          </p>

          <h2>Choosing between them</h2>
          <ul>
            <li><strong>Servo</strong>: knows where it is (internally), fights disturbances, limited travel. Joints, grippers, steering.</li>
            <li><strong>Stepper</strong>: unlimited travel, exact and repeatable while unloaded within limits, but trusts arithmetic over truth. Printers, plotters, camera sliders.</li>
            <li><strong>Smart servo</strong>: the feedback of a servo plus the honesty of a report. Robot arms live here now.</li>
          </ul>

          <div className="callout note">
            <span className="co-title">Open loop, closed loop</span>
            <p>
              The stepper is the course&rsquo;s first pure <em>open-loop</em> actor: it acts
              without checking. The servo is <em>closed-loop</em>: it measures and corrects.
              Keep the pair in mind as characters — Unit 3 is the theory of why the closed one
              wins whenever the world pushes back.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Position Duel",
        intro: (
          <>
            <p>A servo and a stepper, side by side, both commanded to the same angles — with a disturbance lever that shoves both shafts.</p>
            <ul>
              <li>Send both to 120°. Identical arrival — arithmetic and feedback agree in a quiet world.</li>
              <li>Now shove: the servo snaps back; the stepper stays pushed and its display quietly lies.</li>
              <li>Raise the load until the stepper skips, then command 0° — the servo returns true, the stepper returns to a fiction. Re-home to reconcile.</li>
            </ul>
          </>
        ),
        Component: ServoStepperLab,
      },
      problems: [
        {
          prompt: "A 200-step stepper receives 350 step pulses. Through what angle should it have turned, in degrees?",
          answer: 630,
          unit: "°",
          tolerancePct: 2,
          hint: "1.8° per step.",
          explain: "350 × 1.8 = 630° — one and three-quarter turns, if no step was skipped.",
        },
        {
          prompt:
            "During that move the rotor skipped 20 steps. How far is the electronics' idea of the angle from the truth, in degrees?",
          answer: 36,
          unit: "°",
          tolerancePct: 2,
          hint: "Each skipped step is 1.8° of unearned confidence.",
          explain: "20 × 1.8 = 36°. The counter shows 630°, the shaft did 594° — and nothing anywhere reports the difference.",
        },
      ],
      quiz: [
        {
          q: "What closes the loop inside a hobby servo?",
          choices: [
            "A potentiometer on the output shaft, compared against the commanded angle",
            "A camera watching the horn",
            "The PWM frequency",
            "A stepper motor",
          ],
          answer: 0,
          explain:
            "Motor, gears, pot, tiny controller: the pot measures the true angle, the controller drives the motor until measured matches commanded.",
        },
        {
          q: "A stepper motor 'knows' its position because…",
          choices: [
            "it has a built-in encoder",
            "its driver measures the rotor magnetically",
            "it moves in fixed steps and the electronics count them",
            "it re-homes continuously",
          ],
          answer: 2,
          explain:
            "Position by arithmetic: 200 detents per revolution, count the pulses. True exactly as long as every commanded step actually happened.",
        },
        {
          q: "The dangerous thing about an overloaded stepper is that it…",
          choices: [
            "overheats within seconds",
            "skips steps silently, so the position count drifts from reality with no error raised",
            "reverses direction",
            "draws stall current like a DC motor",
          ],
          answer: 1,
          explain:
            "The pulses keep coming, the counter keeps counting, the rotor stopped following. Open-loop confidence is only as good as the assumption that nothing pushed back.",
        },
        {
          q: "Why did smart bus servos take over low-cost robot arms?",
          choices: [
            "They are stronger than steppers",
            "They need no power wiring",
            "They run without a microcontroller",
            "They daisy-chain on one cable and report true angle, speed and current back",
          ],
          answer: 3,
          explain:
            "One cable through six joints instead of six harnesses — and, decisively, the arm can *ask* each joint where it really is and how hard it is working.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "gears",
      unitId: "u1",
      title: "Gears: Trading Speed for Strength",
      subtitle:
        "A motor's speed is a currency, and the gearbox is the exchange booth: ten turns in, one turn out, tenfold the torque — minus a little friction, plus a little wobble called backlash.",
      buildsOn: ["dc-motors"],
      seeAlso: [
        {
          course: "vector",
          slug: "energy",
          label: { en: "Vector: work and power, the currency itself", de: "Vector: Arbeit und Leistung, die Währung selbst" },
        },
      ],
      Theory: () => (
        <>
          <h2>The exchange rate</h2>
          <p>
            Mesh a small gear with a big one and count teeth. A 10-tooth gear driving a 50-tooth
            gear must turn five times for one output turn — that is a <strong>gear ratio</strong>{" "}
            of 5:1. The output is five times slower and, in the ideal case, five times
            stronger:
          </p>
          <div className="formula">
            speed ÷ ratio · torque × ratio
            <span className="note">same power in a new denomination — physics charges only a small friction fee</span>
          </div>
          <p>
            This is why a bare DC motor — thousands of RPM, doorknob torque — becomes useful the
            moment a gearbox translates it: a 100:1 reduction turns 6000 RPM of whir into 60 RPM
            of confident shove. Power (speed × torque) is conserved through the box; only its
            <em> shape</em> changes. Nothing is free: each meshing stage eats a few percent to
            friction.
          </p>

          <h2>Backlash: the space between the teeth</h2>
          <p>
            Meshed teeth need a whisker of clearance to roll without jamming — and that whisker is{" "}
            <strong>backlash</strong>: reverse the input and the output stands still for a moment
            while the teeth cross the gap. For wheels, harmless. For a robot arm reversing
            direction at a target, it is a dead zone where the joint ignores you — and no
            controller downstream can fully undo a lie in the mechanism itself.
          </p>
          <p>
            The fixes are mechanical and priced accordingly: tighter gears, split anti-backlash
            gears, belt drives (the belt&rsquo;s tension takes up the slack), or the exotic
            gearboxes in industrial arm joints — engineered specifically to make the gap tiny.
          </p>

          <h2>Sizing a drivetrain, roughly</h2>
          <p>
            The bench-top recipe: find the torque the task needs (weight × lever arm, then double
            it for margin), find your motor&rsquo;s comfortable torque, and gear down by the
            ratio between them. Speed is what remains — if the geared-down speed is too slow for
            the job, the motor is too small, and no ratio will save it.
          </p>

          <div className="callout note">
            <span className="co-title">Why not direct drive everything?</span>
            <p>
              Big, slow, gearless motors exist — and where budgets allow, they are glorious:
              zero backlash, perfect back-drivability, silent. Their price and weight are why the
              rest of the world runs on small fast motors plus gears. Every drivetrain is this
              same trade, settled at a different budget.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Exchange Booth",
        intro: (
          <>
            <p>A motor, a two-gear train with an adjustable ratio, and a load to lift. Meters for speed, torque and what the friction fee cost you.</p>
            <ul>
              <li>Raise the ratio and watch the output slow while its torque multiplies — the load that stalled at 1:1 lifts easily at 20:1.</li>
              <li>Reverse the motor and watch the output hesitate — the backlash gap, in slow motion. Tighten it and see the dead zone shrink.</li>
              <li>Find the smallest ratio that lifts the heavy load. Note what happened to your lifting speed.</li>
            </ul>
          </>
        ),
        Component: GearLab,
      },
      problems: [
        {
          prompt:
            "A motor spins at 6000 RPM behind a 30:1 gearbox. What is the output speed, in RPM?",
          answer: 200,
          unit: "RPM",
          tolerancePct: 2,
          hint: "Divide by the ratio.",
          explain: "6000 ÷ 30 = 200 RPM — and the torque came out the other side of the booth 30 times larger (minus friction).",
        },
        {
          prompt:
            "The motor delivers 0.05 N·m. Ignoring friction, what torque leaves that 30:1 gearbox, in N·m?",
          answer: 1.5,
          unit: "N·m",
          tolerancePct: 2,
          hint: "Multiply by the ratio.",
          explain: "0.05 × 30 = 1.5 N·m — enough to lift 1.5 kg on a 10 cm lever arm. The same power, re-denominated.",
        },
      ],
      quiz: [
        {
          q: "A 12-tooth gear drives a 60-tooth gear. The output turns…",
          choices: [
            "5× faster, with 5× the torque",
            "5× faster, with a fifth of the torque",
            "5× slower, with a fifth of the torque",
            "5× slower, with 5× the torque (minus friction)",
          ],
          answer: 3,
          explain:
            "60/12 = 5:1. Speed divides by the ratio, torque multiplies by it — power just changes denomination.",
        },
        {
          q: "Backlash is…",
          choices: [
            "the clearance between meshed teeth, felt as a dead zone when reversing direction",
            "the recoil when a motor stops",
            "a gear slipping on its shaft",
            "the whine of a gearbox at speed",
          ],
          answer: 0,
          explain:
            "Teeth need play to roll smoothly; reverse, and the output waits while the gap crosses. Wheels shrug; arms aiming at targets do not.",
        },
        {
          q: "Why can't a clever control algorithm fully compensate backlash?",
          choices: [
            "Controllers cannot run fast enough",
            "During the gap the joint mechanically ignores the motor — no command crosses a disconnected mesh",
            "Backlash changes the gear ratio",
            "It can — backlash is purely a software problem",
          ],
          answer: 1,
          explain:
            "Inside the dead zone the motor turns and the output simply doesn't. Software can anticipate the gap, but it cannot transmit torque through air.",
        },
        {
          q: "Your geared-down mechanism finally has enough torque but is now far too slow. The honest conclusion is…",
          choices: [
            "add a second gearbox",
            "raise the PWM frequency",
            "the motor itself is too small — no ratio buys both speed and torque from too little power",
            "reduce the backlash",
          ],
          answer: 2,
          explain:
            "The gearbox only exchanges what the motor brings. If torque × speed doesn't cover the job at any exchange rate, the shortfall is power — buy a bigger motor.",
        },
      ],
    },
  ],
};
