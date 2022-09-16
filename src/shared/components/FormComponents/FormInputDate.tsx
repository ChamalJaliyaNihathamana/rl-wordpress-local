import React from "react";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";
import { TextField } from "@mui/material";

export const FormInputDate = ({
  name,
  control,
  label,
  view = ["day"],
  disabled,
}: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({
          field: { onChange, value },
          fieldState: { error },
          formState,
        }) => (
          <DatePicker
            // inputFormat="E MMM dd yyyy HH:MM:SS O"
            disabled={disabled}
            views={view}
            label={label}
            value={value || null}
            onChange={onChange}
            renderInput={(params) => (
              <TextField
                fullWidth
                {...params}
                error={!!error}
                helperText={error ? error.message : null}
              />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
};
