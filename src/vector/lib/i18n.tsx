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
 * Vector Academy's interface dictionary. Same shape as the other courses:
 * `useLang()` for the language (shared across the whole site under one key),
 * `useT()` for lookups. Lesson bodies are localized separately in
 * curriculum/de/*. Placeholders use {name} and are filled by fmt().
 */

export type Lang = "en" | "de";

const LANG_KEY = "science-lang";

const EN = {
  /* topbar */
  complete: "{done} / {total} complete",
  lessonsWord: "lessons",
  siLink: "📏 Units & constants",
  searchTitle: "Search all lessons",
  /* home */
  heroTitlePre: "Learn physics",
  heroTitleZap: "by watching things fall",
  heroLead:
    "A hands-on course that starts with a rolling cart and ends at the edge of the quantum world: every lesson pairs readable theory with an interactive lab you can launch, tilt, collide and tune — then a short quiz locks it in. Halfway through, you measure the Earth's gravity with a shoelace and a phone.",
  statLessons: "lessons",
  statUnits: "units",
  statBuilds: "backyard experiments",
  statSi: "units & constants mapped",
  statCompleted: "completed",
  startLearning: "Start learning →",
  continueLearning: "Continue →",
  reviewDeck: "🃏 Review deck",
  reviewDue: "({n} due)",
  certificate: "🎓 Certificate",
  siTable: "📏 Units & constants",
  unitWord: "UNIT",
  specIntro: "Parallel branches — take them in any order.",
  capstoneHead: "🎯 It ends in your backyard, with a number Galileo wanted",
  capstoneBody:
    "The core course closes by measuring g with a string, a weight and a stopwatch — to within a percent or two of 9.81. The advanced course adds a second build: the speed of sound, timed by clapping in rhythm with your own echo off a wall. Both need nothing a household doesn't own.",
  progressSaved: "Progress is saved in this browser.",
  resetProgress: "Reset progress",
  resetConfirm: "Really reset all progress?",
  doneBadge: "✓ done",
  /* tiers */
  tierCore: "Core Course",
  tierCoreTag: "Mechanics from the ground up — motion, forces, energy and momentum, ending with g measured by hand.",
  tierAdvanced: "Advanced Course",
  tierAdvancedTag: "Waves, sound, light and heat — and the first cracks in the classical picture, where energy turns grainy and chance keeps perfect time.",
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
    "No multiple choice here: compute the value and type it. Suffixes like 2.5k or 20m are understood; answers within ±{tol}% count.",
  probPlaceholder: "answer in {unit} (SI suffixes ok: 2.5k, 20m…)",
  probPlaceholderNoUnit: "answer (SI suffixes ok: 2.5k, 20m…)",
  probCheck: "Check",
  probHint: "Hint",
  probHideHint: "Hide hint",
  probWrong: "✗ Not quite — check your working and try again.",
  probReveal: "✗ Not quite — the answer is {answer}. {explain}",
  /* checklist */
  checklistHead: "Experiment checklist — {done} / {total}",
  checklistDoneHead: "🎉 It worked! You did real physics.",
  checklistDoneBody:
    "From formula to a measured number with your own hands — this build is complete. Keep the working: a constant of nature, checked against the world and found where the theory said it would be.",
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
  syncBadFile: "That file isn't a Vector Academy progress backup.",
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
    "It unlocks when both measurement builds are done — g from a swinging string and the speed of sound from an echo, not just quizzes on a screen.",
  certSub: "Vector Academy · Certificate of Completion",
  certTitle: "Physics, from Falling Things Up",
  certNamePlaceholder: "Your name, as it should appear",
  certBody:
    "has completed the curriculum ({done} of {total} lessons, from motion and forces through energy, waves, light and heat to the first quantum cracks) and proved it the only way that counts:",
  certBuild1: "🪀 the Pendulum (g = 9.8 m/s², measured with string and stopwatch)",
  certBuild2: "👏 the Echo (the speed of sound, clapped against a wall)",
  certEvery: "Both measured by hand, with constants of nature checked against the world.",
  certCompleted: "completed {date} · verify: the arithmetic on the back of the envelope",
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
  /* units & constants page */
  siChip: "UNITS & CONSTANTS",
  siTitle: "Units, Prefixes & Constants",
  siLead:
    "Physics runs on a small vocabulary: seven base units, a shelf of units named after people, the prefix ladder from pico to tera, and a few constants of nature. Each entry carries a memory hook — because knowing instantly that big G and small g are different things is exactly the kind of fact that fades.",
  siGridView: "Reference",
  siListView: "List",
  siDrillView: "Drill",
  siSearch: "Search: symbol, name or hook…",
  siNoHit: "Nothing matches “{q}”.",
  siKindBase: "base unit",
  siKindDerived: "derived unit",
  siKindPrefix: "prefix",
  siKindConstant: "constant",
  siColSymbol: "Symbol",
  siColMeaning: "Measures / equals",
  drillPrefixes: "The prefix ladder",
  drillUnits: "All units",
  drillEverything: "Everything",
  drillPoolSize: "{n} in this set",
  drillWhichName: "What is this?",
  drillWhichSymbol: "What is the symbol for {name}?",
  drillRight: "✓ Correct.",
  drillWrong: "✗ Not quite — it is {answer}.",
  drillNext: "Next card →",
  drillStart: "Start the drill →",
  drillStartBody:
    "Pick a set above, then start. Symbols and names in both directions, four options a card — and the meaning revealed with every answer.",
  drillFoot:
    "Anything you miss joins the review deck and comes back on the spaced-repetition schedule, like a missed quiz question.",
  colName: "Name",
  colEsel: "Memory hook",
  /* footer */
  footer:
    "Vector Academy — an interactive path from a rolling cart to the edge of the quantum world, with g measured by your own hand along the way. Progress is saved locally in your browser.",
};

