import type { UnitModule } from "./types";
import { LcRingLab, TunerLab, AmDetectorLab } from "@/spark/components/labs/labs-unit9";

export const unit9: UnitModule = {
  unit: {
    id: "u9",
    num: 9,
    title: "Resonance & Radio",
    blurb:
      "The expert course begins: put L and C together and circuits ring like bells — ring at the right pitch and you can pluck one voice out of the crowded air.",
    track: "expert",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "lc-resonance",
      unitId: "u9",
      title: "LC Resonance",
      subtitle:
        "A capacitor and an inductor trade energy back and forth like a pendulum — every circuit's natural note.",
      buildsOn: ["capacitors", "inductors", "filters"],
      Theory: () => (
        <>
          <h2>The electrical pendulum</h2>
          <p>
            You know both players. A capacitor stores energy in its electric field (2.3); an
            inductor stores it in a magnetic field (2.4). Connect them in a loop —
            a <strong>tank circuit</strong> — charge the capacitor, and let go. The capacitor
            pushes current through the coil; the coil&rsquo;s field builds; when the capacitor
            is empty the coil <em>refuses to stop</em> (inductors hate change!) and keeps
            pushing, charging the capacitor the other way. Then the whole dance reverses.
            Voltage and current swap leadership 90° apart, exactly like a pendulum trading
            height for speed.
          </p>
          <div className="formula">
            f₀ = 1 / (2π·√(L·C))
            <span className="note">the natural (resonant) frequency — bigger L or C, lower the note</span>
          </div>
          <p>
            This isn&rsquo;t a metaphor — it is mathematically <em>the same equation</em> as a
            mass on a spring. Physicists call every such system a harmonic oscillator; you have
            just built the electrical one.
          </p>

          <h2>Q: how pure is the bell?</h2>
          <p>
            Real loops have resistance, and every slosh loses a little energy to heat — so the
            ring decays. The <strong>Q factor</strong> counts roughly how many times the tank
            rings before dying (more precisely, Q ≈ √(L/C)/R for a series loop). A high-Q tank
            is a tuning fork: struck once, it hums for ages, and — the flip side that matters
            for radio — it <em>responds enthusiastically only to frequencies very near f₀</em>.
            A low-Q tank is a struck pillow.
          </p>

          <h2>Resonance is everywhere</h2>
          <ul>
            <li><strong>Radio tuning</strong> — next lesson, and the reason this unit exists.</li>
            <li><strong>Crystals:</strong> quartz resonators are mechanical LC-equivalents with Q in the tens of thousands — they discipline every clock you own (remember the 32 768 Hz watch crystal from 7.3?).</li>
            <li><strong>Wireless charging:</strong> two coils resonating at the same frequency pass power across an air gap.</li>
            <li><strong>The dark side:</strong> unintended resonances make bridges gallop and audio circuits howl. Engineers spend careers adding damping.</li>
          </ul>
          <div className="callout note">
            <span className="co-title">Filters, completed</span>
            <p>
              Your RC filters (5.3) could only slope gently up or down. An LC pair gives filters
              a <em>peak</em> — a band-pass that favours one frequency. That peak is the whole
              secret of the next lesson.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Ring the Bell",
        intro: (
          <>
            <p>A tank circuit you can kick, with the energy see-saw made visible.</p>
            <ul>
              <li>Kick it and watch voltage (cyan) and current (amber) chase each other, 90° apart.</li>
              <li>Quadruple C (100 nF → 400 nF): the note drops exactly one octave (f₀ ∝ 1/√C).</li>
              <li>Raise the loop resistance: same note, but the bell dies young. That&rsquo;s Q.</li>
            </ul>
          </>
        ),
        Component: LcRingLab,
      },
      quiz: [
        {
          q: "In a ringing LC tank, the energy…",
          choices: [
            "Slowly leaks into the capacitor",
            "Sloshes between the capacitor's electric field and the inductor's magnetic field",
            "Stays in the wires",
            "Is created by the resonance",
          ],
          answer: 1,
          explain:
            "C empties into L, L recharges C the other way, forever (minus resistive losses) — a pendulum trading height for speed.",
        },
        {
          q: "f₀ = 1/(2π√(LC)). Quadrupling C makes the resonant frequency…",
          choices: ["2× lower", "2× higher", "4× higher", "4× lower"],
          answer: 0,
          explain: "f₀ scales as 1/√C: 4× the capacitance → √4 = 2× lower frequency.",
        },
        {
          q: "A high-Q resonator…",
          choices: [
            "Has high resistance",
            "Rings briefly but loudly",
            "Rings long and responds only near its natural frequency",
            "Cannot oscillate",
          ],
          answer: 2,
          explain:
            "Low loss = long ring = sharp frequency preference. That selectivity is exactly what radio tuning needs.",
        },
        {
          q: "Which everyday component is a resonator with an extremely high Q?",
          choices: ["A fuse", "A potentiometer", "An LED", "A quartz crystal"],
          answer: 3,
          explain:
            "Quartz crystals resonate mechanically with Q in the tens of thousands — that's why they keep time in every watch, computer and radio.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "radio-tuning",
      unitId: "u9",
      title: "Tuning: Picking a Station",
      subtitle:
        "Every broadcast in your city arrives at your antenna at once. A variable capacitor and one coil sort them out.",
      buildsOn: ["lc-resonance", "filters"],
      Theory: () => (
        <>
          <h2>The problem: everything, everywhere, all at once</h2>
          <p>
            An antenna is just a wire in which every passing radio wave induces a little
            voltage — <em>simultaneously</em>. News at 540 kHz, jazz at 760 kHz, rock at
            1000 kHz: your antenna delivers their sum, a hopeless-looking scribble. The receiver&rsquo;s
            first job is <strong>selectivity</strong>: amplify one, ignore the rest.
          </p>

          <h2>The solution: a tuned circuit</h2>
          <p>
            Connect an LC tank across the antenna. Signals at the tank&rsquo;s resonant
            frequency drive it like a well-timed playground push — the response builds cycle
            upon cycle. Signals at other frequencies push out of time and average away to almost
            nothing. The tank is a <strong>band-pass filter</strong> with its peak at f₀, and Q
            sets how narrow the peak is:
          </p>
          <div className="formula">
            bandwidth ≈ f₀ / Q
            <span className="note">f₀ = 1 MHz, Q = 80 → only ±6 kHz around the station gets through</span>
          </div>
          <p>
            Make C variable and f₀ moves — that is literally what the tuning knob on an old
            radio turns: a <strong>variable capacitor</strong>, interleaved metal plates whose
            overlap sets C from ~40 to ~400 pF. With a fixed coil of a couple hundred
            microhenries, that sweeps f₀ across the whole AM broadcast band. (Modern radios
            tune with voltage-controlled capacitors and synthesizers, but the physics is
            unchanged.)
          </p>

          <h2>Selectivity is a trade</h2>
          <p>
            Too low a Q and you hear two stations at once. Too high and you start shaving off
            the audio sidebands the station carries (more on those next lesson) — the sound
            gets muffled. Real receivers chain several tuned stages to get steep skirts without
            strangling the signal. But one LC, honestly, is enough to build a working radio —
            people have done it with a coil wound on a toilet-paper tube for a century.
          </p>
          <div className="callout tip">
            <span className="co-title">Why AM frequencies?</span>
            <p>
              At 1 MHz, one wave cycle is a microsecond — a thousand times faster than anything
              in your earlier labs, yet the same sine-wave mathematics from 5.1 applies without
              modification. Scales change; laws don&rsquo;t.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Crowded Air",
        intro: (
          <>
            <p>Three stations on one antenna, one LC tank, one knob.</p>
            <ul>
              <li>Sweep the capacitor and watch each station rise and fall through the tank&rsquo;s peak.</li>
              <li>At Q = 8, tune between Jazz and Rock: both leak through. Raise Q and separate them.</li>
              <li>Note the antenna trace never changes — selection happens entirely in your tank.</li>
            </ul>
          </>
        ),
        Component: TunerLab,
      },
      quiz: [
        {
          q: "A radio antenna delivers…",
          choices: [
            "Only the station you want",
            "The sum of every signal present — selection happens later, in the receiver",
            "Pure DC",
            "One station at a time, taking turns",
          ],
          answer: 1,
          explain: "Every passing wave induces voltage in the wire simultaneously. The tuned circuit does the choosing.",
        },
        {
          q: "Turning an old radio's tuning knob physically changes…",
          choices: [
            "A variable capacitor, moving the tank's resonant frequency",
            "The antenna length",
            "The battery voltage",
            "The speaker impedance",
          ],
          answer: 0,
          explain: "Interleaved plates change C, and f₀ = 1/(2π√LC) follows. The knob is a capacitor.",
        },
        {
          q: "A tank tuned to 1 MHz with Q = 100 passes a band roughly…",
          choices: ["1 kHz wide", "100 kHz wide", "10 kHz wide", "1 MHz wide"],
          answer: 2,
          explain: "Bandwidth ≈ f₀/Q = 1 MHz/100 = 10 kHz — nicely matched to an AM channel.",
        },
        {
          q: "With too little Q (poor selectivity) you would hear…",
          choices: [
            "Nothing at all",
            "The station, but inverted",
            "Only Morse code",
            "Two neighbouring stations at the same time",
          ],
          answer: 3,
          explain: "A wide, mushy peak lets adjacent carriers through together — the classic cheap-radio problem.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "am-radio",
      unitId: "u9",
      title: "AM & the Envelope Detector",
      subtitle:
        "How music rides on a megahertz wave — and how a diode and an RC, your oldest friends, get it back off.",
      buildsOn: ["radio-tuning", "diodes", "capacitors", "rectifiers"],
      Theory: () => (
        <>
          <h2>Putting sound on a wave</h2>
          <p>
            Audio itself (20 Hz–20 kHz) won&rsquo;t radiate from any reasonable antenna — the
            waves are kilometres long. So we let the audio <em>ride</em> on a high-frequency{" "}
            <strong>carrier</strong> that radiates beautifully. The oldest scheme is{" "}
            <strong>amplitude modulation</strong>: wiggle the carrier&rsquo;s <em>strength</em>{" "}
            in step with the sound.
          </p>
          <div className="formula">
            v(t) = (1 + m·audio(t)) · sin(2π·f_c·t)
            <span className="note">m = modulation depth · the audio lives in the carrier’s outline — its envelope</span>
          </div>
          <p>
            Squint at an AM waveform and you see it: a fast carrier filling a slow-moving
            outline. The outline <em>is</em> the audio. Recover the outline and you have sound.
          </p>

          <h2>The envelope detector: three old parts</h2>
          <p>
            Here is the loveliest circuit in this course, because you already know every piece:
          </p>
          <ol>
            <li>A <strong>diode</strong> (3.1) throws away the bottom half of the wave — a half-wave rectifier (5.2), just at radio frequency.</li>
            <li>A <strong>capacitor</strong> charges to each carrier peak…</li>
            <li>…and a <strong>resistor</strong> lets it sag just fast enough to follow the outline down. Charging fast, discharging slow — your RC smoothing (5.2) with a musical purpose.</li>
          </ol>
          <p>
            The RC choice is a Goldilocks problem: too small and carrier ripple leaks through
            (buzz); too large and the output can&rsquo;t follow the audio downhill (a distortion
            called diagonal clipping). The lab lets you find the sweet spot: 1/f<sub>c</sub> ≪
            RC ≪ 1/f<sub>a</sub>.
          </p>

          <h2>The crystal radio</h2>
          <p>
            Chain the last three lessons — antenna, tuned LC tank, diode + RC detector, and a
            sensitive earphone — and you have a <strong>crystal radio</strong>: a complete
            receiver with <em>no battery</em>, powered entirely by the energy the station
            transmits. Generations of engineers began exactly there. (Fewer AM stations remain
            on air in some regions these days — which is why your hands-on capstone ahead is a
            different build — but the circuit remains the finest teaching machine electronics
            ever produced.)
          </p>
          <div className="callout note">
            <span className="co-title">Beyond AM</span>
            <p>
              FM hides the audio in the carrier&rsquo;s <em>frequency</em> instead of its
              strength (better noise immunity); digital radio hides bits in phase and amplitude
              at once. All of them are still: a carrier, a modulation, a detector.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Riding the Carrier",
        intro: (
          <>
            <p>An AM signal and a diode + RC detector chasing its envelope.</p>
            <ul>
              <li>Set modulation to 100% and watch the envelope pinch to zero between beats.</li>
              <li>Make RC tiny: the detector output buzzes with carrier ripple.</li>
              <li>Make RC huge: it sails over the audio valleys — diagonal clipping. Find Goldilocks.</li>
            </ul>
          </>
        ),
        Component: AmDetectorLab,
      },
      quiz: [
        {
          q: "In AM, the audio information is carried in the wave's…",
          choices: ["Frequency", "Phase", "Amplitude (its envelope)", "Colour"],
          answer: 2,
          explain: "Amplitude Modulation: the carrier's strength traces the audio waveform — the envelope is the sound.",
        },
        {
          q: "An envelope detector consists of…",
          choices: [
            "A diode, a capacitor and a resistor",
            "A transistor and two coils",
            "An op-amp and a crystal",
            "Three capacitors",
          ],
          answer: 0,
          explain:
            "Diode rectifies, C holds each peak, R lets the voltage follow the envelope down — Lessons 3.1 + 2.3 + 5.2 in one.",
        },
        {
          q: "The detector's RC must satisfy…",
          choices: [
            "RC as small as possible",
            "1/f_carrier ≪ RC ≪ 1/f_audio",
            "RC larger than 1/f_audio",
            "RC exactly equal to 1/f_carrier",
          ],
          answer: 1,
          explain:
            "Slow enough to ignore carrier cycles, fast enough to track the audio — the Goldilocks window you explored in the lab.",
        },
        {
          q: "A crystal radio needs no battery because…",
          choices: [
            "Diodes generate power",
            "It doesn't actually work",
            "The earphone contains a cell",
            "It runs on the energy of the received radio wave itself",
          ],
          answer: 3,
          explain:
            "The antenna harvests real (tiny) power from the transmitter's wave — enough for a sensitive earphone. Radio as free lunch.",
        },
      ],
    },
  ],
};
