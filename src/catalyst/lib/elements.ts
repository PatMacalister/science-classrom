/**
 * All 118 elements — the data behind the periodic table and the /elements page.
 *
 * `esel` is the Eselsbrücke: a German memory hook tying the element's name to
 * its symbol (many symbols come from Latin/Greek names — exactly where a
 * bridge is needed). Text between *asterisks* is rendered emphasized; keep
 * the symbol's letters inside the stars where possible.
 *
 * `mass` is the standard atomic weight as a display string; parenthesised
 * values are the mass number of the most stable isotope (no stable isotopes).
 * `group` is null for the f-block (lanthanides/actinides), which the grid
 * renders in the two detached rows below the main table.
 */

export type ElementCategory =
  | "alkali"
  | "alkaline"
  | "transition"
  | "post-transition"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble"
  | "lanthanide"
  | "actinide"
  | "unknown";

export interface ChemElement {
  z: number;
  symbol: string;
  name: string;
  nameDe: string;
  mass: string;
  category: ElementCategory;
  period: number;
  group: number | null;
  esel: string;
}

export const ELEMENTS: ChemElement[] = [
  { z: 1, symbol: "H", name: "Hydrogen", nameDe: "Wasserstoff", mass: "1.008", category: "nonmetal", period: 1, group: 1, esel: "Wasserstoff heißt lateinisch *H*ydrogenium, der ‚Wassererzeuger' — H wie Himmel: das leichteste aller Gase will immer nach oben." },
  { z: 2, symbol: "He", name: "Helium", nameDe: "Helium", mass: "4.003", category: "noble", period: 1, group: 18, esel: "*He*lium wurde zuerst auf der Sonne entdeckt — benannt nach *He*lios, dem Sonnengott." },
  { z: 3, symbol: "Li", name: "Lithium", nameDe: "Lithium", mass: "6.94", category: "alkali", period: 2, group: 1, esel: "Dein Akku *li*ebt *Li*thium — vom griechischen *líthos*, der Stein." },
  { z: 4, symbol: "Be", name: "Beryllium", nameDe: "Beryllium", mass: "9.012", category: "alkaline", period: 2, group: 2, esel: "*Be*ryllium steckt im Edelstein *Be*ryll — aus dem einst die ersten ‚Brillen' geschliffen wurden." },
  { z: 5, symbol: "B", name: "Boron", nameDe: "Bor", mass: "10.81", category: "metalloid", period: 2, group: 13, esel: "*B*or wie *B*orax — das alte Wasch- und Putzmittel, aus dem es zuerst gewonnen wurde." },
  { z: 6, symbol: "C", name: "Carbon", nameDe: "Kohlenstoff", mass: "12.011", category: "nonmetal", period: 2, group: 14, esel: "Kohlenstoff heißt lateinisch *C*arboneum — wie ‚*C*arbon' im Rennrad und ‚A-*C*tivkohle' im Filter." },
  { z: 7, symbol: "N", name: "Nitrogen", nameDe: "Stickstoff", mass: "14.007", category: "nonmetal", period: 2, group: 15, esel: "Stickstoff = *N*itrogenium, der ‚Salpeterbildner'. Merksatz: *N* wie ‚*n*ix brennt' — er erstickt jede Flamme." },
  { z: 8, symbol: "O", name: "Oxygen", nameDe: "Sauerstoff", mass: "15.999", category: "nonmetal", period: 2, group: 16, esel: "Sauerstoff = *O*xygenium, der ‚Säurebildner' — das *O* wie in *O*xidation: ohne ihn rostet nichts und brennt nichts." },
  { z: 9, symbol: "F", name: "Fluorine", nameDe: "Fluor", mass: "18.998", category: "halogen", period: 2, group: 17, esel: "*F*luor *f*risst sogar Glas — das gierigste Element von allen, vom lateinischen *fluere*, fließen." },
  { z: 10, symbol: "Ne", name: "Neon", nameDe: "Neon", mass: "20.180", category: "noble", period: 2, group: 18, esel: "*Ne*on, griechisch ‚das *Ne*ue' — glüht orangerot in jeder klassischen Leuchtreklame." },
  { z: 11, symbol: "Na", name: "Sodium", nameDe: "Natrium", mass: "22.990", category: "alkali", period: 3, group: 1, esel: "‚*Na*, Salz gefällig?' — *Na*trium steckt im Kochsalz (NaCl); der Name kommt vom ägyptischen Soda *Natron*." },
  { z: 12, symbol: "Mg", name: "Magnesium", nameDe: "Magnesium", mass: "24.305", category: "alkaline", period: 3, group: 2, esel: "*M*a*g*nesium aus der griechischen Region *Mag*nesia — brennt blendend weiß wie ein Blitzlicht." },
  { z: 13, symbol: "Al", name: "Aluminium", nameDe: "Aluminium", mass: "26.982", category: "post-transition", period: 3, group: 13, esel: "*Al*ufolie ist pures *Al*uminium — leichter wird Alltagsmetall nicht." },
  { z: 14, symbol: "Si", name: "Silicon", nameDe: "Silicium", mass: "28.085", category: "metalloid", period: 3, group: 14, esel: "*Si*licium von *si*lex, dem Feuerstein — heute rechnet jeder Chip damit: *Si*licon Valley!" },
  { z: 15, symbol: "P", name: "Phosphorus", nameDe: "Phosphor", mass: "30.974", category: "nonmetal", period: 3, group: 15, esel: "*P*hosphor, griechisch der ‚Lichtträger' — er leuchtet im Dunkeln und zündete die ersten Streichhölzer." },
  { z: 16, symbol: "S", name: "Sulfur", nameDe: "Schwefel", mass: "32.06", category: "nonmetal", period: 3, group: 16, esel: "*S*chwefel wie *S*tinkbombe — lateinisch *S*ulfur: gelb, brennbar und faulig riechend." },
  { z: 17, symbol: "Cl", name: "Chlorine", nameDe: "Chlor", mass: "35.45", category: "halogen", period: 3, group: 17, esel: "*Chl*or von *chl*ōrós, gelbgrün — das gelbgrüne Gas, das nach Schwimmbad riecht." },
  { z: 18, symbol: "Ar", name: "Argon", nameDe: "Argon", mass: "39.95", category: "noble", period: 3, group: 18, esel: "*Ar*gon, griechisch ‚das Träge' — ‚*ar*beitsscheu' reagiert es mit rein gar nichts." },
  { z: 19, symbol: "K", name: "Potassium", nameDe: "Kalium", mass: "39.098", category: "alkali", period: 4, group: 1, esel: "*K*alium wie *K*ali aus der Pflanzenasche (arabisch *al-qalya*) — nur die Engländer sagen Potassium, das Symbol bleibt K." },
  { z: 20, symbol: "Ca", name: "Calcium", nameDe: "Calcium", mass: "40.078", category: "alkaline", period: 4, group: 2, esel: "*Ca*lcium von *ca*lx, der Kalk — sitzt in Knochen, Kreide und *Ca*ppuccino-Milch." },
  { z: 21, symbol: "Sc", name: "Scandium", nameDe: "Scandium", mass: "44.956", category: "transition", period: 4, group: 3, esel: "*Sc*andium wie *Sc*andinavien — dort wurde es entdeckt, genau wo Mendelejew es vorhergesagt hatte." },
  { z: 22, symbol: "Ti", name: "Titanium", nameDe: "Titan", mass: "47.867", category: "transition", period: 4, group: 4, esel: "*Ti*tan wie die *Ti*tanen — göttlich fest und trotzdem federleicht: das Fahrradrahmen-Metall." },
  { z: 23, symbol: "V", name: "Vanadium", nameDe: "Vanadium", mass: "50.942", category: "transition", period: 4, group: 5, esel: "*V*anadium nach *V*anadis, Beiname der nordischen Göttin Freyja — seine Salze schillern göttlich bunt." },
  { z: 24, symbol: "Cr", name: "Chromium", nameDe: "Chrom", mass: "51.996", category: "transition", period: 4, group: 6, esel: "*Cr*/Chrom von *chr*ṓma, die Farbe — jede Oxidationsstufe leuchtet anders, und dein Wasserhahn glänzt damit." },
  { z: 25, symbol: "Mn", name: "Manganese", nameDe: "Mangan", mass: "54.938", category: "transition", period: 4, group: 7, esel: "*M*a*n*gan = *Mn*: ‚Ma*n*gan hat das *n*, Ma*g*nesium das *g*' — so verwechselst du Mn und Mg nie wieder." },
  { z: 26, symbol: "Fe", name: "Iron", nameDe: "Eisen", mass: "55.845", category: "transition", period: 4, group: 8, esel: "Eisen heißt lateinisch *Fe*rrum — wie die *Fe*rrovia, die italienische Eisenbahn, und der *Fe*rrari aus Stahl." },
  { z: 27, symbol: "Co", name: "Cobalt", nameDe: "Cobalt", mass: "58.933", category: "transition", period: 4, group: 9, esel: "*Co*balt wie der *Ko*bold, der Bergleuten ‚verhextes Erz' unterschob — dafür färbt es Glas tiefblau." },
  { z: 28, symbol: "Ni", name: "Nickel", nameDe: "Nickel", mass: "58.693", category: "transition", period: 4, group: 10, esel: "*Ni*ckel, der zweite Bergwerks-Schelm: ‚Kupfer*ni*ckel' hieß das Erz, das partout kein Kupfer hergab." },
  { z: 29, symbol: "Cu", name: "Copper", nameDe: "Kupfer", mass: "63.546", category: "transition", period: 4, group: 11, esel: "Kupfer = *Cu*prum, nach Zypern (*Cu*prus) — der Insel der antiken Kupferminen." },
  { z: 30, symbol: "Zn", name: "Zinc", nameDe: "Zink", mass: "65.38", category: "transition", period: 4, group: 12, esel: "*Z*i*n*k wie die *Zin*ken einer Gabel — seine Kristalle erstarren zu spitzen Zacken." },
  { z: 31, symbol: "Ga", name: "Gallium", nameDe: "Gallium", mass: "69.723", category: "post-transition", period: 4, group: 13, esel: "*Ga*llium nach *Ga*llien, dem alten Frankreich — ein Metall, das schon in deiner Handfläche schmilzt." },
  { z: 32, symbol: "Ge", name: "Germanium", nameDe: "Germanium", mass: "72.630", category: "metalloid", period: 4, group: 14, esel: "*Ge*rmanium nach *Ge*rmanien — der deutsche Halbleiter, aus dem die allerersten Transistoren waren." },
  { z: 33, symbol: "As", name: "Arsenic", nameDe: "Arsen", mass: "74.922", category: "metalloid", period: 4, group: 15, esel: "*As* wie *As*sassine — Arsen ist das klassische Krimigift (und schmeckt nach gar nichts, daher so beliebt)." },
  { z: 34, symbol: "Se", name: "Selenium", nameDe: "Selen", mass: "78.971", category: "nonmetal", period: 4, group: 16, esel: "*Se*len nach *Se*lene, der Mondgöttin — kleiner Bruder des Tellurs, das nach der Erde heißt." },
  { z: 35, symbol: "Br", name: "Bromine", nameDe: "Brom", mass: "79.904", category: "halogen", period: 4, group: 17, esel: "*Br*om von *br*ōmos, der Gestank — die einzige flüssige Nichtmetall-Brühe: *br*aun, dampfend, beißend." },
  { z: 36, symbol: "Kr", name: "Krypton", nameDe: "Krypton", mass: "83.798", category: "noble", period: 4, group: 18, esel: "*Kr*ypton, ‚das Verborgene' — es versteckte sich in der Luft, bis man sie destillierte. Ja, Superman lässt grüßen." },
  { z: 37, symbol: "Rb", name: "Rubidium", nameDe: "Rubidium", mass: "85.468", category: "alkali", period: 5, group: 1, esel: "*R*u*b*idium von *rub*idus, tiefrot — entdeckt an seinen *rub*inroten Spektrallinien." },
  { z: 38, symbol: "Sr", name: "Strontium", nameDe: "Strontium", mass: "87.62", category: "alkaline", period: 5, group: 2, esel: "*S*t*r*ontium nach dem schottischen Dorf *Str*ontian — färbt jedes Feuerwerk knallrot." },
  { z: 39, symbol: "Y", name: "Yttrium", nameDe: "Yttrium", mass: "88.906", category: "transition", period: 5, group: 3, esel: "*Y*ttrium nach *Y*tterby in Schweden — die eine Dorfgrube, die gleich vier Elementen den Namen gab (Y, Tb, Er, Yb)." },
  { z: 40, symbol: "Zr", name: "Zirconium", nameDe: "Zirconium", mass: "91.224", category: "transition", period: 5, group: 4, esel: "*Zr* wie *Zir*konia — der ‚falsche Diamant' am Ringfinger ist Zirconium-Oxid." },
  { z: 41, symbol: "Nb", name: "Niobium", nameDe: "Niob", mass: "92.906", category: "transition", period: 5, group: 5, esel: "*N*io*b* nach *N*io*b*e, der Tochter des Tantalos — im Periodensystem steht es direkt über Papa Tantal." },
  { z: 42, symbol: "Mo", name: "Molybdenum", nameDe: "Molybdän", mass: "95.95", category: "transition", period: 5, group: 6, esel: "*Mo*lybdän von *mó*lybdos, Blei — sein Erz wurde ewig mit Bleiglanz verwechselt." },
  { z: 43, symbol: "Tc", name: "Technetium", nameDe: "Technetium", mass: "(98)", category: "transition", period: 5, group: 7, esel: "*T*e*c*hnetium von *t*é*c*hnē, Kunst/Handwerk — das erste künstlich erzeugte Element: Chemie aus dem Teilchenbeschleuniger." },
  { z: 44, symbol: "Ru", name: "Ruthenium", nameDe: "Ruthenium", mass: "101.07", category: "transition", period: 5, group: 8, esel: "*Ru*thenium nach *Ru*thenia, dem lateinischen Namen für Russland — entdeckt in Kasan." },
  { z: 45, symbol: "Rh", name: "Rhodium", nameDe: "Rhodium", mass: "102.906", category: "transition", period: 5, group: 9, esel: "*Rh*odium von *rh*ódon, die Rose — rosarote Salze; heute glänzt es im Autokatalysator." },
  { z: 46, symbol: "Pd", name: "Palladium", nameDe: "Palladium", mass: "106.42", category: "transition", period: 5, group: 10, esel: "*P*alla*d*ium nach dem Asteroiden *P*allas — Element und Asteroid wurden fast gleichzeitig entdeckt." },
  { z: 47, symbol: "Ag", name: "Silver", nameDe: "Silber", mass: "107.868", category: "transition", period: 5, group: 11, esel: "Silber = *A*r*g*entum — denk an *A*r*g*entinien, das nach dem Silber seiner Flüsse benannte Land." },
  { z: 48, symbol: "Cd", name: "Cadmium", nameDe: "Cadmium", mass: "112.414", category: "transition", period: 5, group: 12, esel: "*C*a*d*mium nach *K*a*d*mos, dem Gründer Thebens — es versteckte sich im Zinkerz namens *cadmea* (Galmei)." },
  { z: 49, symbol: "In", name: "Indium", nameDe: "Indium", mass: "114.818", category: "post-transition", period: 5, group: 13, esel: "*In*dium nach seiner *in*digoblauen Spektrallinie — nicht nach Indien! Dein Touchscreen leitet damit." },
  { z: 50, symbol: "Sn", name: "Tin", nameDe: "Zinn", mass: "118.710", category: "post-transition", period: 5, group: 14, esel: "Zinn = *S*ta*nn*um — wie *S*ta*nn*iol, das alte Wort für Zinnfolie um die Schokolade." },
  { z: 51, symbol: "Sb", name: "Antimony", nameDe: "Antimon", mass: "121.760", category: "metalloid", period: 5, group: 15, esel: "Antimon = *S*ti*b*ium — der antike Lidschatten: Schon Kleopatra schminkte sich mit Stibium-Pulver." },
  { z: 52, symbol: "Te", name: "Tellurium", nameDe: "Tellur", mass: "127.60", category: "metalloid", period: 5, group: 16, esel: "*Te*llur von *te*llus, die Erde — der große Bruder des Selens (Mond): Erde und Mond stehen im PSE untereinander." },
  { z: 53, symbol: "I", name: "Iodine", nameDe: "Iod", mass: "126.904", category: "halogen", period: 5, group: 17, esel: "*I*od von *i*oeidḗs, veilchenfarben — erhitzt steigt es als v*i*olette Dampfwolke auf." },
  { z: 54, symbol: "Xe", name: "Xenon", nameDe: "Xenon", mass: "131.293", category: "noble", period: 5, group: 18, esel: "*Xe*non, ‚das Fremde' — der *xe*nophobe Einzelgänger unter den Gasen, der trotzdem in *Xe*non-Scheinwerfern leuchtet." },
  { z: 55, symbol: "Cs", name: "Caesium", nameDe: "Caesium", mass: "132.905", category: "alkali", period: 6, group: 1, esel: "*C*ae*s*ium von *caes*ius, himmelblau — nach seinen blauen Spektrallinien; sein Herzschlag taktet jede Atomuhr." },
  { z: 56, symbol: "Ba", name: "Barium", nameDe: "Barium", mass: "137.327", category: "alkaline", period: 6, group: 2, esel: "*Ba*rium von *ba*rýs, schwer — gefunden im ‚Schwerspat', und beim Röntgen schluckst du seinen *Ba*rium-Brei." },
  { z: 57, symbol: "La", name: "Lanthanum", nameDe: "Lanthan", mass: "138.905", category: "lanthanide", period: 6, group: null, esel: "*La*nthan von *la*nthánein, ‚verborgen sein' — es versteckte sich jahrelang unentdeckt im Ceriterz." },
  { z: 58, symbol: "Ce", name: "Cerium", nameDe: "Cer", mass: "140.116", category: "lanthanide", period: 6, group: null, esel: "*Ce*r nach *Ce*res, dem gerade entdeckten Zwergplaneten — der ‚Feuerstein' im Feuerzeug ist Cer-Legierung." },
  { z: 59, symbol: "Pr", name: "Praseodymium", nameDe: "Praseodym", mass: "140.908", category: "lanthanide", period: 6, group: null, esel: "*Pr*aseodym, der ‚lauchgrüne Zwilling' (*prásios* = lauchgrün) — seine Salze sind grün wie Lauch." },
  { z: 60, symbol: "Nd", name: "Neodymium", nameDe: "Neodym", mass: "144.242", category: "lanthanide", period: 6, group: null, esel: "*N*eo*d*ym, der ‚neue Zwilling' — deine stärksten Magnete sind *N*eo*d*ym-Magnete." },
  { z: 61, symbol: "Pm", name: "Promethium", nameDe: "Promethium", mass: "(145)", category: "lanthanide", period: 6, group: null, esel: "*P*ro*m*ethium nach *P*ro*m*etheus, der das Feuer stahl — radioaktiv wie geraubtes Götterfeuer." },
  { z: 62, symbol: "Sm", name: "Samarium", nameDe: "Samarium", mass: "150.36", category: "lanthanide", period: 6, group: null, esel: "*S*a*m*arium nach Bergrat *Sam*arski — das erste Element, das je nach einer Person benannt wurde." },
  { z: 63, symbol: "Eu", name: "Europium", nameDe: "Europium", mass: "151.964", category: "lanthanide", period: 6, group: null, esel: "*Eu*ropium nach *Eu*ropa — es leuchtete rot im Röhrenfernseher und leuchtet heute als Fälschungsschutz im *Eu*ro-Schein." },
  { z: 64, symbol: "Gd", name: "Gadolinium", nameDe: "Gadolinium", mass: "157.25", category: "lanthanide", period: 6, group: null, esel: "*G*a*d*olinium nach Johan *G*a*d*olin, dem Ytterby-Pionier — das Kontrastmittel im MRT." },
  { z: 65, symbol: "Tb", name: "Terbium", nameDe: "Terbium", mass: "158.925", category: "lanthanide", period: 6, group: null, esel: "*T*er*b*ium — Ytterby-Kind Nr. 2: nimm Yt*terb*y und streich das ‚Yt' vorne weg." },
  { z: 66, symbol: "Dy", name: "Dysprosium", nameDe: "Dysprosium", mass: "162.500", category: "lanthanide", period: 6, group: null, esel: "*Dy*sprosium von *dy*sprósitos, ‚schwer beizukommen' — es ließ sich jahrzehntelang nicht rein isolieren." },
  { z: 67, symbol: "Ho", name: "Holmium", nameDe: "Holmium", mass: "164.930", category: "lanthanide", period: 6, group: null, esel: "*Ho*lmium nach Stock*ho*lm — der Heimatstadt seiner Entdecker." },
  { z: 68, symbol: "Er", name: "Erbium", nameDe: "Erbium", mass: "167.259", category: "lanthanide", period: 6, group: null, esel: "*Er*bium — Ytterby-Kind Nr. 3: die Mitte von Ytt*er*by. Es verstärkt das Licht in Glasfaserkabeln." },
  { z: 69, symbol: "Tm", name: "Thulium", nameDe: "Thulium", mass: "168.934", category: "lanthanide", period: 6, group: null, esel: "*T*huliu*m* nach *T*hule, dem sagenhaften Land im hohen Norden — das seltenste stabile Seltenerdmetall." },
  { z: 70, symbol: "Yb", name: "Ytterbium", nameDe: "Ytterbium", mass: "173.045", category: "lanthanide", period: 6, group: null, esel: "*Y*tter*b*ium — Ytterby-Kind Nr. 4: diesmal blieb fast der ganze Dorfname dran." },
  { z: 71, symbol: "Lu", name: "Lutetium", nameDe: "Lutetium", mass: "174.967", category: "lanthanide", period: 6, group: null, esel: "*Lu*tetium nach *Lu*tetia, dem römischen Namen von Paris — das letzte, härteste Lanthanoid." },
  { z: 72, symbol: "Hf", name: "Hafnium", nameDe: "Hafnium", mass: "178.486", category: "transition", period: 6, group: 4, esel: "*H*a*f*nium nach *Haf*nia, dem lateinischen Kopenhagen — entdeckt in Niels Bohrs Institut." },
  { z: 73, symbol: "Ta", name: "Tantalum", nameDe: "Tantal", mass: "180.948", category: "transition", period: 6, group: 5, esel: "*Ta*ntal nach *Ta*ntalos, der ewig dürstet — das Metall ‚trinkt' keine Säure, und im Handy sitzt es als Kondensator." },
  { z: 74, symbol: "W", name: "Tungsten", nameDe: "Wolfram", mass: "183.84", category: "transition", period: 6, group: 6, esel: "*W*olfram — ein deutsches Wort im Weltvokabular! Englisch heißt es Tungsten, das Symbol bleibt trotzdem *W*: der Glühdraht der alten Glühbirne." },
  { z: 75, symbol: "Re", name: "Rhenium", nameDe: "Rhenium", mass: "186.207", category: "transition", period: 6, group: 7, esel: "*R*h*e*nium nach dem *R*h*e*in — eines der letzten stabilen Elemente, die je entdeckt wurden (1925, in Berlin)." },
  { z: 76, symbol: "Os", name: "Osmium", nameDe: "Osmium", mass: "190.23", category: "transition", period: 6, group: 8, esel: "*Os*mium von *os*mḗ, der Geruch — sein Oxid stinkt beißend, und kein Metall ist dichter." },
  { z: 77, symbol: "Ir", name: "Iridium", nameDe: "Iridium", mass: "192.217", category: "transition", period: 6, group: 9, esel: "*Ir*idium nach *Ir*is, der Regenbogengöttin — und eine dünne Iridium-Staubschicht im Gestein verrät den Dino-Killer-Asteroiden." },
  { z: 78, symbol: "Pt", name: "Platinum", nameDe: "Platin", mass: "195.084", category: "transition", period: 6, group: 10, esel: "*P*la*t*in von spanisch *plata*, Silber — ‚*plat*ina', Silberchen, spotteten die Konquistadoren. Heute ist es teurer als Gold." },
  { z: 79, symbol: "Au", name: "Gold", nameDe: "Gold", mass: "196.967", category: "transition", period: 6, group: 11, esel: "Gold = *Au*rum, verwandt mit *Au*rora, der Morgenröte — Merkhilfe: ‚*Au*! Mein Goldzahn!'" },
  { z: 80, symbol: "Hg", name: "Mercury", nameDe: "Quecksilber", mass: "200.592", category: "transition", period: 6, group: 12, esel: "Quecksilber = *H*ydrar*g*yrum, ‚Wassersilber' (*hydro* + *argyros*) — das einzige Metall, das bei Raumtemperatur flüssig ist." },
  { z: 81, symbol: "Tl", name: "Thallium", nameDe: "Thallium", mass: "204.38", category: "post-transition", period: 6, group: 13, esel: "*T*ha*ll*ium von *tha*llós, der grüne Spross — entdeckt an einer grasgrünen Spektrallinie; berüchtigt als Gift." },
  { z: 82, symbol: "Pb", name: "Lead", nameDe: "Blei", mass: "207.2", category: "post-transition", period: 6, group: 14, esel: "Blei = *P*lum*b*um — daher der englische ‚*P*lum*b*er': Klempner verlegten einst Bleirohre." },
  { z: 83, symbol: "Bi", name: "Bismuth", nameDe: "Bismut", mass: "208.980", category: "post-transition", period: 6, group: 15, esel: "*Bi*smut wächst zu *bi*zarren, regenbogenbunten Treppenkristallen — das schwerste (praktisch) stabile Element." },
  { z: 84, symbol: "Po", name: "Polonium", nameDe: "Polonium", mass: "(209)", category: "post-transition", period: 6, group: 16, esel: "*Po*lonium nach *Po*len — Marie Curie taufte ihr erstes Element auf ihre Heimat." },
  { z: 85, symbol: "At", name: "Astatine", nameDe: "Astat", mass: "(210)", category: "halogen", period: 6, group: 17, esel: "*A*sta*t* von *a*statos, ‚unbeständig' — das seltenste natürliche Element: Weltweit existiert davon nur etwa ein Gramm." },
  { z: 86, symbol: "Rn", name: "Radon", nameDe: "Radon", mass: "(222)", category: "noble", period: 6, group: 18, esel: "*R*ado*n* — des *R*adiums flüchtiger Sohn: das radioaktive Edelgas, das aus Granitkellern kriecht." },
  { z: 87, symbol: "Fr", name: "Francium", nameDe: "Francium", mass: "(223)", category: "alkali", period: 7, group: 1, esel: "*Fr*ancium nach *Fr*ankreich — entdeckt von Marguerite Perey, Marie Curies Schülerin." },
  { z: 88, symbol: "Ra", name: "Radium", nameDe: "Radium", mass: "(226)", category: "alkaline", period: 7, group: 2, esel: "*Ra*dium von *ra*dius, der Strahl — die Curies kochten es aus Tonnen Pechblende; es glimmt von selbst." },
  { z: 89, symbol: "Ac", name: "Actinium", nameDe: "Actinium", mass: "(227)", category: "actinide", period: 7, group: null, esel: "*Ac*tinium von *ak*tís, der Strahl — Namenspate der ganzen *Ac*tinoiden-Familie." },
  { z: 90, symbol: "Th", name: "Thorium", nameDe: "Thorium", mass: "232.038", category: "actinide", period: 7, group: null, esel: "*Th*orium nach *Th*or, dem Donnergott — Kernbrennstoff mit Hammer im Namen." },
  { z: 91, symbol: "Pa", name: "Protactinium", nameDe: "Protactinium", mass: "231.036", category: "actinide", period: 7, group: null, esel: "*P*rot*a*ctinium, das ‚Ur-Actinium' — beim Zerfall wird es selbst zu Actinium." },
  { z: 92, symbol: "U", name: "Uranium", nameDe: "Uran", mass: "238.029", category: "actinide", period: 7, group: null, esel: "*U*ran nach dem Planeten *U*ranus — benannt acht Jahre nach dessen Entdeckung." },
  { z: 93, symbol: "Np", name: "Neptunium", nameDe: "Neptunium", mass: "(237)", category: "actinide", period: 7, group: null, esel: "*N*e*p*tunium nach Ne*p*tun — im Sonnensystem wie im Periodensystem gleich hinter Uran(us)." },
  { z: 94, symbol: "Pu", name: "Plutonium", nameDe: "Plutonium", mass: "(244)", category: "actinide", period: 7, group: null, esel: "*P*l*u*tonium nach *P*l*u*to — die Planetenreihe Uranus–Neptun–Pluto läuft im Periodensystem einfach weiter." },
  { z: 95, symbol: "Am", name: "Americium", nameDe: "Americium", mass: "(243)", category: "actinide", period: 7, group: null, esel: "*Am*ericium nach *Am*erika — analog zum Europium eine Zeile höher; es wacht in deinem Rauchmelder." },
  { z: 96, symbol: "Cm", name: "Curium", nameDe: "Curium", mass: "(247)", category: "actinide", period: 7, group: null, esel: "*C*uriu*m* nach *M*arie und Pierre *C*urie — ein Element für das Ehepaar der Radioaktivität." },
  { z: 97, symbol: "Bk", name: "Berkelium", nameDe: "Berkelium", mass: "(247)", category: "actinide", period: 7, group: null, esel: "*B*er*k*elium nach *B*er*k*eley — der kalifornischen Elementfabrik der 1950er." },
  { z: 98, symbol: "Cf", name: "Californium", nameDe: "Californium", mass: "(251)", category: "actinide", period: 7, group: null, esel: "*C*ali*f*ornium nach *C*ali*f*ornien — Nachbar von Berkelium, im Labor wie auf der Landkarte." },
  { z: 99, symbol: "Es", name: "Einsteinium", nameDe: "Einsteinium", mass: "(252)", category: "actinide", period: 7, group: null, esel: "*E*in*s*teinium nach Albert *E*in*s*tein — aufgespürt im Fallout des ersten Wasserstoffbomben-Tests." },
  { z: 100, symbol: "Fm", name: "Fermium", nameDe: "Fermium", mass: "(257)", category: "actinide", period: 7, group: null, esel: "*F*er*m*ium nach Enrico *F*er*m*i — dem Baumeister des ersten Kernreaktors." },
  { z: 101, symbol: "Md", name: "Mendelevium", nameDe: "Mendelevium", mass: "(258)", category: "actinide", period: 7, group: null, esel: "*M*en*d*elevium nach *M*en*d*elejew — dem Vater des Periodensystems höchstpersönlich." },
  { z: 102, symbol: "No", name: "Nobelium", nameDe: "Nobelium", mass: "(259)", category: "actinide", period: 7, group: null, esel: "*No*belium nach Alfred *No*bel — Dynamit-Erfinder und Preisstifter." },
  { z: 103, symbol: "Lr", name: "Lawrencium", nameDe: "Lawrencium", mass: "(266)", category: "actinide", period: 7, group: null, esel: "*L*aw*r*encium nach Ernest *L*aw*r*ence — dem Erfinder des Zyklotrons, das solche Elemente überhaupt erst erzeugt." },
  { z: 104, symbol: "Rf", name: "Rutherfordium", nameDe: "Rutherfordium", mass: "(267)", category: "transition", period: 7, group: 4, esel: "*R*uther*f*ordium nach *R*uther*f*ord — dem Mann, der den Atomkern entdeckte." },
  { z: 105, symbol: "Db", name: "Dubnium", nameDe: "Dubnium", mass: "(268)", category: "transition", period: 7, group: 5, esel: "*D*u*b*nium nach *D*u*b*na — dem russischen Gegenstück zur Elementküche in Berkeley." },
  { z: 106, symbol: "Sg", name: "Seaborgium", nameDe: "Seaborgium", mass: "(269)", category: "transition", period: 7, group: 6, esel: "*S*eabor*g*ium nach Glenn *S*eabor*g* — benannt zu Lebzeiten: Man hätte ihm Post ‚an sein Element' schicken können." },
  { z: 107, symbol: "Bh", name: "Bohrium", nameDe: "Bohrium", mass: "(270)", category: "transition", period: 7, group: 7, esel: "*B*o*h*rium nach Niels *B*o*h*r — dem Vater des Schalenmodells aus Lektion 0.2." },
  { z: 108, symbol: "Hs", name: "Hassium", nameDe: "Hassium", mass: "(277)", category: "transition", period: 7, group: 8, esel: "*H*a*s*sium nach He*ss*en (lateinisch *Hass*ia) — erzeugt bei der GSI in Darmstadt." },
  { z: 109, symbol: "Mt", name: "Meitnerium", nameDe: "Meitnerium", mass: "(278)", category: "unknown", period: 7, group: 9, esel: "*M*ei*t*nerium nach Lise *M*ei*t*ner — der Erklärerin der Kernspaltung, der der Nobelpreis verwehrt blieb. Das Element nicht." },
  { z: 110, symbol: "Ds", name: "Darmstadtium", nameDe: "Darmstadtium", mass: "(281)", category: "unknown", period: 7, group: 10, esel: "*D*arm*s*tadtium nach *D*arm*s*tadt — made in Germany, Atom für Atom." },
  { z: 111, symbol: "Rg", name: "Roentgenium", nameDe: "Roentgenium", mass: "(282)", category: "unknown", period: 7, group: 11, esel: "*R*oent*g*enium nach Wilhelm *R*önt*g*en — dem Entdecker der X-Strahlen, die bei uns seinen Namen tragen." },
  { z: 112, symbol: "Cn", name: "Copernicium", nameDe: "Copernicium", mass: "(285)", category: "unknown", period: 7, group: 12, esel: "*C*oper*n*icium nach *C*oper*n*icus (Kopernikus) — der die Sonne ins Zentrum rückte." },
  { z: 113, symbol: "Nh", name: "Nihonium", nameDe: "Nihonium", mass: "(286)", category: "unknown", period: 7, group: 13, esel: "*N*i*h*onium nach *N*i*h*on, Japan — das erste in Asien erzeugte Element." },
  { z: 114, symbol: "Fl", name: "Flerovium", nameDe: "Flerovium", mass: "(289)", category: "unknown", period: 7, group: 14, esel: "*Fl*erovium nach Georgi *Fl*jorow — dem Gründer des Dubna-Labors." },
  { z: 115, symbol: "Mc", name: "Moscovium", nameDe: "Moscovium", mass: "(290)", category: "unknown", period: 7, group: 15, esel: "*M*os*c*ovium nach *M*oskau (*Mosc*ow) — der Oblast, in der Dubna liegt." },
  { z: 116, symbol: "Lv", name: "Livermorium", nameDe: "Livermorium", mass: "(293)", category: "unknown", period: 7, group: 16, esel: "*L*i*v*ermorium nach dem *L*i*v*ermore-Labor in Kalifornien — Dubnas amerikanischem Partner." },
  { z: 117, symbol: "Ts", name: "Tennessine", nameDe: "Tenness", mass: "(294)", category: "unknown", period: 7, group: 17, esel: "*T*enne*ss* nach *T*enne*ss*ee — dem Bundesstaat des Oak-Ridge-Labors, das das Zielmaterial lieferte." },
  { z: 118, symbol: "Og", name: "Oganesson", nameDe: "Oganesson", mass: "(294)", category: "unknown", period: 7, group: 18, esel: "*Og*anesson nach Juri *Og*anessjan — erst der zweite Mensch, der sein eigenes Element im Periodensystem stehen sah." },
];

export function elementBySymbol(symbol: string): ChemElement | undefined {
  return ELEMENTS.find((e) => e.symbol === symbol);
}

/** CSS custom-property name for a category's color (defined in globals.css). */
export function categoryVar(cat: ElementCategory): string {
  return `var(--cat-${cat})`;
}
