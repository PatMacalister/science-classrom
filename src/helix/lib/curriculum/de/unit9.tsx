import type { LessonContentDe } from "../localize";

export const unit9De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  pcr: {
    Theory: () => (
      <>
        <h2>Das Problem: zu wenig, um es zu sehen</h2>
        <p>
          Ein Haar vom Tatort, ein Tropfen uralten Knochens, ein Nasenabstrich früh in einer
          Infektion — jedes davon enthält vielleicht ein paar hundert Kopien der DNA, um die es
          geht. Kein Instrument der Welt weist das direkt nach. Schon die Erdbeer-Lektion
          brauchte die DNA von Millionen Zellen, nur um sichtbare Fäden zu bekommen. Was
          Forensik, Medizin und Archäologie brauchten, war ein Verstärker.
        </p>

        <h2>Die Lösung: Replikation ausleihen</h2>
        <p>
          Du kennst bereits eine Maschine, die DNA kopiert — die Replikation aus Einheit 2. Die{" "}
          <strong>Polymerase-Kettenreaktion</strong> setzt eine abgespeckte Version davon in ein
          Röhrchen und treibt sie mit nichts als Temperatur an, in drei Schritten im Kreis:
        </p>
        <ul>
          <li>
            <strong>95 °C — Denaturieren.</strong> Hitze bricht die Wasserstoffbrücken, und die
            Doppelhelix fällt in zwei Einzelstränge auseinander. (GC-reiche DNA mit ihren drei
            Brücken pro Paar hält am längsten durch — wieder Einheit 2.)
          </li>
          <li>
            <strong>55 °C — Anlagern.</strong> Zwei kurze synthetische DNA-Stücke,{" "}
            <strong>Primer</strong>, paaren sich an die Stränge, je einer auf jeder Seite der
            Zielregion. Primer sind das Adressetikett: Nur der Abschnitt zwischen ihnen wird
            kopiert.
          </li>
          <li>
            <strong>72 °C — Verlängern.</strong> Eine Polymerase baut, von den Primern
            startend, neue komplementäre Stränge. Wo eben ein Molekül war, sind jetzt zwei.
          </li>
        </ul>
        <p>
          Wiederholen. Jeder Zyklus dauert etwa neunzig Sekunden und{" "}
          <strong>verdoppelt</strong> die Zahl:
        </p>
        <div className="formula">
          Kopien = 2<sup>Zyklen</sup>
          <span className="note">30 Zyklen ≈ eine Milliarde Kopien aus einem einzigen Molekül</span>
        </div>

        <h2>Das Enzym aus der heißen Quelle</h2>
        <p>
          Ein Haken: 95&nbsp;°C zerstören gewöhnliche Enzyme — genau das hieß in Einheit 0.3
          Denaturierung, und die frühe PCR brauchte in jedem einzelnen Zyklus frische Polymerase
          von Hand. Die Lösung kam von einem Organismus, der 70&nbsp;°C behaglich findet:{" "}
          <em>Thermus aquaticus</em>, ein Bakterium aus den heißen Quellen des Yellowstone,
          dessen Polymerase („<strong>Taq</strong>“) die Hitze wegsteckt. Einmal hineingeben, und
          die ganze Reaktion läuft unbeaufsichtigt im Thermocycler auf der Laborbank.
        </p>

        <h2>Das Ergebnis sichtbar machen</h2>
        <p>
          Eine Milliarde Kopien ist immer noch unsichtbar, bis man sie sortiert. Die{" "}
          <strong>Gelelektrophorese</strong> nutzt eine Tatsache aus der Erdbeer-Extraktion: Das
          Phosphat-Rückgrat macht DNA negativ geladen. Zieht man sie mit einem elektrischen Feld
          durch ein Gel, schlüpfen kurze Fragmente schneller hindurch als lange, und jede Länge
          sammelt sich zu einer <strong>Bande</strong>. Richtige Länge, richtige Bande, hell
          genug zum Fotografieren — das ist ein positiver Test.
        </p>

        <div className="callout note">
          <span className="co-title">Erfunden auf einer Nachtfahrt</span>
          <p>
            Kary Mullis erzählte, die Idee habe ihn 1983 auf einem kalifornischen Highway
            getroffen, und er fuhr rechts ran, um die Arithmetik aufzukritzeln. Die Chemie war
            komplett bekannt; die Schleife war die Erfindung. Sie gewann 1993 den Nobelpreis und
            steckt seither unter jedem Corona-PCR-Test, jedem Vaterschaftstest und jedem
            Genomprojekt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Thermocycler",
      intro: (
        <>
          <p>Drei Temperaturen im Kreis, und eine Exponentialfunktion erledigt den Rest.</p>
          <ul>
            <li>Erhöhe die Zyklen Schritt für Schritt und beobachte die Kopienzahl — jeder Balken ist ×32 der vorige.</li>
            <li>Finde heraus, wie viele Zyklen ein Molekül bis zur Nachweisbarkeit (~10⁶ Kopien) braucht.</li>
            <li>Senke die Effizienz auf 85 %. Der Zinseszins arbeitet genauso hart gegen dich.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Wie viele Kopien existieren nach 10 PCR-Zyklen, ausgehend von einem DNA-Molekül bei 100 % Effizienz?",
        answer: 1024,
        unit: "Kopien",
        hint: "Jeder Zyklus verdoppelt die Zahl.",
        explain: "2¹⁰ = 1.024. Zehn weitere Zyklen multiplizieren mit einem weiteren Tausend — exponentielles Wachstum zu deinen Gunsten.",
      },
      {
        prompt:
          "Der Nachweis braucht etwa eine Million Kopien. Wie viele Verdopplungszyklen sind ab einem einzelnen Molekül nötig, um das zu überschreiten?",
        answer: 20,
        unit: "Zyklen",
        tolerancePct: 5,
        hint: "2¹⁰ ≈ tausend, also 2²⁰ ≈ …",
        explain: "2²⁰ = 1.048.576 — knapp über eine Million. Dreißig Zyklen geben eine Milliarde; die Maschine braucht keine Stunde.",
      },
    ],
    quiz: [
      {
        q: "Was legt fest, welcher DNA-Abschnitt vervielfältigt wird?",
        choices: [
          "Die Temperatur des Verlängerungsschritts",
          "Die Primer — kopiert wird nur zwischen ihren beiden Bindestellen",
          "Die Polymerase wählt die häufigste Sequenz",
          "Es wird immer das ganze Genom kopiert",
        ],
        answer: 1,
        explain:
          "Primer sind das Adressetikett. Entwirf sie so, dass sie dein Ziel flankieren, und die PCR ignoriert die restlichen 99,99…% der DNA im Röhrchen.",
      },
      {
        q: "Was passiert bei 95 °C, und warum funktioniert es?",
        choices: [
          "Die Stränge trennen sich — Hitze bricht die Wasserstoffbrücken zwischen den Basenpaaren",
          "Die Polymerase kopiert am schnellsten",
          "Die Primer binden",
          "Die DNA wird zerstört und neu aufgebaut",
        ],
        answer: 0,
        explain:
          "Denaturierung: Die beiden Stränge der Helix lassen los. Die kovalenten Rückgrate überstehen es; nur die A–T- und C–G-Paarung wird gelöst.",
      },
      {
        q: "Warum ist Taq-Polymerase aus einem Heiße-Quellen-Bakterium für die praktische PCR unverzichtbar?",
        choices: [
          "Sie kopiert DNA schneller als jedes andere Enzym",
          "Sie macht nie Kopierfehler",
          "Sie übersteht den 95-°C-Schritt, der gewöhnliche Enzyme denaturiert — einmal zugeben statt in jedem Zyklus",
          "Sie arbeitet ohne Primer",
        ],
        answer: 2,
        explain:
          "Ein Enzym, das kochende Hitze wegsteckt, machte aus einer mühsamen Handprozedur eine unbeaufsichtigte Schleife auf der Laborbank.",
      },
      {
        q: "Ungefähr wie viele Kopien macht 30 Zyklen aus einem Molekül?",
        choices: ["Dreißig", "Etwa tausend", "Etwa dreißigtausend", "Etwa eine Milliarde"],
        answer: 3,
        explain:
          "2³⁰ ≈ 1,07 × 10⁹. Verdopplung täuscht: Der letzte einzelne Zyklus erzeugt so viele Kopien wie alle neunundzwanzig davor zusammen.",
      },
      {
        q: "Warum bewegt sich DNA in der Gelelektrophorese überhaupt durchs Gel?",
        choices: [
          "Das Gel löst sie auf",
          "Ihr Phosphat-Rückgrat ist negativ geladen, also zieht ein elektrisches Feld daran",
          "Enzyme schieben sie voran",
          "Wärme lässt sie diffundieren",
        ],
        answer: 1,
        explain:
          "Dieselbe Rückgrat-Ladung, die du bei der Erdbeer-Extraktion mit Salz abgeschirmt hast, wird hier zum Griff für das elektrische Feld.",
      },
    ],
  },

  /* ================================================================ */
  crispr: {
    Theory: () => (
      <>
        <h2>Lesen war gelöst. Schreiben nicht.</h2>
        <p>
          In den 2000ern machten Sequenzierung und PCR das Lesen und Kopieren von DNA billig.
          Einen gewählten Buchstaben in einer lebenden Zelle zu ändern war eine andere Sache —
          die Werkzeuge der Zeit schnitten entweder an festen Sequenzen, die ihnen zufällig
          gefielen (Restriktionsenzyme), oder brauchten Monate Protein-Engineering, um neu
          gezielt zu werden. Was fehlte, war ein Schneidewerkzeug, das man{" "}
          <em>mit einer Adresse programmieren</em> kann.
        </p>

        <h2>Bakterien waren zuerst da</h2>
        <p>
          Die Antwort saß im Stoff der letzten Einheit. Auch Bakterien leiden unter Viren, und
          manche führen ein Archiv der überlebten Angreifer: kurze Stücke Viren-DNA, in das
          eigene Genom geklebt, in einer Region namens <strong>CRISPR</strong>. Das ist adaptive
          Immunität im Stil von Einheit 7, umgesetzt in einer einzigen Zelle — das Archiv ist das
          Gedächtnis. Es wird in kurze <strong>Guide-RNAs</strong> umgeschrieben, von denen sich
          jede in ein Protein namens <strong>Cas9</strong> lädt. Die Guide paart sich mit jeder
          DNA, die zu ihrer Sequenz passt — A mit T, C mit G, dieselbe Regel, die du seit
          Einheit 2 benutzt — und wenn alle ~20 Buchstaben stimmen, schneidet Cas9 beide Stränge.
        </p>
        <p>
          2012 zeigten Jennifer Doudna und Emmanuelle Charpentier die Pointe: Tausche die
          Guide-Sequenz, und Cas9 schneidet, wo <em>du</em> es willst. Eine programmierbare
          Schere, gezielt per Basenpaarung. Nobelpreis 2020.
        </p>

        <h2>Das eigentliche Editieren erledigt die Zelle</h2>
        <p>
          Cas9 schneidet nur. Was dann passiert, ist die zelleigene Reparaturmaschinerie — und es
          gibt zwei Wege:
        </p>
        <ul>
          <li>
            <strong>Schnell und schlampig:</strong> Die Schnittenden werden direkt verklebt,
            wobei oft ein paar Buchstaben verloren gehen oder dazukommen. Erinnere dich an die
            Mutations-Lektion: Eine Einfügung, die kein Vielfaches von drei ist, verschiebt das
            Leseraster und ruiniert das Gen. Schlampige Reparatur ist darum ein verlässlicher
            Weg, ein Gen <em>auszuschalten</em>.
          </li>
          <li>
            <strong>Langsam und treu:</strong> Gib neben Cas9 eine DNA-Vorlage dazu, und die
            Reparatur kopiert sie unter Umständen über den Bruch — und installiert exakt die
            Sequenz, die du geliefert hast. Das ist echtes Editieren: ein gewählter Buchstabe,
            absichtlich geändert.
          </li>
        </ul>

        <h2>Eine Sicherung gegen das Chaos: das PAM</h2>
        <p>
          Cas9 weigert sich zu schneiden, wenn der Treffer nicht neben einer kurzen Markierung
          sitzt (dem <strong>PAM</strong>, typischerweise <code>-NGG</code>) — eine Sicherung aus
          der Bakterienwelt, die ihr eigenes CRISPR-Archiv nicht zerlegen darf. Trotzdem wird
          eine Stelle, die 19 von 20 Buchstaben trifft, manchmal doch geschnitten. Diese{" "}
          <strong>Off-Target</strong>-Schnitte sind das zentrale Sicherheitsproblem des
          Genom-Editierens — und im Labor unten bekommst du ein Gefühl dafür, was genau sie
          sind.
        </p>

        <h2>Von heißen Quellen in Krankenhäuser</h2>
        <p>
          2023 wurde das erste CRISPR-Medikament zugelassen: Es editiert die eigenen
          Blutstammzellen von Patienten gegen die Sichelzellkrankheit — genau die Krankheit, mit
          der dieser Kurs Punktmutationen eingeführt hat. Solche Eingriffe betreffen den Körper
          eines Menschen und sterben mit ihm (<strong>somatisches</strong> Editieren). Embryonen
          zu editieren (<strong>Keimbahn</strong>) würde die Änderungen an alle Nachkommen
          weiterreichen; als ein Wissenschaftler es 2018 bei Zwillingsmädchen tat, war die
          nahezu einhellige Reaktion des Fachs Verurteilung, und er ging ins Gefängnis. Die
          Technik zieht diese Linie nicht. Menschen müssen es tun.
        </p>

        <div className="callout note">
          <span className="co-title">Der volle Kreis</span>
          <p>
            Ein bakterielles Immunsystem, gezielt mit der Basenpaarung aus Einheit 2, unter
            Ausnutzung der Rasterverschiebungen aus Einheit 2, eingesetzt gegen die Mutation aus
            Einheit 2s eigenem Fallbeispiel. Die letzte Lektion dieses Kurses ist jede frühere
            Lektion — absichtlich auf ein Genom gerichtet.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Guide-RNA-Zielsuche",
      intro: (
        <>
          <p>Schiebe eine 10-Buchstaben-Guide ein Stück Genom entlang und sieh ihr beim Basenpaaren zu.</p>
          <ul>
            <li>Finde den perfekten Treffer mit PAM nebenan — die einzige Stelle, die Cas9 wirklich schneidet.</li>
            <li>Weiter hinten liegt eine 9-von-10-Stelle mit PAM. Das ist ein Off-Target-Risiko, die größte Sorge des Fachs.</li>
            <li>Eine Stelle passt perfekt, hat aber kein PAM. Kein Schnitt — die Sicherung greift.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Wie viele verschiedene DNA-Sequenzen aus 10 Buchstaben gibt es? (vier Buchstaben pro Position)",
        answer: 1048576,
        unit: "Sequenzen",
        hint: "4 zehnmal mit sich selbst multipliziert.",
        explain:
          "4¹⁰ = 1.048.576. Echte Guides nutzen ~20 Buchstaben: 4²⁰ ≈ 10¹² — eine Billion Adressen, genug, um eine Stelle in einem Genom aus 3 Milliarden Buchstaben herauszugreifen.",
      },
    ],
    quiz: [
      {
        q: "Was trägt die Guide-RNA zu CRISPR-Cas9 bei?",
        choices: [
          "Sie schneidet die DNA",
          "Sie repariert den Schnitt",
          "Die Adresse — sie paart sich mit der passenden DNA-Sequenz und lenkt Cas9 dorthin",
          "Sie schützt die Zelle vor Viren",
        ],
        answer: 2,
        explain:
          "Das Zielen ist reine Basenpaarung: Tausche die ~20-Buchstaben-Guide, und dasselbe Protein schneidet ganz woanders.",
      },
      {
        q: "Woher stammt CRISPR-Cas9 ursprünglich?",
        choices: [
          "Es ist ein bakterielles adaptives Immunsystem, das Viren-DNA archiviert und angreift",
          "Es wurde von Grund auf im Labor entworfen",
          "Es stammt aus menschlichen Immunzellen",
          "Es ist ein umgebautes Restriktionsenzym",
        ],
        answer: 0,
        explain:
          "Bakterien kleben Stücke der DNA früherer Angreifer in ein CRISPR-Archiv — Immungedächtnis in einer einzigen Zelle — und zerstören Wiederholungstäter mit daraus gebauten Guides.",
      },
      {
        q: "Cas9 hat ein Gen geschnitten, und die Zelle hat die Enden schlampig verklebt — ein Buchstabe kam dazu. Was ist die wahrscheinliche Folge?",
        choices: [
          "Das Gen funktioniert normal",
          "Eine Rasterverschiebung — jedes Codon dahinter wird falsch gelesen, das Gen ist ausgeschaltet",
          "Die Zelle stirbt sofort",
          "Das Gen wird verdoppelt",
        ],
        answer: 1,
        explain:
          "Ein eingefügter Buchstabe verschiebt das Dreier-Leseraster — der schlimmste Fall der Mutations-Lektion, hier absichtlich genutzt, um ein Gen abzuschalten.",
      },
      {
        q: "Was ist ein „Off-Target“-Schnitt?",
        choices: [
          "Ein Eingriff, der nichts verändert",
          "Ein Eingriff, den das Immunsystem abstößt",
          "Ein Schnitt an der Zielstelle, aber nur in einem Strang",
          "Ein Schnitt an einer Beinahe-Treffer-Stelle anderswo im Genom",
        ],
        answer: 3,
        explain:
          "Ein 19-von-20-Treffer wird manchmal trotzdem geschnitten. Off-Targets zu minimieren ist das zentrale Ingenieurs- und Sicherheitsproblem des Genom-Editierens.",
      },
      {
        q: "Warum wird Keimbahn-Editieren so anders behandelt als somatisches?",
        choices: [
          "Es ist technisch viel schwieriger",
          "Keimbahn-Änderungen erben alle künftigen Generationen; somatische sterben mit dem Patienten",
          "Somatisches Editieren ist schmerzfrei",
          "Es gibt keinen echten Unterschied",
        ],
        answer: 1,
        explain:
          "Einen Embryo zu editieren heißt, jeden Nachkommen zu editieren, der nie zustimmen konnte. Die zugelassene Sichelzell-Therapie ist somatisch — ein Patient, ein Körper, ein Leben.",
      },
    ],
  },
};
