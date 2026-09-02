import type { UnitModule } from "./types";
import { RampEnergyLab, CollisionLab } from "@/vector/components/labs/labs-unit2";

export const unit2: UnitModule = {
  unit: {
    id: "u2",
    num: 2,
    title: "Energy & Momentum",
    blurb:
      "Two quantities the universe refuses to lose. Once you can track them, problems that look impossible become bookkeeping.",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "energy",
      unitId: "u2",
      title: "Energy: The Quantity That Only Changes Costume",
      subtitle:
        "Physics' best accounting trick: a number you can compute before and after any process — and it always balances.",
      buildsOn: ["acceleration", "newton-laws"],
      seeAlso: [
        {
          course: "helix",
          slug: "respiration",
          label: {
            en: "🧬 Helix 1.2 — your cells spend these same joules, via ATP",
            de: "🧬 Helix 1.2 — deine Zellen geben dieselben Joule aus, über ATP",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>Two costumes to start with</h2>
          <p>
            <strong>Kinetic energy</strong> is the energy of motion; <strong>potential
            energy</strong> is stored in position — lifted against gravity, for now:
          </p>
          <div className="formula">
            KE = ½·m·v² &nbsp;&nbsp;·&nbsp;&nbsp; PE = m·g·h
            <span className="note">both measured in joules — one joule ≈ lifting an apple one metre</span>
          </div>
          <p>
            The v² in kinetic energy is the fact behind every speed limit: at double the speed a
            car carries <em>four</em> times the energy, and needs four times the distance to
            brake it away. Sixty percent more speed doubles the crash energy.
          </p>

          <h2>The conservation law</h2>
          <p>
            Drop a ball and PE drains as KE fills, gram for gram, joule for joule. Add them and
            the total stays fixed — that is <strong>conservation of energy</strong>, and it is
            not approximately true, it is <em>exactly</em> true, always, everywhere. Energy is
            never created or destroyed; it changes costume: motion, height, spring tension,
            chemical bonds, electricity, light, and — the costume of last resort —{" "}
            <strong>heat</strong>.
          </p>
          <p>
            &ldquo;Losing energy to friction&rdquo; is really converting it into disordered
            jiggling of molecules. The books still balance; the energy has just gone somewhere
            you can no longer conveniently spend. A pendulum dies down, and the room is
            immeasurably warmer.
          </p>

          <h2>Why physicists lead with it</h2>
          <p>
            A skateboarder rolls down a curved ramp: computing forces along that curve is
            miserable. Energy doesn&rsquo;t care about the path — only start and end:
          </p>
          <div className="formula">
            m·g·h = ½·m·v² &nbsp;⇒&nbsp; v = √(2·g·h)
            <span className="note">mass cancels — any frictionless slide from height h lands at the same speed</span>
          </div>
          <p>
            Same answer for a straight drop, a curved slide or a loop, and no forces computed
            anywhere. Conservation laws are physics&rsquo; way of skipping the hard part of the
            story and reading the last page.
          </p>

          <h2>Power: energy per second</h2>
          <p>
            <strong>Power</strong> is how fast energy converts — joules per second, i.e.{" "}
            <strong>watts</strong>. A 60 W bulb spends 60 J each second; a fit cyclist sustains
            ~250 W; a kettle draws 2,000. Your monthly energy bill is literally a joule count
            (dressed up as kilowatt-hours: one kWh = 3.6 million joules).
          </p>

          <div className="callout note">
            <span className="co-title">The same joules run you</span>
            <p>
              A food-label &ldquo;calorie&rdquo; (kcal) is 4,184 joules. A 2,000 kcal day is
              ~8.4 MJ — a continuous burn near 100 W. You are, energetically, a bright old-style
              light bulb; Helix&rsquo;s respiration lesson is the story of how that wattage is
              actually delivered.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Energy Ramp",
        intro: (
          <>
            <p>A skater on a curved ramp, with live energy bars doing the accounting.</p>
            <ul>
              <li>Watch PE drain into KE on the way down and refill on the way up — the total bar never moves.</li>
              <li>Add friction and watch a third bar (heat) grow at the others’ expense. Total: still fixed.</li>
              <li>Halve the drop height and check the bottom speed: √2 slower, not 2× — the square root at work.</li>
            </ul>
          </>
        ),
        Component: RampEnergyLab,
      },
      problems: [
        {
          prompt:
            "A 2 kg ball is held 5 m up (g = 10 m/s²). How fast is it moving when it reaches the ground, in m/s? (v = √(2gh))",
          answer: 10,
          unit: "m/s",
          hint: "The mass is a decoy — it cancels.",
          explain: "v = √(2 × 10 × 5) = √100 = 10 m/s, for a bowling ball or a marble alike.",
        },
        {
          prompt: "A car doubles its speed from 15 to 30 m/s. Its kinetic energy becomes how many times larger?",
          answer: 4,
          unit: "×",
          hint: "KE goes with v².",
          explain: "2² = 4. Braking distance scales the same way — the strongest argument in every speed-limit debate.",
        },
        {
          prompt: "A kettle rated 2,000 W runs for 90 s. How much energy does it convert, in joules?",
          answer: 180000,
          unit: "J",
          hint: "Power × time.",
          explain: "2,000 J/s × 90 s = 180,000 J — enough to heat about half a litre of water to boiling.",
        },
      ],
      quiz: [
        {
          q: "A ball rolls down a frictionless slide. What happens to its potential and kinetic energy?",
          choices: [
            "Both decrease",
            "PE converts into KE; their sum stays exactly constant",
            "KE converts into PE",
            "Both increase",
          ],
          answer: 1,
          explain:
            "Energy changes costume, never amount. Every joule of lost height shows up as motion — that's the conservation law.",
        },
        {
          q: "Where does a pendulum's energy go as it gradually dies down?",
          choices: [
            "It is destroyed by friction",
            "It returns to gravity",
            "Into heat — disordered molecular motion in the air and the pivot",
            "Into the pendulum's mass",
          ],
          answer: 2,
          explain:
            "Friction converts ordered motion into molecular jiggling. The books balance perfectly; the energy is just no longer spendable.",
        },
        {
          q: "Why do physicists reach for energy conservation instead of forces on a curved ramp?",
          choices: [
            "Energy only depends on start and end points, not the path between them",
            "Forces don't exist on curves",
            "Energy is more accurate",
            "It gives a different answer",
          ],
          answer: 0,
          explain:
            "mgh in, ½mv² out — the shape of the slide never enters. Conservation laws skip the story and read the last page.",
        },
        {
          q: "At double the speed, a car's braking distance is roughly…",
          choices: ["double", "half", "the same", "four times as long"],
          answer: 3,
          explain:
            "The brakes must convert away ½mv², and v² quadruples. Energy, not velocity, is what stopping actually costs.",
        },
        {
          q: "What does a watt measure?",
          choices: [
            "Total energy stored",
            "The rate of energy conversion — joules per second",
            "Electrical charge",
            "Force at a distance",
          ],
          answer: 1,
          explain:
            "Power is energy in a hurry. A 2,000 W kettle isn't 'stronger' than a 100 W human over a day — it's just faster per second.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "momentum",
      unitId: "u2",
      title: "Momentum: What Collisions Conserve",
      subtitle:
        "Mass times velocity survives every crash, explosion and rebound — which is why airbags work and why recoil is not optional.",
      buildsOn: ["newton-laws", "energy"],
      Theory: () => (
        <>
          <h2>The other conserved quantity</h2>
          <div className="formula">
            p = m·v
            <span className="note">kilogram-metres per second — direction included</span>
          </div>
          <p>
            <strong>Momentum</strong> is moving mass, sign and all. Its superpower: in any
            collision, explosion or push-off, the <em>total</em> momentum of the participants is
            identical before and after — always, even when the crash is violent, sticky and
            energy-wasting. Deep down this is Newton&rsquo;s third law wearing a ledger: the
            equal-and-opposite forces trade momentum between the partners, so the sum cannot
            move.
          </p>
          <p>
            That is why recoil is not optional. A rifle fires a light, fast bullet forward; the
            rifle must carry the same momentum backward. A rocket is continuous recoil. Two
            skaters pushing off split zero momentum into two opposite shares — the lighter one
            leaves faster, in exact inverse proportion to mass.
          </p>

          <h2>Impulse: momentum’s price in time</h2>
          <div className="formula">
            F·Δt = Δp
            <span className="note">the same momentum change can be a big force briefly — or a small force for longer</span>
          </div>
          <p>
            Stopping always costs the same Δp; <em>how it feels</em> depends on the time you
            take. Airbags, crumple zones, bent knees on landing, catching a ball with soft
            hands — all the same trick: stretch Δt so F shrinks. Hit a windscreen instead and
            Δt is milliseconds, so F is enormous. Safety engineering is largely the art of
            buying time.
          </p>

          <h2>Two kinds of collision</h2>
          <ul>
            <li>
              <strong>Elastic</strong> — the partners bounce and kinetic energy survives too
              (billiard balls, nearly). Equal masses trade velocities outright: the cue ball
              stops dead and the target leaves with its speed.
            </li>
            <li>
              <strong>Inelastic</strong> — the partners crumple or stick; kinetic energy partly
              becomes heat and deformation. Momentum is conserved <em>regardless</em>. Two equal
              cars in a head-on at equal speeds: total momentum zero before, zero after — a
              combined wreck at rest, all that KE spent on the metal.
            </li>
          </ul>
          <p>
            That split is the exam-day compass: <strong>momentum always survives; kinetic
            energy only in elastic collisions</strong>. When a problem says &ldquo;they stick
            together&rdquo;, momentum is the only law you need.
          </p>

          <div className="callout note">
            <span className="co-title">How to weigh a speeding car</span>
            <p>
              Crash investigators run conservation backwards: skid lengths give the after-crash
              speeds, and momentum arithmetic then reveals the speeds <em>before</em> impact.
              The universe kept the books at the scene; the investigator just reads them.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Collision Bench",
        intro: (
          <>
            <p>Two carts, adjustable masses and speeds, and a bounciness dial from billiard to glue.</p>
            <ul>
              <li>Equal masses, fully elastic: watch them swap velocities like billiard balls.</li>
              <li>Turn elasticity to zero: they stick, momentum survives, and the lost KE shows up as a heat number.</li>
              <li>Give a heavy cart a light target and compare with the reverse — mass ratio decides everything.</li>
            </ul>
          </>
        ),
        Component: CollisionLab,
      },
      problems: [
        {
          prompt:
            "A 1,000 kg car at 20 m/s rear-ends a stationary 1,000 kg car and they lock together. How fast does the pair move, in m/s?",
          answer: 10,
          unit: "m/s",
          hint: "Total momentum before = total after; the mass doubled.",
          explain: "p = 1,000×20 = 20,000 kg·m/s; shared by 2,000 kg → 10 m/s. Half the KE became bent metal.",
        },
        {
          prompt:
            "A 4 kg rifle fires a 10 g bullet at 400 m/s. What is the rifle's recoil speed, in m/s?",
          answer: 1,
          unit: "m/s",
          hint: "Bullet momentum = rifle momentum (opposite signs).",
          explain: "0.01 × 400 = 4 kg·m/s; 4 ÷ 4 kg = 1 m/s backwards. The mass ratio absorbs the drama.",
        },
      ],
      quiz: [
        {
          q: "Two ice skaters at rest push off each other. Afterwards, their total momentum is…",
          choices: [
            "shared equally as speed",
            "larger for the heavier skater",
            "zero — the two momenta are equal and opposite",
            "impossible to know",
          ],
          answer: 2,
          explain:
            "It was zero before, so it is zero after. The lighter skater moves faster in exact inverse proportion to mass — the shares cancel.",
        },
        {
          q: "How does an airbag protect you?",
          choices: [
            "It reduces the momentum you must lose",
            "It stretches your stopping time, so the same Δp needs a much smaller force",
            "It absorbs your momentum into the bag",
            "It pushes you back into the seat",
          ],
          answer: 1,
          explain:
            "F·Δt = Δp: the momentum change is fixed by physics, but tripling the stopping time cuts the force to a third. Crumple zones play the same game.",
        },
        {
          q: "In a perfectly inelastic collision (the objects stick), what is conserved?",
          choices: [
            "Momentum, but not kinetic energy",
            "Kinetic energy, but not momentum",
            "Both fully",
            "Neither",
          ],
          answer: 0,
          explain:
            "Momentum survives every collision without exception; the missing KE became heat and deformation. Elastic collisions are the special case where KE survives too.",
        },
        {
          q: "A cue ball hits an equal-mass ball dead centre, elastically. What happens?",
          choices: [
            "Both move on at half speed",
            "The cue ball bounces straight back",
            "Both stop",
            "The cue ball stops; the target leaves with the cue ball's speed",
          ],
          answer: 3,
          explain:
            "Equal masses in an elastic head-on trade velocities outright — the only outcome that conserves both p and KE. Every pool player has watched the proof.",
        },
      ],
    },
  ],
};
