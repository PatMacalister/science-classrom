/**
 * Exact-match EN→DE dictionary for the interactive labs (canvas labels, meter
 * titles, control labels, in-lab buttons) — the same mechanism Spark uses.
 *
 * The canvas code is not React, so it can't read the language context;
 * instead the LanguageProvider calls setLabDictionary() on every language
 * switch, and the drawing primitives translate through tl(). Keys must match
 * the source strings character-exactly; dynamic strings (template literals
 * with numbers) fall through untranslated by design — they are mostly
 * numbers and chemical formulas anyway.
 */

export const LAB_DE: Record<string, string> = {
  /* ---- unit 0: atom builder ---- */
  "Protons (Z)": "Protonen (Z)",
  "Neutrons": "Neutronen",
  "Electrons": "Elektronen",
  "element (from protons)": "Element (aus Protonen)",
  "mass number A": "Massenzahl A",
  "net charge": "Nettoladung",
  "neutral atom": "neutrales Atom",
  "most common isotope": "häufigstes Isotop",
  "protons +, neutrons gray,": "Protonen +, Neutronen grau,",
  "electrons cyan": "Elektronen türkis",
  /* ---- unit 0: shell filler ---- */
  "Element": "Element",
  "Electrons placed": "Gesetzte Elektronen",
  "electron configuration": "Elektronenkonfiguration",
  "outer (valence) electrons": "Außen-(Valenz-)Elektronen",
  "verdict": "Urteil",
  "full shell — noble & lazy": "volle Schale — edel & träge",
  "shares instead": "teilt stattdessen",
  /* ---- unit 1: ionic ---- */
  "Pair": "Paar",
  "Reaction": "Reaktion",
  "Transfer one electron →": "Ein Elektron übertragen →",
  "Reset": "Zurücksetzen",
  "opposite charges attract": "ungleiche Ladungen ziehen sich an",
  "electrons transferred": "übertragene Elektronen",
  "result": "Ergebnis",
  "still neutral atoms": "noch neutrale Atome",
  "NaCl — table salt": "NaCl — Kochsalz",
  "MgO — magnesia": "MgO — Magnesia",
  "both outer shells are now full — the ions lock into a crystal lattice":
    "beide Außenschalen sind jetzt voll — die Ionen rasten ins Kristallgitter ein",
  /* ---- unit 1: covalent ---- */
  "Molecule": "Molekül",
  "shared pairs": "bindende Paare",
  "octet check": "Oktett-Check",
  "every atom satisfied ✓": "alle Atome zufrieden ✓",
  "someone is short!": "jemand geht leer aus!",
  "one shared pair — each H 'sees' 2 electrons": "ein gemeinsames Paar — jedes H ‚sieht' 2 Elektronen",
  "a double bond: two shared pairs": "eine Doppelbindung: zwei gemeinsame Paare",
  "a triple bond — one of nature's toughest": "eine Dreifachbindung — eine der stärksten der Natur",
  "bent, not straight — the lone pairs push the H atoms down": "gewinkelt, nicht gerade — die freien Paare drücken die H-Atome weg",
  "two double bonds, perfectly linear": "zwei Doppelbindungen, perfekt linear",
  "carbon's four hands — the root of all organic chemistry": "Kohlenstoffs vier Hände — die Wurzel aller organischen Chemie",
  "cyan = shared pairs · violet = lone electrons": "türkis = bindende Paare · violett = freie Elektronen",
  /* ---- unit 1: bond classifier ---- */
  "Atom A": "Atom A",
  "Atom B": "Atom B",
  "a shared 'sea' of electrons drifts between the metal cations": "ein gemeinsames Elektronen-‚Meer' treibt zwischen den Metall-Kationen",
  "electronegativities": "Elektronegativitäten",
  "bond type": "Bindungstyp",
  "metallic": "metallisch",
  "ionic": "ionisch",
  "polar covalent": "polar kovalent",
  "nonpolar covalent": "unpolar kovalent",
  "shared — but not fairly: the cloud sags toward the stronger atom": "geteilt — aber nicht fair: die Wolke hängt zum stärkeren Atom",
  "an even tug-of-war: the cloud stays centred": "ein ausgeglichenes Tauziehen: die Wolke bleibt mittig",
  "rips the electron away:": "reißt das Elektron weg:",
  "Δχ (electronegativity difference)": "Δχ (Elektronegativitätsdifferenz)",
  /* ---- element names used in dropdowns (composed labels translate these parts) ---- */
  "Hydrogen": "Wasserstoff",
  "Carbon": "Kohlenstoff",
  "Oxygen": "Sauerstoff",
  "Fluorine": "Fluor",
  "Sodium": "Natrium",
  "Magnesium": "Magnesium",
  "Aluminium": "Aluminium",
  "Sulfur": "Schwefel",
  "Chlorine": "Chlor",
  "Potassium": "Kalium",
  "Calcium": "Calcium",
  "Zinc": "Zink",
  "Copper": "Kupfer",
  "Nickel": "Nickel",
  "Silver": "Silber",
  "Bromine": "Brom",
  "Iodine": "Iod",
  /* ---- unit 2: balancing ---- */
  "left": "links",
  "right": "rechts",
  "⚖ balanced — every atom accounted for. Lavoisier approves.": "⚖ ausgeglichen — jedes Atom verbucht. Lavoisier nickt.",
  "not balanced:": "nicht ausgeglichen:",
  /* ---- unit 2: mole ---- */
  "Substance": "Substanz",
  "Mass on the scale": "Masse auf der Waage",
  "Table salt": "Kochsalz",
  "Glucose": "Glucose",
  "Carbon dioxide": "Kohlendioxid",
  "mass  ÷ molar mass  =  moles": "Masse ÷ molare Masse = Stoffmenge",
  "moles × Avogadro = particles": "Mol × Avogadro = Teilchen",
  "particles": "Teilchen",
  "molar mass M": "molare Masse M",
  "amount n": "Stoffmenge n",
  "18 g of water ≈ one big gulp": "18 g Wasser ≈ ein großer Schluck",
  "58 g of salt ≈ a small shaker": "58 g Salz ≈ ein kleiner Streuer",
  "180 g of glucose ≈ a full cup": "180 g Glucose ≈ eine volle Tasse",
  "44 g of CO₂ ≈ a party balloon's worth": "44 g CO₂ ≈ ein Partyballon voll",
  "56 g of iron ≈ a hefty bolt": "56 g Eisen ≈ eine kräftige Schraube",
  /* ---- unit 2: limiting reagent ---- */
  "Hydrogen H₂": "Wasserstoff H₂",
  "Oxygen O₂": "Sauerstoff O₂",
  "limiting reagent": "limitierendes Edukt",
  "water produced": "erzeugtes Wasser",
  "left over": "übrig",
  "perfect ratio": "perfektes Verhältnis",
  "nothing — clean plate": "nichts — leerer Teller",
  "start": "Start",
  "end": "Ende",
  /* ---- unit 3: states ---- */
  "Temperature": "Temperatur",
  "Water": "Wasser",
  "Nitrogen": "Stickstoff",
  "Iron": "Eisen",
  "state": "Zustand",
  "SOLID": "FEST",
  "LIQUID": "FLÜSSIG",
  "GAS": "GAS",
  "particle behaviour": "Teilchenverhalten",
  "vibrating in a lattice": "zittert im Gitter",
  "sliding, still touching": "gleitet, bleibt in Kontakt",
  "flying free": "fliegt frei",
  /* ---- unit 3: gas laws ---- */
  "Amount n": "Stoffmenge n",
  "Temperature T": "Temperatur T",
  "Volume V (piston)": "Volumen V (Kolben)",
  "particles shown": "gezeigte Teilchen",
  "≈ 101 kPa = 1 atm": "≈ 101 kPa = 1 atm",
  "watch the wall-drumming: pressure IS the sum of particle impacts": "beachte das Wandtrommeln: Druck IST die Summe der Teilchenstöße",
  /* ---- unit 3: dissolving ---- */
  "Solute": "Gelöster Stoff",
  "Table salt (NaCl)": "Kochsalz (NaCl)",
  "Saltpetre (KNO₃)": "Salpeter (KNO₃)",
  "Amount added": "Zugegebene Menge",
  "Water temperature": "Wassertemperatur",
  "100 mL water": "100 mL Wasser",
  "undissolved crystals": "ungelöste Kristalle",
  "dissolved": "gelöst",
  "on the bottom": "am Boden",
  "solution is": "Lösung ist",
  "SATURATED": "GESÄTTIGT",
  "unsaturated": "ungesättigt",
  "temperature →": "Temperatur →",
  "solubility (g / 100 mL)": "Löslichkeit (g / 100 mL)",
  /* ---- unit 4: pH ---- */
  "Dilute with water": "Mit Wasser verdünnen",
  "undiluted": "unverdünnt",
  "Gastric acid": "Magensäure",
  "Lemon juice": "Zitronensaft",
  "Cola": "Cola",
  "Vinegar": "Essig",
  "Coffee": "Kaffee",
  "Milk": "Milch",
  "Pure water": "Reines Wasser",
  "Blood": "Blut",
  "Baking-soda water": "Natronwasser",
  "Soap water": "Seifenwasser",
  "Ammonia cleaner": "Salmiakreiniger",
  "Drain cleaner": "Rohrreiniger",
  "acidic ←": "sauer ←",
  "neutral": "neutral",
  "→ basic": "→ basisch",
  "every pH step = ×10 in H⁺ concentration": "jede pH-Stufe = ×10 bei der H⁺-Konzentration",
  "exactly neutral": "exakt neutral",
  "pH": "pH",
  "character": "Charakter",
  "acid": "Säure",
  "base": "Base",
  /* ---- unit 4: titration ---- */
  "Open the burette": "Bürette öffnen",
  "0.1 M NaOH": "0,1 M NaOH",
  "25 mL 0.1 M HCl + phenolphthalein": "25 mL 0,1 M HCl + Phenolphthalein",
  "equivalence: 25 mL": "Äquivalenz: 25 mL",
  "mL NaOH added →": "mL NaOH zugegeben →",
  "pH now": "pH jetzt",
  "NaOH added": "NaOH zugegeben",
  "indicator": "Indikator",
  "PINK — endpoint passed": "PINK — Endpunkt überschritten",
  "colorless": "farblos",
  /* ---- unit 4: cabbage ---- */
  "pH of your own mix": "pH deiner eigenen Mischung",
  "seven kitchen liquids + red-cabbage juice": "sieben Küchenflüssigkeiten + Rotkohlsaft",
  "lemon juice": "Zitronensaft",
  "vinegar": "Essig",
  "sparkling water": "Sprudelwasser",
  "tap water": "Leitungswasser",
  "baking soda": "Natron",
  "soap water": "Seifenwasser",
  "washing soda": "Waschsoda",
  "your own mix:": "deine eigene Mischung:",
  "red = acid · purple = neutral · green/yellow = base": "rot = Säure · lila = neutral · grün/gelb = Base",
  /* ---- unit 5: energy landscape ---- */
  "ΔH (products − reactants)": "ΔH (Produkte − Edukte)",
  "Activation energy Ea": "Aktivierungsenergie Ea",
  "Catalyst": "Katalysator",
  "none": "keiner",
  "add catalyst": "Katalysator zugeben",
  "Collision energy": "Stoßenergie",
  "Attempt": "Versuch",
  "Launch the collision →": "Stoß auslösen →",
  "reactants": "Edukte",
  "products": "Produkte",
  "without catalyst": "ohne Katalysator",
  "reaction type": "Reaktionstyp",
  "exothermic (releases)": "exotherm (setzt frei)",
  "endothermic (absorbs)": "endotherm (nimmt auf)",
  "thermoneutral": "thermoneutral",
  "hill to climb": "zu erklimmender Hügel",
  "last attempt": "letzter Versuch",
  "made it — products!": "geschafft — Produkte!",
  "rolled back — no reaction": "zurückgerollt — keine Reaktion",
  "…rolling…": "…rollt…",
  /* ---- unit 5: rates ---- */
  "Concentration (pairs)": "Konzentration (Paare)",
  "reaction rate": "Reaktionsgeschwindigkeit",
  "A = red · B = cyan": "A = rot · B = türkis",
  "AB product = green": "Produkt AB = grün",
  "slow collisions bounce,": "langsame Stöße prallen ab,",
  "fast ones react": "schnelle reagieren",
  /* ---- unit 5: equilibrium ---- */
  "Stress the system": "System stören",
  "+ add 20 A": "+ 20 A zugeben",
  "+ add 20 B": "+ 20 B zugeben",
  "− remove 20 B": "− 20 B entnehmen",
  "A ⇌ B  (forward exothermic)": "A ⇌ B  (Hinreaktion exotherm)",
  "≈ at equilibrium (Q ≈ K)": "≈ im Gleichgewicht (Q ≈ K)",
  "shifting → (making more B)": "verschiebt sich → (mehr B entsteht)",
  "shifting ← (making more A)": "verschiebt sich ← (mehr A entsteht)",
  "individual particles never stop": "einzelne Teilchen ruhen nie",
  "disturb the system": "stör das System",
  "use the buttons below": "nutze die Knöpfe unten",
  "watch it fight back": "sieh zu, wie es sich wehrt",
  "Le Chatelier in action": "Le Chatelier in Aktion",
  /* ---- unit 6: redox ---- */
  "Experiment": "Experiment",
  "Zn strip in CuSO₄": "Zn-Streifen in CuSO₄",
  "Cu strip in ZnSO₄": "Cu-Streifen in ZnSO₄",
  "Time": "Zeit",
  "run": "läuft",
  "pause": "Pause",
  "Fresh beaker": "Frisches Becherglas",
  "CuSO₄ solution (blue = Cu²⁺)": "CuSO₄-Lösung (blau = Cu²⁺)",
  "ZnSO₄ solution (colorless)": "ZnSO₄-Lösung (farblos)",
  "Zn strip": "Zn-Streifen",
  "Cu strip": "Cu-Streifen",
  "Cu deposit": "Cu-Überzug",
  "Zn dissolving as Zn²⁺ →": "Zn löst sich als Zn²⁺ →",
  "Zn is oxidized (loses 2 e⁻)": "Zn wird oxidiert (verliert 2 e⁻)",
  "Cu²⁺ is reduced (gains 2 e⁻)": "Cu²⁺ wird reduziert (gewinnt 2 e⁻)",
  "zinc is the LESS noble metal:": "Zink ist das UNEDLERE Metall:",
  "it gives electrons away first": "es gibt seine Elektronen zuerst her",
  "Cu + Zn²⁺ → no reaction": "Cu + Zn²⁺ → keine Reaktion",
  "copper is MORE noble than zinc —": "Kupfer ist EDLER als Zink —",
  "it will not hand electrons to Zn²⁺": "es reicht Zn²⁺ keine Elektronen",
  "redox has a one-way hierarchy:": "Redox hat eine Einbahn-Hierarchie:",
  "the activity series": "die Spannungsreihe",
  /* ---- unit 6: galvanic ---- */
  "Anode metal (−)": "Anodenmetall (−)",
  "Cathode metal (+)": "Kathodenmetall (+)",
  "salt bridge": "Salzbrücke",
  "cell voltage E°(cell)": "Zellspannung E°(Zelle)",
  "negative voltage — swap the electrodes: electrons only flow downhill":
    "negative Spannung — tausche die Elektroden: Elektronen fließen nur bergab",
  "same metal twice — no difference, no push": "zweimal dasselbe Metall — kein Unterschied, kein Antrieb",
  "electrons take the wire — chemistry become current": "die Elektronen nehmen den Draht — Chemie wird zu Strom",
  /* ---- unit 6: electrolysis ---- */
  "Voltage": "Spannung",
  "Tubes": "Röhrchen",
  "Empty the tubes": "Röhrchen leeren",
  "water + a pinch of salt (to conduct)": "Wasser + eine Prise Salz (zur Leitfähigkeit)",
  "cathode −": "Kathode −",
  "anode +": "Anode +",
  "power supply": "Netzteil",
  "splitting water!": "Wasser wird gespalten!",
  "gas ratio H₂ : O₂": "Gasverhältnis H₂ : O₂",
  "why 2 : 1?": "warum 2 : 1?",
  "H₂O has 2 H per O": "H₂O hat 2 H pro O",
  /* ---- unit 6: lemon battery ---- */
  "Lemons in series": "Zitronen in Reihe",
  "total voltage": "Gesamtspannung",
  "current": "Strom",
  "glowing nicely!": "leuchtet ordentlich!",
  "a dim but honest glow": "ein schwaches, aber ehrliches Glimmen",
  "red LED (needs ≈ 1.9 V)": "rote LED (braucht ≈ 1,9 V)",
  "each lemon ≈ 0.9 V but with huge internal resistance — series stacking adds voltage, not muscle":
    "jede Zitrone ≈ 0,9 V, aber mit riesigem Innenwiderstand — Reihenschaltung addiert Spannung, nicht Muskeln",
};

