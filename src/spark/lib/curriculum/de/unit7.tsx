import type { LessonContentDe } from "../localize";

/**
 * Full German content for Unit 7 (digital logic): theory JSX,
 * quizzes (same answer indices as English!) and lab titles/intros.
 * Lab components themselves are shared — canvas labels stay English for now.
 */

export const unit7De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "binary-gates": {
    Theory: () => (
      <>
        <h2>Warum nur zwei Pegel?</h2>
        <p>
          Analoge Signale tragen unendlich viele Abstufungen — und jede Abstufung von
          Rauschen gleich mit. Die Digitalelektronik macht einen radikalen Tausch: Nur zwei
          Spannungspegel zählen. Nahe 0 V ist <strong>0</strong> (falsch), nahe der
          Versorgung ist <strong>1</strong> (wahr), und alles, was dazwischen driftet, wird
          auf jeder Stufe zur nächstgelegenen Schiene zurückgeschnappt. Rauschen, das ein
          analoges Signal dauerhaft verschmieren würde, wird bei jedem Schritt gelöscht —
          deshalb lässt sich ein Foto milliardenfach kopieren, ohne zu verfallen. Den
          Hardware-Trick kennst du schon: ein Transistor in{" "}
          <em>Sperrung oder Sättigung</em> (Lektion 3.2), der die analoge Mitte komplett
          überspringt.
        </p>

        <h2>Gatter: Entscheidungen in Silizium</h2>
        <p>
          Ein <strong>Logikgatter</strong> sind ein paar Transistoren, so verdrahtet, dass
          sie aus Ja/Nein-Eingängen eine Ja/Nein-Antwort berechnen. Das Vokabular ist winzig:
        </p>
        <ul>
          <li><strong>NOT</strong> — der Ausgang ist das Gegenteil. (Ein Transistor: dein Schalter aus Lektion 3.2 — Basis hoch zieht den Kollektor tief.)</li>
          <li><strong>AND</strong> — 1 nur, wenn <em>beide</em> Eingänge 1 sind (zwei Schalter in Reihe — Lektion 1.5!).</li>
          <li><strong>OR</strong> — 1, wenn <em>mindestens ein</em> Eingang 1 ist (zwei Schalter parallel).</li>
          <li><strong>NAND / NOR</strong> — AND/OR mit eingebautem NOT.</li>
          <li><strong>XOR</strong> — 1, wenn die Eingänge sich <em>unterscheiden</em>. Merk dir dieses: Es wird gleich rechnen.</li>
        </ul>
        <p>
          Ein Gatter wird durch seine <strong>Wahrheitstabelle</strong> vollständig
          beschrieben — jede Eingangskombination und ihr Ausgang. Nichts an einem Gatter ist
          mysteriös: Es ist eine Nachschlagetabelle aus Schaltern.
        </p>

        <h2>NAND genügt</h2>
        <p>
          Jetzt der verblüffende Teil: <strong>Jede</strong> Logikfunktion — und damit jeder
          Computer — lässt sich allein aus NAND-Gattern bauen. Verbinde die Eingänge eines
          NAND miteinander: NOT. Häng dieses NOT dahinter: AND. Füttere es mit invertierten
          Eingängen: OR. Der Apollo Guidance Computer, der auf dem Mond landete, bestand fast
          vollständig aus einem einzigen Typ von NOR-Chip mit 3 Eingängen — dieselbe Idee.
          Beherrsche ein Gatter, und dir gehören alle.
        </p>
        <div className="callout note">
          <span className="co-title">Von Gattern zu deiner CPU</span>
          <p>
            Ein moderner Prozessor sind zig Milliarden Transistoren, angeordnet als Gatter.
            Der Rest dieser Einheit erklimmt die ersten beiden Sprossen dieser Leiter:
            Gatter, die addieren, und Gatter, die sich erinnern.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Gatter-Spielplatz",
      intro: (
        <>
          <p>Jedes Grundgatter, zwei klickbare Schalter, ein leuchtendes Urteil.</p>
          <ul>
            <li>Führe jedes Gatter durch alle vier Eingangskombinationen und sieh zu, wie die Wahrheitstabelle dir folgt.</li>
            <li>Finde die zwei Gatter, die sich in der Zeile 1,1 widersprechen (AND vs. XOR).</li>
            <li>Überzeuge dich Zeile für Zeile, dass NAND das NOT von AND ist.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein NAND-Gatter mit beiden Eingängen auf 1 gibt aus…",
        choices: ["1", "0", "Die halbe Versorgung", "Es hängt von der Temperatur ab"],
        answer: 1,
        explain: "NAND = NOT-AND. AND(1,1) = 1, invertiert → 0. Jede andere Kombination gibt 1 aus.",
      },
      {
        q: "XOR gibt 1 aus, wenn…",
        choices: [
          "beide Eingänge 1 sind",
          "die Eingänge verschieden sind",
          "mindestens ein Eingang 1 ist",
          "beide Eingänge 0 sind",
        ],
        answer: 1,
        explain: "Exklusiv-ODER: der eine oder der andere, aber nicht beide. Es ist der 'Verschiedenheits-Detektor' — und das Summenbit der binären Addition.",
      },
      {
        q: "Digitale Schaltungen widerstehen Rauschen, weil…",
        choices: [
          "sie speziellen rauschfesten Draht benutzen",
          "Signale an jedem Gatter auf saubere 0/1-Pegel zurückgeschnappt werden",
          "sie mit niedrigerer Spannung laufen",
          "Rauschen nur AC betrifft",
        ],
        answer: 1,
        explain:
          "Jedes Gatter regeneriert das Signal zur Schiene. Kleines Rauschen akkumuliert sich nie — der entscheidende Vorteil gegenüber analog.",
      },
      {
        q: "Warum heißt NAND ein universelles Gatter?",
        choices: [
          "Es ist das schnellste Gatter",
          "Jede Logikfunktion lässt sich allein aus NANDs bauen",
          "Es verbraucht keine Leistung",
          "Es hat die meisten Eingänge",
        ],
        answer: 1,
        explain:
          "NOT, AND, OR (und alles, was daraus gebaut wird — also alles) lassen sich jeweils rein aus NAND-Gattern konstruieren.",
      },
    ],
  },

  /* ================================================================ */
  adders: {
    Theory: () => (
      <>
        <h2>Zählen zur Basis zwei</h2>
        <p>
          Mit nur 0 und 1 im Angebot benutzen Zahlen die Stellenwerte 1, 2, 4, 8 … statt
          1, 10, 100. Binär <code>1011</code> = 8 + 0 + 2 + 1 = 11. Vier Bit zählen 0–15,
          acht Bit 0–255, und vierundsechzig Bit zählen an den Sandkörnern der Erde vorbei.
          Dieselbe Stellenwert-Arithmetik, die du mit sechs gelernt hast — kürzeres Alphabet.
        </p>

        <h2>Eine Spalte Addition</h2>
        <p>
          Addiere zwei Bits — was kann passieren? 0+0=0, 0+1=1, 1+1=<strong>0, Übertrag 1</strong>.
          Schau genau hin: Das Summenbit ist <em>exakt XOR</em>, das Übertragsbit{" "}
          <em>exakt AND</em>. Zwei Gatter — ein <strong>Halbaddierer</strong> — erledigen die
          Addition einer einzelnen Spalte. Eine echte Spalte muss zusätzlich den von rechts
          hereinkommenden Übertrag annehmen, also verarbeitet der{" "}
          <strong>Volladdierer</strong> drei Eingänge (A, B, Eingangsübertrag) mit zwei XORs
          plus etwas AND/OR für den Ausgangsübertrag. Insgesamt etwa fünf Gatter pro Spalte.
        </p>
        <div className="formula">
          Summe = A ⊕ B ⊕ C<sub>in</sub> · Ausgangsübertrag = majority(A, B, C<sub>in</sub>)
          <span className="note">⊕ ist XOR — &bdquo;verschieden?&ldquo; — und der Übertrag feuert, wenn zwei oder mehr Eingänge 1 sind</span>
        </div>

        <h2>Die Spalten verketten</h2>
        <p>
          Stapel einen Volladdierer pro Bit, verdrahte jeden Ausgangsübertrag mit dem
          Eingangsübertrag der nächsten Spalte, und du hast einen{" "}
          <strong>Ripple-Carry-Addierer</strong> — der Übertrag kräuselt sich nach links,
          genau wie das &bdquo;eins im Sinn&ldquo; der Schulrechnung. Produziert die letzte
          Spalte einen Übertrag, der nirgendwo mehr hinkann, ist das{" "}
          <strong>Überlauf</strong>: Die wahre Antwort braucht mehr Bits, als du hast.
          (Subtraktion, Multiplikation, die Teraflops deiner GPU — alles Ausschmückungen
          dieser einen Schaltung.)
        </p>
        <div className="callout tip">
          <span className="co-title">Halt hier kurz inne</span>
          <p>
            Vor sechs Lektionen war ein Transistor ein Stromverstärker. Zu Gattern
            verdrahtet, Gatter zu Addierern, betreibt dasselbe Silizium jetzt{" "}
            <em>Mathematik</em>. Kein einzelnes Bauteil kann rechnen — das Wissen wohnt
            vollständig in der Verdrahtung. Das ist der ganze Zauber der Computer, und du
            hältst ihn jetzt von Anfang bis Ende in der Hand.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die 4-Bit-Rechenmaschine",
      intro: (
        <>
          <p>Zwei 4-Bit-Zahlen, Bit für Bit klickbar, summiert von Ripple-Carry-Logik.</p>
          <ul>
            <li>Stelle A = 5 (0101) und B = 3 (0011) ein. Verfolge jede Spalte: XOR für die Summe, Überträge, wo beide 1 sind.</li>
            <li>Stelle 15 + 1 ein und sieh zu, wie der Übertrag durch jede Spalte bis in den Überlauf kräuselt.</li>
            <li>Prüfe: Kann eine 4-Bit-plus-4-Bit-Summe je mehr als 5 Bit brauchen?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Binär 1011 ist dezimal…",
        choices: ["9", "11", "13", "22"],
        answer: 1,
        explain: "8 + 0 + 2 + 1 = 11.",
      },
      {
        q: "In einem Halbaddierer kommen Summen- und Übertragsbit von…",
        choices: [
          "OR und NOT",
          "XOR (Summe) und AND (Übertrag)",
          "AND (Summe) und OR (Übertrag)",
          "Zwei NOT-Gattern",
        ],
        answer: 1,
        explain: "Summe = 'Eingänge verschieden?' = XOR. Übertrag = 'beide 1?' = AND. Zwei Gatter, eine Spalte Arithmetik.",
      },
      {
        q: "In einem Ripple-Carry-Addierer wandert der Übertrag…",
        choices: [
          "vom höchstwertigen Bit abwärts",
          "von der niederwertigsten Spalte aufwärts durch die höheren",
          "zu allen Spalten gleichzeitig",
          "nirgendwohin — Überträge werden verworfen",
        ],
        answer: 1,
        explain:
          "Der Ausgangsübertrag jeder Spalte speist den Eingangsübertrag der nächsten, LSB→MSB — genau wie das 'eins im Sinn' beim schriftlichen Rechnen.",
      },
      {
        q: "Die Addition der 4-Bit-Zahlen 1111 + 0001 ergibt 10000. In einem 4-Bit-Register ist das…",
        choices: ["16, problemlos gespeichert", "Überlauf — das Ergebnis braucht ein fünftes Bit", "Null, ohne Nebenwirkungen", "Ein Kurzschluss"],
        answer: 1,
        explain:
          "Der Übertrag aus der obersten Spalte hat kein Zuhause: Überlauf. CPUs setzen für genau diesen Moment ein Flag.",
      },
    ],
  },

  /* ================================================================ */
  "flip-flops": {
    Theory: () => (
      <>
        <h2>Rückkopplung wird Gedächtnis</h2>
        <p>
          Jede Schaltung bisher vergisst ihre Eingänge sofort. Nimm jetzt zwei NAND-Gatter
          und kreuze ihre Ausgänge zurück in die Eingänge des jeweils anderen — wieder
          Rückkopplung, aber digital. Das Ergebnis, ein <strong>SR-Latch</strong>, hat zwei
          stabile Zustände und bleibt in dem, in den es zuletzt gestoßen wurde: Ein Puls auf{" "}
          <em>Set</em>, und der Ausgang rastet auf 1; ein Puls auf <em>Reset</em>, und er
          rastet auf 0. Zwischen den Pulsen hält er — unbegrenzt.{" "}
          <strong>Das ist ein Bit Gedächtnis</strong>, herbeigezaubert aus nichts als
          Verdrahtung.
        </p>

        <h2>Ein Takt kommt dazu: das Flipflop</h2>
        <p>
          Computer brauchen Millionen Bits, die im Gleichschritt wechseln — nicht immer
          dann, wenn Eingänge zucken. Das <strong>D-Flipflop</strong> sperrt ein Latch
          hinter einen <strong>Takt</strong>: Es kopiert seinen D-Eingang nur an der
          steigenden Taktflanke auf seinen Q-Ausgang und ignoriert alles dazwischen. Eine
          Reihe Flipflops an einem gemeinsamen Takt ist ein <strong>Register</strong> — dort
          hält deine CPU die Zahlen, mit denen sie gerade arbeitet. Und der Takt selbst? Eine
          Rechteckwelle aus einem Oszillator … dein 555 (Lektion 3.3) ist genau so ein Takt,
          nur langsamer als die Milliarden Ticks einer CPU.
        </p>

        <h2>Zähler: Gedächtnis + Arithmetik</h2>
        <p>
          Verdrahte ein Flipflop so, dass es bei jeder fallenden Flanke seines Eingangs
          kippt, und sein Ausgang läuft mit der <em>halben</em> Eingangsfrequenz — ein
          Teiler durch zwei. Kette drei davon, und die Ausgänge Q0 Q1 Q2, als Binärzahl
          gelesen, marschieren 0, 1, 2, … 7 und springen zurück auf 0: ein{" "}
          <strong>3-Bit-Zähler</strong>. Diese eine Struktur ist deine Digitaluhr
          (32 768-Hz-Quarz, fünfzehnmal durch 2 geteilt = exakt 1 Hz), dein Küchentimer und
          der Programmzähler, der deine CPU durch die Befehle schreitet.
        </p>
        <div className="formula">
          jede Stufe halbiert die Frequenz · n Stufen zählen 0 … 2ⁿ−1
          <span className="note">3 Stufen: Teilung durch 8, Zählen 0–7</span>
        </div>
        <div className="callout note">
          <span className="co-title">Der Gipfelblick</span>
          <p>
            Gatter (kombinatorische Logik) rechnen; Flipflops (sequentielle Logik) erinnern
            sich; ein Takt lässt sie gemeinsam vorwärtsmarschieren. Jeder je gebaute
            Computer — auch der, auf dem diese Seite läuft — besteht aus diesen drei Ideen,
            milliardenfach wiederholt. Von hier aus sind Mikrocontroller der natürliche
            nächste Berg.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Bit, das sich erinnert",
      intro: (
        <>
          <p>Ein 3-Bit-Ripple-Zähler an einem Live-Takt, mit jeder Wellenform auf dem Oszilloskop.</p>
          <ul>
            <li>Sieh zu, wie Q0 mit dem halben Takt läuft, Q1 mit einem Viertel, Q2 mit einem Achtel — Frequenzteilung, sichtbar gemacht.</li>
            <li>Lies die LEDs als Binärzahl und prüfe über eine volle 0–7-Runde, dass sie zur Dezimalanzeige passen.</li>
            <li>Halte den Takt an und schalte mit Pulse weiter — der Zustand <em>hält</em> zwischen den Pulsen. Das ist Gedächtnis.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein SR-Latch merkt sich seinen Zustand, weil…",
        choices: [
          "es eine winzige Batterie enthält",
          "die Ausgänge seiner Gatter in die Eingänge des jeweils anderen zurückgeführt sind und einen stabilen Zustand halten",
          "es speziellen magnetischen Draht benutzt",
          "der Takt es auffrischt",
        ],
        answer: 1,
        explain: "Kreuzgekoppelte Rückkopplung ergibt zwei sich selbst verstärkende stabile Zustände — gesetzt oder rückgesetzt, unbegrenzt gehalten.",
      },
      {
        q: "Ein D-Flipflop kopiert D nach Q…",
        choices: [
          "kontinuierlich",
          "nur an der Taktflanke",
          "immer wenn D sich ändert",
          "einmal beim Einschalten",
        ],
        answer: 1,
        explain: "Diese Flankensteuerung ist der Punkt: Alle Flipflops eines Systems aktualisieren sich im Gleichschritt mit dem Takt.",
      },
      {
        q: "Ein 3-Bit-Zähler zählt von 0 bis…",
        choices: ["3", "7", "8", "15"],
        answer: 1,
        explain: "n Bit zählen 0 bis 2ⁿ−1: Drei Bit ergeben 0–7, danach geht es zurück auf 0.",
      },
      {
        q: "Schicke einen 32 768-Hz-Quarz durch 15 Teile-durch-zwei-Stufen, und du bekommst…",
        choices: ["32 Hz", "2 Hz", "1 Hz — den Tick einer Armbanduhr", "0,5 Hz"],
        answer: 2,
        explain: "32 768 = 2¹⁵, also lässt fünfzehnmaliges ÷2 exakt 1 Hz übrig. Deshalb benutzen Uhrenquarze diese krumme Zahl.",
      },
    ],
  },
};
