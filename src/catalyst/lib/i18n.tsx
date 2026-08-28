"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

/*
 * Lightweight i18n for the interface chrome.
 * - `useLang()` returns the current language + setter (persisted in localStorage).
 * - `useT()` returns a lookup into the UI-string dictionary below.
 * Lesson content itself is English; the periodic table is bilingual by design
 * (element names EN/DE, Eselsbrücken in German — that is the point of them).
 * Placeholders in strings use {name} and are filled by fmt().
 */

export type Lang = "en" | "de";

const LANG_KEY = "science-lang";

const EN = {
  /* topbar */
  complete: "{done} / {total} complete",
  lessonsWord: "lessons",
  elementsLink: "🧪 Elements",
  /* home */
  heroTitlePre: "Learn chemistry",
  heroTitleZap: "by experimenting",
  heroLead:
    "A hands-on course that starts inside a single atom and never stops mixing: every lesson pairs readable theory with an interactive lab you can poke, heat, dilute and overdose — then a short quiz locks it in. It ends with real experiments at your kitchen table and a battery you grow out of lemons.",
  statLessons: "lessons",
  statUnits: "units",
  statBuilds: "real experiments",
  statElements: "elements mapped",
  statCompleted: "completed",
  startLearning: "Start learning →",
  continueLearning: "Continue →",
  reviewDeck: "🃏 Review deck",
  reviewDue: "({n} due)",
  certificate: "🎓 Certificate",
  periodicTable: "🧪 Periodic table",
  unitWord: "UNIT",
  specIntro: "Parallel branches — take them in any order.",
  capstoneHead: "🎯 It ends at your kitchen table",
  capstoneBody:
    "Each tier closes with the real thing: the core course ends in the Kitchen Lab — red-cabbage pH indicator, a CO₂ balloon you stoichiometrically size, salt crystals grown on a string — and the advanced course ends with a lemon battery that lights an actual LED. By the time you get there, you understand every reaction in it.",
  progressSaved: "Progress is saved in this browser.",
  resetProgress: "Reset progress",
  resetConfirm: "Really reset all progress?",
  doneBadge: "✓ done",
  /* tiers */
  tierCore: "Core Course",
  tierCoreTag: "From a lone proton to titration curves — atoms, bonds, reactions, moles, acids and bases.",
  tierAdvanced: "Advanced Course",
  tierAdvancedTag: "Energy, rates and equilibrium, then electrochemistry — closing the loop from chemistry to electricity.",
  badgeAdvanced: "ADVANCED",
  badgeExpert: "EXPERT",
  badgeMaster: "MASTER",
  badgeSpecialization: "SPECIALIZATION",
  /* lesson page */
  allLessons: "← All lessons",
  lessonWord: "LESSON",
  lessonPosition: "lesson {i} of {n} in this unit",
  buildsOn: "Builds on:",
  labWord: "Lab",
  previous: "← Previous",
  next: "Next →",
  courseComplete: "Course complete",
  branchComplete: "Branch complete",
  backToOverview: "Back to overview",
  chooseNextSpec: "Choose your next branch",
  notTranslated:
    "🇩🇪 This lesson's full text hasn't been translated yet — the theory below is in English. Titles, quizzes and the interface are already localized.",
  lessonNotFound: "Lesson not found",
  lessonNotFoundBody: "That lesson doesn't exist (yet).",
  backToCurriculum: "Back to the curriculum",
  /* quiz */
  quizHead: "Check your understanding",
  quizPassedBanner: "✓ Already passed with {score} / {total}. Retake it any time.",
  quizCheck: "Check answers",
  quizAnswerAll: "Answer all questions…",
  quizTryAgain: "Try again",
  quizPassed: "Passed — {score} / {total} correct. Lesson complete! 🎉",
  quizFailed: "{score} / {total} correct. You need {need} to pass — review the theory and try again.",
  quizCorrect: "✓ Correct. ",
  quizWrongIs: "✗ The answer is “{answer}”. ",
  /* problems */
  probHead: "Work it by hand — {solved} / {total}",
  probIntro:
    "No multiple choice here: compute the value and type it. Suffixes like 2.5k, 20m or 100µ are understood; answers within ±{tol}% count.",
  probPlaceholder: "answer in {unit} (SI suffixes ok: 2.5k, 20m…)",
  probPlaceholderNoUnit: "answer (SI suffixes ok: 2.5k, 20m…)",
  probCheck: "Check",
  probHint: "Hint",
  probHideHint: "Hide hint",
  probWrong: "✗ Not quite — check your powers of ten and try again.",
  probReveal: "✗ Not quite — the answer is {answer}. {explain}",
  /* checklist */
  checklistHead: "Experiment checklist — {done} / {total}",
  checklistDoneHead: "🎉 It worked! You did real chemistry.",
  checklistDoneBody:
    "From theory to reactions fizzing on your own table — this capstone is complete. Keep the cabbage juice in the fridge and the lemons wired up: they are the start of your lab.",
  /* sync panel */
  syncHead: "Progress & backup",
  syncBrowserOnly: "this browser only",
  syncSyncing: "syncing…",
  syncSynced: "synced ✓",
  syncError: "sync error — working offline",
  syncCodeLabel: "Sync code",
  syncCopy: "Copy",
  syncQr: "QR code",
  syncQrHide: "Hide QR",
  syncQrHint: "Scan with another device: the course opens and links itself automatically.",
  syncUnlink: "Unlink this device",
  syncAcross: "Sync across devices",
  syncEnable: "Enable sync",
  syncEnterCode: "…or enter a code from another device",
  syncLink: "Link",
  syncBackupFile: "Backup file",
  syncExport: "⬇ Export",
  syncImport: "⬆ Import",
  syncEnabled: "Sync is on. Your code is shown below — enter it on any other device to link it.",
  syncFailed: "Could not reach the sync server. Progress stays safe in this browser.",
  syncLinked: "Linked! Progress from both devices has been merged.",
  syncLinkFailed: "Linking failed.",
  syncImported: "Backup imported — merged with what was already here.",
  syncBadFile: "That file isn't a Catalyst Academy progress backup.",
  syncCopied: "Code copied to the clipboard.",
  syncCopyFailed: "Couldn't copy automatically — select the code and copy it by hand.",
  syncFootnote:
    "Progress lives in this browser; sync keeps a server copy reachable only by your code, and exports are plain files you own. Imports and links always merge — nothing is overwritten.",
  /* review */
  reviewTitle: "Review",
  reviewChip: "REVIEW DECK",
  reviewCard: "card {i} of {n} · from",
  reviewEmptyHead: "Nothing to review",
  reviewEmptyBody:
    "Miss a quiz question anywhere in the course and it lands here, on a spaced-repetition schedule, until you've beaten it three times.",
  reviewClearedHead: "Deck cleared 🎉",
  reviewClearedBody:
    "{right} right, {wrong} wrong this session. Missed ones return in 10 minutes; beaten ones move out a day or more.",
  reviewBackToCourse: "Back to the course",
  reviewBeaten: "✓ Beaten — it moves a box further out. ",
  reviewMissed: "✗ Back to the start of the ladder. ",
  reviewNext: "Next card →",
  reviewFinish: "Finish session",
  /* certificate */
  certChip: "CERTIFICATE",
  certAwaitsHead: "The certificate awaits",
  certAwaitsBody:
    "It unlocks when both capstone experiments are done — reactions on the table, not just quizzes on the screen.",
  certSub: "Catalyst Academy · Certificate of Completion",
  certTitle: "Chemistry, from the Atom Up",
  certNamePlaceholder: "Your name, as it should appear",
  certBody:
    "has completed the curriculum ({done} of {total} lessons, from the structure of the atom through bonds, reactions, moles, acids and electrochemistry) and proved it the only way that counts:",
  certBuild1: "🥬 the Kitchen Lab (red-cabbage pH, CO₂ balloon, crystals)",
  certBuild2: "🍋 the Lemon Battery (an LED lit by fruit)",
  certEvery: "Every one performed by hand, from reagents understood down to the last electron shell.",
  certCompleted: "completed {date} · verify: the purple indicator in the fridge",
  certPrint: "🖨 Print / save as PDF",
  certChangeName: "Change name",
  certTypeName: "Type your name above, then print.",
  /* elements page */
  elementsChip: "PERIODIC TABLE",
  elementsTitle: "The 118 Elements",
  elementsLead:
    "Every element, its symbol — and a memory hook for each one (in German: an Eselsbrücke), because half the symbols come from Latin or Greek names you'd never guess. Click any tile for details; switch to the list to search.",
  elementsSearch: "Search: name, symbol or number…",
  elementsGridView: "Table view",
  elementsListView: "List view",
  elementsNoHit: "Nothing matches “{q}”.",
  elCol: "El.",
  colName: "Name",
  colNameDe: "German name",
  colMass: "Mass",
  colEsel: "Memory hook",
  eselTag: "💡 Memory hook",
  detailPeriod: "Period",
  detailGroup: "Group",
  detailMass: "Atomic mass",
  detailCategory: "Category",
  detailShells: "Electrons per shell",
  detailPickOne: "Click an element in the table to see its details and Eselsbrücke.",
  catAlkali: "Alkali metal",
  catAlkaline: "Alkaline earth",
  catTransition: "Transition metal",
  catPostTransition: "Post-transition metal",
  catMetalloid: "Metalloid",
  catNonmetal: "Nonmetal",
  catHalogen: "Halogen",
  catNoble: "Noble gas",
  catLanthanide: "Lanthanide",
  catActinide: "Actinide",
  catUnknown: "Properties unknown",
  /* footer */
  footer:
    "Catalyst Academy — an interactive path from a single atom to reactions fizzing on your kitchen table. Progress is saved locally in your browser.",
};