let active: Record<string, string> | null = null;

/** Install (or clear) the dictionary consulted by tl(). */
/* ---- unit 1.4: shape & polarity ---- */
export const LAB_DE_SHAPES: Record<string, string> = {
  Molecule: "Molekül",
  "Lone pairs": "Freie Paare",
  Show: "Zeigen",
  Hide: "Ausblenden",
  Geometry: "Geometrie",
  "Bond angle": "Bindungswinkel",
  Overall: "Insgesamt",
  "electron groups": "Elektronengruppen",
  shape: "Form",
  polar: "polar",
  nonpolar: "unpolar",
  Methane: "Methan",
  Ammonia: "Ammoniak",
  Water: "Wasser",
  "Carbon dioxide": "Kohlenstoffdioxid",
  "Boron trifluoride": "Bortrifluorid",
  tetrahedral: "tetraedrisch",
  "trigonal pyramidal": "trigonal-pyramidal",
  bent: "gewinkelt",
  linear: "linear",
  "trigonal planar": "trigonal-planar",
  "net dipole": "Gesamtdipol",
  "pulls cancel - no net dipole": "die Züge heben sich auf — kein Gesamtdipol",
  "polar molecule": "polares Molekül",
  "nonpolar molecule": "unpolares Molekül",
  "Four identical bonds pointing to the corners of a tetrahedron - every pull cancels.":
    "Vier identische Bindungen zu den Ecken eines Tetraeders — jeder Zug hebt sich auf.",
  "The lone pair pushes the three bonds down into a pyramid - the pulls no longer cancel.":
    "Das freie Paar drückt die drei Bindungen zu einer Pyramide herunter — die Züge heben sich nicht mehr auf.",
  "Two lone pairs squeeze the bonds into a V. The dipoles add instead of cancelling - this is why water is water.":
    "Zwei freie Paare quetschen die Bindungen zu einem V. Die Dipole addieren sich, statt sich aufzuheben — deshalb ist Wasser Wasser.",
  "Both C=O bonds are strongly polar - but they point exactly opposite, so the molecule as a whole is not.":
    "Beide C=O-Bindungen sind stark polar — sie zeigen aber exakt entgegengesetzt, das Molekül als Ganzes also nicht.",
  "Three polar bonds at 120 degrees - perfectly balanced, so no net dipole despite fluorine's greed.":
    "Drei polare Bindungen bei 120 Grad — perfekt ausgeglichen, also kein Gesamtdipol trotz Fluors Gier.",
};

