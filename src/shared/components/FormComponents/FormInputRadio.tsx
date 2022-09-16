import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Row } from "react-bootstrap";

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputRadio: React.FC<FormInputProps> = ({
  name,
  control,
  label,
  options,
  direction = "row",
  onChange,
}) => {
  const generateRadioOptions = () => {
    return options.map((singleOption, index) => (
      <FormControlLabel
        onChange={onChange}
        key={index}
        value={singleOption.value}
        label={singleOption.label}
        control={
          <Radio
            style={{ color: singleOption.fillColor && singleOption.fillColor }}
          />
        }
      />
    ));
  };

  return (
    <FormControl component="fieldset" className="mb-3">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <>
            <RadioGroup value={value || ""} onChange={onChange} row>
              {generateRadioOptions()}
            </RadioGroup>
            <FormHelperText>{error ? error.message : null}</FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
};
