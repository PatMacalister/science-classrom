import type { LessonContentDe } from "../localize";
import { CODE } from "../unit12";

/**
 * Full German content for Unit 12 (expert capstone): theory JSX with
 * shopping list, wiring and troubleshooting tables (pin numbers verbatim!),
 * the shared MicroPython firmware constant, lab intro and checklist
 * (ids identical to English).
 */

export const unit12De: Record<string, LessonContentDe> = {
  "night-light": {
    Theory: () => (
      <>
        <h2>Die Mission</h2>
        <p>
          Bau eine Lampe, die sich in der Dämmerung selbst einschaltet und im Morgengrauen
          wieder aus, mit einem Knopf für <em>deine</em> Vorstellung von &bdquo;dunkel&ldquo;
          — und, weil Software daraus eine Zwei-Zeilen-Änderung macht, einen Fade-Modus, in
          dem die Helligkeit mit der Dunkelheit wächst. Das ist die komplette
          Embedded-Systems-Schleife: <strong>fühlen → entscheiden → handeln</strong>, und jede
          Stufe ist eine Lektion, die dir gehört: Spannungsteiler-Sensorik (2.2), ADC (11.2),
          Hysterese (6.1), PWM-Dimmen (Einheit 8).
        </p>

        <h2>Einkaufsliste (über dein Kit hinaus)</h2>
        <table>
          <thead>
            <tr><th>Bauteil</th><th>Spezifikation</th><th>Stück</th><th>≈ Kosten</th></tr>
          </thead>
          <tbody>
            <tr><td>Raspberry Pi Pico</td><td>Pico oder Pico W, mit Stiftleisten (oder löte sie selbst an — ein Initiationsritus)</td><td>1</td><td>5–7 $</td></tr>
            <tr><td>Micro-USB-Kabel</td><td>datenfähig, kein reines Ladekabel!</td><td>1</td><td>2 $</td></tr>
            <tr><td>Fotowiderstand (LDR)</td><td>GL5528 oder ähnlich</td><td>1</td><td>0,50 $</td></tr>
            <tr><td>Widerstand</td><td>10 kΩ — braun·schwarz·orange</td><td>1</td><td>0,10 $</td></tr>
            <tr>
              <td colSpan={4}>
                Wiederverwendet: Steckbrett, LED, 470 Ω, Jumper und das 100-kΩ-Potentiometer
                aus Einheit 8. Die 9-V-Batterie geht in Rente — der Pico läuft über USB, und
                seine Pins sprechen <strong>3,3 V</strong>.
              </td>
            </tr>
          </tbody>
        </table>
        <div className="callout warn">
          <span className="co-title">Neue Spannung, neue Regel</span>
          <p>
            Der Pico ist ein 3,3-V-Bürger. Versorge deine Steckbrett-Schienen aus seinem{" "}
            <strong>3V3(OUT)</strong>-Pin — schließe niemals die alte 9-V-Batterie an
            irgendeinen Pico-Pin an, und gib niemals mehr als 3,3 V auf einen GPIO. (Deine LED
            leuchtet an 3,3 V durch dieselben 470 Ω weiterhin gut: (3,3 − 1,8)/470 ≈ 3 mA —
            dunkler als vorher, und PWM bei 100 % ist ihr neues Maximum.)
          </p>
        </div>

        <h2>Die Verdrahtung</h2>
        <p>
          Setze den Pico quer über die Mittelrille des Steckbretts (USB-Buchse an einem Ende,
          wie die Kerben-Regel des 555, nur größer). Die Pin-Nummern unten sind die{" "}
          <em>physischen</em> Pins, gegen den Uhrzeigersinn vom USB-Ende gezählt — dieselbe
          DIP-Konvention, die du am 555 gelernt hast, vierzig Pins statt acht:
        </p>
        <table>
          <thead>
            <tr><th>#</th><th>Von</th><th>Nach</th><th>Womit</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>Pico 3V3(OUT) — physischer Pin 36</td><td>+-Schiene</td><td>Jumper (rot)</td></tr>
            <tr><td>2</td><td>Pico GND — physischer Pin 38</td><td>−-Schiene</td><td>Jumper (schwarz)</td></tr>
            <tr><td>3</td><td>+-Schiene</td><td>eine freie Spalte (der Sensorknoten)</td><td><strong>LDR</strong></td></tr>
            <tr><td>4</td><td>Sensorknoten</td><td>−-Schiene</td><td><strong>10 kΩ</strong> (unteres Bein des Spannungsteilers)</td></tr>
            <tr><td>5</td><td>Sensorknoten</td><td>GP26 / ADC0 — physischer Pin 31</td><td>Jumper</td></tr>
            <tr><td>6</td><td>Poti-Außenbeine</td><td>+-Schiene und −-Schiene</td><td>das Poti IST ein Spannungsteiler (2.2)</td></tr>
            <tr><td>7</td><td>Poti-Schleifer (mittleres Bein)</td><td>GP27 / ADC1 — physischer Pin 32</td><td>Jumper</td></tr>
            <tr><td>8</td><td>GP15 — physischer Pin 20</td><td>LED-Anode über 470 Ω, Kathode an die −-Schiene</td><td>dein Standard-LED-Zweig</td></tr>
            <tr><td>9</td><td>Pico USB</td><td>Computer</td><td>das Datenkabel</td></tr>
          </tbody>
        </table>
        <p>
          Beachte, was der Spannungsteiler hier tut: heller Raum → LDR klein → Sensorknoten
          Richtung 3,3 V gezogen → <em>hoher</em> ADC-Messwert. Dunkler Raum → niedriger
          Messwert. Die Vergleiche im Code folgen aus diesem einen Satz.
        </p>

        <h2>Leben einhauchen</h2>
        <ol>
          <li>Lade die MicroPython-Firmware-Datei (eine <code>.uf2</code>) für den Pico von micropython.org herunter.</li>
          <li>Halte die <strong>BOOTSEL</strong>-Taste des Pico gedrückt, während du das USB-Kabel einsteckst — er erscheint als winziger USB-Stick.</li>
          <li>Zieh die .uf2 darauf. Das Laufwerk verschwindet; der Pico startet als Python-Maschine neu.</li>
          <li>Installiere <strong>Thonny</strong> (kostenlos, thonny.org) und wähle <em>MicroPython (Raspberry Pi Pico)</em> als Interpreter — untere rechte Ecke.</li>
          <li>Füge das Programm unten ein und drücke Run. Deck den LDR mit der Hand ab.</li>
          <li>Wenn es sich richtig verhält, speichere es als <code>main.py</code> auf den Pico — von da an läuft es bei jedem Einschalten, ohne Computer. Glückwunsch: Du hast Firmware ausgeliefert.</li>
        </ol>

        <h2>Die Firmware</h2>
        <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "16px 20px", overflowX: "auto", fontSize: "0.88rem", lineHeight: 1.6 }}>
          <code>{CODE}</code>
        </pre>
        <p>
          Zwei Dutzend Zeilen, und jede lässt sich auf eine Lektion zurückführen: die zwei
          ADC-Lesezugriffe (11.2), das Hysterese-Paar aus ifs (6.1), die Berechnung des
          PWM-Tastgrads (Einheit 8), die Superloop mit ihrem höflichen{" "}
          <code>sleep_ms(50)</code> (11.1).
        </p>

        <h3>Wenn es sich danebenbenimmt</h3>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Wahrscheinliche Ursache</th><th>Abhilfe</th></tr>
          </thead>
          <tbody>
            <tr><td>Kein Board in Thonny</td><td>Reines Lade-USB-Kabel, oder Interpreter nicht gewählt</td><td>Datenkabel benutzen; unten rechts den Pico-Interpreter wählen</td></tr>
            <tr><td>LED leuchtet nie</td><td>LED-Richtung oder falscher Pin</td><td>Langes Bein Richtung 470 Ω an GP15 (physischer Pin 20)</td></tr>
            <tr><td>Lampenlogik invertiert</td><td>LDR und 10 kΩ im Spannungsteiler vertauscht</td><td>LDR an +, Festwiderstand an − (oder die Vergleiche tauschen)</td></tr>
            <tr><td>Knopf tut nichts</td><td>Außenbein statt des Schleifers verdrahtet</td><td>Mittleres Bein an GP27 — gleicher Fehler, gleiche Abhilfe wie in Einheit 8</td></tr>
            <tr><td>Flackert in der Dämmerung</td><td>HYST zu klein für deinen Raum</td><td>HYST erhöhen — oben hast du ein Labor, um einen Wert zu wählen</td></tr>
          </tbody>
        </table>

        <h2>Experimente — jetzt ist es Software</h2>
        <ul>
          <li><strong>Atmen:</strong> Ersetze die Fade-Mathematik durch einen langsamen Sinus des Tastgrads — eine atmende Lampe im MacBook-Stil. Drei Zeilen.</li>
          <li><strong>Die Morgendämmerung loggen:</strong> <code>print(light)</code> in jeder Schleife, und beobachte den Sonnenaufgang als Zahlenkolonne in Thonny. Dein erster Datenlogger.</li>
          <li><strong>16 ADC-Messwerte mitteln</strong> (der Tipp aus 11.2) und zusehen, wie sich der Dämmerungsübergang beruhigt.</li>
          <li><strong>Pico-W-Besitzer:</strong> Derselbe Chip hat WLAN — eine web-gesteuerte Lampe ist ein Wochenende, keine Karriere.</li>
        </ul>

        <h2>Wo du jetzt stehst</h2>
        <p>
          Drei Aufbauten stehen auf deinem Schreibtisch: ein Blinker, den du mit RC-Mathematik
          dimensioniert hast, ein Dimmer, den du mit Dioden gelenkt hast, und eine Lampe, die
          fühlt und entscheidet, weil du ihr gesagt hast, wie. Du kannst Schaltpläne lesen,
          Bauteile dimensionieren, mit Kirchhoff und einem Multimeter debuggen, über Signale
          in Zeit und Frequenz nachdenken, Logik vom Gatter bis zum Programmzähler verfolgen —
          und jetzt Firmware flashen. Ein Gipfel bleibt: der <strong>Meisterkurs</strong> —
          Abtastung und Fourier, PID-Regelung, die Kunst realer Toleranzen und des Debuggens —
          endend mit dem schönsten Vollkreis-Aufbau, den dieser Kurs bieten konnte: dein
          eigenes Oszilloskop, gerichtet auf alles zurück, was du gebaut hast.
        </p>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling — die ganze Signalkette",
      intro: (
        <>
          <p>
            Jeder Block des Nachtlichts, live: Raumlicht → LDR → Spannungsteiler → ADC →
            Entscheidung → PWM → LED. Spiel mit der Dämmerung, bevor du verdrahtest.
          </p>
          <ul>
            <li>Fahre das Raumlicht langsam herunter und wieder hoch — die Ein- und Ausschaltpunkte unterscheiden sich. Das ist dein HYST.</li>
            <li>Stell den Schwellen-Knopf niedrig: Die Lampe wartet auf tiefe Dunkelheit.</li>
            <li>Vergleiche Schalt- und Fade-Modus — eine Variable in der Firmware.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "parts", text: "Pico (mit Pins), Daten-USB-Kabel, LDR und 10-kΩ-Widerstand besorgt" },
      { id: "firmware", text: "BOOTSEL gehalten, die MicroPython-.uf2 auf das Pico-Laufwerk gezogen" },
      { id: "thonny", text: "Thonny installiert und im Gespräch mit dem Pico (>>>-Prompt erscheint)" },
      { id: "seated", text: "Pico quer über die Mittelrille gesetzt, USB-Ende am Rand des Bretts" },
      { id: "rails", text: "3V3(OUT) (Pin 36) an die +-Schiene, GND (Pin 38) an die −-Schiene — die 9-V-Batterie bleibt in Rente" },
      { id: "ldr", text: "LDR von der +-Schiene zum Sensorknoten; 10 kΩ vom Knoten zur −-Schiene" },
      { id: "adc0", text: "Sensorknoten per Jumper an GP26 (physischer Pin 31)" },
      { id: "pot", text: "Poti über die Schienen, Schleifer an GP27 (physischer Pin 32)" },
      { id: "led", text: "470 Ω + LED von GP15 (physischer Pin 20) zur −-Schiene, langes Bein Richtung Widerstand" },
      { id: "run", text: "Programm eingefügt und läuft in Thonny ohne Fehler" },
      { id: "hand", text: "LDR mit der Hand abgedeckt — Lampe an. Aufgedeckt — Lampe aus, bei einem *anderen* Lichtpegel" },
      { id: "knob", text: "Am Knopf gedreht und den Dämmerungspunkt nach Geschmack verschoben" },
      { id: "mainpy", text: "Als main.py auf den Pico gespeichert, vom Computer getrennt, eingeschaltet — es läuft immer noch. Ausgeliefert! 🚀" },
      { id: "experiment", text: "Die Firmware mindestens einmal geändert (Atmen, Loggen, Mitteln — irgendetwas). Sie gehört jetzt dir." },
    ],
  },
};
