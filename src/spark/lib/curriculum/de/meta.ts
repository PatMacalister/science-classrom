/**
 * German metadata for the whole curriculum: unit titles/blurbs and lesson
 * titles/subtitles. Full lesson bodies (theory, quizzes, lab intros) live in
 * per-unit content files (./unit0.tsx, …) and are added incrementally.
 */

export const unitMetaDe: Record<string, { title: string; blurb: string }> = {
  u0: {
    title: "Die Physik der Elektrizität",
    blurb: "Woher Ladung kommt, was Spannung wirklich ist und was es heißt, dass Strom fließt — das Fundament, auf dem alles andere steht.",
  },
  u1: {
    title: "Stromkreise & das Ohmsche Gesetz",
    blurb: "Geschlossene Schleifen, das Gesetz, das sie regiert, und die Bauteile, die Elektrizität arbeiten lassen.",
  },
  u2: {
    title: "Schaltungen analysieren",
    blurb: "Die Erhaltungssätze, die jede Schaltung knacken, der Spannungsteiler-Trick fürs ganze Leben und die Bauteile, die die Zeit verbiegen.",
  },
  u3: {
    title: "Halbleiter",
    blurb: "Einweg-Ventile, winzige Verstärker und der legendäre Chip, der den ganzen Kurs zusammenführt.",
  },
  u4: {
    title: "Das Abschlussprojekt",
    blurb: "Raus aus dem Simulator: Kauf eine Handvoll Bauteile, verdrahte einen echten 555-Astablen auf dem Breadboard und sieh deine eigene LED blinken.",
  },
  u5: {
    title: "Wechselstrom & Signale",
    blurb: "Der Aufbaukurs beginnt: Spannungen, die wackeln. Sinuswellen, AC zu DC, und Filter, die manche Frequenzen hören und andere nicht.",
  },
  u6: {
    title: "Operationsverstärker & Rückkopplung",
    blurb: "Ein absurd starker Verstärker, gezähmt von zwei Widerständen — und die Rückkopplungsidee, die still das ganze Ingenieurwesen regiert.",
  },
  u7: {
    title: "Digitallogik",
    blurb: "Spannungen werden 0en und 1en, Gatter werden Arithmetik, Rückkopplung wird Gedächtnis — die Treppe vom Transistor zum Computer.",
  },
  u8: {
    title: "Das Aufbau-Abschlussprojekt",
    blurb: "Zurück ans Breadboard: Mach aus deinem Blinker einen PWM-Dimmer mit echtem Drehknopf — die Technik hinter jedem LED-Streifen, Motorregler und Class-D-Verstärker.",
  },
  u9: {
    title: "Resonanz & Radio",
    blurb: "Der Expertenkurs beginnt: L und C zusammen lassen Schaltungen wie Glocken klingen — und wer im richtigen Ton klingt, fischt eine Stimme aus der vollen Luft.",
  },
  u10: {
    title: "Leistungselektronik",
    blurb: "Echte Schaltungen brauchen saubere, exakte Versorgungsspannungen. Zwei Wege dorthin: die elegante Heizung und der Schalttrick, der die moderne Welt betreibt.",
  },
  u11: {
    title: "Mikrocontroller",
    blurb: "Einheit 7, industrialisiert: ein ganzer Computer auf einem 4-Dollar-Chip, mit Beinen, die deine Schaltungen berühren. Hardware wird editierbar.",
  },
  u12: {
    title: "Das Experten-Abschlussprojekt",
    blurb: "Überschreite die letzte Schwelle: Verdrahte Sensoren mit einem 5-Dollar-Computer und schreibe die Firmware selbst. Ein automatisches Nachtlicht — dein Einstieg in die programmierbare Welt.",
  },
  u13: {
    title: "Signale & Abtastung",
    blurb: "Der Meisterkurs beginnt: Wie die analoge Welt die Reise in Zahlen übersteht — und die zwei großen Ideen (Nyquist und Fourier), von denen jeder Signal-Ingenieur lebt.",
  },
  u14: {
    title: "Regelungstechnik",
    blurb: "Rückkopplung wird erwachsen: nicht nur Op-Amp-Verstärkung festhalten, sondern Öfen, Drohnen und Raketen steuern — und der Drei-Buchstaben-Algorithmus, der die Industrie regiert.",
  },
  u15: {
    title: "Die Kunst echter Schaltungen",
    blurb: "Ideale Bauteile gibt es nur in Simulatoren — auch in diesem. Meistere die zwei Fähigkeiten, die Bastler von Ingenieuren trennen: für die Toleranzwolke entwerfen und Fehler jagen wie ein Profi.",
  },
  u16: {
    title: "Das Meister-Abschlussprojekt",
    blurb: "33 Lektionen lang hast du simulierten Oszilloskopen zugesehen. Jetzt baue das echte Instrument — und richte es auf alles, was du gebaut hast.",
  },
  u17: {
    title: "Von Gattern zur CPU",
    blurb: "Der digitale Faden, zu Ende gesponnen: Register werden eine ALU, die ALU trifft Speicher, und am Ende laufen Programme auf einem Computer, den du Draht für Draht verstehst.",
  },
  u18: {
    title: "Software Defined Radio",
    blurb: "Einheit 9 endete, wo die 1920er endeten. Nimm den Faden auf mit Mischer, I/Q-Trick und digitaler Modulation — dann richte einen 30-Dollar-Empfänger auf den Himmel und sieh jedes Signal deiner Stadt.",
  },
  u19: {
    title: "Motoren & Bewegung",
    blurb: "Der Weg zur Robotik: Lass Elektrizität schieben, drehen, zielen und wissen, wo sie ist — dann schraub alles auf ein Fahrgestell, das einer Linie über deinen Boden nachjagt.",
  },
  u20: {
    title: "Vom Breadboard zur Platine",
    blurb: "Die letzte physische Schwelle: Verwandle deinen Blinker in eine echte, gefertigte Leiterplatte — von dir entworfen, für Taschengeld gefertigt, an deinem eigenen Lötplatz bestückt.",
  },
};

