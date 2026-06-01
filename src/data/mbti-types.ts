export interface MBTITypeDescription {
  title: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careerSuggestions: string[];
  developmentAreas: string[];
  cognitiveFunctions: {
    dominant: string;
    auxiliary: string;
    tertiary: string;
    inferior: string;
  };
  relationships: {
    strengths: string[];
    challenges: string[];
  };
  workStyle: {
    strengths: string[];
    challenges: string[];
  };
}
