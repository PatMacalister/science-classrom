import type { LessonContentDe } from "../localize";

export const unit5De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  odometry: {
    Theory: () => (
      <>
        <h2>Koppelnavigation auf zwei Rädern</h2>
        <p>
          Ein Differenzialantrieb-Roboter — zwei angetriebene Räder, ein Stützrad — kennt seine
          Radumdrehungen dank Encodern auf den Bruchteil eines Grads. Multipliziere Ticks mit dem
          Radumfang: gefahrene Strecke pro Rad. Aus dem Paar folgt alles:
        </p>
        <div className="formula">
          Strecke = (d_L + d_R) / 2 · Drehung = (d_R − d_L) / track
          <span className="note">der Mittelwert schiebt dich vorwärts; die Differenz dreht dich — „track“ ist der Abstand zwischen den Rädern</span>
        </div>
        <p>
          Richtung aktualisieren, Position entlang ihr vorschieben, jeden Schleifentakt
          wiederholen — und der Roboter trägt eine live (x, y, θ)-Schätzung, komplett aus dem
          eigenen Schrittezählen berechnet. Das ist <strong>Odometrie</strong>, das
          navigatorische Geschwister der Gyro-Integration — und sie erbt den Familienfluch.
        </p>

        <h2>Die Fäulnis</h2>
        <p>
          Räder lügen ein bisschen: Sie rutschen auf Staub, quetschen sich unter Last und haben
          nie exakt den Datenblatt-Durchmesser. Jede Lüge ist winzig; die Integration behält sie
          alle. Streckenfehler wachsen stetig — aber die <strong>Richtungsfehler</strong> sind
          die Killer, denn ein Richtungsfehler verdreht jeden folgenden Meter: Fahre zehn Meter
          mit einer Ein-Grad-Richtungslüge, und du kommst 17 cm seitlich deiner Schätzung an.
          Nach drei Runden durchs Zimmer behauptet die Odometrie, du stündest im Flur.
        </p>
        <p>
          Das Versagensmuster verdient seinen Namen: <strong>lokal exzellent, global
          verrottet</strong>. Über eine Sekunde ist Odometrie der beste Sensor, den du
          besitzt — glatt, schnell, millimeterfein. Über ein Gebäude ist sie Fiktion. Der
          Komplementärfilter-Instinkt aus Einheit 2 sollte jetzt kribbeln: Es braucht einen
          driftfreien, langsameren Zeugen als Anker. Dieser Zeuge ist die Karte der nächsten
          Lektion.
        </p>

        <h2>Kalibrierung kauft Zeit</h2>
        <p>
          Bevor du Drift mit Fusion bekämpfst, schrumpfe sie an der Quelle: Fahre eine
          ausgemessene Gerade und skaliere den Raddurchmesser, bis gemeldet und real
          übereinstimmen; drehe zehn volle Runden auf der Stelle und trimme die Spurweite, bis
          die Richtung stimmt. In der Literatur heißt das <strong>UMBmark</strong>: ein
          Nachmittag Arbeit, der die Drift um ein Mehrfaches senkt — und die Fäulnis trotzdem nur
          aufschiebt. Die Integration gewinnt am Ende immer.
        </p>

        <div className="callout note">
          <span className="co-title">Das älteste Gewerbe der Navigation</span>
          <p>
            Seeleute nannten es Koppeln: Log-Tempo × Zeit auf Kompasskurs, und ein wachsender
            Zweifelskreis um die Bleistiftposition — bis ein Leuchtturm sie an der Wahrheit
            festmachte. Ersetze Leuchtturm durch Lidar, und du hast die verbleibenden zwei
            Lektionen von Einheit 5.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Zweifelskreis",
      intro: (
        <>
          <p>Fahre einen Roboter über einen markierten Kurs. Geisterroboter: wo die Odometrie ihn glaubt. Schieber für Radschlupf und Kalibrierfehler.</p>
          <ul>
            <li>Fahre eine Runde mit perfekten Rädern: Geist und Roboter tanzen als einer. Gib nun 2 % Schlupf dazu und sieh sie sich trennen — langsam, dann nicht mehr langsam.</li>
            <li>Füge eine kleine Spurweiten-Fehlkalibrierung hinzu und drehe ein paarmal auf der Stelle: Richtungsfäulnis schlägt Streckenfäulnis, jedes Mal.</li>
            <li>Beobachte den Zweifelskreis mit der Fahrstrecke wachsen. Er schrumpft nie — nichts in der Odometrie kann ent-lügen.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Die Räder eines Roboters (Umfang 20 cm) drehen: links 12,0 Umdrehungen, rechts 12,0 Umdrehungen. Wie weit ist er gefahren, in Metern?",
        answer: 2.4,
        unit: "m",
        tolerancePct: 2,
        hint: "Gleiche Räder: Gerade. Umdrehungen × Umfang.",
        explain: "12 × 0,2 m = 2,4 m pro Rad, Mittelwert 2,4 m. Die Differenz ist null, also hat sich die Richtung nie geändert.",
      },
      {
        prompt:
          "Ein Roboter fährt 8 m mit einem unbemerkten Richtungsfehler von 2°. Wie weit seitlich seiner Schätzung kommt er an, in cm? (Versatz ≈ d · sin θ)",
        answer: 27.9,
        unit: "cm",
        tolerancePct: 5,
        hint: "8 · sin 2°, in Metern, dann umrechnen.",
        explain: "8 × 0,0349 ≈ 0,279 m ≈ 28 cm — aus zwei Grad. Richtungsfehler skalieren mit jedem folgenden Meter; darum dominieren sie die Fäulnis.",
      },
    ],
    quiz: [
      {
        q: "In der Differenzialantrieb-Odometrie dreht der Roboter, wenn…",
        choices: [
          "das Stützrad lenkt",
          "beide Encoder zusammen schneller werden",
          "die beiden Räder verschiedene Strecken zurücklegen — die Differenz geteilt durch die Spurweite ist die Drehung",
          "der Gyro es befiehlt",
        ],
        answer: 2,
        explain:
          "Der Mittelwert der Räder schiebt dich vorwärts; die Differenz dreht dich. Zwei Encoderzählungen enthalten die ganze Bewegung.",
      },
      {
        q: "Warum schaden Richtungsfehler der Odometrie so viel mehr als Streckenfehler?",
        choices: [
          "Encoder messen die Richtung ungenauer",
          "Ein Richtungsfehler verdreht jeden folgenden Meter — der Positionsfehler wächst mit aller verbleibenden Fahrt",
          "Die Richtung wird mit weniger Dezimalstellen gespeichert",
          "Tun sie nicht; beide schaden gleich",
        ],
        answer: 1,
        explain:
          "Eine 1°-Lüge kostet ~1,7 cm seitlich pro gefahrenem Meter, für immer danach. Streckenlügen bleiben stehen; Richtungslügen verzinsen sich.",
      },
      {
        q: "„Lokal exzellent, global verrottet“ heißt: Odometrie ist…",
        choices: [
          "drinnen genau, draußen nicht",
          "gut im Drehen, schlecht auf Geraden",
          "nur bei niedrigem Tempo verlässlich",
          "die beste Kurzzeit-Bewegungsschätzung, die du besitzt — und über ein Gebäude Fiktion",
        ],
        answer: 3,
        explain:
          "Über eine Sekunde: glatt, schnell, millimeterfein. Über ein Gebäude: die aufsummierte Summe jeder winzigen Lüge. Genau diese Spaltung macht sie zum perfekten Fusionspartner für einen langsameren, driftfreien Sensor.",
      },
      {
        q: "Raddurchmesser und Spurweite zu kalibrieren (nach UMBmark-Art)…",
        choices: [
          "senkt die Driftrate um ein Mehrfaches, kann aber nicht verhindern, dass die Integration den Rest anhäuft",
          "beseitigt Odometrie-Drift dauerhaft",
          "hilft nur auf Teppich",
          "ersetzt die Encoder",
        ],
        answer: 0,
        explain:
          "Kalibrierung entfernt den systematischen Teil der Lüge. Der zufällige Teil — Schlupf, Staub, Last — integriert sich weiter. Aufschub, keine Heilung.",
      },
    ],
  },

  /* ================================================================ */
  mapping: {
    Theory: () => (
      <>
        <h2>Das Belegungsgitter</h2>
        <p>
          Die Karte eines Roboters ist bezaubernd bescheiden: Rastere den Boden in Zellen (sagen
          wir 5-cm-Quadrate) und speichere in jeder eine einzige Zahl — die Wahrscheinlichkeit,
          dass dort etwas Festes steht. Grau für <em>unbekannt</em>, gleitend Richtung Weiß für{" "}
          <em>frei</em> und Schwarz für <em>belegt</em>. Dieses <strong>Belegungsgitter</strong>{" "}
          ist das Arbeitsgedächtnis hinter fast jedem Indoor-Roboter, dem du begegnet bist.
        </p>
        <p>
          Jeder Lidar-Strahl ist zwei Beweisstücke in einem: Die Zelle, in der er endete, enthält
          etwas (stimme sie dunkler) — und jede Zelle auf dem Weg dorthin muss leer gewesen sein,
          sonst hätte der Strahl früher gestoppt (stimme sie alle heller). Strahlen landen zu
          Hunderten pro Umdrehung; Stimmen häufen sich; der Grundriss taucht aus dem Grau auf wie
          ein sich entwickelndes Foto.
        </p>
        <div className="formula">
          Trefferzelle → mehr belegt · Strahlweg → mehr frei
          <span className="note">das inverse Sensormodell — jede Stimme ist ein Stups, nie ein Urteil, damit ein verrauschter Strahl keine Phantomwand malt</span>
        </div>

        <h2>Die Karte ist nur so gut wie das „Wo“</h2>
        <p>
          Um einen Strahl ins Gitter zu stempeln, musst du wissen, <em>von wo</em> er abgefeuert
          wurde — und diese Pose kommt aus der Odometrie, die verrottet. Kartiere mit verrotteter
          Odometrie, und die Fäulnis wird zu Architektur: Nach einer Runde ums Gebäude trifft das
          Ende des Korridors seinen Anfang nicht mehr; Wände verschmieren zu Doppelbildern. Eine
          verschmierte Karte ist fast nie ein Lidar-Problem — sie ist ein <em>Posen</em>-Problem
          in den Kleidern der Karte.
        </p>

        <h2>SLAM, in einem ehrlichen Absatz</h2>
        <p>
          Die Lösung muss einen Kreis durchbrechen: Eine gute Karte würde die Pose korrigieren
          (gleiche diesen Scan mit den gezeichneten Wänden ab — <em>Lokalisierung</em>), aber
          eine gute Pose braucht es, um die Wände zu zeichnen. Beides zugleich zu tun ist{" "}
          <strong>SLAM</strong> — simultane Lokalisierung und Kartierung. Der emotionale Kern ist
          der <strong>Schleifenschluss</strong>: Der Roboter erkennt einen schon gesehenen Ort
          wieder, und die angesammelte Drift schnappt hörbar auf null, während die ganze Karte in
          Konsistenz entspannt. Die Odometrie flüstert, die Karte korrigiert — das
          Zwei-Zeugen-Muster aus Einheit 2, in Gebäudegröße.
        </p>

        <div className="callout note">
          <span className="co-title">Warum Saugroboter so seltsam fahren</span>
          <p>
            Die wandschmiegende erste Runde ist Absicht: Wände sind die reichste, geradeste
            Lidar-Evidenz, und ein früher Schleifenschluss kauft ein driftfreies Skelett für
            alles danach. Der seltsame Tanz ist der Algorithmus, sichtbar geworden.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die entwickelnde Karte",
      intro: (
        <>
          <p>Steuere einen Lidar-Roboter durch eine unbekannte Wohnung (Pfeile oder Buttons). Das Gitter entwickelt sich live; ein Drift-Schieber verdirbt die Pose.</p>
          <ul>
            <li>Null Drift: Fahre die Wohnung ab und sieh einen gestochenen Grundriss entstehen — Treffer schwärzen Wände, Strahlwege bleichen Böden. Beachte die grauen Schatten hinter Hindernissen.</li>
            <li>Gib nun Drift dazu und kartiere neu: Wände doppeln sich, Korridore biegen sich. Das Lidar hat nie gelogen — das „Wo“ tat es.</li>
            <li>Vollende eine ganze Runde und vergleiche, wo die Korridorenden der Karte sich treffen. Dieser Versatz ist es, den der Schleifenschluss zuschnappen lässt.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Jede Zelle eines Belegungsgitters speichert…",
        choices: [
          "die Farbe des Bodens",
          "wie oft der Roboter sie besucht hat",
          "die Entfernung zur nächsten Wand",
          "die Wahrscheinlichkeit, dass die Zelle etwas Festes enthält",
        ],
        answer: 3,
        explain:
          "Grau unbekannt, weiß frei, schwarz belegt — und jeder Zustand dazwischen, denn Evidenz kommt als Stupse, nicht als Urteile.",
      },
      {
        q: "Ein einzelner Lidar-Strahl, der bei 3 m eine Wand trifft, liefert Evidenz über…",
        choices: [
          "die Trefferzelle (mehr belegt) und jede Zelle entlang seines Weges (mehr frei)",
          "nur die getroffene Zelle",
          "den ganzen Raum",
          "nur die eigene Zelle des Roboters",
        ],
        answer: 0,
        explain:
          "Der Strahl kam 3 m weit, also war alles Nähere auf seiner Linie leer — sonst hätte er dort gestoppt. Ein Strahl, eine ganze Linie von Stimmen.",
      },
      {
        q: "Deine fertige Karte zeigt gedoppelte Wände und einen verbogenen Korridor. Der wahrscheinlichste Täter ist…",
        choices: [
          "eine schmutzige Lidar-Linse",
          "Posen-Drift — Strahlen wurden von falschen Positionen aus ins Gitter gestempelt",
          "ein zu grobes Gitter",
          "Sonnenlicht-Störung",
        ],
        answer: 1,
        explain:
          "Verschmieren ist die Signatur des Kartierens mit verrotteter Odometrie: korrekte Entfernungen, gestempelt von fiktiven Posen. Ein Posen-Problem in den Kleidern der Karte.",
      },
      {
        q: "Ein Schleifenschluss ist der Moment, in dem…",
        choices: [
          "der Roboter zu seiner Ladestation zurückkehrt",
          "die Kartendatei gespeichert wird",
          "der Roboter einen zuvor gesehenen Ort wiedererkennt und die angesammelte Drift über die ganze Karte korrigiert wird",
          "dem Gitter die unbekannten Zellen ausgehen",
        ],
        answer: 2,
        explain:
          "Wiedererkennen heftet die Gegenwart an die Vergangenheit; die Karte entspannt in Konsistenz, und der seit dem letzten Besuch angesammelte Zweifel kollabiert. SLAMs emotionaler Kern.",
      },
    ],
  },

  /* ================================================================ */
  "path-planning": {
    Theory: () => (
      <>
        <h2>Die Karte wird zum Graphen</h2>
        <p>
          Ein Belegungsgitter ist heimlich ein Graph: jede freie Zelle ein Knoten, jeder
          Nachbarschritt eine Kante. Eine Route zu finden ist dann Lehrbuch-Suche. Die
          einfachste — Dijkstras Methode — lässt eine Front vom Start nach außen wachsen wie
          Wellen im Teich, immer die günstigste bekannte Zelle expandierend, bis eine Welle das
          Ziel berührt. Lauf die Brotkrumen rückwärts: kürzester Pfad, garantiert.
        </p>
        <p>
          Die Wellen sind gründlich und verschwenderisch — sie erkunden vom Ziel weg so eifrig
          wie darauf zu. <strong>A*</strong> („A-Stern“) fügt eine Zahl hinzu: Jede Frontzelle
          wird nicht nur nach Bisher-Kosten gereiht, sondern nach
        </p>
        <div className="formula">
          f = g + h
          <span className="note">g: Kosten seit dem Start · h: Luftlinien-Schätzung zum Ziel — Optimismus als Kompass</span>
        </div>
        <p>
          Die Schätzung h lenkt die Wellen Richtung Ziel und kollabiert die Suche zu einem
          Korridor entlang der vielversprechenden Richtung. Die Garantie überlebt unter einer
          Bedingung: h darf nie <em>überschätzen</em> (die Luftlinie tut es nie — eine Gerade
          ist nicht zu schlagen). Optimistische Schätzungen halten die Antwort perfekt; sie
          ändern nur, wie viel Arbeit das Finden kostet.
        </p>

        <h2>Aufblähen: Planen für einen Roboter mit Körper</h2>
        <p>
          Rohes A* behandelt den Roboter als Punkt und produziert Pfade, die Ecken um null
          Millimeter verfehlen — geometrisch perfekt, physisch ein Kratzgeräusch. Die
          Standard-Kur ist ehrlich und stumpf: <strong>Blähe</strong> jedes Hindernis um den
          Radius des Roboters auf, bevor du planst. Die Punkt-Pfade der gemästeten Karte sind
          exakt die sicheren Pfade des echten Roboters. Leg noch ein weiches „Kostenpolster“
          darüber — Zellen nahe Wänden legal, aber teurer — und Pfade bekommen den höflichen
          Wandabstand eines guten Fahrers, mittig durch Korridore, ohne dass es jemand sagen
          muss.
        </p>

        <h2>Pläne treffen Wirklichkeit</h2>
        <p>
          Die Welt bewegt sich — eine Tür geht zu, eine Katze setzt sich in den Flur. Echte
          Navigations-Stacks fahren darum zwei Planer: einen <strong>globalen</strong> (diese
          Lektion), der die ganze Route auf der Karte zeichnet, und einen schnellen{" "}
          <strong>lokalen</strong>, der ausweicht, was das Lidar <em>jetzt gerade</em> sieht,
          mehrmals pro Sekunde neu planend. Der globale Plan ist die Absicht; der lokale Planer
          sind die Reflexe. Und wenn die Katze doch gewinnt, bleibt dem Stack der ehrenhafte
          Rückzug: zurücksetzen, neu planen, nochmal versuchen — das Navigations-Pendant zur
          Schleife aus Einheit 3, auf Reisegröße.
        </p>

        <div className="callout note">
          <span className="co-title">Dieselbe Suche, andere Kostüme</span>
          <p>
            A* ist kein Roboter-Algorithmus — es ist <em>der</em> Algorithmus für
            Günstigste-Route-Probleme. Dein Navi fährt ihn über Straßengraphen, Spielfiguren über
            begehbare Netze. Der Beitrag der Robotik ist der Aufbläh-Trick: einer reinen
            Punkt-Mathematik beizubringen, einen Körper zu respektieren.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Routentisch",
      intro: (
        <>
          <p>Eine Gitterwelt mit Wänden. Setze Start und Ziel, sieh die Front wellen, dann den Pfad erscheinen. Umschalter für A* gegen Dijkstra; ein Schieber fürs Aufblähen.</p>
          <ul>
            <li>Fahre Dijkstra und zähle die erkundeten Zellen; wechsle zu A* und zähle erneut. Gleicher Pfad, ein Bruchteil des Teichs.</li>
            <li>Setze das Aufblähen auf null und studiere, wie der Pfad jede Ecke küsst. Erhöhe auf den Roboterradius und sieh Türen, durch die er nicht mehr passt.</li>
            <li>Zeichne eine Wand über den gefundenen Pfad und plane neu — und finde den Aufblähwert, bei dem die einzige Tür ganz zugeht.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "A*s Vorteil gegenüber Dijkstras schlichten Wellen kommt von…",
        choices: [
          "der parallelen Erkundung mehrerer Pfade",
          "einer optimistischen Luftlinien-Schätzung, die die Suche zum Ziel lenkt",
          "dem Überspringen wandnaher Zellen",
          "einem feineren Gitter",
        ],
        answer: 1,
        explain:
          "f = g + h: Kosten bisher plus eine nie überschätzende Rest-Schätzung. Die Schätzung macht aus einem Teich der Erkundung einen aufs Ziel gerichteten Korridor.",
      },
      {
        q: "Warum darf A*s Heuristik h die wahren Restkosten nie überschätzen?",
        choices: [
          "Sie würde die Suche verlangsamen",
          "Sie würde die Front zu groß machen",
          "Eine Überschätzung kann A* den wirklich kürzesten Pfad verwerfen lassen und einen schlechteren liefern",
          "Sie würde den g-Term doppelt zählen",
        ],
        answer: 2,
        explain:
          "Optimismus ist sicher: Der wahre Pfad sieht immer mindestens so gut aus wie versprochen. Pessimismus kann die beste Route hinter einer aufgeblasenen Schätzung verstecken — die Garantie stirbt.",
      },
      {
        q: "Hindernis-Aufblähen existiert, weil…",
        choices: [
          "Lidar Entfernungen überschätzt",
          "es die Suche beschleunigt",
          "Gitter Wände ungenau speichern",
          "der Planer einen Punkt navigiert, und Wände um den Roboterradius zu mästen macht Punkt-Pfade physisch fahrbar",
        ],
        answer: 3,
        explain:
          "Ein Punkt-Pfad, der eine Wand um 0 mm verfehlt, ist für alles mit Körper eine Kollision. Blähe die Karte um den Radius auf, und Geometrie und Realität einigen sich wieder.",
      },
      {
        q: "Navigations-Stacks paaren einen globalen Planer mit einem lokalen, weil…",
        choices: [
          "der globale Plan die Absicht ist und der lokale Planer ausweicht, was die Sensoren jetzt gerade sehen",
          "einer vorwärts plant und einer rückwärts",
          "Gitter zu groß für einen Planer sind",
          "der lokale Planer die Mathematik des globalen nachprüft",
        ],
        answer: 0,
        explain:
          "Die Karte kann nichts von der zugefallenen Tür oder der Katze wissen. Route auf der Karte, Reflexe auf dem Lidar, mehrmals pro Sekunde neu geplant.",
      },
    ],
  },
};
