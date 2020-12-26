CREATE DATABASE jobhunter;

CREATE TABLE users
(
  id uuid PRIMARY KEY DEFAULT
    
    name
  VARCHAR
  (255) NOT NULL,
    email VARCHAR
  (255) NOT NULL,
    password VARCHAR
  (255) NOT NULL
);

CREATE TABLE events
(
  event_id serial PRIMARY KEY,
    added_by VARCHAR (255) NOT NULL,
    title VARCHAR (255) NOT NULL,
    start_time VARCHAR (255) NOT NULL,
    end_time VARCHAR (255) NOT NULL,
    allDay boolean
);



  INSERT INTO users
    (user_name, user_email, user_password)
  VALUES
    ('John', 'john@john.com', '111111');

  ALTER TABLE preperation
    ADD preperation_notes VARCHAR
  (255);

  ALTER TABLE preperation
  DROP preperation_notes;



  ALTER TABLE jobs
RENAME COLUMN job_name TO job_title;

  DELETE FROM jobs 
  WHERE job_id = index AND added_by = req.session.loggedInUser.name;

  CREATE TABLE jobs
  (
    job_id serial PRIMARY KEY,
    job_name VARCHAR (255) NOT NULL,
    job_description VARCHAR (255),
    date_added TIMESTAMP,
    job_contacts jsonb,
    job_tasks text
    [],
    job_notes VARCHAR
    (255),
    tasks_open boolean,
    job_saved boolean,
    applied boolean,
    inContact boolean,
    interview1 boolean,
    interview2 boolean,
    interview3 boolean,
    hired boolean,
    denied boolean,
    archived boolean
);

    ALTER TABLE tasks
  DROP preperation
    ,
    DROP hard_skills,
    DROP career_goals,
    DROP pitch,
    DROP soft_skills,
    DROP preperation_notes,
    DROP resume_category,
    DROP cover_letter_category;

    CREATE TABLE tasks
    (
      task_id serial PRIMARY KEY,
      added_by VARCHAR (255),
      todos jsonb,
      challenges jsonb,
      learning jsonb,
    );


    CREATE TABLE preperation
    (
      hard_skills text
      [],
    career_goals text[],
    pitch VARCHAR
      (255),
    soft_skills text[],
    preperation_notes text[],
    resume_category jsonb,
    cover_letter_category jsonb
);

ALTER TABLE preperation
ALTER COLUMN preperation_notes
  TYPE text[] USING (preperation_notes::text[]);
  

  ALTER TABLE users
  ADD saved_job_goals jsonb;


  //Add to array//
  
        UPDATE tasks 
      SET todos = todos || '{"content":"${content}", "completed":false }'
      WHERE added_by = $1;


      //Put each element in JSONB array//

      SELECT arr.position, arr.todo FROM tasks, jsonb_array_elements(todos) with ordinality arr(todo,position) WHERE task_id=6;

//Get specific element from array//

      SELECT arr.contact FROM jobs, jsonb_array_elements(job_contacts) with ordinality arr(contact, position) WHERE job_id=12 and arr.position=0;


      //Delete item based on id//

      UPDATE tasks SET todos = todos - 0 WHERE task_id=6;


      //Add new key value pair


UPDATE preperation
SET resume_category = '[{"resume_name":"AI"}, {"resume_name":"AI", "resume_url":"oops.com"}]'
WHERE id = 1;

UPDATE preperation
SET interview_questions =  '[{"question":"What is your name?"}, {"answer":null}]'
WHERE added_by = 'Doober McButton';

  //EDIT ELLEMENT IN OBJCET IN JSON ARRAY//
      with ${key} as (
            SELECT ('{'||index-1||',${key}}')::text[] as path
              FROM jobs
                ,jsonb_array_elements(job_contacts) with ordinality arr(contact, index)
                WHERE contact->>'job_id' = '${job_id}'
                and added_by = '${userName}'
          )
          UPDATE jobs
            set job_contacts = jsonb_set(job_contacts, ${key}.path, '"${value}"')
            FROM ${key}
            WHERE added_by = '${userName}'
            RETURNING *;
    
          