/* ---- unit 1.5: intermolecular forces ---- */
export const LAB_DE_IMF: Record<string, string> = {
  Substance: "Stoff",
  Temperature: "Temperatur",
  State: "Zustand",
  "Molar mass": "Molare Masse",
  "Boiling point": "Siedepunkt",
  "Held by": "Gehalten von",
  state: "Zustand",
  "boils at": "siedet bei",
  gas: "Gas",
  liquid: "flüssig",
  "gas - molecules fly free": "Gas — die Moleküle fliegen frei",
  "liquid - molecules cling": "flüssig — die Moleküle klammern",
  "boiling point": "Siedepunkt",
  "strongest force": "stärkste Kraft",
  "London dispersion only": "nur London-Dispersion",
  "dipole-dipole": "Dipol-Dipol",
  "hydrogen bonding (N-H)": "Wasserstoffbrücken (N-H)",
  "hydrogen bonding (O-H)": "Wasserstoffbrücken (O-H)",
  "Hydrogen sulfide": "Schwefelwasserstoff",
  "Nonpolar. Only fleeting, accidental dipoles hold it together.":
    "Unpolar. Nur flüchtige, zufällige Dipole halten es zusammen.",
  "Bent and polar, but sulfur is too big and mild for hydrogen bonds.":
    "Gewinkelt und polar, aber Schwefel ist zu groß und zu mild für Wasserstoffbrücken.",
  "One lone pair, three H - real hydrogen bonds, but only one acceptor.":
    "Ein freies Paar, drei H — echte Wasserstoffbrücken, aber nur ein Akzeptor.",
  "Two lone pairs and two H: every molecule can hold four neighbours.":
    "Zwei freie Paare und zwei H: Jedes Molekül kann vier Nachbarn halten.",
};

