import type { LessonContentDe } from "../localize";
import { Pinout555 } from "../unit3";

/**
 * Full German content for Unit 3 (diodes, transistors, 555 timer): theory JSX,
 * quizzes (same answer indices as English!), problems (answers verbatim) and
 * lab titles/intros. Lab components and diagram internals are shared.
 */

export const unit3De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  diodes: {
    Theory: () => (
      <>
        <h2>Halbleiter in sechzig Sekunden</h2>
        <p>
          Silizium liegt zwischen Leiter und Isolator — in reiner Form fast nutzlos, magisch,
          sobald es <strong>dotiert</strong> wird. Streu Atome mit einem Elektron zu viel
          hinein, und du bekommst <strong>n-Typ</strong>-Material (bewegliche negative
          Ladungsträger); Atome mit einem Elektron zu wenig ergeben <strong>p-Typ</strong>{" "}
          (bewegliche positive &bdquo;Löcher&ldquo;). Die gesamte moderne Welt beruht auf dem,
          was dort passiert, wo eine p-Region auf eine n-Region trifft: ein{" "}
          <strong>Übergang</strong>, der nur in eine Richtung leitet.
        </p>

        <h2>Die Diode</h2>
        <p>
          Eine <strong>Diode</strong> ist ein einzelner p–n-Übergang mit zwei Beinen: der{" "}
          <strong>Anode</strong> (+-Seite, das Dreieck im Symbol) und der{" "}
          <strong>Kathode</strong> (−-Seite, der Balken). Schiebe konventionellen Strom von der
          Anode zur Kathode (<em>Durchlassrichtung</em>), und er fließt frei — aber erst, wenn
          die Spannung über dem Übergang die <strong>Durchlassspannung</strong> V<sub>f</sub>{" "}
          übersteigt, etwa 0,7 V bei Silizium. Dreh sie um, und es fließt praktisch nichts
          (Sperrrichtung). Anders als die sanfte Gerade eines Widerstands ist die
          I–V-Kennlinie der Diode ein Hockeyschläger: flach, flach, flach, dann fast senkrecht.
          Dioden richten AC zu DC gleich, schützen Schaltungen vor verpolten Batterien und
          fangen induktive Spannungsspitzen ab (deine Freilaufdiode aus Lektion 2.4).
        </p>

        <h2>LEDs: Dioden, die dich in Photonen bezahlen</h2>
        <p>
          In einer <strong>Leuchtdiode</strong> fällt jedes Elektron, das den Übergang
          überquert, eine Energiestufe hinab und gibt diese Energie als Photon ab. Die
          Stufenhöhe bestimmt Farbe und Durchlassspannung zugleich: Rot ≈ 1,8 V, Grün ≈ 2,2 V,
          Blau/Weiß ≈ 3,0–3,2 V. Physische Merkmale: Das lange Bein und die runde Seite sind
          die Anode; kurzes Bein und abgeflachte Seite die Kathode.
        </p>

        <h2>Die wichtigste Rechnung der Hobbyelektronik</h2>
        <p>
          Jenseits von V<sub>f</sub> ist die Kennlinie fast senkrecht — die LED selbst tut kaum
          etwas, um den Strom zu begrenzen. Schließ eine direkt an eine Batterie an, und der
          Strom schießt in die Höhe, bis die LED stirbt (unsere simulierte hat ~eine
          Millisekunde durchgehalten). Die Lösung: ein Vorwiderstand, dimensioniert mit dem
          Ohmschen Gesetz. Am Widerstand fällt die übrig bleibende Spannung ab:
        </p>
        <div className="formula">
          R = (V_s − V_f) / I
          <span className="note">9-V-Versorgung, rote LED, 15 mA: R = (9 − 1,8) / 0,015 = 480 Ω → nimm 470 Ω</span>
        </div>
        <div className="callout warn">
          <span className="co-title">Schließe eine LED nie ohne Widerstand an</span>
          <p>
            Jede LED in jeder Schaltung braucht etwas, das ihren Strom begrenzt — bei den
            kleinen meist auf 10–20 mA. Diese Regel kennt keine Ausnahmen, und im Labor unten
            kannst du sie auf die unterhaltsame Art lernen (an einem simulierten Opfer).
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Leuchten lassen — oder grillen",
      intro: (
        <>
          <p>Eine LED, eine Versorgung und ein Widerstand deiner Wahl. Die LED kann hier wirklich sterben.</p>
          <ul>
            <li>Finde für eine rote LED an 9 V den Widerstand, der 15 mA ergibt. Vergleiche mit der Rezept-Anzeige.</li>
            <li>Schieb R jetzt nach unten und sieh zu, wie der Arbeitspunkt den Hockeyschläger hinaufklettert… 💀</li>
            <li>Pol die LED um — die Kennlinie erklärt, was du siehst.</li>
            <li>Wechsle bei niedrigen Versorgungsspannungen zu Blau. Warum bleibt sie länger dunkel als Rot?</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Eine weiße LED (Vf = 3,2 V) soll mit 10 mA an einer 12-V-Versorgung laufen. Welcher Vorwiderstand?",
        answer: 880,
        unit: "Ω",
        hint: "R = (Vs − Vf) / I — der Widerstand sieht nur die übrig bleibende Spannung.",
        explain: "(12 − 3,2)/0,010 = 880 Ω → nimm den Standardwert 820 Ω oder 1 kΩ.",
      },
      {
        prompt: "Eine rote LED (Vf = 1,8 V) mit einem 330-Ω-Widerstand an einer 5-V-Schiene. Welcher Strom fließt?",
        answer: 3.2 / 330,
        unit: "A",
        hint: "Am Widerstand fällt Vs − Vf ab; den Rest erledigt das Ohmsche Gesetz.",
        explain: "(5 − 1,8)/330 ≈ 9,7 mA — angenehm hell, angenehm sicher.",
      },
      {
        prompt: "Wie viel Leistung setzt der 330-Ω-Widerstand in derselben Schaltung um?",
        answer: (3.2 * 3.2) / 330,
        unit: "W",
        hint: "An ihm liegen 3,2 V: P = V²/R.",
        explain: "3,2²/330 ≈ 0,031 W — weit entfernt von der ¼-W-Belastbarkeit.",
      },
    ],
    quiz: [
      {
        q: "Eine Diode leitet, wenn…",
        choices: [
          "sie in Durchlassrichtung gepolt ist und die Spannung über ihr Vf übersteigt",
          "Strom von der Kathode zur Anode fließt",
          "überhaupt irgendeine Spannung anliegt",
          "sie unter Raumtemperatur gekühlt wird",
        ],
        answer: 0,
        explain:
          "Durchlassrichtung (Anode positiv) plus mindestens die Durchlassspannung (~0,7 V bei Silizium, 1,8–3,2 V bei LEDs) öffnet das Ventil.",
      },
      {
        q: "Für eine 9-V-Versorgung und eine rote LED (Vf = 1,8 V) bei 15 mA sollte der Vorwiderstand etwa … betragen.",
        choices: ["47 Ω", "480 Ω", "4,8 kΩ", "600 Ω"],
        answer: 1,
        explain: "R = (9 − 1,8)/0,015 = 480 Ω — greif zum Standardwert 470 Ω.",
      },
      {
        q: "Welches physische Merkmal kennzeichnet die Kathode einer LED?",
        choices: ["Das längere Bein", "Das dickere Bein", "Ein roter Punkt", "Die abgeflachte Seite / das kürzere Bein"],
        answer: 3,
        explain: "Abgeflachte Seite und kurzes Bein = Kathode (−). Langes Bein = Anode (+). Lohnt sich, das vor dem Capstone-Aufbau auswendig zu können.",
      },
      {
        q: "Warum braucht eine LED einen Widerstand, eine Glühlampe aber nicht?",
        choices: [
          "LEDs sind teurer",
          "Glühlampen laufen nur mit AC",
          "Jenseits von Vf begrenzt eine LED ihren Strom kaum selbst — ihre I–V-Kennlinie ist fast senkrecht",
          "Widerstände machen das Licht heller",
        ],
        answer: 2,
        explain:
          "Der Widerstand eines Glühfadens begrenzt dessen Strom von selbst. Eine leitende LED jenseits von Vf ist fast ein Kurzschluss — etwas anderes muss den Strom festlegen.",
      },
    ],
  },

  /* ================================================================ */
  transistors: {
    Theory: () => (
      <>
        <h2>Das Problem, das er löst</h2>
        <p>
          Angenommen, ein Sensor liefert ein schwaches Signal — Mikroampere, viel zu wenig, um
          eine LED leuchten zu lassen, geschweige denn einen Motor zu drehen. Du brauchst ein
          Bauteil, in dem ein <em>kleiner</em> Strom einen <em>großen</em> steuert. Das ist der{" "}
          <strong>Transistor</strong>, 1947 in den Bell Labs erfunden und mit Abstand das
          meistgefertigte Objekt der Menschheitsgeschichte — du besitzt Billionen davon.
        </p>

        <h2>Der BJT: zwei Übergänge, drei Beine</h2>
        <p>
          Der klassische <strong>NPN-Bipolartransistor</strong> ist ein Sandwich aus
          p–n-Übergängen mit drei Anschlüssen: <strong>Kollektor</strong>,{" "}
          <strong>Basis</strong>, <strong>Emitter</strong>. Die Regel des Bauteils:
        </p>
        <div className="formula">
          I_C ≈ β × I_B
          <span className="note">β (Stromverstärkung) liegt typisch bei ~100 · Basis–Emitter verhält sich wie eine Diode (0,7 V)</span>
        </div>
        <p>
          Speise einen kleinen Strom in die Basis (das kostet etwa 0,7 V, wie bei einer Diode),
          und der Transistor lässt β-mal mehr Strom vom Kollektor zum Emitter fließen. 50 µA
          hinein, 5 mA gesteuert. Der Transistor erzeugt den großen Strom nicht — den liefert
          die Versorgung; die Basis öffnet nur den Hahn.
        </p>

        <h2>Drei Bereiche, zwei Jobs</h2>
        <ul>
          <li><strong>Sperrbereich</strong> — kein Basisstrom, kein Kollektorstrom. Der Schalter ist AUS.</li>
          <li><strong>Aktiver Bereich</strong> — I_C folgt β·I_B proportional. Das ist Verstärker-Territorium: Audio, Funk, Sensoren.</li>
          <li><strong>Sättigung</strong> — die Basis verlangt mehr, als der Kollektorkreis liefern kann; der Transistor ist voll AN und lässt nur noch ~0,2 V an sich abfallen. Die Digitalelektronik lebt an den beiden Extremen: Sperrbereich = 0, Sättigung = 1.</li>
        </ul>
        <p>
          So benutzt du ihn als Schalter: Kollektorlast (LED + Widerstand) an die Versorgung,
          Emitter an Masse, und ein <strong>Basiswiderstand</strong>, so dimensioniert, dass das
          &bdquo;Ein&ldquo;-Signal ihn tief in die Sättigung treibt — mit, sagen wir, dem
          Fünffachen des minimal nötigen Basisstroms. Der Basiswiderstand schützt außerdem den
          Basis-Übergang, der eine Diode ist und sonst unbegrenzt Strom schlucken würde (wieder
          die Regel aus Lektion 3.1!).
        </p>

        <div className="callout note">
          <span className="co-title">Von eins zu einer Billion</span>
          <p>
            Moderne Chips verwenden MOSFETs — Transistoren, die von einer Spannung an einem
            isolierten Gate geschaltet werden statt von Basisstrom —, weil sie sich auf
            Nanometer schrumpfen und milliardenfach pro Sekunde schalten lassen. Eine CPU ist
            schlicht: Milliarden Transistorschalter, zu Logik verdrahtet. Der Chip deiner
            nächsten Lektion enthält etwa fünfundzwanzig davon — genau darum ist er
            verstehbar, und genau darum ist er die perfekte Brücke.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Kleiner Strom, großer Strom",
      intro: (
        <>
          <p>Ein NPN-Schalter, der eine LED treibt. Beobachte die µA-und-mA-Balken — sie erzählen die ganze Geschichte.</p>
          <ul>
            <li>Erhöhe Vin langsam. Nichts passiert bis 0,7 V — die Basis ist eine Diode.</li>
            <li>Prüfe im aktiven Bereich Ic/Ib ≈ 100 auf der Anzeige.</li>
            <li>Erhöhe Vin weiter: Ic stößt an eine Decke. Das ist die Sättigung — der LED-Kreis gibt alles, was er hat.</li>
            <li>Erreichst du mit Rb = 1 MΩ noch die Sättigung? Warum nicht?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein BJT mit β = 100 bekommt 50 µA Basisstrom (aktiver Bereich). Kollektorstrom?",
        choices: ["50 µA", "0,5 mA", "50 mA", "5 mA"],
        answer: 3,
        explain: "I_C = β·I_B = 100 × 50 µA = 5000 µA = 5 mA.",
      },
      {
        q: "Ein Transistorschalter in der Sättigung…",
        choices: [
          "blockiert jeden Strom",
          "ist voll durchgeschaltet und lässt nur ~0,2 V an sich abfallen",
          "verstärkt proportional",
          "ist zerstört",
        ],
        answer: 1,
        explain:
          "Sättigung = voll an: Der eigene Widerstand des Kollektorkreises begrenzt den Strom, und am Transistor fällt fast nichts mehr ab.",
      },
      {
        q: "Warum braucht der Basisanschluss einen Widerstand?",
        choices: [
          "Der Basis-Emitter-Übergang ist eine Diode — ohne Begrenzung zieht er zerstörerisch viel Strom",
          "Um den Transistor langsamer zu machen",
          "Um β zu erhöhen",
          "Tradition",
        ],
        answer: 0,
        explain:
          "Dieselbe Regel wie bei der LED: Ein in Durchlassrichtung gepolter Übergang begrenzt seinen Strom nicht selbst. Der Basiswiderstand legt ihn fest.",
      },
      {
        q: "Digitalschaltungen nutzen Transistoren hauptsächlich in welchen Bereichen?",
        choices: [
          "Nur im aktiven Bereich",
          "Nur in der Sättigung",
          "Sperrbereich und Sättigung — voll aus und voll an",
          "In keinem: Digitalchips enthalten keine Transistoren",
        ],
        answer: 2,
        explain:
          "Logik will eindeutige Nullen und Einsen: Sperrbereich und Sättigung sind die zwei sauberen, verlustarmen Zustände. Eine CPU ist Milliarden solcher Schalter.",
      },
    ],
  },

  /* ================================================================ */
  "timer-555": {
    Theory: () => (
      <>
        <h2>Ein Chip, den du wirklich verstehen kannst</h2>
        <p>
          1971 von Hans Camenzind entworfen, ist der <strong>555-Timer</strong> der
          meistverkaufte Chip aller Zeiten — Milliarden Stück pro Jahr, ein halbes Jahrhundert
          später. Innen stecken nur ~25 Transistoren, die drei Dinge umsetzen, die du bereits
          kennst:
        </p>
        <ul>
          <li>
            Ein <strong>Spannungsteiler</strong> — drei interne 5-kΩ-Widerstände (oft, ein
            wenig apokryph, als Ursprung des Namens genannt) — erzeugt zwei Referenzpegel:
            ⅓ Vcc und ⅔ Vcc.
          </li>
          <li>
            Zwei <strong>Komparatoren</strong> vergleichen die Pins 2 und 6 mit diesen
            Referenzen und kippen einen internen Speicher (ein Flipflop), der den Ausgang
            Pin 3 treibt.
          </li>
          <li>
            Ein <strong>Entladetransistor</strong> an Pin 7, der auf Kommando einen externen
            Kondensator leert.
          </li>
        </ul>
        <Pinout555 />

        <h2>Astabiler Betrieb: der elektronische Herzschlag</h2>
        <p>
          Verdrahte R1 von Vcc zu Pin 7, R2 von Pin 7 hinunter zum Kondensator und den
          Kondensator an Masse, während die Pins 2 und 6 den Kondensator beobachten. Verfolge
          nun einen Zyklus:
        </p>
        <ol>
          <li>
            <strong>Laden:</strong> Ausgang HIGH, Entladetransistor aus. C lädt über{" "}
            <strong>R1 + R2</strong>, seine Spannung klettert deine Kurve aus Lektion 2.3
            hinauf.
          </li>
          <li>
            <strong>Obere Schwelle:</strong> C erreicht ⅔ Vcc → der Threshold-Komparator kippt
            das Flipflop. Der Ausgang schnappt auf LOW, Pin 7 schaltet ein.
          </li>
          <li>
            <strong>Entladen:</strong> C entlädt sich <strong>nur über R2</strong> in Pin 7
            und rutscht die Kurve wieder hinab.
          </li>
          <li>
            <strong>Untere Schwelle:</strong> C erreicht ⅓ Vcc → der Trigger-Komparator kippt
            alles zurück. Ausgang HIGH, und der Zyklus wiederholt sich — für immer.
          </li>
        </ol>
        <div className="formula">
          t_high = 0.693·(R1+R2)·C · t_low = 0.693·R2·C
          <span className="note">f = 1.44 / ((R1 + 2·R2)·C) · der Kondensator pendelt zwischen ⅓ und ⅔ Vcc</span>
        </div>
        <p>
          Jedes Stück davon beherrschst du schon: Die RC-Kurve gibt das Tempo vor
          (Lektion 2.3), ein Teiler definiert die Schwellen (Lektion 2.2), ein Transistor
          erledigt das Entladen (Lektion 3.2), und das Ohmsche Gesetz wählt die Bauteilwerte
          (Lektion 1.2). Der 555 verpackt nur die Schleife.
        </p>
        <div className="callout tip">
          <span className="co-title">Ein Chip, endlose Tricks</span>
          <p>
            Bremse ihn auf ~1,5 Hz, und du hast deinen Capstone-Blinker. Beschleunige ihn auf
            440 Hz an einem Piezo, und er spielt ein A. Die One-Shot-Beschaltung
            (&bdquo;monostabil&ldquo;) liefert zeitgesteuerte Pulse — Toaster, Quiz-Buzzer,
            Scheibenwischer-Intervalle. Alles aus R, C und zwei Schwellen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der astabile Herzschlag",
      intro: (
        <>
          <p>
            Ein kompletter astabiler 555 auf dem Oszi: Kondensatorspannung in Cyan, die
            zwischen der ⅓- und der ⅔-Linie pendelt, Ausgang in Bernstein, LED blinkt mit.
          </p>
          <ul>
            <li>Starte mit R1 = 1 k, R2 = 47 k, C = 10 µF — exakt deine Capstone-Werte. Beachte f ≈ 1,5 Hz.</li>
            <li>Vergrößere C auf 100 µF: zehnmal langsamer. Verkleinere R2: schneller — aber der Tastgrad wandert Richtung 100 %. Vergrößere R2, um dich 50 % zu nähern… warum?</li>
            <li>Bei schnelleren Einstellungen verlangsamt die Sim die Darstellung, damit du die Form noch sehen kannst (dein Auge könnte es nicht).</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein astabiler 555 mit R1 = 10 kΩ, R2 = 68 kΩ, C = 1 µF. Mit welcher Frequenz läuft er?",
        answer: 1.44 / ((10000 + 2 * 68000) * 1e-6),
        unit: "Hz",
        hint: "f = 1.44 / ((R1 + 2·R2) · C).",
        explain: "1,44/(146 000 × 10⁻⁶) ≈ 9,9 Hz.",
      },
      {
        prompt: "Dieselbe Schaltung: Wie lang ist jede HIGH-Phase?",
        answer: 0.693 * 78000 * 1e-6,
        unit: "s",
        hint: "t_high = 0.693 · (R1 + R2) · C.",
        explain: "0,693 × 78 k × 1 µ ≈ 54 ms.",
      },
      {
        prompt: "Dieselbe Schaltung: Wie groß ist der Tastgrad, in Prozent HIGH?",
        answer: (78000 / 146000) * 100,
        unit: "%",
        hint: "Tastgrad = (R1 + R2)/(R1 + 2·R2) — Ladepfad geteilt durch volle Periode.",
        explain: "78/146 ≈ 53,4 % — in dieser klassischen Beschaltung immer über 50 %.",
      },
    ],
    quiz: [
      {
        q: "Im astabilen Betrieb pendelt die Kondensatorspannung zwischen…",
        choices: ["0 V und Vcc", "0 V und ⅓ Vcc", "⅓ Vcc und ⅔ Vcc", "⅔ Vcc und Vcc"],
        answer: 2,
        explain:
          "Der interne Teiler legt die beiden Komparatorschwellen auf ⅓ und ⅔ der Versorgung; der Kondensator pendelt dazwischen hin und her.",
      },
      {
        q: "Mit R1 = 1 kΩ, R2 = 47 kΩ, C = 10 µF beträgt die Frequenz f = 1.44/((R1+2R2)C) etwa…",
        choices: ["0,15 Hz", "1,5 Hz", "15 Hz", "150 Hz"],
        answer: 1,
        explain: "f = 1,44/(95 000 × 10⁻⁵) = 1,44/0,95 ≈ 1,5 Hz — der Herzschlag deines Blinkers.",
      },
      {
        q: "Der Ausgang eines 555 liegt auf Pin…",
        choices: ["3", "1", "7", "8"],
        answer: 0,
        explain: "Pin 3 ist OUT. (1 = GND, 8 = VCC, 7 = Entladung — das solltest du vor dem Aufbau im Schlaf können.)",
      },
      {
        q: "Warum ist die HIGH-Zeit des astabilen 555 immer länger als seine LOW-Zeit?",
        choices: [
          "Der Chip reagiert träge",
          "Stimmt nicht — LOW ist länger",
          "LEDs bremsen die steigende Flanke",
          "C lädt über R1+R2, entlädt sich aber nur über R2",
        ],
        answer: 3,
        explain:
          "Das Laden kämpft sich durch beide Widerstände, das Entladen nur durch R2. Mehr Widerstand = mehr Zeit (τ = RC), also immer HIGH > LOW.",
      },
    ],
  },
};