export const lessonMetaDe: Record<string, { title: string; subtitle: string }> = {
  /* Unit 0 */
  charge: {
    title: "Elektrische Ladung & das Atom",
    subtitle: "Alles Elektrische beginnt mit einer Eigenschaft der Materie, die so fundamental ist, dass wir nur beschreiben können, was sie tut: Ladung.",
  },
  voltage: {
    title: "Spannung: Energie pro Ladung",
    subtitle: "Ladungen zu trennen speichert Energie, wie das Heben eines Gewichts. Spannung misst, wie viel Energie jedes Coulomb bekommt.",
  },
  current: {
    title: "Strom: Ladung in Bewegung",
    subtitle: "Gib Ladungen einen Schubs und einen Weg, und sie fließen. Strom misst, wie viel Ladung pro Sekunde vorbeiströmt.",
  },
  /* Unit 1 */
  "first-circuit": {
    title: "Dein erster Stromkreis",
    subtitle: "Eine Batterie, eine Lampe und eine Drahtschleife — plus die zwei klassischen Arten, es falsch zu machen.",
  },
  "ohms-law": {
    title: "Das Ohmsche Gesetz",
    subtitle: "Die nützlichste Gleichung der Elektronik: wie Spannung, Strom und Widerstand einander binden.",
  },
  resistors: {
    title: "Widerstände in der Praxis",
    subtitle: "Der bescheidene gestreifte Zylinder: warum Schaltungen voll davon sind und wie du den Farbcode auf einen Blick liest.",
  },
  power: {
    title: "Leistung & Energie",
    subtitle: "Watt, Joule, Kilowattstunden — wohin die Energie geht, wie schnell sie geht und warum Bauteile Belastungsgrenzen haben.",
  },
  "series-parallel": {
    title: "Reihe & Parallel",
    subtitle: "Die zwei Arten, irgendetwas zu verdrahten — und die Regeln, mit denen du ein Netzwerk auf eine Zahl eindampfst.",
  },
  /* Unit 2 */
  kirchhoff: {
    title: "Die Kirchhoffschen Gesetze",
    subtitle: "Zwei Sätze purer gesunder Menschenverstand — Ladung verschwindet nicht, Energie entsteht nicht — die jede je gebaute Schaltung aufschließen.",
  },
  "voltage-divider": {
    title: "Spannungsteiler",
    subtitle: "Zwei Widerstände, die jede Spannung in jede kleinere verwandeln — das meistwiederverwendete Muster der Elektronik.",
  },
  capacitors: {
    title: "Kondensatoren & die RC-Zeitkonstante",
    subtitle: "Ein Bauteil, das Ladung speichert und, mit einem Widerstand gepaart, die Zeit misst. Diese Lektion ist der Herzschlag deines Abschlussprojekts.",
  },
  inductors: {
    title: "Spulen & Elektromagnetismus",
    subtitle: "Spulen speichern Energie in Magnetfeldern, hassen Stromänderungen und beißen, wenn man sie unterbricht. Außerdem: wie Motoren entstehen.",
  },
  /* Unit 3 */
  diodes: {
    title: "Dioden & LEDs",
    subtitle: "Das Einwegventil der Elektronik — und sein leuchtender Cousin, den du niemals ohne Widerstand anschließen darfst.",
  },
  transistors: {
    title: "Transistoren",
    subtitle: "Ein Flüstern von Strom steuert ein Brüllen — der verstärkende Schalter, der jede moderne Maschine möglich macht.",
  },
  "timer-555": {
    title: "Der 555-Timer",
    subtitle: "25 Transistoren, acht Pins, fünfzig Jahre Blinken, Piepen und Takten — der Chip, mit dem du bauen wirst.",
  },
  /* Unit 4 */
  capstone: {
    title: "Bau den Blinker",
    subtitle: "Ein echter 555-LED-Blinker auf dem Breadboard — jedes Bauteil gewählt mit der Theorie, die dir jetzt gehört.",
  },
  /* Unit 5 */
  "ac-waveforms": {
    title: "Wechselstrom",
    subtitle: "Bisher schob alles in eine Richtung. Netz, Audio und Funk wackeln — lerne die Sinuswelle und ihren ehrlichen Mittelwert RMS kennen.",
  },
  rectifiers: {
    title: "Gleichrichter: AC → DC",
    subtitle: "Deine Geräte laufen mit Gleichstrom, die Steckdose liefert Wechselstrom. Dioden zur Rettung — diese Lektion ist das Innere jedes Ladegeräts.",
  },
  filters: {
    title: "Impedanz & RC-Filter",
    subtitle: "Ein Kondensator ist ein Widerstand, dessen Wert von der Frequenz abhängt. Mit einem echten Widerstand gepaart wählst du, welche Frequenzen überleben.",
  },
  /* Unit 6 */
  "op-amps": {
    title: "Der Operationsverstärker",
    subtitle: "Zwei Eingänge, absurde Verstärkung, eine Regel. Roh verwendet ist ein Op-Amp ein Komparator — die Ja/Nein-Maschine der analogen Welt.",
  },
  feedback: {
    title: "Verstärker mit Gegenkopplung",
    subtitle: "Führe ein wenig Ausgang zum invertierenden Eingang zurück, und aus unendlicher, schlampiger Verstärkung wird exakte, widerstandsprogrammierte.",
  },
  /* Unit 7 */
  "binary-gates": {
    title: "Binär & Logikgatter",
    subtitle: "Wirf die Zwischenspannungen weg und behalte nur AN und AUS — plötzlich können Schaltungen schlussfolgern.",
  },
  adders: {
    title: "Addieren mit Gattern",
    subtitle: "XOR macht die Summe, AND den Übertrag, und eine Kette davon ist das arithmetische Herz jedes Prozessors.",
  },
  "flip-flops": {
    title: "Speicher & Zähler",
    subtitle: "Kreuze zwei Gatter, und die Schaltung erinnert sich. Takte sie, kette sie — und du hast einen Zähler gebaut und die Idee hinter RAM getroffen.",
  },
  /* Unit 8 */
  "pwm-dimmer": {
    title: "Bau den PWM-Dimmer",
    subtitle: "Ein 555, ein Potentiometer und zwei Lenkdioden: stufenlose 0–100 % LED-Helligkeit per Drehknopf, bei einer Frequenz, die dein Auge nicht sieht.",
  },
  /* Unit 9 */
  "lc-resonance": {
    title: "LC-Resonanz",
    subtitle: "Kondensator und Spule tauschen Energie hin und her wie ein Pendel — der Eigenton jeder Schaltung.",
  },
  "radio-tuning": {
    title: "Abstimmen: einen Sender wählen",
    subtitle: "Jeder Sender deiner Stadt erreicht deine Antenne gleichzeitig. Ein Drehkondensator und eine Spule sortieren sie.",
  },
  "am-radio": {
    title: "AM & der Hüllkurvendetektor",
    subtitle: "Wie Musik auf einer Megahertz-Welle reitet — und wie eine Diode und ein RC-Glied, deine ältesten Freunde, sie wieder herunterholen.",
  },
  /* Unit 10 */
  "linear-regulators": {
    title: "Linearregler",
    subtitle: "Ein Transistor, von Rückkopplung gedrosselt, hält den Ausgang auf exakt 5 V — und bezahlt die Präzision mit Wärme.",
  },
  "switching-converters": {
    title: "Der Abwärtswandler",
    subtitle: "Zerhacke den Eingang mit PWM, glätte mit L und C, behalte nur den Mittelwert — 95 % Wirkungsgrad aus Teilen, die dir schon gehören.",
  },
  /* Unit 11 */
  microcontrollers: {
    title: "Hallo, Mikrocontroller",
    subtitle: "CPU, Speicher und Peripherie auf einem Chip — und dein Blinker, neu geschrieben als fünf Zeilen, die du in Sekunden änderst.",
  },
  "adc-sensors": {
    title: "Die analoge Welt lesen",
    subtitle: "Der ADC verwandelt Spannungen in Zahlen, über die dein Code nachdenken kann — Spannungsteiler und Schmitt-Trigger kommen mit.",
  },
  /* Unit 12 */
  "night-light": {
    title: "Programmiere das Nachtlicht",
    subtitle: "Ein Raspberry Pi Pico, ein Lichtsensor und zwei Dutzend Zeilen MicroPython: eine Lampe, die selbst entscheidet — jede Schwelle unter deiner Kontrolle.",
  },
  /* Unit 13 */
  sampling: {
    title: "Abtastung & Aliasing",
    subtitle: "Dein ADC macht Schnappschüsse. Machst du sie zu langsam, wird das Signal nicht unscharf — es lügt, selbstbewusst, über seine eigene Frequenz.",
  },
  spectrum: {
    title: "Fourier: in Frequenzen denken",
    subtitle: "Jede periodische Welle ist heimlich ein Akkord reiner Sinusse. Lies das Rezept, und das halbe Ingenieurwesen wird lesbar.",
  },
  "digital-filters": {
    title: "Filter in Software",
    subtitle: "Eine Zeile Arithmetik — y += α(x − y) — und der RC-Filter, den du aus Bauteilen gebaut hast, wird als Code wiedergeboren.",
  },
  /* Unit 14 */
  "feedback-control": {
    title: "Den Regelkreis schließen",
    subtitle: "Messen, vergleichen, korrigieren, wiederholen. P-Regelung ist die naheliegende erste Idee — und scheitert auf zwei wunderbar lehrreiche Arten.",
  },
  pid: {
    title: "PID-Regelung",
    subtitle: "Ergänze einen Term, der sich erinnert, und einen, der vorausschaut — und der störrische Heizer wird gehorsam. Der Algorithmus, der die Industrie betreibt.",
  },
  /* Unit 15 */
  "real-components": {
    title: "Nichts ist ideal",
    subtitle: "Jedes gekaufte Bauteil ist eine Wolke von Möglichkeiten, keine Zahl. Entwirf für die Wolke — oder lass dich von der Produktion überraschen.",
  },
  debugging: {
    title: "Die Debugging-Denkweise",
    subtitle: "Schaltungen gehen kaputt — deine, alle, für immer. Der Vorsprung des Meisters ist nicht, Fehler zu vermeiden, sondern sie mit wenigen Messungen zu stellen.",
  },
  /* Unit 16 */
  oscilloscope: {
    title: "Bau dein eigenes Oszilloskop",
    subtitle: "Ein Pico, ein Teiler-Tastkopf und zwei kurze Programme werden ein funktionierendes Oszilloskop — dann werden Blinker, Dimmer und Nachtlicht seine ersten Messobjekte.",
  },
  /* Unit 17 */
  "registers-alu": {
    title: "Register & die ALU",
    subtitle: "Schraube einen Subtrahierer an deinen Addierer, bring ihm AND und OR bei, ergänze tratschende Flags — fertig ist das Rechenherz der CPU.",
  },
  "memory-bus": {
    title: "Speicher & der Bus",
    subtitle: "RAM ist eine Wand nummerierter Fächer; der Bus ist der Korridor. Jedes Byte deines Computers macht diese Reise.",
  },
  "instruction-set": {
    title: "Fetch, Decode, Execute",
    subtitle: "Gib der Maschine zehn Vokabeln und einen Drei-Schritte-Herzschlag, und Zahlen im Speicher werden Verhalten.",
  },
  "build-cpu": {
    title: "Abschluss: Deine CPU läuft",
    subtitle: "Sechzehn Speicherzellen, ein Akkumulator, zehn Opcodes — und Programme, die addieren, entscheiden, schleifen und überlaufen. Ein Computer, und du kennst jeden Draht.",
  },
  /* Unit 18 */
  mixers: {
    title: "Mischer & der Superhet",
    subtitle: "Multipliziere zwei Signale, und Frequenzen wandern. Ein Oszillatorknopf plus ein fester Filter — die Architektur jedes Radios seit 1918.",
  },
  "iq-signals": {
    title: "I/Q: das Signal als Pfeil",
    subtitle: "Taste mit zwei ADCs im Viertelzyklus-Abstand ab, und du erfasst nicht nur wie stark ein Signal ist, sondern wohin es zeigt.",
  },
  "digital-modulation": {
    title: "Bits über die Luft",
    subtitle: "Parke den Pfeil auf vereinbarten Positionen, und jede Position buchstabiert Bits. Willkommen bei Konstellationen — der Sprache von WLAN und 5G.",
  },
  "rtl-sdr": {
    title: "Abschluss: Hör das Spektrum",
    subtitle: "Ein 30-Dollar-Stick macht deinen Laptop zum Breitbandempfänger. UKW, Flugfunk, dein Autoschlüssel — die unsichtbare Stadt auf einem lesbaren Wasserfall.",
  },
  /* Unit 19 */
  "h-bridge": {
    title: "DC-Motoren & die H-Brücke",
    subtitle: "Ein Motor ist eine Spule, die zurückschiebt. Vier Schalter drumherum geben dir vorwärts, rückwärts, Bremse — und einen katastrophalen Fehlgriff.",
  },
  "servos-steppers": {
    title: "Servos & Schrittmotoren",
    subtitle: "Zwei Wege, Position zu befehlen: ein Regelkreis in der 3-Dollar-Dose oder ein Motor, der in zählbaren Klicks läuft.",
  },
  encoders: {
    title: "Encoder: Wissen, wo man ist",
    subtitle: "Zwei Lichtsensoren und eine Schlitzscheibe geben einer Maschine Odometrie — und der Viertelschlitz-Versatz kodiert die Richtung.",
  },
  "line-follower": {
    title: "Abschluss: Bau den Linienfolger",
    subtitle: "Fahrgestell, zwei Motoren, zwei Augen, ein PID — ein Roboter, der schwarzem Klebeband über deinen Boden nachjagt, von dir abgestimmt und verstanden.",
  },
  /* Unit 20 */
  "pcb-anatomy": {
    title: "Was eine Platine wirklich ist",
    subtitle: "Eine Leiterplatte ist die Verdrahtung deines Breadboards, eingefroren in ein Kupfer-Glasfaser-Sandwich. Lerne, die Lagen zu lesen.",
  },
  "pcb-routing": {
    title: "Vom Schaltplan zur gerouteten Platine",
    subtitle: "Der Entwurfsablauf: Schaltung zeichnen, Bauteile platzieren, dann das Gummiband-Gewirr in sauberes Kupfer verwandeln — von Hand, auf zwei Etagen.",
  },
  "pcb-layout-rules": {
    title: "Layoutregeln & Design-Review",
    subtitle: "Breite für Strom, Abstand für Sicherheit, Abblockung ganz nah dran — und der automatische Inspektor, der alles prüft, bevor es die Fabrik tut.",
  },
  "pcb-blinker": {
    title: "Abschluss: Fertige den Blinker",
    subtitle: "Entwirf die Platine in KiCad, bestelle fünf Exemplare für Taschengeld und lerne Löten an Hardware, die du selbst entworfen hast. Breadboard → Produkt.",
  },
};
