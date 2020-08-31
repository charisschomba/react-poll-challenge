import React, { Fragment, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import {
  AnswerDocumentProps,
  AnswerContainerProps,
  AnswerOverlayProps,
} from '../types';

const AnswerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  border: 1px solid #d1d1d1;
  border-radius: 5px;
  padding: 0.8rem;
  margin: 0.6rem 0;
  cursor: pointer;
  &:hover {
    background-color: #eaeaea;
    transform: translate(0%);
    transition: 5s ease-out;
  }
`;
const AnswerContainer = styled.div<AnswerContainerProps>`
  font-size: 1.125rem;
  ${(props) => css`
    font-weight: ${props.mostVoted ? 'bold' : 'normal'};
  `}
`;
const AnswerOverlay = styled.div<AnswerOverlayProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 5px 0 0 5px;
  opacity: 0.5;
  ${(props) => css`
    width: ${props.percentage};
    background-color: ${props.mostVoted ? 'cyan' : '#d1d1d1'};
    animation: ${({ theme: { votePercentage } }) =>
        animatePercentageWidth(votePercentage)}
      2s;
  `};
`;
const CheckImage = styled.img`
  height: 1.25rem;
  width: 1.25rem;
  padding-left: 0.6rem;
  vertical-align: middle;
`;
// Animate percentage width
const animatePercentageWidth = (width: string) => keyframes`
  0% {
    width: 0;
  }
  100% {
    width: ${width}px;
  }
`;

const Answer = ({
  mostVoted,
  answer,
  total,
  voted,
  onVote,
}: AnswerDocumentProps) => {
  const [active, setActive] = useState(false);
  // calculates number of votes
  let votes = active ? answer.votes + 1 : answer.votes;
  // calculates vote percentage
  let votePercentage = Math.round((votes / total) * 100);
  // handles voting by invoking onVote Method
  const choiceSelection = () => {
    if (!voted) {
      setActive(true);
      onVote();
    }
  };
  return (
    <AnswerWrapper onClick={choiceSelection}>
      {voted ? (
        <Fragment>
          <AnswerContainer mostVoted={mostVoted}>
            {answer.text}
            {active && (
              <CheckImage src={require('../static/check-circle.svg')} />
            )}
          </AnswerContainer>
          <AnswerContainer mostVoted={mostVoted}>
            {votePercentage}%
          </AnswerContainer>
          <AnswerOverlay
            percentage={votePercentage + '%'}
            mostVoted={mostVoted}
          />
        </Fragment>
      ) : (
        <AnswerContainer mostVoted={false}>{answer.text}</AnswerContainer>
      )}
    </AnswerWrapper>
  );
};

export default Answer;
