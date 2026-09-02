import type { UnitModule } from "./types";
import { ForceCartLab, InclineLab, OrbitLab } from "@/vector/components/labs/labs-unit1";

export const unit1: UnitModule = {
  unit: {
    id: "u1",
    num: 1,
    title: "Forces",
    blurb:
      "Why motion changes: three laws that run everything from a shopping trolley to the Moon — plus friction, the force that spends its life pretending motion is hard.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "newton-laws",
      unitId: "u1",
      title: "Newton's Three Laws: The Operating System",
      subtitle:
        "Motion doesn't need a cause — changes in motion do. Three sentences from 1687 that still run every machine, sport and orbit.",
      buildsOn: ["acceleration"],
      Theory: () => (
        <>
          <h2>First law: motion is free</h2>
          <p>
            Aristotle thought moving things naturally stop, and everyday life agrees — stop
            pedalling and you coast to a halt. Newton&rsquo;s first law says the opposite:{" "}
            <strong>an object keeps its velocity — including zero — unless a net force acts on
            it</strong>. Things around you stop because friction and drag act on them, not
            because stopping is natural. Take the forces away (an air-hockey puck, a probe in
            deep space) and motion simply continues, for free, forever.
          </p>
          <p>
            The property of &ldquo;keeping on&rdquo; is <strong>inertia</strong>, and mass is its
            measure. This is why you lurch forward when a bus brakes: the bus got a force, you
            didn&rsquo;t — you just kept going.
          </p>

          <h2>Second law: the exchange rate</h2>
          <div className="formula">
            F = m·a
            <span className="note">newtons = kilograms × metres per second squared</span>
          </div>
          <p>
            The second law prices the change: how much acceleration a force buys depends on the
            mass in the way. Twice the force, twice the acceleration; twice the mass, half. Read
            it in both directions — engineers use it to compute forces from measured
            accelerations just as often as the reverse. And note what it quietly says:{" "}
            <strong>zero net force means zero acceleration</strong>, not zero motion — the first
            law is the second law&rsquo;s special case.
          </p>
          <p>
            &ldquo;Net&rdquo; is load-bearing. Forces add with their signs: a 500 N push against
            480 N of friction is a 20 N net force, and the acceleration comes from the 20.
          </p>

          <h2>Third law: forces come in pairs</h2>
          <p>
            Push a wall and the wall pushes you back, exactly as hard, in the opposite
            direction — <em>always</em>, with no exceptions and no delay. Forces are
            interactions, and an interaction grabs both parties. Walking is pushing the Earth
            backwards; swimming is throwing water behind you; a rocket climbs by hurling gas
            down. The partner forces act on <em>different objects</em>, which is why they
            don&rsquo;t cancel: the ground&rsquo;s push on you moves <em>you</em>, your push
            moves the planet (immeasurably).
          </p>

          <div className="callout note">
            <span className="co-title">The horse-and-cart paradox</span>
            <p>
              &ldquo;If the cart pulls back on the horse as hard as the horse pulls the cart,
              how does anything move?&rdquo; — because the cart&rsquo;s motion is decided only by
              forces <em>on the cart</em>: the horse&rsquo;s pull forward versus the
              ground&rsquo;s friction backward. The cart&rsquo;s pull on the horse belongs to
              the horse&rsquo;s ledger. Keep separate books per object and the paradox
              evaporates.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Force vs. Cart",
        intro: (
          <>
            <p>One cart, a push force, adjustable friction — and the second law doing the arithmetic.</p>
            <ul>
              <li>Set friction to zero and give a short push: the cart never stops. That’s the first law, visible.</li>
              <li>Double the force at fixed mass and read the acceleration. Then double the mass instead.</li>
              <li>Match the push to the friction exactly: net zero, steady speed — moving without accelerating.</li>
            </ul>
          </>
        ),
        Component: ForceCartLab,
      },
      problems: [
        {
          prompt: "A 1,200 kg car accelerates at 2.5 m/s². What net force is acting on it, in newtons?",
          answer: 3000,
          unit: "N",
          hint: "F = m·a.",
          explain: "1,200 × 2.5 = 3,000 N — about the weight of 300 kg pressing sideways.",
        },
        {
          prompt:
            "You push a 60 kg trolley with 90 N while friction pushes back with 30 N. What is its acceleration, in m/s²?",
          answer: 1,
          unit: "m/s²",
          hint: "Net force first.",
          explain: "Net = 90 − 30 = 60 N; a = 60/60 = 1 m/s². The trolley only ever feels the net.",
        },
      ],
      quiz: [
        {
          q: "According to the first law, what does an object do when the net force on it is zero?",
          choices: [
            "It slows to a stop",
            "It keeps its current velocity — whether that is zero or 200 m/s",
            "It accelerates gently",
            "It reverses direction",
          ],
          answer: 1,
          explain:
            "No net force means no change. Everyday things stop because friction is a force, not because stopping is natural.",
        },
        {
          q: "The same force acts on two boxes; one has twice the mass. The heavier box…",
          choices: [
            "accelerates at half the rate",
            "accelerates at the same rate",
            "doesn't move",
            "accelerates at twice the rate",
          ],
          answer: 0,
          explain: "a = F/m — mass is the price of acceleration. Double the mass, half the response.",
        },
        {
          q: "You push a wall with 100 N. What does the third law say the wall does?",
          choices: [
            "Nothing — walls are passive",
            "It absorbs the force as heat",
            "It pushes you back with exactly 100 N",
            "It pushes back with slightly less than 100 N",
          ],
          answer: 2,
          explain:
            "Forces are interactions: equal size, opposite direction, no exceptions. That reaction force is what you feel in your palms.",
        },
        {
          q: "Why don't the third law's paired forces cancel each other out?",
          choices: [
            "They act at different times",
            "One is always slightly bigger",
            "They only cancel at low speed",
            "They act on different objects — each object's motion is decided by its own forces only",
          ],
          answer: 3,
          explain:
            "Your push acts on the wall; the wall's push acts on you. Cancellation only happens between forces on the same object.",
        },
        {
          q: "A rocket in empty space accelerates by…",
          choices: [
            "pushing against the launch pad's air",
            "throwing mass (exhaust gas) backwards, which pushes the rocket forwards",
            "burning fuel to lose weight",
            "it cannot — there is nothing to push against",
          ],
          answer: 1,
          explain:
            "The gas is the something to push against. Rocket pushes gas back; gas pushes rocket forward — the third law needs no road.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "friction",
      unitId: "u1",
      title: "Friction: The Force That Hides in Plain Sight",
      subtitle:
        "It ruins ideal physics problems and makes walking possible. Two rules govern it — and one everyday surprise about what it does not depend on.",
      buildsOn: ["newton-laws"],
      Theory: () => (
        <>
          <h2>Two kinds, one bad reputation</h2>
          <p>
            Friction is the sideways force surfaces exert on each other. It comes in two
            flavours with genuinely different jobs. <strong>Static</strong> friction acts on
            things that are <em>not</em> sliding — it is what holds the box on the ramp and
            grips your shoe to the pavement. <strong>Kinetic</strong> friction acts on things
            that <em>are</em> sliding, always opposing the slide. The order matters: static is
            stronger, which is why budging a heavy crate is harder than keeping it moving — and
            why a skidding car has already lost most of its braking.
          </p>

          <h2>The friction rule</h2>
          <div className="formula">
            F ≤ µ·N
            <span className="note">µ (mu): the roughness number of the surface pair · N: how hard they press together</span>
          </div>
          <p>
            Two things set friction: how hard the surfaces are pressed together (the{" "}
            <strong>normal force</strong> N — for a box on level ground, its weight) and the
            surface pair&rsquo;s <strong>coefficient µ</strong> — rubber on dry tarmac ≈ 0.8,
            steel on ice ≈ 0.03. Static friction adjusts itself up to a maximum of µN, matching
            your push exactly until you exceed it; then the box breaks loose and the weaker
            kinetic value takes over.
          </p>
          <p>
            The famous surprise: for ordinary sliding, contact <em>area</em> barely matters.
            Wide tyres do not grip better because of area in this simple model — the same weight
            just spreads over more rubber, pressing each patch less. (Racing tyres win through
            softer compounds and temperature — different physics, richer µ.)
          </p>

          <h2>The tilt test</h2>
          <p>
            Put a block on a board and tilt slowly. The slope component of gravity grows; static
            friction matches it, growing too — until the tilt angle where µN is maxed out and
            the block lets go. That angle measures µ directly: <strong>µ = tan θ</strong>. It is
            one of the cleanest measurements in mechanics, it needs no instruments beyond a
            protractor, and the lab below is exactly it.
          </p>

          <div className="callout note">
            <span className="co-title">Friction is the hero, actually</span>
            <p>
              No friction: no walking, no driving, no knots, no nails, no held pencils. Brakes
              turn a car&rsquo;s kinetic energy into heat through friction on purpose. The force
              that spoils idealised problems is the one that makes every grip in your life work
              — physics just asks you to notice both sides of the ledger.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Tilt Test",
        intro: (
          <>
            <p>A block, a board, a winch — raise the angle until it slips.</p>
            <ul>
              <li>Tilt slowly and watch static friction track the pull of the slope exactly… until it can’t.</li>
              <li>Read the slip angle, take tan θ, and you have measured µ.</li>
              <li>Swap surfaces (rubber, wood, ice) and watch the slip angle collapse with µ.</li>
            </ul>
          </>
        ),
        Component: InclineLab,
      },
      problems: [
        {
          prompt:
            "A 20 kg box sits on level ground, µ (static) = 0.5, g = 10 m/s². What is the maximum static friction force, in newtons?",
          answer: 100,
          unit: "N",
          hint: "N equals the weight here; then µ·N.",
          explain: "N = 20 × 10 = 200 N; friction max = 0.5 × 200 = 100 N. Push harder than that and it breaks loose.",
        },
        {
          prompt: "A block starts to slip when the board reaches 31°. What is µ? (µ = tan θ, answer to two decimals)",
          answer: 0.6,
          unit: "",
          tolerancePct: 4,
          hint: "tan 31° ≈ …",
          explain: "tan 31° ≈ 0.60. One protractor, one coefficient — the tilt test in one line.",
        },
      ],
      quiz: [
        {
          q: "Why is it harder to start pushing a heavy crate than to keep it sliding?",
          choices: [
            "Static friction's maximum exceeds kinetic friction",
            "The crate gets lighter once moving",
            "Kinetic friction pushes you forward",
            "Air resistance helps once it moves",
          ],
          answer: 0,
          explain:
            "Surfaces at rest settle and interlock; breaking loose costs more than keeping loose. It is also why ABS brakes avoid skids.",
        },
        {
          q: "In the model F ≤ µN, sliding friction does NOT depend on…",
          choices: [
            "the coefficient µ",
            "how hard the surfaces press together",
            "the contact area",
            "the materials of the two surfaces",
          ],
          answer: 2,
          explain:
            "Spread the same weight over more area and each patch presses less — the product stays the same. µ and N are the whole story in this model.",
        },
        {
          q: "A car brakes hard and the wheels lock, skidding. Why is that worse than braking at the edge of grip?",
          choices: [
            "Locked wheels have no friction at all",
            "A skidding tyre uses kinetic friction, which is weaker than the static grip of a rolling tyre",
            "The engine fights the brakes",
            "It isn't worse — skidding stops faster",
          ],
          answer: 1,
          explain:
            "A rolling tyre's contact patch isn't sliding — it grips statically. Lock the wheel and you trade that for weaker kinetic friction; ABS exists to stay on the static side.",
        },
        {
          q: "A block slips when its board reaches angle θ. What does θ tell you?",
          choices: [
            "The block's mass",
            "The normal force",
            "The block's final speed",
            "The coefficient of static friction: µ = tan θ",
          ],
          answer: 3,
          explain:
            "At the slip angle the slope's pull just exceeds friction's maximum; mass cancels out of the comparison, leaving µ = tan θ.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "gravity",
      unitId: "u1",
      title: "Gravity & Orbits: Falling Forever",
      subtitle:
        "The apple and the Moon obey one law. An orbit is not an escape from gravity — it is falling, aimed well enough to keep missing.",
      buildsOn: ["newton-laws", "projectiles"],
      Theory: () => (
        <>
          <h2>One law, every mass</h2>
          <p>
            Newton&rsquo;s deepest claim wasn&rsquo;t F = ma — it was that the force pulling the
            apple down and the force holding the Moon in orbit are <em>the same force</em>,
            with one universal rule:
          </p>
          <div className="formula">
            F = G·m₁·m₂ / r²
            <span className="note">every pair of masses attracts; G = 6.67 × 10⁻¹¹ — gravity is astonishingly weak</span>
          </div>
          <p>
            Two features carry everything. It is <strong>universal</strong> — you attract your
            coffee cup (feebly; G is tiny, and it takes a planet&rsquo;s worth of mass to make
            gravity obvious). And it follows an <strong>inverse square</strong>: triple the
            distance, one-ninth the force. Distance is measured from the <em>centre</em>, which
            is why climbing a mountain barely changes your weight — you were already 6,371 km
            from Earth&rsquo;s centre.
          </p>
          <p>
            Small g from Unit 0 is just this law evaluated at Earth&rsquo;s surface. Big G is
            the universe&rsquo;s setting; little g = 9.81 m/s² is Earth&rsquo;s local
            consequence. On the Moon the same G delivers g ≈ 1.6.
          </p>

          <h2>Newton’s cannonball</h2>
          <p>
            Newton&rsquo;s own thought experiment turns projectiles into orbits. Fire a
            cannonball horizontally from a high mountain: it falls and lands. Fire faster: it
            lands farther, because the Earth&rsquo;s surface curves away beneath it. Fire fast
            enough — about <strong>7.9 km/s</strong> — and the ground curves away exactly as
            fast as the ball falls toward it. It falls forever and never lands.{" "}
            <strong>That is an orbit.</strong>
          </p>
          <p>
            So the ISS astronauts are not &ldquo;beyond gravity&rdquo; — at 400 km up, gravity
            is still 89% of surface strength. They float because station and crew are falling
            together, endlessly, around the planet. Weightlessness is free fall with good aim.
          </p>

          <h2>Faster, slower, gone</h2>
          <ul>
            <li><strong>Too slow</strong> — the fall wins; the path bends into the ground.</li>
            <li><strong>Circular speed</strong> — fall and curve match: a circle.</li>
            <li><strong>Faster</strong> — the orbit stretches into an ellipse, swinging far and returning.</li>
            <li><strong>11.2 km/s</strong> — escape velocity: gravity slows you forever but never to zero. Goodbye.</li>
          </ul>

          <div className="callout note">
            <span className="co-title">Weighing the Earth</span>
            <p>
              Henry Cavendish measured G in 1798 with lead balls on a delicately twisting rod —
              detecting the gravity of furniture-sized masses. With G known, g = GM/r² could be
              solved for M: his tabletop experiment weighed the planet (6 × 10²⁴ kg) — and he
              titled the paper accordingly.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Newton's Cannonball",
        intro: (
          <>
            <p>A mountain, a cannon, a planet that curves away. Find every fate.</p>
            <ul>
              <li>Increase launch speed step by step: longer arcs, then the magic speed where the ball misses the ground forever.</li>
              <li>Push past circular speed and watch the circle stretch into an ellipse.</li>
              <li>Find escape velocity — the speed where the ball leaves and never comes back.</li>
            </ul>
          </>
        ),
        Component: OrbitLab,
      },
      problems: [
        {
          prompt:
            "Earth's gravity pulls a satellite with 1,000 N at some distance r. What is the pull at 2r, in newtons?",
          answer: 250,
          unit: "N",
          hint: "Inverse square: double the distance…",
          explain: "Twice the distance, 2² = 4 times weaker: 1,000/4 = 250 N.",
        },
        {
          prompt:
            "You weigh 700 N on Earth (g = 9.8). What would you weigh on the Moon, where g = 1.6 m/s²? (in newtons)",
          answer: 114,
          unit: "N",
          tolerancePct: 3,
          hint: "Weight scales with g; your mass doesn't change.",
          explain: "Mass = 700/9.8 ≈ 71.4 kg; on the Moon: 71.4 × 1.6 ≈ 114 N. Same you, weaker pull.",
        },
      ],
      quiz: [
        {
          q: "Why do astronauts on the ISS float?",
          choices: [
            "There is no gravity 400 km up",
            "The station's shielding blocks gravity",
            "They and the station are in free fall together, endlessly missing the Earth",
            "Centrifugal force exactly cancels gravity for any speed",
          ],
          answer: 2,
          explain:
            "Gravity up there is still ~89% of surface strength. An orbit is shared free fall — nothing pushes crew against station, so nothing feels like weight.",
        },
        {
          q: "Tripling your distance from a planet's centre changes its gravitational pull on you by…",
          choices: ["one ninth", "one third", "no change", "three times weaker per kilometre"],
          answer: 0,
          explain: "Inverse square law: 3² = 9 times weaker. Distance counts from the centre, not the surface.",
        },
        {
          q: "What is the difference between g and G?",
          choices: [
            "None — notation only",
            "g is Earth's local surface acceleration; G is the universal constant in Newton's law that applies to every mass pair",
            "G applies only to stars",
            "g is the force, G the acceleration",
          ],
          answer: 1,
          explain:
            "Big G (6.67×10⁻¹¹) is the universe's setting. Small g (9.81 m/s²) is what that setting produces at the surface of this particular planet.",
        },
        {
          q: "In Newton's cannonball picture, an orbit happens when…",
          choices: [
            "the ball flies high enough to leave gravity",
            "the ball's speed exceeds escape velocity",
            "gravity switches off at altitude",
            "the ball falls toward Earth exactly as fast as the surface curves away beneath it",
          ],
          answer: 3,
          explain:
            "Orbiting is falling with enough sideways speed to keep missing. Slower: it lands. Much faster: it escapes. In between: ellipses.",
        },
      ],
    },
  ],
};
