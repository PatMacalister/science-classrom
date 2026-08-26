import type { LessonContentDe } from "../localize";
import { BridgeSVG } from "../unit5";

/** Full German content for Unit 5 (ac-waveforms, rectifiers, filters). */

export const unit5De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "ac-waveforms": {
    Theory: () => (
      <>
        <h2>Warum das Netz wackelt</h2>
        <p>
          Jede Schaltung bisher lief mit <strong>DC</strong> — Gleichstrom, eine stetige
          Richtung. Aber die Leistung in deiner Wand ist <strong>AC</strong>: Die Spannung
          schwingt glatt ins Positive, ins Negative und zurück, 50- oder 60-mal pro Sekunde.
          Der Grund ist eine Lektion, die du schon hattest: <em>Transformatoren funktionieren
          nur mit sich änderndem Strom</em> (Lektion 2.4). AC erlaubt dem Netz, die Spannung
          auf Hunderte Kilovolt hochzusetzen für verlustarme Übertragung
          (P<sub>loss</sub> = I²R — hohe Spannung heißt kleiner Strom bei gleicher Leistung)
          und sie an deiner Straße wieder auf sichere Werte herunterzusetzen. DC gewann ein
          paar Schlachten; AC gewann den Krieg um die Verteilung.
        </p>

        <h2>Anatomie einer Sinuswelle</h2>
        <p>
          Die natürliche Form von AC ist die <strong>Sinuswelle</strong> — genau das, was eine
          im Magnetfeld rotierende Spule automatisch erzeugt. Drei Zahlen legen sie fest:
        </p>
        <div className="formula">
          v(t) = V<sub>p</sub> · sin(2π·f·t)
          <span className="note">Vp = Scheitelwert · f = Zyklen pro Sekunde (Hz) · T = 1/f = Periode</span>
        </div>
        <ul>
          <li><strong>Scheitelwert (V<sub>p</sub>)</strong>: der höchste Augenblickswert. Spitze-Spitze ist der volle Hub, 2V<sub>p</sub>.</li>
          <li><strong>Frequenz (f)</strong>: Zyklen pro Sekunde. Netz: 50 Hz (Europa) / 60 Hz (Nordamerika). Audio: 20 Hz–20 kHz. Funk: kHz bis GHz.</li>
          <li><strong>Phase</strong>: wo in ihrem Zyklus eine Welle relativ zu einer anderen steht — sie zählte schon für die Zukunft deines Filters und zählt gewaltig bei AC-Leistung.</li>
        </ul>

        <h2>RMS: der ehrliche Mittelwert</h2>
        <p>
          Was ist &bdquo;die&ldquo; Spannung einer Welle, die ihr Leben lang wechselt? Der
          simple Mittelwert eines Sinus ist null — nutzlos. Der sinnvolle Mittelwert fragt:{" "}
          <em>Welche Gleichspannung würde einen Widerstand genauso heizen?</em> Das ist der{" "}
          <strong>Effektivwert</strong> (root mean square), und für Sinusse fällt er
          wunderschön einfach aus:
        </p>
        <div className="formula">
          V<sub>rms</sub> = V<sub>p</sub> / √2 ≈ 0.707 · V<sub>p</sub>
          <span className="note">&bdquo;230 V Netz&ldquo; erreicht also in Wahrheit 325 V Spitze, &bdquo;120 V&ldquo; 170 V</span>
        </div>
        <p>
          Jede AC-Angabe, die dir begegnet — Netzspannung, AC-Anzeigen des Multimeters,
          Verstärkerleistung — ist Effektivwert, wenn nichts anderes dabeisteht. Alle deine
          Leistungsformeln aus Einheit 1 gelten unverändert mit Effektivwerten:
          P = V<sub>rms</sub>·I<sub>rms</sub> für eine ohmsche Last.
        </p>

        <div className="callout note">
          <span className="co-title">AC ist auch, wie Information reist</span>
          <p>
            Ein Mikrofon verwandelt Druckwellen in kleine AC-Spannungen; Radiosender sind AC
            mit Millionen Hertz; die Datenleitungen deines Computers sind schnell schaltende
            Wellenformen. Ab dieser Einheit denk bei AC nicht nur an Leistung, sondern an{" "}
            <em>Signale</em> — der Rest des Aufbaukurses handelt davon, sie zu formen und zu
            verarbeiten.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Wellenform-Maschine",
      intro: (
        <>
          <p>Ein Live-Sinus auf dem Scope, mit markierter Scheitel- und Effektivwertlinie.</p>
          <ul>
            <li>Fahr die Frequenz von 10 bis 200 Hz und sieh zu, wie sich Zyklen ins feste Fenster drängen.</li>
            <li>Bestätige: Die grüne RMS-Linie liegt immer bei 70,7 % des Scheitels.</li>
            <li>Setze Vp = 12 V: Was würde ein Gleichspannungsmesser als &bdquo;heizgleichen&ldquo; Wert anzeigen?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Eine Sinuswelle erreicht 10 V Spitze. Ihr Effektivwert ist etwa…",
        choices: ["10 V", "7,1 V", "5 V", "14,1 V"],
        answer: 1,
        explain: "Vrms = Vp/√2 = 10/1,414 ≈ 7,07 V — die Gleichspannung mit derselben Heizleistung.",
      },
      {
        q: "Warum ist Netzstrom AC und nicht DC?",
        choices: [
          "AC ist ungefährlicher zu berühren",
          "Transformatoren brauchen sich ändernden Strom, und Transformatoren machen Fernübertragung effizient",
          "Batterien können kein DC erzeugen",
          "AC reist schneller durch den Draht",
        ],
        answer: 1,
        explain:
          "Induktion (Lektion 2.4) verlangt Veränderung. AC lässt Transformatoren die Spannung für verlustarme Leitungen hoch- und für Haushalte wieder heruntersetzen.",
      },
      {
        q: "Europäisches „230-V“-Netz erreicht in Wahrheit etwa…",
        choices: ["230 V", "163 V", "325 V", "460 V"],
        answer: 2,
        explain: "230 V ist der Effektivwert. Spitze = 230 × √2 ≈ 325 V.",
      },
      {
        q: "Die Periode von 50-Hz-Netzstrom ist…",
        choices: ["50 ms", "20 ms", "2 ms", "0,5 s"],
        answer: 1,
        explain: "T = 1/f = 1/50 = 0,02 s = 20 ms pro vollem Zyklus.",
      },
    ],
  },

  /* ================================================================ */
  rectifiers: {
    Theory: () => (
      <>
        <h2>Das Einwegventil trifft das Wackeln</h2>
        <p>
          Das Schlüsselbauteil gehört dir schon: Die Diode (Lektion 3.1) lässt Strom nur in
          eine Richtung durch. Gib ihr AC, und sie löscht schlicht die negative Hälfte jedes
          Zyklus. Das ist ein <strong>Einweggleichrichter</strong>: eine Diode, ein Ausgang,
          der in eine Richtung pulsiert — aber die halbe Energie fliegt weg, und die Lücken
          sind riesig.
        </p>

        <h2>Die Brücke: beide Hälften nutzen</h2>
        <p>
          Vier Dioden im Diamant — der <strong>Brückengleichrichter</strong> — lenken{" "}
          <em>beide</em> Zyklushälften in derselben Richtung durch die Last. Schwingt das AC
          positiv, leitet das eine Diagonalpaar; schwingt es negativ, das andere. Der Ausgang
          ist der Betrag des Eingangs (minus zwei Diodenabfälle ≈ 1,4 V) und pulsiert mit der{" "}
          <em>doppelten</em> Netzfrequenz.
        </p>
        <BridgeSVG />

        <h2>Glätten: das Reservoir</h2>
        <p>
          Pulsierender Gleichstrom reicht der Elektronik nicht — also kommt ein großer
          Kondensator über den Ausgang (Lektion 2.3, jetzt im Industriemaßstab). Er lädt sich
          auf jeden Scheitel, versorgt dann die Last, während der Eingang absinkt, und sackt
          nur leicht, bis der nächste Scheitel ihn nachfüllt. Das übrige Wackeln heißt{" "}
          <strong>Welligkeit</strong> (Ripple), und der Kampf dagegen ist eine reine
          RC-Geschichte: größeres C oder leichtere Last (größeres R) → größeres τ = RC relativ
          zu den 10 ms zwischen den Scheiteln → kleinere Welligkeit.
        </p>
        <div className="formula">
          transform ↓ → rectify → smooth → regulate
          <span className="note">das Vier-Schritte-Rezept in praktisch jedem netzbetriebenen Netzteil: transformieren, gleichrichten, glätten, regeln</span>
        </div>

        <div className="callout warn">
          <span className="co-title">Respekt vor dem Reservoir</span>
          <p>
            Die Glättungskondensatoren echter Netzteile sind groß und können ihre Ladung noch
            lange nach dem Ausstecken halten (die Warnung aus Lektion 2.3, jetzt mit Zähnen).
            Stochere nie in einem Netzteil herum — bau erst deine Niederspannungs-Fähigkeiten
            auf; die Konzepte übertragen sich exakt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Anatomie eines Ladegeräts",
      intro: (
        <>
          <p>Eine Quelle mit 9 V Spitze und 50 Hz durch den Gleichrichter deiner Wahl.</p>
          <ul>
            <li>Vergleiche Einweg und Brücke: Zähl die Buckel pro 3 Zyklen.</li>
            <li>Füge den Kondensator hinzu und sieh die Sägezahn-Welligkeit erscheinen. Vergrößere C — die Welligkeit schrumpft.</li>
            <li>Senke jetzt die Last R (schwerere Last). Warum wächst die Welligkeit? Denk an τ = RC.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Brückengleichrichter verwendet wie viele Dioden?",
        choices: ["1", "2", "4", "8"],
        answer: 2,
        explain: "Vier, im Diamant. In jeder Halbwelle leitet ein Diagonalpaar und lenkt den Strom gleichsinnig durch die Last.",
      },
      {
        q: "Mit 50-Hz-AC am Eingang pulsiert die Welligkeit am Brückenausgang mit…",
        choices: ["25 Hz", "50 Hz", "100 Hz", "Er ist perfekt glatt"],
        answer: 2,
        explain: "Beide Hälften jedes Zyklus werden Buckel: 2 × 50 = 100 Buckel pro Sekunde.",
      },
      {
        q: "Der Glättungskondensator verringert die Welligkeit, indem er…",
        choices: [
          "das AC vollständig blockiert",
          "sich an den Scheiteln lädt und die Last in den Tälern versorgt",
          "die Frequenz erhöht",
          "die Ausgangsspannung senkt",
        ],
        answer: 1,
        explain: "Er ist ein Reservoir: an jedem Scheitel aufgefüllt, dazwischen (leicht) von der Last geleert — die RC-Geschichte aus Lektion 2.3.",
      },
      {
        q: "Der DC-Ausgang einer Brücke liegt etwa 1,4 V unter dem AC-Scheitel, weil…",
        choices: [
          "der Kondensator Spannung frisst",
          "der Strom immer zwei Dioden durchquert, jede mit ~0,7 V Abfall",
          "der Effektivwert kleiner ist als der Scheitel",
          "der Lastwiderstand sie herunterteilt",
        ],
        answer: 1,
        explain: "Jeder Weg durch die Brücke kreuzt genau zwei Durchlassspannungen: 2 × 0,7 V (Lektion 3.1s Vf, doppelt).",
      },
    ],
  },

  /* ================================================================ */
  filters: {
    Theory: () => (
      <>
        <h2>Blindwiderstand: Widerstand mit Frequenzregler</h2>
        <p>
          Für stetiges DC ist ein geladener Kondensator eine Wand (Lektion 2.3). Aber wackle an
          der Spannung, und der Kondensator wird nie fertig mit Laden — es fließt fortwährend
          Strom, der den Änderungen hinterherjagt. Je schneller das Wackeln, desto leichter der
          Fluss. Dieser frequenzabhängige &bdquo;Widerstand&ldquo; heißt{" "}
          <strong>kapazitiver Blindwiderstand</strong>:
        </p>
        <div className="formula">
          X<sub>C</sub> = 1 / (2π·f·C)
          <span className="note">100 nF bei 100 Hz → 16 kΩ · bei 10 kHz → 160 Ω — dasselbe Bauteil, 100-mal &bdquo;kleiner&ldquo;</span>
        </div>

        <h2>Ein Teiler mit Lieblingen</h2>
        <p>
          Jetzt besuch den Spannungsteiler wieder (Lektion 2.2) und ersetze den unteren
          Widerstand durch einen Kondensator. Bei tiefen Frequenzen ist X<sub>C</sub> riesig →
          der Ausgang bekommt fast alles. Bei hohen Frequenzen bricht X<sub>C</sub> zusammen →
          der Ausgang wird weggekürzt. Gratulation: ein <strong>Tiefpassfilter</strong>.
          Vertausche R und C, und du bekommst den <strong>Hochpass</strong> — sperrt die
          Tiefen, lässt die Höhen durch.
        </p>
        <p>
          Die Grenze zwischen &bdquo;durchgelassen&ldquo; und &bdquo;gesperrt&ldquo; ist die{" "}
          <strong>Grenzfrequenz</strong>, bei der X<sub>C</sub> = R:
        </p>
        <div className="formula">
          f<sub>c</sub> = 1 / (2π·R·C)
          <span className="note">bei fc beträgt der Ausgang 70,7 % (−3 dB), phasenverschoben um exakt 45°</span>
        </div>
        <p>
          Der Übergang ist sanft, keine Klippe — eine Oktave über der Grenze lässt ein Tiefpass
          noch fast die halbe Amplitude durch (0,45×). Ingenieure beschreiben den Abfall in{" "}
          <strong>Dezibel</strong>: Dieses einstufige RC-Filter fällt 6 dB pro Oktave;
          schärfere Filter stapeln mehr Stufen.
        </p>

        <h2>Filter sind überall</h2>
        <ul>
          <li><strong>Klangregler & EQ:</strong> Bass- und Höhenregler sind buchstäblich variable RC-Filter.</li>
          <li><strong>Lautsprecher-Frequenzweichen:</strong> Tiefpass zum Woofer, Hochpass zum Hochtöner.</li>
          <li><strong>Aufräumen:</strong> Tiefpässe glätten rauschende Sensorleitungen und — merk dir das fürs Abschlussprojekt — verwandeln schnelle PWM-Pulse in einen stetigen Mittelwert.</li>
          <li><strong>Radio:</strong> Mit einer Spule dazu gibt es LC-Resonanz, und du kannst einen Sender aus dem ganzen Spektrum auswählen. (Ein perfektes Thema für eine spätere Einheit.)</li>
        </ul>
        <div className="callout tip">
          <span className="co-title">Es ist immer noch nur Ohm + Teiler</span>
          <p>
            Hier wurde nichts Neues erfunden: X<sub>C</sub> rutscht in die Teilerformel, wo
            früher R₂ stand. Fortgeschrittene Elektronik verwendet dieselben fünf Ideen immer
            wieder, nur schneller — das ist das Geheimnis, das Anfängern niemand verrät.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Frequenzsieb",
      intro: (
        <>
          <p>Ein RC-Filter mit Sinusgenerator, plus seine komplette Frequenzgangkurve.</p>
          <ul>
            <li>Tiefpass, fc ≈ 1,6 kHz (1 kΩ + 100 nF): Fahr den Eingang von 20 Hz bis 20 kHz und sieh den Ausgang sterben.</li>
            <li>Park den Eingang bei fc: exakt 0,71× und 45° Phasennacheilung.</li>
            <li>Schalte auf Hochpass — die Kurve spiegelt sich. Bass weg, Höhen durch.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "R = 4,7 kΩ und C = 33 nF bilden einen Tiefpass. Grenzfrequenz?",
        answer: 1 / (2 * Math.PI * 4700 * 33e-9),
        unit: "Hz",
        hint: "fc = 1 / (2π·R·C).",
        explain: "1/(2π × 4,7k × 33n) ≈ 1,03 kHz.",
      },
      {
        prompt: "Wie groß ist der Blindwiderstand eines 100-nF-Kondensators bei 1 kHz?",
        answer: 1 / (2 * Math.PI * 1000 * 100e-9),
        unit: "Ω",
        hint: "Xc = 1 / (2π·f·C).",
        explain: "1/(2π × 1000 × 100n) ≈ 1,59 kΩ.",
      },
      {
        prompt: "Ein Tiefpass wird exakt eine Oktave über seiner Grenzfrequenz angesteuert. Ausgangsamplitude als Bruchteil des Eingangs? (z. B. 0.5)",
        answer: 1 / Math.sqrt(5),
        unit: "",
        tolerancePct: 3,
        hint: "Verstärkung = 1/√(1 + (f/fc)²) mit f/fc = 2.",
        explain: "1/√(1+4) = 1/√5 ≈ 0,447 — der sanfte Abfall des einstufigen RC.",
      },
    ],
    quiz: [
      {
        q: "Steigt die Frequenz, dann wird der Blindwiderstand Xc eines Kondensators…",
        choices: ["größer", "kleiner", "bleibt konstant", "negativ"],
        answer: 1,
        explain: "Xc = 1/(2πfC): Mehr Wackler pro Sekunde heißt, der Kondensator füllt sich nie — leichterer Fluss, kleinerer Blindwiderstand.",
      },
      {
        q: "R = 1 kΩ und C = 160 nF ergeben eine Grenzfrequenz von etwa…",
        choices: ["1 Hz", "100 Hz", "1 kHz", "100 kHz"],
        answer: 2,
        explain: "fc = 1/(2π·1000·160×10⁻⁹) ≈ 995 Hz ≈ 1 kHz.",
      },
      {
        q: "Genau bei der Grenzfrequenz beträgt die Ausgangsamplitude des Filters…",
        choices: ["null", "die Hälfte des Eingangs", "70,7 % des Eingangs", "so viel wie der Eingang"],
        answer: 2,
        explain: "Bei fc ist Xc = R, und der Teiler liefert 1/√2 ≈ 0,707 — der berühmte −3-dB-Punkt.",
      },
      {
        q: "Um nur tiefe Frequenzen an einen Subwoofer zu schicken, nimmst du…",
        choices: [
          "einen Hochpass",
          "einen Tiefpass",
          "einen Gleichrichter",
          "einen Komparator",
        ],
        answer: 1,
        explain: "Der Tiefpass lässt Tiefen durch und sperrt Höhen — exakt was eine Woofer-Weiche tut.",
      },
    ],
  },
};
