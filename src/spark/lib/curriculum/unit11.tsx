import type { UnitModule } from "./types";
import { BlinkCodeLab, AdcLab } from "@/spark/components/labs/labs-unit11";

export const unit11: UnitModule = {
  unit: {
    id: "u11",
    num: 11,
    title: "Microcontrollers",
    blurb:
      "Unit 7's gates, industrialised: a whole computer on a $4 chip, with legs that touch your circuits. Hardware becomes something you edit.",
    track: "expert",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "microcontrollers",
      unitId: "u11",
      title: "Hello, Microcontroller",
      subtitle:
        "CPU, memory and peripherals on one chip — and your blinker rewritten as five lines you can change in seconds.",
      buildsOn: ["flip-flops", "adders", "capstone"],
      Theory: () => (
        <>
          <h2>Unit 7, shipped as a product</h2>
          <p>
            You built an adder from gates and a counter from flip-flops. Scale that honest
            construction up a few million times, add program memory, and you get a{" "}
            <strong>microcontroller (MCU)</strong>: a complete computer — CPU, flash for your
            program, RAM for its variables — plus <strong>peripherals</strong> whose pins touch
            the physical world. A Raspberry Pi Pico costs about $5 and contains two 133 MHz
            processors. The chip that got Apollo to the Moon would be embarrassed.
          </p>
          <p>What the peripherals are, you already know from this course:</p>
          <ul>
            <li><strong>GPIO</strong> — general-purpose pins your program can switch high/low: a transistor switch (3.2) per pin, under software command.</li>
            <li><strong>Timers/PWM</strong> — your 555 and Unit 8 dimmer, in silicon, on any pin.</li>
            <li><strong>ADC</strong> — the analog-to-digital converter, next lesson&rsquo;s star.</li>
            <li><strong>Serial ports</strong> — flip-flop shift registers that talk to other chips.</li>
          </ul>

          <h2>A program is a circuit you can edit</h2>
          <p>
            Firmware executes one line at a time, marched forward by the{" "}
            <strong>program counter</strong> — the very counter idea from Lesson 7.3, now
            pointing at instructions. The blink program below does exactly what your 555
            capstone did. The difference is profound anyway: changing the 555&rsquo;s blink rate
            meant swapping a physical capacitor; changing this one means editing the number{" "}
            <code>0.5</code>. Hardware sets what a circuit <em>can</em> do; software decides
            what it <em>does</em>, and you can revise the decision after lunch.
          </p>
          <div className="formula">
            read inputs → decide → write outputs → repeat
            <span className="note">the “superloop” — the skeleton of nearly all embedded firmware</span>
          </div>

          <h2>MicroPython: the friendly on-ramp</h2>
          <p>
            Professionals often write MCU firmware in C, but the Pico happily runs{" "}
            <strong>MicroPython</strong> — real Python, on the chip, talking to pins. You type a
            line, the board executes it immediately; save a file called <code>main.py</code> and
            the board runs it at every power-up, computer no longer required. That workflow is
            the whole capstone setup, two lessons from now.
          </p>
          <div className="callout note">
            <span className="co-title">MCU vs. computer</span>
            <p>
              Your laptop runs an operating system juggling thousands of tasks. An MCU typically
              runs <em>your program and nothing else</em>, starting within milliseconds of
              power, for years, on milliwatts. That single-mindedness is why they hide in
              washing machines, cars (dozens each), toys and thermostats — over 30 billion are
              made every year.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Be the CPU",
        intro: (
          <>
            <p>The real MicroPython blink program, executed line by highlighted line.</p>
            <ul>
              <li>Step through manually first: setup lines run once; the while-loop runs forever.</li>
              <li>Press Run and watch the program counter orbit the loop as the LED blinks.</li>
              <li>Note where the CPU spends almost all its time: asleep inside sleep(). Real firmware too.</li>
            </ul>
          </>
        ),
        Component: BlinkCodeLab,
      },
      quiz: [
        {
          q: "A microcontroller differs from the chips in your earlier lessons because it contains…",
          choices: [
            "No transistors",
            "A programmable CPU with memory and I/O peripherals — a complete computer",
            "Only analog circuits",
            "A built-in battery",
          ],
          answer: 1,
          explain: "It's Unit 7's logic at scale plus program storage: a computer whose pins reach into your breadboard.",
        },
        {
          q: "The 'program counter' inside a CPU is…",
          choices: [
            "A counter tracking which instruction executes next — the idea from Lesson 7.3",
            "A count of how many programs are installed",
            "The chip's serial number",
            "A timer for sleep()",
          ],
          answer: 0,
          explain: "It steps (and jumps) through instruction addresses — the highlighted line in the lab is exactly it.",
        },
        {
          q: "Changing your 555 blinker's rate needed a new capacitor. Changing the MCU blinker's rate needs…",
          choices: [
            "A new crystal",
            "Editing a number in the code",
            "A hotter soldering iron",
            "A different LED",
          ],
          answer: 1,
          explain: "sleep(0.5) → sleep(0.1). That editability is the entire revolution.",
        },
        {
          q: "In the blink program, where does the CPU spend nearly all its time?",
          choices: [
            "Computing led.on()",
            "Waiting inside sleep()",
            "Importing modules",
            "Reading the ADC",
          ],
          answer: 1,
          explain:
            "The pin flips take microseconds; the two half-second sleeps dominate. Most embedded CPUs mostly wait — efficiently.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "adc-sensors",
      unitId: "u11",
      title: "Reading the Analog World",
      subtitle:
        "The ADC turns voltages into numbers your code can think about — and your old friends the divider and the Schmitt trigger come too.",
      buildsOn: ["microcontrollers", "voltage-divider", "op-amps"],
      Theory: () => (
        <>
          <h2>The border crossing</h2>
          <p>
            Software lives on numbers; the world speaks voltage. The{" "}
            <strong>analog-to-digital converter</strong> is the border post: it measures a pin&rsquo;s
            voltage and reports it as an integer. Inside it is Unit 6 hardware — comparators
            judging the input against reference levels (many designs literally binary-search
            with one comparator and a DAC). The Pico&rsquo;s ADC delivers 12 bits: 0 V → 0,
            3.3 V → 4095, about 0.8 mV per step. (MicroPython scales readings to a 16-bit
            0–65535 range for convenience.)
          </p>
          <div className="formula">
            code = floor(V_in / V_ref × 2ⁿ)
            <span className="note">n bits → 2ⁿ levels · finite steps = quantisation, the price of going digital</span>
          </div>
          <p>
            The staircase in the lab makes the trade visible: between two steps, all input
            voltages read as the same number. More bits shrink the steps — but noise below one
            step vanishes either way, which is often a feature.
          </p>

          <h2>Sensors are mostly dividers</h2>
          <p>
            How do you get a temperature or light level <em>as a voltage</em>? Lesson 2.2&rsquo;s
            answer, unchanged: put a sensing resistor — a photoresistor (LDR), a thermistor, a
            flex sensor — into a <strong>voltage divider</strong> with a fixed resistor, and the
            midpoint voltage tracks the physical quantity. Wire that midpoint to an ADC pin and
            your program knows how bright the room is. Most hobby sensing is exactly this,
            three components deep.
          </p>

          <h2>Deciding without dithering</h2>
          <p>
            Now the software must act: &ldquo;dark enough → light on.&rdquo; A naive{" "}
            <code>if reading &lt; threshold</code> chatters at dusk for the same reason your
            comparator chattered in Lesson 6.1 — noise around a single threshold. The cure is
            the same too, now costing two lines instead of two resistors:{" "}
            <strong>hysteresis in software</strong> — switch on below one level, off above a
            higher one. This pattern (read → compare with hysteresis → act) runs your kettle,
            your thermostat and your car&rsquo;s cooling fan. Next lesson, it runs your
            night-light.
          </p>
          <div className="callout tip">
            <span className="co-title">Averaging: free extra quality</span>
            <p>
              Take 16 readings and average them and random noise shrinks fourfold — a low-pass
              filter (5.3) implemented in arithmetic. Digital and analog keep being the same
              subject wearing different clothes.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Staircase at the Border",
        intro: (
          <>
            <p>An ADC transfer curve you can walk along, plus the night-light decision in live code.</p>
            <ul>
              <li>At 2 bits, slide the input — four coarse plateaus. At 8 bits the staircase is nearly a ramp.</li>
              <li>Read the quantisation error meter at each resolution.</li>
              <li>Sweep slowly through 1.5 V and watch the software Schmitt trigger switch at two <em>different</em> points.</li>
            </ul>
          </>
        ),
        Component: AdcLab,
      },
      quiz: [
        {
          q: "A 12-bit ADC with a 3.3 V reference resolves steps of about…",
          choices: ["3.3 V", "0.8 mV", "0.8 V", "12 mV"],
          answer: 1,
          explain: "3.3 V / 4096 levels ≈ 0.8 mV per step.",
        },
        {
          q: "To let a microcontroller sense light with an LDR, you typically…",
          choices: [
            "Connect the LDR straight to a GPIO",
            "Put the LDR in a voltage divider and read the midpoint with the ADC",
            "Use a transformer",
            "Measure its temperature",
          ],
          answer: 1,
          explain: "Lesson 2.2's divider turns the changing resistance into a changing voltage — exactly what an ADC pin wants.",
        },
        {
          q: "Quantisation means…",
          choices: [
            "The ADC destroys the signal",
            "All voltages within one step read as the same number",
            "The input must be quantum-mechanical",
            "Readings are always wrong by 50%",
          ],
          answer: 1,
          explain: "Finite steps → finite precision. More bits, smaller steps — never zero.",
        },
        {
          q: "Software hysteresis (two thresholds) prevents…",
          choices: [
            "The ADC from overheating",
            "Rapid on/off chatter when the reading hovers near a single threshold",
            "Quantisation error",
            "The need for a divider",
          ],
          answer: 1,
          explain: "Same disease and cure as Lesson 6.1's comparator — noise can't re-trigger inside the band.",
        },
      ],
    },
  ],
};
