import { FC } from "react";
import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CategoryInput } from "../../types/categoryTypes";
import { categorySchema } from "../../utils/validations/categoryValidations";
import TextField from "../../components/form/fields/TextField";

type Props = {
  formId: string;
  onSubmit: (values: CategoryInput) => void;
  initialValues?: Record<string, any>;
};

const CategoryForm: FC<Props> = ({ formId, onSubmit, initialValues }) => {
  const form = useForm<CategoryInput>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues
  });

  const { handleSubmit } = form;

  const _onSubmit = (values: CategoryInput) => {
    onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(_onSubmit)} id={formId}>
        {/* -------- inputs -------- */}
        <TextField name="name" fixedLabel="Name" />

        {/* -------- button -------- */}
        {!formId && (
          <Box mt={1.5}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </Box>
        )}
      </form>
    </FormProvider>
  );
};

export default CategoryForm;
