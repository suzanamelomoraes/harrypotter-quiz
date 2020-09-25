import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const handleValueChange = (onValueChange) => (event) => {
  event.persist();
  console.log(event.target.value);
  onValueChange(event.target.value);
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

const RadioAnswer = ({ question }) => {
  const { answerOptions } = question;

  return (
    <div>
      {answerOptions.map((option) => (
        <div key={option}>
          <label>
            <input
              type='radio'
              value={option}
              name={question.id}
              onChange={handleValueChange}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

const SelectAnswer = ({ question }) => {
  const { answerOptions } = question;
  return (
    <div>
      <label>
        <select name={question.id} onChange={handleValueChange}>
          <option>{answerOptions[0]}</option>
          <option>{answerOptions[1]}</option>
        </select>
      </label>
    </div>
  );
};

const CheckboxAnswer = () => {
  return <div></div>;
};

const RangeAnswer = ({ question }) => {
  const { answerOptions } = question;
  const [currentValue, setCurrentValue] = useState(answerOptions.from);

  const handleRangeChange = useCallback((value) => {
    setCurrentValue(value);
  }, []);

  return (
    <div>
      {answerOptions.from}{' '}
      <input
        type='range'
        min={answerOptions.from}
        max={answerOptions.to}
        defaultValue={currentValue}
        onChange={handleValueChange(handleRangeChange)}
      />{' '}
      {answerOptions.to}
      <div>{currentValue}</div>
    </div>
  );
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
        <br />
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