const DE: Record<keyof typeof EN, string> = {
  complete: "{done} / {total} abgeschlossen",
  lessonsWord: "Lektionen",
  siLink: "📏 Einheiten & Konstanten",
  searchTitle: "Alle Lektionen durchsuchen",
  heroTitlePre: "Physik lernen —",
  heroTitleZap: "indem du Dinge fallen lässt",
  heroLead:
    "Ein praxisnaher Kurs, der mit einem rollenden Wagen beginnt und am Rand der Quantenwelt endet: Jede Lektion verbindet lesbare Theorie mit einem interaktiven Labor zum Abschießen, Kippen, Kollidieren und Stimmen — ein kurzes Quiz sichert das Gelernte. Auf halbem Weg misst du die Schwerkraft der Erde mit Schnürsenkel und Handy.",
  statLessons: "Lektionen",
  statUnits: "Einheiten",
  statBuilds: "Hinterhof-Experimente",
  statSi: "Einheiten & Konstanten kartiert",
  statCompleted: "abgeschlossen",
  startLearning: "Jetzt loslegen →",
  continueLearning: "Weiter →",
  reviewDeck: "🃏 Wiederholung",
  reviewDue: "({n} fällig)",
  certificate: "🎓 Zertifikat",
  siTable: "📏 Einheiten & Konstanten",
  unitWord: "EINHEIT",
  specIntro: "Parallele Zweige — in beliebiger Reihenfolge.",
  capstoneHead: "🎯 Am Ende steht eine Zahl, die Galilei wollte",
  capstoneBody:
    "Der Grundkurs endet damit, g mit Schnur, Gewicht und Stoppuhr zu messen — auf ein, zwei Prozent an 9,81 heran. Der Aufbaukurs legt ein zweites Experiment nach: die Schallgeschwindigkeit, getaktet durch Klatschen im Rhythmus des eigenen Echos an einer Wand. Beides braucht nichts, was ein Haushalt nicht besitzt.",
  progressSaved: "Der Fortschritt wird in diesem Browser gespeichert.",
  resetProgress: "Fortschritt zurücksetzen",
  resetConfirm: "Wirklich den gesamten Fortschritt löschen?",
  doneBadge: "✓ fertig",
  tierCore: "Grundkurs",
  tierCoreTag: "Mechanik von Grund auf — Bewegung, Kräfte, Energie und Impuls, am Ende steht g, von Hand gemessen.",
  tierAdvanced: "Aufbaukurs",
  tierAdvancedTag: "Wellen, Schall, Licht und Wärme — und die ersten Risse im klassischen Bild, wo Energie körnig wird und der Zufall präzise Zeit hält.",
  badgeAdvanced: "AUFBAU",
  badgeExpert: "EXPERTE",
  badgeMaster: "MEISTER",
  badgeSpecialization: "SPEZIALISIERUNG",
  allLessons: "← Alle Lektionen",
  lessonWord: "LEKTION",
  lessonPosition: "Lektion {i} von {n} in dieser Einheit",
  buildsOn: "Baut auf:",
  seeAlso: "Dieselbe Idee, anderer Kurs:",
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
    "Kein Multiple-Choice: Berechne den Wert und tippe ihn ein. Suffixe wie 2.5k oder 20m werden verstanden; Antworten innerhalb von ±{tol}% zählen.",
  probPlaceholder: "Antwort in {unit} (SI-Suffixe ok: 2.5k, 20m…)",
  probPlaceholderNoUnit: "Antwort (SI-Suffixe ok: 2.5k, 20m…)",
  probCheck: "Prüfen",
  probHint: "Tipp",
  probHideHint: "Tipp ausblenden",
  probWrong: "✗ Nicht ganz — prüfe deinen Rechenweg und versuch es nochmal.",
  probReveal: "✗ Nicht ganz — die Antwort ist {answer}. {explain}",
  checklistHead: "Experiment-Checkliste — {done} / {total}",
  checklistDoneHead: "🎉 Es hat funktioniert! Du hast echte Physik gemacht.",
  checklistDoneBody:
    "Von der Formel zu einer Zahl, die du mit eigenen Händen gemessen hast — dieses Experiment ist geschafft. Heb die Rechnung auf: eine Naturkonstante, gegen die Welt geprüft und genau dort gefunden, wo die Theorie sie versprach.",
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
  syncBadFile: "Diese Datei ist kein Vector-Academy-Fortschritts-Backup.",
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
    "Es wird freigeschaltet, wenn beide Mess-Experimente durchgeführt sind — g am schwingenden Pendel und die Schallgeschwindigkeit per Echo, nicht nur Quiz auf dem Bildschirm.",
  certSub: "Vector Academy · Abschlusszertifikat",
  certTitle: "Physik, von fallenden Dingen aufwärts",
  certNamePlaceholder: "Dein Name, wie er erscheinen soll",
  certBody:
    "hat den Lehrplan abgeschlossen ({done} von {total} Lektionen, von Bewegung und Kräften über Energie, Wellen, Licht und Wärme bis zu den ersten Quantenrissen) und es auf die einzige Art bewiesen, die zählt:",
  certBuild1: "🪀 das Pendel (g = 9,8 m/s², gemessen mit Schnur und Stoppuhr)",
  certBuild2: "👏 das Echo (die Schallgeschwindigkeit, an eine Wand geklatscht)",
  certEvery: "Beides von Hand gemessen, mit Naturkonstanten, gegen die Welt geprüft.",
  certCompleted: "abgeschlossen am {date} · Nachweis: die Rechnung auf der Rückseite des Umschlags",
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
  siChip: "EINHEITEN & KONSTANTEN",
  siTitle: "Einheiten, Präfixe & Konstanten",
  siLead:
    "Physik läuft auf einem kleinen Vokabular: sieben Basiseinheiten, ein Regal nach Menschen benannter Einheiten, die Präfixleiter von Piko bis Tera und ein paar Naturkonstanten. Jeder Eintrag trägt eine Eselsbrücke — denn sofort zu wissen, dass großes G und kleines g verschiedene Dinge sind, ist genau die Sorte Wissen, die verblasst.",
  siGridView: "Nachschlagen",
  siListView: "Liste",
  siDrillView: "Üben",
  siSearch: "Suche: Symbol, Name oder Eselsbrücke…",
  siNoHit: "Nichts passt zu „{q}“.",
  siKindBase: "Basiseinheit",
  siKindDerived: "abgeleitete Einheit",
  siKindPrefix: "Präfix",
  siKindConstant: "Konstante",
  siColSymbol: "Symbol",
  siColMeaning: "Misst / beträgt",
  drillPrefixes: "Die Präfixleiter",
  drillUnits: "Alle Einheiten",
  drillEverything: "Alles",
  drillPoolSize: "{n} in dieser Auswahl",
  drillWhichName: "Was ist das?",
  drillWhichSymbol: "Wie lautet das Symbol für {name}?",
  drillRight: "✓ Richtig.",
  drillWrong: "✗ Nicht ganz — es ist {answer}.",
  drillNext: "Nächste Karte →",
  drillStart: "Übung starten →",
  drillStartBody:
    "Wähle oben eine Auswahl und leg los. Symbole und Namen in beide Richtungen, vier Optionen pro Karte — und zu jeder Antwort die Bedeutung dazu.",
  drillFoot:
    "Was du verfehlst, wandert in den Wiederholungsstapel und kommt nach Spaced-Repetition-Plan zurück — wie eine verfehlte Quizfrage.",
  colName: "Name",
  colEsel: "Eselsbrücke",
  footer:
    "Vector Academy — ein interaktiver Weg vom rollenden Wagen bis an den Rand der Quantenwelt, mit einem eigenhändig gemessenen g auf halber Strecke. Der Fortschritt wird lokal in deinem Browser gespeichert.",
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
