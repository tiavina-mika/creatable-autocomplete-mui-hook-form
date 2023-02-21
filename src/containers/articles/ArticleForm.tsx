import { useEffect, useState } from "react";

import { Box, Button } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

import { articleSchema } from "../../utils/validations/articleValidations";
import { categories } from "../../utils/articleUtils";
import { ArticleInput } from "../../types/articleTypes";
import CreatableAutoCompleteField from "../../components/form/fields/CreatableAutoCompleteField";
import { CategoryInput, ICategory } from "../../types/categoryTypes";
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

  useEffect(() => {
    setCategoryOptions(initialCategoryOptions);
  }, []);

  const form = useForm<ArticleInput>({
    mode: "onChange",
    resolver: zodResolver(articleSchema)
  });

  const { handleSubmit, setValue } = form;

  const onSubmit = (values: ArticleInput) => {
    console.log("aricles values", values);
  };
  const onCategoryFormSubmit = (values: CategoryInput) => {
    const tempId = uuidv4();
    const currentArticleCategoryValue = { label: values.name, value: tempId };
    // update options with the newly created category
    setCategoryOptions((prev) => [currentArticleCategoryValue, ...prev]);

    // update the category field of article form
    setValue("category", currentArticleCategoryValue);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* -------- inputs -------- */}
        <CreatableAutoCompleteField
          name="category"
          fixedLabel="Category"
          options={categoryOptions}
          formId={CATEGORY_FORM_ID}
          dialogTitle="Add new category"
          renderForm={(formId, value, closeDialog) => (
            <CategoryForm
              formId={formId}
              onSubmit={(values: CategoryInput) => {
                onCategoryFormSubmit(values);
                closeDialog();
              }}
              initialValues={value ? { name: value.label } : {}}
            />
          )}
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
