import type { LessonContentDe } from "../localize";
import { MiniBoard, BuildBoard } from "../unit4";

/** Full German content for Unit 4 (the 555 blinker capstone). */

export const unit4De: Record<string, LessonContentDe> = {
  capstone: {
    Theory: () => (
      <>
        <h2>Die Mission</h2>
        <p>
          Du baust die astabile Schaltung aus Lektion 3.3 physisch auf: ein 555, der eine LED
          mit etwa <strong>1,5 Blitzen pro Sekunde</strong> blinken lässt, versorgt aus einer
          9-V-Batterie. Gesamtkosten: rund 12 $ bei Einzelkauf — weniger mit jedem
          Elektronik-Starterkit, das alles Folgende und viel mehr enthält. Nichts hier kann dir
          wehtun: 9 V durch diese Bauteile sind völlig ungefährlich (nur die Batteriepole nie
          direkt kurzschließen — Lektion 1.1).
        </p>
        <p>Alles in dieser Schaltung beherrschst du bereits:</p>
        <ul>
          <li>Das RC-Paar gibt das Tempo vor — <em>Lektion 2.3</em> (τ = RC).</li>
          <li>R1 = 1 kΩ und R2 = 47 kΩ wählen f ≈ 1,5 Hz — <em>Lektion 3.3</em> (f = 1.44/((R1+2R2)C)).</li>
          <li>Die 470 Ω stellen die LED auf ~15 mA — <em>Lektion 3.1</em> (R = (V−Vf)/I).</li>
          <li>Die Streifen der Widerstände lesen — <em>Lektion 1.3</em>.</li>
          <li>Warum eine Schleife, warum Polung zählt — <em>Lektionen 1.1 und 2.3</em>.</li>
        </ul>

        <h2>Einkaufsliste</h2>
        <table>
          <thead>
            <tr><th>Teil</th><th>Spezifikation</th><th>Stück</th><th>≈ Kosten</th></tr>
          </thead>
          <tbody>
            <tr><td>Breadboard</td><td>400 Kontakte (halbe Größe) oder größer</td><td>1</td><td>3 $</td></tr>
            <tr><td>555-Timer-IC</td><td>NE555 (oder NE555P / LM555)</td><td>1</td><td>0,50 $</td></tr>
            <tr><td>Widerstand R1</td><td>1 kΩ ¼ W — Braun·Schwarz·Rot</td><td>1</td><td rowSpan={3}>0,30 $</td></tr>
            <tr><td>Widerstand R2</td><td>47 kΩ ¼ W — Gelb·Violett·Orange</td><td>1</td></tr>
            <tr><td>LED-Widerstand</td><td>470 Ω ¼ W — Gelb·Violett·Braun</td><td>1</td></tr>
            <tr><td>Kondensator C</td><td>10 µF Elektrolyt, ≥ 16 V</td><td>1</td><td>0,30 $</td></tr>
            <tr><td>LED</td><td>5 mm, beliebige Farbe (Rot ist der Klassiker)</td><td>1</td><td>0,20 $</td></tr>
            <tr><td>Jumperkabel</td><td>male–male, ein kleines Päckchen</td><td>~6</td><td>3 $</td></tr>
            <tr><td>9-V-Batterie + Clip</td><td>Clip mit blanken oder Pin-Enden</td><td>1</td><td>4 $</td></tr>
            <tr>
              <td colSpan={4}>
                <em>Schöne Extras für die Experimente:</em> 100-µF- und 0,1-µF-Kondensator
                (100 nF), 4,7-kΩ- und 470-kΩ-Widerstand, ein Piezo-Summer, ein
                100-kΩ-Potentiometer.
              </td>
            </tr>
          </tbody>
        </table>

        <h2>Kenne dein Breadboard</h2>
        <p>
          Ein Breadboard ist ein Raster gefederter Löcher mit versteckten Verbindungen — ganz
          ohne Löten. Die Verdrahtung unten setzt voraus, dass du genau weißt, was womit
          verbunden ist:
        </p>
        <MiniBoard />

        <h2>Die Verdrahtung, präzise</h2>
        <p>
          Setze zuerst den 555 quer über die Mittelrille, <strong>Kerbe/Punkt nach links</strong>{" "}
          — dann liegt Pin 1 unten links, und die Nummern laufen gegen den Uhrzeigersinn (das
          Pinout aus Lektion 3.3). Dann diese neun Verbindungen. &bdquo;Pin n&ldquo; heißt
          immer: <em>irgendein freies Loch im 5er-Streifen dieses Pins</em>:
        </p>
        <table>
          <thead>
            <tr><th>#</th><th>Von</th><th>Nach</th><th>Womit</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>555 Pin 8 (VCC)</td><td>+-Schiene</td><td>Jumper</td></tr>
            <tr><td>2</td><td>555 Pin 4 (RESET)</td><td>+-Schiene</td><td>Jumper</td></tr>
            <tr><td>3</td><td>555 Pin 1 (GND)</td><td>−-Schiene</td><td>Jumper</td></tr>
            <tr><td>4</td><td>+-Schiene</td><td>Pin 7</td><td><strong>R1</strong> 1 kΩ</td></tr>
            <tr><td>5</td><td>Pin 7</td><td>Pin 6</td><td><strong>R2</strong> 47 kΩ</td></tr>
            <tr><td>6</td><td>Pin 6</td><td>Pin 2</td><td>Jumper</td></tr>
            <tr><td>7</td><td>Pin 2</td><td>−-Schiene</td><td><strong>C</strong> 10 µF — Streifenbein an die −-Schiene!</td></tr>
            <tr><td>8</td><td>Pin 3 (OUT)</td><td>LED-Anode (langes Bein)</td><td><strong>470 Ω</strong> in Reihe</td></tr>
            <tr><td>9</td><td>LED-Kathode (flache Seite)</td><td>−-Schiene</td><td>direkt / Jumper</td></tr>
          </tbody>
        </table>
        <p>
          Pin 5 bleibt frei — für diesen Aufbau in Ordnung. Der Batterieclip kommt zuletzt:
          rotes Kabel an die +-Schiene, schwarzes an die −-Schiene.
        </p>
        <BuildBoard />

        <div className="callout warn">
          <span className="co-title">Die drei klassischen Fehler (vor dem Einschalten prüfen!)</span>
          <p>
            ① Elektrolytkondensator verkehrt herum — der Streifen muss zur −-Schiene. ② LED
            verkehrt — langes Bein Richtung 470 Ω, flache Seite an −. ③ Chip um 180° gedreht —
            die Kerbe muss links sein, sonst verliert der Chip seine Masseverbindung, und jeder
            Timing-Pin landet auf dem falschen Streifen. Dreißig Sekunden Kontrolle schlagen
            einen toten Debugging-Abend.
          </p>
        </div>

        <h2>Einschalten</h2>
        <p>
          Batterie einclipsen. Die LED sollte sofort zu blinken beginnen: ~⅓ s an, ~⅓ s aus,
          etwa 90 Blitze pro Minute. Diese Zahl ist kein Glück — du kannst sie herleiten:
          f = 1.44/((1k + 94k)·10µF) ≈ 1,5 Hz, exakt was der Simulator unten vorhersagt.
        </p>

        <h3>Wenn es nicht blinkt</h3>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Wahrscheinliche Ursache</th><th>Abhilfe</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>Völlig tot</td>
              <td>Keine Versorgung am Chip</td>
              <td>Batterie prüfen, Clipkabel auf den richtigen Schienen, Pins 8 &amp; 4 an +, Pin 1 an −</td>
            </tr>
            <tr>
              <td>LED dauerhaft an, blinkt nie</td>
              <td>Timing-Schleife unterbrochen</td>
              <td>Jumper Pin 6 → Pin 2 prüfen, und dass R2 wirklich Pin 7 mit Pin 6 verbindet</td>
            </tr>
            <tr>
              <td>Nichts geht, Verhalten wirr</td>
              <td>Chip um 180° gedreht (er hat seine Masse verloren)</td>
              <td>Strom trennen; mit Kerbe links neu einsetzen</td>
            </tr>
            <tr>
              <td>LED leuchtet nie, Chip kühl</td>
              <td>LED verkehrt oder falscher Widerstand</td>
              <td>LED umdrehen; 470 Ω bestätigen: Gelb·Violett·Braun</td>
            </tr>
            <tr>
              <td>Falsche Blinkrate</td>
              <td>Falscher R2- oder C-Wert</td>
              <td>Streifen neu lesen (47 k = Gelb·Violett·Orange); prüfen, dass C 10 µF ist</td>
            </tr>
          </tbody>
        </table>

        <h2>Experimente — du hast sie dir verdient</h2>
        <ul>
          <li>
            <strong>Langsamer Herzschlag:</strong> Tausch C gegen 100 µF → f ≈ 0,15 Hz, ein
            würdevoller Blitz alle 7 Sekunden.
          </li>
          <li>
            <strong>Flimmerverschmelzungs-Test:</strong> R2 = 4,7 kΩ → ≈ 14 Hz. Sieht dein Auge
            das Blinken noch? Finde deine eigene Verschmelzungsschwelle durch
            Bauteil-Kombinieren.
          </li>
          <li>
            <strong>Lass sie singen:</strong> R2 = 4,7 kΩ und C = 0,1 µF treiben f auf ≈
            1,4 kHz — ersetze LED+Widerstand durch einen Piezo-Summer von Pin 3 nach −, und sie
            spielt einen Ton. Dieselbe Schaltung, tausendmal schneller: Blinker und Summer sind
            eine Idee.
          </li>
          <li>
            <strong>Ein Drehknopf dazu:</strong> Ein 100-kΩ-Potentiometer in Reihe mit R2 gibt
            dir einen Blinkraten-Regler — ein Potentiometer bei echter Arbeit (Lektion 2.2).
          </li>
        </ul>

        <h2>Wie es weitergeht</h2>
        <p>
          Du liest jetzt Schaltpläne, dimensionierst Bauteile mit dem Ohmschen Gesetz, denkst
          in Zeitkonstanten und debuggst mit Kirchhoff. Zwei Vorschläge: Besorg dir ein
          günstiges Multimeter — dein erstes echtes Instrument — und dann mach weiter, denn der{" "}
          <strong>Aufbaukurs beginnt direkt nach dieser Lektion</strong>: Wechselstrom und
          Signale, Op-Amps, Digitallogik und ein zweiter Build, der genau diesen Blinker in
          einen drehknopfgesteuerten PWM-Dimmer verwandelt. Das Breadboard auf deinem Tisch
          ist keine Rätselkiste mehr. Es ist ein Labor.
        </p>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling — erst vorhersagen, dann bauen",
      intro: (
        <>
          <p>
            Exakt die Schaltung, die du gleich baust, beschränkt auf die Teile deines Kits.
            Nutze sie, um <em>vorherzusagen</em>, was das echte Board tun wird — vor und nach
            jedem Tausch.
          </p>
          <ul>
            <li>Bestätige den Standardaufbau: R2 = 47 k, C = 10 µF → ≈ 1,5 Hz.</li>
            <li>Sag den 100-µF-Tausch voraus, mach ihn dann real und vergleiche.</li>
            <li>Setze R2 = 4,7 k und entscheide: Wird dein Auge das Flimmern sehen?</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "parts", text: "Alle Teile der Einkaufsliste besorgt (oder ein Starterkit)" },
      { id: "resistors", text: "Alle drei Widerstände an ihren Farbringen erkannt (1 k, 47 k, 470 Ω) — wenn möglich ohne Tabelle" },
      { id: "polarity", text: "Den −-Streifen des Kondensators und die flache Seite / das kurze Bein der LED (Kathode) gefunden" },
      { id: "chip", text: "Den 555 quer über die Mittelrille gesetzt, Kerbe nach LINKS, Pins sanft und vollständig drin" },
      { id: "power-pins", text: "Pin 8 und Pin 4 an die +-Schiene verdrahtet, Pin 1 an die −-Schiene" },
      { id: "r1", text: "R1 (1 kΩ) von der +-Schiene an Pin 7" },
      { id: "r2", text: "R2 (47 kΩ) von Pin 7 an Pin 6" },
      { id: "jumper62", text: "Jumper von Pin 6 an Pin 2" },
      { id: "cap", text: "10-µF-Kondensator von Pin 2 an die −-Schiene, Streifen an −" },
      { id: "led", text: "470 Ω von Pin 3 an das lange LED-Bein; flache LED-Seite an die −-Schiene" },
      { id: "inspect", text: "Die drei klassischen Fehler dreifach geprüft: Kondensator-Streifen, LED-Richtung, Chip-Ausrichtung" },
      { id: "predict", text: "Die Blinkrate mit dem Simulator oben vorhergesagt (~1,5 Hz)" },
      { id: "blinks", text: "9-V-Batterie angeschlossen — ES BLINKT! 🎉" },
      { id: "experiment", text: "Mindestens ein Experiment gemacht (Langsamblinken, Flimmertest, Summer oder Tempo-Drehknopf)" },
    ],
  },
};
