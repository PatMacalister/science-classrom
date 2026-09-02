import type { UnitModule } from "./types";
import { SamplingLab, FourierLab, DigitalFilterLab } from "@/spark/components/labs/labs-unit13";

export const unit13: UnitModule = {
  unit: {
    id: "u13",
    num: 13,
    title: "Signals & Sampling",
    blurb:
      "The master course begins: how the analog world survives the trip into numbers — and the two big ideas (Nyquist and Fourier) every signal engineer lives by.",
    track: "master",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "sampling",
      unitId: "u13",
      title: "Sampling & Aliasing",
      subtitle:
        "Your ADC takes snapshots. Take them too slowly and the signal doesn't just blur — it lies, confidently, about its own frequency.",
      buildsOn: ["adc-sensors", "ac-waveforms"],
      Theory: () => (
        <>
          <h2>From continuous to snapshots</h2>
          <p>
            Lesson 11.2 chopped <em>voltage</em> into steps; this lesson is about chopping{" "}
            <em>time</em>. An ADC doesn&rsquo;t watch a signal — it glances at it, f<sub>s</sub>{" "}
            times per second, and between glances it knows nothing. The question that founded
            digital audio, digital radio and digital everything: how often must you glance to
            truly know the signal?
          </p>
          <div className="formula">
            f_s ≥ 2 · f_max
            <span className="note">the Nyquist–Shannon theorem: at least two samples per cycle of the fastest component</span>
          </div>
          <p>
            Sample at least twice per cycle and — remarkably — the samples contain{" "}
            <em>everything</em>: the original wave can be reconstructed perfectly, not
            approximately. That&rsquo;s why 44.1 kHz became the CD standard: comfortably twice
            the 20 kHz edge of human hearing.
          </p>

          <h2>Aliasing: the confident lie</h2>
          <p>
            Break the rule and something worse than blur happens. A 900 Hz wave sampled at
            1000 Hz produces samples that fall <em>exactly</em> on a 100 Hz sine. Not noise —
            a clean, plausible, completely fictional signal. This is{" "}
            <strong>aliasing</strong>, and you&rsquo;ve seen it all your life: wagon wheels
            spinning backwards on film (24 frames/s undersampling the spokes), helicopter
            rotors frozen on video. The apparent frequency folds down like a reflection:
          </p>
          <div className="formula">
            f_apparent = |f − k·f_s|
            <span className="note">for whichever integer k lands the result below f_s/2 — the “folding” frequency</span>
          </div>
          <p>
            The vicious part: once aliased, the damage is undetectable and irreversible — the
            100 Hz phantom is indistinguishable from a real 100 Hz signal. The defence must
            happen <em>before</em> sampling: an analog <strong>anti-alias low-pass filter</strong>{" "}
            (Lesson 5.3, promoted to guard duty) removes everything above f<sub>s</sub>/2 so
            there is nothing left to fold. Every serious ADC input has one.
          </p>
          <div className="callout note">
            <span className="co-title">Remember this for the capstone</span>
            <p>
              Your Pico oscilloscope will sample at a rate <em>you</em> choose. Point it at the
              1.4 kHz PWM dimmer with f<sub>s</sub> too low and you will meet a slow, stately
              phantom wave that isn&rsquo;t there. Now you&rsquo;ll know its name.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Wagon Wheel",
        intro: (
          <>
            <p>A signal, a sample rate, and the wave the samples believe in.</p>
            <ul>
              <li>Keep fs above 2f: the reconstruction (green) sits on the truth.</li>
              <li>Set f = 900 Hz, fs = 1000 Hz: a 100 Hz phantom, drawn in red.</li>
              <li>Find the eeriest setting: f exactly equal to fs — the samples see DC.</li>
            </ul>
          </>
        ),
        Component: SamplingLab,
      },
      problems: [
        {
          prompt: "You want to faithfully digitise audio containing frequencies up to 8 kHz. Minimum sample rate?",
          answer: 16000,
          unit: "Hz",
          hint: "Nyquist: fs ≥ 2 · f_max.",
          explain: "2 × 8 kHz = 16 kHz — telephone-quality audio uses exactly this.",
        },
        {
          prompt: "A 1.3 kHz tone is sampled at 1 kHz. At what frequency does its alias appear?",
          answer: 300,
          unit: "Hz",
          hint: "Fold: |f − k·fs| for the k that lands below fs/2.",
          explain: "|1300 − 1000| = 300 Hz — a phantom fifth of the truth.",
        },
        {
          prompt: "A 60 Hz mains hum leaks into a sensor sampled at 50 samples/s. Where does it show up?",
          answer: 10,
          unit: "Hz",
          hint: "Same fold, humbler numbers.",
          explain: "|60 − 50| = 10 Hz — slow enough to look like a real signal drifting. Classic lab trap.",
        },
      ],
      quiz: [
        {
          q: "To faithfully capture a 5 kHz signal you must sample at least at…",
          choices: ["10 kHz", "5 kHz", "2.5 kHz", "50 kHz"],
          answer: 0,
          explain: "Nyquist: fs ≥ 2·fmax = 10 kHz — two samples per cycle minimum.",
        },
        {
          q: "A 900 Hz tone sampled at 1000 Hz appears as…",
          choices: ["900 Hz", "450 Hz", "100 Hz", "Silence"],
          answer: 2,
          explain: "It folds: |900 − 1000| = 100 Hz — a clean, fictional alias.",
        },
        {
          q: "Why must anti-alias filtering happen BEFORE the ADC?",
          choices: [
            "Digital filters are too slow",
            "After sampling, an alias is indistinguishable from a real signal — the information is already corrupted",
            "ADCs are damaged by high frequencies",
            "It doesn't — software can always fix it",
          ],
          answer: 1,
          explain:
            "Once folded, the phantom is a perfectly valid-looking signal. No algorithm can know it wasn't real. Only analog filtering beforehand prevents it.",
        },
        {
          q: "Wagon wheels spinning backwards in old films are an example of…",
          choices: [
            "Camera lens distortion",
            "Magnetic interference",
            "Reversed film reels",
            "Aliasing — 24 frames/s undersampling the spoke rotation",
          ],
          answer: 3,
          explain: "The frame rate glances at the spokes too slowly, and the fold produces slow (even negative) apparent rotation.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "spectrum",
      unitId: "u13",
      title: "Fourier: Thinking in Frequencies",
      subtitle:
        "Every repeating wave is secretly a chord of pure sines. Learn to read the recipe and half of engineering becomes legible.",
      buildsOn: ["ac-waveforms", "filters", "sampling"],
      Theory: () => (
        <>
          <h2>The boldest claim in mathematics-for-engineers</h2>
          <p>
            In 1807 Joseph Fourier claimed that <em>any</em> repeating waveform — square,
            sawtooth, a violin note, your voice — is a sum of pure sine waves: a{" "}
            <strong>fundamental</strong> at the repeat rate plus <strong>harmonics</strong> at
            exact integer multiples. The committee reviewing the paper (including Lagrange)
            didn&rsquo;t fully believe him. He was right, and the consequences run every
            technology that touches a signal.
          </p>
          <div className="formula">
            wave = a₁·sin(2πf·t) + a₂·sin(2π·2f·t) + a₃·sin(2π·3f·t) + …
            <span className="note">the list of amplitudes (a₁, a₂, a₃ …) is the wave’s spectrum — its recipe</span>
          </div>
          <p>
            The classic recipes are worth recognising on sight: a <strong>square wave</strong>{" "}
            is odd harmonics fading as 1/k (1, ⅓, ⅕, …); a <strong>triangle</strong> is odd
            harmonics fading much faster (1/k²) — which is why it sounds mellow and the square
            sounds buzzy; a <strong>sawtooth</strong> contains <em>every</em> harmonic — the
            brashest of all, and the reason it powers synthesizer basses.
          </p>

          <h2>Two views, one signal</h2>
          <p>
            The oscilloscope view (voltage vs time) and the spectrum view (amplitude vs
            frequency) are the same information displayed differently — and many problems are
            only easy in one of them. Why does a low-pass filter turn a square wave into a
            sine? Time view: mysterious rounding. Frequency view: obvious — the filter ate the
            harmonics and left the fundamental. Why does your 1.4 kHz PWM need filtering to
            become clean DC (10.2)? Its spectrum is a DC term plus harmonics of 1.4 kHz; the
            LC filter keeps the DC and dumps the rest.
          </p>
          <p>
            Sharp edges are the giveaway: <strong>fast transitions demand high harmonics</strong>.
            A crisp square wave needs frequency content far above its repeat rate — which is
            why digital signals radiate interference (every edge is a little broadcast), and
            why Nyquist&rsquo;s f<sub>max</sub> in the last lesson means the highest{" "}
            <em>harmonic</em>, not the repeat rate.
          </p>
          <div className="callout tip">
            <span className="co-title">The FFT</span>
            <p>
              Computers extract spectra with the Fast Fourier Transform — arguably the most
              important algorithm ever written. Your phone runs thousands per second: Wi-Fi,
              voice calls, music apps that show you a spectrum analyser. Every one is
              Fourier&rsquo;s 1807 idea, at gigahertz.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Wave Kitchen",
        intro: (
          <>
            <p>Build the classic waveforms one sine at a time, recipe on the right.</p>
            <ul>
              <li>Square with 1 harmonic: just a sine. With 25: crisp shoulders. Watch it converge.</li>
              <li>Switch to triangle — notice how few harmonics it needs (1/k² dies fast).</li>
              <li>Sawtooth: every bar in the spectrum is lit. Hence the buzz.</li>
            </ul>
          </>
        ),
        Component: FourierLab,
      },
      quiz: [
        {
          q: "A 100 Hz square wave contains energy at…",
          choices: [
            "100 Hz only",
            "100, 200, 300, 400 Hz…",
            "100, 300, 500, 700 Hz… (odd harmonics)",
            "All frequencies below 100 Hz",
          ],
          answer: 2,
          explain: "Square = odd harmonics at 1/k amplitudes. The even ones cancel by symmetry.",
        },
        {
          q: "A low-pass filter turns a square wave into a near-sine because…",
          choices: [
            "It removes the harmonics, leaving mostly the fundamental",
            "It slows the electrons",
            "It adds new frequencies",
            "It inverts the phase",
          ],
          answer: 0,
          explain: "In the frequency view the mystery vanishes: no harmonics, no edges — just the fundamental sine.",
        },
        {
          q: "Sharp, fast edges in a waveform imply…",
          choices: [
            "The signal is digital and has no spectrum",
            "Low frequency content only",
            "A DC offset",
            "Strong high-frequency harmonic content",
          ],
          answer: 3,
          explain:
            "Speed in time = extent in frequency. This is why crisp digital edges radiate interference and why Nyquist cares about the highest harmonic.",
        },
        {
          q: "The spectrum of a signal is…",
          choices: [
            "Its colour",
            "The list of sine amplitudes at each frequency that compose it",
            "Its RMS value over time",
            "The same as its envelope",
          ],
          answer: 1,
          explain: "Time view and frequency view carry identical information — the spectrum is the recipe card.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "digital-filters",
      unitId: "u13",
      title: "Filters in Software",
      subtitle:
        "One line of arithmetic — y += α(x − y) — and the RC filter you built with parts is reborn as code you can retune in a keystroke.",
      buildsOn: ["filters", "adc-sensors", "spectrum"],
      Theory: () => (
        <>
          <h2>The capacitor, discretised</h2>
          <p>
            Recall the RC charging law (2.3): the capacitor voltage moves toward the input at a
            rate set by how far away it is. Write that for sampled data and you get the{" "}
            <strong>exponential moving average</strong>:
          </p>
          <div className="formula">
            y = y + α · (x − y)
            <span className="note">x = new sample, y = filtered value · small α = big “capacitor” · τ ≈ T_sample/α</span>
          </div>
          <p>
            This one line <em>is</em> an RC low-pass filter — same exponential step response,
            same −6 dB/octave rolloff, same everything — except its &ldquo;R&rdquo; and
            &ldquo;C&rdquo; are a number you can change while the system runs. Every smooth
            sensor readout, every &ldquo;smoothed&rdquo; game statistic, every thermostat
            display runs something like it.
          </p>

          <h2>The moving average — and the eternal trade</h2>
          <p>
            Its sibling averages the last N samples outright. Great noise-flattening, with a
            quirk: it&rsquo;s blind to any periodic signal whose cycle exactly fits the window
            (an N-sample average of one full cycle is zero — a notch!). Engineers exploit that:
            average over exactly one mains cycle and 50 Hz hum vanishes from your
            measurement.
          </p>
          <p>
            Both filters charge the same toll you have now met three times: the detector RC
            (9.3), the analog filter&rsquo;s phase lag (5.3), and here —{" "}
            <strong>smoothness costs lag</strong>. Filter hard and your night-light answers
            slowly; filter lightly and it jitters. There is no free smoothing, only a
            well-chosen trade.
          </p>

          <h2>Why software filters won the war</h2>
          <ul>
            <li>Retunable at runtime — imagine re-soldering a capacitor every time conditions change.</li>
            <li>Perfectly repeatable — no tolerance cloud (15.1 will show what clouds cost).</li>
            <li>Shapes impossible in RC: sharp brick-walls, notches, matched filters — chains of these one-liners.</li>
            <li>But: they only exist <em>after</em> the ADC — the anti-alias filter before it must stay analog forever (13.1’s law).</li>
          </ul>
          <div className="callout note">
            <span className="co-title">The professional split</span>
            <p>
              Modern design puts the minimum analog filtering needed for honesty (anti-alias)
              in hardware and all the character in software. Your capstone scope and every
              digital oscilloscope on Earth follow exactly this split.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The One-Line Filter",
        intro: (
          <>
            <p>A noisy sensor, filtered live by code you can retune while it runs.</p>
            <ul>
              <li>EMA with α = 0.5, then 0.05: watch noise die and lag grow.</li>
              <li>Inject a step and measure the reaction delay at each setting.</li>
              <li>Moving average with a big window: glassy smooth, glacially late. Choose your trade.</li>
            </ul>
          </>
        ),
        Component: DigitalFilterLab,
      },
      quiz: [
        {
          q: "The code y += α(x − y) implements…",
          choices: [
            "A low-pass filter — the RC charging law in discrete time",
            "A high-pass filter",
            "An amplifier",
            "An oscillator",
          ],
          answer: 0,
          explain: "It moves y toward x proportionally to the distance — exactly the capacitor's exponential approach from 2.3.",
        },
        {
          q: "Making α smaller (or the averaging window bigger)…",
          choices: [
            "Only changes the amplitude",
            "Smooths more and responds faster",
            "Smooths more but responds slower",
            "Causes aliasing",
          ],
          answer: 2,
          explain: "The universal trade: bigger effective τ = calmer output = later reaction. Same as every RC you've met.",
        },
        {
          q: "One filter must always remain analog hardware:",
          choices: [
            "The tone control",
            "None — software can do everything",
            "The smoothing after the DAC",
            "The anti-alias filter before the ADC",
          ],
          answer: 3,
          explain: "Aliasing corrupts data at the moment of sampling; no later code can undo it. The guard must stand before the gate.",
        },
        {
          q: "Averaging over exactly one 50 Hz mains cycle is popular because…",
          choices: [
            "It doubles the signal",
            "A full cycle averages to zero — the hum is notched out of the measurement",
            "It halves the sample rate",
            "Mains power is DC",
          ],
          answer: 1,
          explain: "The moving average has notches at frequencies whose period fits the window exactly — free hum rejection, used in every multimeter.",
        },
      ],
    },
  ],
};
