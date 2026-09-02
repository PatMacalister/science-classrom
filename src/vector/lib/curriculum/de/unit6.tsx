import type { LessonContentDe } from "../localize";

export const unit6De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  heat: {
    Theory: () => (
      <>
        <h2>Was ein Thermometer wirklich misst</h2>
        <p>
          Jedes Molekül in diesem Zimmer ist in Bewegung — kollidierend, abprallend, zitternd.{" "}
          <strong>Temperatur ist die mittlere Bewegungsenergie dieses Zitterns.</strong> Heißer
          Kaffee: schnelle Moleküle. Kalte Luft: langsame. Der absolute Nullpunkt (0 K,
          −273,15 °C) ist, wo das Zittern sein Minimum erreicht — kälter geht nicht, weil keine
          Bewegung mehr da ist, die man wegnehmen könnte. Darum beginnt die Kelvin-Skala dort
          und zählt aufwärts, und darum wollen Physikgleichungen Kelvin: −10 °C ist nicht
          „doppelt so kalt“ wie −5 °C, aber 400 K sind wirklich das Doppelte von 200 K.
        </p>
        <p>
          <strong>Wärme</strong> ist etwas anderes als Temperatur: Sie ist Energie{" "}
          <em>unterwegs</em> von heiß nach kalt, gemessen in den Joule, die du schon besitzt.
          Eine Badewanne bei 30 °C hält weit mehr thermische Energie als ein Teelöffel
          kochenden Wassers — niedrigere Temperatur, ungleich mehr zitternde Moleküle.
        </p>

        <h2>Wärme fließt in eine Richtung — und das Gleichgewicht ist ein Kompromiss</h2>
        <p>
          Bring Heiß und Kalt in Kontakt, und Kollisionen reichen unerbittlich Energie von
          schnelleren an langsamere Moleküle weiter, bis beide Seiten eine Temperatur teilen:{" "}
          <strong>thermisches Gleichgewicht</strong>. Nie umgekehrt — ein lauwarmer Kaffee hat
          sich noch nie spontan in heißen Kaffee und eine kalte Stelle sortiert.
          (Kühlschränke schieben Wärme nur bergauf, indem sie elektrische Arbeit ausgeben; das
          Universum führt seine Bücher.)
        </p>
        <p>Wo der Kompromiss landet, entscheidet die thermische Masse jeder Seite:</p>
        <div className="formula">
          Q = m·c·ΔT
          <span className="note">c ist die spezifische Wärmekapazität: Joule, um 1 kg um 1 K zu heben — Wassers 4.186 ist berühmt riesig</span>
        </div>
        <p>
          Wassers enormes <strong>c</strong> ist eine planetare Tatsache: Ozeane saugen den
          Sommer auf und geben ihn im Winter ab — darum haben Küstenstädte milde Jahre, während
          Kontinentalinnere wild schwanken. Und darum braucht dein Nudeltopf so lange zum
          Kochen, während die leere Pfanne in Sekunden versengt.
        </p>

        <h2>Warum Metall sich kalt anfühlt</h2>
        <p>
          Türklinke und Holztür haben <em>dieselbe Temperatur</em> — deine Hand widerspricht,
          weil sie <strong>Wärmefluss</strong> misst, nicht Temperatur. Metall leitet Wärme
          schnell aus deiner Haut (freie Elektronen tragen die Energie — dieselben Elektronen,
          die Spark als Strom benutzt); Holz leitet sie träge. Deine Haut ist ein
          Durchflussmesser mit falschem Etikett. Die Leitung hat zwei Geschwister:{" "}
          <strong>Konvektion</strong> (heißes Fluid, das physisch aufsteigt — Heizkörper,
          Seebrisen) und <strong>Strahlung</strong> (Infrarotlicht — das Lagerfeuer im Gesicht,
          die Sonne durchs Vakuum).
        </p>

        <div className="callout note">
          <span className="co-title">Das Rätsel der fehlenden Wärme</span>
          <p>
            Reib die Hände: Die Reibung „verliert“ mechanische Energie — in schnelleres
            Molekülzittern. Diese Lektion schließt die offene Schleife aus Einheit 2: Wärme ist
            kein Leck aus den Energiebüchern, sondern deren unordentlichstes Konto — und James
            Joule verdiente sich den Namen der Einheit, indem er den Wechselkurs mit
            Schaufelrädern und Thermometern bewies.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Gleichgewichtsbank",
      intro: (
        <>
          <p>Zwei Blöcke, verstellbare Massen, Materialien und Temperaturen — bring sie zusammen.</p>
          <ul>
            <li>Gleiche Massen aus gleichem Stoff: Der Treffpunkt ist der schlichte Mittelwert.</li>
            <li>Gib einem Block die vierfache Masse und sieh den Kompromiss zu ihm wandern.</li>
            <li>Tausche Eisen (c = 449) gegen Wasser (c = 4.186) und sieh „thermische Masse“ die Temperatur schlagen.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Wie viel Energie erhitzt 1,5 kg Wasser von 20 °C auf 100 °C, in Joule? (c = 4.186 J/kg·K)",
        answer: 502320,
        unit: "J",
        tolerancePct: 2,
        hint: "Q = m·c·ΔT mit ΔT = 80.",
        explain: "1,5 × 4.186 × 80 ≈ 502.000 J — vier Minuten Volllast für einen 2-kW-Kocher, alles in Zittern investiert.",
      },
      {
        prompt: "Rechne 22 °C in Kelvin um.",
        answer: 295.15,
        unit: "K",
        tolerancePct: 1,
        hint: "273,15 addieren.",
        explain: "22 + 273,15 = 295,15 K. Gleiche Schrittweite, ehrliche Null.",
      },
    ],
    quiz: [
      {
        q: "Was ist Temperatur, mikroskopisch betrachtet?",
        choices: [
          "Die Wärmemenge, die ein Körper enthält",
          "Ein Fluid, das von heiß nach kalt fließt",
          "Die mittlere Bewegungsenergie der Moleküle",
          "Die Anzahl der vorhandenen Moleküle",
        ],
        answer: 2,
        explain:
          "Schnelleres Zittern ist alles, was „heißer“ bedeutet. Wärme dagegen ist Energie unterwegs zwischen Körpern verschiedener Temperatur.",
      },
      {
        q: "Warum kann nichts kälter sein als der absolute Nullpunkt?",
        choices: [
          "Thermometer funktionieren darunter nicht mehr",
          "Temperatur misst Bewegung, und bei 0 K ist keine Bewegung mehr da, die man entfernen könnte",
          "Die Luft würde vorher fest gefrieren",
          "Es geht doch, mit genug Kühlung",
        ],
        answer: 1,
        explain:
          "Weniger als nichts geht nicht. 0 K ist der Boden des Zitterns — auch der Grund, warum die Physik die ehrliche Null der Kelvin-Skala mag.",
      },
      {
        q: "Ein Metallgeländer und eine Holzbank stehen die ganze Nacht draußen. Im Morgengrauen fühlt sich das Metall kälter an, weil…",
        choices: [
          "Metall nachts wirklich kälter ist",
          "Holz eigene Wärme erzeugt",
          "Metall den kalten Himmel spiegelt",
          "beide gleich warm sind, Metall aber die Wärme viel schneller aus deiner Hand leitet",
        ],
        answer: 3,
        explain:
          "Deine Haut spürt Wärmefluss, nicht Temperatur. Die freien Elektronen des Metalls saugen die Wärme deiner Hand rasch ab; Holz kann das kaum.",
      },
      {
        q: "Warum haben Küstenstädte mildere Klimata als Städte im Landesinneren?",
        choices: [
          "Wassers riesige Wärmekapazität lässt das Meer den Sommer aufsaugen und im Winter abgeben",
          "Seeluft ist dünner",
          "Salz senkt die Lufttemperatur",
          "Das Meer spiegelt das Sonnenlicht fort",
        ],
        answer: 0,
        explain:
          "c = 4.186 J/kg·K macht den Ozean zum kolossalen thermischen Schwungrad — dieselbe Eigenschaft, die deinen Nudeltopf träge zum Kochen bringt.",
      },
      {
        q: "Ein Teelöffel kochendes Wasser oder eine Badewanne bei 30 °C — was hält mehr thermische Energie?",
        choices: [
          "Der Teelöffel — er ist heißer",
          "Die Badewanne — ungleich mehr zitternde Moleküle, trotz niedrigerer Temperatur",
          "Gleich viel, denn Wärme und Temperatur sind dasselbe",
          "Keins von beiden — Energie steckt nur in Brennstoff",
        ],
        answer: 1,
        explain:
          "Temperatur ist der Durchschnitt pro Molekül; thermische Energie die Summe. Hundert Liter mäßiges Zittern schlagen fünf Gramm schnelles.",
      },
    ],
  },

  /* ================================================================ */
  quanta: {
    Theory: () => (
      <>
        <h2>Ein Experiment, das nicht hätte zählen sollen</h2>
        <p>
          Licht auf ein Metall kann Elektronen von dessen Oberfläche schlagen — der{" "}
          <strong>photoelektrische Effekt</strong>. Klassisch ist Licht eine Welle, die Energie
          kontinuierlich liefert: Helleres Licht müsste härter treten, und selbst schwaches
          müsste es irgendwann schaffen. Das Metall widersprach in jedem Punkt:
        </p>
        <ul>
          <li>Unter einer <strong>Schwellenfrequenz</strong>: <em>nichts</em> — wie gleißend der Strahl auch sei, wie lange man auch warte.</li>
          <li>Darüber verlassen Elektronen das Metall <em>sofort</em>, selbst im schwächsten Licht.</li>
          <li>Helleres Licht: <em>mehr</em> Elektronen, aber keine schnelleren. Nur blaueres Licht macht schnellere.</li>
        </ul>

        <h2>Einsteins unbequeme Antwort</h2>
        <p>
          1905 nahm Einstein Plancks Buchhaltungstrick wörtlich: Licht kommt in unteilbaren
          Paketen an — <strong>Photonen</strong> — jedes mit einer Energie, die allein die
          Frequenz festlegt:
        </p>
        <div className="formula">
          E = h·f
          <span className="note">h = 6,63 × 10⁻³⁴ J·s — die Körnigkeit des Universums, in einer winzigen Konstante</span>
        </div>
        <p>
          Nun sind die sturen Tatsachen selbstverständlich. Ein Elektron wird durch die
          Absorption <em>eines</em> Photons befreit; liegt dessen E unter den Fluchtkosten (der{" "}
          <strong>Austrittsarbeit</strong>), passiert nichts — eine Million schwacher Pakete
          sammeln sich nicht an. Helligkeit ist bloß die Paket<em>zahl</em>: mehr Elektronen,
          gleiche Energie pro Stück. Rotes Licht sind Kleinmünzen, Ultraviolett große Scheine,
          und das Metall ist ein Automat, der nur passend nimmt. Dafür — nicht für die
          Relativität — nennt Einsteins Nobelpreis-Urkunde diesen Effekt.
        </p>

        <h2>Auch Materie ist körnig</h2>
        <p>
          Die Körnigkeit greift um sich. Atome halten Elektronen nur auf diskreten
          Energiesprossen — darum senden erhitzte Elemente scharfe Spektral<em>linien</em> aus
          (die Fingerabdrücke der letzten Lektion): Jede Linie ist ein Photon von exakt einem
          Sprossenabstieg. Das Orange einer Neonreklame und das Gelb einer Natriumlampe sind
          Quantensprünge, sichtbar von der Straße. Doch die Wellen räumen das Feld nicht:
          Ströme einzelner Elektronen bauen Interferenzmuster auf, und der Wellentest aus
          Einheit 4 sagt <em>Welle</em>, während die Klicks der Detektoren{" "}
          <em>Teilchen</em> sagen. Beides ist, ehrlicherweise, wahr — das stehende Angebot der
          Quantenwelt zur Demut.
        </p>

        <div className="callout note">
          <span className="co-title">Du benutzt das täglich</span>
          <p>
            Solarzellen sind der photoelektrische Effekt, monetarisiert — Photonen befördern
            Elektronen in einen Strom. Kamerasensoren zählen Photonen; LEDs fahren den Effekt
            rückwärts: Jedes Elektron steigt eine Sprosse hinab und zahlt ein Photon aus, dessen
            Farbe <em>die Sprossenhöhe ist</em>. E = hf ist inzwischen Unterhaltungselektronik.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Photoelektrik-Bank",
      intro: (
        <>
          <p>Eine Metallplatte, eine Lichtquelle mit Frequenz- und Helligkeitsreglern, ein Elektronenzähler.</p>
          <ul>
            <li>Starte tief im Roten und dreh die Helligkeit auf Maximum: nichts. Kein einziges Elektron.</li>
            <li>Schieb nun die Frequenz hoch — an der Schwelle kommen sofort Elektronen, selbst bei minimaler Helligkeit.</li>
            <li>Vergleiche über der Schwelle die Regler: Helligkeit bewegt die Anzahl; Frequenz das Tempo.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Photon blauen Lichts hat f = 6,6 × 10¹⁴ Hz. Welche Energie trägt es, in Joule? (h = 6,63 × 10⁻³⁴; Antwort wie 4.4e-19)",
        answer: 4.4e-19,
        unit: "J",
        tolerancePct: 3,
        hint: "E = h·f.",
        explain: "6,63×10⁻³⁴ × 6,6×10¹⁴ ≈ 4,4×10⁻¹⁹ J — eine winzige Münze, aber die einzige Währung, die das Metall nimmt.",
      },
    ],
    quiz: [
      {
        q: "Schwaches UV-Licht befreit Elektronen aus einem Metall; gleißendes rotes Licht befreit keines. Warum?",
        choices: [
          "Jedes Elektron absorbiert ein Photon, und nur UV-Photonen tragen einzeln genug Energie",
          "Rotes Licht wird vorher von der Luft absorbiert",
          "UV-Licht ist immer heller",
          "Elektronen bevorzugen kurze Wellenlängen ästhetisch",
        ],
        answer: 0,
        explain:
          "E = hf pro Paket, nur passend zahlbar. Eine Million billiger roter Münzen summieren sich nie zu einem Fluchtpreis — die Körnigkeit, die die klassische Physik nicht zulassen konnte.",
      },
      {
        q: "Macht man das (überschwellige) Licht heller, ändert sich…",
        choices: [
          "wie schnell jedes Elektron austritt",
          "die Schwellenfrequenz",
          "wie viele Elektronen pro Sekunde austreten — nicht ihre Einzelenergie",
          "die Austrittsarbeit des Metalls",
        ],
        answer: 2,
        explain:
          "Helligkeit ist Photonenzahl. Jeder Austritt bleibt ein Ein-Photon-Geschäft, also folgt die Energie pro Elektron allein der Frequenz.",
      },
      {
        q: "Warum senden erhitzte Elemente scharfe Spektrallinien aus statt eines glatten Regenbogens?",
        choices: [
          "Ihr Licht wird vom Glas gefiltert",
          "Elektronen sitzen auf diskreten Energiesprossen, und jede Linie ist das Photon genau eines Sprossenwechsels",
          "Die Atome schwingen bei einer Temperatur",
          "Sie senden auch Schall aus",
        ],
        answer: 1,
        explain:
          "Gequantelte Niveaus heißen gequantelte Photonenenergien — die Leiter jedes Elements ist einzigartig, darum identifizieren Linien Elemente über Lichtjahre.",
      },
      {
        q: "Wovon hängt die Energie eines Photons ab?",
        choices: [
          "Von der Helligkeit seiner Quelle",
          "Davon, wie lange das Licht gereist ist",
          "Von der Größe des aussendenden Atoms",
          "Allein von seiner Frequenz: E = h·f",
        ],
        answer: 3,
        explain: "Ein Paket, eine Frequenz, eine Energie. Blau kostet mehr als Rot, um exakt h mal die Frequenzdifferenz.",
      },
    ],
  },

  /* ================================================================ */
  "half-life": {
    Theory: () => (
      <>
        <h2>Der ehrlichste Zufall, den es gibt</h2>
        <p>
          Manche Kerne sind instabil: Früher oder später spuckt jeder Strahlung aus und wird
          etwas anderes. Wann? <strong>Grundsätzlich unwissbar.</strong> Ein bestimmter
          Kohlenstoff-14-Kern kann in der nächsten Sekunde zerfallen oder Zivilisationen
          überdauern — er hat kein Alter, keinen Verschleiß, keinen Fahrplan; ein
          fünftausend Jahre alter Kern zerfällt in dieser Sekunde exakt so wahrscheinlich wie
          ein frischer. Das ist keine Unwissenheit, die bessere Instrumente heilen — soweit die
          Physik sagen kann, ist es Zufall bis ganz nach unten: die Quantenkörnigkeit der
          letzten Lektion, am Ruder im Inneren des Kerns.
        </p>

        <h2>Zufall, aggregiert, ist eine Uhr</h2>
        <p>
          Nimm nun eine Billion davon. Jeder hat eine feste Wahrscheinlichkeit pro Zeiteinheit,
          also zerfällt ein fester <em>Anteil</em> der Population pro Zeiteinheit — und das
          ergibt ein unverkennbares Muster:
        </p>
        <div className="formula">
          N(t) = N₀ · (½)^(t / T½)
          <span className="note">jede Halbwertszeit T½ halbiert sich, was übrig ist: 100 % → 50 % → 25 % → 12,5 %…</span>
        </div>
        <p>
          Die Halbwertszeit ist die Signatur des Isotops: Kohlenstoff-14, 5.730 Jahre;
          Uran-238, 4,5 Milliarden; manche Medizin-Isotope, Stunden. Einzeln gesetzlos,
          gemeinsam metronomisch — dieselbe statistische Magie, mit der Casinos auf reinen
          Glücksspielen präzise budgetieren.
        </p>

        <h2>Die Uhr rückwärts lesen</h2>
        <p>
          Lebewesen erneuern ihren Kohlenstoff ständig und halten so einen bekannten
          C-14-Anteil. Der Tod stoppt den Nachschub, und die Uhr beginnt zu leeren. Miss, wie
          weit das C-14 einer Probe gefallen ist, und die Formel läuft rückwärts: ein Achtel
          des Originals heißt drei Halbwertszeiten — etwa 17.000 Jahre. Das ist die{" "}
          <strong>Radiokarbon-Datierung</strong>, und sie hat Ötzi, den Schriftrollen vom Toten
          Meer und jeder Holzkohle-Feuerstelle der Archäologie ehrliche Daten verpasst. Für
          Gesteine und Planeten übernehmen trägere Isotope: Die Uran-Blei-Datierung ist der
          Grund, warum wir wissen, dass die Erde 4,54 Milliarden Jahre alt ist — eine Zahl, die
          dieser Kurs jetzt verteidigen kann, statt sie nur zu zitieren.
        </p>

        <h2>Was Zerfall nicht ist</h2>
        <p>
          Halbwertszeit beschreibt Populationen, keine Termine: Nach einer Halbwertszeit ist
          dein <em>bestimmter</em> Kern nicht „halb zerfallen“ — er ist entweder weg oder
          unberührt. Und Zerfall ist ein Kernereignis: Verbrennen, Einfrieren oder Zermahlen
          einer Probe ändert ihre Chemie, nie ihre Halbwertszeit. Genau diese Gleichgültigkeit
          macht die Uhr über Milliarden Jahre vertrauenswürdig.
        </p>

        <div className="callout note">
          <span className="co-title">Das Würfelmodell für zu Hause</span>
          <p>
            Wirf 100 Würfel; entferne jede Sechs; wiederhole. Jeder Würfel ist gesetzlos, doch
            die Population fällt exponentiell mit einer „Halbwertszeit“ von etwa 3,8 Würfen —
            und deine Kurve wird um die ideale genauso wackeln wie echte Zerfallszählungen. Das
            Labor unten wirft Tausende, damit deine Handgelenke es nicht müssen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Zerfallsfarm",
      intro: (
        <>
          <p>Zehntausend instabile Kerne, ein Wahrscheinlichkeitsregler, und Zeit. Sieh Gesetz aus Chaos entstehen.</p>
          <ul>
            <li>Lass es laufen und sieh die Zahl fahrplanmäßig halbieren — während jeder einzelne Kern unberechenbar bleibt.</li>
            <li>Schrumpfe die Population auf 20 und starte neu: Die glatte Kurve wird zackig. Statistik braucht Menge.</li>
            <li>Lade die „uralte Probe“ und lies ihr Alter am verbliebenen Anteil ab — Datierung in einer Division.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Eine Probe startet mit 8.000 radioaktiven Kernen (T½ = 10 min). Wie viele bleiben nach 30 Minuten?",
        answer: 1000,
        unit: "Kerne",
        hint: "Drei Halbwertszeiten.",
        explain: "8.000 → 4.000 → 2.000 → 1.000. Drei Halbierungen, pünktlich nach Fahrplan.",
      },
      {
        prompt: "Ein Knochen enthält noch 25 % seines ursprünglichen C-14 (T½ = 5.730 Jahre). Wie alt ist er, in Jahren?",
        answer: 11460,
        unit: "Jahre",
        tolerancePct: 2,
        hint: "25 % sind zwei Halbwertszeiten.",
        explain: "½ × ½ = ¼ → zwei Halbwertszeiten → 2 × 5.730 = 11.460 Jahre seit dem Ende des Nachschubs.",
      },
    ],
    quiz: [
      {
        q: "Wann zerfällt ein bestimmter instabiler Kern?",
        choices: [
          "Exakt eine Halbwertszeit nach seiner Entstehung",
          "Es ist wahrhaft unvorhersagbar — nur die Wahrscheinlichkeit steht fest",
          "Wenn er mit einem anderen Kern kollidiert",
          "Früher, wenn die Probe erhitzt wird",
        ],
        answer: 1,
        explain:
          "Kein Alter, kein Verschleiß, kein Fahrplan — reiner Zufall mit fester Rate. Die Uhr existiert nur auf Populationsebene.",
      },
      {
        q: "Welcher Anteil einer großen Probe ist nach zwei Halbwertszeiten noch nicht zerfallen?",
        choices: ["Keiner", "Die Hälfte", "Ein Drittel", "Ein Viertel"],
        answer: 3,
        explain: "Jede Halbwertszeit halbiert den Rest: ½ × ½ = ¼. Nach zehn: etwa ein Tausendstel.",
      },
      {
        q: "Warum funktioniert Radiokarbon-Datierung an einem Knochen, aber nicht an einem lebenden Schaf?",
        choices: [
          "Lebendes Gewebe blockiert Strahlung",
          "Schafe enthalten kein Kohlenstoff-14",
          "Leben erneuert das C-14 ständig — die Uhr beginnt erst mit dem Tod zu leeren",
          "Die Halbwertszeit ist in Lebewesen anders",
        ],
        answer: 2,
        explain:
          "Essen und Atmen füllen das C-14 auf Atmosphärenniveau nach. Der Tod kappt den Nachschub, und der bekannte Zerfall übernimmt die Zeitmessung.",
      },
      {
        q: "Warum zeigt eine winzige Probe (etwa 20 Kerne) eine zackige, unzuverlässige Zerfallskurve?",
        choices: [
          "Das Exponentialgesetz ist nur ein Großzahl-Muster — wenige Zufallsereignisse wackeln heftig",
          "Kleine Proben zerfallen schneller",
          "Der Detektor sieht kleine Proben nicht",
          "Die Halbwertszeit schrumpft mit der Probengröße",
        ],
        answer: 0,
        explain:
          "Gleiche Physik pro Kern; die Glätte war immer ein Durchschnitt. Casinos und Isotope brauchen beide Volumen, um berechenbar zu sein.",
      },
      {
        q: "Eine radioaktive Probe erhitzen, zermahlen oder chemisch verbrennen wird…",
        choices: [
          "ihren Zerfall beschleunigen",
          "ihren Zerfall stoppen",
          "ihre Halbwertszeit verwürfeln",
          "nichts an ihrem Zerfall ändern — die Halbwertszeit ist eine Kerneigenschaft",
        ],
        answer: 3,
        explain:
          "Chemie passiert an den Elektronen; der Zerfall im Kern, Größenordnungen darunter. Diese Gleichgültigkeit lässt die Uhr die Geologie überleben.",
      },
    ],
  },
};
