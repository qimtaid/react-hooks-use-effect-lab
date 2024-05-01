/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);
  let intervalId;

  // add useEffect code

  useEffect(() => {
    intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswered(false);
    }
  }, [timeRemaining, onAnswered]);

  useEffect(() => {
    return () => {
      clearTimeout(intervalId);
    };
  }, []);


  function handleAnswer(isCorrect) {
    clearInterval(intervalId);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
