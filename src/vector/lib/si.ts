/**
 * Units, prefixes and constants — Vector Academy's signature reference, the
 * counterpart to Catalyst's periodic table and Helix's genetic code.
 *
 * Physics runs on a small vocabulary that everyone half-knows: seven base
 * units, a handful of derived ones named after people, the prefix ladder from
 * pico to tera, and a few constants of nature. Each entry carries a memory
 * hook (`*stars*` mark the letters or ideas that matter) because the payoff —
 * knowing instantly that a µF is a millionth of a farad or that g and G are
 * different things — is exactly the kind of fact that decays without one.
 *
 * Symbols are NOT unique across kinds (m is metre and milli, G is giga and
 * the gravitational constant), so every entry has a unique `id` — the review
 * deck keys drill cards as `si:<id>`.
 */

export type SiKind = "base" | "derived" | "prefix" | "constant";

export interface SiEntry {
  /** Unique across the dataset — used in review-deck keys. */
  id: string;
  symbol: string;
  name: string;
  nameDe: string;
  /** What it measures (units), multiplies (prefixes) or equals (constants). */
  meaning: string;
  meaningDe: string;
  kind: SiKind;
  /** English memory hook; `*stars*` mark the emphasised parts. */
  hook: string;
  /** German Eselsbrücke, same convention. */
  esel: string;
}

