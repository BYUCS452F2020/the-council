const { getConnection } = require("../dbConnection");
const userService = require("./userService");

async function getByQuestion(userId, questionId) {
  console.log("Get all answers by question", userId, questionId);
  const answers = await getConnection().query(
    "select * from answer where questionId = ?",
    [questionId]
  );
  return answers;
}

async function create(userId, questionId, header, body) {
  await userService.councilMemberCheck(userId);

  console.log("Create answer", userId, questionId, header, body);
  const insertResult = await getConnection().query(
    "insert into answer (questionId, councilmemberId, header, body) values (?, ?, ?, ?)",
    [questionId, userId, header.trim(), body.trim()]
  );
  const newAnswerId = insertResult.insertId;
  return getById(userId, newAnswerId);
}

async function update(userId, answerId, header, body) {
  await userService.councilMemberCheck(userId);

  const updateResult = await getConnection().query(
    "update answer set header = ?, body = ? where answerId = ?",
    [header.trim(), body.trim(), answerId]
  );
  if (updateResult.changedRows !== 1) {
    throw new Error("Error updating answer");
  }
  return getById(userId, answerId);
}

async function deleteAnswer(userId, answerId) {
  await userService.councilMemberCheck(userId);

  console.log("Delete answer", userId, answerId);
  await getConnection().query("delete from answer where answerId = ?", [
    answerId,
  ]);
}

async function getById(userId, answerId) {
  console.log("Get answer by ID", userId, answerId);
  const result = await getConnection().query(
    "select * from answer where answerId = ?",
    [answerId]
  );

  if (!result.length) throw new Error(`Answer ${answerId} not found`);
  const [answer] = result;
  return answer;
}

module.exports = {
  getByQuestion,
  create,
  update,
  deleteAnswer,
  getById,
};
