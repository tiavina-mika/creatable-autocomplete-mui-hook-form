import { FC, useEffect, useState } from "react";

import {
  Autocomplete,
  createFilterOptions,
  FormControl,
  FormHelperText,
  TextField
} from "@mui/material";
import { useFormContext, Controller } from "react-hook-form";

import InputLabel from "./InputLabel";
import { ICreatableSelectOption } from "../../../types/appTypes";

const filter = createFilterOptions<any>();

type Props = {
  value: any;
  label?: string;
  options: ICreatableSelectOption[];
  onChange: (value: ICreatableSelectOption) => void;
};

const CreatableAutoCompleteInput: FC<Props> = ({
  value,
  label,
  onChange,
  options = []
}) => {
  const [open, toggleOpen] = useState<boolean>(false);
  const [newOptions, setNewOptions] = useState<ICreatableSelectOption[]>([]);

  useEffect(() => {
    setNewOptions(options);
  }, [options]);

  const addNewOption = (option: ICreatableSelectOption) =>
    setNewOptions((prev) => [option, ...prev]);

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          // timeout to avoid instant validation of the dialog's form.
          setTimeout(() => {
            toggleOpen(true);
            addNewOption({
              label: newValue
              // year: '',
            });
          });
        } else if (newValue && newValue.inputValue) {
          toggleOpen(true);
          addNewOption({
            label: newValue.inputValue
            // year: '',
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
      options={newOptions}
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
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default CreatableAutoCompleteInput;
