import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { articleSchema } from "../../utils/validations/articleValidations";
import { categories } from "../../utils/articleUtils";
import { ArticleInput } from "../../types/articleTypes";
import CreatableAutoCompleteField from "../../components/form/fields/CreatableAutoCompleteField";
import { CategoryInput, ICategory } from "../../types/categoryTypes";
import { useEffect, useState } from "react";
import Dialog from "../../components/Dialog";
import CategoryForm from "../categories/CategoryForm";
import { ISelectOption } from "../../types/appTypes";

// select options
const initialCategoryOptions = categories.map((category: ICategory) => ({
  value: category.objectId,
  label: category.name
}));

// id to link form and buttons outside the form
const CATEGORY_FORM_ID = "article-category-form-id";

const ArticleForm = () => {
  const [categoryOptions, setCategoryOptions] = useState<ISelectOption[]>([]);
  const [openCategoryFormDialog, setOpenCategoryFormDialog] = useState<boolean>(
    false
  );

  useEffect(() => {
    setCategoryOptions(initialCategoryOptions);
  }, []);

  const form = useForm<ArticleInput>({
    resolver: zodResolver(articleSchema)
  });

  const { handleSubmit } = form;

  // const toggleCategoryFormDialog = (value: boolean) => setOpenCategoryFormDialog(value);
  const toggleCategoryFormDialog = () =>
    setOpenCategoryFormDialog((prev) => !prev);

  const onSubmit = (values: ArticleInput) =>
    console.log("aricles values", values);
  const onCategoryFormSubmit = (values: CategoryInput) => {
    setCategoryOptions((prev) => [
      { value: uuidv4(), label: values.name },
      ...prev
    ]);
    toggleCategoryFormDialog();
    // console.log("category values", values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* -------- inputs -------- */}
        <CreatableAutoCompleteField
          name="category"
          fixedLabel="Category"
          options={categoryOptions}
          toggleDialog={toggleCategoryFormDialog}
          dialogForm={
            <Dialog
              maxWidth="sm"
              fullWidth
              title="Add new category"
              open={openCategoryFormDialog}
              toggle={toggleCategoryFormDialog}
              content={
                <CategoryForm
                  formId={CATEGORY_FORM_ID}
                  onSubmit={onCategoryFormSubmit}
                />
              }
              formId={CATEGORY_FORM_ID}
            />
          }
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

export default ArticleForm;
