const userService = require("./userService");

async function getByQuestion(userId, questionId) {
  console.log("Get all answers by question", userId, questionId);
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

  return answers;
}

async function create(userId, questionId, header, body) {
  await userService.councilMemberCheck(userId);

  console.log("Create answer", userId, questionId, header, body);
  const answer = {
    answerId: 1002,
    questionId,
    answererId: userId,
    createdAt: new Date(),
    header,
    body,
  };
  return answer;
}

async function update(userId, answerId, header, body) {
  await userService.councilMemberCheck(userId);

  console.log("Update answer", userId, answerId, header, body);
  const answer = {
    answerId,
    questionId: 456,
    answererId: userId,
    createdAt: new Date(),
    header,
    body,
  };
  return answer;
}

async function deleteAnswer(userId, answerId) {
  await userService.councilMemberCheck(userId);

  console.log("Delete answer", userId, answerId);
}

async function getById(userId, answerId) {
  console.log("Get answer by ID", userId, answerId);
  const answer = {
    answerId,
    questionId: 12,
    answererId: userId,
    createdAt: new Date(),
    header: "Answer title",
    body: "Answer details",
  };
  return answer;
}

module.exports = {
  getByQuestion,
  create,
  update,
  deleteAnswer,
  getById,
};
