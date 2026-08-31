import type { Lesson, Unit } from "../types";

/**
 * German titles, subtitles and blurbs for every unit and lesson. The full
 * lesson bodies live in de/unitN.tsx and are merged by ../localize.tsx; this
 * metadata is what the home page, lesson navigation, review deck and
 * certificate show in German.
 */

export const unitMetaDe: Record<string, Partial<Unit>> = {
  u0: {
    title: "Die Zelle",
    blurb:
      "Alles Lebendige besteht aus Zellen, und jede Zelle ist ein Wasserbeutel, der kontrolliert, was seine Grenze überquert, und seine Chemie mit Proteinmaschinen betreibt.",
  },
  u1: {
    title: "Energie",
    blurb:
      "Zwei Reaktionen, in entgegengesetzte Richtungen betrieben, treiben fast alles Lebendige an: Eine speichert Sonnenlicht in Zucker, die andere gibt es wieder aus.",
  },
  u2: {
    title: "DNA & Proteine",
    blurb:
      "Das Molekül, das die Anleitung speichert, die Maschinerie, die es kopiert, und der Code, der aus vier Buchstaben jedes Protein macht, aus dem du bestehst.",
  },
  u3: {
    title: "Das Küchen-Abschlussprojekt",
    blurb:
      "Drei Einheiten Theorie, eingelöst: Zieh mit Spülmittel, Salz und eiskaltem Schnaps echte DNA aus einer Erdbeere und heb sie am Stäbchen heraus.",
  },
  u4: {
    title: "Vererbung",
    blurb:
      "Wie der Code weitergegeben wird: warum Merkmale Generationen überspringen, warum Geschwister verschieden sind, und warum ein Mönch beim Erbsenzählen früher dort war als alle anderen.",
  },
  u5: {
    title: "Evolution",
    blurb:
      "Mutation erzeugt Vielfalt, die Umwelt führt Buch. Ein Mechanismus — und er erklärt, warum Leben entworfen aussieht, ohne dass jemand es entworfen hat.",
  },
  u6: {
    title: "Ökologie & das Hefe-Abschlussprojekt",
    blurb:
      "Von der Zelle heraus auf das ganze System: wohin die Energie geht, warum Populationen aufhören zu wachsen — und ein Ballon, den du mit lebenden Zellen aufbläst.",
  },
};

export const lessonMetaDe: Record<string, Partial<Lesson>> = {
  /* ---- unit 0 ---- */
  cells: {
    title: "Was lebt, und was eine Zelle ist",
    subtitle:
      "Die eine universelle Behauptung der Biologie: Alles Lebendige besteht aus Zellen, und jede Zelle stammt von einer anderen Zelle.",
  },
  membrane: {
    title: "Die Membran & wie Dinge hinüberkommen",
    subtitle:
      "Eine Zelle wird durch ihre Grenze definiert. Zwei Fettschichten entscheiden, was hinein- und hinausgelangt — und was es kostet.",
  },
  enzymes: {
    title: "Enzyme: Warum Biologie überhaupt stattfindet",
    subtitle:
      "Die meisten Reaktionen des Lebens sind bei Körpertemperatur viel zu langsam. Enzyme senken den Hügel — und ihre Form ist der ganze Trick.",
  },

  /* ---- unit 1 ---- */
  photosynthesis: {
    title: "Fotosynthese: Nahrung aus Licht",
    subtitle:
      "Pflanzen bauen Zucker aus Luft und Wasser, mit Sonnenlicht. Fast jede Kalorie, die du je gegessen hast, begann hier.",
  },
  respiration: {
    title: "Zellatmung: Den Zucker ausgeben",
    subtitle:
      "Jede Zelle betreibt dieselbe Reaktion rückwärts, um ATP zu bekommen — und wie viel sie bekommt, hängt ganz davon ab, ob Sauerstoff da ist.",
  },

  /* ---- unit 2 ---- */
  dna: {
    title: "DNA: Vier Buchstaben, ein Molekül",
    subtitle:
      "Eine Leiter, deren Sprossen nur auf eine Art passen — und genau das macht sie zugleich zu Archiv und Vorlage.",
  },
  replication: {
    title: "Replikation: Drei Milliarden Buchstaben kopieren",
    subtitle:
      "Öffne die Leiter, und jede Hälfte gibt ihren eigenen Ersatz vor. Das Korrekturlesen ist der erstaunliche Teil.",
  },
  "protein-synthesis": {
    title: "Der genetische Code: Vom Gen zum Protein",
    subtitle:
      "Drei Basen benennen eine Aminosäure. Diese Tabelle teilen alle Organismen der Erde — die Biologie hat nichts, was einer Naturkonstante näher käme.",
  },
  mutations: {
    title: "Mutationen: Wenn die Kopie falsch ist",
    subtitle:
      "Eine Base von drei Milliarden. Mal bedeutet es gar nichts, mal Sichelzellanämie — und der Unterschied liegt meist am Leseraster.",
  },

  /* ---- unit 3 ---- */
  "strawberry-dna": {
    title: "Abschluss: DNA aus einer Erdbeere gewinnen",
    subtitle:
      "Zwanzig Minuten, vier Supermarkt-Zutaten und weiße Fäden des Moleküls, um das es im ganzen Kurs ging — sichtbar ohne Mikroskop.",
  },

  /* ---- unit 4 ---- */
  mendel: {
    title: "Mendel: Merkmale kommen als Einheiten",
    subtitle:
      "Vererbung ist kein Farbenmischen. Merkmale werden als diskrete Einheiten getragen, die eine Generation verschwinden und unverändert zurückkehren können.",
  },
  meiosis: {
    title: "Meiose: Warum keine zwei Geschwister gleich sind",
    subtitle:
      "Eine Zelle teilt sich zweimal zu vier, jede mit halbem Chromosomensatz — und drei Mechanismen sorgen dafür, dass keine zwei gleich sind.",
  },

  /* ---- unit 5 ---- */
  "natural-selection": {
    title: "Natürliche Selektion",
    subtitle:
      "Vier Beobachtungen, eine unausweichliche Schlussfolgerung — und kein Organismus muss sich jemals bemühen, sich zu verändern.",
  },
  evidence: {
    title: "Die Belege: Den Stammbaum lesen",
    subtitle:
      "Fossilien, Anatomie und DNA sind drei unabhängige Archive — und sie stimmen überein, worauf es ankommt.",
  },

  /* ---- unit 6 ---- */
  "energy-flow": {
    title: "Energiefluss: Warum Nahrungsketten kurz sind",
    subtitle:
      "Etwa ein Zehntel der Energie übersteht jede Stufe einer Nahrungskette. Diese eine Zahl erklärt die Form jedes Ökosystems.",
  },
  populations: {
    title: "Populationen: Wachstum und seine Grenzen",
    subtitle:
      "Nichts wächst lange exponentiell. Was es stoppt — und was passiert, wenn die Decke selbst sich verschiebt.",
  },
  "yeast-balloon": {
    title: "Abschluss: Der Hefe-Ballon",
    subtitle:
      "Füttere lebende Zellen, fange ihr Abgas auf und prüfe das Volumen gegen eine Zahl, die du vorher berechnet hast.",
  },
};
