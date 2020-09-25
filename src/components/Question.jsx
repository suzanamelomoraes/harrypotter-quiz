import React from 'react';
import PropTypes from 'prop-types';

const handleValueChange = (event) => {
  event.persist();
  console.log(event.target.value);
};

const TextAnswer = () => {
  return (
    <div>
      {' '}
      <input
        type='text'
        placeholder='Type your answer...'
        onChange={handleValueChange}
      />
    </div>
  );
};

const RadioAnswer = () => {
  return <div></div>;
};

const SelectAnswer = () => {
  return <div></div>;
};

const CheckboxAnswer = () => {
  return <div></div>;
};

const RangeAnswer = () => {
  return <div></div>;
};

// STRATEGY PATTERN
const ANSWER_TYPE_COMPONENT_MAP = {
  text: TextAnswer,
  radio: RadioAnswer,
  select: SelectAnswer,
  checkbox: CheckboxAnswer,
  range: RangeAnswer,
};

const Question = ({ question }) => {
  const QuestionInput = ANSWER_TYPE_COMPONENT_MAP[question.answerType];

  return (
    <div>
      <div>{question.title}</div>

      <div>
        <QuestionInput question={question} />
      </div>
    </div>
  );
};

Question.propTypes = {
  question: PropTypes.oneOf([
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      answer: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]).isRequired,
      answerType: PropTypes.oneOf([
        'text',
        'radio',
        'select',
        'checkbox',
        'range',
      ]).isRequired,
      answerOptions: PropTypes.oneOf([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.shape({
          from: PropTypes.number.isRequired,
          to: PropTypes.number.isRequired,
        }),
      ]),
    }),
  ]),
};

export default Question;
