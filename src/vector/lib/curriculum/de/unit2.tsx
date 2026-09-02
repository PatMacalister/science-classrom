import type { LessonContentDe } from "../localize";

export const unit2De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  energy: {
    Theory: () => (
      <>
        <h2>Zwei Kostüme für den Anfang</h2>
        <p>
          <strong>Kinetische Energie</strong> ist die Energie der Bewegung;{" "}
          <strong>potenzielle Energie</strong> steckt in der Lage — vorerst: gegen die
          Schwerkraft gehoben:
        </p>
        <div className="formula">
          KE = ½·m·v² &nbsp;&nbsp;·&nbsp;&nbsp; PE = m·g·h
          <span className="note">beide in Joule — ein Joule ≈ einen Apfel einen Meter heben</span>
        </div>
        <p>
          Das v² in der kinetischen Energie ist die Tatsache hinter jedem Tempolimit: Bei
          doppeltem Tempo trägt ein Auto <em>viermal</em> so viel Energie — und braucht viermal
          so viel Strecke, um sie wegzubremsen. Sechzig Prozent mehr Tempo verdoppeln die
          Aufprallenergie.
        </p>

        <h2>Der Erhaltungssatz</h2>
        <p>
          Lass eine Kugel fallen, und PE läuft in KE über, Gramm für Gramm, Joule für Joule.
          Addiere beide, und die Summe steht fest — das ist die{" "}
          <strong>Energieerhaltung</strong>, und sie gilt nicht ungefähr, sondern{" "}
          <em>exakt</em>, immer und überall. Energie wird nie erschaffen oder vernichtet; sie
          wechselt das Kostüm: Bewegung, Höhe, Federspannung, chemische Bindungen, Elektrizität,
          Licht — und das Kostüm der letzten Instanz: <strong>Wärme</strong>.
        </p>
        <p>
          „Energie an die Reibung verlieren“ heißt in Wahrheit: sie in ungeordnetes
          Molekülgezitter umwandeln. Die Bücher gehen weiterhin auf; die Energie ist nur dorthin
          gegangen, wo du sie nicht mehr bequem ausgeben kannst. Ein Pendel schwingt aus, und
          das Zimmer ist unmessbar wärmer.
        </p>

        <h2>Warum Physiker damit anfangen</h2>
        <p>
          Eine Skaterin rollt eine geschwungene Rampe hinab: Die Kräfte entlang dieser Kurve
          auszurechnen ist eine Qual. Der Energie ist der Weg egal — nur Anfang und Ende zählen:
        </p>
        <div className="formula">
          m·g·h = ½·m·v² &nbsp;⇒&nbsp; v = √(2·g·h)
          <span className="note">die Masse kürzt sich — jede reibungsfreie Rutsche aus Höhe h endet mit demselben Tempo</span>
        </div>
        <p>
          Gleiches Ergebnis für den senkrechten Sturz, die geschwungene Rutsche oder den Looping,
          und nirgends eine Kraft berechnet. Erhaltungssätze sind die Art der Physik, den
          schweren Teil der Geschichte zu überspringen und die letzte Seite zu lesen.
        </p>

        <h2>Leistung: Energie pro Sekunde</h2>
        <p>
          <strong>Leistung</strong> ist, wie schnell Energie umgewandelt wird — Joule pro
          Sekunde, also <strong>Watt</strong>. Eine 60-W-Birne gibt 60 J pro Sekunde aus; eine
          fitte Radfahrerin hält ~250 W; ein Wasserkocher zieht 2.000. Deine Stromrechnung ist
          buchstäblich eine Joule-Zählung (verkleidet als Kilowattstunden: eine kWh =
          3,6 Millionen Joule).
        </p>

        <div className="callout note">
          <span className="co-title">Dieselben Joule betreiben dich</span>
          <p>
            Eine Lebensmittel-„Kalorie“ (kcal) sind 4.184 Joule. Ein 2.000-kcal-Tag sind
            ~8,4 MJ — ein Dauerverbrauch nahe 100 W. Energetisch bist du eine helle Glühbirne
            alter Bauart; Helix’ Atmungs-Lektion erzählt, wie diese Wattzahl tatsächlich
            geliefert wird.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Energie-Rampe",
      intro: (
        <>
          <p>Eine Skaterin auf einer geschwungenen Rampe, mit Energie-Balken, die live Buch führen.</p>
          <ul>
            <li>Sieh PE beim Abwärtsfahren in KE laufen und beim Aufwärtsfahren zurück — der Summenbalken rührt sich nie.</li>
            <li>Füge Reibung hinzu und sieh einen dritten Balken (Wärme) auf Kosten der anderen wachsen. Summe: weiterhin fest.</li>
            <li>Halbiere die Fallhöhe und prüfe das Tempo unten: √2-mal langsamer, nicht 2× — die Wurzel bei der Arbeit.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Eine 2-kg-Kugel wird 5 m hoch gehalten (g = 10 m/s²). Wie schnell ist sie beim Aufprall, in m/s? (v = √(2gh))",
        answer: 10,
        unit: "m/s",
        hint: "Die Masse ist ein Köder — sie kürzt sich.",
        explain: "v = √(2 × 10 × 5) = √100 = 10 m/s — für Bowlingkugel wie Murmel.",
      },
      {
        prompt: "Ein Auto verdoppelt sein Tempo von 15 auf 30 m/s. Auf das Wievielfache wächst seine kinetische Energie?",
        answer: 4,
        unit: "×",
        hint: "KE geht mit v².",
        explain: "2² = 4. Der Bremsweg skaliert genauso — das stärkste Argument jeder Tempolimit-Debatte.",
      },
      {
        prompt: "Ein Wasserkocher mit 2.000 W läuft 90 s. Wie viel Energie wandelt er um, in Joule?",
        answer: 180000,
        unit: "J",
        hint: "Leistung × Zeit.",
        explain: "2.000 J/s × 90 s = 180.000 J — genug, um etwa einen halben Liter Wasser zum Kochen zu bringen.",
      },
    ],
    quiz: [
      {
        q: "Eine Kugel rollt eine reibungsfreie Rutsche hinab. Was geschieht mit potenzieller und kinetischer Energie?",
        choices: [
          "Beide nehmen ab",
          "PE wandelt sich in KE; ihre Summe bleibt exakt konstant",
          "KE wandelt sich in PE",
          "Beide nehmen zu",
        ],
        answer: 1,
        explain:
          "Energie wechselt das Kostüm, nie den Betrag. Jedes Joule verlorener Höhe taucht als Bewegung auf — das ist der Erhaltungssatz.",
      },
      {
        q: "Wohin geht die Energie eines Pendels, während es allmählich ausschwingt?",
        choices: [
          "Die Reibung vernichtet sie",
          "Sie kehrt zur Gravitation zurück",
          "In Wärme — ungeordnete Molekülbewegung in Luft und Aufhängung",
          "In die Masse des Pendels",
        ],
        answer: 2,
        explain:
          "Reibung verwandelt geordnete Bewegung in Molekülgezitter. Die Bücher gehen perfekt auf; die Energie ist nur nicht mehr ausgebbar.",
      },
      {
        q: "Warum greifen Physiker auf der geschwungenen Rampe zur Energieerhaltung statt zu Kräften?",
        choices: [
          "Energie hängt nur von Anfangs- und Endpunkt ab, nicht vom Weg dazwischen",
          "Auf Kurven existieren keine Kräfte",
          "Energie ist genauer",
          "Sie liefert ein anderes Ergebnis",
        ],
        answer: 0,
        explain:
          "mgh hinein, ½mv² heraus — die Form der Rutsche kommt nie vor. Erhaltungssätze überspringen die Geschichte und lesen die letzte Seite.",
      },
      {
        q: "Bei doppeltem Tempo ist der Bremsweg eines Autos ungefähr…",
        choices: ["doppelt so lang", "halb so lang", "gleich", "viermal so lang"],
        answer: 3,
        explain:
          "Die Bremsen müssen ½mv² wegschaffen, und v² vervierfacht sich. Anhalten kostet Energie, nicht Geschwindigkeit.",
      },
      {
        q: "Was misst ein Watt?",
        choices: [
          "Die insgesamt gespeicherte Energie",
          "Die Rate der Energieumwandlung — Joule pro Sekunde",
          "Elektrische Ladung",
          "Kraft auf Entfernung",
        ],
        answer: 1,
        explain:
          "Leistung ist Energie in Eile. Ein 2.000-W-Kocher ist über einen Tag nicht „stärker“ als ein 100-W-Mensch — nur schneller pro Sekunde.",
      },
    ],
  },

  /* ================================================================ */
  momentum: {
    Theory: () => (
      <>
        <h2>Die andere erhaltene Größe</h2>
        <div className="formula">
          p = m·v
          <span className="note">Kilogramm-Meter pro Sekunde — Richtung inklusive</span>
        </div>
        <p>
          <strong>Impuls</strong> ist bewegte Masse, mit Vorzeichen. Seine Superkraft: In jeder
          Kollision, Explosion und jedem Abstoßen ist der <em>Gesamt</em>impuls der Beteiligten
          vorher und nachher identisch — immer, selbst wenn der Crash brutal, klebrig und
          energieverschwendend ist. Im Kern ist das Newtons drittes Gesetz mit Hauptbuch: Die
          gleich-und-entgegengesetzten Kräfte handeln Impuls zwischen den Partnern, also kann
          sich die Summe nicht bewegen.
        </p>
        <p>
          Darum ist Rückstoß nicht verhandelbar. Ein Gewehr feuert eine leichte, schnelle Kugel
          nach vorn; das Gewehr muss denselben Impuls nach hinten tragen. Eine Rakete ist
          Dauerrückstoß. Zwei Eisläufer, die sich abstoßen, teilen null Impuls in zwei
          entgegengesetzte Anteile — der leichtere verlässt den Ort schneller, exakt im
          umgekehrten Massenverhältnis.
        </p>

        <h2>Kraftstoß: der Zeitpreis des Impulses</h2>
        <div className="formula">
          F·Δt = Δp
          <span className="note">dieselbe Impulsänderung kann eine große Kraft kurz sein — oder eine kleine Kraft länger</span>
        </div>
        <p>
          Anhalten kostet immer dasselbe Δp; <em>wie es sich anfühlt</em>, entscheidet die Zeit,
          die du dir nimmst. Airbags, Knautschzonen, gebeugte Knie bei der Landung, weiche Hände
          beim Fangen — alles derselbe Trick: Δt strecken, damit F schrumpft. Triff stattdessen
          die Windschutzscheibe, und Δt sind Millisekunden, also ist F enorm.
          Sicherheitstechnik ist großteils die Kunst, Zeit zu kaufen.
        </p>

        <h2>Zwei Sorten Kollision</h2>
        <ul>
          <li>
            <strong>Elastisch</strong> — die Partner prallen ab, und auch die kinetische Energie
            überlebt (Billardkugeln, fast). Gleiche Massen tauschen die Geschwindigkeiten
            komplett: Die Spielkugel bleibt stehen, die getroffene übernimmt ihr Tempo.
          </li>
          <li>
            <strong>Unelastisch</strong> — die Partner verbeulen oder verhaken sich; kinetische
            Energie wird teils zu Wärme und Verformung. Der Impuls bleibt{" "}
            <em>trotzdem</em> erhalten. Zwei gleiche Autos frontal bei gleichem Tempo:
            Gesamtimpuls null vorher, null nachher — ein vereintes Wrack in Ruhe, die ganze KE
            ins Blech gesteckt.
          </li>
        </ul>
        <p>
          Diese Unterscheidung ist der Prüfungs-Kompass: <strong>Impuls überlebt immer;
          kinetische Energie nur elastisch.</strong> Steht in der Aufgabe „sie bleiben
          aneinander haften“, ist der Impuls das einzige Gesetz, das du brauchst.
        </p>

        <div className="callout note">
          <span className="co-title">Wie man ein rasendes Auto nachwiegt</span>
          <p>
            Unfallermittler lassen die Erhaltung rückwärts laufen: Bremsspurlängen liefern die
            Tempi nach dem Crash, und die Impuls-Arithmetik enthüllt dann die Tempi{" "}
            <em>davor</em>. Das Universum hat am Unfallort Buch geführt; die Ermittlerin liest
            es nur.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Kollisionsbank",
      intro: (
        <>
          <p>Zwei Wagen, verstellbare Massen und Tempi, und ein Elastizitätsregler von Billard bis Klebstoff.</p>
          <ul>
            <li>Gleiche Massen, voll elastisch: Sieh sie die Geschwindigkeiten tauschen wie Billardkugeln.</li>
            <li>Dreh die Elastizität auf null: Sie kleben, der Impuls überlebt, und die verlorene KE erscheint als Wärme-Zahl.</li>
            <li>Gib einem schweren Wagen ein leichtes Ziel und vergleiche mit dem Umgekehrten — das Massenverhältnis entscheidet alles.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein 1.000-kg-Auto fährt mit 20 m/s auf ein stehendes 1.000-kg-Auto auf, und beide verhaken sich. Wie schnell bewegt sich das Paar, in m/s?",
        answer: 10,
        unit: "m/s",
        hint: "Gesamtimpuls vorher = nachher; die Masse hat sich verdoppelt.",
        explain: "p = 1.000×20 = 20.000 kg·m/s; geteilt durch 2.000 kg → 10 m/s. Die halbe KE wurde zu verbogenem Blech.",
      },
      {
        prompt: "Ein 4-kg-Gewehr feuert eine 10-g-Kugel mit 400 m/s. Wie schnell ist der Rückstoß des Gewehrs, in m/s?",
        answer: 1,
        unit: "m/s",
        hint: "Kugelimpuls = Gewehrimpuls (mit umgekehrtem Vorzeichen).",
        explain: "0,01 × 400 = 4 kg·m/s; 4 ÷ 4 kg = 1 m/s rückwärts. Das Massenverhältnis schluckt die Dramatik.",
      },
    ],
    quiz: [
      {
        q: "Zwei ruhende Eisläufer stoßen sich voneinander ab. Ihr Gesamtimpuls ist danach…",
        choices: [
          "gleichmäßig als Tempo verteilt",
          "größer beim schwereren Läufer",
          "null — die beiden Impulse sind gleich groß und entgegengesetzt",
          "nicht bestimmbar",
        ],
        answer: 2,
        explain:
          "Er war vorher null, also ist er nachher null. Der leichtere Läufer wird im umgekehrten Massenverhältnis schneller — die Anteile heben sich auf.",
      },
      {
        q: "Wie schützt dich ein Airbag?",
        choices: [
          "Er verringert den Impuls, den du verlieren musst",
          "Er streckt deine Bremszeit, sodass dasselbe Δp eine viel kleinere Kraft braucht",
          "Er saugt deinen Impuls in den Sack auf",
          "Er drückt dich zurück in den Sitz",
        ],
        answer: 1,
        explain:
          "F·Δt = Δp: Die Impulsänderung ist von der Physik diktiert, aber dreifache Bremszeit drittelt die Kraft. Knautschzonen spielen dasselbe Spiel.",
      },
      {
        q: "Was bleibt bei einer vollkommen unelastischen Kollision (die Objekte verhaken sich) erhalten?",
        choices: [
          "Der Impuls, aber nicht die kinetische Energie",
          "Die kinetische Energie, aber nicht der Impuls",
          "Beides vollständig",
          "Keines von beiden",
        ],
        answer: 0,
        explain:
          "Der Impuls überlebt jede Kollision ohne Ausnahme; die fehlende KE wurde zu Wärme und Verformung. Elastische Stöße sind der Sonderfall, in dem auch die KE überlebt.",
      },
      {
        q: "Eine Spielkugel trifft eine gleich schwere Kugel zentral und elastisch. Was passiert?",
        choices: [
          "Beide rollen mit halbem Tempo weiter",
          "Die Spielkugel prallt gerade zurück",
          "Beide bleiben stehen",
          "Die Spielkugel stoppt; die getroffene übernimmt ihr Tempo",
        ],
        answer: 3,
        explain:
          "Gleiche Massen tauschen im elastischen Frontalstoß die Geschwindigkeiten komplett — das einzige Ergebnis, das p und KE zugleich erhält. Jeder Billardspieler kennt den Beweis.",
      },
    ],
  },
};
