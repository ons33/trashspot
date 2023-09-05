import React from "react";
import Classnames from "classnames";

function Inputs({ name, label, type, icon, onChangeHandler, errors, value }) {
  return (
    <>
      <div>
        <input
          type={type}
          name={name}
          class={Classnames("form-control", { "is-invalid": errors })}
          onChange={onChangeHandler}
          placeholder={name}
          value={value}
        />
        {errors && <div className="invalid-feedback">{errors}</div>}
      </div>
    </>
  );
}

export default Inputs;
