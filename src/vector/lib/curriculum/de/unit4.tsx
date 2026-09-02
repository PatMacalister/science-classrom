import type { LessonContentDe } from "../localize";

export const unit4De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  waves: {
    Theory: () => (
      <>
        <h2>Was wirklich reist</h2>
        <p>
          Wirf einen Kiesel in einen Teich, und Ringe rasen nach außen — aber ein treibender
          Korken wippt nur auf der Stelle. Das Wasser reist nicht; die{" "}
          <strong>Störung</strong> reist, von Nachbar zu Nachbar weitergereicht, und trägt
          Energie ohne Material. Das ist eine Welle — und der Grund, warum dich Brandung
          umwerfen kann, deren Wasser den ganzen Tag draußen blieb, und du eine Stimme hörst,
          deren Luft nie die Lunge der Sprecherin verlassen hat.
        </p>
        <p>Zwei Bauarten:</p>
        <ul>
          <li>
            <strong>Transversal</strong> — das Medium bewegt sich <em>quer</em> zur
            Laufrichtung: ein geschütteltes Seil, Wasserwellen, Licht.
          </li>
          <li>
            <strong>Longitudinal</strong> — das Medium bewegt sich <em>längs</em>, als
            Stauchungen und Dehnungen: eine geschobene Spiralfeder, und — der wichtige Fall —{" "}
            <strong>Schall</strong>, Druckwellen in Luft.
          </li>
        </ul>

        <h2>Drei Zahlen, ein Gesetz</h2>
        <p>
          <strong>Wellenlänge λ</strong> — Meter von Kamm zu Kamm. <strong>Frequenz f</strong> —
          Kämme pro Sekunde, in Hertz. <strong>Tempo v</strong> — wie schnell ein Kamm reist.
          Sie sind aneinander gekettet:
        </p>
        <div className="formula">
          v = f·λ
          <span className="note">Kämme pro Sekunde × Meter pro Kamm = Meter pro Sekunde</span>
        </div>
        <p>
          Der Haken, der dieses Gesetz nützlich macht: <strong>Das Tempo gehört dem Medium,
          nicht der Welle.</strong> Schall macht in Zimmerluft ~343 m/s, ob du flüsterst oder
          schreist, piepst oder grollst. Erhöht eine Quelle also ihre Frequenz, muss die
          Wellenlänge zum Ausgleich schrumpfen — f und λ handeln auf festem Budget. Der
          Kammerton A (440 Hz) reitet auf 78-cm-Wellen; die 60 Hz einer Basstrommel spannen fast
          sechs Meter.
        </p>

        <h2>Ein Vokabular, alles Wellige</h2>
        <p>
          Dieselben drei Zahlen beschreiben Ozeandünung (λ ≈ 100 m, gemächlich), hörbaren Schall
          (17 mm–17 m) und Funk — dein WLAN-Router arbeitet bei 2,4 GHz, λ ≈ 12 cm. Lerne die
          Grammatik einmal, und jedes wellige Phänomen im Rest dieses Kurses — Schall, Licht,
          sogar die Quantenwelt — ist ein neuer Akzent, keine neue Sprache.
        </p>

        <div className="callout note">
          <span className="co-title">Zähl die Sekunden bis zum Gewitter</span>
          <p>
            Das Licht erreicht dich fast sofort; der Donner trottet mit 343 m/s hinterher —
            grob ein Kilometer alle drei Sekunden. Blitz, zählen, durch drei teilen: Kilometer
            bis zum Einschlag. Du betreibst seit deiner Kindheit Wellenphysik.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Wellenmaschine",
      intro: (
        <>
          <p>Ein angetriebenes Seil mit Reglern für Frequenz und Medium — und einer markierten Perle, die die Wahrheit sagt.</p>
          <ul>
            <li>Erhöhe die Frequenz und sieh die Kämme zusammenrücken: v steht fest, also muss λ schrumpfen.</li>
            <li>Wechsle bei gleichem f in ein schnelleres Medium — die Wellenlänge dehnt sich sofort.</li>
            <li>Beobachte die rote Perle: Sie wippt nur. Die Welle reist; das Seil nicht.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Der Kammerton A hat 440 Hz, Schall läuft mit 343 m/s. Wie groß ist seine Wellenlänge, in Metern?",
        answer: 0.78,
        unit: "m",
        tolerancePct: 2,
        hint: "λ = v/f.",
        explain: "343 ÷ 440 ≈ 0,78 m — etwa eine Türbreite pro Schwingung des Tons.",
      },
      {
        prompt: "Der Donner kommt 9 s nach dem Blitz an (v = 343 m/s). Wie weit war der Einschlag entfernt, in Metern?",
        answer: 3087,
        unit: "m",
        tolerancePct: 2,
        hint: "Strecke = Tempo × Zeit.",
        explain: "343 × 9 ≈ 3.087 m — die Zähl-und-durch-drei-Regel, ordentlich gerechnet.",
      },
    ],
    quiz: [
      {
        q: "Ein Korken treibt auf gekräuseltem Wasser. Während die Welle vorbeiläuft, wird der Korken…",
        choices: [
          "mit dem Kamm mitreisen",
          "sinken",
          "auf der Stelle wippen — die Störung reist, das Wasser nicht",
          "gegen die Welle driften",
        ],
        answer: 2,
        explain:
          "Wellen transportieren Energie, kein Medium. Jedes Stück Wasser reicht die Bewegung an den Nachbarn weiter und bleibt daheim.",
      },
      {
        q: "Schall ist eine Longitudinalwelle. Das heißt, die Luft…",
        choices: [
          "schwingt vor und zurück entlang der Laufrichtung des Schalls, als Verdichtungen",
          "schwingt quer zur Laufrichtung",
          "strömt vom Lautsprecher zum Ohr",
          "bewegt sich gar nicht",
        ],
        answer: 0,
        explain:
          "Schall ist eine Parade von Stauchungen und Dehnungen in der Luft. Keine Luft reist vom Mund zum Ohr — nur das Muster.",
      },
      {
        q: "Eine Quelle verdoppelt ihre Frequenz. Im selben Medium wird die Wellenlänge…",
        choices: ["sich verdoppeln", "sich halbieren", "gleich bleiben", "sich vervierfachen"],
        answer: 1,
        explain:
          "v = fλ, und v ist die feste Eigenschaft des Mediums. Doppelt so viele Kämme pro Sekunde heißt halber Abstand zwischen ihnen.",
      },
      {
        q: "Was bestimmt das Tempo einer Welle?",
        choices: [
          "Die Lautstärke der Quelle",
          "Die Frequenz der Quelle",
          "Wie stark die Quelle schüttelt",
          "Das Medium, durch das sie läuft",
        ],
        answer: 3,
        explain:
          "Schreien oder flüstern, 60 Hz oder 6 kHz — in Zimmerluft macht alles ~343 m/s. Wechsle das Medium (Helium, Wasser, Stahl), und das Tempo wechselt.",
      },
    ],
  },

  /* ================================================================ */
  sound: {
    Theory: () => (
      <>
        <h2>Die zwei Regler eines Klangs</h2>
        <p>
          <strong>Tonhöhe ist Frequenz.</strong> Ein junges Ohr spannt grob 20 Hz bis 20.000 Hz
          (die Spitze bröckelt mit Alter und Kopfhörergewohnheiten); ein Klavier läuft von 27,5
          bis 4.186 Hz. Frequenzverdopplung hebt den Ton exakt eine Oktave — Musik ist
          Arithmetik, die dein Ohr gratis erledigt. <strong>Lautstärke ist Amplitude</strong> —
          wie kräftig die Luft gestaucht wird. Ohren verkraften eine so riesige Spanne, dass
          Lautstärke auf der logarithmischen Dezibel-Skala gemessen wird: +10 dB heißt jeweils
          ×10 an Energie. Ein 100-dB-Club liegt nicht „etwas“ über einer 85-dB-Grenze; er hat
          über dreißigfache Leistung.
        </p>

        <h2>Schall braucht Stoff</h2>
        <p>
          Druckwellen brauchen etwas zum Stauchen. Im Vakuum: Stille — die Filmexplosionen sind
          eine Höflichkeit. Und je steifer und leichter die Federn des Mediums, desto schneller
          die Welle: ~343 m/s in Zimmerluft, ~1.480 m/s in Wasser, ~5.000 m/s in Stahl.
          Filmcowboys legen das Ohr an die Schiene, weil der Stahl das Grollen des Zugs lange
          vor der Luft liefert.
        </p>

        <h2>Der Doppler-Effekt</h2>
        <p>
          Eine Sirene fährt vorbei, und die Tonhöhe sackt hörbar ab — <em>iiii-juuu</em>. Die
          Sirene hat sich nie geändert; die Geometrie schon. Auf dich zu jagt die Quelle ihren
          eigenen Wellen teilweise hinterher und packt die Kämme dichter: kürzeres λ, höherer
          Ton. Von dir weg dehnt sie sie. Der Effekt gehört <em>jeder</em> Welle: Radarpistolen
          dopplern Mikrowellen an deinem Auto, Fledermäuse an Motten — und die Rotverschiebung
          der Galaxien, Licht durch Flucht gedehnt, ist der Doppler-Hinweis, dass das Universum
          expandiert.
        </p>

        <h2>Das Experiment: Klatschen an der Wand</h2>
        <p>
          Das Tempo des Schalls ist langsam genug für einen Hof. Stell dich 40+ Meter vor eine
          große flache Wand, klatsche, und das Echo kehrt nach der Rundreise zurück: t = 2d/v —
          bei 50 m etwa 0,29 s. Zu flink, um es <em>einmal</em> gut zu stoppen — also borge den
          Pendeltrick: <strong>Klatsche im Rhythmus deiner eigenen Echos</strong>, sodass jedes
          Klatschen genau auf die Rückkehr des vorigen fällt. Deine Rhythmusperiode ist dann
          exakt die Rundlaufzeit. Stopp 20 Klatscher, teile, und:
        </p>
        <div className="formula">
          v = 2·d / T
          <span className="note">Strecke hin und zurück, durch deine Klatschperiode — rechne mit ~10 % um 343 m/s</span>
        </div>

        <div className="callout note">
          <span className="co-title">Sonar ist dieses Experiment, aufgerüstet</span>
          <p>
            Schiffe, Fledermäuse und Ultraschallgeräte fahren dein Hof-Experiment bei höherer
            Frequenz: Puls senden, Echo stoppen, mit dem bekannten Tempo multiplizieren — fertig
            ist die Entfernung. Du kalibrierst gerade das Lineal, das sie alle benutzen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Sirenen-Vorbeiflug",
      intro: (
        <>
          <p>Eine Schallquelle, die du an einem Zuhörer vorbeifahren kannst — mit ehrlich gezeichneten Wellenfronten.</p>
          <ul>
            <li>Parke die Quelle: perfekte Kreise, stabiler Ton. Jetzt fahr los — sieh die Kreise sich vorn drängen und hinten dehnen.</li>
            <li>Lies die gehörte Frequenz vor und nach der Passage ab; der Abfall ist das iiii-juuu.</li>
            <li>Treib die Quelle Richtung Schallgeschwindigkeit und sieh die Kämme sich zur Wand stapeln.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Du klatschst im Rhythmus deines Echos an einer 43 m entfernten Wand; 20 Klatscher dauern 5,0 s. Welche Schallgeschwindigkeit ergibt das, in m/s? (v = 2d/T)",
        answer: 344,
        unit: "m/s",
        tolerancePct: 2,
        hint: "T = 5,0/20 = 0,25 s pro Rundreise.",
        explain: "v = 2 × 43 / 0,25 = 344 m/s — Hof-Ausrüstung, Lehrbuch-Ergebnis.",
      },
      {
        prompt:
          "Ein Ultraschallpuls im Gewebe (v ≈ 1.540 m/s) kehrt nach 0,0001 s zurück. Wie tief liegt der Reflektor, in Metern?",
        answer: 0.077,
        unit: "m",
        tolerancePct: 3,
        hint: "Die halbe Rundreise.",
        explain: "d = v·t/2 = 1.540 × 0,0001 / 2 = 0,077 m ≈ 7,7 cm — ein Ultraschallbild in einer Multiplikation.",
      },
    ],
    checklist: [
      { id: "site", text: "Eine große flache Wand mit 40+ m freiem Feld davor gefunden (Hallenwand, Scheune, Lagerhaus) und die Entfernung abgeschritten oder gemessen." },
      { id: "predict", text: "Zuerst die Rundlaufzeit vorhergesagt: t = 2d/343. Vor dem Klatschen aufgeschrieben." },
      { id: "single", text: "Einmal geklatscht und das Echo wirklich einzeln gehört — Abstand angepasst, falls es mit dem Klatschen verschwamm." },
      { id: "rhythm", text: "Geübt, im Rhythmus der zurückkehrenden Echos zu klatschen, jedes Klatschen auf dem Echo des vorigen." },
      { id: "time", text: "Das Handy 20 Rhythmus-Klatscher stoppen lassen; dreimal wiederholt und gemittelt." },
      { id: "compute", text: "v = 2d/T aus der mittleren Periode berechnet." },
      { id: "compare", text: "Mit 343 m/s verglichen — bei dieser Ausrüstung zählt ~10 % als Sieg — und den dominanten Fehler benannt." },
      { id: "vary", text: "Bonus: an einem kalten und einem warmen Tag wiederholt, oder abgeschätzt, wie stark allein der Streckenfehler das Ergebnis verschiebt." },
    ],
    quiz: [
      {
        q: "Was bestimmt die Frequenz einer Schallwelle?",
        choices: ["Ihre Lautstärke", "Ihre Tonhöhe", "Ihr Tempo", "Ihre Richtung"],
        answer: 1,
        explain: "Tonhöhe ist Frequenz; Lautstärke ist Amplitude. Das Tempo gehört dem Medium und schert sich um beides nicht.",
      },
      {
        q: "Warum sackt die Tonhöhe einer Sirene ab, wenn sie an dir vorbeifährt?",
        choices: [
          "Der Fahrer dreht sie leiser",
          "Ihr geht die Energie aus",
          "Im Anflug sind die Kämme dichter gepackt (höheres f); im Wegflug gedehnt (tieferes f)",
          "Echos stören sie",
        ],
        answer: 2,
        explain:
          "Die Quelle jagt im Anflug ihren eigenen Wellen nach und flieht im Wegflug vor ihnen. Die Sirene blieb gleich — deine Seite der Geometrie nicht.",
      },
      {
        q: "Warum gibt es im All keinen Schall?",
        choices: [
          "Es ist zu kalt",
          "Schall ist zu langsam, um Planeten zu verlassen",
          "Das All absorbiert alle Frequenzen",
          "Schall ist eine Druckwelle — ohne etwas zum Stauchen gibt es keine Welle",
        ],
        answer: 3,
        explain: "Kein Medium, keine Verdichtungen. Licht durchquert Vakuum mühelos (Thema der nächsten Einheit); Schall kann es nicht.",
      },
      {
        q: "Warum klatscht man im Echo-Experiment im Rhythmus der Echos, statt ein einzelnes Echo zu stoppen?",
        choices: [
          "Ein 0,3-s-Intervall ist einzeln hoffnungslos zu stoppen, aber zwanzig davon strecken den Fehler über Sekunden",
          "Der Rhythmus macht das Echo lauter",
          "Einzelne Echos reisen mit anderem Tempo",
          "Nur zum Spaß",
        ],
        answer: 0,
        explain:
          "Wieder der Pendeltrick: Viele Perioden ansammeln, damit dein fester Reaktionsfehler zum kleinen Bruchteil wird. Gutes Messen ist vor allem Fehlermanagement.",
      },
      {
        q: "Jede +10 dB Lautstärke bedeuten…",
        choices: ["10 % mehr Energie", "doppelte Energie", "zehnfache Energie", "10 m/s schnelleren Schall"],
        answer: 2,
        explain:
          "Dezibel sind logarithmisch, weil Ohren eine billionenfache Spanne abdecken. +30 dB sind ×1.000 Leistung — darum zählen Gehörschutz-Grenzwerte.",
      },
    ],
  },

  /* ================================================================ */
  interference: {
    Theory: () => (
      <>
        <h2>Superposition: die Additionsregel</h2>
        <p>
          Besetzen zwei Wellen denselben Ort, macht das Medium beide Bewegungen zugleich: Die
          Auslenkungen <strong>addieren sich, mit Vorzeichen</strong>. Kamm trifft Kamm —
          doppelte Höhe (<strong>konstruktiv</strong>). Kamm trifft gleich großes Tal — flaches
          Nichts (<strong>destruktiv</strong>): Zwei Klänge können sich wahrhaftig zu Stille
          summieren. Danach laufen sie unverändert durcheinander hindurch, als hätte das Treffen
          nie stattgefunden. Teilchen kollidieren; Wellen durchdringen sich. Das ist{" "}
          <em>der</em> Verhaltenstest auf Wellennatur — merk ihn dir für die Quanten-Einheit.
        </p>
        <p>
          Noise-Cancelling-Kopfhörer sind destruktive Interferenz als Produkt: Ein Mikrofon
          misst den ankommenden Lärm, und der Lautsprecher spielt sein Spiegelbild — Tal auf
          Kamm, an deinem Trommelfell.
        </p>

        <h2>Stehende Wellen: Interferenz mit dir selbst</h2>
        <p>
          Schüttle ein am fernen Ende fixiertes Seil, und deine Welle reflektiert und läuft
          durch die auslaufende zurück. Bei den meisten Schüttelraten mittelt sich das Chaos
          weg — aber bei besonderen Frequenzen verstärken sich die beiden Züge zu einer{" "}
          <strong>stehenden Welle</strong>: feste <strong>Knoten</strong>, die sich nie bewegen,
          dicke <strong>Bäuche</strong>, die pumpen, und gar kein sichtbares Reisen mehr.
        </p>
        <p>
          Die Bedingung ist Geometrie: Wellen passen auf eine Saite der Länge L nur, wenn eine
          ganze Zahl halber Wellenlängen sie überspannt —
        </p>
        <div className="formula">
          λₙ = 2L/n &nbsp;·&nbsp; fₙ = n·f₁
          <span className="note">eine Resonanzfamilie: der Grundton und seine ganzzahligen Harmonischen</span>
        </div>

        <h2>Warum Instrumente Töne haben</h2>
        <p>
          Eine Gitarrensaite kann nur ihre Resonanzfamilie halten — zupfe sie, und alles andere
          löscht sich binnen Millisekunden selbst aus. Übrig bleiben der Grundton (die Tonhöhe)
          plus ein Cocktail von Harmonischen, deren Mischung die <strong>Klangfarbe</strong>{" "}
          ist: warum Gitarre und Klavier beim selben A verschieden klingen. Greifen verkürzt L
          und stimmt die ganze Familie um; Blasinstrumente machen dasselbe mit resonierenden
          Luftsäulen. Jede je gespielte Melodie ist angewandte Interferenz.
        </p>
        <p>
          Auch zwei <em>leicht</em> verstimmte Quellen interferieren — sie driften im Takt ihrer
          Differenzfrequenz in den Gleichschritt und wieder heraus. Das langsame{" "}
          <strong>Wah-wah-wah</strong> der <strong>Schwebungen</strong> ist das Stimmgerät der
          Streicher: nachstimmen, bis das Pulsieren auf null erlahmt und die Frequenzen gleich
          sind.
        </p>

        <div className="callout note">
          <span className="co-title">Auch Räume haben Töne</span>
          <p>
            Eine Duschkabine ist ein Resonator, und ihre Familie stehender Wellen ist der Grund,
            warum dein Gesang dort plötzlich voll klingt — du hast zufällig eine Mode getroffen.
            Konzertsaal-Akustiker verbringen Karrieren damit, keiner einzelnen Note diesen
            Gefallen zu tun.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Familie der Saite",
      intro: (
        <>
          <p>Eine angetriebene Saite mit Frequenzregler — die meisten Einstellungen machen Chaos, ein paar machen Magie.</p>
          <ul>
            <li>Fahre die Frequenz langsam hoch: Sieh Chaos beim Grundton in eine saubere stehende Welle einrasten.</li>
            <li>Weiter: Die Harmonischen erscheinen exakt bei 2×, 3×, 4× — zähl jedes Mal die Bäuche.</li>
            <li>Verkürze die Saite und sieh die ganze Familie hinaufrücken — das ist Greifen auf der Gitarre.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Eine 0,65-m-Gitarrensaite klingt mit einem Grundton von 110 Hz. Welche Frequenz hat ihre 3. Harmonische, in Hz?",
        answer: 330,
        unit: "Hz",
        hint: "fₙ = n·f₁.",
        explain: "3 × 110 = 330 Hz. Die harmonische Familie sind schlicht die ganzzahligen Vielfachen — die Gratis-Arithmetik der Musik.",
      },
      {
        prompt: "Zwei Gitarrensaiten klingen zusammen mit 440 Hz und 444 Hz. Wie viele Schwebungen pro Sekunde hörst du?",
        answer: 4,
        unit: "Schwebungen/s",
        hint: "Schwebungsfrequenz = die Differenz.",
        explain: "444 − 440 = 4 Wah-wahs pro Sekunde. Stimme, bis sie verschwinden, und die Saiten sind sich exakt einig.",
      },
    ],
    quiz: [
      {
        q: "Ein Kamm der einen Welle trifft ein gleich großes Tal der anderen. Das Medium dort…",
        choices: [
          "bewegt sich doppelt so stark",
          "bewegt sich mit dem Mittelwert",
          "ist momentan flach — die Auslenkungen heben sich auf",
          "reflektiert beide Wellen",
        ],
        answer: 2,
        explain:
          "Superposition addiert mit Vorzeichen: +1 und −1 geben 0. Zwei Klänge können sich zu Stille summieren — Noise-Cancelling verkauft genau das.",
      },
      {
        q: "Was ist ein Knoten einer stehenden Welle?",
        choices: [
          "Ein Punkt, der sich nie bewegt — die beiden Wellenzüge löschen sich dort dauerhaft",
          "Der Punkt maximaler Bewegung",
          "Wo die Welle das Tempo wechselt",
          "Nur das fixierte Ende",
        ],
        answer: 0,
        explain: "Auslaufende und reflektierte Welle löschen sich an den Knoten dauerhaft und verstärken sich in den Bäuchen dazwischen.",
      },
      {
        q: "Warum erzeugt eine Gitarrensaite einen bestimmten Ton statt aller Frequenzen zugleich?",
        choices: [
          "Das Plektrum wählt eine Frequenz aus",
          "Nur Wellenlängen, die zur Saitenlänge passen, überleben; alles andere löscht sich selbst",
          "Die Luft filtert die falschen Frequenzen heraus",
          "Saiten können grundsätzlich nur mit einer Frequenz schwingen",
        ],
        answer: 1,
        explain:
          "Die Saitenenden erzwingen Knoten, also besteht nur die Familie λ = 2L/n. Der Grundton gibt die Tonhöhe; die Harmonischen-Mischung die Klangfarbe.",
      },
      {
        q: "Zwei Saiten mit 440 und 442 Hz zusammen gespielt erzeugen…",
        choices: [
          "einen stabilen 441-Hz-Ton",
          "Stille",
          "eine Oktave",
          "einen Ton, der zweimal pro Sekunde in der Lautstärke pulsiert — Schwebungen",
        ],
        answer: 3,
        explain:
          "Fast gleiche Wellen driften im Takt ihrer Differenzfrequenz in den Gleichschritt und heraus. Stimmende hören auf das Ersterben des Pulsierens.",
      },
    ],
  },
};
