import React, { useState } from 'react';
import Question from './Question';

import db from '../db';

const Quiz = () => {
  const questions = db.questions;

  const initialCount = 0;
  const [correctAnswers, setCorrectAnswers] = useState(initialCount);

  const handleAnswerChange = ({ id, value }) => {
    questions.map((question) => {
      if (question.id === id) {
        const [a, b] = [question.answer, value].map((x) => JSON.stringify(x));

        const isCorrect = a === b;

        if (isCorrect) {
          setCorrectAnswers((prevState) => prevState + 1);
        }
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`you've answered ${correctAnswers}/${questions.length} correctly!`);
  };

  return (
    <div>
      <h1>Welcome to Harry Potter web quiz </h1>
      <form onSubmit={handleSubmit}>
        <ol>
          {questions.map((question) => (
            <li key={question.id}>
              <Question
                question={question}
                onAnswerChange={handleAnswerChange}
              />
            </li>
          ))}
        </ol>
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default Quiz;
