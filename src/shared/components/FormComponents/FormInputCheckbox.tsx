import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import React from "react";
import { Row } from "react-bootstrap";
import { Controller } from "react-hook-form";

import { FormInputProps } from "./FormInputProps";

export const FormInputCheckbox = ({
  name,
  control,
  label,
  onChange,
  type,
}: FormInputProps) => {
  const [checked, setChecked] = React.useState<boolean>(false);

  const handleChange = (event: any) => {
    console.log(event.target.checked);
    setChecked(event.target.checked);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <FormGroup>
          <FormControlLabel
            value="end"
            control={
              <>
                <Row>
                  <Checkbox
                    className="mb-4"
                
                    onChange={onChange}
                    value={value || ""}
                  />
                </Row>{" "}
                <Row>
                  <FormHelperText>
                    {error ? error.message : null}
                  </FormHelperText>
                </Row>
              </>
            }
            label={label}
            labelPlacement="end"
          />
        </FormGroup>
      )}
    />
  );
};
