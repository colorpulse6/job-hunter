import React, { useContext } from "react";
import { PreperationContext } from "../../../context/PreperationContext";
import PrepNav from "../PrepNav";
import DocumentComp from '../documents/DocumentComp'

const Resume = () => {
  const preperationContext = useContext(PreperationContext);
  const { preperationState, getPreperation } = preperationContext;
  return (
    <>
      <PrepNav />
    <DocumentComp 
     addSlug="resume-category/add-resume-category"
     removeSlug="resume-category/delete-resume-category"
     state={preperationState.resume_category}
     getPreperation={getPreperation}
     resume 
     
     />
     
    </>
  );
};

export default Resume;
