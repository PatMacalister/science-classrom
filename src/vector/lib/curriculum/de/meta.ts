import type { Lesson, Unit } from "../types";

/**
 * German titles, subtitles and blurbs for every unit and lesson. The full
 * lesson bodies live in de/unitN.tsx and are merged by ../localize.tsx; this
 * metadata is what the home page, lesson navigation, review deck and
 * certificate show in German.
 */

export const unitMetaDe: Record<string, Partial<Unit>> = {
  u0: {
    title: "Bewegung",
    blurb:
      "Bevor du fragst, warum sich Dinge bewegen, lerne präzise zu sagen, wie: Position, Geschwindigkeit, Beschleunigung — und die Graphen, die Bewegung lesbar machen.",
  },
  u1: {
    title: "Kräfte",
    blurb:
      "Warum Bewegung sich ändert: drei Gesetze, die alles vom Einkaufswagen bis zum Mond regieren — plus die Reibung, die ihr Leben damit verbringt, Bewegung schwer aussehen zu lassen.",
  },
  u2: {
    title: "Energie & Impuls",
    blurb:
      "Zwei Größen, die das Universum sich weigert zu verlieren. Wer sie verfolgen kann, macht aus unlösbar wirkenden Aufgaben Buchhaltung.",
  },
  u3: {
    title: "Das Hinterhof-Abschlussprojekt",
    blurb:
      "Drei Einheiten Mechanik, eingelöst: Miss die Fallbeschleunigung der Erde mit einem Schnürsenkel, einem Gewicht und einem Handy — auf ein, zwei Prozent genau.",
  },
  u4: {
    title: "Wellen & Schall",
    blurb:
      "Energie, die reist, während der Stoff bleibt. Ein Vokabular — Wellenlänge, Frequenz, Tempo — deckt Ozeandünung, Konzertsäle und WLAN ab.",
  },
  u5: {
    title: "Licht & Optik",
    blurb:
      "Das Schnellste, was es gibt, nach Maß gebogen: wie Licht abprallt und bricht, wie gekrümmtes Glas ein Bild erzeugt, und was sich beiderseits des Regenbogens versteckt.",
  },
  u6: {
    title: "Wärme & der Rand der klassischen Welt",
    blurb:
      "Temperatur entzaubert als Bewegung, dann zwei Risse in der klassischen Fassade: Licht, das in Paketen ankommt, und Kerne, die mit reinem Zufall perfekt Zeit halten.",
  },
};

