import React from "react";
import FloatingLabelInput from "react-floating-label-input";

const Form = (props) => {
  const { inputs, title, buttonText, cta, ctaText, ctaLink } = props;

  const InputComp = (label, type, id) => {
    return (
      <FloatingLabelInput
        id={id}
        label={label}
        onBlur={"onBlur"}
        onChange={"onChange"}
        onFocus={"onFocus"}
        type={type}
      />
    );
  };

  return (
    <div className="box">
      <form>
        <span className="text-center">{title}</span>

        {inputs.map((input) => {
          return InputComp(input.label, input.type, input.id);
        })}
        <button type="button" className="btn">
          submit
        </button>
        {cta ? <a href="{ctaLink}">{ctaText}</a> : null}
      </form>
    </div>
  );
};

export default Form;
