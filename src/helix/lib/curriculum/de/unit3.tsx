import type { LessonContentDe } from "../localize";

export const unit3De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "strawberry-dna": {
    Theory: () => (
      <>
        <h2>Was du gleich tun wirst</h2>
        <p>
          Jeder Schritt dieses Protokolls ist etwas, das du bereits gelernt hast. Du wirst Zellen
          aufbrechen, zwei Lipidmembranen auflösen, die Ladung am DNA-Rückgrat neutralisieren — und
          dann ausnutzen, dass DNA in Wasser löslich ist, in Alkohol aber nicht. Nichts hier ist
          ein Trick; es sind die Einheiten 0 bis 2, angewandt mit Küchenausrüstung.
        </p>
        <p>
          Das Ergebnis ist wirklich sichtbar. Keine Färbung, kein Farbumschlag — echte DNA-Fäden,
          die du an einem Zahnstocher herausheben kannst.
        </p>

        <h2>Was du brauchst</h2>
        <ul>
          <li>2–3 <strong>Erdbeeren</strong> (frisch, oder gefroren und aufgetaut)</li>
          <li>Einen <strong>Gefrierbeutel mit Verschluss</strong></li>
          <li>1 TL <strong>Spülmittel</strong></li>
          <li>½ TL <strong>Kochsalz</strong></li>
          <li>100 ml <strong>Wasser</strong></li>
          <li>Einen <strong>Kaffeefilter</strong> oder ein Stück Mulltuch, und ein klares Glas</li>
          <li>
            50 ml <strong>Brennspiritus oder Wodka</strong>, mindestens eine Stunde im Gefrierfach —
            er muss richtig kalt sein
          </li>
          <li>Einen Zahnstocher oder dünnen Glasstab</li>
        </ul>

        <h2>Warum eine Erdbeere</h2>
        <p>
          Weil Erdbeeren <strong>oktoploid</strong> sind — acht vollständige Chromosomensätze pro
          Zelle, wo du zwei hast. Gramm für Gramm steckt in einer Erdbeere weit mehr DNA als in den
          meisten Geweben, und sie lässt sich mühelos zermatschen. Bananen und Kiwis funktionieren
          auch; die Erdbeere funktioniert am besten.
        </p>

        <h2>Warum jeder Schritt funktioniert</h2>
        <p>
          <strong>Zermatschen</strong> bricht die Zellwände mechanisch auf.{" "}
          <strong>Spülmittel</strong> löst die Phospholipid-Doppelschicht von Zellmembran und
          Kernmembran auf — dieselbe Chemie, die Fett vom Teller holt, angewandt auf die Struktur
          aus Einheit 0.2. <strong>Salz</strong> liefert Na⁺-Ionen, die die negativen Ladungen am
          Phosphat-Rückgrat der DNA abschirmen — die Stränge stoßen sich nicht länger ab und
          können verklumpen. <strong>Filtern</strong> entfernt die Trümmer.
        </p>
        <p>
          Der letzte Schritt ist der, den man auskosten sollte. <strong>Kalter Alkohol</strong>{" "}
          wird vorsichtig obenauf gegossen, sodass er sich <em>nicht</em> mischt. DNA löst sich in
          Wasser, aber nicht in Alkohol — an der Grenze zwischen den beiden Schichten fällt sie
          aus: Sie kommt als weiße, fädige Stränge aus der Lösung und sammelt sich binnen Sekunden
          an der Grenzfläche. Die Kälte zählt, weil sie die Enzyme bremst, die die DNA sonst in
          unsichtbare Stücke hacken würden.
        </p>

        <div className="callout warn">
          <span className="co-title">Vernünftige Vorsichtsmaßnahmen</span>
          <p>
            Brennspiritus ist entflammbar und nicht trinkbar — weg von Flammen halten und das Glas
            beschriften. Nichts aus diesem Experiment essen. Danach ordentlich abwaschen. Nichts
            hier ist gefährlich, aber es hört auf, Lebensmittel zu sein, sobald das Spülmittel
            hineinkommt.
          </p>
        </div>

        <h2>Was du da ansiehst</h2>
        <p>
          Die weiße Masse an deinem Stäbchen ist nicht ein Molekül — es ist die verhedderte DNA
          von Millionen Zellen, zusammengeklumpt. Ein einzelnes DNA-Molekül ist etwa 2 nm breit und
          völlig unsichtbar. Sichtbar wird diese Ansammlung durch schiere Menge — so wie ein
          einzelnes Haar dünn ist, ein Pferdeschwanz aber nicht.
        </p>
        <p>
          Und es ist das Original: dasselbe Molekül, mit denselben vier Basen und demselben
          genetischen Code, den du in Einheit 2 lesen gelernt hast. Die Gene einer Erdbeere und
          deine sind im identischen Alphabet geschrieben.
        </p>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling: Die Extraktion",
      intro: (
        <>
          <p>Geh das Protokoll durch, bevor du es in echt machst. Jeder Schritt sagt, wozu er da ist.</p>
          <ul>
            <li>Schritt 2 ist die Membran-Lektion: Spülmittel nimmt eine Lipid-Doppelschicht auseinander.</li>
            <li>Schritt 5 ist der ganze Trick — DNA ist in Alkohol unlöslich und fällt an der Grenze aus.</li>
            <li>Und dann: mach es wirklich. Die digitale Version ist die Probe, kein Ersatz.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "gather", text: "Alles besorgt — und den Spiritus mindestens eine Stunde vorher ins Gefrierfach gelegt." },
      { id: "mash", text: "2–3 Erdbeeren im verschlossenen Beutel eine volle Minute zermatscht — richtig zu Brei." },
      { id: "buffer", text: "100 ml Wasser + 1 TL Spülmittel + ½ TL Salz gemischt und vorsichtig untergerührt (ohne Schaum)." },
      { id: "rest", text: "Die Mischung 5–10 Minuten stehen lassen, damit das Spülmittel die Membranen auflösen kann." },
      { id: "filter", text: "Die Mischung durch Kaffeefilter oder Mulltuch in ein klares Glas filtriert." },
      { id: "alcohol", text: "Das Glas gekippt und eiskalten Spiritus vorsichtig an der Wand hinuntergegossen, sodass eine eigene Schicht entsteht." },
      { id: "watch", text: "Zugesehen, wie an der Grenze zwischen den Schichten weiße Fäden erscheinen." },
      { id: "spool", text: "Die DNA am Stäbchen herausgehoben — und sie in Ruhe angeschaut." },
      { id: "why", text: "Kann ohne Nachschauen erklären, was Spülmittel, Salz und Alkohol jeweils getan haben." },
    ],
  },
};
