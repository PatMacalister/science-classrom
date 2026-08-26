import type { LessonContentDe } from "../localize";

/** Full German content for Unit 20 (PCB branch: pcb-anatomy, pcb-routing, pcb-layout-rules, pcb-blinker). */

export const unit20De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "pcb-anatomy": {
    Theory: () => (
      <>
        <h2>Das Sandwich</h2>
        <p>
          Jedes Gerät, das du besitzt, ist auf <strong>Leiterplatten</strong> gebaut — und
          eine Platine ist nichts Exotischeres als die Verdrahtung deines Breadboards, dauerhaft
          gemacht. Eine Platte aus <strong>FR-4</strong> (Glasfasergewebe in Epoxid — ein
          exzellenter Isolator, Vokabular aus Lektion 0.1) trägt dünne Kupferschichten, die so
          weit weggeätzt werden, bis nur die von dir entworfenen Verbindungen übrig sind:{" "}
          <strong>Leiterbahnen</strong> (die Drähte), <strong>Pads</strong> (wo Bauteilbeine
          landen) und <strong>Flächen</strong> (ganze Kupferregionen, meist Masse).
        </p>
        <p>Auf das Kupfer kommen zwei Abschlussschichten:</p>
        <ul>
          <li>
            <strong>Lötstopplack</strong> — der berühmte grüne (oder schwarze, blaue,
            violette…) Lack. Er isoliert jede Bahn und bleibt nur über den Pads offen, damit
            Lot genau dort benetzt, wo es soll, und nirgendwo sonst.
          </li>
          <li>
            <strong>Bestückungsdruck</strong> (Silkscreen) — weiße Tinte für Menschen:
            Bauteilumrisse, Referenzbezeichner (R1, C3, U1 — dieselbe Konvention, die deine
            Schaltpläne seit Einheit 1 benutzen), Polungsmarken und der Name der Platine.
          </li>
        </ul>

        <h2>Zwei Etagen und die Aufzüge dazwischen</h2>
        <p>
          Günstige Standardplatinen tragen Kupfer auf <em>beiden</em> Seiten — zwei
          Verdrahtungsetagen. Ein durchkontaktiertes Loch, das sie verbindet, ist eine{" "}
          <strong>Via</strong>: ein Aufzug für Signale. Bauteilbeine, die durch die Platine
          gesteckt werden (<strong>Durchsteckmontage</strong>, THT — wie alles in deinem Kit),
          bekommen ebenfalls durchkontaktierte Löcher und verbinden automatisch beide Etagen.
          Moderne Geräte nutzen meist <strong>SMD</strong> — oberflächenmontierte Teile, die
          wie Reiskörner auf einer Seite sitzen — aber Durchsteckmontage ist die richtige
          erste Löterfahrung, und dein Blinker ist komplett THT.
        </p>
        <div className="formula">
          FR-4 core · copper top+bottom · soldermask · silkscreen · drills &amp; vias
          <span className="note">lies jede Platine von unten nach oben mit diesen fünf Wörtern — FR-4-Kern, Kupfer oben+unten, Lötstopplack, Bestückungsdruck, Bohrungen & Vias — und nichts darauf bleibt rätselhaft</span>
        </div>

        <h2>Warum überhaupt das Breadboard verlassen?</h2>
        <p>
          Breadboards sind zum Denken; Platinen zum Behalten. Federkontakte leiern aus,
          Jumperkabel fallen im Rucksack heraus, und alles über ein paar MHz macht aus einem
          Breadboard eine Antennenfarm (die schnellen Flanken aus 13.2!). Eine Platine ist
          mechanisch solide, elektrisch ruhig, reproduzierbar — du kannst zehn davon machen —
          und sie ist der Unterschied zwischen &bdquo;meinem Projekt&ldquo; und &bdquo;meinem
          Produkt&ldquo;. Seit etwa 2015 können Bastler professionelle Fertigung zum Preis
          eines Kaffees kaufen: fünf Exemplare einer kleinen zweilagigen Platine für rund 2 $
          plus Versand.
        </p>
        <div className="callout note">
          <span className="co-title">Die Platine im Labor</span>
          <p>
            Der Explorer unten zeigt deinen 555-Blinker als echtes zweilagiges Layout. Jede
            Bahn entspricht einem Jumper, den du in Einheit 4 gesteckt hast — finde den
            Pin-6→2-Jumper, der auf dem unteren Kupfer wohnt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der Lagen-Explorer",
      intro: (
        <>
          <p>Dein Blinker als Platine — schäl sie Lage für Lage auseinander.</p>
          <ul>
            <li>Schalte den Lötstopplack um: Sieh, wie viel Kupfer er schützt und was blank bleibt (nur die Pads).</li>
            <li>Explodiere das Sandwich und finde die zwei Vias, die zur unteren Etage tauchen.</li>
            <li>Blende alles außer dem Bestückungsdruck aus — könntest du die Platine allein nach der Tinte bestücken?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Die Aufgabe des Lötstopplacks ist…",
        choices: [
          "Signale zwischen Lagen zu leiten",
          "das Kupfer überall außer an den Pads zu isolieren, damit Lot nur dorthin geht, wo es soll",
          "die Bauteile zu beschriften",
          "die Platine mechanisch zu verstärken",
        ],
        answer: 1,
        explain: "Ein Lack mit Löchern über den Pads — Lot benetzt Kupfer, nicht Lack, also entstehen Lötstellen genau nach Entwurf.",
      },
      {
        q: "Eine Via ist…",
        choices: [
          "eine breite Versorgungsbahn",
          "ein durchkontaktiertes Loch, das Kupferlagen verbindet — ein Aufzug für Signale",
          "eine Bauteilart",
          "der Umriss der Platine",
        ],
        answer: 1,
        explain: "Zwei Verdrahtungsetagen brauchen Verbindungen; die durchkontaktierte Hülse der Via ist diese Verbindung.",
      },
      {
        q: "FR-4 ist…",
        choices: [
          "eine leitfähige Legierung",
          "der Glasfaser-Epoxid-Isolator, aus dem die Platine besteht",
          "eine Löttechnik",
          "ein Bauteilgehäuse",
        ],
        answer: 1,
        explain: "Glasgewebe in Epoxid: steif, flammhemmend (das FR) und ein exzellenter Isolator zwischen den Kupferlagen.",
      },
      {
        q: "Verglichen mit einem Breadboard ist eine Platine in genau einem dieser Punkte schlechter:",
        choices: [
          "Vibration überleben",
          "Hochfrequenzverhalten",
          "in dreißig Sekunden umverdrahtet sein",
          "zehnmal reproduziert werden",
        ],
        answer: 2,
        explain: "Das Kupfer ist fest — Änderungen heißen neue Revision. Alles andere (Steifigkeit, Signalqualität, Reproduzierbarkeit) wird besser.",
      },
    ],
  },

  /* ================================================================ */
  "pcb-routing": {
    Theory: () => (
      <>
        <h2>Der Ablauf, den jedes Werkzeug teilt</h2>
        <p>
          Platinenentwurf (in KiCad oder jedem anderen Werkzeug) ist eine Pipeline, und die
          schweren Teile davon gehören dir schon:
        </p>
        <ul>
          <li>
            <strong>1. Schaltplan zeichnen</strong> — mit denselben Symbolen, die du seit
            Lektion 1.1 liest. Das Werkzeug extrahiert die <strong>Netzliste</strong>: die
            Liste, welche Pins elektrisch verbunden sind (ein <em>Netz</em> ist einfach ein
            Knoten aus den Kirchhoff-Lektionen).
          </li>
          <li>
            <strong>2. Footprints zuweisen</strong> — jedes Symbol bekommt sein physisches
            Landmuster: Padgrößen, Bohrdurchmesser, Courtyard. Bibliotheken liefern Tausende.
          </li>
          <li>
            <strong>3. Platzieren</strong> — Bauteile auf dem Umriss anordnen. Die ungerouteten
            Verbindungen erscheinen als gerade &bdquo;Gummibänder&ldquo;: das{" "}
            <strong>Ratsnest</strong> (die Luftlinien). Gute Platzierung macht das Ratsnest
            kurz und entwirrt — sie ist 80 % eines guten Layouts.
          </li>
          <li>
            <strong>4. Routen</strong> — jedes Gummiband durch Kupfer ersetzen. Bahnen einer
            Lage dürfen sich nie kreuzen; müssen zwei Netze aneinander vorbei, nimmt eines
            eine Via zur anderen Etage und zurück. (Im Labor spürst du das in den Fingern.)
          </li>
          <li>
            <strong>5. DRC & Gerber</strong> — nächste Lektion: die automatische Regelprüfung
            und die Dateien, die die Fabrik frisst.
          </li>
        </ul>

        <h2>Routing-Weisheit, komprimiert</h2>
        <p>
          Route die kritischen Netze zuerst (Versorgung, und alles Schnelle oder Empfindliche),
          halte Bahnen so kurz, wie die Platzierung erlaubt, und fürchte Vias nicht — im
          Hobby-Maßstab kostet jede praktisch nichts, auch wenn Hochgeschwindigkeitsdesigns sie
          zählen. Wo eine Bahn abbiegt, nimm zwei 45°-Knicke statt eines harten 90° — vor
          allem für Fertigung und Gewohnheit; die alten &bdquo;Säurefallen&ldquo;-Schauergeschichten
          sind weitgehend historisch. Und wenn eine Region hoffnungslos wird:{" "}
          <em>reiß auf und verbessere die Platzierung</em> — die Profis tun es, ständig.
        </p>
        <div className="formula">
          placement is 80% of routing · one layer = no crossings · a via is a legal crossing
          <span className="note">Platzierung ist 80 % des Routings · eine Lage = keine Kreuzungen · eine Via ist die legale Kreuzung — das ganze Handwerk in einer Zeile; das Labor lässt es deine Hände glauben</span>
        </div>
        <div className="callout tip">
          <span className="co-title">Autorouter gibt es. Lern es trotzdem von Hand.</span>
          <p>
            Jedes Werkzeug bietet automatisches Routing an, und für einen Blinker täte es das
            gut. Route deine ersten Platinen trotzdem manuell: Die Zwänge, die du fühlst — die
            Kreuzung, die eine Via erzwingt, die Platzierung, die drei Netze auf einmal
            entwirrt — sind die eigentliche Fähigkeit. Zehn Minuten mit dem Puzzle unten
            lehren mehr als eine Stunde Autorouter-Zuschauen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Das Routing-Puzzle",
      intro: (
        <>
          <p>Vier Netze, zwei Kupferlagen, ein Chip, der mitten im Weg hockt. Verbinde jedes Pad.</p>
          <ul>
            <li>VCC und GND sind leichte Aufwärmer entlang der Ränder.</li>
            <li>TRIG muss die anderen kreuzen — auf einer Lage unmöglich. Stopp, wechsle aufs untere Kupfer, zieh weiter: Das ist eine Via.</li>
            <li>Der Chipkörper blockiert nur die obere Lage — die untere Etage läuft direkt darunter durch, genau wie auf echten Platinen.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Ein „Netz“ im Platinenentwurf ist…",
        choices: [
          "der Platinenumriss",
          "eine Menge von Pins, die elektrisch verbunden sein müssen — ein Knoten der Schaltung",
          "das Raster, an dem die Teile einrasten",
          "eine Via-Art",
        ],
        answer: 1,
        explain: "Direkt von Kirchhoff: ein Knoten. Die Netzliste ist der Schaltplan, reduziert auf reine Konnektivität.",
      },
      {
        q: "Das „Ratsnest“ ist…",
        choices: [
          "ein Routingfehler",
          "die Luftlinien-Vorschau jeder ungerouteten Verbindung",
          "übrig gebliebene Kupferreste",
          "ein dichter Via-Haufen",
        ],
        answer: 1,
        explain: "Gummibandlinien von Pin zu Pin. Dem Ratsnest beim Entwirren zuzusehen, während man Teile verschiebt — so beurteilt man Platzierung.",
      },
      {
        q: "Zwei Bahnen derselben Lage müssen sich kreuzen. Die legale Lösung ist…",
        choices: [
          "sie kurz berühren lassen",
          "ein Netz nimmt eine Via zur anderen Lage, passiert, und via-t zurück",
          "eines der Netze löschen",
          "eine Bahn dünner machen",
        ],
        answer: 1,
        explain: "Kreuzen auf derselben Lage ist ein Kurzschluss (dein Fault-Finder weiß es). Die Via ist die Kreuzung, die keiner ist.",
      },
      {
        q: "Erfahrene Entwickler sagen, die Layoutqualität entscheidet sich vor allem durch…",
        choices: [
          "die Bahnfarbe",
          "die Bauteilplatzierung, bevor irgendeine Bahn gezogen ist",
          "die maximale Via-Zahl",
          "Routen in 90°-Winkeln",
        ],
        answer: 1,
        explain: "Gute Platzierung lässt das Routing fast von selbst herausfallen; schlechte macht es zum Krieg. 80 % des Handwerks.",
      },
    ],
  },

  /* ================================================================ */
  "pcb-layout-rules": {
    Theory: () => (
      <>
        <h2>Leiterbahnen sind (immer noch) Widerstände</h2>
        <p>
          Eine Kupferbahn ist ein dünner, breiter Widerstand — Einheit 1 hört nie auf zu
          gelten. Standard-&bdquo;1-oz&ldquo;-Kupfer ist ~35 µm dick, eine 0,25-mm-Signalbahn
          hat also etwa 0,02 Ω pro Zentimeter: irrelevant für Signale, sehr relevant, sobald
          Ampere fließen. Unterdimensionierte Versorgungsbahnen heizen sich auf (P = I²R,
          Lektion 1.4) und verlieren Spannung, exakt wie das billige Kabel aus deinem
          Aufgabenblock. Die IPC-2221-Kurven der Industrie — im Labor als Rechner verpackt —
          verwandeln &bdquo;wie viel Strom, wie viel Erwärmung ist akzeptabel&ldquo; in eine
          nötige Breite. Für deinen Blinker: Signale mit 0,25 mm, Versorgung mit 0,5 mm, und
          du sitzt bequem.
        </p>

        <h2>Abstand, und die Regeldatei</h2>
        <p>
          Kupfer, das sich nicht berühren darf, braucht eine garantierte Lücke — durch
          Fertigungstoleranz, über Jahre, bei Feuchtigkeit. Budget-Fertiger schaffen fröhlich
          0,15 mm Mindestbahn/-abstand; vernünftige Entwürfe bleiben deutlich darüber. All
          diese Beschränkungen leben in den <strong>Designregeln</strong> deines Werkzeugs,
          und der <strong>Design Rule Check (DRC)</strong> prüft jede Bahn dagegen und gegen
          die Netzliste: Kurzschlüsse, Unterbrechungen, zu dünn, zu nah — dieselbe
          Fehlerklasse, die dein Fault-Finder aus Einheit 15 diagnostizierte, gefangen, bevor
          sie in Kupfer geätzt wird. <em>Bestell nie eine Platine mit DRC-Fehlern.</em>
        </p>
        <div className="formula">
          width ∝ current · clearance ∝ voltage &amp; tolerance · DRC before every order
          <span className="note">Breite ∝ Strom · Abstand ∝ Spannung & Toleranz · DRC vor jeder Bestellung — plus das eine Platzierungsgesetz: Abblockkondensatoren wohnen Millimeter neben ihrem Pin (15.1!)</span>
        </div>

        <h2>Das Review-Auge</h2>
        <p>
          Der DRC fängt, was <em>formal</em> falsch ist. Ein menschliches Review fängt, was{" "}
          <em>unklug</em> richtig ist: den quer über die Platine verbannten Abblockkondensator,
          die schwebende Kupferinsel als Antenne, Bestückungsdruck über einem Pad, ein Pad,
          das die gefräste Kante küsst. Profis reviewen die Platinen der anderen genau wie
          Code. Das Labor unten reicht dir eine Platine, die den flüchtigen Blick besteht und
          sechs Sünden versteckt — finde alle, und du hast dein erstes Design-Review
          durchgeführt.
        </p>
        <div className="callout warn">
          <span className="co-title">Masse ist auch eine Schaltung</span>
          <p>
            Jeder Strom fließt zurück (Lektion 1.1 — die Schleife ist alles). Auf Platinen
            zählt der Rückweg genauso viel wie die Hinbahn: Eine durchgehende Massefläche auf
            der Unterseite gibt jedem Signal einen kurzen Heimweg und beruhigt die ganze
            Platine. Im Zweifel: Massefläche gießen, mit Vias steppen.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Finde die sechs Sünden",
      intro: (
        <>
          <p>Eine Platine, die den flüchtigen Blick bestehen würde — und im Review durchfällt. Klick an, was falsch ist; der Breitenrechner unten stützt einen der Funde.</p>
          <ul>
            <li>Zwei Sünden sind elektrische Fehler, die der DRC melden würde. Vier sind legal-aber-töricht.</li>
            <li>Einer davon ist dir in der Abblock-Box von Lektion 15.1 begegnet.</li>
            <li>Nutze den Rechner: Wie breit muss eine 2-A-Bahn für 10 °C Erwärmung sein?</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Eine Versorgungsbahn mit echtem Strom sollte breit sein, weil…",
        choices: [
          "breite Bahnen professionell aussehen",
          "die Bahn ein Widerstand ist: zu dünn heißt I²R-Erwärmung und Spannungsverlust",
          "sich schmale Bahnen nicht löten lassen",
          "der DRC gleiche Bahnen verlangt",
        ],
        answer: 1,
        explain: "Kupfer ist dünn (~35 µm); der Querschnitt kommt aus der Breite. Strom × Widerstand = Wärme und verlorene Volt — Einheit 1 auf einer Platine.",
      },
      {
        q: "Der DRC (Design Rule Check)…",
        choices: [
          "routet die Platine automatisch",
          "prüft das Layout gegen Abstands-/Breitenregeln und die Netzliste, bevor du bestellst",
          "simuliert das Verhalten der Schaltung",
          "erzeugt den Bestückungsdruck",
        ],
        answer: 1,
        explain: "Kurzschlüsse, Unterbrechungen, zu nah, zu dünn — maschinenprüfbare Sünden, gefangen, bevor die Fabrik sie dauerhaft ätzt.",
      },
      {
        q: "Wohin gehört ein Abblockkondensator?",
        choices: [
          "irgendwohin auf die Platine — Netze sind Netze",
          "Millimeter neben den Versorgungspin, den er bedient",
          "neben den Stromanschluss",
          "nur auf die untere Lage",
        ],
        answer: 1,
        explain: "Sein Job ist sofortige lokale Ladung (15.1); jeder Millimeter Bahn addiert die Induktivität, die ihn entwertet. Die Platzierung IST die Funktion.",
      },
      {
        q: "Warum verbessert eine durchgehende Massefläche eine Platine?",
        choices: [
          "sie bringt mechanisches Gewicht",
          "jede Stromschleife bekommt einen kurzen Rückweg nach Hause, direkt unter ihrer Hinbahn",
          "sie ersetzt den Lötstopplack",
          "sie macht die Platine billiger",
        ],
        answer: 1,
        explain: "Die Schleife ist alles (1.1): Rückströme wollen unter ihrem Signal fließen. Eine Fläche gibt jedem Netz diese Autobahn.",
      },
    ],
  },

  /* ================================================================ */
  "pcb-blinker": {
    Theory: () => (
      <>
        <h2>Die Mission</h2>
        <p>
          Erschaffe deinen Blinker aus Einheit 4 neu, als echte gefertigte Platine: Schaltplan
          und Layout in <strong>KiCad</strong> (frei, Open Source, Profi-Klasse; Version 9 zum
          Zeitpunkt dieses Texts), gefertigt von einem Leiterplattenhersteller, bestückt an
          deinem eigenen Lötplatz mit deinem ersten Lötkolben. Am Ende blinkt auf deinem Tisch
          eine Platine mit <em>deinem Namen im Bestückungsdruck</em> — und &bdquo;ich entwerfe
          Leiterplatten&ldquo; wird eine schlichte Tatsachenfeststellung.
        </p>

        <h2>Einkaufsliste</h2>
        <table>
          <thead>
            <tr><th>Artikel</th><th>Hinweise</th><th>≈ Kosten</th></tr>
          </thead>
          <tbody>
            <tr><td>KiCad</td><td>kicad.org — Windows/Mac/Linux</td><td>kostenlos</td></tr>
            <tr><td>Platinenfertigung</td><td>JLCPCB oder PCBWay: 5× zweilagige Platinen ≤100×100 mm</td><td>~2 $ + 10–20 $ Versand</td></tr>
            <tr><td>Lötkolben</td><td>temperaturgeregelt, ~350 °C; feine Kegel- oder Meißelspitze</td><td>20–30 $</td></tr>
            <tr><td>Lötzinn</td><td>0,8-mm-Draht, bleifrei SAC305 (oder 60/40, wo erlaubt) mit Flussmittelseele</td><td>5 $</td></tr>
            <tr><td>Extras</td><td>Messingwolle-Spitzenreiniger, und eine 8-Pin-DIP-Fassung, damit der 555 den Kolben nie spürt</td><td>4 $</td></tr>
            <tr><td colSpan={2}><em>Bauteile: derselbe 555, dieselben Widerstände, Kondensator, LED und Batterieclip aus deinem Einheit-4-Kit.</em></td><td>—</td></tr>
          </tbody>
        </table>

        <h2>Der Entwurf, Schritt für Schritt</h2>
        <ul>
          <li>
            <strong>Schaltplan:</strong> Zeichne den Astablen aus Einheit 4 in KiCads Editor
            nach — 555, R1 1 k, R2 47 k, C 10 µF, 470 Ω, LED, ein zweipoliger
            Stromanschluss. Lass den ERC (Electrical Rule Check) laufen, bis er schweigt.
          </li>
          <li>
            <strong>Footprints:</strong> alles Durchsteckmontage — DIP-8-Fassung für den 555,
            axiale Widerstände, radialer Kondensator mit 2,5 mm Raster, 5-mm-LED,
            2,54-mm-Stiftleiste.
          </li>
          <li>
            <strong>Layout:</strong> Ein Umriss von 50 × 40 mm lässt Hektar Platz. Platziere
            für ein kurzes Ratsnest (20.2), route mit 0,25/0,5-mm-Breiten (20.3), gieß eine
            Massefläche auf die Unterseite, und setz deinen Namen und &bdquo;rev A&ldquo; in
            den Bestückungsdruck — der Ritus.
          </li>
          <li>
            <strong>DRC → Gerber:</strong> null Fehler, dann Gerber + Bohrdatei exportieren
            (KiCad hat eine Ein-Klick-Vorlage für die großen Fertiger).
          </li>
          <li>
            <strong>Bestellen:</strong> Lad das Zip auf die Website des Fertigers, sieh zu,
            wie ihr Viewer deine Platine rendert, bezahle, warte etwa eine Woche. (Dein Konto,
            deine Adresse — der Kurs führt dich bis zur Upload-Maske und hält dort an.)
          </li>
        </ul>

        <h2>Dein erstes Löten, ehrlich beschrieben</h2>
        <p>
          THT-Löten ist eine Vier-Sekunden-Fähigkeit, die man ein Leben lang übt: Setz den
          Kolben so an, dass er <em>Pad und Bein gemeinsam</em> heizt (~2 s), führe etwas Lot
          in die Lötstelle — nicht an den Kolben —, lass es zu einem glänzenden Kegel fließen
          (~1 s), Lot weg, dann Kolben weg. Eine gute Lötstelle sieht aus wie ein kleiner
          Vulkan, der das Bein umarmt; eine schlechte ist eine matte Kugel, die obenauf sitzt.
          Bestückt wird von flach nach hoch — das Labor unten trainiert es. Lüfte den Raum,
          wasch danach die Hände, und parke den Kolben im Ständer, als wäre er immer heiß —
          denn das ist er.
        </p>

        <h3>Wenn die bestückte Platine nicht blinkt</h3>
        <table>
          <thead>
            <tr><th>Symptom</th><th>Wahrscheinliche Ursache</th><th>Abhilfe</th></tr>
          </thead>
          <tbody>
            <tr><td>Tot, Chip kühl</td><td>Versorgungspfad — Clip, Anschluss-Lötstelle oder kalte Lötstelle an Pin 8/1</td><td>Methode aus 15.2: erst die Schiene; matte Lötstellen nachlöten</td></tr>
            <tr><td>Tot, lief aber auf dem Breadboard</td><td>eine Brücke zwischen Nachbarpads</td><td>mit Streiflicht inspizieren; mit Litze absaugen oder den Kolben durchziehen, um sie zu trennen</td></tr>
            <tr><td>LED dunkel, Oszillator ok</td><td>LED entgegen dem Bestückungsdruck</td><td>der Klassiker; auslöten oder eine neue LED richtig herum einsetzen</td></tr>
            <tr><td>Blinkt falsch schnell</td><td>falscher Widerstand bestückt — Ringe in Eile gelesen</td><td>Fähigkeiten aus 1.3; erst in der Schaltung darüber messen</td></tr>
            <tr><td>Geht nur bei Druck</td><td>eine gerissene oder kalte Lötstelle biegt sich</td><td>jede Lötstelle des verdächtigen Netzes nachlöten</td></tr>
          </tbody>
        </table>

        <h2>Abschluss, noch einmal</h2>
        <p>
          Dieser Zweig endet auf die einzige Art, die dieser Kurs kennt: mit Hardware. Aber
          beachte, was sich geändert hat — in Einheit 4 hast du eine Schaltung{" "}
          <em>zusammengesteckt</em>; heute hast du eine <em>hergestellt</em>. Schaltplan,
          Layout, Fertigung, Bestückung, Inbetriebnahme: Das ist der komplette
          Produktlebenszyklus jedes elektronischen Geräts der Erde, einmal ausgeführt, von
          dir, Ende zu Ende. Rev B gehört dir — mehr LEDs, der PWM-Dimmer als Platine, ein
          Pico-Trägerboard… Die Gerber sind billig. Die Fähigkeit ist jetzt dauerhaft. ⚡
        </p>
      </>
    ),
    lab: {
      title: "Die Bestückungs-Werkbank",
      intro: (
        <>
          <p>Deine gefertigte Platine, eine leere Werkbank und die eine Regel der Bestückungsreihenfolge.</p>
          <ul>
            <li>Klick das Teil an, das du als Nächstes löten würdest — flachstes zuerst, damit die umgedrehte Platine plan liegt.</li>
            <li>Beachte: Die Fassung geht hinein, nie der Chip — der 555 wird am Ende kolbenfrei eingesetzt.</li>
            <li>Behalte die Werkbanknotizen im Blick: Jedes Teil trägt seine echte Stolperfalle (flache LED-Seite, Kondensatorstreifen).</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "kicad", text: "KiCad installiert und die eingebaute Einstiegstour abgeschlossen" },
      { id: "schematic", text: "Den Blinker-Schaltplan gezeichnet; der ERC läuft sauber durch" },
      { id: "footprints", text: "THT-Footprints zugewiesen (DIP-8-Fassung, axiale R, radialer C, 5-mm-LED, Stiftleiste)" },
      { id: "placement", text: "Teile für ein kurzes, entwirrtes Ratsnest auf einem ~50×40-mm-Umriss platziert" },
      { id: "routed", text: "Alles geroutet — 0,25 mm Signale, 0,5 mm Versorgung, Massefläche unten mit Vias gesteppt" },
      { id: "silk", text: "Meinen Namen und 'rev A' in den Bestückungsdruck gesetzt (der Ritus)" },
      { id: "drc", text: "DRC: null Fehler, null ungeroutete Netze" },
      { id: "gerbers", text: "Gerber + Bohrdatei exportiert und im Online-Viewer des Fertigers gegengeprüft" },
      { id: "ordered", text: "5 Platinen bestellt — und das Projekt für rev B gespeichert" },
      { id: "bench", text: "Werkbank bereit: temperaturgeregelter Kolben, Lötzinn, Messingwolle, Lüftung" },
      { id: "soldered", text: "Die Platine von flach nach hoch bestückt: Widerstände → Fassung → LED → Kondensator → Stiftleiste" },
      { id: "joints", text: "Jede Lötstelle im Streiflicht inspiziert: glänzende Kegel, keine Brücken, keine matten Kugeln" },
      { id: "blinks", text: "Den 555 eingesetzt, 9 V angeschlossen — MEINE EIGENE PLATINE BLINKT 🎉" },
      { id: "spare", text: "Eine der vier übrigen Platinen verschenkt und jede Lage darauf erklärt" },
    ],
  },
};
