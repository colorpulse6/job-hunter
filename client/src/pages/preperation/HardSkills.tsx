import React, {useContext, useState} from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";

interface IFetch {
    uuid:string;
    skill_name:string;
}
const HardSkills = (): JSX.Element => {
    const preperationContext = useContext(PreperationContext);
    const { preperationState, getPreperation } = preperationContext;
    const [skills, setSkills] = useState([])

  const fetchSkills = (input) => {
    var myHeaders = new Headers();

    myHeaders.append("apikey", "HeFoDL064Qy8AqVYO6nG2aKEUQQTJLR8");

    var requestOptions = {
      method: "GET",

      headers: myHeaders,
    };

    fetch(`https://api.promptapi.com/skills?q=${input}`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
          console.log(result);
          setSkills(result)
        })
      .catch((error) => console.log("error", error));
  };

  const setInput = (e) => {
    e.preventDefault();
    var input = e.target.value;
    fetchSkills(input)
  }

  const addHardSkill = (e, skill) => {
    e.preventDefault();
    console.log(skill);
    axios
      .post(
        `${config.API_URL}/preperation/interview-questions/add-hard-skill`,
        {
          skill,
         
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


  return (
    <div>
        <input
        onChange={setInput}
        placeholder="Search Skills"
        required
        ></input>
      {/* <button onClick={() => fetchSkills()}>FETCH!</button> */}
<div>
    {skills ? skills.map((skill)=>{
         return <button onClick={(e)=>addHardSkill(e, skill)}>{skill}</button>
    }): null}
    {preperationState.hard_skills ? preperationState.hard_skills.map((skill)=> {
       return <div>
            
    <p>{skill}</p>
        </div>
    }): null}
    </div>
    </div>
  );
};

export default HardSkills;
