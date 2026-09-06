import type { LessonContentDe } from "../localize";

export const unit2De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  rangefinders: {
    Theory: () => (
      <>
        <h2>Der Stoppuhr-Trick</h2>
        <p>
          Sende einen Puls, starte einen Timer, fange die Reflexion, stoppe. Der Puls reiste
          hin <em>und zurück</em>, also:
        </p>
        <div className="formula">
          d = v · t / 2
          <span className="note">die halbe Rundreise — vergiss das ÷2, und jede Wand ist doppelt so weit weg, wie sie ist</span>
        </div>
        <p>
          Ein <strong>Ultraschall</strong>-Entfernungsmesser macht es mit einem Schall-Zirp bei
          v ≈ 343 m/s: Eine Wand in 1 m Entfernung antwortet nach etwa 6 ms — gemütliche Zeit für
          einen Mikrocontroller. Ein <strong>Time-of-Flight</strong>-Sensor macht es mit Licht bei
          300.000.000 m/s, wo dieselbe Wand in 6,7 <em>Nanosekunden</em> antwortet — weshalb
          ToF-Sensoren cleveres Timing-Silizium brauchen, und weshalb sie mehr kosten.
        </p>

        <h2>Der Kegel ist der Haken</h2>
        <p>
          Der Schall-Zirp breitet sich unterwegs aus — ein Kegel von 15° oder mehr. Der Sensor
          meldet das <em>nächste</em> Echo von irgendwo in diesem Kegel: Ein Stuhlbein einen
          halben Meter seitlich liest sich als Hindernis genau voraus. Der Laser bleibt eine
          bleistiftdünne Linie und misst, worauf du wirklich gezielt hast. Die Breite ist der
          tiefe Unterschied zwischen beiden — nicht der Preis, nicht die Präzision.
        </p>
        <p>
          Materialien haben Lieblinge, jeder Sensor seine eigenen: Schall prallt von harten
          Flächen ab, wird aber von Vorhängen, Schaumstoff und dicken Pullovern geschluckt —
          weiche Räume sind akustisch dunkel. Licht prallt von fast allem ab, kommt aber schwach
          zurück von schwarzem Samt — oder von Glas, das den Strahl wie ein Spiegel{" "}
          <em>wegwirft</em>, wenn er nicht senkrecht trifft. Jeder Entfernungsmesser hat ein
          Material, das ihn zum Lügen bringt.
        </p>

        <h2>Von einem Strahl zum Bild</h2>
        <p>
          Ein Entfernungsmesser liefert eine Zahl. Setz einen auf einen Drehturm, und du bekommst
          hunderte Zahlen pro Umdrehung — ein Grundriss, gezeichnet in Polarkoordinaten. Mehr ist
          ein <strong>Lidar</strong> nicht, und es ist der Sensor hinter jeder
          Saugroboter-Karte in Einheit 5. Behalte die bescheidene Formel im Kopf, wenn die Karten
          kommen: Jedes Pixel darin ist ein Stoppuhr-Klick.
        </p>

        <div className="callout note">
          <span className="co-title">Warum nicht einfach eine Kamera?</span>
          <p>
            Eine Kamera sieht alles und misst nichts: Ein einzelnes Bild enthält, für sich, keine
            Entfernung. Entfernungsmesser sind das Gegenteil — fast blind, aber jede Ablesung ist
            eine Messung. Echte Roboter tragen beides und lassen jeden die Frage beantworten, die
            er gut kann.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Echo-Kammer",
      intro: (
        <>
          <p>Ein Ultraschall-Kegel und ein Laserstrahl, denselben Korridor hinunter gerichtet, mit einem verschiebbaren Ziel, das du auch neu beziehen kannst.</p>
          <ul>
            <li>Verschiebe das Ziel und sieh beide Sensoren folgen — und die Rundreise des Pings in Millisekunden gegen Nanosekunden ticken.</li>
            <li>Schieb das Seitenhindernis in den Schallkegel: Der Ultraschallwert springt zum näheren Objekt, während der Laser ehrlich bleibt.</li>
            <li>Wechsle das Ziel von Sperrholz zu Vorhang, dann zu Glas — finde heraus, welches Material welchen Sensor blendet.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Ultraschallsensor hört sein Echo nach 12 ms (Schallgeschwindigkeit 343 m/s). Wie weit ist die Wand entfernt, in Metern?",
        answer: 2.06,
        unit: "m",
        tolerancePct: 3,
        hint: "d = v·t/2 — der Puls flog hin und zurück.",
        explain: "343 × 0,012 = 4,12 m Rundreise → 2,06 m Entfernung. Das vergessene ÷2 ist der klassische Erste-Woche-Bug.",
      },
      {
        prompt: "Ein Time-of-Flight-Sensor misst 20 ns Rundreise (Licht: 3×10⁸ m/s). Entfernung in Metern?",
        answer: 3,
        unit: "m",
        tolerancePct: 3,
        hint: "Gleiche Formel, viel schnellerer Bote.",
        explain: "3×10⁸ × 20×10⁻⁹ = 6 m Rundreise → 3 m. Nanosekunden sind der Grund, warum ToF Spezial-Silizium braucht.",
      },
    ],
    quiz: [
      {
        q: "Ein Entfernungsmesser misst 10 ms Rundreise. Warum durch zwei teilen?",
        choices: [
          "Sensoren werden in halben Sekunden kalibriert",
          "Um Rauschen herauszumitteln",
          "Weil die zweite Hälfte des Pulses schwächer ist",
          "Der Puls reiste zur Wand und zurück — die Entfernung ist die halbe Reise",
        ],
        answer: 3,
        explain: "Die Stoppuhr läuft für die ganze Hin-und-zurück-Reise. Die Wand sitzt am Halbzeitpunkt dessen, was der Puls flog.",
      },
      {
        q: "Ein Stuhlbein 40 cm seitlich der Ultraschall-Achse liest sich als Hindernis geradeaus, weil…",
        choices: [
          "der Zirp sich in einem breiten Kegel ausbreitet und der Sensor das nächste Echo von irgendwo darin meldet",
          "Schall um Ecken biegt",
          "der Sensor falsch kalibriert ist",
          "Stuhlbeine bei Ultraschallfrequenzen resonieren",
        ],
        answer: 0,
        explain:
          "Der Sensor kann nicht wissen, wo im Kegel das Echo herkam — er weiß nur „etwas, so nah“. Der Kegel ist der Preis des Schalls.",
      },
      {
        q: "Welches Ziel ist für einen Ultraschallmesser nahezu unsichtbar, für einen Laser aber kein Problem?",
        choices: ["Eine Ziegelwand", "Ein dicker Vorhang", "Eine Stahltür", "Ein Whiteboard"],
        answer: 1,
        explain:
          "Weiche, poröse Materialien schlucken Schall, statt ihn zurückzuwerfen. Licht reflektiert von Stoff genug zum Messen — jeder Sensor hat seinen eigenen blinden Fleck.",
      },
      {
        q: "Ein Lidar ist im Wesentlichen…",
        choices: [
          "eine Kamera mit Teleobjektiv",
          "eine Reihe von Ultraschallsensoren",
          "ein Time-of-Flight-Messer auf einem Drehturm, mit hunderten Messungen pro Umdrehung",
          "ein Radar auf Radiofrequenzen",
        ],
        answer: 2,
        explain:
          "Ein Stoppuhr-Klick pro Winkel, ein Grundriss pro Umdrehung. Jede Saugroboter-Karte ist dieser bescheidene Trick, schnell wiederholt.",
      },
    ],
  },

  /* ================================================================ */
  imu: {
    Theory: () => (
      <>
        <h2>Der Beschleunigungssensor: ehrlich, aber nervös</h2>
        <p>
          Ein Beschleunigungssensor fühlt Beschleunigungen — einschließlich der Schwerkraft, einer
          permanenten 9,81 m/s² nach unten. Neige den Sensor, und der Zug der Schwerkraft
          verteilt sich neu über seine Achsen; ein wenig Trigonometrie macht aus der Aufteilung
          einen Neigungswinkel. Die tiefe Tugend: Die Schwerkraft wandert nie, also ist die
          Vorstellung des Sensors von „unten“ <strong>driftfrei</strong>. Frag ihn zweimal im
          Abstand eines Jahres, und er antwortet gleich.
        </p>
        <p>
          Das Laster: Er kann Schwerkraft nicht von <em>anderen</em> Beschleunigungen
          unterscheiden. Jede Motorvibration, jeder Stoß, jeder Ruck des Chassis maskiert sich als
          momentanes neues „unten“. Das Signal ist im Mittel wahrhaftig und im Moment hysterisch —
          <strong> verrauscht, aber unverzerrt</strong>.
        </p>

        <h2>Das Gyroskop: geschmeidig, aber vergesslich</h2>
        <p>
          Ein Gyroskop misst die Dreh<em>rate</em> — Grad pro Sekunde — sauber und ruhig;
          Vibration berührt es kaum. Aber du willst den Winkel, nicht die Rate, also
          integrierst du: Rate × dt aufaddieren, Schleife um Schleife.
        </p>
        <div className="formula">
          Winkel ← Winkel + Rate · dt
          <span className="note">Integration — und mit ihr fährt jeder winzige Fehler für immer im Summenzug mit</span>
        </div>
        <p>
          Darin das Laster: Die Ratenmessung des Gyros liegt um irgendein Härchen daneben — ein
          Bruchteil eines Grads pro Sekunde. Integration vergisst kein Härchen. Halte den Sensor
          vollkommen still und sieh seinen berechneten Winkel mit stetiger Rate davonkriechen:{" "}
          <strong>Drift</strong>, das Signaturversagen der Koppelnavigation, geschmeidig,
          selbstsicher und zunehmend falsch.
        </p>

        <h2>Komplementäre Laster</h2>
        <p>
          Betrachte die beiden Fehlermoden nebeneinander. Der Beschleunigungssensor liegt{" "}
          <em>jetzt gerade</em> falsch, aber <em>im Mittel</em> richtig. Der Gyro liegt{" "}
          <em>jetzt gerade</em> richtig, aber <em>im Mittel</em> falsch. Ihre Schwächen wohnen an
          entgegengesetzten Enden der Zeitskala — schnelles Rauschen gegen langsame Drift — und
          das heißt: Jeder hat genau das, was dem anderen fehlt. Die Verschmelzung ist die
          nächste Lektion und vier Zeilen Code, und diese vier Zeilen halten Drohnen waagerecht.
        </p>

        <div className="callout note">
          <span className="co-title">Warum nicht einen besseren Gyro kaufen?</span>
          <p>
            Kannst du — für Navigations-Preisklassen schrumpft die Drift auf Grad pro{" "}
            <em>Stunde</em>. Null erreicht sie nie: Integration verstärkt jeden verbleibenden
            Fehler, wie klein auch immer, ohne Grenze. Drift ist kein Defekt billiger Teile; sie
            ist die Arithmetik des Aufaddierens. Die Kur ist nie ein reinerer Zeuge — sondern ein
            zweiter, anders fehlerhafter.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Drift-Bank",
      intro: (
        <>
          <p>Ein neigbares Brett, beide Zeugen melden seinen Winkel live — mit Knöpfen für Vibration und Gyro-Bias.</p>
          <ul>
            <li>Halte das Brett still: Die Beschleunigungssensor-Spur zittert um die Wahrheit, während die Gyro-Spur langsam von ihr weggleitet.</li>
            <li>Dreh die Vibration auf (Motoren an!): Der Beschleunigungssensor wird unlesbar; der Gyro merkt es kaum.</li>
            <li>Kippe das Brett ruckartig: Der Gyro folgt sofort, der Beschleunigungssensor gerät erst in Panik, beruhigt sich später. Zwei Zeugen, entgegengesetzte Alibis.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Die Ratenmessung eines Gyros hat einen konstanten Bias von 0,5°/s. Wie weit ist der berechnete Winkel nach 4 Minuten Integration gedriftet, in Grad?",
        answer: 120,
        unit: "°",
        tolerancePct: 2,
        hint: "Bias × Zeit — die Integration addiert ihn unerbittlich auf.",
        explain: "0,5 × 240 s = 120°. Ein Drittel einer vollen Drehung reine Fiktion, aus einem halben Grad pro Sekunde demutfreien Aufaddierens.",
      },
    ],
    quiz: [
      {
        q: "Wie misst ein Beschleunigungssensor die Neigung?",
        choices: [
          "Er integriert die Drehrate über die Zeit",
          "Der konstante Zug der Schwerkraft verteilt sich beim Neigen über seine Achsen, und die Aufteilung verrät den Winkel",
          "Er verfolgt den Horizont optisch",
          "Er misst Luftdruckunterschiede",
        ],
        answer: 1,
        explain:
          "Die Schwerkraft ist eine permanente 9,81-m/s²-Referenz nach unten. Neigen verteilt sie über die Achsen des Sensors um — den Rest erledigt Trigonometrie.",
      },
      {
        q: "Warum driftet ein Gyro-Winkel selbst dann, wenn der Sensor vollkommen still liegt?",
        choices: [
          "Temperaturänderungen verstimmen den Takt des Chips",
          "Die Erde dreht sich darunter weg",
          "Seine Ratenmessung trägt einen winzigen Bias, und die Integration häuft diesen Bias für immer an",
          "Vibration verwackelt die Messung",
        ],
        answer: 2,
        explain:
          "Winkel ← Winkel + Rate·dt vergisst keinen Fehler. Ein konstantes Härchen Bias wird zu einem stetig wachsenden Winkel aus Fiktion.",
      },
      {
        q: "Die Motoren gehen an und das Chassis brummt. Welcher Zeuge leidet?",
        choices: [
          "Der Beschleunigungssensor — jede Vibration maskiert sich als wechselnde Beschleunigung",
          "Der Gyro — Vibration integriert sich zu Drift",
          "Beide gleichermaßen",
          "Keiner; IMUs sind vibrationsfest",
        ],
        answer: 0,
        explain:
          "Der Beschleunigungssensor kann Schwerkraft nicht von anderen Beschleunigungen unterscheiden, und ein brummendes Chassis ist nichts als andere Beschleunigungen. Der Ratenkanal des Gyros bleibt ruhig.",
      },
      {
        q: "Die Schwächen der beiden Sensoren heißen komplementär, weil…",
        choices: [
          "sie in einem Chip verpackt sind",
          "beide von der Temperatur kommen",
          "jeder Fehler ab Werk wegkalibriert werden kann",
          "einer schnell versagt (Rauschen) und der andere langsam (Drift) — jeder ist genau dort stark, wo der andere schwach ist",
        ],
        answer: 3,
        explain:
          "Beschleunigungssensor: jetzt falsch, im Mittel richtig. Gyro: jetzt richtig, im Mittel falsch. Entgegengesetzte Enden der Zeitskala — genau das lässt die Verschmelzung der nächsten Lektion funktionieren.",
      },
    ],
  },

  /* ================================================================ */
  filters: {
    Theory: () => (
      <>
        <h2>Vertrauen nach Zeitskala verteilen</h2>
        <p>
          Die letzte Lektion endete mit zwei Zeugen, deren Schwächen an entgegengesetzten Enden
          der Uhr wohnen: Beschleunigungssensor falsch im Moment, Gyro falsch über die Minuten.
          Also verteile das Vertrauen nach Zeitskala — <strong>glaub dem Gyro bei Änderungen,
          glaub der Schwerkraft, wo zu Hause ist</strong>:
        </p>
        <div className="formula">
          Winkel = α · (Winkel + gyro·dt) + (1 − α) · accel_angle
          <span className="note">der Komplementärfilter — mit α ≈ 0,98, jeden Schleifentakt gerechnet</span>
        </div>
        <p>
          Lies es als Rezept: Schiebe die Schätzung mit dem Gyro voran (geschmeidig, sofort), und
          mische dann eine Prise — 2 % — der Meinung des Beschleunigungssensors dazu. Jeder Takt
          zieht diese Prise die Schätzung Richtung driftfreiem „unten“ der Schwerkraft. Rauschen,
          das jeden Takt frisch und anders eintrifft, wird mit 0,02 multipliziert und kann sich
          nie ansammeln. Drift, die die Summe zum Wachsen braucht, wird schneller abgelassen, als
          sie entsteht. Beide Laster behandelt — mit den Tugenden des jeweils anderen.
        </p>

        <h2>Alpha ist ein Zeitskalen-Regler</h2>
        <p>
          α legt fest, wo „schnell“ endet und „langsam“ beginnt. Bei α = 0,98 und einer
          100-Hz-Schleife regiert der Gyro Störungen kürzer als ein paar Sekunden; alles
          Stetigere gehört der Schwerkraft. Schieb α auf 0,999, und der Filter traut dem Gyro
          minutenlang — die Drift kriecht zurück. Senk α auf 0,5, und die Vibration flutet durch.
          Der richtige Wert ist eine Eigenschaft <em>deines</em> Roboters: wie brummig seine
          Motoren, wie faul sein Gyro.
        </p>

        <h2>Die Idee, nicht der Trick</h2>
        <p>
          Was du gerade gebaut hast, ist <strong>Sensorfusion</strong> — das allgemeine Handwerk,
          unterschiedlich fehlerhafte Messungen zu einer Schätzung zu verschmelzen, die besser ist
          als jede einzelne. Die berühmte erwachsene Version ist der{" "}
          <strong>Kalman-Filter</strong>, der dieselbe Mischung fährt, aber die
          Vertrauensverteilung jeden Takt daraus neu berechnet, wie unsicher jede Quelle gerade
          ist — α, selbstjustierend gemacht, mit Beweisen. Unter der Mathematik dieselbe Seele:
          schneller Zeuge für den Moment, stetiger Zeuge für die lange Strecke.
        </p>

        <div className="callout note">
          <span className="co-title">Vier Zeilen, ernstes Gesicht</span>
          <p>
            Der Komplementärfilter ist für seine Größe unverschämt wirksam, und Ingenieure
            schreiben ihn mit leicht schuldbewusstem Grinsen. Fang immer hier an. Steig auf
            Kalman um, wenn du das Versagen benennen kannst — nicht weil der feinere Filter
            besser sein muss, sondern weil du gemessen hast, warum der einfache nicht reicht.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Fusions-Tisch",
      intro: (
        <>
          <p>Wieder die Drift-Bank — aber jetzt mit dritter Spur: der fusionierten Schätzung, mit dem α-Knopf unter deinem Daumen.</p>
          <ul>
            <li>Setze α = 0,98: Die fusionierte Linie schmiegt sich durch Kippbewegungen an die Wahrheit, schüttelt Vibration ab und driftet nie. Genieße den Moment.</li>
            <li>Schiebe α auf 1,0 — du hast die Schwerkraft abgestöpselt. Sieh die Drift zurückkehren. Schiebe Richtung 0,5 — hallo, Vibration.</li>
            <li>Dreh die Vibration voll auf und finde das α, das sie am besten versteckt. Beachte: Du hast mit trägerer Reaktion bezahlt.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Im Komplementärfilter geht der (1 − α)-Anteil des Vertrauens an…",
        choices: [
          "den Winkel des Beschleunigungssensors, der die Schätzung zur driftfreien Schwerkraft zieht",
          "die Ratenmessung des Gyros",
          "die vorherige Schätzung",
          "den Schleifentimer",
        ],
        answer: 0,
        explain:
          "Der Gyro schiebt die Schätzung jeden Takt voran; die kleine (1−α)-Prise Beschleunigungssensor-Meinung ist es, die sie über Sekunden heimzieht.",
      },
      {
        q: "Warum häuft sich das Rauschen des Beschleunigungssensors nicht in der Schätzung an?",
        choices: [
          "Der Filter mittelt erst zehn Messungen",
          "Das Rauschen jedes Takts kommt mit dem kleinen (1 − α) multipliziert herein und ist jedes Mal frisch — es kommt nie zum Ansammeln",
          "Rauschen hebt Drift exakt auf",
          "Der Gyro subtrahiert es",
        ],
        answer: 1,
        explain:
          "Rauschen ist jeden Takt ein neuer Zufallsfehler; mit 0,02 skaliert bleiben seine Zitterer winzig und unkorreliert. Nur stetige Signale — wie die wahre Richtung der Schwerkraft — überleben die Mischung.",
      },
      {
        q: "Setze α = 1,0, und der Filter…",
        choices: [
          "reagiert doppelt so schnell",
          "gewichtet beide Sensoren gleich",
          "wird zu reiner Gyro-Integration — die Drift von vor zwei Lektionen kehrt zurück",
          "hört auf zu aktualisieren",
        ],
        answer: 2,
        explain: "α = 1 entfernt die Schwerkraft-Korrektur vollständig. Du bist zurück bei Winkel ← Winkel + Rate·dt, driftend mit ernstem Gesicht.",
      },
      {
        q: "Das wesentliche Upgrade des Kalman-Filters gegenüber dem Komplementärfilter ist, dass er…",
        choices: [
          "bessere Sensoren verwendet",
          "auf einem schnelleren Prozessor läuft",
          "Rauschen vollständig eliminiert",
          "die Vertrauensverteilung jeden Takt aus der aktuellen Unsicherheit jeder Quelle neu berechnet, statt ein festes α zu nutzen",
        ],
        answer: 3,
        explain:
          "Dieselbe Seele — ein schneller Zeuge gemischt mit einem stetigen — aber das Mischverhältnis wird selbstjustierend, mit der Mathematik dazu.",
      },
    ],
  },
};
