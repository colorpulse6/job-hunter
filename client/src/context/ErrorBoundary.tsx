import React from "react";
import ToastIcon from "../assets/toaster.png";

export default class ErrorBoundary extends React.Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    //   logErrorToMyService(error, info);
  }

  styles = {
    margin: "130px",
    display: "flex",
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={this.styles}>
          <img src={ToastIcon}></img>
          <div>
            <h1>Something went wrong!</h1>
            <h3>Please contact the administrator...</h3>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
