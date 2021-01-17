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
        width: "60%",
        borderLeft: "2px solid #4285f4",

        paddingLeft: "145px",
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
