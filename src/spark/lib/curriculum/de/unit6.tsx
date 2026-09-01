import type { LessonContentDe } from "../localize";

/**
 * Full German content for Unit 6 (op-amps & feedback): theory JSX,
 * quizzes (same answer indices as English!) and lab titles/intros.
 * Lab components themselves are shared — canvas labels stay English for now.
 */

export const unit6De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "op-amps": {
    Theory: () => (
      <>
        <h2>Der universelle Analogbaustein</h2>
        <p>
          Ein einzelner Transistor verstärkt (Lektion 3.2), aber grob — seine Verstärkung
          driftet mit Temperatur und Bauteiltoleranz. Die Lösung, geboren in den 1940ern als
          raumheizende Röhrenblöcke in Analogrechnern und bis in die 1960er auf Dutzende
          Transistoren auf einem einzigen Chip geschrumpft, ist der{" "}
          <strong>Operationsverstärker</strong> (Op-Amp) — so genannt, weil jene Rechner mit
          ihm mathematische <em>Operationen</em> ausführten. Heute kostet ein Op-Amp
          Centbeträge und steckt in allem Analogen: Sensoren, Audio, Netzteilen, deinem
          Multimeter.
        </p>
        <p>Der Op-Amp hat zwei Eingänge und eine Regel:</p>
        <div className="formula">
          V<sub>out</sub> = A · (V₊ − V₋)
          <span className="note">A (Leerlaufverstärkung, open-loop gain) ≈ 100 000 oder mehr — praktisch unendlich</span>
        </div>
        <p>
          Er verstärkt die <em>Differenz</em> zwischen seinem nichtinvertierenden (+) und
          invertierenden (−) Eingang mit einer Verstärkung, die so groß ist, dass sie fast
          eine Karikatur ist. Eine Differenz von 0,1 mV verlangt 10 V am Ausgang. Und die
          Eingänge selbst ziehen praktisch keinen Strom — sie <em>schauen</em> nur zu.
        </p>

        <h2>Roh verwendet: der Komparator</h2>
        <p>
          Bei derart riesiger Verstärkung und ohne Rückkopplung kann der Ausgang nirgendwo in
          der Mitte sitzen — die winzigste Eingangsdifferenz knallt ihn gegen eine
          Versorgungsschiene. Das ergibt einen perfekten <strong>Komparator</strong>: Leg eine
          Referenzspannung an den einen Eingang (ein Spannungsteiler — wieder Lektion 2.2) und
          ein Signal an den anderen, und der Ausgang ist ein sauberes digitales Urteil:{" "}
          <em>darüber oder darunter?</em> Thermostate, Batterie-leer-Warnungen, Nachtlichter:
          alles Komparatoren.
        </p>

        <h2>Das Flatterproblem — und die Hysterese</h2>
        <p>
          Reale Signale sind verrauscht. Streift ein langsam steigendes Signal die Schwelle,
          lässt das Rauschen es dutzendfach hin und her kreuzen — der Ausgang{" "}
          <em>flattert</em>. Die Lösung ist <strong>Hysterese</strong>: Mach die
          Einschaltschwelle etwas höher als die Ausschaltschwelle. Sobald der Ausgang
          hochkippt, wandern die Torpfosten nach unten; Rauschen innerhalb des Bandes ändert
          nichts. Ein Komparator mit Hysterese heißt <strong>Schmitt-Trigger</strong>, und die
          Idee ist überall — deshalb feuert dein Thermostat die Heizung bei 20,0 °C nicht im
          Schnellfeuer, und (Überraschung) es ist genau der ⅓/⅔-Zwei-Schwellen-Trick, den
          dein 555-Timer die ganze Zeit benutzt hat.
        </p>
        <div className="callout note">
          <span className="co-title">Einen kennst du schon</span>
          <p>
            Im Inneren des 555 (Lektion 3.3) wohnen zwei Komparatoren, die ⅓ Vcc und ⅔ Vcc
            beobachten. Der ganze Fortgeschrittenenkurs demaskiert weiter Bauteile, denen du
            längst vertraust.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Darüber oder darunter?",
      intro: (
        <>
          <p>Ein Komparator, der ein wanderndes Signal gegen deine Schwelle prüft.</p>
          <ul>
            <li>Schiebe Vref umher und beobachte, wie sich der Tastgrad des Ausgangs ändert.</li>
            <li>Schalte auf das verrauschte Signal ohne Hysterese: Flattern bei jeder Kreuzung.</li>
            <li>Aktiviere das Schmitt-Band — die Flanken rasten sauber ein. Zähl die Schwellen auf dem Oszilloskop.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Op-Amp ohne Rückkopplung gibt aus…",
        choices: [
          "Eine präzise Kopie seines Eingangs",
          "Immer 0 V",
          "Schiene hoch oder Schiene tief, je nachdem, welcher Eingang höher liegt",
          "Die halbe Versorgung",
        ],
        answer: 2,
        explain:
          "Leerlaufverstärkung ~100 000 heißt: Jede reale Eingangsdifferenz sättigt den Ausgang an einer Schiene — das ist Komparatorverhalten.",
      },
      {
        q: "Der +-Eingang eines Komparators liegt bei 3,2 V, sein −-Eingang bei 3,1 V. Der Ausgang ist…",
        choices: ["Etwa 0,1 V", "3,15 V", "Tief (an der −-Schiene)", "Hoch (an der +-Schiene)"],
        answer: 3,
        explain: "V+ > V−, und die riesige Verstärkung hebt diese 0,1 V Differenz bis ganz an die positive Schiene.",
      },
      {
        q: "Hysterese (ein Schmitt-Trigger) existiert, um…",
        choices: [
          "zu verhindern, dass verrauschte Signale den Ausgang an der Schwelle flattern lassen",
          "die Verstärkung zu erhöhen",
          "den Stromverbrauch zu senken",
          "den Ausgang zu invertieren",
        ],
        answer: 0,
        explain:
          "Getrennte Auf-/Ab-Schwellen bedeuten: Rauschen innerhalb des Bandes kann den Ausgang nicht erneut auslösen — eine saubere Flanke pro echter Kreuzung.",
      },
      {
        q: "Welches Alltagsgerät ist im Kern ein Komparator mit Hysterese?",
        choices: ["Eine Batterie", "Ein Thermostat", "Ein Transformator", "Eine Sicherung"],
        answer: 1,
        explain:
          "Heizung an unter 19,5°, aus über 20,5°: zwei Schwellen, sauberes Schalten, kein Heizungsflattern — ein Schmitt-Trigger in der Wand.",
      },
    ],
  },

  /* ================================================================ */
  feedback: {
    Theory: () => (
      <>
        <h2>Die Unendlichkeit zähmen</h2>
        <p>
          Rohe Op-Amp-Verstärkung ist riesig, aber zum Verstärken von Musik unbrauchbar —
          alles übersteuert. Die Einsicht von Harold Black aus dem Jahr 1927 (auf eine
          Zeitung gekritzelt, auf der Hudson-Fähre):{" "}
          <strong>wirf den Großteil der Verstärkung weg, absichtlich</strong>. Führe einen
          Bruchteil des Ausgangs zum <em>invertierenden</em> Eingang zurück. Driftet der
          Ausgang zu hoch, drückt die Rückführung die Differenz ins Negative und zieht ihn
          zurück; zu tief, umgekehrt. Der Verstärker korrigiert sich unablässig selbst in
          Richtung Gleichgewicht.
        </p>
        <p>
          Mit dieser Gegenkopplung an Ort und Stelle beschreiben zwei{" "}
          <strong>goldene Regeln</strong> das Gleichgewicht:
        </p>
        <ul>
          <li>Der Op-Amp treibt seinen Ausgang, bis <strong>V₊ = V₋</strong> gilt (sonst würde die riesige Verstärkung ihn bewegen).</li>
          <li>Die Eingänge ziehen <strong>keinen Strom</strong> — sie beobachten nur.</li>
        </ul>

        <h2>Verstärkung per Widerstandsverhältnis</h2>
        <p>
          Beim <strong>nichtinvertierenden Verstärker</strong> speist der Ausgang einen
          Spannungsteiler (R<sub>f</sub> über R<sub>g</sub> — schon wieder Lektion 2.2),
          dessen Abgriff an V₋ geht. Die goldenen Regeln zwingen den Teilerabgriff dann, dem
          Eingang zu gleichen, was den Ausgang festnagelt auf:
        </p>
        <div className="formula">
          Verstärkung = 1 + R<sub>f</sub> / R<sub>g</sub>
          <span className="note">invertierende Topologie: Verstärkung = −Rf/Rin · Puffer: Verstärkung = exakt 1</span>
        </div>
        <p>
          Zwei Widerstände — Bauteile mit 1 % Toleranz für einen Cent — definieren jetzt die
          Verstärkung, und die schlampigen internen 100 000× des Op-Amps spielen kaum noch
          eine Rolle. Dieser Tausch — <em>überschüssige Verstärkung gegen Präzision</em> —
          ist die tiefste Idee dieses Kurses, und er steckt im Tempomat deines Autos, im
          Thermostat deines Körpers und in jedem je verkauften Audioverstärker.
        </p>

        <h2>Der bescheidene, mächtige Puffer</h2>
        <p>
          Verdrahte den Ausgang direkt mit V₋, und die Verstärkung ist exakt 1. Sinnlos?
          Erinnere dich an das <em>Belastungsproblem</em> des Teilers (Lektion 2.2): Häng
          eine schwere Last an, und der Teiler sackt ein. Setz einen <strong>Puffer</strong>{" "}
          dazwischen, und der Teiler sieht die Nichtstuer-Eingänge des Op-Amps, während die
          Last eine Kopie der Spannung bekommt, hinter der die Muskeln des Op-Amps stehen.
          Verstärkung eins; Problem vieler, gelöst.
        </p>
        <div className="callout warn">
          <span className="co-title">Die Schienen gewinnen immer</span>
          <p>
            Rückkopplung hin oder her: Der Ausgang kann seine Versorgungsschienen nie
            überschreiten. Verlang von einem Verstärker mit Verstärkung 6 an ±9-V-Schienen
            6 × 2 V, und die Spitzen laufen an der Schiene flach —{" "}
            <strong>Clipping</strong>, das Knirschen eines übersteuerten
            Gitarrenverstärkers. Sieh im Labor dabei zu.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Verstärkung nach Zahlen",
      intro: (
        <>
          <p>Drei klassische Gegenkopplungsschaltungen mit Live-Wellenformen und Schienen, die zubeißen.</p>
          <ul>
            <li>Nichtinvertierend, Rf = 47 k, Rg = 10 k: Prüfe auf dem Oszilloskop, dass die Verstärkung 5,7× beträgt.</li>
            <li>Erhöhe die Eingangsamplitude, bis der Ausgang oben abflacht. Das ist Clipping.</li>
            <li>Invertierender Modus: Der Ausgang steht kopf. Puffermodus: zwei identische Kurven — und genau das ist der Punkt.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein nichtinvertierender Verstärker hat Rf = 47 kΩ und Rg = 10 kΩ. Seine Verstärkung ist…",
        choices: ["5,7×", "4,7×", "47×", "0,21×"],
        answer: 0,
        explain: "Verstärkung = 1 + Rf/Rg = 1 + 4,7 = 5,7. Das '+1' vergisst man leicht — das Quiz nie.",
      },
      {
        q: "Gegenkopplung macht die Verstärkung eines Verstärkers abhängig von…",
        choices: [
          "der Anzahl der internen Transistoren des Op-Amps",
          "der Versorgungsspannung",
          "dem Verhältnis zweier externer Widerstände",
          "der Temperatur",
        ],
        answer: 2,
        explain:
          "Die überschüssige Verstärkung des Op-Amps erzwingt die goldenen Regeln; das Verhältnis des Rückkopplungsteilers legt die Gesamtverstärkung dann präzise fest.",
      },
      {
        q: "Ein Puffer mit Verstärkung 1 ist nützlich, weil er…",
        choices: [
          "das Signal verdoppelt",
          "AC in DC wandelt",
          "Rauschen herausfiltert",
          "eine Spannung kopiert, dabei fast nichts aus der Quelle zieht und die Last mit Autorität treibt",
        ],
        answer: 3,
        explain:
          "Er löst das Belastungsproblem: Fragile Quellen (wie Teiler) bleiben unbelastet, schwere Lasten werden getrieben. Verstärkung 1, Wert 10.",
      },
      {
        q: "Du verlangst von einem Verstärker mit Verstärkung 10 an ±9-V-Schienen, ein ±2-V-Signal zu verstärken. Der Ausgang…",
        choices: [
          "ist ein sauberer ±20-V-Sinus",
          "übersteuert: flache Kappen bei etwa ±9 V",
          "ist ±2 V",
          "schaltet ab",
        ],
        answer: 1,
        explain: "Der Ausgang kann die Schienen nie verlassen. Berge und Täler der Welle werden abgeschert — Verzerrung.",
      },
    ],
  },
};
