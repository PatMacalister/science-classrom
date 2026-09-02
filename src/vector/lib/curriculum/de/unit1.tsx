import type { LessonContentDe } from "../localize";

export const unit1De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "newton-laws": {
    Theory: () => (
      <>
        <h2>Erstes Gesetz: Bewegung ist gratis</h2>
        <p>
          Aristoteles glaubte, bewegte Dinge blieben von Natur aus stehen — und der Alltag gibt
          ihm recht: Hör auf zu treten, und du rollst aus. Newtons erstes Gesetz behauptet das
          Gegenteil: <strong>Ein Objekt behält seine Geschwindigkeit — auch null — solange keine
          Nettokraft auf es wirkt.</strong> Die Dinge um dich herum bleiben stehen, weil Reibung
          und Luftwiderstand an ihnen zerren, nicht weil Stehenbleiben natürlich wäre. Nimm die
          Kräfte weg (ein Airhockey-Puck, eine Sonde im tiefen All), und Bewegung läuft einfach
          weiter — gratis, für immer.
        </p>
        <p>
          Die Eigenschaft des „Weitermachens“ heißt <strong>Trägheit</strong>, und die Masse ist
          ihr Maß. Darum kippst du nach vorn, wenn der Bus bremst: Der Bus bekam eine Kraft, du
          nicht — du hast einfach weitergemacht.
        </p>

        <h2>Zweites Gesetz: der Wechselkurs</h2>
        <div className="formula">
          F = m·a
          <span className="note">Newton = Kilogramm × Meter pro Quadratsekunde</span>
        </div>
        <p>
          Das zweite Gesetz beziffert die Änderung: Wie viel Beschleunigung eine Kraft kauft,
          hängt von der Masse ab, die im Weg steht. Doppelte Kraft, doppelte Beschleunigung;
          doppelte Masse, halbe. Lies es in beide Richtungen — Ingenieure rechnen genauso oft aus
          gemessenen Beschleunigungen auf Kräfte zurück. Und beachte, was es leise sagt:{" "}
          <strong>Null Nettokraft heißt null Beschleunigung</strong>, nicht null Bewegung — das
          erste Gesetz ist der Spezialfall des zweiten.
        </p>
        <p>
          „Netto“ trägt Last. Kräfte addieren sich mit Vorzeichen: 500 N Schub gegen 480 N
          Reibung sind 20 N Nettokraft, und die Beschleunigung entsteht aus den 20.
        </p>

        <h2>Drittes Gesetz: Kräfte kommen paarweise</h2>
        <p>
          Drück gegen eine Wand, und die Wand drückt zurück — exakt gleich stark, exakt entgegen,{" "}
          <em>immer</em>, ohne Ausnahme und ohne Verzögerung. Kräfte sind Wechselwirkungen, und
          eine Wechselwirkung packt beide Beteiligten. Gehen ist die Erde nach hinten schieben;
          Schwimmen ist Wasser nach hinten werfen; eine Rakete steigt, indem sie Gas nach unten
          schleudert. Die Partnerkräfte wirken auf <em>verschiedene Objekte</em> — deshalb heben
          sie sich nicht auf: Der Schub des Bodens bewegt <em>dich</em>, dein Schub bewegt den
          Planeten (unmessbar).
        </p>

        <div className="callout note">
          <span className="co-title">Das Pferd-und-Wagen-Paradox</span>
          <p>
            „Wenn der Wagen so stark am Pferd zieht wie das Pferd am Wagen — wie bewegt sich dann
            je etwas?“ — Weil die Bewegung des Wagens allein von den Kräften{" "}
            <em>auf den Wagen</em> entschieden wird: dem Zug des Pferdes nach vorn gegen die
            Reibung des Bodens nach hinten. Der Zug des Wagens am Pferd steht im Hauptbuch des
            Pferdes. Führe pro Objekt getrennte Bücher, und das Paradox verdunstet.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Kraft gegen Wagen",
      intro: (
        <>
          <p>Ein Wagen, eine Schubkraft, ein Reibungsregler — und das zweite Gesetz macht die Arithmetik.</p>
          <ul>
            <li>Stell die Reibung auf null und gib einen kurzen Schub: Der Wagen hält nie an. Das erste Gesetz, sichtbar.</li>
            <li>Verdopple die Kraft bei fester Masse und lies die Beschleunigung ab. Dann verdopple stattdessen die Masse.</li>
            <li>Gleiche den Schub exakt der Reibung an: netto null, konstantes Tempo — Bewegung ohne Beschleunigung.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein 1.200 kg schweres Auto beschleunigt mit 2,5 m/s². Welche Nettokraft wirkt auf es, in Newton?",
        answer: 3000,
        unit: "N",
        hint: "F = m·a.",
        explain: "1.200 × 2,5 = 3.000 N — etwa die Gewichtskraft von 300 kg, seitwärts drückend.",
      },
      {
        prompt:
          "Du schiebst einen 60-kg-Wagen mit 90 N, die Reibung hält mit 30 N dagegen. Wie groß ist seine Beschleunigung, in m/s²?",
        answer: 1,
        unit: "m/s²",
        hint: "Erst die Nettokraft.",
        explain: "Netto = 90 − 30 = 60 N; a = 60/60 = 1 m/s². Der Wagen spürt immer nur das Netto.",
      },
    ],
    quiz: [
      {
        q: "Was tut ein Objekt laut erstem Gesetz, wenn die Nettokraft auf es null ist?",
        choices: [
          "Es wird langsamer und bleibt stehen",
          "Es behält seine aktuelle Geschwindigkeit — ob die null ist oder 200 m/s",
          "Es beschleunigt sachte",
          "Es kehrt um",
        ],
        answer: 1,
        explain:
          "Keine Nettokraft, keine Änderung. Alltagsdinge halten an, weil Reibung eine Kraft ist — nicht weil Anhalten natürlich wäre.",
      },
      {
        q: "Dieselbe Kraft wirkt auf zwei Kisten; eine hat die doppelte Masse. Die schwerere Kiste…",
        choices: [
          "beschleunigt halb so stark",
          "beschleunigt genauso stark",
          "bewegt sich nicht",
          "beschleunigt doppelt so stark",
        ],
        answer: 0,
        explain: "a = F/m — Masse ist der Preis der Beschleunigung. Doppelte Masse, halbe Antwort.",
      },
      {
        q: "Du drückst mit 100 N gegen eine Wand. Was sagt das dritte Gesetz über die Wand?",
        choices: [
          "Nichts — Wände sind passiv",
          "Sie schluckt die Kraft als Wärme",
          "Sie drückt mit exakt 100 N zurück",
          "Sie drückt mit etwas weniger als 100 N zurück",
        ],
        answer: 2,
        explain:
          "Kräfte sind Wechselwirkungen: gleiche Größe, entgegengesetzte Richtung, keine Ausnahmen. Diese Reaktionskraft spürst du in den Handflächen.",
      },
      {
        q: "Warum heben sich die Kräftepaare des dritten Gesetzes nicht gegenseitig auf?",
        choices: [
          "Sie wirken zu verschiedenen Zeiten",
          "Eine ist immer etwas größer",
          "Sie heben sich nur bei kleinem Tempo auf",
          "Sie wirken auf verschiedene Objekte — die Bewegung jedes Objekts entscheiden nur seine eigenen Kräfte",
        ],
        answer: 3,
        explain:
          "Dein Druck wirkt auf die Wand; der Druck der Wand wirkt auf dich. Aufheben können sich nur Kräfte am selben Objekt.",
      },
      {
        q: "Eine Rakete im leeren All beschleunigt, indem sie…",
        choices: [
          "sich an der Luft der Startrampe abstößt",
          "Masse (Abgas) nach hinten wirft, was die Rakete nach vorn drückt",
          "Treibstoff verbrennt, um Gewicht zu verlieren",
          "gar nicht — es gibt nichts zum Abstoßen",
        ],
        answer: 1,
        explain:
          "Das Gas ist das Etwas zum Abstoßen. Rakete drückt Gas nach hinten; Gas drückt Rakete nach vorn — das dritte Gesetz braucht keine Straße.",
      },
    ],
  },

  /* ================================================================ */
  friction: {
    Theory: () => (
      <>
        <h2>Zwei Sorten, ein schlechter Ruf</h2>
        <p>
          Reibung ist die seitliche Kraft, die Oberflächen aufeinander ausüben. Sie kommt in zwei
          Spielarten mit wirklich verschiedenen Aufgaben. <strong>Haftreibung</strong> wirkt auf
          Dinge, die <em>nicht</em> gleiten — sie hält die Kiste auf der Rampe und deine
          Schuhsohle am Pflaster. <strong>Gleitreibung</strong> wirkt auf Dinge, die{" "}
          <em>bereits</em> gleiten, stets gegen das Gleiten. Die Rangfolge zählt: Haften ist
          stärker — darum ist es schwerer, eine schwere Kiste loszubekommen, als sie in Bewegung
          zu halten, und darum hat ein schlitterndes Auto den Großteil seiner Bremsung schon
          verloren.
        </p>

        <h2>Die Reibungsregel</h2>
        <div className="formula">
          F ≤ µ·N
          <span className="note">µ (mü): die Rauigkeitszahl des Flächenpaars · N: wie fest sie aufeinanderdrücken</span>
        </div>
        <p>
          Zwei Dinge bestimmen die Reibung: wie fest die Flächen zusammengepresst werden (die{" "}
          <strong>Normalkraft</strong> N — für eine Kiste auf ebenem Boden ihr Gewicht) und der{" "}
          <strong>Koeffizient µ</strong> des Flächenpaars — Gummi auf trockenem Asphalt ≈ 0,8,
          Stahl auf Eis ≈ 0,03. Die Haftreibung regelt sich selbst bis zu einem Maximum von µN:
          Sie spiegelt deinen Schub exakt, bis du es überschreitest; dann reißt die Kiste los,
          und der schwächere Gleitwert übernimmt.
        </p>
        <p>
          Die berühmte Überraschung: Für gewöhnliches Gleiten spielt die Kontakt<em>fläche</em>{" "}
          kaum eine Rolle. Breite Reifen greifen in diesem einfachen Modell nicht wegen der
          Fläche besser — dasselbe Gewicht verteilt sich nur auf mehr Gummi und drückt jeden
          Flecken schwächer. (Rennreifen gewinnen über weichere Mischungen und Temperatur —
          andere Physik, reicheres µ.)
        </p>

        <h2>Der Kipptest</h2>
        <p>
          Leg einen Klotz auf ein Brett und kippe langsam. Der Hangabtrieb der Schwerkraft
          wächst; die Haftreibung wächst mit — bis zu dem Kippwinkel, bei dem µN ausgereizt ist
          und der Klotz loslässt. Dieser Winkel misst µ direkt: <strong>µ = tan θ</strong>. Es
          ist eine der saubersten Messungen der Mechanik, sie braucht nichts außer einem
          Winkelmesser, und das Labor unten ist genau sie.
        </p>

        <div className="callout note">
          <span className="co-title">Eigentlich ist die Reibung die Heldin</span>
          <p>
            Ohne Reibung: kein Gehen, kein Fahren, keine Knoten, keine Nägel, keine gehaltenen
            Stifte. Bremsen verwandeln die Bewegungsenergie eines Autos absichtlich per Reibung
            in Wärme. Die Kraft, die idealisierte Aufgaben verdirbt, ist dieselbe, die jeden
            Griff in deinem Leben möglich macht — die Physik bittet nur darum, beide Seiten des
            Kontos zu sehen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Kipptest",
      intro: (
        <>
          <p>Ein Klotz, ein Brett, eine Winde — erhöhe den Winkel, bis es rutscht.</p>
          <ul>
            <li>Kippe langsam und sieh zu, wie die Haftreibung dem Hangabtrieb exakt folgt… bis sie nicht mehr kann.</li>
            <li>Lies den Rutschwinkel ab, nimm tan θ — und du hast µ gemessen.</li>
            <li>Wechsle die Oberflächen (Gummi, Holz, Eis) und sieh den Rutschwinkel mit µ einbrechen.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Eine 20-kg-Kiste steht auf ebenem Boden, µ (Haft) = 0,5, g = 10 m/s². Wie groß ist die maximale Haftreibungskraft, in Newton?",
        answer: 100,
        unit: "N",
        hint: "N ist hier gleich dem Gewicht; dann µ·N.",
        explain: "N = 20 × 10 = 200 N; Reibungsmaximum = 0,5 × 200 = 100 N. Schieb stärker, und sie reißt los.",
      },
      {
        prompt: "Ein Klotz beginnt bei 31° Brettneigung zu rutschen. Wie groß ist µ? (µ = tan θ, auf zwei Nachkommastellen)",
        answer: 0.6,
        unit: "",
        tolerancePct: 4,
        hint: "tan 31° ≈ …",
        explain: "tan 31° ≈ 0,60. Ein Winkelmesser, ein Koeffizient — der Kipptest in einer Zeile.",
      },
    ],
    quiz: [
      {
        q: "Warum ist es schwerer, eine schwere Kiste anzuschieben, als sie gleitend zu halten?",
        choices: [
          "Das Maximum der Haftreibung übersteigt die Gleitreibung",
          "Die Kiste wird leichter, sobald sie sich bewegt",
          "Die Gleitreibung schiebt dich vorwärts",
          "Der Luftwiderstand hilft, sobald sie sich bewegt",
        ],
        answer: 0,
        explain:
          "Ruhende Flächen setzen sich und verzahnen; das Losreißen kostet mehr als das Losbleiben. Darum vermeidet auch ABS das Blockieren.",
      },
      {
        q: "Im Modell F ≤ µN hängt die Gleitreibung NICHT ab von…",
        choices: [
          "dem Koeffizienten µ",
          "wie fest die Flächen aufeinanderdrücken",
          "der Kontaktfläche",
          "den Materialien der beiden Flächen",
        ],
        answer: 2,
        explain:
          "Verteile dasselbe Gewicht auf mehr Fläche, und jeder Flecken drückt schwächer — das Produkt bleibt gleich. µ und N sind in diesem Modell die ganze Geschichte.",
      },
      {
        q: "Ein Auto bremst hart, die Räder blockieren, es schlittert. Warum ist das schlechter als Bremsen an der Griffgrenze?",
        choices: [
          "Blockierte Räder haben gar keine Reibung",
          "Ein schlitternder Reifen nutzt Gleitreibung — schwächer als der Haftgriff eines rollenden Reifens",
          "Der Motor kämpft gegen die Bremsen",
          "Es ist nicht schlechter — Schlittern stoppt schneller",
        ],
        answer: 1,
        explain:
          "Die Aufstandsfläche eines rollenden Reifens gleitet nicht — sie haftet. Blockiert das Rad, tauschst du das gegen schwächere Gleitreibung; ABS existiert, um auf der Haftseite zu bleiben.",
      },
      {
        q: "Ein Klotz rutscht, wenn sein Brett den Winkel θ erreicht. Was verrät dir θ?",
        choices: [
          "Die Masse des Klotzes",
          "Die Normalkraft",
          "Das Endtempo des Klotzes",
          "Den Haftreibungskoeffizienten: µ = tan θ",
        ],
        answer: 3,
        explain:
          "Am Rutschwinkel übersteigt der Hangabtrieb gerade das Reibungsmaximum; die Masse kürzt sich aus dem Vergleich, übrig bleibt µ = tan θ.",
      },
    ],
  },

  /* ================================================================ */
  gravity: {
    Theory: () => (
      <>
        <h2>Ein Gesetz, jede Masse</h2>
        <p>
          Newtons tiefste Behauptung war nicht F = ma — sondern dass die Kraft, die den Apfel
          herunterzieht, und die Kraft, die den Mond auf seiner Bahn hält,{" "}
          <em>dieselbe Kraft</em> sind, mit einer universellen Regel:
        </p>
        <div className="formula">
          F = G·m₁·m₂ / r²
          <span className="note">jedes Massenpaar zieht sich an; G = 6,67 × 10⁻¹¹ — Gravitation ist erstaunlich schwach</span>
        </div>
        <p>
          Zwei Eigenschaften tragen alles. Sie ist <strong>universell</strong> — du ziehst deine
          Kaffeetasse an (schwächlich; G ist winzig, und es braucht die Masse eines Planeten,
          damit Gravitation auffällt). Und sie folgt dem <strong>inversen Quadrat</strong>:
          dreifacher Abstand, ein Neuntel der Kraft. Der Abstand zählt vom{" "}
          <em>Mittelpunkt</em> — darum ändert Bergsteigen dein Gewicht kaum: Du warst ohnehin
          schon 6.371 km vom Erdmittelpunkt entfernt.
        </p>
        <p>
          Das kleine g aus Einheit 0 ist schlicht dieses Gesetz, an der Erdoberfläche
          ausgewertet. Das große G ist die Einstellung des Universums; das kleine
          g = 9,81 m/s² die lokale Konsequenz dieser Einstellung auf diesem Planeten. Auf dem
          Mond liefert dasselbe G ein g von etwa 1,6.
        </p>

        <h2>Newtons Kanonenkugel</h2>
        <p>
          Newtons eigenes Gedankenexperiment verwandelt Würfe in Umlaufbahnen. Feuere eine
          Kanonenkugel waagerecht von einem hohen Berg: Sie fällt und landet. Feuere schneller:
          Sie landet weiter weg, denn die Erdoberfläche krümmt sich unter ihr davon. Feuere
          schnell genug — etwa <strong>7,9 km/s</strong> — und der Boden krümmt sich exakt so
          schnell weg, wie die Kugel auf ihn zufällt. Sie fällt für immer und landet nie.{" "}
          <strong>Das ist eine Umlaufbahn.</strong>
        </p>
        <p>
          Die ISS-Astronauten sind also nicht „jenseits der Schwerkraft“ — in 400 km Höhe hat
          die Gravitation noch 89 % ihrer Bodenstärke. Sie schweben, weil Station und Besatzung
          gemeinsam fallen, endlos, um den Planeten herum. Schwerelosigkeit ist freier Fall mit
          gutem Ziel.
        </p>

        <h2>Schneller, langsamer, weg</h2>
        <ul>
          <li><strong>Zu langsam</strong> — der Fall gewinnt; die Bahn biegt in den Boden.</li>
          <li><strong>Kreisbahntempo</strong> — Fall und Krümmung decken sich: ein Kreis.</li>
          <li><strong>Schneller</strong> — die Bahn dehnt sich zur Ellipse, schwingt weit hinaus und kehrt zurück.</li>
          <li><strong>11,2 km/s</strong> — Fluchtgeschwindigkeit: Die Gravitation bremst dich ewig, aber nie auf null. Auf Wiedersehen.</li>
        </ul>

        <div className="callout note">
          <span className="co-title">Die Erde wiegen</span>
          <p>
            Henry Cavendish maß G im Jahr 1798 mit Bleikugeln an einem zart verdrillten Stab —
            er detektierte die Gravitation möbelgroßer Massen. Mit bekanntem G ließ sich
            g = GM/r² nach M auflösen: Sein Tischexperiment wog den Planeten (6 × 10²⁴ kg) —
            und so betitelte er die Arbeit auch.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Newtons Kanonenkugel",
      intro: (
        <>
          <p>Ein Berg, eine Kanone, ein Planet, der sich wegkrümmt. Finde jedes Schicksal.</p>
          <ul>
            <li>Erhöhe das Abschusstempo Schritt für Schritt: längere Bögen, dann das magische Tempo, bei dem die Kugel den Boden für immer verfehlt.</li>
            <li>Geh über das Kreisbahntempo hinaus und sieh den Kreis sich zur Ellipse dehnen.</li>
            <li>Finde die Fluchtgeschwindigkeit — das Tempo, bei dem die Kugel geht und nie wiederkommt.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Die Erdgravitation zieht einen Satelliten in einem Abstand r mit 1.000 N. Wie stark ist der Zug bei 2r, in Newton?",
        answer: 250,
        unit: "N",
        hint: "Inverses Quadrat: doppelter Abstand…",
        explain: "Doppelter Abstand, 2² = 4-mal schwächer: 1.000/4 = 250 N.",
      },
      {
        prompt:
          "Du wiegst auf der Erde 700 N (g = 9,8). Was wögest du auf dem Mond mit g = 1,6 m/s²? (in Newton)",
        answer: 114,
        unit: "N",
        tolerancePct: 3,
        hint: "Gewicht skaliert mit g; deine Masse ändert sich nicht.",
        explain: "Masse = 700/9,8 ≈ 71,4 kg; auf dem Mond: 71,4 × 1,6 ≈ 114 N. Gleiches Du, schwächerer Zug.",
      },
    ],
    quiz: [
      {
        q: "Warum schweben die Astronauten auf der ISS?",
        choices: [
          "In 400 km Höhe gibt es keine Gravitation",
          "Die Abschirmung der Station blockiert die Gravitation",
          "Sie und die Station befinden sich gemeinsam im freien Fall und verfehlen die Erde endlos",
          "Die Zentrifugalkraft hebt die Gravitation bei jedem Tempo exakt auf",
        ],
        answer: 2,
        explain:
          "Die Gravitation dort oben hat noch ~89 % der Bodenstärke. Eine Umlaufbahn ist gemeinsamer freier Fall — nichts drückt die Crew gegen die Station, also fühlt sich nichts wie Gewicht an.",
      },
      {
        q: "Verdreifachst du deinen Abstand zum Mittelpunkt eines Planeten, ändert sich seine Anziehung auf dich auf…",
        choices: ["ein Neuntel", "ein Drittel", "gar nicht", "dreimal schwächer pro Kilometer"],
        answer: 0,
        explain: "Invers-quadratisches Gesetz: 3² = 9-mal schwächer. Der Abstand zählt vom Mittelpunkt, nicht von der Oberfläche.",
      },
      {
        q: "Was ist der Unterschied zwischen g und G?",
        choices: [
          "Keiner — nur Schreibweise",
          "g ist die lokale Oberflächenbeschleunigung der Erde; G ist die universelle Konstante in Newtons Gesetz für jedes Massenpaar",
          "G gilt nur für Sterne",
          "g ist die Kraft, G die Beschleunigung",
        ],
        answer: 1,
        explain:
          "Großes G (6,67×10⁻¹¹) ist die Einstellung des Universums. Kleines g (9,81 m/s²) ist, was diese Einstellung an der Oberfläche genau dieses Planeten erzeugt.",
      },
      {
        q: "Im Bild von Newtons Kanonenkugel entsteht eine Umlaufbahn, wenn…",
        choices: [
          "die Kugel hoch genug fliegt, um die Gravitation zu verlassen",
          "das Tempo der Kugel die Fluchtgeschwindigkeit übersteigt",
          "die Gravitation in der Höhe abschaltet",
          "die Kugel genauso schnell zur Erde fällt, wie sich die Oberfläche unter ihr wegkrümmt",
        ],
        answer: 3,
        explain:
          "Umkreisen ist Fallen mit genug Seitwärtstempo, um immer zu verfehlen. Langsamer: sie landet. Viel schneller: sie entkommt. Dazwischen: Ellipsen.",
      },
    ],
  },
};
