import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import config from "../config";

function TinyEditor(props) {
  const { coverLetterCategoryName, propContent, index } = props;

  const saveContentToDb = (coverLetterContent) => {
    axios
      .post(
        `${config.API_URL}/preperation/cover-letter-category/save-cover-letter`,
        {
          coverLetterCategoryName,
          coverLetterContent,
          index,
        },
        { withCredentials: true }
      )
      .then((result) => {
        // props.getPreperation();
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err.response.data.error);
      });
  };

  const saveData = (e) => {
    let coverLetterContent = e.target.getContent();
    console.log("Content was updated:", coverLetterContent);
    saveContentToDb(coverLetterContent);
  };

  return (
    <div>
      <Editor
        apiKey="qjpf1kmyvyox17udpo0fsrd939yhrw1qnc16701izszkhzx"
        initialValue={propContent}
        init={{
          height: 500,
          menubar: false,
          entity_encoding: "raw",
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
            "autosave",
            "save",
          ],
          toolbar: [
            "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
            "restoredraft",
            "save",
          ],
          save_onsavecallback: function () {},
        }}
        onChange={(e) => saveData(e)}
        onSubmit={(e) => saveData(e)}
      />
    </div>
  );
}

export default TinyEditor;
