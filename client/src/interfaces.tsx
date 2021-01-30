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

export interface InitialJobsState {
  jobs: {};
}

export interface IProps {
  history: {
    push(url: string): void;
  };
  location: RouteProps["location"];
}

export interface JobParams {
  job: {
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
  };
}
