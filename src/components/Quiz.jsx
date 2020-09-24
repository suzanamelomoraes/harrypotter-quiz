import React from 'react';
import Question from './Question';

import db from '../db';
const questions = db.questions;

const Quiz = () => {
  return (
    <div>
      <h1>Welcome to Harry Potter web quiz </h1>
      <form>
        <ol>
          {questions.map((question) => (
            <li key={question.id}>
              <Question question={question} />
            </li>
          ))}
        </ol>
      </form>
    </div>
  );
};

export default Quiz;
