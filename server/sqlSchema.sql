CREATE TABLE user (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('user', 'councilmember') NOT NULL DEFAULT 'user'
);
    
CREATE TABLE authToken (
  token VARCHAR(255) PRIMARY KEY,
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE
);

CREATE TABLE prospectiveCouncilmember (
  prospectiveUserId INT PRIMARY KEY,
  nominatedBy INT NOT NULL,
  campaignText VARCHAR(65535),
  FOREIGN KEY (prospectiveUserId) REFERENCES user(userId) ON DELETE CASCADE,
  FOREIGN KEY (nominatedBy) REFERENCES user(userId)
);

CREATE TABLE councilmemberVote (
  prospectiveUserId INT,
  voterUserId INT,
  PRIMARY KEY (prospectiveUserId, voterUserId),
  FOREIGN KEY (prospectiveUserId) REFERENCES user(userId) ON DELETE CASCADE,
  FOREIGN KEY (voterUserId) REFERENCES user(userId) ON DELETE CASCADE
);

CREATE TABLE question (
  questionId INT AUTO_INCREMENT PRIMARY KEY,
  askerId INT NOT NULL,
  createdAt DATETIME,
  header VARCHAR(255),
  body VARCHAR(65535),
  FOREIGN KEY (askerId) REFERENCES user(userId) ON DELETE CASCADE
);

CREATE TABLE answer (
  answerId INT AUTO_INCREMENT PRIMARY KEY,
  questionId INT NOT NULL,
  councilmemberId INT NOT NULL,
  createdAt DATETIME,
  header VARCHAR(255),
  body VARCHAR(65535),
  FOREIGN KEY (questionId) REFERENCES question(questionId) ON DELETE CASCADE,
  FOREIGN KEY (councilmemberId) REFERENCES user(userId) ON DELETE CASCADE
);