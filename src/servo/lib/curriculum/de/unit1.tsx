import type { LessonContentDe } from "../localize";

export const unit1De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "dc-motors": {
    Theory: () => (
      <>
        <h2>Was die Volt wirklich kaufen</h2>
        <p>
          Ein Bürsten-Gleichstrommotor ist der einfachste Deal der Robotik: Spannung rein, Drehung
          raus. Mehr Volt, mehr Tempo — nahezu proportional, solange er frei dreht. Aber im
          Kleingedruckten wohnt das ganze Ingenieurwesen:
        </p>
        <ul>
          <li><strong>Tempo</strong> setzt die Spannung — minus das, was die Last zurückkrallt.</li>
          <li><strong>Drehmoment</strong> — die Drehkraft — setzt der <em>Strom</em>. Ein harter Schub heißt ein großer Zug.</li>
          <li><strong>Blockieren</strong> — komplett festgehalten — heißt Maximalstrom und null Bewegung: Alle Leistung wird zu Hitze in den Wicklungen.</li>
        </ul>
        <div className="formula">
          Tempo ∝ Spannung · Drehmoment ∝ Strom
          <span className="note">die zwei Hälften jedes Motor-Datenblatts — und der Grund, warum ein blockierter Motor riecht</span>
        </div>
        <p>
          Blockieren ist die klassische Roboter-Mordwaffe, und nicht nur für den Motor: Der
          plötzliche Stromschluck zieht die Akkuspannung herunter, der Regler verliert den Halt,
          und das Gehirn des Roboters browned out und startet neu. Ein an der Wand verkeiltes Rad
          kann einen ganzen Roboter neustarten — denk daran, wenn deiner das erste Mal mysteriös
          mitten im Lauf rebootet.
        </p>

        <h2>Die H-Brücke: ein Rückwärtsgang aus Schaltern</h2>
        <p>
          Ein Motor läuft rückwärts, wenn der Strom rückwärts durch ihn fließt. Um das mit
          digitalen Schaltern zu schaffen, setze <strong>vier</strong> davon als Raute um den
          Motor — der Schaltplan buchstabiert den Buchstaben H, Motor als Querbalken. Schließe
          oben-links und unten-rechts: Strom fließt in eine Richtung. Die andere Diagonale: er
          fließt andersherum.
        </p>
        <p>
          Speise eine Seite der Brücke mit deinem PWM-Signal, und du hast das komplette
          Motor-Vokabular der letzten Lektion plus ein Vorzeichen: <strong>Tastgrad für wie stark,
          Diagonale für wohin</strong>. Schließe beide Schalter derselben Seite, und du hast einen
          Kurzschluss gebaut — weshalb niemand eine H-Brücke aus nackten Schaltern verdrahtet:
          Treiber-Chips liefern die Verriegelungen, die den Rauch optional machen.
        </p>

        <h2>Den Kampf lesen: Strom lügt nicht</h2>
        <p>
          Am Tempo allein siehst du die Last nicht, aber der Strom lügt nie: Er ist eine
          Live-Anzeige dafür, wie hart der Motor kämpft. Kluge Roboter beobachten ihn — ein
          Greifer spürt „ich halte etwas“ als Stromanstieg, ein Staubsauger erkennt die
          verklemmte Bürste genauso. Der billigste Kraftsensor der Werkbank ist der Motor, den du
          schon besitzt.
        </p>

        <div className="callout note">
          <span className="co-title">Warum nicht einfach ein größerer Motor?</span>
          <p>
            Ein nackter Gleichstrommotor dreht tausende Umdrehungen mit kaum genug Moment für
            einen Türknauf — exakt verkehrt herum zu dem, was Roboter brauchen. Du könntest einen
            riesigen Motor kaufen… oder das nutzlose Tempo mit einer Handvoll Zahnräder in
            nützliches Moment tauschen. Dieser Tausch ist Lektion drei, und er ist der Grund,
            warum fast jeder „Motor“ in einem Roboter heimlich ein <em>Getriebemotor</em> ist.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Motor-Werkbank",
      intro: (
        <>
          <p>Ein Gleichstrommotor auf dem Prüfstand: PWM-Tastgrad an einem Knopf, mechanische Last am anderen, Live-Anzeigen für Tempo und Strom.</p>
          <ul>
            <li>Fahre den Tastgrad bei null Last durch: Das Tempo folgt fast linear.</li>
            <li>Gib nun Last bei festem Tastgrad — sieh das Tempo sacken, während der Strom klettert. Volt versprechen, Last verhandelt.</li>
            <li>Erhöhe die Last bis zum Blockieren und sieh den Strom anschlagen, während die Brown-out-Warnung feuert. Kippe die H-Brücken-Diagonale für rückwärts.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Motor blockiert bei 2,4 A an einer 6-V-Versorgung. Wie viel Leistung wird in seinen Wicklungen zu Hitze, in Watt? (P = V · I)",
        answer: 14.4,
        unit: "W",
        tolerancePct: 2,
        hint: "Alles davon ist Hitze — nichts bewegt sich.",
        explain: "6 × 2,4 = 14,4 W reine Heizung in einem daumengroßen Paket. Darum ist Blockieren ein zeitlich begrenztes Ereignis.",
      },
      {
        prompt:
          "Derselbe Motor dreht frei mit 3000 RPM bei 6 V. Welches Freilauftempo erwartest du grob bei 40 % PWM-Tastgrad, in RPM?",
        answer: 1200,
        unit: "RPM",
        tolerancePct: 5,
        hint: "Freilauftempo folgt der mittleren Spannung — und der Tastgrad setzt den Mittelwert.",
        explain: "0,4 × 3000 = 1200 RPM. Unbelastet folgt das Tempo der mittleren Spannung nahezu proportional.",
      },
    ],
    quiz: [
      {
        q: "In einem Bürsten-Gleichstrommotor hängt das Drehmoment am direktesten an…",
        choices: ["der Spannung", "dem Strom", "der PWM-Frequenz", "der Motortemperatur"],
        answer: 1,
        explain:
          "Volt setzen, wie schnell er drehen will; Ampere messen, wie hart er drückt. Darum ist ein hart arbeitender Motor ein hungriger.",
      },
      {
        q: "Warum kann ein einziges verklemmtes Rad den Computer eines Roboters neustarten?",
        choices: [
          "Der blockierte Motor zieht einen riesigen Strom und lässt den Akku sacken, bis die Logikspannung einbricht",
          "Die Klemmung sendet ein Interrupt-Signal an den Prozessor",
          "Die Magnete des Motors stören den Speicher",
          "Die Software erkennt die Klemmung und startet sicherheitshalber neu",
        ],
        answer: 0,
        explain:
          "Blockierstrom ist der Maximalzug des Motors. Die Akkuspannung sackt unter dem Schluck, der Regler fällt ab, das Gehirn browned out — ein elektrischer Ausfall im mechanischen Kostüm.",
      },
      {
        q: "Eine H-Brücke kehrt einen Motor um, indem sie…",
        choices: [
          "die Batterie mit einem Relais umpolt",
          "die PWM-Frequenz verdoppelt",
          "das gegenüberliegende Diagonalpaar ihrer vier Schalter schließt und den Strom rückwärts schickt",
          "einen zweiten Motor andersherum dreht",
        ],
        answer: 2,
        explain:
          "Vier Schalter im H: Jede Diagonale ist eine Stromrichtung. Der verbotene Zug — beide Schalter einer Seite — ist ein Kurzschluss.",
      },
      {
        q: "Der Strom eines Greifermotors steigt plötzlich, während sein Tempo fällt. Der Roboter sollte schließen…",
        choices: [
          "der Akku ist voll geladen",
          "die PWM-Frequenz ist verrutscht",
          "der Motor ist kaputt",
          "die Finger haben ein Objekt getroffen — Strom ist ein kostenloser Kraftsensor",
        ],
        answer: 3,
        explain:
          "Der Strom folgt dem Kampf. Steigender Strom bei fallendem Tempo heißt steigender mechanischer Widerstand — und für einen schließenden Greifer heißt das Kontakt.",
      },
    ],
  },

  /* ================================================================ */
  "servos-steppers": {
    Theory: () => (
      <>
        <h2>Der Servo: eine Regelschleife in der Schachtel</h2>
        <p>
          Ein Modellbauservo ist ein ganzer Robotik-Kurs im Plastikgehäuse: Gleichstrommotor,
          Getriebe, ein Potentiometer, das die Abtriebswelle beobachtet, und ein winziger Regler,
          der den gemessenen Winkel mit dem bestellten vergleicht. Befiehl 90°, und er{" "}
          <em>kämpft</em> sich dorthin — drück ihn mit dem Finger weg, und er drückt zurück. Das
          ist Spüren–Denken–Handeln, fertig gekauft.
        </p>
        <p>
          Die klassischen Grenzen: rund 180° Verfahrweg, und kein Bericht zurück — du befiehlst,
          du vertraust. Sein erwachsenes Geschwister, das <strong>Bus-Servo</strong>, repariert
          genau das: Servos in Reihe an einem Kabel, jedes mit Adresse, jedes antwortet mit wahrem
          Winkel, Tempo und Strom. Frag einen modernen Low-Cost-Roboterarm, was er ist, und die
          ehrliche Antwort lautet: sechs Bus-Servos und ein paar Schrauben.
        </p>

        <h2>Der Schrittmotor: Position per Arithmetik</h2>
        <p>
          Ein Schrittmotor geht die umgekehrte Wette ein. Sein Rotor klickt zwischen magnetischen
          Rastpunkten — typisch <strong>200 pro Umdrehung</strong>, je 1,8°. Pulse ihn 50-mal, und
          er hat sich exakt 90° gedreht. Kein Sensor, keine Schleife: Position ist bloßes Zählen.
        </p>
        <div className="formula">
          Winkel = Schritte × 1,8°
          <span className="note">beim 200-Schritt-Motor — Position gekauft mit Arithmetik statt Rückkopplung</span>
        </div>
        <p>
          Das Kleingedruckte ist auf besondere Art brutal: Überlaste einen Schrittmotor — zu viel
          Moment, zu schneller Start — und er <strong>überspringt Schritte lautlos</strong>. Die
          Elektronik zählt Pulse weiter, die der Rotor nie vollzogen hat. Nichts wirft einen
          Fehler; die Vorstellung des Roboters, wo er ist, wird schlicht zur Fiktion. Darum fahren
          3D-Drucker gegen Endschalter neu auf Referenz: um die Zählung mit der Wirklichkeit zu
          versöhnen.
        </p>

        <h2>Die Wahl zwischen beiden</h2>
        <ul>
          <li><strong>Servo</strong>: weiß (intern), wo er ist, bekämpft Störungen, begrenzter Weg. Gelenke, Greifer, Lenkung.</li>
          <li><strong>Schrittmotor</strong>: unbegrenzter Weg, exakt und wiederholbar solange in Grenzen belastet, vertraut aber Arithmetik statt Wahrheit. Drucker, Plotter, Kameraschlitten.</li>
          <li><strong>Bus-Servo</strong>: die Rückkopplung eines Servos plus die Ehrlichkeit eines Berichts. Roboterarme wohnen inzwischen hier.</li>
        </ul>

        <div className="callout note">
          <span className="co-title">Offene Schleife, geschlossene Schleife</span>
          <p>
            Der Schrittmotor ist der erste reine <em>Open-Loop</em>-Akteur des Kurses: Er handelt,
            ohne zu prüfen. Der Servo ist <em>Closed-Loop</em>: Er misst und korrigiert. Behalte
            die beiden als Figuren im Kopf — Einheit 3 ist die Theorie, warum der geschlossene
            gewinnt, sobald die Welt zurückdrückt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Positions-Duell",
      intro: (
        <>
          <p>Ein Servo und ein Schrittmotor, Seite an Seite, beide auf dieselben Winkel befohlen — mit einem Störhebel, der beide Wellen schubst.</p>
          <ul>
            <li>Schick beide auf 120°. Identische Ankunft — Arithmetik und Rückkopplung sind sich in einer stillen Welt einig.</li>
            <li>Jetzt schubse: Der Servo schnappt zurück; der Schrittmotor bleibt verschoben, und seine Anzeige lügt leise.</li>
            <li>Erhöhe die Last, bis der Schrittmotor Schritte verliert, dann befiehl 0° — der Servo kehrt wahrhaftig zurück, der Schrittmotor in eine Fiktion. Re-home zum Versöhnen.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein 200-Schritt-Motor erhält 350 Schrittpulse. Um welchen Winkel sollte er sich gedreht haben, in Grad?",
        answer: 630,
        unit: "°",
        tolerancePct: 2,
        hint: "1,8° pro Schritt.",
        explain: "350 × 1,8 = 630° — eindreiviertel Umdrehungen, falls kein Schritt übersprungen wurde.",
      },
      {
        prompt:
          "Bei diesem Zug hat der Rotor 20 Schritte übersprungen. Wie weit liegt die Vorstellung der Elektronik vom wahren Winkel entfernt, in Grad?",
        answer: 36,
        unit: "°",
        tolerancePct: 2,
        hint: "Jeder übersprungene Schritt ist 1,8° unverdientes Selbstvertrauen.",
        explain: "20 × 1,8 = 36°. Der Zähler zeigt 630°, die Welle schaffte 594° — und nichts, nirgends, meldet die Differenz.",
      },
    ],
    quiz: [
      {
        q: "Was schließt die Schleife im Inneren eines Modellbauservos?",
        choices: [
          "Ein Potentiometer an der Abtriebswelle, verglichen mit dem befohlenen Winkel",
          "Eine Kamera, die das Ruderhorn beobachtet",
          "Die PWM-Frequenz",
          "Ein Schrittmotor",
        ],
        answer: 0,
        explain:
          "Motor, Getriebe, Poti, winziger Regler: Das Poti misst den wahren Winkel, der Regler treibt den Motor, bis gemessen gleich befohlen ist.",
      },
      {
        q: "Ein Schrittmotor „kennt“ seine Position, weil…",
        choices: [
          "er einen eingebauten Encoder hat",
          "sein Treiber den Rotor magnetisch vermisst",
          "er sich in festen Schritten bewegt und die Elektronik sie zählt",
          "er sich ständig neu referenziert",
        ],
        answer: 2,
        explain:
          "Position per Arithmetik: 200 Rastpunkte pro Umdrehung, Pulse zählen. Wahr genau so lange, wie jeder befohlene Schritt wirklich stattfand.",
      },
      {
        q: "Das Gefährliche an einem überlasteten Schrittmotor ist, dass er…",
        choices: [
          "binnen Sekunden überhitzt",
          "lautlos Schritte überspringt, sodass der Positionszähler ohne jede Fehlermeldung von der Realität wegdriftet",
          "die Richtung umkehrt",
          "Blockierstrom zieht wie ein Gleichstrommotor",
        ],
        answer: 1,
        explain:
          "Die Pulse kommen weiter, der Zähler zählt weiter, der Rotor folgt nicht mehr. Open-Loop-Selbstvertrauen ist nur so gut wie die Annahme, dass nichts zurückgedrückt hat.",
      },
      {
        q: "Warum haben Bus-Servos die Low-Cost-Roboterarme übernommen?",
        choices: [
          "Sie sind stärker als Schrittmotoren",
          "Sie brauchen keine Stromverkabelung",
          "Sie laufen ohne Mikrocontroller",
          "Sie hängen in Reihe an einem Kabel und melden wahren Winkel, Tempo und Strom zurück",
        ],
        answer: 3,
        explain:
          "Ein Kabel durch sechs Gelenke statt sechs Kabelbäume — und entscheidend: Der Arm kann jedes Gelenk *fragen*, wo es wirklich ist und wie hart es arbeitet.",
      },
    ],
  },

  /* ================================================================ */
  gears: {
    Theory: () => (
      <>
        <h2>Der Wechselkurs</h2>
        <p>
          Lass ein kleines Zahnrad in ein großes greifen und zähle Zähne. Ein 10-Zähne-Rad, das
          ein 50-Zähne-Rad treibt, muss sich fünfmal drehen für eine Abtriebsumdrehung — das ist
          eine <strong>Übersetzung</strong> von 5:1. Der Abtrieb ist fünfmal langsamer und, im
          Idealfall, fünfmal stärker:
        </p>
        <div className="formula">
          Tempo ÷ Übersetzung · Drehmoment × Übersetzung
          <span className="note">dieselbe Leistung in neuer Stückelung — die Physik verlangt nur eine kleine Reibungsgebühr</span>
        </div>
        <p>
          Darum wird ein nackter Gleichstrommotor — tausende RPM, Türknauf-Moment — in dem Moment
          nützlich, in dem ein Getriebe übersetzt: Eine 100:1-Untersetzung macht aus 6000 RPM
          Surren 60 RPM selbstbewusstes Schieben. Die Leistung (Tempo × Moment) bleibt durch die
          Schachtel erhalten; nur ihre <em>Form</em> ändert sich. Umsonst ist nichts: Jede
          Zahneingriffs-Stufe frisst ein paar Prozent an Reibung.
        </p>

        <h2>Spiel: der Raum zwischen den Zähnen</h2>
        <p>
          Kämmende Zähne brauchen einen Hauch Luft, um ohne Klemmen zu rollen — und dieser Hauch
          ist das <strong>Spiel</strong> (Backlash): Kehre den Antrieb um, und der Abtrieb steht
          einen Moment still, während die Zähne die Lücke durchqueren. Für Räder: harmlos. Für
          einen Roboterarm, der am Ziel die Richtung wechselt, ist es eine Totzone, in der das
          Gelenk dich ignoriert — und kein Regler stromabwärts kann eine Lüge im Mechanismus ganz
          zurücknehmen.
        </p>
        <p>
          Die Abhilfen sind mechanisch und entsprechend bepreist: engere Verzahnung, geteilte
          Anti-Backlash-Räder, Riementriebe (die Riemenspannung nimmt den Schlupf auf) oder die
          exotischen Getriebe in Industriearm-Gelenken — eigens dafür konstruiert, die Lücke
          winzig zu machen.
        </p>

        <h2>Einen Antriebsstrang grob auslegen</h2>
        <p>
          Das Werkbank-Rezept: Finde das Moment, das die Aufgabe braucht (Gewicht × Hebelarm,
          dann fürs Polster verdoppeln), finde das Wohlfühlmoment deines Motors, und untersetze um
          das Verhältnis der beiden. Das Tempo ist, was übrig bleibt — und wenn das untersetzte
          Tempo zu langsam für den Job ist, dann ist der Motor zu klein, und keine Übersetzung
          rettet ihn.
        </p>

        <div className="callout note">
          <span className="co-title">Warum nicht alles Direktantrieb?</span>
          <p>
            Große, langsame, getriebelose Motoren existieren — und wo Budgets es erlauben, sind
            sie herrlich: null Spiel, perfekt rücktreibbar, lautlos. Ihr Preis und Gewicht sind
            der Grund, warum der Rest der Welt auf kleinen schnellen Motoren plus Zahnrädern
            läuft. Jeder Antriebsstrang ist derselbe Handel, abgeschlossen bei anderem Budget.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Wechselstube",
      intro: (
        <>
          <p>Ein Motor, ein Zwei-Rad-Getriebe mit einstellbarer Übersetzung und eine Last zum Heben. Anzeigen für Tempo, Moment und die Reibungsgebühr.</p>
          <ul>
            <li>Erhöhe die Übersetzung und sieh den Abtrieb langsamer werden, während sein Moment sich vervielfacht — die Last, die bei 1:1 blockierte, hebt sich bei 20:1 mühelos.</li>
            <li>Kehre den Motor um und sieh den Abtrieb zögern — die Spiel-Lücke, in Zeitlupe. Zieh sie enger und sieh die Totzone schrumpfen.</li>
            <li>Finde die kleinste Übersetzung, die die schwere Last hebt. Notiere, was mit deinem Hebetempo passiert ist.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein Motor dreht mit 6000 RPM hinter einem 30:1-Getriebe. Wie hoch ist die Abtriebsdrehzahl, in RPM?",
        answer: 200,
        unit: "RPM",
        tolerancePct: 2,
        hint: "Durch die Übersetzung teilen.",
        explain: "6000 ÷ 30 = 200 RPM — und das Moment kam auf der anderen Seite der Wechselstube 30-mal größer heraus (minus Reibung).",
      },
      {
        prompt: "Der Motor liefert 0,05 N·m. Welches Moment verlässt, Reibung ignoriert, dieses 30:1-Getriebe, in N·m?",
        answer: 1.5,
        unit: "N·m",
        tolerancePct: 2,
        hint: "Mit der Übersetzung multiplizieren.",
        explain: "0,05 × 30 = 1,5 N·m — genug, um 1,5 kg an einem 10-cm-Hebelarm zu heben. Dieselbe Leistung, neu gestückelt.",
      },
    ],
    quiz: [
      {
        q: "Ein 12-Zähne-Rad treibt ein 60-Zähne-Rad. Der Abtrieb dreht…",
        choices: [
          "5× schneller, mit 5× dem Moment",
          "5× schneller, mit einem Fünftel des Moments",
          "5× langsamer, mit einem Fünftel des Moments",
          "5× langsamer, mit 5× dem Moment (minus Reibung)",
        ],
        answer: 3,
        explain:
          "60/12 = 5:1. Das Tempo teilt sich durch die Übersetzung, das Moment multipliziert sich damit — die Leistung wechselt nur die Stückelung.",
      },
      {
        q: "Spiel (Backlash) ist…",
        choices: [
          "die Luft zwischen kämmenden Zähnen, spürbar als Totzone beim Richtungswechsel",
          "der Rückstoß, wenn ein Motor stoppt",
          "ein Zahnrad, das auf seiner Welle durchrutscht",
          "das Heulen eines Getriebes bei Tempo",
        ],
        answer: 0,
        explain:
          "Zähne brauchen Luft, um sauber zu rollen; kehre um, und der Abtrieb wartet, bis die Lücke durchquert ist. Räder zucken mit den Schultern; zielende Arme nicht.",
      },
      {
        q: "Warum kann ein kluger Regelalgorithmus Spiel nicht vollständig kompensieren?",
        choices: [
          "Regler können nicht schnell genug laufen",
          "In der Lücke ignoriert das Gelenk den Motor mechanisch — kein Befehl durchquert einen getrennten Zahneingriff",
          "Spiel verändert die Übersetzung",
          "Er kann — Spiel ist ein reines Softwareproblem",
        ],
        answer: 1,
        explain:
          "In der Totzone dreht der Motor, und der Abtrieb schlicht nicht. Software kann die Lücke antizipieren, aber kein Drehmoment durch Luft übertragen.",
      },
      {
        q: "Dein untersetzter Mechanismus hat endlich genug Moment, ist jetzt aber viel zu langsam. Der ehrliche Schluss lautet…",
        choices: [
          "ein zweites Getriebe anbauen",
          "die PWM-Frequenz erhöhen",
          "der Motor selbst ist zu klein — keine Übersetzung kauft Tempo und Moment zugleich aus zu wenig Leistung",
          "das Spiel verringern",
        ],
        answer: 2,
        explain:
          "Das Getriebe wechselt nur, was der Motor mitbringt. Wenn Moment × Tempo den Job bei keinem Wechselkurs deckt, fehlt Leistung — kauf einen größeren Motor.",
      },
    ],
  },
};
