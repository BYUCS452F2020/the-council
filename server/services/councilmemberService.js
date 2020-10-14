const userService = require("./userService");

async function nominate(userId, prospectiveUserEmail, campaignText) {
  await userService.councilMemberCheck(userId);
  console.log("Nominate", userId, prospectiveUserEmail, campaignText);
}

async function vote(userId, prospectiveUserId) {
  await userService.councilMemberCheck(userId);
  console.log("Vote", userId, prospectiveUserId);
}

async function updateProspective(userId, campaignText) {
  await userService.councilMemberCheck(userId);
  console.log("Update current prospective", userId, campaignText);
  const prospectiveCouncilMember = {
    userId: 12,
    name: "john",
    email: "john@example.com",
    campaignText,
  };
  return prospectiveCouncilMember;
}

async function getProspectives(userId) {
  await userService.councilMemberCheck(userId);
  console.log("Get prospectives");

  const prospectives = [
    {
      userId: 12,
      name: "john",
      email: "john@example.com",
      campaignText: "Something inspiring",
    },
    {
      userId: 13,
      name: "sally",
      email: "sally@example.com",
      campaignText: "Something inspiring again",
    },
  ];
  return prospectives;
}

async function getProspective(userId, prospectiveUserId) {
  await userService.councilMemberCheck(userId);
  console.log("Get prospective", prospectiveUserId);

  const prospective = {
    userId: prospectiveUserId,
    name: "john",
    email: "john@example.com",
    campaignText: "Something inspiring",
  };
  return prospective;
}

module.exports = {
  nominate,
  vote,
  updateProspective,
  getProspectives,
  getProspective,
};
