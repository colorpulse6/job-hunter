import { ReactNode } from "react";
import { RouteProps } from "react-router";

/*CONTEXT*/

/*AUTH*/

export interface IUser {
  userInfo: {
    id: string;
    name: string;
    email: string;
    password: string;
  };
}

export interface InitialAuthState {
  userInfo: {};
}

export interface IAuthState {
  applied_job_goals_daily: string;
  applied_job_goals_monthly: string;
  applied_job_goals_weekly: string;
  calendar_settings: ICalSettings;
  email: string;
  github: string;
  id: string;
  linkedin: string;
  name: string;
  password: string;
  portfolio: string;
  profile_pic_url: string;
  saved_job_goals_daily: string;
  saved_job_goals_monthly: string;
  saved_job_goals_weekly: string;
}

export interface ICalSettings {
  see_all: boolean;
  see_added: boolean;
  see_other: boolean;
  see_applied: boolean;
  see_weekends: boolean;
}

export interface IAuth {
  isAuthenticated: boolean;
}

export type ContextProps = {
  children: ReactNode;
};

/*Jobs*/

export interface IJObs {
  added_by: string;
  applied: boolean;
  archived: boolean;
  company_name: string;
  date_added: string;
  date_applied: string;
  denied: boolean;
  hired: boolean;
  incontact: boolean;
  interview1: boolean;
  interview2: boolean;
  interview3: boolean;
  job_category: string;
  job_contacts: boolean;
  job_description: string;
  job_id: number | null;
  job_notes: boolean;
  job_saved: boolean;
  job_tasks: boolean;
  job_title: string;
  star: boolean;
  tasks_open: boolean;
}

//TASKS
export interface ITasks {
  added_by: string;
  challenges: IChallenges;
  learning: ILearning;
  task_id: number;
  todos: ITodos;
}

export interface IChallenge {
  url: string;
  name: string;
  repo: string;
  due_date: string;
  completed: boolean;
  date_added: string;
}

export interface IChallenges extends Array<IChallenge> {}

export interface ISingleLearning {
  name: string;
  completed: boolean;
  dateAdded: string;
  tutorial_url: string;
}

export interface ILearning extends Array<ISingleLearning> {}

export interface ITodo {
  content: string;
  completed: string;
  due_date: string;
}

export interface ITodos extends Array<ITodo> {}

export interface InitialJobsState {
  jobs: {};
}

export interface IProps {
  history: {
    push(url: string): void;
  };
  location: RouteProps["location"];
}

export interface IJobs {
  added_by: string;
  applied: boolean;
  archived: boolean;
  company_name: string;
  date_added: boolean;
  denied: boolean;
  hired: boolean;
  incontact: boolean;
  interview1: boolean;
  interview2: boolean;
  interview3: boolean;
  job_contacts: boolean;
  job_description: string;
  job_id: number;
  job_notes: boolean;
  job_saved: boolean;
  job_tasks: boolean;
  job_title: string;
  tasks_open: boolean;
  star: boolean;
}

export interface IJobProps extends Array<IJobs> {}

export interface JobProgressProps {
  handleSelect: (e: React.FormEvent<HTMLInputElement>) => void;
  select: string;
  month: string;
  currentWeek: string;
  averageDailySaved: number | null;
  jobsSaved: number;
  jobsApplied: number;
  jobsInterviewing: number;
  authState: IAuthState;
}

export interface DashboardTasksProps {
  taskState: ITasks;
  jobs: IJobs;
  getTasks: () => void;
}

export interface InfoDivProps {
  state: ILearning | IChallenges;
  taskState: ITasks;
  jobs?: IJobs;
  element: string;
  url: string;
}

export interface DocumentCompProps {
  addSlug: string;
  removeSlug: string;
  state: IResumeCategory;
  getPreperation: () => void;
  coverLetter?: boolean;
  resume?: boolean;
}
export interface IResumeCategory
  extends Array<{
    category_name: string;
    resume_upload_url: string;
  }> {}

//COMPONENTS
export interface TodoCompProps {
  todos: ITodos;
  deleteUrl: string;
  finishUrl: string;
  fetch: () => void;
  limit?: boolean;
  noDate?: boolean;
  secondLineColor?: boolean;
}

export interface IJobTasks
  extends Array<{ content: string; completed: boolean }> {}
