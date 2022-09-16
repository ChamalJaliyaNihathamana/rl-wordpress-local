import React from "react";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  options,
  control,
  label,
  placeholder,
  disabled,
  defaultValue,
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <FormControl size={"medium"} fullWidth className="mb-3">
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Select
              defaultValue={defaultValue}
              onChange={onChange}
              value={value || ""}
              error={!!error}
              disabled={disabled}
              placeholder={placeholder}
            >
              {generateSingleOptions()}
            </Select>
            <FormHelperText>{error ? error.message : null}</FormHelperText>
          </>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
