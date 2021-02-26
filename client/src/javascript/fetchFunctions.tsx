import axios from "axios";
import config from "../config";

export const axiosPost = (
  url: string,
  { ...content },
  cb1: () => void,
  type: string | undefined = undefined,
  cb2: any = undefined,
  bool = null
) => {
  axios
    .post(`${config.API_URL}${url}`, { ...content }, { withCredentials: true })
    .then((result) => {
      cb1();
      if (type === "add") {
        Array.from(document.querySelectorAll("input")).forEach((input) => {
          input.value = "";
          if (input.type === "checkbox") {
            input.checked = false;
          }
        });
        cb2(bool);
      }
    })
    .catch((err) => {
      console.log(err.response.data.error);
    });
};
