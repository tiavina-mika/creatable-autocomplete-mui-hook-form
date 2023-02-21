import { FC } from "react";

import {
  FormControl,
  FormHelperText,
  TextField as MUITextField
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import InputLabel from "../InputLabel";
import { ICreatableSelectOption } from "../../../types/appTypes";

type Props = {
  name: string;
  label?: string;
  tooltip?: string;
  required?: boolean;
  options: ICreatableSelectOption[];
  fixedLabel?: string;
};

const TextField: FC<Props> = ({
  name,
  label,
  tooltip,
  fixedLabel,
  required,
  options = []
}) => {
  // hooks
  const {
    control,
    formState: { errors }
  } = useFormContext();

  return (
    <FormControl component="fieldset" error={!!errors?.[name]}>
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
            value={value}
            onChange={onChange}
            label={label}
            variant="outlined"
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
