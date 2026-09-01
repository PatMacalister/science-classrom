import type { LessonContentDe } from "../localize";

/** Full German content for Unit 18 (SDR branch: mixers, iq-signals, digital-modulation, rtl-sdr). */

export const unit18De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  mixers: {
    Theory: () => (
      <>
        <h2>Das Problem, alles abzustimmen</h2>
        <p>
          Dein Empfänger aus Einheit 9 stimmte ab, indem er ein LC-Filter durchs Band schob —
          machbar, aber jede folgende Stufe (Verstärker, Detektoren) muss dann mit{" "}
          <em>jeder Frequenz klarkommen, die du gerade gewählt hast</em>, und scharfe Filter
          sind bei hohen, wandernden Frequenzen schwer zu bauen. Edwin Armstrongs Einsicht von
          1918 dreht das Problem um: <strong>Beweg nicht das Filter — beweg den Sender.</strong>
        </p>

        <h2>Multiplikation verschiebt Frequenzen</h2>
        <p>
          Das Werkzeug ist ein <strong>Mischer</strong>: eine Schaltung, die das ankommende
          Signal mit einem lokal erzeugten Sinus multipliziert (dem{" "}
          <strong>Lokaloszillator</strong>, LO). Eine Trigonometrie-Identität, an die du dich
          vielleicht erinnerst, erledigt den Rest:
        </p>
        <div className="formula">
          sin(f₁)·sin(f₂) = ½cos(f₁−f₂) − ½cos(f₁+f₂)
          <span className="note">multipliziere zwei Töne → ihre Differenz und ihre Summe erscheinen; die Originale verschwinden</span>
        </div>
        <p>
          Ein Sender bei 98,5 MHz, gemischt mit einem LO bei 87,8 MHz, landet also als Kopie
          bei exakt 10,7 MHz — der <strong>Zwischenfrequenz</strong> (ZF, englisch IF). Dreh
          am LO-Knopf, und <em>jeder</em> Sender lässt sich auf dieselbe feste ZF liefern, wo
          ein wunderschön konstruiertes, nie bewegtes Filter (deine Trennschärfe aus 9.2, aber
          einmal und gut gebaut) das ganze Unterscheiden übernimmt. Das ist der{" "}
          <strong>Superhet</strong> (Überlagerungsempfänger) — im Inneren praktisch jedes
          Empfängers des letzten Jahrhunderts, und sein Mischer-und-LO-Frontend lebt in den
          Direktmisch-Chips heutiger Handys weiter. (Kleingedrucktes: Ein zweiter Sender bei
          LO−10,7 landet ebenfalls auf der ZF — die <em>Spiegelfrequenz</em> — weshalb echte
          Empfänger vorn ein grobes Filter ergänzen.)
        </p>
        <div className="callout note">
          <span className="co-title">Und was ändert SDR?</span>
          <p>
            Ein Software Defined Radio behält Mischer und LO in Silizium, ersetzt aber alles
            nach der ZF durch… einen ADC und Code. Abtastung (13.1), Filterung (13.3),
            Demodulation (9.3) — alles Software. Der RTL-SDR-Stick im Abschlussprojekt dieses
            Zweigs ist genau das: ein abstimmbarer Mischer, ein ADC und ein USB-Stecker. Der
            Rest ist dein Laptop.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Beweg den Sender, nicht das Filter",
      intro: (
        <>
          <p>Drei Sender, ein LO-Knopf, ein festes ZF-Fenster bei 10,7 MHz.</p>
          <ul>
            <li>Schieb den LO, bis das Differenzprodukt jedes Senders ins grüne ZF-Fenster fällt.</li>
            <li>Beachte: Jeder Sender braucht einen anderen LO — aber das ZF-Filter bewegt sich nie.</li>
            <li>Sieh die Summenprodukte hoch und harmlos davonfliegen; die ZF akzeptiert nur die Differenzen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Einen 98,5-MHz-Sender mit einem 87,8-MHz-Lokaloszillator zu mischen erzeugt Energie bei…",
        choices: ["nur 93,15 MHz", "10,7 MHz und 186,3 MHz", "nur 87,8 MHz", "nichts — sie löschen sich aus"],
        answer: 1,
        explain: "Differenz (98,5 − 87,8 = 10,7) und Summe (98,5 + 87,8 = 186,3). Die Differenz ist der Preis; die Summe wird weggefiltert.",
      },
      {
        q: "Der Schlüsselvorteil des Superhets ist…",
        choices: [
          "das ganze schwierige Filtern passiert bei einer festen ZF, egal wohin du abstimmst",
          "er braucht keine Antenne",
          "er verstärkt mehr",
          "er läuft ohne Strom",
        ],
        answer: 0,
        explain: "Abstimmen wird zu 'LO drehen'; das Präzisionsfilter wird einmal gebaut, bei einer Frequenz, und bewegt sich nie.",
      },
      {
        q: "Was ersetzt in einem SDR den Großteil des traditionellen Empfängers?",
        choices: [
          "eine größere Antenne",
          "ein Kristallhörer",
          "mehr LC-Filter",
          "ein ADC und Software — Abtastung, Filterung und Demodulation in Code",
        ],
        answer: 3,
        explain: "Mischer + ADC + Code. Die Abtastung und Software-Filter aus Einheit 13 SIND die hintere Hälfte eines modernen Radios.",
      },
      {
        q: "Das Problem der „Spiegelfrequenz“ ist…",
        choices: [
          "Sender, die Bilder ausstrahlen",
          "das Driften des LO",
          "eine zweite Frequenz (auf der anderen LO-Seite), die ebenfalls auf die ZF mischt",
          "Antennenreflexionen",
        ],
        answer: 2,
        explain: "|f − LO| = ZF hat zwei Lösungen. Echte Empfänger setzen ein grobes Vorfilter, damit nur die beabsichtigte überlebt.",
      },
    ],
  },

  /* ================================================================ */
  "iq-signals": {
    Theory: () => (
      <>
        <h2>Ein ADC sieht nur einen Schatten</h2>
        <p>
          Taste ein Signal mit einem einzigen ADC ab, und etwas geht verloren: Ein Sinus im
          Nulldurchgang misst 0, egal ob er steigt oder fällt, schwach ist oder nur im
          falschen Moment erwischt wurde. Amplitude und Phase sind verheddert. Die Lösung —
          und das Fundament jedes modernen Empfängers — ist, das Signal mit <em>zwei</em>{" "}
          LO-Kopien zu mischen, eine um 90° verschoben (eine Viertelperiode), und beide
          Ergebnisse abzutasten: <strong>I</strong> (in-phase) und <strong>Q</strong>{" "}
          (quadrature).
        </p>
        <div className="formula">
          signal ⇄ arrow: length = √(I² + Q²) · angle = atan2(Q, I)
          <span className="note">zwei Zahlen pro Abtastwert machen das Signal zu einem rotierenden Vektor — einem Zeiger, den du wirklich anfassen kannst</span>
        </div>
        <p>
          Stell es dir vor, wie das Labor es zeichnet: ein Pfeil, der in einer Ebene kreist.
          Die <strong>Länge</strong> des Pfeils ist die Augenblicksamplitude; seine{" "}
          <strong>Drehrate</strong> ist der Frequenzversatz zu deinem LO. Jede Modulation, die
          dir begegnet ist, wird jetzt ein geometrisches Verb:
        </p>
        <ul>
          <li><strong>AM</strong> (9.3): Der Pfeil <em>atmet</em> — die Länge trägt das Audio. Demodulation = √(I²+Q²) berechnen. Dein Hüllkurvendetektor, in Arithmetik.</li>
          <li><strong>FM</strong>: Die <em>Drehung des Pfeils wird schneller und langsamer</em> — Demodulation = den Winkel ableiten. (Die Rauschwarnung aus Lektion 13.3 gilt!)</li>
          <li><strong>Phasenmodulation</strong>: Der Pfeil <em>springt</em> zwischen Winkeln — behalte den Gedanken für die nächste Lektion.</li>
        </ul>
        <div className="callout tip">
          <span className="co-title">Warum dein Stick Paare streamt</span>
          <p>
            Ein RTL-SDR liefert genau das: einen Strom von (I, Q)-Paaren, ~2 Millionen pro
            Sekunde. Jedes SDR-Programm — der Wasserfall, die Demodulatoren, die Decoder — ist
            Mathematik auf diesem Strom. Wenn du im Abschlussprojekt UKW auf deinem Laptop
            dekodieren siehst, sind die ersten zwei Operationen buchstäblich die zwei
            Messfelder dieses Labors.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der atmende, kreisende Pfeil",
      intro: (
        <>
          <p>Ein Signal als Zeiger, mit seinen I- und Q-Komponenten darunter im Strom.</p>
          <ul>
            <li>Stetiger Ton: konstante Länge, gleichmäßige Drehung. Ändere Δf — die Drehung folgt.</li>
            <li>AM-Modus: Sieh den Pfeil atmen und das &bdquo;Länge&ldquo;-Messfeld das Audio nachzeichnen.</li>
            <li>FM-Modus: Länge konstant, Drehung wackelnd — und das &bdquo;Rotation&ldquo;-Messfeld singt stattdessen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "I und Q gewinnt man, indem man das Signal mischt mit…",
        choices: [
          "zwei LOs auf verschiedenen Frequenzen",
          "Rechteckwellen",
          "dem Signal selbst",
          "demselben LO, eine Kopie um 90° verschoben",
        ],
        answer: 3,
        explain: "Gleiche Frequenz, Viertelperiode versetzt — wie das Ablesen von Kosinus- und Sinus-'Schatten' des rotierenden Pfeils.",
      },
      {
        q: "Die Augenblicksamplitude eines Signals aus seinen I/Q-Werten ist…",
        choices: ["I + Q", "√(I² + Q²)", "I − Q", "atan2(Q, I)"],
        answer: 1,
        explain: "Die Länge des Pfeils, per Pythagoras. atan2 liefert den Winkel — die andere Hälfte der Geschichte.",
      },
      {
        q: "FM-Demodulation in Software läuft hinaus auf…",
        choices: [
          "die Länge des Pfeils messen",
          "I und Q mitteln",
          "messen, wie schnell sich der Winkel des Pfeils ändert",
          "das Signal quadrieren",
        ],
        answer: 2,
        explain: "Frequenz IST Drehrate. Leite die Phase ab, und das Audio fällt heraus.",
      },
      {
        q: "Warum kann ein ADC nicht erfassen, was zwei (I/Q) können?",
        choices: [
          "eine einzelne Projektion verheddert Amplitude und Phase — der Schatten des Pfeils, nicht der Pfeil",
          "ein ADC ist zu langsam",
          "ADCs gibt es nur paarweise",
          "er kann, mit größerer Antenne",
        ],
        answer: 0,
        explain: "Ein Kanal ist der Schatten des Pfeils auf einer Achse. Zwei senkrechte Schatten rekonstruieren den vollen Vektor.",
      },
    ],
  },

  /* ================================================================ */
  "digital-modulation": {
    Theory: () => (
      <>
        <h2>Von Wellen zu Symbolen</h2>
        <p>
          Analoge Modulation wackelt den Pfeil kontinuierlich. Digitale Modulation ist
          direkter: Der Sender parkt den I/Q-Pfeil auf einer von mehreren{" "}
          <strong>vereinbarten Positionen</strong>, hält ihn kurz dort und springt zur
          nächsten. Jede Position — jedes <strong>Symbol</strong> — kodiert eine Gruppe von
          Bits. Zeichne die Positionen in die I/Q-Ebene, und du bekommst die{" "}
          <strong>Konstellation</strong> des Verfahrens:
        </p>
        <ul>
          <li><strong>BPSK</strong> — zwei Positionen, 180° auseinander. Ein Bit pro Symbol. Nahezu unzerstörbar; benutzt für Raumsonden und GPS.</li>
          <li><strong>QPSK</strong> — vier Ecken, zwei Bits pro Symbol. Das Arbeitspferd.</li>
          <li><strong>16-QAM</strong> und aufwärts — ein 4×4-Raster (oder 64, 256, 1024…): vier+ Bits pro Symbol, Positionen immer enger gepackt.</li>
        </ul>
        <div className="formula">
          denser constellation = more bits/symbol = less room for noise
          <span className="note">dichtere Konstellation = mehr Bits/Symbol = weniger Platz für Rauschen — der Empfänger schnappt jeden verrauschten Punkt zur nächstgelegenen Position; zu viel Rauschen, falscher Schnapp, Bitfehler</span>
        </div>

        <h2>Rauschen macht es zur Wette</h2>
        <p>
          Der Kanal fügt Rauschen hinzu (das Zittern aus 13.3, jetzt zweidimensional) und
          verschmiert jeden empfangenen Punkt zu einer Wolke um seine beabsichtigte Position.
          Der Job des Empfängers ist ein Nächster-Nachbar-Raten. Die zwei Positionen von BPSK
          liegen weit auseinander — riesige Wolken schnappen noch korrekt. Das Raster von
          16-QAM ist eng — mäßiges Rauschen schiebt Punkte über Entscheidungsgrenzen, und Bits
          sterben. Dieser Handel kennt kein Gratisessen, nur Anpassung:{" "}
          <strong>dein WLAN verhandelt seine Konstellation ständig neu</strong> — sprintet mit
          1024-QAM neben dem Router und zieht sich durch zwei Wände auf QPSK zurück. Die
          &bdquo;Balken&ldquo; auf deinem Handy sind, sehr real, ein Konstellationsbericht.
        </p>
        <div className="callout note">
          <span className="co-title">Die fehlende Rüstung</span>
          <p>
            Echte Verbindungen ergänzen fehlerkorrigierende Codes — Zusatzbits aus
            XOR-Arithmetik (die Gatter aus 7.2!), mit denen Empfänger eine Prise falscher
            Schnapper reparieren. Codierungstheorie ist ihr eigener schöner Berg; wisse, dass
            es sie gibt und dass auch sie aus Teilen gebaut ist, die dir gehören.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Konstellations-Casino",
      intro: (
        <>
          <p>Ein Live-Symbolstrom: grüne Punkte korrekt geschnappt, rote ans Rauschen verloren.</p>
          <ul>
            <li>BPSK bei Rauschen 0,2: heiter fehlerfrei. Wechsle zu 16-QAM: Gemetzel.</li>
            <li>Finde den Rauschpegel, bei dem QPSKs Gut-Durchsatz den von 16-QAM überholt.</li>
            <li>Sieh den Handel in Zahlen: Bits/Symbol gegen Fehlerrate — nie ein Gratisessen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein Konstellationsdiagramm zeigt…",
        choices: [
          "Antennenpositionen",
          "die vereinbarten I/Q-Positionen (Symbole), mit denen ein Verfahren Bits kodiert",
          "Sternkarten für Satellitenschüsseln",
          "das Spektrum des Trägers",
        ],
        answer: 1,
        explain: "Jeder Punkt ist ein geparkter Zeiger; jeder trägt log₂(N) Bits. Der Empfänger schnappt verrauschte Ankünfte zum nächstgelegenen.",
      },
      {
        q: "16-QAM trägt wie viele Bits pro Symbol?",
        choices: ["4", "2", "8", "16"],
        answer: 0,
        explain: "16 Positionen = log₂16 = 4 Bits pro Symbol.",
      },
      {
        q: "Warum wird WLAN weit weg vom Router langsamer?",
        choices: [
          "der Router wird müde",
          "Entfernung schrumpft die Bits",
          "schwächeres Signal heißt mehr relatives Rauschen und erzwingt eine dünnere, langsamere Konstellation",
          "wird es nicht — das Tempo ist konstant",
        ],
        answer: 2,
        explain: "Die Verbindung passt sich an: Dichte Konstellationen brauchen saubere Luft. Mehr Rauschen → Rückzug auf weniger Bits/Symbol → weniger Fehler, weniger Tempo.",
      },
      {
        q: "BPSK wird für Raumsonden benutzt, weil…",
        choices: [
          "es das neueste Verfahren ist",
          "der Weltraum QAM verbietet",
          "es keine Antenne braucht",
          "seine zwei weit getrennten Symbole extremes Rauschen überleben",
        ],
        answer: 3,
        explain: "Bei Signalen, milliardenfach kilometerweit geschwächt, ist Robustheit alles. Ein Bit pro Symbol, fast nicht totzukriegen.",
      },
    ],
  },

  /* ================================================================ */
  "rtl-sdr": {
    Theory: () => (
      <>
        <h2>Die Mission</h2>
        <p>
          Steck einen <strong>RTL-SDR</strong>-Stick (ein massengefertigter TV-Tuner-Chip,
          herrlich zweckentfremdet) in einen USB-Port, starte freie Software, und alles, was
          dieser Zweig gelehrt hat, wird sichtbar: Der LO des Superhets ist ein Schieberegler,
          der I/Q-Strom speist einen Live-Wasserfall, und Demodulatoren sind Menüpunkte. Du
          wirst Funk <em>sehen</em>, bevor du ihn hörst — und nach Einheit 9 und diesem Zweig
          verstehst du jedes Pixel.
        </p>

        <h2>Einkaufsliste</h2>
        <table>
          <thead>
            <tr><th>Artikel</th><th>Hinweise</th><th>≈ Kosten</th></tr>
          </thead>
          <tbody>
            <tr><td>RTL-SDR Blog V3 oder V4</td><td>der De-facto-Standard; kauf das Kit mit der Teleskop-Dipolantenne</td><td>35–45 $</td></tr>
            <tr><td>SDR-Software</td><td>SDR++ oder SDRSharp (Windows), kostenlos</td><td>0 $</td></tr>
            <tr><td colSpan={2}><em>Optional:</em> ein USB-Verlängerungskabel — den Stick vom Eigenstörnebel des PCs wegzurücken hilft enorm (Lektion 13.2: schnelle Flanken strahlen!)</td><td>3 $</td></tr>
          </tbody>
        </table>

        <h2>Die Hörkampagne</h2>
        <table>
          <thead>
            <tr><th>Ziel</th><th>Wo</th><th>Was du sehen & hören wirst</th><th>Knüpft an</th></tr>
          </thead>
          <tbody>
            <tr><td>UKW-Rundfunk</td><td>88–108 MHz, Modus WFM</td><td>fette 200-kHz-Streifen; klick einen an, und Musik spielt — FM-Demodulation = die Drehung des Pfeils lesen (18.2)</td><td>9.3, 18.2</td></tr>
            <tr><td>Flugfunk</td><td>118–137 MHz, Modus AM</td><td>Piloten und Tower, in schlichtem AM — deine Hüllkurve aus Einheit 9, lebendig in 2026</td><td>9.3</td></tr>
            <tr><td>ISM-Band</td><td>433,92 MHz</td><td>drück deinen Autoschlüssel / lies einen Wettersensor: kurze digitale Bursts, über den Wasserfall geschmiert</td><td>18.3</td></tr>
            <tr><td>der Rauschteppich selbst</td><td>überall</td><td>Verstärkung rauf/runter und zusehen, wie schwache Signale darin versinken — SNR sichtbar gemacht</td><td>18.3</td></tr>
          </tbody>
        </table>
        <div className="callout warn">
          <span className="co-title">Verantwortungsvoll lauschen</span>
          <p>
            Ein RTL-SDR empfängt nur — senden kann er nicht. Aber die <em>Legalität des
            Zuhörens</em> variiert je nach Land: Rundfunk-, Amateur- und ISM-Bänder sind fast
            überall unbedenklich, während das Abfangen privater Kommunikation vielerorts
            verboten ist (Deutschland etwa ist bei nichtöffentlichen Diensten streng). Kenn
            deine lokalen Regeln; die Rundfunk- und ISM-Ziele oben sind der sichere, endlos
            faszinierende Spielplatz.
          </p>
        </div>

        <h2>Den Wasserfall lesen wie ein Einheimischer</h2>
        <p>
          Breite konstante Streifen: UKW-Stimmen. Schmale flackernde Linien: getastete Träger
          (Morsen lebt auf den Amateurbändern weiter). Plötzliche Breitband-Schmierer:
          digitale Bursts. Regelmäßige Lattenzaun-Muster: die Schaltwandler deines eigenen
          Laptops (10.2), die lecken — jede Rätsellinie auf dem Display ist eine wartende
          Physik-Diagnose, und der Zwilling unten trainiert das Auge, bevor der echte mit der
          Post kommt.
        </p>
        <h3>Wenn es sich danebenbenimmt</h3>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Wahrscheinliche Ursache</th><th>Abhilfe</th></tr>
          </thead>
          <tbody>
            <tr><td>Stick nicht gefunden</td><td>Treiber nicht installiert</td><td>das Treiber-Tool des Herstellers laufen lassen (Zadig unter Windows); neu verbinden</td></tr>
            <tr><td>Alles ist schwach</td><td>Verstärkung zu niedrig / Antenne zu kurz</td><td>RF-Gain in der Software erhöhen; Teleskopelemente ausziehen (~75 cm für UKW)</td></tr>
            <tr><td>Starke Linien alle paar MHz, überall</td><td>die Eigenstörung deines PCs</td><td>USB-Verlängerung, Stick weg von der Maschine</td></tr>
            <tr><td>UKW klingt vermatscht</td><td>falscher Modus oder Bandbreite</td><td>WFM, ~200 kHz für Rundfunk; NFM anderswo</td></tr>
          </tbody>
        </table>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling — der Wasserfall-Trainer",
      intro: (
        <>
          <p>Ein simuliertes Band mit allem, was das echte zeigen wird — lern es zuerst hier zu lesen.</p>
          <ul>
            <li>Stimm über die drei UKW-Streifen und sieh den Empfänger jeden einrasten.</li>
            <li>Park auf 95,2 und lies das Tastmuster der Bake vom Wasserfall ab.</li>
            <li>Lauere auf 106,8, bis ein Schlüsselanhänger-Burst vorbeischmiert — blinzle, und du verpasst ihn.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "order", text: "Einen RTL-SDR bestellt (V3/V4-Kit mit Antenne) und SDR++ oder SDRSharp installiert" },
      { id: "driver", text: "Treiber installiert — der Stick erscheint in der Quellenliste der Software" },
      { id: "first-fm", text: "Einen UKW-Sender auf dem Wasserfall abgestimmt und ihn demodulieren gehört (Modus WFM)" },
      { id: "read", text: "Drei verschiedene Signalformen auf dem Wasserfall identifiziert und benannt, was sie sind" },
      { id: "airband", text: "Ein lebendes AM-Signal gefunden (Flugfunk oder Mittelwelle, falls verfügbar) — die Mathematik aus Einheit 9, auf Sendung" },
      { id: "keyfob", text: "Meinen eigenen Autoschlüssel / Klingel / Wettersensor bei 433 MHz bursten sehen" },
      { id: "gain", text: "Mit dem RF-Gain gespielt und zugesehen, wie schwache Signale aus dem Rauschteppich auftauchen und darin versinken" },
      { id: "noise", text: "Die Störungen meiner eigenen Elektronik auf dem Wasserfall gefunden und den Schuldigen identifiziert" },
      { id: "legal", text: "Geprüft, welche Bänder dort, wo ich lebe, legal zu hören sind" },
      { id: "wonder", text: "Zehn Minuten einfach nur der unsichtbaren Stadt beim Reden zugeschaut. (Pflicht.)" },
    ],
  },
};
