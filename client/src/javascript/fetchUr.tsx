import axios from 'axios'
import config from "../config";

  const getMeta = (url) => {
      let imageUrl
    axios.post(`${config.API_URL}/fetch-meta`,
    { url })
    .then((res)=>{
        console.log(res.data.og.images[0].url)
        imageUrl = res.data.og.images[0].url

    })
    .catch((err)=>{
        console.log(err);
        console.log("ERROR!")
    })
      return String(imageUrl)
  }

  export default getMeta