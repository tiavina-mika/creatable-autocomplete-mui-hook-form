import { FC } from "react";

import {
  FormControl,
  FormHelperText,
  TextField as MUITextField,
  TextFieldProps
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import InputLabel from "../InputLabel";

type Props = {
  name: string;
  label?: string;
  tooltip?: string;
  required?: boolean;
  fixedLabel?: string;
  helperText?: string;
} & TextFieldProps;

const TextField: FC<Props> = ({
  name,
  label,
  tooltip,
  fixedLabel,
  required,
  helperText,
  ...inputProps
}) => {
  // hooks
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl
      component="fieldset"
      error={!!errors?.[name]}
      fullWidth={inputProps.fullWidth}
    >
      {fixedLabel && (
        <InputLabel
          label={fixedLabel}
          tooltip={tooltip}
          required={required}
          sx={{ color: "#000" }}
        />
      )}
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field: { value, onChange } }: any): any => (
          <MUITextField
            {...inputProps}
            value={value}
            onChange={onChange}
            label={label}
            variant="outlined"
            helperText={helperText}
          />
        )}
      />
      {errors[name] && (
        <FormHelperText error>{(errors as any)[name].message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default TextField;
