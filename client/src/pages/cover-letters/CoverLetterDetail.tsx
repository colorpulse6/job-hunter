import React, { useContext, useState, useEffect } from "react";

import {
  RouteComponentProps,
} from "react-router-dom";
import { PreperationContext } from "../../context/PreperationContext";

import TinyEditor from "../../components/TinyEditor";

type TParams = {
  coverLetterCategoryName: string;
};

const CoverLetterDetail = (props) => {
  const [content, setContent] = useState("Hire me");
  const {coverLetterCategoryName, preperationState, getPreperation} = props;
  // const preperationContext = useContext(PreperationContext);
  // const { preperationState, getPreperation } = preperationContext;
  console.log(preperationState);


  return (
    <div>
      <h1>{coverLetterCategoryName}</h1>
      <TinyEditor
        preperationState={preperationState}
        coverLetterCategoryName={coverLetterCategoryName}
        getPreperation={getPreperation}
        propContent={content}
        index={props.index}
      />
    </div>
  );
};

export default CoverLetterDetail;
