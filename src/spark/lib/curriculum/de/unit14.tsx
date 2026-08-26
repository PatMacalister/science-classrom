import type { LessonContentDe } from "../localize";

/** Full German content for Unit 14 (feedback-control, pid). */

export const unit14De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "feedback-control": {
    Theory: () => (
      <>
        <h2>Offener Kreis vs. geschlossener Kreis</h2>
        <p>
          Ein Toaster ist <strong>Steuerung ohne Rückführung</strong>: Er lässt seine Heizung
          eine feste Zeit laufen und hofft. Ändere das Brot, den Raum, die Netzspannung — und
          Hoffnung ist alles, was er hat. Ein <strong>geschlossener Regelkreis</strong>{" "}
          dagegen <em>misst</em> das Ergebnis, vergleicht es mit dem Ziel und korrigiert
          fortlaufend:
        </p>
        <div className="formula">
          error = setpoint − measurement → drive = f(error)
          <span className="note">der Kreis: messen → vergleichen → stellen → die Welt antwortet → wieder messen</span>
        </div>
        <p>
          Du hast das zweimal gebaut, ohne das Vokabular: Der Op-Amp mit Gegenkopplung (6.2)
          schließt millionenfach pro Sekunde einen Kreis, um V₋ gleich V₊ zu halten; dein
          Nachtlicht (12.1) schließt einen zwanzigmal pro Sekunde. Regelungstechnik ist die
          Lehre davon, was <em>zwischen</em> den Korrekturen passiert — denn dazwischen wohnt
          der Ärger.
        </p>

        <h2>P-Regelung und ihre zwei Versagen</h2>
        <p>
          Die naheliegende Regel: Drücke proportional zur Abweichung —{" "}
          <code>drive = Kp × error</code>. Sie funktioniert! Und versagt doppelt:
        </p>
        <ul>
          <li>
            <strong>Bleibende Regelabweichung.</strong> Eine Heizung über Raumtemperatur zu
            halten braucht eine <em>von null verschiedene</em> Stellgröße — aber die
            Stellgröße der P-Regelung ist null, wenn die Abweichung null ist. Also pendelt sie
            sich dort ein, wo die Restabweichung mal Kp die Temperatur exakt hält: immer etwas
            zu kurz. Erhöhe Kp, und der Versatz schrumpft… aber:
          </li>
          <li>
            <strong>Schwingen.</strong> Echte Systeme antworten spät — Wärme braucht Zeit vom
            Heizelement zum Sensor (eine <em>Totzeit</em>). Ein Regler mit hoher Verstärkung
            drückt auf veralteter Information weiter, überschießt, reißt in die Gegenrichtung,
            überschießt wieder: Der Kreis klingelt wie dein LC-Schwingkreis (9.1), und jenseits
            einer kritischen Verstärkung wächst das Klingeln, statt zu sterben. Rückkopplung +
            Verzögerung + zu viel Verstärkung = ein Oszillator. (Manchmal mit Absicht — genau
            so baut man Oszillatoren. In einer Heizung ist es ein Defekt.)
          </li>
        </ul>
        <div className="callout note">
          <span className="co-title">Die Spannung, die du im Labor fühlen sollst</span>
          <p>
            Kleine Verstärkung: träge und dauerhaft unter dem Ziel. Große Verstärkung: schnell
            und wackelnd am Rand der Instabilität. P-Regelung allein kann dir nicht
            Genauigkeit <em>und</em> Ruhe geben — genau diese Sackgasse ist der Grund für die
            nächste Lektion.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der störrische Heizer",
      intro: (
        <>
          <p>Eine Heizung mit realistischer Trägheit und Totzeit, unter reiner P-Regelung.</p>
          <ul>
            <li>Kp = 1: beruhigt sich — deutlich unter dem Sollwert. Vergleiche mit dem Theorie-Messfeld.</li>
            <li>Kp = 6: näher dran und wackliger. Kp = 15: ein ausgewachsener Oszillator.</li>
            <li>Öffne bei jeder Verstärkung das Fenster und beobachte, wie sie sich erholt (oder nicht).</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein rein proportionaler Heizungsregler pendelt sich immer unter seinem Sollwert ein, weil…",
        choices: [
          "Heizungen schwach sind",
          "null Abweichung null Stellgröße hieße — aber Temperatur halten braucht eine Stellgröße ungleich null",
          "der Sensor zu hoch misst",
          "Kp negativ ist",
        ],
        answer: 1,
        explain:
          "P-Stellgröße existiert nur, solange Abweichung existiert. Das System pendelt sich bei der Abweichung ein, deren Stellgröße den Wärmeverlust exakt ausgleicht — der berühmte P-Versatz.",
      },
      {
        q: "Was macht aus einem Regelkreis mit hoher Verstärkung einen Oszillator?",
        choices: [
          "zu viel elektrisches Rauschen",
          "Verzögerung: Der Regler handelt auf veralteten Messwerten und überschießt abwechselnd in beide Richtungen",
          "schwache Batterien",
          "ein zu hoher Sollwert",
        ],
        answer: 1,
        explain: "Verstärkung + Verzögerung = Korrekturen, die zu spät und zu stark ankommen. Jenseits der kritischen Verstärkung wächst das Wackeln, statt abzuklingen.",
      },
      {
        q: "Ein Toaster mit Zeitschaltuhr ist ein Beispiel für…",
        choices: ["geschlossene Regelung", "offene Steuerung", "PID-Regelung", "Hysterese"],
        answer: 1,
        explain: "Er misst den Toast nie. Feste Aktion, erhofftes Ergebnis — offener Kreis.",
      },
      {
        q: "Welche frühere Schaltung war bereits ein geschlossener Regelkreis?",
        choices: [
          "der Farbcode-Decoder für Widerstände",
          "der Op-Amp-Verstärker, der V₋ gleich V₊ hält",
          "der Einweggleichrichter",
          "der LC-Schwingkreis",
        ],
        answer: 1,
        explain: "Gegenkopplung (6.2) ist Regelungstechnik in Elektronikgeschwindigkeit: Ausgang messen, vergleichen, korrigieren — fortlaufend.",
      },
    ],
  },

  /* ================================================================ */
  pid: {
    Theory: () => (
      <>
        <h2>Drei Terme, drei Zeitformen</h2>
        <p>
          Die Kur für die Versagen der P-Regelung: Lass den Regler mehr als den gegenwärtigen
          Moment betrachten:
        </p>
        <div className="formula">
          drive = Kp·e + Ki·∫e·dt + Kd·de/dt
          <span className="note">Gegenwart · Vergangenheit · Zukunft — der PID-Regler, Arbeitspferd der Industrie seit den 1920ern</span>
        </div>
        <ul>
          <li>
            <strong>P — die Gegenwart.</strong> Der Muskel. Reagiert auf die Abweichung, die
            jetzt gerade existiert.
          </li>
          <li>
            <strong>I — die Vergangenheit.</strong> Der Nachtragende: Er summiert die
            Abweichung über die Zeit. Jeder anhaltende Versatz lässt das Integral wachsen, bis
            der Versatz verschwunden ist — dieser Term <em>tötet das dauerhafte Zukurzkommen
            des P-Reglers</em>. (Im Code: zwei Zeilen — ein Akkumulator und eine Begrenzung,
            die Begrenzung ist das &bdquo;Anti-Windup&ldquo;, damit eine lange Sättigung
            keinen Berg aufgestauten Drucks speichert.)
          </li>
          <li>
            <strong>D — die Zukunft.</strong> Der Dämpfer: Er reagiert darauf, wie schnell sich
            die Abweichung <em>ändert</em>, und bremst die Annäherung, bevor das Überschwingen
            passiert — derselbe Job, den die Dämpfungswiderstände für deinen klingelnden
            LC-Kreis erledigten. Seine Schwäche: Ableitungen verstärken Rauschen, weshalb
            echte D-Terme gefiltert werden (Lektion 13.3, zum Dienst gemeldet) und viele
            Industriekreise nur PI fahren.
          </li>
        </ul>

        <h2>Abstimmen: Ingenieurskunst als Verhandlung</h2>
        <p>
          Kp, Ki, Kd zu wählen ist echtes Handwerk. Das praktische Amateurrezept: Erhöhe Kp,
          bis die Antwort wackelt, geh ein Drittel zurück; gib Ki dazu, bis der Versatz in
          vernünftiger Zeit stirbt; füge eine Prise Kd hinzu, wenn das Überschwingen gezähmt
          werden muss. Formale Methoden existieren (Ziegler–Nichols, von 1942, startet bei
          genau diesem kritischen Wackeln), aber jede Abstimmung ist eine Verhandlung zwischen
          Tempo, Überschwingen und Ruhe — die Regelungs-Version des Handels, der dir in jedem
          Filter begegnet ist.
        </p>

        <h2>Wo PID läuft</h2>
        <p>
          Der Tempomat deines Autos, der Ofen, der den Braten über Stunden bei 180° hält,
          Drohnen-Lageregelung (drei verschachtelte PIDs pro Achse, Hunderte Updates pro
          Sekunde), 3D-Drucker-Hotends, Chemieanlagen zu Tausenden von Kreisen, die
          Rückkopplung des Abwärtswandlers (10.2) — und, herrlich: Es sind etwa zehn Zeilen
          MicroPython, dein Pico kann also all das. Das Kreis-Skelett ist der Superloop deines
          Nachtlichts mit besseren Manieren.
        </p>
        <div className="callout tip">
          <span className="co-title">Die Gewohnheit des Meisters</span>
          <p>
            Wenn irgendein geregeltes Ding sich danebenbenimmt — eine wackelnde Drohne, ein
            überschwingender Thermostat, eine Dusche im Wechsel aus Verbrühen und Frieren —
            diagnostiziere es in PID-Begriffen: zu viel P? verhungerndes I? fehlendes D? Dir
            gehört jetzt das Vokabular jedes Regelsystems der Erde.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der gehorsame Heizer",
      intro: (
        <>
          <p>Dieselbe störrische Strecke, jetzt mit allen drei Reglern und einer Abstimm-Challenge.</p>
          <ul>
            <li>Starte nur mit P (Ki = Kd = 0): der vertraute Versatz. Gib Ki dazu und sieh den Nachtragenden ihn schließen.</li>
            <li>Neustart aus kaltem Zustand mit hohem Kp ohne Kd: Überschwingen. Kd dazu: gedämpft.</li>
            <li>Besteh die Challenge: unter 2 °C Überschwingen, null Endabweichung, und überlebe das offene Fenster.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Welcher PID-Term beseitigt die bleibende Regelabweichung?",
        choices: ["P", "I — er summiert die Abweichung, bis der Versatz auf null gedrückt ist", "D", "keiner davon"],
        answer: 1,
        explain: "Das Integral wächst, solange irgendeine Abweichung anhält, und liefert die stehende Stellgröße, die P allein nicht konnte.",
      },
      {
        q: "Der Job des D-Terms ist es…",
        choices: [
          "die Endgenauigkeit zu erhöhen",
          "die Antwort bei Annäherung ans Ziel zu bremsen und Überschwingen zu dämpfen",
          "den Sensor zu beschleunigen",
          "den Sollwert überflüssig zu machen",
        ],
        answer: 1,
        explain: "Er reagiert auf die Änderungsrate der Abweichung — Fuß vom Gas vor dem Aufprall, wie die Dämpfung in deinem klingelnden LC-Kreis.",
      },
      {
        q: "„Integral-Windup“ ist das Problem, dass…",
        choices: [
          "das Integral während der Stellglied-Sättigung einen riesigen Rückstand ansammelt und später massives Überschwingen verursacht",
          "die Ableitung Rauschen verstärkt",
          "Kp auf null gesetzt ist",
          "der Kreis zu schnell läuft",
        ],
        answer: 0,
        explain: "Während der Sättigung bleibt die Abweichung, und der Akkumulator bläht sich auf. Die Kur ist eine Begrenzung — Anti-Windup, Standard in jedem echten PID.",
      },
      {
        q: "Warum fahren viele Industriekreise PI ohne D?",
        choices: [
          "D ist patentiert",
          "der D-Term verstärkt das Messrauschen",
          "D funktioniert nur an Motoren",
          "zwei Buchstaben sind billiger als drei",
        ],
        answer: 1,
        explain: "Ein rauschendes Signal abzuleiten vergrößert das Rauschen (13.3s Lektion, umgedreht). Wenn kein Überschwingen Dämpfung verlangt, lassen Ingenieure D oft weg oder filtern es kräftig.",
      },
    ],
  },
};
