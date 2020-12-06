import React from "react";
import { withRouter } from "react-router-dom";
interface Props {
  history: {
    push(url: string): void;
    goBack: () => void;
  };
}
const TestModal = (props: Props) => {
    return(
  <div
    role="button"
    className="modal-wrapper"
    onClick={() => props.history.goBack()}
  >
    <div role="button" className="modal" onClick={(e) => e.stopPropagation()}>
      <p>CONTENT</p>
    </div>
  </div>
    )
};

export default withRouter(TestModal);
