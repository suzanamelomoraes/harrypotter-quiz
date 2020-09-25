import React from 'react';
import Question from './Question';

import db from '../db';
const questions = db.questions;

const handleAnswerChange = ({ id, value }) => {
  console.log('answer:', id, value);
};

const Quiz = () => {
  return (
    <div>
      <h1>Welcome to Harry Potter web quiz </h1>
      <form>
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
      </form>
    </div>
  );
};

export default Quiz;
