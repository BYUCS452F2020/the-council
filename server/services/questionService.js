async function getAll(userId) {
  console.log("Get all questions", userId);
  const questions = [
    {
      questionId: 123,
      askerId: 123,
      createdAt: new Date(),
      header: "What is life?",
      body: "I need to know",
    },
    {
      questionId: 456,
      askerId: 456,
      createdAt: new Date(),
      header: "What will Rick Astley never do?",
      body: "I just can’t remember",
    },
  ];

  return questions;
}

async function getByUser(userId, askerId) {
  console.log("Get all questions by user", userId, askerId);
  const questions = [
    {
      questionId: 123,
      askerId,
      createdAt: new Date(),
      header: "What is life?",
      body: "I need to know",
    },
    {
      questionId: 456,
      askerId,
      createdAt: new Date(),
      header: "What will Rick Astley never do?",
      body: "I just can’t remember",
    },
  ];

  return questions;
}

async function create(userId, header, body) {
  console.log("Create question", userId, header, body);
  const question = {
    questionId: 789,
    askerId: userId,
    createdAt: new Date(),
    header,
    body,
  };
  return question;
}

async function update(userId, questionId, header, body) {
  console.log("Update question", userId, questionId, header, body);
  const question = {
    questionId,
    askerId: userId,
    createdAt: new Date(),
    header,
    body,
  };
  return question;
}

async function deleteQuestion(userId, questionId) {
  console.log("Delete question", userId, questionId);
}

async function getById(userId, questionId, includeAnswers) {
  console.log("Get question by ID", userId, questionId, includeAnswers);
  const answers = [
    {
      answerId: 1001,
      questionId,
      answererId: 12,
      createdAt: new Date(),
      header: "Never give you up",
      body: "...",
    },
    {
      answerId: 1002,
      questionId,
      answererId: 13,
      createdAt: new Date(),
      header: "Never desert you",
      body: "...",
    },
  ];
  const question = {
    questionId,
    askerId: 456,
    createdAt: new Date(),
    header: "What will Rick Astley never do?",
    body: "I just can’t remember",
    answers,
  };
  return question;
}

module.exports = {
  getAll,
  getByUser,
  create,
  update,
  deleteQuestion,
  getById,
};
