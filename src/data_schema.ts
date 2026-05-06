// ─── Primitives ───────────────────────────────────────────────────────────────

type GermanLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

interface ExampleSentence {
  german: string;
  english: string;
  tense?: "present" | "simplePast" | "perfect" | "future";
}

// ─── Primitives (Verb) ───────────────────────────────────────────────────────────────

type Auxiliary = "haben" | "sein";

type VerbType =
  | "regular/weak"
  | "irregular/strong"
  | "irregular/mixed"
  | "modal";

type VerbCategory =
  | "motion"
  | "state"
  | "communication"
  | "cognition"
  | "perception"
  | "action"
  | "possession"
  | "emotion";

// ─── Conjugation (Verb) ──────────────────────────────────────────────────────────────

/** Full present tense conjugation table */
interface PresentConjugation {
  ich: string;       // e.g. "fahre"
  du: string;        // e.g. "fährst"
  erSieEs: string;   // e.g. "fährt"
  wir: string;       // e.g. "fahren"
  ihr: string;       // e.g. "fahrt"
  sieSie: string;    // e.g. "fahren"
}

/** Tense stems / key forms */
interface VerbForms {
  infinitive: string;         // e.g. "fahren"
  present: PresentConjugation;
  simplePast: string;         // Präteritum, 3rd sg — e.g. "fuhr"
  pastParticiple: string;     // Partizip II — e.g. "gefahren"
  presentParticiple: string;  // Partizip I — e.g. "fahrend"
  konjunktivII: string;       // e.g. "führe"  (useful for B1+)
}

// ─── Prefix info (for separable / inseparable) (Verb) ────────────────────────────────

export type PrefixType = "separable" | "inseparable" | "dual" | "none";

export interface PrefixInfo {
  type: PrefixType;
  prefix?: string;        // e.g. "an", "be", "ver"
  baseVerb?: string;      // e.g. "rufen" (from "anrufen")
}

// ─── Union Types (Phrase) ────────────────────────────────────────────────────────────────

export type Register = "formal" | "informal" | "neutral" | "slang" | "spoken" | "written";
export type Category = "opinions" | "greetings" | "travel" | "work" | "emotions" | "idioms";

// ─── Base Card ────────────────────────────────────────────────────────────────

interface BaseCard {
  id: string;
  englishMeaning: string;          // primary gloss
  level: GermanLevel;
  examples: ExampleSentence[];     // at least one per card
  tags?: string[];
  notes?: string;
}

// ─── Phrases ───────────────────────────────────────────────────────────────────

/** Represents a German idiomatic expression or phrase entry. */
export interface PhraseCard extends BaseCard {
  id: string;
  german: string;
  englishMeaning: string;
  level: GermanLevel;
  examples: ExampleSentence[];

  /**  */
  literal: string;
  
  /** Social context of the phrase (e.g., formal, informal, slang) */
  register: Register[];
  
  /** Thematic grouping (e.g., opinions, greetings, travel) */
  category: Category[];
  
  /** Additional grammatical or contextual information */
  notes: string;
}

// ─── Verb ─────────────────────────────────────────────────────────────────────

export interface VerbCard extends BaseCard {
  id: string;
  infinitive: string;
  englishMeaning: string;          // primary gloss
  alternativeMeanings?: string[];  // e.g. ["to go", "to travel"]

  forms: VerbForms;
  auxiliary: Auxiliary;

  prefix: PrefixInfo;

  type: VerbType;
  category: VerbCategory;
  level: GermanLevel;

  reflexive: boolean;              // e.g. "sich vorstellen"
  reflexivePronounCase?: "accusative" | "dative";

  governs?: {                      // verb valency / case government
    case: "accusative" | "dative" | "genitive";
    preposition?: string;          // e.g. "auf" (warten auf + Acc)
  };

  examples: ExampleSentence[];     // at least one per verb

  tags?: string[];                 // free-form, e.g. ["daily routine", "travel"]
  notes?: string;                  // irregular quirks, regional usage, etc.
}


// ─── Collection ───────────────────────────────────────────────────────────────

export type VerbList = VerbCard[];

export type PhraseList = PhraseCard[];

