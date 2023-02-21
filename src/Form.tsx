import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { articleSchema } from "./utils/validations/articleValidations";
import { categories } from "./utils/articleUtils";
import { ArticleInput, ICategory } from "./types/articleTypes";
import CreatableAutoCompleteField from "./components/form/CreatableAutoCompleteField";

const categoryOptions = categories.map((category: ICategory) => ({
  value: category.objectId,
  label: category.name
}));

const Form = () => {
  const form = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema)
  });

  const { handleSubmit } = form;

  const onSubmit = (values: ArticleInput) => console.log("values", values);

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* -------- inputs -------- */}
        <CreatableAutoCompleteField
          name="category"
          fixedLabel="Category"
          options={categoryOptions}
        />

        {/* -------- button -------- */}
        <Box mt={1.5}>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </FormProvider>
  );
};

export default Form;
