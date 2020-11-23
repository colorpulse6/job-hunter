import axios from "axios";
import config from "../config";

export const axiosPost = (url, {...content}, cb1, type = undefined, cb2=null, bool=null, ) => {
    console.log(type)
    axios
      .post(
        `${config.API_URL}${url}`,
        { ...content },
        { withCredentials: true }
      )
      .then((result) => {
        cb1();
       if(type === "add") {Array.from(document.querySelectorAll("input")).forEach((input) => {
          input.value = "";
          if (input.type === "checkbox") {
            input.checked = false;
          }
        });
        cb2(bool);
    }
   
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
}
