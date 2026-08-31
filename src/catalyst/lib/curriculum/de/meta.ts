import type { Lesson, Unit } from "../types";

/**
 * German titles, subtitles and blurbs for every unit and lesson. Full lesson
 * bodies live in de/unitN.tsx; this metadata is what the home page, lesson
 * navigation, review deck and certificate show in German.
 */

export const unitMetaDe: Record<string, Partial<Unit>> = {
  u0: {
    title: "Das Atom",
    blurb:
      "Das Alphabet der Materie: woraus Atome bestehen, wo ihre Elektronen wohnen — und die eine Tafel, die die ganze Chemie ordnet.",
  },
  u1: {
    title: "Chemische Bindungen",
    blurb:
      "Warum Atome überhaupt zusammenhalten: Elektronenraub, Elektronenteilung und das Elektronenmeer — drei Deals, ein Ziel: eine volle Außenschale.",
  },
  u2: {
    title: "Reaktionen & das Mol",
    blurb:
      "Reaktionen ordnen Atome nur um, erschaffen und vernichten sie nie — und das Mol ist der Trick, mit dem man das Unsichtbare wiegen kann.",
  },
  u3: {
    title: "Aggregatzustände & Lösungen",
    blurb:
      "Dieselben Teilchen, drei verschiedene Tänze — und was passiert, wenn ein Stoff in einem anderen verschwindet.",
  },
  u4: {
    title: "Säuren, Basen & das Küchen-Finale",
    blurb:
      "Die Chemie von sauer und seifig, die logarithmische Skala, die sie misst — und ein Abschlussprojekt, das du zu Hause kochst.",
  },
  u5: {
    title: "Energie & Wandel",
    blurb:
      "Warum Reaktionen Wärme abgeben oder schlucken, was sie schnell oder langsam macht — und die Zweibahnstraße, die wie Stillstand aussieht.",
  },
  u6: {
    title: "Elektrochemie",
    blurb:
      "Elektronenübertragung als Energiequelle: Redox, Batterien, Elektrolyse — der Bogen von der Chemie zur Elektrizität, gekrönt von einer Zitrone, die eine LED leuchten lässt.",
  },
};

