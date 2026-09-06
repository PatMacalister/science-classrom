import type { Lesson, Unit } from "../types";

/**
 * German titles, subtitles and blurbs for every unit and lesson. The full
 * lesson bodies live in de/unitN.tsx and are merged by ../localize.tsx; this
 * metadata is what the home page, lesson navigation, review deck and
 * certificate show in German.
 */

export const unitMetaDe: Record<string, Partial<Unit>> = {
  u0: {
    title: "Die Schleife",
    blurb:
      "Was einen Roboter von einer Maschine trennt, ist eine Idee: spüren, denken, handeln — im Kreis, und zwar schnell. Lerne die Schleife kennen, und den Signaltrick, mit dem ein Computer einem Motor zuflüstert.",
  },
  u1: {
    title: "Motoren & Muskeln",
    blurb:
      "Alles, was ein Roboter der Welt antut, tut er durch einen Motor. Lerne die drei Sorten, die zählen, den Vier-Schalter-Trick für den Rückwärtsgang — und warum sich hinter fast jedem Motor ein Getriebe versteckt.",
  },
  u2: {
    title: "Sinne & Schätzung",
    blurb:
      "Sensoren reichen dir nie die Wahrheit — sie reichen dir verrauschte, driftende, kegelförmige Hinweise. Das Handwerk besteht darin, aus zwei unehrlichen Zahlen eine ehrliche zu pressen.",
  },
  u3: {
    title: "Regelung",
    blurb:
      "Die Theorie der Schleife selbst: warum An/Aus-Regelung schwingen muss, wie drei kleine Terme sie zähmen — und ein Abschlussprojekt, in dem du einen Linienfolger vom Torkeln zur Rennrunde stimmst.",
  },
  u4: {
    title: "Arme & Greifer",
    blurb:
      "Von Rädern zu Händen. In zwei Gelenkwinkeln steckt eine ganze Geometrie: wo die Hand landet, wie man sie rückwärts von einem Ziel aus zielt — und wie fest sie zudrücken darf, was sie dort findet.",
  },
  u5: {
    title: "Räder & Navigation",
    blurb:
      "Wie ein Roboter die drei Fragen jeder Reise beantwortet: Wo bin ich, wie sieht die Welt aus, und wie komme ich hin — mit Encoder-Ticks, einem rotierenden Laser und ein wenig Graphensuche.",
  },
  u6: {
    title: "Roboterschule",
    blurb:
      "Die Forschungsfront, ehrlich erzählt: Roboter, die Aufgaben aus deinen Vorführungen lernen statt aus deinem Code — und die sture Lücke zwischen dem Simulator, in dem sie üben, und der Welt, in der sie bestehen müssen.",
  },
};

