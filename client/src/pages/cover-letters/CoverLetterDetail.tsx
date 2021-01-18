import React, { useState } from "react";

import TinyEditor from "../../components/TinyEditor";

type TParams = {
  coverLetterCategoryName: string;
};

const CoverLetterDetail = (props) => {
  const [content, setContent] = useState("Hire me");
  const { coverLetterCategoryName, preperationState, getPreperation } = props;

  console.log(preperationState);

  return (
    <div
      style={{
        width: "63%",
       marginTop:"-20px"

      }}
    >
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
