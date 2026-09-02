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
 * Helix Academy's interface dictionary. Same shape as the other courses:
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
  codonsLink: "🧬 Genetic code",
  searchTitle: "Search all lessons",
  /* home */
  heroTitlePre: "Learn biology",
  heroTitleZap: "by looking closer",
  heroLead:
    "A hands-on course that starts inside a single cell and works up to whole ecosystems: every lesson pairs readable theory with an interactive lab you can poke, feed, mutate and starve — then a short quiz locks it in. It ends with DNA you pull out of a strawberry with washing-up liquid.",
  statLessons: "lessons",
  statUnits: "units",
  statBuilds: "kitchen experiments",
  statCodons: "codons mapped",
  statCompleted: "completed",
  startLearning: "Start learning →",
  continueLearning: "Continue →",
  reviewDeck: "🃏 Review deck",
  reviewDue: "({n} due)",
  certificate: "🎓 Certificate",
  codonTable: "🧬 Genetic code",
  unitWord: "UNIT",
  specIntro: "Parallel branches — take them in any order.",
  capstoneHead: "🎯 It ends in your kitchen, with real DNA",
  capstoneBody:
    "The core course closes by extracting DNA from a strawberry — washing-up liquid, salt and cold spirits, and white strands you can lift out on a stick. The advanced course ends with a balloon inflated by yeast, sized from the same stoichiometry Catalyst taught you. Both use only what a supermarket sells.",
  progressSaved: "Progress is saved in this browser.",
  resetProgress: "Reset progress",
  resetConfirm: "Really reset all progress?",
  doneBadge: "✓ done",
  /* tiers */
  tierCore: "Core Course",
  tierCoreTag: "From one cell to the code that runs it — membranes, energy, DNA, and the proteins it builds.",
  tierAdvanced: "Advanced Course",
  tierAdvancedTag: "Heredity, evolution and ecology — how the code gets passed on, edited by selection, and spread through a living world.",
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
  checklistDoneHead: "🎉 It worked! You did real biology.",
  checklistDoneBody:
    "From theory to genuine DNA on a stick — this capstone is complete. Keep the tube: what you lifted out is the same molecule this whole course has been about.",
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
  syncBadFile: "That file isn't a Helix Academy progress backup.",
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
    "It unlocks when both capstone experiments are done — DNA on a stick and a balloon inflated by living yeast, not just quizzes on a screen.",
  certSub: "Helix Academy · Certificate of Completion",
  certTitle: "Biology, from One Cell Up",
  certNamePlaceholder: "Your name, as it should appear",
  certBody:
    "has completed the curriculum ({done} of {total} lessons, from the membrane of a single cell through enzymes, the genetic code, heredity, evolution and ecology) and proved it the only way that counts:",
  certBuild1: "🍓 the Strawberry Extraction (real DNA, lifted out on a stick)",
  certBuild2: "🎈 the Yeast Balloon (respiration you can measure)",
  certEvery: "Both performed by hand, with organisms understood down to their codons.",
  certCompleted: "completed {date} · verify: the tube of DNA in the fridge",
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
  /* genetic code page */
  codonsChip: "GENETIC CODE",
  codonsTitle: "The Genetic Code",
  codonsLead:
    "Sixty-four triplets, twenty amino acids and one stop signal — the lookup table every cell on Earth shares. Click any codon for its amino acid and a memory hook for that stubbornly arbitrary one-letter code.",
  codonsGridView: "Code table",
  codonsListView: "Amino acids",
  codonsSearch: "Search: name, letter or hook…",
  codonNoHit: "Nothing matches “{q}”.",
  codonFirst: "1st",
  codonThird: "3rd",
  codonClass: "Class",
  codonWobble: "Third base",
  codonWobbleN: "same result for {n} of the 4 third bases",
  codonIsStart: "★ START codon",
  codonCode: "Code",
  codonCodons: "Codons",
  codonsDrillView: "Drill",
  drillTricky: "Tricky letters",
  drillCodes: "All 21 codes",
  drillCodons: "All 64 codons",
  drillPoolSize: "{n} in this set",
  drillWhichAmino: "Which amino acid is this?",
  drillWhichCode: "What is the one-letter code for {name}?",
  drillWhichCodon: "Which amino acid does this codon make?",
  drillRight: "✓ Correct.",
  drillWrong: "✗ Not quite — it is {answer}.",
  drillNext: "Next card →",
  drillStart: "Start the drill →",
  drillStartBody:
    "Pick a set above, then start. Letters and names in both directions — or all 64 codons — four options a card.",
  drillFoot:
    "Anything you miss joins the review deck and comes back on the spaced-repetition schedule, like a missed quiz question.",
  colName: "Name",
  colEsel: "Memory hook",
  aaNonpolar: "Nonpolar",
  aaPolar: "Polar",
  aaAcidic: "Acidic",
  aaBasic: "Basic",
  aaAromatic: "Aromatic",
  aaStop: "Stop",
  /* footer */
  footer:
    "Helix Academy — an interactive path from a single cell to real DNA on a stick in your kitchen. Progress is saved locally in your browser.",
};

