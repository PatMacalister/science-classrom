import type { UnitModule } from "./types";
import { ArmLab, IkLab, GripLab } from "@/servo/components/labs/labs-unit4";

export const unit4: UnitModule = {
  unit: {
    id: "u4",
    num: 4,
    title: "Arms & Grippers",
    blurb:
      "From wheels to hands. Two joint angles hide a whole geometry: where the hand ends up, how to aim it backwards from a target — and how hard to squeeze what it finds there.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "kinematics",
      unitId: "u4",
      title: "Forward Kinematics: Where Did the Hand Go?",
      subtitle:
        "An arm is trigonometry you can bolt together: each joint turns, each link carries the turn outward, and two lines of sine and cosine name the exact spot the hand ends up.",
      buildsOn: ["servos-steppers"],
      seeAlso: [
        {
          course: "vector",
          slug: "projectiles",
          label: { en: "Vector: splitting vectors with sin and cos", de: "Vector: Vektoren zerlegen mit Sinus und Cosinus" },
        },
      ],
      Theory: () => (
        <>
          <h2>Links, joints, frames</h2>
          <p>
            Strip a robot arm to geometry and it is a chain: rigid <strong>links</strong> of fixed
            length, joined by <strong>joints</strong> that each contribute one angle. The
            two-link arm — shoulder θ₁, elbow θ₂, link lengths L₁ and L₂ — is the fruit fly of
            arm robotics: small enough to solve on paper, rich enough to contain every important
            idea.
          </p>
          <p>
            One subtlety carries most of the machinery: the elbow angle θ₂ is measured{" "}
            <em>relative to the upper arm</em>, not to the table. The elbow rides on the
            shoulder&rsquo;s rotation — each link works in the coordinate <strong>frame</strong>{" "}
            its parent hands it. Chains of frames, each riding the last, is precisely how
            professional software describes robots of any size; the two-link arm just keeps the
            chain short.
          </p>

          <h2>The forward map</h2>
          <p>
            Walk the chain and add up where each link carries you:
          </p>
          <div className="formula">
            x = L₁·cos θ₁ + L₂·cos(θ₁ + θ₂) · y = L₁·sin θ₁ + L₂·sin(θ₁ + θ₂)
            <span className="note">forward kinematics — angles in, hand position out; note the elbow’s angle stacking on the shoulder’s</span>
          </div>
          <p>
            That (θ₁ + θ₂) is the frame idea wearing algebra: the forearm&rsquo;s direction is
            the shoulder&rsquo;s turn <em>plus</em> its own. Forward kinematics — angles to
            position — is the easy direction: plug in, read off, no ambiguity, works for six
            joints as surely as two (just with more stacking).
          </p>

          <h2>The workspace: where the hand can ever be</h2>
          <p>
            Sweep both angles through everything they can do and the hand paints an annulus — a
            ring with outer radius L₁ + L₂ (arm straight) and inner radius |L₁ − L₂| (arm folded).
            Everything the arm will ever touch lives in that ring; no cleverness reaches past it.
            Drawing the workspace is the first honest act of arm design: it tells you before any
            code whether the shelf is reachable.
          </p>

          <div className="callout note">
            <span className="co-title">Your arm runs this, backwards</span>
            <p>
              Close your eyes and touch your nose: your brain aimed the fingertip without solving
              cosines consciously — and aiming is the <em>reverse</em> problem, position to
              angles. That direction is genuinely harder (multiple answers, unreachable spots) and
              is exactly the next lesson.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Two-Link Sandbox",
        intro: (
          <>
            <p>Shoulder and elbow sliders, live hand coordinates, and a trace that remembers where the hand has been.</p>
            <ul>
              <li>Move only the shoulder: the whole arm sweeps, the elbow’s world moves with it — frames riding frames.</li>
              <li>Straighten (θ₂ = 0) then fold the arm fully: you have just drawn the workspace ring’s outer and inner edges.</li>
              <li>Sweep both sliders wildly and let the trace fill in the annulus. Anything unpainted is forever out of reach.</li>
            </ul>
          </>
        ),
        Component: ArmLab,
      },
      problems: [
        {
          prompt:
            "An arm has L₁ = 30 cm and L₂ = 20 cm, with θ₁ = 90° and θ₂ = 0° (straight up). What is the hand's height y, in cm?",
          answer: 50,
          unit: "cm",
          tolerancePct: 2,
          hint: "sin 90° = 1 and the elbow adds nothing at θ₂ = 0.",
          explain: "y = 30·sin 90° + 20·sin(90°+0°) = 30 + 20 = 50 cm — the fully-stretched arm, pointing at the ceiling.",
        },
        {
          prompt: "For that same arm, what is the radius of the workspace's inner edge, in cm?",
          answer: 10,
          unit: "cm",
          tolerancePct: 2,
          hint: "|L₁ − L₂| — the fully folded arm.",
          explain: "|30 − 20| = 10 cm. Folded back on itself, the hand still stands 10 cm from the shoulder — a hole in the middle of everything reachable.",
        },
      ],
      quiz: [
        {
          q: "In the two-link arm's forward kinematics, why does the second term use (θ₁ + θ₂)?",
          choices: [
            "It averages the two joints",
            "The elbow rides on the shoulder — the forearm's world direction is the shoulder's turn plus its own",
            "It corrects for gravity",
            "Convention only; θ₂ alone works too",
          ],
          answer: 1,
          explain:
            "θ₂ is measured relative to the upper arm, and the upper arm has already turned by θ₁. Frames stack — the algebra just says so compactly.",
        },
        {
          q: "Forward kinematics answers which question?",
          choices: [
            "What angles reach a given target?",
            "How fast can the arm move?",
            "Given the joint angles, where is the hand?",
            "How strong is the grip?",
          ],
          answer: 2,
          explain:
            "Angles in, position out — plug into the formulas and read off. The reverse direction (position in, angles out) is the hard one, and the next lesson.",
        },
        {
          q: "A two-link arm's workspace is an annulus (a ring) because…",
          choices: [
            "the motors limit the speed",
            "the elbow can only bend one way",
            "gravity pulls the hand downward",
            "the hand can reach at most L₁+L₂ (straight) and no closer than |L₁−L₂| (folded)",
          ],
          answer: 3,
          explain:
            "Full stretch sets the outer circle; full fold sets the inner hole. Between them lies everything the arm will ever touch.",
        },
        {
          q: "A target sits 55 cm away from the shoulder of an arm with L₁ = 30 cm, L₂ = 20 cm. Which is true?",
          choices: [
            "Unreachable — it lies beyond the 50 cm outer workspace edge, and no algorithm changes geometry",
            "Reachable with the elbow fully folded",
            "Reachable if the arm moves fast enough",
            "Reachable with negative θ₂",
          ],
          answer: 0,
          explain:
            "L₁ + L₂ = 50 cm is a hard wall. Checking the workspace before writing code is the cheapest bug-fix in arm robotics.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "inverse-kinematics",
      unitId: "u4",
      title: "Inverse Kinematics: Aiming the Arm Backwards",
      subtitle:
        "From 'the cup is there' to 'set the joints thus' — a problem with two right answers, regions with none, and places where the arm briefly loses a direction of motion.",
      buildsOn: ["kinematics"],
      Theory: () => (
        <>
          <h2>The useful direction is the hard one</h2>
          <p>
            Nobody commands a robot arm by angles. Tasks arrive as positions — <em>grasp the cup
            at (x, y)</em> — and someone must recover the angles that put the hand there:{" "}
            <strong>inverse kinematics</strong>, IK. For the two-link arm the law of cosines
            cracks it in closed form:
          </p>
          <div className="formula">
            cos θ₂ = (x² + y² − L₁² − L₂²) / (2·L₁·L₂)
            <span className="note">solve for the elbow first — the target’s distance alone fixes how bent the arm must be</span>
          </div>
          <p>
            Read the right side: it only asks how <em>far</em> the target is. Distance dictates
            elbow bend; the shoulder then swings the bent arm onto the bearing. And notice the
            crack in the equation: a cosine must live in [−1, 1]. Targets too far (or inside the
            folded hole) push it outside — the formula itself reports <em>unreachable</em>, the
            workspace lesson speaking algebra.
          </p>

          <h2>Two answers, and sometimes none</h2>
          <p>
            cos θ₂ = 0.5 has two answers: θ₂ = +60° and −60°. Geometrically:{" "}
            <strong>elbow-up and elbow-down</strong> — two mirror poses whose hands land on the
            identical spot. Neither is wrong; real controllers pick by convention, by obstacle
            clearance, or by whichever is nearest the current pose (to avoid a wild swing
            through the workspace mid-task). IK answers are a menu, not a verdict.
          </p>

          <h2>Singularities: losing a direction</h2>
          <p>
            Stretch the arm fully straight and ask for the hand to move <em>further outward</em>:
            no joint velocity, however large, produces motion in that direction. The arm has hit
            a <strong>singularity</strong> — a pose where it locally loses one direction of
            movement. Near one, tiny hand motions demand huge joint swings; solvers command
            frantic speeds, and real arms shudder. Industrial path planners route <em>around</em>{" "}
            singular poses the way sailors route around shoals — the map of them is part of
            knowing an arm.
          </p>

          <div className="callout note">
            <span className="co-title">Six joints, same story</span>
            <p>
              Real arms with six joints trade the law of cosines for numerical solvers — but
              inherit everything else intact: multiple solutions (typically eight), unreachable
              regions, singular poses. The two-link arm is not a toy; it is the smallest honest
              specimen of the species.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Target Range",
        intro: (
          <>
            <p>Drag a target around; the arm solves IK live. Toggle elbow-up/down, and watch the singularity meter as you graze the workspace edges.</p>
            <ul>
              <li>Park the target mid-workspace and flip elbow-up/elbow-down: two honest poses, one hand position.</li>
              <li>Drag the target slowly out past the rim — watch the arm straighten, the meter redline, then the solver give up as cos θ₂ leaves [−1, 1].</li>
              <li>Slide the target along the rim and watch the joints thrash to follow small motions — the shoal the planners avoid.</li>
            </ul>
          </>
        ),
        Component: IkLab,
      },
      problems: [
        {
          prompt:
            "Arm with L₁ = L₂ = 25 cm; target 35.36 cm straight out (x=35.36, y=0). Using cos θ₂ = (d² − L₁² − L₂²)/(2·L₁·L₂), what is θ₂, in degrees? (Take the elbow-up, positive answer.)",
          answer: 90,
          unit: "°",
          tolerancePct: 3,
          hint: "d² = 1250.3 ≈ 1250; the numerator becomes ≈ 0.",
          explain: "cos θ₂ = (1250 − 625 − 625)/1250 = 0 → θ₂ = 90°. The arm makes a right angle at the elbow — and −90° would land the hand on the same spot.",
        },
      ],
      quiz: [
        {
          q: "Why does two-link IK generally return two solutions?",
          choices: [
            "Sensor noise doubles the answers",
            "Elbow-up and elbow-down poses put the hand on the identical spot",
            "The shoulder can wrap around twice",
            "Rounding error in the cosine",
          ],
          answer: 1,
          explain:
            "cos θ₂ = c has answers ±θ₂ — mirror poses through the shoulder–target line. A menu of two, chosen by convention, clearance or continuity.",
        },
        {
          q: "During the IK computation, cos θ₂ comes out as 1.3. This means…",
          choices: [
            "the elbow must bend 130°",
            "θ₂ is negative",
            "the target is unreachable — the equation itself is reporting 'outside the workspace'",
            "you should switch to elbow-down",
          ],
          answer: 2,
          explain:
            "A cosine beyond [−1, 1] has no angle. The algebra encodes the workspace: too far (or inside the folded hole) breaks the equation before it breaks the robot.",
        },
        {
          q: "At a fully-stretched singularity, the arm momentarily cannot…",
          choices: [
            "hold its position against gravity",
            "rotate its shoulder",
            "sense its joint angles",
            "move its hand any further outward, no matter how fast the joints spin",
          ],
          answer: 3,
          explain:
            "All joint motion near full stretch moves the hand sideways, none of it outward. One direction of hand-space is locally gone — the definition of a singularity.",
        },
        {
          q: "Why do controllers prefer the IK solution closest to the arm's current pose?",
          choices: [
            "It avoids a wild swing through the workspace to reach the mirror pose mid-task",
            "It uses less battery",
            "The nearer solution is more accurate",
            "Elbow-up is mechanically stronger",
          ],
          answer: 0,
          explain:
            "Both solutions are geometrically valid, but flipping between them means the elbow sweeps a huge arc — through whatever your workspace contains. Continuity is a safety feature.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "grippers",
      unitId: "u4",
      title: "Grippers: The Physics of Not Crushing Things",
      subtitle:
        "A grasp is friction bought with squeeze — too little and gravity wins, too much and the egg does. The window between is narrow, and soft fingers widen it.",
      buildsOn: ["dc-motors"],
      seeAlso: [
        {
          course: "vector",
          slug: "friction",
          label: { en: "Vector: friction, the force doing the holding", de: "Vector: die Reibung, die hier festhält" },
        },
      ],
      Theory: () => (
        <>
          <h2>A grasp is a friction budget</h2>
          <p>
            Parallel fingers do not hold an object — friction does. The fingers merely press, and
            friction converts squeeze into uplift:
          </p>
          <div className="formula">
            hold = µ · F_grip · 2 ≥ m·g
            <span className="note">two finger contacts, each contributing µ times the squeeze — the grasp inequality</span>
          </div>
          <p>
            Below the threshold the object <strong>slips</strong>; the minimum squeeze is
            m·g / (2µ). Above some ceiling the object <strong>crushes</strong> — a number set by
            the object, not the robot: hundreds of newtons for a steel cube, a few for an egg,
            almost nothing for a paper cup. Between slip and crush lies the{" "}
            <strong>grasp window</strong>, and gripping is the art of landing inside it. For a
            slippery egg (low µ shrinks the bottom of the window, fragility lowers the top) the
            window can nearly close — which is why eggs are the canonical gripper demo.
          </p>

          <h2>Sensing the squeeze</h2>
          <p>
            A position-controlled gripper (&ldquo;close to 20 mm&rdquo;) is blind to force: 1 mm
            of position error means zero force on a 21 mm object and enormous force on a 19 mm
            one. Grippers therefore control <strong>force</strong>, and the cheapest force sensor
            is one you already met in Unit 1: <em>motor current</em>. Close until the current —
            the squeeze — reaches a target, wherever the fingers happen to be. Feedback again,
            with amps as the fingertip.
          </p>

          <h2>Compliance: softness as engineering</h2>
          <p>
            Rigid fingers meet a hard object at one or two points — tiny contact patches, high
            local pressure, and any misalignment concentrated onto a corner.{" "}
            <strong>Compliant</strong> fingers — flexible material, printed in rubbery TPU —
            wrap: contact spreads over area, local pressure drops, and small position errors are
            absorbed by flex instead of being transmitted as force spikes. Softness widens the
            grasp window at both ends, which is why research grippers look increasingly like
            kitchen tongs and decreasingly like pliers — and why the best upgrade to a hobby arm
            is usually printed rubber fingertips, not a stronger servo.
          </p>

          <div className="callout note">
            <span className="co-title">Your hand cheats magnificently</span>
            <p>
              Human skin is compliant, high-friction, and carpeted with force sensors reporting
              slip the instant it begins — you re-grip a sliding glass before you consciously
              notice. Robot grippers are decades from that sensor density, which is why
              &ldquo;pick up arbitrary objects&rdquo; is still a research frontier — and a Unit 6
              topic.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Egg Test",
        intro: (
          <>
            <p>A two-finger gripper over a lineup: steel cube, apple, egg, paper cup. A force slider, a friction readout — and a compliance toggle.</p>
            <ul>
              <li>Lift the steel cube: the window is enormous, any decent squeeze works. Now try the same force on the egg. Apologies to the egg.</li>
              <li>Find the egg’s window with rigid fingers — note how few newtons wide it is. Toggle compliant fingers and measure it again.</li>
              <li>Wet the egg (µ drops): watch the window’s bottom edge climb toward its top. Some grasps are simply not there.</li>
            </ul>
          </>
        ),
        Component: GripLab,
      },
      problems: [
        {
          prompt:
            "An 0.06 kg egg with µ = 0.4 hangs between two fingers (g = 9.81). What minimum total grip force per finger is needed, in newtons? (F = m·g / (2µ))",
          answer: 0.74,
          unit: "N",
          tolerancePct: 4,
          hint: "Two contacts share the friction duty.",
          explain: "0.06 × 9.81 / (2 × 0.4) ≈ 0.74 N per finger. If the egg crushes at 5 N, the window is 0.74–5 N — comfortable. Wet it and µ halves: the floor doubles.",
        },
      ],
      quiz: [
        {
          q: "What actually holds a gripped object up?",
          choices: [
            "The normal force of the fingers",
            "Air pressure between finger and object",
            "Friction at the contacts, funded by the grip force",
            "The object's rigidity",
          ],
          answer: 2,
          explain:
            "The fingers press horizontally; gravity pulls vertically. Only friction converts the squeeze into vertical hold — hold = µ·F·(contacts).",
        },
        {
          q: "The 'grasp window' is…",
          choices: [
            "the range of grip force between slipping and crushing",
            "the time available to close the fingers",
            "the gripper's maximum opening width",
            "the camera's view of the object",
          ],
          answer: 0,
          explain:
            "Floor set by m·g/(2µ), ceiling set by the object's fragility. Everything about good gripping is widening that window or landing inside it.",
        },
        {
          q: "Why do grippers control force (often via motor current) rather than position?",
          choices: [
            "Position sensors are too expensive",
            "Force control is faster",
            "Current control saves battery",
            "A millimetre of position error spans everything from no contact to crushing — force is the quantity that actually matters",
          ],
          answer: 3,
          explain:
            "'Close to 20 mm' means nothing to a 19 mm egg. 'Close until the squeeze reaches 2 N' is the honest command — and current reports the squeeze for free.",
        },
        {
          q: "Compliant fingertips widen the grasp window because they…",
          choices: [
            "increase the motor's torque",
            "spread contact over more area and absorb small position errors as flex instead of force spikes",
            "are lighter than metal fingers",
            "raise the object's crush threshold",
          ],
          answer: 1,
          explain:
            "Wrapping contact lowers local pressure (raising the effective ceiling) and flex forgives misalignment (protecting the floor). Softness is engineering, not compromise.",
        },
      ],
    },
  ],
};
