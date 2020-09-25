const db = {
  questions: [
    {
      id: '1',
      title: 'What is Lord Voldemort’s real name?',
      answer: 'Tom Marvolo Riddle',
      answerType: 'text',
    },
    {
      id: '2',
      title:
        'What’s the LAST line of the book, “Harry Potter and the Sorcerer’s Stone”?',
      answer: "I'm going to have a lot of fun with Didley this summer...",
      answerType: 'radio',
      answerOptions: [
        'Goodbye, for now, Hogwarts.',
        'Harry, Ron, and Hermione looked at each other sheepishly and smiled.',
        "I'm going to have a lot of fun with Didley this summer...",
        "'Until the fail,' said Dumbledore with a nod.",
      ],
    },
    {
      id: '3',
      title:
        'According to the Dursleys, did Harry’s parents die in a car crash?',
      answer: 'True',
      answerType: 'select',
      answerOptions: ['True', 'False'],
    },
    {
      id: '4',
      title: 'What are the houses in Hogwarts?',
      answer: ['Gryffindor', 'Ravenclaw', 'Hufflepuff', 'Slytherin'],
      answerType: 'checkbox',
      answerOptions: [
        'Gryffindor',
        'Whitehouse',
        'Ravenclaw',
        'Hufflepuff',
        'Greenhouse',
        'Slytherin',
      ],
    },
    {
      id: '5',
      title:
        "How old is Harry Potter in book 1 “Harry Potter and the Sorcerer's Stone”?",
      answer: '11',
      answerType: 'range',
      answerOptions: { from: 0, to: 20 },
    },
  ],
};

export default db;
