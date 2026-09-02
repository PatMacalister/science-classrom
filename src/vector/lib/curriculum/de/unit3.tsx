import type { LessonContentDe } from "../localize";

export const unit3De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "measure-g": {
    Theory: () => (
      <>
        <h2>Warum ein Pendel g kennt</h2>
        <p>
          Ein schwingendes Gewicht ist das Metronom der Schwerkraft. Zieh es zur Seite, und die
          Gravitation holt es zurück, schießt durch die Mitte hinaus, tauscht endlos Höhe gegen
          Tempo — der Energietausch aus Einheit 2, an einer Schnur. Wie <em>schnell</em> jede
          Schwingung fertig wird, hängt davon ab, wie kräftig die Gravitation zieht — und
          bemerkenswerterweise von fast nichts anderem:
        </p>
        <div className="formula">
          T = 2π·√(L/g)
          <span className="note">T: Zeit für ein volles Hin-und-Zurück · L: Schnurlänge · g: das, was du suchst</span>
        </div>
        <p>
          Nicht in der Formel: die <strong>Masse</strong> (schwerere Gewichte werden stärker
          gezogen, sind aber schwerer zu bewegen — dieselbe Kürzung, die Hammer und Feder
          gemeinsam fallen lässt) und, bei kleinen Ausschlägen, die{" "}
          <strong>Amplitude</strong> (weitere Schwünge reisen weiter, aber schneller; unter ~15°
          gleicht sich der Handel bis auf Bruchteile eines Prozents aus). Galilei soll das an
          einer schwingenden Kathedralenlampe bemerkt haben, getaktet gegen seinen Puls.
        </p>

        <h2>Umgestellt ist es ein g-Messgerät</h2>
        <div className="formula">
          g = 4π²·L / T²
          <span className="note">miss eine Länge und eine Zeit — erhalte die Gravitation eines Planeten</span>
        </div>
        <p>
          Das T² ist dein Genauigkeitshebel und deine Genauigkeitsfalle zugleich: Zeitfehler
          werden quadriert. Die Lösung ist alt und schön — <strong>stoppe zwanzig Schwingungen,
          nicht eine</strong>, und teile durch zwanzig. Dein ±0,2-s-Reaktionsfehler bleibt
          ±0,2 s, verteilt sich aber nun über ~28 s Messung: ein Ein-Prozent-Fehler statt
          zwanzig.
        </p>

        <h2>Was du brauchst</h2>
        <ul>
          <li>Eine <strong>Schnur</strong>, 1 m oder länger — dünn und nicht dehnbar (Schnürsenkel, Küchengarn)</li>
          <li>Ein kleines <strong>schweres Gewicht</strong> — eine Mutter, ein Vorhängeschloss, ein Schlüsselbund</li>
          <li>Ein <strong>Maßband</strong> und die <strong>Stoppuhr</strong> deines Handys</li>
          <li>Einen Aufhängepunkt: Türrahmen, Regalkante, ein Besen über zwei Stuhllehnen</li>
        </ul>

        <h2>Die Technik, die es genau macht</h2>
        <ul>
          <li>Miss L vom Drehpunkt bis zur <em>Mitte</em> des Gewichts — die größte einzelne Fehlerquelle.</li>
          <li>Halte den Ausschlag schmal: eine Handbreit Auslenkung auf einen Meter Schnur.</li>
          <li>Beginne die Zählung bei „null“ (nicht eins!), wenn es einen Umkehrpunkt passiert, und stoppe 20 volle Perioden.</li>
          <li>Wiederhole dreimal; weicht eine Zählung wild ab, hast du dich verzählt — streichen und neu.</li>
        </ul>
        <p>
          Sorgfältig ausgeführt liefern Schnürsenkel und Handy g auf ein bis zwei Prozent an
          9,81 m/s² heran — eine Messung, für die Galilei Jahre getauscht hätte, erledigt vor
          dem Frühstück.
        </p>

        <div className="callout note">
          <span className="co-title">Das war die Uhr der Welt</span>
          <p>
            Von Huygens (1656) bis in die 1930er waren die besten Uhren der Erde Pendel — die
            Formel, die du benutzt, hielt drei Jahrhunderte lang Züge im Takt und fand
            Längengrade. Und weil T von g abhängt, geht eine Pendeluhr auf dem Berg messbar
            nach: Dein Experiment, rückwärts betrieben, ist eine Gravitationsvermessung.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling: Das Pendel",
      intro: (
        <>
          <p>Probe das Experiment, bevor du es in echt machst — und sieh, warum die Regeln zählen.</p>
          <ul>
            <li>Stoppe 20 Schwingungen mit der Bildschirm-Stoppuhr und prüfe dein g gegen den wahren Wert des Reglers.</li>
            <li>Treib die Amplitude über 40° und sieh die Kleinwinkel-Formel zu lügen beginnen.</li>
            <li>Stell Mondgravitation ein: gleiche Schnur, Schwingungen sechsmal… na ja, √6-mal langsamer. T² sieht es.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Dein 1,00-m-Pendel schafft 20 Schwingungen in 40,1 s. Zuerst: Wie groß ist die Periode T, in Sekunden?",
        answer: 2.005,
        unit: "s",
        tolerancePct: 1,
        hint: "Durch die Anzahl teilen.",
        explain: "40,1 ÷ 20 = 2,005 s — und dein Zeitfehler wurde gleich mit durch zwanzig geteilt.",
      },
      {
        prompt: "Berechne nun g = 4π²·L/T² aus L = 1,00 m und T = 2,005 s, in m/s².",
        answer: 9.82,
        unit: "m/s²",
        tolerancePct: 2,
        hint: "4π² ≈ 39,48.",
        explain: "39,48 × 1,00 / 4,02 ≈ 9,82 m/s² — auf ein halbes Prozent am Lehrbuchwert 9,81.",
      },
      {
        prompt: "Ein Pendel auf dem Mond (g = 1,62 m/s²) hat L = 1,00 m. Wie groß ist seine Periode, in Sekunden?",
        answer: 4.94,
        unit: "s",
        tolerancePct: 2,
        hint: "T = 2π√(L/g).",
        explain: "T = 2π√(1/1,62) ≈ 4,94 s — der träge Schwung einer Welt mit einem Sechstel des Zugs.",
      },
    ],
    checklist: [
      { id: "rig", text: "Ein kleines schweres Gewicht an einen Meter oder mehr nicht dehnbarer Schnur gehängt, frei schwingend, ohne irgendwo anzustoßen." },
      { id: "length", text: "L vom Drehpunkt bis zur Mitte des Gewichts gemessen, auf wenige Millimeter genau — und notiert." },
      { id: "predict", text: "Zuerst die Periode mit T = 2π√(L/g) und g = 9,81 vorhergesagt. Der Punkt ist, die Antwort zu kennen, bevor die Natur sie bestätigt." },
      { id: "narrow", text: "Nur eine Handbreit ausgelenkt — bei kleinen Winkeln ist die Formel ehrlich." },
      { id: "twenty", text: "20 volle Hin-und-zurück-Schwingungen gestoppt, Zählung bei NULL an einem Umkehrpunkt begonnen." },
      { id: "repeat", text: "Die 20er-Messung dreimal wiederholt und gemittelt; wild abweichende Zählungen neu gemacht." },
      { id: "compute", text: "g = 4π²L/T² aus dem Mittelwert berechnet — von Hand, Taschenrechner erlaubt, kein Labor nötig." },
      { id: "compare", text: "Mit 9,81 m/s² verglichen, auf wenige Prozent herangekommen — und kann die größte verbleibende Fehlerquelle benennen." },
      { id: "moon", text: "Bonus-Gedankenexperiment beantwortet: Wie verhielte sich derselbe Aufbau auf dem Mond, und warum?" },
    ],
  },
};
