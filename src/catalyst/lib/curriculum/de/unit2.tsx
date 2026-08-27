import type { LessonContentDe } from "../localize";

export const unit2De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  reactions: {
    Theory: () => (
      <>
        <h2>Umordnung, keine Magie</h2>
        <p>
          Wenn Methan verbrennt, sieht es aus, als verschwände das Gas in Wärme. Tut es nicht. Eine{" "}
          <strong>chemische Reaktion</strong> tut nur eines: Sie{" "}
          <strong>bricht einige Bindungen und knüpft andere</strong>. Die Atome selbst — jeder
          Kohlenstoff, jeder Wasserstoff, jeder Sauerstoff — kommen auf der anderen Seite wieder
          heraus, nur neu gemischt zu anderen Molekülen. Antoine Lavoisier bewies das 1789, indem
          er zwanghaft alles wog: In einem geschlossenen System ist die Masse vorher gleich der
          Masse nachher. Das ist der <strong>Massenerhaltungssatz</strong>, und es ist eine
          Buchhaltung, auf die du dein Leben verwetten kannst (deine Zellen tun es ständig).
        </p>

        <h2>Der chemische Satz</h2>
        <p>
          Wir schreiben Reaktionen als Gleichungen: <strong>Edukte → Produkte</strong>. Der Pfeil
          heißt &bdquo;reagieren zu&ldquo;. Aber eine rohe Gleichung wie <code>H₂ + O₂ → H₂O</code> ist
          gelogen — zähle die Sauerstoffe: zwei links, einer rechts. Ein Atom ist verschwunden, was
          Lavoisier verbietet. Die Reparatur heißt <strong>Ausgleichen</strong>: Setze
          Vorfaktoren (<strong>Koeffizienten</strong>) vor ganze Moleküle, bis jedes Element auf
          beiden Seiten gleich oft vorkommt:
        </p>
        <div className="formula">
          2 H₂ + O₂ → 2 H₂O
          <span className="note">4 H und 2 O auf jeder Seite — die Bilanz stimmt</span>
        </div>
        <p>
          Die eiserne Regel: Du darfst <strong>nur Koeffizienten ändern, niemals die kleinen
          Indexzahlen</strong>. H₂O₂ zu schreiben, um die Sauerstoffzahl zu &bdquo;reparieren&ldquo;, gleicht
          nicht Wasser aus — es erfindet Wasserstoffperoxid, einen völlig anderen Stoff (bitte
          nicht trinken).
        </p>

        <h2>Eine Strategie, die immer funktioniert</h2>
        <ol>
          <li>Gleiche zuerst Elemente aus, die auf jeder Seite nur an einer Stelle vorkommen.</li>
          <li>Hebe einzelne Elemente (wie O₂ oder Fe) für den Schluss auf — ihr Koeffizient ist ein freier Regler.</li>
          <li>Landest du bei einem Bruch, multipliziere alles durch, bis er verschwindet.</li>
          <li>Prüfe zum Schluss jedes Element — und ob sich die Koeffizienten nicht noch kürzen lassen.</li>
        </ol>

        <div className="callout note">
          <span className="co-title">Was Koeffizienten wirklich sagen</span>
          <p>
            <code>2 H₂ + O₂ → 2 H₂O</code> bedeutet nicht bloß &bdquo;2 Moleküle + 1 Molekül&ldquo;. Es
            bedeutet <em>jedes</em> Verhältnis 2 : 1 : 2 — 2 Dutzend, 2 Milliarden oder 2 Mol.
            Koeffizienten sind die Proportionen des Rezepts, und die nächsten zwei Lektionen machen
            aus diesem Rezept Gramm, die du abwiegen kannst.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Atom-Buchhalter",
      intro: (
        <>
          <p>Vier unausgeglichene Gleichungen, ein Waagebalken pro Element. Bring jeden Balken ins Gleichgewicht.</p>
          <ul>
            <li>Fang mit H₂ + O₂ → H₂O an — zwei Regler lösen es.</li>
            <li>Rost (Fe + O₂ → Fe₂O₃) braucht den Bruch-Trick: Es geht bei 4 : 3 : 2 auf.</li>
            <li>Gleiche eine Gleichung mit verdoppelten Koeffizienten aus und lies das Kleingedruckte.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was macht eine chemische Reaktion mit den Atomen?",
        choices: [
          "Sie erzeugt neue Atome und vernichtet alte",
          "Sie ordnet sie zu neuen Kombinationen um — keines entsteht oder verschwindet",
          "Sie wandelt sie in reine Energie um",
          "Sie schmilzt sie zusammen",
        ],
        answer: 1,
        explain:
          "Reaktionen brechen und knüpfen Bindungen; alle Atome überleben. Massenerhaltung ist der Grund, warum Gleichungen ausgeglichen sein müssen.",
      },
      {
        q: "Zum Ausgleichen einer Gleichung darfst du ändern…",
        choices: [
          "die Indexzahlen in den Formeln",
          "die Koeffizienten vor den Formeln",
          "beides frei",
          "keines von beidem — manche Gleichungen gehen einfach nicht auf",
        ],
        answer: 1,
        explain:
          "Koeffizienten vervielfachen ganze Moleküle und stehen dir frei. Einen Index zu ändern, ändert den Stoff selbst (H₂O → H₂O₂ ist eine andere Chemikalie).",
      },
      {
        q: "In 2 H₂ + O₂ → 2 H₂O sagen dir die Koeffizienten 2 : 1 : 2…",
        choices: [
          "die Massen der Stoffe",
          "das Reaktionsverhältnis — gültig für Moleküle, Dutzende und Mol gleichermaßen",
          "die nötige Temperatur",
          "wie schnell die Reaktion läuft",
        ],
        answer: 1,
        explain:
          "Koeffizienten sind Proportionen, wie ein Rezept: zwei Teile Wasserstoff auf einen Teil Sauerstoff ergeben zwei Teile Wasser, egal wie groß die Charge ist.",
      },
      {
        q: "Methan verbrennt in einem versiegelten 100-g-Behälter. Nach dem Brand wiegt der Behälter…",
        choices: ["weniger — Gas entwich als Energie", "mehr — Wärme fügte Masse hinzu", "genau 100 g", "das hängt von der Flamme ab"],
        answer: 2,
        explain:
          "Geschlossenes System, gleiche Atome, gleiche Masse. Die freigesetzte Energie stammt aus der Bindungsumordnung, nicht aus vernichteter Materie (Kernreaktionen sind ein anderer Kurs).",
      },
    ],
  },

  /* ================================================================ */
  mole: {
    Theory: () => (
      <>
        <h2>Eine Zähleinheit, mehr nicht</h2>
        <p>
          Ein Paar ist 2, ein Dutzend ist 12, ein <strong>Mol</strong> ist 6,022 × 10²³ — das ist
          die ganze Definition. Die Zahl (<strong>Avogadro-Zahl, N<sub>A</sub></strong>) sieht
          absurd aus, ist aber mit chirurgischer List gewählt:{" "}
          <strong>Ein Mol eines Stoffes wiegt seine Atom-/Molekülmasse in Gramm</strong>.
          Kohlenstoff-12-Atome haben die Massenzahl 12 → ein Mol Kohlenstoff wiegt 12 g.
          Wassermoleküle wiegen 18 u → ein Mol Wasser sind 18 g, etwa ein Schluck.
        </p>
        <div className="formula">
          n = m / M
          <span className="note">Stoffmenge = Masse in Gramm ÷ molare Masse in g/mol (M liest du im Periodensystem ab)</span>
        </div>
        <p>
          Das ist die Brücke zwischen dem Unsichtbaren und dem Wiegbaren. Du kannst Moleküle nicht
          zählen, aber du <em>kannst</em> 18 g Wasser abwiegen — und weißt dann mit Gewissheit, dass
          du 6,022 × 10²³ Moleküle in der Hand hältst. Die Waage wird zum Teilchenzähler.
        </p>

        <h2>Molare Masse aus einer Formel</h2>
        <p>
          Addiere die Atommassen aus dem Periodensystem. Wasser H₂O: 2 × 1,008 + 16,00 = 18,02
          g/mol. Kohlendioxid CO₂: 12,01 + 2 × 16,00 = 44,01 g/mol. Haushaltszucker C₁₂H₂₂O₁₁: 342,3
          g/mol. Das ist die ganze Kunst — Addition mit einer Landkarte.
        </p>

        <h2>Teilchen zählen</h2>
        <div className="formula">
          N = n · N<sub>A</sub>
          <span className="note">Teilchen = Stoffmenge × 6,022 × 10²³</span>
        </div>

        <div className="callout note">
          <span className="co-title">Wie groß ist 6 × 10²³ wirklich?</span>
          <p>
            Ein Mol Marshmallows würde Deutschland etwa 1000 km hoch bedecken. Ein Mol
            Wassermoleküle passt in ein Schnapsglas. Dieser Kontrast — eine unvorstellbar große
            Zahl, versteckt in Mengen, die du täglich anfasst — ist der Grund, warum die Chemie das
            Mol braucht: Die Wirklichkeit arbeitet in Armeen, und das Mol ist der Name der Armee.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Teilchenzähler",
      intro: (
        <>
          <p>Links eine Waage, rechts die Umrechnungskette.</p>
          <ul>
            <li>Stelle Wasser auf genau 18 g — lies exakt ein Mol ab.</li>
            <li>Dieselben 100 g Wasser vs. Eisen: Was enthält mehr Teilchen, und warum?</li>
            <li>Beobachte die Teilchenzahl: Bei laborüblichen Mengen verlässt sie nie die Gegend von 10²³–10²⁴.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Mol eines Stoffes enthält immer…",
        choices: ["1 Gramm Materie", "6,022 × 10²³ Teilchen", "22,4 Liter", "die gleiche Anzahl Protonen"],
        answer: 1,
        explain:
          "Das Mol ist eine Anzahl, wie 'Dutzend': 6,022 × 10²³ von dem, was du zählst — Atome, Moleküle, Ionen.",
      },
      {
        q: "Warum ist die Avogadro-Zahl genau dieser krumme Wert?",
        choices: [
          "Sie wurde zufällig gewählt",
          "Damit ein Mol eines Stoffes seine Teilchenmasse in Gramm wiegt",
          "Es ist die Anzahl Atome im menschlichen Körper",
          "Zu Ehren von Avogadros Geburtstag",
        ],
        answer: 1,
        explain:
          "N_A rechnet atomare Masseneinheiten in Gramm um: ein 12-u-Kohlenstoffatom → 12 g pro Mol Kohlenstoff. Das macht die Waage zum Teilchenzähler.",
      },
      {
        q: "Wie groß ist die molare Masse von CO₂ (C = 12,01, O = 16,00)?",
        choices: ["28,01 g/mol", "44,01 g/mol", "32,00 g/mol", "12,01 g/mol"],
        answer: 1,
        explain: "12,01 + 2 × 16,00 = 44,01 g/mol. Molare Masse ist schlicht das Addieren der Tabellenwerte in der Formel.",
      },
      {
        q: "Du hast 100 g Wasser und 100 g Eisen. Was enthält mehr Teilchen?",
        choices: [
          "Das Eisen — Metallatome sind dichter gepackt",
          "Das Wasser — seine molare Masse (18) ist viel kleiner als die von Eisen (56)",
          "Beide gleich — gleiche Masse, gleiche Teilchen",
          "Lässt sich nicht bestimmen",
        ],
        answer: 1,
        explain:
          "n = m/M: 100/18 ≈ 5,6 mol Wasser gegenüber 100/55,85 ≈ 1,8 mol Eisen. Leichtere Teilchen → mehr davon pro Gramm.",
      },
    ],
    problems: [
      {
        prompt: "Wie viele Mol stecken in 90 g Wasser (M = 18,02 g/mol)?",
        answer: 4.994,
        unit: "mol",
        hint: "n = m / M.",
        explain: "90 / 18,02 ≈ 5,0 mol.",
      },
      {
        prompt: "Welche Masse haben 0,25 mol CO₂ (M = 44,01 g/mol)?",
        answer: 11.0,
        unit: "g",
        hint: "Stelle n = m/M um zu m = n × M.",
        explain: "0,25 × 44,01 ≈ 11,0 g.",
      },
      {
        prompt: "Wie groß ist die molare Masse von Glucose, C₆H₁₂O₆ (C = 12,01, H = 1,008, O = 16,00)?",
        answer: 180.16,
        unit: "g/mol",
        hint: "6 Kohlenstoffe + 12 Wasserstoffe + 6 Sauerstoffe — alles addieren.",
        explain: "6×12,01 + 12×1,008 + 6×16,00 = 180,16 g/mol.",
      },
      {
        prompt: "Wie viele Moleküle sind in 2,5 mol Wasser? (Antwort in Molekülen; Schreibweisen wie 1.5e24 funktionieren.)",
        answer: 1.5055e24,
        unit: "Moleküle",
        hint: "N = n × N_A = n × 6,022 × 10²³.",
        explain: "2,5 × 6,022 × 10²³ ≈ 1,51 × 10²⁴ Moleküle.",
      },
    ],
  },

  /* ================================================================ */
  stoichiometry: {
    Theory: () => (
      <>
        <h2>Die dreistufige Maschine</h2>
        <p>
          <strong>Stöchiometrie</strong> (von griechisch <em>stoicheion</em>, Element) beantwortet
          Fragen wie: &bdquo;Wie viel CO₂ setzt das Verbrennen von 10 g Methan frei?&ldquo; Die Maschine hat
          drei Gänge, immer dieselben:
        </p>
        <ol>
          <li>
            <strong>Gramm → Mol</strong> für das, was du kennst (n = m/M).
          </li>
          <li>
            <strong>Mol → Mol</strong> über das Koeffizientenverhältnis der ausgeglichenen
            Gleichung.
          </li>
          <li>
            <strong>Mol → Gramm</strong> für das, was du suchst (m = n·M).
          </li>
        </ol>
        <div className="formula">
          CH₄ + 2 O₂ → CO₂ + 2 H₂O
          <span className="note">1 mol CH₄ liefert 1 mol CO₂ — also ergeben 10 g CH₄ (0,62 mol) genau 0,62 mol = 27,4 g CO₂</span>
        </div>
        <p>
          Beachte die Form des Tricks: Vergleiche <em>niemals</em> Gramm direkt mit Gramm. Gramm
          verschiedener Stoffe sind nicht vergleichbar — Mol schon. Rein umrechnen, quer verhältnis
          bilden, raus umrechnen.
        </p>

        <h2>Das limitierende Edukt</h2>
        <p>
          Rezepte scheitern realistisch: Du hast Mehl für 30 Pfannkuchen, aber Eier für 12 — du
          bekommst 12 Pfannkuchen und übrig gebliebenes Mehl. Reaktionen sind identisch. Welches
          Edukt zuerst ausgeht, ist das <strong>limitierende Edukt</strong>; es allein bestimmt die
          Ausbeute, und der Überschuss des anderen liegt nur herum. Um es zu finden, rechne beide
          Edukte in Mol um, teile jedes durch seinen Koeffizienten — der{" "}
          <strong>kleinere Quotient verliert</strong>.
        </p>

        <div className="callout tip">
          <span className="co-title">Warum Ingenieure sich dafür interessieren</span>
          <p>
            Industriechemie ist Stöchiometrie mit Geld dran: Füttere einen Reaktor mit dem falschen
            Verhältnis und du verschwendest entweder teures Edukt oder lässt Produkt ungemacht.
            Dieselbe Rechnung dosiert den CO₂-Ballon im Küchen-Abschlussprojekt von Einheit 4 —
            Natron und Essig im richtigen Verhältnis, nichts verschwendet.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Limitierendes-Edukt-Mischer",
      intro: (
        <>
          <p>Mische Wasserstoff und Sauerstoff in beliebigen Mengen; die Reaktion 2 H₂ + O₂ → 2 H₂O nimmt, was sie kriegen kann.</p>
          <ul>
            <li>Stelle 4 mol H₂ und 4 mol O₂ ein — Sauerstoff bleibt übrig. Warum?</li>
            <li>Finde das perfekte Verhältnis, bei dem sich beide Balken zugleich leeren.</li>
            <li>Verdopple nur den Sauerstoff — bringt mehr O₂ auch mehr Wasser?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Warum muss die Stöchiometrie Gramm in Mol umrechnen, bevor sie Stoffe vergleicht?",
        choices: [
          "Gramm sind ungenau",
          "Die Koeffizienten der Gleichung zählen Teilchen (Mol), nicht Masse",
          "Mol lassen sich leichter wiegen",
          "Das ist Tradition",
        ],
        answer: 1,
        explain:
          "Die ausgeglichene Gleichung spricht in Teilchenverhältnissen. 2 g H₂ und 2 g O₂ sind völlig verschiedene Teilchenzahlen — Mol macht sie vergleichbar.",
      },
      {
        q: "Für 2 H₂ + O₂ → 2 H₂O mischst du 6 mol H₂ mit 2 mol O₂. Das limitierende Edukt ist…",
        choices: ["H₂", "O₂ — es geht aus, nachdem 4 mol Wasser entstanden sind", "Wasser", "keines von beiden"],
        answer: 1,
        explain:
          "Teile durch die Koeffizienten: H₂ ergibt 6/2 = 3 'Portionen', O₂ ergibt 2/1 = 2. Der kleinere Quotient von O₂ begrenzt die Ausbeute auf 4 mol H₂O und lässt 2 mol H₂ ungenutzt.",
      },
      {
        q: "Mehr vom überschüssigen Edukt zuzugeben…",
        choices: [
          "erhöht die Ausbeute proportional",
          "ändert nichts — das limitierende Edukt entscheidet weiterhin",
          "beschleunigt die Zeit",
          "verdoppelt immer das Produkt",
        ],
        answer: 1,
        explain:
          "Die Ausbeute hängt an dem, was zuerst ausgeht. Zusätzliches Überschuss-Edukt vergrößert nur den Restehaufen.",
      },
      {
        q: "Das Verbrennen von 1 mol CH₄ (CH₄ + 2 O₂ → CO₂ + 2 H₂O) verbraucht wie viel O₂?",
        choices: ["1 mol", "2 mol", "0,5 mol", "4 mol"],
        answer: 1,
        explain: "Die Koeffizienten sagen 1 : 2 — jedes Mol Methan verbrennt zwei Mol Sauerstoff.",
      },
    ],
    problems: [
      {
        prompt: "Methan verbrennt: CH₄ + 2 O₂ → CO₂ + 2 H₂O. Wie viele Gramm CO₂ (M = 44,01) entstehen aus 16,04 g CH₄ (M = 16,04)?",
        answer: 44.01,
        unit: "g",
        hint: "16,04 g CH₄ sind genau 1 mol; das Verhältnis CH₄:CO₂ ist 1:1.",
        explain: "1 mol CH₄ → 1 mol CO₂ = 44,01 g.",
      },
      {
        prompt: "2 H₂ + O₂ → 2 H₂O. Wie viele Mol Wasser entstehen aus 3 mol H₂ und reichlich O₂?",
        answer: 3,
        unit: "mol",
        hint: "Das Verhältnis H₂ : H₂O ist 2 : 2 = 1 : 1.",
        explain: "Verhältnis 1:1 → 3 mol H₂ ergeben 3 mol H₂O.",
      },
      {
        prompt: "Natron-Vulkan: NaHCO₃ + CH₃COOH → CO₂ + … . Mit M(NaHCO₃) = 84,01 und M(CO₂) = 44,01: Wie viele Gramm CO₂ setzen 10 g Natron frei (Verhältnis 1:1)?",
        answer: 5.24,
        unit: "g",
        hint: "Gramm → Mol (÷84,01), Verhältnis 1:1, Mol → Gramm (×44,01).",
        explain: "10/84,01 = 0,119 mol → 0,119 × 44,01 ≈ 5,24 g CO₂.",
      },
      {
        prompt: "2 H₂ + O₂ → 2 H₂O mit 5 mol H₂ und 2 mol O₂. Wie viele Mol H₂ bleiben übrig?",
        answer: 1,
        unit: "mol",
        hint: "O₂ limitiert: 2 mol O₂ verbrauchen 4 mol H₂.",
        explain: "Portionen: H₂ 5/2 = 2,5, O₂ 2/1 = 2 → O₂ limitiert, verbraucht 4 mol H₂, 1 mol bleibt.",
      },
    ],
  },
};
