import { FC, Fragment, ReactNode, useState } from "react";

import {
  Autocomplete,
  createFilterOptions,
  IconButton,
  Stack,
  TextField,
  Tooltip
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import AddIcon from "@mui/icons-material/Add";

import { ICreatableSelectOption } from "../../../types/appTypes";
import Dialog from "../../Dialog";
import { grey } from "@mui/material/colors";

const filter = createFilterOptions<any>();

type Props = {
  value: any;
  label?: string;
  options: ICreatableSelectOption[];
  onChange: (value: ICreatableSelectOption) => void;
  formId: string;
  dialogTitle: string;
  placeholder?: string;
  renderForm: (formId: string, value: any, toggle: () => void) => ReactNode;
  isCreateOnInputChange?: boolean;
};

const CreatableAutoCompleteInput: FC<Props> = ({
  value,
  label,
  onChange,
  formId,
  renderForm,
  dialogTitle,
  placeholder,
  isCreateOnInputChange = true,
  options = []
}) => {
  const [openFormDialog, setOpenFormDialog] = useState<boolean>(false);

  const toggleDialog = () => setOpenFormDialog((prev) => !prev);

  return (
    <Fragment>
      <Stack direction="row" spacing={1.6}>
        <Autocomplete
          sx={{ flex: 1 }}
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === "string" && isCreateOnInputChange) {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                toggleDialog();
                onChange({
                  label: newValue,
                  value: uuidv4()
                });
              });
              return;
            }
            if (newValue && newValue.inputValue && isCreateOnInputChange) {
              toggleDialog();
              onChange({
                label: newValue.inputValue,
                value: uuidv4()
              });
              return;
            }

            onChange(newValue);
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (isCreateOnInputChange) {
              if (params.inputValue !== "") {
                filtered.push({
                  inputValue: params.inputValue,
                  label: `Add "${params.inputValue}"`
                });
              }
            } else {
              filtered.push({
                label: `No "${params.inputValue}" found`,
                disabled: true
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
          renderOption={(props, option) => {
            // eslint-disable-next-line jsx-a11y/role-supports-aria-props
            return (
              <li {...props} aria-disabled={option.disabled}>
                {option.label}
              </li>
            );
          }}
          freeSolo
          renderInput={(params) => (
            <TextField {...params} placeholder={placeholder} label={label} />
          )}
        />
        {!isCreateOnInputChange && (
          <Tooltip title={dialogTitle}>
            <IconButton
              onClick={toggleDialog}
              sx={{
                border: "1px solid " + grey[400],
                borderRadius: 1,
                px: 2
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </Stack>
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
