import type { LessonContentDe } from "../localize";

export const unit2De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  dna: {
    Theory: () => (
      <>
        <h2>Ein Alphabet aus vier Buchstaben</h2>
        <p>
          DNA — Desoxyribonukleinsäure — ist eine Kette aus vier Bausteinen, den{" "}
          <strong>Nukleotiden</strong>. Jedes hat drei Teile: einen Zucker (Desoxyribose), eine
          Phosphatgruppe und eine von vier <strong>Basen</strong>:
        </p>
        <ul>
          <li><strong>A</strong> — Adenin</li>
          <li><strong>T</strong> — Thymin</li>
          <li><strong>C</strong> — Cytosin</li>
          <li><strong>G</strong> — Guanin</li>
        </ul>
        <p>
          Zucker und Phosphate verbinden sich zu einem Rückgrat; die Basen ragen seitlich heraus.
          Das ist das ganze Molekül: eine eintönige Schiene mit einer Folge von vier Symbolen
          daran. Die Information steckt vollständig in der <em>Reihenfolge</em> der Basen — genau
          wie die Information dieses Satzes in der Reihenfolge seiner Buchstaben steckt und nicht
          in der Tinte.
        </p>

        <h2>Die Paarungsregel</h2>
        <p>
          DNA besteht aus zwei solchen Ketten, umeinander gewunden — die{" "}
          <strong>Doppelhelix</strong>, 1953 von Watson und Crick entschlüsselt, mithilfe von
          Rosalind Franklins Röntgenbeugungsbildern. Die beiden Stränge werden von
          Wasserstoffbrücken zwischen den Basen zusammengehalten, und hier ist die Regel, an der
          alles Weitere hängt:
        </p>
        <div className="formula">
          A paart nur mit T &nbsp;·&nbsp; C paart nur mit G
          <span className="note">A–T mit zwei Wasserstoffbrücken, C–G mit drei</span>
        </div>
        <p>
          Das ist nicht willkürlich. A und G sind große Basen mit zwei Ringen; T und C sind kleine
          mit einem. Groß muss mit klein paaren, sonst würde die Leiter ausbeulen und einschnüren —
          und nur diese Kombinationen stellen Wasserstoffbrücken-Geber ihren Nehmern gegenüber. Die
          Chemie erlaubt genau zwei Paarungen, und die Biologie benutzt seither beide.
        </p>
        <p>
          Zwei Konsequenzen folgen sofort. Erstens sind die Stränge <strong>komplementär</strong>:
          Hast du den einen, kannst du den anderen ohne jede Zusatzinformation hinschreiben. Das
          macht das Kopieren möglich — das Thema der nächsten Lektion. Zweitens haben C–G-Paare
          drei Wasserstoffbrücken gegenüber zwei bei A–T, also ist{" "}
          <strong>GC-reiche DNA schwerer zu trennen</strong> — weshalb Organismen aus heißen
          Quellen zu GC-reichen Genomen neigen.
        </p>

        <h2>Antiparallel — und warum das später zählt</h2>
        <p>
          Die beiden Stränge laufen in entgegengesetzte Richtungen. Jeder hat ein 5′- und ein
          3′-Ende (benannt nach Kohlenstoffpositionen am Zucker), und wo der eine 5′→3′ läuft,
          läuft der andere 3′→5′. Das klingt nach Buchhaltung — bis zur nächsten Lektion, wo es die
          DNA-Replikation in einen ausgesprochen unbeholfenen Kompromiss zwingt.
        </p>

        <h2>Gene, Chromosomen, Genom</h2>
        <p>
          Ein <strong>Gen</strong> ist ein DNA-Abschnitt, der ein Produkt vorgibt — meist ein
          Protein. Ein <strong>Chromosom</strong> ist ein einziges, sehr langes DNA-Molekül,
          gewickelt um Verpackungsproteine; du hast 46, in 23 Paaren. Dein{" "}
          <strong>Genom</strong> — der komplette Satz — umfasst rund 3 Milliarden Basenpaare, von
          denen nur etwa 1–2 % tatsächlich für Proteine codieren. Viel vom Rest regelt,{" "}
          <em>wann</em> und <em>wo</em> diese Gene eingeschaltet werden — was sich als enorm
          wichtig herausstellt.
        </p>
        <div className="callout note">
          <span className="co-title">Die Größenordnung ist kaum zu glauben</span>
          <p>
            Ausgestreckt ist die DNA einer einzigen deiner Zellen etwa zwei Meter lang — verpackt
            in einen Zellkern von rund 6 µm Durchmesser. Aneinandergelegt würde die DNA deines
            ganzen Körpers viele Male zur Sonne und zurück reichen. Und sie wird bei jeder
            Zellteilung kopiert, in hohem Tempo.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Basenpaarungs-Bank",
      intro: (
        <>
          <p>Tippe einen Strang, und sein Partner schreibt sich von selbst. Zähl die Sprossen.</p>
          <ul>
            <li>Achte auf die Brückenzahl: A–T bekommt zwei Sprossen, C–G drei.</li>
            <li>Probiere die Nur-GC-Vorlage, dann die Nur-AT-Vorlage, und vergleiche die Gesamtzahl der Wasserstoffbrücken.</li>
            <li>Die Stränge sind mit 5′→3′ und 3′←5′ beschriftet. Sie laufen gegenläufig — das wird nächste Lektion zum Problem.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Welche Paarungen kommen in der DNA vor?",
        choices: ["A–C und G–T", "A–T und C–G", "A–G und C–T", "Jede Base mit jeder"],
        answer: 1,
        explain:
          "A paart mit T (zwei Wasserstoffbrücken), C mit G (drei). Größe und Brückenmuster lassen nichts anderes zu.",
      },
      {
        q: "Wo steckt die Information in der DNA tatsächlich?",
        choices: [
          "Im Zucker-Phosphat-Rückgrat",
          "In der Länge des Moleküls",
          "In der Anzahl der Stränge",
          "In der Reihenfolge der Basen",
        ],
        answer: 3,
        explain:
          "Das Rückgrat ist von Anfang bis Ende identisch. Nur die Reihenfolge von A, T, C und G variiert — und diese Reihenfolge ist die Botschaft.",
      },
      {
        q: "Warum ist GC-reiche DNA schwerer in Einzelstränge zu trennen?",
        choices: [
          "C–G-Paare haben drei Wasserstoffbrücken, A–T-Paare nur zwei",
          "G und C sind schwerer",
          "GC-reiche DNA ist enger aufgewickelt",
          "Sie hat ein anderes Rückgrat",
        ],
        answer: 0,
        explain:
          "Mehr Wasserstoffbrücken pro Sprosse heißt mehr Energie zum Aufbrechen. Organismen heißer Umgebungen neigen genau deshalb zu GC-reichen Genomen.",
      },
      {
        q: "Ein Strang liest sich 5′-ATCG-3′. Wie lautet der komplementäre Strang?",
        choices: ["5′-TAGC-3′", "3′-TAGC-5′", "3′-ATCG-5′", "5′-GCTA-3′"],
        answer: 1,
        explain:
          "Jede Base paaren (A–T, T–A, C–G, G–C) ergibt TAGC — und die Stränge sind antiparallel, also läuft er daneben 3′→5′.",
      },
      {
        q: "Was ermöglichen „komplementäre Stränge“?",
        choices: [
          "Schnellere Mutation",
          "Das Molekül kann mehr Information speichern",
          "Jeder Strang kann als Vorlage dienen, um den anderen exakt wiederaufzubauen",
          "Die Stränge können die Plätze tauschen",
        ],
        answer: 2,
        explain:
          "Weil die Paarungsregel strikt ist, legt ein Strang den anderen vollständig fest. Kopieren ist damit nur noch Aufziehen und Auffüllen.",
      },
    ],
  },

  /* ================================================================ */
  replication: {
    Theory: () => (
      <>
        <h2>Der Mechanismus steckt in der Struktur</h2>
        <p>
          Watsons und Cricks Aufsatz endet mit einem der zurückhaltendsten Sätze der
          Wissenschaftsgeschichte: Es sei ihnen nicht entgangen, dass die vorgeschlagene Paarung
          unmittelbar einen Kopiermechanismus nahelege. Tut sie. Zieh die beiden Stränge
          auseinander, und jeder trägt die komplette Anleitung, um seinen Partner wiederaufzubauen.
        </p>
        <p>Der Ablauf, der Reihe nach:</p>
        <ol>
          <li>
            <strong>Helikase</strong> entwindet die Helix und bricht die Wasserstoffbrücken —
            es öffnet sich eine Y-förmige <strong>Replikationsgabel</strong>.
          </li>
          <li>
            <strong>DNA-Polymerase</strong> läuft an jedem freigelegten Strang entlang und passt
            freie Nukleotide an die Vorlage an — A gegenüber T, C gegenüber G.
          </li>
          <li>
            Das Ergebnis sind zwei Doppelhelices, jede aus einem alten und einem neuen Strang.
            Deshalb heißt die Replikation <strong>semikonservativ</strong>.
          </li>
        </ol>

        <h2>Der unbequeme Kompromiss</h2>
        <p>
          Hier beißt die Antiparallelität zu. DNA-Polymerase kann nur in eine Richtung bauen:
          5′→3′. An einer Gabel läuft die eine Vorlage bequem — ihr neuer Strang entsteht glatt und
          durchgehend: der <strong>Leitstrang</strong>.
        </p>
        <p>
          Die andere Vorlage läuft verkehrt herum. Die Polymerase kann nicht rückwärts, also tut
          sie etwas ausgesprochen Unelegantes: Sie wartet, bis ein Stück offen liegt, baut ein
          kurzes Fragment <em>rückwärts</em> relativ zur Gabel, springt vor und macht es wieder.
          Diese Stücke (Okazaki-Fragmente) näht anschließend die <strong>Ligase</strong> zusammen.
          Das ist der <strong>Folgestrang</strong>, und er ist eine echte Flickschusterei — die Art
          von Lösung, die als Ergebnis von Evolution weit mehr Sinn ergibt als als Ergebnis von
          Planung.
        </p>

        <h2>Wie genau ist das?</h2>
        <p>
          DNA-Polymerase macht ungefähr einen Fehler pro 100.000 Basen — was gut klingt, bis man
          sich erinnert, dass das Genom 3 Milliarden Basen hat: etwa 30.000 Fehler pro Kopie. Also{" "}
          <strong>liest das Enzym Korrektur</strong>: Es prüft jede gerade eingebaute Base und
          schneidet falsche wieder heraus. Ein separates Reparatursystem fegt danach durch, für
          alles Übersehene.
        </p>
        <div className="formula">
          ≈ 1 Fehler pro 10⁹ Basenpaare, nach Korrekturlesen und Reparatur
          <span className="note">grob ein unkorrigierter Fehler pro Zellteilung — im ganzen Genom</span>
        </div>
        <p>
          Das ist eine Fehlerrate von etwa eins zu einer Milliarde — vergleichbar damit, jedes Buch
          einer großen Bibliothek von Hand abzuschreiben und dabei einen einzigen Tippfehler zu
          machen. Und die Restfehler sind nicht bloß ein Defekt: Sie sind{" "}
          <strong>Mutationen</strong>, und ohne sie gäbe es keine Variation, an der die Evolution
          ansetzen könnte. Zu schlampig kopiert scheitert der Organismus; perfekt kopiert kann die
          Linie sich nicht anpassen.
        </p>

        <div className="callout tip">
          <span className="co-title">Meselson und Stahl haben es entschieden</span>
          <p>
            Drei Modelle lagen auf dem Tisch: konservativ (alte Helix bleibt intakt, neue wird
            frisch gebaut), semikonservativ und dispersiv (Bruchstücke gemischt). 1958 zogen
            Meselson und Stahl Bakterien auf schwerem Stickstoff groß, stellten sie auf leichten um
            und schleuderten die DNA in einem Dichtegradienten. Nach einer Runde hatte jedes
            Molekül mittlere Dichte — das konservative Modell war tot. Nach zwei Runden gab es zwei
            Banden, halb mittel, halb leicht — das dispersive auch. Man nennt es oft das schönste
            Experiment der Biologie, und es passt auf eine Seite.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Replikationsgabel",
      intro: (
        <>
          <p>Zieh die Gabel auf und sieh beide neuen Stränge entstehen.</p>
          <ul>
            <li>Der obere Strang wird durchgehend gebaut; der untere kommt in Fragmenten. Das ist das Antiparallel-Problem, sichtbar gemacht.</li>
            <li>Blende den Folgestrang aus, um zu sehen, wie ordentlich Replikation <em>wäre</em>, könnte die Polymerase in beide Richtungen arbeiten.</li>
            <li>Jede fertige Helix ist ein alter Strang plus ein neuer — semikonservativ.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Das menschliche Genom hat 3,0 × 10⁹ Basenpaare. Wie viele Fehler enthielte eine Kopie ohne Korrekturlesen, bei einer Rohfehlerrate von 1 zu 10⁵?",
        answer: 30000,
        unit: "Fehler",
        tolerancePct: 2,
        hint: "Die Genomgröße durch 10⁵ teilen.",
        explain: "3,0 × 10⁹ ÷ 10⁵ = 3,0 × 10⁴ = 30.000 Fehler pro Kopie.",
      },
      {
        prompt:
          "Mit Korrekturlesen und Reparatur sinkt die Rate auf etwa 1 zu 10⁹. Wie viele Fehler bleiben in einer Kopie eines Genoms mit 3,0 × 10⁹ bp?",
        answer: 3,
        unit: "Fehler",
        tolerancePct: 5,
        hint: "3,0 × 10⁹ ÷ 10⁹.",
        explain: "Etwa 3 unkorrigierte Fehler pro Genomkopie — eine Verbesserung um das Zehntausendfache.",
      },
    ],
    quiz: [
      {
        q: "Warum heißt die DNA-Replikation semikonservativ?",
        choices: [
          "Die Hälfte der DNA wird verworfen",
          "Jede neue Doppelhelix behält einen Originalstrang und bekommt einen neu gebauten",
          "Nur die Hälfte des Genoms wird kopiert",
          "Sie spart Energie",
        ],
        answer: 1,
        explain:
          "Meselson und Stahl haben genau das gezeigt: Nach einer Runde war jedes Molekül halb alt und halb neu.",
      },
      {
        q: "Warum wird der eine neue Strang in Fragmenten gebaut statt durchgehend?",
        choices: [
          "Das Enzym wird müde",
          "Um absichtlich Mutationen einzubauen",
          "Um Energie zu sparen",
          "DNA-Polymerase kann nur 5′→3′ bauen, und die beiden Vorlagen sind antiparallel",
        ],
        answer: 3,
        explain:
          "Eine Vorlage läuft zufällig richtig für durchgehende Synthese; die andere nicht — sie wird in kurzen Rückwärtsstücken kopiert, die die Ligase verbindet.",
      },
      {
        q: "Was leistet das Korrekturlesen der DNA-Polymerase?",
        choices: [
          "Es beschleunigt die Replikation",
          "Es prüft jede frisch eingebaute Base und entfernt falsche — die Fehlerrate sinkt enorm",
          "Es entwindet die Helix",
          "Es verbindet Okazaki-Fragmente",
        ],
        answer: 1,
        explain:
          "Es drückt die Rohrate von etwa 1 zu 10⁵ in Richtung 1 zu 10⁹, sobald auch die Fehlpaarungsreparatur gelaufen ist.",
      },
      {
        q: "Welches Enzym öffnet die Doppelhelix am Anfang?",
        choices: ["Ligase", "Polymerase", "Helikase", "Protease"],
        answer: 2,
        explain:
          "Die Helikase bricht die Wasserstoffbrücken zwischen den Basenpaaren und entwindet die Stränge — so entsteht die Replikationsgabel.",
      },
      {
        q: "Warum hat die Evolution KEIN perfekt fehlerfreies Kopiersystem hervorgebracht?",
        choices: [
          "Perfektes Kopieren ist chemisch unmöglich",
          "Restfehler sind Mutationen — ohne Variation kann sich eine Linie nicht anpassen",
          "Perfektes Kopieren wäre zu schnell",
          "Zellen können sich die Enzyme nicht leisten",
        ],
        answer: 1,
        explain:
          "Es ist ein Kompromiss. Zu viele Fehler, und der Organismus scheitert; gar keine, und die Selektion hat nichts, womit sie arbeiten kann.",
      },
    ],
  },

  /* ================================================================ */
  "protein-synthesis": {
    Theory: () => (
      <>
        <h2>Warum Proteine der Punkt sind</h2>
        <p>
          DNA tut fast nichts selbst. Sie ist ein Archiv. Die Moleküle, die die eigentliche Arbeit
          machen, sind <strong>Proteine</strong>: Enzyme, die Reaktionen katalysieren, Kanäle, die
          Stoffe über Membranen schleusen, Antikörper, Hämoglobin, Keratin, Muskelfasern. Ein Gen
          lohnt sich, weil es ein Protein vorgibt.
        </p>
        <p>
          Ein Protein ist eine Kette aus <strong>Aminosäuren</strong>, von denen es zwanzig gibt.
          Die Kette faltet sich in eine Form, die ihre Sequenz bestimmt — und die Form{" "}
          <em>ist</em>, wie die Enzym-Lektion gezeigt hat, die Funktion. Das ganze Problem lautet
          also: Wie kommt man von einer Reihenfolge aus vier Basen zu einer Reihenfolge aus zwanzig
          Aminosäuren?
        </p>

        <h2>Drei Buchstaben auf einmal</h2>
        <p>
          Eine Base pro Aminosäure ergäbe 4 Möglichkeiten — zu wenig. Zwei Basen ergeben 4² = 16 —
          immer noch weniger als 20. Drei Basen ergeben <strong>4³ = 64</strong>, mehr als genug.
          Die Natur nimmt drei, und ein Triplett heißt <strong>Codon</strong>.
        </p>
        <p>
          Vierundsechzig Codons für zwanzig Aminosäuren bedeuten: Der Code ist{" "}
          <strong>degeneriert</strong> — die meisten Aminosäuren haben mehrere Codons. Die
          Redundanz ist nicht zufällig verteilt, sondern sitzt vor allem in der <em>dritten</em>{" "}
          Base. GGU, GGC, GGA und GGG bedeuten alle Glycin — der dritte Buchstabe darf beliebig
          sein. Das heißt <strong>Wobble</strong>, und es ist echte Fehlertoleranz: Viele
          Einzelbasen-Mutationen ändern ein Codon, ohne die Aminosäure zu ändern, und bleiben damit
          stumm.
        </p>
        <p>Drei Codons benennen gar keine Aminosäure — sie sind <strong>STOPP</strong>-Signale:</p>
        <div className="formula">
          UAA · UAG · UGA
          <span className="note">
            U Are Away · U Are Gone · U Go Away — die klassische Eselsbrücke, und sie funktioniert
          </span>
        </div>
        <p>
          Und <strong>AUG</strong> hat einen Doppeljob: Es bedeutet Methionin, und es ist das{" "}
          <strong>START</strong>-Codon, das das Leseraster festlegt. Wo die Translation beginnt,
          entscheidet, wie jedes folgende Triplett gruppiert wird — deshalb sind
          Leserasterverschiebungen so zerstörerisch.
        </p>

        <h2>Die zwei Schritte</h2>
        <p>
          <strong>Transkription</strong>, im Zellkern. Ein Gen wird in <strong>mRNA</strong>{" "}
          kopiert — einsträngig, mit <strong>U</strong> (Uracil) überall dort, wo die DNA T
          verwenden würde. Die Arbeitskopie verlässt den Kern; das Archiv nie. Aus demselben Grund
          verleiht eine Bibliothek Fotokopien einer seltenen Handschrift.
        </p>
        <p>
          <strong>Translation</strong>, am Ribosom. Das Ribosom liest die mRNA drei Basen auf
          einmal. Für jedes Codon dockt ein <strong>tRNA</strong>-Molekül mit der passenden
          Aminosäure an — sein Anticodon paart mit dem Codon —, und die Aminosäure wird an die
          wachsende Kette gehängt. Bei einem Stoppcodon lässt das Ribosom das fertige Protein
          frei.
        </p>
        <div className="formula">
          DNA → (Transkription) → mRNA → (Translation) → Protein
          <span className="note">das zentrale Dogma, in seiner Alltagsform</span>
        </div>

        <div className="callout note">
          <span className="co-title">Ein Code, alles Leben</span>
          <p>
            Dieselben 64 Codons bedeuten in Bakterien, Hefen, Eichen und dir dieselben Aminosäuren,
            mit nur winzigen Ausnahmen. Deshalb produziert ein menschliches Insulin-Gen in{" "}
            <em>E. coli</em> menschliches Insulin — so wird Insulin seit 1982 hergestellt. Die
            Universalität ist zugleich der stärkste Einzelbeleg dafür, dass alles Lebendige einen
            gemeinsamen Vorfahren teilt: ein willkürlicher Code, eingefroren, bevor sich die Linien
            trennten.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Transkribieren & Translatieren",
      intro: (
        <>
          <p>Oben eine DNA-Vorlage, unten ein Protein. Geh Codon für Codon hindurch.</p>
          <ul>
            <li>Beginne mit dem Standardgen: TAC wird zu AUG transkribiert, die Translation startet also mit Methionin.</li>
            <li>Zieh den Codon-Regler Triplett für Triplett und sieh jede tRNA ihre Aminosäure abliefern.</li>
            <li>Ändere eine dritte Base — etwa GGA zu GGG. Das Protein ändert sich nicht. Das ist der Wobble.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Warum verwendet der genetische Code drei Basen pro Aminosäure statt zwei?",
        choices: [
          "Zwei Basen ergeben nur 16 Kombinationen — weniger als die 20 benötigten Aminosäuren",
          "Drei Basen passen besser ins Ribosom",
          "Drei ist stabiler",
          "Historischer Zufall ohne Grund",
        ],
        answer: 0,
        explain: "4² = 16 reicht nicht für 20 Aminosäuren; 4³ = 64 reicht bequem.",
      },
      {
        q: "Was bedeutet es, dass der genetische Code „degeneriert“ ist?",
        choices: [
          "Er verfällt mit der Zeit",
          "Die meisten Aminosäuren werden von mehr als einem Codon vorgegeben",
          "Manche Codons bedeuten nichts",
          "Er unterscheidet sich zwischen Arten",
        ],
        answer: 1,
        explain:
          "64 Codons decken 20 Aminosäuren plus Stopp ab, also gibt es Redundanz — konzentriert in der dritten Base, der Wobble-Position.",
      },
      {
        q: "Welches Codon ist das START-Signal, und welche Aminosäure gibt es zugleich vor?",
        choices: ["UAA, Stopp", "UGG, Tryptophan", "AUG, Methionin", "GGG, Glycin"],
        answer: 2,
        explain:
          "AUG macht beides: Es legt das Leseraster fest und codiert Methionin — frisch gebaute Proteine beginnen deshalb mit Met.",
      },
      {
        q: "Was wird von einem DNA-Matrizenstrang mit der Folge TAC transkribiert?",
        choices: ["ATG", "AUG", "UAC", "TAC"],
        answer: 1,
        explain:
          "Jede Base paaren und T durch U ersetzen: T→A, A→U, C→G ergibt AUG — passenderweise das Startcodon.",
      },
      {
        q: "Warum kann ein menschliches Gen in einem Bakterium ein funktionierendes menschliches Protein liefern?",
        choices: [
          "Bakterien können jeden Code lesen",
          "Kann es nicht — das funktioniert nicht",
          "Das Gen wird von mitgelieferten menschlichen Enzymen übersetzt",
          "Der genetische Code ist praktisch universell — dieselben Codons bedeuten in fast allem Leben dieselben Aminosäuren",
        ],
        answer: 3,
        explain:
          "Die gemeinsame Abstammung hat jeder Linie dieselbe Nachschlagetabelle hinterlassen. Deshalb ist bakteriell produziertes Humaninsulin seit 1982 auf dem Markt.",
      },
    ],
  },

  /* ================================================================ */
  mutations: {
    Theory: () => (
      <>
        <h2>Eine Änderung in der Sequenz</h2>
        <p>
          Eine <strong>Mutation</strong> ist jede Veränderung der DNA-Sequenz. Die meisten
          entstehen als unkorrigierte Kopierfehler; andere verursachen <strong>Mutagene</strong> —
          UV-Licht, Röntgenstrahlung, Tabakrauch, bestimmte Chemikalien. Sie passieren ständig, und
          die große Mehrheit ist harmlos, weil sie in nicht codierender DNA landet oder repariert
          wird.
        </p>
        <p>Die innerhalb eines Gens zerfallen in zwei sehr verschiedene Klassen.</p>

        <h2>Substitutionen: ein Buchstabe getauscht</h2>
        <p>Eine Base wird durch eine andere ersetzt. Drei Ausgänge sind möglich:</p>
        <ul>
          <li>
            <strong>Stumm</strong> — das neue Codon bedeutet dieselbe Aminosäure. GGA → GGG ist
            immer noch Glycin. Dank Wobble; diese Mutationen tun gar nichts.
          </li>
          <li>
            <strong>Missense</strong> — eine andere Aminosäure wird eingebaut. Die Wirkung hängt
            ganz davon ab, welche und wo. Oft harmlos; gelegentlich entscheidend.
          </li>
          <li>
            <strong>Nonsense</strong> — das Codon wird zum STOPP. Das Protein wird abgeschnitten
            und ist fast immer unbrauchbar.
          </li>
        </ul>
        <p>
          Der berühmte Missense-Fall ist die <strong>Sichelzellanämie</strong>. Eine Base ändert im
          Hämoglobin-Gen GAG zu GTG und tauscht Glutamat gegen Valin — eine einzige Aminosäure von
          146. Glutamat ist geladen und wasserfreundlich; Valin ist ölig. Diese eine Substitution
          lässt Hämoglobin-Moleküle zu Fasern verkleben, die rote Blutkörperchen zu Sicheln
          verformen, die Kapillaren verstopfen. Ein Buchstabe von drei Milliarden — und eine
          ernste Krankheit.
        </p>
        <p>
          Dieselbe Mutation verleiht in einfacher Kopie zugleich Resistenz gegen Malaria — weshalb
          sie in Regionen mit endemischer Malaria häufig blieb. Ob eine Mutation „schlecht“ ist,
          hängt von der Umwelt ab. Genau darum geht es in Einheit 5.
        </p>

        <h2>Leserasterverschiebungen: alles danach</h2>
        <p>
          Füge eine Base ein oder lösche eine, und du änderst nicht ein Codon — du änderst{" "}
          <em>die Gruppierung jedes Codons dahinter</em>. Das Leseraster rutscht um eins, und
          alles nach der Mutation wird als völlig andere Tripletts gelesen.
        </p>
        <div className="equation">
          DER HUT IST ROT — einen Buchstaben löschen → DER UTI STR OT…
        </div>
        <p>
          Der Satz verliert nicht ein Wort; er verliert ab dieser Stelle jede Bedeutung. Eine
          Leserasterverschiebung produziert meist ein Kauderwelsch-Protein und trifft irgendwo im
          Unsinn auf ein vorzeitiges STOPP. Darum sind Insertionen und Deletionen im Schnitt weit
          schädlicher als Substitutionen — und darum ist eine Deletion von genau drei Basen viel
          milder: Sie entfernt eine Aminosäure und lässt das Raster intakt.
        </p>

        <h2>Wo die Mutation passiert, zählt</h2>
        <ul>
          <li>
            <strong>Somatisch</strong> — in einer Körperzelle. Betrifft dich, wird nicht vererbt.
            Krebs ist das, was passiert, wenn sich somatische Mutationen in Genen ansammeln, die
            die Zellteilung steuern.
          </li>
          <li>
            <strong>Keimbahn</strong> — in Eizellen oder Spermien. Betrifft dich nicht, wird aber
            an jede Zelle deiner Kinder weitergegeben. Nur Keimbahnmutationen speisen die
            Evolution.
          </li>
        </ul>
        <div className="callout tip">
          <span className="co-title">Mutationen sind der Rohstoff</span>
          <p>
            Es liegt nahe, Mutation als reinen Schaden zu sehen — aber jedes Allel, das je
            existierte, jede Augenfarbe, jede Enzymvariante, jede Anpassung in der Geschichte des
            Lebens begann als Kopierfehler. Selektion kann nur unter Varianten wählen, die es
            schon gibt — und Mutation ist das Einzige, was neue erzeugt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Mutations-Bank",
      intro: (
        <>
          <p>Ein Gen, vorher und nachher. Wähle eine Mutation und sieh, was beim Protein ankommt.</p>
          <ul>
            <li>Ersetze eine dritte Base in einem Codon. Oft bleibt das Protein unverändert — eine stumme Mutation.</li>
            <li>Lösche nun eine einzelne Base. Vergleiche, wie viel vom Protein übrig bleibt.</li>
            <li>Finde eine Substitution, die ein vorzeitiges STOPP erzeugt. Das ist eine Nonsense-Mutation.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Eine Substitution ändert GGA zu GGG. Beide codieren Glycin. Wie heißt das?",
        choices: ["Missense", "Nonsense", "Stumm", "Leserasterverschiebung"],
        answer: 2,
        explain:
          "Das Codon hat sich geändert, die Aminosäure nicht — das Protein ist identisch. Der Wobble in der dritten Base macht das häufig.",
      },
      {
        q: "Warum ist eine Einzelbasen-Deletion meist schädlicher als eine Einzelbasen-Substitution?",
        choices: [
          "Sie entfernt mehr Erbmaterial",
          "Sie verschiebt das Leseraster, sodass jedes Codon dahinter falsch gelesen wird",
          "Sie erzeugt immer sofort ein Stoppcodon",
          "Sie kann nicht repariert werden",
        ],
        answer: 1,
        explain:
          "Eine Substitution ändert ein Codon. Eine Rasterverschiebung gruppiert jedes Triplett dahinter um — der ganze Rest des Proteins ist Ausschuss.",
      },
      {
        q: "Sichelzellanämie wird verursacht durch…",
        choices: [
          "Eine einzige Basensubstitution, die im Hämoglobin Glutamat gegen Valin tauscht",
          "Ein fehlendes Chromosom",
          "Eine Leserasterverschiebung im Hämoglobin-Gen",
          "Ein Mutagen in der Nahrung",
        ],
        answer: 0,
        explain:
          "Eine einzige Missense-Mutation — eine Aminosäure von 146 — lässt Hämoglobin-Moleküle zu Fasern stapeln, die die Zelle verformen.",
      },
      {
        q: "Welche Mutationen können an Nachkommen weitergegeben werden?",
        choices: [
          "Alle Mutationen",
          "Nur Keimbahnmutationen, in Eizellen oder Spermien",
          "Nur somatische Mutationen",
          "Nur durch Mutagene verursachte",
        ],
        answer: 1,
        explain:
          "Somatische Mutationen betreffen nur das Individuum. Nur Veränderungen in den Zellen, die Gameten bilden, erreichen die nächste Generation — und nur sie speisen die Evolution.",
      },
      {
        q: "Warum richtet eine 3-Basen-Deletion meist weniger Schaden an als eine 1-Basen-Deletion?",
        choices: [
          "Drei Basen sind leichter zu reparieren",
          "Sie entfernt ein ganzes Codon und lässt das Leseraster intakt",
          "Sie landet immer in nicht codierender DNA",
          "Tut sie nicht — sie ist dreimal schlimmer",
        ],
        answer: 1,
        explain:
          "Ein Vielfaches von drei löscht ganze Aminosäuren, ohne das Raster zu verschieben — der Rest des Proteins wird weiter korrekt gelesen.",
      },
    ],
  },
};
