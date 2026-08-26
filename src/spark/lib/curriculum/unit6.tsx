import type { UnitModule } from "./types";
import { ComparatorLab, FeedbackAmpLab } from "@/spark/components/labs/labs-unit6";

export const unit6: UnitModule = {
  unit: {
    id: "u6",
    num: 6,
    title: "Op-Amps & Feedback",
    blurb:
      "A ludicrously powerful amplifier tamed by two resistors — and the feedback idea that quietly runs all of engineering.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "op-amps",
      unitId: "u6",
      title: "The Operational Amplifier",
      subtitle:
        "Two inputs, absurd gain, one rule. Used raw, an op-amp is a comparator — the analog world's yes/no machine.",
      buildsOn: ["transistors", "voltage-divider"],
      Theory: () => (
        <>
          <h2>The universal analog building block</h2>
          <p>
            One transistor amplifies (Lesson 3.2), but crudely — its gain drifts with
            temperature and part tolerance. The fix, born in the 1940s as room-heating
            vacuum-tube blocks inside analog computers and shrunk by the 1960s to dozens of
            transistors on a single chip, is the <strong>operational amplifier</strong> — so
            named because those computers used it to perform mathematical <em>operations</em>.
            Today an op-amp costs pennies and hides in everything analog: sensors, audio,
            power supplies, your multimeter.
          </p>
          <p>The op-amp has two inputs and one rule:</p>
          <div className="formula">
            V<sub>out</sub> = A · (V₊ − V₋)
            <span className="note">A (open-loop gain) ≈ 100 000 or more — effectively infinite</span>
          </div>
          <p>
            It amplifies the <em>difference</em> between its non-inverting (+) and inverting (−)
            inputs by a gain so large it&rsquo;s almost a caricature. A 0.1 mV difference asks
            for 10 V of output. And the inputs themselves draw essentially zero current — they
            only <em>watch</em>.
          </p>

          <h2>Used raw: the comparator</h2>
          <p>
            With gain that huge and no feedback, the output can&rsquo;t sit anywhere in the
            middle — the tiniest input difference slams it against a supply rail. That makes a
            perfect <strong>comparator</strong>: put a reference voltage on one input (a voltage
            divider — Lesson 2.2 again) and a signal on the other, and the output is a clean
            digital verdict: <em>above or below?</em> Thermostats, battery-low warnings,
            night-lights: all comparators.
          </p>

          <h2>The chattering problem — and hysteresis</h2>
          <p>
            Real signals are noisy. As a slowly rising signal grazes the threshold, noise makes
            it cross back and forth dozens of times — the output <em>chatters</em>. The fix is{" "}
            <strong>hysteresis</strong>: make the switch-up threshold slightly higher than the
            switch-down threshold. Once the output flips high, the goalposts move down; noise
            inside the band changes nothing. A comparator with hysteresis is called a{" "}
            <strong>Schmitt trigger</strong>, and the idea is everywhere — it&rsquo;s why your
            thermostat doesn&rsquo;t rapid-fire the furnace at 20.0 °C, and (surprise) it&rsquo;s
            exactly the ⅓/⅔ two-threshold trick your 555 timer has used all along.
          </p>
          <div className="callout note">
            <span className="co-title">You've already met one</span>
            <p>
              Inside the 555 (Lesson 3.3) live two comparators watching ⅓ Vcc and ⅔ Vcc. The
              whole advanced course keeps unmasking parts you already trust.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Above or Below?",
        intro: (
          <>
            <p>A comparator watching a wandering signal against your threshold.</p>
            <ul>
              <li>Slide Vref around and watch the output's duty change.</li>
              <li>Switch to the noisy signal with no hysteresis: chatter at every crossing.</li>
              <li>Engage the Schmitt band — the edges snap clean. Count the thresholds on the scope.</li>
            </ul>
          </>
        ),
        Component: ComparatorLab,
      },
      quiz: [
        {
          q: "An op-amp with no feedback outputs…",
          choices: [
            "A precise copy of its input",
            "Rail high or rail low, depending on which input is higher",
            "Always 0 V",
            "Half the supply",
          ],
          answer: 1,
          explain:
            "Open-loop gain ~100 000 means any real input difference saturates the output at a rail — that's comparator behaviour.",
        },
        {
          q: "A comparator's + input sits at 3.2 V and its − input at 3.1 V. The output is…",
          choices: ["About 0.1 V", "High (at the + rail)", "Low (at the − rail)", "3.15 V"],
          answer: 1,
          explain: "V+ > V−, and the huge gain amplifies that 0.1 V difference all the way to the positive rail.",
        },
        {
          q: "Hysteresis (a Schmitt trigger) exists to…",
          choices: [
            "Increase the gain",
            "Stop noisy signals from making the output chatter at the threshold",
            "Reduce power consumption",
            "Invert the output",
          ],
          answer: 1,
          explain:
            "Separate up/down thresholds mean noise within the band can't re-trigger the output — one clean edge per real crossing.",
        },
        {
          q: "Which everyday device is essentially a comparator with hysteresis?",
          choices: ["A thermostat", "A battery", "A transformer", "A fuse"],
          answer: 0,
          explain:
            "Heat on below 19.5°, off above 20.5°: two thresholds, clean switching, no furnace chatter — a Schmitt trigger in the wall.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "feedback",
      unitId: "u6",
      title: "Negative Feedback Amplifiers",
      subtitle:
        "Feed a little output back to the inverting input and infinite, sloppy gain becomes exact, resistor-programmed gain.",
      buildsOn: ["op-amps", "voltage-divider"],
      Theory: () => (
        <>
          <h2>Taming infinity</h2>
          <p>
            Raw op-amp gain is huge but useless for amplifying music — everything clips. The
            1927 insight of Harold Black (scribbled on a newspaper on the Hudson ferry):{" "}
            <strong>throw most of the gain away, deliberately</strong>. Feed a fraction of the
            output back to the <em>inverting</em> input. If the output drifts too high, the
            feedback nudges the difference negative and pulls it back; too low, the reverse. The
            amplifier constantly corrects itself toward equilibrium.
          </p>
          <p>
            With negative feedback in place, two <strong>golden rules</strong> describe the
            equilibrium:
          </p>
          <ul>
            <li>The op-amp drives its output until <strong>V₊ = V₋</strong> (else the huge gain would move it).</li>
            <li>The inputs draw <strong>no current</strong> — they only observe.</li>
          </ul>

          <h2>Gain by resistor ratio</h2>
          <p>
            In the <strong>non-inverting amplifier</strong>, the output feeds a voltage divider
            (R<sub>f</sub> over R<sub>g</sub> — Lesson 2.2 yet again) whose tap goes to V₋. The
            golden rules then force the divider tap to equal the input, which pins the output at:
          </p>
          <div className="formula">
            Gain = 1 + R<sub>f</sub> / R<sub>g</sub>
            <span className="note">inverting topology: gain = −Rf/Rin · buffer: gain = exactly 1</span>
          </div>
          <p>
            Two resistors — parts with 1% tolerance costing a cent — now define the gain, and
            the op-amp&rsquo;s messy internal 100 000× barely matters. That trade —{" "}
            <em>surplus gain exchanged for precision</em> — is the deepest idea in this course,
            and it runs your car&rsquo;s cruise control, your body&rsquo;s thermostat, and every
            audio amplifier ever sold.
          </p>

          <h2>The humble, mighty buffer</h2>
          <p>
            Wire the output straight to V₋ and the gain is exactly 1. Pointless? Remember the
            divider&rsquo;s <em>loading problem</em> (Lesson 2.2): connect a heavy load and the
            divider sags. Put a <strong>buffer</strong> between them and the divider sees the
            op-amp&rsquo;s do-nothing inputs while the load gets a copy of the voltage backed by
            the op-amp&rsquo;s muscle. Gain of one; problem of many, solved.
          </p>
          <div className="callout warn">
            <span className="co-title">The rails always win</span>
            <p>
              Feedback or not, the output can never exceed its supply rails. Ask a gain-6
              amplifier for 6 × 2 V from ±9 V rails and the peaks flat-top at the rail —{" "}
              <strong>clipping</strong>, the crunch of an overdriven guitar amp. Watch it happen
              in the lab.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Gain by Numbers",
        intro: (
          <>
            <p>Three classic feedback circuits with live waveforms and rails that bite.</p>
            <ul>
              <li>Non-inverting, Rf = 47 k, Rg = 10 k: verify the gain is 5.7× on the scope.</li>
              <li>Push the input amplitude until the output flat-tops. That's clipping.</li>
              <li>Inverting mode: the output flips upside down. Buffer mode: two identical traces — and that's the point.</li>
            </ul>
          </>
        ),
        Component: FeedbackAmpLab,
      },
      quiz: [
        {
          q: "A non-inverting amp has Rf = 47 kΩ and Rg = 10 kΩ. Its gain is…",
          choices: ["4.7×", "5.7×", "47×", "0.21×"],
          answer: 1,
          explain: "Gain = 1 + Rf/Rg = 1 + 4.7 = 5.7. The '+1' is easy to forget — the quiz never does.",
        },
        {
          q: "Negative feedback makes an amplifier's gain depend on…",
          choices: [
            "The op-amp's internal transistor count",
            "The ratio of two external resistors",
            "The supply voltage",
            "Temperature",
          ],
          answer: 1,
          explain:
            "The op-amp's surplus gain enforces the golden rules; the feedback divider's ratio then sets the overall gain precisely.",
        },
        {
          q: "A unity-gain buffer is useful because it…",
          choices: [
            "Doubles the signal",
            "Copies a voltage while drawing almost nothing from the source and driving the load with authority",
            "Filters out noise",
            "Converts AC to DC",
          ],
          answer: 1,
          explain:
            "It solves the loading problem: fragile sources (like dividers) stay unloaded, heavy loads get driven. Gain 1, value 10.",
        },
        {
          q: "You ask a gain-10 amplifier on ±9 V rails to amplify a ±2 V signal. The output…",
          choices: [
            "Is a clean ±20 V sine",
            "Clips: flat-tops at about ±9 V",
            "Is ±2 V",
            "Shuts down",
          ],
          answer: 1,
          explain: "The output can never leave the rails. The wave's tops and bottoms are sheared off — distortion.",
        },
      ],
    },
  ],
};
