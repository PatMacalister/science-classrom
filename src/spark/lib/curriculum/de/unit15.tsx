import type { LessonContentDe } from "../localize";

/** Full German content for Unit 15 (real-components, debugging). */

export const unit15De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "real-components": {
    Theory: () => (
      <>
        <h2>Die Lügen der Simulatoren</h2>
        <p>
          Jedes Labor dieses Kurses — und jede SPICE-Simulation, die je lief — benutzte ideale
          Bauteile: Widerstände, die exakt ihren Wert haben, Drähte ohne Widerstand,
          Kondensatoren, die nur Kondensatoren sind. Echte Bauteile sind unordentlicher, auf
          Arten, die irgendwann zählen:
        </p>
        <ul>
          <li>
            <strong>Toleranz:</strong> Dein Widerstand mit goldenem ±5-%-Ring (1.3) ist ein
            Versprechen, kein Wert: Ein 10-kΩ-Teil liegt <em>irgendwo</em> zwischen 9,5 k und
            10,5 k. Stapel mehrere in einer Schaltung, und die Unsicherheiten kombinieren sich.
          </li>
          <li>
            <strong>Temperatur:</strong> Widerstand driftet mit Wärme (~100 ppm/°C bei
            üblichen Teilen); ein Keramikkondensator kann zwischen Winterschuppen und
            Sommerauto die halbe Kapazität verlieren.
          </li>
          <li>
            <strong>Parasiten:</strong> Jeder Draht ist ein kleiner Widerstand <em>und</em>{" "}
            eine kleine Spule; jeder Kondensator versteckt Serienwiderstand (ESR) und
            Induktivität; jedes benachbarte Leiterbahnpaar ist ein winziger Kondensator. Unter
            ~1 MHz darfst du das meist ignorieren; die knackigen Flanken deines PWM
            (Spektrum-Lektion!) dürfen es nicht.
          </li>
          <li>
            <strong>Grenzwerte und Datenblätter:</strong> Das Datenblatt des Herstellers ist
            der Vertrag des Bauteils. Die Meister-Gewohnheit: Entwirf nach der Tabelle{" "}
            <em>recommended operating</em>, und behandle <em>absolute maximum</em> als die
            Klippenkante, auf der man nie picknickt.
          </li>
        </ul>

        <h2>Für die Wolke entwerfen</h2>
        <p>
          Ein funktionierender Prototyp beweist, dass <em>ein Punkt</em> der Toleranzwolke
          funktioniert. Die Produktion baut Tausende Punkte. Zwei professionelle
          Verteidigungen:
        </p>
        <div className="formula">
          worst-case: check the corners · Monte Carlo: roll the dice thousands of times
          <span className="note">Worst-Case: die Ecken prüfen · Monte Carlo: tausendfach würfeln — das Labor unten baut 800 &bdquo;identische&ldquo; Teiler, damit du die Wolke persönlich triffst</span>
        </div>
        <p>
          Die Entwurfsschlüsse sind herrlich praktisch: Lass Verhalten wo möglich von{" "}
          <strong>Verhältnissen</strong> gleichartiger Teile abhängen (Verhältnisse laufen
          besser gleich als Absolutwerte — der Trick, den Op-Amp-Schaltungen ausnutzen), kauf
          Präzision nur für die Teile, die die Genauigkeit setzen, und lass überall sonst
          Reserve. Eine ±3-%-Ausgangsspezifikation aus ±10-%-Teilen ist keine Sparsamkeit;
          das ist eine Ausschusskiste.
        </p>
        <div className="callout note">
          <span className="co-title">Eine Regel, die ihre eigene Box verdient: Abblocken</span>
          <p>
            Jeder Versorgungspin jedes Chips bekommt einen 100-nF-Kondensator, Millimeter
            entfernt, zur Massefläche. Schnelle Digitalflanken verlangen Stromschlucke, die
            die ferne Versorgung (durch ihre parasitäre Drahtinduktivität — Lektion 2.4!)
            nicht rechtzeitig liefern kann; der lokale Kondensator ist das persönliche
            Reservoir des Chips. Das 555-Datenblatt bittet darum, der Pico trägt einen Wald
            davon, und ihn zu vergessen ist die klassische Quelle von &bdquo;läuft auf der
            Werkbank, zickt im Feld&ldquo;.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Triff die Wolke",
      intro: (
        <>
          <p>Eine Fertigungslinie baut 800 &bdquo;identische&ldquo; 4,5-V-Teiler aus echten, toleranzbehafteten Widerständen.</p>
          <ul>
            <li>±1-%-Teile: eine enge Spitze, alles in der Spezifikation. Ausliefern.</li>
            <li>±5 %: Die Glockenkurve breitet sich bis an die Spezifikationszäune aus. Zähl die roten Ausläufer.</li>
            <li>±10 %: Lies den Ausschusszähler. Präzisionsteile wirken plötzlich billig.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein 10-kΩ-Widerstand mit ±5 % garantiert…",
        choices: [
          "exakt 10 kΩ",
          "einen Wert irgendwo zwischen 9,5 kΩ und 10,5 kΩ",
          "10 kΩ mit ±5 % Drift pro Jahr",
          "5 % Ausfallrate",
        ],
        answer: 1,
        explain: "Toleranz begrenzt die Fertigungsstreuung. Der tatsächliche Wert ist ein Punkt in diesem Bereich — du weißt nicht, wo.",
      },
      {
        q: "Warum beweist ein funktionierender Prototyp den Entwurf nicht?",
        choices: [
          "Prototypen benutzen besseres Lötzinn",
          "Er testet einen Punkt der Toleranzwolke; die Produktion zieht Tausende",
          "Prototypen laufen mit niedrigerer Spannung",
          "Er beweist ihn doch",
        ],
        answer: 1,
        explain: "Jede Einheit würfelt bei jedem Bauteil neu. Worst-Case- und Monte-Carlo-Analyse existieren, um der ganzen Wolke zu begegnen.",
      },
      {
        q: "Der 100-nF-Abblockkondensator neben jedem Chip existiert, um…",
        choices: [
          "das Audio zu filtern",
          "lokal die schnellen Stromschlucke zu liefern, die die Leitungsinduktivität nicht rechtzeitig schafft",
          "vor verpolten Batterien zu schützen",
          "die Versorgungsspannung zu erhöhen",
        ],
        answer: 1,
        explain: "Schnelle Flanken brauchen sofortige Ladung; die Drahtinduktivität (2.4) sagt Nein. Das lokale Reservoir sagt Ja. Nicht verhandelbar.",
      },
      {
        q: "„Absolute maximum ratings“ im Datenblatt bedeuten…",
        choices: [
          "den empfohlenen Arbeitspunkt",
          "Grenzen, die du nie überschreiten darfst, auch nicht kurz — kein Entwurfsziel",
          "für 10 Jahre garantierte Werte",
          "Marketingzahlen",
        ],
        answer: 1,
        explain: "Entwirf innerhalb der Recommended-Tabelle; Absolute Max ist, wo der Schaden beginnt, nicht wo die Reserve endet.",
      },
    ],
  },

  /* ================================================================ */
  debugging: {
    Theory: () => (
      <>
        <h2>Debuggen ist Messen plus Logik</h2>
        <p>
          Eine kaputte Schaltung fühlt sich wie Chaos an; in Wahrheit ist sie ein Logikrätsel
          mit physischen Hinweisen. Die professionelle Methode, destilliert:
        </p>
        <ul>
          <li>
            <strong>1. Glaub dem Symptom.</strong> &bdquo;LED dunkel&ldquo;, &bdquo;hängt
            an&ldquo;, &bdquo;zu schnell&ldquo; — jedes schließt bereits die meisten Fehler
            aus. Schreib es auf, bevor du irgendetwas anfasst.
          </li>
          <li>
            <strong>2. Zuerst die Versorgung.</strong> Die mit Abstand häufigste Fehlerklasse.
            Eine Messspitze auf der Versorgungsschiene entlastet sie (oder überführt sie)
            sofort.
          </li>
          <li>
            <strong>3. Teile die Schaltung in Hälften.</strong> Miss in der Mitte der
            Signalkette: gesund stromauf + tot stromab = der Fehler liegt zwischen deinen
            letzten zwei Messpunkten. Jede Messung halbiert das Verdachtsgebiet — eine
            16-stufige Kette ergibt sich nach 4 Messungen.
          </li>
          <li>
            <strong>4. Lass die Gesetze aussagen.</strong> Die Maschenregel (2.1) als
            Lügendetektor: Spannungen um eine Schleife, die sich nicht aufsummieren, zeigen
            auf deinen fehlenden Abfall. Ein Knoten, der festhängt, wo die Teiler-Rechnung
            sagt, dass er nicht sein kann, verrät dir, welches Teil nicht das Teil ist, für
            das du es hältst.
          </li>
          <li>
            <strong>5. Ändere eine Sache.</strong> Tauschen-und-Hoffen mit drei gleichzeitigen
            Änderungen vernichtet die Beweise. Eine Änderung, eine Beobachtung — wie in jedem
            Experiment.
          </li>
        </ul>

        <h2>Kenn die Klassiker</h2>
        <p>
          Erfahrene Ingenieure diagnostizieren schnell, weil die meisten Fehler alte Bekannte
          sind: verkehrte Polung (LED, Elko, Chip-Ausrichtung — die drei klassischen Fehler
          deines Abschlussprojekts), falscher Wert durch falsch gelesene Ringe (470 Ω und
          47 kΩ trennt eine Farbe!), kaputte oder fehlende Jumper, schwebende Pins, die
          angebunden gehören (RESET!), leere oder einbrechende Batterien und — auf gelöteten
          Platinen — die kalte Lötstelle. Fällt dir was auf? Jeder davon tauchte irgendwo in
          den Fehlersuchtabellen dieses Kurses auf. Die Tabellen waren das Training; diese
          Lektion ist die Prüfung.
        </p>
        <div className="formula">
          symptom → power → split the chain → one change at a time
          <span className="note">Symptom → Versorgung → Kette halbieren → eine Änderung nach der anderen: langweilig, methodisch, unverschämt wirksam</span>
        </div>
        <div className="callout tip">
          <span className="co-title">Die emotionale Hälfte der Fähigkeit</span>
          <p>
            Die Schaltung will dich nicht in den Wahnsinn treiben. Sie gehorcht der Physik
            perfekt — nur eben nicht der Schaltung, die du gebaut zu haben <em>glaubst</em>.
            In dem Moment, in dem Debuggen mystisch wirkt, miss deine Annahmen nach, beginnend
            mit der Versorgungsschiene. Der Fehler ist im Rückblick immer beschämend
            vernünftig; Meister erreichen den Rückblick nur früher.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Reparatur-Werkbank",
      intro: (
        <>
          <p>
            Ein Blinker-Board mit verstecktem Fehler, ein virtuelles Multimeter und dein Ruf.
            Miss Knoten, dann benenne den Schuldigen — Meister brauchen im Schnitt unter 3
            Messungen.
          </p>
          <ul>
            <li>Lies zuerst das Symptom: Es teilt die sieben Verdächtigen in Familien.</li>
            <li>Vier Fehler teilen das Symptom &bdquo;LED dunkel&ldquo; — finde die eine Messung, die jedes Paar trennt.</li>
            <li>Zwei Fehler sagen beide &bdquo;hängt AN&ldquo; — der Kondensatorknoten liest im einen 0 V, im anderen 9 V. Warum?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Die erste Messung an jeder toten Schaltung sollte sein…",
        choices: [
          "der Ausgang",
          "die Versorgungsschiene — Versorgungsfehler sind die häufigste Klasse",
          "das teuerste Bauteil",
          "die Temperatur",
        ],
        answer: 1,
        explain: "Eine Messung überführt entweder den wahrscheinlichsten Verdächtigen oder entlastet eine ganze Kategorie. Immer zuerst die Versorgung.",
      },
      {
        q: "Halbieren findet die kaputte Stufe einer 16-stufigen Signalkette in etwa…",
        choices: ["16 Messungen", "8 Messungen", "4 Messungen", "1 Messung"],
        answer: 2,
        explain: "Jede Messung halbiert das Gebiet: 16 → 8 → 4 → 2 → 1. Binäre Suche, mit Multimeter.",
      },
      {
        q: "Du misst ein schwingendes Pin 3, aber die LED leuchtet nie. Der Fehler liegt…",
        choices: [
          "im Timing-Netzwerk des 555",
          "in der Batterie",
          "stromab von Pin 3 — im LED-Zweig",
          "nicht lokalisierbar",
        ],
        answer: 2,
        explain: "Gesund stromauf + tot stromab klammert den Fehler dazwischen ein. Der Oszillator ist entlastet; der LED-Zweig ist verhaftet.",
      },
      {
        q: "Warum beim Debuggen immer nur eine Sache auf einmal ändern?",
        choices: [
          "um Bauteile zu sparen",
          "damit sich die Beobachtung eindeutig der Änderung zuordnen lässt",
          "weil Schaltungen nur eine Änderung vertragen",
          "Tradition",
        ],
        answer: 1,
        explain: "Drei gleichzeitige Änderungen, die es 'reparieren', lehren dich nichts — und verstecken oft einen zweiten Fehler. Debuggen ist ein Experiment; halt es kontrolliert.",
      },
    ],
  },
};
