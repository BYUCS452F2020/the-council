const { getConnection } = require("../dbConnection");
const userService = require("./userService");

async function nominate(userId, prospectiveUserEmail, campaignText) {
  await userService.councilMemberCheck(userId);
  console.log("Nominate", userId, prospectiveUserEmail, campaignText);

  // Create campaign
  const nominateResult = await getConnection().query(
    "insert into prospectiveCouncilmember (prospectiveUserId, nominatedBy, campaignText) values ((select userId from user where email = ?), ?, ?)",
    [prospectiveUserEmail, userId, campaignText]
  );
  if (!nominateResult.affectedRows) throw new Error("Error nominating user");
  console.log(nominateResult);

  // Have nominator automatically vote for the nominee
  const voteResult = await getConnection().query(
    "insert into councilmemberVote (prospectiveUserId, voterUserId) values ((select userId from user where email = ?), ?)",
    [prospectiveUserEmail, userId]
  );
  if (!voteResult.affectedRows) throw new Error("Error voting for user");
  return true;
}

async function vote(userId, prospectiveUserId) {
  await userService.councilMemberCheck(userId);
  console.log("Vote", userId, prospectiveUserId);
  // Create vote
  const insertResult = await getConnection().query(
    "insert into councilmemberVote (prospectiveUserId, voterUserId) values (?, ?)",
    [prospectiveUserId, userId]
  );
  if (!insertResult.affectedRows) throw new Error("Error voting for user");

  // Get # of councilmembers
  const [{ councilmemberCount }] = await getConnection().query(
    "select count(*) as councilmemberCount from user where role = 'councilmember'"
  );

  // Get # of votes
  const [
    { voteCount },
  ] = await getConnection().query(
    "select count(*) as voteCount from councilmemberVote where prospectiveUserId = ?",
    [prospectiveUserId]
  );

  // If majority has voted, change nominated user to a councilmember
  if (!councilmemberCount || !voteCount) {
    throw new Error("Error updating prospective councilmember status");
  }
  if (voteCount >= councilmemberCount / 2) {
    const updateResult = await getConnection().query(
      "update user set role = 'councilmember' where userId = ?",
      [prospectiveUserId]
    );
    if (updateResult.changedRows !== 1) {
      throw new Error("Error making user to councilmember");
    }
  }
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

  const prospectives = await getConnection().query(
    "select * from prospectiveCouncilmember PCM join user U on PCM.userId = U.userId"
  );
  return prospectives;
}

async function getProspective(userId, prospectiveUserId) {
  await userService.councilMemberCheck(userId);
  console.log("Get prospective", prospectiveUserId);

  const prospectives = await getConnection().query(
    "select * from prospectiveCouncilmember PCM join user U on PCM.userId = U.userId"
  );
  return prospectives;
}

module.exports = {
  nominate,
  vote,
  updateProspective,
  getProspectives,
  getProspective,
};