export const lessonMetaDe: Record<string, Partial<Lesson>> = {
  /* ---- unit 0 ---- */
  velocity: {
    title: "Position & Geschwindigkeit: Präzise sagen, wo",
    subtitle:
      "Physik beginnt damit, „es hat sich bewegt“ durch Zahlen zu ersetzen — und der Graph dieser Zahlen beantwortet schon Fragen, die deine Augen nicht können.",
  },
  acceleration: {
    title: "Beschleunigung: Wenn die Geschwindigkeit selbst sich ändert",
    subtitle:
      "Die härteste Idee der Kinematik: Schnellerwerden, Bremsen und Abbiegen sind dasselbe — und das Fallen ist ihr reinstes Beispiel.",
  },
  projectiles: {
    title: "Würfe: Zwei Bewegungen, die einander ignorieren",
    subtitle:
      "Ein geworfener Ball ist zwei leichte Aufgaben im Trenchcoat: gleichmäßige Seitwärtsbewegung plus schlichter freier Fall. Trenne sie, und alles rechnet sich.",
  },

  /* ---- unit 1 ---- */
  "newton-laws": {
    title: "Newtons drei Gesetze: Das Betriebssystem",
    subtitle:
      "Bewegung braucht keine Ursache — Änderungen der Bewegung schon. Drei Sätze von 1687, die noch immer jede Maschine, jeden Sport und jede Umlaufbahn betreiben.",
  },
  friction: {
    title: "Reibung: Die Kraft, die sich in Sichtweite versteckt",
    subtitle:
      "Sie ruiniert ideale Physikaufgaben und macht das Gehen möglich. Zwei Regeln beherrschen sie — und eine Alltagsüberraschung darüber, wovon sie nicht abhängt.",
  },
  gravity: {
    title: "Gravitation & Umlaufbahnen: Für immer fallen",
    subtitle:
      "Der Apfel und der Mond gehorchen einem Gesetz. Eine Umlaufbahn ist keine Flucht vor der Schwerkraft — sie ist Fallen, gut genug gezielt, um immer zu verfehlen.",
  },

  /* ---- unit 2 ---- */
  energy: {
    title: "Energie: Die Größe, die nur das Kostüm wechselt",
    subtitle:
      "Der beste Buchhaltungstrick der Physik: eine Zahl, die du vor und nach jedem Vorgang berechnen kannst — und sie geht immer auf.",
  },
  momentum: {
    title: "Impuls: Was Kollisionen erhalten",
    subtitle:
      "Masse mal Geschwindigkeit überlebt jeden Crash, jede Explosion und jeden Abprall — darum funktionieren Airbags, und darum ist Rückstoß nicht verhandelbar.",
  },

  /* ---- unit 3 ---- */
  "measure-g": {
    title: "Abschluss: Miss g mit einer Schnur",
    subtitle:
      "Die Schwingdauer eines Pendels hängt von genau zwei Dingen ab — seiner Länge und dem Planeten, an dem es hängt. Stoppe sie, und der Planet ist die Unbekannte, nach der du auflöst.",
  },

  /* ---- unit 4 ---- */
  waves: {
    title: "Wellen: Bewegung ohne Transport",
    subtitle:
      "Eine Stadionwelle umrundet das Stadion, während jeder Fan sitzen bleibt. Dieser Trick — Energie, die durch Stoff reist, der selbst bleibt — betreibt die halbe Physik.",
  },
  sound: {
    title: "Schall: Druck im Flug (und ein Experiment)",
    subtitle:
      "Tonhöhe ist Frequenz, Lautstärke ist Amplitude, und eine vorbeifahrende Sirene verbiegt beide hörbar. Dann: Miss die Schallgeschwindigkeit mit einer Wand und einem Klatschen.",
  },
  interference: {
    title: "Interferenz: Wenn Wellen sich treffen",
    subtitle:
      "Zwei Wellen am selben Ort addieren sich schlicht — Kamm auf Kamm verdoppelt, Kamm auf Tal löscht zu Stille. Diese eine Regel baut stehende Wellen, Musiknoten und Noise-Cancelling.",
  },

  /* ---- unit 5 ---- */
  refraction: {
    title: "Reflexion & Brechung: Licht wechselt die Spur",
    subtitle:
      "Zwei Regeln beherrschen jeden Spiegel, jede Pool-Täuschung und jede Glasfaser: Der Abprall ist symmetrisch, und die Biegung kommt vom Tempowechsel an der Grenze.",
  },
  lenses: {
    title: "Linsen: Licht mit Absicht biegen",
    subtitle:
      "Krümme das Glas, und Brechung wird Ingenieurskunst: Eine Zahl — die Brennweite — erklärt Kameras, Brillen und warum der Arm ab vierzig jedes Jahrzehnt länger wird.",
  },
  spectrum: {
    title: "Farbe & Spektrum: Das meiste Licht ist unsichtbar",
    subtitle:
      "Ein Prisma fügt dem Sonnenlicht keine Farbe hinzu — es entmischt, was immer da war. Und der sichtbare Regenbogen ist eine Oktave einer Klaviatur von Radio bis Gamma.",
  },

  /* ---- unit 6 ---- */
  heat: {
    title: "Temperatur & Wärme: Zittern, beziffert",
    subtitle:
      "Temperatur ist keine Substanz — sie ist die mittlere Bewegungsenergie der Moleküle. Sitzt das, ergeben Wärmefluss, Thermometer und „kalte“ Türklinken plötzlich Sinn.",
  },
  quanta: {
    title: "Quanten: Wo die glatte Welt körnig wird",
    subtitle:
      "Licht auf Metall schlägt Elektronen heraus — aber nur bei der richtigen Farbe, egal wie hell der Strahl. Diese eine sture Tatsache zu erklären brach die klassische Physik.",
  },
  "half-life": {
    title: "Halbwertszeit: Perfekte Uhren aus reinem Zufall",
    subtitle:
      "Kein Kern weiß, wann er zerfällt — doch eine Billion von ihnen hält besser Zeit als jede Armbanduhr. Aggregierter Zufall datiert Pharaonen und Planeten.",
  },
};
