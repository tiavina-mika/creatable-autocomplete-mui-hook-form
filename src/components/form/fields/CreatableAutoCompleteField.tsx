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
  renderForm: (formId: string, value: any, toggle: () => void) => ReactNode;
  formId: string;
  dialogTitle: string;
  fullWidth?: boolean;
  helperText?: string;
  placeholder?: string;
  isCreateOnInputChange?: boolean;
};

const CreatableAutoCompleteField: FC<Props> = ({
  name,
  label,
  tooltip,
  fixedLabel,
  required,
  renderForm,
  formId,
  dialogTitle,
  fullWidth,
  helperText,
  placeholder,
  isCreateOnInputChange,
  options = []
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
      fullWidth={fullWidth}
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
          <CreatableAutoCompleteInput
            value={value}
            onChange={onChange}
            options={options}
            label={label}
            renderForm={renderForm}
            formId={formId}
            dialogTitle={dialogTitle}
            placeholder={placeholder}
            isCreateOnInputChange={isCreateOnInputChange}
          />
        )}
      />
      {errors[name] ? (
        <FormHelperText error>{(errors as any)[name].message}</FormHelperText>
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CreatableAutoCompleteField;
