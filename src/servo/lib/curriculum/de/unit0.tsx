import type { LessonContentDe } from "../localize";

export const unit0De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "sense-think-act": {
    Theory: () => (
      <>
        <h2>Eine Schleife, drei Verben</h2>
        <p>
          Zieh jedem Roboter das Gehäuse aus — Staubsauger, Rover, Fabrikarm — und darunter läuft
          dieselbe Drei-Schritte-Schleife:
        </p>
        <ul>
          <li><strong>Spüren</strong> — etwas über die Welt lesen: eine Entfernung, einen Winkel, eine Helligkeit.</li>
          <li><strong>Denken</strong> — den Messwert mit dem Wunsch vergleichen und aus der Differenz eine Entscheidung machen.</li>
          <li><strong>Handeln</strong> — mit einem Motor auf die Welt drücken, und sofort zurück zu Schritt eins.</li>
        </ul>
        <p>
          Der letzte Halbsatz ist der ganze Trick. Eine Maschine handelt; ein Roboter handelt,{" "}
          <em>prüft, was passiert ist</em>, und korrigiert. Die Schleife heißt{" "}
          <strong>Rückkopplung</strong>, und Einheit 3 widmet sich der Kunst, sie gut zu schließen —
          aber jede Lektion bis dahin füttert diese Schleife mit besseren Sinnen und stärkeren
          Muskeln.
        </p>

        <h2>Die Schleife hat einen Herzschlag</h2>
        <p>
          Wie oft die Schleife läuft, ist ihre <strong>Schleifenrate</strong> — eine Spezifikation,
          kein Detail. Ein Thermostat, der alle paar Sekunden entscheidet, reicht völlig — Räume
          driften langsam. Ein Roboter, der auf zwei Rädern balanciert, muss hunderte Male pro
          Sekunde messen und korrigieren, denn er beginnt <em>zwischen</em> den Korrekturen zu
          fallen:
        </p>
        <div className="formula">
          zu spät reagieren → härter korrigieren → überschießen → schwingen
          <span className="note">das universelle Versagen einer langsamen Schleife — in Einheit 3 triffst du es wieder, mit Reglern dran</span>
        </div>
        <p>
          Darum halten Roboter einen kleinen, sturen Computer nah an den Motoren. Er tut nichts
          Kluges — er verpasst nur niemals, wirklich niemals, einen Takt.
        </p>

        <h2>Wo die Schleife wohnt</h2>
        <p>
          In einem echten Roboter ist die Schleife über Teile verteilt, die dir den ganzen Kurs
          über begegnen: Sensoren füttern einen <strong>Mikrocontroller</strong> (das Metronom, das
          keine Millisekunde verpasst), der über Leistungselektronik Motoren treibt; größere
          Gedanken — Karten, Pläne, Sehen — wohnen oben in einem größeren Computer, der mit dem
          Metronom spricht. Die Trennung hat einen Grund: Das Denken darf zögern, die Schleife
          nicht.
        </p>

        <div className="callout note">
          <span className="co-title">Ist eine Waschmaschine ein Roboter?</span>
          <p>
            Sie spürt (Wasserstand), entscheidet (Programmschritt), handelt (Schleudern). Die
            meisten Ingenieure sagen trotzdem Nein — ihre Schleife schaut nie auf das{" "}
            <em>Ergebnis</em> ihres Handelns und korrigiert. Sie folgt einem Rezept. Die Grenze ist
            unscharf, und die nützliche Frage lautet nie „Ist das ein Roboter?“, sondern
            „<em>Wo ist seine Rückkopplungsschleife, und wie schnell?</em>“
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Rempel-Bot",
      intro: (
        <>
          <p>Ein Ein-Sensor-Roboter im Korridor: Er fährt, bis sein Entfernungsmesser Stopp sagt. Du stellst Tempo und Stoppabstand ein — und wie oft die Schleife läuft.</p>
          <ul>
            <li>Mit schneller Schleife parkt er sauber bei jedem Tempo. Verlangsame nun die Schleife und sieh dieselben Einstellungen gegen die Wand klatschen.</li>
            <li>Finde für jede Schleifenrate das höchste überlebbare Tempo. Diese Zahl ist der Grund, warum Balance-Roboter mit hunderten Hertz laufen.</li>
            <li>Stell den Stoppabstand auf null: Aus Spüren–Denken–Handeln wird Zu-spät-Denken.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was unterscheidet die Schleife eines Roboters von einer Maschine, die einem Rezept folgt?",
        choices: [
          "Der Roboter liest das Ergebnis seiner eigenen Handlungen und korrigiert",
          "Der Roboter hat stärkere Motoren",
          "Der Roboter führt ein längeres Programm aus",
          "Der Roboter ist mit dem Internet verbunden",
        ],
        answer: 0,
        explain:
          "Spüren–Denken–Handeln ist ein Kreis, keine Liste: Nach dem Handeln wird wieder gespürt. Ein Rezept prüft nie, was wirklich passiert ist.",
      },
      {
        q: "Ein selbstbalancierender Roboter braucht hunderte Schleifendurchläufe pro Sekunde, weil…",
        choices: [
          "schnellere Schleifen Akku sparen",
          "er zwischen den Korrekturen zu fallen beginnt — späte Korrekturen müssen härter ausfallen und überschießen",
          "Motoren nur schnelle Signale verstehen",
          "die Sensoren bei niedrigen Raten aussetzen",
        ],
        answer: 1,
        explain:
          "Die Welt pausiert nicht, während der Roboter denkt. Je langsamer die Schleife, desto weiter ist er schon gefallen, wenn er reagiert — spät reagieren, hart korrigieren, schwingen.",
      },
      {
        q: "Warum behalten Roboter einen kleinen dedizierten Mikrocontroller neben den Motoren, selbst wenn sie einen großen Computer tragen?",
        choices: [
          "Kleine Chips sind genauer",
          "Der große Computer hat keine Ausgangspins",
          "Große Computer sind zu schwer für die Motornähe",
          "Die Regelschleife darf keinen Takt verpassen, und ein einsinniger Chip garantiert genau das",
        ],
        answer: 3,
        explain:
          "Ein Linux-Rechner kann kurz innehalten, um etwas anderes zu tun; ein Mikrocontroller mit einer einzigen Schleife lässt sich nicht ablenken. Denken darf zögern — die Schleife nicht.",
      },
      {
        q: "In der Spüren–Denken–Handeln-Schleife bedeutet „Denken“…",
        choices: [
          "künstliche Intelligenz laufen zu lassen",
          "auf den nächsten Sensorwert zu warten",
          "Gemessenes mit Gewolltem zu vergleichen und aus der Differenz zu entscheiden",
          "die Sensordaten für später zu speichern",
        ],
        answer: 2,
        explain:
          "Die Entscheidung kann eine Zeile Code sein: zu nah? Langsamer. Zum „Denken“ macht sie, dass die Lücke zwischen gemessen und gewollt sie antreibt.",
      },
    ],
  },

  /* ================================================================ */
  signals: {
    Theory: () => (
      <>
        <h2>Digitale Pins, analoge Welt</h2>
        <p>
          Der Pin eines Mikrocontrollers ist ein Lichtschalter: ganz an (sagen wir 5 V) oder ganz
          aus (0 V), nichts dazwischen. Doch die Welt, auf die die Schleife drückt, ist stetig —
          ein Motor will 40 % Kraft, eine Lampe halbe Helligkeit. Eine echte Zwischenspannung zu
          kaufen kostet kostbare Hardware. Die Robotik nutzt stattdessen einen wunderbaren
          Schummel: <strong>Pulsweitenmodulation</strong>, PWM.
        </p>
        <p>
          Schalte den Pin sehr schnell an und aus und steuere, welchen <em>Anteil</em> jedes Zyklus
          er an verbringt. Dieser Anteil ist der <strong>Tastgrad</strong>:
        </p>
        <div className="formula">
          V_avg = D · V_supply
          <span className="note">Tastgrad D von 0 bis 1 — 30 % An-Zeit liefern im Mittel 30 % der Versorgung</span>
        </div>
        <p>
          Die Last bemerkt das Blinken nicht, wenn es schnell genug ist. Die rotierende Masse eines
          Motors glättet tausende Pulse pro Sekunde zu stetigem Drehmoment, wie ein Deckenventilator
          zwischen den Stößen weiterdreht. Eine LED flackert tatsächlich — aber über ein paar
          hundert Hertz mittelt dein Auge genauso wie der Motor.
        </p>

        <h2>Frequenz und Tastgrad sind verschiedene Knöpfe</h2>
        <p>
          Zwei Zahlen beschreiben ein PWM-Signal, und Anfänger verwischen sie auf eigene Gefahr.
          Der <strong>Tastgrad</strong> ist die Botschaft — wie viel Kraft. Die{" "}
          <strong>Frequenz</strong> ist, wie oft die Botschaft wiederholt wird — einmal gewählt,
          hoch genug, dass die Last keine Einzelpulse spürt, dann in Ruhe gelassen. Den Tastgrad
          änderst du ständig; die Frequenz fast nie.
        </p>
        <p>
          Zu niedrige Frequenz, und der Schummel kollabiert: Der Motor knurrt und ruckt, die LED
          stroboskopiert. Zu hoch, und die Schaltelektronik verheizt Leistung. Motortreiber sitzen
          typisch nahe 20 kHz — knapp über dem menschlichen Hörbereich, damit der Motor seinen
          Tastgrad nicht hörbar <em>singt</em>.
        </p>

        <h2>Warum die Robotik darauf läuft</h2>
        <p>
          PWM ist der Weg, auf dem die Entscheidung des Denk-Schritts physisch den Handel-Schritt
          erreicht: Die Regelschleife berechnet eine Kraft, setzt einen Tastgrad, und der Motor
          fühlt eine mittlere Spannung. Ein digitaler Pin, null Zusatzteile, Kraft in tausend
          Schattierungen. Jeder Motorbefehl im Rest dieses Kurses — Linienfolger, Roboterarm,
          alles — ist zuunterst ein Tastgrad, der auf- oder abgestupst wird.
        </p>

        <div className="callout note">
          <span className="co-title">Halbe Spannung ist unter Last nicht halbes Tempo</span>
          <p>
            PWM liefert einen sauberen Spannungsmittelwert — aber was der Motor daraus macht, hängt
            vom Kampf gegen Reibung und Last ab, und der ist die Geschichte von Einheit 1. Das
            Signal ist ehrlich; die Mechanik verhandelt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Tastgrad-Drehknopf",
      intro: (
        <>
          <p>Ein PWM-Kanal, drei Opfer: eine Oszilloskop-Spur, eine LED und ein Motor. Dreh die beiden Knöpfe und beobachte, wen welcher kümmert.</p>
          <ul>
            <li>Fahre den Tastgrad durch und sieh die mittlere Spannung exakt folgen.</li>
            <li>Senke die Frequenz unter ~50 Hz: Die LED beginnt zu stroboskopieren und das Motortempo wird klumpig — gleicher Tastgrad, zerbrochene Illusion.</li>
            <li>Finde die niedrigste Frequenz, bei der der Motor glatt läuft. Beachte: Die LED braucht mehr als der Motor.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Eine 12-V-Versorgung wird mit 25 % Tastgrad PWM-geschaltet. Wie groß ist die mittlere Spannung, in Volt?",
        answer: 3,
        unit: "V",
        hint: "V_avg = D · V_supply.",
        explain: "0,25 × 12 = 3 V. Die Last fühlt ein Viertel der Versorgung, weil der Pin ein Viertel der Zeit an ist.",
      },
      {
        prompt: "Ein PWM-Signal läuft mit 20 kHz. Wie lang ist ein voller Zyklus, in Mikrosekunden? (T = 1/f)",
        answer: 50,
        unit: "µs",
        tolerancePct: 2,
        hint: "1 / 20.000 s, dann in Mikrosekunden umrechnen.",
        explain: "1/20.000 = 0,00005 s = 50 µs. Bei 40 % Tastgrad ist der Pin 20 dieser Mikrosekunden an, 30 aus.",
      },
    ],
    quiz: [
      {
        q: "Was steuert der Tastgrad eines PWM-Signals?",
        choices: [
          "Wie oft sich das Signal pro Sekunde wiederholt",
          "Die Versorgungsspannung des Chips",
          "Die Farbe der LED",
          "Den An-Anteil jedes Zyklus — und damit die mittlere Spannung",
        ],
        answer: 3,
        explain:
          "Der Tastgrad ist die Botschaft: 30 % An-Zeit heißt im Mittel 30 % der Versorgung. Die Frequenz wiederholt die Botschaft nur oft genug zum Verschwimmen.",
      },
      {
        q: "Warum ruckt ein Motor unter PWM nicht tausende Male pro Sekunde vor und stoppt?",
        choices: [
          "Seine rotierende Masse glättet die schnellen Pulse zu stetiger Bewegung",
          "Der Motortreiber wandelt PWM erst in echte Gleichspannung um",
          "Motoren reagieren nur auf die Spitzenspannung",
          "Er tut es, nur zu leise, um es zu merken",
        ],
        answer: 0,
        explain:
          "Trägheit ist der Tiefpass: Wie ein Ventilator zwischen den Stößen weiterrollt, kann der Rotor so schnellen Pulsen nicht folgen und reitet auf dem Mittelwert.",
      },
      {
        q: "Du senkst die PWM-Frequenz eines Motors von 20 kHz auf 30 Hz bei gleichen 50 % Tastgrad. Was ändert sich?",
        choices: [
          "Der Motor läuft mit halbem Tempo",
          "Die Illusion zerbricht — der Motor knurrt und ruckt, weil er Einzelpulse spürt",
          "Nichts — die mittlere Spannung ist unverändert",
          "Der Motor läuft schneller, weil die Pulse länger sind",
        ],
        answer: 1,
        explain:
          "Der Mittelwert ist tatsächlich gleich — aber Mittelwerte regieren nur, solange die Last Einzelpulse nicht auflösen kann. Bei 30 Hz beschleunigt und verlangsamt der Rotor innerhalb jedes Zyklus.",
      },
      {
        q: "Warum schalten Motortreiber oft mit ausgerechnet etwa 20 kHz?",
        choices: [
          "Schneller kann ein Mikrocontroller nicht schalten",
          "Darunter überhitzen Motoren",
          "Das liegt knapp über dem menschlichen Hörbereich, sodass der Motor nicht hörbar bei seiner Schaltfrequenz pfeift",
          "Das entspricht der Netzfrequenz",
        ],
        answer: 2,
        explain:
          "Ein Motor ist auch ein kleiner Lautsprecher: Er vibriert bei der PWM-Frequenz. Park diese Frequenz über ~20 kHz, und das Pfeifen ist da — nur nicht für deine Ohren.",
      },
    ],
  },
};
