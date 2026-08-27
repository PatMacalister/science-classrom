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
};
