const { getConnection } = require("../dbConnection");
const userService = require("./userService");

async function nominate(userId, prospectiveUserEmail, campaignText) {
  await userService.councilMemberCheck(userId);
  console.log("Nominate", userId, prospectiveUserEmail, campaignText);

  // Create campaign, and ensure prospective user isn’t already a councilmember
  const nominateResult = await getConnection().query(
    "insert into prospectiveCouncilmember (prospectiveUserId, nominatedBy, campaignText) values ((select userId from user where email = ? and role = 'user'), ?, ?)",
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
  // Make sure user has been nominated
  await getProspective(userId, prospectiveUserId);

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
    // Clear out votes and campaign
    await getConnection().query(
      "delete from councilmemberVote where prospectiveUserId = ?",
      [prospectiveUserId]
    );
    await getConnection().query(
      "delete from prospectiveCouncilmember where prospectiveUserId = ?",
      [prospectiveUserId]
    );

    return "Thanks for voting! This user has received enough votes and is now a councilmember.";
  } else {
    return `Thanks for voting! This user now has ${voteCount} (majority of ${councilmemberCount} councilmember votes needed).`;
  }
}

async function updateProspective(userId, campaignText) {
  // This updates only the current user’s campaign text
  console.log("Update current prospective", userId, campaignText);
  const updateResult = await getConnection().query(
    "update prospectiveCouncilmember set campaignText = ? where prospectiveUserId = ?",
    [campaignText.trim(), userId]
  );
  console.log(updateResult);
  if (updateResult.affectedRows !== 1) {
    throw new Error("Error updating your campaign text");
  }
  // Return details for current user
  return getProspective(userId, userId);
}

async function getProspectives(userId) {
  await userService.councilMemberCheck(userId);
  console.log("Get prospectives");

  const prospectives = await getConnection().query(
    "select userId, name, email, role, campaignText from prospectiveCouncilmember PCM join user U on PCM.prospectiveUserId = U.userId"
  );
  return prospectives;
}

async function getProspective(userId, prospectiveUserId) {
  await userService.councilMemberCheck(userId);
  console.log("Get prospective", prospectiveUserId);

  const result = await getConnection().query(
    "select userId, name, email, role, campaignText from prospectiveCouncilmember PCM join user U on PCM.prospectiveUserId = U.userId where userId = ?",
    [prospectiveUserId]
  );
  if (!result.length) throw new Error("Prospective councilmember not found");
  return result[0];
}

module.exports = {
  nominate,
  vote,
  updateProspective,
  getProspectives,
  getProspective,
};
