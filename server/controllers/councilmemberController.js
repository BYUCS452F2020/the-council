const service = require("../services/councilmemberService");

function nominate(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .nominate(userId, body.prospectiveUserEmail, body.campaignText)
    .then(() => res.json({ success: true }))
    .catch(next);
}

function vote(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .vote(userId, body.prospectiveUserId)
    .then((message) => res.json({ success: true, message }))
    .catch(next);
}

function updateProspective(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .updateProspective(userId, body.campaignText)
    .then((prospectiveCouncilmember) =>
      res.json({ success: true, prospectiveCouncilmember })
    )
    .catch(next);
}

function getProspectives(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .getProspectives(userId)
    .then((prospectiveCouncilmembers) =>
      res.json({ success: true, prospectiveCouncilmembers })
    )
    .catch(next);
}

function getProspective(req, res, next) {
  const { params, query, body, userId } = req;
  service
    .getProspective(userId, params.prospectiveUserId)
    .then((prospectiveCouncilmember) =>
      res.json({ success: true, prospectiveCouncilmember })
    )
    .catch(next);
}

module.exports = {
  nominate,
  vote,
  updateProspective,
  getProspectives,
  getProspective,
};