export const lessonMetaDe: Record<string, Partial<Lesson>> = {
  /* ---- unit 0 ---- */
  "sense-think-act": {
    title: "Spüren, Denken, Handeln: Was einen Roboter ausmacht",
    subtitle:
      "Eine Bohrmaschine ist eine Maschine; ein Thermostat ist fast ein Roboter. Der Unterschied ist eine Schleife, die die Welt liest, bevor sie auf sie drückt — und wie oft diese Schleife läuft, entscheidet alles.",
  },
  signals: {
    title: "PWM: Wie ein Computer einem Motor zuflüstert",
    subtitle:
      "Der Pin eines Chips kennt nur An und Aus — doch Motoren brauchen alles dazwischen. Der Trick: schneller blinken, als der Motor fühlen kann, und den Mittelwert sprechen lassen.",
  },

  /* ---- unit 1 ---- */
  "dc-motors": {
    title: "Gleichstrommotoren: Schnell, schwach und hungrig",
    subtitle:
      "Zwei Drähte, und er dreht — aber Volt kaufen Tempo, Last stiehlt es, und ein blockierter Motor wird zur Heizung. Lerne die H-Brücke kennen, die vier Schalter mit Rückwärtsgang.",
  },
  "servos-steppers": {
    title: "Servos & Schrittmotoren: Position ohne Raterei",
    subtitle:
      "Zwei gegensätzliche Antworten auf „Fahr auf diesen Winkel“: Der Servo schließt eine Schleife und kämpft um seine Position; der Schrittmotor zählt perfekte Schritte — bis er lautlos den Faden verliert.",
  },
  gears: {
    title: "Zahnräder: Tempo gegen Kraft tauschen",
    subtitle:
      "Das Tempo eines Motors ist eine Währung, und das Getriebe ist die Wechselstube: zehn Umdrehungen rein, eine raus, zehnfaches Moment — minus etwas Reibung, plus ein kleines Wackeln namens Spiel.",
  },

  /* ---- unit 2 ---- */
  rangefinders: {
    title: "Entfernungsmesser: Distanz per Stoppuhr",
    subtitle:
      "Ultraschall- und Laser-Entfernungsmesser spielen denselben Trick — rufen, lauschen, Rundreise halbieren. Was zählt, ist die Breite des Rufs und woraus die Wand gemacht ist.",
  },
  imu: {
    title: "Die IMU: Zwei fehlerhafte Zeugen",
    subtitle:
      "Der Beschleunigungssensor weiß, wo unten ist, zittert aber bei jedem Stoß; der Gyro dreht geschmeidig, vergisst aber langsam, wo null war. Beides ist unheilbar — und genau richtig so.",
  },
  filters: {
    title: "Der Komplementärfilter: Eine Wahrheit aus zwei Lügnern",
    subtitle:
      "Vier Zeilen Code, die Drohnen waagerecht halten: Glaub dem Gyro für diesen Augenblick, lass die Schwerkraft die Schätzung über Sekunden heimziehen — und ein Knopf, Alpha, verteilt das Vertrauen.",
  },

  /* ---- unit 3 ---- */
  feedback: {
    title: "Rückkopplung: Warum An/Aus wackeln muss",
    subtitle:
      "Der einfachste Regler hat zwei Stellungen und keine Scham: volle Kraft unter dem Ziel, nichts darüber. Er funktioniert — Thermostate beweisen es täglich — und stillhalten kann er nie.",
  },
  pid: {
    title: "PID: Drei Buchstaben, die die Welt regeln",
    subtitle:
      "Drücke proportional zum Fehler, merke dir, was sich nicht schließen lässt, bremse vor der Ankunft. Gegenwart, Vergangenheit, Zukunft — jede Fabrikhalle summt mit dieser einen Zeile.",
  },
  "line-follower": {
    title: "Abschluss: Stimme den Linienfolger",
    subtitle:
      "Alles bisher auf einem kleinen Roboter: Sensoren melden die Linie, PWM treibt die Räder, und deine Verstärkungen entscheiden zwischen Torkeln, Wackeln und einer sauberen schnellen Runde.",
  },

  /* ---- unit 4 ---- */
  kinematics: {
    title: "Vorwärtskinematik: Wo ist die Hand gelandet?",
    subtitle:
      "Ein Arm ist Trigonometrie zum Zusammenschrauben: Jedes Gelenk dreht, jedes Glied trägt die Drehung nach außen, und zwei Zeilen Sinus und Cosinus benennen exakt den Punkt, an dem die Hand endet.",
  },
  "inverse-kinematics": {
    title: "Inverse Kinematik: Den Arm rückwärts zielen",
    subtitle:
      "Von „die Tasse ist dort“ zu „stell die Gelenke so“ — ein Problem mit zwei richtigen Antworten, Regionen ganz ohne, und Stellen, an denen der Arm kurz eine Bewegungsrichtung verliert.",
  },
  grippers: {
    title: "Greifer: Die Physik des Nicht-Zerdrückens",
    subtitle:
      "Ein Griff ist Reibung, bezahlt mit Druck — zu wenig, und die Schwerkraft gewinnt; zu viel, und das Ei verliert. Das Fenster dazwischen ist schmal, und weiche Finger machen es breiter.",
  },

  /* ---- unit 5 ---- */
  odometry: {
    title: "Odometrie: Navigieren durch Schrittezählen",
    subtitle:
      "Zwei Encoder und Arithmetik liefern eine Positionsschätzung gratis — eine, die perfekt beginnt und mit jedem Meter verrottet, weil Räder ein bisschen lügen und Integration ihnen restlos glaubt.",
  },
  mapping: {
    title: "Kartierung: Ein Grundriss aus rotierendem Laser",
    subtitle:
      "Teile die Welt in kleine Quadrate und lass jeden Lidar-Strahl abstimmen: Die Trefferzelle füllt sich Richtung „Wand“, der Weg dorthin leert sich Richtung „frei“. Genug Stimmen, und ein Grundriss erscheint.",
  },
  "path-planning": {
    title: "Pfadplanung: A* und die aufgeblähte Karte",
    subtitle:
      "Mit einer Karte in der Hand wird „Wie komme ich hin?“ zur Graphensuche: vom Start nach außen wachsen, das Ziel begrüßen, die Brotkrumen zurücklaufen — nachdem jede Wand um einen halben Roboter gemästet wurde.",
  },

  /* ---- unit 6 ---- */
  "teach-by-demo": {
    title: "Abschluss: Lehre den Arm von Hand",
    subtitle:
      "Keine Winkel, keine Verstärkungen, kein Code: Führe den Arm ein paar Dutzend Mal durch die Aufgabe und lass eine Policy das Muster lernen. Was du kuratierst, ist keine Software mehr — es ist ein Datensatz.",
  },
  "sim-to-real": {
    title: "Sim-to-Real: Die Lücke zwischen Übung und Welt",
    subtitle:
      "Simulation schenkt eine Million billiger Proben — einer Welt, die auf hundert Arten subtil falsch ist. Die Kur ist absichtlich schlampiges Üben: Variiere das Falsche, bis nur Robustheit überlebt.",
  },
};
