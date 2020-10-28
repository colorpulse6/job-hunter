import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";
import PrepNav from "./PrepNav"

const InterviewQuestions = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  //   console.log(preperationState.interview_questions);
  const [editing, setEditing] = useState(false);
  const [getIndex, setIndex] = useState(null);

  const addQuestion = (e) => {
    e.preventDefault();
    // let target = e.currentTarget as any;
    const question = e.target.question.value;
    console.log(question);

    axios
      .post(
        `${config.API_URL}/preperation/interview-questions/add-question`,
        {
          question,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        Array.from(document.querySelectorAll("input")).forEach(
          input => (input.value = "")
        );
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const addAnswer = (e, question, index) => {
    e.preventDefault();
    const answer = e.target.answer.value;
    console.log(answer);
    setEditing(false);
    axios
      .post(
        `${config.API_URL}/preperation/interview-questions/add-answer`,
        {
          answer,
          question,
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        getPreperation();
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const removeQuestion = (index) => {
    console.log(index);
    axios
      .post(
        `${config.API_URL}/preperation/interview-questions/delete-question`,
        {
          index,
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
  };

  return (
    <div>
      <PrepNav />
      <form onSubmit={(e) => addQuestion(e)}>
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
        {preperationState.interview_questions
          ? preperationState.interview_questions.map((question, index) => {
              return (
                <div key={index}>
                  <p>{question.question}</p>
                  <button onClick={() => removeQuestion(index)}>X</button>
                  {!question.answer ? (
                    <form
                      onSubmit={(e) => addAnswer(e, question.question, index)}
                    >
                      <input
                        type="text"
                        id="answer"
                        name="answer"
                        placeholder="Answer"
                        required
                      />
                      <input type="submit" value="Add Answer" />
                    </form>
                  ) : editing && getIndex === index ? (
                    <form
                      onSubmit={(e) => addAnswer(e, question.question, index)}
                    >
                      <input
                        type="text"
                        id="answer"
                        name="answer"
                        placeholder={question.answer ? question.answer: "Edit answer" }
                        required
                      ></input>
                      <input type="submit" value="Save Answer" />
                    </form>
                  ) : (
                    <div>
                      <p>{question.answer}</p>
                      <button
                        onClick={(e) => {
                          setEditing(true);
                          setIndex(index);
                        }}
                      >
                        Edit Answer
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default InterviewQuestions;
