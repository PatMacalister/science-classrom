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
 * Lightweight i18n.
 * - `useLang()` returns the current language + setter (persisted in localStorage).
 * - `useT()` returns a lookup into the UI-string dictionary below.
 * - Lesson CONTENT is localized separately via curriculum/localize.tsx, which
 *   merges per-lesson German overrides; anything untranslated falls back to
 *   English (with a notice banner on lesson pages).
 * Placeholders in strings use {name} and are filled by fmt().
 */

export type Lang = "en" | "de";

const LANG_KEY = "science-lang";

const EN = {
  /* topbar */
  complete: "{done} / {total} complete",
  lessonsWord: "lessons",
  /* home */
  heroTitlePre: "Learn electrical engineering",
  heroTitleZap: "by building",
  heroLead:
    "A hands-on course that starts with the physics of a single electron and never stops building: four course tiers, four specialization branches, and a growing shelf of real builds. Every lesson pairs theory with an interactive lab you can poke, drag and break — then a short quiz locks it in.",
  statLessons: "lessons",
  statUnits: "units",
  statBuilds: "real builds",
  statCompleted: "completed",
  startLearning: "Start learning →",
  continueLearning: "Continue →",
  reviewDeck: "🃏 Review deck",
  reviewDue: "({n} due)",
  certificate: "🎓 Certificate",
  unitWord: "UNIT",
  specIntro: "Parallel branches — each stands alone on the full course. Take them in any order, or take them all.",
  capstoneHead: "🎯 It keeps ending in hardware",
  capstoneBody:
    "Each tier closes with a real build: the 555 blinker (core), the PWM dimmer (advanced), the programmable night-light (expert) and your own oscilloscope (master) — then the specializations add an SDR listening station, a line-following robot and a PCB you design yourself. By the time you reach each one, you understand every component in it.",
  progressSaved: "Progress is saved in this browser.",
  resetProgress: "Reset progress",
  resetConfirm: "Really reset all progress?",
  doneBadge: "✓ done",
  /* tiers */
  tierCore: "Core Course",
  tierCoreTag: "From the physics of charge to a blinking circuit you built — the foundation everything else stands on.",
  tierAdvanced: "Advanced Course",
  tierAdvancedTag: "AC and signals, op-amps and feedback, digital logic — capped by a PWM dimmer with a real knob.",
  tierExpert: "Expert Course",
  tierExpertTag: "Resonance and radio, power conversion, microcontrollers — and your first firmware ships.",
  tierMaster: "Master Course",
  tierMasterTag: "Sampling, control theory, the art of real circuits — ending with an oscilloscope of your own making.",
  tierSpec: "Specializations",
  tierSpecTag: "The ladder ends after the master course. From here, parallel paths — take any, in any order: build a CPU, tune the radio spectrum, put your circuits on wheels, or fab your own PCB.",
  badgeAdvanced: "ADVANCED",
  badgeExpert: "EXPERT",
  badgeMaster: "MASTER",
  badgeSpecialization: "SPECIALIZATION",
  /* lesson page */
  allLessons: "← All lessons",
  lessonWord: "LESSON",
  lessonPosition: "lesson {i} of {n} in this unit",
  buildsOn: "Builds on:",
  seeAlso: "Same idea, other course:",
  searchTitle: "Search all lessons",
  labWord: "Lab",
  previous: "← Previous",
  next: "Next →",
  courseComplete: "Course complete",
  branchComplete: "Branch complete",
  backToOverview: "Back to overview",
  chooseNextSpec: "Choose your next specialization",
  notTranslated:
    "🇩🇪 This lesson's full text hasn't been translated yet — the theory below is in English. Titles, quizzes and the interface are already localized; more lessons follow.",
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
    "No multiple choice here: compute the value and type it. Suffixes like 4.7k, 20m or 100n are understood; answers within ±{tol}% count.",
  probPlaceholder: "answer in {unit} (SI suffixes ok: 4.7k, 20m…)",
  probPlaceholderNoUnit: "answer (SI suffixes ok: 4.7k, 20m…)",
  probCheck: "Check",
  probHint: "Hint",
  probHideHint: "Hide hint",
  probWrong: "✗ Not quite — check your powers of ten and try again.",
  probReveal: "✗ Not quite — the answer is {answer}. {explain}",
  /* checklist */
  checklistHead: "Build checklist — {done} / {total}",
  checklistDoneHead: "🎉 It works! You built the real thing.",
  checklistDoneBody:
    "From theory to a working build on your desk — this capstone is complete. Try the experiments in the lesson, and keep the hardware: it is the start of your lab.",
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
  syncBadFile: "That file isn't a Spark Academy progress backup.",
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
  certAwaitsBody: "It unlocks when all four tier capstones are built — hardware on the desk, not just quizzes on the screen.",
  certSub: "Spark Academy · Certificate of Completion",
  certTitle: "Electronics, from the Electron Up",
  certNamePlaceholder: "Your name, as it should appear",
  certBody:
    "has completed the four-tier curriculum ({done} of {total} lessons, from the physics of electric charge through circuits, signals, semiconductors, control and computation) and proved it the only way that counts:",
  certBuild1: "🔴 the 555 Blinker",
  certBuild2: "🎛 the PWM Dimmer",
  certBuild3: "🌙 the Night-Light (firmware)",
  certBuild4: "📈 an Oscilloscope of their own",
  certEvery: "Every one built by hand, from components understood down to the drifting electron.",
  certCompleted: "completed {date} · verify: the breadboard on the desk",
  certPrint: "🖨 Print / save as PDF",
  certChangeName: "Change name",
  certTypeName: "Type your name above, then print.",
  /* exam & stats */
  examChip: "FINAL EXAM",
  examTitle: "Final Exam",
  examLink: "📝 Final exam",
  examLead:
    "{n} questions drawn from the whole course, one at a time, no feedback until the end. {pct}% passes. Whatever you miss lands in the review deck.",
  examBestLine: "Best so far: {score} / {total} · attempts: {n}",
  examStart: "Start the exam →",
  examQuestionOf: "Question {i} of {n}",
  examNextQ: "Lock it in →",
  examFinishBtn: "Finish the exam",
  examPassed: "Passed — {score} / {total} ({pct}%)",
  examFailed: "Not passed — {score} / {total} ({pct}%). The bar is {pct2}%.",
  examPerfect: "A perfect run — nothing left to review.",
  examMissedHead: "What you missed",
  examMissedNote: "These {n} questions just joined the review deck.",
  examYour: "Your answer: {a}",
  examCorrect: "Correct: {a}",
  examRetake: "Take it again →",
  examToReview: "To the review deck →",
  statsChip: "STATS",
  statsLink: "📊 Stats",
  statsTitle: "Your Progress",
  statsLead:
    "The whole course at a glance — lessons, quiz results, the review deck's health and your exam record.",
  statsOverall: "{done} of {total} lessons complete",
  statsByUnit: "By unit",
  statsQuizAvg: "Ø quiz {pct}%",
  statsDeckHead: "Review deck",
  statsDeckEmpty: "Nothing in the deck — miss a question anywhere and it lands here.",
  statsDeckActive: "in rotation",
  statsDeckDue: "due right now",
  statsDeckDone: "graduated",
  statsDeckDrill: "drill cards among them",
  statsExamHead: "Final exam",
  statsExamNone: "Not attempted yet.",
  statsExamBest: "Best: {score} / {total} ({pct}%)",
  statsExamAttempts: "attempts: {n}",
  statsExamPassedBadge: "PASSED",
  /* footer */
  footer:
    "Spark Academy — an interactive path from basic physics to a circuit blinking on your desk. Progress is saved locally in your browser.",
};

