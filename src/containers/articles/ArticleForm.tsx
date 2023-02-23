import { useEffect, useState } from "react";

import { Box, Button, Stack } from "@mui/material";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";
import { green } from "@mui/material/colors";

import { articleSchema } from "../../utils/validations/articleValidations";
import { categories } from "../../utils/articleUtils";
import { ArticleInput } from "../../types/articleTypes";
import CreatableAutoCompleteField from "../../components/form/fields/CreatableAutoCompleteField";
import { CategoryInput, ICategory } from "../../types/categoryTypes";
import CategoryForm from "../categories/CategoryForm";
import { ISelectOption } from "../../types/appTypes";
import TextField from "../../components/form/fields/TextField";

const sx = {
  result: {
    mt: 2,
    bgcolor: green[50],
    p: 2,
    borderRadius: 1
  }
};
// select options
const initialCategoryOptions = categories.map((category: ICategory) => ({
  value: category.objectId,
  label: category.name
}));

// id to link form and buttons outside the form
const CATEGORY_FORM_ID = "article-category-form-id";

const ArticleForm = () => {
  const [categoryOptions, setCategoryOptions] = useState<ISelectOption[]>([]);
  const [articleValues, setArticleValues] = useState<ArticleInput | null>(null);

  useEffect(() => {
    setCategoryOptions(initialCategoryOptions);
  }, []);

  const form = useForm<ArticleInput>({
    mode: "onChange",
    resolver: zodResolver(articleSchema),
    defaultValues: {
      category: null
    }
  });

  const { handleSubmit, setValue } = form;

  const onSubmit: SubmitHandler<ArticleInput> = (values) => {
    setArticleValues(values);
  };

  const onCreateCategoryFormSubmit = (values: CategoryInput) => {
    const tempId = uuidv4();
    const currentArticleCategoryValue = { label: values.name, value: tempId };
    // update options with the newly created category
    setCategoryOptions((prev) => [currentArticleCategoryValue, ...prev]);

    // update the category field of article form
    setValue("category", currentArticleCategoryValue);
    console.log("category values", values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          {/* -------- inputs -------- */}
          <TextField name="title" fixedLabel="Title" required fullWidth />

          <CreatableAutoCompleteField
            name="category"
            fixedLabel="Category"
            options={categoryOptions}
            formId={CATEGORY_FORM_ID}
            dialogTitle="Add new category"
            placeholder="Choose or create a category"
            fullWidth
            renderForm={(formId, value, closeDialog) => (
              <CategoryForm
                hasParentForm
                formId={formId}
                onSubmit={(values: CategoryInput) => {
                  onCreateCategoryFormSubmit(values);
                  closeDialog();
                }}
                initialValues={value ? { name: value.label } : {}}
              />
            )}
          />

          {/* -------- button -------- */}
          <Box className="flexRow justifyEnd">
            <Button type="submit" variant="contained" sx={{ py: 1.5, px: 4 }}>
              Save
            </Button>
          </Box>
        </Stack>
      </form>
      {/* result */}
      {articleValues && (
        <Box sx={sx.result}>{JSON.stringify(articleValues)}</Box>
      )}
    </FormProvider>
  );
};

export default ArticleForm;
