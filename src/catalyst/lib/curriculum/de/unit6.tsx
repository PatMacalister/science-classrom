import type { LessonContentDe } from "../localize";

export const unit6De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  redox: {
    Theory: () => (
      <>
        <h2>Oxidation und Reduktion — immer im Doppelpack</h2>
        <p>
          Wann immer ein Elektron den Besitzer wechselt, gibt die Chemie den beiden Hälften Namen:{" "}
          <strong>Oxidation</strong> ist das <em>Abgeben</em> von Elektronen,{" "}
          <strong>Reduktion</strong> das <em>Aufnehmen</em>. Der klassische Merkspruch:{" "}
          <em>&bdquo;Oxidation — Elektronen-Abgabe; Reduktion — Elektronen-Aufnahme.&ldquo;</em> Kurz:{" "}
          <strong>OER</strong> und <strong>REA</strong>. Das eine passiert nie ohne das andere — ein
          verlorenes Elektron muss irgendwo landen — also ist das ganze Ereignis eine{" "}
          <strong>Redoxreaktion</strong>.
        </p>
        <div className="formula">
          Zn + Cu²⁺ → Zn²⁺ + Cu
          <span className="note">Zink wird oxidiert (verliert 2 e⁻), das Kupferion wird reduziert (gewinnt 2 e⁻)</span>
        </div>
        <p>
          Redox hast du dein Leben lang unter anderen Namen gesehen:{" "}
          <strong>Verbrennung</strong> (Brennstoff von Sauerstoff oxidiert),{" "}
          <strong>Rosten</strong> (Eisen oxidiert, langsam), <strong>Bleichen</strong>,{" "}
          <strong>leerlaufende Batterien</strong> — und deine Zellen, die Glucose verbrennen: eine
          Redoxkaskade in exquisit kontrollierter Zeitlupe.
        </p>

        <h2>Die Spannungsreihe: wer wem zahlt</h2>
        <p>
          Wirf einen Zinkstreifen in blaue Kupfersulfatlösung und er kommt kupferbeschichtet heraus,
          während das Blau verblasst: Zink <em>drängt</em> Cu²⁺ seine Elektronen auf. Versuche es
          umgekehrt — Kupfer in Zinksulfat — und es passiert überhaupt nichts. Metalle bilden eine
          strikte Hackordnung, die <strong>Spannungsreihe</strong>: von Elektronendrängern
          (Magnesium, Zink, Eisen) hinunter zu Elektronenhortern (Kupfer, Silber, Gold). Ein Metall
          kann nur Metalle <em>unter</em> sich verdrängen. Gold sitzt ganz unten — es weigert sich,
          oxidiert zu werden, und genau deshalb glänzt es nach 5000 Jahren im Pharaonengrab noch
          immer.
        </p>

        <div className="callout note">
          <span className="co-title">&bdquo;Edel&ldquo; ist ein chemischer Fachbegriff</span>
          <p>
            Edelmetalle (Gold, Silber, Platin) halten ihre Elektronen fest; unedle Metalle (Zink,
            Eisen) geben ihre bereitwillig her. Alltagskorrosion folgt der Tabelle: Eisen rostet,
            Gold nicht — und Verzinken funktioniert, indem man ein <em>unedleres</em> Metall (Zink)
            auf Eisen schraubt, sodass das Zink sich zuerst opfert. Genau diese Hackordnung nutzt du
            in der nächsten Lektion, um eine Batterie zu bauen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Verdrängungs-Duell",
      intro: (
        <>
          <p>Ein Becherglas, zwei Experimente — und nur eines funktioniert.</p>
          <ul>
            <li>Lass Zink in CuSO₄ laufen: Sieh zu, wie das Blau verblasst und eine Kupferkruste auf dem Streifen wächst.</li>
            <li>Versuche jetzt Kupfer in ZnSO₄ — und starre auf ein Becherglas, in dem nie etwas passieren wird.</li>
            <li>Sag es in Redox-Begriffen: Wer wird oxidiert, wer reduziert, und warum nur in eine Richtung?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Oxidation bedeutet…",
        choices: ["Elektronen aufnehmen", "gasförmig werden", "nur Sauerstoffatome aufnehmen", "Elektronen abgeben"],
        answer: 3,
        explain:
          "Merkspruch: Oxidation — Elektronen-Abgabe, Reduktion — Elektronen-Aufnahme. Sauerstoff war nur der historisch erste bekannte Elektronendieb.",
      },
      {
        q: "Warum müssen Oxidation und Reduktion immer zusammen auftreten?",
        choices: [
          "Ein abgegebenes Elektron muss von etwas aufgenommen werden — Elektronen verschwinden nicht",
          "Tradition",
          "Müssen sie nicht; jedes kann allein auftreten",
          "Weil Reaktionen Wärme brauchen",
        ],
        answer: 0,
        explain:
          "Die Elektronenbuchhaltung muss aufgehen. Jede Redoxreaktion ist ein Geber-Nehmer-Paar — daher 'Red-Ox' als ein Wort.",
      },
      {
        q: "Zink verdrängt Kupfer aus CuSO₄-Lösung, aber Kupfer verdrängt kein Zink aus ZnSO₄, weil…",
        choices: [
          "Kupfer schwerer ist",
          "ZnSO₄ nicht blau ist",
          "Zink in der Spannungsreihe höher steht — es gibt Elektronen bereitwilliger ab",
          "Kupfer sich zu schnell löst",
        ],
        answer: 2,
        explain:
          "Die Spannungsreihe ist eine Einbahn-Hackordnung der Elektronen-Abgabefreude. Das unedlere Metall reduziert die Ionen des edleren — nie umgekehrt.",
      },
      {
        q: "Warum findet man Gold in antiken Gräbern glänzend, während Eisenartefakte zerfallen?",
        choices: [
          "Gold ist dichter",
          "Gold widersteht der Oxidation — es sitzt am edlen Ende der Spannungsreihe",
          "Gräber sind sauerstofffrei",
          "Antikes Eisen war minderwertig",
        ],
        answer: 1,
        explain:
          "Korrosion ist langsame Oxidation. Eisen gibt Sauerstoff bereitwillig Elektronen ab; Gold praktisch nie — Edelheit ist Korrosionsbeständigkeit.",
      },
    ],
  },

  /* ================================================================ */
  galvanic: {
    Theory: () => (
      <>
        <h2>Der Trick: die Hälften trennen</h2>
        <p>
          Im Becherglas reichte Zink dem Cu²⁺ seine Elektronen direkt — die Energie ging als
          nutzlose Wärme verloren. Eine <strong>galvanische Zelle</strong> teilt die Reaktion auf
          zwei Räume: Zink im einen Becherglas, Kupferionen im anderen, die Metalle verbunden durch
          einen <strong>Draht</strong> und die Lösungen durch eine <strong>Salzbrücke</strong> (die
          Ionen hinüberdriften lässt, damit beide Seiten elektrisch neutral bleiben). Zink besteht
          weiterhin darauf, Elektronen abzuwerfen — aber der einzige Weg zu den wartenden Cu²⁺
          führt jetzt <em>durch den Draht</em>. Ein Elektronenstrom, den du ernten kannst: Chemie,
          die zu Elektrizität wird.
        </p>
        <div className="formula">
          E°<sub>Zelle</sub> = E°(Kathode) − E°(Anode)
          <span className="note">jedes Metall hat ein Standardpotenzial E°; die Zellspannung ist der Abstand zwischen beiden</span>
        </div>
        <p>
          Jede Halbreaktion hat ein gemessenes <strong>Standardpotenzial E°</strong> — die
          Spannungsreihe mit Zahlen (Zn: −0,76 V, Cu: +0,34 V, Ag: +0,80 V). Die Spannung einer
          Zelle ist schlicht die <em>Differenz</em>: Zn/Cu liefert 1,10 V. Mehr gefällig? Nimm
          Metalle, die weiter auseinanderliegen, oder schalte Zellen in <strong>Reihe</strong> — ein
          9-V-Block ist buchstäblich sechs 1,5-V-Zellen im Trenchcoat.
        </p>

        <h2>Anode, Kathode und der Namensnebel</h2>
        <p>
          Die Elektrode, die <em>oxidiert</em> wird (Zink, das sich auflöst), ist die{" "}
          <strong>Anode</strong> — der Minuspol der Batterie. Die Elektrode, an der{" "}
          <em>Reduktion</em> stattfindet (Kupfer, dessen Belag wächst), ist die{" "}
          <strong>Kathode</strong>, der Pluspol. Elektronen fließen außen von der Anode zur Kathode.
          Jede Batterie, die du besitzt — von der AA in der Fernbedienung bis zur Lithiumzelle im
          Handy — ist dieselbe Architektur mit ausgefeilterer Chemie: zwei Halbreaktionen
          unterschiedlicher Gier, getrennt, und am Draht besteuert.
        </p>

        <div className="callout tip">
          <span className="co-title">Für Spark-Academy-Absolventen</span>
          <p>
            Hier geben sich die beiden Kurse die Hand: Die Spannungsquelle, die du in jeder
            Schaltung als gegeben hingenommen hast — die &bdquo;Ladungspumpe&ldquo; — ist eine
            auseinandergehaltene Redoxreaktion. Der Pumpendruck ist E°<sub>Zelle</sub>; die Pumpe
            läuft leer, wenn ein Edukt ausgeht. Und der Innenwiderstand? Vor allem die Trägheit der
            Ionen beim Queren des Elektrolyten — wie dir deine Zitrone im Abschlussprojekt
            nachdrücklich vorführen wird.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Bau-dir-eine-Batterie",
      intro: (
        <>
          <p>Zwei Halbzellen, eine Salzbrücke, ein Lämpchen — und deine Wahl der Elektroden.</p>
          <ul>
            <li>Klassisch Zn/Cu: Bestätige 1,10 V. Dann jage das Maximum — welches Paar gewinnt?</li>
            <li>Wähle zweimal dasselbe Metall. Warum genau bleibt das Lämpchen dunkel?</li>
            <li>Tausche Anode und Kathode zu einer negativen Spannung — in welche Richtung würden die Elektronen tatsächlich fließen?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Warum müssen die Elektronen in einer galvanischen Zelle durch den äußeren Draht?",
        choices: [
          "Drähte ziehen Elektronen an",
          "Die Salzbrücke blockiert Elektronen absichtlich",
          "Die beiden Halbreaktionen sind räumlich getrennt — der Draht ist der einzige Weg zum Empfänger",
          "Müssen sie nicht; sie schwimmen durch die Lösung",
        ],
        answer: 2,
        explain:
          "Die Trennung ist die ganze Erfindung: Gebermetall und Empfängerionen berühren sich nie, also wird die zwingende Elektronenübertragung durch deinen Stromkreis geleitet.",
      },
      {
        q: "Was macht die Salzbrücke?",
        choices: [
          "Sie trägt die Elektronen",
          "Sie lässt Ionen zwischen den Bechergläsern driften, damit beide Seiten neutral bleiben",
          "Sie fügt Salz für die Leitfähigkeit des Drahtes hinzu",
          "Sie erwärmt die Reaktion",
        ],
        answer: 1,
        explain:
          "Während Elektronen ein Becherglas verlassen und im anderen ankommen, würde sich Ladung aufstauen und die Zelle binnen Mikrosekunden abwürgen. Wandernde Ionen gleichen das aus.",
      },
      {
        q: "Zn hat E° = −0,76 V und Ag hat E° = +0,80 V. Eine Zn/Ag-Zelle liefert…",
        choices: ["1,56 V", "0,04 V", "0,76 V", "−1,56 V"],
        answer: 0,
        explain: "E°Zelle = E°(Kathode) − E°(Anode) = 0,80 − (−0,76) = 1,56 V. Weiter auseinander in der Reihe = mehr Volt.",
      },
      {
        q: "Die Anode einer Batterie ist die Elektrode, an der…",
        choices: [
          "Reduktion stattfindet; sie ist der Pluspol",
          "Ionen aus dem Nichts entstehen",
          "nichts passiert",
          "Oxidation stattfindet; sie ist der Minuspol",
        ],
        answer: 3,
        explain:
          "Merkhilfe: An-Ode und Ox-idation. Sie löst sich auf und gibt dabei die Elektronen ab, die sie zum Minuspol machen.",
      },
    ],
  },

  /* ================================================================ */
  electrolysis: {
    Theory: () => (
      <>
        <h2>Chemie bergauf treiben</h2>
        <p>
          Wasser wird sich niemals von selbst in Wasserstoff und Sauerstoff spalten — diese Reaktion
          läuft steil bergauf (sie ist die Umkehrung der explosiven Wasserstoffverbrennung). Aber
          drücke mit einem Netzteil Elektronen hinein und du kannst sie <em>erzwingen</em>:{" "}
          <strong>Elektrolyse</strong>, die galvanische Zelle rückwärts. Unterhalb einer
          Schwellenspannung passiert überhaupt nichts; darüber treibt der Strom die Reaktion und
          Gase blühen an den Elektroden auf:
        </p>
        <div className="formula">
          2 H₂O → 2 H₂ + O₂
          <span className="note">braucht theoretisch ≥ 1,23 V, praktisch ~1,8 V — und beachte das Gasverhältnis 2:1, die Formel des Wassers sichtbar gemacht</span>
        </div>
        <p>
          Wasserstoff erscheint an der Kathode (Minuspol: Reduktion, Elektronen rein), Sauerstoff an
          der Anode (Pluspol: Oxidation, Elektronen raus) — und zwar doppelt so viel Wasserstoff wie
          Sauerstoff, weil jedes Wassermolekül zwei H auf ein O trägt. Elektrolyse ist eine
          chemische Formel, der du beim Füllen zweier Reagenzgläser zusehen kannst.
        </p>

        <h2>Wo sich die erzwungene Reaktion bezahlt macht</h2>
        <ul>
          <li>
            <strong>Aluminium</strong> — so fest in seinem Erz eingeschlossen, dass nur rohe
            elektrochemische Gewalt es befreit. Hütten verschlingen Strommengen im Landesmaßstab;
            eine Dose zu recyceln kostet 5 % einer neuen.
          </li>
          <li>
            <strong>Galvanisieren</strong> — eine dünne erzwungene Schicht Chrom, Silber oder Gold
            auf billigerem Metall. Schmuck, Besteck, Korrosionsschutz.
          </li>
          <li>
            <strong>Eine Batterie laden</strong> — der Alltagsfall: Laden ist buchstäblich
            Elektrolyse der entladenen Batteriechemie, die wieder bergauf geschoben wird, damit sie
            durch dein Handy wieder hinunterlaufen kann.
          </li>
          <li>
            <strong>Grüner Wasserstoff</strong> — überschüssiger Solar-/Windstrom, gespeichert als
            H₂, später in einer Brennstoffzelle zurückgezahlt (eine galvanische Zelle, die
            Wasserstoff höflich verbrennt).
          </li>
        </ul>

        <div className="callout note">
          <span className="co-title">Die Energiebilanz geht immer auf</span>
          <p>
            Die Volt, die du ins Spalten von Wasser investierst, kommen zurück — praktisch sogar
            weniger — wenn der Wasserstoff wieder rekombiniert. Elektrolyse erzeugt keine Energie;
            sie <em>speichert</em> sie in Bindungen. Die Thermodynamik führt tadellos Buch; der
            Gewinn liegt im <em>Wann</em> und <em>Wo</em>, nicht im <em>Wie viel</em>.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Wasserspalter",
      intro: (
        <>
          <p>Zwei Elektroden, zwei Auffangröhrchen, ein Spannungsregler.</p>
          <ul>
            <li>Fahre die Spannung langsam hoch — finde die Schwelle, unter der nichts blubbert.</li>
            <li>Lass die Röhrchen volllaufen und prüfe die Verhältnisanzeige: warum 2 : 1?</li>
            <li>Welches Röhrchen füllt sich an der Minus-Elektrode, und welche Redox-Hälfte passiert dort?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Elektrolyse unterscheidet sich von einer galvanischen Zelle dadurch, dass…",
        choices: [
          "sie keine Elektroden benutzt",
          "sie Strom erzeugt",
          "sie nur mit geschmolzenen Metallen funktioniert",
          "äußere elektrische Energie eine nicht freiwillige Reaktion erzwingt",
        ],
        answer: 3,
        explain:
          "Galvanisch: eine willige Reaktion zahlt Volt aus. Elektrolytisch: du zahlst Volt, um die Reaktion rückwärts zu treiben. Gleiche Architektur, umgekehrter Energiefluss.",
      },
      {
        q: "Beim Spalten von Wasser entsteht doppelt so viel H₂ wie O₂, weil…",
        choices: [
          "Wasserstoff leichter ist",
          "jedes H₂O zwei Wasserstoffatome pro Sauerstoff enthält",
          "Sauerstoff aus dem Röhrchen entweicht",
          "die Kathode größer ist",
        ],
        answer: 1,
        explain:
          "Sichtbar gemachte Stöchiometrie: 2 H₂O → 2 H₂ + O₂. Die Röhrchen zeigen die Summenformel des Wassers an.",
      },
      {
        q: "Unterhalb von etwa 1,2 V erzeugt die Wasserelektrolyse…",
        choices: [
          "nichts — der angelegte Schub ist kleiner als die Steigung der Reaktion",
          "halb so viel Gas",
          "nur Wasserstoff",
          "Dampf",
        ],
        answer: 0,
        explain:
          "Die Schwelle ist der Energiepreis pro Elektron für die Bergauf-Reaktion. Zahlst du weniger, nimmt kein Elektron den Deal an.",
      },
      {
        q: "Eine Akkubatterie zu laden ist in Wahrheit…",
        choices: [
          "sie mit frischen Elektronen aufzufüllen",
          "ihre Chemikalien zu erwärmen",
          "Elektrolyse: ihre Entladereaktion wird zum Rückwärtslaufen gezwungen",
          "ein Softwarevorgang",
        ],
        answer: 2,
        explain:
          "Das Ladegerät treibt die verbrauchte Chemie der Zelle bergauf und stellt die Edukte wieder her. Beim Entladen läuft dann wieder die galvanische Richtung — ein chemischer Kreislauf.",
      },
    ],
  },

  /* ================================================================ */
  "lemon-battery": {
    Theory: () => (
      <>
        <h2>Die Einkaufsliste</h2>
        <p>
          3–4 Zitronen (oder Kartoffeln — das Gemüse ist nur der Elektrolyt, nicht der Treibstoff!),
          verzinkte Schrauben, Kupfermünzen oder abisolierter Kupferdraht, Krokodilklemmen oder
          festgeklebter Draht, und eine <strong>rote LED</strong> — rot, weil sie die niedrigste
          Einschaltspannung hat (~1,9 V; blau braucht ~3 V und wird dein Obst demütigen).
        </p>

        <h2>Was du tatsächlich baust</h2>
        <p>
          Jede Zitrone ist eine galvanische Zn/Cu-Zelle aus Lektion 6.2: Die Zinkschraube ist die
          Anode (wird oxidiert, löst sich unsichtbar langsam auf), die Kupfermünze die Kathode, die
          Zitronensäure Elektrolyt und Salzbrücke in einem. Die Theorie sagt ~1,1 V; eine echte
          Zitrone liefert etwa <strong>0,9 V</strong> — und, entscheidend, nur ein Rinnsal Strom,
          weil Ionen beim Queren von Zitronenfruchtfleisch auf enormen{" "}
          <strong>Innenwiderstand</strong> stoßen (dein Spark-Academy-Vokabular, jetzt mit Saft).
        </p>
        <div className="formula">
          U<sub>gesamt</sub> = Zellen × ~0,9 V
          <span className="note">Reihenschaltung: Zn der einen Zitrone an Cu der nächsten — Spannungen addieren sich, der Widerstand leider auch</span>
        </div>
        <p>
          Eine Zitrone (0,9 V) kann eine 1,9-V-LED nicht öffnen — der Elektronenschub ist schlicht
          zu schwach, egal wie lange du wartest. Zwei Zitronen (1,8 V) stehen quälend nah an der
          Türschwelle. Bei <strong>drei Zitronen (~2,7 V)</strong> öffnet die LED und glimmt —
          schwach, ehrlich, weil der aufsummierte Innenwiderstand den Strom auf einige zehn
          Mikroampere abwürgt. Genau dieses schwache Glimmen ist der Punkt: Du kannst seine
          Schwäche quantitativ <em>begründen</em>, mit dem Wissen aus zwei Kursen.
        </p>

        <div className="callout warn">
          <span className="co-title">Fehlersuche am echten Aufbau</span>
          <p>
            LED bleibt dunkel? Prüfe zuerst die Polung (langes Bein = +, zum letzten Kupfer). Dann
            drücke und rolle jede Zitrone, um die Zellwände zu brechen, stecke die Elektroden tiefer
            (aber innen nie berührend), schmirgle das Zink blank und stelle sicher, dass jede
            Verbindung Zn → Cu geht, nicht Zn → Zn. Eine LED ist eine Diode — rückwärts sperrt sie
            komplett, wie ein Spark-Absolvent erwarten würde.
          </p>
        </div>

        <div className="callout tip">
          <span className="co-title">Wo dich das hinbringt</span>
          <p>
            Du hast jetzt den ganzen Bogen zurückgelegt: Atome → Bindungen → Reaktionen → Mol →
            Säuren → Energie → Elektronen, die in einem Draht Arbeit verrichten. Die Zitrone auf
            deinem Schreibtisch ist das Kursdiplom vor dem Zertifikat: eine chemische Energiequelle,
            die du von der Elektronenschale aufwärts verstehst. Hake unten jeden Punkt ab — das
            Zertifikat schaltet frei, wenn beide Abschlussprojekte fertig sind.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling: Der Zitronenstapel",
      intro: (
        <>
          <p>Simuliere den Aufbau, bevor du den echten unter Saft setzt.</p>
          <ul>
            <li>Eine Zitrone: 0,9 V — dunkel. Zwei: 1,8 V — immer noch dunkel. Finde die magische Zahl.</li>
            <li>Beobachte die Strommessung: Selbst leuchtend sind es Mikroampere. Schuld ist der Innenwiderstand.</li>
            <li>Würden sechs Zitronen sie blenden hell machen? Prüfe, wie viel die Helligkeit tatsächlich gewinnt.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "gather", text: "Besorgen: 3–4 Zitronen, verzinkte (Zink-)Schrauben, Kupfermünzen/-draht, Verbindungskabel, eine rote LED." },
      { id: "roll", text: "Jede Zitrone kräftig rollen und drücken, um die inneren Zellwände zu brechen (besserer Elektrolytkontakt)." },
      { id: "electrodes", text: "In jede Zitrone eine Zinkschraube und ein Kupferstück stecken, ein paar cm auseinander, innen ohne Berührung." },
      { id: "series", text: "Die Zitronen in Reihe verkabeln: Kupfer jeder Zitrone an das Zink der nächsten." },
      { id: "measure", text: "Falls du ein Multimeter hast (Spark-Absolventen schon): eine Zitrone messen (~0,9 V) und den gesamten Stapel." },
      { id: "led", text: "LED anschließen — langes Bein (+) an das letzte Kupfer, kurzes Bein an das erste Zink — und das Licht im Raum dimmen." },
      { id: "explain", text: "Erkläre jemandem (oder einer Gummiente), warum eine Zitrone es nicht schafft und warum das Glimmen schwach ist — mit Anode, Kathode und Innenwiderstand." },
    ],
  },
};
