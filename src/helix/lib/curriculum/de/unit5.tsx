import type { LessonContentDe } from "../localize";

export const unit5De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "natural-selection": {
    Theory: () => (
      <>
        <h2>Das Argument, in vier Schritten</h2>
        <p>
          Darwins Mechanismus ist nicht kompliziert. Er ist die logische Konsequenz aus vier
          Dingen, die einzeln offensichtlich wahr sind:
        </p>
        <ol>
          <li>
            <strong>Variation.</strong> Individuen einer Population unterscheiden sich — in Größe,
            Farbe, Tempo, Krankheitsresistenz. (Einheit 2 hat erklärt, woher das kommt: Mutation,
            plus meiotisches Mischen.)
          </li>
          <li>
            <strong>Erblichkeit.</strong> Vieles dieser Variation wird an Nachkommen weitergegeben.
            (Einheit 4.)
          </li>
          <li>
            <strong>Überproduktion.</strong> Jede Art produziert weit mehr Nachkommen, als
            überleben können. Ein einzelner Kabeljau legt Millionen Eier; die Population explodiert
            nicht — also stirbt fast alles davon.
          </li>
          <li>
            <strong>Unterschiedliches Überleben.</strong> Wer stirbt, ist nicht völlig zufällig.
            Merkmale, die in <em>dieser</em> Umwelt helfen, machen Überleben und Fortpflanzung
            wahrscheinlicher.
          </li>
        </ol>
        <p>
          Gib diese vier zu, und die Schlussfolgerung ist zwingend: Hilfreiche Varianten werden in
          jeder Generation häufiger, und über genug Generationen verändert sich die Population.
          Das ist <strong>natürliche Selektion</strong>. Sie braucht keine Voraussicht, kein Ziel
          und kein Eingreifen — nur die vier Tatsachen oben.
        </p>

        <h2>Was Selektion nicht ist</h2>
        <p>Hier führt die Intuition fast jeden in die Irre — also in aller Deutlichkeit:</p>
        <p>
          <strong>Individuen evolvieren nicht. Populationen tun es.</strong> Ein heller Käfer wird
          nicht dunkler, weil die Rinde dunkel ist. Er wird gefressen. Die <em>Population</em>{" "}
          verschiebt sich, weil die hellen weniger Nachkommen hinterlassen — jedes Individuum
          bleibt exakt so gefärbt, wie es geboren wurde.
        </p>
        <p>
          <strong>Organismen bemühen sich nicht.</strong> Giraffen bekamen keine langen Hälse, weil
          sie sich nach Blättern streckten und das Gestreckte vererbten — das ist Lamarcks Version,
          und sie ist falsch. Giraffen variierten in der Halslänge; die langhalsigeren fraßen
          besser und hinterließen mehr Nachkommen. Die Mutationen kamen zuerst, blind — die Umwelt
          sortierte danach.
        </p>
        <p>
          <strong>„Fitness“ ist nicht Stärke.</strong> Sie bedeutet Fortpflanzungserfolg in einer
          bestimmten Umwelt, nichts weiter. Ein langsamer, schwacher, unscheinbarer Organismus, der
          mehr überlebende Nachkommen hinterlässt, ist fitter als ein schneller, starker,
          spektakulärer, der weniger hinterlässt.
        </p>
        <p>
          <strong>Es gibt keine Richtung und keinen Fortschritt.</strong> Ein Merkmal, das jetzt
          vorteilhaft ist, kann tödlich werden, wenn die Umwelt kippt. Höhlenfische verloren ihre
          Augen; Parasiten verloren ganze Organsysteme. Selektion hat kein Gedächtnis und keinen
          Plan.
        </p>

        <h2>Man kann dabei zusehen</h2>
        <p>Evolution ist nicht auf Erdzeitalter beschränkt. Sie ist beobachtbar — und zwar unbequem:</p>
        <ul>
          <li>
            <strong>Antibiotikaresistenz.</strong> In jeder großen Bakterienpopulation tragen ein
            paar zufällig eine Resistenzmutation. Das Antibiotikum tötet den Rest und überlässt den
            Resistenten den Patienten. Darum zählt es, eine Kur zu Ende zu nehmen — und darum ist
            Resistenz inzwischen ein ernstes klinisches Problem.
          </li>
          <li>
            <strong>Birkenspanner.</strong> Als Industrieruß englische Baumrinde schwärzte, wurde
            die dunkle Form binnen Jahrzehnten von selten zu dominant; nach den
            Luftreinhaltegesetzen kehrte die helle zurück. Die Falter änderten sich nie. Die
            Anteile taten es.
          </li>
          <li>
            <strong>Pestizidresistenz</strong> bei Insekten und <strong>Herbizidresistenz</strong>{" "}
            bei Unkräutern — derselbe Prozess, in der Landwirtschaft alle paar Jahre wiederholt.
          </li>
        </ul>

        <div className="callout tip">
          <span className="co-title">Warum die Design-Intuition so stark ist</span>
          <p>
            Ein Auge sieht entworfen aus, weil es zu seiner Aufgabe passt. Aber Selektion erzeugt
            genau diesen Anschein ohne Entwerfer — indem sie über Millionen Generationen behält,
            was minimal besser funktionierte. Verräterisch sind die Mängel: Deine Netzhaut ist
            verkehrt herum verdrahtet, mit den Nerven vor den lichtempfindlichen Zellen und einem
            blinden Fleck an ihrer Austrittsstelle. Kein Konstrukteur täte das. Eine Anhäufung
            brauchbarer kleiner Änderungen schon — und hat es getan.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Selektion, live",
      intro: (
        <>
          <p>Sechzig Käfer auf einem Untergrund. Drück „nächste Generation“ und sieh zu.</p>
          <ul>
            <li>Die Population wandert zur Untergrund-Färbung. Kein einzelner Käfer wechselt je die Farbe.</li>
            <li>Setz den Selektionsdruck auf null. Der Mittelwert irrt ziellos umher — das ist Drift, nicht Selektion.</li>
            <li>Lass sie sich anpassen, dann verschiebe den Untergrund abrupt. Eine gut angepasste Population ist über Nacht schlecht angepasst.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was gehört NICHT zu den vier Voraussetzungen der natürlichen Selektion?",
        choices: [
          "Variation zwischen Individuen",
          "Dass diese Variation erblich ist",
          "Dass Organismen sich zu verbessern versuchen",
          "Mehr Nachkommen, als überleben können",
        ],
        answer: 2,
        explain:
          "Bemühen spielt keine Rolle. Variation, Erblichkeit, Überproduktion und unterschiedliches Überleben genügen für sich allein.",
      },
      {
        q: "Eine Käferpopulation wird über 20 Generationen dunkler. Was ist passiert?",
        choices: [
          "Einzelne Käfer dunkelten nach, um zur Rinde zu passen",
          "Dunklere Käfer überlebten und vermehrten sich stärker, also stieg ihr Anteil",
          "Die Käfer wählten zur Tarnung dunklere Partner",
          "Die Rinde veränderte die DNA der Käfer",
        ],
        answer: 1,
        explain:
          "Individuen ändern sich nicht. Die Zusammensetzung der Population verschiebt sich, weil manche Varianten mehr Nachkommen hinterlassen als andere.",
      },
      {
        q: "„Fitness“ bedeutet in der Evolution…",
        choices: [
          "Körperliche Stärke",
          "Schnelligkeit und Wendigkeit",
          "Gesundheit und langes Leben",
          "Fortpflanzungserfolg in einer bestimmten Umwelt",
        ],
        answer: 3,
        explain:
          "Nur Nachkommen zählen. Ein unscheinbarer, langsamer Organismus mit mehr Nachwuchs ist fitter als ein spektakulärer mit weniger.",
      },
      {
        q: "Warum breitet sich Antibiotikaresistenz aus?",
        choices: [
          "Bakterien lernen, dem Medikament zu widerstehen",
          "Das Antibiotikum verursacht die Resistenzmutationen",
          "Einige Bakterien tragen die Resistenz schon vorher — wer den Rest tötet, überlässt ihnen die Vermehrung",
          "Bakterien teilen das Medikament unter sich auf",
        ],
        answer: 2,
        explain:
          "Die Variation existiert vorher. Das Antibiotikum ist der Selektionsfaktor, nicht die Ursache der Mutation — ein Lehrbuchfall von Selektion in Echtzeit.",
      },
      {
        q: "Warum ist die verkehrt herum verdrahtete Netzhaut der Wirbeltiere ein Beleg für Evolution?",
        choices: [
          "Sie zeigt, dass das Auge schlecht gebaut ist",
          "Sie ist genau das brauchbare-aber-unperfekte Ergebnis, das man von angehäuften kleinen Änderungen erwartet — nicht von Design",
          "Sie beweist, dass Augen zweimal entstanden",
          "Sie hat mit Evolution nichts zu tun",
        ],
        answer: 1,
        explain:
          "Selektion kann nicht von vorn anfangen; sie kann nur ändern, was schon da ist. Solche Zwänge sind eine Signatur von Geschichte, nicht von Planung.",
      },
    ],
  },

  /* ================================================================ */
  evidence: {
    Theory: () => (
      <>
        <h2>Drei unabhängige Linien</h2>
        <p>
          Über jede einzelne Beweislinie lässt sich streiten. Der Grund, warum die gemeinsame
          Abstammung in der Biologie nicht ernsthaft umstritten ist: Mehrere völlig unabhängige
          Methoden liefern <em>denselben</em> Stammbaum — und sie hatten jede Gelegenheit, es
          nicht zu tun.
        </p>

        <h3>1. Fossilien</h3>
        <p>
          Der Befund ist lückig — Fossilisation ist selten und braucht besondere Bedingungen —,
          aber er ist geordnet. Nichts erscheint außer der Reihe: keine Kaninchen im Präkambrium,
          keine Blütenpflanzen unter den ersten Landpflanzen. Und Übergangsformen tauchen genau
          dort auf, wo die Theorie zu graben empfiehlt. <em>Tiktaalik</em> wurde 2004 gefunden —
          nach gezielter Suche in 375 Millionen Jahre altem Gestein, ausgewählt, weil dort ein
          Zwischenglied zwischen Fisch und Landwirbeltier liegen musste. Es hatte Kiemen und
          Flossen — und außerdem einen Hals, einen flachen Schädel und Handwurzelknochen.
        </p>

        <h3>2. Anatomie</h3>
        <p>
          Ein Menschenarm, eine Walflosse, ein Fledermausflügel und ein Pferdebein erledigen völlig
          verschiedene Aufgaben — und enthalten doch dieselben Knochen in derselben Anordnung: ein
          Oberarmknochen, zwei Unterarmknochen, ein Bündel Handwurzelknochen, fünf Finger. Das sind{" "}
          <strong>homologe Strukturen</strong> — derselbe ererbte Bauplan, abgewandelt. Es gibt
          keinen technischen Grund, warum eine Schwimm- und eine Flugextremität dasselbe Skelett
          teilen sollten; es gibt einen offensichtlichen historischen.
        </p>
        <p>
          <strong>Rudimente</strong> machen den Punkt noch schärfer: Überbleibsel ohne heutige
          Funktion. Wale und Pythons tragen verkümmerte Hüft- und Beinknochen. Flugunfähige Vögel
          haben Flügel. Du hast einen Blinddarmfortsatz, ein Steißbein und Muskeln zum Bewegen von
          Ohren, die du nicht bewegen kannst.
        </p>

        <h3>3. Moleküle</h3>
        <p>
          Das ist die stärkste Linie — und die jüngste. Vergleiche dasselbe Protein oder Gen über
          Arten hinweg und zähle die Unterschiede. Je mehr Unterschiede, desto länger liegt die
          Trennung der Linien zurück — und der entstehende Baum deckt sich mit dem aus Fossilien
          und Anatomie, obwohl er aus völlig anderen Daten stammt.
        </p>
        <p>
          Cytochrom c, ein Atmungsprotein in fast allem Lebendigen, unterscheidet sich von der
          menschlichen Version um 0 % beim Schimpansen, etwa 12 % beim Pferd, 21 % beim Thunfisch
          und 45 % bei der Hefe. Diese Reihenfolge ist exakt die Fossil-Reihenfolge. Niemand hat
          sie so arrangiert.
        </p>
        <div className="formula">
          mehr Sequenzunterschied ⇒ längere Zeit seit der Trennung der Linien
          <span className="note">die molekulare Uhr — die Grundlage des Baums im Labor dieser Lektion</span>
        </div>
        <p>
          Und erinnere dich an Einheit 2: Der genetische Code selbst ist praktisch allem Leben
          gemeinsam. Eine willkürliche Nachschlagetabelle, identisch in Bakterien, Eichen und dir,
          ist kaum anders zu erklären denn als Erbe eines gemeinsamen Vorfahren, der sie bereits
          benutzte.
        </p>

        <h2>Artbildung: Wie aus einer Linie zwei werden</h2>
        <p>
          Arten spalten sich, wenn Populationen aufhören, sich zu kreuzen. Meist trennt sie eine
          physische Barriere — ein Fluss, der seinen Lauf ändert, ein wachsendes Gebirge, ein paar
          auf eine Insel verwehte Vögel. Die isolierten Populationen sammeln dann verschiedene
          Mutationen und stehen unter verschiedener Selektion — und nach genug Auseinanderdriften
          können sie selbst bei Wiedervereinigung keine fruchtbaren Nachkommen mehr zeugen. Es sind
          jetzt zwei Arten.
        </p>
        <p>
          Darwins Finken sind das Standardbeispiel: eine Gründerpopulation über die
          Galápagos-Inseln verteilt, Schnabelformen passend zu verschiedener Nahrung — und heute
          keine Kreuzung mehr zwischen ihnen.
        </p>

        <div className="callout note">
          <span className="co-title">Der Test, der hätte scheitern können</span>
          <p>
            Als in den 1950ern die Proteinsequenzierung aufkam, hätte sie einen Baum liefern
            können, der einem Jahrhundert vergleichender Anatomie widerspricht. Tat sie nicht. Jede
            spätere Methode — ganze Genome, retrovirale Einbauten, Pseudogene — hätte das Muster
            brechen können, und reproduzierte es stattdessen. Eine Theorie, die so viele
            unabhängige Gelegenheiten zu scheitern überstanden hat, hat sich ihren Platz verdient.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die molekulare Uhr",
      intro: (
        <>
          <p>Ein Protein, Cytochrom c, verglichen über acht Arten.</p>
          <ul>
            <li>Wähle den Schimpansen: null Unterschiede zum Menschen. Dann die Hefe: 45 %.</li>
            <li>Lies die Verzweigungspunkte ab. Sequenzunterschied und Trennungszeit steigen gemeinsam.</li>
            <li>Dieser Baum wurde allein aus Molekülen gebaut — und er deckt sich mit dem der Fossilien.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was macht Menschenarm und Fledermausflügel zu homologen Strukturen?",
        choices: [
          "Sie erfüllen dieselbe Funktion",
          "Sie entstanden unabhängig für den Flug",
          "Sie sind gleich groß",
          "Sie teilen dieselbe zugrunde liegende Knochenanordnung, ererbt von einem gemeinsamen Vorfahren",
        ],
        answer: 3,
        explain:
          "Gleicher Bauplan, andere Aufgaben. Gemeinsame Struktur trotz verschiedener Funktion deutet auf Vererbung — nicht auf technische Notwendigkeit.",
      },
      {
        q: "Was ist ein Rudiment?",
        choices: [
          "Eine Struktur, die noch im Bau ist",
          "Ein verkümmertes Überbleibsel mit wenig oder keiner heutigen Funktion, ererbt von einem Vorfahren, der es benutzte",
          "Eine Struktur, die nur in Fossilien vorkommt",
          "Eine Struktur, die nur bei Embryonen erscheint",
        ],
        answer: 1,
        explain:
          "Wal-Hüftknochen, Flügel flugunfähiger Vögel, dein Steißbein. Als Geschichte ergeben sie Sinn — als Design nicht.",
      },
      {
        q: "Cytochrom c weicht vom Menschen beim Pferd um 12 % ab, bei der Hefe um 45 %. Was zeigt das?",
        choices: [
          "Die Linien von Mensch und Hefe trennten sich weit früher als die von Mensch und Pferd",
          "Hefe ist primitiver",
          "Hefe hat einen schnelleren Stoffwechsel",
          "Das Protein hat in Hefe eine andere Aufgabe",
        ],
        answer: 0,
        explain:
          "Unterschiede sammeln sich mit der Zeit seit der Trennung an. Die molekulare Reihenfolge reproduziert die von Fossilien und Anatomie.",
      },
      {
        q: "Warum ist die Übereinstimmung von Fossil-, Anatomie- und Molekülbefund bedeutsam?",
        choices: [
          "Ist sie nicht — alle stammen aus derselben Theorie",
          "Es sind unabhängige Methoden, die leicht hätten widersprechen können — und es nicht taten",
          "Molekülbefunde werden aus Fossilien abgeleitet",
          "Sie zeigt, dass Fossilien überflüssig sind",
        ],
        answer: 1,
        explain:
          "Unabhängige Linien, die auf einen Baum zusammenlaufen, sind die stärkste Art wissenschaftlicher Stützung. Jede war eine echte Gelegenheit, die Theorie zu widerlegen.",
      },
      {
        q: "Wie spaltet sich eine Art typischerweise in zwei?",
        choices: [
          "Ein Individuum mutiert zu einer neuen Art",
          "Eine Art beschließt, sich zu spezialisieren",
          "Populationen werden isoliert, driften genetisch auseinander und können sich schließlich nicht mehr kreuzen",
          "Zwei Arten verschmelzen und trennen sich wieder",
        ],
        answer: 2,
        explain:
          "Isolation stoppt den Genfluss; getrennte Mutation und Selektion treiben die Populationen auseinander, bis die Fortpflanzungsfähigkeit miteinander verloren ist.",
      },
    ],
  },
};
