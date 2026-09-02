import type { UnitModule } from "./types";
import { ActionPotentialLab, SynapseLab } from "@/helix/components/labs/labs-unit8";

export const unit8: UnitModule = {
  unit: {
    id: "u8",
    num: 8,
    title: "Signals: Nerves & Brains",
    blurb:
      "Your nervous system runs on a tenth of a volt and a chemical vote count. Two lessons take you from a single spike to the beginnings of computation.",
    track: "advanced",
  },
  lessons: [
    /* ================================================================ */
    {
      slug: "neuron",
      unitId: "u8",
      title: "The Neuron: Electricity from a Battery of Ions",
      subtitle:
        "Nerves run on membrane voltage — about a tenth of a volt, flipped in a millisecond, racing down a wire that isn't metal.",
      buildsOn: ["membrane", "cells"],
      seeAlso: [
        {
          course: "spark",
          slug: "capacitors",
          label: {
            en: "⚡ Spark 2.3 — a charged membrane is a capacitor; same physics, living wire",
            de: "⚡ Spark 2.3 — eine geladene Membran ist ein Kondensator; gleiche Physik, lebender Draht",
          },
        },
      ],
      Theory: () => (
        <>
          <h2>The battery in every membrane</h2>
          <p>
            A neuron is a cell drawn out into a wire: a body that collects inputs, and an{" "}
            <strong>axon</strong> — sometimes a metre long — that carries the output. The
            electricity it runs on comes straight from Unit 0&rsquo;s membrane. A protein pump
            (the <strong>sodium–potassium pump</strong>) spends ATP shoving Na⁺ ions out and K⁺
            ions in, so charge is stored across the membrane like a stretched spring. At rest the
            inside sits at about <strong>−70&nbsp;mV</strong> relative to the outside.
          </p>
          <p>
            A charged insulator between two conductors is exactly what Spark calls a capacitor.
            The difference is the trick the neuron plays with it.
          </p>

          <h2>The action potential: flip, then reset</h2>
          <p>
            Studded along the axon are <strong>voltage-gated channels</strong> — pores that open
            when the local voltage rises. If an input nudges the membrane up past a{" "}
            <strong>threshold</strong> of about −55&nbsp;mV, Na⁺ channels snap open, Na⁺ floods
            in, and the voltage spikes to about <strong>+40&nbsp;mV</strong> in under a
            millisecond. Then Na⁺ channels shut, K⁺ channels open, and the voltage falls back —
            briefly overshooting below rest. That spike is the <strong>action potential</strong>.
          </p>
          <div className="formula">
            −70 mV rest → −55 mV threshold → +40 mV spike → reset
            <span className="note">total duration: a few milliseconds, then ready again</span>
          </div>
          <p>
            The spike at one patch of membrane nudges the next patch past threshold, so it
            regenerates itself down the axon like a flame along a fuse — never fading, because
            each segment fires fresh.
          </p>

          <h2>All or nothing</h2>
          <p>
            Below threshold: a local bump that decays and travels nowhere. Above threshold: a
            full-sized spike, and always the <em>same</em> full size, no matter how strong the
            stimulus was. A neuron cannot fire half a spike. So how does it report that a touch is
            hard rather than soft? <strong>By rate.</strong> A gentle press might trigger 5 spikes
            a second, a hard one 100. Intensity is encoded in frequency — with a hard ceiling,
            because after each spike the channels need a{" "}
            <strong>refractory period</strong> of a few milliseconds before they can fire again.
          </p>

          <h2>Myelin: insulation changes everything</h2>
          <p>
            A bare axon conducts at walking pace — around 1&nbsp;m/s. Wrapping it in{" "}
            <strong>myelin</strong> (fatty insulation laid down by helper cells) lets the signal
            leap between gaps in the wrapping instead of regenerating at every point, reaching{" "}
            <strong>120&nbsp;m/s</strong>. That hundredfold speed-up is why your reflexes work.
            It also shows its value by its absence: in multiple sclerosis the immune system —
            last unit&rsquo;s friendly fire — attacks myelin, and signals slow, scatter and fail.
          </p>

          <div className="callout note">
            <span className="co-title">Why a squid earned a Nobel Prize</span>
            <p>
              Hodgkin and Huxley worked all this out in the 1940s and 50s on the giant axon of a
              squid — a nerve fibre so wide (a millimetre) that electrodes of the day could fit
              inside. The equations they wrote for its channels are still the foundation of
              computational neuroscience.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Action Potential",
        intro: (
          <>
            <p>Stimulate a patch of membrane and watch the voltage trace.</p>
            <ul>
              <li>Keep the strength below +15 mV: bumps that fade. Cross it: full spikes, instantly.</li>
              <li>Once firing, push the strength higher. The spikes do not get taller — that is all-or-nothing.</li>
              <li>Raise the stimulus rate past ~250/s. The refractory period starts skipping every second one.</li>
            </ul>
          </>
        ),
        Component: ActionPotentialLab,
      },
      problems: [
        {
          prompt:
            "A myelinated axon conducts at 120 m/s. How long does a signal take to travel 1.8 m from toe to brainstem, in milliseconds?",
          answer: 15,
          unit: "ms",
          hint: "time = distance ÷ speed, then convert seconds to ms.",
          explain: "1.8 ÷ 120 = 0.015 s = 15 ms. Unmyelinated, the same trip would take nearly two seconds.",
        },
        {
          prompt:
            "If the refractory period is 2 ms, what is the maximum possible firing rate in spikes per second?",
          answer: 500,
          unit: "spikes/s",
          hint: "How many 2 ms slots fit in one second?",
          explain: "1000 ms ÷ 2 ms = 500 spikes/s — the hard ceiling on rate coding.",
        },
      ],
      quiz: [
        {
          q: "What maintains the −70 mV resting potential?",
          choices: [
            "The sodium–potassium pump spends ATP to keep ion concentrations unequal across the membrane",
            "Electrons flowing along the axon",
            "The myelin sheath generates charge",
            "Neurotransmitters stored in the cell",
          ],
          answer: 0,
          explain:
            "A protein pump builds ion gradients, storing charge across the membrane — a biological capacitor, charged at the cost of ATP.",
        },
        {
          q: "What does 'all-or-nothing' mean for an action potential?",
          choices: [
            "A neuron fires all its neighbours or none",
            "Above threshold the spike is always full-sized; below it, nothing travels at all",
            "The neuron uses all its ATP per spike",
            "Every stimulus produces a spike",
          ],
          answer: 1,
          explain:
            "Spike size never varies with stimulus strength. Sub-threshold inputs produce only local bumps that decay.",
        },
        {
          q: "If spikes are all the same size, how does a neuron signal a stronger stimulus?",
          choices: [
            "With taller spikes",
            "With wider spikes",
            "By firing at a higher rate",
            "By using a different neurotransmitter",
          ],
          answer: 2,
          explain:
            "Intensity is coded in frequency — up to the ceiling set by the refractory period.",
        },
        {
          q: "What does myelin do for an axon?",
          choices: [
            "Generates the resting potential",
            "Protects it from the immune system",
            "Supplies it with ATP",
            "Insulates it so the signal leaps between gaps, raising speed roughly a hundredfold",
          ],
          answer: 3,
          explain:
            "From ~1 m/s bare to ~120 m/s myelinated. Multiple sclerosis, which strips myelin, shows what is lost without it.",
        },
        {
          q: "Why can a spike travel a metre without fading?",
          choices: [
            "It regenerates fully at each patch of membrane, like a flame along a fuse",
            "The axon is a superconductor",
            "It is amplified by the brain",
            "Myelin prevents all energy loss",
          ],
          answer: 0,
          explain:
            "Each segment fires its own fresh action potential. The signal is re-created, not conducted passively — that is why it cannot fade.",
        },
      ],
    },

    /* ================================================================ */
    {
      slug: "synapse",
      unitId: "u8",
      title: "The Synapse: Where Signals Become Decisions",
      subtitle:
        "The gap between neurons is where the computing happens — chemical votes, counted in millivolts, decide whether the next cell fires.",
      buildsOn: ["neuron"],
      Theory: () => (
        <>
          <h2>The signal changes vehicles</h2>
          <p>
            Between one neuron and the next is a gap of about 20 <em>nanometres</em> — far too
            wide for the voltage spike to jump. So the signal changes vehicles. An arriving spike
            makes the sending terminal release <strong>neurotransmitters</strong> — small
            molecules stored in bubbles — which drift across the gap and dock onto{" "}
            <strong>receptor proteins</strong> on the receiving side, opening ion channels there.
            Electrical → chemical → electrical, in about a millisecond.
          </p>
          <p>
            Why bother with the detour? Because a gap can do things a solid wire cannot: it can be
            strengthened, weakened, blocked, and — crucially — it can <em>vote no</em>.
          </p>

          <h2>Excitation, inhibition, and the vote</h2>
          <p>
            Some synapses are <strong>excitatory</strong>: their transmitter opens channels that
            nudge the receiving neuron&rsquo;s voltage up toward threshold. Others are{" "}
            <strong>inhibitory</strong>: they push the voltage down, away from it. A typical
            neuron collects <em>thousands</em> of both kinds, and their effects{" "}
            <strong>sum</strong> — close together in time and space, plus votes and minus votes
            all land on the same membrane. Cross −55&nbsp;mV and the axon fires; fall short and
            nothing happens.
          </p>
          <div className="formula">
            fire if: rest + Σ(excitation) − Σ(inhibition) ≥ threshold
            <span className="note">a neuron is a voting machine with a cutoff</span>
          </div>
          <p>
            That summing-with-a-threshold is a genuine computation — engineers borrowed exactly
            this arithmetic for artificial neural networks. Everything your brain does is built
            from roughly 86 billion of these voting machines, wired by about a hundred trillion
            synapses.
          </p>

          <h2>Learning lives in the gap</h2>
          <p>
            Synapses are adjustable: use one repeatedly and it grows stronger — more transmitter
            released, more receptors listening. Neuroscientists compress this into{" "}
            <em>&ldquo;cells that fire together wire together.&rdquo;</em> Memories are not filed
            in some storage organ; they are patterns of strengthened and weakened synapses. When
            you finish this course, what has physically changed in you is synaptic weights.
          </p>

          <h2>Why drugs act here</h2>
          <p>
            A chemical gap is a chemical target, which is why nearly every mind-altering
            substance works at the synapse. <strong>Caffeine</strong> blocks the receptor for
            adenosine, an inhibitory &ldquo;sleep pressure&rdquo; signal — blocking an inhibitor
            feels like a stimulant. <strong>SSRIs</strong> slow the clean-up of serotonin, so
            each release lingers longer. <strong>Botox</strong> blocks transmitter release at
            nerve–muscle synapses: the vote never arrives, and the muscle relaxes. Same
            machinery, three different levers.
          </p>

          <div className="callout note">
            <span className="co-title">Why your reaction time is ~200 ms</span>
            <p>
              Axons are fast, but every synapse costs about a millisecond, and a
              stimulus-to-button-press chain crosses many of them — plus the brain&rsquo;s own
              deliberation. Sprinters who leave the blocks under 100 ms after the gun are
              disqualified: no human chain of synapses is that short, so they must have jumped.
            </p>
          </div>
        </>
      ),
      lab: {
        title: "The Voting Machine",
        intro: (
          <>
            <p>Excitatory inputs vote +4 mV, inhibitory ones −3 mV. The threshold counts the ballots.</p>
            <ul>
              <li>With no inhibition, find the minimum excitatory votes that make the neuron fire.</li>
              <li>Add inhibition until it falls silent again — the sum is all that matters.</li>
              <li>Try the stimulant and sedative: neither touches excitation, they only re-weight the no-votes.</li>
            </ul>
          </>
        ),
        Component: SynapseLab,
      },
      problems: [
        {
          prompt:
            "A neuron rests at −70 mV with a threshold of −55 mV. Each excitatory input adds +3 mV. With no inhibition, how many inputs must arrive together to make it fire?",
          answer: 5,
          unit: "inputs",
          hint: "The gap to close is 15 mV.",
          explain: "15 ÷ 3 = 5 simultaneous excitatory inputs. One or two alone fade away — summation is the point.",
        },
      ],
      quiz: [
        {
          q: "How does a signal cross the synaptic gap?",
          choices: [
            "The voltage spike jumps across",
            "Ions flow through the gap",
            "The two cells fuse briefly",
            "Neurotransmitter molecules are released, drift across, and dock on receptors",
          ],
          answer: 3,
          explain:
            "The signal converts from electrical to chemical and back. The detour is what makes synapses adjustable, blockable — and inhibitable.",
        },
        {
          q: "What decides whether the receiving neuron fires?",
          choices: [
            "Whether the summed excitatory and inhibitory inputs push the membrane past threshold",
            "Whether any single input arrives",
            "The length of its axon",
            "The amount of myelin it has",
          ],
          answer: 0,
          explain:
            "Plus votes and minus votes sum on the membrane; the threshold turns the tally into a yes or no. That is the computation.",
        },
        {
          q: "What is the physical basis of learning and memory?",
          choices: [
            "New neurons replacing old ones",
            "Synapses changing strength — used connections grow stronger",
            "Faster action potentials",
            "More neurotransmitter types",
          ],
          answer: 1,
          explain:
            "'Fire together, wire together.' Memories are patterns of adjusted synaptic weights, not files in a storage organ.",
        },
        {
          q: "Caffeine blocks receptors for adenosine, an inhibitory signal. Why does that feel stimulating?",
          choices: [
            "Caffeine is itself an excitatory transmitter",
            "It speeds up action potentials",
            "Blocking an inhibitor removes a 'no' vote — net excitation rises",
            "It increases dopamine production directly",
          ],
          answer: 2,
          explain:
            "Two negatives make a positive at a voting machine: silencing an inhibitory input shifts the sum toward firing.",
        },
        {
          q: "Why do inhibitory synapses exist at all?",
          choices: [
            "They are excitatory synapses that failed",
            "They save energy",
            "They only exist in diseased brains",
            "Computation needs 'no' votes — a system that can only say yes can only escalate",
          ],
          answer: 3,
          explain:
            "Subtraction is half of arithmetic. Inhibition sharpens signals, sculpts timing, and keeps runaway excitation (a seizure) in check.",
        },
      ],
    },
  ],
};
