import type { LessonContentDe } from "../localize";

export const unit5De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  energy: {
    Theory: () => (
      <>
        <h2>Bindungen sind Energiekonten</h2>
        <p>
          Eine Bindung zu brechen <em>kostet</em> immer Energie; eine zu knüpfen <em>zahlt</em>{" "}
          immer aus. Eine Reaktion tut beides, also ist ihre Nettowärme eine simple Bilanz: Energie
          der geknüpften Bindungen minus Energie der gebrochenen. Zahlt sie mehr aus, als du
          ausgegeben hast, verlässt die Differenz das System als Wärme — die Reaktion ist{" "}
          <strong>exotherm</strong> (Verbrennen, Rosten, dein Stoffwechsel). Gibst du mehr aus, als
          du zurückbekommst, trinkt die Reaktion Wärme aus ihrer Umgebung —{" "}
          <strong>endotherm</strong> (Photosynthese, Kühlpacks, Natron in Essig).
        </p>
        <div className="formula">
          ΔH &lt; 0: exotherm (gibt Wärme ab)&nbsp;&nbsp;·&nbsp;&nbsp;ΔH &gt; 0: endotherm (nimmt Wärme auf)
          <span className="note">ΔH — die Enthalpieänderung: Energie der Produkte minus Energie der Edukte</span>
        </div>

        <h2>Der Hügel in der Mitte</h2>
        <p>
          Wenn Verbrennen Energie freisetzt, warum entzündet sich der Holzstapel dann nicht selbst?
          Weil vor dem Knüpfen neuer Bindungen die alten <em>gelockert</em> werden müssen — und
          diese Vorleistung ist die <strong>Aktivierungsenergie E<sub>a</sub></strong>. Stell dir
          die Reaktion als Kugel vor, die über einen Hügel geschoben werden muss, bevor sie ins Tal
          der Produkte rollen kann. Holz + Sauerstoff sitzen hinter einem hohen Hügel: Bei
          Raumtemperatur trägt fast kein Stoß genug Energie, um ihn zu überqueren. Ein Streichholz
          liefert den Schubs — und sobald einige Moleküle drüben sind, schiebt die von ihnen
          freigesetzte Wärme ihre Nachbarn. Diese Kettenübergabe <em>ist</em> eine Flamme.
        </p>

        <h2>Katalysatoren: ein Tunnel durch den Hügel</h2>
        <p>
          Ein <strong>Katalysator</strong> bietet der Reaktion eine Alternativroute mit
          niedrigerem E<sub>a</sub> — und geht unverändert daraus hervor, bereit für den nächsten
          Einsatz. Er ändert ΔH nicht: Start- und Zieltal bleiben, wo sie waren; nur der Pass
          dazwischen sinkt. Der Katalysator im Auto, die Enzyme in deinen Zellen und die
          Industriekatalysatoren hinter dem Dünger spielen alle denselben Trick: Hügel senken,
          Überquerungen vervielfachen.
        </p>

        <div className="callout note">
          <span className="co-title">Diamanten sind nur größtenteils für immer</span>
          <p>
            Diamant ist <em>weniger</em> stabil als Graphit — sich in Bleistiftmine zu verwandeln
            würde Energie freisetzen. Sichtbar passiert das nie, weil der Aktivierungshügel
            astronomisch hoch ist. Die Chemie stellt zwei getrennte Fragen: &bdquo;bergab oder bergauf?&ldquo;
            (Thermodynamik, ΔH) und &bdquo;wie hoch ist der Pass?&ldquo; (Kinetik, E<sub>a</sub>). Diamant ist
            thermodynamisch verurteilt und kinetisch unsterblich.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Energielandschaft",
      intro: (
        <>
          <p>Forme das Reaktionsprofil selbst und feuere dann Stöße auf den Hügel.</p>
          <ul>
            <li>Wähle einen Stoß schwächer als E<sub>a</sub> — die Kugel rollt zurück: keine Reaktion.</li>
            <li>Füge den Katalysator hinzu und versuche denselben Stoß durch den gesenkten Pass.</li>
            <li>Mach ΔH positiv und sieh, wie eine endotherme Landschaft aussieht.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Eine exotherme Reaktion ist eine, bei der…",
        choices: [
          "die Edukte explodieren",
          "das Knüpfen der neuen Bindungen mehr Energie freisetzt, als das Brechen der alten gekostet hat",
          "ständig Wärme zugeführt werden muss",
          "sich keine Bindungen ändern",
        ],
        answer: 1,
        explain:
          "ΔH < 0: Die Bindungsenergiebilanz fällt zugunsten der Umgebung aus — der Überschuss verlässt das System als Wärme (und manchmal Licht).",
      },
      {
        q: "Warum entzündet sich Holz bei Raumtemperatur nicht von selbst?",
        choices: [
          "Holzverbrennung ist endotherm",
          "Der Luft fehlt Sauerstoff",
          "Die Aktivierungsenergie ist zu hoch für Stöße bei Raumtemperatur",
          "Holz enthält Wasser",
        ],
        answer: 2,
        explain:
          "Verbrennung geht steil bergab, aber ein hoher Pass steht im Weg. Ein Streichholz gibt einigen Molekülen die Überquerungsenergie; deren freigesetzte Wärme rekrutiert den Rest.",
      },
      {
        q: "Was ändert ein Katalysator — und was lässt er in Ruhe?",
        choices: [
          "Er ändert ΔH, aber nicht Ea",
          "Er senkt Ea, lässt ΔH aber unangetastet",
          "Er erhöht die Temperatur",
          "Er wird verbraucht, um die Reaktion zu befeuern",
        ],
        answer: 1,
        explain:
          "Ein Katalysator ist ein Tunnel durch den Hügel: niedrigerer Pass, dieselben zwei Täler. Und er wird zurückgewonnen — ein Katalysatormolekül bedient Millionen Reaktionen.",
      },
      {
        q: "Die Umwandlung von Diamant zu Graphit würde Energie freisetzen, trotzdem bleiben Diamanten bestehen, weil…",
        choices: [
          "Diamant die stabilere Form ist",
          "die Aktivierungsenergie für die Umwandlung enorm ist",
          "Graphit seltener ist",
          "Juweliere sie stabilisieren",
        ],
        answer: 1,
        explain:
          "Die Thermodynamik sagt 'bergab'; die Kinetik sagt 'über einen unmöglich hohen Pass'. Ohne Route hält die instabile Form Milliarden Jahre.",
      },
    ],
  },

  /* ================================================================ */
  rates: {
    Theory: () => (
      <>
        <h2>Stoßtheorie in einem Satz</h2>
        <p>
          Zwei Teilchen reagieren nur, wenn sie <strong>zusammenstoßen</strong>, dabei{" "}
          <strong>hart genug</strong> stoßen (≥ E<sub>a</sub>) und <strong>richtig herum</strong>{" "}
          ausgerichtet sind. Reaktionsgeschwindigkeit ist schlicht die Zahl erfolgreicher Stöße pro
          Sekunde — also ist jeder Geschwindigkeitstrick der Chemie eine Art, diese Zahl zu
          manipulieren.
        </p>

        <h2>Die vier Hebel</h2>
        <ul>
          <li>
            <strong>Temperatur</strong> — heißere Teilchen fliegen schneller: mehr Stöße,{" "}
            <em>und</em> ein weit größerer Anteil davon überspringt die Energiehürde. Faustregel:
            +10 °C verdoppelt viele Alltagsreaktionen. Deshalb gibt es Kühlschränke — Verderben ist
            Chemie, und kalte Chemie ist langsame Chemie.
          </li>
          <li>
            <strong>Konzentration</strong> (oder Gasdruck) — mehr Teilchen pro Liter, mehr Treffen
            pro Sekunde. Reiner Sauerstoff verwandelt eine Glut in eine Fackel.
          </li>
          <li>
            <strong>Oberfläche</strong> — Reaktionen passieren dort, wo Phasen sich berühren. Ein
            Scheit brennt eine Stunde; dasselbe Holz als Mehl kann explodieren (eine echte Gefahr
            in Mühlen und Silos).
          </li>
          <li>
            <strong>Katalysator</strong> — der Tunnel der letzten Lektion: gleiche Stöße, niedrigere
            Hürde, viel mehr davon zählen.
          </li>
        </ul>

        <div className="formula">
          Rate ∝ Stöße/s × Anteil mit E ≥ E<sub>a</sub>
          <span className="note">Temperatur hebt beide Faktoren gleichzeitig — deshalb ist sie der stärkste Hebel</span>
        </div>

        <div className="callout tip">
          <span className="co-title">Warum der Temperatureffekt so heftig ist</span>
          <p>
            Der energiereiche Ausläufer der Geschwindigkeitsverteilung wächst{" "}
            <em>exponentiell</em> mit der Temperatur. Ein bescheidener Anstieg der
            Durchschnittsgeschwindigkeit um 10 % kann den winzigen Anteil hürdenüberwindender Stöße
            verdoppeln oder verdreifachen — kleine Ursache, riesige Wirkung. Das Leben nutzt
            dieselbe Mathematik: Fieber von nur +3 °C beschleunigt deine Immunchemie messbar.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Stoßzähler",
      intro: (
        <>
          <p>Rote A- und türkise B-Teilchen reagieren zu grünem AB — aber nur schnelle Stöße zählen.</p>
          <ul>
            <li>Erhöhe die Temperatur und beobachte, wie überproportional die Rate reagiert.</li>
            <li>Verdopple die Konzentration bei fester Temperatur — was passiert ungefähr mit der Rate?</li>
            <li>Füge den Katalysator hinzu: gleiche Geschwindigkeiten, niedrigere Hürde, überall grün.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Laut Stoßtheorie findet eine Reaktion nur statt, wenn Teilchen…",
        choices: [
          "einander überhaupt berühren",
          "mit genug Energie und der richtigen Ausrichtung zusammenstoßen",
          "die gleiche Masse haben",
          "die gleiche Temperatur haben",
        ],
        answer: 1,
        explain:
          "Die meisten Stöße sind zu sanft oder schlecht gezielt und prallen einfach ab. Rate = Zahl der Stöße, die beide Bedingungen erfüllen.",
      },
      {
        q: "Warum hält Kühlen Lebensmittel frisch?",
        choices: [
          "Kälte tötet alle Bakterien sofort",
          "Niedrige Temperatur verlangsamt die Verderbnisreaktionen dramatisch",
          "Dunkelheit hemmt die Chemie",
          "Die Luftfeuchtigkeit ist niedriger",
        ],
        answer: 1,
        explain:
          "Verderben ist ein Geflecht chemischer Reaktionen. Kühlen schrumpft den Anteil hürdenüberwindender Stöße exponentiell — aus Tagen werden Wochen.",
      },
      {
        q: "Holzstaub kann explodieren, während ein Scheit nur brennt, weil…",
        choices: [
          "Staub mehr Energie pro Gramm enthält",
          "Staub weit mehr Oberfläche für Sauerstoffstöße bietet",
          "Scheite feuchter sind",
          "Staub heißer ist",
        ],
        answer: 1,
        explain:
          "Verbrennung passiert an der Grenzfläche Holz-Luft. Mahlen vervielfacht diese Fläche millionenfach, sodass dieselbe Gesamtreaktion in Millisekunden abläuft.",
      },
      {
        q: "Die Konzentration eines Edukts zu verdoppeln…",
        choices: [
          "halbiert die Rate",
          "verdoppelt die Rate ungefähr — doppelt so viele Treffen pro Sekunde",
          "ändert nichts",
          "verdoppelt die Aktivierungsenergie",
        ],
        answer: 1,
        explain:
          "Doppelt so viele Teilchen pro Liter bedeuten etwa doppelt so häufige Stöße mit ihnen. (Die genauen Exponenten hängen vom Mechanismus ab — das ist Kinetik für Fortgeschrittene.)",
      },
    ],
  },

  /* ================================================================ */
  equilibrium: {
    Theory: () => (
      <>
        <h2>Die Zweibahnstraße</h2>
        <p>
          Viele Reaktionen sind umkehrbar: A wird zu B, <em>während</em> B zurück zu A wird.
          Startest du mit reinem A, dominiert der Hinverkehr; sobald sich B ansammelt, wächst der
          Rückverkehr. Irgendwann <strong>ziehen die beiden Raten gleich</strong> — und von außen
          betrachtet hört jede Veränderung auf. Das ist das{" "}
          <strong>dynamische Gleichgewicht</strong>: kein Waffenstillstand, sondern ein perfekt
          ausbalancierter Austausch. Jede Sekunde wandeln sich Millionen Teilchen in beide
          Richtungen; nur die <em>Summen</em> bewegen sich nicht mehr.
        </p>
        <div className="formula">
          K<sub>c</sub> = [Produkte] / [Edukte]
          <span className="note">die Gleichgewichtskonstante: wo sich das Unentschieden einpendelt — großes K begünstigt Produkte, kleines K die Edukte</span>
        </div>

        <h2>Le Chatelier: das sture System</h2>
        <p>
          Störe ein Gleichgewicht und es{" "}
          <strong>verschiebt sich so, dass es die Störung teilweise rückgängig macht</strong>.
          Dieser eine Satz — das Prinzip von Le Chatelier — sagt erstaunlich viel Chemie voraus:
        </p>
        <ul>
          <li>
            <strong>Edukt zugeben</strong> → das System verbrennt einen Teil davon: Verschiebung zu
            den Produkten.
          </li>
          <li>
            <strong>Produkt entfernen</strong> (fortlaufend abziehen, während es entsteht) → das
            System ersetzt es: Verschiebung zu den Produkten. Der Lieblingshebel der Industrie.
          </li>
          <li>
            <strong>Eine exotherme Reaktion erhitzen</strong> → Wärme ist ein Produkt, also drückt
            ihre Zugabe <em>rückwärts</em>. Kühlen zieht nach vorn.
          </li>
          <li>
            <strong>Ein Gasgleichgewicht komprimieren</strong> → es verschiebt sich zur Seite mit
            weniger Gasmolekülen und entlastet so den Druck.
          </li>
        </ul>

        <div className="callout note">
          <span className="co-title">Das Gleichgewicht, das die Welt ernährt</span>
          <p>
            N₂ + 3 H₂ ⇌ 2 NH₃ (Ammoniak für Dünger) ist exotherm und presst 4 Gasmoleküle auf 2. Le
            Chatelier verschreibt: hoher Druck (nach rechts verschieben), moderate Temperatur (zu
            kalt ist zu langsam — wieder die Kinetik!) und ständiges Abziehen des Ammoniaks. Die
            nach dieser Logik gebauten Haber-Bosch-Anlagen ernähren rund die Hälfte der Menschheit.
            Ein Prinzip, vier Milliarden Mittagessen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Zweibahnstraße",
      intro: (
        <>
          <p>80 Teilchen flackern zwischen A (rot) und B (türkis); die Hinreaktion ist exotherm.</p>
          <ul>
            <li>Warte auf Q ≈ K — die Balken frieren ein, während die Teilchen es nie tun. Das ist &bdquo;dynamisch&ldquo;.</li>
            <li>Kippe 20 A hinein und sieh zu, wie das System die meisten davon zu B verarbeitet.</li>
            <li>Entferne wiederholt B — kannst du das Gleichgewicht aushungern? Und jetzt heize es auf und sieh es rückwärts laufen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Im dynamischen Gleichgewicht…",
        choices: [
          "sind alle Reaktionen zum Stillstand gekommen",
          "laufen Hin- und Rückreaktion gleich schnell, sodass die Summen konstant bleiben",
          "läuft nur die Hinreaktion",
          "ist die Temperatur null",
        ],
        answer: 1,
        explain:
          "Einzelne Teilchen wandeln sich ständig in beide Richtungen; die beiden Ströme heben sich auf. Stillstand im Großen, Getümmel im Kleinen.",
      },
      {
        q: "Du gibst zusätzliches Edukt zu einem System im Gleichgewicht. Le Chatelier sagt voraus…",
        choices: [
          "nichts ändert sich",
          "das System verschiebt sich zu den Produkten und verbraucht einen Teil der Zugabe",
          "die Reaktion stoppt",
          "K nimmt einen neuen Wert an",
        ],
        answer: 1,
        explain:
          "Das System macht die Störung teilweise rückgängig: mehr Edukt → mehr Hinstöße → zusätzliches Produkt, bis das Verhältnis wieder K entspricht. (K selbst ändert sich nur mit der Temperatur.)",
      },
      {
        q: "Bei einem exothermen Gleichgewicht bewirkt Temperaturerhöhung…",
        choices: [
          "Verschiebung zu den Produkten",
          "Verschiebung zu den Edukten — Wärme wirkt wie ein zugegebenes Produkt",
          "keinen Effekt",
          "Zerstörung des Katalysators",
        ],
        answer: 1,
        explain:
          "Behandle Wärme als Produkt der Hinreaktion. Produkt zuzugeben drückt die Balance rückwärts — warme Gleichgewichte exothermer Reaktionen enthalten weniger Produkt.",
      },
      {
        q: "Warum ziehen Ammoniakanlagen ständig NH₃ aus dem Reaktor ab?",
        choices: [
          "Ammoniak würde den Katalysator vergiften",
          "Produkt zu entfernen verschiebt das Gleichgewicht laufend nach vorn, um es zu ersetzen",
          "Um den Reaktor kühl zu halten",
          "Nur zur einfacheren Lagerung",
        ],
        answer: 1,
        explain:
          "Das Produkt abzuziehen ist Le Chateliers profitabelster Hebel: Das System erreicht sein Unentschieden nie und produziert weiter. Die halbe Welternährung hängt daran.",
      },
    ],
  },
};
