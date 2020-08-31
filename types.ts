export type Question = {
  text: string;
};
export type Answer = {
  text: string;
  votes: number;
};
export type QandA = {
  question: Question;
  answers: Answer[];
};
export type QandAsDocument = {
  questions: QandA[];
};
export type AnswerDocumentProps = {
  answer: Answer;
  voted: boolean | undefined;
  onVote: () => void;
  total: number;
  mostVoted: boolean | undefined;
};

export type AnswerContainerProps = {
  mostVoted: boolean | undefined;
};
export type AnswerOverlayProps = {
  percentage: string;
  mostVoted: boolean | undefined;
};
export type MaxVote = {
  text: string;
  votes: number;
}