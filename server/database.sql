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


  INSERT INTO users
    (user_name, user_email, user_password)
  VALUES
    ('John', 'john@john.com', '111111');

  ALTER TABLE jobs
  ADD preperation_id VARCHAR (255);

  ALTER TABLE jobs
  DROP addedBy;



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
  

  ALTER TABLE preperation
  ADD added_by VARCHAR (255);


  //Add to array//
  
        UPDATE tasks 
      SET todos = todos || '{"content":"${content}", "completed":false }'
      WHERE added_by = $1;


      //Put each element in JSONB array//

      SELECT arr.position, arr.todo FROM tasks, jsonb_array_elements(todos) with ordinality arr(todo,position) WHERE task_id=6;

//Get specific element from array//

      SELECT arr.question FROM preperation, jsonb_array_elements(interview_questions) with ordinality arr(question, position) WHERE preperation_id=1 and arr.position=1;


      //Delete item based on id//

      UPDATE tasks SET todos = todos - 0 WHERE task_id=6;
    
          



