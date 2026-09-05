import type { LessonContentDe } from "../localize";

export const unit6De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "teach-by-demo": {
    Theory: () => (
      <>
        <h2>Programmieren durch Zeigen</h2>
        <p>
          Bisher hat immer ein Mensch die Aufgabe in Mathematik übersetzt — Sollwerte,
          Verstärkungen, Wegpunkte. <strong>Imitationslernen</strong> entfernt den Übersetzer:
          Führe den Körper des Roboters selbst durch die Aufgabe (greif den Arm, mach die
          Bewegung — <em>Teleoperation</em>, wenn es über einen Zwillings-Controller geschieht),
          während er aufzeichnet, was er spürte und was seine Gelenke taten. Tu das ein paar
          Dutzend Mal. Dann trainiere eine <strong>Policy</strong> — eine Funktion von gespürter
          Situation zu Aktion — darauf, das Muster zu reproduzieren:
        </p>
        <div className="formula">
          Demos: (Situation → Aktion)… · Policy: neue Situation → Aktion der ähnlichsten Demos
          <span className="note">Behaviour Cloning — das einfachste ehrliche Rezept: handle, wie die Vorführungen handelten</span>
        </div>
        <p>
          Die bescheidene Version ist Nächster-Nachbar: Finde die aufgezeichneten Situationen,
          die dieser am ähnlichsten sind, tu, was sie taten, gemischt. Die Frontversionen sind
          tiefe Netze, trainiert auf derselben Art Daten, mit derselben Seele. Dazwischen liegt
          vor allem Kapazität, nicht Konzept.
        </p>

        <h2>Der Datensatz ist das Programm</h2>
        <p>
          Die Konsequenzen stellen Gewohnheiten auf den Kopf. Die Policy ist nur dort definiert,
          wo Vorführungen <em>waren</em>: Lehre nur Aufheben von links, und die rechte Seite ist
          Terra incognita — die Policy extrapoliert, schlecht, mit vollem Selbstvertrauen.
          Schlampige Vorführungen trainieren schlampiges Verhalten; zehn sorgfältige, gestreute
          Demos schlagen fünfzig gehetzte. Debugging wechselt den Charakter: Die Reparatur für
          eine versagende Region ist selten Code — sie ist <strong>mehr Vorführungen,
          dort</strong>. Abdeckung, Vielfalt und Sorgfalt ersetzen Cleverness als
          Ingenieurstugenden.
        </p>

        <h2>Miss es wie ein Ingenieur</h2>
        <p>
          Eine gelernte Policy hat kein Datenblatt — sie hat eine <strong>Erfolgsquote</strong>,
          und du schuldest ihr eine ehrliche: Teste auf <em>frischen</em> Zielen, die sie nie
          sah (auf den Demos selbst zu testen misst nur das Gedächtnis), zähle Erfolge, notiere,{" "}
          <em>wo</em> die Fehlschläge sich häufen, lehre dort, trainiere neu, miss erneut. Diese
          Schleife — messen, die Lücke finden, sie mit Daten füllen — ist das Tageshandwerk des
          Felds, und exakt das lässt dich dieses Abschlussprojekt tun.
        </p>

        <div className="callout note">
          <span className="co-title">Warum das die Robotik übernahm</span>
          <p>
            Jahrzehnte handcodierter Greif-Geometrie verloren, binnen weniger Jahre, gegen
            „nimm 50 Demos auf und trainiere“ — weil kontaktreiche Aufgaben (Falten, Einführen,
            Wischen) Gleichungen widerstehen, aber Beispielen nachgeben. Die offenen Frameworks
            des heutigen Hobby-Arm-Lernens sind das Rezept dieser Lektion mit größeren Netzen:
            teleoperieren, aufzeichnen, trainieren, ausrollen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Lehr-Studio",
      intro: (
        <>
          <p>Der Zwei-Glieder-Arm, eine Spawn-Zone für Ziele und ein Rekorder. Zieh den Arm durch Aufheber, um Demos aufzunehmen; wechsle in den Policy-Modus und lass ihn frische Ziele allein versuchen.</p>
          <ul>
            <li>Nimm fünf schnelle Demos nur auf der linken Seite auf, teste dann überall — und sieh die rechte Seite mit perfektem Selbstvertrauen scheitern.</li>
            <li>Füge Demos hinzu, wo die Fehlschläge sich häufen; trainiere neu; miss neu. Die Erfolgsanzeige ist dein Richter.</li>
            <li>Die Checkliste ist das Abschlussprojekt: Arbeite sie von oben nach unten.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "first-demos", text: "Nimm fünf Vorführungen auf und lass die Policy auf zehn frischen Zielen laufen — notiere deine Basis-Erfolgsquote." },
      { id: "find-gap", text: "Finde heraus, wo die Fehlschläge sich häufen (die Abdeckungskarte zeigt demo-arme Regionen)." },
      { id: "close-gap", text: "Nimm fünf weitere Demos gezielt in der schwachen Region auf, trainiere neu und schlage deine Basisquote." },
      { id: "eighty", text: "Erreiche 80 % Erfolgsquote auf frischen Zielen über die ganze Spawn-Zone." },
      { id: "spoil", text: "Nimm absichtlich drei schlampige Demos auf und sieh die Quote fallen — dann lösche sie. Datenqualität ist real; du hast sie jetzt gemessen." },
    ],
  },

  /* ================================================================ */
  "sim-to-real": {
    Theory: () => (
      <>
        <h2>Warum Roboter in Software proben</h2>
        <p>
          Übung am echten Roboter ist in jeder Währung teuer: Stunden pro Versuch, Verschleiß
          pro Sturz, ein Roboter pro Experimentator. Eine Physiksimulation fährt tausende
          Versuche pro Minute, parallel, gratis, und ein abgestürzter simulierter Roboter ist
          beim nächsten Reset ein auferstandener. Modernes Laufen- und Greifen-Training findet
          überwältigend in Simulation statt — anders sind die Millionen Versuche, die Lernen
          braucht, nicht zu bezahlen.
        </p>

        <h2>Die Lücke</h2>
        <p>
          Aber der Simulator ist ein Modell, und Modelle sind im Detail falsch: Echte Reibung
          weicht von modellierter ab, echte Motoren verzögern und sacken, das echte Chassis
          flext, Sensorrauschen hat eine Textur, die kein Zufallsgenerator ganz trifft. Ein in
          Simulation zur Perfektion gestimmter Regler hat effektiv die besonderen Lügen des
          Simulators auswendig gelernt — auf Hardware ausgerollt trifft er andere Lügen und
          stolpert. Diese Leistungsklippe ist die <strong>Sim-to-Real-Lücke</strong>, und sie zu
          schließen ist eine eigene Disziplin.
        </p>

        <h2>Domain Randomization: absichtlich schlampig</h2>
        <p>
          Die kontraintuitive Kur: Mach die Simulation <em>weniger</em> konsistent, nicht
          genauer. Störe die Physik in jeder Trainingsepisode zufällig — Reibung ±30 %, Masse
          ±20 %, Sensorrauschen verdoppelt, Motorkraft verwackelt:
        </p>
        <div className="formula">
          trainiere in vielen falschen Welten → überlebe die eine echte
          <span className="note">Domain Randomization — die echte Welt wird zu „nur einer weiteren Stichprobe“ aus der Trainingsverteilung</span>
        </div>
        <p>
          Eine Policy, die in tausend verschieden-falschen Welten bestehen muss, kann sich auf
          die Eigenheiten keiner einzelnen stützen; sie ist gezwungen, Strategien zu finden, die
          funktionieren, <em>weil sie robust sind</em> — nicht, weil sie die besondere Fiktion
          eines Simulators ausnutzen. Wenn sich die echte Welt dann als eine weitere Stichprobe
          aus der Streuung entpuppt, zuckt die Policy mit den Schultern und liefert. Der Handel
          ist ehrlich: Die Spitzenleistung in jeder einzelnen Welt sinkt; die Leistung in der
          unbekannten Welt — der einzigen, die zählt — steigt steil.
        </p>

        <h2>Der ganze Kurs, in einer Schleife</h2>
        <p>
          Beachte, was die Lücke schloss: kein wahreres Modell, sondern Toleranz für
          Modellfehler — dieselbe Demut, die den Komplementärfilter funktionieren ließ
          (Einheit 2), die Rückkopplung über Open-Loop siegen ließ (Einheit 3), die Hindernisse
          aufblähte, statt perfekten Pfaden zu trauen (Einheit 5). Die tiefste Gewohnheit der
          Robotik ist das Konstruieren für das Etwas-falsch-Liegen. Maschinen, die auf dieser
          Gewohnheit stehen, sind die, die weiterlaufen, wenn die Welt sich weigert, dem
          Datenblatt zu entsprechen — was sie immer, immer tut.
        </p>

        <div className="callout note">
          <span className="co-title">Eine berühmte Hand</span>
          <p>
            Das Ergebnis, das dies zum Kanon machte: Eine Roboterhand, rein in randomisierter
            Simulation trainiert — Schwerkraft, Reibung, sogar das Aussehen pro Episode
            durcheinandergewürfelt — löste beim ersten Hardware-Einsatz einhändig einen
            Zauberwürfel. Der Simulator war nie richtig; er war <em>vielfältig falsch</em>, und
            das genügte.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Realitäts-Check",
      intro: (
        <>
          <p>Stimme einen Wagen-Regler in der Simulation, dann drücke DEPLOY: Er läuft auf einem „echten“ Wagen mit versteckt anderer Physik. Ein Randomisierungs-Schieber variiert die Trainingswelten.</p>
          <ul>
            <li>Randomisierung auf null: Stimme auf perfekte Sim-Punktzahl, deploye — und sieh die Punktzahl abstürzen. Du hast die Lücke getroffen.</li>
            <li>Erhöhe die Randomisierung und stimme neu: Die Sim-Punktzahl fällt, die Deploy-Punktzahl steigt. Finde den Sweet Spot.</li>
            <li>Drücke bei deiner besten Einstellung ein paarmal auf NEUE REALITÄT — Robustheit heißt: Der Deploy-Punktzahl ist egal, welche Realität du bekommst.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Robot Learning stützt sich vor allem auf Simulation, weil…",
        choices: [
          "simulierte Roboter präziser fahren",
          "Lernen Millionen Versuche braucht, und nur Simulation Versuche billig, schnell, parallel und crashfest macht",
          "echte Sensoren keine Trainingsdaten aufzeichnen können",
          "Simulation Sicherheitstests überflüssig macht",
        ],
        answer: 1,
        explain:
          "Stunden pro echtem Versuch gegen tausende simulierte Versuche pro Minute. Die Ökonomie des Versuch-und-Irrtum-Lernens geht auf Hardware allein schlicht nicht auf.",
      },
      {
        q: "Ein Regler mit perfekter Sim-Punktzahl stolpert auf dem echten Roboter, weil er…",
        choices: [
          "zu wenig Rechenleistung an Bord hat",
          "die Motoren verschlissen hat",
          "effektiv die besonderen Ungenauigkeiten des Simulators auswendig gelernt hat, die die Realität nicht teilt",
          "auf zu vielen Versuchen trainiert wurde",
        ],
        answer: 2,
        explain:
          "Hart gegen ein Modell zu optimieren heißt, dessen Eigenheiten auszunutzen. Die Realität hat andere Eigenheiten — die Klippe dazwischen ist die Sim-to-Real-Lücke.",
      },
      {
        q: "Domain Randomization schließt die Lücke, indem sie…",
        choices: [
          "die Parameter des echten Roboters misst und in den Simulator kopiert",
          "den Roboter verlangsamt, bis Physik egal wird",
          "die Simulation in höherer Auflösung fährt",
          "die simulierte Physik jede Episode variiert, sodass nur über viele falsche Welten robuste Strategien das Training überleben",
        ],
        answer: 3,
        explain:
          "Findet jede Probe in einer anders-falschen Welt statt, sind die Lügen keiner einzelnen Welt lernbar. Die echte Welt kommt dann als nur eine weitere Stichprobe aus der Streuung an.",
      },
      {
        q: "Der ehrliche Preis der Domain Randomization ist…",
        choices: [
          "geringere Spitzenleistung in jeder einzelnen Welt, getauscht gegen Leistung in der unbekannten echten",
          "längeres Training ohne weiteren Nachteil",
          "sie funktioniert nur für Radroboter",
          "die Policy läuft nicht mehr in Echtzeit",
        ],
        answer: 0,
        explain:
          "Eine über tausend Welten robuste Policy kann nicht zugleich perfekt auf eine gestimmt sein. Du gibst den Auswendiglern-Bonus auf — der ohnehin Fiktion war — für Transfer, und der ist der Punkt.",
      },
    ],
  },
};
