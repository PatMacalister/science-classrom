import type { UnitModule } from "./types";
import { WaveLab, DopplerLab, StandingWaveLab } from "@/vector/components/labs/labs-unit4";

export const unit4: UnitModule = {
  unit: {
    id: "u4",
    num: 4,
    title: "Waves & Sound",
    blurb:
      "Energy that travels while the stuff stays put. One vocabulary — wavelength, frequency, speed — covers ocean swell, concert halls and Wi-Fi.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "waves",
      unitId: "u4",
      title: "Waves: Motion Without Transport",
      subtitle:
        "A stadium wave circles the ground while every fan stays in their seat. That trick — energy travelling through stuff that doesn't — runs half of physics.",
      buildsOn: ["energy"],
      seeAlso: [
        {
          course: "spark",
          slug: "filters",
          label: {
            en: "⚡ Spark: Filters — circuits that sort signals by this same frequency idea",
            de: "⚡ Spark: Filter — Schaltungen, die Signale nach genau dieser Frequenz-Idee sortieren",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>What actually travels</h2>
          <p>
            Drop a pebble in a pond and rings race outward — but a floating cork only bobs in
            place. The water does not travel; the <strong>disturbance</strong> does, handed from
            neighbour to neighbour, carrying energy without carrying material. That is a wave,
            and it is why you can be knocked over by surf that stayed offshore all day and hear
            a voice whose air never left the speaker&rsquo;s lungs.
          </p>
          <p>Two body plans:</p>
          <ul>
            <li>
              <strong>Transverse</strong> — the medium moves <em>across</em> the travel
              direction: a shaken rope, water ripples, light.
            </li>
            <li>
              <strong>Longitudinal</strong> — the medium moves <em>along</em> it, as squeezes
              and stretches: a pushed slinky, and — the important one — <strong>sound</strong>,
              which is pressure ripples in air.
            </li>
          </ul>

          <h2>Three numbers, one law</h2>
          <p>
            <strong>Wavelength λ</strong> — metres from crest to crest. <strong>Frequency
            f</strong> — crests per second, in hertz. <strong>Speed v</strong> — how fast a
            crest travels. They are locked together:
          </p>
          <div className="formula">
            v = f·λ
            <span className="note">crests per second × metres per crest = metres per second</span>
          </div>
          <p>
            The catch that makes this law useful: <strong>speed belongs to the medium, not the
            wave</strong>. Sound does ~343 m/s in room air whether you whisper or shout, squeak
            or rumble. So when a source raises its frequency, the wavelength must shrink to
            compensate — f and λ trade off on a fixed budget. Concert A (440 Hz) rides on
            78 cm waves; a bass drum&rsquo;s 60 Hz spans nearly six metres.
          </p>

          <h2>One vocabulary, everything wavy</h2>
          <p>
            The same three numbers describe ocean swell (λ ≈ 100 m, leisurely), audible sound
            (17 mm–17 m), and radio — your Wi-Fi router works at 2.4 GHz, λ ≈ 12 cm. Learn the
            grammar once and every wavy phenomenon in the rest of this course — sound, light,
            even the quantum world — is a new accent, not a new language.
          </p>

          <div className="callout note">
            <span className="co-title">Count the seconds to the storm</span>
            <p>
              Light reaches you almost instantly; thunder plods along at 343 m/s — roughly a
              kilometre every three seconds. Flash, count, divide by three: kilometres to the
              strike. You have been doing wave physics since childhood.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Wave Machine",
        intro: (
          <>
            <p>A driven rope with dials for frequency and medium — and a marked bead that tells the truth.</p>
            <ul>
              <li>Raise the frequency and watch the crests crowd together: v is fixed, so λ must shrink.</li>
              <li>Switch to a faster medium at the same f — the wavelength stretches instantly.</li>
              <li>Watch the red bead: it only bobs. The wave travels; the rope does not.</li>
            </ul>
          </>
        ),
        Component: WaveLab,
      },
      problems: [
        {
          prompt: "Concert A is 440 Hz and sound travels at 343 m/s. What is its wavelength, in metres?",
          answer: 0.78,
          unit: "m",
          tolerancePct: 2,
          hint: "λ = v/f.",
          explain: "343 ÷ 440 ≈ 0.78 m — about the width of a doorway per cycle of the note.",
        },
        {
          prompt: "Thunder arrives 9 s after the flash (v = 343 m/s). How far away was the strike, in metres?",
          answer: 3087,
          unit: "m",
          tolerancePct: 2,
          hint: "Distance = speed × time.",
          explain: "343 × 9 ≈ 3,087 m — the count-and-divide-by-three rule, done properly.",
        },
      ],
      quiz: [
        {
          q: "A cork floats on rippling water. As the wave passes, the cork…",
          choices: [
            "travels along with the crest",
            "sinks",
            "bobs in place — the disturbance travels, the water doesn't",
            "drifts against the wave",
          ],
          answer: 2,
          explain:
            "Waves transport energy, not medium. Each patch of water hands the motion to its neighbour and stays home.",
        },
        {
          q: "Sound is a longitudinal wave. That means the air…",
          choices: [
            "vibrates back and forth along the direction the sound travels, as compressions",
            "vibrates across the travel direction",
            "flows from speaker to ear",
            "doesn't move at all",
          ],
          answer: 0,
          explain:
            "Sound is a parade of squeezes and stretches in the air. No air travels from mouth to ear — only the pattern does.",
        },
        {
          q: "A source doubles its frequency. In the same medium, the wavelength…",
          choices: ["doubles", "halves", "stays the same", "quadruples"],
          answer: 1,
          explain:
            "v = fλ and v is the medium's fixed property. Twice the crests per second must mean half the distance between them.",
        },
        {
          q: "What sets the speed of a wave?",
          choices: [
            "The loudness of the source",
            "The frequency of the source",
            "How hard the source shakes",
            "The medium it travels through",
          ],
          answer: 3,
          explain:
            "Shout or whisper, 60 Hz or 6 kHz — in room air it all does ~343 m/s. Change the medium (helium, water, steel) and the speed changes.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "sound",
      unitId: "u4",
      title: "Sound: Pressure in Flight (and a Build)",
      subtitle:
        "Pitch is frequency, loudness is amplitude, and a passing siren bends both rules audibly. Then: measure the speed of sound with a wall and a clap.",
      buildsOn: ["waves"],
      Theory: () => (
        <>
          <h2>The two dials of a sound</h2>
          <p>
            <strong>Pitch is frequency.</strong> A young ear spans roughly 20 Hz to 20,000 Hz
            (the top eroding with age and headphone habits); a piano runs 27.5 to 4,186 Hz.
            Doubling the frequency raises the note exactly one octave — music is arithmetic your
            ear does for free. <strong>Loudness is amplitude</strong> — how hard the air is
            squeezed. Ears handle such a vast range that loudness is measured on the
            logarithmic decibel scale: every +10 dB is ×10 in energy. A 100 dB club is not
            &ldquo;a bit&rdquo; above an 85 dB limit; it is over thirty times the power.
          </p>

          <h2>Sound needs stuff</h2>
          <p>
            Pressure waves need something to squeeze. In a vacuum: silence — the film
            explosions are a courtesy. And the stiffer and lighter the medium&rsquo;s springs,
            the faster the wave: ~343 m/s in room air, ~1,480 m/s in water, ~5,000 m/s in
            steel. Cowboys in films press an ear to the rail because the steel delivers the
            train&rsquo;s rumble long before the air does.
          </p>

          <h2>The Doppler effect</h2>
          <p>
            A siren passes and its pitch visibly droops — <em>eeee-yooow</em>. The siren never
            changed; the geometry did. Moving toward you, the source partly chases its own
            waves, packing crests closer: shorter λ, higher pitch. Moving away, it stretches
            them. The effect belongs to <em>every</em> wave: radar guns Doppler microwaves off
            your car, bats do it to moths, and the redshift of galaxies — light stretched by
            recession — is the Doppler clue that the universe expands.
          </p>

          <h2>The build: clap at a wall</h2>
          <p>
            Sound&rsquo;s speed is slow enough to measure in a courtyard.{" "}
            Stand 40+ metres from a big flat wall, clap, and the echo returns after the round
            trip: t = 2d/v — at 50 m, about 0.29 s. Too quick to time well <em>once</em> — so
            borrow the pendulum trick: <strong>clap in rhythm with your own echoes</strong>,
            so each clap lands exactly on the previous echo&rsquo;s return. Your rhythm period
            is then exactly the round-trip time. Time 20 claps, divide, and:
          </p>
          <div className="formula">
            v = 2·d / T
            <span className="note">distance there and back, over your clap period — expect within ~10% of 343 m/s</span>
          </div>

          <div className="callout note">
            <span className="co-title">Sonar is this build, weaponised</span>
            <p>
              Ships, bats and ultrasound scanners all run your courtyard experiment at higher
              frequency: send a pulse, time the echo, multiply by the known speed to get
              distance. You are calibrating the ruler they all use.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Siren Flyby",
        intro: (
          <>
            <p>A sound source you can drive past a listener, with the wavefronts drawn honestly.</p>
            <ul>
              <li>Park the source: perfect circles, steady pitch. Now drive — watch the circles crowd ahead and stretch behind.</li>
              <li>Read the heard frequency before and after the pass; the drop is the eeee-yooow.</li>
              <li>Push the source toward the speed of sound and watch the crests pile into a wall.</li>
            </ul>
          </>
        ),
        Component: DopplerLab,
      },
      problems: [
        {
          prompt:
            "You clap in rhythm with your echo off a wall 43 m away, and 20 claps take 5.0 s. What speed of sound does that give, in m/s? (v = 2d/T)",
          answer: 344,
          unit: "m/s",
          tolerancePct: 2,
          hint: "T = 5.0/20 = 0.25 s per round trip.",
          explain: "v = 2 × 43 / 0.25 = 344 m/s — courtyard equipment, textbook answer.",
        },
        {
          prompt: "An ultrasound pulse in tissue (v ≈ 1,540 m/s) returns after 0.0001 s. How deep is the reflector, in metres?",
          answer: 0.077,
          unit: "m",
          tolerancePct: 3,
          hint: "Half the round trip.",
          explain: "d = v·t/2 = 1,540 × 0.0001 / 2 = 0.077 m ≈ 7.7 cm — a fetal scan in one multiplication.",
        },
      ],
      checklist: [
        { id: "site", text: "Found a big flat wall with 40+ m of clear space in front (gym end, barn, warehouse) and paced or measured the distance." },
        { id: "predict", text: "Predicted the round-trip time first: t = 2d/343. Wrote it down before clapping." },
        { id: "single", text: "Clapped once and actually heard the discrete echo — adjusted distance if it blurred into the clap." },
        { id: "rhythm", text: "Practised clapping in rhythm with the returning echoes, each clap landing on the echo of the last." },
        { id: "time", text: "Had the phone time 20 rhythm claps; repeated three times and averaged." },
        { id: "compute", text: "Computed v = 2d/T from the average period." },
        { id: "compare", text: "Compared with 343 m/s — within ~10% counts as a win with this gear — and named the dominant error." },
        { id: "vary", text: "Bonus: repeated on a cold vs warm day, or estimated how much your distance error alone moves the result." },
      ],
      quiz: [
        {
          q: "What does the frequency of a sound wave determine?",
          choices: ["Its loudness", "Its pitch", "Its speed", "Its direction"],
          answer: 1,
          explain:
            "Pitch is frequency; loudness is amplitude. Speed belongs to the medium and cares about neither.",
        },
        {
          q: "Why does a siren's pitch drop as it passes you?",
          choices: [
            "The driver turns it down",
            "It runs out of energy",
            "Approaching, crests are packed closer (higher f); receding, they are stretched (lower f)",
            "Echoes interfere with it",
          ],
          answer: 2,
          explain:
            "The source chases its own waves on approach and runs from them on retreat. The siren never changed — your side of the geometry did.",
        },
        {
          q: "Why is there no sound in space?",
          choices: [
            "It is too cold",
            "Sound moves too slowly to escape planets",
            "Space absorbs all frequencies",
            "Sound is a pressure wave — with nothing to squeeze, there is no wave",
          ],
          answer: 3,
          explain:
            "No medium, no compressions. Light crosses vacuum happily (next unit's subject); sound cannot.",
        },
        {
          q: "In the echo experiment, why clap in rhythm with the echoes instead of timing one echo?",
          choices: [
            "A 0.3 s interval is hopeless to time once, but twenty of them stretch the error over seconds",
            "Rhythm makes the echo louder",
            "Single echoes travel at a different speed",
            "It's only for fun",
          ],
          answer: 0,
          explain:
            "The pendulum trick again: accumulate many periods so your fixed reaction error becomes a small fraction. Good measurement is mostly error management.",
        },
        {
          q: "Every +10 dB of loudness means…",
          choices: ["10% more energy", "double the energy", "ten times the energy", "10 m/s faster sound"],
          answer: 2,
          explain:
            "Decibels are logarithmic because ears span a trillion-fold range. +30 dB is ×1,000 in power — why hearing protection thresholds matter.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "interference",
      unitId: "u4",
      title: "Interference: When Waves Meet",
      subtitle:
        "Two waves in the same place simply add — crest on crest doubles, crest on trough cancels to silence. That one rule builds standing waves, musical notes and noise-cancelling headphones.",
      buildsOn: ["waves", "sound"],
      Theory: () => (
        <>
          <h2>Superposition: the adding rule</h2>
          <p>
            When two waves occupy the same spot, the medium does both motions at once: the
            displacements <strong>add, sign included</strong>. Crest meets crest — double
            height (<strong>constructive</strong>). Crest meets equal trough — flat nothing
            (<strong>destructive</strong>): two sounds can genuinely sum to silence. Then they
            pass through each other unchanged, as if the meeting never happened. Particles
            collide; waves interpenetrate. This is <em>the</em> behavioural test for
            wave-hood — remember that for the quantum unit.
          </p>
          <p>
            Noise-cancelling headphones are destructive interference as a product: a microphone
            samples the incoming noise and the speaker plays its mirror image, trough against
            crest, at your eardrum.
          </p>

          <h2>Standing waves: interference with yourself</h2>
          <p>
            Shake a rope fixed at the far end and your wave reflects and returns through the
            outgoing one. At most shaking rates the mess averages out — but at special
            frequencies the two trains reinforce into a <strong>standing wave</strong>: fixed{" "}
            <strong>nodes</strong> that never move, fat <strong>antinodes</strong> that pump,
            and no visible travel at all.
          </p>
          <p>
            The condition is geometric: waves fit a string of length L only if a whole number of
            half-wavelengths spans it —
          </p>
          <div className="formula">
            λₙ = 2L/n &nbsp;·&nbsp; fₙ = n·f₁
            <span className="note">one resonant family: the fundamental and its integer harmonics</span>
          </div>

          <h2>Why instruments have notes</h2>
          <p>
            A guitar string can only sustain its resonant family — pluck it and everything else
            cancels itself out within milliseconds, leaving the fundamental (the pitch) plus a
            cocktail of harmonics whose mix is the <strong>timbre</strong>: why guitar and piano
            sound different on the same A. Fretting shortens L and retunes the family; wind
            instruments do the same with resonating air columns. Every melody ever played is
            applied interference.
          </p>
          <p>
            Two sources <em>slightly</em> out of tune interfere too — drifting in and out of
            step at their difference frequency. The slow <strong>wah-wah-wah</strong> of{" "}
            <strong>beats</strong> is how string players tune: adjust until the beating slows to
            zero and the frequencies are equal.
          </p>

          <div className="callout note">
            <span className="co-title">Rooms have notes too</span>
            <p>
              A shower cubicle is a resonator, and its family of standing waves is why your
              singing suddenly sounds rich in there — you have accidentally matched a mode.
              Concert-hall acousticians spend careers making sure no single note gets that
              favour.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The String's Family",
        intro: (
          <>
            <p>A driven string with a frequency dial — most settings make a mess, a few make magic.</p>
            <ul>
              <li>Sweep the frequency slowly: watch chaos snap into a clean standing wave at the fundamental.</li>
              <li>Keep going: the harmonics appear exactly at 2×, 3×, 4× — count the antinodes each time.</li>
              <li>Shorten the string and watch the whole family shift up — that is fretting a guitar.</li>
            </ul>
          </>
        ),
        Component: StandingWaveLab,
      },
      problems: [
        {
          prompt:
            "A 0.65 m guitar string sounds a fundamental of 110 Hz. What frequency is its 3rd harmonic, in Hz?",
          answer: 330,
          unit: "Hz",
          hint: "fₙ = n·f₁.",
          explain: "3 × 110 = 330 Hz. The harmonic family is just the integer multiples — music's free arithmetic.",
        },
        {
          prompt:
            "Two guitar strings sound 440 Hz and 444 Hz together. How many beats per second do you hear?",
          answer: 4,
          unit: "beats/s",
          hint: "Beat frequency = the difference.",
          explain: "444 − 440 = 4 wah-wahs per second. Tune until they vanish and the strings agree exactly.",
        },
      ],
      quiz: [
        {
          q: "A crest of one wave meets an equal trough of another. The medium there…",
          choices: [
            "moves twice as much",
            "moves at the average",
            "is momentarily flat — the displacements cancel",
            "reflects both waves",
          ],
          answer: 2,
          explain:
            "Superposition adds with sign: +1 and −1 make 0. Two sounds can sum to silence — noise-cancelling headphones sell exactly this.",
        },
        {
          q: "What is a node of a standing wave?",
          choices: [
            "A point that never moves — the two wave trains always cancel there",
            "The point of maximum motion",
            "Where the wave changes speed",
            "The fixed end only",
          ],
          answer: 0,
          explain:
            "Outgoing and reflected waves cancel permanently at the nodes and reinforce at the antinodes between them.",
        },
        {
          q: "Why does a guitar string produce a definite note rather than every frequency at once?",
          choices: [
            "The pick selects one frequency",
            "Only wavelengths that fit the string's length survive; everything else self-cancels",
            "Air filters out the wrong frequencies",
            "Strings can only vibrate at one frequency, full stop",
          ],
          answer: 1,
          explain:
            "The string's ends force nodes, so only the λ = 2L/n family persists. The fundamental gives the pitch; the harmonic mix gives the timbre.",
        },
        {
          q: "Two strings at 440 and 442 Hz played together produce…",
          choices: [
            "a steady 441 Hz tone",
            "silence",
            "an octave",
            "a tone pulsing in loudness twice per second — beats",
          ],
          answer: 3,
          explain:
            "Nearly-equal waves drift between in-step and out-of-step at their difference frequency. Tuners listen for the pulsing to die.",
        },
      ],
    },
  ],
};
