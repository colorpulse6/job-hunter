import React, {useContext} from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";

const InterviewQuestions = () => {

    const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
console.log(preperationState.interview_questions)
  // const todos = props.location.state.todos
  // const { getTasks } = props.location.state
  // console.log(props.location.state)


    const addQuestion = (e) => {

        e.preventDefault();
        // let target = e.currentTarget as any;
       const question = e.target.question.value
    console.log(question)
      
        axios
          .post(
            `${config.API_URL}/preperation/interview-questions/add-question`,
            {
              question
            },
            { withCredentials: true }
          )
          .then((result) => {
            getPreperation()
            console.log(result.data);
          })
          .catch((err) => {
            console.log(err.response.data.error);
          });
    }

    const removeQuestion = (index) => {
      console.log(index)
      axios
      .post(
        `${config.API_URL}/preperation/interview-questions/delete-question`,
        {
          index
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    }

  return (
    <div onSubmit={(e)=>addQuestion(e)}>
      <form>
        <input
          type="text"
          id="question"
          name="question"
          placeholder="Please Enter a Question"
          required
        />
        <input type="submit" value="Add Question" />
      </form>
      <div>
        <h3>Interview Questions</h3>
        {preperationState.interview_questions ? preperationState.interview_questions.map((question, index)=>{
          return <div key={index}>
            <p>{question.question}</p>
             <button onClick={() => removeQuestion(index)}>X</button>
            </div>
        }) : null}
       
      </div>
    </div>
  );
}

export default InterviewQuestions

