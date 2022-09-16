import {
  Autocomplete,
  Checkbox,
  CircularProgress,
  TextField,
} from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { FormInputProps } from "./FormInputProps";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const FormInputAsyncCheckboxComboBox: React.FC<FormInputProps> = ({
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

  //   const [value, setValue] = React.useState<any | null>([]);
  //   const [inputValue, setInputValue] = React.useState("");

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
          multiple
          limitTags={2}
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
          value={value}
          //   onChange={(event: any, newValue: any | null) => {
          //     onChange(
          //       setValue(newValue.map((option) => option.value || option))
          //     );
          //   }}
          // renderValue={(selected) => {
          //     return (
          //       selected?.map((option) => option.name).join(", ") ||
          //       "Select some options"
          //     );
          //   }}
          disableCloseOnSelect
          options={populateOptions}
          getOptionLabel={(option) => (option.label ? option.label : "")}
          // getOptionSelected={(option: any, value:any) => option.value === value.value }
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.label}
            </li>
          )}
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
