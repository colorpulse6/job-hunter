## Description
A tool to aid in the job search.  Capabilities include:  
- Storage of information for jobs found and applied
- Keep track of the interview process
- Keep track of contacts for jobs and messages to recruiters
- Keep track of interviews and jobs applied with an automated drag and drop calendar
- Keep track of your career goals, soft/hard skills, tasks, job challenges, learning goals
- Store c/v's and resumes in categories that correspond to job ambitions
## Routes

- /landing
- /login
- /signup
- /signout
- /dashboard
- /calender
- /calender/week
- /calender/day
- /job-board
- /job-board/add-job
- /job-details/:jobId/overview
- /job-details/:jobId/contacts
- /job-details/:jobId/job-tasks
- /job-details/:jobId/notes
- /tasks/todo
- /tasks/todo/add-todo
- /tasks/challenges
- /tasks/challenges/addChallenge
- /tasks/learning
	- /tasks/learning/add-course
	- /tasks/learning/:courseId
- /preperation
- /preperation/interview-questions
	- /preperation/interview-questions/add-answer
- /preperation/interview-questions/add-question
- /preperation/hard-skills
	- /preperation/hard-skills/add-skill
- /preperation/career-goals
	- /preperation/career-goals/add-goal
- /preperation/pitch
	- /preperation/pitch/edit-pitch
- /preperation/soft-skills
	- /preperation/soft-skills/add-skill
- /preperation/preperation-notes
	- /preperation/preperation-notes/edit-preperation-notes
- /preperation/resumes
	- /preperation/resumes/add-resume-category
	- /preperation/resumes/add-resume-pdf
	- /preperation/resumes/add-resume-url
- /preperation/resumes/:categoryId
- /preperation/cover-letters
	- /preperation/cover-letters/add-cover-letter-category
	- /preperation/cover-letters/add-cover-letter-pdf
	- /preperation/cover-letters/add-cover-letter-url
- /preperation/cover-letters/:coverLetter:id
- /profile
- /profile/add-goal-monthly
- /profile/add-goal-weekly
- /profile/add-goal-daily
- /profile/edit-profile


## Pages

Landing
- Login
Signup
- Dashboad
- Calender 
	- Calender Week
	- Calender Day
- Job Board
- Job Details
	- Overview
	- Contacts
	- Job Tasks
	- Notes
- Tasks
	- Todo
	Challenges
	Learning
- Preperation
	- Interview Questions
	- Soft Skills
	- Pitch
	- Hard Skills
	- Career Goals
- Notes
- Resumes
	- Resume Category
- Cover Letters
	- Cover Letter Category

- Profile


## Components

- Navbar
- Graph
- Calender
- TextField
- SubModal
- Task
- Search
- functions
	- Functions.js
- JobModule
- JobDetailsNav
- TaskNav


## Models

Users

```
	name: string
	email: string
	linkedin: string
	github: string
	portfolio: string
	jobGoalsMonth: boolean
	jobGoalsWeek: boolean
	jobGoalsDay: boolean
```
	
Jobs

```
	jobName: string
	jobTitle: string
	jobDescription: string
	dateAdded: string
	jobContacts: array {
		name: string
		title: string
		linkedin: string
		email: string
		phone: number
}
jobTasks: array[string]
notes: string
tasksOpen: boolean
saved: boolean
applied: boolean
inContact: boolean
interview1: boolean
interview2: boolean
interview3: boolean
hired: boolean
denied: boolean
archived: boolean
```

Tasks

```
	todos: array {
content: string
notes: string
complete: boolean
}
	challenges: array {
		name: string
url: string
repo:string
completed: boolean
}

learning: array {
name: string
tutorialUrl: array[string]
dateAdded: string
completed: boolean
}

Preperation 
	interviewQuestions: array {
title: string
answer: string
}
hardSkills: array[string]
careerGoals: array[string]
pitch: string
softSkills: array[string]
preperationNotes: string
resumeCategory: array {
categoryName: string
resumeUrl: string
uploadUrl: string
}
coverLetterCategory: array {
categoryName: string
coverLetter: string
}
```

## Notes

- add suggestions for resume builders
- add suggestions for all components of preparation 



## Backlog

- Change Language Settings
- Email notifications


## Links

### Deploy Link
[https://job-toast.herokuapp.com/]
### Wireframes
[https://miro.com/app/board/o9J_kl5AITw=/]

### Trello
[https://trello.com/b/kfxvRjIr/job-hunt]

<!-- ## Assets

 Nikita Golubev
 https://www.flaticon.com/authors/nikita-golubev

 Catalin Fertu
 https://www.flaticon.com/authors/kiranshastry

 Sofie Staal - Toast Gif
 https://lottiefiles.com/user/149590
 -->