/* ---- unit 2.4: reaction sorter ---- */
export const LAB_DE_RXTYPES: Record<string, string> = {
  "Classify it": "Ordne zu",
  Next: "Weiter",
  "Next reaction →": "Nächste Reaktion →",
  Score: "Punkte",
  Card: "Karte",
  "This one": "Diese hier",
  correct: "richtig",
  missed: "verfehlt",
  Synthesis: "Synthese",
  Decomposition: "Analyse",
  "Single replacement": "Einfache Substitution",
  "Double replacement": "Doppelte Substitution",
  Combustion: "Verbrennung",
  "which pattern is this?": "welches Muster ist das?",
  "the five patterns": "die fünf Muster",
  "Two elements combine into one compound. Nothing comes apart.":
    "Zwei Elemente verbinden sich zu einer Verbindung. Nichts zerfällt.",
  "One compound splits into two elements - electrolysis does exactly this.":
    "Eine Verbindung zerfällt in zwei Elemente — genau das macht die Elektrolyse.",
  "Zinc kicks copper out of its compound and takes its place. One element swaps in, one drops out.":
    "Zink wirft Kupfer aus seiner Verbindung und nimmt dessen Platz ein. Ein Element rückt nach, eines fällt heraus.",
  "Both compounds swap partners. AgCl is insoluble, so it precipitates out and drives the reaction.":
    "Beide Verbindungen tauschen Partner. AgCl ist unlöslich, fällt aus und treibt damit die Reaktion.",
  "A hydrocarbon plus oxygen giving carbon dioxide and water - the signature of burning.":
    "Ein Kohlenwasserstoff plus Sauerstoff ergibt Kohlenstoffdioxid und Wasser — die Signatur des Brennens.",
  "Heating limestone splits it into quicklime and carbon dioxide. One in, two out.":
    "Kalkstein erhitzt zerfällt zu gebranntem Kalk und Kohlenstoffdioxid. Einer rein, zwei raus.",
  "Iron displaces hydrogen from the acid, and the hydrogen bubbles off as a gas.":
    "Eisen verdrängt Wasserstoff aus der Säure, und der Wasserstoff perlt als Gas ab.",
  "Two elements, one product. The Haber process that feeds about half the planet.":
    "Zwei Elemente, ein Produkt. Das Haber-Bosch-Verfahren, das etwa den halben Planeten ernährt.",
  "Acid and base swap partners to give a salt and water - neutralisation is a double replacement.":
    "Säure und Base tauschen Partner zu Salz und Wasser — Neutralisation ist eine doppelte Substitution.",
  "Octane burning in an engine. Hydrocarbon + O2 gives CO2 + H2O, every time.":
    "Oktan verbrennt im Motor. Kohlenwasserstoff + O₂ ergibt CO₂ + H₂O, jedes Mal.",
};

