import type { LessonContentDe } from "../localize";
import { PwmSchematic } from "../unit8";

/**
 * Full German content for Unit 8 (PWM dimmer capstone): theory JSX,
 * checklist (same ids as English!) and lab title/intro. The schematic
 * component is reused from the English unit — SVG labels stay English.
 */

export const unit8De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "pwm-dimmer": {
    Theory: () => (
      <>
        <h2>Die Idee: Dimmen durch schnelles Blinken</h2>
        <p>
          Wie machst du eine LED halb so hell? Ein Widerstand verheizt Leistung, und LEDs
          dimmen mit dem Strom ungleichmäßig. Die moderne Antwort ist hinterlistiger:{" "}
          <strong>Lass sie schneller blinken, als das Auge sehen kann, und steuere das
          Verhältnis</strong>. 30 % der Zeit an → 30 % Helligkeit, wobei der Schalter (ein
          Transistor) entweder ganz an oder ganz aus ist und fast nichts verschwendet —
          dasselbe Sperrung/Sättigung-Effizienzargument aus den Lektionen 1.4 und 3.2. Das
          ist <strong>Pulsweitenmodulation</strong> (PWM): feste Frequenz, einstellbarer{" "}
          <strong>Tastgrad</strong>. Dein Capstone-Blinker bei 14 Hz (das Experiment zur
          Flimmerverschmelzung) balancierte bereits auf dieser Idee; jetzt treiben wir sie
          auf 1,4 kHz und spendieren einen Knopf.
        </p>
        <div className="formula">
          wahrgenommene Helligkeit ≈ Tastgrad = t_high / T
          <span className="note">PWM treibt LED-Streifen, Motordrehzahl, Servoposition, Heizungen, Class-D-Audio und jedes `analogWrite()`</span>
        </div>

        <h2>Die Schaltung: dein Blinker, aufgerüstet</h2>
        <p>
          Starte bei der astabilen Schaltung, die du schon verstehst (Lektion 3.3), und
          tausche das Timing-Netzwerk. Der Ausgangspin selbst lädt und entlädt den
          Kondensator jetzt <em>durch die beiden Hälften eines Potentiometers</em>, während
          zwei kleine Dioden als Lenkdioden den Verkehr regeln: Ladestrom fließt durch die
          obere Hälfte (R<sub>a</sub>) über D1, Entladestrom kehrt durch die untere Hälfte
          (R<sub>b</sub>) über D2 zurück.
        </p>
        <div className="formula">
          t_high = 0.693·R_a·C · t_low = 0.693·R_b·C
          <span className="note">Ra + Rb sind immer die vollen 100 kΩ → T und f bleiben fest (~1,4 kHz); nur das Verhältnis wandert. (Exakt gilt das mit einem Rail-to-Rail-CMOS-555 — der Ausgang eines klassischen NE555 erreicht die Schiene nicht ganz und verschiebt den Tastgrad etwas nach oben. Funktioniert trotzdem.)</span>
        </div>
        <p>
          Dreh am Knopf, und du verschiebst den Schleifer: mehr R<sub>a</sub>, weniger
          R<sub>b</sub> — längere High-Zeiten, kürzere Low-Zeiten, gleiche Summe. Tastgrad
          von ~5 % bis ~95 %, Frequenz felsenfest. Jede Lektion steht mit auf der Bühne:
          RC-Timing (2.3), der Teiler als Knopf (2.2), Diodenlenkung (3.1), die Schwellen
          des 555 (3.3) und der Tastgrad als Brücke zwischen digital und analog (Einheit 7
          trifft Einheit 5 — ein Tiefpass an diesem Ausgang würde den Tastgrad buchstäblich
          in eine Gleichspannung verwandeln).
        </p>
        <PwmSchematic />

        <h2>Einkaufsliste (über das Blinker-Kit hinaus)</h2>
        <table>
          <thead>
            <tr><th>Teil</th><th>Spezifikation</th><th>Stück</th><th>≈ Kosten</th></tr>
          </thead>
          <tbody>
            <tr><td>Potentiometer</td><td>100 kΩ linear, steckbrettfreundliche Beine</td><td>1</td><td>$1.50</td></tr>
            <tr><td>Signaldioden</td><td>1N4148 (Glasgehäuse, schwarzer Ring = Kathode)</td><td>2</td><td>$0.20</td></tr>
            <tr><td>Kondensator</td><td>10 nF Keramik — beschriftet &bdquo;103&ldquo;; keine Polarität</td><td>1</td><td>$0.20</td></tr>
            <tr><td colSpan={4}>Vom Blinker wiederverwendet: Steckbrett, 555, 470 Ω, LED, 9-V-Batterie + Clip, Jumperkabel.
            <em> Optional: Ein TLC555/LMC555 (CMOS-555, ~$1) lässt Tastgrad und Frequenz exakt zur Rechnung passen; für das Motor-Experiment: 2N2222-Transistor, kleiner Gleichstrommotor, 1N4007-Diode, 1 kΩ.</em></td></tr>
          </tbody>
        </table>

        <h2>Die Verdrahtung, präzise</h2>
        <p>
          Baue die alten Timing-Teile (R1, R2, großer Kondensator) aus deinem Blinker aus,
          aber behalte den 555, seine Stromversorgung und den LED-Zweig. Dann:
        </p>
        <table>
          <thead>
            <tr><th>#</th><th>Von</th><th>Nach</th><th>Womit</th></tr>
          </thead>
          <tbody>
            <tr><td>1</td><td>555 Pin 8 + Pin 4</td><td>+-Schiene</td><td>Jumper (unverändert vom Blinker)</td></tr>
            <tr><td>2</td><td>555 Pin 1</td><td>−-Schiene</td><td>Jumper (unverändert)</td></tr>
            <tr><td>3</td><td>Pin 2</td><td>Pin 6</td><td>Jumper (unverändert)</td></tr>
            <tr><td>4</td><td>Pin 2</td><td>−-Schiene</td><td><strong>C</strong> 10 nF Keramik (&bdquo;103&ldquo;) — Richtung egal</td></tr>
            <tr><td>5</td><td>Potentiometer</td><td>drei getrennte Spalten</td><td>alle 3 Beine in je einem eigenen Streifen</td></tr>
            <tr><td>6</td><td>mittleres Poti-Bein (Schleifer)</td><td>Pin 3</td><td>Jumper</td></tr>
            <tr><td>7</td><td>äußeres Poti-Bein A</td><td>Pin 6</td><td><strong>D1</strong> — Ring zum 555 hin</td></tr>
            <tr><td>8</td><td>äußeres Poti-Bein B</td><td>Pin 6</td><td><strong>D2</strong> — Ring zum Poti hin</td></tr>
            <tr><td>9</td><td>Pin 3</td><td>LED-Anode über 470 Ω, Kathode an die −-Schiene</td><td>unverändert vom Blinker</td></tr>
          </tbody>
        </table>
        <div className="callout warn">
          <span className="co-title">Die zwei Klassiker unter den Fehlern</span>
          <p>
            ① Diodenringe: D1 und D2 müssen relativ zu Pin 6 in{" "}
            <em>entgegengesetzte Richtungen</em> zeigen — ein Ring zum Chip, einer zum Poti.
            Gleiche Richtung = keine Oszillation. ② Der Schleifer ist das <em>mittlere</em>{" "}
            Bein. Verdrahtest du versehentlich ein äußeres Bein mit Pin 3, tut der Knopf gar
            nichts.
          </p>
        </div>

        <h2>Einschalten</h2>
        <p>
          Die LED leuchtet sofort — bei 1,4 kHz wirkt sie vollkommen ruhig. Dreh am Knopf:
          Die Helligkeit gleitet sanft von fast dunkel bis voll. Zu sehen gibt es kein
          Flimmern, aber eines zu <em>erhaschen</em>: Schwenke das Steckbrett (oder deine
          Augen) schnell, und du fängst eine gestrichelte Leuchtspur ein — dein eigenes
          Experiment zur Flimmerverschmelzung bei 1,4 kHz.
        </p>
        <h3>Wenn es zickt</h3>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Wahrscheinliche Ursache</th><th>Abhilfe</th></tr>
          </thead>
          <tbody>
            <tr><td>LED dauerhaft auf voller Helligkeit</td><td>Eine Diode verdreht, oder die Oszillation ist tot</td><td>Prüfe, ob die beiden Ringe relativ zu Pin 6 in entgegengesetzte Richtungen zeigen</td></tr>
            <tr><td>Knopf tut nichts</td><td>Falsches Poti-Bein an Pin 3</td><td>Das mittlere Bein ist der Schleifer</td></tr>
            <tr><td>Sichtbares Flimmern</td><td>Falscher Kondensator (µF statt nF)</td><td>Nimm den Keramik-&bdquo;103&ldquo;; dein 10-µF-Blinkerkondensator macht ~1,4 Hz!</td></tr>
            <tr><td>Komplett tot</td><td>Versorgungspins</td><td>Prüfe erneut: Pins 8 &amp; 4 an +, Pin 1 an − (Blinker-Regeln gelten)</td></tr>
          </tbody>
        </table>

        <h2>Experimente</h2>
        <ul>
          <li>
            <strong>PWM in Zeitlupe:</strong> Tausche C zurück auf 10 µF — der Dimmer wird
            ein Blinker, dessen Knopf das An/Aus-Verhältnis bei ~1,4 Hz einstellt. PWM und
            Blinken sind dieselbe Schaltung bei verschiedenen Geschwindigkeiten.
          </li>
          <li>
            <strong>Einen Motor treiben:</strong> Pin 3 → 1 kΩ → Basis des 2N2222, Motor
            von der +-Schiene zum Kollektor, <em>Freilaufdiode über dem Motor</em>{" "}
            (Lektion 2.4 — die Spule wird treten!). Der Knopf ist jetzt ein Drehzahlregler.
          </li>
          <li>
            <strong>PWM → analog:</strong> Führe Pin 3 durch deinen Tiefpass aus
            Lektion 5.3 (10 kΩ + 1 µF, fc ≈ 16 Hz) und miss den Ausgang mit dem
            Multimeter: eine ruhige Gleichspannung, die dem Knopf folgt. Du hast einen
            Digital-Analog-Wandler gebaut.
          </li>
        </ul>

        <h2>Wo du stehst</h2>
        <p>
          Damit hast du den Grund- und den Fortgeschrittenenkurs abgeschlossen: vom
          Luftballon im Haar bis zur knopfgesteuerten schaltenden Endstufe — exakt die
          Technik in EV-Motorantrieben und der Dimmung deines Handydisplays. Und die Berge,
          auf die dieser Kurs immer wieder gezeigt hat, stehen jetzt auf der Karte: Der{" "}
          <strong>Expertenkurs beginnt als Nächstes</strong> — Resonanz und Radio,
          Leistungselektronik und schließlich ein Mikrocontroller, der deine PWM unter
          Software-Kontrolle stellt.
        </p>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling — der Knopf vor dem Aufbau",
      intro: (
        <>
          <p>Der exakte Dimmer, den du gleich verdrahtest, Knopf inklusive.</p>
          <ul>
            <li>Dreh den Knopf einmal durch: Der Tastgrad gleitet von 5–95 %, während die Frequenz nahe 1,4 kHz festgenagelt bleibt.</li>
            <li>Vergleiche &bdquo;die LED selbst&ldquo; (verlangsamtes Stroboskop) mit &bdquo;was dein Auge sieht&ldquo;.</li>
            <li>Beachte: t_high + t_low ändert sich nie — das Poti ist eine feste Summe, zweigeteilt.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "parts", text: "Poti, zwei 1N4148-Dioden und den 10-nF-Keramikkondensator ('103') besorgt" },
      { id: "strip", text: "R1, R2 und den 10-µF-Kondensator des Blinkers entfernt — 555, Stromversorgung und LED-Zweig behalten" },
      { id: "cap", text: "10 nF Keramik von Pin 2 zur −-Schiene (keine Polarität zu beachten — er ist kein Elko)" },
      { id: "pot", text: "Potentiometer mit allen drei Beinen in getrennten Spalten eingesetzt" },
      { id: "wiper", text: "Mittleres Bein (Schleifer) per Jumper an Pin 3" },
      { id: "d1", text: "D1 von Poti-Bein A an Pin 6 — schwarzer Ring zum 555 hin" },
      { id: "d2", text: "D2 von Poti-Bein B an Pin 6 — schwarzer Ring zum Poti hin" },
      { id: "inspect", text: "Geprüft, dass die beiden Diodenringe relativ zu Pin 6 in ENTGEGENGESETZTE Richtungen zeigen" },
      { id: "predict", text: "Mit dem Simulator vorhergesagt: Knopf auf 25 % → ungefähr Viertel-Helligkeit" },
      { id: "power", text: "Batterie angeschlossen — LED leuchtet und wirkt felsenfest ruhig" },
      { id: "dim", text: "Knopf über den vollen Weg gedreht: sanftes Dimmen, kein sichtbares Flimmern" },
      { id: "experiment", text: "Ein Experiment durchgeführt (Zeitlupe mit 10 µF, Motorantrieb oder der Tiefpass-DAC)" },
    ],
  },
};
