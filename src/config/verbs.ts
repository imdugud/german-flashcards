export type AuxiliaryVerb = 'haben' | 'sein';

export interface VerbCard {
  id: string;
  infinitive: string;           // e.g., "gehen"
  englishMeaning: string;       // e.g., "to go"
  presentThirdPerson: string;   // e.g., "geht" (er/sie/es)
  pastParticiple: string;       // e.g., "gegangen" (Partizip II)
  auxiliary: AuxiliaryVerb;     // e.g., "sein"
  exampleGerman: string;        // e.g., "Ich bin ins Kino gegangen."
  exampleEnglish: string;       // e.g., "I went to the cinema."
  isIrregular: boolean;
  level: 'A1' | 'A2' | 'B1';    // Progression tracking
}