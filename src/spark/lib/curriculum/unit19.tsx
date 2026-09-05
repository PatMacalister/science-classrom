import type { UnitModule } from "./types";
import { HBridgeLab, ServoStepperLab, EncoderLab, LineFollowerLab } from "@/spark/components/labs/labs-unit19";

export const ROBOT_CODE = `from machine import Pin, PWM, ADC
from time import sleep_ms

# DRV8833: two PWM pins per motor (fwd / rev)
m_l_f, m_l_r = PWM(Pin(2)), PWM(Pin(3))
m_r_f, m_r_r = PWM(Pin(4)), PWM(Pin(5))
for m in (m_l_f, m_l_r, m_r_f, m_r_r):
    m.freq(1000)

sens_l = ADC(26)   # left line sensor
sens_r = ADC(27)   # right line sensor

KP, KD = 28000, 900
BASE = 28000       # of 65535
last_err = 0

def drive(m_f, m_r, v):
    v = max(-65535, min(65535, int(v)))
    m_f.duty_u16(v if v > 0 else 0)
    m_r.duty_u16(-v if v < 0 else 0)

while True:
    l = sens_l.read_u16() / 65535
    r = sens_r.read_u16() / 65535
    err = r - l                    # +: line is to the right
    steer = KP * err + KD * (err - last_err)
    last_err = err
    drive(m_l_f, m_l_r, BASE + steer)   # line right -> left wheel faster
    drive(m_r_f, m_r_r, BASE - steer)   # -> robot turns right, toward the line
    sleep_ms(10)                   # 100 decisions per second`;

