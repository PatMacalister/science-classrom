import type { LessonContentDe } from "../localize";

export const unit0De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  velocity: {
    Theory: () => (
      <>
        <h2>Zwei Zahlen schlagen jede Beschreibung</h2>
        <p>
          Alles in diesem Kurs beginnt mit demselben Schritt: Ersetze Worte durch Messungen. Bei
          Bewegung sind die Messungen die <strong>Position</strong> — wo etwas ist, relativ zu
          einem gewählten Nullpunkt — und die Zeit. Position braucht ein Vorzeichen: +3 m und
          −3 m sind verschiedene Orte auf den beiden Seiten deiner Null. Nullpunkt und positive
          Richtung wählst du selbst; der Natur ist es egal, deinen Gleichungen nicht.
        </p>
        <p>
          Die <strong>Geschwindigkeit</strong> sagt, wie schnell sich die Position ändert — und in
          welche Richtung:
        </p>
        <div className="formula">
          v = Δx / Δt
          <span className="note">Positionsänderung durch Zeitänderung — Meter pro Sekunde, mit Vorzeichen</span>
        </div>
        <p>
          Das Vorzeichen zählt so viel wie der Betrag. Ein Auto mit −20 m/s ist nicht langsamer
          als eines mit +20 m/s; es fährt in die andere Richtung. <strong>Tempo</strong> ist
          Geschwindigkeit ohne Vorzeichen — gut für Tachos, zu wenig für Physik.
        </p>

        <h2>Der Durchschnitt versteckt, der Moment verrät</h2>
        <p>
          Fahr 100 km in zwei Stunden, und deine <em>mittlere</em> Geschwindigkeit ist 50 km/h —
          auch wenn du zwanzig Minuten geparkt hast und zehn mit 130 unterwegs warst. Die{" "}
          <strong>Momentangeschwindigkeit</strong> ist, was der Tacho jetzt gerade zeigt: der
          Durchschnitt über ein verschwindend kleines Δt. Die meisten Aussagen der Physik meinen
          die Momentanversion.
        </p>

        <h2>Lies den Graphen wie einen Satz</h2>
        <p>Trage die Position gegen die Zeit auf, und die Bewegung wird auf einen Blick lesbar:</p>
        <ul>
          <li><strong>Waagerechte Linie</strong> — geparkt. Die Position ändert sich nicht.</li>
          <li><strong>Gerade Steigung</strong> — konstante Geschwindigkeit. Steiler = schneller.</li>
          <li><strong>Gefälle</strong> — Bewegung in die negative Richtung.</li>
          <li><strong>Krümmung</strong> — die Geschwindigkeit selbst ändert sich: das Thema der nächsten Lektion.</li>
        </ul>
        <p>
          Die Regel darunter: <strong>Die Steigung des Positionsgraphen ist die
          Geschwindigkeit.</strong> Diese eine Idee — dass die Steigung eines Graphen etwas
          Physikalisches bedeutet — zieht sich durch die ganze Physik, und das Labor unten macht
          sie zum Reflex.
        </p>

        <div className="callout note">
          <span className="co-title">Relativ wozu?</span>
          <p>
            Du sitzt still — und bewegst dich mit 30 km/s um die Sonne. Beides stimmt;
            Geschwindigkeit heißt immer nur Geschwindigkeit <em>relativ zu etwas</em>. Die Physik
            lässt dich den Bezug wählen, der die Aufgabe leicht macht — darum fühlen sich
            Zug-und-Bahnsteig-Rätsel wie Tricks an: Es sind nur zwei gültige Nullpunkte, die sich
            uneins sind.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Bewegungs-Grapher",
      intro: (
        <>
          <p>Steuere einen Wagen mit einem Geschwindigkeitsregler und sieh beiden Graphen beim Selberschreiben zu.</p>
          <ul>
            <li>Halte eine konstante positive Geschwindigkeit: Der Positionsgraph zeichnet eine gerade Rampe.</li>
            <li>Stell die Geschwindigkeit mittendrin auf null — genau dort wird die Positionslinie flach.</li>
            <li>Geh ins Negative und sieh die Position zurücksinken. Steigung ist Geschwindigkeit, überall und immer.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein Läufer schafft 400 m in 50 s bei gleichmäßigem Tempo. Wie groß ist seine Geschwindigkeit in m/s?",
        answer: 8,
        unit: "m/s",
        hint: "v = Δx / Δt.",
        explain: "400 ÷ 50 = 8 m/s — Weltklassetempo, eine volle Stadionrunde lang gehalten.",
      },
      {
        prompt:
          "Eine Radfahrerin fährt 120 s lang mit 5 m/s und steht dann 60 s an einer Ampel. Wie groß ist die mittlere Geschwindigkeit über die ganzen 180 s, in m/s?",
        answer: 3.33,
        unit: "m/s",
        tolerancePct: 3,
        hint: "Erst die Gesamtstrecke: Nur der Fahranteil bringt Meter.",
        explain: "Strecke = 5 × 120 = 600 m in 180 s → 600/180 ≈ 3,33 m/s. Durchschnitte schlucken die rote Ampel.",
      },
    ],
    quiz: [
      {
        q: "Was verrät die Steigung eines Position-Zeit-Graphen?",
        choices: ["Die Beschleunigung", "Die Geschwindigkeit", "Die zurückgelegte Strecke", "Nichts Physikalisches"],
        answer: 1,
        explain:
          "Steigung ist Höhe durch Breite — Δx durch Δt — und das ist die Definition der Geschwindigkeit. Steiler heißt schneller; abwärts heißt negative Richtung.",
      },
      {
        q: "Die Geschwindigkeit eines Autos beträgt −15 m/s. Was bedeutet das Minuszeichen?",
        choices: [
          "Es wird langsamer",
          "Es liegt unter dem Durchschnittstempo",
          "Es bewegt sich in die Richtung, die du als negativ gewählt hast",
          "Die Messung ist fehlgeschlagen",
        ],
        answer: 2,
        explain:
          "Das Vorzeichen codiert die Richtung, sonst nichts. −15 m/s ist genauso schnell wie +15 m/s, nur andersherum.",
      },
      {
        q: "Worin unterscheiden sich mittlere und Momentangeschwindigkeit?",
        choices: [
          "Der Durchschnitt gilt über ein Intervall; der Momentanwert gilt in einem Augenblick",
          "Der Durchschnitt ist immer größer",
          "Der Momentanwert ignoriert die Richtung",
          "Es ist dasselbe",
        ],
        answer: 0,
        explain:
          "Der Zwei-Stunden-Durchschnitt kann eine Parkpause und einen schnellen Abschnitt verbergen. Der Tacho zeigt den Momentanwert.",
      },
      {
        q: "Ein waagerechter (flacher) Abschnitt im Position-Zeit-Graphen bedeutet…",
        choices: [
          "konstante Vorwärtsgeschwindigkeit",
          "das Objekt ist zum Start zurückgekehrt",
          "gleichmäßige Beschleunigung",
          "das Objekt bewegt sich nicht",
        ],
        answer: 3,
        explain: "Die Position ändert sich nicht, während Zeit vergeht — das Objekt parkt. Null Steigung, null Geschwindigkeit.",
      },
    ],
  },

  /* ================================================================ */
  acceleration: {
    Theory: () => (
      <>
        <h2>Die Rate der Rate</h2>
        <p>
          Geschwindigkeit sagt, wie schnell sich die Position ändert.{" "}
          <strong>Beschleunigung</strong> sagt, wie schnell sich die{" "}
          <em>Geschwindigkeit</em> ändert:
        </p>
        <div className="formula">
          a = Δv / Δt
          <span className="note">Meter pro Sekunde, pro Sekunde — geschrieben m/s²</span>
        </div>
        <p>
          Das doppelte „pro Sekunde“ stolpert jeden einmal. Eine Beschleunigung von 3 m/s²
          bedeutet: Jede Sekunde wächst die Geschwindigkeit um 3 m/s. Nach einer Sekunde 3 m/s
          schneller, nach zweien 6. Nichts daran sagt, wie schnell du <em>bist</em> — ein Jet im
          Reiseflug hat enorme Geschwindigkeit und null Beschleunigung; ein Dragster am Start
          wenig Geschwindigkeit und brutale Beschleunigung.
        </p>
        <p>
          Bremsen ist auch Beschleunigung (entgegen der Bewegung), und — feiner — Kurvenfahren
          bei konstantem Tempo ebenfalls, denn die <em>Richtung</em> der Geschwindigkeit ändert
          sich. Vorerst bleiben wir auf Geraden; der Kurvenfall kehrt mit den Umlaufbahnen
          zurück.
        </p>

        <h2>Zwei Formeln tragen die Einheit</h2>
        <p>Aus dem Stand, mit konstanter Beschleunigung:</p>
        <div className="formula">
          v = a·t &nbsp;&nbsp;·&nbsp;&nbsp; x = ½·a·t²
          <span className="note">Geschwindigkeit wächst linear; die Strecke mit dem Quadrat der Zeit</span>
        </div>
        <p>
          Das ½t² lohnt einen langen Blick: In doppelter Zeit kommst du <em>viermal</em> so
          weit, weil du die späteren Meter mit höherem Tempo zurücklegst. Im
          Position-Zeit-Graphen zeichnet konstante Beschleunigung eine Parabel — die Kurve, die
          letzte Lektion „Krümmung“ hieß.
        </p>

        <h2>Freier Fall: das saubere Experiment der Schwerkraft</h2>
        <p>
          Lass nahe der Erdoberfläche irgendetwas los, und — solange der Luftwiderstand klein
          bleibt — gewinnt es <strong>9,81 m/s Tempo pro Sekunde</strong>. Diese Zahl ist{" "}
          <strong>g</strong>. Schwer oder leicht spielt keine Rolle: Galileis Behauptung, Apollo
          15s Vorführung (Hammer und Falkenfeder auf dem Mond, gemeinsam gelandet) und die
          nützlichste Konstante dieses Kurses. In Einheit 3 misst du sie selbst, mit Schnur und
          Stoppuhr.
        </p>
        <p>
          Der Luftwiderstand ist der Alltagsverderber: Er wächst mit dem Tempo, bis er die
          Schwerkraft ausgleicht und die Geschwindigkeit nicht mehr steigt —{" "}
          <strong>Endgeschwindigkeit</strong>. Ein Fallschirmspringer in Bauchlage: etwa
          55 m/s. Eine Feder: Zentimeter pro Sekunde — weshalb Aristoteles zwanzig Jahrhunderte
          lang im Zweifel recht bekam.
        </p>

        <div className="callout note">
          <span className="co-title">Dein Körper ist ein Beschleunigungsmesser</span>
          <p>
            Geschwindigkeit spürst du nicht — ein ruhiger Zug bei 300 km/h fühlt sich an wie dein
            Sofa. Du spürst <em>Beschleunigung</em>: den Druck des Sitzes, das Rucken des
            Aufzugs. Darum schweben die Astronauten der ISS: Sie und ihre Station beschleunigen
            identisch Richtung Erde, und was verschwindet, ist der <em>relative</em> Druck, den
            du Gewicht nennst.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Fallturm",
      intro: (
        <>
          <p>Lass eine Kugel fallen, sieh v klettern und x sich krümmen — mit oder ohne Luft.</p>
          <ul>
            <li>Prüf im Vakuum den Streckenzähler bei 1 s und 2 s: viermal die Strecke in doppelter Zeit.</li>
            <li>Schalte den Luftwiderstand ein und finde die Endgeschwindigkeit, bei der das Tempo aufhört zu wachsen.</li>
            <li>Probier die Mondschwerkraft. Gleiche Physik, trägere Parabel.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein Stein wird aus der Ruhe fallen gelassen (g = 9,81 m/s², ohne Luft). Wie schnell fällt er nach 3 s, in m/s?",
        answer: 29.4,
        unit: "m/s",
        tolerancePct: 2,
        hint: "v = g·t.",
        explain: "9,81 × 3 ≈ 29,4 m/s — über 100 km/h nach nur drei Sekunden Fall.",
      },
      {
        prompt: "Wie weit ist der Stein in diesen 3 s gefallen, in Metern? (x = ½·g·t²)",
        answer: 44.1,
        unit: "m",
        tolerancePct: 2,
        hint: "Die Hälfte von 9,81, mal neun.",
        explain: "½ × 9,81 × 9 ≈ 44,1 m — ein 14-stöckiges Haus. Das Quadrat im t² richtet den Schaden an.",
      },
    ],
    quiz: [
      {
        q: "Was bedeutet eine Beschleunigung von 2 m/s²?",
        choices: [
          "Das Objekt bewegt sich 2 m pro Sekunde",
          "Die Geschwindigkeit des Objekts beträgt 2 m/s",
          "Das Objekt gewinnt jede Sekunde 2 m/s Geschwindigkeit hinzu",
          "Das Objekt legt insgesamt 2 m zurück",
        ],
        answer: 2,
        explain:
          "Beschleunigung ist Geschwindigkeitsänderung pro Sekunde — das „pro Sekunde pro Sekunde“ ist die ganze Idee.",
      },
      {
        q: "Eine Kugel wird fallen gelassen, eine zweite im selben Moment aus gleicher Höhe waagerecht geworfen (ohne Luft). Welche landet zuerst?",
        choices: [
          "Die fallen gelassene",
          "Die geworfene",
          "Beide landen gleichzeitig",
          "Das hängt von ihren Massen ab",
        ],
        answer: 2,
        explain:
          "Die senkrechte Bewegung kümmert die waagerechte nicht — beide fallen mit demselben g aus derselben Höhe. Nächste Lektion wird genau das die Hauptsache.",
      },
      {
        q: "Warum fällt eine Feder auf der Erde langsam, auf dem Mond aber wie ein Hammer?",
        choices: [
          "Die Mondschwerkraft ist stärker",
          "Auf der Erde gleicht der Luftwiderstand das kleine Gewicht der Feder fast sofort aus",
          "Federn sind auf dem Mond leichter",
          "Gar nicht — Federn fallen überall langsam",
        ],
        answer: 1,
        explain:
          "Freier Fall ist nur ohne Luft „frei“. Nimm die Atmosphäre weg, und Hammer und Feder landen zusammen — Apollo 15 hat genau das gefilmt.",
      },
      {
        q: "Beim freien Fall aus der Ruhe: Doppelte Fallzeit vervielfacht die Fallstrecke um…",
        choices: ["das Vierfache", "das Doppelte", "das Achtfache", "gar nicht"],
        answer: 0,
        explain: "x = ½·g·t²: Die Strecke wächst mit dem Quadrat der Zeit. Doppelte Zeit, vierfacher Fall.",
      },
      {
        q: "Wobei tritt Beschleunigung auf?",
        choices: [
          "Ein Auto fährt geradeaus mit konstant 120 km/h",
          "Ein geparkter Lkw",
          "Ein Satellit gleitet im tiefen All geradlinig mit konstantem Tempo",
          "Ein Auto durchfährt eine Kurve mit konstant 60 km/h",
        ],
        answer: 3,
        explain:
          "Geschwindigkeit hat eine Richtung. Kurvenfahren ändert die Richtung, also ändert sich die Geschwindigkeit — das ist Beschleunigung, auch bei konstantem Tempo.",
      },
    ],
  },

  /* ================================================================ */
  projectiles: {
    Theory: () => (
      <>
        <h2>Die große Entkopplung</h2>
        <p>
          Wirf einen Ball, und seine Bahn wirkt kompliziert — eine Kurve durch die Luft, Position
          und Tempo überall im Wandel. Der Trick, der sie zähmt, ist fast verdächtig einfach:{" "}
          <strong>Waagerechte und senkrechte Bewegung laufen unabhängig.</strong>
        </p>
        <ul>
          <li>
            <strong>Waagerecht</strong> schiebt und zieht nichts (Luft beiseite), also bleibt das
            Seitwärtstempo einfach… bestehen. Gleichmäßige Bewegung, der leichteste Fall der
            letzten Lektion.
          </li>
          <li>
            <strong>Senkrecht</strong> ist der Ball im ganz gewöhnlichen freien Fall: Die
            Schwerkraft füttert ihn mit −9,81 m/s senkrechtem Tempo pro Sekunde, ob er sich
            nebenbei seitwärts bewegt oder nicht.
          </li>
        </ul>
        <p>
          Die gekrümmte Bahn — eine <strong>Parabel</strong> — entsteht, wenn ein gleichmäßiger
          Marsch und ein beschleunigter Fall zusammengeheftet werden. Die Gewehrkugel-Version:
          Feuere eine Kugel waagerecht ab und lass im selben Moment eine zweite aus gleicher Höhe
          fallen — sie schlagen <em>gleichzeitig</em> auf. Die abgefeuerte nur sehr viel weiter
          weg.
        </p>

        <h2>Einen Abschuss zerlegen</h2>
        <p>
          Ein Start mit Tempo v unter Winkel θ wird zerlegt in den Seitwärtsanteil und den
          Aufwärtsanteil:
        </p>
        <div className="formula">
          vₓ = v·cos θ &nbsp;&nbsp;·&nbsp;&nbsp; v_y = v·sin θ
          <span className="note">dann behandle jeden als eigene eindimensionale Aufgabe</span>
        </div>
        <p>
          Der senkrechte Anteil kauft Flugzeit: Der Ball steigt, bis die Schwerkraft das ganze
          v_y aufgezehrt hat, und fällt symmetrisch zurück. Der waagerechte Anteil gibt diese
          Flugzeit für Strecke aus. Die Weite ist das Produkt der beiden — darum ist{" "}
          <strong>45°</strong> auf ebenem Boden (im Vakuum) der ideale Kompromiss: Steiler
          gewinnt Flugzeit, verschwendet aber Tempo nach oben; flacher fliegt schnell, landet
          aber zu früh.
        </p>

        <h2>Wo das Ideal bricht</h2>
        <p>
          Echte Geschosse spüren Luftwiderstand, der Weite stiehlt und den Idealwinkel unter 45°
          drückt — Fußbälle und Speere fliegen am besten um 35–40°. Die Parabel ist der saubere
          Grenzfall, und den sauberen Grenzfall zu kennen heißt zu sehen, was die Luft tut: Der
          Unterschied zwischen Modell und Wurf <em>ist</em> der Luftwiderstand.
        </p>

        <div className="callout note">
          <span className="co-title">Der Affe und der Jäger</span>
          <p>
            Klassisches Physikrätsel: Ein Jäger zielt mit einem Betäubungspfeil{" "}
            <em>direkt</em> auf einen Affen im Baum; der Affe lässt genau im Abschussmoment los.
            Wohin hätte der Jäger zielen sollen? Genau dorthin, wo er gezielt hat: Pfeil und Affe
            fallen ab dem Loslassen mit demselben g, also biegt die Schwerkraft den Pfeil exakt
            auf den fallenden Affen. Unabhängigkeit der Bewegungen, als Witz verkleidet.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Abschussrampe",
      intro: (
        <>
          <p>Winkel, Tempo, Feuer. Die Flugbahn wird mit ihren zwei Schatten gezeichnet: einer fällt, einer marschiert.</p>
          <ul>
            <li>Vergleiche bei gleichem Tempo 30° und 60° — gleiche Weite, verschiedener Flug (die zwei Hälften des 45°-Kompromisses).</li>
            <li>Finde den Winkel für maximale Weite, dann den für maximale Flugzeit.</li>
            <li>Beobachte den senkrechten Schatten: Er ist exakt der Fall der letzten Lektion, egal bei welchem Winkel.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Ball rollt mit 4 m/s von einem 1,25 m hohen Tisch. Wie lange ist er in der Luft, in Sekunden? (Die Fallzeit hängt nur von der Höhe ab: t = √(2h/g), g ≈ 10 m/s²)",
        answer: 0.5,
        unit: "s",
        tolerancePct: 3,
        hint: "Die 4 m/s sind für diesen Teil eine falsche Fährte.",
        explain: "t = √(2×1,25/10) = √0,25 = 0,5 s. Das Seitwärtstempo hat bei der Fallzeit keine Stimme.",
      },
      {
        prompt: "Wie weit von der Tischkante entfernt landet er, in Metern?",
        answer: 2,
        unit: "m",
        tolerancePct: 3,
        hint: "Gleichmäßiges Seitwärtstempo × die eben gefundene Flugzeit.",
        explain: "4 m/s × 0,5 s = 2 m. Zwei eindimensionale Aufgaben, am Ende multipliziert.",
      },
    ],
    quiz: [
      {
        q: "Was passiert mit dem waagerechten Tempo eines Geschosses während des Flugs (ohne Luft)?",
        choices: [
          "Es bleibt konstant — waagerecht wirkt nichts",
          "Es nimmt stetig ab",
          "Die Schwerkraft dreht es langsam nach unten",
          "Es wächst, während der Ball fällt",
        ],
        answer: 0,
        explain:
          "Die Schwerkraft zieht nur senkrecht. Ohne waagerechte Kraft bleibt das Seitwärtstempo vom Start bis zur Landung unberührt.",
      },
      {
        q: "Eine Kugel wird waagerecht abgefeuert, eine zweite gleichzeitig aus gleicher Höhe fallen gelassen. Welche landet zuerst?",
        choices: [
          "Die fallen gelassene — sie hat weniger Strecke",
          "Die abgefeuerte — sie ist schneller",
          "Beide landen gleichzeitig",
          "Die abgefeuerte landet nie",
        ],
        answer: 2,
        explain:
          "Beide starten mit null senkrechtem Tempo und fallen mit demselben g. Das riesige waagerechte Tempo der abgefeuerten ist für ihren Fall belanglos.",
      },
      {
        q: "Warum maximiert 45° die Weite auf ebenem Boden (im Vakuum)?",
        choices: [
          "Es ist der Winkel mit dem geringsten Luftwiderstand",
          "Er balanciert Flugzeit (aus dem senkrechten Anteil) und Bodentempo (den waagerechten Anteil) am besten",
          "Die Schwerkraft ist bei 45° am schwächsten",
          "Er maximiert das Abschusstempo",
        ],
        answer: 1,
        explain:
          "Weite ≈ Flugzeit × Bodentempo. Steiler kauft Zeit, verschwendet aber Tempo nach oben; flacher ist schnell, aber kurz. 45° teilt das Tempo gleichmäßig.",
      },
      {
        q: "Im Affe-und-Jäger-Rätsel trifft der Pfeil den fallenden Affen, weil…",
        choices: [
          "der Jäger unter den Affen gezielt hat",
          "Pfeile geradlinig fliegen",
          "der Affe schneller fällt als der Pfeil",
          "beide ab demselben Moment mit demselben g fallen, sodass die Schwerkraft den Pfeil auf den Affen biegt",
        ],
        answer: 3,
        explain:
          "Ziel direkt aufs Ziel: Ab dem Loslassen gewinnen beide identische Abwärtsbewegung, der Zielpunkt fällt also mit dem Affen mit.",
      },
    ],
  },
};
