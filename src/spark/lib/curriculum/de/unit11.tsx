import type { LessonContentDe } from "../localize";

/**
 * Full German content for Unit 11 (microcontrollers): theory JSX,
 * quizzes (same answer indices as English!) and lab titles/intros.
 */

export const unit11De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  microcontrollers: {
    Theory: () => (
      <>
        <h2>Einheit 7, ausgeliefert als Produkt</h2>
        <p>
          Du hast einen Addierer aus Gattern gebaut und einen Zähler aus Flipflops. Skaliere
          diese ehrliche Konstruktion ein paar Millionen Mal hoch, füge Programmspeicher hinzu,
          und du bekommst einen <strong>Mikrocontroller (MCU)</strong>: einen kompletten
          Computer — CPU, Flash für dein Programm, RAM für seine Variablen — plus{" "}
          <strong>Peripherie</strong>, deren Pins die physische Welt berühren. Ein Raspberry
          Pi Pico kostet etwa 5 $ und enthält zwei 133-MHz-Prozessoren. Der Chip, der Apollo
          zum Mond brachte, würde sich schämen.
        </p>
        <p>Was die Peripherie ist, kennst du bereits aus diesem Kurs:</p>
        <ul>
          <li><strong>GPIO</strong> — Allzweck-Pins, die dein Programm auf High/Low schalten kann: ein Transistorschalter (3.2) pro Pin, unter Software-Kommando.</li>
          <li><strong>Timer/PWM</strong> — dein 555 und der Dimmer aus Einheit 8, in Silizium, an jedem Pin.</li>
          <li><strong>ADC</strong> — der Analog-Digital-Wandler, der Star der nächsten Lektion.</li>
          <li><strong>Serielle Schnittstellen</strong> — Flipflop-Schieberegister, die mit anderen Chips sprechen.</li>
        </ul>

        <h2>Ein Programm ist eine Schaltung, die du editieren kannst</h2>
        <p>
          Firmware führt eine Zeile nach der anderen aus, vorwärtsmarschiert vom{" "}
          <strong>Programmzähler</strong> — genau der Zähler-Idee aus Lektion 7.3, die jetzt
          auf Befehle zeigt. Das Blink-Programm unten tut exakt, was dein 555-Abschlussprojekt
          tat. Der Unterschied ist trotzdem tiefgreifend: Die Blinkrate des 555 zu ändern hieß,
          einen physischen Kondensator zu tauschen; diese hier zu ändern heißt, die Zahl{" "}
          <code>0.5</code> zu editieren. Hardware legt fest, was eine Schaltung tun{" "}
          <em>kann</em>; Software entscheidet, was sie <em>tut</em> — und du kannst die
          Entscheidung nach dem Mittagessen revidieren.
        </p>
        <div className="formula">
          read inputs → decide → write outputs → repeat
          <span className="note">die „Superloop“ — das Skelett fast aller Embedded-Firmware</span>
        </div>

        <h2>MicroPython: die freundliche Auffahrt</h2>
        <p>
          Profis schreiben MCU-Firmware oft in C, aber der Pico führt mit Vergnügen{" "}
          <strong>MicroPython</strong> aus — echtes Python, auf dem Chip, im Gespräch mit den
          Pins. Du tippst eine Zeile, das Board führt sie sofort aus; speichere eine Datei
          namens <code>main.py</code>, und das Board startet sie bei jedem Einschalten —
          Computer nicht mehr nötig. Dieser Arbeitsablauf ist das ganze Setup des
          Abschlussprojekts, zwei Lektionen von hier.
        </p>
        <div className="callout note">
          <span className="co-title">MCU vs. Computer</span>
          <p>
            Dein Laptop betreibt ein Betriebssystem, das Tausende Aufgaben jongliert. Ein MCU
            führt typischerweise <em>dein Programm und sonst nichts</em> aus, startet
            Millisekunden nach dem Einschalten, läuft jahrelang, mit Milliwatt. Diese
            Zielstrebigkeit ist der Grund, warum sie sich in Waschmaschinen, Autos (Dutzende
            pro Auto), Spielzeug und Thermostaten verstecken — über 30 Milliarden werden jedes
            Jahr hergestellt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Sei die CPU",
      intro: (
        <>
          <p>Das echte MicroPython-Blinkprogramm, ausgeführt Zeile für hervorgehobene Zeile.</p>
          <ul>
            <li>Geh zuerst manuell durch: Die Setup-Zeilen laufen einmal; die while-Schleife läuft ewig.</li>
            <li>Drück Run und sieh zu, wie der Programmzähler die Schleife umkreist, während die LED blinkt.</li>
            <li>Beachte, wo die CPU fast ihre ganze Zeit verbringt: schlafend in sleep(). Echte Firmware auch.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Mikrocontroller unterscheidet sich von den Chips deiner früheren Lektionen, weil er enthält…",
        choices: [
          "keine Transistoren",
          "eine programmierbare CPU mit Speicher und I/O-Peripherie — einen kompletten Computer",
          "nur Analogschaltungen",
          "eine eingebaute Batterie",
        ],
        answer: 1,
        explain: "Es ist die Logik aus Einheit 7 im Großmaßstab plus Programmspeicher: ein Computer, dessen Pins bis in dein Steckbrett reichen.",
      },
      {
        q: "Der „Programmzähler“ in einer CPU ist…",
        choices: [
          "ein Zähler, der verfolgt, welcher Befehl als Nächstes ausgeführt wird — die Idee aus Lektion 7.3",
          "eine Zählung, wie viele Programme installiert sind",
          "die Seriennummer des Chips",
          "ein Timer für sleep()",
        ],
        answer: 0,
        explain: "Er schreitet (und springt) durch Befehlsadressen — die hervorgehobene Zeile im Labor ist genau er.",
      },
      {
        q: "Die Rate deines 555-Blinkers zu ändern brauchte einen neuen Kondensator. Die Rate des MCU-Blinkers zu ändern braucht…",
        choices: [
          "einen neuen Quarz",
          "das Editieren einer Zahl im Code",
          "einen heißeren Lötkolben",
          "eine andere LED",
        ],
        answer: 1,
        explain: "sleep(0.5) → sleep(0.1). Diese Editierbarkeit ist die ganze Revolution.",
      },
      {
        q: "Wo verbringt die CPU im Blinkprogramm fast ihre gesamte Zeit?",
        choices: [
          "Beim Berechnen von led.on()",
          "Beim Warten in sleep()",
          "Beim Importieren von Modulen",
          "Beim Lesen des ADC",
        ],
        answer: 1,
        explain:
          "Die Pin-Umschaltungen dauern Mikrosekunden; die zwei halbsekündigen Sleeps dominieren. Die meisten Embedded-CPUs warten meistens — effizient.",
      },
    ],
  },

  /* ================================================================ */
  "adc-sensors": {
    Theory: () => (
      <>
        <h2>Der Grenzübergang</h2>
        <p>
          Software lebt von Zahlen; die Welt spricht Spannung. Der{" "}
          <strong>Analog-Digital-Wandler</strong> ist der Grenzposten: Er misst die Spannung
          eines Pins und meldet sie als ganze Zahl. In seinem Innern steckt Hardware aus
          Einheit 6 — Komparatoren, die den Eingang gegen Referenzpegel abwägen (viele Designs
          machen buchstäblich eine binäre Suche mit einem Komparator und einem DAC). Der ADC
          des Pico liefert 12 Bit: 0 V → 0, 3,3 V → 4095, etwa 0,8 mV pro Stufe. (MicroPython
          skaliert die Messwerte der Bequemlichkeit halber auf einen 16-Bit-Bereich von
          0–65535.)
        </p>
        <div className="formula">
          code = floor(V_in / V_ref × 2ⁿ)
          <span className="note">n Bit → 2ⁿ Stufen · endliche Stufen = Quantisierung, der Preis des Digitalen</span>
        </div>
        <p>
          Die Treppe im Labor macht den Tausch sichtbar: Zwischen zwei Stufen lesen sich alle
          Eingangsspannungen als dieselbe Zahl. Mehr Bits verkleinern die Stufen — aber
          Rauschen unterhalb einer Stufe verschwindet so oder so, was oft ein Feature ist.
        </p>

        <h2>Sensoren sind meistens Spannungsteiler</h2>
        <p>
          Wie bekommst du eine Temperatur oder eine Helligkeit <em>als Spannung</em>? Die
          Antwort aus Lektion 2.2, unverändert: Setz einen fühlenden Widerstand — einen
          Fotowiderstand (LDR), einen Thermistor, einen Biegesensor — mit einem Festwiderstand
          in einen <strong>Spannungsteiler</strong>, und die Mittelpunktspannung folgt der
          physikalischen Größe. Verdrahte diesen Mittelpunkt mit einem ADC-Pin, und dein
          Programm weiß, wie hell der Raum ist. Das meiste Hobby-Sensing ist genau das, drei
          Bauteile tief.
        </p>

        <h2>Entscheiden ohne Zaudern</h2>
        <p>
          Jetzt muss die Software handeln: „dunkel genug → Licht an.“ Ein naives{" "}
          <code>if reading &lt; threshold</code> flattert in der Dämmerung, aus demselben
          Grund, aus dem dein Komparator in Lektion 6.1 flatterte — Rauschen um eine einzige
          Schwelle. Die Kur ist auch dieselbe, kostet jetzt aber zwei Zeilen statt zwei
          Widerstände: <strong>Hysterese in Software</strong> — einschalten unterhalb eines
          Pegels, ausschalten oberhalb eines höheren. Dieses Muster (lesen → mit Hysterese
          vergleichen → handeln) betreibt deinen Wasserkocher, dein Thermostat und den
          Kühlerlüfter deines Autos. Nächste Lektion betreibt es dein Nachtlicht.
        </p>
        <div className="callout tip">
          <span className="co-title">Mitteln: Extraqualität gratis</span>
          <p>
            Nimm 16 Messwerte und mittle sie, und zufälliges Rauschen schrumpft auf ein
            Viertel — ein Tiefpassfilter (5.3), umgesetzt in Arithmetik. Digital und analog
            bleiben dasselbe Fach in verschiedenen Kleidern.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Treppe an der Grenze",
      intro: (
        <>
          <p>Eine ADC-Übertragungskurve zum Entlangwandern, plus die Nachtlicht-Entscheidung in Live-Code.</p>
          <ul>
            <li>Schieb den Eingang bei 2 Bit — vier grobe Plateaus. Bei 8 Bit ist die Treppe fast eine Rampe.</li>
            <li>Lies das Quantisierungsfehler-Messgerät bei jeder Auflösung ab.</li>
            <li>Fahre langsam durch 1,5 V und sieh zu, wie der Software-Schmitt-Trigger an zwei <em>verschiedenen</em> Punkten schaltet.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein 12-Bit-ADC mit 3,3-V-Referenz löst Stufen auf von etwa…",
        choices: ["3,3 V", "0,8 mV", "0,8 V", "12 mV"],
        answer: 1,
        explain: "3,3 V / 4096 Stufen ≈ 0,8 mV pro Stufe.",
      },
      {
        q: "Damit ein Mikrocontroller mit einem LDR Licht wahrnimmt, wirst du typischerweise…",
        choices: [
          "den LDR direkt an einen GPIO anschließen",
          "den LDR in einen Spannungsteiler setzen und den Mittelpunkt mit dem ADC lesen",
          "einen Transformator benutzen",
          "seine Temperatur messen",
        ],
        answer: 1,
        explain: "Der Spannungsteiler aus Lektion 2.2 macht aus dem veränderlichen Widerstand eine veränderliche Spannung — genau das, was ein ADC-Pin will.",
      },
      {
        q: "Quantisierung bedeutet…",
        choices: [
          "Der ADC zerstört das Signal",
          "Alle Spannungen innerhalb einer Stufe lesen sich als dieselbe Zahl",
          "Der Eingang muss quantenmechanisch sein",
          "Messwerte liegen immer um 50 % daneben",
        ],
        answer: 1,
        explain: "Endliche Stufen → endliche Präzision. Mehr Bits, kleinere Stufen — nie null.",
      },
      {
        q: "Software-Hysterese (zwei Schwellen) verhindert…",
        choices: [
          "dass der ADC überhitzt",
          "schnelles An/Aus-Flattern, wenn der Messwert um eine einzelne Schwelle pendelt",
          "den Quantisierungsfehler",
          "die Notwendigkeit eines Spannungsteilers",
        ],
        answer: 1,
        explain: "Dieselbe Krankheit und Kur wie beim Komparator aus Lektion 6.1 — Rauschen kann innerhalb des Bandes nicht erneut auslösen.",
      },
    ],
  },
};
