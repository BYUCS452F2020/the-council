# thecouncil

[Meaning of Council](https://www.grammarly.com/blog/council-counsel/)

Submit your problem, question, decision, and let the Council decide your fate.

The identity of the councilmembers are hidden, yet their vast wisdom shall be on full display. Councilmembers may vote to bring on a new member, yet this occurence is rare and only happens in times of great necessity. Their discretion is guaranteed, unless you decide to share the great knowledge you have gained. 

To be hosted on a basic SQL server to start with, then I'm leaning on firebase afterwards. The council should begin with 4 members.

The Council  
Jaden Lorenc  
Robert Nay  
Primary Keys are **bolded**

## Project Schema

Role (**RoleId**, Title)  
* Roles that users can have  
* Each user will have one role. Title is regular user, councilmember, moderator, etc.  

User (**UserId**, UserName, Email, Password, RoleId)  
* Foreign Key RoleId references Role  
* Users and their roles. User logs in with email and (hashed) password, and username is a public pseudonym.  
    
AuthToken (**Token**, UserId)  
* Foreign Key UserId references User  
* Authentication tokens given to users upon login. Used to prevent unauthorized access.  

CouncilmemberVote (**ProspectiveUserId**, VoterUserId)  
* Foreign Key ProspectiveUserId references User  
* Foreign Key VoterUserId references User  
* Votes of existing councilmembers (VoterUserId) to promote other users (ProspectiveUserId) to councilmembers.   

Question (**QuestionId**, AskerId, Timestamp, Header, Body)  
* Foreign Key AskerId references User  
* A list of questions presented to the council by the user. AskerId stores the UserId of the person who asked the question. Timestamp stores when that happened. Header and body store the main header and the body of the question asked.  

Answer(**AnswerId**, QuestionId, CouncilmemberId, Timestamp, Header, Body)  
* Foreign Key QuestionId references Question.    
* Foreign Key CouncilmemberId references User  
* A list of answers provided by councilmembers. QuestionId references the question this answer answers. CouncilmemberId stores the UserId of the person who answered the question. Timestamp stores when that happened. Header and body store the main header and the body of the answer.  
  
