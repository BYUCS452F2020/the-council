const { getConnection } = require("../dbConnection");

async function getAll(userId) {
  console.log("Get all questions", userId);
  const questions = await getConnection().query("select * from question");
  return questions;
}

async function getByUser(userId, askerId) {
  console.log("Get all questions by user", userId, askerId);
  const questions = await getConnection().query(
    "select * from question where askerId = ?",
    [askerId]
  );
  return questions;
}

async function create(userId, header, body) {
  console.log("Create question", userId, header, body);
  const insertResult = await getConnection().query(
    "insert into question (askerId, header, body) values (?, ?, ?)",
    [userId, header.trim(), body.trim()]
  );
  const newQuestionId = insertResult.insertId;
  // Return full question
  return getById(userId, newQuestionId);
}

async function update(userId, questionId, header, body) {
  console.log("Update question", userId, questionId, header, body);
  const updateResult = await getConnection().query(
    "update question set header = ?, body = ? where questionId = ?",
    [header.trim(), body.trim(), questionId]
  );
  if (updateResult.changedRows !== 1) {
    throw new Error("Error updating question");
  }
  return getById(userId, questionId);
}

async function deleteQuestion(userId, questionId) {
  console.log("Delete question", userId, questionId);
  await getConnection().query("delete from question where questionId = ?", [
    questionId,
  ]);
}

async function getById(userId, questionId, includeAnswers) {
  console.log("Get question by ID", userId, questionId, includeAnswers);
  const result = await getConnection().query(
    "select * from question where questionId = ?",
    [questionId]
  );

  if (!result.length) throw new Error(`Question ${questionId} not found`);
  const [question] = result;

  if (includeAnswers) {
    question.answers = await getConnection().query(
      "select * from answer where questionId = ?",
      [questionId]
    );
  }

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
