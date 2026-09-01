import type { UnitModule } from "./types";
import { LinearRegLab, BuckLab } from "@/spark/components/labs/labs-unit10";

export const unit10: UnitModule = {
  unit: {
    id: "u10",
    num: 10,
    title: "Power Electronics",
    blurb:
      "Real circuits need clean, exact supply voltages. Two ways to make them: the elegant heater, and the switching trick that runs the modern world.",
    track: "expert",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "linear-regulators",
      unitId: "u10",
      title: "Linear Regulators",
      subtitle:
        "A transistor, throttled by feedback, holds the output at exactly 5 V — and pays for that precision in heat.",
      buildsOn: ["feedback", "rectifiers", "power"],
      Theory: () => (
        <>
          <h2>Why raw supplies aren't enough</h2>
          <p>
            Your rectifier lesson (5.2) ended with DC that still ripples, and batteries sag from
            9.5 V to 7 V across their life. Chips don&rsquo;t tolerate that: logic wants 3.3 V or
            5 V, <em>exactly</em>, whatever the input does. The missing block from the adapter
            recipe — <em>transform, rectify, smooth, </em><strong>regulate</strong> — is this
            lesson.
          </p>

          <h2>The linear regulator: feedback all the way down</h2>
          <p>
            Inside a three-pin regulator like the classic <strong>7805</strong> sits everything
            from Unit 6: a voltage reference, an error amplifier, and a pass transistor. The
            amplifier compares a divided-down sample of the output with the reference and drives
            the transistor like a self-adjusting resistor — sagging output? open the tap.
            Overshooting? throttle it. It is your negative-feedback amplifier (6.2) holding a DC
            level instead of amplifying music.
          </p>
          <div className="formula">
            P_wasted = (V_in − V_out) × I
            <span className="note">efficiency = V_out / V_in · every dropped volt at every amp is pure heat</span>
          </div>
          <p>
            And there is the catch. Feed a 7805 with 12 V at 1 A of load and it delivers 5 W
            while burning 7 W — a 42%-efficient space heater that happens to regulate. That is
            why linear regulators wear metal tabs and heatsinks, and why they shine only when
            the voltage drop is small or the current is modest. Two more habits: they need the
            input a couple of volts <em>above</em> the output (the <strong>dropout</strong> —
            below it, regulation quietly fails), and they answer noise with silence: no
            switching, no interference, just clean DC. Audio and radio circuits love them for
            exactly that.
          </p>
          <div className="callout tip">
            <span className="co-title">Design habit</span>
            <p>
              Before using a linear regulator, do the ten-second check from Lesson 1.4:
              (V_in − V_out) × I. Under half a watt, fine bare; a few watts, heatsink; more —
              read the next lesson.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Precision, Paid in Heat",
        intro: (
          <>
            <p>A 5 V linear regulator with a live power-flow bar.</p>
            <ul>
              <li>12 V in, 1 A out: watch more power become heat than reaches the load.</li>
              <li>Lower Vin toward 7 V — efficiency climbs. Cross the dropout and regulation collapses.</li>
              <li>Find a combination where the regulator runs cool with no heatsink.</li>
            </ul>
          </>
        ),
        Component: LinearRegLab,
      },
      problems: [
        {
          prompt: "A linear regulator drops 9 V to 3.3 V at 200 mA. How much heat does it make?",
          answer: (9 - 3.3) * 0.2,
          unit: "W",
          hint: "P = (Vin − Vout) · I.",
          explain: "5.7 × 0.2 = 1.14 W — a small heatsink territory.",
        },
        {
          prompt: "What is that conversion's efficiency, in percent?",
          answer: (3.3 / 9) * 100,
          unit: "%",
          hint: "For a linear regulator, efficiency = Vout / Vin.",
          explain: "3.3/9 ≈ 36.7% — nearly two thirds of the battery becomes heat.",
        },
        {
          prompt: "A 7805 fed from 12 V supplies 0.5 A. Regulator dissipation?",
          answer: 3.5,
          unit: "W",
          hint: "Seven volts dropped, half an amp passed.",
          explain: "(12 − 5) × 0.5 = 3.5 W — this one genuinely needs a heatsink.",
        },
      ],
      quiz: [
        {
          q: "A linear regulator takes 12 V in and delivers 5 V at 1 A. Its heat dissipation is…",
          choices: ["5 W", "7 W", "12 W", "0 W"],
          answer: 1,
          explain: "P = (Vin − Vout) × I = 7 V × 1 A = 7 W — more than reaches the load!",
        },
        {
          q: "The internal mechanism of a linear regulator is essentially…",
          choices: [
            "A transformer",
            "A fuse that blows at 5 V",
            "A feedback amplifier driving a pass transistor as a variable resistor",
            "A big capacitor",
          ],
          answer: 2,
          explain: "Reference + error amp + pass transistor: Unit 6's negative feedback, holding a DC setpoint.",
        },
        {
          q: "'Dropout voltage' means…",
          choices: [
            "The voltage at which the chip explodes",
            "The voltage lost in the wires",
            "The output ripple",
            "The minimum headroom Vin must have above Vout for regulation to work",
          ],
          answer: 3,
          explain: "A 7805 needs roughly Vin ≥ 7 V. Below that the pass transistor is fully open and the output just follows Vin down.",
        },
        {
          q: "When is a linear regulator the RIGHT choice?",
          choices: [
            "Small voltage drops or low currents, and noise-sensitive analog/radio circuits",
            "Converting 48 V to 1 V at 20 A",
            "Never — switching always wins",
            "Only in cars",
          ],
          answer: 0,
          explain:
            "Where the (Vin−Vout)·I product is small, its simplicity and total silence are unbeatable. Big drops and big currents belong to switchers.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "switching-converters",
      unitId: "u10",
      title: "The Buck Converter",
      subtitle:
        "Chop the input with PWM, smooth the chop with L and C, keep only the average — 95% efficiency from parts you already own.",
      buildsOn: ["pwm-dimmer", "inductors", "filters", "linear-regulators"],
      Theory: () => (
        <>
          <h2>Don't burn the difference — refuse to take it</h2>
          <p>
            The linear regulator wastes power because its transistor stands half-open,
            dropping voltage while current flows — the exact situation Lesson 3.2 warned about.
            The switching insight: a transistor that is only ever <strong>fully on</strong>{" "}
            (no voltage across it) or <strong>fully off</strong> (no current through it)
            dissipates almost nothing in either state. So: switch hard, tens of thousands of
            times per second, and let PWM set the ratio.
          </p>

          <h2>The buck converter</h2>
          <p>
            Chop 12 V with PWM at, say, 42% duty and the switch node averages 5 V — but as a
            violent square wave. Now the reunion tour: an <strong>inductor</strong> (2.4)
            resists the current changes and a <strong>capacitor</strong> (2.3) resists the
            voltage changes — together a low-pass filter (5.3) whose cutoff sits far below the
            switching frequency. The chop is filtered away; the average sails through:
          </p>
          <div className="formula">
            V_out ≈ D × V_in
            <span className="note">duty cycle is the control knob — close the loop with feedback and it self-regulates</span>
          </div>
          <p>
            (One more familiar face: when the switch turns off, the inductor&rsquo;s current
            must keep flowing — a diode gives it the path, precisely your flyback diode from
            2.4. In modern converters a second transistor plays that role.)
          </p>
          <p>
            Efficiency lands at 85–96%, nearly independent of how big the voltage step is.
            That is why every phone charger, laptop brick, LED driver, car ECU and server farm
            runs on switching conversion — the electricity saved worldwide by this one circuit
            is measured in power stations.
          </p>

          <h2>The engineer's trades</h2>
          <ul>
            <li><strong>Ripple vs size:</strong> bigger L and C smooth better but cost space and money. ΔI ∝ 1/(L·f_sw).</li>
            <li><strong>Frequency:</strong> switching faster shrinks L and C — but each switching edge wastes a crumb of energy, so efficiency dips. Modern designs run 0.5–2 MHz.</li>
            <li><strong>Noise:</strong> all that chopping radiates. Switchers need careful layout, and sensitive analog stages often get a quiet linear regulator fed <em>from</em> a switcher — both lessons in one supply.</li>
          </ul>
          <div className="callout note">
            <span className="co-title">You already built one</span>
            <p>
              Your PWM dimmer (Unit 8) plus the low-pass filter experiment was literally a buck
              converter without the feedback loop. The expert course keeps promoting circuits
              you own to bigger jobs.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Chop, Smooth, Profit",
        intro: (
          <>
            <p>A buck converter with the switch node and output side by side, plus a live efficiency face-off against a linear regulator doing the same job.</p>
            <ul>
              <li>Set 12 V in, 42% duty: 5 V out. Sweep the duty — the output follows D·Vin.</li>
              <li>Shrink L to 10 µH: the ripple balloons. Fix it by raising f_sw — then check what happened to efficiency.</li>
              <li>Ask for 12 V → 3.3 V and compare the two efficiency bars. This is why phones don't cook.</li>
            </ul>
          </>
        ),
        Component: BuckLab,
      },
      problems: [
        {
          prompt: "A buck converter runs from 12 V at 40% duty. Output voltage?",
          answer: 4.8,
          unit: "V",
          hint: "Vout ≈ D · Vin.",
          explain: "0.40 × 12 = 4.8 V.",
        },
        {
          prompt: "What duty cycle produces 3.3 V from a 9 V input, in percent?",
          answer: (3.3 / 9) * 100,
          unit: "%",
          hint: "D = Vout / Vin.",
          explain: "3.3/9 ≈ 36.7% — same ratio as the linear case, but this time ~93% of the energy arrives.",
        },
        {
          prompt: "Inductor current ripple: Vin = 12 V, D = 0.5, L = 220 µH, fsw = 100 kHz. ΔI = Vin·D(1−D)/(L·fsw)?",
          answer: (12 * 0.25) / (220e-6 * 100000),
          unit: "A",
          hint: "Plug straight in — watch the powers of ten on L and fsw.",
          explain: "12×0.25/(0.022) ≈ 0.136 A ≈ 136 mA of triangle ripple.",
        },
      ],
      quiz: [
        {
          q: "A buck converter with Vin = 12 V running at 40% duty outputs about…",
          choices: ["4.8 V", "7.2 V", "12 V", "2.4 V"],
          answer: 0,
          explain: "Vout ≈ D·Vin = 0.4 × 12 = 4.8 V — PWM's average, kept by the LC filter.",
        },
        {
          q: "Switching converters are efficient because the transistor…",
          choices: [
            "Is made of special silicon",
            "Is always either fully on (no voltage) or fully off (no current)",
            "Runs very cold",
            "Uses AC instead of DC",
          ],
          answer: 1,
          explain:
            "P = V×I inside the switch: in both extreme states one factor is ~zero. The half-open linear pass transistor has both nonzero — hence heat.",
        },
        {
          q: "The L and C in a buck converter act as…",
          choices: [
            "A resonant radio tuner",
            "A voltage doubler",
            "A backup battery",
            "A low-pass filter that keeps the average and rejects the switching chop",
          ],
          answer: 3,
          explain: "Exactly your Lesson 5.3 filter, sized so f_cutoff ≪ f_switching: DC average passes, chop is stopped.",
        },
        {
          q: "Raising the switching frequency lets you…",
          choices: [
            "Exceed 100% efficiency",
            "Skip the inductor entirely",
            "Use smaller L and C, at the price of slightly more switching loss",
            "Eliminate the output capacitor's ripple current",
          ],
          answer: 2,
          explain:
            "Ripple ∝ 1/f_sw, so components shrink — but every edge costs a little energy. Real designs balance the two.",
        },
      ],
    },
  ],
};
