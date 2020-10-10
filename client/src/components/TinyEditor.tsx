import React from "react";
import { Editor } from "@tinymce/tinymce-react";

class TinyEditor extends React.Component {
  handleEditorChange = (e) => {
    console.log("Content was updated:", e.target.getContent());
  };

  render() {
    return (
      <Editor
        apiKey="qjp8f1kmyvyox17udpo0fsrd939yhrw1qnc16701izszkhzx"
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image",
            "charmap print preview anchor help",
            "searchreplace visualblocks code",
            "insertdatetime media table paste wordcount",
          ],
          toolbar:
            "undo redo | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help",
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default TinyEditor;
