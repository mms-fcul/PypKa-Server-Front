import React from "react";
import { inputGroup, borderPrimary } from "../pages/run-pypka.module.css";

export const InputFloat = (props) => (
  <div className={inputGroup}>
    <span className="input-group-addon" style={{ width: "50%" }}>
      {props.name}
    </span>
    <InputFloatSimple
      extraStyle={props.extraStyle}
      defaultValue={props.defaultValue}
      condition1={props.condition1}
      condition2={props.condition2}
      disableOn={props.disableOn}
      saveState={props.saveState}
      width={"50%"}
    />
  </div>
);

export const InputFloatSimple = (props) => (
  <input
    className={
      props.condition1 && props.condition2
        ? borderPrimary + " " + props.extraStyle
        : props.extraStyle
    }
    style={{ width: props.width, textAlign: "center", padding: "5px 12px" }}
    type="number"
    defaultValue={props.defaultValue}
    aria-describedby="basic-addon1"
    disabled={!props.disableOn}
    onChange={(e) => {
      const displayed_value = e.target.value;
      const pH_value = parseFloat(displayed_value);

      if (displayed_value !== pH_value) {
        if (isNaN(pH_value)) {
          console.log(pH_value);
          e.target.value = "";
        } else {
          console.log(pH_value);
          e.target.value = pH_value;
        }
      }
      props.saveState(pH_value);
    }}
  />
);
