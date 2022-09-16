import { InputAdornment, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

export const FormInputTextArea = ({
  name,
  control,
  label,
  maxRows=3,
  placeholder
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <>
          {/* <FormLabel component="legend">{label}</FormLabel> */}
          <TextField
            label={label}
            className="mb-4"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value || ""}
            fullWidth
            minRows={3}
            variant="outlined"
            multiline
            InputLabelProps={{ shrink: true }}
            maxRows={maxRows}
            id="outlined-multiline-static"
            type="textarea"
            placeholder={placeholder}
          />
        </>
      )}
    />
  );
};
