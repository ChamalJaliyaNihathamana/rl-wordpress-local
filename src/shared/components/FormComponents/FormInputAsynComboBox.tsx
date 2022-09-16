import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import { FormInputProps } from "./FormInputProps";

export const FormInputAsyncComboBox: React.FC<FormInputProps> = ({
  options,
  name,
  control,
  label,
  placeholder,
}) => {
  const sleep = (delay = 0) => {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  };

  const [open, setOpen] = React.useState(false);
  const [populateOptions, setPopulateOptions] = React.useState([]);
  const loading = open && populateOptions.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setPopulateOptions([...options]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setPopulateOptions([]);
    }
  }, [open]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          loading={loading}
          onChange={(event, item) => {
            onChange(item);
          }}
          value={value || undefined}
          options={populateOptions}
          getOptionLabel={(option) => (option.label ? option.label : "")}
          // getOptionSelected={(option: any, value:any) => option.value === value.value }

          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              className="roc-mui mb-4"
              margin="normal"
              variant="outlined"
              error={!!error}
              helperText={error ? error.message : null}
              // required
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />
  );
};
