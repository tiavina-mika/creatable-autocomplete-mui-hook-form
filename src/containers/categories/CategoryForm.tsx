import { FC, FormEvent } from "react";
import { Button, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CategoryInput } from "../../types/categoryTypes";
import { categorySchema } from "../../utils/validations/categoryValidations";
import TextField from "../../components/form/fields/TextField";

type Props = {
  formId: string;
  onSubmit: (values: CategoryInput) => void;
  initialValues?: Record<string, any>;
  hasParentForm?: boolean;
};

const CategoryForm: FC<Props> = ({
  formId,
  onSubmit,
  initialValues,
  hasParentForm = false
}) => {
  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues
  });

  const { handleSubmit } = form;

  const _onSubmit: SubmitHandler<CategoryInput> = (values) => {
    onSubmit(values);
  };

  const handleSubmitWithoutPropagation = (
    event: FormEvent<HTMLFormElement>
  ) => {
    // if nested form
    if (hasParentForm) {
      event.preventDefault();
      event.stopPropagation();
    }

    handleSubmit(_onSubmit)(event);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmitWithoutPropagation} id={formId}>
        <Stack spacing={4}>
          {/* -------- inputs -------- */}
          <TextField name="name" fixedLabel="Name" fullWidth />

          <TextField
            name="tags"
            fixedLabel="Tags"
            fullWidth
            helperText="Tags should be separated by coma"
          />

          {/* -------- button -------- */}
          {!formId && (
            <Button type="submit" variant="contained">
              Save
            </Button>
          )}
        </Stack>
      </form>
    </FormProvider>
  );
};

export default CategoryForm;
