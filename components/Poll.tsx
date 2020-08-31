import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { reduce, sample, maxBy } from 'lodash';

import Answer from './Answer';
import { QandAsDocument, QandA, MaxVote} from '../types';
import { useEffect, useState } from 'react';

type Props = {
  qandas: QandAsDocument /* q and a's -- questions and answers document */;
};
// animates PollWrapper using opacity
const opacityTransition = keyframes`
  from {
    opacity: 0
    }
  to {
    opacity: 1
    }
`;
const PollWrapper = styled.div`
  width: 80%;
  padding: .2rem 1.5rem;
  margin 2rem 0;
  border: 1px solid #d1d1d1;
  border-radius: 7px;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.25);
  align-self: center;
  @media(min-width: 40rem) {
    width: 50%;
  };
  animation: ${opacityTransition} 2s linear;
`;
const TotalVotes = styled.p`
  color: #8e8888;
`;

export default function Poll({ qandas }: Props) {
  const [randomQ, setRandomQ] = useState<QandA | undefined>(undefined);
  const [voted, setVoted] = useState(false);
  const [total, setTotal] = useState(0);
  const [mostVoted, setMostVoted] = useState<
    MaxVote | undefined
  >(undefined);
  // updates the number of vote when user votes
  const onVote = () => {
    setVoted(true);
    setTotal(total + 1);
  };
  // selects random question, calculates total votes and sets maximum vote on when component mounts.
  useEffect(() => {
    const randomQ = sample(qandas.questions);
    if (randomQ) {
      const totalVotes = reduce(
        randomQ.answers,
        (sum, current) => sum + current.votes,
        0
      );
      const maxVote = maxBy(randomQ.answers, 'votes');
      setRandomQ(randomQ);
      setTotal(totalVotes);
      setMostVoted(maxVote);
    }
  }, []);
  if (!randomQ) return null;
  return (
    <PollWrapper>
      <h2>{randomQ.question.text}</h2>
      {randomQ.answers.map((answer, index) => (
        <Answer
          key={index}
          answer={answer}
          voted={voted}
          onVote={onVote}
          total={total}
          mostVoted={mostVoted && mostVoted.votes === answer.votes}
        />
      ))}
      <TotalVotes>{total} votes </TotalVotes>
    </PollWrapper>
  );
}
