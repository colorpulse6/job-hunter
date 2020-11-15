import React, {useContext, useState} from "react";
import axios from "axios";
import config from "../../config";
import { PreperationContext } from "../../context/PreperationContext";
import PrepNav from "./PrepNav"

interface IFetch {
    uuid:string;
    skill_name:string;
}
const HardSkills = (): JSX.Element => {
    const preperationContext = useContext(PreperationContext);
    const { preperationState, getPreperation } = preperationContext;
    const [skills, setSkills] = useState([])

  const fetchHardSkills = (input) => {
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
    fetchHardSkills(input)
  }

  const addHardSkill = (e, skill) => {
    e.preventDefault();
    console.log(skill);
    axios
      .post(
        `${config.API_URL}/preperation/hard-skills/add-hard-skill`,
        {
          skill,
         
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

  const removeHardSkill = (skill) => {
    console.log(skill);
    axios
      .post(
        `${config.API_URL}/preperation/hard-skills/delete-hard-skill`,
        {
          skill,
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
        <input
        onChange={setInput}
        placeholder="Search Skills"
        required
        ></input>
      {/* <button onClick={() => fetchSkills()}>FETCH!</button> */}
<div>
    {skills.length > 0 ? skills.map((skill, index)=>{
         return <button key={index} onClick={(e)=>addHardSkill(e, skill)}>{skill}</button>
    }): null}
    {preperationState.hard_skills ? preperationState.hard_skills.map((skill, index)=> {
       return <div key={index}>
            
    <p>{skill}</p>
    <button onClick={() => removeHardSkill(skill)}>X</button>
        </div>
    }): null}
    </div>
    </div>
  );
};

export default HardSkills;
