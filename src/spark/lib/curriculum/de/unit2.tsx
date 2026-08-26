import type { LessonContentDe } from "../localize";

/** Full German content for Unit 2 (kirchhoff, voltage-divider, capacitors, inductors). */

export const unit2De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  kirchhoff: {
    Theory: () => (
      <>
        <h2>Knotenregel: Was hineinfließt, fließt heraus</h2>
        <p>
          Gustav Kirchhoff schrieb 1845 die zwei Buchhaltungsregeln der Schaltungstechnik
          nieder. Die <strong>Knotenregel (KCL)</strong> sagt: An jedem Knoten ist der gesamte
          hineinfließende Strom gleich dem herausfließenden. Es geht gar nicht anders — Ladung
          bleibt erhalten (Lektion 0.1) und kann sich nirgendwo stapeln. Kommen 0,8 A und
          0,4 A an einem Knoten an, verlassen ihn exakt 1,2 A.
        </p>
        <div className="formula">Σ I_in = Σ I_out<span className="note">an jedem Knoten, in jedem Augenblick</span></div>
        <p>
          Du hast die Knotenregel längst benutzt, ohne ihren Namen zu kennen: Sie ist der
          Grund, warum sich parallele Zweigströme addieren (Lektion 1.5) — und warum der Strom
          in einer Reihenschleife überall gleich ist: Ein Knoten mit zwei Drähten hat einen Weg
          hinein und einen heraus.
        </p>

        <h2>Maschenregel: Die Energiebücher müssen stimmen</h2>
        <p>
          Die <strong>Maschenregel (KVL)</strong> sagt: Lauf einmal um eine geschlossene
          Schleife, und die Spannungsgewinne (durch Quellen) sind exakt gleich den
          Spannungsabfällen (über Verbrauchern). Ein Coulomb, das an seinen Startpunkt
          zurückkehrt, muss dieselbe Energie haben wie beim Aufbruch — sonst wären Schaltungen
          Perpetuum mobile.
        </p>
        <div className="formula">Σ V_rises = Σ V_drops<span className="note">um jede geschlossene Masche</span></div>
        <p>
          In einer 9-V-Schleife mit zwei Widerständen summieren sich die Abfälle V₁ + V₂ immer
          auf exakt 9 V — egal, welche Widerstände du wählst. Ändere sie, und die{" "}
          <em>Anteile</em> verschieben sich, nie die Summe. Der Anteil jedes Widerstands ist
          proportional zu seinem Widerstandswert (V = I·R mit demselben I) — behalte den
          Gedanken für die nächste Lektion.
        </p>

        <h2>Warum diese zwei Gesetze so wichtig sind</h2>
        <p>
          Knoten- und Maschenregel plus Ohmsches Gesetz bilden einen vollständigen
          Werkzeugkasten: Schreib die Knotenregel an den Knoten, die Maschenregel um die
          Schleifen, und du bekommst ein System einfacher Gleichungen, das jede Spannung und
          jeden Strom in <em>jedem</em> Widerstandsnetzwerk bestimmt, egal wie verworren.
          Schaltungssimulatoren wie SPICE tun genau das, mit Millionen Gleichungen auf einmal.
          Du wirst sie meist informell benutzen — als Plausibilitätsprüfung, die falsche
          Antworten sofort entlarvt.
        </p>
        <div className="callout tip">
          <span className="co-title">Debugging-Superkraft</span>
          <p>
            Du misst an einer echten Schaltung? Spannungen um eine Schleife, die sich nicht zur
            Versorgung aufsummieren, bedeuten einen übersehenen Abfall — oft eine schlechte
            Verbindung, die still Volt frisst. Die Maschenregel macht aus dem Multimeter einen
            Lügendetektor.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Erhaltung, live",
      intro: (
        <>
          <p>Links: ein Knoten, der der Knotenregel gehorcht. Rechts: eine Masche unter der Maschenregel.</p>
          <ul>
            <li>Schieb I₁ und I₂ umher — I₃ hat überhaupt keine Wahl.</li>
            <li>Mach R₂ zehnmal so groß wie R₁ und sieh zu, wie er sich die zehnfache Spannung greift — der Stapel ergibt immer 9 V.</li>
            <li>Versuch, eines der Gesetze zu brechen. Es geht nicht. Genau das ist der Punkt.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ströme von 2 A und 3 A fließen in einen Knoten; ein Draht führt hinaus. Sein Strom ist…",
        choices: ["1 A", "2,5 A", "5 A", "6 A"],
        answer: 2,
        explain: "Knotenregel: rein = raus, also müssen 2 + 3 = 5 A hinausfließen.",
      },
      {
        q: "Die Kirchhoffsche Maschenregel ist im Kern eine Aussage über…",
        choices: [
          "Ladungserhaltung",
          "Energieerhaltung",
          "Impulserhaltung",
          "das Ohmsche Gesetz",
        ],
        answer: 1,
        explain:
          "Eine Ladung, die an ihren Startpunkt zurückkehrt, muss ihre Startenergie haben — also gleichen Gewinne und Abfälle einander aus. (Die Knotenregel ist die mit der Ladungserhaltung.)",
      },
      {
        q: "In einer 12-V-Masche fällt über einem Widerstand 7,5 V ab. Über dem anderen fallen…",
        choices: ["7,5 V", "12 V", "4,5 V", "Nicht bestimmbar"],
        answer: 2,
        explain: "Maschenregel: Die Abfälle müssen die Quelle ergeben. 12 − 7,5 = 4,5 V.",
      },
      {
        q: "Du misst die Abfälle um eine echte 9-V-Schleife und kommst nur auf 8,1 V. Am wahrscheinlichsten…",
        choices: [
          "Die Maschenregel gilt in echten Schaltungen nicht",
          "Es gibt einen ungemessenen Abfall — z. B. eine schlechte Verbindung, die ~0,9 V frisst",
          "Die Batterie hat zusätzliche Energie erzeugt",
          "Dein Multimeter bricht die Knotenregel",
        ],
        answer: 1,
        explain:
          "Die Maschenregel gilt immer. Fehlende Volt bedeuten einen Abfall, den du nicht gemessen hast — korrodierte Kontakte und lose Drähte sind die Klassiker.",
      },
    ],
  },

  /* ================================================================ */
  "voltage-divider": {
    Theory: () => (
      <>
        <h2>In drei Zeilen hergeleitet</h2>
        <p>
          Stapel zwei Widerstände zwischen Versorgung und Masse und greif die Mitte ab.
          Reihenregeln (Lektion 1.5): I = V<sub>in</sub>/(R₁+R₂). Der Ausgang ist einfach der
          Anteil von R₂: V<sub>out</sub> = I·R₂. Einsetzen:
        </p>
        <div className="formula">
          V_out = V_in × R₂ / (R₁ + R₂)
          <span className="note">gleiche Widerstände → exakt die Hälfte · größeres R₂ → größerer Anteil</span>
        </div>
        <p>
          Das Verhältnis ist alles, die Absolutwerte sind zweitrangig: 1 k/1 k teilt exakt wie
          100 k/100 k (der Unterschied ist, wie viel Strom der Teiler selbst verschwendet —
          große Werte nippen, kleine schlucken, sind dafür unter Last steifer).
        </p>

        <h2>Wo er dir begegnen wird</h2>
        <ul>
          <li>
            <strong>Sensoren:</strong> Tausch R₂ gegen einen Thermistor oder Fotowiderstand,
            und V<sub>out</sub> wird eine Spannung, die Temperatur oder Licht folgt — genau so
            lesen Mikrocontroller die analoge Welt.
          </li>
          <li>
            <strong>Lautstärkeregler:</strong> Ein <strong>Potentiometer</strong> ist ein
            Widerstand mit verschiebbarem Abgriff — ein Teiler, dessen Verhältnis du drehst.
            Audio fährt seit einem Jahrhundert darauf.
          </li>
          <li>
            <strong>Pegelanpassung:</strong> Ein 5-V-Signal an einen 3,3-V-Eingang? Ein Teiler
            skaliert es herunter. Referenzspannungen, Arbeitspunkte — überall Teiler.
          </li>
        </ul>

        <h2>Die Belastungsfalle</h2>
        <p>
          Die Formel nimmt an, dass am Ausgang nichts hängt. Schließ eine Last an, und sie
          liegt <em>parallel zu R₂</em>, senkt den effektiven unteren Widerstand — und der
          Ausgang sackt ab. Faustregel: Halte die Last mindestens 10-mal so groß wie R₂, oder
          rechne die Parallelschaltung explizit ein.
        </p>
        <div className="callout warn">
          <span className="co-title">Teiler setzen Spannungen, sie liefern keine Leistung</span>
          <p>
            Versuch nie, einen Motor oder eine helle LED &bdquo;mit 4,5 V&ldquo; aus einem
            Teiler zu versorgen — die Last bricht das Verhältnis zusammen, und die Widerstände
            verheizen deine Energie. Für Signale und Referenzen: Teiler; für Leistung: Regler
            (ein großes Thema der Aufbau-Einheiten).
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Verhältnis-Maschine",
      intro: (
        <>
          <p>Ein Teiler in Echtzeit, mit optionaler 10-kΩ-Last am Ausgang.</p>
          <ul>
            <li>Setze R₁ = R₂ und bestätige: Der Ausgang ist exakt die Hälfte jeder Eingangsspannung.</li>
            <li>Häng die Last an, mit R₂ = 10 k — sieh das Absacken. Jetzt R₁, R₂ = 1 k. Steifer?</li>
            <li>Wechsle in den Potentiometer-Modus und fahr den Schleifer von 0 bis 100 %.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Vin = 9 V, R₁ = 4,7 kΩ (oben), R₂ = 10 kΩ (unten). Wie groß ist Vout?",
        answer: (9 * 10000) / 14700,
        unit: "V",
        hint: "Vout = Vin · R₂ / (R₁ + R₂).",
        explain: "9 × 10k/14,7k ≈ 6,12 V — der Anteil von R₂ am Stapel.",
      },
      {
        prompt: "Du brauchst 3,3 V aus einer 5-V-Schiene. R₁ (oben) ist 10 kΩ — was muss R₂ sein?",
        answer: (10000 * 3.3) / 1.7,
        unit: "Ω",
        hint: "Teiler umstellen: R₂ = R₁ · Vout / (Vin − Vout).",
        explain: "R₂ = 10k · 3,3/1,7 ≈ 19,4 kΩ (nimm 20 kΩ, oder 18 k + 1,5 k).",
      },
      {
        prompt: "Ein 10-kΩ-Poti liegt an 12 V, der Schleifer steht 35 % von unten. Schleiferspannung?",
        answer: 4.2,
        unit: "V",
        hint: "Ein Poti ist ein Teiler, dessen Verhältnis die Schleiferposition ist.",
        explain: "12 × 0,35 = 4,2 V — die Bahn über und unter dem Schleifer sind R₁ und R₂.",
      },
    ],
    quiz: [
      {
        q: "Vin = 9 V, R₁ = 10 kΩ (oben), R₂ = 10 kΩ (unten). Vout ist…",
        choices: ["9 V", "6 V", "4,5 V", "3 V"],
        answer: 2,
        explain: "Gleiche Widerstände teilen gleichmäßig: 9 × 10k/(10k+10k) = 4,5 V.",
      },
      {
        q: "Für ein GRÖSSERES Vout aus demselben Vin solltest du…",
        choices: [
          "R₂ gegenüber R₁ vergrößern",
          "R₁ gegenüber R₂ vergrößern",
          "beide gleichermaßen vergrößern",
          "Vin verkleinern",
        ],
        answer: 0,
        explain: "Vout folgt dem Anteil von R₂ am Gesamtwiderstand: R₂ vergrößern (oder R₁ verkleinern), und der Ausgang steigt.",
      },
      {
        q: "Ein Potentiometer beschreibt man am besten als…",
        choices: [
          "einen variablen Kondensator",
          "einen Spannungsteiler mit beweglichem Abgriff",
          "eine Batterieart",
          "einen Stromverstärker",
        ],
        answer: 1,
        explain:
          "Der Schleifer gleitet über eine Widerstandsbahn und teilt sie fortlaufend neu in R₁ und R₂ auf.",
      },
      {
        q: "Du schließt einen kleinen Lautsprecher an einen Teilerausgang an, und die Spannung bricht zusammen. Warum?",
        choices: [
          "Der Lautsprecher erzeugt negative Spannung",
          "Sein kleiner Widerstand liegt parallel zu R₂ und ruiniert das Verhältnis",
          "Teiler funktionieren nur mit LEDs",
          "Die Maschenregel gilt nicht mehr",
        ],
        answer: 1,
        explain:
          "Eine niederohmige Last parallel zu R₂ macht das effektive untere Bein winzig — der Teiler war nie ein Netzteil.",
      },
    ],
  },

  /* ================================================================ */
  capacitors: {
    Theory: () => (
      <>
        <h2>Ein Eimer für Ladung</h2>
        <p>
          Ein <strong>Kondensator</strong> besteht aus zwei leitenden Platten mit einem
          Isolator dazwischen. Schieb Strom hinein, und Ladung häuft sich auf der einen Platte,
          während die andere geleert wird — es entsteht eine Spannung über dem Spalt. Das sind
          die geladenen Platten aus Lektion 0.2, jetzt als Bauteil. Wie viel Ladung er pro Volt
          hält, ist seine <strong>Kapazität</strong>:
        </p>
        <div className="formula">Q = C × V<span className="note">Farad = Coulomb pro Volt · praktische Bauteile: pF, nF, µF</span></div>
        <p>
          Ein Farad ist gewaltig; echte Schaltungen nutzen Mikrofarad und kleiner. Zwei
          Gewohnheiten für sofort: Elektrolytkondensatoren (die kleinen Dosen, µF-Bereich) sind{" "}
          <strong>gepolt</strong> — das Bein mit dem Streifen muss an die niedrigere Spannung,
          sonst können sie spektakulär versagen. Und große geladene Kondensatoren behalten ihre
          Ladung nach dem Ausschalten; begegne ihnen mit Respekt.
        </p>

        <h2>Laden über einen Widerstand: die Exponentialkurve</h2>
        <p>
          Speise einen Kondensator über einen Widerstand, und er kann sich nicht sofort füllen:
          Je voller er wird, desto kleiner die verbleibende Spannung über R, desto kleiner der
          Nachfüllstrom. Das Ergebnis ist die berühmteste Kurve der Elektronik — anfangs
          schnell, immer langsamer, nie ganz am Ziel:
        </p>
        <div className="formula">
          V(t) = V_s (1 − e^(−t/RC)) &nbsp;·&nbsp; τ = R × C
          <span className="note">τ in Sekunden, wenn R in Ohm und C in Farad</span>
        </div>
        <table>
          <thead>
            <tr><th>vergangen</th><th>geladen auf</th></tr>
          </thead>
          <tbody>
            <tr><td>1τ</td><td>63 %</td></tr>
            <tr><td>2τ</td><td>86 %</td></tr>
            <tr><td>3τ</td><td>95 %</td></tr>
            <tr><td>5τ</td><td>≈ 99 % — praktisch fertig</td></tr>
          </tbody>
        </table>
        <p>
          Die Form ist universell. 1 kΩ × 100 µF ergibt τ = 0,1 s; 10 kΩ × 100 µF ergibt 1 s —
          dieselbe Kurve, anderes Tempo. Entladen spiegelt sie: nach einem τ noch 37 %.
        </p>

        <h2>Wofür Kondensatoren gut sind</h2>
        <ul>
          <li><strong>Timing:</strong> Auf eine Schwelle laden, etwas auslösen, wiederholen — exakt so wird dein 555-Blinker ticken.</li>
          <li><strong>Glätten:</strong> Ein Kondensator über der Versorgung ist ein Reservoir, das die Täler füllt — jedes Netzteil hat welche.</li>
          <li><strong>DC blockieren:</strong> Einmal geladen fließt kein Gleichstrom mehr hindurch — Wackler aber schon. Audioschaltungen koppeln ihre Stufen genau so.</li>
          <li><strong>Energiespeicher:</strong> Kamerablitze entladen einen Kondensator in einer Millisekunde — Leistung, die keine kleine Batterie liefern könnte.</li>
        </ul>
      </>
    ),
    lab: {
      title: "Die universelle Kurve",
      intro: (
        <>
          <p>Ein RC-Glied auf einem Live-Oszilloskop. Die Zeitachse skaliert sich auf das τ, das du einstellst.</p>
          <ul>
            <li>Beobachte eine volle Ladung. Bestätige: Nach einer Rasterteilung (1τ) kreuzt die Kurve die 63-%-Linie.</li>
            <li>Schalte mitten in der Kurve auf Entladen — dem Kondensator ist es egal, er steuert einfach sein neues Ziel an.</li>
            <li>Ändere R und C wild: Die Achsenbeschriftung ändert sich, die Form nie.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "R = 10 kΩ lädt C = 47 µF. Wie groß ist die Zeitkonstante τ?",
        answer: 0.47,
        unit: "s",
        hint: "τ = R · C — Ohm mal Farad ergibt Sekunden.",
        explain: "10 000 × 47×10⁻⁶ = 0,47 s.",
      },
      {
        prompt: "Gleiche Schaltung: Nach welcher Zeit ist der Kondensator praktisch voll (die 5τ-Regel)?",
        answer: 2.35,
        unit: "s",
        hint: "Fünf Zeitkonstanten ≈ 99 %.",
        explain: "5 × 0,47 = 2,35 s.",
      },
      {
        prompt: "Ein Kondensator lädt gegen 12 V. Welche Spannung hat er bei exakt t = τ erreicht?",
        answer: 12 * (1 - Math.exp(-1)),
        unit: "V",
        hint: "Ein τ = 63,2 % des Weges.",
        explain: "12 × 0,632 ≈ 7,59 V — der Orientierungspunkt jedes RC-Glieds.",
      },
    ],
    quiz: [
      {
        q: "τ für R = 1 kΩ und C = 100 µF ist…",
        choices: ["0,1 ms", "10 ms", "0,1 s", "10 s"],
        answer: 2,
        explain: "τ = RC = 1000 × 0,0001 = 0,1 Sekunden.",
      },
      {
        q: "Nach einer Zeitkonstante Laden hat der Kondensator etwa erreicht…",
        choices: ["37 %", "50 %", "63 %", "99 %"],
        answer: 2,
        explain: "1 − e⁻¹ ≈ 0,632. Die 63 % sind der Orientierungswert des praktizierenden Ingenieurs.",
      },
      {
        q: "Wie viel stetigen Strom führt ein voll geladener Kondensator im Gleichstromkreis?",
        choices: ["Maximalen Strom", "Den halben Anfangsstrom", "Praktisch keinen", "Kommt auf seine Farbe an"],
        answer: 2,
        explain:
          "Einmal auf Quellenspannung geladen bleibt keine Spannungsdifferenz übrig, die Strom treiben könnte — Kondensatoren blockieren stetigen Gleichstrom.",
      },
      {
        q: "Dein Timer läuft zu schnell. Mit τ = RC verlangsamst du ihn durch…",
        choices: [
          "kleineres R",
          "größeres C (oder R)",
          "kleineres C",
          "Entfernen des Widerstands",
        ],
        answer: 1,
        explain: "Größeres R oder C → größeres τ → langsameres Timing. (Genau das wirst du mit deinem Blinker machen.)",
      },
    ],
  },

  /* ================================================================ */
  inductors: {
    Theory: () => (
      <>
        <h2>Jeder Strom macht einen Magneten</h2>
        <p>
          1820 bemerkte Ørsted, wie ein Kompass neben einem stromführenden Draht zuckte:
          Bewegte Ladung erzeugt ein <strong>Magnetfeld</strong>. Wickle den Draht zur Spule,
          und das Feld konzentriert sich — ein <strong>Elektromagnet</strong>, verstärkt durch
          mehr Windungen, mehr Strom oder einen Eisenkern. Das ist die eine Hälfte der
          tiefsten Verbindung der Physik (Elektrizität ⇄ Magnetismus), und die andere Hälfte
          ist genauso gut: Ein <em>sich änderndes</em> Magnetfeld schiebt Ladungen —{" "}
          <strong>Induktion</strong>. Generatoren drehen Spulen an Magneten vorbei und machen
          Strom; Motoren spielen den Trick rückwärts; Transformatoren reichen Leistung
          zwischen Spulen weiter, ganz ohne bewegliche Teile.
        </p>

        <h2>Die Spule: Trägheit für Strom</h2>
        <p>
          Eine Spule als Bauteil heißt <strong>Induktivität</strong>. Ihr Magnetfeld speichert
          Energie, und dieses Feld wehrt sich gegen Veränderung — eine Spule widersetzt sich
          also <em>Stromänderungen</em>, das perfekte Spiegelbild des Kondensators, der sich
          Spannungsänderungen widersetzt:
        </p>
        <div className="formula">
          V = L × dI/dt &nbsp;·&nbsp; τ = L / R
          <span className="note">L in Henry · gespeicherte Energie: ½ L I²</span>
        </div>
        <p>
          Schließ den Schalter eines RL-Kreises, und der Strom springt nicht — er rampt entlang
          derselben Exponentialkurve aus der letzten Lektion und erreicht nach einem τ = L/R
          63 % von V/R. Stationär fließt der Strom schließlich, als wäre die Spule blanker
          Draht.
        </p>

        <h2>Der induktive Tritt</h2>
        <p>
          Jetzt öffne den Schalter. Der Strom muss fast augenblicklich stoppen — dI/dt ist also
          riesig, und V = L·dI/dt heißt: Die Spule erzeugt eine <em>riesige</em>{" "}
          Spannungsspitze (Hunderte Volt aus einer 9-V-Schaltung), um ihren Strom am Fließen zu
          halten. Die Spitze schlägt Funken über Schaltkontakte und tötet Transistoren. Die
          Standardkur ist wunderschön einfach: Eine <strong>Freilaufdiode</strong> über der
          Spule gibt dem Strom eine sichere Schleife zum Abklingen und klemmt die Spitze auf
          unter ein Volt. Jeder Relais- und Motortreiber-Schaltplan, den du je sehen wirst, hat
          eine — jetzt weißt du, warum.
        </p>
        <div className="callout note">
          <span className="co-title">Wohin das führt</span>
          <p>
            Spulen und Kondensatoren zusammen ergeben Schwingkreise — das abgestimmte Herz
            jedes Radios. Und Induktion im Netzmaßstab ist der Grund, warum aus der Steckdose
            Wechselstrom kommt: Transformatoren funktionieren nur mit sich änderndem Strom.
            Der Aufbaukurs nimmt diesen Faden in Einheit 5 direkt auf.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Hochrampen, Zurücktreten",
      intro: (
        <>
          <p>Ein RL-Kreis auf dem Scope: Strom in Bernstein, Spulenspannung in Cyan.</p>
          <ul>
            <li>Schließ den Schalter und sieh den Strom rampen — 63 % von V/R nach einer Teilung.</li>
            <li>Öffne den Schalter ohne Diode. Lies das Spitzen-Messfeld. Aus einer 9-V-Batterie!</li>
            <li>Setz die Freilaufdiode ein und öffne erneut — sanftes Abklingen, geklemmte Spannung.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Eine Spule widersetzt sich am stärksten…",
        choices: [
          "stetigem Strom",
          "Stromänderungen",
          "Spannungsänderungen",
          "der Nähe von Kondensatoren",
        ],
        answer: 1,
        explain:
          "V = L·dI/dt: Spannung entsteht nur, wenn sich der Strom *ändert*. Stetiger Strom segelt hindurch.",
      },
      {
        q: "Die RL-Zeitkonstante ist…",
        choices: ["τ = L × R", "τ = R / L", "τ = L / R", "τ = 1 / (LR)"],
        answer: 2,
        explain: "τ = L/R — z. B. 0,1 H durch 100 Ω ergibt 1 ms.",
      },
      {
        q: "Warum erzeugt das Öffnen eines Schalters an einer Spule eine große Spannungsspitze?",
        choices: [
          "Die Batteriespannung verdoppelt sich",
          "Strom unterbrechen heißt riesiges dI/dt, und V = L·dI/dt",
          "Die Spule schließt sich kurz",
          "Magnetfelder ziehen Funken an",
        ],
        answer: 1,
        explain:
          "Das kollabierende Feld zwingt den Strom, irgendwo weiterzufließen; ohne Weg steigt die Spannung, bis etwas (ein Lichtbogen) nachgibt.",
      },
      {
        q: "Eine Freilaufdiode über einer Relaisspule…",
        choices: [
          "beschleunigt das Relais",
          "gibt dem unterbrochenen Strom einen sicheren Pfad und klemmt die Spitze",
          "erhöht die Induktivität der Spule",
          "verhindert das Einschalten des Relais",
        ],
        answer: 1,
        explain:
          "Öffnet der Schalter, läuft der Strom durch die Diode frei und klingt sanft ab, statt Funken zu schlagen — billige Versicherung an jeder Spule, die du je ansteuern wirst.",
      },
    ],
  },
};
