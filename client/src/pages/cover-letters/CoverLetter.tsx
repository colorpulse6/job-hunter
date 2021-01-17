import React, { useContext } from "react";

import { PreperationContext } from "../../context/PreperationContext";
import PrepNav from "../preperation/PrepNav";
import DocumentComp from "../../pages/preperation/documents/DocumentComp";

const CoverLetter = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation  } = preperationContext;

  return (
    <>
      <PrepNav />

      <DocumentComp
        addSlug="cover-letter-category/add-cover-letter-category"
        removeSlug="cover-letter-category/delete-cover-letter-category"
        state={preperationState.cover_letter_category}
        getPreperation={getPreperation}

        coverLetter
      />
    </>
  );
};

export default CoverLetter;
