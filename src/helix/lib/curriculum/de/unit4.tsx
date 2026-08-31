import type { LessonContentDe } from "../localize";

export const unit4De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  mendel: {
    Theory: () => (
      <>
        <h2>Das Vermischungsproblem</h2>
        <p>
          Vor 1865 war die verbreitete Annahme, Vererbung würde <em>vermischen</em>: Kreuze eine
          hohe Pflanze mit einer niedrigen und erhalte mittelhohe Nachkommen, wie beim Mischen von
          Farbe. Das ist eingängig — und für Darwins Theorie tödlich. Vermischung halbiert die
          Variation in jeder Generation; nach ein paar Dutzend Generationen ist alles einheitlich,
          und der Selektion bleibt nichts mehr, woran sie ansetzen könnte. Darwin kannte dieses
          Problem und hat es nie gelöst.
        </p>
        <p>
          Die Lösung war bereits veröffentlicht — von einem Augustinermönch, der in einem
          Klostergarten Erbsen zählte — und wurde fünfunddreißig Jahre lang ignoriert.
        </p>

        <h2>Was Gregor Mendel tat</h2>
        <p>
          Mendel wählte Erbsenpflanzen mit sauberen Entweder-oder-Merkmalen — hoch oder niedrig,
          rund oder runzlig, gelb oder grün — und, entscheidend: Er <strong>zählte</strong> seine
          Nachkommen. Zu Tausenden. Die Biologie jener Zeit beschrieb; Mendel maß.
        </p>
        <p>
          Er kreuzte reinerbig Hoch mit reinerbig Niedrig — und bekam keine mittelhohen Pflanzen.
          Die erste Generation war <strong>komplett hoch</strong>. Die Niedrigkeit war
          verschwunden. Dann ließ er diese Pflanzen sich selbst bestäuben, und die Niedrigkeit kam
          zurück — in fast exakt einem Viertel der Nachkommen.
        </p>
        <div className="formula">
          F₂-Verhältnis ≈ 3 : 1
          <span className="note">Mendel zählte 787 hohe zu 277 niedrigen — 2,84 : 1</span>
        </div>
        <p>
          Ein Merkmal, das vollständig verschwindet und unversehrt zurückkehrt, kann nicht
          vermischt worden sein. Die erste Generation hat es unverändert und verborgen{" "}
          <em>getragen</em>. Vererbung ist <strong>partikulär</strong> — sie kommt in Einheiten.
        </p>

        <h2>Das Vokabular</h2>
        <ul>
          <li>
            <strong>Gen</strong> — ein DNA-Abschnitt, der ein Merkmal vorgibt.{" "}
            <strong>Allel</strong> — eine bestimmte Version davon (hoch oder niedrig).
          </li>
          <li>
            Jeder Organismus trägt <strong>zwei Allele</strong> pro Gen, eines von jedem Elternteil.
          </li>
          <li>
            <strong>Dominant</strong> (großgeschrieben, A) zeigt sich, sobald es da ist;{" "}
            <strong>rezessiv</strong> (kleingeschrieben, a) zeigt sich nur, wenn beide Kopien
            rezessiv sind.
          </li>
          <li>
            <strong>Genotyp</strong> — die Allele, die du trägst (AA, Aa, aa).{" "}
            <strong>Phänotyp</strong> — das, was man tatsächlich beobachtet.
          </li>
          <li>
            <strong>Homozygot</strong> — zwei gleiche Allele. <strong>Heterozygot</strong> — je
            eines: ein <em>Träger</em> des rezessiven.
          </li>
        </ul>
        <p>
          AA und Aa sehen identisch aus. Diese eine Tatsache erklärt fast jedes Rätsel der
          Familiengenetik — auch, wie zwei braunäugige Eltern ein blauäugiges Kind bekommen, und
          warum Mukoviszidose in einer Familie ohne jede Vorgeschichte auftauchen kann.
        </p>

        <h2>Das Punnett-Quadrat</h2>
        <p>
          Kreuze zwei Heterozygote (Aa × Aa). Jeder Elternteil gibt mit gleicher Wahrscheinlichkeit
          A oder a, also sind die vier gleich wahrscheinlichen Kombinationen AA, Aa, aA und aa:
        </p>
        <div className="formula">
          1 AA : 2 Aa : 1 aa &nbsp;→&nbsp; 3 zeigen dominant : 1 zeigt rezessiv
          <span className="note">das Genotyp-Verhältnis ist 1:2:1; das Phänotyp-Verhältnis 3:1</span>
        </div>
        <p>
          Wichtig: Das sind <strong>Wahrscheinlichkeiten, keine Garantien</strong>. Vier Nachkommen
          aus einer Aa × Aa-Kreuzung sind so wenig zuverlässig 3:1 wie vier Münzwürfe zuverlässig
          zwei Mal Kopf zeigen. Mendels Verhältnisse traten hervor, weil er Tausende zählte. Jede
          genetische Beratung muss das erklären: Ein 1-zu-4-Risiko gilt für jedes Kind aufs Neue —
          und wird nicht zu 0 zu 4, weil die ersten drei gesund waren.
        </p>

        <div className="callout note">
          <span className="co-title">Mendel hatte keine Ahnung, was ein Gen ist</span>
          <p>
            Er wusste nichts von DNA, Chromosomen oder Meiose — nichts davon war beschrieben. Er
            erschloss diskrete Erbeinheiten allein aus Verhältnissen in gezählten Nachkommen. Sein
            Aufsatz blieb ungelesen bis 1900, als drei Forscher unabhängig dieselben Regeln
            wiederentdeckten — und feststellten, dass er ihnen eine Generation voraus war. Eines
            der besten Argumente der Wissenschaft dafür, Dinge zu zählen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Punnett-Quadrat",
      intro: (
        <>
          <p>Wähle zwei Eltern und lies die Nachkommen direkt aus dem Gitter ab.</p>
          <ul>
            <li>Kreuze Aa × Aa — das klassische 3:1. Eines von vier Nachkommen zeigt das rezessive Merkmal.</li>
            <li>Kreuze nun AA × aa. Jeder Nachkomme ist Aa: Das Rezessive verschwindet für eine ganze Generation.</li>
            <li>Finde die einzige Kreuzung, bei der das Rezessive in der <em>Hälfte</em> der Nachkommen erscheint.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Wie viel Prozent der Nachkommen einer Aa × Aa-Kreuzung zeigen erwartungsgemäß den rezessiven Phänotyp?",
        answer: 25,
        unit: "%",
        hint: "Nur aa zeigt ihn, und das ist ein Feld von vier.",
        explain: "1 von 4 = 25 %. Die anderen drei (AA, Aa, Aa) zeigen alle den dominanten Phänotyp.",
      },
      {
        prompt:
          "Zwei Träger (Aa) bekommen vier Kinder. Wie groß ist die Wahrscheinlichkeit, dass alle vier nicht betroffen sind (nicht aa)? Als Prozentzahl.",
        answer: 31.6,
        unit: "%",
        tolerancePct: 4,
        hint: "Jedes Kind ist mit 3/4 nicht betroffen, und die Kinder sind unabhängig.",
        explain: "(3/4)⁴ = 81/256 ≈ 0,316, also etwa 32 %. Jedes Kind ist ein unabhängiges 1-zu-4-Risiko.",
      },
    ],
    quiz: [
      {
        q: "Warum ist Vermischungsvererbung für Darwins Theorie tödlich?",
        choices: [
          "Sie ist zu langsam",
          "Sie halbiert die Variation in jeder Generation und lässt der Selektion nichts zum Ansetzen",
          "Sie setzt DNA voraus, die unbekannt war",
          "Sie funktioniert nur bei Pflanzen",
        ],
        answer: 1,
        explain:
          "Vermischung zerstört Variation. Partikuläre Vererbung bewahrt Allele intakt, selbst wenn sie verborgen sind — genau das braucht die Selektion.",
      },
      {
        q: "Eine hohe Pflanze mit einer niedrigen gekreuzt ergibt lauter hohe Nachkommen. Was sagt dir das?",
        choices: [
          "Hochwuchs ist rezessiv",
          "Die niedrige Pflanze hatte keine Allele für Höhe",
          "Hochwuchs ist dominant, und die Nachkommen sind heterozygote Träger der Niedrigkeit",
          "Die Merkmale haben sich vermischt",
        ],
        answer: 2,
        explain:
          "Das rezessive Allel ist da, aber maskiert. Es taucht in etwa einem Viertel der nächsten Generation wieder auf — Beweis, dass es nie verloren war.",
      },
      {
        q: "Welches Phänotyp-Verhältnis liefert eine Aa × Aa-Kreuzung?",
        choices: ["1:1", "3:1 dominant zu rezessiv", "1:2:1", "9:3:3:1"],
        answer: 1,
        explain:
          "Die Genotypen sind 1 AA : 2 Aa : 1 aa, und da AA und Aa gleich aussehen, zeigen drei von vier den dominanten Phänotyp.",
      },
      {
        q: "Zwei braunäugige Eltern bekommen ein blauäugiges Kind. Wie?",
        choices: [
          "Beide Eltern sind heterozygote Träger, und das Kind hat von beiden das rezessive Allel geerbt",
          "Es muss eine neue Mutation passiert sein",
          "Blaue Augen sind dominant",
          "Das ist unmöglich",
        ],
        answer: 0,
        explain:
          "Beide Eltern sind Aa: Sie zeigen Braun und tragen Blau. Pro Kind besteht eine 1-zu-4-Chance, von beiden das rezessive Allel zu erben.",
      },
      {
        q: "Zwei Träger haben bereits drei nicht betroffene Kinder. Wie hoch ist das Risiko für das vierte?",
        choices: [
          "Null — das Risiko ist aufgebraucht",
          "Es hängt vom Geschlecht der ersten drei ab",
          "1 zu 2, weil sich die Chancen ausgleichen müssen",
          "Weiterhin 1 zu 4 — jede Empfängnis ist unabhängig",
        ],
        answer: 3,
        explain:
          "Jede Empfängnis ist ein unabhängiges Ereignis. Frühere Ergebnisse ändern nichts — der Spielerfehlschluss ist in der genetischen Beratung eine echte Gefahr.",
      },
    ],
  },

  /* ================================================================ */
  meiosis: {
    Theory: () => (
      <>
        <h2>Das Halbierungsproblem</h2>
        <p>
          Du hast 46 Chromosomen, in 23 Paaren — von jedem Paar eines von jedem Elternteil. Trügen
          Spermium und Eizelle je 46, hätten deine Kinder 92, deren Kinder 184, und in wenigen
          Generationen bräche alles zusammen.
        </p>
        <p>
          Gameten müssen also die <strong>Hälfte</strong> tragen: 23 Chromosomen, eines aus jedem
          Paar. Zellen mit vollem Satz sind <strong>diploid (2n)</strong>; Gameten sind{" "}
          <strong>haploid (n)</strong>. Die Teilung, die die Zahl halbiert, ist die{" "}
          <strong>Meiose</strong> — und für nichts anderes wird sie verwendet.
        </p>
        <p>
          Vergleiche sie mit der <strong>Mitose</strong>, der gewöhnlichen Teilung, die dich
          wachsen lässt und repariert: eine Zelle → zwei <em>identische</em> diploide Zellen.
          Meiose: eine Zelle → vier <em>verschiedene</em> haploide Zellen. Anderer Zweck, anderes
          Ergebnis.
        </p>

        <h2>Zwei Teilungen, vier Zellen</h2>
        <p>
          Die Chromosomen werden einmal kopiert, dann teilt sich die Zelle <em>zweimal</em>. So
          kommt man von 2n auf n.
        </p>
        <ul>
          <li>
            <strong>Teilung I</strong> trennt die <em>Paare</em> — je ein ganzes Chromosom jedes
            Paars auf jede Seite. Das ist der Reduktionsschritt.
          </li>
          <li>
            <strong>Teilung II</strong> trennt die Kopien innerhalb jedes Chromosoms — insgesamt
            vier haploide Zellen.
          </li>
        </ul>

        <h2>Drei Quellen der Vielfalt</h2>
        <p>
          Meiose ist nicht bloß Teilung — sie ist eine Mischmaschine, mit drei unabhängigen
          Mechanismen.
        </p>
        <p>
          <strong>1. Unabhängige Verteilung.</strong> Wenn sich die 23 Paare vor Teilung I
          aufstellen, orientiert sich jedes Paar zufällig, unabhängig von den anderen. Ob du das
          Chromosom 7 deiner Mutter weitergibst, hat nichts damit zu tun, wessen Chromosom 12 du
          weitergibst. Allein das ergibt 2²³ = <strong>8.388.608</strong> mögliche Kombinationen.
        </p>
        <p>
          <strong>2. Crossing-over.</strong> Bevor sie sich trennen, tauschen gepaarte Chromosomen
          physisch passende Abschnitte. Das Chromosom, das du weitergibst, ist deshalb weder das
          deiner Mutter noch das deines Vaters — es ist ein Mosaik aus beiden, in einer
          Kombination, die es nie zuvor gab.
        </p>
        <p>
          <strong>3. Zufällige Befruchtung.</strong> Irgendeines von Millionen möglichen Spermien
          trifft irgendeine von Millionen möglichen Eizellen.
        </p>
        <div className="formula">
          2²³ × 2²³ ≈ 7 × 10¹³ Kombinationen — vor jedem Crossing-over
          <span className="note">und das Crossing-over macht die wahre Zahl praktisch unbegrenzt</span>
        </div>
        <p>
          Darum ähneln sich Geschwister, ohne identisch zu sein — und darum sind eineiige
          Zwillinge, die das ganze Mischen überspringen, weil sie aus einer einzigen befruchteten
          Eizelle hervorgehen, so verblüffend.
        </p>

        <h2>Der Bogen zurück zu Mendel</h2>
        <p>
          Mendels Regeln sind die Meiose — beschrieben, bevor irgendjemand sie gesehen hatte. Seine
          „Einheiten“ trennen sich sauber, weil sich homologe Chromosomen in Teilung I physisch
          trennen. Sie verteilen sich unabhängig, weil sich die Paare unabhängig aufstellen. Mendel
          erschloss den Mechanismus allein aus Verhältnissen; als man Chromosomen Jahrzehnte später
          endlich unter dem Mikroskop beobachtete, taten sie exakt, was er vorhergesagt hatte.
        </p>
        <div className="callout warn">
          <span className="co-title">Wenn die Trennung misslingt</span>
          <p>
            Trennt sich ein Paar nicht — <em>Non-Disjunction</em> —, erhält ein Gamet ein Chromosom
            zu viel oder keines. Ein zusätzliches Chromosom 21 ergibt das Down-Syndrom. Das Risiko
            steigt mit dem Alter der Mutter, weil menschliche Eizellen die Meiose schon vor der
            Geburt beginnen und mittendrin pausieren — manchmal über Jahrzehnte —, bevor sie sie
            abschließen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Meiose-Stepper",
      intro: (
        <>
          <p>Geh Schritt für Schritt mit, wie aus einer Zelle vier werden — und woher die Vielfalt kommt.</p>
          <ul>
            <li>In Schritt 2 tauschen Chromosomen Abschnitte — die Farben mischen sich. Schalte das Crossing-over ab und vergleiche.</li>
            <li>In Schritt 3 stellen sich die Paare unabhängig auf. Allein das ergibt 2²³ Möglichkeiten.</li>
            <li>Die vier fertigen Gameten sind alle verschieden. Mitose hätte zwei identische Zellen geliefert.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Menschen haben 23 Chromosomenpaare. Wie viele Chromosomen-Kombinationen kann allein die unabhängige Verteilung in einem Gameten erzeugen?",
        answer: 8388608,
        unit: "Kombinationen",
        tolerancePct: 1,
        hint: "Jedes Paar orientiert sich unabhängig: 2 hoch Anzahl der Paare.",
        explain: "2²³ = 8.388.608 — und das, bevor das Crossing-over irgendetwas dazumischt.",
      },
      {
        prompt:
          "Ein Organismus hat 4 Chromosomenpaare. Wie viele genetisch verschiedene Gameten kann die unabhängige Verteilung erzeugen?",
        answer: 16,
        unit: "Gameten",
        hint: "2 hoch Anzahl der Paare.",
        explain: "2⁴ = 16 verschiedene Kombinationen.",
      },
    ],
    quiz: [
      {
        q: "Warum müssen Gameten haploid sein?",
        choices: [
          "Sie sind kleiner",
          "Sonst würde sich die Chromosomenzahl in jeder Generation verdoppeln",
          "Haploide Zellen teilen sich schneller",
          "Um Mutationen zu verhindern",
        ],
        answer: 1,
        explain:
          "Die Befruchtung vereint zwei Gameten. Jeder muss den halben Satz tragen, damit der Nachkomme mit einem vollen endet.",
      },
      {
        q: "Worin unterscheidet sich das Ergebnis der Meiose von dem der Mitose?",
        choices: [
          "Meiose liefert zwei identische diploide Zellen",
          "Es sind derselbe Prozess",
          "Meiose liefert vier genetisch verschiedene haploide Zellen",
          "Meiose erzeugt keine neuen Zellen",
        ],
        answer: 2,
        explain:
          "Mitose kopiert eine Zelle für Wachstum und Reparatur. Meiose halbiert die Chromosomenzahl und mischt die Allele — vier einzigartige Gameten.",
      },
      {
        q: "Was ist Crossing-over?",
        choices: [
          "Chromosomen verschiedener Arten verbinden sich",
          "Ein Kopierfehler in der DNA",
          "Zwei Gameten verschmelzen",
          "Gepaarte Chromosomen tauschen vor ihrer Trennung physisch passende Abschnitte aus",
        ],
        answer: 3,
        explain:
          "Homologe Chromosomen tauschen gleichwertige Abschnitte — jedes weitergegebene Chromosom ist ein Mosaik beider Eltern statt einer intakten Kopie eines Elternteils.",
      },
      {
        q: "Welche Phase der Meiose halbiert tatsächlich die Chromosomenzahl?",
        choices: [
          "Teilung I, wenn sich die homologen Paare trennen",
          "Teilung II, wenn sich die Chromatiden trennen",
          "Die DNA-Replikation davor",
          "Die Befruchtung",
        ],
        answer: 0,
        explain:
          "Teilung I schickt von jedem Paar ein ganzes Chromosom auf jede Seite — das ist die Reduktion. Teilung II trennt nur noch die Kopien.",
      },
      {
        q: "Warum sehen sich eineiige Zwillinge so viel ähnlicher als gewöhnliche Geschwister?",
        choices: [
          "Sie wurden gleichzeitig gezeugt",
          "Sie stammen aus einer befruchteten Eizelle und überspringen so das meiotische Mischen und die zufällige Befruchtung komplett",
          "Sie teilen sich eine Plazenta",
          "Sie haben doppelt so viele gemeinsame Chromosomen",
        ],
        answer: 1,
        explain:
          "Gewöhnliche Geschwister sind zwei unabhängige Züge aus ~7 × 10¹³ Kombinationen. Eineiige Zwillinge sind ein Zug, in zwei geteilt.",
      },
    ],
  },
};
