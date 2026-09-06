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
 * Servo Academy's interface dictionary. Same shape as the other courses:
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
  siLink: "🔩 Parts bench",
  searchTitle: "Search all lessons",
  /* home */
  heroTitlePre: "Learn robotics",
  heroTitleZap: "by closing the loop",
  heroLead:
    "A hands-on course that starts with a blinking signal and ends with a robot that learns from your demonstrations: every lesson pairs readable theory with an interactive lab you can tune, shove, crash and race — then a short quiz locks it in. Halfway through, you tune a line follower from lurching to lapping.",
  statLessons: "lessons",
  statUnits: "units",
  statBuilds: "robots to tune & teach",
  statSi: "parts on the bench",
  statCompleted: "completed",
  startLearning: "Start learning →",
  continueLearning: "Continue →",
  reviewDeck: "🃏 Review deck",
  reviewDue: "({n} due)",
  certificate: "🎓 Certificate",
  siTable: "🔩 Parts bench",
  unitWord: "UNIT",
  specIntro: "Parallel branches — take them in any order.",
  capstoneHead: "🎯 It ends with two robots that answer to you",
  capstoneBody:
    "The core course closes on the racing line: a line follower you tune through the whole P-then-D ladder until it laps clean and fast. The advanced course ends at the frontier — an arm you teach by demonstration, whose success rate you measure, diagnose and raise like an engineer. No robot kit required: every machine lives in the lab, and every dial is yours.",
  progressSaved: "Progress is saved in this browser.",
  resetProgress: "Reset progress",
  resetConfirm: "Really reset all progress?",
  doneBadge: "✓ done",
  /* tiers */
  tierCore: "Core Course",
  tierCoreTag: "The loop from the ground up — signals, motors, sensors and control, ending with a line follower tuned by hand.",
  tierAdvanced: "Advanced Course",
  tierAdvancedTag: "Arms that aim, robots that navigate, machines that learn — kinematics, mapping and teaching by demonstration.",
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
  checklistHead: "Tuning checklist — {done} / {total}",
  checklistDoneHead: "🎉 It obeys! You did real robotics.",
  checklistDoneBody:
    "From formula to a machine that does what you tell it, reliably — this build is complete. Keep the numbers: a tuned loop, measured against the world and found working exactly where the theory said it would.",
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
  syncBadFile: "That file isn't a Servo Academy progress backup.",
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
    "It unlocks when both tuning builds are done — the line follower raced clean and the arm taught to 80%, not just quizzes on a screen.",
  certSub: "Servo Academy · Certificate of Completion",
  certTitle: "Robotics, from the Loop Up",
  certNamePlaceholder: "Your name, as it should appear",
  certBody:
    "has completed the curriculum ({done} of {total} lessons, from PWM signals and motors through sensors, control and kinematics to navigation and robot learning) and proved it the only way that counts:",
  certBuild1: "🏁 the Line Follower (tuned through the P-then-D ladder to a clean fast lap)",
  certBuild2: "🦾 the Taught Arm (trained from demonstrations to a measured 80% success rate)",
  certEvery: "Both loops closed by hand, with gains and datasets checked against the machine.",
  certCompleted: "completed {date} · verify: the tuning numbers in the lab readouts",
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
  /* parts bench page */
  siChip: "PARTS BENCH",
  siTitle: "The Parts Bench",
  siLead:
    "Robotics runs on a small shelf of recurring parts: things that sense, things that move, the electronics that feed them, the brains that close the loop and the mechanics holding it together. Each entry carries a memory hook — because knowing instantly why a stepper skips silently is exactly the kind of fact that fades.",
  siGridView: "Reference",
  siListView: "List",
  siDrillView: "Drill",
  siSearch: "Search: part, role or hook…",
  siNoHit: "Nothing matches “{q}”.",
  partKindSensor: "sensors",
  partKindActuator: "actuators",
  partKindDriver: "drive & power",
  partKindBrain: "brains & wiring",
  partKindMechanism: "mechanisms",
  siColSymbol: "Part",
  siColMeaning: "What it does",
  drillSensors: "The senses",
  drillActuators: "Muscle & power",
  drillEverything: "Everything",
  drillPoolSize: "{n} in this set",
  drillWhichRole: "What does this part do?",
  drillWhichPart: "Which part {role}?",
  drillRight: "✓ Correct.",
  drillWrong: "✗ Not quite — it is {answer}.",
  drillNext: "Next card →",
  drillStart: "Start the drill →",
  drillStartBody:
    "Pick a set above, then start. Parts and their roles in both directions, four options a card — and the memory hook revealed with every answer.",
  drillFoot:
    "Anything you miss joins the review deck and comes back on the spaced-repetition schedule, like a missed quiz question.",
  colName: "Name",
  colEsel: "Memory hook",
  /* footer */
  footer:
    "Servo Academy — an interactive path from a blinking PWM signal to a robot that learns from your hands, with every loop closed along the way. Progress is saved locally in your browser.",
};

