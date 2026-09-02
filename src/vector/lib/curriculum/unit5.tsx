import type { UnitModule } from "./types";
import { RefractionLab, LensLab, SpectrumLab } from "@/vector/components/labs/labs-unit5";

export const unit5: UnitModule = {
  unit: {
    id: "u5",
    num: 5,
    title: "Light & Optics",
    blurb:
      "The fastest thing there is, bent to order: how light bounces and bends, how a curved piece of glass makes an image, and what hides on both sides of the rainbow.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "refraction",
      unitId: "u5",
      title: "Reflection & Refraction: Light Changes Lanes",
      subtitle:
        "Two rules govern every mirror, pool illusion and glass fibre: the bounce is symmetric, and the bend comes from a speed change at the border.",
      buildsOn: ["waves"],
      Theory: () => (
        <>
          <h2>The bounce: reflection</h2>
          <p>
            Light hitting a surface bounces off at the same angle it came in —{" "}
            <strong>angle in = angle out</strong>, both measured from the{" "}
            <strong>normal</strong> (the line perpendicular to the surface — optics&rsquo;
            bookkeeping convention, worth adopting immediately). A mirror is just a surface
            smooth enough that all the parallel rays bounce in step; a painted wall reflects the
            same light but scrambles the directions, which is why you see the wall and not
            yourself.
          </p>

          <h2>The bend: refraction</h2>
          <p>
            Light&rsquo;s vacuum speed c is the universe&rsquo;s limit, but in a medium light is
            slowed — in water to about c/1.33, in glass c/1.5. The slowdown factor is the{" "}
            <strong>index of refraction n</strong>. And a speed change at a border does
            something geometric: a ray crossing the border <em>obliquely</em> changes direction.
          </p>
          <div className="formula">
            n₁·sin θ₁ = n₂·sin θ₂
            <span className="note">Snell’s law — into slower material: bends toward the normal; into faster: away</span>
          </div>
          <p>
            The marching-band picture makes it intuitive: a rank of marchers hits a muddy field
            at an angle; the first marchers into the mud slow down while the rest still stride,
            and the whole line pivots. Every &ldquo;broken&rdquo; drinking straw and
            too-shallow-looking pool is this pivot: light from the submerged part bends at the
            surface, and your brain — which assumes straight lines — reconstructs the object in
            the wrong place.
          </p>

          <h2>The one-way mirror in the pool</h2>
          <p>
            Going from slow to fast (water toward air), the ray bends <em>away</em> from the
            normal — so there is an incoming angle whose exit would be 90°. Beyond that{" "}
            <strong>critical angle</strong> (~49° for water), the light cannot leave at all: it
            reflects back down, perfectly — <strong>total internal reflection</strong>. From
            underwater, the surface beyond that cone is a flawless mirror.
          </p>
          <p>
            That flawless mirror is a technology: an <strong>optical fibre</strong> is a glass
            thread in which light ricochets by total internal reflection for a hundred
            kilometres, losing almost nothing. This page reached you through exactly that trick.
          </p>

          <div className="callout note">
            <span className="co-title">Spear-fishing with Snell</span>
            <p>
              A fish seen from the bank is not where it appears — refraction lifts its image.
              Aim below what you see. Herons know this without the formula; now you know it
              with one.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Light Bender",
        intro: (
          <>
            <p>Aim a ray at a border between two materials and read both angles honestly.</p>
            <ul>
              <li>Air into glass: watch the ray duck toward the normal, and check Snell’s numbers.</li>
              <li>Reverse it — glass into air — and raise the angle until the ray refuses to leave.</li>
              <li>That refusal is total internal reflection: the physics your internet rides on.</li>
            </ul>
          </>
        ),
        Component: RefractionLab,
      },
      problems: [
        {
          prompt:
            "Light in glass (n = 1.5) travels at what speed, in m/s? (c = 3.0 × 10⁸ m/s; enter e.g. 2e8)",
          answer: 200000000,
          unit: "m/s",
          tolerancePct: 2,
          hint: "v = c/n.",
          explain: "3.0×10⁸ ÷ 1.5 = 2.0×10⁸ m/s — a third of its vacuum speed, surrendered at the border.",
        },
        {
          prompt:
            "A ray hits water (n = 1.33) from air at 45°. What angle does it continue at, in degrees? (sin θ₂ = sin 45°/1.33)",
          answer: 32,
          unit: "°",
          tolerancePct: 4,
          hint: "sin 45° ≈ 0.707; divide, then arcsin.",
          explain: "sin θ₂ = 0.707/1.33 ≈ 0.532 → θ₂ ≈ 32°. Into the slower medium, toward the normal.",
        },
      ],
      quiz: [
        {
          q: "Why does light bend when entering water at an angle?",
          choices: [
            "Water's surface pushes it sideways",
            "It changes speed at the border, pivoting the wavefront like marchers hitting mud",
            "Gravity pulls it down",
            "Blue light attracts it",
          ],
          answer: 1,
          explain:
            "Refraction is a speed change with geometry. Head-on rays just slow; oblique rays pivot — Snell's law is the accounting.",
        },
        {
          q: "A pool always looks shallower than it is because…",
          choices: [
            "water magnifies the bottom",
            "the bottom reflects the sky",
            "light from the bottom bends at the surface, and your brain assumes it travelled straight",
            "pressure compresses the water",
          ],
          answer: 2,
          explain:
            "Your visual system back-projects along straight lines; refraction broke that assumption at the surface. The image floats above the object.",
        },
        {
          q: "Total internal reflection can only happen when light travels…",
          choices: [
            "from a slower medium toward a faster one, beyond the critical angle",
            "from air into glass",
            "straight along the normal",
            "at very high intensity",
          ],
          answer: 0,
          explain:
            "Only bending away from the normal can reach the 90° limit. Past the critical angle there is no legal exit — the border becomes a perfect mirror.",
        },
        {
          q: "An optical fibre keeps light inside for kilometres using…",
          choices: [
            "a mirrored metal coating",
            "very bright lasers",
            "vacuum inside the fibre",
            "total internal reflection at the glass boundary",
          ],
          answer: 3,
          explain:
            "Each graze against the wall exceeds the critical angle, so reflection is total — better than any metal mirror, which is why fibres beat copper.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "lenses",
      unitId: "u5",
      title: "Lenses: Bending Light on Purpose",
      subtitle:
        "Curve the glass and refraction becomes engineering: one number — the focal length — explains cameras, glasses, and why your arm gets longer every decade after forty.",
      buildsOn: ["refraction"],
      Theory: () => (
        <>
          <h2>A lens is organised refraction</h2>
          <p>
            A <strong>converging lens</strong> is shaped so that every parallel ray entering it
            is bent to pass through one point — the <strong>focus</strong> — a focal length{" "}
            <strong>f</strong> behind it. That single act of coordination is the whole
            invention; everything else is consequences. (Burning a hole in paper with sunlight
            is the focus made visible: the Sun&rsquo;s parallel rays, concentrated to a dot.)
          </p>

          <h2>Where the image lands</h2>
          <div className="formula">
            1/f = 1/d₀ + 1/dᵢ
            <span className="note">object distance, image distance, focal length — one budget shared</span>
          </div>
          <p>
            Rays from any object point are bent to reconverge at a matching image point — a{" "}
            <strong>real image</strong> you can catch on a screen or a sensor, upside-down. The
            equation says where: distant objects (1/d₀ ≈ 0) image at the focal plane; as the
            object approaches, the image retreats. Focusing a camera <em>is</em> this equation —
            the lens motor changing dᵢ to keep the sensor on target.
          </p>
          <p>
            Bring the object <em>inside</em> the focal length and the rays leave still
            diverging — no real image forms. But trace them backwards and they appear to come
            from a larger, upright <strong>virtual image</strong> behind the object: a{" "}
            <strong>magnifying glass</strong>. Same lens, two behaviours, and the focal length
            is the switch.
          </p>

          <h2>Your eye runs this equation</h2>
          <p>
            The eye is a converging lens (cornea plus a fine-tuning inner lens) imaging onto the
            retina at fixed dᵢ — so instead of moving the lens, muscles <em>squeeze it
            rounder</em> to shorten f for near objects. Myopia: eye too long, distant images
            land short — fixed by a diverging spectacle lens. Ageing stiffens the lens until
            near focus fails — hence reading glasses, and the lengthening arm. An optometrist&rsquo;s
            prescription is in <strong>dioptres</strong>: 1/f in metres — a +2.0 D lens has
            f = 0.5 m, and dioptres add, which is why they are the trade&rsquo;s unit.
          </p>

          <div className="callout note">
            <span className="co-title">Upside-down and unbothered</span>
            <p>
              The image on your retina is inverted, like every real image. Your brain simply
              wires &ldquo;retinal down&rdquo; to mean &ldquo;up&rdquo; — famously, test
              subjects wearing inverting goggles adapt within days, and the world flips
              &ldquo;right way up&rdquo; again. Optics delivers the data; interpretation is a
              software job.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Optical Bench",
        intro: (
          <>
            <p>An object, a lens, a screen — slide things and watch the rays obey the equation.</p>
            <ul>
              <li>Put the object far away: the image sits at the focal plane, small and inverted.</li>
              <li>Slide the object toward the lens and chase the retreating image with the screen.</li>
              <li>Cross inside the focal length: the real image vanishes and a virtual magnifier appears.</li>
            </ul>
          </>
        ),
        Component: LensLab,
      },
      problems: [
        {
          prompt:
            "An object stands 30 cm from a lens with f = 10 cm. Where is the image, in cm? (1/dᵢ = 1/f − 1/d₀)",
          answer: 15,
          unit: "cm",
          tolerancePct: 2,
          hint: "1/10 − 1/30 = 2/30.",
          explain: "1/dᵢ = 1/10 − 1/30 = 1/15 → dᵢ = 15 cm: a real, inverted image, catchable on paper.",
        },
        {
          prompt: "Reading glasses are labelled +2.5 dioptres. What is their focal length, in metres?",
          answer: 0.4,
          unit: "m",
          hint: "Dioptres are 1/f.",
          explain: "f = 1/2.5 = 0.4 m. The optician's unit is just the lens equation pre-inverted.",
        },
      ],
      quiz: [
        {
          q: "What defines the focal length of a converging lens?",
          choices: [
            "The distance at which parallel rays are brought to a single point",
            "The lens's diameter",
            "The distance to the object",
            "The thickness of the glass",
          ],
          answer: 0,
          explain:
            "Parallel-in, point-out is the lens's defining act; f measures where that point falls. Everything else follows from the lens equation.",
        },
        {
          q: "A real image is one that…",
          choices: [
            "is always upright",
            "can only be seen through the lens",
            "forms where rays actually reconverge — you can catch it on a screen",
            "forms only for distant objects",
          ],
          answer: 2,
          explain:
            "Light genuinely arrives there, inverted — a camera sensor sits exactly at a real image. Virtual images are back-projections your eye infers.",
        },
        {
          q: "How does a magnifying glass work?",
          choices: [
            "It bends light more strongly than other lenses",
            "With the object inside the focal length, the lens makes an enlarged upright virtual image",
            "It projects a bigger real image onto your eye",
            "It slows light down",
          ],
          answer: 1,
          explain:
            "Inside f, rays exit still diverging; traced backwards they appear to come from a larger object behind the real one. Same lens, other regime.",
        },
        {
          q: "Your eye focuses on near objects by…",
          choices: [
            "moving the lens forward like a camera",
            "shrinking the pupil",
            "moving the retina back",
            "muscles squeezing the lens rounder, shortening its focal length",
          ],
          answer: 3,
          explain:
            "Image distance is fixed by the eyeball, so f must change instead. Age stiffens the lens — and arms grow 'longer' at the newspaper.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "spectrum",
      unitId: "u5",
      title: "Colour & the Spectrum: Most Light Is Invisible",
      subtitle:
        "A prism doesn't add colour to sunlight — it un-mixes what was always there. And the rainbow you can see is one octave of a keyboard that runs from radio to gamma.",
      buildsOn: ["refraction", "waves"],
      Theory: () => (
        <>
          <h2>White is a chord</h2>
          <p>
            Newton let sunlight through a prism and got a rainbow — then, the decisive step,
            fed it through a <em>second</em> prism and recombined it into white. Colour is not
            added by the glass; sunlight is a mixture, and the prism sorts it. The sorting works
            because a medium&rsquo;s refractive index depends slightly on wavelength —{" "}
            <strong>dispersion</strong>: violet slows a touch more than red, so it bends a touch
            more, and the mixture fans out. Raindrops do the same job, sorted across the sky.
          </p>
          <p>
            Colour <em>is</em> wavelength: deep red ~700 nm down to violet ~400 nm. Your eye
            samples this range with three cone types and your brain mixes their votes — which is
            why a screen fools you with only red, green and blue pixels.
          </p>

          <h2>The keyboard beyond</h2>
          <p>
            The visible band is a sliver of the <strong>electromagnetic spectrum</strong> — one
            physical phenomenon at every wavelength, all doing c:
          </p>
          <ul>
            <li><strong>Radio</strong> (metres–kilometres) — broadcast, Wi-Fi&rsquo;s 12 cm.</li>
            <li><strong>Microwaves</strong> (cm–mm) — radar, and rotating your leftovers&rsquo; water molecules.</li>
            <li><strong>Infrared</strong> (µm) — heat radiation: night-vision sees warm bodies glow.</li>
            <li><strong>Visible</strong> — 400–700 nm. This sliver.</li>
            <li><strong>Ultraviolet</strong> — energetic enough to break skin chemistry: sunburn.</li>
            <li><strong>X-rays / gamma</strong> — through flesh, out of nuclei.</li>
          </ul>
          <p>
            Why do eyes use this sliver? The Sun&rsquo;s output peaks here, and — no
            coincidence — water and air are transparent here. Evolution tuned the receiver to
            the channel that was open.
          </p>

          <h2>Why the sky is blue (and sunsets red)</h2>
          <p>
            Air molecules scatter light — weakly, but with a savage wavelength bias: scattering
            strength goes as <strong>1/λ⁴</strong>, so 450 nm blue is bounced around several
            times more than 650 nm red. Look anywhere but at the Sun and you see this scattered
            blue haze. At sunset the light crosses so much air that the blue has been scattered{" "}
            <em>out</em> of the beam entirely — what survives the long path is the red, painted
            on the clouds.
          </p>

          <div className="callout note">
            <span className="co-title">Fingerprints in the rainbow</span>
            <p>
              Look closely at a star&rsquo;s spectrum and dark lines interrupt it — each element
              in its atmosphere absorbs its own precise wavelengths. Helium was discovered in
              the Sun&rsquo;s lines before anyone found it on Earth (hence the name, from
              *helios*). Those sharp, quantised lines are also a loose thread: pull it and
              quantum physics unravels out — next unit.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Prism Bench",
        intro: (
          <>
            <p>White light in, spectrum out — with a wavelength slider to walk the whole keyboard.</p>
            <ul>
              <li>Watch violet bend harder than red through the prism: dispersion, live.</li>
              <li>Drag the wavelength marker out of the visible band in both directions — the labels keep going.</li>
              <li>Check the scattering meter as you go blue: 1/λ⁴ is why the sky is up there.</li>
            </ul>
          </>
        ),
        Component: SpectrumLab,
      },
      problems: [
        {
          prompt:
            "Green light has λ = 500 nm. What is its frequency, in Hz? (c = 3 × 10⁸ m/s; answer like 6e14)",
          answer: 600000000000000,
          unit: "Hz",
          tolerancePct: 2,
          hint: "f = c/λ; 500 nm = 5 × 10⁻⁷ m.",
          explain: "3×10⁸ ÷ 5×10⁻⁷ = 6×10¹⁴ Hz — six hundred trillion crests per second hitting your retina.",
        },
        {
          prompt:
            "Blue light (450 nm) scatters more than red (650 nm) by the factor (650/450)⁴. How many times more? (one decimal)",
          answer: 4.4,
          unit: "×",
          tolerancePct: 5,
          hint: "(1.444…)⁴.",
          explain: "(650/450)⁴ ≈ 4.4 — the sky's blueness, as a single number.",
        },
      ],
      quiz: [
        {
          q: "What does a prism do to white light?",
          choices: [
            "Adds colours to it",
            "Sorts the mixture it already contains, because each wavelength bends slightly differently",
            "Filters out everything but the rainbow",
            "Slows it until it becomes visible",
          ],
          answer: 1,
          explain:
            "Dispersion: n depends slightly on λ, so violet pivots harder than red. Newton's second prism proved the colours recombine into white.",
        },
        {
          q: "Visible light, radio waves and X-rays are…",
          choices: [
            "three different phenomena",
            "sound at different speeds",
            "the same electromagnetic wave at different wavelengths",
            "only related mathematically",
          ],
          answer: 2,
          explain:
            "One spectrum, one speed c, wavelengths from kilometres to atom-widths. Your eye happens to sample a 300 nm sliver of it.",
        },
        {
          q: "Why is the sky blue?",
          choices: [
            "Air molecules scatter short wavelengths far more strongly (∝ 1/λ⁴), and blue is short",
            "The atmosphere is faintly blue-tinted",
            "It reflects the ocean",
            "The Sun emits mostly blue light",
          ],
          answer: 0,
          explain:
            "Blue is bounced around the sky several times more than red; look anywhere but at the Sun and scattered blue is what arrives.",
        },
        {
          q: "Why do sunsets look red?",
          choices: [
            "The Sun cools in the evening",
            "Dust adds red light",
            "Your eyes tire of blue",
            "The long path through air scatters the blue out of the beam — what survives is red",
          ],
          answer: 3,
          explain:
            "Same scattering, longer path: subtraction of blue rather than addition of red. The lost blue is someone else's daytime sky.",
        },
      ],
    },
  ],
};
