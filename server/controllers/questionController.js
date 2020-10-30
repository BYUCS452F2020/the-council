const service = require("../services/questionService");

function getAll(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .getAll(userId)
    .then((questions) => res.json({ success: true, questions }))
    .catch(next);
}

function getByUser(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .getByUser(userId, parseInt(params.userId))
    .then((questions) => res.json({ success: true, questions }))
    .catch(next);
}

function create(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .create(userId, body.header, body.body)
    .then((question) => res.json({ success: true, question }))
    .catch(next);
}

function update(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .update(userId, parseInt(params.questionId), body.header, body.body)
    .then((question) => res.json({ success: true, question }))
    .catch(next);
}

function deleteQuestion(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .deleteQuestion(userId, params.questionId)
    .then(() => res.json({ success: true }))
    .catch(next);
}

function getById(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .getById(userId, parseInt(params.questionId), query.includeAnswers)
    .then((question) => res.json({ success: true, question }))
    .catch(next);
}

module.exports = {
  getAll,
  getByUser,
  create,
  update,
  deleteQuestion,
  getById,
};
