import type { LessonContentDe } from "../localize";

/**
 * Full German content for Unit 9 (resonance & radio): theory JSX,
 * quizzes (same answer indices as English!) and lab titles/intros.
 * Lab components themselves are shared — canvas labels stay English for now.
 */

export const unit9De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "lc-resonance": {
    Theory: () => (
      <>
        <h2>Das elektrische Pendel</h2>
        <p>
          Beide Mitspieler kennst du schon. Ein Kondensator speichert Energie in seinem
          elektrischen Feld (2.3); eine Spule speichert sie in einem Magnetfeld (2.4).
          Verbinde beide zu einer Schleife — einem <strong>Schwingkreis</strong> —, lade den
          Kondensator auf und lass los. Der Kondensator drückt Strom durch die Spule; das Feld
          der Spule baut sich auf; ist der Kondensator leer, <em>weigert sich</em> die Spule zu
          stoppen (Spulen hassen Änderungen!) und drückt weiter, sodass sich der Kondensator
          andersherum auflädt. Dann kehrt sich der ganze Tanz um. Spannung und Strom wechseln
          sich um 90° versetzt in der Führung ab, genau wie ein Pendel Höhe gegen
          Geschwindigkeit tauscht.
        </p>
        <div className="formula">
          f₀ = 1 / (2π·√(L·C))
          <span className="note">die Eigenfrequenz (Resonanzfrequenz) — größeres L oder C, tieferer Ton</span>
        </div>
        <p>
          Das ist keine Metapher — es ist mathematisch <em>dieselbe Gleichung</em> wie die
          einer Masse an einer Feder. Physiker nennen jedes solche System einen harmonischen
          Oszillator; du hast soeben den elektrischen gebaut.
        </p>

        <h2>Q: Wie rein klingt die Glocke?</h2>
        <p>
          Reale Schleifen haben Widerstand, und jedes Hin- und Herschwappen verliert ein wenig
          Energie als Wärme — die Schwingung klingt also ab. Die <strong>Güte Q</strong> zählt
          grob, wie oft der Schwingkreis klingelt, bevor er verstummt (genauer: Q ≈ √(L/C)/R
          für eine Serienschleife). Ein Schwingkreis mit hoher Güte ist eine Stimmgabel: einmal
          angeschlagen, summt sie ewig, und — die Kehrseite, auf die es beim Radio ankommt —
          sie <em>reagiert begeistert nur auf Frequenzen ganz nah an f₀</em>. Ein Schwingkreis
          mit niedriger Güte ist ein angeschlagenes Kissen.
        </p>

        <h2>Resonanz ist überall</h2>
        <ul>
          <li><strong>Radio-Abstimmung</strong> — nächste Lektion, und der Grund, warum es diese Einheit gibt.</li>
          <li><strong>Quarze:</strong> Schwingquarze sind mechanische LC-Äquivalente mit Güten in den Zehntausenden — sie disziplinieren jede Uhr, die du besitzt (erinnerst du dich an den 32 768-Hz-Uhrenquarz aus 7.3?).</li>
          <li><strong>Drahtloses Laden:</strong> Zwei Spulen, die auf derselben Frequenz schwingen, reichen Leistung über einen Luftspalt weiter.</li>
          <li><strong>Die dunkle Seite:</strong> Unbeabsichtigte Resonanzen lassen Brücken galoppieren und Audio-Schaltungen heulen. Ingenieure verbringen Karrieren damit, Dämpfung hinzuzufügen.</li>
        </ul>
        <div className="callout note">
          <span className="co-title">Filter, vollendet</span>
          <p>
            Deine RC-Filter (5.3) konnten nur sanft ansteigen oder abfallen. Ein LC-Paar gibt
            Filtern eine <em>Spitze</em> — einen Bandpass, der eine Frequenz bevorzugt. Diese
            Spitze ist das ganze Geheimnis der nächsten Lektion.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Läute die Glocke",
      intro: (
        <>
          <p>Ein Schwingkreis, den du anstoßen kannst — mit sichtbar gemachter Energie-Wippe.</p>
          <ul>
            <li>Stoß ihn an und sieh zu, wie Spannung (cyan) und Strom (bernstein) einander um 90° versetzt jagen.</li>
            <li>Vervierfache C (100 nF → 400 nF): Der Ton fällt genau eine Oktave (f₀ ∝ 1/√C).</li>
            <li>Erhöhe den Schleifenwiderstand: gleicher Ton, aber die Glocke stirbt jung. Das ist Q.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "In einem klingenden LC-Schwingkreis…",
        choices: [
          "sickert die Energie langsam in den Kondensator",
          "schwappt die Energie zwischen dem elektrischen Feld des Kondensators und dem Magnetfeld der Spule hin und her",
          "bleibt die Energie in den Drähten",
          "wird die Energie durch die Resonanz erzeugt",
        ],
        answer: 1,
        explain:
          "C entlädt sich in L, L lädt C andersherum wieder auf, immer weiter (abzüglich der Widerstandsverluste) — ein Pendel, das Höhe gegen Geschwindigkeit tauscht.",
      },
      {
        q: "f₀ = 1/(2π√(LC)). Eine Vervierfachung von C macht die Resonanzfrequenz…",
        choices: ["2× niedriger", "2× höher", "4× höher", "4× niedriger"],
        answer: 0,
        explain: "f₀ skaliert mit 1/√C: 4-fache Kapazität → √4 = 2× niedrigere Frequenz.",
      },
      {
        q: "Ein Resonator mit hoher Güte Q…",
        choices: [
          "hat einen hohen Widerstand",
          "klingt kurz, aber laut",
          "klingt lange und reagiert nur nahe seiner Eigenfrequenz",
          "kann nicht schwingen",
        ],
        answer: 2,
        explain:
          "Wenig Verlust = langes Klingen = scharfe Frequenzvorliebe. Genau diese Trennschärfe braucht die Radio-Abstimmung.",
      },
      {
        q: "Welches Alltagsbauteil ist ein Resonator mit extrem hoher Güte?",
        choices: ["Eine Sicherung", "Ein Potentiometer", "Eine LED", "Ein Schwingquarz"],
        answer: 3,
        explain:
          "Schwingquarze schwingen mechanisch mit Güten in den Zehntausenden — deshalb halten sie die Zeit in jeder Uhr, jedem Computer und jedem Radio.",
      },
    ],
  },

  /* ================================================================ */
  "radio-tuning": {
    Theory: () => (
      <>
        <h2>Das Problem: alles, überall, gleichzeitig</h2>
        <p>
          Eine Antenne ist nur ein Draht, in dem jede vorbeiziehende Radiowelle eine kleine
          Spannung induziert — <em>gleichzeitig</em>. Nachrichten auf 540 kHz, Jazz auf
          760 kHz, Rock auf 1000 kHz: Deine Antenne liefert ihre Summe, ein hoffnungslos
          aussehendes Gekritzel. Die erste Aufgabe des Empfängers ist{" "}
          <strong>Trennschärfe</strong>: einen Sender verstärken, den Rest ignorieren.
        </p>

        <h2>Die Lösung: ein abgestimmter Kreis</h2>
        <p>
          Schalte einen LC-Schwingkreis an die Antenne. Signale auf der Resonanzfrequenz des
          Schwingkreises treiben ihn wie ein gut getimter Schubs auf der Schaukel — die Antwort
          baut sich Zyklus um Zyklus auf. Signale auf anderen Frequenzen schieben aus dem Takt
          und mitteln sich zu fast nichts weg. Der Schwingkreis ist ein{" "}
          <strong>Bandpassfilter</strong> mit seiner Spitze bei f₀, und Q bestimmt, wie schmal
          die Spitze ist:
        </p>
        <div className="formula">
          bandwidth ≈ f₀ / Q
          <span className="note">f₀ = 1 MHz, Q = 80 → nur ±6 kHz um den Sender kommen durch</span>
        </div>
        <p>
          Mach C variabel, und f₀ wandert — genau das dreht der Abstimmknopf an einem alten
          Radio: einen <strong>Drehkondensator</strong>, ineinandergeschobene Metallplatten,
          deren Überlappung C von ~40 bis ~400 pF einstellt. Mit einer festen Spule von ein
          paar hundert Mikrohenry überstreicht das f₀ über das ganze AM-Rundfunkband. (Moderne
          Radios stimmen mit spannungsgesteuerten Kapazitäten und Synthesizern ab, aber die
          Physik ist unverändert.)
        </p>

        <h2>Trennschärfe ist ein Tauschgeschäft</h2>
        <p>
          Zu niedriges Q, und du hörst zwei Sender gleichzeitig. Zu hohes, und du beginnst,
          die Audio-Seitenbänder abzurasieren, die der Sender trägt (mehr dazu in der nächsten
          Lektion) — der Klang wird dumpf. Echte Empfänger ketten mehrere abgestimmte Stufen
          aneinander, um steile Flanken zu bekommen, ohne das Signal zu erwürgen. Aber ein
          einziger LC-Kreis reicht ehrlich gesagt für ein funktionierendes Radio — Menschen
          bauen das seit einem Jahrhundert mit einer auf eine Klopapierrolle gewickelten
          Spule.
        </p>
        <div className="callout tip">
          <span className="co-title">Warum AM-Frequenzen?</span>
          <p>
            Bei 1 MHz dauert ein Wellenzyklus eine Mikrosekunde — tausendmal schneller als
            alles in deinen bisherigen Laboren, und doch gilt dieselbe Sinus-Mathematik aus
            5.1 ohne jede Änderung. Maßstäbe ändern sich; Gesetze nicht.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der überfüllte Äther",
      intro: (
        <>
          <p>Drei Sender an einer Antenne, ein LC-Schwingkreis, ein Knopf.</p>
          <ul>
            <li>Fahre den Kondensator durch und sieh zu, wie jeder Sender durch die Spitze des Schwingkreises auf- und wieder absteigt.</li>
            <li>Stimme bei Q = 8 zwischen Jazz und Rock ab: Beide sickern durch. Erhöhe Q und trenne sie.</li>
            <li>Beachte: Die Antennenspur ändert sich nie — die Auswahl passiert ganz allein in deinem Schwingkreis.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Eine Radioantenne liefert…",
        choices: [
          "nur den Sender, den du willst",
          "die Summe aller vorhandenen Signale — die Auswahl passiert später, im Empfänger",
          "reine Gleichspannung",
          "einen Sender nach dem anderen, im Wechsel",
        ],
        answer: 1,
        explain: "Jede vorbeiziehende Welle induziert gleichzeitig Spannung im Draht. Das Auswählen erledigt der abgestimmte Kreis.",
      },
      {
        q: "Das Drehen des Abstimmknopfs an einem alten Radio verändert physisch…",
        choices: [
          "einen Drehkondensator, der die Resonanzfrequenz des Schwingkreises verschiebt",
          "die Antennenlänge",
          "die Batteriespannung",
          "die Lautsprecherimpedanz",
        ],
        answer: 0,
        explain: "Ineinandergeschobene Platten ändern C, und f₀ = 1/(2π√LC) folgt. Der Knopf ist ein Kondensator.",
      },
      {
        q: "Ein auf 1 MHz abgestimmter Schwingkreis mit Q = 100 lässt ein Band durch von grob…",
        choices: ["1 kHz Breite", "100 kHz Breite", "10 kHz Breite", "1 MHz Breite"],
        answer: 2,
        explain: "Bandbreite ≈ f₀/Q = 1 MHz/100 = 10 kHz — hübsch passend zu einem AM-Kanal.",
      },
      {
        q: "Mit zu wenig Q (schlechter Trennschärfe) würdest du hören…",
        choices: [
          "gar nichts",
          "den Sender, aber invertiert",
          "nur Morsezeichen",
          "zwei benachbarte Sender gleichzeitig",
        ],
        answer: 3,
        explain: "Eine breite, matschige Spitze lässt benachbarte Träger gemeinsam durch — das klassische Billigradio-Problem.",
      },
    ],
  },

  /* ================================================================ */
  "am-radio": {
    Theory: () => (
      <>
        <h2>Klang auf eine Welle setzen</h2>
        <p>
          Audio selbst (20 Hz–20 kHz) strahlt von keiner vernünftigen Antenne ab — die Wellen
          sind kilometerlang. Also lassen wir das Audio auf einem hochfrequenten{" "}
          <strong>Träger</strong> <em>reiten</em>, der wunderbar abstrahlt. Das älteste
          Verfahren ist die <strong>Amplitudenmodulation</strong>: Wackle im Takt des Klangs
          an der <em>Stärke</em> des Trägers.
        </p>
        <div className="formula">
          v(t) = (1 + m·audio(t)) · sin(2π·f_c·t)
          <span className="note">m = Modulationsgrad · das Audio wohnt im Umriss des Trägers — seiner Hüllkurve</span>
        </div>
        <p>
          Kneif die Augen zusammen und schau auf eine AM-Wellenform, und du siehst es: ein
          schneller Träger, der einen langsam wandernden Umriss ausfüllt. Der Umriss{" "}
          <em>ist</em> das Audio. Gewinne den Umriss zurück, und du hast Klang.
        </p>

        <h2>Der Hüllkurvendetektor: drei alte Bekannte</h2>
        <p>
          Hier kommt die schönste Schaltung dieses Kurses, denn du kennst schon jedes Teil:
        </p>
        <ol>
          <li>Eine <strong>Diode</strong> (3.1) wirft die untere Hälfte der Welle weg — ein Einweggleichrichter (5.2), nur eben bei Radiofrequenz.</li>
          <li>Ein <strong>Kondensator</strong> lädt sich auf jede Trägerspitze auf…</li>
          <li>…und ein <strong>Widerstand</strong> lässt ihn gerade schnell genug absacken, um dem Umriss nach unten zu folgen. Schnell laden, langsam entladen — deine RC-Glättung (5.2) mit musikalischem Zweck.</li>
        </ol>
        <p>
          Die RC-Wahl ist ein Goldlöckchen-Problem: zu klein, und Trägerwelligkeit sickert
          durch (Brummen); zu groß, und der Ausgang kann dem Audio bergab nicht folgen (eine
          Verzerrung namens Diagonal-Clipping). Im Labor findest du den Sweet Spot:
          1/f<sub>c</sub> ≪ RC ≪ 1/f<sub>a</sub>.
        </p>

        <h2>Das Detektorradio</h2>
        <p>
          Kette die letzten drei Lektionen aneinander — Antenne, abgestimmter LC-Schwingkreis,
          Diode + RC-Detektor und ein empfindlicher Ohrhörer — und du hast ein{" "}
          <strong>Detektorradio</strong>: einen kompletten Empfänger <em>ohne Batterie</em>,
          gespeist allein von der Energie, die der Sender ausstrahlt. Generationen von
          Ingenieuren haben genau dort angefangen. (In manchen Regionen sind heute weniger
          AM-Sender auf Sendung — deshalb ist dein praktisches Abschlussprojekt später ein
          anderer Aufbau —, aber die Schaltung bleibt die feinste Lehrmaschine, die die
          Elektronik je hervorgebracht hat.)
        </p>
        <div className="callout note">
          <span className="co-title">Jenseits von AM</span>
          <p>
            FM versteckt das Audio statt in der Stärke in der <em>Frequenz</em> des Trägers
            (bessere Störfestigkeit); Digitalradio versteckt Bits in Phase und Amplitude
            zugleich. Alle sind trotzdem immer noch: ein Träger, eine Modulation, ein
            Detektor.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Auf dem Träger reiten",
      intro: (
        <>
          <p>Ein AM-Signal und ein Diode-plus-RC-Detektor, der seiner Hüllkurve hinterherjagt.</p>
          <ul>
            <li>Stell die Modulation auf 100 % und sieh zu, wie sich die Hüllkurve zwischen den Schlägen auf null zuschnürt.</li>
            <li>Mach RC winzig: Der Detektorausgang brummt vor Trägerwelligkeit.</li>
            <li>Mach RC riesig: Er segelt über die Audio-Täler hinweg — Diagonal-Clipping. Finde Goldlöckchen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Bei AM steckt die Audioinformation in der … der Welle.",
        choices: ["Frequenz", "Phase", "Amplitude (ihrer Hüllkurve)", "Farbe"],
        answer: 2,
        explain: "Amplitudenmodulation: Die Stärke des Trägers zeichnet die Audio-Wellenform nach — die Hüllkurve ist der Klang.",
      },
      {
        q: "Ein Hüllkurvendetektor besteht aus…",
        choices: [
          "einer Diode, einem Kondensator und einem Widerstand",
          "einem Transistor und zwei Spulen",
          "einem Operationsverstärker und einem Quarz",
          "drei Kondensatoren",
        ],
        answer: 0,
        explain:
          "Die Diode richtet gleich, C hält jede Spitze, R lässt die Spannung der Hüllkurve nach unten folgen — Lektionen 3.1 + 2.3 + 5.2 in einem.",
      },
      {
        q: "Das RC des Detektors muss erfüllen…",
        choices: [
          "RC so klein wie möglich",
          "1/f_carrier ≪ RC ≪ 1/f_audio",
          "RC größer als 1/f_audio",
          "RC exakt gleich 1/f_carrier",
        ],
        answer: 1,
        explain:
          "Langsam genug, um Trägerzyklen zu ignorieren, schnell genug, um dem Audio zu folgen — das Goldlöckchen-Fenster aus dem Labor.",
      },
      {
        q: "Ein Detektorradio braucht keine Batterie, weil…",
        choices: [
          "Dioden Strom erzeugen",
          "es in Wahrheit gar nicht funktioniert",
          "der Ohrhörer eine Zelle enthält",
          "es allein mit der Energie der empfangenen Radiowelle läuft",
        ],
        answer: 3,
        explain:
          "Die Antenne erntet echte (winzige) Leistung aus der Welle des Senders — genug für einen empfindlichen Ohrhörer. Radio als Gratis-Mahlzeit.",
      },
    ],
  },
};
