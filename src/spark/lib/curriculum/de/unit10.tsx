import type { LessonContentDe } from "../localize";

/**
 * Full German content for Unit 10 (power electronics): theory JSX,
 * quizzes and numeric problems (answer values verbatim from English!)
 * and lab titles/intros.
 */

export const unit10De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "linear-regulators": {
    Theory: () => (
      <>
        <h2>Warum rohe Versorgungen nicht reichen</h2>
        <p>
          Deine Gleichrichter-Lektion (5.2) endete mit Gleichspannung, die noch wellt, und
          Batterien sacken über ihre Lebensdauer von 9,5 V auf 7 V ab. Chips tolerieren das
          nicht: Logik will 3,3 V oder 5 V, <em>exakt</em>, egal, was der Eingang treibt. Der
          fehlende Block im Netzteil-Rezept — <em>transformieren, gleichrichten, glätten, </em>
          <strong>regeln</strong> — ist diese Lektion.
        </p>

        <h2>Der Linearregler: Rückkopplung bis ganz nach unten</h2>
        <p>
          In einem Dreibein-Regler wie dem klassischen <strong>7805</strong> steckt alles aus
          Einheit 6: eine Spannungsreferenz, ein Fehlerverstärker und ein Längstransistor. Der
          Verstärker vergleicht eine heruntergeteilte Probe des Ausgangs mit der Referenz und
          steuert den Transistor wie einen selbstjustierenden Widerstand — Ausgang sackt ab?
          Hahn auf. Überschießt er? Drosseln. Es ist dein Verstärker mit Gegenkopplung (6.2),
          der statt Musik zu verstärken einen Gleichspannungspegel hält.
        </p>
        <div className="formula">
          P_wasted = (V_in − V_out) × I
          <span className="note">Wirkungsgrad = V_out / V_in · jedes verheizte Volt bei jedem Ampere ist pure Wärme</span>
        </div>
        <p>
          Und da ist der Haken. Speise einen 7805 mit 12 V bei 1 A Last, und er liefert 5 W,
          während er 7 W verbrennt — ein Heizlüfter mit 42 % Wirkungsgrad, der zufällig auch
          regelt. Deshalb tragen Linearregler Metallfahnen und Kühlkörper, und deshalb glänzen
          sie nur, wenn der Spannungsabfall klein oder der Strom bescheiden ist. Zwei weitere
          Eigenheiten: Sie brauchen den Eingang ein paar Volt <em>über</em> dem Ausgang (die{" "}
          <strong>Dropout-Spannung</strong> — darunter versagt die Regelung stillschweigend),
          und sie antworten auf Rauschen mit Stille: kein Schalten, keine Störungen, nur
          saubere Gleichspannung. Audio- und Radioschaltungen lieben sie genau dafür.
        </p>
        <div className="callout tip">
          <span className="co-title">Entwurfsgewohnheit</span>
          <p>
            Bevor du einen Linearregler einsetzt, mach den Zehn-Sekunden-Check aus Lektion 1.4:
            (V_in − V_out) × I. Unter einem halben Watt: geht nackt; ein paar Watt: Kühlkörper;
            mehr — lies die nächste Lektion.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Präzision, bezahlt in Wärme",
      intro: (
        <>
          <p>Ein 5-V-Linearregler mit einem Live-Leistungsfluss-Balken.</p>
          <ul>
            <li>12 V rein, 1 A raus: Sieh zu, wie mehr Leistung zu Wärme wird, als die Last erreicht.</li>
            <li>Senke Vin Richtung 7 V — der Wirkungsgrad klettert. Unterschreite die Dropout-Spannung, und die Regelung bricht zusammen.</li>
            <li>Finde eine Kombination, bei der der Regler ohne Kühlkörper kühl bleibt.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein Linearregler senkt 9 V auf 3,3 V bei 200 mA. Wie viel Wärme erzeugt er?",
        answer: (9 - 3.3) * 0.2,
        unit: "W",
        hint: "P = (Vin − Vout) · I.",
        explain: "5,7 × 0,2 = 1,14 W — Revier für einen kleinen Kühlkörper.",
      },
      {
        prompt: "Wie hoch ist der Wirkungsgrad dieser Umwandlung, in Prozent?",
        answer: (3.3 / 9) * 100,
        unit: "%",
        hint: "Beim Linearregler gilt: Wirkungsgrad = Vout / Vin.",
        explain: "3,3/9 ≈ 36,7 % — fast zwei Drittel der Batterie werden zu Wärme.",
      },
      {
        prompt: "Ein 7805 an 12 V liefert 0,5 A. Verlustleistung des Reglers?",
        answer: 3.5,
        unit: "W",
        hint: "Sieben Volt verheizt, ein halbes Ampere durchgelassen.",
        explain: "(12 − 5) × 0,5 = 3,5 W — dieser hier braucht wirklich einen Kühlkörper.",
      },
    ],
    quiz: [
      {
        q: "Ein Linearregler bekommt 12 V herein und liefert 5 V bei 1 A. Seine Verlustwärme beträgt…",
        choices: ["5 W", "7 W", "12 W", "0 W"],
        answer: 1,
        explain: "P = (Vin − Vout) × I = 7 V × 1 A = 7 W — mehr, als die Last erreicht!",
      },
      {
        q: "Der innere Mechanismus eines Linearreglers ist im Kern…",
        choices: [
          "ein Transformator",
          "ein Rückkopplungsverstärker, der einen Längstransistor als variablen Widerstand steuert",
          "eine Sicherung, die bei 5 V durchbrennt",
          "ein großer Kondensator",
        ],
        answer: 1,
        explain: "Referenz + Fehlerverstärker + Längstransistor: die Gegenkopplung aus Einheit 6, die einen Gleichspannungs-Sollwert hält.",
      },
      {
        q: "„Dropout-Spannung“ bedeutet…",
        choices: [
          "die Spannung, bei der der Chip explodiert",
          "den Mindestabstand, den Vin über Vout haben muss, damit die Regelung funktioniert",
          "die Ausgangswelligkeit",
          "die in den Drähten verlorene Spannung",
        ],
        answer: 1,
        explain: "Ein 7805 braucht grob Vin ≥ 7 V. Darunter ist der Längstransistor voll offen, und der Ausgang folgt Vin einfach nach unten.",
      },
      {
        q: "Wann ist ein Linearregler die RICHTIGE Wahl?",
        choices: [
          "48 V auf 1 V bei 20 A umwandeln",
          "Kleine Spannungsabfälle oder kleine Ströme, und rauschempfindliche Analog-/Radioschaltungen",
          "Nie — Schaltregler gewinnen immer",
          "Nur in Autos",
        ],
        answer: 1,
        explain:
          "Wo das Produkt (Vin−Vout)·I klein ist, sind seine Einfachheit und völlige Stille unschlagbar. Große Spannungsstufen und große Ströme gehören den Schaltreglern.",
      },
    ],
  },

  /* ================================================================ */
  "switching-converters": {
    Theory: () => (
      <>
        <h2>Verbrenn die Differenz nicht — nimm sie erst gar nicht an</h2>
        <p>
          Der Linearregler verschwendet Leistung, weil sein Transistor halb offen steht und
          Spannung abfallen lässt, während Strom fließt — genau die Situation, vor der
          Lektion 3.2 warnte. Die Schaltregler-Idee: Ein Transistor, der immer nur{" "}
          <strong>voll durchgeschaltet</strong> ist (keine Spannung über ihm) oder{" "}
          <strong>voll gesperrt</strong> (kein Strom durch ihn), verheizt in beiden Zuständen
          fast nichts. Also: hart schalten, zehntausende Male pro Sekunde, und PWM das
          Verhältnis bestimmen lassen.
        </p>

        <h2>Der Abwärtswandler</h2>
        <p>
          Zerhacke 12 V mit PWM bei, sagen wir, 42 % Tastgrad, und der Schaltknoten mittelt
          sich auf 5 V — aber als brachiales Rechtecksignal. Jetzt die Reunion-Tour: Eine{" "}
          <strong>Spule</strong> (2.4) wehrt sich gegen die Stromänderungen und ein{" "}
          <strong>Kondensator</strong> (2.3) gegen die Spannungsänderungen — zusammen ein
          Tiefpassfilter (5.3), dessen Grenzfrequenz weit unter der Schaltfrequenz liegt. Das
          Gehacke wird weggefiltert; der Mittelwert segelt hindurch:
        </p>
        <div className="formula">
          V_out ≈ D × V_in
          <span className="note">der Tastgrad ist der Stellknopf — schließe die Schleife mit Rückkopplung, und er regelt sich selbst</span>
        </div>
        <p>
          (Noch ein bekanntes Gesicht: Wenn der Schalter sperrt, muss der Spulenstrom
          weiterfließen — eine Diode gibt ihm den Pfad, genau deine Freilaufdiode aus 2.4. In
          modernen Wandlern übernimmt ein zweiter Transistor diese Rolle.)
        </p>
        <p>
          Der Wirkungsgrad landet bei 85–96 %, fast unabhängig davon, wie groß die
          Spannungsstufe ist. Deshalb läuft jedes Handyladegerät, jedes Laptop-Netzteil, jeder
          LED-Treiber, jedes Auto-Steuergerät und jede Serverfarm auf Schaltwandlern — die
          weltweit von dieser einen Schaltung eingesparte Elektrizität wird in Kraftwerken
          gemessen.
        </p>

        <h2>Die Tauschgeschäfte des Ingenieurs</h2>
        <ul>
          <li><strong>Welligkeit vs. Größe:</strong> Größere L und C glätten besser, kosten aber Platz und Geld. ΔI ∝ 1/(L·f_sw).</li>
          <li><strong>Frequenz:</strong> Schnelleres Schalten schrumpft L und C — aber jede Schaltflanke verschwendet einen Krümel Energie, der Wirkungsgrad sinkt also etwas. Moderne Designs laufen mit 0,5–2 MHz.</li>
          <li><strong>Störungen:</strong> All das Gehacke strahlt ab. Schaltregler brauchen sorgfältiges Layout, und empfindliche Analogstufen bekommen oft einen leisen Linearregler, gespeist <em>aus</em> einem Schaltregler — beide Lektionen in einer Versorgung.</li>
        </ul>
        <div className="callout note">
          <span className="co-title">Du hast schon einen gebaut</span>
          <p>
            Dein PWM-Dimmer (Einheit 8) plus das Tiefpass-Experiment war buchstäblich ein
            Abwärtswandler ohne Regelschleife. Der Expertenkurs befördert weiter Schaltungen,
            die dir gehören, zu größeren Aufgaben.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Zerhacken, Glätten, Profitieren",
      intro: (
        <>
          <p>Ein Abwärtswandler mit Schaltknoten und Ausgang nebeneinander, plus ein Live-Wirkungsgrad-Duell gegen einen Linearregler mit derselben Aufgabe.</p>
          <ul>
            <li>Stell 12 V Eingang, 42 % Tastgrad ein: 5 V Ausgang. Fahre den Tastgrad durch — der Ausgang folgt D·Vin.</li>
            <li>Schrumpfe L auf 10 µH: Die Welligkeit bläht sich auf. Behebe es durch Anheben von f_sw — und prüfe dann, was mit dem Wirkungsgrad passiert ist.</li>
            <li>Verlange 12 V → 3,3 V und vergleiche die beiden Wirkungsgrad-Balken. Darum kochen Handys nicht.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein Abwärtswandler läuft an 12 V mit 40 % Tastgrad. Ausgangsspannung?",
        answer: 4.8,
        unit: "V",
        hint: "Vout ≈ D · Vin.",
        explain: "0,40 × 12 = 4,8 V.",
      },
      {
        prompt: "Welcher Tastgrad erzeugt 3,3 V aus einem 9-V-Eingang, in Prozent?",
        answer: (3.3 / 9) * 100,
        unit: "%",
        hint: "D = Vout / Vin.",
        explain: "3,3/9 ≈ 36,7 % — dasselbe Verhältnis wie im linearen Fall, aber diesmal kommen ~93 % der Energie an.",
      },
      {
        prompt: "Spulenstrom-Welligkeit: Vin = 12 V, D = 0,5, L = 220 µH, fsw = 100 kHz. ΔI = Vin·D(1−D)/(L·fsw)?",
        answer: (12 * 0.25) / (220e-6 * 100000),
        unit: "A",
        hint: "Direkt einsetzen — achte auf die Zehnerpotenzen bei L und fsw.",
        explain: "12×0,25/(0,022) ≈ 0,136 A ≈ 136 mA Dreieck-Welligkeit.",
      },
    ],
    quiz: [
      {
        q: "Ein Abwärtswandler mit Vin = 12 V bei 40 % Tastgrad gibt etwa aus…",
        choices: ["12 V", "7,2 V", "4,8 V", "2,4 V"],
        answer: 2,
        explain: "Vout ≈ D·Vin = 0,4 × 12 = 4,8 V — der PWM-Mittelwert, bewahrt vom LC-Filter.",
      },
      {
        q: "Schaltwandler sind effizient, weil der Transistor…",
        choices: [
          "aus speziellem Silizium besteht",
          "immer entweder voll durchgeschaltet ist (keine Spannung) oder voll gesperrt (kein Strom)",
          "sehr kalt läuft",
          "Wechselstrom statt Gleichstrom benutzt",
        ],
        answer: 1,
        explain:
          "P = V×I im Schalter: In beiden Extremzuständen ist ein Faktor ~null. Beim halb offenen linearen Längstransistor sind beide ungleich null — daher die Wärme.",
      },
      {
        q: "L und C in einem Abwärtswandler wirken als…",
        choices: [
          "resonanter Radio-Tuner",
          "Tiefpassfilter, das den Mittelwert behält und das Schalt-Gehacke abweist",
          "Notstrombatterie",
          "Spannungsverdoppler",
        ],
        answer: 1,
        explain: "Genau dein Filter aus Lektion 5.3, so dimensioniert, dass f_cutoff ≪ f_switching: Der Gleichanteil passiert, das Gehacke wird gestoppt.",
      },
      {
        q: "Eine höhere Schaltfrequenz erlaubt dir…",
        choices: [
          "kleinere L und C, zum Preis etwas höherer Schaltverluste",
          "die Spule ganz wegzulassen",
          "über 100 % Wirkungsgrad zu kommen",
          "den Welligkeitsstrom des Ausgangskondensators zu eliminieren",
        ],
        answer: 0,
        explain:
          "Welligkeit ∝ 1/f_sw, die Bauteile schrumpfen also — aber jede Flanke kostet ein wenig Energie. Echte Designs balancieren beides.",
      },
    ],
  },
};