const DE: Record<keyof typeof EN, string> = {
  complete: "{done} / {total} abgeschlossen",
  lessonsWord: "Lektionen",
  codonsLink: "🧬 Genetischer Code",
  searchTitle: "Alle Lektionen durchsuchen",
  heroTitlePre: "Biologie lernen —",
  heroTitleZap: "durch genaues Hinsehen",
  heroLead:
    "Ein praxisnaher Kurs, der in einer einzelnen Zelle beginnt und bis zu ganzen Ökosystemen führt: Jede Lektion verbindet lesbare Theorie mit einem interaktiven Labor zum Anstupsen, Füttern, Mutieren und Aushungern — ein kurzes Quiz sichert das Gelernte. Am Ende ziehst du DNA mit Spülmittel aus einer Erdbeere.",
  statLessons: "Lektionen",
  statUnits: "Einheiten",
  statBuilds: "Küchen-Experimente",
  statCodons: "Codons kartiert",
  statCompleted: "abgeschlossen",
  startLearning: "Jetzt loslegen →",
  continueLearning: "Weiter →",
  reviewDeck: "🃏 Wiederholung",
  reviewDue: "({n} fällig)",
  certificate: "🎓 Zertifikat",
  codonTable: "🧬 Genetischer Code",
  unitWord: "EINHEIT",
  specIntro: "Parallele Zweige — in beliebiger Reihenfolge.",
  capstoneHead: "🎯 Am Ende steht echte DNA in deiner Küche",
  capstoneBody:
    "Der Grundkurs endet damit, DNA aus einer Erdbeere zu extrahieren — Spülmittel, Salz und eiskalter Schnaps, und weiße Fäden, die du am Stäbchen herausheben kannst. Der Aufbaukurs endet mit einem Ballon, den Hefe aufbläst, dosiert nach derselben Stöchiometrie wie bei Catalyst. Beides mit Supermarkt-Zutaten.",
  progressSaved: "Der Fortschritt wird in diesem Browser gespeichert.",
  resetProgress: "Fortschritt zurücksetzen",
  resetConfirm: "Wirklich den gesamten Fortschritt löschen?",
  doneBadge: "✓ fertig",
  tierCore: "Grundkurs",
  tierCoreTag: "Von einer Zelle zum Code, der sie steuert — Membranen, Energie, DNA und die Proteine, die daraus entstehen.",
  tierAdvanced: "Aufbaukurs",
  tierAdvancedTag: "Vererbung, Evolution und Ökologie — wie der Code weitergegeben, von Selektion redigiert und über eine lebende Welt verteilt wird.",
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
  checklistDoneHead: "🎉 Es hat funktioniert! Du hast echte Biologie gemacht.",
  checklistDoneBody:
    "Von der Theorie zu echter DNA am Stäbchen — dieses Abschlussprojekt ist geschafft. Heb das Röhrchen auf: Was du herausgezogen hast, ist genau das Molekül, um das es im ganzen Kurs ging.",
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
  syncBadFile: "Diese Datei ist kein Helix-Academy-Fortschritts-Backup.",
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
    "Es wird freigeschaltet, wenn beide Abschluss-Experimente durchgeführt sind — DNA am Stäbchen und ein von lebender Hefe aufgeblasener Ballon, nicht nur Quiz auf dem Bildschirm.",
  certSub: "Helix Academy · Abschlusszertifikat",
  certTitle: "Biologie, von einer Zelle aufwärts",
  certNamePlaceholder: "Dein Name, wie er erscheinen soll",
  certBody:
    "hat den Lehrplan abgeschlossen ({done} von {total} Lektionen, von der Membran einer einzelnen Zelle über Enzyme, den genetischen Code, Vererbung und Evolution bis zur Ökologie) und es auf die einzige Art bewiesen, die zählt:",
  certBuild1: "🍓 die Erdbeer-Extraktion (echte DNA, am Stäbchen herausgehoben)",
  certBuild2: "🎈 der Hefe-Ballon (messbare Zellatmung)",
  certEvery: "Beides von Hand durchgeführt, mit Organismen, verstanden bis auf ihre Codons.",
  certCompleted: "abgeschlossen am {date} · Nachweis: das Röhrchen DNA im Kühlschrank",
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
  codonsChip: "GENETISCHER CODE",
  codonsTitle: "Der genetische Code",
  codonsLead:
    "Vierundsechzig Tripletts, zwanzig Aminosäuren und ein Stoppsignal — die Nachschlagetabelle, die jede Zelle der Erde teilt. Klicke ein Codon für seine Aminosäure und eine Eselsbrücke für den störrisch willkürlichen Ein-Buchstaben-Code.",
  codonsGridView: "Code-Tabelle",
  codonsListView: "Aminosäuren",
  codonsSearch: "Suche: Name, Buchstabe oder Eselsbrücke…",
  codonNoHit: "Nichts passt zu „{q}“.",
  codonFirst: "1.",
  codonThird: "3.",
  codonClass: "Klasse",
  codonWobble: "Dritte Base",
  codonWobbleN: "gleiches Ergebnis bei {n} von 4 dritten Basen",
  codonIsStart: "★ START-Codon",
  codonCode: "Code",
  codonCodons: "Codons",
  codonsDrillView: "Üben",
  drillTricky: "Knifflige Buchstaben",
  drillCodes: "Alle 21 Codes",
  drillCodons: "Alle 64 Codons",
  drillPoolSize: "{n} in dieser Auswahl",
  drillWhichAmino: "Welche Aminosäure ist das?",
  drillWhichCode: "Wie lautet der Ein-Buchstaben-Code für {name}?",
  drillWhichCodon: "Welche Aminosäure ergibt dieses Codon?",
  drillRight: "✓ Richtig.",
  drillWrong: "✗ Nicht ganz — es ist {answer}.",
  drillNext: "Nächste Karte →",
  drillStart: "Übung starten →",
  drillStartBody:
    "Wähle oben eine Auswahl und leg los. Buchstaben und Namen in beide Richtungen — oder alle 64 Codons — vier Optionen pro Karte.",
  drillFoot:
    "Was du verfehlst, wandert in den Wiederholungsstapel und kommt nach Spaced-Repetition-Plan zurück — wie eine verfehlte Quizfrage.",
  colName: "Name",
  colEsel: "Eselsbrücke",
  aaNonpolar: "Unpolar",
  aaPolar: "Polar",
  aaAcidic: "Sauer",
  aaBasic: "Basisch",
  aaAromatic: "Aromatisch",
  aaStop: "Stopp",
  footer:
    "Helix Academy — ein interaktiver Weg von einer einzelnen Zelle bis zu echter DNA am Stäbchen in deiner Küche. Der Fortschritt wird lokal in deinem Browser gespeichert.",
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
