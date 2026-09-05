import type { LessonContentDe } from "../localize";

export const unit4De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  kinematics: {
    Theory: () => (
      <>
        <h2>Glieder, Gelenke, Rahmen</h2>
        <p>
          Reduziere einen Roboterarm auf Geometrie, und er ist eine Kette: starre{" "}
          <strong>Glieder</strong> fester Länge, verbunden durch <strong>Gelenke</strong>, die je
          einen Winkel beisteuern. Der Zwei-Glieder-Arm — Schulter θ₁, Ellbogen θ₂, Gliedlängen
          L₁ und L₂ — ist die Fruchtfliege der Arm-Robotik: klein genug, um ihn auf Papier zu
          lösen, reich genug, um jede wichtige Idee zu enthalten.
        </p>
        <p>
          Eine Feinheit trägt den Großteil der Maschinerie: Der Ellbogenwinkel θ₂ wird{" "}
          <em>relativ zum Oberarm</em> gemessen, nicht zum Tisch. Der Ellbogen reitet auf der
          Drehung der Schulter — jedes Glied arbeitet in dem Koordinaten<strong>rahmen</strong>,
          den sein Elternteil ihm reicht. Ketten von Rahmen, jeder auf dem letzten reitend: Genau
          so beschreibt professionelle Software Roboter jeder Größe; der Zwei-Glieder-Arm hält
          die Kette nur kurz.
        </p>

        <h2>Die Vorwärts-Abbildung</h2>
        <p>Lauf die Kette entlang und addiere, wohin dich jedes Glied trägt:</p>
        <div className="formula">
          x = L₁·cos θ₁ + L₂·cos(θ₁ + θ₂) · y = L₁·sin θ₁ + L₂·sin(θ₁ + θ₂)
          <span className="note">Vorwärtskinematik — Winkel rein, Handposition raus; beachte den Ellbogenwinkel, der auf dem Schulterwinkel stapelt</span>
        </div>
        <p>
          Das (θ₁ + θ₂) ist die Rahmen-Idee in Algebra: Die Richtung des Unterarms ist die
          Drehung der Schulter <em>plus</em> die eigene. Vorwärtskinematik — Winkel zu
          Position — ist die leichte Richtung: einsetzen, ablesen, keine Mehrdeutigkeit, und sie
          funktioniert für sechs Gelenke so sicher wie für zwei (nur mit mehr Stapelei).
        </p>

        <h2>Der Arbeitsraum: wo die Hand je sein kann</h2>
        <p>
          Fahre beide Winkel durch alles, was sie können, und die Hand malt einen Kreisring —
          Außenradius L₁ + L₂ (Arm gestreckt), Innenradius |L₁ − L₂| (Arm gefaltet). Alles, was
          der Arm je berühren wird, wohnt in diesem Ring; keine Klugheit reicht darüber hinaus.
          Den Arbeitsraum zu zeichnen ist die erste ehrliche Tat des Arm-Designs: Sie sagt dir
          vor jeder Zeile Code, ob das Regal erreichbar ist.
        </p>

        <div className="callout note">
          <span className="co-title">Dein Arm rechnet das rückwärts</span>
          <p>
            Schließ die Augen und tippe dir an die Nase: Dein Gehirn hat die Fingerspitze
            gezielt, ohne bewusst Cosinusse zu lösen — und Zielen ist das <em>umgekehrte</em>{" "}
            Problem, Position zu Winkeln. Diese Richtung ist ehrlich schwerer (mehrere Antworten,
            unerreichbare Stellen) und ist genau die nächste Lektion.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Zwei-Glieder-Sandkasten",
      intro: (
        <>
          <p>Schulter- und Ellbogen-Schieber, live Hand-Koordinaten und eine Spur, die sich merkt, wo die Hand gewesen ist.</p>
          <ul>
            <li>Bewege nur die Schulter: Der ganze Arm schwenkt, die Welt des Ellbogens zieht mit — Rahmen reiten auf Rahmen.</li>
            <li>Strecke (θ₂ = 0) und falte den Arm dann ganz: Du hast soeben Außen- und Innenrand des Arbeitsraum-Rings gezeichnet.</li>
            <li>Fahre beide Schieber wild und lass die Spur den Ring füllen. Was unbemalt bleibt, ist für immer außer Reichweite.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Arm hat L₁ = 30 cm und L₂ = 20 cm, mit θ₁ = 90° und θ₂ = 0° (gerade nach oben). Wie hoch ist die Hand, y in cm?",
        answer: 50,
        unit: "cm",
        tolerancePct: 2,
        hint: "sin 90° = 1, und der Ellbogen fügt bei θ₂ = 0 nichts hinzu.",
        explain: "y = 30·sin 90° + 20·sin(90°+0°) = 30 + 20 = 50 cm — der voll gestreckte Arm, Richtung Decke.",
      },
      {
        prompt: "Wie groß ist beim selben Arm der Radius des inneren Arbeitsraum-Rands, in cm?",
        answer: 10,
        unit: "cm",
        tolerancePct: 2,
        hint: "|L₁ − L₂| — der ganz gefaltete Arm.",
        explain: "|30 − 20| = 10 cm. Ganz auf sich zurückgefaltet steht die Hand noch 10 cm von der Schulter — ein Loch mitten im Erreichbaren.",
      },
    ],
    quiz: [
      {
        q: "Warum steht im zweiten Term der Vorwärtskinematik (θ₁ + θ₂)?",
        choices: [
          "Er mittelt die beiden Gelenke",
          "Der Ellbogen reitet auf der Schulter — die Weltrichtung des Unterarms ist die Schulterdrehung plus die eigene",
          "Er korrigiert die Schwerkraft",
          "Reine Konvention; θ₂ allein ginge auch",
        ],
        answer: 1,
        explain:
          "θ₂ wird relativ zum Oberarm gemessen, und der Oberarm hat sich schon um θ₁ gedreht. Rahmen stapeln — die Algebra sagt es nur kompakt.",
      },
      {
        q: "Welche Frage beantwortet die Vorwärtskinematik?",
        choices: [
          "Welche Winkel erreichen ein gegebenes Ziel?",
          "Wie schnell kann der Arm fahren?",
          "Wo ist die Hand bei gegebenen Gelenkwinkeln?",
          "Wie stark ist der Griff?",
        ],
        answer: 2,
        explain:
          "Winkel rein, Position raus — in die Formeln einsetzen und ablesen. Die Gegenrichtung (Position rein, Winkel raus) ist die schwere, und die nächste Lektion.",
      },
      {
        q: "Der Arbeitsraum eines Zwei-Glieder-Arms ist ein Kreisring, weil…",
        choices: [
          "die Motoren das Tempo begrenzen",
          "der Ellbogen nur in eine Richtung knicken kann",
          "die Schwerkraft die Hand nach unten zieht",
          "die Hand höchstens L₁+L₂ erreicht (gestreckt) und nie näher als |L₁−L₂| kommt (gefaltet)",
        ],
        answer: 3,
        explain:
          "Volle Streckung setzt den Außenkreis; volle Faltung das Innenloch. Dazwischen liegt alles, was der Arm je berühren wird.",
      },
      {
        q: "Ein Ziel liegt 55 cm von der Schulter eines Arms mit L₁ = 30 cm, L₂ = 20 cm. Was stimmt?",
        choices: [
          "Unerreichbar — es liegt jenseits des 50-cm-Außenrands, und kein Algorithmus ändert Geometrie",
          "Erreichbar mit ganz gefaltetem Ellbogen",
          "Erreichbar, wenn der Arm schnell genug fährt",
          "Erreichbar mit negativem θ₂",
        ],
        answer: 0,
        explain:
          "L₁ + L₂ = 50 cm ist eine harte Wand. Den Arbeitsraum vor dem Code zu prüfen ist der billigste Bugfix der Arm-Robotik.",
      },
    ],
  },

  /* ================================================================ */
  "inverse-kinematics": {
    Theory: () => (
      <>
        <h2>Die nützliche Richtung ist die schwere</h2>
        <p>
          Niemand befiehlt einem Roboterarm Winkel. Aufgaben kommen als Positionen — <em>greif
          die Tasse bei (x, y)</em> — und jemand muss die Winkel zurückgewinnen, die die Hand
          dorthin stellen: <strong>inverse Kinematik</strong>, IK. Für den Zwei-Glieder-Arm
          knackt sie der Kosinussatz in geschlossener Form:
        </p>
        <div className="formula">
          cos θ₂ = (x² + y² − L₁² − L₂²) / (2·L₁·L₂)
          <span className="note">löse zuerst den Ellbogen — allein die Entfernung des Ziels bestimmt, wie gebeugt der Arm sein muss</span>
        </div>
        <p>
          Lies die rechte Seite: Sie fragt nur, wie <em>weit</em> das Ziel ist. Entfernung
          diktiert die Ellbogenbeugung; die Schulter schwenkt den gebeugten Arm dann auf die
          Peilung. Und beachte den Riss in der Gleichung: Ein Cosinus muss in [−1, 1] wohnen.
          Ziele, die zu weit sind (oder im gefalteten Loch), drücken ihn hinaus — die Formel
          selbst meldet <em>unerreichbar</em>: die Arbeitsraum-Lektion, in Algebra gesprochen.
        </p>

        <h2>Zwei Antworten, und manchmal keine</h2>
        <p>
          cos θ₂ = 0,5 hat zwei Antworten: θ₂ = +60° und −60°. Geometrisch:{" "}
          <strong>Ellbogen-oben und Ellbogen-unten</strong> — zwei Spiegelposen, deren Hände auf
          demselben Punkt landen. Keine ist falsch; echte Regler wählen nach Konvention, nach
          Hindernisfreiheit oder nach Nähe zur aktuellen Pose (um einen wilden Schwenk quer
          durch den Arbeitsraum mitten in der Aufgabe zu vermeiden). IK-Antworten sind eine
          Speisekarte, kein Urteil.
        </p>

        <h2>Singularitäten: eine Richtung verlieren</h2>
        <p>
          Strecke den Arm ganz durch und verlange, dass die Hand <em>weiter nach außen</em>{" "}
          fährt: Keine Gelenkgeschwindigkeit, wie groß auch immer, erzeugt Bewegung in diese
          Richtung. Der Arm steht in einer <strong>Singularität</strong> — einer Pose, in der er
          lokal eine Bewegungsrichtung verliert. In ihrer Nähe verlangen winzige Handbewegungen
          riesige Gelenkschwünge; Löser befehlen panische Geschwindigkeiten, und echte Arme
          schaudern. Industrielle Bahnplaner routen <em>um</em> singuläre Posen herum wie
          Seeleute um Untiefen — ihre Karte gehört zum Kennen eines Arms.
        </p>

        <div className="callout note">
          <span className="co-title">Sechs Gelenke, gleiche Geschichte</span>
          <p>
            Echte Arme mit sechs Gelenken tauschen den Kosinussatz gegen numerische Löser — und
            erben alles andere unverändert: mehrere Lösungen (typisch acht), unerreichbare
            Regionen, singuläre Posen. Der Zwei-Glieder-Arm ist kein Spielzeug; er ist das
            kleinste ehrliche Exemplar der Gattung.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Zielstand",
      intro: (
        <>
          <p>Zieh ein Ziel umher; der Arm löst die IK live. Schalte Ellbogen-oben/-unten um und beobachte das Singularitäts-Messgerät, wenn du die Ränder des Arbeitsraums streifst.</p>
          <ul>
            <li>Parke das Ziel mitten im Arbeitsraum und kippe Ellbogen-oben/-unten: zwei ehrliche Posen, eine Handposition.</li>
            <li>Zieh das Ziel langsam über den Rand hinaus — sieh den Arm sich strecken, das Messgerät rot anschlagen, dann den Löser aufgeben, weil cos θ₂ [−1, 1] verlässt.</li>
            <li>Fahre das Ziel den Rand entlang und sieh die Gelenke rasen, um kleinen Bewegungen zu folgen — die Untiefe, die Planer meiden.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Arm mit L₁ = L₂ = 25 cm; Ziel 35,36 cm gerade voraus (x=35,36, y=0). Mit cos θ₂ = (d² − L₁² − L₂²)/(2·L₁·L₂): Wie groß ist θ₂, in Grad? (Nimm die positive Ellbogen-oben-Antwort.)",
        answer: 90,
        unit: "°",
        tolerancePct: 3,
        hint: "d² = 1250,3 ≈ 1250; der Zähler wird ≈ 0.",
        explain: "cos θ₂ = (1250 − 625 − 625)/1250 = 0 → θ₂ = 90°. Der Arm macht am Ellbogen einen rechten Winkel — und −90° landete die Hand am selben Punkt.",
      },
    ],
    quiz: [
      {
        q: "Warum liefert die Zwei-Glieder-IK im Allgemeinen zwei Lösungen?",
        choices: [
          "Sensorrauschen verdoppelt die Antworten",
          "Ellbogen-oben und Ellbogen-unten stellen die Hand auf denselben Punkt",
          "Die Schulter kann sich doppelt herumwickeln",
          "Rundungsfehler im Cosinus",
        ],
        answer: 1,
        explain:
          "cos θ₂ = c hat die Antworten ±θ₂ — Spiegelposen an der Schulter-Ziel-Linie. Eine Karte mit zwei Gerichten, gewählt nach Konvention, Freiraum oder Kontinuität.",
      },
      {
        q: "Während der IK-Rechnung kommt cos θ₂ = 1,3 heraus. Das bedeutet…",
        choices: [
          "der Ellbogen muss 130° beugen",
          "θ₂ ist negativ",
          "das Ziel ist unerreichbar — die Gleichung selbst meldet „außerhalb des Arbeitsraums“",
          "du solltest auf Ellbogen-unten wechseln",
        ],
        answer: 2,
        explain:
          "Ein Cosinus jenseits von [−1, 1] hat keinen Winkel. Die Algebra codiert den Arbeitsraum: Zu weit (oder im gefalteten Loch) zerbricht die Gleichung, bevor es den Roboter zerbricht.",
      },
      {
        q: "In der voll gestreckten Singularität kann der Arm momentan nicht…",
        choices: [
          "seine Position gegen die Schwerkraft halten",
          "die Schulter drehen",
          "seine Gelenkwinkel messen",
          "die Hand weiter nach außen bewegen, egal wie schnell die Gelenke drehen",
        ],
        answer: 3,
        explain:
          "Nahe der vollen Streckung bewegt jede Gelenkbewegung die Hand seitwärts, nichts davon nach außen. Eine Richtung des Hand-Raums ist lokal weg — die Definition einer Singularität.",
      },
      {
        q: "Warum bevorzugen Regler die IK-Lösung, die der aktuellen Pose am nächsten liegt?",
        choices: [
          "Sie vermeidet einen wilden Schwenk durch den Arbeitsraum zur Spiegelpose mitten in der Aufgabe",
          "Sie verbraucht weniger Akku",
          "Die nähere Lösung ist genauer",
          "Ellbogen-oben ist mechanisch stärker",
        ],
        answer: 0,
        explain:
          "Beide Lösungen sind geometrisch gültig, aber der Wechsel zwischen ihnen lässt den Ellbogen einen riesigen Bogen fegen — durch was auch immer dein Arbeitsraum enthält. Kontinuität ist ein Sicherheitsmerkmal.",
      },
    ],
  },

  /* ================================================================ */
  grippers: {
    Theory: () => (
      <>
        <h2>Ein Griff ist ein Reibungsbudget</h2>
        <p>
          Parallele Finger halten ein Objekt nicht — die Reibung tut es. Die Finger drücken nur,
          und die Reibung wandelt Druck in Auftrieb:
        </p>
        <div className="formula">
          Halt = µ · F_grip · 2 ≥ m·g
          <span className="note">zwei Fingerkontakte, jeder trägt µ-mal den Druck bei — die Greif-Ungleichung</span>
        </div>
        <p>
          Unter der Schwelle <strong>rutscht</strong> das Objekt; der Mindestdruck ist
          m·g / (2µ). Über irgendeiner Decke wird es <strong>zerdrückt</strong> — eine Zahl, die
          das Objekt setzt, nicht der Roboter: hunderte Newton für einen Stahlwürfel, wenige für
          ein Ei, fast nichts für einen Pappbecher. Zwischen Rutschen und Zerdrücken liegt das{" "}
          <strong>Greif-Fenster</strong>, und Greifen ist die Kunst, darin zu landen. Für ein
          glitschiges Ei (kleines µ hebt den Boden des Fensters, Zerbrechlichkeit senkt die
          Decke) kann sich das Fenster fast schließen — darum sind Eier die kanonische
          Greifer-Vorführung.
        </p>

        <h2>Den Druck spüren</h2>
        <p>
          Ein positionsgeregelter Greifer („schließe auf 20 mm“) ist kraftblind: 1 mm
          Positionsfehler bedeutet null Kraft an einem 21-mm-Objekt und gewaltige Kraft an einem
          19-mm-Objekt. Greifer regeln darum <strong>Kraft</strong>, und der billigste
          Kraftsensor ist einer aus Einheit 1: der <em>Motorstrom</em>. Schließe, bis der
          Strom — der Druck — ein Ziel erreicht, wo immer die Finger dann stehen. Wieder
          Rückkopplung, mit Ampere als Fingerspitze.
        </p>

        <h2>Nachgiebigkeit: Weichheit als Ingenieurskunst</h2>
        <p>
          Starre Finger treffen ein hartes Objekt an ein, zwei Punkten — winzige Kontaktflächen,
          hoher lokaler Druck, und jede Fehljustierung konzentriert sich auf eine Kante.{" "}
          <strong>Nachgiebige</strong> Finger — flexibles Material, gedruckt in gummiartigem
          TPU — schmiegen sich an: Der Kontakt verteilt sich über Fläche, der lokale Druck
          sinkt, und kleine Positionsfehler werden vom Flex geschluckt statt als Kraftspitzen
          weitergereicht. Weichheit verbreitert das Greif-Fenster an beiden Enden — darum sehen
          Forschungsgreifer zunehmend nach Küchenzange aus und abnehmend nach Zange, und darum
          ist das beste Upgrade für einen Hobby-Arm meist gedruckte Gummifingerspitzen, kein
          stärkeres Servo.
        </p>

        <div className="callout note">
          <span className="co-title">Deine Hand schummelt großartig</span>
          <p>
            Menschliche Haut ist nachgiebig, reibungsstark und mit Kraftsensoren gepflastert, die
            Rutschen im Moment des Beginnens melden — du greifst ein rutschendes Glas nach, bevor
            du es bewusst bemerkst. Robotergreifer sind Jahrzehnte von dieser Sensordichte
            entfernt — darum ist „beliebige Objekte aufheben“ noch Forschungsfront, und ein
            Thema für Einheit 6.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Eier-Test",
      intro: (
        <>
          <p>Ein Zwei-Finger-Greifer über einer Aufstellung: Stahlwürfel, Apfel, Ei, Pappbecher. Ein Kraft-Schieber, eine Reibungs-Anzeige — und ein Nachgiebigkeits-Schalter.</p>
          <ul>
            <li>Hebe den Stahlwürfel: Das Fenster ist riesig, jeder ordentliche Druck genügt. Versuche nun dieselbe Kraft am Ei. Das Ei bittet um Entschuldigung.</li>
            <li>Finde das Fenster des Eis mit starren Fingern — beachte, wie wenige Newton breit es ist. Schalte auf nachgiebige Finger und miss es erneut.</li>
            <li>Mach das Ei nass (µ sinkt): Sieh den Fensterboden zur Decke klettern. Manche Griffe gibt es schlicht nicht.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein 0,06-kg-Ei mit µ = 0,4 hängt zwischen zwei Fingern (g = 9,81). Welche Mindest-Griffkraft pro Finger ist nötig, in Newton? (F = m·g / (2µ))",
        answer: 0.74,
        unit: "N",
        tolerancePct: 4,
        hint: "Zwei Kontakte teilen sich die Reibungsarbeit.",
        explain: "0,06 × 9,81 / (2 × 0,4) ≈ 0,74 N pro Finger. Zerbricht das Ei bei 5 N, ist das Fenster 0,74–5 N — bequem. Nass halbiert sich µ: Der Boden verdoppelt sich.",
      },
    ],
    quiz: [
      {
        q: "Was hält ein gegriffenes Objekt eigentlich oben?",
        choices: [
          "Die Normalkraft der Finger",
          "Luftdruck zwischen Finger und Objekt",
          "Reibung an den Kontakten, finanziert von der Griffkraft",
          "Die Steifigkeit des Objekts",
        ],
        answer: 2,
        explain:
          "Die Finger drücken waagerecht; die Schwerkraft zieht senkrecht. Nur Reibung wandelt den Druck in senkrechten Halt — Halt = µ·F·(Kontakte).",
      },
      {
        q: "Das „Greif-Fenster“ ist…",
        choices: [
          "der Griffkraft-Bereich zwischen Rutschen und Zerdrücken",
          "die verfügbare Zeit zum Schließen der Finger",
          "die maximale Öffnungsweite des Greifers",
          "der Kamerablick auf das Objekt",
        ],
        answer: 0,
        explain:
          "Boden bei m·g/(2µ), Decke von der Zerbrechlichkeit des Objekts. Alles an gutem Greifen heißt: dieses Fenster verbreitern oder darin landen.",
      },
      {
        q: "Warum regeln Greifer Kraft (oft über den Motorstrom) statt Position?",
        choices: [
          "Positionssensoren sind zu teuer",
          "Kraftregelung ist schneller",
          "Stromregelung spart Akku",
          "Ein Millimeter Positionsfehler spannt alles von keinem Kontakt bis zum Zerdrücken auf — Kraft ist die Größe, die wirklich zählt",
        ],
        answer: 3,
        explain:
          "„Schließe auf 20 mm“ bedeutet einem 19-mm-Ei nichts. „Schließe, bis der Druck 2 N erreicht“ ist der ehrliche Befehl — und der Strom meldet den Druck gratis.",
      },
      {
        q: "Nachgiebige Fingerspitzen verbreitern das Greif-Fenster, weil sie…",
        choices: [
          "das Motormoment erhöhen",
          "den Kontakt über mehr Fläche verteilen und kleine Positionsfehler als Flex schlucken statt als Kraftspitzen",
          "leichter als Metallfinger sind",
          "die Zerdrück-Schwelle des Objekts anheben",
        ],
        answer: 1,
        explain:
          "Anschmiegender Kontakt senkt den lokalen Druck (hebt die wirksame Decke), und Flex verzeiht Fehljustierung (schützt den Boden). Weichheit ist Ingenieurskunst, kein Kompromiss.",
      },
    ],
  },
};
