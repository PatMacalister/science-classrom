import type { UnitModule } from "./types";
import { AcWaveformsLab, RectifierLab, FilterLab } from "@/spark/components/labs/labs-unit5";

const W = "#94a3b3";

/** A diode drawn along +x: triangle then bar, centred at (0,0). */
export function DiodeSym({ x, y, angle }: { x: number; y: number; angle: number }) {
  return (
    <g transform={`translate(${x},${y}) rotate(${angle})`}>
      <polygon points="-9,-9 -9,9 8,0" fill={W} />
      <line x1="8" y1="-9" x2="8" y2="9" stroke={W} strokeWidth="2.5" />
    </g>
  );
}

export function BridgeSVG() {
  return (
    <div className="diagram">
      <svg viewBox="0 0 560 270" width="560" height="270" role="img" aria-label="Full-wave bridge rectifier">
        <g stroke={W} strokeWidth="2" fill="none">
          {/* diamond */}
          <line x1="150" y1="130" x2="230" y2="50" />
          <line x1="230" y1="50" x2="310" y2="130" />
          <line x1="150" y1="130" x2="230" y2="210" />
          <line x1="230" y1="210" x2="310" y2="130" />
          {/* AC source */}
          <circle cx="70" cy="130" r="22" />
          <path d="M 58 130 q 6 -10 12 0 q 6 10 12 0" />
          <line x1="92" y1="130" x2="150" y2="130" />
          <line x1="70" y1="152" x2="70" y2="240" />
          <line x1="70" y1="240" x2="310" y2="240" />
          <line x1="310" y1="240" x2="310" y2="130" />
          {/* DC out */}
          <line x1="230" y1="50" x2="230" y2="28" />
          <line x1="230" y1="28" x2="480" y2="28" />
          <line x1="480" y1="28" x2="480" y2="90" />
          <polyline points="480,90 472,98 488,106 472,114 488,122 472,130 488,138 480,146" />
          <line x1="480" y1="146" x2="480" y2="212" />
          <line x1="480" y1="212" x2="230" y2="212" />
          <line x1="230" y1="212" x2="230" y2="210" />
        </g>
        {/* the four diodes, all pointing "towards +" */}
        <DiodeSym x={190} y={90} angle={-45} />
        <DiodeSym x={270} y={90} angle={-135} />
        <DiodeSym x={190} y={170} angle={-135} />
        <DiodeSym x={270} y={170} angle={-45} />
        <g fill="#8fa0b3" fontSize="12" fontFamily="sans-serif">
          <text x="40" y="100">AC in</text>
          <text x="500" y="120">load</text>
          <text x="240" y="46" fill="#f26d6d" fontWeight="bold">+</text>
          <text x="240" y="206" fill="#4cc9f0" fontWeight="bold">−</text>
        </g>
      </svg>
      <div className="caption">
        The full-wave bridge: whichever way the AC swings, current is steered through two diodes
        so it always exits the + terminal. Trace both half-cycles with your finger.
      </div>
    </div>
  );
}

