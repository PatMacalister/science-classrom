import type { LessonContentDe } from "../localize";

/**
 * Full German content for Unit 17 (registers & ALU, memory & bus,
 * instruction set, CPU capstone): theory JSX, quizzes (same answer indices
 * as English!), checklist and lab titles/intros. Lab components themselves
 * are shared — canvas labels stay English for now.
 */

export const unit17De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "registers-alu": {
    Theory: () => (
      <>
        <h2>Von Schaltungen zum Datenpfad</h2>
        <p>
          Die beiden Hälften besitzt du schon: <strong>Register</strong> (Reihen von
          Flipflops, 7.3) halten Zahlen; dein <strong>Addierer</strong> (7.2) verknüpft sie.
          Die <strong>ALU</strong> einer CPU — die arithmetisch-logische Einheit — ist der
          erwachsen gewordene Addierer: ein Block, der zwei Register addieren, subtrahieren,
          AND- oder OR-verknüpfen kann, ausgewählt über ein paar Steuerbits.
        </p>

        <h2>Subtraktion gratis: das Zweierkomplement</h2>
        <p>
          Hier kommt einer der großen Eleganz-Züge der Informatik. Um −B darzustellen,
          kippst du jedes Bit von B und addierst eins — das{" "}
          <strong>Zweierkomplement</strong>. Dann gilt:
        </p>
        <div className="formula">
          A − B = A + (~B + 1)
          <span className="note">Subtraktion = derselbe Addierer, mit invertierten B-Bits und dem Übertragseingang auf 1 — null neue Hardware</span>
        </div>
        <p>
          Derselbe Trick gibt negativen Zahlen ein Zuhause: In 4 Bit bedeuten 0–7 sich
          selbst, und 8–15 stehen zugleich für −8…−1 (das oberste Bit wirkt als Vorzeichen).
          Die Bits ändern sich nicht — nur die <em>Interpretation</em>, weshalb das Labor
          jeden Wert auf beide Arten zeigt. Der Überlauf (7.2) wird mit Vorzeichen subtiler
          und interessanter — und genau deshalb führen CPUs gleich einen ganzen Satz von…
        </p>

        <h2>Flags: Klatsch in einem Bit</h2>
        <p>
          Neben dem Ergebnis meldet die ALU winzige Fakten: <strong>Z</strong> (war es
          null?), <strong>C</strong> (hat ein Übertrag bzw. ein Borgen das oberste Bit
          verlassen?), <strong>N</strong> (ist das Vorzeichenbit gesetzt?). Das wirkt banal,
          bis dir klar wird, dass Programme genau so <em>Entscheidungen treffen</em>:
          &bdquo;Springe bei null&ldquo; liest Z, &bdquo;ist A &lt; B?&ldquo; subtrahiert und
          liest die Flags. Jede if-Anweisung, die du je geschrieben hast, kompiliert zu einer
          ALU-Operation gefolgt von einem flag-bedingten Sprung. Das bescheidene
          Komparator-Urteil (6.1) — darüber oder darunter? — lebt in jeder CPU als Flag
          weiter.
        </p>
        <div className="callout note">
          <span className="co-title">Die Registerbank</span>
          <p>
            Echte CPUs halten einen kleinen Satz Register (x86-64 hat 16 Allzweckregister)
            direkt neben der ALU, denn RAM ist — wie die nächste Lektion zeigt — eine Reise
            quer durch die Stadt. Unsere Lehr-CPU begnügt sich mit einem einzigen, dem
            klassischen <strong>Akkumulator</strong> &bdquo;A&ldquo; — mehr braucht ein
            Computer streng genommen nicht.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das arithmetische Herz",
      intro: (
        <>
          <p>Eine 4-Bit-ALU mit klickbaren Operanden, allen vier Operationen und Live-Flags.</p>
          <ul>
            <li>Rechne 5 − 3, dann 3 − 5: Die &bdquo;falsche&ldquo; Antwort 14 ist in vorzeichenbehafteter Lesart −2. Dieselben Bits.</li>
            <li>Bring Z auf drei verschiedene Arten zum Leuchten (ADD, SUB, AND).</li>
            <li>Prüfe SUB gegen das Rezept: Kippe die Bits von B von Hand, addiere 1, addiere zu A.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Im Zweierkomplement berechnet sich −B als…",
        choices: ["B mit gekipptem Vorzeichenbit", "immer 255 − B", "~B + 1 (alle Bits invertieren, eins addieren)", "B nach rechts geschoben"],
        answer: 2,
        explain: "Invertieren und eins addieren. Dann nutzt A−B denselben Addierer unverändert wieder — genau das ist der Sinn dieser Kodierung.",
      },
      {
        q: "Im 4-Bit-Zweierkomplement bedeutet das Bitmuster 1110 (dezimal 14) auch…",
        choices: ["−1", "−14", "nur +14", "−2"],
        answer: 3,
        explain: "Die Muster 8–15 stehen zugleich für −8…−1: 14 − 16 = −2. Das Vorzeichen steckt in der Interpretation, nicht in den Bits.",
      },
      {
        q: "Das Z-Flag existiert, damit…",
        choices: [
          "die ALU zurückgesetzt werden kann",
          "Programme auf Ergebnisse verzweigen können — 'springe bei null' ist der Mechanismus hinter if-Anweisungen",
          "Null-Ergebnisse verworfen werden",
          "die Anzeige ein Minuszeichen darstellt",
        ],
        answer: 1,
        explain: "Flags machen aus Arithmetik Entscheidungen. JZ liest Z; Vergleiche subtrahieren und lesen die Flags.",
      },
      {
        q: "Warum halten CPUs Register direkt neben der ALU, statt unmittelbar mit dem RAM zu arbeiten?",
        choices: [
          "Register sind weit schneller erreichbar als eine Bus-Rundreise zum Speicher",
          "RAM kann keine Zahlen speichern",
          "Register sind billiger",
          "Tradition aus den 1970ern",
        ],
        answer: 0,
        explain: "Die nächste Lektion macht es greifbar: Jeder RAM-Zugriff ist ein Handschlag über Adressbus und Datenbus. Register sind schon da.",
      },
    ],
  },

  /* ================================================================ */
  "memory-bus": {
    Theory: () => (
      <>
        <h2>Eine Wand aus Registern, mit Telefonbuch</h2>
        <p>
          Nimm die Registeridee aus 7.3 und wiederhole sie: 16 Zeilen, 256 Zeilen, Milliarden
          von Zeilen — jede hält eine Zahl, jede hat eine eindeutige{" "}
          <strong>Adresse</strong>. Das ist <strong>RAM</strong>. Die Magie steckt nicht im
          Speichern (ein Bit Speicher hast du aus zwei NAND-Gattern gebaut), sondern in der{" "}
          <em>Adressierung</em>: Ein Decoder — reine kombinatorische Logik, wieder Einheit 7
          — aktiviert aus der Zahl auf den Adressleitungen genau eine Zeile.
        </p>

        <h2>Der Bus: ein gemeinsamer Korridor</h2>
        <p>
          CPU und RAM unterhalten sich über zwei Leitungsbündel. Der{" "}
          <strong>Adressbus</strong> trägt die Frage &bdquo;welche Zelle?&ldquo; (eine
          Richtung: CPU → Speicher); der <strong>Datenbus</strong> trägt den Wert selbst
          (beide Richtungen). Ein <em>Lesen</em>: Adresse hinaus, das RAM antwortet auf dem
          Datenbus. Ein <em>Schreiben</em>: Adresse und Daten gemeinsam hinaus, dazu ein
          Schreibsignal. Jedes Bildschirmpixel, jeder Tastendruck, jede Variable in jedem
          Programm — alles reist über diesen Handschlag.
        </p>
        <div className="formula">
          n Adressleitungen → 2ⁿ erreichbare Zellen
          <span className="note">16 Leitungen: 65 536 Zellen · 32 Leitungen: 4 GB — das berühmte 32-Bit-Limit war schlicht eine Adressbusbreite</span>
        </div>

        <h2>Die Idee des gespeicherten Programms</h2>
        <p>
          Jetzt der tiefste Zug der Informatik, aus von Neumanns Bericht von 1945:{" "}
          <strong>Befehle liegen im selben Speicher wie Daten.</strong> Ein Programm ist nur
          Zahlen in Zellen — also können Programme geladen, kopiert und sogar von anderen
          Programmen geschrieben werden (mehr ist ein Compiler nicht). Es bedeutet auch, dass
          die CPU festhalten muss, <em>wo im Speicher sie gerade ist</em> — ein Register mit
          der Adresse des nächsten Befehls. Seinen Namen kennst du schon aus Lektion 7.3 und
          dem MicroPython-Stepper: der <strong>Programmzähler</strong> (PC). In der nächsten
          Lektion folgen wir ihm.
        </p>
        <div className="callout tip">
          <span className="co-title">Warum Speichertempo die Welt regiert</span>
          <p>
            Eine moderne CPU kann Zahlen hunderte Male schneller addieren, als das RAM sie
            liefern kann. Ganze Ingenieursschichten — Caches, Prefetching — existieren nur,
            um diese Lücke zu verstecken. Wenn deine schnelle Registerbank (17.1) auf diesen
            langsamen Korridor trifft, verstehst du die zentrale Spannung der
            Rechnerarchitektur.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Fächer & Korridore",
      intro: (
        <>
          <p>Ein RAM mit 16 Zellen, ein Adressbus, ein Datenbus und Knöpfe, die sie miteinander reden lassen.</p>
          <ul>
            <li>Lies Zelle 3, dann Zelle 14 — sieh zu, wie der Adressbus auswählt und der Datenbus antwortet.</li>
            <li>Schreibe deine Lieblingszahl irgendwohin und lies sie zurück. Das ist eine Variable.</li>
            <li>Beachte: Die Zellen 14 und 15 enthalten 3 und 4 — hier wohnen die Daten des CPU-Abschlussprojekts.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "RAM-Adressierung funktioniert, weil…",
        choices: [
          "jede Zelle ihren eigenen Draht zur CPU hat",
          "der Datenbus die Zelle auswählt",
          "Zellen in alphabetischer Reihenfolge antworten",
          "ein Decoder aus der Zahl auf dem Adressbus genau eine Zellenzeile aktiviert",
        ],
        answer: 3,
        explain: "Ein gemeinsamer Korridor plus ein kombinatorischer Decoder — keine Verdrahtung pro Zelle, und genau deshalb sind Gigabytes bezahlbar.",
      },
      {
        q: "Ein 32-Bit-Adressbus erreicht…",
        choices: ["32 Zellen", "4 096 Zellen", "etwa 4 Milliarden Zellen (4 GB)", "unbegrenzten Speicher"],
        answer: 2,
        explain: "2³² ≈ 4,3 × 10⁹. Das alte '4-GB-RAM-Limit' war buchstäblich die Breite des Adressbusses.",
      },
      {
        q: "Das Konzept des gespeicherten Programms bedeutet…",
        choices: [
          "Programme werden auf der Festplatte gespeichert",
          "Befehle und Daten teilen sich denselben Speicher — ein Programm ist nur Zahlen in Zellen",
          "jeder Befehl hat seinen eigenen Chip",
          "Programme können nicht geändert werden",
        ],
        answer: 1,
        explain: "Von Neumanns Zug: Code ist Daten. Loader, Compiler und Software überhaupt folgen daraus.",
      },
      {
        q: "Während eines Speicher-LESENS tragen die Busse…",
        choices: [
          "die Adresse von der CPU zum RAM, dann die Daten vom RAM zur CPU",
          "nur Daten von der CPU zum RAM",
          "beide Busse von der CPU zum RAM",
          "nichts — Lesen geht drahtlos",
        ],
        answer: 0,
        explain: "'Zelle 14, bitte' geht über den Adressbus hinaus; der Wert kommt über den Datenbus zurück. Beim Schreiben gehen beide nach außen.",
      },
    ],
  },

  /* ================================================================ */
  "instruction-set": {
    Theory: () => (
      <>
        <h2>Ein Befehl ist nur eine vereinbarte Zahl</h2>
        <p>
          Unsere Lehr-CPU (eine nahe Verwandte von Ben Eaters geliebtem SAP-1) verwendet
          8-Bit-Befehle: Die oberen vier Bits benennen die Operation, die unteren vier eine
          Adresse. Das Vokabular — der <strong>Befehlssatz</strong> — ist winzig und
          vollständig:
        </p>
        <table>
          <thead>
            <tr><th>Mnemonik</th><th>Bedeutung</th><th>Nutzt</th></tr>
          </thead>
          <tbody>
            <tr><td>LDA n</td><td>kopiert Zelle n nach A</td><td>Speicher-Lesen (17.2)</td></tr>
            <tr><td>ADD n / SUB n</td><td>A = A ± Zelle n</td><td>die ALU (17.1)</td></tr>
            <tr><td>STA n</td><td>speichert A in Zelle n</td><td>Speicher-Schreiben</td></tr>
            <tr><td>LDI v</td><td>lädt den Literalwert v</td><td>Konstanten</td></tr>
            <tr><td>JMP n</td><td>setzt den PC auf n</td><td>Schleifen!</td></tr>
            <tr><td>JZ n</td><td>springt nur, wenn das Z-Flag gesetzt ist</td><td>Entscheidungen!</td></tr>
            <tr><td>OUT / HLT</td><td>zeigt A an / hält den Takt an</td><td>Ergebnis &amp; Ruhe</td></tr>
          </tbody>
        </table>

        <h2>Der Herzschlag</h2>
        <p>
          Die CPU tut genau eines, für immer, in drei Phasen pro Befehl:
        </p>
        <div className="formula">
          FETCH → DECODE → EXECUTE → (wiederholen)
          <span className="note">holen: PC → Adressbus, Befehl → IR, PC++ · dekodieren: die Bits zerlegen · ausführen: die Tat vollbringen</span>
        </div>
        <p>
          <strong>Holen (FETCH):</strong> Der Wert des Programmzählers geht auf den Adressbus
          hinaus; der Befehl kommt zurück in das <strong>Befehlsregister</strong> (IR); der
          PC zählt hoch (er ist buchstäblich dein Zähler aus 7.3).{" "}
          <strong>Dekodieren (DECODE):</strong> Kombinatorische Logik trennt Opcode und
          Operand und hebt die richtigen Steuersignale. <strong>Ausführen (EXECUTE):</strong>{" "}
          Der Datenpfad gehorcht — die ALU feuert, der Speicher wird angefasst, oder der PC
          wird überschrieben (mehr ist ein Sprung nicht!).
        </p>
        <p>
          Lies den letzten Halbsatz noch einmal: <em>Ein Sprung schreibt nur den PC.</em>{" "}
          Schleifen, ifs, Funktionsaufrufe, dein MicroPython-<code>while True:</code> (11.1)
          — jede jemals ersonnene Kontrollstruktur ist Zucker über &bdquo;schreibe eine neue
          Zahl in den Programmzähler, manchmal abhängig von einem Flag&ldquo;.
        </p>
        <div className="callout note">
          <span className="co-title">Von hier zu echten Befehlssätzen</span>
          <p>
            Ein moderner Befehlssatz (ARM, x86, RISC-V) hat Hunderte Befehle, breitere
            Register und clevere Kodierungen — aber jeder einzelne reitet noch immer
            denselben dreiphasigen Herzschlag: holen-dekodieren-ausführen. Lerne einen
            winzigen Befehlssatz ehrlich, und die großen lesen sich wie Dialekte, nicht wie
            Fremdsprachen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Ein Herzschlag nach dem anderen",
      intro: (
        <>
          <p>Ein Programm aus vier Befehlen, Phase für Phase in deinem Tempo ausgeführt.</p>
          <ul>
            <li>Beobachte den PC während FETCH und das IR während DECODE — der Korridorverkehr aus 17.2.</li>
            <li>Beachte, dass der PC schon weitergezogen ist, während der alte Befehl noch ausgeführt wird.</li>
            <li>Bei HLT hast du 3 + 4 so passieren sehen, wie Silizium es wirklich tut.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Während FETCH…",
        choices: [
          "führt die CPU den Befehl aus",
          "wartet die CPU auf Eingaben",
          "löscht die CPU alle Register",
          "schickt die CPU den PC auf den Adressbus hinaus und lädt den zurückkommenden Befehl in das IR",
        ],
        answer: 3,
        explain: "Holen ist ein ganz gewöhnliches Speicher-Lesen (17.2), dessen Adresse zufällig aus dem Programmzähler kommt.",
      },
      {
        q: "Ein JMP-Befehl funktioniert, indem er…",
        choices: [
          "die CPU physisch umverdrahtet",
          "die übersprungenen Befehle löscht",
          "einen neuen Wert in den Programmzähler schreibt",
          "den Takt anhält",
        ],
        answer: 2,
        explain: "Das ist der gesamte Mechanismus. Jede Schleife und jede if-Anweisung in jeder Sprache reduziert sich auf bedingte PC-Schreibvorgänge.",
      },
      {
        q: "In unserer 8-Bit-Kodierung 0010 1111 (0x2F) bedeuten die beiden Hälften…",
        choices: [
          "Opcode 2 (ADD) und Operand 15 — 'addiere Zelle 15 zu A'",
          "zwei Datenwerte",
          "Adresse 2 und Adresse 15",
          "nichts — sie ist ungültig",
        ],
        answer: 0,
        explain: "Oberes Nibble = welche Operation, unteres Nibble = welche Zelle. Dekodieren ist nur Bits zerlegen.",
      },
      {
        q: "JZ (springe bei null) verbindet welche zwei früheren Ideen?",
        choices: [
          "den ADC und den DAC",
          "das Z-Flag der ALU und das Schreiben des Programmzählers",
          "Abtastung und Aliasing",
          "PWM und Tastgrad",
        ],
        answer: 1,
        explain: "Arithmetik-Klatsch (17.1) steuert den Befehlsstrom (17.3). Dieser Handschlag ist der Weg, auf dem Software Entscheidungen trifft.",
      },
    ],
  },

  /* ================================================================ */
  "build-cpu": {
    Theory: () => (
      <>
        <h2>Alles, zusammengebaut</h2>
        <p>
          Das Labor unten ist die ganze Maschine: dein Zähler als PC, deine ALU mit ihrem
          Z-Flag, dein 16-Zellen-RAM an seinen Bussen, ein OUT-Register als Anzeige und das
          Zehn-Wort-Vokabular aus der letzten Lektion. Drei Programme sind geladen und
          startklar:
        </p>
        <ul>
          <li>
            <strong>Zwei Zahlen addieren</strong> — das Programm aus der
            FETCH/DECODE/EXECUTE-Lektion, jetzt freilaufend. Ändere die Datenzellen und sieh
            zu, wie es der Maschine egal ist: gleiches Programm, neue Antwort. Diese
            Gleichgültigkeit ist es, was &bdquo;programmierbar&ldquo; bedeutet.
          </li>
          <li>
            <strong>Countdown</strong> — das erste Programm mit einer{" "}
            <em>Entscheidung</em>: SUB, dann ein JZ mit Blick auf das Z-Flag, dann ein JMP
            zurück. Eine Schleife mit Ausstiegsbedingung — das Skelett jeder for-Schleife,
            die du je schreiben wirst.
          </li>
          <li>
            <strong>Fibonacci für immer</strong> — Variablen, die durch Speicherzellen
            geschoben werden, eine endlose JMP-Schleife, und — pass jenseits von 233 auf —
            ein 8-Bit-Überlauf (7.2), der die Folge in Unsinn verwandelt. Eine berühmte
            Fehlerklasse, vorgeführt von deiner eigenen CPU.
          </li>
        </ul>

        <h2>Worauf du beim Laufen achten solltest</h2>
        <p>
          Lass sie zuerst mit 1–2 Hz laufen und <em>sage jeden Schritt voraus, bevor er
          passiert</em> — du hast jedes Werkzeug dafür. Dann dreh den Takt auf: Dieselbe
          Maschine beginnt sich bei 30 Hz lebendig anzufühlen, und der einzige Unterschied
          zu deinem Laptop ist, dass dessen Takt fünf Milliarden Mal pro Sekunde tickt und
          seine Zellen 64 Bit breit sind. Langsam ist keine Spielzeugversion von schnell. Es{" "}
          <em>ist</em> das Echte, in menschlichem Tempo.
        </p>
        <div className="callout tip">
          <span className="co-title">Falls dich dieser Zweig gepackt hat</span>
          <p>
            Ben Eaters Videoserie zur Breadboard-CPU baut fast genau diese Maschine aus
            Logikchips der 74er-Serie — Dutzende Steckbretter, reine Einheit-7-Teile. Und{" "}
            <em>nand2tetris</em> führt dich von NAND-Gattern bis Tetris. Beides sind
            hervorragende nächste Schritte; du bist auf beide voll vorbereitet.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Maschine, lebendig",
      intro: (
        <>
          <p>Deine CPU mit drei Programmen, einem Tempo-Regler und vollem Einblick in jedes Register.</p>
          <ul>
            <li>Führe das Additionsprogramm im Einzelschritt aus und erzähle jeden Herzschlag mit — du kannst das.</li>
            <li>Lass den Countdown laufen und sieh zu, wie JZ das Z-Flag bei exakt null erwischt.</li>
            <li>Lass Fibonacci über 233 hinauslaufen und erkläre den Müll. (Tipp: Lektion 7.2.)</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "add", text: "Add mit eigenen Zahlen in den Zellen 14/15 laufen lassen und OUT vorhergesagt, bevor es erschien" },
      { id: "step", text: "Ein ganzes Programm im Einzelschritt ausgeführt und jede Registeränderung korrekt vorhergesagt" },
      { id: "countdown", text: "Gesehen, wie das JZ des Countdowns bei null feuert — eine Schleife mit Ausstieg, in Hardware" },
      { id: "fib", text: "Fibonacci beim Überlauf jenseits von 255 ertappt und erklärt, warum (8-Bit-Umlauf: bei 256 geht es wieder bei null los)" },
      { id: "trace", text: "Einen Befehl durch alle drei Phasen verfolgt und dabei die beteiligte Hardware benannt (PC, Bus, IR, ALU)" },
      { id: "jump", text: "Jemandem (oder einer Gummiente) erklärt, warum ein JMP nur ein Schreiben in den PC ist" },
      { id: "vocab", text: "Kann ohne Nachschauen sagen, was LDA/ADD/STA/LDI/JMP/JZ/OUT/HLT jeweils tun" },
      { id: "bridge", text: "Die Verbindung gezogen: Mein Laptop ist diese Maschine, breiter und schneller — konzeptionell nichts Neues" },
    ],
  },
};
