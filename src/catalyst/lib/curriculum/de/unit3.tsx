import type { LessonContentDe } from "../localize";

export const unit3De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  states: {
    Theory: () => (
      <>
        <h2>Drei Tänze, ein Tänzer</h2>
        <p>
          Am H₂O-Molekül ändert sich nichts, wenn Eis schmilzt. Was sich ändert, ist die{" "}
          <strong>Bewegung</strong>. Teilchen ziehen einander immer an (jene Kräfte polarer
          Moleküle aus Einheit 1), und sie zappeln immer mit thermischer Energie. Der
          Aggregatzustand ist schlicht der Punktestand dieses Kampfes:
        </p>
        <ul>
          <li>
            <strong>Fest</strong> — die Anziehung gewinnt. Teilchen rasten in ein Gitter ein und
            können nur auf der Stelle schwingen. Feste Form, festes Volumen.
          </li>
          <li>
            <strong>Flüssig</strong> — unentschieden. Teilchen berühren sich noch, gleiten aber
            aneinander vorbei. Festes Volumen, geborgte Form.
          </li>
          <li>
            <strong>Gasförmig</strong> — die Bewegung gewinnt. Teilchen reißen sich los und
            fliegen, treffen einander nur noch bei Stößen. Keine Form, kein eigenes Volumen.
          </li>
        </ul>

        <h2>Schmelz- und Siedepunkte sind Punktestände</h2>
        <p>
          Je stärker die Kräfte zwischen den Teilchen, desto mehr thermische Energie braucht es,
          um die Tanzformation zu sprengen. Das ist das ganze Geheimnis hinter Schmelzpunkten:
          Stickstoffs schwacher zwischenmolekularer Griff gibt bei −210 °C auf, Wassers
          Wasserstoffbrücken halten bis 0 °C, und Eisens Metallbindung kämpft bis 1538 °C. Lies
          einen Schmelzpunkt und du liest Bindungsstärke.
        </p>

        <div className="formula">
          fest ⇌ flüssig ⇌ gasförmig
          <span className="note">Schmelzen/Erstarren bei der einen Temperatur, Sieden/Kondensieren bei der anderen — Energie rein nach rechts, Energie raus nach links</span>
        </div>

        <h2>Das Rätsel des Plateaus</h2>
        <p>
          Erhitze Eis gleichmäßig und beobachte das Thermometer: Es steigt bis 0 °C, dann{" "}
          <strong>bleibt es stehen</strong>, während das Eis schmilzt, dann steigt es weiter.
          Während des Stillstands geht jedes Joule ins Aufbrechen von Gitterbindungen statt ins
          Beschleunigen der Teilchen. Temperatur misst die mittlere Teilchengeschwindigkeit — und
          die ändert sich nicht, die <em>Struktur</em> ändert sich. Dasselbe Plateau wiederholt
          sich bei 100 °C, und es ist gewaltig: Heißes Wasser in Dampf zu verwandeln kostet etwa
          fünfmal mehr Energie als es von 0 auf 100 zu erhitzen.
        </p>

        <div className="callout note">
          <span className="co-title">Verdunsten ohne Sieden</span>
          <p>
            Pfützen trocknen bei 20 °C, weil Temperatur ein <em>Mittelwert</em> ist. In jeder
            Flüssigkeit sind ein paar glückliche Teilchen an der Oberfläche schnell genug zum
            Entkommen. Sie gehen und nehmen ihre überdurchschnittliche Energie mit — weshalb
            Verdunsten das Zurückbleibende kühlt, weshalb Schwitzen funktioniert und weshalb nasse
            Kleidung kalt wirkt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Teilchen-Tanzfläche",
      intro: (
        <>
          <p>48 Teilchen, ein Temperaturregler, drei Tänze.</p>
          <ul>
            <li>Fahre Wasser von −60 bis 160 °C durch und beobachte, wie das Gitter zweimal bricht.</li>
            <li>Wechsle zu Stickstoff: dieselben drei Tänze, zusammengedrängt unter −196 °C.</li>
            <li>Eisen braucht 1538 °C zum Schmelzen — gleiche Physik, stärkerer Griff.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was ändert sich, wenn Eis zu Wasser schmilzt?",
        choices: [
          "Die H₂O-Moleküle zerfallen in H und O",
          "Bewegung und Anordnung der Moleküle — die Moleküle selbst bleiben unverändert",
          "Die Moleküle werden kleiner",
          "Die Wasserstoffbrücken werden stärker",
        ],
        answer: 1,
        explain:
          "Schmelzen ist ein Zustandswechsel, kein Stoffwechsel. Dieselben H₂O-Moleküle hören auf, im Gitter zu schwingen, und beginnen aneinander vorbeizugleiten.",
      },
      {
        q: "Eisen schmilzt bei 1538 °C, Stickstoff bei −210 °C. Der Unterschied sagt dir…",
        choices: [
          "Eisenatome sind schneller",
          "die Kräfte zwischen Eisenatomen sind weit stärker als die zwischen N₂-Molekülen",
          "Stickstoff enthält mehr Energie",
          "gar nichts — Schmelzpunkte sind zufällig",
        ],
        answer: 1,
        explain:
          "Der Schmelzpunkt misst, wie viel thermisches Zappeln die Kräfte zwischen den Teilchen aushalten. Metallbindungen schlagen schwache zwischenmolekulare Kräfte um Tausende Grad.",
      },
      {
        q: "Während Wasser siedet, bleibt seine Temperatur bei 100 °C stehen, weil…",
        choices: [
          "Thermometer im Dampf versagen",
          "die zugeführte Energie zwischenmolekulare Bindungen bricht statt Teilchen zu beschleunigen",
          "Wasser nicht heißer werden kann",
          "der Herd schwächelt",
        ],
        answer: 1,
        explain:
          "Bei einem Phasenübergang geht die Energie ins Zerreißen der Struktur. Erst wenn jedes Molekül entkommen ist, erhöht weiteres Heizen wieder Geschwindigkeit (und Temperatur).",
      },
      {
        q: "Warum kühlt Schwitzen dich ab?",
        choices: [
          "Schweiß ist kälter als die Haut",
          "Die schnellsten Wassermoleküle verdunsten und tragen überdurchschnittliche Energie fort",
          "Salz im Schweiß nimmt Wärme auf",
          "Tut es nicht — das ist psychologisch",
        ],
        answer: 1,
        explain:
          "Verdunsten ist selektive Auswanderung der energiereichsten Moleküle. Die mittlere Energie des Rests sinkt — dieser Mittelwert ist deine Hauttemperatur.",
      },
    ],
  },

  /* ================================================================ */
  "gas-laws": {
    Theory: () => (
      <>
        <h2>Druck ist Trommeln</h2>
        <p>
          Ein Gasteilchen trifft die Behälterwand und prallt ab, wobei es der Wand einen winzigen
          Stoß gibt. Multipliziere das mit 10²³ Stößen pro Sekunde und das Trommeln verschwimmt zu
          einem stetigen Schub: <strong>Druck</strong>. Dieses Bild macht Gasverhalten fast
          selbstverständlich. Verkleinere das Volumen → Teilchen treffen die Wände häufiger → Druck
          steigt. Erhitze das Gas → Teilchen treffen härter und häufiger → Druck steigt. Gib mehr
          Gas dazu → mehr Trommler → Druck steigt.
        </p>

        <h2>Ein Gesetz für alle Regler</h2>
        <div className="formula">
          P V = n R T
          <span className="note">Druck × Volumen = Stoffmenge × Gaskonstante × absolute Temperatur (in Kelvin!)</span>
        </div>
        <p>
          Alles oben steckt in dieser einen Zeile, mit R ≈ 8,314 J/(mol·K) als
          Umrechnungskonstante. Das nicht verhandelbare Detail:{" "}
          <strong>T muss in Kelvin stehen</strong> (K = °C + 273,15). Celsius hat seinen Nullpunkt
          an einer willkürlichen Stelle — beim Gefrieren von Wasser — während die Gasphysik sich
          für absolute Bewegung interessiert. Bei 0 K steht die Bewegung still; Kelvin zu
          verdoppeln verdoppelt tatsächlich den Druck. &bdquo;Grad Celsius&ldquo; zu verdoppeln bedeutet gar
          nichts.
        </p>
        <p>
          Eine berühmte Folge: Bei Raumbedingungen füllt ein Mol <em>irgendeines</em> idealen Gases
          etwa <strong>24 Liter</strong> — Wasserstoff, Sauerstoff, CO₂ gleichermaßen. Die Identität
          der Teilchen spielt kaum eine Rolle, wenn sie ihr Leben weit voneinander entfernt
          verbringen.
        </p>

        <h2>Sonderfälle, die du längst kennst</h2>
        <ul>
          <li>
            <strong>Zusammendrücken bei konstantem T</strong> (Boyle): V halbieren → P verdoppeln.
            Spritzen, Kolben, Tauchen.
          </li>
          <li>
            <strong>Erhitzen bei konstantem V</strong> (Gay-Lussac): P steigt mit T. Deshalb steht
            auf Spraydosen &bdquo;niemals ins Feuer werfen&ldquo;.
          </li>
          <li>
            <strong>Erhitzen bei konstantem P</strong> (Charles): V wächst mit T. Deshalb steigt
            ein Heißluftballon und bläht sich eine verschlossene Tüte in der Sonne auf.
          </li>
        </ul>

        <div className="callout tip">
          <span className="co-title">&bdquo;Ideal&ldquo;?</span>
          <p>
            Das Gesetz nimmt punktförmige Teilchen ohne Anziehung an — für normale Gase bei
            normalen Bedingungen fast wahr. Drücke stark zusammen oder kühle nahe an die
            Kondensation und die zwischenmolekularen Kräfte der letzten Lektion tauchen wieder auf;
            genau dann beginnen echte Gase flüssig zu werden und das Gesetz biegt sich.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Kolben-Maschine",
      intro: (
        <>
          <p>Ein Gas im Zylinder mit drei Reglern und einem Manometer.</p>
          <ul>
            <li>Halbiere das Volumen bei festem T — sieh zu, wie sich P verdoppelt, weil das Wandtrommeln sich verdoppelt.</li>
            <li>Heize von 300 K auf 600 K bei festem Volumen: Die Teilchen glühen rot und P verdoppelt sich.</li>
            <li>Finde Einstellungen, bei denen das Manometer ≈ 101 kPa zeigt — das ist die Luft um dich herum.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was ist Gasdruck, mikroskopisch betrachtet?",
        choices: [
          "Das Gewicht des Gases",
          "Die gemeinsame Kraft unzähliger Teilchenstöße gegen die Wände",
          "Teilchen, die einander wegdrücken",
          "Wärmestrahlung",
        ],
        answer: 1,
        explain:
          "Jeder Stoß gibt der Wand einen winzigen Impuls; 10²³ davon pro Sekunde mitteln sich zum stetigen Schub, den wir Druck nennen.",
      },
      {
        q: "Warum muss T in PV = nRT in Kelvin stehen?",
        choices: [
          "Kelvin-Zahlen sind größer",
          "Kelvin beginnt beim absoluten Nullpunkt und ist damit proportional zur tatsächlichen Teilchenbewegung",
          "Celsius gilt nur für Flüssigkeiten",
          "Tradition seit Lord Kelvin",
        ],
        answer: 1,
        explain:
          "Druck ist proportional zur absoluten kinetischen Energie der Moleküle. Nur eine Skala mit Null bei Null-Bewegung macht 'doppeltes T → doppeltes P' wahr.",
      },
      {
        q: "Du drückst eine Spritze (verschlossen, konstante Temperatur) auf das halbe Volumen. Der Druck…",
        choices: ["halbiert sich", "verdoppelt sich", "bleibt gleich", "fällt auf null"],
        answer: 1,
        explain: "PV = konstant bei festem n und T (Boyle). Halber Raum → doppelte Stoßrate → doppelter Druck.",
      },
      {
        q: "Warum warnen Spraydosen vor Feuer?",
        choices: [
          "Der Lack brennt",
          "Bei konstantem Volumen steigt der Druck mit der Temperatur, bis die Dose platzt",
          "Das Gas wird giftig",
          "Metall schmilzt bei niedriger Temperatur",
        ],
        answer: 1,
        explain:
          "Das Volumen der Dose ist fest, also wächst P im Gleichschritt mit T (Gay-Lussac). Genug Hitze und der Druck übersteigt, was die Nähte halten.",
      },
    ],
    problems: [
      {
        prompt: "Welchen Druck (kPa) übt 1 mol Gas in 10 L bei 300 K aus? (R = 8,314)",
        answer: 249.4,
        unit: "kPa",
        hint: "P = nRT / V, mit V in Litern ergibt sich direkt kPa.",
        explain: "P = 1 × 8,314 × 300 / 10 ≈ 249 kPa — zweieinhalb Atmosphären.",
      },
      {
        prompt: "Ein Ballon fasst 24 L bei 300 K. Du erwärmst ihn bei konstantem Druck auf 350 K. Neues Volumen?",
        answer: 28,
        unit: "L",
        hint: "Bei konstantem P und n: V/T = konstant, also V₂ = V₁ × T₂/T₁.",
        explain: "24 × 350/300 = 28 L (Gesetz von Charles).",
      },
      {
        prompt: "Rechne 25 °C in Kelvin um.",
        answer: 298.15,
        unit: "K",
        hint: "K = °C + 273,15.",
        explain: "25 + 273,15 = 298,15 K — 'Raumtemperatur' in Gasgesetz-Aufgaben.",
      },
      {
        prompt: "Eine versiegelte 2-L-Flasche bei 100 kPa wird bei konstanter Temperatur auf 0,8 L gepresst. Neuer Druck?",
        answer: 250,
        unit: "kPa",
        hint: "Boyle: P₁V₁ = P₂V₂.",
        explain: "100 × 2 / 0,8 = 250 kPa.",
      },
    ],
  },

  /* ================================================================ */
  solutions: {
    Theory: () => (
      <>
        <h2>Auflösen ist Zerlegen</h2>
        <p>
          Rühre Salz in Wasser und es &bdquo;verschwindet&ldquo; — aber du weißt es inzwischen besser. Wassers
          polare Moleküle (Einheit 1) hebeln Na⁺- und Cl⁻-Ionen aus dem Gitter, umhüllen jedes mit
          einem Mantel ausgerichteter Dipole und tragen es davon. Das Salz ist noch da, zerlegt in
          unsichtbare, hydratisierte Ionen. Das Wasser ist das <strong>Lösungsmittel</strong>, das
          Salz der <strong>gelöste Stoff</strong>, und die Mischung eine{" "}
          <strong>Lösung</strong> — durchsichtig, weil die gelösten Teile kleiner sind als
          Lichtwellenlängen.
        </p>

        <h2>Sättigung: das Parkhaus wird voll</h2>
        <p>
          Wassers Kapazität ist endlich. Gib immer mehr Salz dazu und irgendwann ist die Lösung{" "}
          <strong>gesättigt</strong> — jeder weitere Kristall sinkt einfach ungelöst zu Boden. Die
          Grenze ist die <strong>Löslichkeit</strong>, meist in g pro 100 mL angegeben, und für die
          meisten Feststoffe <strong>steigt sie mit der Temperatur</strong> (heißeres Wasser hebelt
          energischer). Verschiedene Stoffe haben wild verschiedene Kurven: Die von NaCl ist fast
          flach (36 g kalt, 39 g heiß), während die von Salpeter von 13 g auf über 240 g
          hochschießt.
        </p>
        <p>
          Steile Kurven ermöglichen einen schönen Trick: Löse viel Stoff heiß, kühle die Lösung ab,
          und der Überschuss muss hinaus — als <strong>Kristalle</strong>. So züchtest du im
          Abschlussprojekt von Einheit 4 Salzkristalle, und so wird aus Zucker Kandis.
        </p>

        <h2>Molarität: die Konzentration der Chemiker</h2>
        <div className="formula">
          c = n / V
          <span className="note">Konzentration (mol/L) = Stoffmenge des gelösten Stoffs ÷ Liter Lösung — &bdquo;eine 2-molare Lösung&ldquo; heißt c = 2 mol/L</span>
        </div>
        <p>
          Gramm pro Liter hängt vom Stoff ab; <strong>Mol pro Liter</strong> spricht
          Teilchensprache. Steht auf einer Flasche 0,1 M HCl, weißt du exakt, wie viele reaktive
          Teilchen jeder Milliliter liefert — und genau das macht die Titration in Einheit 4 zu
          einem Akt des Zählens statt des Ratens.
        </p>

        <div className="callout note">
          <span className="co-title">Gase lösen sich andersherum</span>
          <p>
            Feststoffe lösen sich besser heiß; Gase lösen sich besser <em>kalt</em> (Wärme hilft
            ihnen beim Entkommen). Warme Cola wird schnell schal, und wärmere Ozeane halten weniger
            CO₂ und weniger O₂ — eine Löslichkeitskurve mit planetaren Folgen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Sättigungspunkt",
      intro: (
        <>
          <p>Gib Stoff zu, erhitze das Wasser und sieh zu, wie die Löslichkeitskurve entscheidet, was sich löst.</p>
          <ul>
            <li>Gib 50 g NaCl bei 20 °C zu — ein Haufen bleibt am Boden. Hilft Erhitzen viel?</li>
            <li>Wechsle zu KNO₃: 50 g lösen sich kalt nicht, verschwinden aber bei 45 °C vollständig.</li>
            <li>Löse 150 g KNO₃ heiß, dann schiebe die Temperatur nach unten — Kristallregen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was passiert mit Salz, wenn es sich in Wasser löst?",
        choices: [
          "Es schmilzt",
          "Sein Gitter wird in Ionen zerlegt, jedes von Wasserdipolen umhüllt",
          "Es reagiert zu einer neuen Verbindung",
          "Es verdampft",
        ],
        answer: 1,
        explain:
          "Auflösen ist Zerlegen, nicht Verschwinden: Polare Wassermoleküle hebeln Na⁺ und Cl⁻ aus dem Gitter und geleiten sie einzeln davon.",
      },
      {
        q: "Eine gesättigte Lösung ist eine, bei der…",
        choices: [
          "das Wasser aufgebraucht ist",
          "das Lösungsmittel bei dieser Temperatur das Maximum hält — Weiteres bleibt ungelöst liegen",
          "die Lösung kocht",
          "gelöster Stoff und Lösungsmittel gleich schwer sind",
        ],
        answer: 1,
        explain:
          "Sättigung ist die Kapazitätsgrenze. Sie hängt von der Temperatur ab: Wärme hebt sie meist für Feststoffe, senkt sie für Gase.",
      },
      {
        q: "Du löst viel KNO₃ in heißem Wasser und lässt es abkühlen. Was passiert?",
        choices: [
          "Nichts — Auflösen ist endgültig",
          "Der Überschuss kristallisiert aus, weil die Löslichkeitsgrenze sinkt",
          "Das Wasser verdampft",
          "Die Lösung wird heißer",
        ],
        answer: 1,
        explain:
          "Abkühlen schiebt dich die steile Löslichkeitskurve hinab; was die neue Grenze übersteigt, muss die Lösung als Kristalle verlassen. So wächst Kandiszucker.",
      },
      {
        q: "Wie groß ist die Molarität von 0,5 mol Salz, gelöst in 2 L Lösung?",
        choices: ["1 mol/L", "0,25 mol/L", "0,5 mol/L", "4 mol/L"],
        answer: 1,
        explain: "c = n/V = 0,5 / 2 = 0,25 mol/L.",
      },
    ],
    problems: [
      {
        prompt: "Du löst 58,44 g NaCl (genau 1 mol) in Wasser zu 0,5 L Lösung. Wie groß ist die Konzentration?",
        answer: 2,
        unit: "mol/L",
        hint: "c = n / V.",
        explain: "1 mol / 0,5 L = 2 mol/L — eine '2-molare' Sole.",
      },
      {
        prompt: "Wie viele Mol HCl stecken in 250 mL einer 0,1-mol/L-Lösung?",
        answer: 0.025,
        unit: "mol",
        hint: "n = c × V; rechne mL zuerst in L um.",
        explain: "0,1 × 0,25 = 0,025 mol.",
      },
      {
        prompt: "Die Löslichkeit von KNO₃ beträgt etwa 110 g/100 mL bei 60 °C und 32 g/100 mL bei 20 °C. Du sättigst 100 mL bei 60 °C und kühlst auf 20 °C. Wie viele Gramm kristallisieren aus?",
        answer: 78,
        unit: "g",
        hint: "Die Differenz der beiden Grenzen muss die Lösung verlassen.",
        explain: "110 − 32 = 78 g Kristalle — das Kandis-Prinzip.",
      },
    ],
  },
};
