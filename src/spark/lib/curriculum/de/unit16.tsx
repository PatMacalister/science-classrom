import type { LessonContentDe } from "../localize";
import { LIVE_CODE, BURST_CODE } from "../unit16";

/** Full German content for Unit 16 (the oscilloscope master capstone). */

export const unit16De: Record<string, LessonContentDe> = {
  oscilloscope: {
    Theory: () => (
      <>
        <h2>Die Mission</h2>
        <p>
          Jedes Labor dieses Kurses hat dir eine Oszilloskopspur gezeichnet. Dieser Build
          schließt den Kreis über das gesamte Curriculum: Du baust aus deinem Pico ein echtes
          abtastendes Oszilloskop, <em>misst</em> damit die RC-Ladekurve, den
          3-bis-6-Volt-Sägezahn des Blinkers und das PWM des Dimmers — und vergleichst die
          Physik mit allem, was die Simulatoren versprochen haben. Ein Instrument, das du
          gebaut hast, prüft Schaltungen, die du gebaut hast, mit Theorie, die dir gehört. So
          sieht Meisterschaft aus.
        </p>
        <p>
          Alles Nötige liegt schon auf deinem Tisch: Der ADC des Pico (11.2) ist der Abtaster,
          Nyquist (13.1) setzt seine ehrlichen Grenzen, ein Spannungsteiler (2.2!) wird zum
          Tastkopf, und Thonnys eingebauter Plotter ist der Bildschirm. Neue Teile nötig:{" "}
          <strong>keine</strong> — zwei Widerstände aus deinem Kit bauen den Tastkopf.
        </p>

        <h2>Der Tastkopf: ein Teiler mit Berufsbezeichnung</h2>
        <p>
          Deine Prüflinge laufen mit 9 V; der ADC des Pico stirbt über ~3,6 V. Die Lösung ist
          der allererste Trick, den dir dieser Kurs beigebracht hat — ein{" "}
          <strong>3:1-Spannungsteiler</strong>: 100 kΩ von der Tastspitze an GP26, 47 kΩ von
          GP26 an Masse (÷3,13; die Software multipliziert zurück). Echte 10:1-Tastköpfe sind
          exakt diese Idee mit vornehmeren Toleranzen. Zwei Feinheiten, beides alte Freunde:
        </p>
        <ul>
          <li>
            <strong>Belastung (die Falle aus 2.2):</strong> Die ~150 kΩ des Tastkopfs hängen
            an allem, was du berührst. Am <em>Ausgangspin</em> des 555 — einer steifen,
            niederohmigen Quelle — unsichtbar. Direkt am hochohmigen Kondensatorknoten würde
            er das Timing sanft verzerren. Miss bevorzugt Ausgänge; miss empfindliche Knoten
            wissend.
          </li>
          <li>
            <strong>Gemeinsame Masse:</strong> Spannung ist zwischen zwei Punkten (die älteste
            Lektion, 0.2). Der GND des Pico und die −-Schiene des Blinkers müssen verbunden
            sein, sonst sind deine Messwerte Fiktion.
          </li>
        </ul>
        <div className="formula">
          probe tip → 100 kΩ → GP26 → 47 kΩ → GND · reading × 3.13 in software
          <span className="note">miss nie Netzspannung oder irgendetwas, das nicht aus Batterie/USB läuft — dieses Scope ist für deine eigene Niedervolt-Werkbank</span>
        </div>

        <h2>Zwei Firmwares, ein Instrument</h2>
        <p>
          Der <strong>Live-Modus</strong> streamt Messwerte für Thonnys Plotter (View →
          Plotter) — ein paar hundert Abtastwerte pro Sekunde, perfekt für die langsamen
          Schönheiten: RC-Kurven, Blinker-Sägezahn, die Dämmerung des Nachtlichts.
        </p>
        <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "14px 18px", overflowX: "auto", fontSize: "0.86rem", lineHeight: 1.6 }}>
          <code>{LIVE_CODE}</code>
        </pre>
        <p>
          Der <strong>Burst-Modus</strong> tastet erst mit Vollgas in den Speicher
          (Zehntausende Abtastwerte pro Sekunde — MicroPythons ehrliche Grenze) und druckt die
          Aufnahme dann aus: genug, um dein 1,4-kHz-PWM sauber aufzulösen. Er misst sogar
          seine eigene Abtastrate, denn ein Instrument, das sein eigenes f<sub>s</sub> nicht
          kennt, kann dich nicht vor Nyquist warnen.
        </p>
        <pre style={{ background: "#0a0e14", border: "1px solid var(--line)", borderRadius: 10, padding: "14px 18px", overflowX: "auto", fontSize: "0.86rem", lineHeight: 1.6 }}>
          <code>{BURST_CODE}</code>
        </pre>

        <h2>Die Messkampagne</h2>
        <table>
          <thead>
            <tr><th>Ziel</th><th>Messpunkt</th><th>Du solltest sehen</th><th>Schließt den Kreis zu</th></tr>
          </thead>
          <tbody>
            <tr><td>RC-Ladung: 10 µF über 100 kΩ an 9 V</td><td>Kondensator oben</td><td>die Exponentialkurve; 63 % bei τ ≈ 1 s</td><td>Lektion 2.3</td></tr>
            <tr><td>555-Blinker</td><td>Pin 3 (Ausgang)</td><td>Rechteck, ~1,5 Hz — miss es gegen f = 1.44/((R1+2R2)C)</td><td>Lektionen 3.3 & 4.1</td></tr>
            <tr><td>555-Blinker</td><td>Pins 2+6 (sachte!)</td><td>den Sägezahn zwischen ⅓ und ⅔ von 9 V</td><td>die Signaturspur des Simulators</td></tr>
            <tr><td>PWM-Dimmer</td><td>Pin 3, Burst-Modus</td><td>Tastgrad folgt dem Drehknopf bei ~1,4 kHz</td><td>Einheit 8 & Nyquist (13.1)</td></tr>
            <tr><td>Nachtlicht in der Dämmerung</td><td>GP26-Teilerknoten</td><td>das langsame Gleiten, das dein Zwilling vorhersagte</td><td>Einheit 12</td></tr>
          </tbody>
        </table>

        <h3>Wenn es sich danebenbenimmt</h3>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Wahrscheinliche Ursache</th><th>Abhilfe</th></tr>
          </thead>
          <tbody>
            <tr><td>Messwerte kleben bei 3,3 V</td><td>9 V ohne Teiler gemessen — der Eingang wurde übersteuert</td><td>den 100k/47k-Tastkopf bauen, dann prüfen, ob der Pin noch vernünftig liest (über ~3,6 V hast du ihn womöglich beschädigt)</td></tr>
            <tr><td>Messwerte sind Rauschen/Müll</td><td>keine gemeinsame Masse</td><td>Jumper vom Pico-GND zur −-Schiene des Prüflings</td></tr>
            <tr><td>PWM sieht aus wie eine langsame Welle</td><td>Aliasing im Live-Modus</td><td>das ist Lektion 13.1 in freier Wildbahn! Burst-Modus nehmen</td></tr>
            <tr><td>Sägezahn-Timing wirkt gedehnt</td><td>Tastkopf belastet den Kondensatorknoten</td><td>erwartet (2.2!) — Frequenz stattdessen an Pin 3 messen</td></tr>
            <tr><td>Plotter zeigt nichts</td><td>Plotterfenster zu / Ausgabe zu schnell</td><td>View → Plotter in Thonny; das sleep_ms im Live-Modus drinlassen</td></tr>
          </tbody>
        </table>

        <h2>Abschluss</h2>
        <p>
          Schau auf die Werkbank: ein Blinker, entworfen mit RC-Arithmetik, ein Dimmer,
          gelenkt von Dioden, ein Nachtlicht mit deiner Firmware, und jetzt ein Messinstrument,
          das sie alle prüft — jedes gebaut aus Teilen, die du bis hinunter zum driftenden
          Elektron verstehst. Es gibt keine fünfte Stufe — die Leiter endet hier, mit Absicht.
          Was bleibt, sind die <strong>Spezialisierungen</strong>: parallele Zweige, in
          beliebiger Reihenfolge, hinein in CPUs, das Funkspektrum und Roboter. Nimm, was am
          stärksten zieht — du bist voll ausgerüstet, die Lücke zwischen der Idee und dem
          funktionierenden Ding zu debuggen. Diese Lücke hat einen Namen. Sie heißt
          Ingenieurskunst. Willkommen. ⚡
        </p>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling & Live-Modus",
      intro: (
        <>
          <p>
            Zwei Modi. <strong>Digitaler Zwilling</strong>: Prob jede Messung in der
            Simulation. <strong>LIVE</strong>: Genau diese Seite wird zum Display deines
            Oszilloskops — in Chrome/Edge verbindet sie sich über USB direkt mit dem Pico
            (Web Serial) und zeichnet die echten Spannungen, die deine Firmware streamt.
            Flash die Live-Firmware oben, schließ Thonny (nur ein Programm darf den Port
            halten), klick Connect, und sieh zu, wie echte Elektronen von deinem Breadboard
            die Kurven zeichnen, die dieser Kurs 53 Lektionen lang simuliert hat. Noch keine
            Hardware? Der Demo-Stream täuscht einen Blinker vor, damit du das Display zuerst
            lernen kannst.
          </p>
          <ul>
            <li>Miss das PWM mit 1 kHz: eine 400-Hz-Phantomwelle (1,4 kHz, gespiegelt — Lektion 13.1). Bei 200 Hz werden die Abtastwerte flach, weil 1 400 ein exaktes Vielfaches von 200 ist. Nur die schnellste Rate sagt die Wahrheit.</li>
            <li>Wechsle auf einen Direktdraht an ein 9-V-Ziel und sieh die Spur bei 3,3 V abschneiden (Clipping).</li>
            <li>Sägezahn bei 1 kHz mit dem Teiler-Tastkopf: die Lehrbuchaufnahme. Mach diese zuerst in echt.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "probe", text: "Den 3:1-Tastkopf gebaut: 100 kΩ von der Tastspitze an GP26, 47 kΩ von GP26 an GND" },
      { id: "ground", text: "Pico-GND mit der −-Schiene des Prüflings verbunden (gemeinsame Masse — keine Ausnahmen)" },
      { id: "live", text: "Live-Modus läuft — in Thonnys Plotter oder direkt auf dieser Seite via Connect (Chrome) — mit dem Finger am Tastkopf gewackelt und es gesehen" },
      { id: "rc", text: "Eine echte RC-Ladekurve aufgenommen und die 63 % bei t ≈ τ mit dem Auge geprüft" },
      { id: "blinker-out", text: "Pin 3 des Blinkers gemessen: Frequenz bestimmt und gegen die 555-Formel geprüft" },
      { id: "sawtooth", text: "Pins 2+6 gemessen und den ⅓→⅔-Sägezahn gesehen — die Signaturspur des Kurses, in echten Elektronen" },
      { id: "loading", text: "Die leichte Timing-Dehnung durch den Tastkopf am Kondensatorknoten bemerkt (und erklärt!)" },
      { id: "burst", text: "Burst-Modus laufen lassen; das gemeldete fs deines Pico notiert" },
      { id: "pwm", text: "Den PWM-Dimmer bei voller Geschwindigkeit aufgenommen: Tastgrad folgt dem Drehknopf" },
      { id: "alias", text: "Das PWM im Live-Modus absichtlich untertastet und das Alias beim Namen genannt" },
      { id: "dusk", text: "Den Dämmerungsübergang des Nachtlichts aufgezeichnet — deine Firmware, geprüft von deinem Instrument" },
      { id: "graduate", text: "Auf die Werkbank geschaut: vier Builds, alle deine, alle verstanden. Kurs abgeschlossen. ⚡🎓" },
    ],
  },
};
