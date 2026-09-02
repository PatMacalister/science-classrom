import type { LessonContentDe } from "../localize";

export const unit7De: Record<string, LessonContentDe> = {
  /* ================================================================ */
  "innate-immunity": {
    Theory: () => (
      <>
        <h2>Die meisten Infektionen finden nie statt</h2>
        <p>
          Du atmest, schluckst und berührst täglich Millionen Mikroben, und fast keine macht dich
          krank. Das ist kein Glück, sondern eine gestaffelte Verteidigung, die beginnt, bevor
          überhaupt etwas hineinkommt. <strong>Haut</strong> ist eine trockene, leicht saure Mauer
          aus toten Zellen, die ständig abgestoßen wird. <strong>Schleim</strong> fängt, was in
          den Atemwegen landet, und schlagende Flimmerhärchen kehren es hinaus. Tränen und
          Speichel führen <strong>Lysozym</strong> mit — ein Enzym im Sinne von Einheit 0, dessen
          aktives Zentrum zufällig bakterielle Zellwände packt und aufbricht. Die Magensäure
          erledigt das meiste, was du schluckst.
        </p>
        <p>
          Alles auf dieser Liste wirkt gegen <em>jede</em> Mikrobe. Das ist das Markenzeichen des{" "}
          <strong>angeborenen</strong> Immunsystems: schnell, uralt und völlig generisch. Es
          erkennt grobe Muster — „das sieht bakteriell aus“, „das wirkt wie ein Virus“ — nie
          einzelne Arten.
        </p>

        <h2>Wenn etwas durchkommt: auffressen</h2>
        <p>
          Hinter den Barrieren stehen als erste Reihe die <strong>Phagozyten</strong> —
          „Fresszellen“ — allen voran <strong>Makrophagen</strong>, die in deinen Geweben
          stationiert sind, und <strong>neutrophile Granulozyten</strong>, die aus dem Blut
          einströmen. Sie verschlingen Mikroben im Ganzen und verdauen sie mit Enzymen. Ein
          einzelner Makrophage frisst in seinem Leben etwa hundert Bakterien; eine ernste
          Infektion ist ein Zahlenrennen zwischen bakterieller Verdopplung und
          Phagozyten-Räumung — und im Labor unten fährst du genau dieses Rennen.
        </p>

        <h2>Die Entzündung ist dein Werk, nicht das des Keims</h2>
        <p>
          Ein infizierter Schnitt wird rot, heiß, geschwollen und wund. Jedes davon ist eine
          Verteidigungshandlung. Beschädigte Zellen und Wachposten schütten{" "}
          <strong>Histamin</strong> aus, das die örtlichen Blutgefäße weitet (rot, heiß) und ihre
          Wände durchlässig macht (geschwollen), damit Phagozyten und antibakterielle Proteine
          aus dem Blut ins Gewebe fluten können. Der Schmerz sind örtliche Nerven, die
          empfindlicher geschaltet werden, damit du die Stelle schonst. Die Entzündung fühlt sich
          wie die Krankheit an; tatsächlich ist sie die Feuerwehr.
        </p>

        <h2>Fieber: Kämpfen mit dem Thermostat</h2>
        <p>
          Dieselbe Logik, auf den ganzen Körper skaliert. Immunsignale stellen den Thermostat im
          Gehirn ein paar Grad höher, und Einheit 0.3 sagt dir, warum das hilft: Enzymgetriebene
          Prozesse sind temperaturempfindlich. Viele Erreger sind auf 37&nbsp;°C eingestellt und
          teilen sich bei 39&nbsp;°C langsamer, während mehrere deiner eigenen
          Abwehrprozesse schneller laufen. Ein moderates Fieber ist kein Schaden — es ist das
          gezielte Kippen eines Rennens, das du gewinnen willst.
        </p>

        <div className="callout note">
          <span className="co-title">Warum Eiter weiß ist</span>
          <p>
            Eiter besteht großteils aus toten Neutrophilen — Millionen kurzlebiger Fresszellen,
            die hineinstürmten, verschlangen, was sie konnten, und auf ihrem Posten starben. Eine
            sichtbar unordentliche Wunde ist oft der Beweis einer Verteidigung, die funktioniert
            hat.
          </p>
        </div>

        <h2>Die Grenzen des Nicht-Fragens</h2>
        <p>
          Das angeborene System ist schnell, gerade weil es generisch ist — nichts muss gelernt
          werden. Aber generisch hat eine Decke: Es kann nicht besser darin werden,{" "}
          <em>diesen bestimmten</em> Erreger zu bekämpfen, und manche Eindringlinge entwickeln
          sich an seinen Standardtricks vorbei. Für die braucht es ein System, das lernt. Das ist
          die nächste Lektion.
        </p>
      </>
    ),
    lab: {
      title: "Wachstum gegen Räumung",
      intro: (
        <>
          <p>Bakterien verdoppeln sich; Phagozyten fressen. Wer schneller aufzinst, gewinnt.</p>
          <ul>
            <li>Finde bei 2 h Verdopplungszeit die kleinste Phagozytenzahl, die die Infektion noch räumt.</li>
            <li>Stell einen schnellen Verdoppler ein (0,5 h). Sieh zu, wie er eine eben noch souveräne Abwehr überrennt.</li>
            <li>Jetzt Fieber einschalten. Langsamere Keime, schnellere Verteidiger — welche verlorenen Rennen kippt es?</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Ein Bakterium verdoppelt sich alle 20 Minuten. Wie viele Bakterien nach 4 Stunden, wenn nichts sie frisst?",
        answer: 4096,
        unit: "Bakterien",
        hint: "4 Stunden sind 12 Verdopplungen.",
        explain: "12 Verdopplungen: 2¹² = 4.096. Ungebremstes exponentielles Wachstum — darum muss die Antwort schnell sein.",
      },
      {
        prompt:
          "Ein Makrophage räumt etwa 3 Bakterien pro Stunde. Wie viele Makrophagen braucht es, um 600 Bakterien pro Stunde zu räumen?",
        answer: 200,
        unit: "Makrophagen",
        hint: "Arbeitslast durch die Rate pro Zelle teilen.",
        explain: "600 ÷ 3 = 200 Zellen — weshalb der Körper Millionen auf Patrouille hält.",
      },
    ],
    quiz: [
      {
        q: "Was macht eine Abwehr „angeboren“ statt adaptiv?",
        choices: [
          "Sie ist generisch und muss nichts lernen — dieselbe Antwort auf jeden Erreger",
          "Sie wirkt nur gegen Bakterien",
          "Sie ist langsamer, aber stärker",
          "Es gibt sie nur beim Menschen",
        ],
        answer: 0,
        explain:
          "Angeborene Abwehr erkennt grobe Muster („bakteriell“, „viral“) und antwortet in Minuten — wird aber gegen einen bestimmten Feind nie besser.",
      },
      {
        q: "Warum wird ein infizierter Schnitt rot, heiß und geschwollen?",
        choices: [
          "Die Bakterien erzeugen beim Wachsen Wärme",
          "Histamin weitet die örtlichen Gefäße und macht sie durchlässig, damit Verteidiger ins Gewebe fluten",
          "Die Haut löst sich auf",
          "Blut gerinnt in der Wunde",
        ],
        answer: 1,
        explain:
          "Die Entzündung ist deine eigene Antwort: weitere, durchlässigere Gefäße liefern Phagozyten und Abwehrproteine an den Ort. Sie fühlt sich wie die Krankheit an, ist aber die Verteidigung.",
      },
      {
        q: "Wie hilft ein moderates Fieber im Kampf gegen eine Infektion?",
        choices: [
          "Hitze sterilisiert das Blut direkt",
          "Es verbrennt Energie, die der Erreger braucht",
          "Viele Erreger teilen sich über 37 °C langsamer, während Abwehrprozesse schneller laufen",
          "Gar nicht — Fieber ist rein schädlich",
        ],
        answer: 2,
        explain:
          "Enzymgetriebene Prozesse sind auf Temperatur abgestimmt. Den Thermostat zu verstellen kippt das Rennen Wachstum-gegen-Räumung zu deinen Gunsten.",
      },
      {
        q: "Was tut ein Phagozyt, wenn er eine Infektion bekämpft?",
        choices: [
          "Er produziert Antikörper",
          "Er merkt sich den Erreger fürs nächste Mal",
          "Er hindert den Erreger am Eindringen in Zellen",
          "Er verschlingt Mikroben im Ganzen und verdaut sie mit Enzymen",
        ],
        answer: 3,
        explain:
          "Phagozyten wie Makrophagen und Neutrophile fressen Eindringlinge buchstäblich auf. Antikörper und Gedächtnis gehören zum adaptiven System — nächste Lektion.",
      },
      {
        q: "Lysozym in Tränen bricht bakterielle Zellwände auf. Was für ein Molekül ist es?",
        choices: [
          "Ein Enzym — ein Protein mit einem aktiven Zentrum, das zu seinem Substrat passt",
          "Ein Antikörper",
          "Ein Hormon",
          "Ein Lipid",
        ],
        answer: 0,
        explain:
          "Einheit 0 in Aktion: ein Proteinkatalysator, dessen aktives Zentrum zufällig die Bindungen bakterieller Zellwände packt.",
      },
    ],
  },

  /* ================================================================ */
  "adaptive-immunity": {
    Theory: () => (
      <>
        <h2>Ein Schlüssel für ein nie gesehenes Schloss</h2>
        <p>
          Das adaptive Immunsystem löst ein absurd klingendes Problem: Feinde zu erkennen, die es
          noch gar nicht gibt. Es kann nicht vorher wissen, wie das Virus des nächsten Jahres
          aussieht — also versucht es das gar nicht. Stattdessen erzeugt dein Körper{" "}
          <strong>Milliarden von Lymphozyten</strong> (B-Zellen und T-Zellen), von denen jede{" "}
          <em>einen</em> zufällig zusammengesetzten Rezeptor trägt. Die Rezeptorgene werden
          während der Entwicklung der Zelle gemischt und verspleißt, sodass die Population als
          Ganzes einen astronomischen Formenraum abdeckt. Irgendwo in dir sitzt in diesem Moment
          eine Zelle, deren Rezeptor auf einen Erreger passt, dem noch nie ein Mensch begegnet
          ist.
        </p>

        <h2>Klonale Selektion — Darwin, innerlich</h2>
        <p>
          Kommt ein Erreger an, sind seine Oberflächenmoleküle — <strong>Antigene</strong> — ein
          Formtest für die gesamte Population. Die seltenen Lymphozyten, deren Rezeptor zufällig
          passt, werden <strong>selektiert</strong>: Sie aktivieren sich und teilen sich rasant,
          etwa alle 12 Stunden, und bauen eine Armee aus Klonen auf. Das ist die natürliche
          Selektion aus Einheit 5, die im Inneren deines Körpers auf einer Zeitskala von Tagen
          läuft: erst zufällige Variation, dann Auswahl durch die Umwelt, dann Vervielfältigung
          der Gewinner.
        </p>
        <p>
          Die Arbeitsteilung: <strong>B-Zellen</strong> reifen zu Plasmazellen, die{" "}
          <strong>Antikörper</strong> auspumpen — frei schwimmende Versionen ihres Rezeptors, die
          am Erreger haften, seine Maschinerie verkleben und ihn für die Phagozyten der letzten
          Lektion markieren. <strong>Killer-T-Zellen</strong> übernehmen den härteren Fall: Sie
          erkennen deine eigenen, bereits infizierten Zellen und befehlen ihnen die
          Selbstzerstörung, bevor das Virus darin fertig repliziert.
        </p>

        <h2>Warum du eine Woche krank bist</h2>
        <p>
          Selektion plus Expansion kostet Zeit. Von der Erstinfektion dauert es typischerweise{" "}
          <strong>fünf bis sieben Tage</strong>, bis der Antikörperspiegel hoch genug ist, um zu
          zählen — und in dieser Verzögerung vermehrt sich der Erreger frei. Diese Lücke{" "}
          <em>ist</em> im Wesentlichen die Krankheit. Das angeborene System hält die Linie; das
          adaptive kommt wie schwere Kavallerie, spät, aber entscheidend.
        </p>

        <h2>Gedächtnis: der ganze Sinn</h2>
        <p>
          Nach dem Sieg stirbt der Großteil der Klonarmee ab — aber eine Reserve langlebiger{" "}
          <strong>Gedächtniszellen</strong> bleibt, manchmal jahrzehntelang. Bei der zweiten
          Begegnung gibt es kein Suchen und kaum Verzögerung: Die Antwort startet binnen eines
          Tages, von einer weit größeren Basis, und räumt den Erreger meist weg, bevor du
          Symptome bemerkst. Darum bekommen die meisten Menschen Windpocken nur einmal.
        </p>
        <div className="formula">
          Erstkontakt: ~6 Tage Verzögerung &nbsp;·&nbsp; Zweitkontakt: ~1 Tag
          <span className="note">die Gedächtnisantwort ist schneller, höher und meist unsichtbar</span>
        </div>

        <h2>Impfstoffe: der Erstkontakt, ohne die Krankheit</h2>
        <p>
          Ein Impfstoff zeigt deinem Immunsystem ein Antigen — einen abgetöteten oder
          abgeschwächten Erreger, ein harmloses Bruchstück oder (mRNA-Impfstoffe) die Anleitung,
          mit der deine eigenen Zellen das Bruchstück per Proteinsynthese aus Einheit 2 selbst
          bauen. Das adaptive System fährt sein volles Programm: Selektion, Expansion,
          Gedächtnis. Was du überspringst, ist der Teil, in dem sich ein lebender Erreger sechs
          Tage ungebremst vermehrt. Kommt das Original, trifft es auf eine Gedächtnisantwort —
          und das Labor unten zeigt, was für ein Unterschied das ist.
        </p>

        <div className="callout note">
          <span className="co-title">Eigenbeschuss</span>
          <p>
            Ein so mächtiges System braucht einen Aus-Schalter für „selbst“. Lymphozyten, die auf
            körpereigene Moleküle reagieren, werden normalerweise während der Entwicklung
            aussortiert; versagt diese Musterung, ist das Ergebnis eine Autoimmunkrankheit.
            Allergien sind der verwandte Fehler — eine volle Militärantwort auf Pollen, die nie
            eine Bedrohung waren.
          </p>
        </div>
      </>
    ),
    lab: {
      title: "Erst- gegen Zweitkontakt",
      intro: (
        <>
          <p>Ein Erreger, zweimal getroffen. Sieh, was das Gedächtnis aus der zweiten Runde macht.</p>
          <ul>
            <li>Fahre eine Erstinfektion: fast zwei Wochen über der Kranklinie, während die Antwort hochfährt.</li>
            <li>Schieb den Zweitkontakt nach hinten. Die Antikörper sind abgeklungen — das Gedächtnis antwortet trotzdem in einem Tag.</li>
            <li>Stell Tag 0 auf Impfung um: gleiches Gedächtnis, null Kranktage, egal wann.</li>
          </ul>
        </>
      ),
    },
    problems: [
      {
        prompt:
          "Eine aktivierte B-Zelle teilt sich alle 12 Stunden. Wie viele Zellen sind es, ausgehend von einer, nach 5 Tagen?",
        answer: 1024,
        unit: "Zellen",
        hint: "5 Tage = 10 Teilungen.",
        explain: "2¹⁰ = 1.024. Klonale Expansion ist exponentiell — darum kauft ein paar Tage Verzögerung eine echte Armee.",
      },
      {
        prompt:
          "Bei einer Krankheit steckt jeder Fall 5 weitere an (R₀ = 5). Welcher Anteil der Bevölkerung muss immun sein, um die Ausbreitung zu stoppen? (Herdenimmunitätsschwelle = 1 − 1/R₀, in Prozent)",
        answer: 80,
        unit: "%",
        hint: "1 − 1/5, dann in Prozent.",
        explain:
          "1 − 1/5 = 0,8 = 80 %. Darüber steckt jeder Fall im Schnitt weniger als einen weiteren an, und Ausbrüche laufen aus.",
      },
    ],
    quiz: [
      {
        q: "Wie kann das Immunsystem einen Erreger erkennen, den es nie zuvor gab?",
        choices: [
          "Es analysiert zuerst die DNA des Erregers",
          "Antikörper formen sich passend um",
          "Es baut vorab Milliarden Lymphozyten mit zufälligen Rezeptoren — irgendeiner passt auf fast alles",
          "Gar nicht — nur bekannte Erreger werden bekämpft",
        ],
        answer: 2,
        explain:
          "Erst zufällige Erzeugung, dann Selektion. Der Erreger selbst pickt die wenigen passenden Zellen heraus — Voraussicht ist nicht nötig.",
      },
      {
        q: "Welchem Prozess aus dem bisherigen Kurs ähnelt die klonale Selektion?",
        choices: [
          "Der Osmose",
          "Der natürlichen Selektion — zufällige Variation, Auswahl durch die Umwelt, Vervielfältigung der Gewinner",
          "Der DNA-Replikation",
          "Der Zehn-Prozent-Regel",
        ],
        answer: 1,
        explain:
          "Es ist der Algorithmus aus Einheit 5 auf einer Zeitskala von Tagen: Die Antigen-„Umwelt“ wählt unter zufällig variierten Rezeptoren, und die Gewinner werden vervielfältigt.",
      },
      {
        q: "Warum macht eine Erstinfektion dich ungefähr eine Woche krank?",
        choices: [
          "Antikörper sind giftig, während sie wirken",
          "Das angeborene System muss erst versagen",
          "Fieber braucht eine Woche, um sich zu entwickeln",
          "Die wenigen passenden Lymphozyten zu finden und zu vermehren dauert Tage — und der Erreger vermehrt sich währenddessen",
        ],
        answer: 3,
        explain:
          "Die Verzögerung zwischen Kontakt und voller Antikörperantwort ist die Krankheit. Beim Zweitkontakt kürzen Gedächtniszellen sie auf etwa einen Tag.",
      },
      {
        q: "Was gibt ein Impfstoff deinem Immunsystem tatsächlich?",
        choices: [
          "Einen Erstkontakt mit dem Antigen — Selektion, Expansion und Gedächtnis — ohne einen sich vermehrenden Erreger",
          "Fertige Antikörper, die für immer bleiben",
          "Eine stärkere angeborene Antwort",
          "Medikamente, die den Erreger direkt töten",
        ],
        answer: 0,
        explain:
          "Das adaptive Programm läuft vollständig; übersprungen wird nur die Krankheit. Der echte Erreger trifft dann vom ersten Tag an auf eine Gedächtnisantwort.",
      },
      {
        q: "Was können Killer-T-Zellen, was Antikörper nicht können?",
        choices: [
          "Bakterien im Blut verdauen",
          "Histamin produzieren",
          "Körpereigene, bereits infizierte Zellen erkennen und zerstören",
          "Erreger länger im Gedächtnis behalten",
        ],
        answer: 2,
        explain:
          "Antikörper wirken auf das, was außerhalb von Zellen schwimmt. Steckt ein Virus erst einmal drin, kann nur eine Killer-T-Zelle der infizierten Zelle die Selbstzerstörung befehlen.",
      },
    ],
  },
};
