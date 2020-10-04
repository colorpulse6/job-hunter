import Axios from "axios";
import React, {useState} from "react";

const HardSkills = () => {
    const [skills, setSkills] = useState([])

  const fetchSkills = (input) => {
    var myHeaders = new Headers();

    myHeaders.append("apikey", "HeFoDL064Qy8AqVYO6nG2aKEUQQTJLR8");

    var requestOptions = {
      method: "GET",

      headers: myHeaders,
    };

    fetch(`https://api.promptapi.com/skills?q=${input}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
          console.log(typeof result.split(" "));
          setSkills([result.split(" ")])
        })
      .catch((error) => console.log("error", error));
  };

  const setInput = (e) => {
    e.preventDefault();
    var input = e.target.value;
    fetchSkills(input)
  }


  return (
    <div>
        <input
        onChange={setInput}
        placeholder="Search Skills"
        required
        ></input>
      {/* <button onClick={() => fetchSkills()}>FETCH!</button> */}

    {skills ? skills.map((skill)=>{
         return <li>{skill}</li>
    }): null}
    </div>
  );
};

export default HardSkills;
