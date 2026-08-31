import type { LessonContentDe } from "../localize";

export const unit1De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  photosynthesis: {
    Theory: () => (
      <>
        <h2>Woher dein Essen kommt</h2>
        <p>
          Ein Baum wächst nicht aus dem Boden. Wiege die Erde in einem Topf vor und nach dem
          Heranziehen eines Schösslings, und du wirst sie kaum verändert finden — van Helmont hat
          im 17. Jahrhundert ungefähr dieses Experiment gemacht und war ratlos. Fast die gesamte
          hinzugekommene Masse stammte aus <strong>Kohlenstoffdioxid der Luft</strong> und aus
          Wasser. Ein Holzscheit ist, in einem sehr realen Sinn, verfestigte Luft.
        </p>
        <p>
          Die Reaktion dahinter ist die <strong>Fotosynthese</strong>: Lichtenergie fügt CO₂ und
          Wasser zu Glucose zusammen und setzt dabei Sauerstoff als Abfall frei.
        </p>
        <div className="formula">
          6 CO₂ + 6 H₂O + Licht → C₆H₁₂O₆ + 6 O₂
          <span className="note">Kohlenstoffdioxid + Wasser + Licht → Glucose + Sauerstoff</span>
        </div>
        <p>
          Zwei Dinge an dieser Gleichung verdienen mehr Aufmerksamkeit, als sie meist bekommen.
          Erstens: Der Sauerstoff ist <em>Abfall</em> — ein Nebenprodukt, das die Pflanze nicht
          will und das zufällig das ist, was der Rest von uns atmet. Jedes Sauerstoffmolekül der
          Atmosphäre wurde von etwas Fotosynthetischem ausgeatmet. Zweitens: Die Reaktion läuft
          energetisch bergauf — sie speichert Energie, statt sie freizusetzen. Genau das macht
          Glucose zum lohnenden Essen.
        </p>

        <h2>Wo es passiert</h2>
        <p>
          Im <strong>Chloroplasten</strong>, mit dem grünen Farbstoff <strong>Chlorophyll</strong>.
          Chlorophyll absorbiert rotes und blaues Licht stark und reflektiert grünes — das ist der
          ganze Grund, warum Pflanzen für dich grün aussehen. Blätter strahlen genau den Teil des
          Spektrums zurück, den sie nicht verwenden wollten.
        </p>
        <p>Der Prozess läuft in zwei Stufen:</p>
        <ul>
          <li>
            <strong>Die Lichtreaktionen</strong>, in den gestapelten Membranen. Licht spaltet
            Wasser, setzt O₂ frei und lädt Energie auf Trägermoleküle.
          </li>
          <li>
            <strong>Der Calvin-Zyklus</strong>, in der Flüssigkeit drumherum. Diese Energie wird
            ausgegeben, um CO₂ in Zucker einzubauen. Er braucht kein Licht direkt, nur die geladenen
            Träger aus der ersten Stufe — weshalb der Name „Dunkelreaktion“ ein Missverständnis
            ist, das man besser vermeidet.
          </li>
        </ul>

        <h2>Begrenzende Faktoren</h2>
        <p>
          Fotosynthese braucht Licht, CO₂ und eine brauchbare Temperatur. Und hier kommt die Regel,
          auf die es ankommt — eine der übertragbarsten Ideen der ganzen Biologie:{" "}
          <strong>Die Rate wird von der knappsten Zutat bestimmt.</strong> Alles andere ist im
          Überschuss, und es zu erhöhen ändert nichts.
        </p>
        <p>
          Stell eine Pflanze in schwaches Licht, und das Verdoppeln des CO₂ bewirkt gar nichts —
          Licht ist der <strong>begrenzende Faktor</strong>. Dreh das Licht auf, und die Rate
          steigt, bis CO₂ oder Temperatur zur neuen Decke wird. Es ist exakt die Logik des
          limitierenden Edukts aus Catalyst, und kommerzielle Gewächshäuser leben davon: Sie pumpen
          CO₂ auf etwa das Dreifache des Atmosphärenwerts, denn sobald Licht und Wärme stimmen, ist
          CO₂ das, was die Ernte noch zurückhält.
        </p>
        <p>
          Die Temperatur verhält sich anders als die anderen beiden, und der Grund ist die letzte
          Lektion: Der Calvin-Zyklus wird von Enzymen betrieben. Wärme beschleunigt ihn bis zu
          einem Optimum — und <em>denaturiert</em> sie dann. Licht und CO₂ flachen bloß ab; die
          Temperatur hat eine Klippe.
        </p>

        <div className="callout note">
          <span className="co-title">Die Große Sauerstoffkatastrophe</span>
          <p>
            In den ersten zwei Milliarden Jahren gab es praktisch keinen freien Sauerstoff auf der
            Erde. Dann füllten fotosynthetische Bakterien die Atmosphäre mit ihrem Abfall — und für
            das anaerobe Leben jener Zeit war Sauerstoff ein Gift. Es war vermutlich das größte
            Massenaussterben der Geschichte, verursacht durch Umweltverschmutzung, von Organismen,
            die es nicht wissen konnten. Es machte außerdem die aerobe Atmung möglich — und damit
            dich.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Begrenzende-Faktoren-Bank",
      intro: (
        <>
          <p>Wasserpest im Becherglas. Die Sauerstoffblasen zeigen dir die Rate.</p>
          <ul>
            <li>Senk das Licht auf 10 % und dreh dann CO₂ voll auf. Nichts passiert — das Licht ist die Decke.</li>
            <li>Erhöhe nun das Licht. In dem Moment, in dem CO₂ zur knappsten Zutat wird, springt der Balken um.</li>
            <li>Treib die Temperatur über 40 °C. Anders als die anderen beiden flacht sie nicht ab — sie bricht ein.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Woher stammt der Großteil der Masse eines wachsenden Baums?",
        choices: ["Aus dem Boden", "Aus dem Kohlenstoffdioxid der Luft", "Nur aus Wasser", "Aus Dünger"],
        answer: 1,
        explain:
          "Aus Kohlenstoff, der aus dem CO₂ der Atmosphäre fixiert wird, plus Wasser. Die Erde ändert ihre Masse kaum — ein Holzscheit ist fast verfestigte Luft.",
      },
      {
        q: "Warum sehen Blätter grün aus?",
        choices: [
          "Chlorophyll absorbiert grünes Licht am stärksten",
          "Chlorophyll reflektiert grünes Licht und absorbiert rotes und blaues",
          "Grün ist die Farbe von Glucose",
          "Die Zellwand ist grün",
        ],
        answer: 1,
        explain:
          "Du siehst das Licht, das die Pflanze verschmäht hat. Chlorophyll nutzt Rot und Blau und wirft Grün geradewegs zu dir zurück.",
      },
      {
        q: "Eine Pflanze in schwachem Licht bekommt dreimal so viel CO₂. Was passiert mit der Rate?",
        choices: [
          "Sie verdreifacht sich",
          "Sie steigt leicht",
          "Sie ändert sich nicht — das Licht ist der begrenzende Faktor",
          "Sie fällt",
        ],
        answer: 2,
        explain:
          "Nur die knappste Zutat bestimmt die Rate. Mehr von etwas, das ohnehin im Überschuss ist, bringt nichts, solange die wahre Decke nicht angehoben wird.",
      },
      {
        q: "Der bei der Fotosynthese freigesetzte Sauerstoff ist…",
        choices: [
          "Der Zweck der Reaktion",
          "Nur nachts produziert",
          "Vom Calvin-Zyklus wieder aufgenommen",
          "Ein Abfallprodukt — das zufällig das ist, was wir atmen",
        ],
        answer: 3,
        explain:
          "Er stammt aus der Wasserspaltung und wird schlicht entsorgt. Jedes O₂-Molekül der Atmosphäre ist fotosynthetischer Abfall.",
      },
      {
        q: "Warum bricht die Rate oberhalb von etwa 40 °C ein, statt bloß abzuflachen?",
        choices: [
          "Das Licht funktioniert nicht mehr",
          "CO₂ entweicht schneller",
          "Die Enzyme des Calvin-Zyklus denaturieren und verlieren ihre Form",
          "Chlorophyll wechselt die Farbe",
        ],
        answer: 2,
        explain:
          "Temperatur wirkt über Enzyme. Jenseits des Optimums entfalten sie sich — die Reaktion flacht nicht ab, sie stürzt von einer Klippe.",
      },
    ],
  },

  /* ================================================================ */
  respiration: {
    Theory: () => (
      <>
        <h2>ATP: das Kleingeld der Zelle</h2>
        <p>
          Zellen geben Glucose nicht direkt aus, so wenig wie du deinen Kaffee mit einem
          Goldbarren bezahlst. Glucose ist Großspeicher; die Arbeitswährung ist{" "}
          <strong>ATP</strong> (Adenosintriphosphat). Das Abknipsen seines dritten Phosphats setzt
          ein brauchbares Energiepaket frei und hinterlässt ADP, das wieder aufgeladen und erneut
          benutzt wird.
        </p>
        <p>
          Der Umsatz ist außergewöhnlich. Du hältst in jedem Moment nur etwa 250 g ATP — und setzt
          täglich ungefähr dein eigenes Körpergewicht davon um. ATP ist keine Batterie, die man
          füllt; es ist eine Eimerkette, die nie stillsteht.
        </p>

        <h2>Die Reaktion, rückwärts</h2>
        <p>
          <strong>Zellatmung</strong> ist Fotosynthese rückwärts — und sie läuft in{" "}
          <em>jeder</em> lebenden Zelle, Pflanzen eingeschlossen. Pflanzen betreiben Fotosynthese
          im Licht und atmen rund um die Uhr.
        </p>
        <div className="formula">
          C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + ATP
          <span className="note">Glucose + Sauerstoff → Kohlenstoffdioxid + Wasser + nutzbare Energie</span>
        </div>
        <p>
          Das ist Verbrennung — sorgfältig ausgeführt. Zucker in einer Flamme setzt dieselbe
          Energie in einem nutzlosen Schwall frei; die Zelle holt sie über eine Treppe kleiner
          Schritte heraus, jeder von einem Enzym katalysiert, und fängt unterwegs Energie als ATP
          ein, statt alles als Wärme zu verlieren. Dass du warm bist und nicht in Flammen stehst,
          ist reine Frage des Tempos.
        </p>
        <p>
          Beachte die Symmetrie zur letzten Lektion: Was die Fotosynthese herstellt, verbraucht
          die Atmung — und umgekehrt. Zusammen bilden sie einen Kreislauf durch die ganze
          Biosphäre.
        </p>

        <h2>Mit Sauerstoff — und ohne</h2>
        <p>
          <strong>Aerobe Atmung</strong> — mit Sauerstoff, größtenteils in den Mitochondrien —
          holt etwa <strong>30 ATP pro Glucose</strong> heraus. Sauerstoffs Job ist es, am Ende der
          Kette zu sitzen und verbrauchte Elektronen aufzunehmen; ohne ihn staut sich die ganze
          Linie und steht still.
        </p>
        <p>
          <strong>Anaerobe Atmung</strong> — ohne Sauerstoff — schafft nur die erste Stufe, die
          Glykolyse, im Zytoplasma. Ausbeute: <strong>2 ATP pro Glucose</strong>. Rund ein
          Fünfzehntel aus demselben Zucker, denn der Großteil der Energie steckt noch im halb
          zerlegten Molekül.
        </p>
        <p>Was aus diesem Restmolekül wird, hängt vom Organismus ab:</p>
        <ul>
          <li>
            <strong>Deine Muskeln</strong> machen <strong>Milchsäure</strong>. Sie erlaubt dir,
            schneller zu sprinten, als deine Lunge liefern kann — und die Sauerstoffschuld zahlst
            du danach zurück, weshalb du nach dem Stehenbleiben weiterkeuchst.
          </li>
          <li>
            <strong>Hefe</strong> macht <strong>Ethanol und CO₂</strong>. Das ist die Gärung: Das
            CO₂ treibt Brot, das Ethanol macht Bier — derselbe Organismus erledigt beides. Das
            Abschlussprojekt von Einheit 6 misst genau das, mit einem Ballon.
          </li>
        </ul>

        <div className="callout tip">
          <span className="co-title">Warum Training brennt</span>
          <p>
            Das Brennen bei harter Anstrengung ist nicht die Milchsäure, die sich „ansammelt“, wie
            die Fitnessstudio-Folklore behauptet — Lactat ist binnen einer Stunde abgebaut und
            selbst ein brauchbarer Brennstoff. Das Brennen ist die Säure, die mit ihm kommt, und
            der Muskelkater zwei Tage später ist mikroskopischer Muskelschaden — etwas völlig
            anderes.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Aerob gegen anaerob",
      intro: (
        <>
          <p>Dieselbe Glucose, zwei Wege, wild verschiedene Erträge.</p>
          <ul>
            <li>Lass sie aerob laufen und zähle die ATP-Punkte. Dann schalte den Sauerstoff ab.</li>
            <li>Wechsle den Organismus zwischen Muskel und Hefe — die Ausbeute ist identisch, der Abfall nicht.</li>
            <li>Achte darauf, wo jeder Weg stattfindet: Mitochondrium gegen bloßes Zytoplasma.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Aerobe Atmung liefert etwa 30 ATP pro Glucose. Wie viele ATP ergeben 12 Glucosemoleküle?",
        answer: 360,
        unit: "ATP",
        hint: "Multiplizieren.",
        explain: "12 × 30 = 360 ATP.",
      },
      {
        prompt:
          "Anaerobe Atmung liefert 2 ATP pro Glucose. Wie viele Glucosemoleküle bräuchte ein Muskel, um die ATP-Menge von 4 aerob veratmeten Glucosemolekülen (je 30) zu erreichen?",
        answer: 60,
        unit: "Moleküle",
        hint: "Erst die aerobe Gesamtmenge ausrechnen, dann durch 2 teilen.",
        explain: "4 × 30 = 120 ATP; 120 ÷ 2 = 60 Glucosemoleküle — fünfzehnmal so viele.",
      },
    ],
    quiz: [
      {
        q: "Warum benutzen Zellen ATP, statt Glucose direkt auszugeben?",
        choices: [
          "Glucose ist giftig",
          "Glucose kann nicht in Zellen gelangen",
          "ATP liefert auf Abruf ein kleines, brauchbares Energiepaket — Glucose ist Großspeicher",
          "ATP enthält insgesamt mehr Energie",
        ],
        answer: 2,
        explain:
          "Es ist ein Stückelungsproblem. Glucose ist der Goldbarren; ATP ist die Münze, in der jeder Prozess der Zelle seinen Preis hat.",
      },
      {
        q: "Wie verhält sich die Atmung zur Fotosynthese?",
        choices: [
          "Die beiden haben nichts miteinander zu tun",
          "Atmung ist im Kern umgekehrte Fotosynthese — ihre Produkte sind die Edukte der anderen",
          "Nur Pflanzen atmen",
          "Atmung braucht ebenfalls Licht",
        ],
        answer: 1,
        explain:
          "Glucose + O₂ → CO₂ + H₂O ist die Umkehrung von CO₂ + H₂O + Licht → Glucose + O₂. Zusammen zirkulieren sie Kohlenstoff und Sauerstoff durch die Biosphäre.",
      },
      {
        q: "Aerobe Atmung liefert etwa 30 ATP pro Glucose, anaerobe 2. Woher der Unterschied?",
        choices: [
          "Anaerobe Atmung nutzt einen anderen Zucker",
          "Ohne Sauerstoff läuft nur die Glykolyse — der Großteil der Energie bleibt im halb zerlegten Molekül eingesperrt",
          "Anaerobe Atmung verschwendet ATP als Wärme",
          "Der Sauerstoff selbst enthält die zusätzliche Energie",
        ],
        answer: 1,
        explain:
          "Sauerstoff nimmt am Kettenende die verbrauchten Elektronen auf. Ohne ihn stoppt die Kette nach der Glykolyse, und Lactat oder Ethanol tragen noch den Löwenanteil der Energie.",
      },
      {
        q: "Welche Zellen betreiben Zellatmung?",
        choices: [
          "Nur Tierzellen",
          "Nur Zellen ohne Chloroplasten",
          "Jede lebende Zelle, Pflanzen eingeschlossen",
          "Nur Muskelzellen beim Sport",
        ],
        answer: 2,
        explain:
          "Jede Zelle braucht ATP. Pflanzen betreiben Fotosynthese im Licht und atmen ununterbrochen, Tag und Nacht.",
      },
      {
        q: "Hefe, die anaerob atmet, produziert…",
        choices: ["Milchsäure", "Ethanol und CO₂", "Sauerstoff", "Glucose"],
        answer: 1,
        explain:
          "Gärung. Das CO₂ treibt Brot und das Ethanol macht Bier — ein Organismus, eine Reaktion, zwei Industrien.",
      },
    ],
  },
};
