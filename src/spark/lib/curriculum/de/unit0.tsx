import type { LessonContentDe } from "../localize";

/**
 * Full German content for Unit 0 (charge, voltage, current): theory JSX,
 * quizzes (same answer indices as English!) and lab titles/intros.
 * Lab components themselves are shared — canvas labels stay English for now.
 */

export const unit0De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  charge: {
    Theory: () => (
      <>
        <h2>Alles beginnt im Atom</h2>
        <p>
          Jeder Gegenstand um dich herum besteht aus Atomen, und jedes Atom ist ein winziges
          Bündel Elektrizität. Sein Kern enthält <strong>Protonen</strong>, jedes mit einer{" "}
          <strong>positiven Ladung</strong>, und um den Kern bewegen sich{" "}
          <strong>Elektronen</strong>, jedes mit einer exakt gleich großen, entgegengesetzten{" "}
          <strong>negativen Ladung</strong>. Normalerweise stimmen die Anzahlen überein, die
          Ladungen heben sich auf, und das Atom wirkt von außen neutral. Die gesamte
          Elektrotechnik läuft auf einen einzigen Trick hinaus:{" "}
          <em>diese Ladungen absichtlich zu trennen und zu bewegen</em>.
        </p>
        <p>
          Ladung wird in <strong>Coulomb (C)</strong> gemessen. Ein einzelnes Elektron trägt
          winzige <code>−1,602 × 10⁻¹⁹ C</code> — ein Coulomb entspricht also etwa{" "}
          <code>6,24 × 10¹⁸</code> Elektronen, sechs Milliarden Milliarden. Ladung kommt in
          ganzen Elektronenschritten und wird nie erzeugt oder vernichtet, nur bewegt.
        </p>

        <h2>Die Kraft zwischen Ladungen</h2>
        <p>
          Zwei Ladungen schieben oder ziehen einander, ohne sich zu berühren:{" "}
          <strong>Gleiche Ladungen stoßen sich ab, entgegengesetzte ziehen sich an.</strong>{" "}
          1785 vermaß Charles-Augustin de Coulomb, wie stark diese Kraft ist:
        </p>
        <div className="formula">
          F = k · q₁ · q₂ / r²
          <span className="note">k ≈ 8,99 × 10⁹ N·m²/C² — q in Coulomb, r in Metern</span>
        </div>
        <p>
          Zwei Dinge zählen hier. Die Kraft wächst mit dem <em>Produkt</em> der Ladungen —
          verdopple eine, und die Kraft verdoppelt sich. Und sie fällt mit dem{" "}
          <strong>Quadrat des Abstands</strong>: Zieh die Ladungen doppelt so weit auseinander,
          und die Kraft sinkt auf ein Viertel. Dieses Abstandsquadrat-Gesetz hat dieselbe
          mathematische Form wie die Gravitation — nur ist Elektrizität erstaunlich viel
          stärker. Die elektrische Abstoßung zweier Protonen ist rund 10³⁶-mal größer als ihre
          gravitative Anziehung. Dass du diese kolossale Kraft im Alltag nicht bemerkst, liegt
          nur daran, dass positive und negative Ladungen überall fast perfekt gemischt sind.
        </p>

        <h2>Leiter und Isolatoren</h2>
        <p>
          In Metallen wie Kupfer gehört das äußerste Elektron jedes Atoms keinem bestimmten
          Atom — es driftet frei durch das ganze Material, als Teil eines gemeinsamen
          &bdquo;Elektronensees&ldquo;. Solche Materialien sind <strong>Leiter</strong>:
          Ladung kann sich durch sie bewegen. In Glas, Gummi oder Kunststoff sitzt jedes
          Elektron fest an seinem Atom, Ladung bleibt, wo sie ist — das sind{" "}
          <strong>Isolatoren</strong>. Ein Kabel ist genau diese Idee, praktisch gemacht: ein
          leitender Kupferkern in einer isolierenden Kunststoffjacke, damit die Ladung nur
          dorthin geht, wo wir sie haben wollen.
        </p>

        <div className="callout note">
          <span className="co-title">Statische Elektrizität kennst du schon</span>
          <p>
            Reib einen Luftballon an deinen Haaren, und du schabst Elektronen vom Haar auf den
            Ballon. Der Ballon wird negativ, dein Haar positiv — und die Coulombkraft lässt
            dein Haar nach dem Ballon greifen. Der Türklinkenschlag im Winter ist dasselbe mit
            höherem Einsatz: Dein Körper hat Ladung angesammelt, und sie springt auf einmal
            über den Spalt.
          </p>
        </div>

        <p>
          Statik-Tricks machen Spaß, aber das Ingenieurwesen braucht Ladung, die sich{" "}
          <em>kontinuierlich und kontrollierbar</em> bewegt. Dafür brauchen wir zuerst einen
          Weg, Ladungen Energie zu geben — das ist die nächste Lektion.
        </p>
      </>
    ),
    lab: {
      title: "Coulombs Kraft-Spielplatz",
      intro: (
        <>
          <p>Zwei Ladungen, ein Gesetz. Zieh sie umher und sieh der Kraft beim Antworten zu.</p>
          <ul>
            <li>Zieh eine Ladung langsam näher — beachte, wie heftig die Kraft am Ende wächst (das ist das 1/r²).</li>
            <li>Mach beide Ladungen positiv, dann gib ihnen entgegengesetzte Vorzeichen. Sieh die Pfeile umklappen.</li>
            <li>Setz eine Ladung auf 0 µC. Was passiert mit der Kraft?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Welche Teilchen bewegen sich in einem Metalldraht tatsächlich und tragen die Ladung?",
        choices: ["Protonen", "Neutronen", "Elektronen", "Ganze Atome"],
        answer: 2,
        explain:
          "Protonen sitzen fest in den Atomkernen. In Metallen bilden die äußeren Elektronen einen frei beweglichen 'See' — sie sind die Ladungsträger.",
      },
      {
        q: "Zwei Ladungen ziehen sich mit der Kraft F an. Verdoppelst du ihren Abstand, wird die Kraft…",
        choices: ["F/2", "F/4", "2F", "unverändert"],
        answer: 1,
        explain: "Im Coulombgesetz steht r² im Nenner: doppelter Abstand teilt die Kraft durch 2² = 4.",
      },
      {
        q: "Was ist die Einheit der elektrischen Ladung?",
        choices: ["das Volt", "das Ampere", "das Watt", "das Coulomb"],
        answer: 3,
        explain: "Ladung wird in Coulomb (C) gemessen. Ein Coulomb ist die Ladung von etwa 6,24 × 10¹⁸ Elektronen.",
      },
      {
        q: "Warum nimmt man Kupfer für Drähte, während dich die Kunststoffhülle schützt?",
        choices: [
          "Kupfer hat freie Elektronen; Kunststoff hält seine Elektronen fest",
          "Kupfer ist positiv geladen, Kunststoff negativ",
          "Kupfer ist schwerer als Kunststoff",
          "Kunststoff leitet, Kupfer isoliert",
        ],
        answer: 0,
        explain:
          "Kupfer ist ein Leiter — seine äußeren Elektronen driften frei. Kunststoff ist ein Isolator — seine Elektronen sind gebunden, Ladung kann nicht durch ihn in dich fließen.",
      },
    ],
  },

  /* ================================================================ */
  voltage: {
    Theory: () => (
      <>
        <h2>Ladungen auseinanderzuschieben speichert Energie</h2>
        <p>
          Das Coulombgesetz aus der letzten Lektion schneidet in beide Richtungen:
          Entgegengesetzte Ladungen ziehen sich an — ziehst du sie also <em>auseinander</em>,
          musst du Arbeit gegen diesen Zug verrichten, genau wie beim Heben eines Steins gegen
          die Schwerkraft. Diese Arbeit verschwindet nicht: Sie wird als{" "}
          <strong>elektrische potentielle Energie</strong> gespeichert. Lass los, und die
          Ladung &bdquo;fällt&ldquo; zurück und verwandelt die gespeicherte Energie in
          Bewegung.
        </p>
        <p>
          Und jetzt der entscheidende Zug: Statt über die Gesamtenergie zu reden (die davon
          abhängt, wie viel Ladung du hast), reden wir über die{" "}
          <strong>Energie pro Ladungseinheit</strong>. Diese Größe ist die{" "}
          <strong>Spannung</strong>, auch <em>Potentialdifferenz</em> genannt:
        </p>
        <div className="formula">
          V = W / Q
          <span className="note">1 Volt = 1 Joule Energie pro Coulomb Ladung</span>
        </div>
        <p>
          Eine 9-V-Batterie gibt jedem Coulomb, das sie durchläuft, 9 Joule Energie. Eine
          1,5-V-Zelle gibt 1,5 Joule pro Coulomb. Merke dir, was Spannung <em>nicht</em> ist:
          Sie ist nichts, das fließt, und sie ist keine Energie an sich. Sie ist ein Maß dafür,
          wie stark Ladungen von einem Punkt zum anderen gedrückt werden.
        </p>

        <h2>Immer zwischen zwei Punkten</h2>
        <p>
          &bdquo;Die Spannung an diesem Draht ist 5 V&ldquo; ist heimlich ein Vergleich — 5 V{" "}
          <em>relativ zu irgendwo anders</em>. Spannung wird immer{" "}
          <strong>zwischen zwei Punkten</strong> gemessen, wie eine Höhe: Die Leiterspitze ist
          2 m über dem Boden, aber 0 m über der Leiterspitze. In Schaltungen wählen wir einen
          Bezugspunkt, nennen ihn <strong>Masse (0 V)</strong> und geben alles relativ dazu an.
        </p>

        <h2>Was eine Batterie wirklich tut</h2>
        <p>
          Eine Batterie ist eine chemische <strong>Ladungspumpe</strong>. Reaktionen im Innern
          drücken Elektronen zu einem Anschluss (der wird negativ) und ziehen sie vom anderen
          ab (der wird positiv) — und pumpen weiter, bis die Potentialdifferenz zwischen den
          Anschlüssen die Nennspannung erreicht. Verbinde die Anschlüsse mit einem Drahtweg,
          und die Pumpe treibt Ladung durch die Schleife, wobei sie ihre chemische Energie in
          dem Tempo ausgibt, das die Schaltung vorgibt. Die Batterie <em>speichert</em> keine
          Elektronen — sie speichert Energie und übergibt sie jedem durchlaufenden Coulomb.
        </p>

        <div className="callout note">
          <span className="co-title">Die Wasser-Analogie (und ihre Grenzen)</span>
          <p>
            Spannung ist wie Wasserdruck: Ein höherer Wasserturm drückt Wasser kräftiger durch
            ein Rohr. Das ist ein wirklich nützliches Bild — mehr Spannung, stärkerer Druck.
            Nur: Die Elektronen werden so wenig &bdquo;verbraucht&ldquo; wie Wasser in einem
            Wasserrad verschwindet; geliefert wird die <em>Energie</em>.
          </p>
        </div>

        <h2>Felder: wie der Druck reist</h2>
        <p>
          Zwischen zwei entgegengesetzt geladenen Platten herrscht ein{" "}
          <strong>elektrisches Feld</strong> — an jedem Punkt im Spalt spürt eine positive
          Ladung eine Kraft von der +-Platte zur −-Platte. Das Feld ist die unsichtbare
          Maschinerie hinter der Spannung: Eine Ladung, die mit dem Feld wandert, gewinnt
          Energie; sie gegen das Feld zu bewegen kostet Energie. Im Labor unten kannst du das
          direkt fühlen.
        </p>
      </>
    ),
    lab: {
      title: "Der Potential-Spielplatz",
      intro: (
        <>
          <p>Zwei geladene Platten erzeugen ein homogenes Feld. Zieh die Testladung umher und lass sie dann fliegen.</p>
          <ul>
            <li>Zieh die Ladung nah an die +-Platte — sieh ihre potentielle Energie klettern.</li>
            <li>Bewege sie senkrecht entlang einer gestrichelten Linie. Ändert sich ihre Energie?</li>
            <li>Drücke <em>Release</em> bei verschiedenen Spannungen — höhere Spannung, härterer Abschuss.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Volt ist…",
        choices: ["ein Coulomb pro Sekunde", "ein Elektron pro Joule", "ein Newton pro Meter", "ein Joule pro Coulomb"],
        answer: 3,
        explain: "V = W/Q: Spannung ist Energie (Joule) pro Ladung (Coulomb).",
      },
      {
        q: "Eine 9-V-Batterie drückt 2 Coulomb Ladung durch eine Schaltung. Wie viel Energie hat sie geliefert?",
        choices: ["4,5 J", "18 J", "9 J", "11 J"],
        answer: 1,
        explain: "W = V × Q = 9 V × 2 C = 18 Joule.",
      },
      {
        q: "Welche Aussage über Spannung stimmt?",
        choices: [
          "Spannung fließt durch Drähte",
          "Spannung ist die Zahl der Elektronen in einem Draht",
          "Spannung wird immer zwischen zwei Punkten gemessen",
          "Eine Batterie speichert zusätzliche Elektronen",
        ],
        answer: 2,
        explain:
          "Spannung ist eine Potentialdifferenz zwischen zwei Punkten — wie eine Höhe braucht sie einen Bezug. Nichts namens 'Spannung' fließt.",
      },
      {
        q: "Im Platten-Labor änderte das senkrechte Verschieben der Testladung (parallel zu den Platten) nichts an ihrer Energie. Warum?",
        choices: [
          "Sie blieb auf derselben Äquipotentiallinie — gleiches Potential, gleiche Energie",
          "Die Simulation ist vereinfacht",
          "Die Ladung war zu klein",
          "Das Feld existiert nur nahe der Platten",
        ],
        answer: 0,
        explain:
          "Linien parallel zu den Platten sind Äquipotentiallinien: Jeder Punkt darauf hat dasselbe Potential, Bewegung entlang kostet keine Energie.",
      },
    ],
  },

  /* ================================================================ */
  current: {
    Theory: () => (
      <>
        <h2>Den Fluss definieren</h2>
        <p>
          Leg eine Spannung an einen Leiter, und seine freien Elektronen driften. Die
          Ladungsmenge, die pro Sekunde einen Punkt passiert, ist der{" "}
          <strong>elektrische Strom</strong>:
        </p>
        <div className="formula">
          I = Q / t
          <span className="note">1 Ampere = 1 Coulomb pro Sekunde</span>
        </div>
        <p>
          Ein <strong>Ampere</strong> (A) klingt bescheiden, bis du dich erinnerst, was ein
          Coulomb ist: Bei 1 A kreuzen etwa <code>6,24 × 10¹⁸</code> Elektronen{" "}
          <em>jede Sekunde</em> jeden Querschnitt des Drahts. Typische Ströme deines Alltags:
          Eine LED nippt an etwa 0,02 A (20 mA), ein Handyladegerät liefert ein paar Ampere,
          ein Wasserkocher zieht rund 10 A.
        </p>

        <h2>Langsames Driften, sofortiges Signal</h2>
        <p>
          Hier kommt der Missverständnis-Zerstörer der ganzen Einheit: Die Elektronen selbst
          kriechen — in einem typischen Kupferdraht liegt ihre mittlere{" "}
          <em>Driftgeschwindigkeit</em> deutlich unter einem Millimeter pro Sekunde. Trotzdem
          geht das Licht in dem Moment an, in dem du den Schalter kippst. Wie?
        </p>
        <p>
          Weil der Draht bereits randvoll mit freien Elektronen ist, von einem Ende zum
          anderen. Der Schalter legt ein Feld an, das <em>alle gleichzeitig</em> in Bewegung
          setzt — wie ein Rohr voller Murmeln: Schieb an einem Ende eine hinein, und am anderen
          Ende ploppt sofort eine heraus, obwohl sich jede einzelne kaum bewegt hat. Der{" "}
          <em>Schubs</em> reist nahezu mit Lichtgeschwindigkeit; die Elektronen selbst
          schlendern.
        </p>

        <h2>In welche Richtung fließt er?</h2>
        <p>
          Benjamin Franklin riet die Flussrichtung, bevor irgendjemand von Elektronen wusste —
          und riet falsch. Per Konvention fließt Strom <strong>von + nach −</strong>{" "}
          (&bdquo;konventionelle Stromrichtung&ldquo;), während die Elektronen tatsächlich von
          − nach + driften. Ingenieure überall benutzen die konventionelle Richtung; jede
          Formel, jedes Datenblatt, jeder Pfeil auf jedem Schaltsymbol setzt sie voraus. Das
          funktioniert perfekt, denn negative Ladung, die nach links wandert, ist mathematisch
          identisch mit positiver Ladung nach rechts. Folge der Konvention und vergiss die
          Peinlichkeit.
        </p>

        <div className="callout warn">
          <span className="co-title">Strom braucht eine geschlossene Schleife</span>
          <p>
            Ladung häuft sich nicht im Draht an und verschwindet nicht am Ende — sie
            zirkuliert. Strom fließt nur, wenn es einen ununterbrochenen leitenden Pfad vom
            einen Batteriepol durch die Schaltung zurück zum anderen gibt. Unterbrich den Pfad
            irgendwo, und der Strom stoppt <em>überall</em>. Darum geht es in der nächsten
            Einheit um Stromkreise: In geschlossenen Schleifen verrichtet Elektrizität ihre
            Arbeit.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Ladungszähler",
      intro: (
        <>
          <p>Ein vergrößerter Blick in einen Kupferdraht, mit einem Zähler über einem Querschnitt.</p>
          <ul>
            <li>Stell 1 A ein und beobachte den Elektronenzähler — das sind 10¹⁸ Elektronen pro Sekunde.</li>
            <li>Dreh den Strom auf null. Die Elektronen stoppen; der Zähler behält seine Summe.</li>
            <li>Beachte die zwei Pfeile: konventionelle Richtung hier, echte Elektronendrift dort.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Ampere ist…",
        choices: ["ein Joule pro Sekunde", "ein Volt pro Meter", "ein Coulomb pro Sekunde", "ein Elektron pro Sekunde"],
        answer: 2,
        explain: "I = Q/t. Ein Strom von 1 A heißt: 1 Coulomb Ladung passiert pro Sekunde.",
      },
      {
        q: "Ein konstanter Strom von 2 A fließt 10 Sekunden lang. Wie viel Ladung ist geflossen?",
        choices: ["20 C", "5 C", "12 C", "0,2 C"],
        answer: 0,
        explain: "Q = I × t = 2 A × 10 s = 20 Coulomb.",
      },
      {
        q: "Warum leuchtet eine Lampe sofort, obwohl Elektronen langsamer als 1 mm/s driften?",
        choices: [
          "Elektronen reisen in Wahrheit mit Lichtgeschwindigkeit",
          "Die Wärme des Schalters wandert den Draht entlang",
          "Die Lampe speichert Elektronen auf Vorrat",
          "Der Draht ist schon voller Elektronen, die alle gleichzeitig losgehen",
        ],
        answer: 3,
        explain:
          "Das elektrische Feld breitet sich nahezu lichtschnell aus und setzt den ganzen Elektronensee gleichzeitig in Bewegung — wie ein bereits volles Murmelrohr.",
      },
      {
        q: "Konventioneller Strom fließt in einer Schaltung…",
        choices: [
          "von − nach +, in Richtung der Elektronen",
          "von + nach −, entgegen der Elektronendrift",
          "in beide Richtungen gleichzeitig",
          "nur innerhalb der Batterie",
        ],
        answer: 1,
        explain:
          "Per historischer Konvention zeigen Strompfeile von + nach −. Die Elektronen driften andersherum — beide Beschreibungen sind physikalisch gleichwertig.",
      },
    ],
  },
};
