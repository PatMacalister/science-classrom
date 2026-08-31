import type { LessonContentDe } from "../localize";

export const unit6De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "energy-flow": {
    Theory: () => (
      <>
        <h2>Energie kommt einmal herein und geht als Wärme</h2>
        <p>
          Nährstoffe zirkulieren — der Kohlenstoff in dir ist durch unzählige Organismen gegangen
          und wird wieder auf Reise gehen. <strong>Energie tut das nicht.</strong> Sie kommt als
          Sonnenlicht an, wird von der Fotosynthese eingefangen, wandert die Nahrungskette hinauf —
          und verlässt bei jedem Schritt das System als Wärme. Ein Ökosystem braucht ständigen
          Nachschub, weil es ununterbrochen leckt.
        </p>
        <p>Die Ebenen heißen <strong>Trophieebenen</strong>:</p>
        <ul>
          <li>
            <strong>Produzenten</strong> — Pflanzen und Algen, die Licht einfangen. Alles darüber
            gibt deren Arbeit aus.
          </li>
          <li>
            <strong>Primärkonsumenten</strong> — Pflanzenfresser.
          </li>
          <li>
            <strong>Sekundärkonsumenten</strong> — Fleischfresser, die Pflanzenfresser fressen.
          </li>
          <li>
            <strong>Tertiärkonsumenten</strong> — Fleischfresser, die Fleischfresser fressen.
          </li>
          <li>
            <strong>Destruenten</strong> — Bakterien und Pilze, die sich von jeder Ebene ernähren
            und die Nährstoffe zurückführen.
          </li>
        </ul>

        <h2>Die Zehn-Prozent-Regel</h2>
        <p>
          Nur etwa <strong>10 %</strong> der Energie einer Ebene landen in der nächsten. Die
          anderen 90 % gehen verloren — und die Gründe sind sämtlich Dinge, die du schon gelernt
          hast:
        </p>
        <ul>
          <li>
            <strong>Atmung.</strong> Das meiste, was ein Organismus frisst, wird zu ATP verbrannt,
            und diese Energie geht als Wärme. Für den, der ihn frisst, war sie nie verfügbar.
          </li>
          <li>
            <strong>Unverdauter Abfall.</strong> Cellulose, Knochen, Fell — gefressen, aber nicht
            aufgenommen.
          </li>
          <li>
            <strong>Nie gefressene Teile.</strong> Wurzeln, Skelette, alles, was unverzehrt stirbt
            (die Destruenten holen es sich).
          </li>
        </ul>
        <div className="formula">
          10 % pro Ebene ⇒ Ebene 4 erhält 0,1 % dessen, was die Produzenten einfingen
          <span className="note">1.000.000 kJ → 100.000 → 10.000 → 1.000</span>
        </div>
        <p>
          Darum sind Nahrungsketten selten länger als vier oder fünf Glieder: Es bleibt schlicht
          nicht genug Energie für eine weitere Ebene. Darum sind Spitzenprädatoren zwangsläufig
          selten und brauchen riesige Reviere — und darum destabilisiert ihr Verlust ein Ökosystem:
          Niemand sonst hält diese Position.
        </p>

        <h2>Die unbequeme Arithmetik</h2>
        <p>
          Dieselbe Regel erklärt eine Tatsache der Nahrungsproduktion. Getreide an Rinder zu
          verfüttern und dann die Rinder zu essen wirft rund 90 % der Energie des Getreides weg.
          Das Getreide direkt zu essen nicht. Darum ernährt eine gegebene Fläche weit mehr Menschen
          pflanzlich als fleischlastig — eine Schlussfolgerung, die direkt aus der
          Trophie-Effizienz fällt, ganz gleich, was jemand bevorzugt.
        </p>
        <p>
          Die <strong>Biomagnifikation</strong> folgt derselben Pyramide. Langlebige Gifte — DDT,
          Quecksilber — werden nicht ausgeschieden und konzentrieren sich deshalb nach oben. Ein
          Räuber, der tausend belastete Fische frisst, sammelt das Gift aller tausend. Darum fand{" "}
          <em>Der stumme Frühling</em> kollabierende Eierschalen bei Adlern, nicht bei Insekten —
          und darum warnen Quecksilber-Hinweise für Fisch gerade vor den großen Raubfischarten.
        </p>

        <div className="callout note">
          <span className="co-title">Pyramiden, die kopfstehen</span>
          <p>
            Im offenen Ozean kann eine <em>Biomasse</em>-Pyramide umgekehrt sein: Die Masse des
            Phytoplanktons ist in jedem Augenblick kleiner als die des Zooplanktons, das es frisst.
            Das ist kein Regelverstoß — das Phytoplankton vermehrt sich so schnell, dass der kleine
            Bestand über die Zeit weit mehr Energie liefert, als ein Schnappschuss vermuten lässt.
            Energiepyramiden stehen nie kopf; Biomassepyramiden manchmal.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Energiepyramide",
      intro: (
        <>
          <p>Vier Trophieebenen, ein Regler dafür, wie viel Energie jeden Schritt übersteht.</p>
          <ul>
            <li>Schau bei 10 % nach, was Ebene 4 erreicht — ein Tausendstel dessen, was die Pflanzen einfingen.</li>
            <li>Erhöhe die Effizienz auf 25 % und sieh, wie viel mehr Spitzenprädator plötzlich versorgt wäre.</li>
            <li>Senk sie auf 2 %. Eine vierte Ebene wird praktisch unmöglich.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Produzenten fangen 500.000 kJ ein. Wie viel Energie erreicht nach der Zehn-Prozent-Regel die Tertiärkonsumenten (Ebene 4)?",
        answer: 500,
        unit: "kJ",
        hint: "Dreimal mit 0,1 multiplizieren.",
        explain: "500.000 × 0,1 × 0,1 × 0,1 = 500 kJ — ein Tausendstel des Eingefangenen.",
      },
      {
        prompt:
          "Eine Nahrungskette überträgt 10 % pro Ebene. Wie viel Prozent der Produzenten-Energie erreichen Ebene 3?",
        answer: 1,
        unit: "%",
        hint: "Zwei Übertragungen.",
        explain: "0,1 × 0,1 = 0,01 = 1 %.",
      },
    ],
    quiz: [
      {
        q: "Wie viel Energie geht ungefähr von einer Trophieebene auf die nächste über?",
        choices: ["90 %", "50 %", "10 %", "99 %"],
        answer: 2,
        explain:
          "Etwa ein Zehntel. Der Rest geht als Atmungswärme verloren, als unverdauter Abfall und als Teile, die nie gefressen werden.",
      },
      {
        q: "Warum sind Nahrungsketten selten länger als vier oder fünf Ebenen?",
        choices: [
          "Räubern gehen die Beutearten aus",
          "Es bleibt zu wenig Energie, um eine weitere Ebene zu tragen",
          "Größere Tiere können kleinere nicht verdauen",
          "Destruenten unterbrechen die Kette",
        ],
        answer: 1,
        explain:
          "Bei ~90 % Verlust pro Schritt bekäme eine fünfte Ebene etwa 0,01 % der Ausgangsenergie — zu wenig für eine Population.",
      },
      {
        q: "Warum ernährt dieselbe Ackerfläche mehr Menschen bei pflanzlicher Ernährung?",
        choices: [
          "Pflanzen wachsen schneller als Tiere",
          "Pflanzen direkt zu essen überspringt eine Trophie-Übertragung und spart so ~90 % Energieverlust",
          "Tiere brauchen mehr Wasser",
          "Pflanzen enthalten mehr Energie pro Gramm",
        ],
        answer: 1,
        explain:
          "Getreide an Vieh zu verfüttern fügt eine Trophieebene hinzu — und jede Ebene verwirft rund neun Zehntel der Energie.",
      },
      {
        q: "Was ist Biomagnifikation?",
        choices: [
          "Wachsende Populationen auf höheren Trophieebenen",
          "Über Generationen größer werdende Räuber",
          "Zunehmende Energie auf jeder Ebene",
          "Langlebige Gifte, die sich die Nahrungskette hinauf konzentrieren",
        ],
        answer: 3,
        explain:
          "Ein Räuber sammelt die Giftlast von allem, was er frisst. Darum trifft es Spitzenprädatoren bei Schadstoffen wie DDT und Quecksilber am härtesten.",
      },
      {
        q: "Worin unterscheiden sich Energiefluss und Nährstoffkreislauf?",
        choices: [
          "Beide zirkulieren endlos",
          "Energie fließt einmal hindurch und geht als Wärme verloren; Nährstoffe werden endlos recycelt",
          "Nährstoffe gehen als Wärme verloren; Energie wird recycelt",
          "Keines von beiden wird recycelt",
        ],
        answer: 1,
        explain:
          "Kohlenstoffatome drehen Runde um Runde. Energie macht einen Durchlauf und degradiert bei jedem Schritt zu Wärme — darum muss ständig Sonnenlicht nachkommen.",
      },
    ],
  },

  /* ================================================================ */
  populations: {
    Theory: () => (
      <>
        <h2>Die Exponential-Falle</h2>
        <p>
          Populationen wachsen durch Multiplikation, nicht Addition: Jedes Individuum kann weitere
          Individuen hervorbringen, die wiederum weitere hervorbringen. Ungebremst ergibt das eine{" "}
          <strong>exponentielle</strong> Kurve — anfangs träge, dann explosiv steil.
        </p>
        <p>
          Darwin mochte das Elefantenbeispiel: der langsamste bekannte Vermehrer, und doch hätte
          man von einem Paar, überlebte jedes Kalb, binnen weniger Jahrhunderte Millionen. Man
          sieht keine Kontinente voller Elefanten — also stirbt fast jeder Elefant, der je geboren
          wird, vor der Fortpflanzung. Genau in dieser Lücke zwischen Potenzial und Wirklichkeit
          arbeitet die natürliche Selektion.
        </p>

        <h2>Kapazitätsgrenze</h2>
        <p>
          Reale Populationen stoßen an Grenzen: Nahrung, Wasser, Platz, Nistplätze, Räuber,
          Krankheit. Das Maximum, das eine Umwelt dauerhaft tragen kann, ist ihre{" "}
          <strong>Kapazitätsgrenze</strong>, geschrieben <code>K</code>.
        </p>
        <p>Das Ergebnis ist eine S-förmige (<strong>logistische</strong>) Kurve mit vier Phasen:</p>
        <ul>
          <li><strong>Anlauf</strong> — wenige Individuen, langsames absolutes Wachstum.</li>
          <li><strong>Exponentiell</strong> — Ressourcen reichlich, Wachstum beschleunigt.</li>
          <li><strong>Verlangsamung</strong> — die Konkurrenz beißt, je näher K rückt.</li>
          <li><strong>Plateau</strong> — Geburten ≈ Todesfälle, Schwanken um K.</li>
        </ul>
        <div className="formula">
          Wachstum = r · N · (1 − N/K)
          <span className="note">
            die Klammer ist die Bremse: nahe null, wenn N klein ist — und exakt null bei N = K
          </span>
        </div>
        <p>
          Die Struktur dieser Gleichung verdient einen Moment. Ist N klein, liegt die Klammer nahe
          1, und das Wachstum ist fast exponentiell. Nähert sich N der Grenze K, geht die Klammer
          gegen null, und das Wachstum stoppt. Die Population muss über K nichts wissen — die
          Begrenzung entsteht von selbst aus der Konkurrenz.
        </p>

        <h2>Zwei Arten von Grenzen</h2>
        <p>
          <strong>Dichteabhängige</strong> Faktoren beißen härter, je dichter die Population wird:
          Konkurrenz um Nahrung, Krankheitsübertragung, Prädation, sich ansammelnder Abfall. Sie
          erzeugen das Plateau — sie sind eine Rückkopplungsschleife.
        </p>
        <p>
          <strong>Dichteunabhängige</strong> Faktoren schlagen unabhängig von der Anzahl zu: ein
          harter Frost, eine Flut, ein Lauffeuer. Eine Dürre tötet in einer dünnen Population
          denselben Anteil wie in einer dichten — solche Faktoren verursachen Einbrüche statt
          sanfter Regulierung.
        </p>

        <h2>Überschießen</h2>
        <p>
          Populationen können K vorübergehend überschreiten, besonders wenn sie träge reagieren —
          und die Korrektur kann brutal sein. Die 1944 auf St.-Matthew-Island ausgesetzten
          Rentiere wuchsen von 29 auf 6.000 bis 1963, fraßen die langsam wachsenden Flechten kahl,
          von denen sie abhingen, und stürzten in einem einzigen Winter auf etwa 42 Tiere. Die
          Kapazitätsgrenze war nicht nur überschritten, sie war <em>beschädigt</em> — die
          Population konnte sich nicht auf ihr altes Niveau erholen.
        </p>
        <p>
          Das ist die allgemeine Lehre, und der Grund, warum K keine feste Zahl ist. Sie verschiebt
          sich mit den Bedingungen — und eine Population, die schlimm genug überschießt, kann sie
          selbst absenken.
        </p>

        <div className="callout tip">
          <span className="co-title">Wo die Menschen sitzen</span>
          <p>
            Das menschliche Bevölkerungswachstum sah jahrhundertelang exponentiell aus, weil wir
            unsere eigene Kapazitätsgrenze immer wieder angehoben haben — Landwirtschaft, Hygiene,
            Dünger, Medizin. Jedes davon ist eine echte Erhöhung von K, keine Befreiung davon. Die
            offene Frage ist nicht, ob K existiert, sondern wo sie gerade liegt — und ob wir sie
            abtragen wie die Rentiere ihre Flechten.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Wachstumskurven",
      intro: (
        <>
          <p>Eine Population, zwei Modelle. Vergleiche ihre Vorhersagen.</p>
          <ul>
            <li>Lass das exponentielle Modell laufen. Es hört nie auf — was dir sagen sollte, dass es ab einem Punkt falsch ist.</li>
            <li>Wechsle zu logistisch und sieh die Kurve umbiegen, wenn sie sich K nähert.</li>
            <li>Erhöhe die Wachstumsrate bei festem K. Sie kommt schneller an — aber nicht weiter.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was ist die Kapazitätsgrenze?",
        choices: [
          "Die größte je gezählte Population",
          "Die maximale Population, die eine Umwelt dauerhaft tragen kann",
          "Die Geschwindigkeit, mit der eine Population wächst",
          "Die Zahl der Nachkommen pro Individuum",
        ],
        answer: 1,
        explain:
          "K wird von Ressourcen und Bedingungen gesetzt. Populationen pendeln sich in ihrer Nähe ein — und können sie durch Überschießen beschädigen.",
      },
      {
        q: "Was bewirkt die Klammer in Wachstum = r · N · (1 − N/K)?",
        choices: [
          "Sie beschleunigt das Wachstum mit wachsender Population",
          "Sie wirkt als Bremse und fällt auf null, wenn sich N der Grenze K nähert",
          "Sie verwandelt die Population in eine Rate",
          "Sie hat keine Wirkung",
        ],
        answer: 1,
        explain:
          "Bei kleiner Population ist die Klammer ~1 und das Wachstum fast exponentiell; bei N = K ist sie 0, und das Wachstum stoppt.",
      },
      {
        q: "Welcher davon ist ein dichteabhängiger begrenzender Faktor?",
        choices: ["Ein Lauffeuer", "Ein harter Frost", "Konkurrenz um Nahrung", "Eine Flut"],
        answer: 2,
        explain:
          "Konkurrenz verschärft sich mit steigender Dichte — sie koppelt zurück und reguliert. Frost und Feuer schlagen unabhängig von der Anzahl zu.",
      },
      {
        q: "Die Rentiere von St.-Matthew-Island wuchsen auf 6.000 und stürzten auf etwa 42. Warum stabilisierten sie sich nicht bei K?",
        choices: [
          "Sie wurden bejagt",
          "Sie überschossen und zerstörten die langsam wachsenden Flechten — und senkten damit die Kapazitätsgrenze selbst",
          "Eine Krankheit kam an",
          "Sie wanderten ab",
        ],
        answer: 1,
        explain:
          "Überschießen kann die Ressourcenbasis beschädigen. K ist keine feste Linie — eine Population kann sie nach unten drücken und dann darunter durchstürzen.",
      },
      {
        q: "Warum sah das menschliche Bevölkerungswachstum so lange exponentiell aus?",
        choices: [
          "Wir haben unsere eigene Kapazitätsgrenze durch Landwirtschaft, Hygiene und Medizin immer wieder angehoben",
          "Menschen sind von der Kapazitätsgrenze ausgenommen",
          "Menschliche Populationen konkurrieren nicht",
          "Die Geburtenraten sind konstant",
        ],
        answer: 0,
        explain:
          "Jede Neuerung hat K erhöht, statt es abzuschaffen. Die Frage ist, wo K jetzt liegt — und ob wir es gerade abtragen.",
      },
    ],
  },

  /* ================================================================ */
  "yeast-balloon": {
    Theory: () => (
      <>
        <h2>Was du misst</h2>
        <p>
          Hefe ist ein einzelliger Pilz. Gib ihr Zucker und keinen Sauerstoff, und sie atmet
          anaerob — Gärung — und produziert Ethanol und Kohlenstoffdioxid. Du wirst dieses CO₂ in
          einem Ballon auffangen und das Volumen mit einer Vorhersage vergleichen.
        </p>
        <div className="formula">
          C₆H₁₂O₆ → 2 C₂H₅OH + 2 CO₂
          <span className="note">eine Glucose ergibt zwei Ethanol und zwei Kohlenstoffdioxid</span>
        </div>
        <p>
          Das ist die Reaktion hinter Brot und Bier — und sie läuft direkt vor dir ab, in einem
          Tempo, das du einstellst.
        </p>

        <h2>Erst vorhersagen, dann messen</h2>
        <p>
          Rechne zuerst — der Witz des Experiments ist, dass du die Antwort vorher kanntest. Es
          ist Catalysts Stöchiometrie, angewandt auf einen lebenden Organismus.
        </p>
        <ul>
          <li>Glucose hat eine molare Masse von 180 g/mol.</li>
          <li>10 g Zucker sind 10 ÷ 180 = <strong>0,056 mol</strong>.</li>
          <li>Jede Glucose liefert 2 CO₂, also 0,056 × 2 = <strong>0,111 mol CO₂</strong>.</li>
          <li>
            Ein Mol Gas nimmt bei Raumtemperatur etwa 24 Liter ein, also 0,111 × 24 ≈{" "}
            <strong>2,7 Liter</strong>.
          </li>
        </ul>
        <p>
          Das ist das Maximum — falls jedes Zuckermolekül vergoren wird. In der Praxis bekommst du
          weniger, und die Lücke ist selbst aufschlussreich: Die Hefe verwendet einen Teil des
          Zuckers fürs Wachstum, etwas CO₂ löst sich im Wasser, und die Reaktion ist noch nicht
          fertig.
        </p>

        <h2>Was du brauchst</h2>
        <ul>
          <li>Ein Päckchen <strong>Trockenhefe</strong> (ca. 7 g)</li>
          <li>2 EL <strong>Zucker</strong> (etwa 25 g — wiege ihn, wenn du kannst)</li>
          <li>250 ml <strong>warmes Wasser</strong>, um 35–40 °C</li>
          <li>Eine <strong>Flasche mit engem Hals</strong> (eine 500-ml-Plastikflasche ist ideal)</li>
          <li>Einen <strong>Ballon</strong>, dazu Maßband oder Schnur</li>
        </ul>

        <h2>Die Temperatur ist die Stellgröße zum Spielen</h2>
        <p>
          Gärung wird von Enzymen betrieben, also gilt Einheit 0.3 direkt: zu kalt, und die Hefe
          ist träge; zu heiß, und die Enzyme denaturieren und die Zellen sterben. Um 35 °C ist
          nahe am Optimum; über etwa 50 °C bringst du sie schlicht um. Dasselbe Experiment bei
          drei Temperaturen macht aus der Vorführung eine echte Untersuchung — und wenn du das
          tust: Halte alles andere identisch, sonst weißt du nicht, was den Unterschied verursacht
          hat.
        </p>

        <div className="callout warn">
          <span className="co-title">Vernünftige Vorsichtsmaßnahmen</span>
          <p>
            Verschließe die Flasche nicht mit einem Deckel — der Ballon muss der einzige Ausgang
            sein, und der Druck braucht ein Ventil. Nicht trinken: Das ist kein Braukasten, und was
            du da hast, ist unsauber vergoren. Danach alles ausspülen.
          </p>
        </div>

        <h2>Das Volumen abschätzen</h2>
        <p>
          Miss den Umfang <em>C</em> des Ballons mit der Schnur, dann Radius <em>r</em> = C ÷ 2π
          und Volumen ≈ (4/3)πr³. Ein Ballon mit 30 cm Umfang hat einen Radius von rund 4,8 cm und
          fasst etwa 0,46 Liter. Das ist eine grobe Schätzung — Ballons sind keine Kugeln —, aber
          gut genug für den Vergleich mit deiner Vorhersage. Und das offen zu sagen, gehört zum
          sauberen Arbeiten.
        </p>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling: Der Ballon",
      intro: (
        <>
          <p>Modelliere es, bevor du es ansetzt — Zucker, Temperatur und Zeit.</p>
          <ul>
            <li>Stell 10 g Zucker ein und lies das Maximalvolumen ab. Das ist die Zahl für deine Vorhersage.</li>
            <li>Treib die Temperatur auf 55 °C. Die Hefe stirbt, und der Ballon hört auf zu wachsen.</li>
            <li>Vergleiche 15 °C und 35 °C bei gleicher Zeit — genau diese Untersuchung lohnt sich in echt.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Du verwendest 18 g Zucker (M = 180 g/mol). Wie viele Mol CO₂ kann die Gärung liefern? (1 Glucose → 2 CO₂)",
        answer: 0.2,
        unit: "mol",
        tolerancePct: 3,
        hint: "Erst die Mol Glucose, dann verdoppeln.",
        explain: "18 ÷ 180 = 0,10 mol Glucose → 0,20 mol CO₂.",
      },
      {
        prompt: "Wie viele Liter nähmen 0,20 mol CO₂ bei Raumtemperatur ein (24 L/mol)?",
        answer: 4.8,
        unit: "L",
        tolerancePct: 3,
        hint: "Mol mal molares Volumen.",
        explain: "0,20 × 24 = 4,8 L — ein ordentlich gefüllter Ballon.",
      },
      {
        prompt:
          "Dein Ballon misst 30 cm Umfang. Schätze sein Volumen in Litern, als wäre er eine Kugel. (r = C/2π, V = 4/3·π·r³, und 1000 cm³ = 1 L)",
        answer: 0.46,
        unit: "L",
        tolerancePct: 10,
        hint: "r = 30 / 6,28 ≈ 4,8 cm. Dann V = 4/3 × π × 4,8³ cm³.",
        explain: "r ≈ 4,77 cm, V ≈ 455 cm³ ≈ 0,46 L.",
      },
    ],
    checklist: [
      { id: "predict", text: "Das erwartete CO₂-Volumen aus der Zuckermasse VOR dem Start berechnet und aufgeschrieben." },
      { id: "mix", text: "Den Zucker in 250 ml warmem Wasser (35–40 °C) in der Flasche aufgelöst." },
      { id: "yeast", text: "Die Hefe zugegeben und vorsichtig geschwenkt." },
      { id: "balloon", text: "Den Ballon über den Hals gestülpt — und die Flasche ansonsten unverschlossen gelassen." },
      { id: "wait", text: "An einen warmen Ort gestellt und nach 10, 30 und 60 Minuten nachgesehen." },
      { id: "measure", text: "Den Umfang des Ballons gemessen und das Volumen abgeschätzt." },
      { id: "compare", text: "Gemessenes Volumen mit der Vorhersage verglichen — und kann erklären, warum das echte kleiner ist." },
      { id: "vary", text: "Noch einmal bei deutlich anderer Temperatur laufen lassen, ohne sonst irgendetwas zu ändern." },
      { id: "smell", text: "Am Ende an der Flasche gerochen — das ist das Ethanol, das andere Produkt der Gleichung." },
    ],
  },
};
