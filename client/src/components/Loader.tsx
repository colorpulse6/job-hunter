import React from "react";
import Lottie from "react-lottie";
import toastGif from "../assets/toast-loader.json";

 const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: toastGif,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

    return (
        <div className="loader">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      );
}

export default Loader