import type { LessonContentDe } from "../localize";

export const unit1De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  ionic: {
    Theory: () => (
      <>
        <h2>Ein Handel, bei dem beide gewinnen</h2>
        <p>
          Erinnerst du dich an die zwei frustrierten Familien aus Einheit 0: Alkalimetalle tragen{" "}
          <strong>ein Elektron zu viel</strong> auf ihrer obersten Schale, Halogenen fehlt{" "}
          <strong>genau eines</strong>. Bring Natrium und Chlor zusammen und die Lösung liegt auf
          der Hand — Natriums Außenelektron <em>zieht schlicht um</em>:
        </p>
        <div className="formula">
          Na (2·8·1) + Cl (2·8·7) → Na⁺ (2·8) + Cl⁻ (2·8·8)
          <span className="note">ein Elektron wandert; beide Ionen enden mit versiegelten, vollen Schalen</span>
        </div>
        <p>
          Nach dem Handel ist Natrium ein <strong>Kation</strong> (Na⁺) und Chlor ein{" "}
          <strong>Anion</strong> (Cl⁻) — und jetzt übernimmt die Elektrostatik: Ungleiche Ladungen
          ziehen sich mit brutaler Kraft an. Diese Anziehung <em>ist</em> die{" "}
          <strong>Ionenbindung</strong>. Nichts wird geklebt oder eingehakt; die Ionen können
          einander schlicht nicht mehr entkommen.
        </p>

        <h2>Keine Paare — Gitter</h2>
        <p>
          Ein Na⁺-Ion bindet nicht an <em>ein</em> Cl⁻; es zieht jedes negative Ion in seiner Nähe
          an. Das Ergebnis ist ein <strong>Kristallgitter</strong>: abwechselnd + und − Ionen in
          einem perfekten 3D-Raster gestapelt, jedes Ion von sechs Nachbarn gehalten. Deshalb gibt
          es &bdquo;ein Salzmolekül&ldquo; streng genommen gar nicht — NaCl ist ein <em>Verhältnis</em>, kein
          Molekül. Und deshalb sind Salze harte, spröde Kristalle mit hohen Schmelzpunkten: Um Salz
          zu schmelzen, musst du die Anziehung eines ganzen Gitters überwinden (801 °C bei NaCl).
        </p>

        <h2>Ladungen müssen aufgehen</h2>
        <p>
          Magnesium (2·8·2) wirft <em>zwei</em> Elektronen ab und wird zu Mg²⁺. Sauerstoff (2·6)
          will zwei und wird zu O²⁻ — also paaren sich MgO eins zu eins. Chlor nimmt aber nur{" "}
          <em>ein</em> Elektron an, also muss Magnesium zwei Kunden bedienen: MgCl₂. Die Formel
          jeder Ionenverbindung ist reine Ladungsbuchhaltung — die Summe der + muss die Summe der −
          aufheben.
        </p>

        <div className="callout warn">
          <span className="co-title">Ionenverbindungen ≠ ihre Elemente</span>
          <p>
            Natrium ist ein Metall, das in Wasser explodiert; Chlor ist ein Giftgas aus dem Ersten
            Weltkrieg. Ihre Ionenverbindung streust du auf Pommes. Die Eigenschaften einer
            Verbindung gehören der Verbindung, nicht ihren Zutaten — eine der nützlichsten
            Überraschungen der Chemie.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Elektronen-Übergabe",
      intro: (
        <>
          <p>Lass eine Ionenbindung entstehen, ein Elektron nach dem anderen.</p>
          <ul>
            <li>Übertrage Natriums Außenelektron — beide Ionen leuchten geladen auf, beide Schalen schließen sich.</li>
            <li>Wechsle zu Mg + O: Jetzt braucht es <em>zwei</em> Übertragungen, damit beide zufrieden sind.</li>
            <li>Beachte nach der Übergabe die Anziehungspfeile — dieser Zug ist die Bindung.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was hält Na⁺ und Cl⁻ im Salz tatsächlich zusammen?",
        choices: [
          "Ein gemeinsames Elektronenpaar",
          "Elektrostatische Anziehung zwischen ungleichen Ladungen",
          "Winzige Häkchen an den Atomen",
          "Die Schwerkraft",
        ],
        answer: 1,
        explain:
          "Nach der Elektronenübertragung sind beide Teilchen geladene Ionen, und + zieht − an. Die Ionenbindung ist reine Elektrostatik — nichts wird geteilt.",
      },
      {
        q: "Warum bildet Magnesium MgCl₂, aber MgO (nicht MgO₂)?",
        choices: [
          "Chlor ist größer als Sauerstoff",
          "Ladungen müssen aufgehen: Mg²⁺ braucht zwei Cl⁻, aber nur ein O²⁻",
          "Sauerstoff ist ein Gas",
          "Das ist historische Konvention",
        ],
        answer: 1,
        explain:
          "Mg gibt 2 Elektronen ab. Jedes Cl nimmt eines (also braucht es zwei); ein O nimmt beide. Formeln von Ionenverbindungen sind Ladungsbuchhaltung.",
      },
      {
        q: "Warum haben Salze so hohe Schmelzpunkte?",
        choices: [
          "Ihre Atome sind ungewöhnlich schwer",
          "Schmelzen muss die Anziehung eines ganzen Ionengitters überwinden",
          "Sie enthalten Wasser",
          "Haben sie nicht — Salze schmelzen leicht",
        ],
        answer: 1,
        explain:
          "Jedes Ion wird von all seinen ungleich geladenen Nachbarn im 3D-Gitter gehalten. Diesen kollektiven Griff zu brechen kostet ernsthaft Hitze — 801 °C bei NaCl.",
      },
      {
        q: "Natriummetall explodiert in Wasser; Chlor ist giftig. Warum ist NaCl auf deinen Pommes harmlos?",
        choices: [
          "Die gefährlichen Anteile verdampfen",
          "Die Eigenschaften einer Verbindung sind ihre eigenen, keine Mischung ihrer Elemente",
          "Kochsalz enthält fast kein Natrium",
          "Das Kochen neutralisiert sie",
        ],
        answer: 1,
        explain:
          "Na⁺-Ionen mit versiegelten Schalen sind chemisch etwas völlig anderes als neutrale Na-Atome mit lockerem Elektron. Neue Elektronenstruktur, neue Eigenschaften.",
      },
    ],
  },

  /* ================================================================ */
  covalent: {
    Theory: () => (
      <>
        <h2>Der Kompromiss der Nichtmetalle</h2>
        <p>
          Zwei Chloratome treffen sich. Beiden fehlt ein Elektron; keines will eines hergeben. Der
          Ausweg: Jedes steuert ein Elektron zu einem <strong>gemeinsamen Paar</strong> bei, das
          zwischen den Kernen sitzt und — hier kommt der Trick —{" "}
          <strong>für beide Schalen zugleich zählt</strong>. Jedes Cl &bdquo;sieht&ldquo; nun 8
          Außenelektronen. Dieses gemeinsame Paar ist eine <strong>kovalente Bindung</strong>
          (Atombindung), und die gebundene Einheit ist ein <strong>Molekül</strong>.
        </p>

        <h2>Einfach, doppelt, dreifach</h2>
        <p>
          Ein gemeinsames Paar ergibt eine <strong>Einfachbindung</strong> (H–H). Reicht ein Paar
          nicht, teilen Atome zwei (eine <strong>Doppelbindung</strong>, O=O) oder gar drei (eine{" "}
          <strong>Dreifachbindung</strong>, N≡N). Mehr geteilte Paare binden fester:
          Stickstoffs Dreifachbindung ist so stark, dass N₂ — 78 % der Luft, die du atmest — sich
          fast wie ein Edelgas verhält. Sie zu brechen, um Dünger zu machen (Haber-Bosch-Verfahren),
          verschlingt rund 1 % des gesamten Energieverbrauchs der Menschheit.
        </p>
        <div className="formula">
          H braucht 2 · die meisten anderen brauchen 8
          <span className="note">zähle die eigenen Elektronen jedes Atoms + eines pro gemeinsamem Paar — der Oktett-Check</span>
        </div>

        <h2>Ein Molekül lesen</h2>
        <p>
          Kohlenstoff hat 4 Valenzelektronen und braucht 4 weitere, also macht er{" "}
          <strong>vier Bindungen</strong> — die vier Hände, mit denen er Ketten, Ringe und
          schließlich DNA baut. Sauerstoff macht zwei Bindungen, Stickstoff drei, Wasserstoff genau
          eine. Mit dieser einen Abzählregel sagst du die Form der meisten kleinen Moleküle voraus:
          H₂O ist Sauerstoff, der mit zwei Händen zwei Wasserstoffe hält; CO₂ ist Kohlenstoff, der
          zwei Sauerstoffe doppelt fasst; CH₄ ist Kohlenstoff mit vier Wasserstoffen.
        </p>

        <div className="callout note">
          <span className="co-title">Freie Paare zählen auch</span>
          <p>
            Elektronen, die zu Hause bleiben (nicht geteilt werden), heißen{" "}
            <strong>freie Elektronenpaare</strong>. Sie brauchen Platz und drängeln die Bindungen
            zur Seite — deshalb ist Wasser mit ~104,5° gewinkelt statt gerade. Und ein gewinkeltes
            Molekül mit ungleich verteilten Elektronen wird zu einem kleinen Magneten… was die
            nächste Lektion ist und letztlich der Grund, warum Eis schwimmt und Leben funktioniert.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die Molekül-Werkstatt",
      intro: (
        <>
          <p>Sechs Moleküle, vom einzelnen gemeinsamen Paar bis zur Dreifachbindung.</p>
          <ul>
            <li>Prüfe den Oktett-Zähler unter jedem Atom: eigene Elektronen + geteilte Paare.</li>
            <li>Vergleiche O₂ und N₂ — zähle die türkisen Paare in der Bindung.</li>
            <li>Schau dir H₂Os violette freie Paare an, die das Molekül in die Winkelform drücken.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Bei einer kovalenten Bindung zählt das gemeinsame Elektronenpaar…",
        choices: [
          "zum größeren Atom",
          "gleichzeitig zu den Schalen beider Atome",
          "für beide Atome als verloren",
          "gar nicht, es kreist zufällig um das Molekül",
        ],
        answer: 1,
        explain:
          "Das ist der kovalente Trick: ein Paar, zwei Buchhaltungen. Jedes Atom rechnet das gemeinsame Paar seiner eigenen vollen Schale zu.",
      },
      {
        q: "Warum ist N₂ so reaktionsträge, dass es 78 % der Luft ausmacht, ohne viel zu tun?",
        choices: [
          "Stickstoff ist ein Edelgas",
          "Seine Atome sind zu weit voneinander entfernt",
          "Seine Dreifachbindung ist extrem stark und schwer zu brechen",
          "Es ist leichter als Sauerstoff",
        ],
        answer: 2,
        explain:
          "Drei geteilte Paare binden die beiden N-Atome mit einer der stärksten Bindungen der Chemie. Sie zu brechen (z. B. im Haber-Bosch-Verfahren) kostet enorme Energie.",
      },
      {
        q: "Wie viele kovalente Bindungen bildet Kohlenstoff typischerweise, und warum?",
        choices: [
          "2 — er hat 2 übrige Elektronen",
          "4 — er hat 4 Valenzelektronen und braucht 4 weitere",
          "8 — eine pro Oktett-Elektron",
          "Das schwankt zufällig",
        ],
        answer: 1,
        explain:
          "Mit 4 Valenzelektronen und 4 Lücken teilt Kohlenstoff vier Paare. Diese vier Hände machen ihn zum Rückgrat der organischen Chemie.",
      },
      {
        q: "Warum ist das Wassermolekül gewinkelt statt gerade?",
        choices: [
          "Die Wasserstoffatome stoßen sich ab",
          "Sauerstoffs zwei freie Elektronenpaare brauchen Platz und drücken die Bindungen zusammen",
          "Die Schwerkraft biegt es",
          "Ist es nicht — Wasser ist linear",
        ],
        answer: 1,
        explain:
          "Sauerstoff trägt zwei ungeteilte (freie) Paare. Elektronenwolken stoßen sich ab, also quetschen die freien Paare die beiden O–H-Bindungen auf ~104,5°.",
      },
    ],
  },

  /* ================================================================ */
  "bond-spectrum": {
    Theory: () => (
      <>
        <h2>Der dritte Deal: das Elektronenmeer</h2>
        <p>
          Metallatome wollen alle Elektronen <em>abgeben</em> — sind also nur Metallatome in der
          Nähe, nimmt sie niemand. Die Lösung ist kollektiv: Jedes Atom entlässt seine
          Valenzelektronen in ein gemeinsames, bewegliches{" "}
          <strong>&bdquo;Elektronenmeer&ldquo;</strong>, das um ein Gitter positiver Metallionen schwappt. Das
          Meer verklebt das Gitter — das ist die <strong>Metallbindung</strong> — und weil die
          Elektronen frei driften können, leiten Metalle Strom und Wärme und lassen sich biegen,
          ohne zu zersplittern (die Ionen gleiten, das Meer fließt um sie herum). Ein Bild erklärt
          Draht, Spiegel und Hufeisen zugleich.
        </p>

        <h2>Elektronegativität: die Zugkraft-Bewertung</h2>
        <p>
          Ionisch und kovalent sind keine zwei Schubladen — sie sind die Enden eines Reglers. Was
          den Regler stellt, ist die <strong>Elektronegativität (χ)</strong>: wie stark ein Atom an
          gemeinsamen Elektronen zieht. Fluor ist der Champion (χ = 3,98); Francium und Caesium
          ziehen kaum (χ ≈ 0,8). Für jede Bindung berechne die Differenz:
        </p>
        <div className="formula">
          Δχ &lt; 0,4: unpolar kovalent&nbsp;&nbsp;·&nbsp;&nbsp;0,4 – 1,7: polar kovalent&nbsp;&nbsp;·&nbsp;&nbsp;Δχ &gt; 1,7: ionisch
          <span className="note">Faustregeln — die Grenzen sind fließend, die Idee ist es nicht</span>
        </div>
        <p>
          Eine <strong>polare Atombindung</strong> ist ein Tauziehen, das eine Seite gewinnt: Das
          Paar wird geteilt, hängt aber zum stärkeren Atom, das dadurch leicht negativ wird (δ−),
          während das schwächere Ende leicht positiv wird (δ+). Das Molekül wird zum winzigen
          Zweipol-Magneten — einem <strong>Dipol</strong>.
        </p>

        <h2>Warum Polarität die Welt regiert</h2>
        <p>
          Wasser ist das Paradebeispiel: O–H-Bindungen sind stark polar (Δχ = 1,24), und die
          gewinkelte Form (letzte Lektion!) verhindert, dass sich die beiden Dipole aufheben. Also
          hat jedes Wassermolekül eine − und eine + Seite, und benachbarte Moleküle schnappen wie
          schwache Magnete zusammen — <strong>Wasserstoffbrücken</strong>. Deshalb siedet Wasser
          bei 100 °C statt bei −80 °C, deshalb löst es Salze (seine Pole hebeln Ionen aus dem
          Gitter), und deshalb schwimmt Eis. Ohne Polarität keine Ozeane, kein Du.
        </p>

        <div className="callout tip">
          <span className="co-title">Gleiches löst Gleiches</span>
          <p>
            Polare Lösungsmittel (Wasser) lösen Polares und Ionisches (Salz, Zucker). Unpolare
            Lösungsmittel (Öl) lösen Unpolares (Fett, Wachs). Diese eine Regel erklärt, warum sich
            Öl und Wasser weigern zu mischen — und warum du Seife brauchst, ein Molekül mit einem
            polaren Ende und einem unpolaren Schwanz, um beide Welten zu verbinden.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Tauzieh-Klassifikator",
      intro: (
        <>
          <p>Wähle zwei beliebige Atome und sieh zu, wie die Elektronenwolke den Streit entscheidet.</p>
          <ul>
            <li>Na + Cl: Die Wolke wird komplett abgerissen — ionisch.</li>
            <li>H + O: Die Wolke hängt durch — polar kovalent, mit δ+ und δ− Polen.</li>
            <li>C + H: fast ein fairer Kampf — dieses nahezu unpolare Paar ist der Grund, warum Öl Wasser ignoriert.</li>
            <li>Cu + Fe: zwei Metalle — kein Tauziehen, nur das Elektronenmeer.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Warum leiten Metalle elektrischen Strom?",
        choices: [
          "Ihre Kerne sind geladen",
          "Ihre Valenzelektronen bilden ein bewegliches Meer, das durchs Gitter driften kann",
          "Sie enthalten eingefangene Blitze",
          "Ihre Atome schwingen schnell",
        ],
        answer: 1,
        explain:
          "In der Metallbindung gehören Valenzelektronen keinem Atom im Besonderen. Frei driftende Ladung ist genau das, was ein elektrischer Strom braucht.",
      },
      {
        q: "Elektronegativität misst…",
        choices: [
          "die Masse eines Atoms",
          "wie stark ein Atom an gemeinsamen Bindungselektronen zieht",
          "wie negativ ein Ion werden kann",
          "die Größe eines Atoms",
        ],
        answer: 1,
        explain:
          "χ bewertet die Zugkraft im Tauziehen um gemeinsame Paare. Die Differenz Δχ zweier Atome sagt den Bindungstyp voraus.",
      },
      {
        q: "H–Cl hat Δχ ≈ 0,96. Diese Bindung ist…",
        choices: ["ionisch", "unpolar kovalent", "polar kovalent — geteilt, aber zum Cl verschoben", "metallisch"],
        answer: 2,
        explain:
          "0,4 < 0,96 < 1,7: geteilt, aber Chlor gewinnt das Tauziehen. Cl wird δ−, H wird δ+ — das Molekül ist ein Dipol.",
      },
      {
        q: "Warum löst sich Salz in Wasser, aber nicht in Öl?",
        choices: [
          "Öl ist zu dickflüssig",
          "Wassers polare Moleküle hebeln Ionen aus dem Gitter; unpolares Öl bietet keinen solchen Griff",
          "Salz hat Angst vor Öl",
          "Ölmoleküle sind zu groß",
        ],
        answer: 1,
        explain:
          "Wassers δ+/δ−-Pole umhüllen und stabilisieren die Ionen und übertreffen so das Gitter. Unpolares Öl hat keine Pole anzubieten — Gleiches löst Gleiches.",
      },
    ],
  },

  /* ================================================================ */
  "molecular-shapes": {
    Theory: () => (
      <>
        <h2>Eine Regel: Elektronengruppen stoßen sich ab</h2>
        <p>
          Moleküle sind dreidimensionale Gebilde mit festen Formen, und du kannst diese Formen mit
          einer einzigen Idee vorhersagen: <strong>VSEPR</strong> (Valenzschalen-Elektronenpaar-Abstoßung).
          Sie sagt: <em>Alle Elektronengruppen um ein Zentralatom stoßen sich gegenseitig ab und
          ordnen sich deshalb so weit voneinander entfernt an wie möglich.</em>
        </p>
        <p>
          Eine &bdquo;Gruppe&ldquo; ist entweder eine Bindung (einfach, doppelt oder dreifach — jede
          zählt einmal) oder ein <strong>freies Elektronenpaar</strong>: ein Valenzelektronenpaar am
          Zentralatom, das an nichts gebunden ist. Zähle die Gruppen, den Rest erledigt die
          Geometrie:
        </p>
        <table>
          <thead>
            <tr>
              <th>Gruppen</th>
              <th>Anordnung</th>
              <th>Winkel</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>2</td><td>linear</td><td>180°</td></tr>
            <tr><td>3</td><td>trigonal-planar</td><td>120°</td></tr>
            <tr><td>4</td><td>tetraedrisch</td><td>109,5°</td></tr>
          </tbody>
        </table>
        <p>
          Methan, CH₄, hat vier Bindungen und keine freien Paare — die Wasserstoffatome sitzen also
          auf den vier Ecken eines Tetraeders bei 109,5°. Nicht flach, sondern echt räumlich: Genau
          das macht die organische Chemie so reichhaltig.
        </p>

        <h2>Freie Paare drücken stärker</h2>
        <p>
          Ein freies Paar wird nur von einem Kern gehalten, breitet sich deshalb weiter aus und
          drückt <em>kräftiger</em> als ein Bindungspaar. Und benannt wird eine Form nach dem, was
          man sieht — den Atomen —, nicht nach den unsichtbaren freien Paaren.
        </p>
        <p>Nimm die drei Nachbarn aus Periode 2, jeder mit vier Elektronengruppen:</p>
        <ul>
          <li>
            <strong>Methan CH₄</strong>: 4 Bindungen, 0 freie Paare → <em>tetraedrisch</em>, 109,5°.
          </li>
          <li>
            <strong>Ammoniak NH₃</strong>: 3 Bindungen, 1 freies Paar → das Paar drückt die
            Bindungen nach unten: <em>trigonale Pyramide</em> bei 107°.
          </li>
          <li>
            <strong>Wasser H₂O</strong>: 2 Bindungen, 2 freie Paare → zwei Paare drücken:{" "}
            <em>gewinkelt</em> bei 104,5°.
          </li>
        </ul>
        <p>
          Jedes Mal dieselbe tetraedrische Grundanordnung; die beobachtete Form ändert sich nur,
          weil manche Ecken von etwas besetzt sind, das man nicht sehen kann.
        </p>

        <h2>Polare Bindungen ergeben nicht automatisch ein polares Molekül</h2>
        <p>
          Das ist die Pointe — und der Punkt, an dem am häufigsten falsch gedacht wird. Die
          Gesamtpolarität hängt <strong>sowohl</strong> von den Bindungsdipolen{" "}
          <strong>als auch</strong> von der Form ab, denn Dipole sind Vektoren: Sie können sich
          gegenseitig aufheben.
        </p>
        <p>
          <strong>Kohlenstoffdioxid, O=C=O</strong>, hat zwei stark polare Bindungen. Aber das
          Molekül ist linear, also zeigen beide Züge exakt in Gegenrichtung und heben sich perfekt
          auf. CO₂ ist <em>unpolar</em> — trotz polarer Bindungen.
        </p>
        <p>
          <strong>Wasser, H₂O</strong>, hat ebenfalls zwei polare Bindungen — ist aber mit 104,5°
          gewinkelt, sodass sich die Züge <em>nicht</em> aufheben. Sie addieren sich zu einem
          kräftigen Gesamtdipol, der von den Wasserstoffatomen zum Sauerstoff zeigt. Wasser ist ein
          stark polares Molekül.
        </p>
        <div className="callout tip">
          <span className="co-title">Alles Weitere hängt an diesen 104,5°</span>
          <p>
            Weil Wasser gewinkelt und polar ist, löst es Salze und Zucker, steigt in Baumstämmen
            hoch, hat eine riesige Wärmekapazität, die das Klima stabilisiert — und sein Feststoff
            ist weniger dicht als die Flüssigkeit, weshalb Eis schwimmt und Seen von oben zufrieren.
            Fehlten dem Sauerstoff diese zwei freien Paare, wäre Wasser ein lineares, unpolares Gas
            bei Raumtemperatur — und nichts davon, dich eingeschlossen, gäbe es.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Formen & Polarität",
      intro: (
        <>
          <p>Fünf Moleküle, gezeichnet mit ihren freien Paaren und ihrem Gesamtdipol.</p>
          <ul>
            <li>Geh CH₄ → NH₃ → H₂O durch und sieh zu, wie die freien Paare den Bindungswinkel jedes Mal weiter zusammendrücken.</li>
            <li>Vergleiche CO₂ und H₂O: Beide haben zwei polare Bindungen, aber nur eines ist ein polares Molekül. Die Form entscheidet.</li>
            <li>Blende die freien Paare aus. Plötzlich wirkt die Form willkürlich — genau deshalb zählt VSEPR mit, was man nicht sieht.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was bestimmt laut VSEPR die Molekülform?",
        choices: [
          "Elektronengruppen um das Zentralatom stoßen sich ab und gehen maximal auf Abstand",
          "Die Atome ordnen sich nach ihrer Atommasse",
          "Moleküle nehmen immer die flachste mögliche Form an",
          "Der Kern zieht alle Atome in eine Linie",
        ],
        answer: 0,
        explain:
          "Bindungen und freie Paare sind Bereiche negativer Ladung. Sie stoßen sich ab, und die Form ist diejenige Anordnung, die ihren Abstand maximiert.",
      },
      {
        q: "Wassers Bindungswinkel beträgt 104,5°, weniger als Methans 109,5°. Warum?",
        choices: [
          "Sauerstoff ist schwerer als Kohlenstoff",
          "Wasser hat nur zwei Bindungen, die sich deshalb weniger ausbreiten",
          "Wassers zwei freie Paare stoßen stärker ab als Bindungspaare und drücken die Bindungen zusammen",
          "Wassermoleküle schwingen ständig",
        ],
        answer: 2,
        explain:
          "Ein freies Paar wird nur von einem Kern gehalten, breitet sich weiter aus und drückt kräftiger — der H-O-H-Winkel sinkt unter den idealen Tetraederwert.",
      },
      {
        q: "CO₂ hat zwei polare C=O-Bindungen, ist aber ein unpolares Molekül. Warum?",
        choices: [
          "Die Bindungen sind in Wirklichkeit unpolar",
          "Es ist linear, sodass die beiden Bindungsdipole entgegengesetzt zeigen und sich aufheben",
          "Kohlenstoffdioxid ist ionisch",
          "Sauerstoff und Kohlenstoff haben dieselbe Elektronegativität",
        ],
        answer: 1,
        explain:
          "Dipole sind Vektoren. In einem linearen O=C=O zeigen die beiden gleich großen Züge 180° auseinander und summieren sich zu null.",
      },
      {
        q: "Ein Zentralatom hat 3 Bindungen und 1 freies Paar. Welche Form hat das Molekül?",
        choices: ["Tetraedrisch", "Trigonal-planar", "Trigonal-pyramidal", "Linear"],
        answer: 2,
        explain:
          "Vier Elektronengruppen ordnen sich tetraedrisch an, benannt werden aber nur die sichtbaren Atome: drei von einem freien Paar heruntergedrückte Bindungen bilden eine trigonale Pyramide — wie NH₃.",
      },
      {
        q: "Welches Paar von Tatsachen macht ein Molekül insgesamt polar?",
        choices: [
          "Polare Bindungen und eine symmetrische Form",
          "Polare Bindungen und eine asymmetrische Form, die ihr Aufheben verhindert",
          "Unpolare Bindungen und eine asymmetrische Form",
          "Jedes Molekül, das Sauerstoff enthält",
        ],
        answer: 1,
        explain:
          "Beides ist nötig: Bindungsdipole müssen existieren, und die Geometrie darf sie nicht aufheben. Symmetrische Moleküle mit polaren Bindungen (CO₂, CH₄, BF₃) sind unpolar.",
      },
    ],
  },

  /* ================================================================ */
  intermolecular: {
    Theory: () => (
      <>
        <h2>Die Kräfte zwischen, nicht innerhalb</h2>
        <p>
          Kovalente Bindungen halten ein Molekül zusammen.{" "}
          <strong>Zwischenmolekulare Kräfte</strong> halten getrennte Moleküle <em>aneinander</em>.
          Sie sind weit schwächer — typisch wenige Prozent — und tauchen in keiner
          Reaktionsgleichung auf. Trotzdem entscheiden sie fast jede beobachtbare physikalische
          Eigenschaft: Schmelzpunkt, Siedepunkt, Viskosität, Oberflächenspannung, Löslichkeit.
        </p>
        <p>Drei Sorten zählen, die schwächste zuerst.</p>

        <h3>1. London-Dispersionskräfte (in allem)</h3>
        <p>
          Elektronen bewegen sich. In jedem Augenblick können sie sich zufällig auf einer Seite
          eines Moleküls sammeln — ein flüchtiger Dipol entsteht, induziert im Nachbarn einen
          entgegengesetzten flüchtigen Dipol, und für diesen Moment ziehen sich beide an. Über die
          Zeit gemittelt ist das eine echte, wenn auch schwache Kraft.
        </p>
        <p>
          Dispersionskräfte gibt es in <em>jedem</em> Stoff, und sie wachsen mit der Elektronenzahl.
          Deshalb verflüssigen sich die Edelgase der Reihe nach, und deshalb ist Methan ein Gas,
          während Kerzenwachs — dieselbe Molekülsorte, nur viel länger — fest ist.
        </p>

        <h3>2. Dipol-Dipol-Kräfte (in polaren Molekülen)</h3>
        <p>
          Polare Moleküle haben dauerhafte δ+- und δ−-Enden, richten sich aus und ziehen sich Kopf
          an Schwanz an. Bei ähnlicher Größe stärker als Dispersion — weshalb polare Stoffe meist
          höher sieden als unpolare vergleichbarer Masse.
        </p>

        <h3>3. Wasserstoffbrücken (die starke)</h3>
        <p>
          Ein besonders kräftiger Sonderfall der Dipol-Dipol-Kraft. Nötig ist Wasserstoff, direkt
          gebunden an <strong>N, O oder F</strong> — die drei kleinen, gierigen Atome. Wasserstoff
          hat nur ein einziges Elektron; zieht Sauerstoff oder Fluor es weg, bleibt fast ein nacktes
          Proton übrig: eine sehr konzentrierte positive Ladung, die einem freien Elektronenpaar des
          Nachbarn sehr nahe kommen kann.
        </p>
        <div className="callout note">
          <span className="co-title">Merke die drei: N, O, F</span>
          <p>
            Wasserstoffbrücken brauchen H an <strong>N</strong>, <strong>O</strong> oder{" "}
            <strong>F</strong>. H–Cl zählt nicht: Chlor ist zwar polar genug, aber zu groß, seine
            Ladung also zu verschmiert. Die Eselsbrücke ist kurz: <em>&bdquo;NOF — sonst nix.&ldquo;</em>
          </p>
        </div>

        <h2>Die Anomalie, die es beweist</h2>
        <p>
          Vergleiche die Hydride der Gruppe 16 — H₂O, H₂S, H₂Se, H₂Te. Dispersionskräfte wachsen mit
          der Größe, die Siedepunkte sollten also nach unten hin stetig steigen. Bei den letzten
          dreien tun sie das. Wasser, das kleinste und leichteste, müsste bei etwa −80 °C sieden.
        </p>
        <p>
          Es siedet bei <strong>+100 °C</strong>. Diese Diskrepanz von 180 Grad sind
          Wasserstoffbrücken — und der Grund, warum es auf diesem Planeten überhaupt flüssiges
          Wasser gibt.
        </p>
        <p>
          Wasser ist selbst unter wasserstoffverbrückten Stoffen außergewöhnlich, wegen seiner Form:
          Jedes Molekül hat zwei Wasserstoffatome zu geben <em>und</em> zwei freie Paare zu nehmen —
          jedes Wassermolekül kann also vier Nachbarn gleichzeitig halten und baut ein durchgehendes
          Netzwerk. Ammoniak hat drei H, aber nur ein freies Paar; Fluorwasserstoff ein H und drei
          freie Paare. Nur Wasser ist ausgeglichen.
        </p>
        <p>Die Folgen:</p>
        <ul>
          <li>
            <strong>Eis schwimmt.</strong> Beim Gefrieren rastet das Netzwerk in einen offenen
            Sechseck-Käfig ein, der <em>weniger</em> dicht ist als die Flüssigkeit. Fast jeder
            andere Stoff sinkt in sich selbst. Seen frieren deshalb von oben zu, und darunter
            überlebt Leben.
          </li>
          <li>
            <strong>Riesige Wärmekapazität.</strong> Wasser zu erwärmen heißt, ein weites Netz aus
            Wasserstoffbrücken zu lockern — das schluckt enorm viel Energie. Ozeane dämpfen so das
            Klima, und Schweiß kühlt wirksam.
          </li>
          <li>
            <strong>Oberflächenspannung.</strong> Moleküle an der Oberfläche werden von unten
            gezogen, ohne Ausgleich von oben. Insekten laufen darauf.
          </li>
          <li>
            <strong>&bdquo;Gleiches löst Gleiches.&ldquo;</strong> Polares Wasser löst Polares und
            Ionisches und verweigert Unpolares — es müsste sein eigenes Wasserstoffbrücken-Netz
            aufbrechen, um einem Molekül Platz zu machen, das nichts zurückgibt.
          </li>
        </ul>
      </>
    ),
    lab: {
      title: "Siedepunkt-Labor",
      intro: (
        <>
          <p>
            Vier kleine Moleküle, ein Thermometer. Die violetten Linien sind die Anziehungen
            zwischen den Molekülen.
          </p>
          <ul>
            <li>Stell −50 °C ein und geh alle vier Stoffe durch. Zwei sind Gase, zwei Flüssigkeiten.</li>
            <li>Vergleiche CH₄ (M = 16) mit H₂O (M = 18) — fast dieselbe Masse, 261 Grad Unterschied im Siedepunkt.</li>
            <li>Heize über den Siedepunkt hinaus und sieh zu, wie die Anziehungslinien loslassen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Welche Kräfte werden gebrochen, wenn ein molekularer Stoff siedet?",
        choices: [
          "Die kovalenten Bindungen innerhalb der Moleküle",
          "Die zwischenmolekularen Kräfte zwischen den Molekülen",
          "Ionenbindungen",
          "Kernkräfte",
        ],
        answer: 1,
        explain:
          "Sieden trennt ganze Moleküle voneinander. Die kovalenten Bindungen in ihnen bleiben unversehrt — Wasserdampf ist immer noch H₂O.",
      },
      {
        q: "Wasserstoffbrücken verlangen Wasserstoff gebunden an welche Atome?",
        choices: [
          "Jedes Nichtmetall",
          "Kohlenstoff, Stickstoff oder Schwefel",
          "Stickstoff, Sauerstoff oder Fluor",
          "Nur Sauerstoff",
        ],
        answer: 2,
        explain:
          "Nur N, O und F sind klein und elektronegativ genug, um Wasserstoff fast nackt zurückzulassen — „NOF, sonst nix“.",
      },
      {
        q: "Wasser (M = 18) siedet bei 100 °C, Methan (M = 16) bei −161 °C. Warum?",
        choices: [
          "Wassermoleküle sind viel schwerer",
          "Wasser bildet Wasserstoffbrücken; Methan ist unpolar und hat nur schwache Dispersionskräfte",
          "Methan hat stärkere kovalente Bindungen",
          "Wasser ist ionisch",
        ],
        answer: 1,
        explain:
          "Bei nahezu gleicher Masse bleibt als Unterschied nur die zwischenmolekulare Anziehung. Wassers Wasserstoffbrücken-Netz ist dramatisch stärker.",
      },
      {
        q: "Warum schwimmt Eis auf Wasser?",
        choices: [
          "Eis enthält eingeschlossene Luft",
          "Wasserstoffbrücken zwingen die Moleküle in einen offenen Käfig, der weniger dicht ist als die Flüssigkeit",
          "Eismoleküle sind leichter als Wassermoleküle",
          "Kaltes Wasser dehnt sich aus, weil seine kovalenten Bindungen länger werden",
        ],
        answer: 1,
        explain:
          "Beim Gefrieren bindet jedes Molekül vier Nachbarn in einem Sechseckgitter mit Lücken. Diese offene Struktur ist weniger dicht als flüssiges Wasser — Eis schwimmt.",
      },
      {
        q: "Warum löst sich Öl nicht in Wasser?",
        choices: [
          "Ölmoleküle sind zu groß",
          "Öl ist unpolar und bietet nichts, was die Wasserstoffbrücken ersetzt, die Wasser dafür brechen müsste",
          "Öl ist dichter als Wasser",
          "Öl reagiert mit Wasser",
        ],
        answer: 1,
        explain:
          "Das Lösen würde Wasser sein Wasserstoffbrücken-Netz kosten, ohne Gegenleistung durch unpolares Öl. „Gleiches löst Gleiches“ ist genau diese Energiebilanz, kurz gesagt.",
      },
    ],
  },
};
