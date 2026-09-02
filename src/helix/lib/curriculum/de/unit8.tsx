import type { LessonContentDe } from "../localize";

export const unit8De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  neuron: {
    Theory: () => (
      <>
        <h2>Die Batterie in jeder Membran</h2>
        <p>
          Ein Neuron ist eine zum Draht ausgezogene Zelle: ein Körper, der Eingänge sammelt, und
          ein <strong>Axon</strong> — mitunter einen Meter lang — das den Ausgang trägt. Die
          Elektrizität dafür kommt direkt aus der Membran von Einheit 0. Eine Proteinpumpe (die{" "}
          <strong>Natrium-Kalium-Pumpe</strong>) verausgabt ATP, um Na⁺-Ionen hinaus- und
          K⁺-Ionen hineinzuschieben, sodass Ladung über der Membran gespeichert ist wie in einer
          gespannten Feder. In Ruhe liegt das Innere bei etwa <strong>−70&nbsp;mV</strong>{" "}
          gegenüber außen.
        </p>
        <p>
          Ein geladener Isolator zwischen zwei Leitern ist genau das, was Spark einen Kondensator
          nennt. Der Unterschied ist der Trick, den das Neuron damit spielt.
        </p>

        <h2>Das Aktionspotenzial: Kippen, dann zurückstellen</h2>
        <p>
          Entlang des Axons sitzen <strong>spannungsgesteuerte Kanäle</strong> — Poren, die sich
          öffnen, wenn die örtliche Spannung steigt. Stupst ein Eingang die Membran über eine{" "}
          <strong>Schwelle</strong> von etwa −55&nbsp;mV, schnappen Na⁺-Kanäle auf, Na⁺ flutet
          hinein, und die Spannung schießt in unter einer Millisekunde auf etwa{" "}
          <strong>+40&nbsp;mV</strong>. Dann schließen die Na⁺-Kanäle, K⁺-Kanäle öffnen sich, und
          die Spannung fällt zurück — mit einem kurzen Unterschwinger unter den Ruhewert. Diese
          Spitze ist das <strong>Aktionspotenzial</strong>.
        </p>
        <div className="formula">
          −70 mV Ruhe → −55 mV Schwelle → +40 mV Spitze → zurückgesetzt
          <span className="note">Gesamtdauer: wenige Millisekunden, dann wieder bereit</span>
        </div>
        <p>
          Die Spitze an einem Membranabschnitt stupst den nächsten über die Schwelle, und so
          erneuert sich das Signal das Axon entlang wie eine Flamme an einer Zündschnur — ohne je
          zu verblassen, weil jedes Segment frisch zündet.
        </p>

        <h2>Alles oder nichts</h2>
        <p>
          Unter der Schwelle: eine örtliche Beule, die zerfällt und nirgendwohin läuft. Über der
          Schwelle: eine volle Spitze, und zwar immer in <em>derselben</em> vollen Größe, egal
          wie stark der Reiz war. Ein Neuron kann keine halbe Spitze feuern. Wie meldet es dann,
          dass eine Berührung fest statt sanft ist? <strong>Über die Rate.</strong> Ein sanfter
          Druck löst vielleicht 5 Spitzen pro Sekunde aus, ein fester 100. Intensität wird in
          Frequenz codiert — mit harter Obergrenze, denn nach jeder Spitze brauchen die Kanäle
          eine <strong>Refraktärzeit</strong> von einigen Millisekunden, bevor sie wieder feuern
          können.
        </p>

        <h2>Myelin: Isolierung ändert alles</h2>
        <p>
          Ein nacktes Axon leitet im Schritttempo — rund 1&nbsp;m/s. In{" "}
          <strong>Myelin</strong> gewickelt (fettige Isolierung, von Helferzellen aufgelegt)
          springt das Signal zwischen den Lücken der Wicklung, statt sich an jedem Punkt neu
          aufzubauen, und erreicht <strong>120&nbsp;m/s</strong>. Diese hundertfache
          Beschleunigung ist der Grund, warum deine Reflexe funktionieren. Ihren Wert zeigt sie
          auch durch ihr Fehlen: Bei Multipler Sklerose greift das Immunsystem — der
          Eigenbeschuss der letzten Einheit — das Myelin an, und Signale werden langsam,
          zerstreut, fallen aus.
        </p>

        <div className="callout note">
          <span className="co-title">Warum ein Tintenfisch einen Nobelpreis verdiente</span>
          <p>
            Hodgkin und Huxley klärten all das in den 1940er- und 50er-Jahren am Riesenaxon des
            Tintenfischs — eine Nervenfaser so dick (ein Millimeter), dass die Elektroden der
            Zeit hineinpassten. Die Gleichungen, die sie für seine Kanäle aufschrieben, sind bis
            heute das Fundament der theoretischen Neurowissenschaft.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Aktionspotenzial",
      intro: (
        <>
          <p>Reize einen Membranabschnitt und beobachte die Spannungsspur.</p>
          <ul>
            <li>Bleib mit der Stärke unter +15 mV: Beulen, die verblassen. Überschreite sie: sofort volle Spitzen.</li>
            <li>Dreh die Stärke im Feuerbetrieb weiter hoch. Die Spitzen werden nicht höher — das ist Alles-oder-nichts.</li>
            <li>Treib die Reizrate über ~250/s. Die Refraktärzeit beginnt, jeden zweiten Reiz zu verschlucken.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein myelinisiertes Axon leitet mit 120 m/s. Wie lange braucht ein Signal für 1,8 m vom Zeh zum Hirnstamm, in Millisekunden?",
        answer: 15,
        unit: "ms",
        hint: "Zeit = Strecke ÷ Geschwindigkeit, dann Sekunden in ms umrechnen.",
        explain: "1,8 ÷ 120 = 0,015 s = 15 ms. Unmyelinisiert würde dieselbe Reise fast zwei Sekunden dauern.",
      },
      {
        prompt:
          "Wenn die Refraktärzeit 2 ms beträgt: Wie hoch ist die maximal mögliche Feuerrate in Spitzen pro Sekunde?",
        answer: 500,
        unit: "Spitzen/s",
        hint: "Wie viele 2-ms-Fenster passen in eine Sekunde?",
        explain: "1000 ms ÷ 2 ms = 500 Spitzen/s — die harte Obergrenze der Ratencodierung.",
      },
    ],
    quiz: [
      {
        q: "Was hält das Ruhepotenzial von −70 mV aufrecht?",
        choices: [
          "Die Natrium-Kalium-Pumpe verausgabt ATP, um ungleiche Ionenkonzentrationen über der Membran zu halten",
          "Elektronen, die am Axon entlangfließen",
          "Die Myelinscheide erzeugt Ladung",
          "In der Zelle gespeicherte Neurotransmitter",
        ],
        answer: 0,
        explain:
          "Eine Proteinpumpe baut Ionengradienten auf und speichert so Ladung über der Membran — ein biologischer Kondensator, geladen auf Kosten von ATP.",
      },
      {
        q: "Was bedeutet „Alles-oder-nichts“ beim Aktionspotenzial?",
        choices: [
          "Ein Neuron feuert alle Nachbarn oder keinen",
          "Über der Schwelle ist die Spitze immer voll groß; darunter läuft gar nichts los",
          "Das Neuron verbraucht sein ganzes ATP pro Spitze",
          "Jeder Reiz erzeugt eine Spitze",
        ],
        answer: 1,
        explain:
          "Die Spitzengröße variiert nie mit der Reizstärke. Unterschwellige Eingänge erzeugen nur örtliche Beulen, die zerfallen.",
      },
      {
        q: "Wenn alle Spitzen gleich groß sind — wie signalisiert ein Neuron einen stärkeren Reiz?",
        choices: [
          "Mit höheren Spitzen",
          "Mit breiteren Spitzen",
          "Indem es mit höherer Rate feuert",
          "Mit einem anderen Neurotransmitter",
        ],
        answer: 2,
        explain: "Intensität steckt in der Frequenz — bis zur Decke, die die Refraktärzeit setzt.",
      },
      {
        q: "Was leistet Myelin für ein Axon?",
        choices: [
          "Es erzeugt das Ruhepotenzial",
          "Es schützt es vor dem Immunsystem",
          "Es versorgt es mit ATP",
          "Es isoliert es, sodass das Signal zwischen Lücken springt — etwa hundertfache Geschwindigkeit",
        ],
        answer: 3,
        explain:
          "Von ~1 m/s nackt auf ~120 m/s myelinisiert. Multiple Sklerose, die Myelin abbaut, zeigt, was ohne es verloren geht.",
      },
      {
        q: "Warum kann eine Spitze einen Meter weit laufen, ohne zu verblassen?",
        choices: [
          "Sie erneuert sich an jedem Membranabschnitt vollständig, wie eine Flamme an der Zündschnur",
          "Das Axon ist ein Supraleiter",
          "Das Gehirn verstärkt sie",
          "Myelin verhindert jeden Energieverlust",
        ],
        answer: 0,
        explain:
          "Jedes Segment zündet sein eigenes frisches Aktionspotenzial. Das Signal wird neu erzeugt, nicht passiv geleitet — darum kann es nicht verblassen.",
      },
    ],
  },

  /* ================================================================ */
  synapse: {
    Theory: () => (
      <>
        <h2>Das Signal wechselt das Fahrzeug</h2>
        <p>
          Zwischen einem Neuron und dem nächsten liegt ein Spalt von etwa 20{" "}
          <em>Nanometern</em> — viel zu weit für die Spannungsspitze. Also wechselt das Signal
          das Fahrzeug. Eine ankommende Spitze lässt die Senderendung{" "}
          <strong>Neurotransmitter</strong> ausschütten — kleine Moleküle, in Bläschen gelagert —
          die über den Spalt driften und an <strong>Rezeptorproteine</strong> der Empfängerseite
          andocken, wo sie Ionenkanäle öffnen. Elektrisch → chemisch → elektrisch, in etwa einer
          Millisekunde.
        </p>
        <p>
          Warum der Umweg? Weil ein Spalt kann, was ein durchgehender Draht nicht kann: Er lässt
          sich stärken, schwächen, blockieren — und er kann, entscheidend,{" "}
          <em>mit Nein stimmen</em>.
        </p>

        <h2>Erregung, Hemmung und die Abstimmung</h2>
        <p>
          Manche Synapsen sind <strong>erregend</strong>: Ihr Transmitter öffnet Kanäle, die die
          Spannung des Empfängerneurons zur Schwelle hin anheben. Andere sind{" "}
          <strong>hemmend</strong>: Sie drücken die Spannung davon weg. Ein typisches Neuron
          sammelt <em>Tausende</em> beider Sorten, und ihre Wirkungen{" "}
          <strong>summieren sich</strong> — nah beieinander in Zeit und Raum landen Plus-Stimmen
          und Minus-Stimmen auf derselben Membran. Wird −55&nbsp;mV überschritten, feuert das
          Axon; wird es verfehlt, passiert nichts.
        </p>
        <div className="formula">
          feuert, wenn: Ruhe + Σ(Erregung) − Σ(Hemmung) ≥ Schwelle
          <span className="note">ein Neuron ist eine Abstimmungsmaschine mit Grenzwert</span>
        </div>
        <p>
          Dieses Summieren-mit-Schwelle ist eine echte Rechenoperation — Ingenieure haben genau
          diese Arithmetik für künstliche neuronale Netze entlehnt. Alles, was dein Gehirn tut,
          ist aus rund 86 Milliarden solcher Abstimmungsmaschinen gebaut, verdrahtet über etwa
          hundert Billionen Synapsen.
        </p>

        <h2>Das Lernen wohnt im Spalt</h2>
        <p>
          Synapsen sind verstellbar: Wird eine wiederholt benutzt, wird sie stärker — mehr
          Transmitter ausgeschüttet, mehr Rezeptoren auf Empfang. Neurowissenschaftler
          komprimieren das zu <em>„Zellen, die zusammen feuern, verdrahten sich zusammen.“</em>{" "}
          Erinnerungen liegen nicht in einem Speicherorgan; sie sind Muster gestärkter und
          geschwächter Synapsen. Wenn du diesen Kurs abschließt, sind synaptische Gewichte das,
          was sich in dir physisch verändert hat.
        </p>

        <h2>Warum Drogen hier wirken</h2>
        <p>
          Ein chemischer Spalt ist ein chemisches Ziel — darum wirkt fast jede
          bewusstseinsverändernde Substanz an der Synapse. <strong>Koffein</strong> blockiert den
          Rezeptor für Adenosin, ein hemmendes „Schlafdruck“-Signal — einen Hemmer zu blockieren
          fühlt sich wie ein Aufputschmittel an. <strong>SSRIs</strong> verlangsamen das
          Aufräumen von Serotonin, sodass jede Ausschüttung länger nachklingt.{" "}
          <strong>Botox</strong> blockiert die Transmitterausschüttung an Nerv-Muskel-Synapsen:
          Die Stimme kommt nie an, und der Muskel entspannt. Dieselbe Maschinerie, drei
          verschiedene Hebel.
        </p>

        <div className="callout note">
          <span className="co-title">Warum deine Reaktionszeit ~200 ms beträgt</span>
          <p>
            Axone sind schnell, aber jede Synapse kostet etwa eine Millisekunde, und die Kette
            von Reiz zu Knopfdruck durchquert viele davon — plus das Abwägen des Gehirns selbst.
            Sprinter, die unter 100 ms nach dem Schuss aus den Blöcken gehen, werden
            disqualifiziert: Keine menschliche Synapsenkette ist so kurz, also müssen sie
            gesprungen sein.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Abstimmungsmaschine",
      intro: (
        <>
          <p>Erregende Eingänge stimmen mit +4 mV, hemmende mit −3 mV. Die Schwelle zählt aus.</p>
          <ul>
            <li>Finde ohne Hemmung die kleinste Zahl erregender Stimmen, die das Neuron feuern lässt.</li>
            <li>Füge Hemmung hinzu, bis es wieder verstummt — nur die Summe zählt.</li>
            <li>Probiere Stimulans und Sedativum: Beide rühren die Erregung nicht an, sie gewichten nur die Nein-Stimmen um.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Neuron ruht bei −70 mV mit Schwelle −55 mV. Jeder erregende Eingang bringt +3 mV. Wie viele Eingänge müssen ohne Hemmung zusammen eintreffen, damit es feuert?",
        answer: 5,
        unit: "Eingänge",
        hint: "Die zu schließende Lücke beträgt 15 mV.",
        explain: "15 ÷ 3 = 5 gleichzeitige erregende Eingänge. Einer oder zwei allein verblassen — die Summation ist der Punkt.",
      },
    ],
    quiz: [
      {
        q: "Wie überquert ein Signal den synaptischen Spalt?",
        choices: [
          "Die Spannungsspitze springt hinüber",
          "Ionen fließen durch den Spalt",
          "Die beiden Zellen verschmelzen kurz",
          "Neurotransmitter werden ausgeschüttet, driften hinüber und docken an Rezeptoren an",
        ],
        answer: 3,
        explain:
          "Das Signal wandelt sich von elektrisch zu chemisch und zurück. Der Umweg macht Synapsen verstellbar, blockierbar — und hemmbar.",
      },
      {
        q: "Was entscheidet, ob das empfangende Neuron feuert?",
        choices: [
          "Ob die summierten erregenden und hemmenden Eingänge die Membran über die Schwelle schieben",
          "Ob überhaupt ein Eingang ankommt",
          "Die Länge seines Axons",
          "Die Menge seines Myelins",
        ],
        answer: 0,
        explain:
          "Plus- und Minus-Stimmen summieren sich auf der Membran; die Schwelle macht aus dem Zählstand ein Ja oder Nein. Das ist die Rechenoperation.",
      },
      {
        q: "Was ist die physische Grundlage von Lernen und Gedächtnis?",
        choices: [
          "Neue Neuronen ersetzen alte",
          "Synapsen ändern ihre Stärke — benutzte Verbindungen werden stärker",
          "Schnellere Aktionspotenziale",
          "Mehr Neurotransmitter-Sorten",
        ],
        answer: 1,
        explain:
          "„Zusammen feuern, zusammen verdrahten.“ Erinnerungen sind Muster verstellter synaptischer Gewichte, keine Dateien in einem Speicherorgan.",
      },
      {
        q: "Koffein blockiert Rezeptoren für Adenosin, ein hemmendes Signal. Warum wirkt das anregend?",
        choices: [
          "Koffein ist selbst ein erregender Transmitter",
          "Es beschleunigt Aktionspotenziale",
          "Einen Hemmer zu blockieren entfernt eine Nein-Stimme — netto steigt die Erregung",
          "Es steigert direkt die Dopaminproduktion",
        ],
        answer: 2,
        explain:
          "Zwei Minus ergeben an einer Abstimmungsmaschine ein Plus: Einen hemmenden Eingang stummzuschalten verschiebt die Summe Richtung Feuern.",
      },
      {
        q: "Warum gibt es überhaupt hemmende Synapsen?",
        choices: [
          "Es sind gescheiterte erregende Synapsen",
          "Sie sparen Energie",
          "Sie kommen nur in kranken Gehirnen vor",
          "Rechnen braucht Nein-Stimmen — ein System, das nur Ja sagen kann, kann nur eskalieren",
        ],
        answer: 3,
        explain:
          "Subtraktion ist die halbe Arithmetik. Hemmung schärft Signale, formt Timing und hält davonlaufende Erregung (einen Krampfanfall) im Zaum.",
      },
    ],
  },
};
