import type { LessonContentDe } from "../localize";

export const unit3De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  feedback: {
    Theory: () => (
      <>
        <h2>Der Fehler: die eine Zahl, die zählt</h2>
        <p>
          Jeder Regler dieser Einheit lebt von einer einzigen Größe — der Lücke zwischen gewollt
          und gemessen:
        </p>
        <div className="formula">
          e = Sollwert − Messwert
          <span className="note">der Fehler — Regelung ist die Kunst, Kraft auszugeben, um diese Zahl zu schrumpfen</span>
        </div>
        <p>
          Der <em>Sollwert</em> ist der Wunsch (22 °C, 50 cm/s, die Mitte der Linie); der
          Messwert ist die hart erkämpfte Wahrheit aus Einheit 2. Alles, was ein Regler tut, tut
          er mit Blick auf e.
        </p>

        <h2>Bang-Bang: zwei Stellungen, keine Scham</h2>
        <p>
          Die einfachste denkbare Politik: Fehler positiv → volle Kraft; Fehler negativ → aus.
          Das ist <strong>Bang-Bang-Regelung</strong>, und sie betreibt dein Zuhause: Thermostate,
          Öfen, Wasserkocher, Kühlschränke. Sie ist robust, braucht kein Tuning und trägt eine
          strukturelle Signatur — <strong>zur Ruhe kommt sie nie</strong>. Volle Kraft schießt
          über das Ziel hinaus; null Kraft fällt darunter zurück; das System sägt für immer
          zwischen beiden. Die Schwingung ist kein Bug zum Ausbessern; sie ist die Gestalt der
          Politik.
        </p>
        <p>
          Schlimmer: Naives Bang-Bang flattert. Nahe am Sollwert kippt das kleinste
          Sensorrauschen die Entscheidung viele Male pro Sekunde an-aus-an-aus — Relais klicken
          sich zu Tode. Der praktische Flicken ist <strong>Hysterese</strong>: einschalten unter
          21,5°, ausschalten über 22,5°. Die Ein-Grad-Lücke stiftet einen ruhigen, ehrlichen
          Rhythmus — breiteres Band, langsamere und tiefere Schwünge; engeres, schnellere und
          flachere, bis das Rauschen wieder übernimmt.
        </p>

        <h2>Die fehlende Idee: Proportion</h2>
        <p>
          Der tiefe Makel: Bang-Bang kann „Wie falsch liege ich?“ nicht beantworten — nur „Liege
          ich falsch?“. Zehn Grad unterm Ziel und ein halbes Grad darunter bekommen denselben
          Vollstoß. Die naheliegende Verfeinerung — <em>proportional zur Fehlergröße drücken</em> —
          ist die nächste Lektion, und sie verändert das Spiel so sehr, dass sie drei eigene
          Buchstaben verdient. Aber sieh nicht auf Bang-Bang herab: Wo der Aktor nur zwei
          Stellungen <em>hat</em> (ein Heizrelais, ein Ventil), ist es nicht die naive Wahl —
          sondern die einzige.
        </p>

        <div className="callout note">
          <span className="co-title">Auch du bang-bangst</span>
          <p>
            Steuere einen Einkaufswagen mit geschlossenen Augen, die du einmal pro Sekunde
            öffnest, und du wirst in übergroßen Rucken korrigieren — selten spüren, grob handeln,
            schwingen. Das Labor lässt dich genau das mit einem Lüfterwagen fühlen, und das
            Wackeln, das du nicht entfernen kannst, ist der ganze Punkt dieser Lektion.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Thermostat-Wagen",
      intro: (
        <>
          <p>Ein lüftergetriebener Wagen jagt eine Ziellinie unter Bang-Bang-Regelung — mit einem Hysterese-Knopf und einem Rausch-Knopf.</p>
          <ul>
            <li>Null Hysterese: Sieh den Lüfter nahe am Ziel wild flattern, wenn das Rauschen die Entscheidung kippt.</li>
            <li>Weite das Hysterese-Band: Das Flattern endet, ersetzt durch einen ruhigen, tiefen Sägezahn. Miss seine Amplitude — sie folgt der Bandbreite.</li>
            <li>Versuche, den Wagen still auf der Linie stehen zu lassen. Melde deine beste Schwingungsamplitude; null steht nicht auf der Karte.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Bang-Bang-Regler kann sein Ziel nie ruhig halten, weil…",
        choices: [
          "sein Sensor zu verrauscht ist",
          "seine einzigen Werkzeuge überschießende Kraft und unterschreitende Ruhe sind — er muss zwischen beiden sägen",
          "er zu langsam läuft",
          "der Sollwert sich ständig ändert",
        ],
        answer: 1,
        explain:
          "Volle Kraft trägt das System übers Ziel hinaus; null Kraft lässt es zurückfallen. Ohne Zwischenstellung ist die Schwingung strukturell, nicht zufällig.",
      },
      {
        q: "Hysterese behebt welches spezifische Problem?",
        choices: [
          "Überschwingen bei großen Fehlern",
          "Langsames Aufwärmen",
          "Schnelles Flattern nahe am Sollwert, wo winziges Rauschen die Entscheidung hin- und herkippt",
          "Sensordrift",
        ],
        answer: 2,
        explain:
          "Getrennte Ein- und Ausschaltschwellen heißen: Rauschen innerhalb des Bandes kippt nichts. Der Preis: eine absichtliche, ruhige Schwingung von Bandbreite.",
      },
      {
        q: "Ein breiteres Hysterese-Band macht die Schwingung…",
        choices: ["langsamer und tiefer", "schneller und flacher", "verschwinden", "chaotisch"],
        answer: 0,
        explain:
          "Das System muss das ganze Band durchqueren, bevor der Regler reagiert: längere Schwünge, längere Perioden. Verenge das Band, und du rast wieder Richtung Flattern.",
      },
      {
        q: "Die strukturelle Blindheit der Bang-Bang-Regelung: Sie kann nicht spüren…",
        choices: [
          "in welche Richtung der Fehler zeigt",
          "das Vorzeichen des Sollwerts",
          "die Schleifenrate",
          "wie groß der Fehler ist — ein halbes Grad und zehn Grad bekommen denselben Vollstoß",
        ],
        answer: 3,
        explain:
          "Sie beantwortet „Liege ich falsch?“, aber nie „Wie falsch?“. Die Kraft proportional zur Fehlergröße zu machen ist exakt das Upgrade der nächsten Lektion.",
      },
    ],
  },

  /* ================================================================ */
  pid: {
    Theory: () => (
      <>
        <h2>P: drücke mit Absicht, proportional</h2>
        <p>
          Ersetze Bang-Bangs zwei Stellungen durch einen Drehregler: Kraft proportional zum
          Fehler, u = Kp·e. Weit vom Ziel: hart drücken; nah dran: nachlassen. Eine Verstärkung
          zum Stimmen, und das Verhalten ist schon erkennbar zivilisiert — meistens. Zwei
          Versagen bleiben. Wähle Kp zaghaft, und das System kriecht; schlimmer: Eine stetige
          Störung (Schwerkraft an einem Arm, ein Hügel unter einem Wagen) hinterlässt eine
          permanente <strong>bleibende Regelabweichung</strong> — P braucht Fehler, um überhaupt
          Kraft auszugeben, also parkt es dort, wo Druck gleich Zug ist, kurz vor dem Ziel. Wähle
          Kp wild, und du erfindest Bang-Bang mit Extraschritten neu: Überschwingen, Schwingung.
        </p>

        <h2>I: der Groll. D: die Bremse</h2>
        <p>
          Der <strong>Integral</strong>-Term sammelt den Fehler über die Zeit — ein Groll-Konto.
          Das sture letzte halbe Grad, das P allein ewig tolerieren würde? Es wächst in der
          Summe, bis der Regler es wegdrückt. I löscht die bleibende Abweichung. Seine dunkle
          Seite: Bei langen Fehlern läuft der Groll über (<em>Windup</em>) und entlädt sich bei
          der Ankunft als wildes Überschwingen.
        </p>
        <p>
          Der <strong>Differenzial</strong>-Term beobachtet die <em>Geschwindigkeit</em> des
          Fehlers. Schnelle Annäherung ans Ziel? D stemmt sich gegen den Ansturm — eine Bremse,
          angezogen vor der Ankunft, und genau das tötet Überschwingen und beruhigt Schwingungen.
          Seine dunkle Seite: Einen verrauschten Sensor abzuleiten verstärkt jedes Zittern zu
          Kraft, weshalb echte D-Terme immer gefiltert sind — und oft klein.
        </p>
        <div className="formula">
          u = Kp·e + Ki·∫e·dt + Kd·de/dt
          <span className="note">Gegenwart, Vergangenheit, Zukunft — eine Zeile, der Großteil der industriellen Zivilisation</span>
        </div>

        <h2>Stimmen ohne Tränen</h2>
        <p>
          Das Werkbank-Rezept, gut genug für fast alles: I und D auf null. Erhöhe Kp, bis die
          Antwort schwingt, dann ein Drittel zurück. Füge einen Hauch D hinzu, um das restliche
          Überschwingen zu erdrücken. Füge gerade genug I hinzu, um die letzte sture Lücke zu
          schließen — und keinen Tropfen mehr. In dieser Reihenfolge, ein Knopf nach dem
          anderen, mit Blick auf einen Plot. Genau das tust du im Labor — und noch einmal, unter
          Rennbedingungen, im Abschlussprojekt.
        </p>

        <div className="callout note">
          <span className="co-title">Warum sich mit einem Regler aus den 1940ern begnügen?</span>
          <p>
            Feinere Regelung existiert, und Einheit 6 deutet darauf. Aber PID braucht kein Modell
            der Welt — nur das Fehlersignal — und diese Ahnungslosigkeit ist eine Superkraft: Es
            funktioniert an Öfen wie an Quadrocoptern, unverändert. Schätzungen setzen PID in die
            große Mehrheit aller Industrie-Regelschleifen. Lerne seine drei Temperamente, und du
            kannst mit den meisten Maschinen der Erde reden.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Stimm-Bank",
      intro: (
        <>
          <p>Ein beschwerter Arm soll einen Winkel halten — die Schwerkraft ist die stetige Störung. Drei Verstärkungs-Schieber, ein Live-Plot und Anzeigen für Überschwingen, Einschwingen und die Restlücke.</p>
          <ul>
            <li>Nur P: Erhöhe Kp bis zur Schwingung, geh zurück. Beachte, wie der Arm stur unterm Ziel hängt — die bleibende Regelabweichung.</li>
            <li>Füge I hinzu und sieh die letzte Lücke schließen… dann stelle Ki riesig und sieh den Windup den Arm übers Ziel schleudern.</li>
            <li>Füge D hinzu, um die Ankunft zu beruhigen. Dann folge dem vollen Rezept und protokolliere deine beste Einschwingzeit.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein P-Regler mit Kp = 4 sieht einen Fehler von 2,5 (Ziel 10, gemessen 7,5). Welche Kraft u gibt er aus?",
        answer: 10,
        unit: "",
        hint: "u = Kp · e.",
        explain: "4 × 2,5 = 10 Krafteinheiten. Doppelter Fehler hieße doppelter Druck — diese Proportionalität ist die ganze P-Idee.",
      },
      {
        prompt:
          "Der Arm kommt dort zur Ruhe, wo der P-Druck dem Schwerkraftzug von 6 Einheiten gleicht. Wie groß ist mit Kp = 4 die bleibende Regelabweichung?",
        answer: 1.5,
        unit: "",
        tolerancePct: 2,
        hint: "Löse Kp · e = Störung nach e auf.",
        explain: "e = 6/4 = 1,5. P kann Kraft nur mit Fehler finanzieren, also parkt es genau dort, wo Druck und Zug sich aufheben — vor dem Ziel. Diese Lücke zu löschen ist der Daseinszweck des I-Terms.",
      },
    ],
    quiz: [
      {
        q: "Warum lässt ein reiner P-Regler gegen die Schwerkraft eine bleibende Abweichung stehen?",
        choices: [
          "Er gibt Kraft nur proportional zum Fehler aus — null Fehler hieße null Kraft, also muss er dort parken, wo Druck gleich Zug ist",
          "Seine Schleife läuft zu langsam",
          "Die Schwerkraft verschiebt den Sollwert",
          "Der Sensor läuft in die Sättigung",
        ],
        answer: 0,
        explain:
          "Position gegen konstanten Zug zu halten verlangt konstante Kraft, und P kann Kraft nur mit Fehler bezahlen. Es parkt bei e = Störung/Kp.",
      },
      {
        q: "Aufgabe und typisches Versagen des Integral-Terms sind…",
        choices: [
          "die Zukunft vorhersagen; Verzögerung",
          "bleibende Abweichung durch Aufsammeln löschen; Windup-Überschwingen nach langen Fehlern",
          "Schwingung dämpfen; Rauschverstärkung",
          "die Antwort beschleunigen; bleibende Abweichung",
        ],
        answer: 1,
        explain:
          "Das Groll-Konto schließt Lücken, die P ewig tolerieren würde — und läuft bei langen Fehlern über, um sich als Überschwingen zu entladen. Genau dafür gibt es Anti-Windup-Logik.",
      },
      {
        q: "Der Differenzial-Term verringert das Überschwingen, weil er…",
        choices: [
          "die Gesamtkraft erhöht",
          "das Integral zurücksetzt",
          "sich gegen schnelle Fehleränderung stemmt — bremst vor der Ankunft",
          "das Sensorsignal filtert",
        ],
        answer: 2,
        explain:
          "D liest das Annäherungstempo und lehnt sich dagegen, wie Bremsen vor dem Stoppschild statt am Stoppschild. Diese Vorwegnahme beruhigt die Ankunft.",
      },
      {
        q: "Die vernünftige Stimm-Reihenfolge auf der Werkbank ist…",
        choices: [
          "erst I, dann P, dann D",
          "alle drei gleichzeitig nach Versuch und Irrtum",
          "erst D zum Stabilisieren, dann I, dann P",
          "P bis an den Rand der Schwingung und zurück; etwas D gegen das Überschwingen; gerade genug I für die letzte Lücke",
        ],
        answer: 3,
        explain:
          "Ein Knopf nach dem anderen, jeder behebt das spezifische Versagen, das der vorige übrig ließ: P für Muskeln, D für Manieren, I für den letzten Zentimeter.",
      },
      {
        q: "Warum ist der D-Term auf echten Robotern immer gefiltert?",
        choices: [
          "Um CPU-Takte zu sparen",
          "Ableiten verstärkt Sensorrauschen — jedes Zittern wird zu einem Kraftstoß",
          "Weil Kd unter Kp bleiben muss",
          "Um Integral-Windup zu verhindern",
        ],
        answer: 1,
        explain:
          "Die Ableitung eines zittrigen Signals ist Zittern, vergrößert. Ungefiltertes D macht aus Messrauschen direkt Motorgeklapper.",
      },
    ],
  },

  /* ================================================================ */
  "line-follower": {
    Theory: () => (
      <>
        <h2>Der klassische erste Roboter, und warum</h2>
        <p>
          Ein Linienfolger ist ein Robotik-Studium in Miniatur: Reflexionssensoren unter der Nase
          melden, wo eine dunkle Linie liegt (spüren), ein Regler macht daraus eine
          Lenkentscheidung (denken), und zwei PWM-Tastgrade lenken per
          Raddrehzahl-Differenz (handeln) — und wieder von vorn, hunderte Male pro Sekunde.
          Jedes Teil kennst du inzwischen beim Namen.
        </p>

        <h2>Von fünf Sensoren zu einem Fehler</h2>
        <p>
          Das Sensor-Array liefert eine Zahl: die Position der Linie unter dem Roboter, von −2
          (weit links) bis +2 (weit rechts). Die Mitte liest null — und null ist der Sollwert.
          Das ganze Seh-Problem verdichtet sich in den Fehler e, und Lenken wird zur Formel der
          letzten Lektion:
        </p>
        <div className="formula">
          Lenkung = Kp·e + Kd·de/dt
          <span className="note">das linke Rad wird um die Lenkung langsamer, das rechte schneller — PD, ohne I: ein fahrender Roboter trägt keinen stetigen schwerkraftartigen Zug</span>
        </div>
        <p>
          Warum kein Integral? Ein Linienfolger erleidet selten konstante einseitige Störung —
          sein Fehler pendelt ständig durch null — also würde das Groll-Konto vor allem Rauschen
          sammeln und überlaufen. Echte Racer fahren PD. (Wäre ein Rad schwächer als das andere,{" "}
          <em>das</em> wäre ein stetiger Zug, und ein kleines I verdiente sein Brot: Kenne die
          Regel, dann erkenne, wann du in der Ausnahme steckst.)
        </p>

        <h2>Tempo ist der Schwierigkeitsregler</h2>
        <p>
          Im Kriechgang folgt fast jedes Kp fast jeder Kurve. Erhöhe das Tempo, und jede Sünde
          wird teuer: Kurven kommen schneller, als die Schleife korrigiert, reines P-Tuning
          schwingt sich ins Aus, und der D-Term hört auf, optional zu sein. Das Abschlussprojekt
          ist genau dieser Aufstieg: sauber stimmen bei niedrigem Tempo, dann das Tempo erhöhen
          und die Stabilität mit besseren Verstärkungen neu verdienen. Rundenzeit und
          Abflug-Zähler sind die ehrlichen Richter.
        </p>

        <div className="callout note">
          <span className="co-title">Das überträgt sich im Ganzen</span>
          <p>
            Tausche „Linienposition“ gegen „Kurs zum Wegpunkt“, und exakt diese Struktur fährt
            Lagerroboter durch Gänge. Stimme das hier gut, und du hast die innere Schleife der
            mobilen Robotik schon einmal gestimmt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Ideallinie",
      intro: (
        <>
          <p>Eine Strecke von oben, mit Geraden, weiten Bögen und einer Haarnadel. Schieber für Tempo, Kp und Kd; Anzeigen für Rundenzeit, größten Fehler und Abflüge.</p>
          <ul>
            <li>Starte langsam, Kd = 0: Finde ein Kp, das sauber rundet. Es klappt, weil die Sensorleiste der Achse vorausfährt — Gratis-Dämpfung im Kriechgang. Erhöhe das Tempo und sieh dieses Geschenk zerrinnen.</li>
            <li>Bring Kd ins Spiel und zähme ihn neu. Schieb das Tempo weiter. Wiederhole — diese Leiter ist das ganze Abschlussprojekt.</li>
            <li>Die Checkliste unten sind deine Rennkommissare: Arbeite sie durch, und die Lektion gilt als bestanden.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "clean-lap", text: "Fahre eine volle Runde mit null Linien-Abflügen bei beliebigem Tempo — dein Basis-Setup." },
      { id: "oscillate", text: "Erhöhe das Tempo, bis der Roboter sichtbar um die Linie schwingt, und notiere das versagende Kp — du hast die Decke von reinem P gefunden." },
      { id: "pd-lap", text: "Füge Differenzial-Verstärkung hinzu und fahre eine saubere Runde bei einem Tempo, an dem reines P scheiterte." },
      { id: "fast-lap", text: "Setze eine saubere Rundenzeit unter 12 Sekunden — stimmen, nicht hoffen." },
      { id: "explain", text: "Sag laut, in je einem Satz, was mehr Kp bewirkt hat und was mehr Kd bewirkt hat. Wenn du es nicht kannst, lauf die Leiter erneut." },
    ],
  },
};