export const unit5: UnitModule = {
  unit: {
    id: "u5",
    num: 5,
    title: "Alternating Current & Signals",
    blurb:
      "The advanced course begins: voltages that wiggle. Sine waves, turning AC into DC, and filters that hear some frequencies but not others.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "ac-waveforms",
      unitId: "u5",
      title: "Alternating Current",
      subtitle:
        "Everything so far pushed one way. The grid, audio and radio all wiggle — meet the sine wave and its honest average, RMS.",
      buildsOn: ["voltage", "inductors", "power"],
      Theory: () => (
        <>
          <h2>Why the grid wiggles</h2>
          <p>
            Every circuit so far ran on <strong>DC</strong> — direct current, one steady
            direction. But the power in your wall is <strong>AC</strong>: the voltage swings
            smoothly positive, negative and back, 50 or 60 times a second. The reason is a
            lesson you&rsquo;ve already had: <em>transformers only work with changing current</em>{" "}
            (Lesson 2.4). AC lets the grid step voltage up to hundreds of kilovolts for
            low-loss transmission (P<sub>loss</sub> = I²R — high voltage means low current for
            the same power), then step it back down to safe levels at your street. DC won a few
            battles; AC won the war for distribution.
          </p>

          <h2>Anatomy of a sine wave</h2>
          <p>
            The natural shape of AC is the <strong>sine wave</strong> — it&rsquo;s what a coil
            spinning in a magnetic field produces automatically. Three numbers pin one down:
          </p>
          <div className="formula">
            v(t) = V<sub>p</sub> · sin(2π·f·t)
            <span className="note">Vp = peak · f = cycles per second (Hz) · T = 1/f = period</span>
          </div>
          <ul>
            <li><strong>Peak (V<sub>p</sub>)</strong>: the highest instantaneous value. Peak-to-peak is the full swing, 2V<sub>p</sub>.</li>
            <li><strong>Frequency (f)</strong>: cycles per second. Mains: 50 Hz (Europe) / 60 Hz (North America). Audio: 20 Hz–20 kHz. Radio: kHz to GHz.</li>
            <li><strong>Phase</strong>: where in its cycle a wave is, relative to another — it mattered already in your filter&rsquo;s future and matters hugely in AC power.</li>
          </ul>

          <h2>RMS: the honest average</h2>
          <p>
            What&rsquo;s &ldquo;the&rdquo; voltage of a wave that spends its life changing? The
            plain average of a sine is zero — useless. The meaningful average asks:{" "}
            <em>what DC voltage would heat a resistor equally?</em> That&rsquo;s the{" "}
            <strong>root-mean-square</strong> value, and for sines it comes out beautifully
            simple:
          </p>
          <div className="formula">
            V<sub>rms</sub> = V<sub>p</sub> / √2 ≈ 0.707 · V<sub>p</sub>
            <span className="note">so “230 V mains” actually peaks at 325 V, “120 V” at 170 V</span>
          </div>
          <p>
            Every AC rating you meet — mains voltage, multimeter AC readings, amplifier power —
            is RMS unless stated otherwise. All your Unit 1 power formulas work unchanged with
            RMS values: P = V<sub>rms</sub>·I<sub>rms</sub> for a resistive load.
          </p>

          <div className="callout note">
            <span className="co-title">AC is also how information travels</span>
            <p>
              A microphone turns pressure waves into small AC voltages; radio stations are AC at
              millions of hertz; the data lines in your computer are fast-switching waveforms.
              From this unit on, think of AC not just as power but as <em>signals</em> — the
              rest of the advanced course is about shaping and processing them.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Waveform Machine",
        intro: (
          <>
            <p>A live sine on the scope, with its peak and RMS lines marked.</p>
            <ul>
              <li>Sweep the frequency from 10 to 200 Hz and watch cycles crowd into the fixed window.</li>
              <li>Confirm the green RMS line always sits at 70.7% of the peak.</li>
              <li>Set Vp = 12 V: what would a DC voltmeter&rsquo;s “equivalent heating” reading be?</li>
            </ul>
          </>
        ),
        Component: AcWaveformsLab,
      },
      quiz: [
        {
          q: "A sine wave peaks at 10 V. Its RMS value is about…",
          choices: ["7.1 V", "10 V", "5 V", "14.1 V"],
          answer: 0,
          explain: "Vrms = Vp/√2 = 10/1.414 ≈ 7.07 V — the DC voltage with the same heating power.",
        },
        {
          q: "Why is grid power AC rather than DC?",
          choices: [
            "AC is safer to touch",
            "Transformers need changing current, and transformers make long-distance transmission efficient",
            "Batteries can't make DC",
            "AC travels faster down the wire",
          ],
          answer: 1,
          explain:
            "Induction (Lesson 2.4) requires change. AC lets transformers step voltage up for low-loss lines and back down for homes.",
        },
        {
          q: "European “230 V” mains actually peaks at roughly…",
          choices: ["230 V", "163 V", "325 V", "460 V"],
          answer: 2,
          explain: "230 V is RMS. Peak = 230 × √2 ≈ 325 V.",
        },
        {
          q: "The period of 50 Hz mains is…",
          choices: ["50 ms", "0.5 s", "2 ms", "20 ms"],
          answer: 3,
          explain: "T = 1/f = 1/50 = 0.02 s = 20 ms per full cycle.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "rectifiers",
      unitId: "u5",
      title: "Rectifiers: AC → DC",
      subtitle:
        "Your gadgets run on DC but the wall supplies AC. Diodes to the rescue — this lesson is the inside of every charger you own.",
      buildsOn: ["diodes", "capacitors", "ac-waveforms"],
      Theory: () => (
        <>
          <h2>The one-way valve meets the wiggle</h2>
          <p>
            You already own the key component: the diode (Lesson 3.1) passes current one way
            only. Feed it AC and it simply deletes the negative half of every cycle. That&rsquo;s
            a <strong>half-wave rectifier</strong>: one diode, output that pulses in one
            direction — but half the energy is thrown away and the gaps are huge.
          </p>

          <h2>The bridge: use both halves</h2>
          <p>
            Four diodes in a diamond — the <strong>bridge rectifier</strong> — steer{" "}
            <em>both</em> halves of the cycle the same way through the load. When the AC swings
            positive, one diagonal pair conducts; when negative, the other pair. The output is
            the absolute value of the input (minus two diode drops ≈ 1.4 V), pulsing at{" "}
            <em>twice</em> the mains frequency.
          </p>
          <BridgeSVG />

          <h2>Smoothing: the reservoir</h2>
          <p>
            Pulsing DC isn&rsquo;t good enough for electronics — so add a big capacitor across
            the output (Lesson 2.3, now at industrial scale). It charges to each peak, then
            supplies the load while the input dips, sagging only slightly until the next peak
            refills it. The leftover wobble is called <strong>ripple</strong>, and the fight
            against it is a pure RC story: bigger C or lighter load (bigger R) → bigger τ = RC
            relative to the 10 ms between peaks → smaller ripple.
          </p>
          <div className="formula">
            transform ↓ → rectify → smooth → regulate
            <span className="note">the four-step recipe inside essentially every AC-powered supply</span>
          </div>

          <div className="callout warn">
            <span className="co-title">Respect the reservoir</span>
            <p>
              The smoothing capacitors in real supplies are large and can hold a charge long
              after unplugging (Lesson 2.3&rsquo;s warning, now with teeth). Never poke inside a
              mains power supply — build your low-voltage skills first; the concepts transfer
              exactly.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Charger Anatomy",
        intro: (
          <>
            <p>A 9 V-peak, 50 Hz source through your choice of rectifier.</p>
            <ul>
              <li>Compare half-wave and bridge: count the humps per 3 cycles.</li>
              <li>Add the capacitor and watch the sawtooth ripple appear. Grow C — ripple shrinks.</li>
              <li>Now lower the load R (heavier load). Why does ripple grow? Think τ = RC.</li>
            </ul>
          </>
        ),
        Component: RectifierLab,
      },
      quiz: [
        {
          q: "A full-wave bridge rectifier uses how many diodes?",
          choices: ["1", "4", "2", "8"],
          answer: 1,
          explain: "Four, in a diamond. Each half-cycle, one diagonal pair conducts and steers current the same way through the load.",
        },
        {
          q: "With 50 Hz AC in, a bridge rectifier's output ripple pulses at…",
          choices: ["25 Hz", "50 Hz", "100 Hz", "It's perfectly smooth"],
          answer: 2,
          explain: "Both halves of every cycle become humps: 2 × 50 = 100 humps per second.",
        },
        {
          q: "The smoothing capacitor reduces ripple by…",
          choices: [
            "Blocking the AC entirely",
            "Lowering the output voltage",
            "Increasing the frequency",
            "Charging at the peaks and feeding the load during the dips",
          ],
          answer: 3,
          explain: "It's a reservoir: topped up at each peak, drained (slightly) by the load in between — the RC story from Lesson 2.3.",
        },
        {
          q: "A bridge's DC output peaks about 1.4 V below the AC peak because…",
          choices: [
            "Current always crosses two diodes, each dropping ~0.7 V",
            "The capacitor eats voltage",
            "RMS is lower than peak",
            "The load resistance divides it down",
          ],
          answer: 0,
          explain: "Every path through the bridge crosses exactly two forward diode drops: 2 × 0.7 V (Lesson 3.1's Vf, twice).",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "filters",
      unitId: "u5",
      title: "Impedance & RC Filters",
      subtitle:
        "A capacitor is a resistor whose value depends on frequency. Pair it with a real resistor and you can choose which frequencies survive.",
      buildsOn: ["capacitors", "voltage-divider", "ac-waveforms"],
      Theory: () => (
        <>
          <h2>Reactance: resistance with a frequency knob</h2>
          <p>
            To steady DC, a charged capacitor is a wall (Lesson 2.3). But wiggle the voltage and
            the capacitor never finishes charging — current flows continuously to chase the
            changes. The faster the wiggle, the easier the flow. This frequency-dependent
            &ldquo;resistance&rdquo; is called <strong>capacitive reactance</strong>:
          </p>
          <div className="formula">
            X<sub>C</sub> = 1 / (2π·f·C)
            <span className="note">100 nF at 100 Hz → 16 kΩ · at 10 kHz → 160 Ω — same part, 100× “smaller”</span>
          </div>

          <h2>A divider that plays favourites</h2>
          <p>
            Now revisit the voltage divider (Lesson 2.2) and replace the bottom resistor with a
            capacitor. At low frequencies X<sub>C</sub> is huge → the output gets nearly
            everything. At high frequencies X<sub>C</sub> collapses → the output is shorted
            away. Congratulations: a <strong>low-pass filter</strong>. Swap R and C and you get
            the <strong>high-pass</strong> — blocks the lows, passes the highs.
          </p>
          <p>
            The boundary between &ldquo;passed&rdquo; and &ldquo;blocked&rdquo; is the{" "}
            <strong>cutoff frequency</strong>, where X<sub>C</sub> = R:
          </p>
          <div className="formula">
            f<sub>c</sub> = 1 / (2π·R·C)
            <span className="note">at fc the output is 70.7% (−3 dB) and phase-shifted exactly 45°</span>
          </div>
          <p>
            The transition is gentle, not a cliff — an octave above cutoff a low-pass still
            leaks nearly half the amplitude (0.45×). Engineers describe the rolloff in{" "}
            <strong>decibels</strong>: this single-RC filter falls 6 dB per octave; sharper
            filters stack more stages.
          </p>

          <h2>Filters are everywhere</h2>
          <ul>
            <li><strong>Tone controls & EQ:</strong> bass and treble knobs are literally variable RC filters.</li>
            <li><strong>Speaker crossovers:</strong> low-pass to the woofer, high-pass to the tweeter.</li>
            <li><strong>Cleanup:</strong> low-pass filters smooth noisy sensor lines and — remember this for the capstone — turn fast PWM pulses into a steady average.</li>
            <li><strong>Radio:</strong> add an inductor for LC resonance and you can select one station out of the whole spectrum. (A perfect topic for a future unit.)</li>
          </ul>
          <div className="callout tip">
            <span className="co-title">It's still just Ohm + divider</span>
            <p>
              Nothing new was invented here: X<sub>C</sub> slots into the divider formula where
              R₂ used to be. Advanced electronics keeps re-using the same five ideas at higher
              speed — that&rsquo;s the secret nobody tells beginners.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Frequency Sieve",
        intro: (
          <>
            <p>An RC filter with a sine generator, plus its full frequency-response curve.</p>
            <ul>
              <li>Low-pass, fc ≈ 1.6 kHz (1 kΩ + 100 nF): sweep the input from 20 Hz to 20 kHz and watch the output die.</li>
              <li>Park the input at fc: exactly 0.71× and 45° of phase lag.</li>
              <li>Flip to high-pass — the response curve mirrors. Bass gone, treble through.</li>
            </ul>
          </>
        ),
        Component: FilterLab,
      },
      problems: [
        {
          prompt: "R = 4.7 kΩ and C = 33 nF make a low-pass filter. Cutoff frequency?",
          answer: 1 / (2 * Math.PI * 4700 * 33e-9),
          unit: "Hz",
          hint: "fc = 1 / (2π·R·C).",
          explain: "1/(2π × 4.7k × 33n) ≈ 1.03 kHz.",
        },
        {
          prompt: "What is the reactance of a 100 nF capacitor at 1 kHz?",
          answer: 1 / (2 * Math.PI * 1000 * 100e-9),
          unit: "Ω",
          hint: "Xc = 1 / (2π·f·C).",
          explain: "1/(2π × 1000 × 100n) ≈ 1.59 kΩ.",
        },
        {
          prompt: "A low-pass filter is driven exactly one octave above its cutoff. Output amplitude as a fraction of the input? (e.g. 0.5)",
          answer: 1 / Math.sqrt(5),
          unit: "",
          tolerancePct: 3,
          hint: "Gain = 1/√(1 + (f/fc)²) with f/fc = 2.",
          explain: "1/√(1+4) = 1/√5 ≈ 0.447 — the gentle single-RC rolloff.",
        },
      ],
      quiz: [
        {
          q: "As frequency rises, a capacitor's reactance Xc…",
          choices: ["Falls", "Rises", "Stays constant", "Becomes negative"],
          answer: 0,
          explain: "Xc = 1/(2πfC): more wiggles per second means the cap never fills — easier flow, lower reactance.",
        },
        {
          q: "R = 1 kΩ and C = 160 nF give a cutoff frequency of about…",
          choices: ["1 Hz", "100 Hz", "1 kHz", "100 kHz"],
          answer: 2,
          explain: "fc = 1/(2π·1000·160×10⁻⁹) ≈ 995 Hz ≈ 1 kHz.",
        },
        {
          q: "At exactly the cutoff frequency, the filter's output amplitude is…",
          choices: ["Zero", "70.7% of the input", "Half the input", "Equal to the input"],
          answer: 1,
          explain: "At fc, Xc = R and the divider gives 1/√2 ≈ 0.707 — the famous −3 dB point.",
        },
        {
          q: "To send only low frequencies to a subwoofer you'd use…",
          choices: [
            "A high-pass filter",
            "A comparator",
            "A rectifier",
            "A low-pass filter",
          ],
          answer: 3,
          explain: "Low-pass passes lows and blocks highs — exactly what a woofer crossover does.",
        },
      ],
    },
  ],
};
