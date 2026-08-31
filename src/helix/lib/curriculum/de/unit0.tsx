import type { LessonContentDe } from "../localize";

export const unit0De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  cells: {
    Theory: () => (
      <>
        <h2>Zuerst die unbequeme Frage</h2>
        <p>
          Biologie ist die Wissenschaft vom Leben — was ordentlicher wäre, wenn irgendjemand Leben
          definieren könnte. Es gibt keine einzelne Eigenschaft, die Lebendiges von Unbelebtem
          trennt — nur eine Liste von Dingen, die lebende Systeme tun, und jeder Punkt darauf hat
          eine Ausnahme. Feuer verbraucht Brennstoff und wächst. Kristalle bauen sich selbst
          zusammen. Ein Virus trägt Gene und evolviert, kann aber ohne eine Wirtszelle rein gar
          nichts tun.
        </p>
        <p>Die Arbeitsliste lohnt sich trotzdem. Lebewesen tun in der Regel Folgendes:</p>
        <ul>
          <li>Sie bestehen aus <strong>Zellen</strong>.</li>
          <li>Sie nehmen Energie auf und bleiben damit geordnet (<strong>Stoffwechsel</strong>).</li>
          <li>Sie halten ihr Inneres konstant (<strong>Homöostase</strong>).</li>
          <li>Sie reagieren auf ihre Umgebung.</li>
          <li>Sie wachsen und pflanzen sich fort — und geben dabei <strong>erbliche Information</strong> weiter.</li>
          <li>Sie verändern sich über Generationen (<strong>Evolution</strong>).</li>
        </ul>
        <p>
          Die letzten beiden tragen das meiste Gewicht. Eine Kerzenflamme erfüllt die ersten vier
          in einem lockeren Sinn; was sie nicht kann, ist sich mit erblicher Variation zu kopieren.
          Genau zu dieser Eigenschaft kehrt dieser ganze Kurs immer wieder zurück.
        </p>

        <h2>Die Zelltheorie</h2>
        <p>
          Die eine wirklich universelle Aussage der Biologie ist die <strong>Zelltheorie</strong>,
          zusammengetragen in den 1830er- bis 1850er-Jahren:
        </p>
        <ol>
          <li>Jedes Lebewesen besteht aus einer oder mehreren Zellen.</li>
          <li>Die Zelle ist die kleinste Einheit, die selbst lebt.</li>
          <li>
            Jede Zelle entsteht aus einer bereits existierenden Zelle — <em>omnis cellula e cellula</em>.
          </li>
        </ol>
        <p>
          Der dritte Punkt ist der schärfste. Er erledigte die Urzeugung: Maden kondensieren nicht
          aus Fleisch, und Brühe braut sich keine eigenen Bakterien — Pasteur zeigte, dass ein
          Kolben, der gegen Zellen aus der Luft versiegelt ist, unbegrenzt steril bleibt. Jede
          heute lebende Zelle ist das Ende einer ununterbrochenen Kette von Teilungen, die
          Milliarden Jahre zurückreicht. Kein Glied dieser Kette war jemals unbelebt.
        </p>

        <h2>Zwei Arten von Zellen</h2>
        <p>
          Die tiefste Trennlinie des Lebens verläuft nicht zwischen Pflanze und Tier — sondern
          danach, ob eine Zelle ihre DNA in einem eigenen Abteil aufbewahrt.
        </p>
        <p>
          <strong>Prokaryoten</strong> (Bakterien und Archaeen) tun es nicht. Ihre DNA liegt frei
          im Zytoplasma, als eine einzige ringförmige Schleife. Sie sind klein, typischerweise
          1–5 µm, und haben überhaupt keine membranumhüllten Organellen. Zahlenmäßig sind sie
          außerdem der größte Teil des Lebens auf der Erde.
        </p>
        <p>
          <strong>Eukaryoten</strong> (alles andere — Tiere, Pflanzen, Pilze, Protisten) bewahren
          ihre DNA in einem <strong>Zellkern</strong> auf und betreiben ihre Chemie in
          spezialisierten Abteilen, den <strong>Organellen</strong>. Sie sind im Durchmesser
          10–100× größer, und genau das ist der Punkt: Abteile erlauben einer Zelle, unverträgliche
          Reaktionen gleichzeitig laufen zu lassen.
        </p>

        <h2>Die Organellen, die jetzt zählen</h2>
        <ul>
          <li>
            <strong>Zellmembran</strong> — die Grenze, in jeder Zelle vorhanden. Nächste Lektion.
          </li>
          <li>
            <strong>Zellkern</strong> — das DNA-Archiv. Kopien verlassen es; das Original nie.
          </li>
          <li>
            <strong>Ribosomen</strong> — Proteinfabriken. Universell, in jeder Zelle jedes
            Organismus — ein starker Hinweis darauf, wie alt sie sind.
          </li>
          <li>
            <strong>Mitochondrien</strong> — verbrennen Glucose mit Sauerstoff zu ATP.
          </li>
          <li>
            <strong>Chloroplasten</strong> — fangen Licht ein, um Zucker zu bauen. Nur Pflanzen.
          </li>
          <li>
            <strong>Zellwand</strong> und eine große <strong>Vakuole</strong> — Pflanzen (und, mit
            anderer Chemie, Bakterien und Pilze). Die Wand verhindert, dass die Zelle platzt.
          </li>
        </ul>

        <div className="callout note">
          <span className="co-title">Mitochondrien waren einmal Bakterien</span>
          <p>
            Mitochondrien und Chloroplasten haben eigene ringförmige DNA, eigene Ribosomen und eine
            Doppelmembran, und sie teilen sich nach eigenem Zeitplan. Der Grund: Sie{" "}
            <em>waren</em> frei lebende Bakterien, verschluckt und behalten statt verdaut —
            Endosymbiose. Deine Zellen sind eine Fusion, und die mitochondriale DNA, die du trägst,
            stammt ausschließlich von deiner Mutter.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Zell-Erkunder",
      intro: (
        <>
          <p>Drei Zelltypen, aufgeschnitten. Klicke jedes Teil an, um zu erfahren, was es tut.</p>
          <ul>
            <li>Beginne mit der Tierzelle und finde den Zellkern, dann wechsle zur Bakterienzelle — der Kern ist schlicht weg.</li>
            <li>Nur die Pflanzenzelle hat Wand und Chloroplast zugleich. Beides erklärt etwas, das man von außen sieht.</li>
            <li>Ribosomen stecken in allen dreien. Das ist ein Hinweis darauf, was zuerst da war.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was ist die schärfste Aussage der Zelltheorie?",
        choices: [
          "Zellen bestehen aus Molekülen",
          "Jede Zelle entsteht aus einer bereits existierenden Zelle",
          "Alle Zellen haben einen Zellkern",
          "Zellen sind unter jedem Mikroskop sichtbar",
        ],
        answer: 1,
        explain:
          "Sie schließt Urzeugung aus. Jede heute lebende Zelle ist das Ende einer ununterbrochenen Kette von Teilungen — kein Glied darin war jemals unbelebt.",
      },
      {
        q: "Was trennt einen Prokaryoten wirklich von einem Eukaryoten?",
        choices: [
          "Allein die Größe",
          "Prokaryoten haben keinen membranumhüllten Zellkern; ihre DNA liegt frei im Zytoplasma",
          "Prokaryoten haben keine DNA",
          "Eukaryoten haben keine Ribosomen",
        ],
        answer: 1,
        explain:
          "Der entscheidende Unterschied ist die Abteilung in Kompartimente. Prokaryoten halten ein einziges ringförmiges Chromosom frei im Zytoplasma und haben keine membranumhüllten Organellen.",
      },
      {
        q: "Welche Struktur findet sich in Tier-, Pflanzen- UND Bakterienzellen?",
        choices: ["Zellkern", "Chloroplast", "Ribosom", "Zellwand"],
        answer: 2,
        explain:
          "Ribosomen sind universell — jeder Organismus baut Proteine auf dieselbe Weise. Diese Universalität ist ein Beleg für gemeinsame Abstammung.",
      },
      {
        q: "Warum haben Mitochondrien eigene DNA und eine Doppelmembran?",
        choices: [
          "Um Ersatzgene zu speichern",
          "Es ist eine zufällige Eigenheit ohne Erklärung",
          "Weil sie der älteste Teil des Zellkerns sind",
          "Weil sie von frei lebenden Bakterien abstammen, die verschluckt und behalten wurden",
        ],
        answer: 3,
        explain:
          "Endosymbiose. Sie behalten ringförmige DNA und eigene Ribosomen, weil sie einst eigenständige Organismen waren — und beim Menschen werden sie nur von der Mutter vererbt.",
      },
      {
        q: "Ein Virus trägt Gene und evolviert. Warum zählt es meist trotzdem nicht als lebendig?",
        choices: [
          "Es hat weder DNA noch RNA",
          "Es ist zu klein, um es zu sehen",
          "Es hat keine Zelle und kann ohne gekaperte Wirtszelle weder Stoffwechsel betreiben noch sich vermehren",
          "Es verändert sich nicht über Generationen",
        ],
        answer: 2,
        explain:
          "Es scheitert am Zell-Kriterium und hat keinen eigenen Stoffwechsel. Viren sitzen unbequem auf der Grenze — genau deshalb ist die Grenze so schwer zu ziehen.",
      },
    ],
  },

  /* ================================================================ */
  membrane: {
    Theory: () => (
      <>
        <h2>Eine Wand, die sich selbst baut</h2>
        <p>
          Die Zellmembran besteht aus <strong>Phospholipiden</strong>: Molekülen mit einem
          wasserliebenden Phosphatkopf und zwei wasserscheuen Fettschwänzen. Wirf sie ins Wasser
          und sie ordnen sich von selbst — Köpfe nach außen zum Wasser auf beiden Seiten, Schwänze
          versteckt in der Mitte. Das Ergebnis ist eine <strong>Doppelschicht</strong>, zwei
          Moleküle dick, und niemand muss sie zusammenbauen. Sie entsteht, weil jede andere
          Anordnung die Schwänze dem Wasser aussetzen würde.
        </p>
        <p>
          Das ist dieselbe „Gleiches löst Gleiches“-Logik, die Catalyst bei den zwischenmolekularen
          Kräften behandelt — angewandt auf die folgenreichste Struktur der Biologie. Starr ist die
          Membran übrigens nicht: Die Lipide driften seitlich aneinander vorbei wie Menschen in
          einer Menge, mit Proteinen, die dazwischen schwimmen. Daher der Name des Standardbilds —
          das <strong>Flüssig-Mosaik-Modell</strong>.
        </p>

        <h2>Was durchkommt — und was nicht</h2>
        <p>
          Die ölige Mitte ist der Filter. Klein und unpolar kommt leicht durch; groß oder geladen
          nicht:
        </p>
        <table>
          <thead>
            <tr>
              <th>Passiert frei</th>
              <th>Braucht Hilfe</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>O₂, CO₂, N₂ (klein, unpolar)</td>
              <td>Glucose und Aminosäuren (groß, polar)</td>
            </tr>
            <tr>
              <td>Wasser — langsam, und schnell durch Aquaporine</td>
              <td>Na⁺, K⁺, Cl⁻ (geladen — die Schwänze stoßen sie ab)</td>
            </tr>
          </tbody>
        </table>
        <p>
          Die Membran ist also <strong>selektiv permeabel</strong> — und was sie blockiert, ist
          genau das, was die Zelle kontrollieren will.
        </p>

        <h2>Drei Wege hinüber</h2>
        <p>
          <strong>Diffusion</strong> — Moleküle bewegen sich zufällig und verteilen sich so von
          dort, wo sie gedrängt sind, dorthin, wo sie es nicht sind. Es kostet keine Energie: Die
          Zelle nutzt nur aus, dass Zufallsbewegung Unterschiede ausgleicht. So kommt Sauerstoff
          hinein und CO₂ hinaus.
        </p>
        <p>
          <strong>Erleichterte Diffusion</strong> — immer noch das Gefälle hinab, immer noch
          gratis, aber durch einen Proteinkanal, weil das Molekül das Öl nicht durchqueren kann.
          Glucose gelangt so in deine Zellen.
        </p>
        <p>
          <strong>Aktiver Transport</strong> — <em>bergauf</em>, von niedriger zu hoher
          Konzentration. Das passiert nie von allein und kostet deshalb ATP. Die
          Natrium-Kalium-Pumpe wirft pro ATP 3 Na⁺ hinaus und holt 2 K⁺ herein — den ganzen Tag, in
          jeder deiner Zellen. Man schätzt, dass sie etwa ein Fünftel deiner Ruheenergie
          verbraucht, und sie ist der Grund, warum deine Nerven überhaupt feuern können.
        </p>

        <h2>Osmose — und warum sie beim Abendessen zählt</h2>
        <p>
          <strong>Osmose</strong> ist schlicht Diffusion von Wasser durch eine selektiv permeable
          Membran — aber formuliert über den gelösten Stoff, denn den kann man kontrollieren:
          Wasser wandert zu der Seite mit <em>mehr gelöstem Zeug</em>.
        </p>
        <div className="formula">
          Wasser wandert von verdünnt → konzentriert
          <span className="note">
            hypotonisch = außen verdünnter · isotonisch = gleich · hypertonisch = außen konzentrierter
          </span>
        </div>
        <p>
          Setze eine Tierzelle in reines Wasser, und Wasser strömt hinein, bis die Membran
          versagt — <strong>Lyse</strong>. Setze sie in starke Salzlake, und sie schrumpelt. Dein
          Blut wird genau deshalb isotonisch gehalten, und eine Kochsalzinfusion wird passend
          gemischt statt pur gegeben.
        </p>
        <p>
          Eine Pflanzenzelle hat eine Wand und kann deshalb nicht platzen: Sie schwillt an, bis die
          Wand dagegenhält, und dieser Druck — der <strong>Turgor</strong> — ist es, was eine nicht
          verholzte Pflanze aufrecht hält. Trocknet sie aus, welkt die Pflanze. Salz auf eine
          Schnecke, Salz auf eine Auberginenscheibe, Salat, der im Dressing schlappmacht: jedes Mal
          dieselbe Physik.
        </p>
      </>
    ),
    lab: {
      title: "Die Osmose-Bank",
      intro: (
        <>
          <p>Eine Zelle, ein Regler: wie salzig es draußen ist.</p>
          <ul>
            <li>Zieh die Konzentration auf null — reines Wasser. Die Tierzelle platzt; wechsle zur Pflanzenzelle, und die Wand rettet sie.</li>
            <li>Finde den isotonischen Punkt, an dem sich die Pfeile ausgleichen und netto nichts fließt.</li>
            <li>Stell 0,9 M ein und sieh zu, wie die Pflanzenzelle plasmolysiert — die Membran löst sich von der Wand.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Warum bildet sich eine Phospholipid-Doppelschicht im Wasser von selbst?",
        choices: [
          "Proteine bauen sie zusammen",
          "Die wasserscheuen Schwänze werden zusammengedrängt, sodass die Köpfe zum Wasser zeigen",
          "Kovalente Bindungen zwischen den Schichten halten sie zusammen",
          "Elektrische Anziehung zwischen den beiden Lagen",
        ],
        answer: 1,
        explain:
          "Es ist der hydrophobe Effekt: Jede Anordnung, die die Fettschwänze dem Wasser aussetzt, ist energetisch ungünstiger — also entsteht die Doppelschicht spontan.",
      },
      {
        q: "Welches Molekül überquert die Membran OHNE Hilfe?",
        choices: ["Glucose", "Na⁺", "Sauerstoff", "Ein Protein"],
        answer: 2,
        explain:
          "Sauerstoff ist klein und unpolar und schlüpft durch den öligen Kern. Glucose ist zu polar, Ionen werden regelrecht abgestoßen — beide brauchen Proteine.",
      },
      {
        q: "Was unterscheidet aktiven Transport von Diffusion?",
        choices: [
          "Er bewegt Stoffe ihr Konzentrationsgefälle hinauf und kostet ATP",
          "Er ist schneller",
          "Er funktioniert nur für Wasser",
          "Er braucht keine Proteine",
        ],
        answer: 0,
        explain:
          "Diffusion läuft das Gefälle hinab, gratis. Der Weg in die Gegenrichtung ist nicht spontan und muss bezahlt werden — die Na⁺/K⁺-Pumpe ist das klassische Beispiel.",
      },
      {
        q: "Ein rotes Blutkörperchen kommt in reines Wasser. Was passiert, und warum?",
        choices: [
          "Es schrumpelt — Wasser verlässt es",
          "Es schwillt an und kann platzen — Wasser strömt hinein, zur höheren Konzentration im Inneren",
          "Nichts — Zellen sind dicht",
          "Es teilt sich",
        ],
        answer: 1,
        explain:
          "Reines Wasser ist gegenüber dem Zellinhalt hypotonisch, also strömt Wasser hinein. Ohne Zellwand versagt irgendwann die Membran: Lyse.",
      },
      {
        q: "Warum erholt sich eine welke Pflanze beim Gießen, und wie heißt der Druck?",
        choices: [
          "Osmose füllt die Vakuolen, und die Zellen drücken gegen ihre Wände — Turgor",
          "Die Wand wächst nach",
          "Wasser macht die Zellwand durch Gefrieren starr",
          "Aktiver Transport pumpt Luft hinein",
        ],
        answer: 0,
        explain:
          "Wasser strömt per Osmose ein, die Vakuole füllt sich, und die Zelle drückt nach außen gegen ihre Wand. Dieser Turgordruck hält eine nicht verholzte Pflanze aufrecht.",
      },
    ],
  },

  /* ================================================================ */
  enzymes: {
    Theory: () => (
      <>
        <h2>Das Problem: Alles ist zu langsam</h2>
        <p>
          Die Reaktionen, die dich am Leben halten, sind thermodynamisch völlig in Ordnung — sie
          setzen Energie frei und würden von allein ablaufen. Das Problem ist das <em>Wann</em>.
          Sich selbst überlassen, bräuchte der Zucker in deinem Blut bei 37 °C Jahre, um mit
          Sauerstoff zu reagieren, denn die Moleküle müssen erst über einen Energieberg gestoßen
          werden: die <strong>Aktivierungsenergie</strong>.
        </p>
        <p>
          Die übliche Antwort der Chemie ist Hitze, die Zusammenstöße härter und häufiger macht.
          Dir steht sie nicht zur Verfügung: Erhöhe deine Körpertemperatur um fünfzehn Grad, und du
          stirbst, lange bevor die Reaktion nennenswert schneller wird. Die Antwort der Biologie
          ist ein <strong>Katalysator</strong> — etwas, das den Berg absenkt, statt die Energie zu
          erhöhen. Biologische Katalysatoren heißen <strong>Enzyme</strong>, und fast alle sind
          Proteine.
        </p>
        <div className="formula">
          Enzym + Substrat → Enzym-Substrat-Komplex → Enzym + Produkt
          <span className="note">das Enzym ist am Ende unverändert und macht sofort weiter</span>
        </div>
        <p>
          Die Zahlen sind verblüffend. Katalase, die das Wasserstoffperoxid abbaut, das deine
          Zellen als Abfall produzieren, schafft Millionen Moleküle pro Sekunde und Enzym. Leg
          Leber auf Supermarkt-Peroxid, und es schäumt wie eine geschüttelte Flasche — das ist ein
          einziges Enzym bei voller Geschwindigkeit.
        </p>

        <h2>Form ist Funktion</h2>
        <p>
          Ein Enzym ist ein Protein, gefaltet in eine bestimmte dreidimensionale Form, und
          irgendwo darauf sitzt eine Tasche, das <strong>aktive Zentrum</strong>, deren Konturen zu
          genau einem Substrat passen. Diese Passung macht Enzyme <strong>spezifisch</strong>:
          Lactase verdaut Lactose und sonst nichts — weshalb das Enzym in einer
          Laktoseintoleranz-Tablette nicht gleich dein ganzes Abendessen mitverdaut.
        </p>
        <p>
          Das alte Bild war ein starres Schloss mit Schlüssel. Das bessere ist die{" "}
          <strong>induzierte Passung (Induced Fit)</strong>: Das Zentrum ist flexibel und schließt
          sich um das ankommende Substrat, wobei es genau die Bindungen unter Spannung setzt, die
          brechen sollen. Das Enzym ist kein passives Loch — es verformt sein Ziel aktiv.
        </p>

        <h2>Was die Geschwindigkeit verändert</h2>
        <p>
          <strong>Substratkonzentration.</strong> Mehr Substrat bedeutet mehr Zusammenstöße mit
          aktiven Zentren, also steigt die Rate — aber nur, bis jedes Enzym dauerhaft beschäftigt
          ist. Danach bringt mehr Substrat nichts: Das Enzym ist <strong>gesättigt</strong>, die
          Rate hat ihre Decke erreicht. (Exakt die Logik des limitierenden Edukts aus Catalyst,
          mit dem Enzym als Grenze.)
        </p>
        <p>
          <strong>Temperatur.</strong> Wärmer heißt schneller — bis zu einem Optimum, beim
          Menschen um 37 °C. Darüber flacht die Rate nicht bloß ab, sie <em>bricht ein</em>. Die
          Hitze schüttelt das Protein auseinander: Die Faltung löst sich, das aktive Zentrum
          verliert seine Form, und da die Form die Funktion war, ist das Enzym erledigt. Das ist{" "}
          <strong>Denaturierung</strong>, und sie ist meist unumkehrbar — genau das siehst du, wenn
          Eiweiß von klar zu fest-weiß wird und nie wieder zurück.
        </p>
        <p>
          <strong>pH.</strong> Dieselbe Geschichte, andere Ursache: Extreme pH-Werte verändern die
          Ladungen der Aminosäuren, die die Faltung zusammenhalten. Die meisten menschlichen Enzyme
          mögen pH ≈ 7, aber Pepsin in deinem Magen ist für pH 2 gebaut und stellt die Arbeit ein,
          sobald es den Darm erreicht.
        </p>
        <div className="callout warn">
          <span className="co-title">„Denaturiert“ heißt nicht „zerstört“</span>
          <p>
            Ein denaturiertes Protein hat seine <em>Form</em> verloren, nicht seine
            Aminosäuresequenz — die Kette ist intakt, nur nicht mehr richtig gefaltet. Dieser
            Unterschied wird in der nächsten Einheit wichtig: Die Sequenz ist das, was die DNA
            vorgibt, und die Faltung folgt aus der Sequenz. Wer das Ei kocht, hat nicht das Gen
            editiert.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Enzym-Bank",
      intro: (
        <>
          <p>Drei Regler, ein Enzym. Die Kurve rechts zeigt Rate gegen Substrat.</p>
          <ul>
            <li>Erhöhe das Substrat bei sonst optimalen Bedingungen. Die Kurve flacht ab — das ist Sättigung, kein Fehler.</li>
            <li>Treib die Temperatur über 55 °C und sieh zu, wie die Faltung zerfällt. Abkühlen hilft danach nicht mehr.</li>
            <li>Verschiebe den pH von 7 weg, in beide Richtungen. Beide Extreme kosten dich auf dieselbe Weise.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Enzym setzt 6,0 × 10⁵ Substratmoleküle pro Sekunde um. Wie viele schafft ein einzelnes Enzym in einer Minute?",
        answer: 3.6e7,
        unit: "Moleküle",
        tolerancePct: 2,
        hint: "Mit 60 multiplizieren.",
        explain: "6,0 × 10⁵ × 60 = 3,6 × 10⁷ Moleküle pro Minute — von einem einzigen Enzym.",
      },
      {
        prompt:
          "Eine Reaktion dauert ohne Enzym 2,0 Jahre und mit Enzym 0,20 Sekunden. Um welchen Faktor beschleunigt das Enzym sie? (1 Jahr = 3,15 × 10⁷ s)",
        answer: 3.15e8,
        unit: "mal",
        tolerancePct: 5,
        hint: "2 Jahre in Sekunden umrechnen, dann durch 0,20 s teilen.",
        explain: "2 × 3,15 × 10⁷ = 6,3 × 10⁷ s; geteilt durch 0,20 s ergibt etwa 3,2 × 10⁸-fach schneller.",
      },
    ],
    quiz: [
      {
        q: "Was macht ein Enzym tatsächlich mit einer Reaktion?",
        choices: [
          "Es liefert die Energie, die die Reaktion braucht",
          "Es macht eine unmögliche Reaktion möglich",
          "Es senkt die Aktivierungsenergie, sodass die Reaktion bei Körpertemperatur weit schneller abläuft",
          "Es erhöht örtlich die Temperatur",
        ],
        answer: 2,
        explain:
          "Enzyme sind Katalysatoren: Sie senken den Berg, nicht die Energiedifferenz. Eine Reaktion, die gar nicht liefe, läuft weiterhin nicht — sie kommt nur viel früher an, wenn sie liefe.",
      },
      {
        q: "Warum ist jedes Enzym spezifisch für ein Substrat?",
        choices: [
          "Sein aktives Zentrum hat eine Form, in die nur dieses Substrat passt",
          "Jedes Enzym hat eine andere Größe",
          "Enzyme tragen ein Erkennungsetikett",
          "Sind sie nicht — Enzyme arbeiten mit allem",
        ],
        answer: 0,
        explain:
          "Die dreidimensionalen Konturen des aktiven Zentrums passen zu einem Substrat und schließen sich bei dessen Ankunft darum (induzierte Passung). Die Form ist die Spezifität.",
      },
      {
        q: "Substrat wird zugegeben, bis die Rate nicht mehr steigt. Warum stoppt sie?",
        choices: [
          "Das Substrat ist aufgebraucht",
          "Jedes aktive Zentrum ist besetzt — die Enzyme sind gesättigt",
          "Das Enzym denaturiert",
          "Der pH ändert sich",
        ],
        answer: 1,
        explain:
          "Bei Sättigung ist das Enzym, nicht das Substrat, der begrenzende Faktor. Mehr Substrat hilft erst wieder, wenn mehr Enzym dazukommt.",
      },
      {
        q: "Oberhalb des Temperaturoptimums bricht die Rate ein, statt abzuflachen. Warum?",
        choices: [
          "Das Substrat verdampft",
          "Hitze kehrt die Reaktion um",
          "Das Enzym wird schneller verbraucht",
          "Das Protein entfaltet sich, und das aktive Zentrum verliert die Form, die es funktionieren ließ",
        ],
        answer: 3,
        explain:
          "Denaturierung. Die Faltung — von relativ schwachen Wechselwirkungen gehalten — zerfällt, und da Form gleich Funktion ist, stoppt das Enzym. Beim Abkühlen erholt es sich meist nicht.",
      },
      {
        q: "Pepsin arbeitet im Magen bei pH 2, im Dünndarm aber nicht mehr. Warum?",
        choices: [
          "Ihm geht das Substrat aus",
          "Sein Optimum liegt um pH 2, und der fast neutrale pH des Darms zerstört die Faltung",
          "Es wird von der Säure verdaut",
          "Der Darm ist kälter",
        ],
        answer: 1,
        explain:
          "Jedes Enzym hat ein pH-Optimum. pH verändert die Ladungen, die die Faltung zusammenhalten — weit weg vom Optimum kostet es das Enzym Form und Aktivität.",
      },
    ],
  },
};
