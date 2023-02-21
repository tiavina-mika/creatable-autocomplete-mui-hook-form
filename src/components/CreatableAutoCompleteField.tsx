import { FC } from "react";

import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Switch
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import InputLabel from "../InputLabel";

type Props = {
  name: string;
  label?: string;
  tooltip?: string;
  isSwitch?: boolean;
};

const CreatableAutoCompleteField: FC<Props> = ({
  name,
  label,
  tooltip,
  isSwitch = false
}) => {
  // hooks
  const {
    control,
    formState: { errors }
  } = useFormContext();

  const Component = isSwitch ? Switch : Checkbox;

  return (
    <FormControl component="fieldset" error={!!errors?.[name]}>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }: any): any => (
          <FormControlLabel
            {...field}
            label={
              <InputLabel label={label} tooltip={tooltip} sx={{ mb: 0 }} />
            }
            control={
              <Component onChange={field.onChange} checked={!!field.value} />
            }
          />
        )}
      />
      <FormHelperText>{(errors as any)[name]?.message}</FormHelperText>
    </FormControl>
  );
};

export default CreatableAutoCompleteField;