/* ---- unit 0.3b: periodic trends ---- */
export const LAB_DE_TRENDS: Record<string, string> = {
  Property: "Eigenschaft",
  "Atomic radius": "Atomradius",
  Electronegativity: "Elektronegativität",
  "Ionization energy": "Ionisierungsenergie",
  "First ionization energy": "Erste Ionisierungsenergie",
  Showing: "Angezeigt",
  Smallest: "Kleinster Wert",
  Largest: "Größter Wert",
  scale: "Skala",
  "across a period": "quer durch eine Periode",
  "down a group": "eine Gruppe hinunter",
  "grey = no accepted value": "grau = kein anerkannter Wert",
  "no accepted value": "kein anerkannter Wert",
  "shrinks left to right (more pull, same shell), grows down a group (a whole new shell)":
    "schrumpft von links nach rechts (mehr Zug, gleiche Schale), wächst nach unten (eine ganz neue Schale)",
  "grows left to right, shrinks down a group - fluorine is the greediest atom there is":
    "wächst von links nach rechts, schrumpft nach unten — Fluor ist das gierigste Atom überhaupt",
  "grows left to right, shrinks down a group - the price of stealing one electron":
    "wächst von links nach rechts, schrumpft nach unten — der Preis, ein Elektron zu stehlen",
};