const DE: Record<keyof typeof EN, string> = {
  complete: "{done} / {total} abgeschlossen",
  lessonsWord: "Lektionen",
  elementsLink: "🧪 Elemente",
  heroTitlePre: "Chemie lernen —",
  heroTitleZap: "durch Experimentieren",
  heroLead:
    "Ein praxisnaher Kurs, der im Inneren eines einzelnen Atoms beginnt und nie aufhört zu mischen: Jede Lektion verbindet lesbare Theorie mit einem interaktiven Labor zum Anfassen, Erhitzen, Verdünnen und Überdosieren — ein kurzes Quiz sichert das Gelernte. Am Ende stehen echte Experimente am Küchentisch und eine Batterie aus Zitronen.",
  statLessons: "Lektionen",
  statUnits: "Einheiten",
  statBuilds: "echte Experimente",
  statElements: "Elemente kartiert",
  statCompleted: "abgeschlossen",
  startLearning: "Jetzt loslegen →",
  continueLearning: "Weiter →",
  reviewDeck: "🃏 Wiederholung",
  reviewDue: "({n} fällig)",
  certificate: "🎓 Zertifikat",
  periodicTable: "🧪 Periodensystem",
  unitWord: "EINHEIT",
  specIntro: "Parallele Zweige — in beliebiger Reihenfolge.",
  capstoneHead: "🎯 Am Ende steht dein Küchentisch",
  capstoneBody:
    "Jede Stufe endet mit dem Echten: Der Grundkurs mündet ins Küchenlabor — Rotkohl-pH-Indikator, ein stöchiometrisch dosierter CO₂-Ballon, Salzkristalle an der Schnur — und der Aufbaukurs endet mit einer Zitronenbatterie, die eine echte LED leuchten lässt. Wenn du dort ankommst, verstehst du jede Reaktion darin.",
  progressSaved: "Der Fortschritt wird in diesem Browser gespeichert.",
  resetProgress: "Fortschritt zurücksetzen",
  resetConfirm: "Wirklich den gesamten Fortschritt löschen?",
  doneBadge: "✓ fertig",
  tierCore: "Grundkurs",
  tierCoreTag: "Vom einzelnen Proton bis zur Titrationskurve — Atome, Bindungen, Reaktionen, Mol, Säuren und Basen.",
  tierAdvanced: "Aufbaukurs",
  tierAdvancedTag: "Energie, Geschwindigkeit und Gleichgewicht, dann Elektrochemie — der Bogen von der Chemie zur Elektrizität.",
  badgeAdvanced: "AUFBAU",
  badgeExpert: "EXPERTE",
  badgeMaster: "MEISTER",
  badgeSpecialization: "SPEZIALISIERUNG",
  allLessons: "← Alle Lektionen",
  lessonWord: "LEKTION",
  lessonPosition: "Lektion {i} von {n} in dieser Einheit",
  buildsOn: "Baut auf:",
  labWord: "Labor",
  previous: "← Zurück",
  next: "Weiter →",
  courseComplete: "Kurs abgeschlossen",
  branchComplete: "Zweig abgeschlossen",
  backToOverview: "Zurück zur Übersicht",
  chooseNextSpec: "Wähle deinen nächsten Zweig",
  notTranslated:
    "🇩🇪 Der volle Text dieser Lektion ist noch nicht übersetzt — die Theorie unten ist auf Englisch. Titel, Quiz und Oberfläche sind bereits lokalisiert.",
  lessonNotFound: "Lektion nicht gefunden",
  lessonNotFoundBody: "Diese Lektion existiert (noch) nicht.",
  backToCurriculum: "Zurück zum Lehrplan",
  quizHead: "Teste dein Verständnis",
  quizPassedBanner: "✓ Bereits bestanden mit {score} / {total}. Du kannst jederzeit wiederholen.",
  quizCheck: "Antworten prüfen",
  quizAnswerAll: "Beantworte alle Fragen…",
  quizTryAgain: "Nochmal versuchen",
  quizPassed: "Bestanden — {score} / {total} richtig. Lektion abgeschlossen! 🎉",
  quizFailed: "{score} / {total} richtig. Du brauchst {need} zum Bestehen — wiederhole die Theorie und versuch es nochmal.",
  quizCorrect: "✓ Richtig. ",
  quizWrongIs: "✗ Die Antwort ist „{answer}“. ",
  probHead: "Rechne von Hand — {solved} / {total}",
  probIntro:
    "Kein Multiple-Choice: Berechne den Wert und tippe ihn ein. Suffixe wie 2.5k, 20m oder 100µ werden verstanden; Antworten innerhalb von ±{tol}% zählen.",
  probPlaceholder: "Antwort in {unit} (SI-Suffixe ok: 2.5k, 20m…)",
  probPlaceholderNoUnit: "Antwort (SI-Suffixe ok: 2.5k, 20m…)",
  probCheck: "Prüfen",
  probHint: "Tipp",
  probHideHint: "Tipp ausblenden",
  probWrong: "✗ Nicht ganz — prüfe deine Zehnerpotenzen und versuch es nochmal.",
  probReveal: "✗ Nicht ganz — die Antwort ist {answer}. {explain}",
  checklistHead: "Experiment-Checkliste — {done} / {total}",
  checklistDoneHead: "🎉 Es hat funktioniert! Du hast echte Chemie gemacht.",
  checklistDoneBody:
    "Von der Theorie zu Reaktionen, die auf deinem eigenen Tisch sprudeln — dieses Abschlussprojekt ist geschafft. Stell den Rotkohlsaft in den Kühlschrank und lass die Zitronen verkabelt: Sie sind der Anfang deines Labors.",
  syncHead: "Fortschritt & Backup",
  syncBrowserOnly: "nur dieser Browser",
  syncSyncing: "synchronisiere…",
  syncSynced: "synchronisiert ✓",
  syncError: "Sync-Fehler — arbeite offline",
  syncCodeLabel: "Sync-Code",
  syncCopy: "Kopieren",
  syncQr: "QR-Code",
  syncQrHide: "QR ausblenden",
  syncQrHint: "Mit einem anderen Gerät scannen: Der Kurs öffnet sich und verbindet sich automatisch.",
  syncUnlink: "Gerät trennen",
  syncAcross: "Über Geräte synchronisieren",
  syncEnable: "Sync aktivieren",
  syncEnterCode: "…oder Code von einem anderen Gerät eingeben",
  syncLink: "Verbinden",
  syncBackupFile: "Backup-Datei",
  syncExport: "⬇ Exportieren",
  syncImport: "⬆ Importieren",
  syncEnabled: "Sync ist aktiv. Dein Code steht unten — gib ihn auf jedem anderen Gerät ein, um es zu verbinden.",
  syncFailed: "Sync-Server nicht erreichbar. Der Fortschritt bleibt sicher in diesem Browser.",
  syncLinked: "Verbunden! Der Fortschritt beider Geräte wurde zusammengeführt.",
  syncLinkFailed: "Verbinden fehlgeschlagen.",
  syncImported: "Backup importiert — mit dem vorhandenen Stand zusammengeführt.",
  syncBadFile: "Diese Datei ist kein Catalyst-Academy-Fortschritts-Backup.",
  syncCopied: "Code in die Zwischenablage kopiert.",
  syncCopyFailed: "Automatisches Kopieren fehlgeschlagen — markiere den Code und kopiere ihn von Hand.",
  syncFootnote:
    "Der Fortschritt lebt in diesem Browser; Sync hält eine Server-Kopie, die nur über deinen Code erreichbar ist, und Exporte sind einfache Dateien, die dir gehören. Importe und Verbindungen führen immer zusammen — nichts wird überschrieben.",
  reviewTitle: "Wiederholung",
  reviewChip: "WIEDERHOLUNGSSTAPEL",
  reviewCard: "Karte {i} von {n} · aus",
  reviewEmptyHead: "Nichts zu wiederholen",
  reviewEmptyBody:
    "Verfehlst du irgendwo im Kurs eine Quizfrage, landet sie hier — nach Spaced-Repetition-Plan, bis du sie dreimal geschlagen hast.",
  reviewClearedHead: "Stapel geleert 🎉",
  reviewClearedBody:
    "{right} richtig, {wrong} falsch in dieser Runde. Verfehlte kommen in 10 Minuten zurück; geschlagene rücken einen Tag oder mehr nach hinten.",
  reviewBackToCourse: "Zurück zum Kurs",
  reviewBeaten: "✓ Geschlagen — die Karte rückt eine Box weiter. ",
  reviewMissed: "✗ Zurück an den Anfang der Leiter. ",
  reviewNext: "Nächste Karte →",
  reviewFinish: "Runde beenden",
  certChip: "ZERTIFIKAT",
  certAwaitsHead: "Das Zertifikat wartet",
  certAwaitsBody:
    "Es wird freigeschaltet, wenn beide Abschluss-Experimente durchgeführt sind — Reaktionen auf dem Tisch, nicht nur Quiz auf dem Bildschirm.",
  certSub: "Catalyst Academy · Abschlusszertifikat",
  certTitle: "Chemie, vom Atom aufwärts",
  certNamePlaceholder: "Dein Name, wie er erscheinen soll",
  certBody:
    "hat den Lehrplan abgeschlossen ({done} von {total} Lektionen, vom Aufbau des Atoms über Bindungen, Reaktionen, Mol und Säuren bis zur Elektrochemie) und es auf die einzige Art bewiesen, die zählt:",
  certBuild1: "🥬 das Küchenlabor (Rotkohl-pH, CO₂-Ballon, Kristalle)",
  certBuild2: "🍋 die Zitronenbatterie (eine LED, von Obst betrieben)",
  certEvery: "Jedes davon von Hand durchgeführt, mit Reagenzien, verstanden bis zur letzten Elektronenschale.",
  certCompleted: "abgeschlossen am {date} · Nachweis: der lila Indikator im Kühlschrank",
  certPrint: "🖨 Drucken / als PDF speichern",
  certChangeName: "Namen ändern",
  certTypeName: "Gib oben deinen Namen ein, dann drucken.",
  elementsChip: "PERIODENSYSTEM",
  elementsTitle: "Die 118 Elemente",
  elementsLead:
    "Jedes Element, sein Symbol — und zu jedem eine Eselsbrücke, denn die Hälfte der Symbole stammt aus lateinischen oder griechischen Namen, auf die man nie käme. Klicke eine Kachel für Details; wechsle zur Liste, um zu suchen.",
  elementsSearch: "Suche: Name, Symbol oder Nummer…",
  elementsGridView: "Tabellenansicht",
  elementsListView: "Listenansicht",
  elementsNoHit: "Nichts passt zu „{q}“.",
  elCol: "El.",
  colName: "Name",
  colNameDe: "Deutscher Name",
  colMass: "Masse",
  colEsel: "Eselsbrücke",
  eselTag: "🫏 Eselsbrücke",
  detailPeriod: "Periode",
  detailGroup: "Gruppe",
  detailMass: "Atommasse",
  detailCategory: "Kategorie",
  detailShells: "Elektronen pro Schale",
  detailPickOne: "Klicke ein Element in der Tabelle, um Details und Eselsbrücke zu sehen.",
  catAlkali: "Alkalimetall",
  catAlkaline: "Erdalkalimetall",
  catTransition: "Übergangsmetall",
  catPostTransition: "Metall (Hauptgruppe)",
  catMetalloid: "Halbmetall",
  catNonmetal: "Nichtmetall",
  catHalogen: "Halogen",
  catNoble: "Edelgas",
  catLanthanide: "Lanthanoid",
  catActinide: "Actinoid",
  catUnknown: "Eigenschaften unbekannt",
  footer:
    "Catalyst Academy — ein interaktiver Weg vom einzelnen Atom zu Reaktionen, die auf deinem Küchentisch sprudeln. Der Fortschritt wird lokal in deinem Browser gespeichert.",
};

export type UIKey = keyof typeof EN;

const DICTS: Record<Lang, Record<UIKey, string>> = { en: EN, de: DE };

/** Fill {name} placeholders. */
export function fmt(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

interface LangStore {
  lang: Lang;
  setLang(l: Lang): void;
}

const LangContext = createContext<LangStore>({ lang: "en", setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const loadedRef = useRef(false);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    try {
      const stored = localStorage.getItem(LANG_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
      if (stored === "de" || stored === "en") setLangState(stored);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    // keep the (non-React) canvas label translator in step with the language
    void import("./labStrings").then(({ setLabDictionary, LAB_DE }) =>
      setLabDictionary(lang === "de" ? LAB_DE : null)
    );
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(LANG_KEY, l);
    } catch {}
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): LangStore {
  return useContext(LangContext);
}

/** UI-string lookup for the current language. */
export function useT(): (key: UIKey, vars?: Record<string, string | number>) => string {
  const { lang } = useLang();
  return useCallback(
    (key: UIKey, vars?: Record<string, string | number>) => {
      const s = DICTS[lang][key] ?? EN[key];
      return vars ? fmt(s, vars) : s;
    },
    [lang]
  );
}