const DE: Record<keyof typeof EN, string> = {
  complete: "{done} / {total} abgeschlossen",
  lessonsWord: "Lektionen",
  heroTitlePre: "Elektrotechnik lernen —",
  heroTitleZap: "durch Bauen",
  heroLead:
    "Ein praxisnaher Kurs, der bei der Physik eines einzelnen Elektrons beginnt und nie aufhört zu bauen: vier Kursstufen, vier Spezialisierungen und ein wachsendes Regal echter Projekte. Jede Lektion verbindet Theorie mit einem interaktiven Labor zum Anfassen, Ziehen und Kaputtmachen — ein kurzes Quiz sichert das Gelernte.",
  statLessons: "Lektionen",
  statUnits: "Einheiten",
  statBuilds: "echte Builds",
  statCompleted: "abgeschlossen",
  startLearning: "Jetzt loslegen →",
  continueLearning: "Weiter →",
  reviewDeck: "🃏 Wiederholung",
  reviewDue: "({n} fällig)",
  certificate: "🎓 Zertifikat",
  unitWord: "EINHEIT",
  specIntro: "Parallele Zweige — jeder steht für sich auf dem Gesamtkurs. Nimm sie in beliebiger Reihenfolge, oder alle.",
  capstoneHead: "🎯 Am Ende steht immer Hardware",
  capstoneBody:
    "Jede Stufe endet mit einem echten Build: dem 555-Blinker (Grundkurs), dem PWM-Dimmer (Aufbau), dem programmierbaren Nachtlicht (Experte) und deinem eigenen Oszilloskop (Meister) — die Spezialisierungen ergänzen eine SDR-Empfangsstation, einen Linienfolger-Roboter und eine selbst entworfene Platine. Wenn du dort ankommst, verstehst du jedes Bauteil darin.",
  progressSaved: "Der Fortschritt wird in diesem Browser gespeichert.",
  resetProgress: "Fortschritt zurücksetzen",
  resetConfirm: "Wirklich den gesamten Fortschritt löschen?",
  doneBadge: "✓ fertig",
  tierCore: "Grundkurs",
  tierCoreTag: "Von der Physik der Ladung bis zur selbstgebauten blinkenden Schaltung — das Fundament für alles Weitere.",
  tierAdvanced: "Aufbaukurs",
  tierAdvancedTag: "Wechselstrom und Signale, Operationsverstärker und Rückkopplung, Digitallogik — gekrönt von einem PWM-Dimmer mit echtem Drehknopf.",
  tierExpert: "Expertenkurs",
  tierExpertTag: "Resonanz und Radio, Leistungswandlung, Mikrocontroller — und deine erste Firmware geht in Betrieb.",
  tierMaster: "Meisterkurs",
  tierMasterTag: "Abtastung, Regelungstechnik, die Kunst echter Schaltungen — am Ende steht ein selbstgebautes Oszilloskop.",
  tierSpec: "Spezialisierungen",
  tierSpecTag: "Nach dem Meisterkurs endet die Leiter. Ab hier: parallele Wege in beliebiger Reihenfolge — baue eine CPU, höre das Funkspektrum ab, setze deine Schaltungen auf Räder oder fertige deine eigene Platine.",
  badgeAdvanced: "AUFBAU",
  badgeExpert: "EXPERTE",
  badgeMaster: "MEISTER",
  badgeSpecialization: "SPEZIALISIERUNG",
  allLessons: "← Alle Lektionen",
  lessonWord: "LEKTION",
  lessonPosition: "Lektion {i} von {n} in dieser Einheit",
  buildsOn: "Baut auf:",
  seeAlso: "Dieselbe Idee, anderer Kurs:",
  searchTitle: "Alle Lektionen durchsuchen",
  labWord: "Labor",
  previous: "← Zurück",
  next: "Weiter →",
  courseComplete: "Kurs abgeschlossen",
  branchComplete: "Zweig abgeschlossen",
  backToOverview: "Zurück zur Übersicht",
  chooseNextSpec: "Wähle deine nächste Spezialisierung",
  notTranslated:
    "🇩🇪 Der volle Text dieser Lektion ist noch nicht übersetzt — die Theorie unten ist auf Englisch. Titel, Quiz und Oberfläche sind bereits lokalisiert; weitere Lektionen folgen.",
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
    "Kein Multiple-Choice: Berechne den Wert und tippe ihn ein. Suffixe wie 4.7k, 20m oder 100n werden verstanden; Antworten innerhalb von ±{tol}% zählen.",
  probPlaceholder: "Antwort in {unit} (SI-Suffixe ok: 4.7k, 20m…)",
  probPlaceholderNoUnit: "Antwort (SI-Suffixe ok: 4.7k, 20m…)",
  probCheck: "Prüfen",
  probHint: "Tipp",
  probHideHint: "Tipp ausblenden",
  probWrong: "✗ Nicht ganz — prüfe deine Zehnerpotenzen und versuch es nochmal.",
  probReveal: "✗ Nicht ganz — die Antwort ist {answer}. {explain}",
  checklistHead: "Bau-Checkliste — {done} / {total}",
  checklistDoneHead: "🎉 Es funktioniert! Du hast das echte Ding gebaut.",
  checklistDoneBody:
    "Von der Theorie zum funktionierenden Aufbau auf deinem Schreibtisch — dieses Abschlussprojekt ist geschafft. Probiere die Experimente in der Lektion und behalte die Hardware: Sie ist der Anfang deines Labors.",
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
  syncBadFile: "Diese Datei ist kein Spark-Academy-Fortschritts-Backup.",
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
    "Es wird freigeschaltet, wenn alle vier Abschlussprojekte gebaut sind — Hardware auf dem Tisch, nicht nur Quiz auf dem Bildschirm.",
  certSub: "Spark Academy · Abschlusszertifikat",
  certTitle: "Elektronik, vom Elektron aufwärts",
  certNamePlaceholder: "Dein Name, wie er erscheinen soll",
  certBody:
    "hat den vierstufigen Lehrplan abgeschlossen ({done} von {total} Lektionen, von der Physik der elektrischen Ladung über Schaltungen, Signale und Halbleiter bis zu Regelung und Computern) und es auf die einzige Art bewiesen, die zählt:",
  certBuild1: "🔴 der 555-Blinker",
  certBuild2: "🎛 der PWM-Dimmer",
  certBuild3: "🌙 das Nachtlicht (Firmware)",
  certBuild4: "📈 ein eigenes Oszilloskop",
  certEvery: "Jedes davon von Hand gebaut, aus Bauteilen, verstanden bis hinunter zum driftenden Elektron.",
  certCompleted: "abgeschlossen am {date} · Nachweis: das Breadboard auf dem Tisch",
  certPrint: "🖨 Drucken / als PDF speichern",
  certChangeName: "Namen ändern",
  certTypeName: "Gib oben deinen Namen ein, dann drucken.",
  examChip: "ABSCHLUSSPRÜFUNG",
  examTitle: "Abschlussprüfung",
  examLink: "📝 Abschlussprüfung",
  examLead:
    "{n} Fragen aus dem ganzen Kurs, eine nach der anderen, ohne Rückmeldung bis zum Schluss. {pct}% bestehen. Was du verfehlst, landet im Wiederholungsstapel.",
  examBestLine: "Bisher am besten: {score} / {total} · Versuche: {n}",
  examStart: "Prüfung starten →",
  examQuestionOf: "Frage {i} von {n}",
  examNextQ: "Festlegen →",
  examFinishBtn: "Prüfung abschließen",
  examPassed: "Bestanden — {score} / {total} ({pct}%)",
  examFailed: "Nicht bestanden — {score} / {total} ({pct}%). Die Hürde liegt bei {pct2}%.",
  examPerfect: "Ein fehlerfreier Durchgang — nichts zu wiederholen.",
  examMissedHead: "Was du verfehlt hast",
  examMissedNote: "Diese {n} Fragen sind soeben in den Wiederholungsstapel gewandert.",
  examYour: "Deine Antwort: {a}",
  examCorrect: "Richtig: {a}",
  examRetake: "Noch einmal antreten →",
  examToReview: "Zum Wiederholungsstapel →",
  statsChip: "STATISTIK",
  statsLink: "📊 Statistik",
  statsTitle: "Dein Fortschritt",
  statsLead:
    "Der ganze Kurs auf einen Blick — Lektionen, Quizergebnisse, der Zustand des Wiederholungsstapels und deine Prüfungsbilanz.",
  statsOverall: "{done} von {total} Lektionen abgeschlossen",
  statsByUnit: "Nach Einheit",
  statsQuizAvg: "Ø Quiz {pct}%",
  statsDeckHead: "Wiederholungsstapel",
  statsDeckEmpty: "Nichts im Stapel — verfehle irgendwo eine Frage, und sie landet hier.",
  statsDeckActive: "in Rotation",
  statsDeckDue: "jetzt fällig",
  statsDeckDone: "gemeistert",
  statsDeckDrill: "davon Übungskarten",
  statsExamHead: "Abschlussprüfung",
  statsExamNone: "Noch nicht versucht.",
  statsExamBest: "Bestleistung: {score} / {total} ({pct}%)",
  statsExamAttempts: "Versuche: {n}",
  statsExamPassedBadge: "BESTANDEN",
  footer:
    "Spark Academy — ein interaktiver Weg von der Grundlagenphysik bis zur blinkenden Schaltung auf deinem Schreibtisch. Der Fortschritt wird lokal in deinem Browser gespeichert.",
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
