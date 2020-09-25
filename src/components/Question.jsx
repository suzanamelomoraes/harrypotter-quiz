import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

const handleValueChange = (onValueChange) => (event) => {
  event.persist();
  onValueChange(event.target.value);
};

const TextAnswer = ({ onAnswerChange }) => {
  return (
    <div>
      {' '}
      <input
        type='text'
        placeholder='Type your answer...'
        onChange={handleValueChange(onAnswerChange)}
      />
    </div>
  );
};

const RadioAnswer = ({ question, onAnswerChange }) => {
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
              onChange={handleValueChange(onAnswerChange)}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

const SelectAnswer = ({ question, onAnswerChange }) => {
  const { answerOptions } = question;
  return (
    <div>
      <label>
        <select name={question.id} onChange={handleValueChange(onAnswerChange)}>
          {answerOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </div>
  );
};

const CheckboxAnswer = ({ question, onAnswerChange }) => {
  const { answerOptions } = question;
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelection = useCallback(
    (event) => {
      const { value, checked } = event.target;

      const nextSelectedOption = checked
        ? selectedOptions.concat(value)
        : selectedOptions.filter((option) => option !== value);

      setSelectedOptions(nextSelectedOption);
      onAnswerChange(nextSelectedOption);
    },
    [selectedOptions, onAnswerChange]
  );

  return (
    <div>
      {answerOptions.map((option) => (
        <div key={option}>
          <label>
            <input
              type='checkbox'
              value={option}
              name={question.id}
              onChange={handleSelection}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

const RangeAnswer = ({ question, onAnswerChange }) => {
  const { answerOptions } = question;
  const [currentValue, setCurrentValue] = useState(answerOptions.from);

  const handleRangeChange = useCallback(
    (value) => {
      setCurrentValue(value);
      onAnswerChange(value);
    },
    [onAnswerChange]
  );

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

const Question = ({ question, onAnswerChange }) => {
  const QuestionInput = ANSWER_TYPE_COMPONENT_MAP[question.answerType];

  const handleAnswerReceived = useCallback(
    (answer) => {
      onAnswerChange({ id: question.id, value: answer });
    },
    [onAnswerChange, question.id]
  );

  return (
    <div>
      <div>{question.title}</div>

      <div>
        <QuestionInput
          question={question}
          onAnswerChange={handleAnswerReceived}
        />
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
