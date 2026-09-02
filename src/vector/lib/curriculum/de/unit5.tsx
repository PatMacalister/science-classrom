import type { LessonContentDe } from "../localize";

export const unit5De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  refraction: {
    Theory: () => (
      <>
        <h2>Der Abprall: Reflexion</h2>
        <p>
          Licht, das auf eine Fläche trifft, prallt im selben Winkel ab, in dem es kam —{" "}
          <strong>Einfallswinkel = Ausfallswinkel</strong>, beide gemessen zur{" "}
          <strong>Normalen</strong> (der Senkrechten auf der Fläche — die Buchhaltungskonvention
          der Optik, sofort übernehmen lohnt sich). Ein Spiegel ist nur eine Fläche, die glatt
          genug ist, dass alle parallelen Strahlen im Gleichschritt abprallen; eine gestrichene
          Wand reflektiert dasselbe Licht, würfelt aber die Richtungen — darum siehst du die
          Wand und nicht dich selbst.
        </p>

        <h2>Die Biegung: Brechung</h2>
        <p>
          Das Vakuumtempo c des Lichts ist das Limit des Universums, aber in einem Medium wird
          Licht gebremst — in Wasser auf etwa c/1,33, in Glas auf c/1,5. Der Bremsfaktor ist der{" "}
          <strong>Brechungsindex n</strong>. Und ein Tempowechsel an einer Grenze tut etwas
          Geometrisches: Ein Strahl, der die Grenze <em>schräg</em> quert, ändert die Richtung.
        </p>
        <div className="formula">
          n₁·sin θ₁ = n₂·sin θ₂
          <span className="note">Snellius-Gesetz — ins langsamere Material: zur Normalen hin; ins schnellere: von ihr weg</span>
        </div>
        <p>
          Das Bild der Marschkapelle macht es anschaulich: Eine Reihe Marschierender trifft
          schräg auf ein Schlammfeld; die ersten im Schlamm werden langsam, während der Rest
          noch ausschreitet, und die ganze Linie schwenkt. Jeder „geknickte“ Strohhalm und jeder
          zu flach wirkende Pool ist dieser Schwenk: Licht vom Unterwasserteil biegt an der
          Oberfläche ab, und dein Gehirn — das gerade Linien unterstellt — rekonstruiert das
          Objekt am falschen Ort.
        </p>

        <h2>Der Einwegspiegel im Pool</h2>
        <p>
          Vom Langsamen ins Schnelle (Wasser Richtung Luft) biegt der Strahl <em>von</em> der
          Normalen weg — es gibt also einen Einfallswinkel, dessen Ausgang bei 90° läge. Jenseits
          dieses <strong>Grenzwinkels</strong> (~49° für Wasser) kann das Licht gar nicht mehr
          hinaus: Es reflektiert vollständig nach unten — <strong>Totalreflexion</strong>. Von
          unter Wasser ist die Oberfläche jenseits dieses Kegels ein makelloser Spiegel.
        </p>
        <p>
          Dieser makellose Spiegel ist eine Technologie: Eine <strong>Glasfaser</strong> ist ein
          Glasfaden, in dem Licht per Totalreflexion hundert Kilometer weit prallt und dabei
          fast nichts verliert. Diese Seite hat dich durch genau diesen Trick erreicht.
        </p>

        <div className="callout note">
          <span className="co-title">Speerfischen mit Snellius</span>
          <p>
            Ein vom Ufer aus gesehener Fisch ist nicht dort, wo er erscheint — die Brechung hebt
            sein Bild an. Ziel unter das, was du siehst. Reiher wissen das ohne die Formel;
            jetzt weißt du es mit ihr.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Lichtbieger",
      intro: (
        <>
          <p>Richte einen Strahl auf die Grenze zweier Materialien und lies beide Winkel ehrlich ab.</p>
          <ul>
            <li>Luft in Glas: Sieh den Strahl zur Normalen hin abtauchen und prüfe die Zahlen von Snellius.</li>
            <li>Umgekehrt — Glas in Luft — und erhöhe den Winkel, bis der Strahl sich weigert zu gehen.</li>
            <li>Diese Weigerung ist die Totalreflexion: die Physik, auf der dein Internet reitet.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Wie schnell läuft Licht in Glas (n = 1,5), in m/s? (c = 3,0 × 10⁸ m/s; Eingabe z. B. 2e8)",
        answer: 200000000,
        unit: "m/s",
        tolerancePct: 2,
        hint: "v = c/n.",
        explain: "3,0×10⁸ ÷ 1,5 = 2,0×10⁸ m/s — ein Drittel des Vakuumtempos, an der Grenze abgegeben.",
      },
      {
        prompt:
          "Ein Strahl trifft aus der Luft unter 45° auf Wasser (n = 1,33). Unter welchem Winkel läuft er weiter, in Grad? (sin θ₂ = sin 45°/1,33)",
        answer: 32,
        unit: "°",
        tolerancePct: 4,
        hint: "sin 45° ≈ 0,707; teilen, dann arcsin.",
        explain: "sin θ₂ = 0,707/1,33 ≈ 0,532 → θ₂ ≈ 32°. Ins langsamere Medium, zur Normalen hin.",
      },
    ],
    quiz: [
      {
        q: "Warum knickt Licht, wenn es schräg ins Wasser eintritt?",
        choices: [
          "Die Wasseroberfläche schiebt es zur Seite",
          "Es wechselt an der Grenze das Tempo und schwenkt wie Marschierende, die Schlamm treffen",
          "Die Schwerkraft zieht es hinunter",
          "Blaues Licht zieht es an",
        ],
        answer: 1,
        explain:
          "Brechung ist Tempowechsel mit Geometrie. Frontal auftreffende Strahlen werden nur langsamer; schräge schwenken — Snellius ist die Buchführung.",
      },
      {
        q: "Ein Pool wirkt immer flacher, als er ist, weil…",
        choices: [
          "Wasser den Boden vergrößert",
          "der Boden den Himmel spiegelt",
          "Licht vom Boden an der Oberfläche knickt und dein Gehirn eine gerade Bahn unterstellt",
          "der Druck das Wasser komprimiert",
        ],
        answer: 2,
        explain:
          "Dein Sehsystem projiziert entlang gerader Linien zurück; die Brechung hat diese Annahme an der Oberfläche gebrochen. Das Bild schwebt über dem Objekt.",
      },
      {
        q: "Totalreflexion kann nur auftreten, wenn Licht…",
        choices: [
          "vom langsameren ins schnellere Medium läuft, jenseits des Grenzwinkels",
          "von Luft in Glas läuft",
          "genau entlang der Normalen läuft",
          "sehr hell ist",
        ],
        answer: 0,
        explain:
          "Nur das Wegbiegen von der Normalen kann die 90°-Grenze erreichen. Jenseits des Grenzwinkels gibt es keinen legalen Ausgang — die Grenze wird zum perfekten Spiegel.",
      },
      {
        q: "Eine Glasfaser hält Licht kilometerweit im Inneren durch…",
        choices: [
          "eine verspiegelte Metallbeschichtung",
          "sehr helle Laser",
          "Vakuum in der Faser",
          "Totalreflexion an der Glasgrenze",
        ],
        answer: 3,
        explain:
          "Jedes Streifen der Wand liegt jenseits des Grenzwinkels, also ist die Reflexion total — besser als jeder Metallspiegel, weshalb Glasfaser Kupfer schlägt.",
      },
    ],
  },

  /* ================================================================ */
  lenses: {
    Theory: () => (
      <>
        <h2>Eine Linse ist organisierte Brechung</h2>
        <p>
          Eine <strong>Sammellinse</strong> ist so geformt, dass jeder parallel einfallende
          Strahl durch einen Punkt gebogen wird — den <strong>Brennpunkt</strong> — eine
          Brennweite <strong>f</strong> hinter ihr. Dieser eine Akt der Koordination ist die
          ganze Erfindung; alles Weitere sind Konsequenzen. (Mit Sonnenlicht Papier anzusengen
          ist der Brennpunkt sichtbar gemacht: die parallelen Strahlen der Sonne, auf einen
          Punkt konzentriert.)
        </p>

        <h2>Wo das Bild landet</h2>
        <div className="formula">
          1/f = 1/d₀ + 1/dᵢ
          <span className="note">Gegenstandsweite, Bildweite, Brennweite — ein gemeinsames Budget</span>
        </div>
        <p>
          Strahlen von jedem Objektpunkt werden zu einem passenden Bildpunkt zurückgebogen —
          einem <strong>reellen Bild</strong>, das du auf Schirm oder Sensor fangen kannst,
          kopfüber. Die Gleichung sagt wo: Ferne Objekte (1/d₀ ≈ 0) landen in der Brennebene;
          nähert sich das Objekt, weicht das Bild zurück. Das Fokussieren einer Kamera{" "}
          <em>ist</em> diese Gleichung — der Linsenmotor ändert dᵢ, um den Sensor im Ziel zu
          halten.
        </p>
        <p>
          Bring das Objekt <em>innerhalb</em> der Brennweite, und die Strahlen verlassen die
          Linse noch auseinanderlaufend — kein reelles Bild entsteht. Verfolge sie aber
          rückwärts, und sie scheinen von einem größeren, aufrechten{" "}
          <strong>virtuellen Bild</strong> hinter dem Objekt zu kommen: eine{" "}
          <strong>Lupe</strong>. Gleiche Linse, zwei Verhaltensweisen — und die Brennweite ist
          der Schalter.
        </p>

        <h2>Dein Auge rechnet diese Gleichung</h2>
        <p>
          Das Auge ist eine Sammellinse (Hornhaut plus feinstimmende Innenlinse), die bei
          fester Bildweite auf die Netzhaut abbildet — statt die Linse zu verschieben,{" "}
          <em>kneten Muskeln sie runder</em> und verkürzen f für nahe Objekte. Kurzsichtigkeit:
          Auge zu lang, ferne Bilder landen zu früh — behoben durch eine Zerstreuungslinse in
          der Brille. Das Altern versteift die Linse, bis der Nahfokus versagt — daher
          Lesebrillen und der länger werdende Arm. Ein Brillenrezept steht in{" "}
          <strong>Dioptrien</strong>: 1/f in Metern — eine +2,0-dpt-Linse hat f = 0,5 m, und
          Dioptrien addieren sich, weshalb sie die Einheit des Fachs sind.
        </p>

        <div className="callout note">
          <span className="co-title">Kopfüber und ungerührt</span>
          <p>
            Das Bild auf deiner Netzhaut ist invertiert wie jedes reelle Bild. Dein Gehirn
            verdrahtet „Netzhaut unten“ schlicht als „oben“ — Versuchspersonen mit Umkehrbrillen
            passen sich berühmt binnen Tagen an, und die Welt kippt wieder „richtig herum“. Die
            Optik liefert die Daten; die Deutung ist ein Software-Job.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die optische Bank",
      intro: (
        <>
          <p>Ein Objekt, eine Linse, ein Schirm — verschiebe die Teile und sieh die Strahlen der Gleichung gehorchen.</p>
          <ul>
            <li>Stell das Objekt weit weg: Das Bild sitzt in der Brennebene, klein und kopfüber.</li>
            <li>Schieb das Objekt zur Linse und verfolge das zurückweichende Bild mit dem Schirm.</li>
            <li>Kreuze in die Brennweite hinein: Das reelle Bild verschwindet, und eine virtuelle Lupe erscheint.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Ein Objekt steht 30 cm vor einer Linse mit f = 10 cm. Wo liegt das Bild, in cm? (1/dᵢ = 1/f − 1/d₀)",
        answer: 15,
        unit: "cm",
        tolerancePct: 2,
        hint: "1/10 − 1/30 = 2/30.",
        explain: "1/dᵢ = 1/10 − 1/30 = 1/15 → dᵢ = 15 cm: ein reelles, umgekehrtes Bild, auf Papier zu fangen.",
      },
      {
        prompt: "Eine Lesebrille trägt die Aufschrift +2,5 Dioptrien. Wie groß ist ihre Brennweite, in Metern?",
        answer: 0.4,
        unit: "m",
        hint: "Dioptrien sind 1/f.",
        explain: "f = 1/2,5 = 0,4 m. Die Einheit des Optikers ist die Linsengleichung, vorab invertiert.",
      },
    ],
    quiz: [
      {
        q: "Was definiert die Brennweite einer Sammellinse?",
        choices: [
          "Die Entfernung, in der parallele Strahlen in einem Punkt gebündelt werden",
          "Der Durchmesser der Linse",
          "Die Entfernung zum Objekt",
          "Die Dicke des Glases",
        ],
        answer: 0,
        explain:
          "Parallel hinein, Punkt hinaus — der definierende Akt der Linse; f misst, wo dieser Punkt liegt. Alles Weitere folgt aus der Linsengleichung.",
      },
      {
        q: "Ein reelles Bild ist eines, das…",
        choices: [
          "immer aufrecht steht",
          "nur durch die Linse sichtbar ist",
          "dort entsteht, wo Strahlen tatsächlich wieder zusammenlaufen — du kannst es auf einem Schirm fangen",
          "nur bei fernen Objekten entsteht",
        ],
        answer: 2,
        explain:
          "Licht kommt dort wirklich an, kopfüber — ein Kamerasensor sitzt exakt in einem reellen Bild. Virtuelle Bilder sind Rückprojektionen, die dein Auge erschließt.",
      },
      {
        q: "Wie funktioniert eine Lupe?",
        choices: [
          "Sie bricht Licht stärker als andere Linsen",
          "Mit dem Objekt innerhalb der Brennweite erzeugt die Linse ein vergrößertes aufrechtes virtuelles Bild",
          "Sie projiziert ein größeres reelles Bild auf dein Auge",
          "Sie bremst das Licht",
        ],
        answer: 1,
        explain:
          "Innerhalb von f verlassen die Strahlen die Linse noch divergent; rückwärts verfolgt scheinen sie von einem größeren Objekt dahinter zu kommen. Gleiche Linse, anderes Regime.",
      },
      {
        q: "Dein Auge stellt auf nahe Objekte scharf, indem…",
        choices: [
          "es die Linse wie eine Kamera nach vorn schiebt",
          "es die Pupille verengt",
          "es die Netzhaut nach hinten verlagert",
          "Muskeln die Linse runder kneten und so ihre Brennweite verkürzen",
        ],
        answer: 3,
        explain:
          "Die Bildweite ist vom Augapfel fixiert, also muss sich stattdessen f ändern. Das Alter versteift die Linse — und der Arm wird an der Zeitung „länger“.",
      },
    ],
  },

  /* ================================================================ */
  spectrum: {
    Theory: () => (
      <>
        <h2>Weiß ist ein Akkord</h2>
        <p>
          Newton schickte Sonnenlicht durch ein Prisma und bekam einen Regenbogen — dann, der
          entscheidende Schritt, durch ein <em>zweites</em> Prisma, und mischte ihn zurück zu
          Weiß. Farbe wird vom Glas nicht hinzugefügt; Sonnenlicht ist ein Gemisch, und das
          Prisma sortiert es. Das Sortieren funktioniert, weil der Brechungsindex eines Mediums
          leicht von der Wellenlänge abhängt — <strong>Dispersion</strong>: Violett wird eine
          Spur stärker gebremst als Rot, biegt also eine Spur stärker, und das Gemisch fächert
          auf. Regentropfen erledigen denselben Job, über den Himmel sortiert.
        </p>
        <p>
          Farbe <em>ist</em> Wellenlänge: tiefes Rot ~700 nm bis Violett ~400 nm. Dein Auge
          tastet diesen Bereich mit drei Zapfensorten ab, und dein Gehirn mischt deren Stimmen —
          darum täuscht dich ein Bildschirm mit nur roten, grünen und blauen Pixeln.
        </p>

        <h2>Die Klaviatur dahinter</h2>
        <p>
          Das sichtbare Band ist ein Splitter des{" "}
          <strong>elektromagnetischen Spektrums</strong> — ein Phänomen bei jeder Wellenlänge,
          alle mit Tempo c:
        </p>
        <ul>
          <li><strong>Radio</strong> (Meter–Kilometer) — Rundfunk, WLANs 12 cm.</li>
          <li><strong>Mikrowellen</strong> (cm–mm) — Radar, und das Rotieren der Wassermoleküle deiner Reste.</li>
          <li><strong>Infrarot</strong> (µm) — Wärmestrahlung: Nachtsicht sieht warme Körper glühen.</li>
          <li><strong>Sichtbar</strong> — 400–700 nm. Dieser Splitter.</li>
          <li><strong>Ultraviolett</strong> — energiereich genug, Hautchemie zu brechen: Sonnenbrand.</li>
          <li><strong>Röntgen / Gamma</strong> — durch Fleisch, aus Kernen.</li>
        </ul>
        <p>
          Warum nutzen Augen diesen Splitter? Die Sonnenausbeute gipfelt hier, und — kein
          Zufall — Wasser und Luft sind hier durchsichtig. Die Evolution hat den Empfänger auf
          den offenen Kanal gestimmt.
        </p>

        <h2>Warum der Himmel blau ist (und Sonnenuntergänge rot)</h2>
        <p>
          Luftmoleküle streuen Licht — schwach, aber mit brutaler Wellenlängen-Vorliebe: Die
          Streustärke geht mit <strong>1/λ⁴</strong>, also wird 450-nm-Blau um ein Mehrfaches
          stärker herumgeworfen als 650-nm-Rot. Schau irgendwohin außer zur Sonne, und du siehst
          diesen gestreuten blauen Schleier. Beim Sonnenuntergang durchquert das Licht so viel
          Luft, dass das Blau komplett aus dem Strahl <em>hinausgestreut</em> wurde — was den
          langen Weg überlebt, ist das Rot, auf die Wolken gemalt.
        </p>

        <div className="callout note">
          <span className="co-title">Fingerabdrücke im Regenbogen</span>
          <p>
            Schau genau in das Spektrum eines Sterns, und dunkle Linien unterbrechen es — jedes
            Element seiner Atmosphäre absorbiert seine ganz eigenen Wellenlängen. Helium wurde
            in den Linien der Sonne entdeckt, bevor es jemand auf der Erde fand (daher der Name,
            von *helios*). Diese scharfen, gequantelten Linien sind auch ein loser Faden: Zieh
            daran, und die Quantenphysik ribbelt sich heraus — nächste Einheit.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Prismenbank",
      intro: (
        <>
          <p>Weißes Licht hinein, Spektrum heraus — mit einem Wellenlängen-Schieber für die ganze Klaviatur.</p>
          <ul>
            <li>Sieh Violett stärker durchs Prisma biegen als Rot: Dispersion, live.</li>
            <li>Zieh die Wellenlängen-Marke in beide Richtungen aus dem sichtbaren Band — die Beschriftungen gehen weiter.</li>
            <li>Prüf das Streuungs-Messgerät auf dem Weg ins Blaue: 1/λ⁴ ist der Grund, warum der Himmel da oben ist.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt: "Grünes Licht hat λ = 500 nm. Welche Frequenz hat es, in Hz? (c = 3 × 10⁸ m/s; Antwort wie 6e14)",
        answer: 600000000000000,
        unit: "Hz",
        tolerancePct: 2,
        hint: "f = c/λ; 500 nm = 5 × 10⁻⁷ m.",
        explain: "3×10⁸ ÷ 5×10⁻⁷ = 6×10¹⁴ Hz — sechshundert Billionen Kämme pro Sekunde auf deiner Netzhaut.",
      },
      {
        prompt:
          "Blaues Licht (450 nm) streut stärker als rotes (650 nm), um den Faktor (650/450)⁴. Wievielmal stärker? (eine Nachkommastelle)",
        answer: 4.4,
        unit: "×",
        tolerancePct: 5,
        hint: "(1,444…)⁴.",
        explain: "(650/450)⁴ ≈ 4,4 — die Bläue des Himmels, als einzelne Zahl.",
      },
    ],
    quiz: [
      {
        q: "Was tut ein Prisma mit weißem Licht?",
        choices: [
          "Es fügt ihm Farben hinzu",
          "Es sortiert das Gemisch, das es schon enthält, weil jede Wellenlänge leicht anders bricht",
          "Es filtert alles außer dem Regenbogen heraus",
          "Es bremst es, bis es sichtbar wird",
        ],
        answer: 1,
        explain:
          "Dispersion: n hängt leicht von λ ab, also schwenkt Violett stärker als Rot. Newtons zweites Prisma bewies, dass die Farben sich zu Weiß zurückmischen.",
      },
      {
        q: "Sichtbares Licht, Radiowellen und Röntgenstrahlen sind…",
        choices: [
          "drei verschiedene Phänomene",
          "Schall bei verschiedenen Tempi",
          "dieselbe elektromagnetische Welle bei verschiedenen Wellenlängen",
          "nur mathematisch verwandt",
        ],
        answer: 2,
        explain:
          "Ein Spektrum, ein Tempo c, Wellenlängen von Kilometern bis Atombreiten. Dein Auge tastet zufällig einen 300-nm-Splitter davon ab.",
      },
      {
        q: "Warum ist der Himmel blau?",
        choices: [
          "Luftmoleküle streuen kurze Wellenlängen weit stärker (∝ 1/λ⁴), und Blau ist kurz",
          "Die Atmosphäre ist schwach blau gefärbt",
          "Er spiegelt den Ozean",
          "Die Sonne strahlt überwiegend blaues Licht ab",
        ],
        answer: 0,
        explain:
          "Blau wird um ein Mehrfaches stärker über den Himmel geworfen als Rot; schau irgendwohin außer zur Sonne, und gestreutes Blau ist, was ankommt.",
      },
      {
        q: "Warum sehen Sonnenuntergänge rot aus?",
        choices: [
          "Die Sonne kühlt am Abend ab",
          "Staub fügt rotes Licht hinzu",
          "Deine Augen ermüden am Blau",
          "Der lange Weg durch die Luft streut das Blau aus dem Strahl — übrig bleibt das Rot",
        ],
        answer: 3,
        explain:
          "Gleiche Streuung, längerer Weg: Subtraktion von Blau, nicht Addition von Rot. Das verlorene Blau ist der Tageshimmel von jemand anderem.",
      },
    ],
  },
};
