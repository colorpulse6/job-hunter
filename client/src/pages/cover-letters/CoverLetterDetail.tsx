import React, { useContext, useState, useEffect } from "react";

import {
  RouteComponentProps,
} from "react-router-dom";
import { PreperationContext } from "../../context/PreperationContext";

import TinyEditor from "../../components/TinyEditor";

type TParams = {
  coverLetterCategoryName: string;
};

const CoverLetterDetail = ({ match }: RouteComponentProps<TParams>) => {
  const [content, setContent] = useState("Hire me");
  const [index, setIndex] = useState(null);
  const coverLetterCategoryName = match.params.coverLetterCategoryName;
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  console.log(preperationState);

  useEffect(() => {
    if (preperationState.cover_letter_category) {
      preperationState.cover_letter_category.forEach((category) => {
        if (category.category_name === coverLetterCategoryName) {
          setContent(category.content);
          setIndex(preperationState.cover_letter_category.indexOf(category));
        }
      });
    }
  });

  return (
    <div>
      <TinyEditor
        preperationState={preperationState}
        coverLetterCategoryName={coverLetterCategoryName}
        getPreperation={getPreperation}
        propContent={content}
        index={index}
      />
    </div>
  );
};

export default CoverLetterDetail;
