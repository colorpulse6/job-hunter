import React from "react";

const Form = (props) => {
  const { inputs, title, buttonText, cta, ctaText, ctaLink } = props;

  const Input = (type, label) => {
    return (
      <div className="input-container">
        <input type={type} />
        <label>{label}</label>
      </div>
    );
  };

  return (
    <div className="box">
      <form>
        <span className="text-center">{title}</span>
        
        {inputs.map((input)=>{
            return Input(input.type, input.label)
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
