import type { UnitModule } from "./types";
import { GatesLab, AdderLab, CounterLab } from "@/spark/components/labs/labs-unit7";

export const unit7: UnitModule = {
  unit: {
    id: "u7",
    num: 7,
    title: "Digital Logic",
    blurb:
      "Voltages become 0s and 1s, gates become arithmetic, and feedback becomes memory — the staircase from your transistor to a computer.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "binary-gates",
      unitId: "u7",
      title: "Binary & Logic Gates",
      subtitle:
        "Throw away the in-between voltages and keep only ON and OFF — suddenly circuits can reason.",
      buildsOn: ["transistors", "op-amps"],
      Theory: () => (
        <>
          <h2>Why only two levels?</h2>
          <p>
            Analog signals carry infinite shades — and every shade of noise, too. Digital
            electronics makes a radical trade: only two voltage levels count. Near 0 V is{" "}
            <strong>0</strong> (false), near the supply is <strong>1</strong> (true), and
            anything drifting in between gets snapped back to the nearest rail at every stage.
            Noise that would permanently smear an analog signal gets erased at each step —
            that&rsquo;s why a photo can be copied a billion times without degrading. You
            already know the hardware trick: a transistor in <em>cutoff or saturation</em>{" "}
            (Lesson 3.2), skipping the analog middle entirely.
          </p>

          <h2>Gates: decisions in silicon</h2>
          <p>
            A <strong>logic gate</strong> is a few transistors wired to compute a yes/no answer
            from yes/no inputs. The vocabulary is tiny:
          </p>
          <ul>
            <li><strong>NOT</strong> — output is the opposite. (One transistor: your Lesson 3.2 switch — base high pulls the collector low.)</li>
            <li><strong>AND</strong> — 1 only if <em>both</em> inputs are 1 (two switches in series — Lesson 1.5!).</li>
            <li><strong>OR</strong> — 1 if <em>either</em> input is 1 (two switches in parallel).</li>
            <li><strong>NAND / NOR</strong> — AND/OR with a built-in NOT.</li>
            <li><strong>XOR</strong> — 1 if the inputs <em>differ</em>. Remember this one: it&rsquo;s about to do arithmetic.</li>
          </ul>
          <p>
            A gate is fully described by its <strong>truth table</strong> — every input combo
            and its output. Nothing about a gate is mysterious: it is a lookup table made of
            switches.
          </p>

          <h2>NAND is enough</h2>
          <p>
            Here&rsquo;s the astonishing part: <strong>every</strong> logic function — and
            therefore every computer — can be built from NAND gates alone. Tie a NAND&rsquo;s
            inputs together: NOT. Follow it with that NOT: AND. Feed it NOTed inputs: OR. The
            Apollo Guidance Computer that landed on the Moon was built almost entirely from
            one type of 3-input NOR chip — the same idea. Master one gate, own them all.
          </p>
          <div className="callout note">
            <span className="co-title">From gates to your CPU</span>
            <p>
              A modern processor is tens of billions of transistors arranged as gates. The rest
              of this unit climbs that ladder&rsquo;s first two rungs: gates that add, and gates
              that remember.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Gate Playground",
        intro: (
          <>
            <p>Every basic gate, two clickable switches, one glowing verdict.</p>
            <ul>
              <li>Walk each gate through all four input combos and watch the truth table track you.</li>
              <li>Find the two gates that disagree on the 1,1 row (AND vs XOR).</li>
              <li>Convince yourself NAND is NOT-of-AND on every row.</li>
            </ul>
          </>
        ),
        Component: GatesLab,
      },
      quiz: [
        {
          q: "A NAND gate with both inputs at 1 outputs…",
          choices: ["1", "0", "Half the supply", "It depends on temperature"],
          answer: 1,
          explain: "NAND = NOT-AND. AND(1,1) = 1, inverted → 0. Every other combo outputs 1.",
        },
        {
          q: "XOR outputs 1 when…",
          choices: [
            "Both inputs are 1",
            "The inputs are different",
            "Either input is 1",
            "Both inputs are 0",
          ],
          answer: 1,
          explain: "Exclusive-OR: one or the other but not both. It's the 'difference detector' — and binary addition's sum bit.",
        },
        {
          q: "Digital circuits resist noise because…",
          choices: [
            "They use special noise-proof wire",
            "Signals are snapped back to clean 0/1 levels at every gate",
            "They run at lower voltage",
            "Noise only affects AC",
          ],
          answer: 1,
          explain:
            "Each gate regenerates the signal to a rail. Small noise never accumulates — the key advantage over analog.",
        },
        {
          q: "Why is NAND called a universal gate?",
          choices: [
            "It's the fastest gate",
            "Any logic function can be built from NANDs alone",
            "It uses no power",
            "It has the most inputs",
          ],
          answer: 1,
          explain:
            "NOT, AND, OR (and everything built from them — so, everything) can each be constructed purely from NAND gates.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "adders",
      unitId: "u7",
      title: "Adding with Gates",
      subtitle:
        "XOR makes the sum, AND makes the carry, and a chain of them is the arithmetic heart of every processor.",
      buildsOn: ["binary-gates"],
      Theory: () => (
        <>
          <h2>Counting in base two</h2>
          <p>
            With only 0 and 1 available, numbers use place values of 1, 2, 4, 8… instead of
            1, 10, 100. Binary <code>1011</code> = 8 + 0 + 2 + 1 = 11. Four bits count 0–15,
            eight bits 0–255, and sixty-four bits count past the grains of sand on Earth. Same
            positional arithmetic you learned at age six — shorter alphabet.
          </p>

          <h2>One column of addition</h2>
          <p>
            Add two bits and what can happen? 0+0=0, 0+1=1, 1+1=<strong>0 carry 1</strong>.
            Look closely: the sum bit is <em>exactly XOR</em>, and the carry bit is{" "}
            <em>exactly AND</em>. Two gates — called a <strong>half adder</strong> — perform
            single-column addition. A real column must also accept the carry coming in from the
            right, so the <strong>full adder</strong> handles three inputs (A, B, carry-in) with
            two XORs plus a bit of AND/OR for the carry-out. About five gates per column,
            total.
          </p>
          <div className="formula">
            sum = A ⊕ B ⊕ C<sub>in</sub> · carry-out = majority(A, B, C<sub>in</sub>)
            <span className="note">⊕ is XOR — “different?” — and the carry fires when two or more inputs are 1</span>
          </div>

          <h2>Chain the columns</h2>
          <p>
            Stack one full adder per bit, wiring each carry-out to the next column&rsquo;s
            carry-in, and you have a <strong>ripple-carry adder</strong> — the carry ripples
            leftward exactly like the &ldquo;carry the one&rdquo; of pencil arithmetic. If the
            final column produces a carry with nowhere to go, that&rsquo;s <strong>overflow</strong>:
            the true answer needs more bits than you have. (Subtraction, multiplication, your
            GPU&rsquo;s teraflops — all elaborations of this one circuit.)
          </p>
          <div className="callout tip">
            <span className="co-title">Pause on this</span>
            <p>
              Six lessons ago a transistor was a current amplifier. Wired into gates, gates into
              adders, the same silicon now does <em>mathematics</em>. No single part knows
              arithmetic — the knowledge lives entirely in the wiring. That is the whole magic
              of computers, and you now hold it end to end.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The 4-bit Adding Machine",
        intro: (
          <>
            <p>Two 4-bit numbers, clickable bit by bit, summed by ripple-carry logic.</p>
            <ul>
              <li>Set A = 5 (0101) and B = 3 (0011). Follow each column: XOR for the sum, carries where both are 1.</li>
              <li>Set 15 + 1 and watch the carry ripple across every column into overflow.</li>
              <li>Verify: can any 4-bit + 4-bit sum ever need more than 5 bits?</li>
            </ul>
          </>
        ),
        Component: AdderLab,
      },
      quiz: [
        {
          q: "Binary 1011 in decimal is…",
          choices: ["9", "11", "13", "22"],
          answer: 1,
          explain: "8 + 0 + 2 + 1 = 11.",
        },
        {
          q: "In a half adder, the sum and carry bits come from…",
          choices: [
            "OR and NOT",
            "XOR (sum) and AND (carry)",
            "AND (sum) and OR (carry)",
            "Two NOT gates",
          ],
          answer: 1,
          explain: "Sum = 'inputs differ?' = XOR. Carry = 'both 1?' = AND. Two gates, one column of arithmetic.",
        },
        {
          q: "In a ripple-carry adder, the carry travels…",
          choices: [
            "From the most significant bit downward",
            "From the least significant column up through the higher ones",
            "To all columns simultaneously",
            "Nowhere — carries are discarded",
          ],
          answer: 1,
          explain:
            "Each column's carry-out feeds the next column's carry-in, LSB→MSB — just like pencil-and-paper 'carry the one'.",
        },
        {
          q: "Adding 4-bit numbers 1111 + 0001 produces 10000. In a 4-bit register this is…",
          choices: ["16, stored fine", "Overflow — the result needs a fifth bit", "Zero, with no side effects", "A short circuit"],
          answer: 1,
          explain:
            "The carry out of the top column has nowhere to live: overflow. CPUs raise a flag for exactly this moment.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "flip-flops",
      unitId: "u7",
      title: "Memory & Counters",
      subtitle:
        "Cross two gates and the circuit remembers. Clock it, chain it, and you've built a counter — and met the idea behind RAM.",
      buildsOn: ["binary-gates", "timer-555"],
      Theory: () => (
        <>
          <h2>Feedback becomes memory</h2>
          <p>
            Every circuit so far forgets its inputs instantly. Now take two NAND gates and cross
            their outputs back into each other&rsquo;s inputs — feedback again, but digital.
            The result, an <strong>SR latch</strong>, has two stable states and stays in
            whichever one it was last pushed toward: pulse <em>Set</em> and the output locks at
            1; pulse <em>Reset</em> and it locks at 0. Between pulses it holds — indefinitely.{" "}
            <strong>That is one bit of memory</strong>, conjured from nothing but wiring.
          </p>

          <h2>Adding a clock: the flip-flop</h2>
          <p>
            Computers need millions of bits changing in lock-step, not whenever inputs twitch.
            The <strong>D flip-flop</strong> gates a latch behind a <strong>clock</strong>: it
            copies its D input to its Q output only at the clock&rsquo;s rising edge and ignores
            everything in between. A row of flip-flops sharing one clock is a{" "}
            <strong>register</strong> — where your CPU holds the numbers it&rsquo;s working on.
            And the clock itself? A square wave from an oscillator… your 555 (Lesson 3.3) is
            precisely such a clock, just slower than a CPU&rsquo;s billions of ticks.
          </p>

          <h2>Counters: memory + arithmetic</h2>
          <p>
            Wire a flip-flop to toggle on every falling edge of its input and its output runs at{" "}
            <em>half</em> the input frequency — a divide-by-two. Chain three and the outputs
            Q0 Q1 Q2, read as a binary number, march 0,1,2,…7 and wrap: a{" "}
            <strong>3-bit counter</strong>. This one structure is your digital watch (32 768 Hz
            crystal divided by 2 fifteen times = exactly 1 Hz), your kitchen timer, and the
            program counter stepping your CPU through instructions.
          </p>
          <div className="formula">
            each stage divides frequency by 2 · n stages count 0 … 2ⁿ−1
            <span className="note">3 stages: divide by 8, count 0–7</span>
          </div>
          <div className="callout note">
            <span className="co-title">The summit view</span>
            <p>
              Gates (combinational logic) compute; flip-flops (sequential logic) remember;
              a clock marches them forward together. Every computer ever built — including the
              one running this page — is those three ideas, repeated billions of times. From
              here, microcontrollers are the natural next mountain.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Bit That Remembers",
        intro: (
          <>
            <p>A 3-bit ripple counter on a live clock, with every waveform on the scope.</p>
            <ul>
              <li>Watch Q0 run at half the clock, Q1 at a quarter, Q2 at an eighth — frequency division, visibly.</li>
              <li>Read the LEDs as binary and check they match the decimal readout through a full 0–7 lap.</li>
              <li>Pause the clock and step with Pulse — the state <em>holds</em> between pulses. That's memory.</li>
            </ul>
          </>
        ),
        Component: CounterLab,
      },
      quiz: [
        {
          q: "An SR latch remembers its state because…",
          choices: [
            "It contains a tiny battery",
            "Its gates' outputs feed back into each other's inputs, holding a stable state",
            "It uses special magnetic wire",
            "The clock refreshes it",
          ],
          answer: 1,
          explain: "Cross-coupled feedback gives two self-reinforcing stable states — set or reset, held indefinitely.",
        },
        {
          q: "A D flip-flop copies D to Q…",
          choices: [
            "Continuously",
            "Only at the clock edge",
            "Whenever D changes",
            "Once at power-up",
          ],
          answer: 1,
          explain: "That edge-triggering is the point: all flip-flops in a system update in lock-step with the clock.",
        },
        {
          q: "A 3-bit counter counts from 0 up to…",
          choices: ["3", "7", "8", "15"],
          answer: 1,
          explain: "n bits count 0 to 2ⁿ−1: three bits give 0–7, then wrap to 0.",
        },
        {
          q: "Feed a 32 768 Hz crystal through 15 divide-by-two stages and you get…",
          choices: ["32 Hz", "2 Hz", "1 Hz — a watch's tick", "0.5 Hz"],
          answer: 2,
          explain: "32 768 = 2¹⁵, so ÷2 fifteen times leaves exactly 1 Hz. That's why watch crystals use that odd number.",
        },
      ],
    },
  ],
};
