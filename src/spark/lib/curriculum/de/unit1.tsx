import type { LessonContentDe } from "../localize";
import { SymbolLegend } from "../unit1";

/**
 * Full German content for Unit 1 (circuits & Ohm's law): theory JSX,
 * quizzes (same answer indices as English!), numeric problems (answers
 * copied verbatim) and lab titles/intros.
 */

export const unit1De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "first-circuit": {
    Theory: () => (
      <>
        <h2>Die Schleife ist alles</h2>
        <p>
          Ein elektrischer <strong>Stromkreis</strong> ist genau das, was das Wort sagt: ein
          geschlossener Kreis. Ladung verlässt den +-Pol der Batterie (der Konvention aus der
          letzten Lektion folgend), wandert durch Drähte und Bauteile und kehrt zum −-Pol
          zurück, wo die Batterie sie wieder auf volle Energie hochpumpt und erneut auf die
          Runde schickt. Jede nützliche Schaltung hat mindestens eine <strong>Quelle</strong>{" "}
          (etwas, das Energie liefert — hier eine Batterie) und eine <strong>Last</strong>{" "}
          (etwas, das sie sinnvoll ausgibt — eine Lampe, ein Motor, ein Chip).
        </p>
        <p>
          Weil die Schleife vollständig mit Ladung gefüllt ist, ist der Fluss überall in einer
          einfachen Schleife gleich — es kann nicht mehr Strom in die Lampe hinein- als aus ihr
          herausfließen, so wenig wie sich ein Kreis aus Murmeln stauen kann. Unterbrich die
          Schleife an <em>irgendeinem</em> Punkt, und der Strom stoppt <em>überall</em>,
          sofort. Mehr ist ein Schalter nicht: eine absichtliche, wieder schließbare
          Unterbrechung.
        </p>

        <h2>Schaltpläne lesen</h2>
        <p>
          Ingenieure zeichnen Schaltungen mit Standardsymbolen, verbunden durch Linien (die
          Linien sind ideale Drähte — null Widerstand, reine Verbindungen). Der physische
          Aufbau auf deinem Tisch kann völlig anders aussehen als die Zeichnung; es zählt
          allein, <em>was mit was verbunden ist</em>. Hier sind die Symbole, die du brauchst:
        </p>
        <SymbolLegend />

        <h2>Die zwei Fehlerarten</h2>
        <p>
          <strong>Unterbrechung (offener Stromkreis):</strong> Die Schleife ist unterbrochen —
          ein Schalter ist aus, ein Draht hat sich gelöst, ein Glühfaden ist gerissen. Strom:
          null. Nichts passiert. Ärgerlich, aber ungefährlich.
        </p>
        <p>
          <strong>Kurzschluss:</strong> der gegenteilige und weit dramatischere Fehler.
          Verbindet ein verirrter Draht die Batteriepole, <em>ohne</em> durch eine Last zu
          laufen, begrenzt fast nichts mehr den Fluss. Der Strom wird nur noch vom winzigen
          Innenwiderstand der Batterie zurückgehalten und wird deshalb enorm — Draht und
          Batterie heizen sich rasant auf, und Dinge können schmelzen oder Feuer fangen. Das
          Wort &bdquo;kurz&ldquo; ist wörtlich gemeint: Der Strom hat einen kürzeren Weg
          gefunden als den, den du für ihn gebaut hast.
        </p>
        <div className="callout warn">
          <span className="co-title">Hab Respekt vor dem Kurzschluss</span>
          <p>
            Verbinde niemals einen Draht direkt mit beiden Polen einer Batterie. Schon eine
            kleine 9-V-Batterie wird heiß genug, um dich zu verbrennen; größere Batterien (und
            besonders Lithiumzellen) können ernsthaft gefährlich werden. Deshalb haben Gebäude
            auch Sicherungen und Leitungsschutzschalter — automatische Schalter, die die
            Schleife öffnen, wenn der Strom verdächtig groß wird.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Kaputt machen, reparieren, quälen",
      intro: (
        <>
          <p>Eine 9-V-Batterie, ein Schalter und eine 90-Ω-Lampe in einer Schleife.</p>
          <ul>
            <li>Klick auf den Schalter (oder nutze die Buttons), um die Schleife zu öffnen und zu schließen. Sieh zu, wie alle Punkte gleichzeitig stoppen.</li>
            <li>Probiere den Kurzschluss. Vergleiche den Strom mit und ohne Lampe im Pfad — 0,1 A gegen 18 A!</li>
            <li>Beachte, dass die Lampe im Kurzschluss dunkel wird: Der Strom nimmt den bequemen Weg an ihr vorbei.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Warum stoppt das Öffnen eines Schalters irgendwo in der Schleife den Strom überall?",
        choices: [
          "Elektronen haben Angst vor Lücken",
          "Ladung kann sich weder stauen noch verschwinden — der Fluss in einer Schleife ist kontinuierlich, eine Unterbrechung stoppt alles",
          "Der Schalter absorbiert alle Elektronen",
          "Tut es nicht — auf der Batterieseite fließt der Strom weiter",
        ],
        answer: 1,
        explain:
          "Ein Stromkreis ist wie ein Ring aus Murmeln: Keine kann sich bewegen, wenn nicht alle sich bewegen. Eine Unterbrechung irgendwo stoppt die ganze Schleife.",
      },
      {
        q: "Was macht einen Kurzschluss gefährlich?",
        choices: [
          "Die Spannung wird sehr hoch",
          "Elektronen lecken aus dem Draht",
          "Ohne Last begrenzt fast nichts den Strom — er wird riesig, und alles überhitzt",
          "Die Batterie kehrt ihre Polarität um",
        ],
        answer: 2,
        explain:
          "Normalerweise begrenzt die Last den Strom. Umgeh sie, und nur der winzige Innenwiderstand der Batterie bleibt übrig — der Strom wird enorm und verwandelt sich in Hitze.",
      },
      {
        q: "In einem Schaltplan stehen die Linien zwischen den Symbolen für…",
        choices: [
          "Die exakte physische Lage der Drähte",
          "Ideale Verbindungen — was mit was verbunden ist, mit null Widerstand",
          "Die Richtung, die Elektronen nehmen müssen",
          "Isolierte Röhren",
        ],
        answer: 1,
        explain:
          "Schaltpläne zeigen Verbindungen, nicht Geometrie. Ein Schaltplan-Draht ist ein idealer Leiter: gleiche Spannung an beiden Enden.",
      },
      {
        q: "Jede nützliche Schaltung braucht mindestens…",
        choices: [
          "Eine Energiequelle und eine Last, die sie nutzt, in einer geschlossenen Schleife",
          "Einen Schalter und eine Sicherung",
          "Zwei Batterien",
          "Eine Lampe",
        ],
        answer: 0,
        explain:
          "Quelle + Last + geschlossener Pfad: Die Quelle gibt jedem Coulomb Energie, die Last gibt sie für etwas Nützliches aus.",
      },
    ],
  },

  /* ================================================================ */
  "ohms-law": {
    Theory: () => (
      <>
        <h2>Widerstand: Reibung für Ladung</h2>
        <p>
          Während Elektronen durch ein Material driften, stoßen sie ständig mit dessen Atomen
          zusammen und geben dabei Energie als Wärme ab. Wie stark ein Bauteil den Fluss
          behindert, ist sein <strong>Widerstand</strong>, gemessen in <strong>Ohm (Ω)</strong>.
          Dünne Drähte widerstehen mehr als dicke, lange mehr als kurze, und manche Materialien
          enorm viel mehr als andere — darum bauen wir Heizungen aus Nichrom und Drähte aus
          Kupfer.
        </p>

        <h2>Das Gesetz</h2>
        <p>
          1827 fand Georg Ohm heraus, dass bei den meisten Leitern der Strom schlicht
          proportional zur treibenden Spannung ist. Doppelter Druck, doppelter Fluss. Die
          Konstante zwischen beiden ist der Widerstand:
        </p>
        <div className="formula">
          V = I × R
          <span className="note">Volt = Ampere × Ohm · außerdem I = V/R und R = V/I</span>
        </div>
        <p>
          Diese eine Zeile beantwortet drei Alltagsfragen. <em>Wie viel Strom wird fließen?</em>{" "}
          I&nbsp;=&nbsp;V/R. <em>Welchen Widerstand brauche ich für einen gewünschten Strom?</em>{" "}
          R&nbsp;=&nbsp;V/I. <em>Welche Spannung fällt über diesem Bauteil ab?</em>{" "}
          V&nbsp;=&nbsp;I·R. Du wirst sie ab jetzt buchstäblich in jeder Lektion benutzen.
        </p>

        <h3>Durchgerechnete Beispiele</h3>
        <ul>
          <li>
            Eine 9-V-Batterie an einem 450-Ω-Widerstand: I = 9 / 450 = <strong>0,02 A = 20 mA</strong>.
          </li>
          <li>
            Du willst 15 mA aus einer 5-V-Versorgung: R = 5 / 0,015 ≈ <strong>333 Ω</strong>{" "}
            (du greifst zum Standardwert 330 Ω).
          </li>
          <li>
            Durch einen Auto-Scheinwerfer an einer 12-V-Batterie fließen 2 A: Der heiße
            Glühfaden hat R = 12 / 2 = <strong>6 Ω</strong>.
          </li>
        </ul>

        <div className="callout tip">
          <span className="co-title">Anker für die Intuition</span>
          <p>
            Spannung ist der Druck, Widerstand ist die Engstelle, Strom ist das Ergebnis. Mehr
            Druck → mehr Fluss. Mehr Engstelle → weniger Fluss. Wenn du aus diesem Kurs nur
            eines mitnimmst, dann V&nbsp;=&nbsp;I·R.
          </p>
        </div>

        <h2>Ohmsch und nicht-ohmsch</h2>
        <p>
          Bauteile, die V = I·R mit konstantem R gehorchen, heißen <em>ohmsch</em> —
          Widerstände und Drähte verhalten sich so. Viele interessante Bauteile tun es{" "}
          <em>nicht</em>: Der Widerstand eines Glühfadens steigt, wenn er heiß wird, und Dioden
          und LEDs (Einheit 3) leiten kaum, bis die Spannung eine Schwelle überschreitet — dann
          leiten sie umso heftiger. Das Ohmsche Gesetz gilt trotzdem für jeden Widerstand{" "}
          <em>in</em> diesen Schaltungen — es beschreibt nur die exotischen Bauteile selbst
          nicht.
        </p>
      </>
    ),
    lab: {
      title: "Die V–I–R-Maschine",
      intro: (
        <>
          <p>Eine Schleife, zwei Regler, ein Gesetz.</p>
          <ul>
            <li>Halte R konstant und fahre V durch: Der Strom folgt in perfekter Proportion.</li>
            <li>Halte V bei 9 V und fahre R über drei Dekaden — sieh den Strom abstürzen.</li>
            <li>Finde Einstellungen für exakt 20 mA. Es gibt mehr als einen Weg!</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Eine 12-V-Versorgung treibt einen 2,2-kΩ-Widerstand. Welcher Strom fließt?",
        answer: 12 / 2200,
        unit: "A",
        hint: "I = V / R — und denk daran: Das Ergebnis liegt im Milliampere-Bereich.",
        explain: "I = 12 / 2200 = 5,45 mA.",
      },
      {
        prompt: "Du willst 25 mA aus einer 9-V-Batterie durch eine Testlast schicken. Welchen Widerstand brauchst du?",
        answer: 360,
        unit: "Ω",
        hint: "R = V / I, mit dem Strom in Ampere (25 mA = 0,025 A).",
        explain: "R = 9 / 0,025 = 360 Ω.",
      },
      {
        prompt: "Ein billiges Ladekabel hat 0,4 Ω Widerstand für Hin- und Rückweg und führt 2 A. Wie viel Spannung geht im Kabel selbst verloren?",
        answer: 0.8,
        unit: "V",
        hint: "Das Kabel ist nur ein Widerstand: V = I · R.",
        explain: "V = 2 × 0,4 = 0,8 V — fast ein Fünftel einer 5-V-Versorgung, verschwunden im Draht. Darum zählt Kabelqualität.",
      },
    ],
    quiz: [
      {
        q: "Eine 9-V-Batterie liegt an 450 Ω. Welcher Strom fließt?",
        choices: ["50 mA", "20 mA", "2 A", "0,5 A"],
        answer: 1,
        explain: "I = V/R = 9/450 = 0,02 A = 20 mA.",
      },
      {
        q: "Du misst 0,5 A durch ein Bauteil mit 6 V darüber. Sein Widerstand ist…",
        choices: ["3 Ω", "12 Ω", "0,083 Ω", "30 Ω"],
        answer: 1,
        explain: "R = V/I = 6/0,5 = 12 Ω.",
      },
      {
        q: "Bei fester Spannung bewirkt eine Verdopplung des Widerstands…",
        choices: ["Doppelten Strom", "Halben Strom", "Halbe Spannung", "Gar nichts"],
        answer: 1,
        explain: "I = V/R: Bei festem V bedeutet doppeltes R halbes I.",
      },
      {
        q: "Du brauchst etwa 15 mA aus einer 5-V-Versorgung. Welcher Standardwiderstand passt am besten?",
        choices: ["33 Ω", "330 Ω", "3,3 kΩ", "33 kΩ"],
        answer: 1,
        explain: "R = V/I = 5/0,015 ≈ 333 Ω → der Standardwert 330 Ω.",
      },
    ],
  },

  /* ================================================================ */
  resistors: {
    Theory: () => (
      <>
        <h2>Warum absichtlich widerstehen?</h2>
        <p>
          Es klingt seltsam, ein Bauteil zu kaufen, dessen ganzer Job es ist, Strom zu
          behindern — aber <strong>mit Widerständen sagst du einer Schaltung, wie viel Strom
          sie benutzen soll</strong>. Sie schützen empfindliche Bauteile (eine LED ohne ihren
          Widerstand stirbt in einem Wimpernschlag — das beweist du in Einheit 3), setzen
          Spannungspegel, steuern Timing und verwandeln Ströme in messbare Spannungen. Eine
          typische Platine trägt Dutzende davon.
        </p>

        <h2>Der Farbcode</h2>
        <p>
          Übliche Widerstände sind zu klein für aufgedruckte Zahlen, deshalb tragen sie seit
          den 1920ern farbige Ringe. Bei einem Widerstand mit 4 Ringen gilt: Die ersten beiden
          Ringe sind Ziffern, der dritte multipliziert mit einer Zehnerpotenz, und der vierte
          nennt die Toleranz.
        </p>
        <table>
          <thead>
            <tr>
              <th>Farbe</th>
              <th>Ziffer</th>
              <th>Multiplikator</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><span className="color-chip" style={{ background: "#1c1c1c" }} />Schwarz</td><td>0</td><td>×1</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#7a4a21" }} />Braun</td><td>1</td><td>×10</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#d94040" }} />Rot</td><td>2</td><td>×100</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#ef8420" }} />Orange</td><td>3</td><td>×1 k</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#e8cf3a" }} />Gelb</td><td>4</td><td>×10 k</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#3fae4c" }} />Grün</td><td>5</td><td>×100 k</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#3f6fdb" }} />Blau</td><td>6</td><td>×1 M</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#8e4ae0" }} />Violett</td><td>7</td><td>—</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#999" }} />Grau</td><td>8</td><td>—</td></tr>
            <tr><td><span className="color-chip" style={{ background: "#f2f2f2" }} />Weiß</td><td>9</td><td>—</td></tr>
          </tbody>
        </table>
        <p>
          Toleranzring: <span className="color-chip" style={{ background: "#cfa53a" }} />
          Gold = ±5 %, <span className="color-chip" style={{ background: "#c0c0c0" }} />
          Silber = ±10 %, Braun = ±1 %. Beispiel:{" "}
          <strong>Gelb–Violett–Rot–Gold</strong> liest sich 4, 7, ×100 → <strong>4,7 kΩ ±5 %</strong>.
          Genau dieser Widerstand steckt in deinem finalen Projekt.
        </p>

        <h2>Warum die krummen Werte?</h2>
        <p>
          Widerstände gibt es in Normreihen wie <strong>E12</strong>: 10, 12, 15, 18, 22, 27,
          33, 39, 47, 56, 68, 82 (dann ×10, ×100, …). Die Zahlen wirken zufällig, sind aber
          gleichmäßig im <em>Verhältnis</em> gestaffelt (jeder ≈ 1,21-mal der vorige), sodass
          sich die Bereiche bei ±10 % Toleranz lückenlos über den Zahlenstrahl legen. Du
          brauchst nie exakt 500 Ω — die 470-Ω- oder die 560-Ω-Schublade deckt dich ab.
        </p>

        <div className="callout note">
          <span className="co-title">Belastbarkeit</span>
          <p>
            Neben seinem Widerstandswert hat ein Widerstand eine maximale Leistung, die er
            abführen kann, ohne zu verkochen — die üblichen kleinen sind mit{" "}
            <strong>¼ W</strong> spezifiziert. Was das bedeutet und wie du es prüfst, ist genau
            die nächste Lektion.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Farbcode-Decoder & Trainer",
      intro: (
        <>
          <p>Baue einen beliebigen Widerstand aus seinen Ringen — oder decodiere einen zufälligen.</p>
          <ul>
            <li>Stelle Gelb–Violett–Rot–Gold ein und bestätige, dass du 4,7 kΩ ±5 % erhältst.</li>
            <li>Baue 1 kΩ, 330 Ω und 47 kΩ — die drei anderen Werte deines finalen Projekts.</li>
            <li>Drücke 🎲 und decodiere den Rätsel-Widerstand, bevor du auflöst.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Braun–Schwarz–Rot–Gold ist…",
        choices: ["100 Ω ±5 %", "1 kΩ ±5 %", "10 kΩ ±5 %", "1,2 kΩ ±10 %"],
        answer: 1,
        explain: "Ziffern 1 und 0 → 10, Multiplikator Rot ×100 → 1000 Ω = 1 kΩ; Gold = ±5 %.",
      },
      {
        q: "Orange–Orange–Braun ergibt…",
        choices: ["33 Ω", "330 Ω", "3,3 kΩ", "303 Ω"],
        answer: 1,
        explain: "3 und 3 → 33, Braun ×10 → 330 Ω. Das ist der klassische LED-Vorwiderstandswert.",
      },
      {
        q: "Ein goldener Toleranzring bedeutet: Der wahre Wert liegt innerhalb von…",
        choices: ["±1 %", "±5 %", "±10 %", "±20 %"],
        answer: 1,
        explain: "Gold = ±5 %. Silber = ±10 %, Braun = ±1 %.",
      },
      {
        q: "Warum gibt es Standardwiderstände in krummen Werten wie 4,7 k statt runden 5 k?",
        choices: [
          "Die Fertigung trifft keine runden Zahlen",
          "E-Reihen-Werte sind in gleichen Verhältnissen gestaffelt, damit sich die Toleranzbereiche lückenlos aneinanderlegen",
          "Tradition aus der Röhrenzeit",
          "Runde Werte sind patentiert",
        ],
        answer: 1,
        explain:
          "Jeder E12-Wert liegt ~21 % über dem vorigen, sodass ±10-%-Bauteile den ganzen Bereich nahtlos abdecken — ein wunderbar praktisches Stück Ingenieurskunst.",
      },
    ],
  },

  /* ================================================================ */
  power: {
    Theory: () => (
      <>
        <h2>Leistung ist die Rate des Energieflusses</h2>
        <p>
          Setz die letzten Lektionen zusammen. Spannung ist Joule pro Coulomb; Strom ist
          Coulomb pro Sekunde. Multipliziere beide, und die Coulomb kürzen sich weg — übrig
          bleiben <strong>Joule pro Sekunde</strong>, also <strong>Watt</strong>: die Rate, mit
          der elektrische Energie in Licht, Wärme oder Bewegung umgewandelt wird.
        </p>
        <div className="formula">
          P = V × I
          <span className="note">Watt = Volt × Ampere · mit dem Ohmschen Gesetz: P = I²R = V²/R</span>
        </div>
        <p>
          Die zwei abgeleiteten Formen bekommst du gratis, indem du V=IR oder I=V/R einsetzt,
          und jede hat ihren Moment: P&nbsp;=&nbsp;I²R, wenn du den Strom durch ein Bauteil
          kennst, P&nbsp;=&nbsp;V²/R, wenn du die Spannung darüber kennst. Zum Gefühl für die
          Größenordnung: Eine LED läuft mit ~0,04 W, ein Handyladegerät mit ~10 W, eine helle
          Glühbirne alter Bauart mit 60 W, ein Wasserkocher mit 2000 W.
        </p>

        <h2>Energie ist Leistung × Zeit — und sie kostet Geld</h2>
        <p>
          Dein Stromzähler zählt Energie in <strong>Kilowattstunden</strong>: Eine kWh sind
          1000 W, die eine Stunde lang fließen (3,6 Millionen Joule). Bei typischen 0,30 $/kWh
          kostet eine 60-W-Birne, die 4 Stunden am Tag brennt, etwa 2,20 $ im Monat, während
          eine LED-Birne, die denselben Job mit 8 W macht, auf 0,29 $ kommt. Multipliziere das
          mit jeder Lampe eines Landes, und du siehst, warum Beleuchtungstechnik so viel
          ausmachte.
        </p>

        <h2>Belastbarkeit: warum Bauteile verbrennen</h2>
        <p>
          Jedes reale Bauteil kann Wärme nur begrenzt schnell loswerden. Ein üblicher kleiner
          Widerstand ist mit <strong>¼ Watt</strong> spezifiziert — verlang mehr von ihm, und
          er verkocht, driftet, raucht und geht schließlich in Unterbrechung. Die Prüfung ist
          ein Einzeiler mit P = V²/R. Leg 330 Ω direkt an 9 V: P = 81/330 ≈ 0,245 W — das sind
          98 % der Belastbarkeit, technisch überlebbar, aber schlechte Praxis. Derselbe
          Widerstand an 12 V: 0,44 W — er wird verbrennen. Diese winzige Rechnung ist eine
          Profi-Gewohnheit, die du dir jetzt zulegen solltest.
        </p>
        <div className="callout tip">
          <span className="co-title">Faustregel</span>
          <p>
            Halte Bauteile für ein langes, kühles Leben unter etwa der Hälfte ihrer
            spezifizierten Leistung. Sagt die Rechnung mehr, nimm einen größeren
            Widerstandswert, ein kräftigeres Bauteil — oder überdenke die Schaltung.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Watt, Wärme & die Stromrechnung",
      intro: (
        <>
          <p>Links: eine Birne, deren Helligkeit reines P = V×I ist. Rechts: ein ¼-W-Widerstand im Hitze-Check bei deiner gewählten Spannung.</p>
          <ul>
            <li>Finde drei verschiedene V–I-Kombinationen, die genau 6 W ergeben.</li>
            <li>Leg 330 Ω an 9 V und lies den Belastungsbalken ab — dann probiere 12 V. 🔥</li>
            <li>Stell deinen lokalen Strompreis ein und sieh die Monatskosten der Birne.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein Motor zieht 1,5 A aus einer 12-V-Batterie. Wie viel Leistung nimmt er auf?",
        answer: 18,
        unit: "W",
        hint: "P = V · I.",
        explain: "P = 12 × 1,5 = 18 W.",
      },
      {
        prompt: "Ein 470-Ω-Widerstand liegt direkt an einer 9-V-Schiene. Wie viel Leistung muss er abführen?",
        answer: 81 / 470,
        unit: "W",
        hint: "Du kennst die Spannung über ihm: P = V² / R.",
        explain: "P = 81 / 470 ≈ 0,172 W — das sind 69 % einer ¼-W-Belastbarkeit: warm, aber überlebbar.",
      },
      {
        prompt: "Ein 40-W-Lötkolben läuft 2,5 Stunden. Wie viel Energie hat er verbraucht, in Wattstunden?",
        answer: 100,
        unit: "Wh",
        hint: "Energie = Leistung × Zeit. Watt × Stunden ergibt direkt Wattstunden.",
        explain: "40 W × 2,5 h = 100 Wh = 0,1 kWh — ungefähr drei Cent Strom.",
      },
    ],
    quiz: [
      {
        q: "Über einem Bauteil fallen 5 V ab, während 2 A hindurchfließen. Seine Verlustleistung ist…",
        choices: ["2,5 W", "7 W", "10 W", "3 W"],
        answer: 2,
        explain: "P = V × I = 5 × 2 = 10 W.",
      },
      {
        q: "Welche Formel liefert die Leistung eines Widerstands direkt aus der Spannung über ihm?",
        choices: ["P = V × R", "P = V²/R", "P = I²/R", "P = R/V"],
        answer: 1,
        explain: "Setzt man I = V/R in P = VI ein, ergibt sich P = V²/R.",
      },
      {
        q: "Ein 100-W-Gerät läuft 10 Stunden. Verbrauchte Energie?",
        choices: ["0,1 kWh", "1 kWh", "10 kWh", "1000 kWh"],
        answer: 1,
        explain: "100 W × 10 h = 1000 Wh = 1 kWh — eine 'Einheit' auf deiner Stromrechnung.",
      },
      {
        q: "Ein ¼-W-Widerstand mit 330 Ω wird direkt an 12 V gelegt. Was passiert?",
        choices: [
          "Nichts — Widerstände können nicht überhitzen",
          "P = 144/330 ≈ 0,44 W, weit über der Belastbarkeit: er überhitzt",
          "Die Spannung sinkt, um ihn zu schützen",
          "Es funktioniert, denn 12 V sind eine sichere Spannung",
        ],
        answer: 1,
        explain:
          "P = V²/R = 0,44 W ≈ 175 % der ¼-W-Belastbarkeit. Eine für dich sichere Spannung ist nicht dasselbe wie eine sichere Leistung fürs Bauteil.",
      },
    ],
  },

  /* ================================================================ */
  "series-parallel": {
    Theory: () => (
      <>
        <h2>Reihenschaltung: ein Pfad</h2>
        <p>
          Bauteile in <strong>Reihe</strong> bilden eine einzige Kette — derselbe Strom fädelt
          sich durch jedes einzelne (es gibt keinen anderen Weg). Jeder Widerstand nimmt sich
          seinen eigenen Happen der Batteriespannung (V<sub>i</sub> = I·R<sub>i</sub>), und die
          Happen ergeben zusammen immer die volle Versorgung. Der Gesamtwiderstand addiert sich
          einfach:
        </p>
        <div className="formula">R_series = R₁ + R₂ + R₃ + …</div>
        <p>
          Altmodische Weihnachtsbeleuchtung war in Reihe verdrahtet — eine tote Birne
          unterbrach den einzigen Pfad, und die ganze Kette wurde dunkel. Die Reihenschaltung
          ist auch der Grund, warum zusätzlicher Widerstand irgendwo in der Kette den Strom
          überall in ihr drosselt.
        </p>

        <h2>Parallelschaltung: viele Pfade</h2>
        <p>
          Bauteile in <strong>Parallelschaltung</strong> liegen an denselben zwei Knoten — sie
          sehen also alle die <em>gleiche Spannung</em>, und jedes zieht nach dem Ohmschen
          Gesetz seinen eigenen Strom. Die Ströme addieren sich. Mehr Pfade bedeuten insgesamt{" "}
          <em>leichteren</em> Fluss, deshalb ist der Gesamtwiderstand immer{" "}
          <em>kleiner als der kleinste Zweig</em>:
        </p>
        <div className="formula">
          1/R_parallel = 1/R₁ + 1/R₂ + 1/R₃ + …
          <span className="note">zwei Widerstände: R = R₁R₂ / (R₁ + R₂) · zwei gleiche R → R/2</span>
        </div>
        <p>
          Dein Haus ist parallel verdrahtet: Jede Steckdose bekommt die volle Netzspannung,
          jedes Gerät zieht, was es braucht, und eines auszuschalten verdunkelt nicht die
          anderen.
        </p>

        <h2>Intuition für gemischte Netzwerke</h2>
        <p>
          Echte Schaltungen mischen beides. Die Strategie ist immer dieselbe: Finde eine rein
          serielle oder rein parallele Gruppe, ersetze sie durch ihren äquivalenten
          Einzelwiderstand, zeichne neu und wiederhole, bis nur ein Widerstand übrig ist. Zwei
          Anker halten dich bei Verstand: <strong>In Reihe dominiert der größte Widerstand</strong>{" "}
          (er schnappt sich die Spannung); <strong>parallel dominiert der kleinste</strong>{" "}
          (er schnappt sich den Strom).
        </p>
        <div className="callout note">
          <span className="co-title">Plausibilitätschecks zum Auswendiglernen</span>
          <p>
            Zwei gleiche Widerstände: in Reihe das Doppelte, parallel die Hälfte. Ein
            zusätzlicher Widerstand parallel <em>senkt</em> den Gesamtwiderstand immer. Ist
            dein berechnetes Parallelergebnis größer als der kleinste Zweig, hast du dich
            verrechnet.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Ein Pfad oder viele",
      intro: (
        <>
          <p>Drei Widerstände an einer 9-V-Batterie, verdrahtet, wie du willst.</p>
          <ul>
            <li>Mach in Reihe R3 riesig — sieh zu, wie er die Spannung an sich reißt, während der Strom einbricht.</li>
            <li>Wechsle mit denselben Widerständen auf parallel: Der Gesamtstrom springt hoch. Warum?</li>
            <li>Stell alle drei parallel auf 100 Ω und prüfe, dass R_eq exakt 33,3 Ω ist.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "1 kΩ, 2,2 kΩ und 470 Ω in Reihe. Gesamtwiderstand?",
        answer: 3670,
        unit: "Ω",
        hint: "In Reihe wird einfach addiert.",
        explain: "1000 + 2200 + 470 = 3670 Ω = 3,67 kΩ.",
      },
      {
        prompt: "Zwei 1-kΩ-Widerstände parallel. Gesamtwiderstand?",
        answer: 500,
        unit: "Ω",
        hint: "Gleiches Paar parallel → die Hälfte.",
        explain: "1k·1k/(1k+1k) = 500 Ω.",
      },
      {
        prompt: "Ein 470-Ω-Widerstand parallel zu einem 1-kΩ-Widerstand. Gesamtwiderstand?",
        answer: (470 * 1000) / 1470,
        unit: "Ω",
        hint: "Produkt durch Summe: R₁R₂/(R₁+R₂). Plausibilitätscheck: unter 470!",
        explain: "470·1000/1470 ≈ 320 Ω — unter dem kleinsten Zweig, wie bei parallel immer.",
      },
    ],
    quiz: [
      {
        q: "Zwei 100-Ω-Widerstände in Reihe ergeben…",
        choices: ["50 Ω", "100 Ω", "200 Ω", "10 kΩ"],
        answer: 2,
        explain: "Reihenwiderstände addieren sich: 100 + 100 = 200 Ω.",
      },
      {
        q: "Zwei 100-Ω-Widerstände parallel ergeben…",
        choices: ["200 Ω", "100 Ω", "50 Ω", "25 Ω"],
        answer: 2,
        explain: "Ein gleiches Paar parallel halbiert: 100·100/(100+100) = 50 Ω.",
      },
      {
        q: "Was gilt für eine Parallelschaltung immer?",
        choices: [
          "Sie ist größer als der größte Zweig",
          "Sie ist kleiner als der kleinste Zweig",
          "Sie entspricht dem Durchschnitt",
          "Sie entspricht der Summe",
        ],
        answer: 1,
        explain:
          "Jeder zusätzliche Pfad erleichtert den Fluss, daher liegt die Kombination sogar unter dem kleinsten einzelnen Zweig.",
      },
      {
        q: "Welche Größe ist in einer Reihenkette in jedem Bauteil identisch?",
        choices: ["Die Spannung über jedem", "Die Leistung in jedem", "Der Strom durch jedes", "Der Widerstand von jedem"],
        answer: 2,
        explain:
          "Ein Pfad → ein Strom. Die Spannungen teilen sich proportional zu den Widerstandswerten auf; der Strom ist allen gemeinsam.",
      },
    ],
  },
};