export const SI_ENTRIES: SiEntry[] = [
  /* ---- the seven base units ---- */
  { id: "metre", symbol: "m", name: "metre", nameDe: "Meter", meaning: "length", meaningDe: "Länge", kind: "base",
    hook: "*m* for *m*etre — originally one ten-millionth of the distance from pole to equator. The Earth was the first ruler.",
    esel: "*m* wie *M*eter — ursprünglich ein Zehnmillionstel der Strecke Pol–Äquator. Die Erde war das erste Lineal." },
  { id: "kilogram", symbol: "kg", name: "kilogram", nameDe: "Kilogramm", meaning: "mass", meaningDe: "Masse", kind: "base",
    hook: "The only base unit with a *prefix built in* — the gram was too small to be practical, so the *k*ilogram got the job.",
    esel: "Die einzige Basiseinheit mit *eingebautem Präfix* — das Gramm war zu klein für den Alltag, also bekam das *K*ilogramm den Posten." },
  { id: "second", symbol: "s", name: "second", nameDe: "Sekunde", meaning: "time", meaningDe: "Zeit", kind: "base",
    hook: "*s* for *s*econd — the *s*econd division of the hour (the first gave minutes). Today it is counted in caesium vibrations.",
    esel: "*s* wie *S*ekunde — die *zweite* Teilung der Stunde (die erste ergab Minuten). Heute wird sie in Cäsium-Schwingungen gezählt." },
  { id: "ampere", symbol: "A", name: "ampere", nameDe: "Ampere", meaning: "electric current", meaningDe: "elektrische Stromstärke", kind: "base",
    hook: "*A* for *A*mpère — André-Marie Ampère, who showed two current-carrying wires push and pull on each other. Spark's whole course flows through this unit.",
    esel: "*A* wie *A*mpère — André-Marie Ampère zeigte, dass zwei stromführende Drähte einander schieben und ziehen. Sparks ganzer Kurs fließt durch diese Einheit." },
  { id: "kelvin", symbol: "K", name: "kelvin", nameDe: "Kelvin", meaning: "temperature", meaningDe: "Temperatur", kind: "base",
    hook: "*K* for Lord *K*elvin — no degree sign, because it starts at absolute zero and counts up. 0 K is where jiggling stops.",
    esel: "*K* wie Lord *K*elvin — ohne Gradzeichen, denn es beginnt am absoluten Nullpunkt und zählt aufwärts. Bei 0 K endet das Zittern." },
  { id: "mole", symbol: "mol", name: "mole", nameDe: "Mol", meaning: "amount of substance", meaningDe: "Stoffmenge", kind: "base",
    hook: "The chemist's dozen: 6.022×10²³ of anything. Catalyst's favourite unit — *mol*ecules by the *mol*e.",
    esel: "Das Dutzend der Chemie: 6,022×10²³ von irgendetwas. Catalysts Lieblingseinheit — *Mol*eküle im *Mol*." },
  { id: "candela", symbol: "cd", name: "candela", nameDe: "Candela", meaning: "luminous intensity", meaningDe: "Lichtstärke", kind: "base",
    hook: "*cd* for *c*an*d*ela — Latin for candle, and one candela is honestly about one *candle's* worth of light.",
    esel: "*cd* wie *C*an*d*ela — lateinisch für Kerze, und eine Candela ist ehrlich ungefähr das Licht einer *Kerze*." },

  /* ---- derived units, mostly named after people ---- */
  { id: "newton", symbol: "N", name: "newton", nameDe: "Newton", meaning: "force (kg·m/s²)", meaningDe: "Kraft (kg·m/s²)", kind: "derived",
    hook: "One *N*ewton is about the weight of an apple — the joke writes itself, and it makes the unit unforgettable.",
    esel: "Ein *N*ewton ist ungefähr die Gewichtskraft eines Apfels — der Witz schreibt sich selbst, und die Einheit sitzt für immer." },
  { id: "joule", symbol: "J", name: "joule", nameDe: "Joule", meaning: "energy (N·m)", meaningDe: "Energie (N·m)", kind: "derived",
    hook: "*J* for James *J*oule, who measured heat from falling weights. One joule ≈ lifting that apple one metre.",
    esel: "*J* wie James *J*oule, der Wärme mit fallenden Gewichten maß. Ein Joule ≈ diesen Apfel einen Meter heben." },
  { id: "watt", symbol: "W", name: "watt", nameDe: "Watt", meaning: "power (J/s)", meaningDe: "Leistung (J/s)", kind: "derived",
    hook: "*W* for James *W*att of steam-engine fame. Power is energy *per second* — a watt is a joule in a hurry.",
    esel: "*W* wie James *W*att von der Dampfmaschine. Leistung ist Energie *pro Sekunde* — ein Watt ist ein Joule in Eile." },
  { id: "pascal", symbol: "Pa", name: "pascal", nameDe: "Pascal", meaning: "pressure (N/m²)", meaningDe: "Druck (N/m²)", kind: "derived",
    hook: "*Pa* for Blaise *Pa*scal, who carried a barometer up a mountain to prove air pressure falls with height. One pascal is tiny — the atmosphere is 101,325 of them.",
    esel: "*Pa* wie Blaise *Pa*scal, der ein Barometer auf einen Berg trug, um zu zeigen, dass Luftdruck mit der Höhe fällt. Ein Pascal ist winzig — die Atmosphäre hat 101.325 davon." },
  { id: "hertz", symbol: "Hz", name: "hertz", nameDe: "Hertz", meaning: "frequency (1/s)", meaningDe: "Frequenz (1/s)", kind: "derived",
    hook: "*Hz* for Heinrich *H*ert*z*, first to make and catch radio waves. Anything *per second* that repeats: heartbeats, frames, A440.",
    esel: "*Hz* wie Heinrich *H*ert*z*, der als Erster Radiowellen erzeugte und fing. Alles, was sich *pro Sekunde* wiederholt: Herzschläge, Frames, der Kammerton A." },
  { id: "coulomb", symbol: "C", name: "coulomb", nameDe: "Coulomb", meaning: "electric charge (A·s)", meaningDe: "elektrische Ladung (A·s)", kind: "derived",
    hook: "*C* for *C*oulomb — one ampere flowing for one second. About six billion billion electrons; you hand one past a doorknob in winter.",
    esel: "*C* wie *C*oulomb — ein Ampere, eine Sekunde lang. Rund sechs Milliarden Milliarden Elektronen; im Winter reichst du sie einer Türklinke." },
  { id: "volt", symbol: "V", name: "volt", nameDe: "Volt", meaning: "electric potential (J/C)", meaningDe: "elektrisches Potenzial (J/C)", kind: "derived",
    hook: "*V* for Alessandro *V*olta and his pile — the first battery. Joules per coulomb: how hard each unit of charge is pushed.",
    esel: "*V* wie Alessandro *V*olta und seine Säule — die erste Batterie. Joule pro Coulomb: wie kräftig jede Ladungseinheit geschoben wird." },
  { id: "ohm", symbol: "Ω", name: "ohm", nameDe: "Ohm", meaning: "electrical resistance (V/A)", meaningDe: "elektrischer Widerstand (V/A)", kind: "derived",
    hook: "The Greek *Ω* for Georg *Ohm* — an O would look like zero. Fittingly the last letter of the alphabet: where current goes to struggle.",
    esel: "Das griechische *Ω* für Georg *Ohm* — ein O sähe aus wie null. Passend der letzte Buchstabe des Alphabets: wo der Strom sich abmüht." },
  { id: "celsius", symbol: "°C", name: "degree Celsius", nameDe: "Grad Celsius", meaning: "temperature (K − 273.15)", meaningDe: "Temperatur (K − 273,15)", kind: "derived",
    hook: "Anders *C*elsius pinned 0 and 100 to water freezing and boiling. Same step size as the kelvin — only the zero moved.",
    esel: "Anders *C*elsius heftete 0 und 100 an gefrierendes und kochendes Wasser. Gleiche Schrittweite wie das Kelvin — nur die Null ist verschoben." },

  /* ---- the prefix ladder ---- */
  { id: "tera", symbol: "T", name: "tera", nameDe: "Tera", meaning: "× 10¹² (a trillion)", meaningDe: "× 10¹² (eine Billion)", kind: "prefix",
    hook: "*T*era from the Greek for *monster* — a monstrous trillion. Terabyte drives made it a household word.",
    esel: "*T*era vom griechischen Wort für *Monster* — eine monströse Billion. Terabyte-Platten machten es alltäglich." },
  { id: "giga", symbol: "G", name: "giga", nameDe: "Giga", meaning: "× 10⁹ (a billion)", meaningDe: "× 10⁹ (eine Milliarde)", kind: "prefix",
    hook: "*G*iga from *giant* — a giant billion. Same root as gigantic; say it with a hard or soft G, physics forgives both.",
    esel: "*G*iga von *Gigant* — eine riesige Milliarde. Dieselbe Wurzel wie gigantisch." },
  { id: "mega", symbol: "M", name: "mega", nameDe: "Mega", meaning: "× 10⁶ (a million)", meaningDe: "× 10⁶ (eine Million)", kind: "prefix",
    hook: "*M*ega, big *M* — a *M*illion. Capital, because its little brother m already means a thousandth. Case is load-bearing here.",
    esel: "*M*ega, großes *M* — eine *M*illion. Groß geschrieben, denn der kleine Bruder m heißt schon Tausendstel. Groß-/Kleinschreibung trägt hier Last." },
  { id: "kilo", symbol: "k", name: "kilo", nameDe: "Kilo", meaning: "× 10³ (a thousand)", meaningDe: "× 10³ (ein Tausend)", kind: "prefix",
    hook: "*k*ilo, small *k* — a thousand. Small on purpose: capital K is the kelvin. 4.7k on a resistor is 4,700.",
    esel: "*k*ilo, kleines *k* — ein Tausend. Absichtlich klein: das große K ist das Kelvin. 4,7k auf einem Widerstand sind 4.700." },
  { id: "centi", symbol: "c", name: "centi", nameDe: "Zenti", meaning: "× 10⁻² (a hundredth)", meaningDe: "× 10⁻² (ein Hundertstel)", kind: "prefix",
    hook: "*c*enti as in *cent* — a hundredth of a euro, a hundredth of a metre. The ruler on your desk taught you this one already.",
    esel: "*Z*enti wie *Cent* — ein Hundertstel Euro, ein Hundertstel Meter. Das Lineal auf deinem Tisch hat es dir längst beigebracht." },
  { id: "milli", symbol: "m", name: "milli", nameDe: "Milli", meaning: "× 10⁻³ (a thousandth)", meaningDe: "× 10⁻³ (ein Tausendstel)", kind: "prefix",
    hook: "*m*illi from Latin *mille*, a thousand — but as a divisor: a thousand*th*. A millimetre is the metre's small change.",
    esel: "*M*illi von lateinisch *mille*, tausend — aber als Teiler: ein Tausend*stel*. Der Millimeter ist das Kleingeld des Meters." },
  { id: "micro", symbol: "µ", name: "micro", nameDe: "Mikro", meaning: "× 10⁻⁶ (a millionth)", meaningDe: "× 10⁻⁶ (ein Millionstel)", kind: "prefix",
    hook: "The Greek *µ* (mu) for *micro* — a millionth. The only prefix needing a Greek keyboard, which is exactly why you remember it.",
    esel: "Das griechische *µ* (My) für *mikro* — ein Millionstel. Das einzige Präfix, das eine griechische Tastatur braucht — genau darum merkst du es dir." },
  { id: "nano", symbol: "n", name: "nano", nameDe: "Nano", meaning: "× 10⁻⁹ (a billionth)", meaningDe: "× 10⁻⁹ (ein Milliardstel)", kind: "prefix",
    hook: "*n*ano from the Greek for *dwarf* — a billionth. DNA is 2 nm wide; 'nanotech' is engineering at the dwarf scale.",
    esel: "*N*ano vom griechischen Wort für *Zwerg* — ein Milliardstel. DNA ist 2 nm breit; „Nanotechnik“ ist Ingenieurskunst im Zwergenmaß." },
  { id: "pico", symbol: "p", name: "pico", nameDe: "Piko", meaning: "× 10⁻¹² (a trillionth)", meaningDe: "× 10⁻¹² (ein Billionstel)", kind: "prefix",
    hook: "*p*ico from Spanish for a *tiny bit* — a trillionth. Capacitors live here: the 22 pF in Spark's oscillator is 0.000000000022 F.",
    esel: "*P*iko vom spanischen Wort für ein *bisschen* — ein Billionstel. Kondensatoren wohnen hier: die 22 pF in Sparks Oszillator sind 0,000000000022 F." },

  /* ---- constants of nature ---- */
  { id: "g-earth", symbol: "g", name: "gravitational acceleration", nameDe: "Fallbeschleunigung", meaning: "9.81 m/s² (on Earth)", meaningDe: "9,81 m/s² (auf der Erde)", kind: "constant",
    hook: "Small *g* — how fast things *g*ain speed falling on Earth: ~10 m/s of extra speed every second. You will measure it yourself in Unit 3.",
    esel: "Kleines *g* — wie schnell Dinge auf der Erde im Fall Tempo *g*ewinnen: ~10 m/s mehr pro Sekunde. In Einheit 3 misst du es selbst." },
  { id: "g-newton", symbol: "G", name: "gravitational constant", nameDe: "Gravitationskonstante", meaning: "6.67 × 10⁻¹¹ N·m²/kg²", meaningDe: "6,67 × 10⁻¹¹ N·m²/kg²", kind: "constant",
    hook: "Big *G* — *G*ravity's universal strength, the same between any two masses anywhere. Small g is Earth's local number; big G is everyone's.",
    esel: "Großes *G* — die universelle Stärke der *G*ravitation, gleich zwischen zwei beliebigen Massen überall. Kleines g ist die lokale Zahl der Erde; großes G gehört allen." },
  { id: "c-light", symbol: "c", name: "speed of light", nameDe: "Lichtgeschwindigkeit", meaning: "3.00 × 10⁸ m/s (in vacuum)", meaningDe: "3,00 × 10⁸ m/s (im Vakuum)", kind: "constant",
    hook: "*c* from Latin *celeritas*, swiftness — the universe's speed limit. To the Moon in 1.3 s, from the Sun in 8 min.",
    esel: "*c* von lateinisch *celeritas*, Schnelligkeit — das Tempolimit des Universums. Zum Mond in 1,3 s, von der Sonne in 8 min." },
  { id: "planck", symbol: "h", name: "Planck constant", nameDe: "Planck-Konstante", meaning: "6.63 × 10⁻³⁴ J·s", meaningDe: "6,63 × 10⁻³⁴ J·s", kind: "constant",
    hook: "*h* for Max Planck's *Hilfsgröße* — the 'helper quantity' he never expected to be real. E = hf: energy comes in packets this small.",
    esel: "*h* wie Plancks *Hilfsgröße* — die er selbst nie für real hielt. E = hf: Energie kommt in Paketen dieser Größe." },
  { id: "e-charge", symbol: "e", name: "elementary charge", nameDe: "Elementarladung", meaning: "1.60 × 10⁻¹⁹ C", meaningDe: "1,60 × 10⁻¹⁹ C", kind: "constant",
    hook: "*e* for the *e*lectron's charge (give or take a sign) — the smallest free-standing piece of charge. All currents are multiples of it.",
    esel: "*e* wie die Ladung des *E*lektrons (bis aufs Vorzeichen) — das kleinste frei existierende Stück Ladung. Jeder Strom ist ein Vielfaches davon." },
  { id: "avogadro", symbol: "Nₐ", name: "Avogadro constant", nameDe: "Avogadro-Konstante", meaning: "6.022 × 10²³ /mol", meaningDe: "6,022 × 10²³ /mol", kind: "constant",
    hook: "*N*umber per mole, subscript *A* for *A*vogadro — the bridge between atoms and grams. Catalyst's stoichiometry stands on it.",
    esel: "An*z*ahl pro Mol, Index *A* wie *A*vogadro — die Brücke zwischen Atomen und Gramm. Catalysts Stöchiometrie steht darauf." },
];

export const SI_BY_ID: Record<string, SiEntry> = Object.fromEntries(SI_ENTRIES.map((e) => [e.id, e]));

export const KIND_ORDER: SiKind[] = ["base", "derived", "prefix", "constant"];

export const KIND_VAR: Record<SiKind, string> = {
  base: "--si-base",
  derived: "--si-derived",
  prefix: "--si-prefix",
  constant: "--si-constant",
};

export function kindVar(kind: SiKind): string {
  return `var(${KIND_VAR[kind]})`;
}