export const lessonMetaDe: Record<string, Partial<Lesson>> = {
  /* ---- unit 0 ---- */
  atoms: {
    title: "Atome: Das Alphabet der Materie",
    subtitle:
      "Alles, was du anfassen kannst, ist mit nur 118 Buchstaben geschrieben. Jeder Buchstabe ist ein Atom — und drei winzige Teilchen entscheiden, welcher.",
  },
  shells: {
    title: "Elektronenschalen: Wo Elektronen wohnen",
    subtitle:
      "Elektronen kreisen nicht, wo sie wollen — sie stapeln sich in Schalen. Und die äußerste Schale schreibt die ganze Chemie.",
  },
  "periodic-table": {
    title: "Das Periodensystem: Die Landkarte der Chemie",
    subtitle:
      "118 Elemente, eine Tafel — und wer einmal sieht, wie sie sortiert ist, kann Chemie vorhersagen, die er nie gelernt hat.",
  },
  /* ---- unit 1 ---- */
  ionic: {
    title: "Ionenbindung: Geben und Nehmen",
    subtitle:
      "Natrium will ein Elektron loswerden, Chlor will eins haben. Der Deal des Jahrhunderts — und der Grund, warum es Salz gibt.",
  },
  covalent: {
    title: "Kovalente Bindung: Geteilte Paare",
    subtitle:
      "Wenn kein Atom ein Elektron hergeben will, gibt es einen Kompromiss: gemeinsame Paare, die für beide zählen. Willkommen bei den Molekülen.",
  },
  "bond-spectrum": {
    title: "Metallbindung & das Bindungsspektrum",
    subtitle:
      "Metalle teilen ein Elektronenmeer; Moleküle teilen ungerecht. Eine Zahl — die Elektronegativität — sortiert jede Bindung dazwischen.",
  },
  "molecular-shapes": {
    title: "Molekülformen & warum Wasser gewinkelt ist",
    subtitle:
      "Elektronengruppen stoßen sich ab und weichen sich so weit wie möglich aus. Die Form, die dabei entsteht, entscheidet über die Polarität — und Wassers Form entscheidet über halbe Biologie.",
  },
  intermolecular: {
    title: "Zwischenmolekulare Kräfte",
    subtitle:
      "Die schwachen Anziehungen zwischen Molekülen entscheiden, ob ein Stoff Gas, Flüssigkeit oder Feststoff ist — und sie sind der Grund, warum Wasser sich wie nichts anderes verhält.",
  },

  /* ---- unit 2 ---- */
  reactions: {
    title: "Chemische Reaktionen & das Ausgleichen",
    subtitle:
      "Brennen, Rosten, Backen — jede Reaktion ist derselbe Zug: alte Bindungen brechen, neue entstehen, und jedes einzelne Atom überlebt.",
  },
  "reaction-types": {
    title: "Die fünf Reaktionstypen",
    subtitle:
      "Fast jede Reaktion, der du begegnest, folgt einem von fünf Mustern. Erkenne das Muster, und du kannst die Produkte einer Reaktion vorhersagen, die du nie gesehen hast.",
  },
  mole: {
    title: "Das Mol: Das Dutzend der Chemie",
    subtitle:
      "Atome sind zu klein zum Zählen, also zählen Chemiker in Paketen von 6 × 10²³ — so bemessen, dass die Waage das Zählen übernimmt.",
  },
  stoichiometry: {
    title: "Stöchiometrie: Rezept-Mathematik",
    subtitle:
      "Ausgeglichene Gleichung + Mol-Brücke = die Macht, auf das Gramm genau vorherzusagen, was herauskommt — und welche Zutat zuerst ausgeht.",
  },
  /* ---- unit 3 ---- */
  states: {
    title: "Fest, flüssig, gasförmig",
    subtitle:
      "Eis, Wasser und Dampf sind dasselbe Molekül auf drei Energiestufen. Die Temperatur ändert nur den Tanz.",
  },
  "gas-laws": {
    title: "Gase & das ideale Gasgesetz",
    subtitle:
      "Ein Gas ist Chaos mit Regeln. Vier Stellschrauben — Druck, Volumen, Temperatur, Menge — verkettet in einer Gleichung.",
  },
  solutions: {
    title: "Lösungen & Konzentration",
    subtitle:
      "Wohin verschwindet das Salz beim Auflösen — und wie viel schafft das Wasser? Sättigung, Löslichkeitskurven und Molarität.",
  },
  /* ---- unit 4 ---- */
  "acids-bases": {
    title: "Säuren & Basen: Die pH-Skala",
    subtitle:
      "Saures Essen, beißende Reiniger und dein eigener Magen teilen ein Teilchen: H⁺. Um es zu zählen, braucht es einen Logarithmus.",
  },
  titration: {
    title: "Neutralisation & Titration",
    subtitle:
      "Tropfe Base in Säure, bis ein Tropfen die Farbe kippt — und du hast Teilchen gezählt, die du nie sehen kannst, auf drei Stellen genau.",
  },
  "kitchen-lab": {
    title: "Abschlussprojekt: Das Küchenlabor",
    subtitle:
      "Drei echte Experimente mit Supermarkt-Chemikalien: einen pH-Indikator brauen, einen CO₂-Ballon stöchiometrisch dosieren und Kristalle züchten.",
  },
  /* ---- unit 5 ---- */
  energy: {
    title: "Exotherm & endotherm",
    subtitle:
      "Jede Reaktion erklimmt einen Hügel, bevor sie fallen kann. Die Hügelhöhe bestimmt das Drama, die Landehöhe die Wärme.",
  },
  rates: {
    title: "Reaktionsgeschwindigkeit & Stöße",
    subtitle:
      "Reaktionen passieren Stoß für Stoß — also macht alles, was Stöße härter, schneller oder häufiger macht, die Chemie schneller.",
  },
  equilibrium: {
    title: "Gleichgewicht & Le Chatelier",
    subtitle:
      "Manche Reaktionen laufen in beide Richtungen zugleich. Wenn beide gleichziehen, scheint nichts zu passieren — und alles passiert.",
  },
  /* ---- unit 6 ---- */
  redox: {
    title: "Redox: Elektronen-Buchhaltung",
    subtitle:
      "Die Ionenbindung war Elektronenübertragung im Stillstand. Redox ist Elektronenübertragung als Ereignis — und manche Metalle zahlen immer.",
  },
  galvanic: {
    title: "Batterien: Die galvanische Zelle",
    subtitle:
      "Trenne die beiden Hälften einer Redoxreaktion und zwinge die Elektronen durch einen Draht — dieser Umweg ist jede Batterie, die je gebaut wurde.",
  },
  electrolysis: {
    title: "Elektrolyse: Reaktionen rückwärts",
    subtitle:
      "Eine Batterie lässt sich eine willige Reaktion in Volt bezahlen. Elektrolyse ist: du zahlst Volt, um eine unwillige Reaktion rückwärts zu zwingen.",
  },
  "lemon-battery": {
    title: "Abschlussprojekt: Die Zitronenbatterie",
    subtitle:
      "Zinkschraube + Kupfermünze + Zitrone = eine echte galvanische Zelle. Stapele ein paar und bring eine echte LED zum Leuchten.",
  },
};
