const service = require("../services/answerService");

function getByQuestion(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .getByQuestion(userId, parseInt(params.questionId))
    .then((answers) => res.json({ success: true, answers }))
    .catch(next);
}

function create(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .create(userId, parseInt(body.questionId), body.header, body.body)
    .then((answer) => res.json({ success: true, answer }))
    .catch(next);
}

function update(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .update(userId, parseInt(params.answerId), body.header, body.body)
    .then((answer) => res.json({ success: true, answer }))
    .catch(next);
}

function deleteAnswer(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .deleteAnswer(userId, params.answerId)
    .then(() => res.json({ success: true }))
    .catch(next);
}

function getById(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .getById(userId, parseInt(params.answerId))
    .then((answer) => res.json({ success: true, answer }))
    .catch(next);
}

module.exports = {
  getByQuestion,
  create,
  update,
  deleteAnswer,
  getById,
};
