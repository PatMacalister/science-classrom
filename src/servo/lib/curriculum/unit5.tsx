import type { UnitModule } from "./types";
import { OdometryLab, MappingLab, PathLab } from "@/servo/components/labs/labs-unit5";

export const unit5: UnitModule = {
  unit: {
    id: "u5",
    num: 5,
    title: "Wheels & Navigation",
    blurb:
      "How a robot answers the three questions of every journey: where am I, what does the world look like, and how do I get there — with encoder ticks, a spinning laser and a little graph search.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "odometry",
      unitId: "u5",
      title: "Odometry: Navigation by Counting Your Steps",
      subtitle:
        "Two encoders and arithmetic give a live position estimate for free — one that starts perfect and rots with every metre, because wheels lie a little and integration believes them completely.",
      buildsOn: ["filters", "gears"],
      seeAlso: [
        {
          course: "vector",
          slug: "velocity",
          label: { en: "Vector: position as integrated velocity", de: "Vector: Position als aufsummierte Geschwindigkeit" },
        },
      ],
      Theory: () => (
        <>
          <h2>Dead reckoning on two wheels</h2>
          <p>
            A differential-drive robot — two driven wheels, one caster — knows its wheel
            rotations to a fraction of a degree, thanks to encoders. Multiply ticks by wheel
            circumference: distance travelled per wheel. From the pair, everything:
          </p>
          <div className="formula">
            distance = (d_L + d_R) / 2 · turn = (d_R − d_L) / track
            <span className="note">average moves you forward; difference turns you — ‘track’ is the distance between the wheels</span>
          </div>
          <p>
            Update heading, advance position along it, repeat every loop tick — and the robot
            carries a live (x, y, θ) estimate computed entirely from its own step-counting. This
            is <strong>odometry</strong>, the navigational sibling of the gyro&rsquo;s
            integration, and it inherits the family curse.
          </p>

          <h2>The rot</h2>
          <p>
            Wheels lie a little: they slip on dust, squash under load, and are never exactly the
            diameter on the datasheet. Each lie is tiny; integration keeps them all. Distance
            errors grow steadily — but <strong>heading</strong> errors are the killers, because a
            heading error rotates every metre that follows: drive ten metres with a one-degree
            heading lie and you arrive 17 cm sideways of your estimate. After three trips around
            the room, the odometry says you are in the hallway.
          </p>
          <p>
            The failure pattern deserves its name: <strong>locally excellent, globally
            rotten</strong>. Over a second, odometry is the best sensor you own — smooth, fast,
            millimetre-fine. Over a building, it is fiction. The complementary-filter instinct
            from Unit 2 should be tingling: a drift-free but slower witness is needed to anchor
            it. That witness is next lesson&rsquo;s map.
          </p>

          <h2>Calibration buys time</h2>
          <p>
            Before fighting drift with fusion, shrink it at the source: drive a measured straight
            line and scale the wheel diameter until reported matches real; spin ten full turns in
            place and trim the track width until the heading agrees. Called{" "}
            <strong>UMBmark</strong> in the literature, it is an afternoon&rsquo;s work that cuts
            drift severalfold — and it still only postpones the rot. Integration always wins in
            the end.
          </p>

          <div className="callout note">
            <span className="co-title">The oldest trade in navigation</span>
            <p>
              Sailors called it dead reckoning: log-line speed × time on a compass bearing, and a
              growing circle of doubt around the pencilled position — until a lighthouse fixed it
              to truth. Replace lighthouse with lidar and you have Unit 5&rsquo;s remaining two
              lessons.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Doubt Circle",
        intro: (
          <>
            <p>Drive a robot around a marked course. Ghost robot: where odometry believes it is. Sliders for wheel slip and calibration error.</p>
            <ul>
              <li>Drive one lap with perfect wheels: ghost and robot dance as one. Now add 2% slip and watch them separate — slowly, then not slowly.</li>
              <li>Add a small track-width miscalibration and turn in place a few times: heading rot beats distance rot, every time.</li>
              <li>Watch the doubt circle grow with distance travelled. Note it never shrinks — nothing in odometry can un-lie.</li>
            </ul>
          </>
        ),
        Component: OdometryLab,
      },
      problems: [
        {
          prompt:
            "A robot's wheels (circumference 20 cm) turn: left 12.0 turns, right 12.0 turns. How far did it drive, in metres?",
          answer: 2.4,
          unit: "m",
          tolerancePct: 2,
          hint: "Equal wheels: straight line. Turns × circumference.",
          explain: "12 × 0.2 m = 2.4 m per wheel, average 2.4 m. The difference is zero, so the heading never changed.",
        },
        {
          prompt:
            "A robot drives 8 m with an undetected heading error of 2°. How far sideways of its estimate does it arrive, in cm? (offset ≈ d · sin θ)",
          answer: 27.9,
          unit: "cm",
          tolerancePct: 5,
          hint: "8 · sin 2°, in metres, then convert.",
          explain: "8 × 0.0349 ≈ 0.279 m ≈ 28 cm — from two degrees. Heading errors scale with every metre that follows; that is why they dominate the rot.",
        },
      ],
      quiz: [
        {
          q: "In differential-drive odometry, the robot turns when…",
          choices: [
            "the caster wheel steers",
            "both encoders speed up together",
            "the two wheels cover different distances — the difference divided by the track is the turn",
            "the gyro commands it",
          ],
          answer: 2,
          explain:
            "Average of the wheels moves you forward; difference turns you. Two encoder counts contain the whole motion.",
        },
        {
          q: "Why do heading errors damage odometry so much more than distance errors?",
          choices: [
            "Encoders measure heading less precisely",
            "A heading error rotates every subsequent metre — the position error grows with all remaining travel",
            "Heading is stored with fewer decimal places",
            "They don't; both are equally harmful",
          ],
          answer: 1,
          explain:
            "A 1° lie costs ~1.7 cm sideways per metre driven, forever after. Distance lies stay put; heading lies compound.",
        },
        {
          q: "'Locally excellent, globally rotten' means odometry is…",
          choices: [
            "accurate indoors but not outdoors",
            "good at turning but bad at straight lines",
            "reliable only at low speed",
            "the best short-term motion estimate you own, and fiction over long distances",
          ],
          answer: 3,
          explain:
            "Over a second: smooth, fast, millimetre-fine. Over a building: the integrated sum of every tiny lie. This split is exactly what makes it a perfect fusion partner for a slower, drift-free sensor.",
        },
        {
          q: "Calibrating wheel diameter and track width (UMBmark-style)…",
          choices: [
            "cuts the drift rate severalfold but cannot stop integration accumulating what remains",
            "eliminates odometry drift permanently",
            "only helps on carpet",
            "replaces the need for encoders",
          ],
          answer: 0,
          explain:
            "Calibration removes the systematic part of the lie. The random part — slip, dust, load — still integrates. Postponement, not cure.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "mapping",
      unitId: "u5",
      title: "Mapping: A Floor Plan from a Spinning Laser",
      subtitle:
        "Divide the world into little squares and let every lidar ray vote: the hit cell fills toward 'wall', the path toward it clears toward 'free'. Enough votes and a floor plan emerges.",
      buildsOn: ["odometry", "rangefinders"],
      Theory: () => (
        <>
          <h2>The occupancy grid</h2>
          <p>
            A robot&rsquo;s map is charmingly humble: grid the floor into cells (5 cm squares,
            say) and store in each a single number — the probability it contains something solid.
            Grey for <em>unknown</em>, sliding toward white for <em>free</em> and black for{" "}
            <em>occupied</em>. This <strong>occupancy grid</strong> is the working memory behind
            nearly every indoor robot you have met.
          </p>
          <p>
            Every lidar ray is two pieces of evidence in one: the cell where it ended holds
            something (vote it darker) — and every cell along the way to that hit must have been
            empty, or the beam would have stopped sooner (vote them all lighter). Rays land by the
            hundred per revolution; votes pile up; the plan emerges out of grey like a photograph
            developing.
          </p>
          <div className="formula">
            hit cell → more occupied · ray path → more free
            <span className="note">the inverse sensor model — each vote is a nudge, never a verdict, so one noisy ray can’t paint a phantom wall</span>
          </div>

          <h2>The map is only as good as the ‘where’</h2>
          <p>
            To stamp a ray into the grid you must know where it was fired <em>from</em> — and that
            pose comes from odometry, which rots. Map with rotten odometry and the rot becomes
            architecture: one lap around a building and the corridor&rsquo;s end no longer meets
            its start; walls smear into double images. A smeared map is almost never a lidar
            problem — it is a <em>pose</em> problem wearing the map&rsquo;s clothes.
          </p>

          <h2>SLAM, in one honest paragraph</h2>
          <p>
            The fix must break a circle: a good map would correct the pose (match this scan
            against the walls we&rsquo;ve drawn — <em>localization</em>), but a good pose is
            needed to draw the walls. Doing both at once is{" "}
            <strong>SLAM</strong> — simultaneous localization and mapping. The emotional core is
            the <strong>loop closure</strong>: the robot re-recognises a place it has seen
            before, and the accumulated drift snaps audibly to zero as the whole map relaxes into
            consistency. Odometry whispers, the map corrects — Unit 2&rsquo;s two-witness pattern,
            at building scale.
          </p>

          <div className="callout note">
            <span className="co-title">Why robot vacuums drive so strangely</span>
            <p>
              The wall-hugging first lap is deliberate: walls are the richest, straightest lidar
              evidence, and an early loop closure buys a drift-free skeleton for everything after.
              The strange dance is the algorithm, visible.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Developing Map",
        intro: (
          <>
            <p>Steer a lidar-equipped robot through an unknown flat (arrow keys or buttons). The grid develops live; an odometry-drift slider corrupts the pose.</p>
            <ul>
              <li>Zero drift: drive the flat and watch a crisp plan develop — hits darkening walls, ray paths bleaching floors. Note the grey shadows behind obstacles.</li>
              <li>Now add drift and re-map: walls double and corridors bend. The lidar never lied — the ‘where’ did.</li>
              <li>Finish a full loop of the flat and compare where the map’s corridor ends meet. That mismatch is what loop closure exists to snap shut.</li>
            </ul>
          </>
        ),
        Component: MappingLab,
      },
      quiz: [
        {
          q: "Each cell of an occupancy grid stores…",
          choices: [
            "the colour of the floor",
            "the number of times the robot visited it",
            "the distance to the nearest wall",
            "the probability that the cell contains something solid",
          ],
          answer: 3,
          explain:
            "Grey unknown, white free, black occupied — and every state between, because evidence arrives as nudges, not verdicts.",
        },
        {
          q: "A single lidar ray that hits a wall at 3 m provides evidence about…",
          choices: [
            "the hit cell (more occupied) and every cell along the ray's path (more free)",
            "only the cell it hit",
            "the entire room",
            "only the robot's own cell",
          ],
          answer: 0,
          explain:
            "The beam reached 3 m, so everything nearer on its line was empty — otherwise it would have stopped there. One ray, a whole line of votes.",
        },
        {
          q: "Your finished map shows doubled walls and a bent corridor. The most likely culprit is…",
          choices: [
            "a dirty lidar lens",
            "pose drift — rays were stamped into the grid from wrong positions",
            "too coarse a grid",
            "sunlight interference",
          ],
          answer: 1,
          explain:
            "Smearing is the signature of mapping with rotten odometry: correct distances stamped from fictional poses. A pose problem wearing the map's clothes.",
        },
        {
          q: "A loop closure is the moment when…",
          choices: [
            "the robot returns to its charger",
            "the map file is saved",
            "the robot re-recognises a previously seen place and the accumulated drift is corrected across the whole map",
            "the grid runs out of unknown cells",
          ],
          answer: 2,
          explain:
            "Recognition pins the present to the past; the map relaxes into consistency and the doubt accumulated since last visit collapses. SLAM's emotional core.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "path-planning",
      unitId: "u5",
      title: "Path Planning: A* and the Inflated Map",
      subtitle:
        "With a map in hand, 'how do I get there' becomes graph search: grow outward from the start, greet the goal, walk the breadcrumbs back — after fattening every wall by half a robot.",
      buildsOn: ["mapping"],
      Theory: () => (
        <>
          <h2>The map becomes a graph</h2>
          <p>
            An occupancy grid is secretly a graph: each free cell a node, each neighbour-step an
            edge. Finding a route is then textbook search. The simplest — Dijkstra&rsquo;s
            method — grows a frontier outward from the start like ripples in a pond, always
            expanding the cheapest-so-far cell, until a ripple touches the goal. Walk the
            breadcrumbs backwards: shortest path, guaranteed.
          </p>
          <p>
            The ripples are thorough and wasteful — they explore away from the goal as eagerly as
            toward it. <strong>A*</strong> (&ldquo;A-star&rdquo;) adds one number: each
            frontier cell is ranked not by distance-so-far alone but by
          </p>
          <div className="formula">
            f = g + h
            <span className="note">g: cost from the start · h: straight-line guess to the goal — optimism as a compass</span>
          </div>
          <p>
            The guess h steers the ripples toward the goal, collapsing the search to a corridor
            along the promising direction. The guarantee survives one condition: h must never{" "}
            <em>overestimate</em> (straight-line distance never does — you can&rsquo;t beat a
            straight line). Optimistic guesses keep the answer perfect; they only change how much
            work finding it takes.
          </p>

          <h2>Inflation: planning for a robot that has a body</h2>
          <p>
            Raw A* treats the robot as a point, and produces paths that shave corners by zero
            millimetres — geometrically perfect, physically a scraping noise. The standard cure
            is honest and blunt: <strong>inflate</strong> every obstacle by the robot&rsquo;s
            radius before planning. The fattened map&rsquo;s point-paths are exactly the real
            robot&rsquo;s safe paths. Layer on a further soft &ldquo;cost cushion&rdquo; — cells
            near walls legal but pricier — and paths acquire the polite wall-clearance of a good
            driver, hugging the middle of corridors without being told to.
          </p>

          <h2>Plans meet reality</h2>
          <p>
            The world moves — a door closes, a cat sits in the corridor. Real navigation stacks
            therefore run two planners: a <strong>global</strong> one (this lesson) charting the
            whole route on the map, and a fast <strong>local</strong> one dodging what the lidar
            sees <em>right now</em>, re-planning several times a second. The global plan is the
            intention; the local planner is the reflexes. And when the cat wins anyway, the
            stack&rsquo;s last resort is honourable retreat: back up, re-plan, try again — the
            navigation equivalent of Unit 3&rsquo;s loop, running at journey scale.
          </p>

          <div className="callout note">
            <span className="co-title">Same search, other costumes</span>
            <p>
              A* is not a robot algorithm — it is <em>the</em> algorithm for cheapest-route
              problems. Your sat-nav runs it over road graphs; game characters over walkable
              meshes. Robotics&rsquo; contribution is the inflation trick: teaching a pure
              point-mathematics to respect a body.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Route Table",
        intro: (
          <>
            <p>A grid world with drawable walls. Set start and goal, watch the frontier ripple, then the path appear. Toggles for A* vs Dijkstra; a slider for inflation.</p>
            <ul>
              <li>Run Dijkstra, count the explored cells; switch to A* and count again. Same path, a fraction of the pond.</li>
              <li>Set inflation to zero and study how the path kisses every corner. Raise it to the robot’s radius and watch doorways it no longer fits through.</li>
              <li>Draw a wall across the found path and re-plan — then find the inflation value at which the only door closes entirely.</li>
            </ul>
          </>
        ),
        Component: PathLab,
      },
      quiz: [
        {
          q: "A*'s advantage over Dijkstra's plain ripples comes from…",
          choices: [
            "exploring several paths in parallel",
            "adding an optimistic straight-line guess that steers the search toward the goal",
            "skipping cells near walls",
            "using a finer grid",
          ],
          answer: 1,
          explain:
            "f = g + h: cost so far plus a never-overestimating guess to go. The guess turns a pond of exploration into a corridor pointed at the goal.",
        },
        {
          q: "Why must A*'s heuristic h never overestimate the true remaining cost?",
          choices: [
            "It would slow the search down",
            "It would make the frontier too large",
            "An overestimate can make A* dismiss the truly shortest path and return a worse one",
            "It would double-count the g term",
          ],
          answer: 2,
          explain:
            "Optimism is safe: the true path always looks at least as good as promised. Pessimism can hide the best route behind an inflated estimate — the guarantee dies.",
        },
        {
          q: "Obstacle inflation exists because…",
          choices: [
            "lidar overestimates distances",
            "it makes the search faster",
            "grids store walls imprecisely",
            "the planner navigates a point, and fattening walls by the robot's radius makes point-paths physically drivable",
          ],
          answer: 3,
          explain:
            "A point-path that clears a wall by 0 mm is a collision for anything with a body. Inflate the map by the radius, and geometry and reality agree again.",
        },
        {
          q: "Navigation stacks pair a global planner with a local one because…",
          choices: [
            "the global plan is the intention; the local planner dodges what the sensors see right now",
            "one plans forward, one backward",
            "grids are too large for one planner",
            "the local planner double-checks the global one's mathematics",
          ],
          answer: 0,
          explain:
            "The map cannot know about the closed door or the cat. Route on the map, reflexes on the lidar, re-planning several times a second.",
        },
      ],
    },
  ],
};
