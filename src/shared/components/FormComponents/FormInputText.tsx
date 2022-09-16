import { InputAdornment, TextField } from "@mui/material";

import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

export const FormInputText = ({
  name,
  control,
  label,
  type,
  endAdornment,
  startAdornment,
  // defaultValue,
  placeholder,
  disabled,
  
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
            disabled={disabled}
            placeholder={placeholder}
            label={label}
            className="roc-mui mb-4"
            helperText={error ? error.message : null}
            error={!!error}
            onChange={onChange}
            value={value || ""}
            fullWidth
            variant="outlined"
            type={type}
            // defaultValue={defaultValue}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{endAdornment}</InputAdornment>
              ),
              // startAdornment: (
              //   <InputAdornment position="start">{endAdornment}</InputAdornment>
              // )
            }}
          />
        </>
      )}
    />
  );
};