const DE: Record<keyof typeof EN, string> = {
  complete: "{done} / {total} abgeschlossen",
  lessonsWord: "Lektionen",
  siLink: "🔩 Teile-Werkbank",
  searchTitle: "Alle Lektionen durchsuchen",
  heroTitlePre: "Robotik lernen —",
  heroTitleZap: "indem du die Schleife schließt",
  heroLead:
    "Ein praxisnaher Kurs, der mit einem blinkenden Signal beginnt und mit einem Roboter endet, der aus deinen Vorführungen lernt: Jede Lektion verbindet lesbare Theorie mit einem interaktiven Labor zum Stimmen, Schubsen, Crashen und Rennenfahren — ein kurzes Quiz sichert das Gelernte. Auf halbem Weg stimmst du einen Linienfolger vom Torkeln bis zur sauberen Runde.",
  statLessons: "Lektionen",
  statUnits: "Einheiten",
  statBuilds: "Roboter zum Stimmen & Anlernen",
  statSi: "Teile auf der Werkbank",
  statCompleted: "abgeschlossen",
  startLearning: "Jetzt loslegen →",
  continueLearning: "Weiter →",
  reviewDeck: "🃏 Wiederholung",
  reviewDue: "({n} fällig)",
  certificate: "🎓 Zertifikat",
  siTable: "🔩 Teile-Werkbank",
  unitWord: "EINHEIT",
  specIntro: "Parallele Zweige — in beliebiger Reihenfolge.",
  capstoneHead: "🎯 Am Ende stehen zwei Roboter, die auf dich hören",
  capstoneBody:
    "Der Grundkurs endet auf der Ideallinie: ein Linienfolger, den du die ganze P-dann-D-Leiter hinauf stimmst, bis er sauber und schnell seine Runden zieht. Der Aufbaukurs endet an der Forschungsfront — ein Arm, den du per Vorführung anlernst und dessen Erfolgsquote du misst, diagnostizierst und steigerst wie ein Ingenieur. Kein Roboter-Bausatz nötig: Jede Maschine lebt im Labor, und jeder Regler gehört dir.",
  progressSaved: "Der Fortschritt wird in diesem Browser gespeichert.",
  resetProgress: "Fortschritt zurücksetzen",
  resetConfirm: "Wirklich den gesamten Fortschritt löschen?",
  doneBadge: "✓ fertig",
  tierCore: "Grundkurs",
  tierCoreTag: "Die Schleife von Grund auf — Signale, Motoren, Sensoren und Regelung, am Ende steht ein von Hand gestimmter Linienfolger.",
  tierAdvanced: "Aufbaukurs",
  tierAdvancedTag: "Arme, die zielen, Roboter, die navigieren, Maschinen, die lernen — Kinematik, Kartierung und Anlernen per Vorführung.",
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
  checklistHead: "Tuning-Checkliste — {done} / {total}",
  checklistDoneHead: "🎉 Er gehorcht! Du hast echte Robotik gemacht.",
  checklistDoneBody:
    "Von der Formel zu einer Maschine, die zuverlässig tut, was du sagst — dieses Projekt ist geschafft. Heb die Zahlen auf: eine gestimmte Regelschleife, an der Welt gemessen und genau dort funktionierend, wo die Theorie es versprach.",
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
  syncBadFile: "Diese Datei ist kein Servo-Academy-Fortschritts-Backup.",
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
    "Es wird freigeschaltet, wenn beide Tuning-Projekte geschafft sind — der Linienfolger sauber im Rennen und der Arm auf 80% angelernt, nicht nur Quiz auf dem Bildschirm.",
  certSub: "Servo Academy · Abschlusszertifikat",
  certTitle: "Robotik, von der Schleife aufwärts",
  certNamePlaceholder: "Dein Name, wie er erscheinen soll",
  certBody:
    "hat den Lehrplan abgeschlossen ({done} von {total} Lektionen, von PWM-Signalen und Motoren über Sensoren, Regelung und Kinematik bis zu Navigation und Robot Learning) und es auf die einzige Art bewiesen, die zählt:",
  certBuild1: "🏁 der Linienfolger (die P-dann-D-Leiter hinauf gestimmt bis zur sauberen schnellen Runde)",
  certBuild2: "🦾 der angelernte Arm (aus Vorführungen trainiert bis zur gemessenen 80%-Erfolgsquote)",
  certEvery: "Beide Schleifen von Hand geschlossen, mit Verstärkungen und Datensätzen an der Maschine geprüft.",
  certCompleted: "abgeschlossen am {date} · Nachweis: die Tuning-Zahlen in den Labor-Anzeigen",
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
  siChip: "TEILE-WERKBANK",
  siTitle: "Die Teile-Werkbank",
  siLead:
    "Robotik läuft auf einem kleinen Regal wiederkehrender Teile: Dinge, die spüren, Dinge, die bewegen, die Elektronik, die sie füttert, die Gehirne, die die Schleife schließen, und die Mechanik, die alles zusammenhält. Jeder Eintrag trägt eine Eselsbrücke — denn sofort zu wissen, warum ein Schrittmotor lautlos Schritte verliert, ist genau die Sorte Wissen, die verblasst.",
  siGridView: "Nachschlagen",
  siListView: "Liste",
  siDrillView: "Üben",
  siSearch: "Suche: Teil, Aufgabe oder Eselsbrücke…",
  siNoHit: "Nichts passt zu „{q}“.",
  partKindSensor: "Sensoren",
  partKindActuator: "Aktoren",
  partKindDriver: "Antrieb & Energie",
  partKindBrain: "Gehirne & Verdrahtung",
  partKindMechanism: "Mechanik",
  siColSymbol: "Teil",
  siColMeaning: "Was es tut",
  drillSensors: "Die Sinne",
  drillActuators: "Muskel & Energie",
  drillEverything: "Alles",
  drillPoolSize: "{n} in dieser Auswahl",
  drillWhichRole: "Was macht dieses Teil?",
  drillWhichPart: "Welches Teil {role}?",
  drillRight: "✓ Richtig.",
  drillWrong: "✗ Nicht ganz — es ist {answer}.",
  drillNext: "Nächste Karte →",
  drillStart: "Übung starten →",
  drillStartBody:
    "Wähle oben eine Auswahl und leg los. Teile und ihre Aufgaben in beide Richtungen, vier Optionen pro Karte — und zu jeder Antwort die Eselsbrücke dazu.",
  drillFoot:
    "Was du verfehlst, wandert in den Wiederholungsstapel und kommt nach Spaced-Repetition-Plan zurück — wie eine verfehlte Quizfrage.",
  colName: "Name",
  colEsel: "Eselsbrücke",
  footer:
    "Servo Academy — ein interaktiver Weg vom blinkenden PWM-Signal zu einem Roboter, der von deinen Händen lernt, mit jeder Schleife unterwegs geschlossen. Der Fortschritt wird lokal in deinem Browser gespeichert.",
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
