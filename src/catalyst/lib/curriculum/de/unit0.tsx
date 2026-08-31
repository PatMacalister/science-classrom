import type { LessonContentDe } from "../localize";

export const unit0De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  atoms: {
    Theory: () => (
      <>
        <h2>Drei Teilchen, unendliche Materie</h2>
        <p>
          Zerteile ein Stück Materie immer weiter und du stößt irgendwann an eine Grenze: das{" "}
          <strong>Atom</strong>. Atome selbst bestehen aus nur drei Zutaten. Im Zentrum sitzt ein
          winziger, dichter <strong>Kern</strong> aus <strong>Protonen</strong> (positiv geladen)
          und <strong>Neutronen</strong> (ungeladen). Darum herum schwirren{" "}
          <strong>Elektronen</strong> (negativ geladen), so leicht, dass der Kern über 99,9 % der
          Masse trägt und dabei fast keinen Raum ausfüllt. Wäre ein Atom ein Fußballstadion, wäre
          der Kern eine Erbse auf dem Anstoßpunkt — der Rest ist Elektronengebiet und Leere.
        </p>

        <h2>Die Protonenzahl ist das Element</h2>
        <p>
          Hier kommt der wichtigste Satz der ganzen Chemie:{" "}
          <strong>Die Anzahl der Protonen entscheidet, welches Element ein Atom ist</strong>. Sechs
          Protonen? Kohlenstoff — immer, überall im Universum. Sieben? Stickstoff.
          Neunundsiebzig? Gold. Diese Zahl ist die <strong>Ordnungszahl Z</strong>, und genau
          deshalb ist das Periodensystem nummeriert: Es zählt schlicht Protonen, von 1
          (Wasserstoff) bis 118 (Oganesson).
        </p>
        <div className="formula">
          Z = Protonen&nbsp;&nbsp;·&nbsp;&nbsp;A = Protonen + Neutronen
          <span className="note">Z legt das Element fest; A ist die Massenzahl dieses bestimmten Atoms</span>
        </div>
        <p>
          Neutronen dagegen sind Verhandlungssache. Kohlenstoff trägt meist 6 davon
          (Kohlenstoff-12), manche Kohlenstoffatome aber 7 oder 8. Gleiches Element, andere Masse —
          diese Geschwister heißen <strong>Isotope</strong>. Die meisten sind völlig stabil; einige,
          wie Kohlenstoff-14, zerfallen langsam — und genau das macht die Radiokarbondatierung
          möglich.
        </p>

        <h2>Ionen: wenn die Buchhaltung nicht aufgeht</h2>
        <p>
          Ein neutrales Atom hat genau so viele Elektronen wie Protonen. Doch Elektronen sind das
          Kleingeld des Atoms — sie können verloren oder gewonnen werden. Ein Atom, das Elektronen
          abgegeben hat, ist positiv geladen (ein <strong>Kation</strong>); eines, das welche
          aufgenommen hat, ist negativ (ein <strong>Anion</strong>). Beachte, was sich{" "}
          <em>nicht</em> geändert hat: die Protonenzahl. Ein Natrium-Ion ist immer noch Natrium.
          Ionen sind nichts Exotisches — das Salz auf deinem Tisch besteht aus nichts anderem als
          Na⁺- und Cl⁻-Ionen, die einander festhalten.
        </p>

        <div className="callout note">
          <span className="co-title">Wie klein ist klein?</span>
          <p>
            Ein einziger Wassertropfen enthält etwa 10²¹ Moleküle — eine Trilliarde. Könntest du
            eines pro Sekunde zählen, bräuchtest du das Dreißigtausendfache des Weltalters. Die
            Chemie behandelt Atome nie einzeln; sie behandelt sie in Armeen. (Einheit 2 gibt dieser
            Armee einen Namen: das Mol.)
          </p>
        </div>

        <p>
          Im Labor unten bist du der Architekt: Stelle die Teilchenzahlen ein und sieh zu, wie
          Identität, Masse und Ladung deines Atoms folgen. Ein Regler zählt mehr als die anderen —
          finde heraus, welcher.
        </p>
      </>
    ),
    lab: {
      title: "Der Atom-Baukasten",
      intro: (
        <>
          <p>Setze Atome Teilchen für Teilchen zusammen und beobachte, wie das Namensschild reagiert.</p>
          <ul>
            <li>Schiebe die Protonen hoch und runter — der Elementname wechselt bei jedem Schritt.</li>
            <li>Füge Neutronen hinzu: Die Massenzahl A steigt, das Element bleibt (Isotope!).</li>
            <li>Nimm einem neutralen Atom ein Elektron weg — du hast gerade ein Kation gebaut.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was entscheidet, welches Element ein Atom ist?",
        choices: ["Die Anzahl der Neutronen", "Die Anzahl der Protonen", "Die Anzahl der Elektronen", "Seine Masse"],
        answer: 1,
        explain:
          "Die Protonenzahl (Ordnungszahl Z) ist die Identität des Elements. Neutronen machen Isotope, Elektronen machen Ionen — aber 6 Protonen sind immer Kohlenstoff.",
      },
      {
        q: "Kohlenstoff-12 und Kohlenstoff-14 sind…",
        choices: [
          "verschiedene Elemente",
          "Isotope — gleiche Protonen, verschiedene Neutronen",
          "Ionen — gleiche Protonen, verschiedene Elektronen",
          "Moleküle",
        ],
        answer: 1,
        explain:
          "Beide haben 6 Protonen (das macht sie zu Kohlenstoff). C-12 hat 6 Neutronen, C-14 hat 8 — gleiches Element, andere Massenzahl A.",
      },
      {
        q: "Ein Atom verliert zwei Elektronen. Was ist es jetzt?",
        choices: ["Ein Anion mit Ladung 2−", "Ein Kation mit Ladung 2+", "Ein anderes Element", "Ein Isotop"],
        answer: 1,
        explain:
          "Verliert es negative Ladung, bleibt es netto positiv: ein 2+-Kation. Seine Protonenzahl — und damit sein Element — ist unverändert.",
      },
      {
        q: "Wo steckt fast die gesamte Masse eines Atoms?",
        choices: [
          "Gleichmäßig über das Atom verteilt",
          "In den Elektronenschalen",
          "Im Kern",
          "Atome haben keine Masse",
        ],
        answer: 2,
        explain:
          "Protonen und Neutronen sind jeweils ~1800× schwerer als ein Elektron und sitzen im Kern — eine Erbse im Stadion, die 99,9 % der Masse trägt.",
      },
    ],
  },

  /* ================================================================ */
  shells: {
    Theory: () => (
      <>
        <h2>Stockwerke im Elektronenhotel</h2>
        <p>
          Elektronen um einen Kern verhalten sich wie Gäste in einem seltsamen Hotel: Sie müssen
          feste Stockwerke belegen — <strong>Schalen</strong> — und jedes Stockwerk hat eine strikte
          Kapazität. Die erste Schale (kernnah) fasst höchstens <strong>2</strong> Elektronen, die
          zweite <strong>8</strong>, und bei den Elementen, denen du zuerst begegnest, füllt sich
          auch die dritte mit <strong>8</strong>, bevor etwas anderes passiert. Elektronen füllen
          von unten auf: Natriums 11 Elektronen ordnen sich als 2 · 8 · 1.
        </p>

        <h2>Nur die oberste Etage macht Chemie</h2>
        <p>
          Die Elektronen in der äußersten besetzten Schale heißen{" "}
          <strong>Valenzelektronen</strong>, und nur sie bekommen andere Atome je zu sehen. Volle
          innere Schalen sind abgeriegelt. Diese eine Zahl — wie viele Elektronen oben sitzen —
          sagt fast alles voraus: wie ein Element bindet, womit es reagiert und wie heftig.
        </p>
        <div className="formula">
          Na: 2 · 8 · <b>1</b> &nbsp;&nbsp;&nbsp; Cl: 2 · 8 · <b>7</b> &nbsp;&nbsp;&nbsp; Ar: 2 · 8 · <b>8</b>
          <span className="note">fett = Valenzelektronen: erpicht darauf, eins loszuwerden, eins zu bekommen, oder völlig zufrieden</span>
        </div>

        <h2>Die Oktettregel: alle wollen eine volle Schale</h2>
        <p>
          Atome sind am stabilsten, wenn ihre Außenschale <strong>voll</strong> ist — meist mit 8
          Elektronen (das <em>Oktett</em>), oder mit 2 bei der winzigen ersten Schale. Die Edelgase
          (Helium, Neon, Argon…) kommen so zur Welt, weshalb sie mit fast nichts reagieren: Sie
          haben nichts zu gewinnen. Jedes andere Element trickst sich zur vollen Schale, indem es
          Elektronen <strong>abgibt</strong>, <strong>aufnimmt</strong> oder{" "}
          <strong>teilt</strong>. Natrium wirft sein einsames Außenelektron freudig weg; Chlor
          schnappt gierig nach einem. Bring die beiden zusammen und du ahnst, was passiert — diese
          Geschichte ist Einheit 1.
        </p>

        <div className="callout tip">
          <span className="co-title">Warum 2 · 8 · 8 und nicht einfach 8 · 8 · 8?</span>
          <p>
            Die Schalenkapazitäten stammen aus der Quantenmechanik (2n² Zustände pro Schale, und
            die oberen Zimmer der dritten Schale füllen sich erst, wenn die vierte öffnet). Die
            Maschinerie brauchst du noch nicht — das Muster 2 · 8 · 8 stimmt exakt für die ersten
            20 Elemente, und mehr braucht dieser Kurs bis zum Aufbaukurs nicht.
          </p>
        </div>

        <p>
          Fülle im Labor Atome Elektron für Elektron. Beobachte, welche Schale jedes Elektron
          wählt, und lies dann das Urteil: Will dieses Element abgeben, aufnehmen — oder ist es
          schon edel?
        </p>
      </>
    ),
    lab: {
      title: "Der Schalenfüller",
      intro: (
        <>
          <p>Wähle ein Element und zieh die Elektronenzahl von null hoch — sieh zu, wie sich die Stockwerke füllen.</p>
          <ul>
            <li>Fülle Natrium (11): Zwei Etagen schließen sich, ein Elektron bleibt oben exponiert.</li>
            <li>Fülle Chlor (17): Der obersten Etage fehlt genau ein Elektron.</li>
            <li>Fülle Neon (10) und Argon (18): volles Haus — deshalb heißen sie edel.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Wie viele Elektronen passen in die ersten beiden Schalen?",
        choices: ["8 und 8", "2 und 8", "2 und 6", "8 und 18"],
        answer: 1,
        explain:
          "Die erste Schale fasst 2, die zweite 8 — deshalb hat die erste Periode 2 Elemente und die zweite 8.",
      },
      {
        q: "Welche Elektronen nehmen an chemischen Reaktionen teil?",
        choices: [
          "Die kernnächsten",
          "Alle gleichermaßen",
          "Die Valenzelektronen der äußersten Schale",
          "Keine — Reaktionen betreffen nur den Kern",
        ],
        answer: 2,
        explain:
          "Innere Schalen sind voll und abgeriegelt. Nur die äußersten (Valenz-)Elektronen berühren andere Atome — sie allein schreiben die Chemie des Elements.",
      },
      {
        q: "Magnesium hat 12 Elektronen (2 · 8 · 2). Was sagt die Oktettregel voraus?",
        choices: [
          "Es nimmt 6 Elektronen auf",
          "Es gibt seine 2 Außenelektronen ab und wird zu Mg²⁺",
          "Es tut nichts — seine Schale ist voll",
          "Es spaltet sich in zwei Atome",
        ],
        answer: 1,
        explain:
          "Zwei Elektronen abzugeben ist weit billiger, als sechs aufzunehmen. Magnesium wirft seine oberste Etage ab und wird zum 2+-Kation mit versiegelter Schale darunter.",
      },
      {
        q: "Warum sind Edelgase so reaktionsträge?",
        choices: [
          "Sie sind zu schwer zum Reagieren",
          "Ihre Außenschale ist bereits voll",
          "Sie haben keine Elektronen",
          "Sie sind immer Ionen",
        ],
        answer: 1,
        explain:
          "Reaktivität ist die Jagd nach einer vollen Außenschale. Edelgase starten schon mit einer — sie haben nichts zu gewinnen, zu verlieren oder zu teilen.",
      },
    ],
  },

  /* ================================================================ */
  "periodic-table": {
    Theory: () => (
      <>
        <h2>Keine Liste — eine Landkarte</h2>
        <p>
          1869 sortierte Dmitri Mendelejew die bekannten Elemente nach Gewicht und bemerkte, dass
          sich Eigenschaften in Wellen wiederholten — also stapelte er die Wellen übereinander. Das
          Ergebnis ist das <strong>Periodensystem</strong>: Elemente nach Ordnungszahl Z geordnet,
          so angeordnet, dass <strong>Spalten die Chemie teilen</strong>. Die Karte war so gut,
          dass Mendelejew Lücken ließ und die Eigenschaften der fehlenden Elemente vorhersagte —
          Gallium und Germanium tauchten Jahre später auf und passten fast exakt.
        </p>

        <h2>Zeilen sind Schalen, Spalten sind Valenz</h2>
        <p>
          Mit Einheit 0 im Rücken ist der Aufbau der Tafel nicht mehr willkürlich. Jede{" "}
          <strong>Zeile (Periode)</strong> entspricht einer Elektronenschale, die gefüllt wird:
          Periode 1 füllt die 2-Plätze-Schale (2 Elemente), Perioden 2 und 3 füllen 8-Plätze-Schalen
          (je 8 Elemente). Jede <strong>Spalte (Gruppe)</strong> sammelt Elemente mit gleich vielen
          Valenzelektronen — und da Valenzelektronen die Chemie eines Elements <em>sind</em>,
          verhalten sich Spalten wie Familien:
        </p>
        <ul>
          <li>
            <strong>Gruppe 1 — Alkalimetalle</strong> (Li, Na, K…): ein einsames Außenelektron, das
            verzweifelt weg will. Weiche Metalle, die in Wasser zischen, sprudeln oder explodieren.
          </li>
          <li>
            <strong>Gruppe 2 — Erdalkalimetalle</strong> (Mg, Ca…): zwei Außenelektronen, ebenfalls
            gern abgegeben — nur weniger dramatisch.
          </li>
          <li>
            <strong>Gruppe 17 — Halogene</strong> (F, Cl, Br, I): ein Elektron unter der vollen
            Schale, aggressive Elektronendiebe. Fluor ist das reaktivste Element überhaupt.
          </li>
          <li>
            <strong>Gruppe 18 — Edelgase</strong> (He, Ne, Ar…): volle Schalen, chemisch im
            Tiefschlaf.
          </li>
          <li>
            Der breite Mittelblock — <strong>Übergangsmetalle</strong> — und die zwei abgetrennten
            Reihen darunter (<strong>Lanthanoide</strong> und <strong>Actinoide</strong>) füllen
            innere Etagen des Elektronenhotels; sie sind die verwinkelteren Viertel der Tafel.
          </li>
        </ul>

        <div className="callout note">
          <span className="co-title">Warum die Symbole Eselsbrücken brauchen</span>
          <p>
            Die Symbole sind international, aber ihre Wurzeln sind lateinisch und griechisch: Eisen
            ist <strong>Fe</strong> (<em>ferrum</em>), Natrium <strong>Na</strong> (
            <em>natrium</em>), Kalium <strong>K</strong> (<em>kalium</em>), Wolfram{" "}
            <strong>W</strong> — ein deutsches Wort im Weltvokabular. Niemand errät das — alle
            lernen es auswendig. Genau dafür ist eine <strong>Eselsbrücke</strong> da: eine kleine
            Geschichte, die dich vom Namen zum Symbol trägt. Jedes Element im Labor unten hat eine
            (auf Englisch heißt sie schlicht <em>memory hook</em> — beide sind hinterlegt, wechsle
            einfach die Sprache).
          </p>
        </div>

        <h2>Trends, die du direkt ablesen kannst</h2>
        <p>
          Zwei Faustregeln decken fast die ganze Tafel ab. Gehst du{" "}
          <strong>links → rechts</strong> durch eine Periode, gewinnt der Kern Ladung und zieht die
          Elektronen enger: Atome werden kleiner und halten Elektronen gieriger fest. Gehst du{" "}
          <strong>oben → unten</strong> durch eine Gruppe, stapeln sich neue Schalen: Atome werden
          größer und ihre Außenelektronen leichter zu stehlen. Deshalb wohnen das heftigste Metall
          (Caesium, unten links) und das heftigste Nichtmetall (Fluor, oben rechts) in
          gegenüberliegenden Ecken.
        </p>
      </>
    ),
    lab: {
      title: "Das Periodensystem — mit einer Eselsbrücke für jedes Element",
      intro: (
        <>
          <p>
            Die ganze Landkarte, 118 Kacheln. Klicke ein Element für seine Daten und seine
            Eselsbrücke — die kleine Geschichte, die Namen und Symbol verbindet. Die eigene Seite
            unter <strong>🧪 Elemente</strong> in der Kopfzeile bietet zusätzlich eine durchsuchbare
            Listenansicht.
          </p>
          <ul>
            <li>Geh Gruppe 1 hinunter, dann Periode 3 entlang — beobachte den Farbwechsel der Kategorien.</li>
            <li>Finde die vier Elemente, die nach dem Dorf Ytterby benannt sind (Y, Tb, Er, Yb).</li>
            <li>Prüfe die &bdquo;trügerischen&ldquo; Symbole: Na, K, Fe, Sn, Pb, Ag, Au, W, Hg.</li>
          </ul>
        </>
      ),
    },
    extraLab: {
      title: "Trend-Entdecker",
      intro: (
        <>
          <p>
            Das Periodensystem ist keine Liste, sondern eine Landkarte — und die Landkarte hat
            Gefälle. Die ersten zwanzig Elemente, eingefärbt nach der Eigenschaft deiner Wahl. Fahre
            über eine Kachel für den genauen Wert.
          </p>
          <ul>
            <li>Wähle <em>Atomradius</em> und lies Periode 2 entlang: Von Li zu Ne schrumpft er um den Faktor vier — obwohl Elektronen dazukommen.</li>
            <li>Wechsle zur <em>Ionisierungsenergie</em>. Das Muster kippt — die kleinen Atome halten am festesten.</li>
            <li>Vergleiche Li, Na und K bei allen dreien. Eine Gruppe hinunter macht rückgängig, was quer durch die Periode passiert ist.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Elemente in derselben Spalte (Gruppe) des Periodensystems haben…",
        choices: [
          "die gleiche Masse",
          "die gleiche Anzahl Schalen",
          "die gleiche Anzahl Valenzelektronen — und ähnliche Chemie",
          "nichts gemeinsam",
        ],
        answer: 2,
        explain:
          "Spalten sammeln Elemente, deren Außenschalen gleich aussehen. Gleiche Valenzelektronen → gleiches chemisches Verhalten: genau das ist der Sinn der Tafel.",
      },
      {
        q: "Eine neue Zeile (Periode) beginnt immer dann, wenn…",
        choices: [
          "ein Element radioaktiv wird",
          "eine neue Elektronenschale zu füllen beginnt",
          "sich die Masse des Elements verdoppelt",
          "Mendelejew das Papier ausging",
        ],
        answer: 1,
        explain:
          "Periodennummer = Anzahl besetzter Schalen. Natrium beginnt Periode 3, weil sein 11. Elektron die dritte Schale eröffnet.",
      },
      {
        q: "Das Symbol für Kalium ist K, weil…",
        choices: [
          "K der erste Buchstabe von Kalium ist und das Englische Potassium sagt",
          "es vom lateinischen Namen Kalium kommt",
          "es von einem Herrn K entdeckt wurde",
          "P schon vergeben war und man zufällig K nahm",
        ],
        answer: 1,
        explain:
          "Kalium (von arabisch al-qalya, Pflanzenasche) ist der lateinische Name — Englisch sagt 'potassium', das Symbol folgt dem Lateinischen. Eine Eselsbrücke überbrückt die Lücke.",
      },
      {
        q: "Welches ist das reaktivste Nichtmetall, und wo steht es?",
        choices: [
          "Caesium — unten links",
          "Helium — oben rechts",
          "Fluor — oben rechts, ein Elektron unter der vollen Schale",
          "Eisen — genau in der Mitte",
        ],
        answer: 2,
        explain:
          "Fluor vereint beide Trends: kleiner, stark geladener Kern und eine Schale, der genau ein Elektron fehlt. Es greift fast alles an — sogar Glas.",
      },
    ],
  },
};
