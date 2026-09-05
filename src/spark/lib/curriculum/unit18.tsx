import type { UnitModule } from "./types";
import { MixerLab, IqLab, ConstellationLab, WaterfallLab } from "@/spark/components/labs/labs-unit18";

export const unit18: UnitModule = {
  unit: {
    id: "u18",
    num: 18,
    title: "Specialization: Software-Defined Radio",
    blurb:
      "Unit 9 ended where the 1920s ended. Pick up the thread with the mixer, the I/Q trick and digital modulation — then point a $30 dongle at the sky and see every signal in your city.",
    track: "specialization",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "mixers",
      unitId: "u18",
      title: "Mixers & the Superheterodyne",
      subtitle:
        "Multiply two signals and frequencies move. One oscillator knob plus one fixed filter — the architecture of every radio since 1918.",
      buildsOn: ["am-radio", "spectrum", "radio-tuning"],
      Theory: () => (
        <>
          <h2>The problem with tuning everything</h2>
          <p>
            Your Unit 9 receiver tuned by moving an LC filter around the band — workable, but
            every stage that follows (amplifiers, detectors) must then handle{" "}
            <em>whatever frequency you tuned to</em>, and sharp filters are hard to build at
            high, moving frequencies. Edwin Armstrong&rsquo;s 1918 insight flips the problem:{" "}
            <strong>don&rsquo;t move the filter — move the station.</strong>
          </p>

          <h2>Multiplication moves frequencies</h2>
          <p>
            The tool is a <strong>mixer</strong>: a circuit that multiplies the incoming signal
            by a locally generated sine (the <strong>local oscillator</strong>, LO). A trig
            identity you may remember does the rest:
          </p>
          <div className="formula">
            sin(f₁)·sin(f₂) = ½cos(f₁−f₂) − ½cos(f₁+f₂)
            <span className="note">multiply two tones → their difference and their sum appear; the originals vanish</span>
          </div>
          <p>
            So a station at 98.5 MHz mixed with an LO at 87.8 MHz lands a copy at exactly
            10.7 MHz — the <strong>intermediate frequency</strong> (IF). Turn the LO knob and
            <em> any</em> station can be delivered to that same fixed IF, where one
            beautifully-engineered, never-moving filter (your 9.2 selectivity, but built once
            and built well) does all the discriminating. This is the{" "}
            <strong>superheterodyne</strong> — inside virtually every receiver of the last
            century, its mixer-and-LO front end living on inside today&rsquo;s direct-conversion
            phone chips. (Fine print: a second station at LO−10.7 also lands on the IF —
            the <em>image frequency</em> — which is why real receivers add a coarse filter up
            front.)
          </p>
          <div className="callout note">
            <span className="co-title">And what does SDR change?</span>
            <p>
              A software-defined radio keeps the mixer and LO in silicon but replaces
              everything after the IF with… an ADC and code. Sampling (13.1), filtering
              (13.3), demodulation (9.3) — all software. The RTL-SDR dongle in this
              branch&rsquo;s capstone is precisely that: a tunable mixer, an ADC, and a USB
              plug. The rest is your laptop.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Move the Station, Not the Filter",
        intro: (
          <>
            <p>Three stations, one LO knob, one fixed IF window at 10.7 MHz.</p>
            <ul>
              <li>Slide the LO until each station’s difference product drops into the green IF window.</li>
              <li>Note every station needs a different LO — but the IF filter never moves.</li>
              <li>Watch the sum products fly high and harmless; the IF only accepts the differences.</li>
            </ul>
          </>
        ),
        Component: MixerLab,
      },
      quiz: [
        {
          q: "Mixing a 98.5 MHz station with an 87.8 MHz local oscillator produces energy at…",
          choices: ["93.15 MHz only", "10.7 MHz and 186.3 MHz", "87.8 MHz only", "Nothing — they cancel"],
          answer: 1,
          explain: "Difference (98.5 − 87.8 = 10.7) and sum (98.5 + 87.8 = 186.3). The difference is the prize; the sum is filtered away.",
        },
        {
          q: "The superheterodyne's key advantage is…",
          choices: [
            "All the hard filtering happens at one fixed IF, regardless of where you tune",
            "It needs no antenna",
            "It amplifies more",
            "It works without power",
          ],
          answer: 0,
          explain: "Tuning becomes 'turn the LO'; the precision filter is built once, at one frequency, and never moves.",
        },
        {
          q: "In an SDR, what replaces most of the traditional receiver?",
          choices: [
            "A bigger antenna",
            "A crystal earphone",
            "More LC filters",
            "An ADC and software — sampling, filtering and demodulation in code",
          ],
          answer: 3,
          explain: "Mixer + ADC + code. Units 13's sampling and software filters ARE the back half of a modern radio.",
        },
        {
          q: "The 'image frequency' problem is…",
          choices: [
            "Stations broadcasting pictures",
            "The LO drifting",
            "A second frequency (on the LO's other side) that also mixes onto the IF",
            "Antenna reflections",
          ],
          answer: 2,
          explain: "|f − LO| = IF has two solutions. Real receivers add a coarse pre-filter so only the intended one survives.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "iq-signals",
      unitId: "u18",
      title: "I/Q: The Signal as an Arrow",
      subtitle:
        "Sample with two ADCs a quarter-cycle apart and you capture not just how strong a signal is, but where it's pointing.",
      buildsOn: ["mixers", "sampling", "ac-waveforms"],
      Theory: () => (
        <>
          <h2>One ADC sees only a shadow</h2>
          <p>
            Sample a signal with a single ADC and something is lost: a sine at its zero
            crossing measures 0 whether it&rsquo;s rising or falling, weak or merely caught at
            the wrong instant. Amplitude and phase are tangled. The fix — and the foundation of
            every modern receiver — is to mix the signal with <em>two</em> LO copies, one
            shifted 90° (a quarter cycle), and sample both results:{" "}
            <strong>I</strong> (in-phase) and <strong>Q</strong> (quadrature).
          </p>
          <div className="formula">
            signal ⇄ arrow: length = √(I² + Q²) · angle = atan2(Q, I)
            <span className="note">two numbers per sample turn the signal into a rotating vector — a phasor you can actually hold</span>
          </div>
          <p>
            Picture it as the lab draws it: an arrow spinning in a plane. The arrow&rsquo;s{" "}
            <strong>length</strong> is the instantaneous amplitude; its{" "}
            <strong>rotation rate</strong> is the frequency offset from your LO. Every
            modulation you have met is now a geometric verb:
          </p>
          <ul>
            <li><strong>AM</strong> (9.3): the arrow <em>breathes</em> — length carries the audio. Demodulation = compute √(I²+Q²). Your envelope detector, done in arithmetic.</li>
            <li><strong>FM</strong>: the arrow&rsquo;s <em>spin speeds and slows</em> — demodulation = differentiate the angle. (Lesson 13.3&rsquo;s noise warning applies!)</li>
            <li><strong>Phase modulation</strong>: the arrow <em>jumps</em> between angles — hold that thought for the next lesson.</li>
          </ul>
          <div className="callout tip">
            <span className="co-title">Why your dongle streams pairs</span>
            <p>
              An RTL-SDR delivers exactly this: a stream of (I, Q) pairs, ~2 million per
              second. Every SDR program — the waterfall, the demodulators, the decoders — is
              math on that stream. When you watch FM radio decode on your laptop in the
              capstone, the first two operations are literally the two meters in this lab.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Breathing, Spinning Arrow",
        intro: (
          <>
            <p>A signal as a phasor, with its I and Q components streaming below.</p>
            <ul>
              <li>Steady tone: constant length, steady spin. Change Δf — the spin follows.</li>
              <li>AM mode: watch the arrow breathe, and the “length” meter trace the audio.</li>
              <li>FM mode: length constant, spin wobbling — and the “rotation” meter sings instead.</li>
            </ul>
          </>
        ),
        Component: IqLab,
      },
      quiz: [
        {
          q: "I and Q are obtained by mixing the signal with…",
          choices: [
            "Two LOs at different frequencies",
            "Square waves",
            "The signal itself",
            "The same LO, with one copy shifted 90°",
          ],
          answer: 3,
          explain: "Same frequency, quarter-cycle apart — like reading both the cosine and sine 'shadows' of the rotating arrow.",
        },
        {
          q: "The instantaneous amplitude of a signal, from its I/Q samples, is…",
          choices: ["I + Q", "√(I² + Q²)", "I − Q", "atan2(Q, I)"],
          answer: 1,
          explain: "The arrow's length, by Pythagoras. atan2 gives the angle — the other half of the story.",
        },
        {
          q: "FM demodulation in software amounts to…",
          choices: [
            "Measuring the arrow's length",
            "Averaging I and Q",
            "Measuring how fast the arrow's angle changes",
            "Squaring the signal",
          ],
          answer: 2,
          explain: "Frequency IS rotation rate. Differentiate the phase and the audio falls out.",
        },
        {
          q: "Why can't one ADC capture what two (I/Q) can?",
          choices: [
            "A single projection tangles amplitude with phase — the arrow's shadow, not the arrow",
            "One ADC is too slow",
            "ADCs come in pairs",
            "It can, with a bigger antenna",
          ],
          answer: 0,
          explain: "One channel is the arrow's shadow on one axis. Two perpendicular shadows reconstruct the full vector.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "digital-modulation",
      unitId: "u18",
      title: "Bits Over the Air",
      subtitle:
        "Park the arrow at agreed positions and each position spells bits. Welcome to constellations — the language of Wi-Fi, 5G and everything else.",
      buildsOn: ["iq-signals", "binary-gates"],
      Theory: () => (
        <>
          <h2>From waves to symbols</h2>
          <p>
            Analog modulation wiggles the arrow continuously. Digital modulation is blunter:
            the transmitter parks the I/Q arrow at one of several <strong>agreed positions</strong>,
            holds it there briefly, then jumps to the next. Each position — each{" "}
            <strong>symbol</strong> — encodes a group of bits. Plot the positions in the I/Q
            plane and you get the scheme&rsquo;s <strong>constellation</strong>:
          </p>
          <ul>
            <li><strong>BPSK</strong> — two positions, 180° apart. One bit per symbol. Nearly indestructible; used for deep-space probes and GPS.</li>
            <li><strong>QPSK</strong> — four corners, two bits per symbol. The workhorse.</li>
            <li><strong>16-QAM</strong> and up — a 4×4 grid (or 64, 256, 1024…): four+ bits per symbol, positions packed ever closer.</li>
          </ul>
          <div className="formula">
            denser constellation = more bits/symbol = less room for noise
            <span className="note">the receiver snaps each noisy point to the nearest position — too much noise, wrong snap, bit errors</span>
          </div>

          <h2>Noise makes it a wager</h2>
          <p>
            The channel adds noise (13.3&rsquo;s jitter, now two-dimensional), smearing each
            received point into a cloud around its intended position. The receiver&rsquo;s job
            is a nearest-neighbour guess. BPSK&rsquo;s two positions are far apart — huge
            clouds still snap correctly. 16-QAM&rsquo;s grid is cramped — modest noise sends
            points across decision boundaries and bits die. That trade has no free lunch, only
            adaptation: <strong>your Wi-Fi renegotiates its constellation constantly</strong>,
            sprinting with 1024-QAM beside the router and retreating to QPSK through two walls.
            The &ldquo;bars&rdquo; on your phone are, in a very real sense, a constellation
            report.
          </p>
          <div className="callout note">
            <span className="co-title">The missing armour</span>
            <p>
              Real links add error-correcting codes — extra bits computed from XOR arithmetic
              (7.2&rsquo;s gates!) that let receivers repair a sprinkle of wrong snaps. Coding
              theory is its own beautiful mountain; know that it exists and that it, too, is
              built from parts you own.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Constellation Casino",
        intro: (
          <>
            <p>A live symbol stream: green points snapped correctly, red ones lost to noise.</p>
            <ul>
              <li>BPSK at noise 0.2: serenely error-free. Switch to 16-QAM: carnage.</li>
              <li>Find the noise level where QPSK’s good throughput overtakes 16-QAM’s.</li>
              <li>Watch the trade in numbers: bits/symbol vs error rate — no free lunch, ever.</li>
            </ul>
          </>
        ),
        Component: ConstellationLab,
      },
      quiz: [
        {
          q: "A constellation diagram shows…",
          choices: [
            "Antenna positions",
            "The agreed I/Q positions (symbols) a scheme uses to encode bits",
            "Star maps for satellite dishes",
            "The spectrum of the carrier",
          ],
          answer: 1,
          explain: "Each point is a parked phasor; each carries log₂(N) bits. The receiver snaps noisy arrivals to the nearest one.",
        },
        {
          q: "16-QAM carries how many bits per symbol?",
          choices: ["4", "2", "8", "16"],
          answer: 0,
          explain: "16 positions = log₂16 = 4 bits per symbol.",
        },
        {
          q: "Why does Wi-Fi slow down far from the router?",
          choices: [
            "The router gets tired",
            "Distance shrinks the bits",
            "Weaker signal means more relative noise, forcing a sparser, slower constellation",
            "It doesn't — speed is constant",
          ],
          answer: 2,
          explain: "The link adapts: dense constellations need clean air. More noise → fall back to fewer bits/symbol → fewer errors, less speed.",
        },
        {
          q: "BPSK is used for deep-space probes because…",
          choices: [
            "It's the newest scheme",
            "Space bans QAM",
            "It needs no antenna",
            "Its two widely-separated symbols survive extreme noise",
          ],
          answer: 3,
          explain: "With signals billions of kilometres weak, robustness is everything. One bit per symbol, almost unkillable.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "rtl-sdr",
      unitId: "u18",
      title: "Capstone: Hear the Spectrum",
      subtitle:
        "A $30 dongle turns your laptop into a wideband receiver. FM stations, aircraft, your own car key — the invisible city, on a waterfall you can read.",
      buildsOn: ["digital-modulation", "mixers", "am-radio"],
      Theory: () => (
        <>
          <h2>The mission</h2>
          <p>
            Plug an <strong>RTL-SDR</strong> dongle (a mass-produced TV tuner chip, gloriously
            repurposed) into a USB port, run free software, and everything this branch taught
            becomes visible: the superhet&rsquo;s LO is a slider, the I/Q stream feeds a live
            waterfall, and demodulators are menu items. You will <em>see</em> radio before you
            hear it — and after Unit 9 and this branch, you will understand every pixel.
          </p>

          <h2>Shopping list</h2>
          <table>
            <thead>
              <tr><th>Item</th><th>Notes</th><th>≈ Cost</th></tr>
            </thead>
            <tbody>
              <tr><td>RTL-SDR Blog V3 or V4 dongle</td><td>the de-facto standard; buy the kit with the telescopic dipole antenna</td><td>$35–45</td></tr>
              <tr><td>SDR software</td><td>SDR++ or SDRSharp (Windows), free</td><td>$0</td></tr>
              <tr><td colSpan={2}><em>Optional:</em> a USB extension cable — moving the dongle away from your PC’s own interference helps a lot (Lesson 13.2: fast edges radiate!)</td><td>$3</td></tr>
            </tbody>
          </table>

          <h2>The listening campaign</h2>
          <table>
            <thead>
              <tr><th>Target</th><th>Where</th><th>What you’ll see & hear</th><th>Ties to</th></tr>
            </thead>
            <tbody>
              <tr><td>FM broadcast</td><td>88–108 MHz, mode WFM</td><td>fat 200 kHz stripes; click one and music plays — FM demod = reading the arrow’s spin (18.2)</td><td>9.3, 18.2</td></tr>
              <tr><td>Airband</td><td>118–137 MHz, mode AM</td><td>pilots and towers, in plain AM — your Unit 9 envelope, alive in 2026</td><td>9.3</td></tr>
              <tr><td>ISM band</td><td>433.92 MHz</td><td>press your car key / read a weather sensor: short digital bursts smeared across the waterfall</td><td>18.3</td></tr>
              <tr><td>The noise floor itself</td><td>anywhere</td><td>raise/lower the gain and watch weak signals sink into it — SNR made visible</td><td>18.3</td></tr>
            </tbody>
          </table>
          <div className="callout warn">
            <span className="co-title">Listen responsibly</span>
            <p>
              An RTL-SDR only receives — it cannot transmit. But the <em>legality of
              listening</em> varies by country: broadcast, amateur and ISM bands are fair game
              nearly everywhere, while intercepting private communications is illegal in many
              places (Germany, for instance, is strict about non-public services). Know your
              local rules; the broadcast and ISM targets above are the safe, endlessly
              fascinating playground.
            </p>
          </div>

          <h2>Reading the waterfall like a native</h2>
          <p>
            Wide constant stripes: FM voices. Narrow flickering lines: keyed carriers (Morse
            still lives on the amateur bands). Sudden broadband smears: digital bursts. Regular
            picket-fence patterns: your own laptop&rsquo;s switching converters (10.2) leaking
            — every mystery line on the display is a physics diagnosis waiting for you, and
            the twin below trains the eye before the real one arrives in the post.
          </p>
          <h3>If it misbehaves</h3>
          <table>
            <thead>
              <tr><th>Symptom</th><th>Likely cause</th><th>Fix</th></tr>
            </thead>
            <tbody>
              <tr><td>Dongle not found</td><td>driver not installed</td><td>run the vendor’s driver tool (Zadig on Windows); reconnect</td></tr>
              <tr><td>Everything is weak</td><td>gain too low / antenna too short</td><td>raise RF gain in software; extend the telescopic elements (~75 cm for FM)</td></tr>
              <tr><td>Strong lines every few MHz everywhere</td><td>your PC’s own interference</td><td>USB extension cable, dongle away from the machine</td></tr>
              <tr><td>FM sounds garbled</td><td>wrong mode or bandwidth</td><td>WFM, ~200 kHz for broadcast; NFM elsewhere</td></tr>
            </tbody>
          </table>
        </>
      ),
      lab: {
        title: "Digital Twin — the Waterfall Trainer",
        intro: (
          <>
            <p>A simulated band with everything the real one will show — learn to read it here first.</p>
            <ul>
              <li>Tune across the three FM stripes and watch the receiver lock each one.</li>
              <li>Park on 95.2 and read the beacon’s keying pattern off the waterfall.</li>
              <li>Camp on 106.8 until a keyfob burst smears past — blink and you miss it.</li>
            </ul>
          </>
        ),
        Component: WaterfallLab,
      },
      checklist: [
        { id: "order", text: "Ordered an RTL-SDR (V3/V4 kit with antenna) and installed SDR++ or SDRSharp" },
        { id: "driver", text: "Driver installed — the dongle appears in the software's source list" },
        { id: "first-fm", text: "Tuned an FM station on the waterfall and heard it demodulate (mode WFM)" },
        { id: "read", text: "Identified three different signal shapes on the waterfall and named what they are" },
        { id: "airband", text: "Found a live AM signal (airband or medium wave if available) — Unit 9's math, on air" },
        { id: "keyfob", text: "Captured my own car key / doorbell / weather sensor bursting at 433 MHz" },
        { id: "gain", text: "Played with RF gain and watched weak signals emerge from and sink into the noise floor" },
        { id: "noise", text: "Found my own electronics' interference on the waterfall and identified the culprit" },
        { id: "legal", text: "Checked which bands are legal to listen to where I live" },
        { id: "wonder", text: "Sat for ten minutes just watching the invisible city talk. (Mandatory.)" },
      ],
    },
  ],
};
