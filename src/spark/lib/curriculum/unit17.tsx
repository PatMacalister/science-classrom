import type { UnitModule } from "./types";
import { AluLab, MemoryBusLab, FetchDecodeLab, CpuLab } from "@/spark/components/labs/labs-unit17";

export const unit17: UnitModule = {
  unit: {
    id: "u17",
    num: 17,
    title: "Specialization: From Gates to a CPU",
    blurb:
      "The digital thread, completed: registers become an ALU, an ALU meets memory, and by the last lesson you are running programs on a computer you understand wire by wire.",
    track: "specialization",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "registers-alu",
      unitId: "u17",
      title: "Registers & the ALU",
      subtitle:
        "Bolt a subtractor onto your adder, teach it AND and OR, add gossiping flags — and the CPU's arithmetic heart is done.",
      buildsOn: ["adders", "flip-flops"],
      Theory: () => (
        <>
          <h2>From circuits to a datapath</h2>
          <p>
            You own the two halves already: <strong>registers</strong> (rows of flip-flops,
            7.3) hold numbers; your <strong>adder</strong> (7.2) combines them. A CPU&rsquo;s{" "}
            <strong>ALU</strong> — arithmetic logic unit — is the adder grown up: one block
            that can add, subtract, AND, or OR two registers, chosen by a few control bits.
          </p>

          <h2>Subtraction for free: two's complement</h2>
          <p>
            Here is one of computing&rsquo;s great elegance moves. To represent −B, flip every
            bit of B and add one — the <strong>two&rsquo;s complement</strong>. Then:
          </p>
          <div className="formula">
            A − B = A + (~B + 1)
            <span className="note">subtraction = the same adder, with B's bits inverted and carry-in set to 1 — zero new hardware</span>
          </div>
          <p>
            The same trick gives negative numbers a home: in 4 bits, 0–7 mean themselves and
            8–15 double as −8…−1 (the top bit acts as the sign). The bits don&rsquo;t change —
            only the <em>interpretation</em> does, which is why the lab shows every value both
            ways. Overflow (7.2) becomes subtler and more interesting with signs, which is why
            CPUs carry a whole set of…
          </p>

          <h2>Flags: one-bit gossip</h2>
          <p>
            Alongside the result, the ALU reports tiny facts: <strong>Z</strong> (was it
            zero?), <strong>C</strong> (did a carry/borrow leave the top?), <strong>N</strong>{" "}
            (is the sign bit set?). These seem trivial until you realise they are how programs{" "}
            <em>make decisions</em>: &ldquo;jump if zero&rdquo; reads Z, &ldquo;is A &lt;
            B?&rdquo; subtracts and reads the flags. Every if-statement you have ever written
            compiles down to an ALU operation followed by a flag-conditional jump. The humble
            comparator verdict (6.1) — above or below? — lives on inside every CPU as a flag.
          </p>
          <div className="callout note">
            <span className="co-title">The register file</span>
            <p>
              Real CPUs keep a small set of registers (x86-64 has 16 general-purpose ones)
              right next to the ALU, because RAM — as the next lesson shows — is a round trip
              across town. Our teaching CPU keeps just one, the classic{" "}
              <strong>accumulator</strong> &ldquo;A&rdquo;, which is all a computer strictly
              needs.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Arithmetic Heart",
        intro: (
          <>
            <p>A 4-bit ALU with clickable operands, all four operations, and live flags.</p>
            <ul>
              <li>Compute 5 − 3, then 3 − 5: the “wrong” answer 14 is −2 in signed reading. Same bits.</li>
              <li>Make Z light up three different ways (ADD, SUB, AND).</li>
              <li>Check SUB against the recipe: flip B's bits by hand, add 1, add to A.</li>
            </ul>
          </>
        ),
        Component: AluLab,
      },
      quiz: [
        {
          q: "In two's complement, −B is computed as…",
          choices: ["B with the sign bit flipped", "~B + 1 (invert all bits, add one)", "255 − B always", "B shifted right"],
          answer: 1,
          explain: "Invert and add one. Then A−B reuses the adder unchanged — the whole point of the encoding.",
        },
        {
          q: "In 4-bit two's complement, the bit pattern 1110 (decimal 14) also means…",
          choices: ["−1", "−2", "+14 only", "−14"],
          answer: 1,
          explain: "Patterns 8–15 double as −8…−1: 14 − 16 = −2. Interpretation, not bits, carries the sign.",
        },
        {
          q: "The Z flag exists so that…",
          choices: [
            "The ALU can be reset",
            "Programs can branch on results — 'jump if zero' is how if-statements happen",
            "Zero results are discarded",
            "The display shows a minus sign",
          ],
          answer: 1,
          explain: "Flags turn arithmetic into decisions. JZ reads Z; comparisons subtract and read flags.",
        },
        {
          q: "Why do CPUs keep registers beside the ALU instead of working straight from RAM?",
          choices: [
            "RAM can't store numbers",
            "Registers are far faster to reach than a bus round trip to memory",
            "Registers are cheaper",
            "Tradition from the 1970s",
          ],
          answer: 1,
          explain: "The next lesson makes it visceral: every RAM access is an address-bus/data-bus handshake. Registers are already there.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "memory-bus",
      unitId: "u17",
      title: "Memory & the Bus",
      subtitle:
        "RAM is a wall of numbered pigeonholes; the bus is the corridor. Every byte your computer touches makes this trip.",
      buildsOn: ["registers-alu", "flip-flops"],
      Theory: () => (
        <>
          <h2>A wall of registers with a phone book</h2>
          <p>
            Take the register idea from 7.3 and repeat it: 16 rows, 256 rows, billions of rows
            — each holding one number, each with a unique <strong>address</strong>. That is{" "}
            <strong>RAM</strong>. The magic isn&rsquo;t the storage (you built a bit of memory
            from two NAND gates); it&rsquo;s the <em>addressing</em>: a decoder — pure
            combinational logic, Unit 7 again — activates exactly one row from the number on
            the address lines.
          </p>

          <h2>The bus: a shared corridor</h2>
          <p>
            CPU and RAM converse over two bundles of wires. The <strong>address bus</strong>{" "}
            carries &ldquo;which cell?&rdquo; (one direction: CPU → memory); the{" "}
            <strong>data bus</strong> carries the value itself (both directions). A{" "}
            <em>read</em>: address out, RAM answers on the data bus. A <em>write</em>: address
            and data out together, plus a write signal. Every screen pixel, every keystroke,
            every variable in every program — all of it travels this handshake.
          </p>
          <div className="formula">
            n address lines → 2ⁿ reachable cells
            <span className="note">16 lines: 65 536 cells · 32 lines: 4 GB — the famous 32-bit limit was just an address-bus width</span>
          </div>

          <h2>The stored-program idea</h2>
          <p>
            Now the deepest move in computer science, due to von Neumann&rsquo;s 1945 report:{" "}
            <strong>instructions live in the same memory as data.</strong> A program is just
            numbers in cells — which means programs can be loaded, copied, and even written by
            other programs (that is all a compiler is). It also means the CPU must keep track
            of <em>where in memory it is</em> — a register holding the next instruction&rsquo;s
            address. You already know its name from Lesson 7.3 and the MicroPython stepper:
            the <strong>program counter</strong>. Next lesson, we follow it.
          </p>
          <div className="callout tip">
            <span className="co-title">Why memory speed rules the world</span>
            <p>
              A modern CPU can add numbers hundreds of times faster than RAM can deliver them.
              Whole layers of engineering — caches, prefetching — exist to hide that gap. When
              your fast register file (17.1) meets this slow corridor, you understand the
              central tension of computer architecture.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "Pigeonholes & Corridors",
        intro: (
          <>
            <p>A 16-cell RAM, an address bus, a data bus, and buttons to make them talk.</p>
            <ul>
              <li>Read cell 3, then cell 14 — watch the address bus pick and the data bus answer.</li>
              <li>Write your favourite number somewhere, then read it back. That's a variable.</li>
              <li>Notice cells 14 and 15 hold 3 and 4 — the CPU capstone's data lives here.</li>
            </ul>
          </>
        ),
        Component: MemoryBusLab,
      },
      quiz: [
        {
          q: "RAM addressing works because…",
          choices: [
            "Each cell has its own wire to the CPU",
            "A decoder activates exactly one row of cells from the number on the address bus",
            "Cells answer in alphabetical order",
            "The data bus selects the cell",
          ],
          answer: 1,
          explain: "One shared corridor plus a combinational decoder — no per-cell wiring, which is why gigabytes are affordable.",
        },
        {
          q: "A 32-bit address bus can reach…",
          choices: ["32 cells", "4 096 cells", "About 4 billion cells (4 GB)", "Unlimited memory"],
          answer: 2,
          explain: "2³² ≈ 4.3 × 10⁹. The old '4 GB RAM limit' was literally the width of the address bus.",
        },
        {
          q: "The stored-program concept means…",
          choices: [
            "Programs are stored on disk",
            "Instructions and data share the same memory — a program is just numbers in cells",
            "Each instruction has its own chip",
            "Programs cannot be changed",
          ],
          answer: 1,
          explain: "Von Neumann's move: code is data. Loaders, compilers and software itself all follow from it.",
        },
        {
          q: "During a memory READ, the buses carry…",
          choices: [
            "Address from CPU to RAM, then data from RAM to CPU",
            "Data from CPU to RAM only",
            "Both buses from CPU to RAM",
            "Nothing — reads are wireless",
          ],
          answer: 0,
          explain: "'Cell 14, please' goes out on the address bus; the value returns on the data bus. Writes send both outward.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "instruction-set",
      unitId: "u17",
      title: "Fetch, Decode, Execute",
      subtitle:
        "Give the machine a vocabulary of ten words and a three-step heartbeat, and numbers in memory become behaviour.",
      buildsOn: ["memory-bus", "microcontrollers"],
      Theory: () => (
        <>
          <h2>An instruction is just an agreed-upon number</h2>
          <p>
            Our teaching CPU (a close cousin of Ben Eater&rsquo;s beloved SAP-1) uses 8-bit
            instructions: the top four bits name the operation, the bottom four an address.
            The vocabulary — the <strong>instruction set</strong> — is tiny and complete:
          </p>
          <table>
            <thead>
              <tr><th>Mnemonic</th><th>Meaning</th><th>Uses</th></tr>
            </thead>
            <tbody>
              <tr><td>LDA n</td><td>copy cell n into A</td><td>memory read (17.2)</td></tr>
              <tr><td>ADD n / SUB n</td><td>A = A ± cell n</td><td>the ALU (17.1)</td></tr>
              <tr><td>STA n</td><td>store A into cell n</td><td>memory write</td></tr>
              <tr><td>LDI v</td><td>load the literal value v</td><td>constants</td></tr>
              <tr><td>JMP n</td><td>set the PC to n</td><td>loops!</td></tr>
              <tr><td>JZ n</td><td>jump only if the Z flag is set</td><td>decisions!</td></tr>
              <tr><td>OUT / HLT</td><td>show A / stop the clock</td><td>results & rest</td></tr>
            </tbody>
          </table>

          <h2>The heartbeat</h2>
          <p>
            The CPU does exactly one thing, forever, in three phases per instruction:
          </p>
          <div className="formula">
            FETCH → DECODE → EXECUTE → (repeat)
            <span className="note">fetch: PC → address bus, instruction → IR, PC++ · decode: split the bits · execute: do the deed</span>
          </div>
          <p>
            <strong>Fetch:</strong> the program counter&rsquo;s value goes out on the address
            bus; the instruction comes back into the <strong>instruction register</strong>;
            the PC increments (it is literally your 7.3 counter). <strong>Decode:</strong>{" "}
            combinational logic splits opcode from operand and raises the right control
            signals. <strong>Execute:</strong> the datapath obeys — ALU fires, memory is
            touched, or the PC is overwritten (that&rsquo;s all a jump is!).
          </p>
          <p>
            Read that last clause again: <em>a jump just writes the PC.</em> Loops, ifs,
            function calls, your MicroPython <code>while True:</code> (11.1) — every control
            structure ever devised is sugar over &ldquo;store a new number into the program
            counter, sometimes conditionally on a flag.&rdquo;
          </p>
          <div className="callout note">
            <span className="co-title">From here to real ISAs</span>
            <p>
              A modern instruction set (ARM, x86, RISC-V) has hundreds of instructions, wider
              registers and clever encodings — but every one of them still rides the same
              three-phase heartbeat. Learn a tiny ISA honestly and the big ones read like
              dialects, not foreign languages.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "One Heartbeat at a Time",
        intro: (
          <>
            <p>A four-instruction program, executed phase by phase at your pace.</p>
            <ul>
              <li>Watch the PC during FETCH and the IR during DECODE — the corridor traffic of 17.2.</li>
              <li>Note the PC has already moved on while the old instruction executes.</li>
              <li>By HLT you have watched 3 + 4 happen the way silicon actually does it.</li>
            </ul>
          </>
        ),
        Component: FetchDecodeLab,
      },
      quiz: [
        {
          q: "During FETCH, the CPU…",
          choices: [
            "Executes the instruction",
            "Sends the PC out on the address bus and loads the returned instruction into the IR",
            "Clears all registers",
            "Waits for input",
          ],
          answer: 1,
          explain: "Fetch is a plain memory read (17.2) whose address happens to come from the program counter.",
        },
        {
          q: "A JMP instruction works by…",
          choices: [
            "Physically rewiring the CPU",
            "Writing a new value into the program counter",
            "Erasing the skipped instructions",
            "Pausing the clock",
          ],
          answer: 1,
          explain: "That's the entire mechanism. Every loop and if-statement in every language reduces to conditional PC writes.",
        },
        {
          q: "In our 8-bit encoding 0010 1111 (0x2F), the two halves mean…",
          choices: [
            "Two data values",
            "Opcode 2 (ADD) and operand 15 — 'add cell 15 to A'",
            "Address 2 and address 15",
            "Nothing — it's invalid",
          ],
          answer: 1,
          explain: "Top nibble = which operation, bottom nibble = which cell. Decode is just splitting bits.",
        },
        {
          q: "JZ (jump if zero) connects which two earlier ideas?",
          choices: [
            "The ALU's Z flag and writing the program counter",
            "The ADC and the DAC",
            "Sampling and aliasing",
            "PWM and duty cycle",
          ],
          answer: 0,
          explain: "Arithmetic gossip (17.1) steers the instruction stream (17.3). This handshake is how software makes decisions.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "build-cpu",
      unitId: "u17",
      title: "Capstone: Run Your CPU",
      subtitle:
        "Sixteen memory cells, one accumulator, ten opcodes — and programs that add, decide, loop and overflow. It's a computer, and you know every wire.",
      buildsOn: ["instruction-set", "registers-alu", "memory-bus"],
      Theory: () => (
        <>
          <h2>Everything, assembled</h2>
          <p>
            The lab below is the whole machine: your counter as PC, your ALU with its Z flag,
            your 16-cell RAM on its buses, an OUT register for a display, and the ten-word
            vocabulary from last lesson. Three programs are loaded and ready:
          </p>
          <ul>
            <li>
              <strong>Add two numbers</strong> — the FETCH/DECODE/EXECUTE lesson&rsquo;s
              program, now free-running. Change the data cells and watch the machine not care:
              same program, new answer. That indifference is what &ldquo;programmable&rdquo;
              means.
            </li>
            <li>
              <strong>Countdown</strong> — the first program with a <em>decision</em>: SUB,
              then JZ watching the Z flag, then a JMP back. A loop with an exit condition —
              the skeleton of every for-loop you will ever write.
            </li>
            <li>
              <strong>Fibonacci forever</strong> — variables shuffled through memory cells, an
              infinite JMP loop, and — watch for it past 233 — an 8-bit overflow (7.2) turning
              the sequence into nonsense. A famous bug class, demonstrated by your own CPU.
            </li>
          </ul>

          <h2>What to notice while it runs</h2>
          <p>
            Run at 1–2 Hz first and <em>predict each step before it happens</em> — you have
            every tool to do so. Then crank the clock: the same machine at 30 Hz starts to feel
            alive, and the only difference between this and your laptop is that its clock
            ticks five billion times a second and its cells are 64 bits wide. Slow is not a
            toy version of fast. It <em>is</em> the real thing, at a humane speed.
          </p>
          <div className="callout tip">
            <span className="co-title">If this branch grabbed you</span>
            <p>
              Ben Eater&rsquo;s breadboard-CPU video series builds almost exactly this machine
              from 74-series logic chips — dozens of breadboards, pure Unit 7 parts. And{" "}
              <em>nand2tetris</em> takes you from NAND gates to Tetris. Both are superb next
              steps; you are fully prepared for either.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Machine, Alive",
        intro: (
          <>
            <p>Your CPU with three programs, a speed knob, and full visibility into every register.</p>
            <ul>
              <li>Step the Add program manually and narrate each heartbeat — you can.</li>
              <li>Run Countdown and watch JZ catch the Z flag at exactly zero.</li>
              <li>Let Fibonacci run past 233 and explain the garbage. (Hint: Lesson 7.2.)</li>
            </ul>
          </>
        ),
        Component: CpuLab,
      },
      checklist: [
        { id: "add", text: "Ran Add with my own numbers in cells 14/15 and predicted OUT before it appeared" },
        { id: "step", text: "Single-stepped a full program, correctly predicting every register change" },
        { id: "countdown", text: "Watched Countdown's JZ fire at zero — a loop with an exit, in hardware" },
        { id: "fib", text: "Caught Fibonacci overflowing past 255 and explained why (8-bit wraparound)" },
        { id: "trace", text: "Traced one instruction through all three phases naming the hardware involved (PC, bus, IR, ALU)" },
        { id: "jump", text: "Explained to someone (or a rubber duck) why a JMP is just a write to the PC" },
        { id: "vocab", text: "Can name what each of LDA/ADD/STA/LDI/JMP/JZ/OUT/HLT does without looking" },
        { id: "bridge", text: "Made the connection: my laptop is this machine, wider and faster — nothing conceptually new" },
      ],
    },
  ],
};
