/**
 * The parts bench — Servo Academy's signature reference, the counterpart to
 * Catalyst's periodic table, Helix's genetic code and Vector's SI table.
 *
 * Robotics runs on a small shelf of recurring parts: things that sense, things
 * that move, the electronics that feed them, the brains that close the loop
 * and the mechanics that hold it all together. Each entry carries a memory
 * hook (`*stars*` mark the load-bearing words) because the payoff — knowing
 * instantly why a stepper skips silently or why an H-bridge has exactly four
 * switches — is exactly the kind of fact that decays without one.
 *
 * Every entry has a unique `id`; the review deck keys drill cards as
 * `pb:<id>`.
 */

export type PartKind = "sensor" | "actuator" | "driver" | "brain" | "mechanism";

export interface PartEntry {
  /** Unique across the dataset — used in review-deck keys. */
  id: string;
  /** Tile glyph — the bench is visual, so every part gets a face. */
  glyph: string;
  name: string;
  nameDe: string;
  /** What the part does, in one clause. */
  role: string;
  roleDe: string;
  kind: PartKind;
  /** English memory hook; `*stars*` mark the emphasised parts. */
  hook: string;
  /** German Eselsbrücke, same convention. */
  esel: string;
}

export const PART_ENTRIES: PartEntry[] = [
  /* ---- sensors: how a robot notices the world ---- */
  { id: "limit-switch", glyph: "🔘", name: "limit switch", nameDe: "Endschalter", kind: "sensor",
    role: "closes a circuit when a lever is pressed at end of travel", roleDe: "schließt einen Kontakt, wenn am Ende des Verfahrwegs ein Hebel gedrückt wird",
    hook: "The humblest sensor on the bench: one bit, *touched or not*. 3D printers still find 'home' by driving into one on every axis.",
    esel: "Der bescheidenste Sensor der Bank: ein Bit, *berührt oder nicht*. 3D-Drucker finden ihr „Home“ bis heute, indem sie auf jeder Achse in einen hineinfahren." },
  { id: "potentiometer", glyph: "🎛️", name: "potentiometer", nameDe: "Potentiometer", kind: "sensor",
    role: "reads an absolute angle as a resistance", roleDe: "liest einen absoluten Winkel als Widerstand",
    hook: "A volume knob wired backwards: turn the shaft, read the voltage. *Absolute* — it knows its angle the instant power arrives, no homing needed.",
    esel: "Ein Lautstärkeregler rückwärts verdrahtet: Welle drehen, Spannung ablesen. *Absolut* — er kennt seinen Winkel ab der ersten Millisekunde, ganz ohne Referenzfahrt." },
  { id: "encoder", glyph: "⏱️", name: "rotary encoder", nameDe: "Drehgeber (Encoder)", kind: "sensor",
    role: "counts ticks per revolution for angle and speed", roleDe: "zählt Impulse pro Umdrehung für Winkel und Tempo",
    hook: "A slotted disc and a light beam: the wheel turns, the beam blinks, the *count is the angle*. Two beams a quarter-tick apart even tell you the direction.",
    esel: "Schlitzscheibe plus Lichtschranke: Das Rad dreht, der Strahl blinkt, die *Zählung ist der Winkel*. Zwei Strahlen im Viertel-Takt verraten sogar die Richtung." },
  { id: "ultrasonic", glyph: "🦇", name: "ultrasonic ranger", nameDe: "Ultraschallsensor", kind: "sensor",
    role: "measures distance by timing a sound echo", roleDe: "misst Entfernung über die Laufzeit eines Schallechos",
    hook: "*Bat logic*: chirp, wait, divide by two. Cheap and honest, but the chirp spreads in a wide cone and soft things swallow it — curtains are invisible.",
    esel: "*Fledermaus-Logik*: zirpen, warten, durch zwei teilen. Billig und ehrlich, aber der Zirp streut in einem breiten Kegel, und Weiches schluckt ihn — Vorhänge sind unsichtbar." },
  { id: "tof", glyph: "📍", name: "time-of-flight sensor", nameDe: "Time-of-Flight-Sensor", kind: "sensor",
    role: "measures distance by timing a light pulse", roleDe: "misst Entfernung über die Laufzeit eines Lichtpulses",
    hook: "The ultrasonic's laser cousin: same stopwatch trick at the *speed of light*, so the pulse comes back in nanoseconds — and in a pencil-thin beam instead of a cone.",
    esel: "Der Laser-Cousin des Ultraschalls: derselbe Stoppuhr-Trick mit *Lichtgeschwindigkeit* — der Puls kehrt in Nanosekunden zurück, bleistiftdünn statt kegelbreit." },
  { id: "lidar", glyph: "📡", name: "lidar", nameDe: "Lidar", kind: "sensor",
    role: "scans a full circle with a spinning rangefinder", roleDe: "tastet mit einem rotierenden Entfernungsmesser den vollen Kreis ab",
    hook: "Put a time-of-flight sensor on a *spinning turret* and you get a floor plan per revolution. Every robot-vacuum map and half of month-five SLAM starts here.",
    esel: "Setz einen Time-of-Flight-Sensor auf einen *rotierenden Turm*, und du bekommst einen Grundriss pro Umdrehung. Jede Saugroboter-Karte beginnt hier." },
  { id: "accelerometer", glyph: "📉", name: "accelerometer", nameDe: "Beschleunigungssensor", kind: "sensor",
    role: "senses tilt and shake by feeling accelerations", roleDe: "spürt Neigung und Erschütterung über Beschleunigungen",
    hook: "It feels gravity as a permanent 9.81 pointing down, so it always knows *which way is down* — honestly but nervously: every bump and vibration shakes the reading.",
    esel: "Er fühlt die Schwerkraft als permanente 9,81 nach unten und weiß darum immer, *wo unten ist* — ehrlich, aber nervös: Jeder Stoß zittert in der Messung." },
  { id: "gyroscope", glyph: "🌀", name: "gyroscope", nameDe: "Gyroskop", kind: "sensor",
    role: "measures how fast the robot is rotating", roleDe: "misst, wie schnell sich der Roboter dreht",
    hook: "Smooth and confident about *rate of turn* — but to get an angle you must add up its readings, and every tiny error rides along forever: the drift you'll tame in Unit 2.",
    esel: "Ruhig und souverän bei der *Drehrate* — aber für einen Winkel musst du seine Werte aufsummieren, und jeder kleine Fehler fährt für immer mit: die Drift aus Einheit 2." },
  { id: "camera", glyph: "📷", name: "camera", nameDe: "Kamera", kind: "sensor",
    role: "delivers millions of pixels — the richest, hardest sensor", roleDe: "liefert Millionen Pixel — der reichste, schwerste Sensor",
    hook: "Everything is in the image — colour, shape, text, faces — which is exactly the problem: a camera answers *no question by itself*. The work moves into software.",
    esel: "Alles steckt im Bild — Farbe, Form, Text, Gesichter — und genau das ist das Problem: Eine Kamera beantwortet *von selbst keine einzige Frage*. Die Arbeit wandert in die Software." },

  /* ---- actuators: how a robot pushes back ---- */
  { id: "dc-motor", glyph: "🔄", name: "brushed DC motor", nameDe: "Gleichstrommotor", kind: "actuator",
    role: "spins fast and weak; volts set speed, load sets current", roleDe: "dreht schnell und schwach; Volt setzen das Tempo, Last den Strom",
    hook: "Two wires, instant spin — the *default first motor*. Fast but feeble, so it almost always hides behind a gearbox. Stall it and the current soars: that smell is the lesson.",
    esel: "Zwei Drähte, sofort Drehung — der *Standard-Erstmotor*. Schnell, aber schwach, darum steckt er fast immer hinter einem Getriebe. Blockiert er, schießt der Strom hoch: Der Geruch ist die Lektion." },
  { id: "servo-motor", glyph: "🎯", name: "hobby servo", nameDe: "Modellbauservo", kind: "actuator",
    role: "moves to a commanded angle with its own internal loop", roleDe: "fährt auf einen befohlenen Winkel mit eigener interner Regelung",
    hook: "A motor, gears, a potentiometer and a tiny controller in one box: you say *go to 90°*, it handles the how. A complete closed loop for pocket money — you just can't see inside.",
    esel: "Motor, Getriebe, Poti und Mini-Regler in einer Box: Du sagst *auf 90°*, er regelt das Wie. Ein kompletter Regelkreis für Taschengeld — nur hineinschauen kannst du nicht." },
  { id: "smart-servo", glyph: "🔗", name: "smart bus servo", nameDe: "Bus-Servo", kind: "actuator",
    role: "daisy-chains on one cable and reports position and load back", roleDe: "hängt in Reihe an einem Kabel und meldet Position und Last zurück",
    hook: "The hobby servo that learned to *talk back*: chained on one bus, each has an address and answers with its true angle, speed and current. Modern low-cost robot arms are strings of these.",
    esel: "Das Modellbauservo, das *antworten* gelernt hat: in Reihe am Bus, jedes mit Adresse, meldet wahren Winkel, Tempo und Strom. Moderne Low-Cost-Roboterarme sind Ketten davon." },
  { id: "stepper", glyph: "🪜", name: "stepper motor", nameDe: "Schrittmotor", kind: "actuator",
    role: "rotates in exact counted steps, no sensor needed", roleDe: "dreht in exakt gezählten Schritten, ganz ohne Sensor",
    hook: "Moves in *clicks you can count* — 200 steps per turn — so position is free… until you overload it and it skips steps *silently*. It never admits what it missed.",
    esel: "Bewegt sich in *zählbaren Klicks* — 200 Schritte pro Umdrehung — Position gratis… bis er überlastet *lautlos* Schritte verliert. Zugeben wird er es nie." },
  { id: "brushless", glyph: "🚁", name: "brushless motor", nameDe: "Brushless-Motor", kind: "actuator",
    role: "spins by electronic commutation — power-dense, needs a driver", roleDe: "dreht per elektronischer Kommutierung — leistungsdicht, braucht einen Regler",
    hook: "Ditch the brushes and let electronics do the switching: more power per gram, no sparks, no wear — but it *cannot even twitch* without its electronic speed controller. Every drone hums with these.",
    esel: "Weg mit den Bürsten, die Elektronik schaltet: mehr Leistung pro Gramm, kein Funken, kein Verschleiß — aber ohne seinen Regler *zuckt er nicht einmal*. Jede Drohne summt damit." },
  { id: "solenoid", glyph: "🧲", name: "solenoid", nameDe: "Hubmagnet", kind: "actuator",
    role: "yanks a plunger with a coil — push or pull, on or off", roleDe: "reißt mit einer Spule an einem Anker — drücken oder ziehen, an oder aus",
    hook: "The one-trick actuator: energise the coil, the plunger *snaps* — door latches, valves, pinball flippers. No speeds, no angles, just now.",
    esel: "Der Ein-Trick-Aktor: Spule bestromen, der Anker *schnappt* — Türriegel, Ventile, Flipperfinger. Keine Tempi, keine Winkel, nur jetzt." },

  /* ---- drive & power: feeding the muscle ---- */
  { id: "h-bridge", glyph: "♃", name: "H-bridge", nameDe: "H-Brücke", kind: "driver",
    role: "lets one motor run both ways through four switches", roleDe: "lässt einen Motor über vier Schalter in beide Richtungen laufen",
    hook: "Draw four switches around a motor and the circuit spells a letter *H*. Close one diagonal: forward. The other: reverse. Both on one side: smoke — which is why driver chips exist.",
    esel: "Zeichne vier Schalter um einen Motor, und die Schaltung buchstabiert ein *H*. Eine Diagonale schließen: vorwärts. Die andere: rückwärts. Beide auf einer Seite: Rauch — darum gibt es Treiber-Chips." },
  { id: "esc", glyph: "🎚️", name: "ESC (speed controller)", nameDe: "Fahrtregler (ESC)", kind: "driver",
    role: "does a brushless motor's electronic commutation", roleDe: "übernimmt die elektronische Kommutierung des Brushless-Motors",
    hook: "The brushless motor's *dance caller*: it watches the rotor and fires the three coils in exactly the rhythm that keeps it spinning. Motor and ESC are a couple — never sold apart for long.",
    esel: "Der *Taktgeber* des Brushless-Motors: Er beobachtet den Rotor und feuert die drei Spulen genau im Rhythmus, der ihn am Drehen hält. Motor und Regler sind ein Paar." },
  { id: "regulator", glyph: "🚰", name: "voltage regulator", nameDe: "Spannungsregler", kind: "driver",
    role: "turns messy battery volts into clean logic volts", roleDe: "macht aus wackligen Akku-Volt saubere Logik-Volt",
    hook: "The battery sags and spikes as motors gulp; the regulator holds the brain's rail *flat*. When your robot resets the moment a motor stalls, this is the seam that tore.",
    esel: "Der Akku sackt und zackt, wenn Motoren schlucken; der Regler hält die Schiene des Gehirns *glatt*. Wenn dein Roboter beim Blockieren neu startet, ist hier die Naht gerissen." },
  { id: "lipo", glyph: "🔋", name: "LiPo battery", nameDe: "LiPo-Akku", kind: "driver",
    role: "stores dense, punchy power in cells of 3.7 volts", roleDe: "speichert dichte, kräftige Energie in Zellen zu 3,7 Volt",
    hook: "Counted in cells: *3.7 V each*, so 2S ≈ 7.4, 3S ≈ 11.1. Delivers savage current without blinking — the same trait that makes it the one part you never charge unattended.",
    esel: "Gezählt in Zellen: *3,7 V pro Stück*, also 2S ≈ 7,4, 3S ≈ 11,1. Liefert brachiale Ströme ohne Zucken — dieselbe Eigenschaft, wegen der man ihn nie unbeaufsichtigt lädt." },
  { id: "relay", glyph: "🪝", name: "relay", nameDe: "Relais", kind: "driver",
    role: "lets a small current click a switch for a big one", roleDe: "lässt einen kleinen Strom einen Schalter für einen großen klicken",
    hook: "An electromagnet pulls a real metal switch shut — you can *hear the click*. A microcontroller's milliamps commanding a pump's amps, with an audible handshake.",
    esel: "Ein Elektromagnet zieht einen echten Metallschalter zu — du kannst das *Klicken hören*. Die Milliampere des Controllers befehligen die Ampere der Pumpe, mit hörbarem Handschlag." },

  /* ---- brains & wiring: closing the loop ---- */
  { id: "microcontroller", glyph: "🧠", name: "microcontroller", nameDe: "Mikrocontroller", kind: "brain",
    role: "runs the control loop in real time, every millisecond", roleDe: "fährt die Regelschleife in Echtzeit, jede Millisekunde",
    hook: "A whole computer for a coffee's price that does *one thing on time*, forever: read sensors, compute, drive motors, repeat. Robots trust it precisely because it can't get distracted.",
    esel: "Ein ganzer Computer zum Kaffeepreis, der *eine Sache pünktlich* tut, für immer: Sensoren lesen, rechnen, Motoren stellen, wiederholen. Roboter vertrauen ihm, gerade weil er sich nicht ablenken lässt." },
  { id: "sbc", glyph: "🖥️", name: "single-board computer", nameDe: "Einplatinencomputer", kind: "brain",
    role: "serves as the Linux brain for maps, vision and planning", roleDe: "dient als Linux-Gehirn für Karten, Sehen und Planung",
    hook: "Where the *thinking* lives: maps, camera pipelines, path planning. Real robots pair it with a microcontroller — the philosopher upstairs, the metronome downstairs.",
    esel: "Hier wohnt das *Denken*: Karten, Kamera-Pipelines, Pfadplanung. Echte Roboter paaren ihn mit einem Mikrocontroller — der Philosoph oben, das Metronom unten." },
  { id: "radio", glyph: "📶", name: "radio link", nameDe: "Funkmodul", kind: "brain",
    role: "links the robot wirelessly — the tether no one trips over", roleDe: "verbindet den Roboter drahtlos — die Leine, über die niemand stolpert",
    hook: "Telemetry out, commands in, no cable to snag in the wheels. Rule of thumb: the radio is for *watching and asking* — the control loop itself stays on board, where the latency is zero.",
    esel: "Telemetrie raus, Befehle rein, kein Kabel in den Rädern. Faustregel: Funk ist zum *Zuschauen und Bitten* — die Regelschleife bleibt an Bord, wo die Latenz null ist." },
  { id: "bus", glyph: "🚌", name: "data bus (I2C/SPI/CAN)", nameDe: "Datenbus (I2C/SPI/CAN)", kind: "brain",
    role: "defines the wiring agreement parts use to talk", roleDe: "legt die Verdrahtungs-Abmachung fest, über die Teile reden",
    hook: "Not a part but a *treaty*: who talks when, on which wires. I2C for slow chatty sensors on two lines, SPI for fast ones, CAN when the wiring must survive a car.",
    esel: "Kein Teil, sondern ein *Vertrag*: wer wann spricht, auf welchen Drähten. I2C für langsame gesprächige Sensoren auf zwei Leitungen, SPI für schnelle, CAN, wenn die Verkabelung ein Auto überleben muss." },

  /* ---- mechanisms: the body ---- */
  { id: "gearbox", glyph: "⚙️", name: "gearbox", nameDe: "Getriebe", kind: "mechanism",
    role: "trades speed for torque at a fixed ratio", roleDe: "tauscht Tempo gegen Drehmoment im festen Verhältnis",
    hook: "The mechanical *currency exchange*: 10 turns in, 1 turn out, tenfold torque — same power, new denomination. Nearly every motor on the bench is secretly motor-plus-gearbox.",
    esel: "Die mechanische *Wechselstube*: 10 Umdrehungen rein, 1 raus, zehnfaches Moment — gleiche Leistung, neue Stückelung. Fast jeder Motor der Bank ist heimlich Motor plus Getriebe." },
  { id: "belt", glyph: "➰", name: "belt drive", nameDe: "Riementrieb", kind: "mechanism",
    role: "moves rotation across a distance, quietly", roleDe: "überträgt Drehung über Distanz, und zwar leise",
    hook: "Teeth on rubber instead of teeth on steel: put the heavy motor *where you want it* and send the motion over. Quiet, forgiving, and it snaps before your gearbox does — a feature.",
    esel: "Zähne auf Gummi statt Zähne auf Stahl: Der schwere Motor sitzt, *wo du ihn willst*, die Bewegung reist hinüber. Leise, gutmütig — und er reißt, bevor dein Getriebe bricht: ein Feature." },
  { id: "bearing", glyph: "⭕", name: "ball bearing", nameDe: "Kugellager", kind: "mechanism",
    role: "lets shafts spin without scraping", roleDe: "lässt Wellen drehen, ohne zu schleifen",
    hook: "A ring of balls so surfaces *roll instead of rub*. The part nobody notices until it's missing — then every joint groans and your motors spend their torque on friction.",
    esel: "Ein Ring aus Kugeln, damit Flächen *rollen statt reiben*. Das Teil, das niemand bemerkt, bis es fehlt — dann ächzt jedes Gelenk, und deine Motoren verheizen ihr Moment in Reibung." },
  { id: "gripper", glyph: "🦾", name: "gripper", nameDe: "Greifer", kind: "mechanism",
    role: "closes fingers on the world — the robot's hand", roleDe: "schließt Finger um die Welt — die Hand des Roboters",
    hook: "The last centimetre of every manipulation problem. The secret is *compliance*: soft, slightly flexible fingers forgive a bad grasp that rigid ones would fumble — Unit 4 makes this quantitative.",
    esel: "Der letzte Zentimeter jedes Greifproblems. Das Geheimnis heißt *Nachgiebigkeit*: Weiche, leicht flexible Finger verzeihen den schiefen Griff, den starre vermasseln — Einheit 4 macht das messbar." },
  { id: "chassis", glyph: "🛹", name: "chassis", nameDe: "Chassis", kind: "mechanism",
    role: "provides the frame everything else bolts to", roleDe: "stellt den Rahmen, an den alles andere geschraubt wird",
    hook: "The robot's *skeleton* — and its most underrated sensor precondition: a flexing chassis shakes the IMU, twists the encoders and turns clean control into mush. Stiffness is a signal-quality feature.",
    esel: "Das *Skelett* des Roboters — und die unterschätzte Voraussetzung guter Sensorik: Ein flexendes Chassis schüttelt die IMU, verwindet die Encoder und macht aus sauberer Regelung Brei. Steifigkeit ist Signalqualität." },
  { id: "caster", glyph: "🛞", name: "caster wheel", nameDe: "Stützrad", kind: "mechanism",
    role: "trails freely as the third wheel so two driven ones can steer", roleDe: "läuft frei als drittes Rad mit, damit zwei angetriebene lenken können",
    hook: "The shopping-trolley wheel: it *follows, never argues*. Two driven wheels plus one caster is the classic beginner robot — spin the pair at different speeds and the caster lets you turn on a coin.",
    esel: "Das Einkaufswagen-Rad: Es *folgt und widerspricht nie*. Zwei Antriebsräder plus ein Stützrad ist der Klassiker — dreh das Paar verschieden schnell, und das Stützrad lässt dich auf dem Teller wenden." },
];

export const PART_BY_ID: Record<string, PartEntry> = Object.fromEntries(PART_ENTRIES.map((e) => [e.id, e]));

export const KIND_ORDER: PartKind[] = ["sensor", "actuator", "driver", "brain", "mechanism"];

export const KIND_VAR: Record<PartKind, string> = {
  sensor: "--pb-sensor",
  actuator: "--pb-actuator",
  driver: "--pb-driver",
  brain: "--pb-brain",
  mechanism: "--pb-mechanism",
};

export function kindVar(kind: PartKind): string {
  return `var(${KIND_VAR[kind]})`;
}
