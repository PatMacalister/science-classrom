import type { LessonContentDe } from "../localize";

/** Full German content for Unit 13 (sampling, spectrum, digital-filters). */

export const unit13De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  sampling: {
    Theory: () => (
      <>
        <h2>Vom Kontinuierlichen zum Schnappschuss</h2>
        <p>
          Lektion 11.2 zerhackte die <em>Spannung</em> in Stufen; diese Lektion zerhackt die{" "}
          <em>Zeit</em>. Ein ADC beobachtet ein Signal nicht — er wirft Blicke darauf,
          f<sub>s</sub>-mal pro Sekunde, und zwischen den Blicken weiß er nichts. Die Frage,
          die Digital-Audio, Digitalfunk und Digital-alles begründet hat: Wie oft musst du
          blicken, um das Signal wirklich zu kennen?
        </p>
        <div className="formula">
          f_s ≥ 2 · f_max
          <span className="note">das Nyquist-Shannon-Theorem: mindestens zwei Abtastwerte pro Zyklus der schnellsten Komponente</span>
        </div>
        <p>
          Taste mindestens zweimal pro Zyklus ab, und — erstaunlich — die Abtastwerte enthalten{" "}
          <em>alles</em>: Die Originalwelle lässt sich perfekt rekonstruieren, nicht bloß
          ungefähr. Darum wurde 44,1 kHz der CD-Standard: bequem das Doppelte der
          20-kHz-Grenze menschlichen Hörens.
        </p>

        <h2>Aliasing: die selbstbewusste Lüge</h2>
        <p>
          Brich die Regel, und etwas Schlimmeres als Unschärfe passiert. Eine 900-Hz-Welle, mit
          1000 Hz abgetastet, liefert Werte, die <em>exakt</em> auf einem 100-Hz-Sinus liegen.
          Kein Rauschen — ein sauberes, plausibles, komplett erfundenes Signal. Das ist{" "}
          <strong>Aliasing</strong>, und du kennst es dein Leben lang: Wagenräder, die sich im
          Film rückwärts drehen (24 Bilder/s untertasten die Speichen), Hubschrauberrotoren,
          die im Video einfrieren. Die scheinbare Frequenz klappt herunter wie eine Spiegelung:
        </p>
        <div className="formula">
          f_apparent = |f − k·f_s|
          <span className="note">für dasjenige ganzzahlige k, das das Ergebnis unter f_s/2 bringt — die &bdquo;Spiegel&ldquo;-Frequenz</span>
        </div>
        <p>
          Das Gemeine daran: Einmal aliast, ist der Schaden unerkennbar und unumkehrbar — das
          100-Hz-Phantom ist von einem echten 100-Hz-Signal nicht zu unterscheiden. Die
          Verteidigung muss <em>vor</em> der Abtastung stehen: ein analoger{" "}
          <strong>Anti-Aliasing-Tiefpass</strong> (Lektion 5.3, zum Wachdienst befördert)
          entfernt alles über f<sub>s</sub>/2, sodass nichts mehr übrig ist, das spiegeln
          könnte. Jeder ernsthafte ADC-Eingang hat einen.
        </p>
        <div className="callout note">
          <span className="co-title">Merk dir das fürs Abschlussprojekt</span>
          <p>
            Dein Pico-Oszilloskop wird mit einer Rate abtasten, die <em>du</em> wählst. Richte
            es mit zu kleinem f<sub>s</sub> auf den 1,4-kHz-PWM-Dimmer, und dir begegnet eine
            langsame, würdevolle Phantomwelle, die es nicht gibt. Jetzt kennst du ihren Namen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Wagenrad",
      intro: (
        <>
          <p>Ein Signal, eine Abtastrate, und die Welle, an die die Abtastwerte glauben.</p>
          <ul>
            <li>Halte fs über 2f: Die Rekonstruktion (grün) sitzt auf der Wahrheit.</li>
            <li>Setze f = 900 Hz, fs = 1000 Hz: ein 100-Hz-Phantom, in Rot gezeichnet.</li>
            <li>Finde die unheimlichste Einstellung: f exakt gleich fs — die Abtastwerte sehen Gleichspannung.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Du willst Audio mit Frequenzen bis 8 kHz treu digitalisieren. Minimale Abtastrate?",
        answer: 16000,
        unit: "Hz",
        hint: "Nyquist: fs ≥ 2 · f_max.",
        explain: "2 × 8 kHz = 16 kHz — Telefonqualität nutzt genau das.",
      },
      {
        prompt: "Ein 1,3-kHz-Ton wird mit 1 kHz abgetastet. Bei welcher Frequenz erscheint sein Alias?",
        answer: 300,
        unit: "Hz",
        hint: "Spiegeln: |f − k·fs| für das k, das unter fs/2 landet.",
        explain: "|1300 − 1000| = 300 Hz — ein Phantom bei einem Fünftel der Wahrheit.",
      },
      {
        prompt: "Ein 60-Hz-Netzbrummen streut in einen Sensor ein, der mit 50 Abtastwerten/s läuft. Wo taucht es auf?",
        answer: 10,
        unit: "Hz",
        hint: "Dieselbe Spiegelung, bescheidenere Zahlen.",
        explain: "|60 − 50| = 10 Hz — langsam genug, um wie ein echtes driftendes Signal auszusehen. Klassische Laborfalle.",
      },
    ],
    quiz: [
      {
        q: "Um ein 5-kHz-Signal treu zu erfassen, musst du mindestens abtasten mit…",
        choices: ["10 kHz", "5 kHz", "2,5 kHz", "50 kHz"],
        answer: 0,
        explain: "Nyquist: fs ≥ 2·fmax = 10 kHz — mindestens zwei Abtastwerte pro Zyklus.",
      },
      {
        q: "Ein 900-Hz-Ton, mit 1000 Hz abgetastet, erscheint als…",
        choices: ["900 Hz", "450 Hz", "100 Hz", "Stille"],
        answer: 2,
        explain: "Er spiegelt: |900 − 1000| = 100 Hz — ein sauberes, erfundenes Alias.",
      },
      {
        q: "Warum muss das Anti-Aliasing-Filter VOR dem ADC sitzen?",
        choices: [
          "Digitale Filter sind zu langsam",
          "Nach der Abtastung ist ein Alias von einem echten Signal nicht zu unterscheiden — die Information ist bereits verdorben",
          "ADCs nehmen durch hohe Frequenzen Schaden",
          "Muss es nicht — Software kann das immer reparieren",
        ],
        answer: 1,
        explain:
          "Einmal gespiegelt sieht das Phantom wie ein völlig gültiges Signal aus. Kein Algorithmus kann wissen, dass es nicht echt war. Nur analoges Filtern davor verhindert das.",
      },
      {
        q: "Rückwärtsdrehende Wagenräder in alten Filmen sind ein Beispiel für…",
        choices: [
          "Linsenverzerrung der Kamera",
          "magnetische Störungen",
          "verkehrt eingelegte Filmrollen",
          "Aliasing — 24 Bilder/s untertasten die Speichenrotation",
        ],
        answer: 3,
        explain: "Die Bildrate blickt zu selten auf die Speichen, und die Spiegelung erzeugt langsame (sogar negative) Scheinrotation.",
      },
    ],
  },

  /* ================================================================ */
  spectrum: {
    Theory: () => (
      <>
        <h2>Die kühnste Behauptung der Ingenieursmathematik</h2>
        <p>
          1807 behauptete Joseph Fourier, dass <em>jede</em> sich wiederholende Wellenform —
          Rechteck, Sägezahn, ein Geigenton, deine Stimme — eine Summe reiner Sinuswellen ist:
          eine <strong>Grundschwingung</strong> bei der Wiederholrate plus{" "}
          <strong>Harmonische</strong> bei exakten ganzzahligen Vielfachen. Das
          Gutachtergremium (Lagrange eingeschlossen) glaubte ihm nicht ganz. Er hatte recht,
          und die Konsequenzen betreiben jede Technologie, die ein Signal berührt.
        </p>
        <div className="formula">
          wave = a₁·sin(2πf·t) + a₂·sin(2π·2f·t) + a₃·sin(2π·3f·t) + …
          <span className="note">die Liste der Amplituden (a₁, a₂, a₃ …) ist das Spektrum der Welle — ihr Rezept</span>
        </div>
        <p>
          Die klassischen Rezepte lohnt es auf einen Blick zu erkennen: Ein{" "}
          <strong>Rechteck</strong> besteht aus ungeraden Harmonischen, die mit 1/k abklingen
          (1, ⅓, ⅕, …); ein <strong>Dreieck</strong> aus ungeraden Harmonischen, die viel
          schneller sterben (1/k²) — darum klingt es mild und das Rechteck schnarrend; ein{" "}
          <strong>Sägezahn</strong> enthält <em>jede</em> Harmonische — der frechste von allen,
          und der Grund, warum er Synthesizer-Bässe antreibt.
        </p>

        <h2>Zwei Ansichten, ein Signal</h2>
        <p>
          Die Oszilloskop-Ansicht (Spannung über Zeit) und die Spektrum-Ansicht (Amplitude über
          Frequenz) sind dieselbe Information, anders dargestellt — und viele Probleme sind nur
          in einer davon leicht. Warum macht ein Tiefpass aus einem Rechteck einen Sinus?
          Zeit-Ansicht: rätselhafte Rundung. Frequenz-Ansicht: offensichtlich — das Filter hat
          die Harmonischen gefressen und die Grundschwingung stehenlassen. Warum braucht dein
          1,4-kHz-PWM ein Filter, um sauberes DC zu werden (10.2)? Sein Spektrum ist ein
          DC-Term plus Harmonische von 1,4 kHz; das LC-Filter behält das DC und kippt den Rest
          weg.
        </p>
        <p>
          Scharfe Kanten sind das Verräterische: <strong>Schnelle Übergänge verlangen hohe
          Harmonische</strong>. Ein knackiges Rechteck braucht Frequenzanteile weit über seiner
          Wiederholrate — darum strahlen Digitalsignale Störungen ab (jede Flanke ist eine
          kleine Rundfunksendung), und darum meint Nyquists f<sub>max</sub> aus der letzten
          Lektion die höchste <em>Harmonische</em>, nicht die Wiederholrate.
        </p>
        <div className="callout tip">
          <span className="co-title">Die FFT</span>
          <p>
            Computer extrahieren Spektren mit der schnellen Fourier-Transformation — wohl dem
            wichtigsten Algorithmus, der je geschrieben wurde. Dein Handy rechnet Tausende pro
            Sekunde: WLAN, Telefonate, Musik-Apps mit Spektrumanzeige. Jede einzelne ist
            Fouriers Idee von 1807, bei Gigahertz.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Wellenküche",
      intro: (
        <>
          <p>Bau die klassischen Wellenformen Sinus für Sinus, Rezept rechts.</p>
          <ul>
            <li>Rechteck mit 1 Harmonischen: nur ein Sinus. Mit 25: knackige Schultern. Sieh es konvergieren.</li>
            <li>Wechsel zum Dreieck — beachte, wie wenige Harmonische es braucht (1/k² stirbt schnell).</li>
            <li>Sägezahn: Jeder Balken im Spektrum leuchtet. Daher das Schnarren.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein 100-Hz-Rechteck enthält Energie bei…",
        choices: [
          "nur 100 Hz",
          "100, 200, 300, 400 Hz…",
          "100, 300, 500, 700 Hz… (ungerade Harmonische)",
          "allen Frequenzen unter 100 Hz",
        ],
        answer: 2,
        explain: "Rechteck = ungerade Harmonische mit 1/k-Amplituden. Die geraden heben sich aus Symmetrie auf.",
      },
      {
        q: "Ein Tiefpass macht aus einem Rechteck fast einen Sinus, weil…",
        choices: [
          "er die Harmonischen entfernt und vor allem die Grundschwingung übrig lässt",
          "er die Elektronen verlangsamt",
          "er neue Frequenzen hinzufügt",
          "er die Phase invertiert",
        ],
        answer: 0,
        explain: "In der Frequenz-Ansicht verschwindet das Rätsel: keine Harmonischen, keine Kanten — nur der Grundsinus.",
      },
      {
        q: "Scharfe, schnelle Kanten in einer Wellenform bedeuten…",
        choices: [
          "das Signal ist digital und hat kein Spektrum",
          "nur tieffrequenten Inhalt",
          "einen DC-Versatz",
          "starken hochfrequenten Harmonischen-Anteil",
        ],
        answer: 3,
        explain:
          "Schnelligkeit in der Zeit = Ausdehnung in der Frequenz. Darum strahlen knackige Digitalflanken Störungen ab, und darum zählt für Nyquist die höchste Harmonische.",
      },
      {
        q: "Das Spektrum eines Signals ist…",
        choices: [
          "seine Farbe",
          "die Liste der Sinus-Amplituden je Frequenz, aus denen es besteht",
          "sein Effektivwert über die Zeit",
          "dasselbe wie seine Hüllkurve",
        ],
        answer: 1,
        explain: "Zeit-Ansicht und Frequenz-Ansicht tragen identische Information — das Spektrum ist die Rezeptkarte.",
      },
    ],
  },

  /* ================================================================ */
  "digital-filters": {
    Theory: () => (
      <>
        <h2>Der Kondensator, diskretisiert</h2>
        <p>
          Erinnere dich an das RC-Ladegesetz (2.3): Die Kondensatorspannung bewegt sich auf den
          Eingang zu, mit einer Rate, die davon abhängt, wie weit sie entfernt ist. Schreib das
          für abgetastete Daten, und du bekommst den{" "}
          <strong>exponentiellen gleitenden Mittelwert</strong> (EMA):
        </p>
        <div className="formula">
          y = y + α · (x − y)
          <span className="note">x = neuer Abtastwert, y = gefilterter Wert · kleines α = großer &bdquo;Kondensator&ldquo; · τ ≈ T_sample/α</span>
        </div>
        <p>
          Diese eine Zeile <em>ist</em> ein RC-Tiefpass — dieselbe exponentielle
          Sprungantwort, derselbe Abfall mit −6 dB/Oktave, alles gleich — nur sind sein
          &bdquo;R&ldquo; und &bdquo;C&ldquo; eine Zahl, die du im laufenden System ändern
          kannst. Jede geglättete Sensoranzeige, jede &bdquo;smoothed&ldquo; Spielstatistik,
          jede Thermostatanzeige rechnet so etwas.
        </p>

        <h2>Der gleitende Mittelwert — und der ewige Handel</h2>
        <p>
          Sein Geschwister mittelt schlicht die letzten N Abtastwerte. Großartige
          Rauschglättung, mit einer Eigenheit: Es ist blind für jedes periodische Signal,
          dessen Zyklus exakt ins Fenster passt (der N-Werte-Mittelwert eines vollen Zyklus ist
          null — eine Kerbe!). Ingenieure nutzen das aus: Mittele über exakt einen Netzzyklus,
          und das 50-Hz-Brummen verschwindet aus deiner Messung.
        </p>
        <p>
          Beide Filter verlangen den Zoll, der dir nun dreimal begegnet ist: das Detektor-RC
          (9.3), die Phasennacheilung des Analogfilters (5.3), und hier —{" "}
          <strong>Glätte kostet Verzögerung</strong>. Filtere hart, und dein Nachtlicht
          antwortet träge; filtere leicht, und es zittert. Es gibt kein kostenloses Glätten,
          nur einen gut gewählten Handel.
        </p>

        <h2>Warum Software-Filter den Krieg gewannen</h2>
        <ul>
          <li>Zur Laufzeit umstimmbar — stell dir vor, du müsstest bei jeder Wetteränderung einen Kondensator umlöten.</li>
          <li>Perfekt reproduzierbar — keine Toleranzwolke (15.1 zeigt, was Wolken kosten).</li>
          <li>Formen, die RC nie könnte: scharfe Brickwalls, Kerben, Matched-Filter — Ketten dieser Einzeiler.</li>
          <li>Aber: Sie existieren nur <em>nach</em> dem ADC — das Anti-Aliasing-Filter davor muss für immer analog bleiben (das Gesetz aus 13.1).</li>
        </ul>
        <div className="callout note">
          <span className="co-title">Die professionelle Arbeitsteilung</span>
          <p>
            Modernes Design packt das minimal nötige analoge Filtern für Ehrlichkeit
            (Anti-Aliasing) in Hardware und allen Charakter in Software. Dein
            Abschluss-Oszilloskop und jedes digitale Oszilloskop der Erde folgen genau dieser
            Teilung.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Einzeilen-Filter",
      intro: (
        <>
          <p>Ein rauschender Sensor, live gefiltert von Code, den du im Lauf umstimmen kannst.</p>
          <ul>
            <li>EMA mit α = 0,5, dann 0,05: Sieh das Rauschen sterben und die Verzögerung wachsen.</li>
            <li>Injiziere einen Sprung und miss die Reaktionszeit bei jeder Einstellung.</li>
            <li>Gleitender Mittelwert mit großem Fenster: spiegelglatt, gletscherlangsam. Wähl deinen Handel.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Der Code y += α(x − y) implementiert…",
        choices: [
          "einen Tiefpass — das RC-Ladegesetz in diskreter Zeit",
          "einen Hochpass",
          "einen Verstärker",
          "einen Oszillator",
        ],
        answer: 0,
        explain: "Er bewegt y proportional zur Distanz auf x zu — exakt die exponentielle Annäherung des Kondensators aus 2.3.",
      },
      {
        q: "α kleiner machen (oder das Mittelungsfenster größer)…",
        choices: [
          "ändert nur die Amplitude",
          "glättet mehr und reagiert schneller",
          "glättet mehr, reagiert aber langsamer",
          "verursacht Aliasing",
        ],
        answer: 2,
        explain: "Der universelle Handel: größeres effektives τ = ruhigerer Ausgang = spätere Reaktion. Wie jedes RC, das dir begegnet ist.",
      },
      {
        q: "Ein Filter muss immer analoge Hardware bleiben:",
        choices: [
          "der Klangregler",
          "keines — Software kann alles",
          "die Glättung nach dem DAC",
          "das Anti-Aliasing-Filter vor dem ADC",
        ],
        answer: 3,
        explain: "Aliasing verdirbt die Daten im Moment der Abtastung; kein späterer Code macht das rückgängig. Der Wächter muss vor dem Tor stehen.",
      },
      {
        q: "Über exakt einen 50-Hz-Netzzyklus zu mitteln ist beliebt, weil…",
        choices: [
          "es das Signal verdoppelt",
          "ein voller Zyklus sich zu null mittelt — das Brummen wird aus der Messung gekerbt",
          "es die Abtastrate halbiert",
          "Netzstrom Gleichstrom ist",
        ],
        answer: 1,
        explain: "Der gleitende Mittelwert hat Kerben bei Frequenzen, deren Periode exakt ins Fenster passt — kostenlose Brummunterdrückung, in jedem Multimeter.",
      },
    ],
  },
};
