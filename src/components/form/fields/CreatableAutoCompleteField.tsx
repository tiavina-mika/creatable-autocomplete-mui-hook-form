import { FC, ReactNode } from "react";

import { FormControl, FormHelperText } from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import InputLabel from "../InputLabel";
import { ICreatableSelectOption } from "../../../types/appTypes";
import CreatableAutoCompleteInput from "../inputs/CreatableAutocompleteInput";

type Props = {
  name: string;
  label?: string;
  tooltip?: string;
  required?: boolean;
  options: ICreatableSelectOption[];
  fixedLabel?: string;
  dialogForm?: ReactNode;
  toggleDialog?: () => void;
  // toggleDialog?: (value: boolean) => void;
};

const CreatableAutoCompleteField: FC<Props> = ({
  name,
  label,
  tooltip,
  fixedLabel,
  required,
  dialogForm,
  toggleDialog,
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
          <CreatableAutoCompleteInput
            value={value}
            onChange={onChange}
            options={options}
            label={label}
            dialogForm={dialogForm}
            toggleDialog={toggleDialog}
          />
        )}
      />
      {errors[name] && (
        <FormHelperText error>{(errors as any)[name].message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CreatableAutoCompleteField;
