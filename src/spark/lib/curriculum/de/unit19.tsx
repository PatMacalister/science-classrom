import type { LessonContentDe } from "../localize";
import { ROBOT_CODE } from "../unit19";

/** Full German content for Unit 19 (robotics branch: h-bridge, servos-steppers, encoders, line-follower). */

export const unit19De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "h-bridge": {
    Theory: () => (
      <>
        <h2>Der Motor, mit deinen Augen gesehen</h2>
        <p>
          Ein Bürsten-Gleichstrommotor ist Lektion 2.4 mit Muskeln: Strom durch Spulen im
          Magnetfeld erzeugt Kraft; ein Kommutator dreht den Strom jede halbe Umdrehung um,
          damit der Schub nie aufhört. Und weil er eine Spule <em>ist</em>, gilt alles, was du
          weißt: Er wehrt sich gegen Stromänderungen, er <strong>tritt zurück</strong>, wenn
          man ihn abschaltet (Freilaufdioden sind nicht verhandelbar), und — der elegante Teil
          — gedreht <em>erzeugt</em> er Spannung (Induktion aus 2.4). Diese{" "}
          <strong>Gegen-EMK</strong> wächst mit der Drehzahl und wirkt der Versorgung
          entgegen, weshalb ein unbelasteter Motor sich bei der Drehzahl einpendelt, wo die
          Gegen-EMK die angelegte Spannung fast erreicht: <strong>Spannung setzt
          Drehzahl</strong>. Belaste ihn, und er wird langsamer, die Gegen-EMK sinkt, mehr
          Strom fließt: <strong>Strom ist Drehmoment</strong>. Zwei Sätze, eine ganze
          Disziplin.
        </p>

        <h2>Richtung braucht vier Schalter</h2>
        <p>
          Ein Transistor (3.2) schaltet einen Motor ein. Ihn umzukehren heißt, den Strom zu
          drehen, und dafür braucht es die klassische <strong>H-Brücke</strong>: Der Motor ist
          der Querbalken, zwei Schalter oben, zwei unten.
        </p>
        <div className="formula">
          Q1+Q4 → forward · Q2+Q3 → reverse · Q2+Q4 → brake · all off → coast
          <span className="note">vorwärts · rückwärts · bremsen · rollen — die Drehzahl kommt vom PWM auf dem aktiven Paar: der Tastgrad aus Einheit 8, jetzt mit Drehmoment</span>
        </div>
        <p>
          Das Bremsen verdient eine Pause: Den drehenden Motor über die unteren Schalter
          kurzzuschließen lässt seine eigene Gegen-EMK Strom gegen die Bewegung treiben — der
          Motor wird ein Generator, der gegen sich selbst kämpft. Die Rekuperation von
          Elektroautos ist exakt dieser Zug, nur wird die Energie eingefangen statt verheizt.
          Und der verbotene Zustand: Beide Schalter <em>einer Seite</em> an ist ein satter
          Kurzschluss über der Batterie — <strong>Shoot-Through</strong> (Brückenkurzschluss)
          — weshalb echte Treiberchips (wie der DRV8833 in deinem Abschlussprojekt)
          Hardware-Verriegelungen und Totzeit ergänzen.
        </p>
        <div className="callout note">
          <span className="co-title">Warum ein Treiberchip und nicht vier Transistoren?</span>
          <p>
            Du könntest eine H-Brücke aus den Teilen von 3.2 bauen — Leute tun das, einmal,
            der Narben wegen. Ein 3-$-Treiberchip bringt Shoot-Through-Schutz, Freilaufdioden,
            Strombegrenzung und PWM-Eingänge mit. Meistere hier das Konzept; kauf die Rüstung
            für den Roboter.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Vier Schalter & der verbotene Zustand",
      intro: (
        <>
          <p>Eine H-Brücke mit klickbaren Schaltern und einem Motor, der gehorcht — oder einer Sicherung, die nicht verzeiht.</p>
          <ul>
            <li>Nutze die Voreinstellungen, dann klick die Schalter manuell und sag den Motor voraus, bevor er sich bewegt.</li>
            <li>Lass ihn vorwärts drehen, dann drück Bremsen — vergleiche mit Rollen. Fühl den Unterschied, den die Rekuperation ausnutzt.</li>
            <li>Schalte Q1 und Q2 zusammen ein. Einmal. 💥 (Und würdige dann die Verriegelungen der Treiberchips.)</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Beim Bürsten-Gleichstrommotor bestimmt vor allem ___ die Drehzahl und ___ das Drehmoment.",
        choices: ["Strom / Spannung", "Spannung / Strom", "Widerstand / Kapazität", "PWM-Frequenz / Tastgrad"],
        answer: 1,
        explain: "Die Gegen-EMK balanciert die angelegte Spannung bei passender Drehzahl aus; der Laststrom durch die Spulen macht das Drehmoment.",
      },
      {
        q: "Um einen Gleichstrommotor umzukehren, tut eine H-Brücke Folgendes:",
        choices: [
          "sie erhöht die Spannung",
          "sie aktiviert das gegenüberliegende Diagonalpaar und dreht so die Stromrichtung durch den Motor",
          "sie polt die Batterie chemisch um",
          "sie benutzt einen größeren Kondensator",
        ],
        answer: 1,
        explain: "Q1+Q4 schickt den Strom in die eine Richtung durch den Querbalken; Q2+Q3 in die andere. Gleiche Batterie, umgekehrte Drehung.",
      },
      {
        q: "„Shoot-Through“ ist…",
        choices: [
          "ein zu schnell drehender Motor",
          "beide Schalter einer Seite leiten gleichzeitig — ein direkter Kurzschluss über der Versorgung",
          "Strom, der durch die Dioden leckt",
          "eine PWM-Art",
        ],
        answer: 1,
        explain: "Die Batterie sieht nur zwei gesättigte Schalter in Reihe — der Kurzschluss aus Lektion 1.1, bei Motorströmen. Treiberchips ergänzen Totzeit, um das zu verhindern.",
      },
      {
        q: "Die Anschlüsse eines drehenden Motors kurzzuschließen (Bremsmodus) stoppt ihn schnell, weil…",
        choices: [
          "es den Strom abschneidet",
          "seine eigene Gegen-EMK Strom treibt, der der Bewegung entgegenwirkt — der Motor generiert gegen sich selbst",
          "die Reibung zunimmt",
          "das Magnetfeld dauerhaft kollabiert",
        ],
        answer: 1,
        explain: "Generatorwirkung, umgedreht. Fang diesen Strom in einer Batterie statt in einem Kurzschluss, und du hast Rekuperation.",
      },
    ],
  },

  /* ================================================================ */
  "servos-steppers": {
    Theory: () => (
      <>
        <h2>Der Modellbau-Servo: Einheit 14 in der Dose</h2>
        <p>
          Öffne einen Modellbau-Servo und grinse: ein kleiner Gleichstrommotor, Getriebe, ein{" "}
          <strong>Potentiometer auf der Ausgangswelle</strong> (2.2 — die Welle dreht
          buchstäblich einen Spannungsteiler, der den eigenen Winkel meldet), und eine kleine
          Platine mit einem <strong>Proportionalregler</strong> (14.1). Du befiehlst ihm mit
          einer Pulsbreite — 1,0 bis 2,0 ms, alle 20 ms wiederholt, dekodiert exakt wie das
          PWM aus Einheit 8 (die übliche Konvention; der genaue Winkelbereich variiert je nach
          Servo) — und der interne Regelkreis treibt den Motor, bis Poti-Spannung und Befehl
          übereinstimmen. Geschlossene Positionsregelung, drei Dollar, keine Montage nötig.
          Roboterarme, RC-Lenkungen, Kamera-Gimbals: Flotten davon.
        </p>

        <h2>Der Schrittmotor: Position durch Zählen</h2>
        <p>
          Ein Schrittmotor verfolgt die Gegenphilosophie: <strong>gar keine Rückführung</strong>.
          Sein Rotor schnappt zu derjenigen Spule, die bestromt ist; pulse die Spulen der
          Reihe nach (A, B, A&rsquo;, B&rsquo; — ein Ringzähler, hallo 7.3), und er rückt in
          präzisen, identischen Schritten vor — typisch 200 pro Umdrehung. Position ist
          schlicht <em>die Zahl der Schritte, die du gesendet hast</em>: offen, deterministisch,
          perfekt wiederholbar… bis du ihn überlastest und er lautlos Schritte überspringt,
          weshalb 3D-Drucker manchmal mitten im Druck Schichten versetzen. Tempo und Laufruhe
          kommen vom schnellen Schritttakt und vom <em>Mikroschritt</em> — zwei Spulen mit
          PWM-geformten Strömen treiben, um den Rotor zwischen den Polen zu parken.
        </p>
        <div className="formula">
          servo: command → compare → correct (closed loop) · stepper: count clicks (open loop)
          <span className="note">Servo: befehlen → vergleichen → korrigieren (geschlossen) · Stepper: Klicks zählen (offen) — dieselbe Unterscheidung wie Toaster vs. Thermostat in 14.1, jetzt in Hardware</span>
        </div>
        <div className="callout tip">
          <span className="co-title">Die Wahl zwischen beiden</span>
          <p>
            Eine Position gegen unvorhersehbare Kräfte halten → Servo (oder Motor + Encoder,
            nächste Lektion). Exakte Bewegungen in einer kontrollierten Maschine wiederholen →
            Schrittmotor. Dein 3D-Drucker nutzt Stepper, weil seine Lasten bekannt sind; ein
            Roboterarm in der unordentlichen Welt will Rückführung.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Befehlen & Gehorchen",
      intro: (
        <>
          <p>Ein Servo, der deiner Pulsbreite nachjagt, und ein Stepper, den du um sein Zifferblatt klicken kannst.</p>
          <ul>
            <li>Fahr den Puls-Regler langsam — das Ruderhorn folgt mit diesem feinen, kontrollierten Nachlauf (der interne P-Kreis).</li>
            <li>Lass den Stepper einzeln schreiten und sieh den Rotor von Spule zu Spule schnappen. Zähl dich zu einer vollen Umdrehung.</li>
            <li>Lass den Stepper automatisch rückwärts laufen — die Spulensequenz kehrt sich einfach um. Ein Zähler zum Anfassen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "In einem Modellbau-Servo findest du Motor, Getriebe, Regler und…",
        choices: [
          "eine Encoderscheibe",
          "ein Potentiometer auf der Ausgangswelle, das ihren Winkel meldet",
          "einen GPS-Empfänger",
          "einen zweiten Motor",
        ],
        answer: 1,
        explain: "Die Welle dreht einen Teiler (2.2); der interne P-Regler (14.1) treibt, bis Meldung und Befehl übereinstimmen.",
      },
      {
        q: "Der befohlene Winkel eines Servos steckt in…",
        choices: [
          "der Versorgungsspannung",
          "der Breite eines wiederholten Pulses (≈1–2 ms alle 20 ms)",
          "der Kabelfarbe",
          "einer I2C-Nachricht",
        ],
        answer: 1,
        explain: "Wieder Pulsbreite — die Idee aus Einheit 8, wiederverwendet als Befehlssprache. 1,5 ms = Mitte.",
      },
      {
        q: "Ein Schrittmotor kennt seine Position, weil…",
        choices: [
          "er einen internen Sensor hat",
          "er sie nicht kennt — der Controller zählt die befohlenen Schritte",
          "er die Gegen-EMK misst",
          "er den Servo fragt",
        ],
        answer: 1,
        explain: "Offener Kreis: Position = Schrittzahl. Deterministisch und billig — bis ein übersprungener Schritt unbemerkt bleibt.",
      },
      {
        q: "Ein 3D-Druck, dessen Schichten nach Stunde drei alle 2 mm seitlich versetzt sind, erlitt höchstwahrscheinlich…",
        choices: [
          "einen Softwarefehler",
          "einen kurz überlasteten Stepper, der Schritte übersprang — der offene Kreis hat es nie bemerkt",
          "Wärmeausdehnung",
          "PWM-Störungen",
        ],
        answer: 1,
        explain: "Das klassische Open-Loop-Versagen: Zählung und Realität wurden uneins, und niemand schaute hin. Encoder (nächste Lektion) sind die Kur.",
      },
    ],
  },

  /* ================================================================ */
  encoders: {
    Theory: () => (
      <>
        <h2>Odometrie von der Schlitzscheibe</h2>
        <p>
          Schraub eine Schlitzscheibe ans Rad und leuchte hindurch auf einen Sensor: Jede
          Schlitzkante ist ein Klick bekannter Distanz. Zähl die Klicks, und du weißt, wie
          weit du gerollt bist — <strong>Odometrie</strong>, der erste Sinn, den jeder mobile
          Roboter entwickelt. Aber ein Sensor hat einen blinden Fleck: Klicks sehen identisch
          aus, ob das Rad vorwärts oder rückwärts rollt.
        </p>

        <h2>Quadratur: der Viertelschlitz-Trick</h2>
        <p>
          Setz einen zweiten Sensor daneben, um einen Viertelschlitz versetzt, und die
          Mehrdeutigkeit stirbt. Die zwei Rechtecksignale — Kanäle <strong>A</strong> und{" "}
          <strong>B</strong> — liegen 90° auseinander (Quadratur, dieselbe
          Viertelperioden-Idee wie I/Q in 18.2!), und <em>welcher führt</em>, verrät die
          Richtung:
        </p>
        <div className="formula">
          on A&apos;s rising edge: B low → one way, B high → the other
          <span className="note">an As steigender Flanke: B tief → die eine Richtung, B hoch → die andere; dekodiert per Flankenerkennung + Flipflop (7.3) — oder vier Zeilen Interrupt-Code</span>
        </div>
        <p>
          Jedes Mausrad, jeder Druckerschlitten und jedes Roboterrad benutzt das. Kombiniere
          Encoder-Rückführung mit dem PID aus 14.2, der die H-Brücke aus 19.1 treibt, und du
          hast ein <strong>Servosystem eigener Bauart</strong> — die Industrieversion des
          kleinen Servopotis, gut für unbegrenzte Rotation und echte Präzision. Dieser
          geschlossene Bewegungskreis — Position messen, vergleichen, treiben — ist das
          schlagende Herz von CNC-Maschinen, Roboterarmen und selbstbalancierenden
          Irgendwassen.
        </p>
        <div className="callout note">
          <span className="co-title">Die übrigen Sinne des Roboters</span>
          <p>
            Odometrie driftet (Räder rutschen), also fusionieren echte Roboter sie mit
            anderen Sinnen: IMUs (Beschleunigungs- + Gyroskop-Chips), Abstandssensoren,
            Kameras. Sensorfusion ist ein reiches Feld — aber jeder Eingang kommt immer noch
            als Spannung in einen ADC (11.2) oder als Bits auf einem Bus (17.2) an. Keine
            neue Physik; nur mehr von dem, was dir gehört.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Viertelschlitz-Trick",
      intro: (
        <>
          <p>Ein Schlitzrad, zwei versetzte Sensoren und ihre Quadratur-Wellenformen, live.</p>
          <ul>
            <li>Dreh vorwärts: A führt B, und der Zähler klettert. Rückwärts: B führt, der Zähler fällt.</li>
            <li>Stopp das Rad mitten im Schlitz — der Zähler hält. Positionsgedächtnis, ohne Drift im Stillstand.</li>
            <li>Schau aufs Scope: 90° Abstand, immer — der Versatz ist mechanisch, er kann nicht lügen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Einkanal-Encoder kann dir nicht sagen…",
        choices: ["die Geschwindigkeit", "die Distanz", "die Drehrichtung", "die Schlitzzahl"],
        answer: 2,
        explain: "Klicks sehen in beide Richtungen gleich aus. Der zweite, viertelversetzte Kanal existiert genau, um dieses Patt zu brechen.",
      },
      {
        q: "Bei der Quadraturkodierung liest man die Richtung, indem…",
        choices: [
          "man die Amplituden der zwei Kanäle vergleicht",
          "man prüft, welcher Kanal führt — z. B. B an As steigender Flanke abtastet",
          "man nur Kanal B zählt",
          "man die Frequenz misst",
        ],
        answer: 1,
        explain: "90° Phase heißt: Die Führungsreihenfolge kippt mit der Drehrichtung — ein Flipflop dekodiert es.",
      },
      {
        q: "Encoder + PID + H-Brücke zusammen ergeben…",
        choices: [
          "einen Oszillator",
          "einen geschlossenen Positions-Servo eigener Konstruktion",
          "einen Schrittmotor",
          "ein Radio",
        ],
        answer: 1,
        explain: "Messen (Encoder) → vergleichen & korrigieren (PID, 14.2) → stellen (H-Brücke, 19.1). Die Dreifaltigkeit der industriellen Bewegungsregelung.",
      },
      {
        q: "Warum verlassen sich Radroboter nicht allein auf Odometrie?",
        choices: [
          "Encoder sind zu teuer",
          "Räder rutschen und Fehler summieren sich — Odometrie driftet und braucht Fusion mit anderen Sinnen",
          "das Zählen läuft über",
          "tun sie doch — sie ist perfekt",
        ],
        answer: 1,
        explain: "Jeder Rutscher ist eine stille Lüge, die der Zähler für immer glaubt. Fusion mit IMUs und Abstandssensoren hält die Realität im Kreis.",
      },
    ],
  },

  /* ================================================================ */
  "line-follower": {
    Theory: () => (
      <>
        <h2>Die Mission</h2>
        <p>
          Bau den klassischen ersten Roboter: zwei angetriebene Räder, zwei nach unten
          blickende Reflexsensoren und Firmware, die so lenkt, dass die schwarze Linie
          zwischen ihnen bleibt. Es ist der PID aus Lektion 14.2 mit angeschraubten Rädern —
          und in dem Moment, in dem er seine erste Kurve allein nimmt, verstehst du, warum
          Menschen nie aufhören, Roboter zu bauen.
        </p>

        <h2>Einkaufsliste (über Pico + Breadboard-Kit hinaus)</h2>
        <table>
          <thead>
            <tr><th>Teil</th><th>Hinweise</th><th>≈ Kosten</th></tr>
          </thead>
          <tbody>
            <tr><td>2WD-Roboterchassis-Kit</td><td>zwei gelbe „TT“-Getriebemotoren, Räder, Stützrad, Platte — das universelle Starterchassis</td><td>12–18 $</td></tr>
            <tr><td>DRV8833-Treibermodul</td><td>doppelte H-Brücke mit Verriegelungen; glücklicher mit 3,3-V-Logik als der alte L298N</td><td>3 $</td></tr>
            <tr><td>2× TCRT5000-Reflexmodule</td><td>IR-LED + Fototransistor — ein Teilerausgang pro Sensor (wieder 2.2)</td><td>3 $</td></tr>
            <tr><td>4×AA-Batteriehalter</td><td>Motorstrom — getrennt von der USB/5-V-Versorgung des Pico</td><td>3 $</td></tr>
            <tr><td>Schwarzes Isolierband</td><td>die Rennstrecke. Heller Boden, breite sanfte Kurven zum Start</td><td>2 $</td></tr>
          </tbody>
        </table>

        <h2>Die Verdrahtung</h2>
        <table>
          <thead>
            <tr><th>#</th><th>Von</th><th>Nach</th><th>Hinweise</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Batteriepack + / −</td><td>DRV8833 VM / GND</td><td>Motorstrom bleibt weg von der Pico-Schiene</td></tr>
            <tr><td>2</td><td>Pico GND</td><td>DRV8833 GND & Sensor-GNDs</td><td><strong>gemeinsame Masse</strong> — das älteste Gesetz des Scope-Abschlussprojekts</td></tr>
            <tr><td>3</td><td>GP2, GP3</td><td>DRV8833 AIN1, AIN2</td><td>linker Motor (beide per PWM für vor/zurück)</td></tr>
            <tr><td>4</td><td>GP4, GP5</td><td>DRV8833 BIN1, BIN2</td><td>rechter Motor</td></tr>
            <tr><td>5</td><td>DRV8833 AOUT/BOUT</td><td>die zwei Motoren</td><td>läuft ein Motor rückwärts, tausch seine zwei Kabel</td></tr>
            <tr><td>6</td><td>Sensor AO (links / rechts)</td><td>GP26 / GP27</td><td>die ADC-Pins des Nachtlichts, jetzt mit Blick auf den Boden</td></tr>
            <tr><td>7</td><td>Sensor VCC</td><td>Pico 3V3</td><td>Sensoren nippen; Motoren dürfen diese Schiene nicht anrühren</td></tr>
            <tr><td>8</td><td>Sensoren, montiert</td><td>~15 mm auseinander, 3–8 mm über dem Boden, vor der Achse</td><td>die Höhe zählt mehr, als du denkst</td></tr>
          </tbody>
        </table>

        <h2>Die Firmware</h2>
        <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "14px 18px", overflowX: "auto", fontSize: "0.85rem", lineHeight: 1.6 }}>
          <code>{ROBOT_CODE}</code>
        </pre>
        <p>
          Dreißig Zeilen. Die Schleife ist der Superloop des Nachtlichts; die Sensoren sind
          Teiler in ADCs; die Lenkung ist das PD-Gesetz aus 14.2; die Motoren sind das PWM aus
          Einheit 8 durch die H-Brücke aus 19.1. Stimm KP genau so ab, wie es dir der
          Simulator beigebracht hat: zu niedrig schneidet Kurven weit, zu hoch schlängelt auf
          den Geraden, KD beruhigt die Schlange. Dann erhöhe BASE, bis der Mut versagt.
        </p>

        <h3>Wenn er sich danebenbenimmt</h3>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Wahrscheinliche Ursache</th><th>Abhilfe</th></tr>
          </thead>
          <tbody>
            <tr><td>Dreht von der Linie weg</td><td>Sensoren oder Lenkvorzeichen vertauscht</td><td>GP26/GP27 tauschen, oder err negieren — eine Änderung (15.2!)</td></tr>
            <tr><td>Ein Motor läuft rückwärts</td><td>Motorkabel verdreht</td><td>die zwei Kabel dieses Motors am Treiber tauschen</td></tr>
            <tr><td>Pico resettet, wenn die Motoren anreißen</td><td>Motorstörungen lassen die Versorgung einbrechen</td><td>getrenntes Batteriepack für VM, gemeinsame Massen, 100 µF über VM (das Abblocken aus 15.1!)</td></tr>
            <tr><td>Blind für die Linie</td><td>Sensorhöhe / Umgebungs-IR</td><td>3–8 mm über dem Boden, vor Sonnenlicht abschirmen, Messwerte über Band vs. Boden in Thonny prüfen</td></tr>
            <tr><td>Schlängelt heftig</td><td>dein Kp schreit</td><td>KP halbieren, KD dazu — genau diese Abstimmung hast du im Zwilling geprobt</td></tr>
          </tbody>
        </table>

        <h2>Wohin diese Straße führt</h2>
        <p>
          Ergänze Encoder (19.3), und er kennt seine Geschwindigkeit. Ergänze eine IMU, und er
          kann balancieren. Tausch das Band gegen Wände und einen Abstandssensor: ein
          Labyrinthlöser. Alles Weitere in der Robotik — SLAM, Manipulatoren, Autonomie — ist
          mehr Sensorik, mehr Schleifen, mehr Mathematik auf demselben Skelett, das du gerade
          gebaut hast: <strong>messen → entscheiden → handeln</strong>, mit Schleifenraten,
          die du jetzt zu wählen (13.3) und abzustimmen (14.2) weißt. Willkommen in der
          Robotik. Du bist den langen Weg gekommen, und man sieht es.
        </p>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling — erst abstimmen, dann bauen",
      intro: (
        <>
          <p>Exakt der Roboter, exakt das Regelgesetz, auf einer Strecke, die schlechte Abstimmung bestraft.</p>
          <ul>
            <li>Standard-Abstimmung: eine saubere Runde. Jetzt verdopple das Grundtempo und sieh die Kurven zubeißen.</li>
            <li>Setz Kd auf null und finde das Tempo, bei dem die Geraden zu schlängeln beginnen.</li>
            <li>Finde deine schnellsten Nie-verloren-Einstellungen — und stell dieselben Verhältnisse in der echten Firmware ein.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "parts", text: "Chassis montiert: Motoren, Räder, Stützrad, Sensorhalter — Pico und Treiber an Bord" },
      { id: "power", text: "Getrennte Motorbatterie an DRV8833 VM verdrahtet; jede Masse verbunden" },
      { id: "motors", text: "Beide Motoren reagieren auf ein Testskript — Richtungen durch Kabeltausch korrigiert, nicht durch Hoffen" },
      { id: "sensors", text: "Sensorwerte in Thonny über Band vs. Boden ausgegeben — klarer Unterschied bei gewählter Höhe" },
      { id: "track", text: "Eine Strecke geklebt: eine große Schleife, sanfte Kurven, (noch) keine Kreuzungen" },
      { id: "first", text: "Erste autonome Runde geschafft, egal wie langsam, egal wie wackelig. Auskosten." },
      { id: "tune", text: "KP und KD wie im Zwilling abgestimmt: benannt, was jede Änderung mit dem Verhalten machte" },
      { id: "speed", text: "Meinen persönlichen Temporekord gefunden, der drei Runden in Folge übersteht" },
      { id: "fail", text: "Mindestens einen echten Fehler mit der 15.2-Methode diagnostiziert (Symptom → Versorgung → halbieren)" },
      { id: "extend", text: "Erweitert: schärfere Strecke, eine Kreuzung, ein Encoder oder ein Wandsensor — die Robotik hat begonnen 🤖" },
    ],
  },
};
