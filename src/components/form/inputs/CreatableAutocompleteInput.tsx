import { FC, Fragment, ReactNode, useState } from "react";

import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

import { ICreatableSelectOption } from "../../../types/appTypes";
import Dialog from "../../Dialog";

const filter = createFilterOptions<any>();

type Props = {
  value: any;
  label?: string;
  options: ICreatableSelectOption[];
  onChange: (value: ICreatableSelectOption) => void;
  formId: string;
  dialogTitle: string;
  renderForm: (formId: string, value: any, toggle: () => void) => ReactNode;
};

const CreatableAutoCompleteInput: FC<Props> = ({
  value,
  label,
  onChange,
  formId,
  renderForm,
  dialogTitle,
  options = []
}) => {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  const toggleDialog = () => setOpenFormDialog((prev) => !prev);

  return (
    <Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleDialog();
              onChange({
                label: newValue,
                value: uuidv4()
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleDialog();
            onChange({
              label: newValue.inputValue,
              value: uuidv4()
            });
          } else {
            onChange(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              label: `Add "${params.inputValue}"`
            });
          }

          return filtered;
        }}
        id="creatable-autocomplete"
        options={options}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.label;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.label}</li>}
        freeSolo
        renderInput={(params) => <TextField {...params} label={label} />}
      />
      <Dialog
        maxWidth="sm"
        fullWidth
        title={dialogTitle}
        open={openFormDialog}
        toggle={toggleDialog}
        content={renderForm(formId, value, toggleDialog)}
        formId={formId}
      />
    </Fragment>
  );
};

export default CreatableAutoCompleteInput;