export const unit19: UnitModule = {
  unit: {
    id: "u19",
    num: 19,
    title: "Specialization: Motors & Motion",
    blurb:
      "The road to robotics: make electricity push, spin, point and know where it is — then bolt it all to a chassis that chases a line across your floor.",
    track: "specialization",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "h-bridge",
      unitId: "u19",
      title: "DC Motors & the H-Bridge",
      subtitle:
        "A motor is an inductor that pushes back. Four switches around it give you forward, reverse, brake — and one catastrophic wrong move.",
      buildsOn: ["inductors", "pwm-dimmer", "transistors"],
      Theory: () => (
        <>
          <h2>The motor, through your eyes</h2>
          <p>
            A brushed DC motor is Lesson 2.4 made muscular: current through coils in a magnetic
            field produces force; a commutator flips the current every half-turn so the push
            never stops. And because it <em>is</em> a coil, everything you know applies: it
            fights current changes, it <strong>kicks</strong> when switched off (flyback diodes
            are non-negotiable), and — the elegant part — when spun it <em>generates</em>{" "}
            voltage (2.4&rsquo;s induction). That <strong>back-EMF</strong> grows with speed
            and opposes the supply, which is why an unloaded motor settles at the speed where
            back-EMF nearly equals the applied voltage: <strong>voltage sets speed</strong>.
            Load it down and it slows, back-EMF drops, more current flows:{" "}
            <strong>current is torque</strong>. Two sentences, whole discipline.
          </p>

          <h2>Direction needs four switches</h2>
          <p>
            One transistor (3.2) turns a motor on. Reversing it means flipping the current, and
            that takes the classic <strong>H-bridge</strong>: the motor is the crossbar, two
            switches above, two below.
          </p>
          <div className="formula">
            Q1+Q4 → forward · Q2+Q3 → reverse · Q2+Q4 → brake · all off → coast
            <span className="note">speed comes from PWM-ing the active pair — Unit 8’s duty cycle, now with torque</span>
          </div>
          <p>
            Braking deserves a pause: shorting the spinning motor through the low-side
            switches makes its own back-EMF drive current against its motion — the motor
            becomes a generator fighting itself. Electric cars&rsquo; regenerative braking is
            this exact move, with the energy caught instead of burned. And the forbidden
            state: both switches of <em>one side</em> on is a dead short across the battery —{" "}
            <strong>shoot-through</strong> — which is why real driver chips (like the DRV8833
            in your capstone) add hardware interlocks and dead-time.
          </p>
          <div className="callout note">
            <span className="co-title">Why a driver chip and not four transistors?</span>
            <p>
              You could build an H-bridge from 3.2&rsquo;s parts — people do, once, for the
              scars. A $3 driver chip adds shoot-through protection, flyback diodes, current
              limiting and PWM inputs. Master the concept here; buy the armour for the robot.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Four Switches & the Forbidden State",
        intro: (
          <>
            <p>An H-bridge with clickable switches and a motor that obeys — or a fuse that doesn’t forgive.</p>
            <ul>
              <li>Use the presets, then click switches manually and predict the motor before it moves.</li>
              <li>Spin it forward, then hit Brake — compare with Coast. Feel the difference regenerative braking exploits.</li>
              <li>Turn on Q1 and Q2 together. Once. 💥 (Then appreciate driver-chip interlocks.)</li>
            </ul>
          </>
        ),
        Component: HBridgeLab,
      },
      quiz: [
        {
          q: "In a brushed DC motor, speed is set mainly by ___ and torque by ___.",
          choices: ["current / voltage", "PWM frequency / duty", "resistance / capacitance", "voltage / current"],
          answer: 3,
          explain: "Back-EMF balances the applied voltage at a matching speed; load current through the coils makes the torque.",
        },
        {
          q: "To reverse a DC motor, an H-bridge…",
          choices: [
            "Activates the opposite diagonal pair, flipping the current's direction through the motor",
            "Raises the voltage",
            "Reverses the battery chemically",
            "Uses a bigger capacitor",
          ],
          answer: 0,
          explain: "Q1+Q4 sends current one way through the crossbar; Q2+Q3 sends it the other. Same battery, opposite spin.",
        },
        {
          q: "'Shoot-through' is…",
          choices: [
            "The motor spinning too fast",
            "Both switches on one side conducting at once — a direct short across the supply",
            "Current leaking through the diodes",
            "A type of PWM",
          ],
          answer: 1,
          explain: "The battery sees only two saturated switches in series — Lesson 1.1's short circuit, at motor currents. Driver chips add dead-time to prevent it.",
        },
        {
          q: "Shorting a spinning motor's terminals (brake mode) stops it quickly because…",
          choices: [
            "It cuts the power",
            "Friction increases",
            "Its own back-EMF drives current that opposes the motion — the motor generates against itself",
            "The magnetic field collapses permanently",
          ],
          answer: 2,
          explain: "Generator action in reverse. Catch that current in a battery instead of a short and you have regenerative braking.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "servos-steppers",
      unitId: "u19",
      title: "Servos & Steppers",
      subtitle:
        "Two ways to command position: a feedback loop in a $3 can, or a motor that moves in countable clicks.",
      buildsOn: ["h-bridge", "feedback-control", "pwm-dimmer"],
      Theory: () => (
        <>
          <h2>The hobby servo: Unit 14 in a can</h2>
          <p>
            Crack open a hobby servo and grin: a small DC motor, gears, a{" "}
            <strong>potentiometer on the output shaft</strong> (2.2 — the shaft literally turns
            a voltage divider that reports its own angle), and a little board running a{" "}
            <strong>proportional controller</strong> (14.1). You command it with a pulse
            width — 1.0 to 2.0 ms, repeated every 20 ms, decoded exactly like Unit 8&rsquo;s
            PWM (the common convention; the exact angle range varies by servo) — and the
            internal loop drives the motor until pot-voltage matches command.
            Closed-loop position control, three dollars, no assembly required. Robot arms, RC
            steering, camera gimbals: fleets of these.
          </p>

          <h2>The stepper: position by counting</h2>
          <p>
            A stepper motor takes the opposite philosophy: <strong>no feedback at all</strong>.
            Its rotor snaps to whichever coil is energised; pulse the coils in sequence
            (A, B, A&rsquo;, B&rsquo; — a circular counter, hello 7.3) and it advances in
            precise, identical steps — typically 200 per revolution. Position is simply{" "}
            <em>the number of steps you have sent</em>: open-loop, deterministic, perfectly
            repeatable… until you overload it and it silently skips, which is why 3D printers
            sometimes shift layers mid-print. Speed and smoothness come from stepping fast and
            from <em>microstepping</em> — driving two coils with PWM-shaped currents to park
            the rotor between poles.
          </p>
          <div className="formula">
            servo: command → compare → correct (closed loop) · stepper: count clicks (open loop)
            <span className="note">the same open/closed distinction as Lesson 14.1’s toaster vs thermostat — now in hardware</span>
          </div>
          <div className="callout tip">
            <span className="co-title">Choosing between them</span>
            <p>
              Holding a position against unpredictable forces → servo (or motor + encoder, next
              lesson). Repeating exact moves in a controlled machine → stepper. Your 3D printer
              uses steppers because its loads are known; a robot arm in the messy world wants
              feedback.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Command & Obey",
        intro: (
          <>
            <p>A servo chasing your pulse width, and a stepper you can click around its dial.</p>
            <ul>
              <li>Sweep the pulse slider slowly — the horn tracks with that faint controlled lag (the internal P-loop).</li>
              <li>Single-step the stepper and watch the rotor snap coil to coil. Count your way to a full turn.</li>
              <li>Auto-run the stepper backwards — the coil sequence simply reverses. It’s a counter you can hold.</li>
            </ul>
          </>
        ),
        Component: ServoStepperLab,
      },
      quiz: [
        {
          q: "Inside a hobby servo you find a motor, gears, a controller and…",
          choices: [
            "An encoder disc",
            "A second motor",
            "A GPS receiver",
            "A potentiometer on the output shaft reporting its angle",
          ],
          answer: 3,
          explain: "The shaft turns a divider (2.2); the internal P-controller (14.1) drives until report matches command.",
        },
        {
          q: "A servo's commanded angle is encoded in…",
          choices: [
            "The supply voltage",
            "The wire colour",
            "The width of a repeating pulse (≈1–2 ms every 20 ms)",
            "An I2C message",
          ],
          answer: 2,
          explain: "Pulse-width again — Unit 8's idea reused as a command language. 1.5 ms = centre.",
        },
        {
          q: "A stepper motor knows its position because…",
          choices: [
            "It doesn't — the controller counts the steps it has commanded",
            "It has an internal sensor",
            "It measures back-EMF",
            "It asks the servo",
          ],
          answer: 0,
          explain: "Open loop: position = step count. Deterministic and cheap — until a skipped step goes unnoticed.",
        },
        {
          q: "A 3D print with all layers shifted 2 mm sideways after hour three most likely suffered…",
          choices: [
            "A software bug",
            "A stepper briefly overloaded and skipping steps — open loop never noticed",
            "Thermal expansion",
            "PWM interference",
          ],
          answer: 1,
          explain: "The classic open-loop failure: the count and reality disagreed, and nothing was watching. Encoders (next lesson) are the cure.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "encoders",
      unitId: "u19",
      title: "Encoders: Knowing Where You Are",
      subtitle:
        "Two light sensors and a slotted disc give a machine odometry — and the quarter-slot offset between them encodes direction.",
      buildsOn: ["servos-steppers", "flip-flops", "adc-sensors"],
      Theory: () => (
        <>
          <h2>Odometry from a slotted disc</h2>
          <p>
            Bolt a slotted disc to a wheel and shine a light through it onto a sensor: every
            slot edge is one click of known distance. Count clicks, know how far you&rsquo;ve
            rolled — <strong>odometry</strong>, the first sense any mobile robot grows. But one
            sensor has a blind spot: clicks look identical whether the wheel rolls forward or
            backward.
          </p>

          <h2>Quadrature: the quarter-slot trick</h2>
          <p>
            Add a second sensor, offset by a quarter of a slot, and the ambiguity dies. The two
            square waves — channels <strong>A</strong> and <strong>B</strong> — are 90° apart
            (quadrature, the same quarter-cycle idea as I/Q in 18.2!), and{" "}
            <em>which one leads</em> tells the direction:
          </p>
          <div className="formula">
            on A’s rising edge: B low → one way, B high → the other
            <span className="note">decoded by edge detection + a flip-flop (7.3) — or four lines of interrupt code</span>
          </div>
          <p>
            Every mouse wheel, printer carriage and robot wheel uses this. Combine encoder
            feedback with the PID of 14.2 driving the H-bridge of 19.1 and you have a{" "}
            <strong>servo system of your own making</strong> — the industrial-grade version of
            the hobby servo&rsquo;s little pot, good for unlimited rotation and real precision.
            That closed motion loop — sense position, compare, drive — is the beating heart of
            CNC machines, robot arms and self-balancing anythings.
          </p>
          <div className="callout note">
            <span className="co-title">The rest of the robot’s senses</span>
            <p>
              Odometry drifts (wheels slip), so real robots fuse it with other senses: IMUs
              (accelerometer + gyroscope chips), distance sensors, cameras. Sensor fusion is a
              rich field — but every input still arrives as a voltage into an ADC (11.2) or
              bits on a bus (17.2). No new physics; just more of what you own.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Quarter-Slot Trick",
        intro: (
          <>
            <p>A slotted wheel, two offset sensors, and their quadrature waveforms live.</p>
            <ul>
              <li>Spin forward: A leads B, and the count climbs. Reverse: B leads, count falls.</li>
              <li>Stop the wheel mid-slot — the count holds. Position memory, no drift while still.</li>
              <li>Watch the scope: 90° apart, always — the offset is mechanical, so it can’t lie.</li>
            </ul>
          </>
        ),
        Component: EncoderLab,
      },
      quiz: [
        {
          q: "A single-channel encoder cannot tell you…",
          choices: ["Direction of rotation", "Distance", "Speed", "Slot count"],
          answer: 0,
          explain: "Clicks look the same both ways. The second, quarter-offset channel exists precisely to break that tie.",
        },
        {
          q: "In quadrature encoding, direction is read by…",
          choices: [
            "Comparing the two channels' amplitudes",
            "Measuring frequency",
            "Counting only channel B",
            "Checking which channel leads — e.g. sampling B on A's rising edge",
          ],
          answer: 3,
          explain: "90° of phase means the lead order flips with rotation direction — one flip-flop decodes it.",
        },
        {
          q: "Encoder + PID + H-bridge together form…",
          choices: [
            "An oscillator",
            "A closed-loop position servo of your own construction",
            "A stepper motor",
            "A radio",
          ],
          answer: 1,
          explain: "Sense (encoder) → compare & correct (PID, 14.2) → actuate (H-bridge, 19.1). The industrial motion-control trinity.",
        },
        {
          q: "Why do wheeled robots not rely on odometry alone?",
          choices: [
            "Encoders are too expensive",
            "Counting overflows",
            "Wheels slip and errors accumulate — odometry drifts and needs fusing with other senses",
            "They do — it's perfect",
          ],
          answer: 2,
          explain: "Every slip is a silent lie the count believes forever. Fusion with IMUs and range sensors keeps reality in the loop.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "line-follower",
      unitId: "u19",
      title: "Capstone: Build the Line Follower",
      subtitle:
        "Chassis, two motors, two eyes, one PID — a robot that chases black tape across your floor, tuned by you, understood by you.",
      buildsOn: ["encoders", "h-bridge", "pid", "night-light"],
      Theory: () => (
        <>
          <h2>The mission</h2>
          <p>
            Build the classic first robot: two driven wheels, two downward-looking reflectance
            sensors, and firmware that steers so the black line stays between them. It is
            Lesson 14.2&rsquo;s PID with wheels bolted on — and the moment it takes its first
            corner on its own, you will understand why people never stop building robots.
          </p>

          <h2>Shopping list (beyond Pico + breadboard kit)</h2>
          <table>
            <thead>
              <tr><th>Part</th><th>Notes</th><th>≈ Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>2WD robot chassis kit</td><td>two yellow “TT” gear motors, wheels, caster, plate — the universal starter chassis</td><td>$12–18</td></tr>
              <tr><td>DRV8833 driver module</td><td>dual H-bridge with interlocks; happier at 3.3 V logic than the old L298N</td><td>$3</td></tr>
              <tr><td>2× TCRT5000 reflectance modules</td><td>IR LED + phototransistor — a divider output per sensor (2.2 again)</td><td>$3</td></tr>
              <tr><td>4×AA battery holder</td><td>motor power — separate from the Pico’s USB/5V supply</td><td>$3</td></tr>
              <tr><td>Black electrical tape</td><td>the racetrack. Light floor, wide gentle curves to start</td><td>$2</td></tr>
            </tbody>
          </table>

          <h2>The wiring</h2>
          <table>
            <thead>
              <tr><th>#</th><th>From</th><th>To</th><th>Notes</th></tr>
            </thead>
            <tbody>
              <tr><td>1</td><td>Battery pack + / −</td><td>DRV8833 VM / GND</td><td>motor power stays off the Pico’s rail</td></tr>
              <tr><td>2</td><td>Pico GND</td><td>DRV8833 GND & sensor GNDs</td><td><strong>common ground</strong> — the scope capstone’s oldest law</td></tr>
              <tr><td>3</td><td>GP2, GP3</td><td>DRV8833 AIN1, AIN2</td><td>left motor (PWM both for fwd/rev)</td></tr>
              <tr><td>4</td><td>GP4, GP5</td><td>DRV8833 BIN1, BIN2</td><td>right motor</td></tr>
              <tr><td>5</td><td>DRV8833 AOUT/BOUT</td><td>the two motors</td><td>swap a motor’s two wires if it runs backwards</td></tr>
              <tr><td>6</td><td>Sensor AO (left / right)</td><td>GP26 / GP27</td><td>the night-light’s ADC pins, now looking at the floor</td></tr>
              <tr><td>7</td><td>Sensor VCC</td><td>Pico 3V3</td><td>sensors sip; motors must not touch this rail</td></tr>
              <tr><td>8</td><td>Sensors, mounted</td><td>~15 mm apart, 3–8 mm above floor, ahead of the axle</td><td>height matters more than you think</td></tr>
            </tbody>
          </table>

          <h2>The firmware</h2>
          <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "14px 18px", overflowX: "auto", fontSize: "0.85rem", lineHeight: 1.6 }}>
            <code>{ROBOT_CODE}</code>
          </pre>
          <p>
            Thirty lines. The loop is the night-light&rsquo;s superloop; the sensors are
            dividers into ADCs; the steering is 14.2&rsquo;s PD law; the motors are Unit
            8&rsquo;s PWM through 19.1&rsquo;s H-bridge. Tune KP exactly as the simulator
            taught you: too low corners wide, too high snakes down the straights, KD calms the
            snake. Then raise BASE until bravery fails.
          </p>

          <h3>If it misbehaves</h3>
          <table>
            <thead>
              <tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
            </thead>
            <tbody>
              <tr><td>Turns away from the line</td><td>sensors or steering sign swapped</td><td>swap GP26/GP27, or negate err — one change (15.2!)</td></tr>
              <tr><td>One motor runs backwards</td><td>motor leads reversed</td><td>swap that motor’s two wires at the driver</td></tr>
              <tr><td>Pico resets when motors kick</td><td>motor noise sagging the supply</td><td>separate battery pack for VM, common grounds, 100 µF across VM (15.1’s decoupling!)</td></tr>
              <tr><td>Blind to the line</td><td>sensor height / ambient IR</td><td>3–8 mm off the floor, shade from sunlight, check readings over tape vs floor in Thonny</td></tr>
              <tr><td>Snakes violently</td><td>your Kp is shouting</td><td>halve KP, add KD — you rehearsed this exact tuning in the twin</td></tr>
            </tbody>
          </table>

          <h2>Where this road leads</h2>
          <p>
            Add encoders (19.3) and it knows its speed. Add an IMU and it can balance. Swap
            the tape for walls and a distance sensor: a maze solver. Everything else in
            robotics — SLAM, manipulators, autonomy — is more sensors, more loops, more math
            on the same skeleton you just built: <strong>sense → decide → act</strong>, at
            loop rates you now know how to choose, filter (13.3) and tune (14.2). Welcome to
            robotics. You came the long way, and it shows.
          </p>
        </>
      ),
      lab: {
        title: "Digital Twin — Tune Before You Build",
        intro: (
          <>
            <p>The exact robot, the exact control law, on a track that punishes bad tuning.</p>
            <ul>
              <li>Default tune: watch a clean lap. Now double the base speed and watch the corners bite.</li>
              <li>Set Kd to zero and find the speed where the straights start snaking.</li>
              <li>Find your fastest never-lost settings — then dial the same ratios into the real firmware.</li>
            </ul>
          </>
        ),
        Component: LineFollowerLab,
      },
      checklist: [
        { id: "parts", text: "Chassis assembled: motors, wheels, caster, sensor mount — Pico and driver aboard" },
        { id: "power", text: "Separate motor battery wired to DRV8833 VM; every ground commoned" },
        { id: "motors", text: "Both motors respond to a test script — directions corrected by swapping leads, not by hoping" },
        { id: "sensors", text: "Printed sensor readings in Thonny over tape vs floor — clear difference at chosen height" },
        { id: "track", text: "Taped a track: one big loop, gentle curves, no crossings (yet)" },
        { id: "first", text: "First autonomous lap completed, at any speed, however wobbly. Savour it." },
        { id: "tune", text: "Tuned KP and KD like in the twin: named what each change did to the behaviour" },
        { id: "speed", text: "Found my personal speed record that survives three consecutive laps" },
        { id: "fail", text: "Diagnosed at least one real fault using the 15.2 method (symptom → power → split)" },
        { id: "extend", text: "Extended it: sharper track, a crossing, an encoder, or a wall-avoiding sensor — robotics has begun 🤖" },
      ],
    },
  ],
};
