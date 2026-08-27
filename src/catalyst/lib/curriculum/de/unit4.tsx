import type { LessonContentDe } from "../localize";

export const unit4De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "acids-bases": {
    Theory: () => (
      <>
        <h2>Was Säuren und Basen wirklich sind</h2>
        <p>
          Löse eine <strong>Säure</strong> in Wasser und sie setzt <strong>H⁺-Ionen</strong> frei
          (nackte Protonen, die sofort vom Wasser als H₃O⁺ aufgegriffen werden). Salzsäure: HCl →
          H⁺ + Cl⁻. Eine <strong>Base</strong> tut das Spiegelbild: Sie setzt{" "}
          <strong>OH⁻</strong> frei (wie NaOH → Na⁺ + OH⁻) oder schluckt H⁺ direkt (wie Ammoniak).
          Der saure Geschmack, das Brennen von Zitrone in einer Wunde, Kalk, der sich in Essig
          auflöst — all das ist H⁺ bei der Arbeit; das seifige Gefühl von Seife ist OH⁻, das die
          Fette deiner Haut angreift.
        </p>
        <p>
          Die beiden sind füreinander gemacht. H⁺ trifft OH⁻ und sie verschwinden in den
          harmlosesten Stoff, den es gibt:
        </p>
        <div className="formula">
          H⁺ + OH⁻ → H₂O
          <span className="note">Neutralisation — Säure und Base heben sich zu Wasser auf (plus ein Salz aus den übrigen Ionen)</span>
        </div>

        <h2>pH: ein logarithmisches Lineal</h2>
        <p>
          H⁺-Konzentrationen überspannen einen absurden Bereich — von ~1 mol/L in Batteriesäure bis
          10⁻¹⁴ mol/L in Rohrreiniger. Vierzehn Nullen zu schreiben ist kein Leben, also staucht die
          Chemie den Bereich mit einem Logarithmus:
        </p>
        <div className="formula">
          pH = −log₁₀ [H⁺]
          <span className="note">pH 7 = neutral · darunter sauer · darüber basisch — und jede Stufe ist ein Faktor ZEHN</span>
        </div>
        <p>
          Der Faktor zehn ist der Teil, den alle vergessen. Cola (pH 2,5) ist nicht &bdquo;ein bisschen&ldquo;
          saurer als Kaffee (pH 5) — sie trägt etwa die <em>300-fache</em> H⁺-Konzentration. Und
          reines Wasser ist nicht H⁺-frei: Wasser selbst spaltet sich ein winziges bisschen und
          liefert 10⁻⁷ mol/L jedes Ions — genau <em>das</em> ist die Definition von neutral.
        </p>

        <h2>Verdünnen und seine Grenze</h2>
        <p>
          Eine Säure zehnfach zu verdünnen hebt ihren pH um eine Stufe — aber du kannst dich nie
          über 7 hinaus verdünnen. Gib ewig Wasser zu Essig und du näherst dich <em>Wasser</em>,
          nicht einer Base. Die beiden Hälften der Skala lassen sich nur durch Chemie
          (Neutralisation) überqueren, nie durch Klempnerei.
        </p>

        <div className="callout warn">
          <span className="co-title">Stark vs. konzentriert — zwei verschiedene Wörter</span>
          <p>
            Eine <em>starke</em> Säure (HCl) gibt jedes H⁺ ab, das sie hat; eine <em>schwache</em>{" "}
            Säure (Essigsäure) nur einen kleinen Bruchteil. Konzentration sagt, wie viel Säure in
            der Flasche ist. Verdünnte HCl ist stark, aber halbwegs harmlos; Eisessig ist schwach
            und verätzt dich trotzdem. Die Chemie ist dort präzise, wo die Alltagssprache schlampt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Der pH-Spielplatz",
      intro: (
        <>
          <p>Zwölf Alltagsflüssigkeiten auf einem 14-stufigen Lineal, mit Verdünnungshahn.</p>
          <ul>
            <li>Vergleiche Cola und Kaffee — lies das ×10-pro-Stufe-Kleingedruckte unter der Skala.</li>
            <li>Verdünne Zitronensaft mehrfach ×10. Wo bleibt der pH hängen, und warum?</li>
            <li>Schau, wo Blut liegt — dein Körper hält es innerhalb von ±0,05 um pH 7,4.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Eine Säure, in Wasser gelöst, ist ein Stoff, der…",
        choices: ["OH⁻-Ionen freisetzt", "H⁺-Ionen freisetzt", "Wasser aufnimmt", "Strom leitet"],
        answer: 1,
        explain:
          "Säuren geben H⁺ ab (das als H₃O⁺ mitreist); Basen liefern OH⁻ oder schlucken H⁺. Die H⁺-Konzentration ist das, was der pH misst.",
      },
      {
        q: "Eine Flüssigkeit mit pH 3 hat verglichen mit einer mit pH 6…",
        choices: ["doppelt so viel H⁺", "3× so viel H⁺", "1000× so viel H⁺", "halb so viel H⁺"],
        answer: 2,
        explain: "Drei pH-Stufen = 10 × 10 × 10 = 1000× die H⁺-Konzentration. Die Skala ist logarithmisch.",
      },
      {
        q: "Du verdünnst Essig immer weiter mit Wasser. Sein pH…",
        choices: [
          "steigt unbegrenzt und wird zur starken Base",
          "nähert sich 7, kann es aber nicht überschreiten",
          "bleibt exakt konstant",
          "fällt Richtung 0",
        ],
        answer: 1,
        explain:
          "Verdünnen ersetzt Säure durch Wasser, also strebt die Mischung zu Wassers pH 7. Über 7 kommt man nur mit einer echten Base, nicht mit mehr Wasser.",
      },
      {
        q: "Mischt man eine Säure mit einer Base, entsteht…",
        choices: [
          "eine stärkere Säure",
          "Wasser und ein Salz — Neutralisation",
          "reines Wasserstoffgas",
          "nichts; sie ignorieren einander",
        ],
        answer: 1,
        explain:
          "H⁺ + OH⁻ → H₂O, und die übrigen Ionen (z. B. Na⁺ und Cl⁻) bilden ein Salz. Das ist die Reaktion hinter jeder Magentablette.",
      },
    ],
    problems: [
      {
        prompt: "Wie groß ist der pH einer Lösung mit [H⁺] = 0,001 mol/L?",
        answer: 3,
        unit: "",
        hint: "pH = −log₁₀[H⁺]; 0,001 = 10⁻³.",
        explain: "−log₁₀(10⁻³) = 3.",
      },
      {
        prompt: "Wie groß ist [H⁺] (mol/L) in einer Lösung mit pH 5? (SI-Suffixe ok, z. B. 10u)",
        answer: 0.00001,
        unit: "mol/L",
        hint: "[H⁺] = 10^−pH.",
        explain: "10⁻⁵ = 0,00001 mol/L = 10 µmol/L.",
      },
      {
        prompt: "0,1 mol/L HCl (vollständig dissoziiert). Wie groß ist der pH?",
        answer: 1,
        unit: "",
        hint: "Starke Säure: [H⁺] = 0,1 = 10⁻¹.",
        explain: "−log₁₀(0,1) = 1 — ungefähr dein Magen an einem schlechten Tag.",
      },
      {
        prompt: "Wie viel mal mehr H⁺ enthält Zitronensaft (pH 2) als Milch (pH 6,5)? (Toleranz ±5 %)",
        answer: 31623,
        unit: "×",
        tolerancePct: 5,
        hint: "Faktor = 10^(6,5 − 2).",
        explain: "10^4,5 ≈ 31 600× — Logarithmen verstecken gewaltige Verhältnisse.",
      },
    ],
  },

  /* ================================================================ */
  titration: {
    Theory: () => (
      <>
        <h2>Die Frage, die die Titration beantwortet</h2>
        <p>
          Du hast eine Flasche Säure unbekannter Stärke — wie viel Säure steckt wirklich drin? Du
          kannst H⁺ weder sehen noch wiegen. Aber du <em>kannst</em> ihr genau so viel OH⁻ füttern,
          dass jedes letzte H⁺ aufgefressen ist, und zählen, was du gefüttert hast. Das ist{" "}
          <strong>Titration</strong>: Neutralisation als Messinstrument — Stöchiometrie (Einheit 2)
          mit Glasgeräten.
        </p>

        <h2>Der Ablauf</h2>
        <ol>
          <li>Gib ein abgemessenes Volumen der unbekannten Säure in einen Kolben, dazu einen Tropfen <strong>Indikator</strong>.</li>
          <li>Fülle eine <strong>Bürette</strong> (ein Hahnrohr mit Skala) mit Base exakt bekannter Konzentration.</li>
          <li>Tropfen. Schwenken. Beobachten. Am <strong>Äquivalenzpunkt</strong> ist die Stoffmenge OH⁻ gleich der von H⁺, und der allernächste Tropfen kippt die Farbe des Indikators.</li>
          <li>Lies das verbrauchte Volumen ab und rechne:</li>
        </ol>
        <div className="formula">
          c₁ · V₁ = c₂ · V₂
          <span className="note">am Äquivalenzpunkt: Stoffmenge Säure = Stoffmenge Base (für 1:1-Reaktionen wie HCl + NaOH)</span>
        </div>

        <h2>Die Form der Kurve</h2>
        <p>
          Trage den pH gegen die zugegebene Base auf und du bekommst die Signatur der Titration:
          ein langes gemächliches Driften, dann eine <strong>Klippe</strong>. Weit weg vom
          Äquivalenzpunkt beult zugegebenes OH⁻ den H⁺-Überschuss kaum ein (Logarithmen bügeln das
          glatt). Doch nahe am Äquivalenzpunkt ist der Überschuss fast weg, und ein einziger
          0,1-mL-Tropfen kann den pH von 4 auf 10 schleudern. Diese Klippe ist ein Feature: Sie
          macht den Endpunkt messerscharf — Präzision auf einen Tropfen genau.
        </p>

        <div className="callout note">
          <span className="co-title">Indikatoren sind schwache Säuren mit Kleiderschrank</span>
          <p>
            Phenolphthalein ist selbst eine schwache Säure, deren zwei Formen verschiedene Farben
            haben: farblos mit angehängtem H⁺ (saure Lösung), pink ohne (basisch). Es schaltet um pH
            8,2–10 um — genau auf der Klippe einer Starksäure-Titration, weshalb ein einziger
            Tropfen den ganzen Kolben pink färbt. Dein Abschlussprojekt in Einheit 4 braut einen
            selbstgemachten Indikator, der denselben Trick mit Kohlpigmenten vollführt.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Die virtuelle Bürette",
      intro: (
        <>
          <p>25 mL 0,1 M HCl im Kolben, 0,1 M NaOH in der Bürette, Phenolphthalein bereit.</p>
          <ul>
            <li>Öffne die Bürette langsam und beobachte, wie die Kurve kriecht… dann finde die Klippe.</li>
            <li>Stoppe in dem Moment, in dem der Kolben pink wird — wie viele mL hast du gebraucht? Geht c₁V₁ = c₂V₂ auf?</li>
            <li>Schieße auf 50 mL über das Ziel hinaus und sieh, wie weit jenseits von neutral du landest.</li>
          </ul>
        </>
      ),
    },
    quiz: [
      {
        q: "Was misst eine Titration?",
        choices: [
          "Die Farbe einer Säure",
          "Die unbekannte Konzentration einer Säure (oder Base), durch Neutralisieren mit einer bekannten",
          "Den Siedepunkt einer Lösung",
          "Die Masse des Kolbens",
        ],
        answer: 1,
        explain:
          "Am Äquivalenzpunkt gilt Stoffmenge Base = Stoffmenge Säure. Kennt man Konzentration und verbrauchtes Volumen der Base, kennt man die Konzentration der Säure.",
      },
      {
        q: "Der Äquivalenzpunkt ist erreicht, wenn…",
        choices: [
          "der Kolben voll ist",
          "die zugegebene Stoffmenge OH⁻ exakt der vorhandenen Stoffmenge H⁺ entspricht",
          "der pH 14 erreicht",
          "der Indikator sich auflöst",
        ],
        answer: 1,
        explain: "Genau genug Base, um jedes H⁺ zu neutralisieren — bei HCl + NaOH landet die Lösung damit bei pH 7.",
      },
      {
        q: "Warum springt die pH-Kurve nahe dem Äquivalenzpunkt so steil?",
        choices: [
          "Die Bürette wird schneller",
          "Fast kein H⁺-Überschuss bleibt, also ändert ein Tropfen das Verhältnis — und die Log-Skala — enorm",
          "Der Indikator setzt Ionen frei",
          "Das Wasser beginnt zu kochen",
        ],
        answer: 1,
        explain:
          "Der pH folgt dem Logarithmus eines schwindenden Überschusses. Ist der Überschuss winzig, verschiebt ein einziger Tropfen ihn um Größenordnungen — daher die Klippe.",
      },
      {
        q: "25 mL unbekannte HCl brauchen 20 mL 0,5 M NaOH bis zum Äquivalenzpunkt. Die Konzentration der Säure ist…",
        choices: ["0,2 M", "0,4 M", "0,5 M", "0,625 M"],
        answer: 1,
        explain: "c₁ = c₂V₂/V₁ = 0,5 × 20 / 25 = 0,4 mol/L.",
      },
    ],
    problems: [
      {
        prompt: "10 mL Essig brauchen 24 mL 0,35 M NaOH zur Neutralisation. Wie groß ist die Säurekonzentration des Essigs?",
        answer: 0.84,
        unit: "mol/L",
        hint: "c₁ = c₂ × V₂ / V₁.",
        explain: "0,35 × 24 / 10 = 0,84 mol/L — typischer Haushaltsessig (~5 %).",
      },
      {
        prompt: "Wie viele mL 0,1 M NaOH neutralisieren 50 mL 0,06 M HCl?",
        answer: 30,
        unit: "mL",
        hint: "V₂ = c₁V₁ / c₂.",
        explain: "0,06 × 50 / 0,1 = 30 mL.",
      },
      {
        prompt: "Du gibst 30 mL 0,1 M NaOH zu 25 mL 0,1 M HCl. Wie viele mmol OH⁻ sind im Überschuss?",
        answer: 0.5,
        unit: "mmol",
        hint: "Überschuss = (30 − 25) mL × 0,1 mol/L.",
        explain: "5 mL × 0,1 M = 0,5 mmol OH⁻ — genug, um weit auf der basischen Seite zu landen.",
      },
    ],
  },

  /* ================================================================ */
  "kitchen-lab": {
    Theory: () => (
      <>
        <h2>Alles, was du brauchst, gibt es im Supermarkt</h2>
        <p>
          Dieses Abschlussprojekt braucht kein Labor: Rotkohl, Essig, Natron, Salz, eine Zitrone,
          Gläser, eine Flasche und einen Luftballon. Gesamtkosten: ein paar Euro. Was es beweist:
          alles aus den Einheiten 0–4, laufend auf deinem eigenen Tisch.
        </p>

        <h2>Experiment 1 — der Rotkohl-pH-Regenbogen</h2>
        <p>
          Schneide ein paar Rotkohlblätter klein, übergieße sie mit kochendem Wasser, warte zehn
          Minuten und siebe ab. Die lilafarbene Flüssigkeit ist ein{" "}
          <strong>Anthocyan-Indikator</strong> — derselbe Trick wie Phenolphthalein, nur von einem
          Gemüse. Stelle Gläser mit Haushaltsflüssigkeiten auf, gib in jedes einen Schuss Saft und
          fotografiere deinen Regenbogen: rot in Zitronensaft, lila in Leitungswasser, grün in
          Seifenwasser. Du siehst buchstäblich H⁺-Konzentrationen.
        </p>

        <h2>Experiment 2 — der stöchiometrische Ballon</h2>
        <div className="formula">
          NaHCO₃ + CH₃COOH → CO₂↑ + H₂O + CH₃COONa
          <span className="note">Natron + Essig: 1 mol Natron (84 g) setzt 1 mol CO₂ frei (~24 L bei Raumbedingungen)</span>
        </div>
        <p>
          Gib Essig in eine Flasche, Natron in einen Luftballon, ziehe den Ballon über den Hals und
          kippe ihn hoch. Das Sprudeln ist CO₂, das den Ballon aufbläst. Der Clou des
          Abschlussprojekts: <em>Sag es vorher voraus</em>. Wiege dein Natron, rechne die Stoffmenge
          aus und schätze die Liter CO₂, bevor du kippst. 4 g Natron ≈ 0,048 mol ≈ 1,1 L — ein
          hübsch faustgroßer Ballon. Chemie, die vorhersagt, ist Chemie, die du verstanden hast.
        </p>

        <h2>Experiment 3 — Kristalle an der Schnur</h2>
        <p>
          Rühre Salz in heißes Wasser, bis sich nichts mehr löst (Sättigung, Einheit 3). Hänge einen
          Faden von einem Bleistift in die Lösung und stelle das Glas an einen ruhigen Ort. Über
          Tage, während Wasser verdunstet und die Lösung abkühlt, müssen die überschüssigen Ionen
          wieder ein Gitter bilden — und sie schließen sich bevorzugt <em>deinen</em> wachsenden
          Kristallen am Faden an. Du beobachtest die Ionenbindung aus Einheit 1 beim Bau von
          Architektur in sichtbarer Größe.
        </p>

        <div className="callout warn">
          <span className="co-title">Küchensicherheit — die ehrliche Fassung</span>
          <p>
            Alles hier ist lebensmittelecht, behandle es trotzdem wie ein Labor: kein Glas an der
            Herdkante, beschrifte deine Gläser, trink die Experimente nicht (der Kohlsaft ist
            technisch essbar; das Seifenwasser nicht), und verschließe die Essigflasche{" "}
            <em>nachdem</em> der Ballon sitzt — versiegelter Druck hat keinen ballonförmigen
            Fluchtweg.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Digitaler Zwilling: Der Kohl-Regenbogen",
      intro: (
        <>
          <p>
            Eine Vorschau auf deine Küchenarbeitsplatte: sieben Flüssigkeiten plus Kohlsaft und ein
            Mischglas, um den ganzen Farbbereich zu erkunden, bevor du das Echte braust.
          </p>
          <ul>
            <li>Ordne jede Glasfarbe ihrem pH zu — das ist der Spickzettel für dein Foto.</li>
            <li>Schiebe deine eigene Mischung von 1 bis 14 und präge dir den Bogen rot → lila → grün → gelb ein.</li>
          </ul>
        </>
      ),
    },
    checklist: [
      { id: "brew", text: "Indikator brauen: kochendes Wasser über kleingeschnittenen Rotkohl gießen, 10 Minuten ziehen lassen, in ein Glas absieben." },
      { id: "rainbow", text: "5+ Gläser aufstellen (Zitronensaft, Essig, Leitungswasser, Natronwasser, Seifenwasser) und in jedes einen Schuss Indikator geben." },
      { id: "photo", text: "Die Gläser nach Farbe sortieren und deinen pH-Regenbogen fotografieren — von rot bis grün der Reihe nach." },
      { id: "predict", text: "Natron abwiegen (Küchenwaage), Stoffmenge berechnen (M = 84 g/mol) und das CO₂-Volumen vorhersagen (~24 L/mol)." },
      { id: "balloon", text: "Ballon über den Flaschenhals ziehen, Natron in den Essig kippen — Ballon mit deiner Vorhersage vergleichen." },
      { id: "crystal", text: "Eine gesättigte Salzlösung in heißem Wasser ansetzen und einen Faden hineinhängen." },
      { id: "harvest", text: "Nach 3–7 Tagen: Kristalle mit der Lupe betrachten — achte auf die kubische Gitterform von NaCl." },
    ],
  },
};