/* ---- unit 2.1b: Lavoisier's balance ---- */
export const LAB_DE_CONSERVATION: Record<string, string> = {
  Vessel: "Gefäß",
  "Open beaker": "Offenes Becherglas",
  "Sealed jar": "Verschlossenes Glas",
  "Run the reaction": "Reaktion ablaufen lassen",
  "Start mass": "Startmasse",
  "Mass now": "Masse jetzt",
  Change: "Änderung",
  Atoms: "Atome",
  "always conserved": "immer erhalten",
  "reaction progress": "Reaktionsfortschritt",
  vessel: "Gefäß",
  sealed: "verschlossen",
  open: "offen",
  "open to the air": "offen zur Luft",
  reference: "Referenz",
  unchanged: "unverändert",
  "mass on the balance": "Masse auf der Waage",
  "closed system": "geschlossenes System",
  "open system": "offenes System",
  "Baking soda + vinegar": "Natron + Essig",
  "Burning magnesium": "Magnesium verbrennt",
  "Iron rusting": "Eisen rostet",
  "Every atom stays inside. The balance cannot move - mass is conserved, exactly.":
    "Jedes Atom bleibt drin. Die Waage kann sich nicht bewegen — die Masse bleibt exakt erhalten.",
  "Atoms leave as gas. Mass seems to vanish; it is only walking out of the jar.":
    "Atome entweichen als Gas. Die Masse scheint zu verschwinden; sie spaziert nur aus dem Glas.",
  "Atoms arrive from the air. Mass seems to appear; it was in the atmosphere all along.":
    "Atome kommen aus der Luft dazu. Die Masse scheint zu entstehen; sie war die ganze Zeit in der Atmosphäre.",
};

Object.assign(
  LAB_DE,
  LAB_DE_SHAPES,
  LAB_DE_IMF,
  LAB_DE_RXTYPES,
  LAB_DE_TRENDS,
  LAB_DE_CONSERVATION
);

export function setLabDictionary(dict: Record<string, string> | null) {
  active = dict;
}

/** Translate a lab string via the active dictionary; unknown strings pass through. */
export function tl(s: string): string {
  return active?.[s] ?? s;
}
