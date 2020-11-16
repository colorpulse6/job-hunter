import { ReactNode } from "react";

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
    date_applied: string
    denied: boolean;
    hired: boolean;
    incontact: boolean;
    interview1: boolean;
    interview2: boolean;
    interview3: boolean;
    job_category: string;
    job_contacts: boolean;
    job_description: string;
    job_id: number;
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
}

export interface JobParams  {
  job:{
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
  }
};

