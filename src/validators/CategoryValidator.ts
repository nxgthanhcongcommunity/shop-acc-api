import { checkSchema } from "express-validator";

class CategoryValidator {
  GetAccountByCodeAsync = checkSchema({
    accountCode: {
      notEmpty: {
        errorMessage: "accountCode can not be null!!",
      },
    },
  });
  AddCategoryAsync = checkSchema({
    name: {
      notEmpty: {
        errorMessage: "name can not be null!!",
      },
    },
    bannerCode: {
      notEmpty: {
        errorMessage: "bannerCode can not be null!!",
      },
    },
    mainFileCLDId: {
      notEmpty: {
        errorMessage: "mainFileCLDId can not be null!!",
      },
    },
  });
  UpdateCategoryAsync = checkSchema({
    id: {
      isNumeric: {
        errorMessage: "id code must be a number",
      },
      custom: {
        options: (value: number) => {
          if (value <= 0) {
            throw new Error("id code must be greater than 0");
          }
          return true;
        },
      },
    },
    name: {
      notEmpty: {
        errorMessage: "name can not be null!!",
      },
    },
    bannerCode: {
      notEmpty: {
        errorMessage: "bannerCode can not be null!!",
      },
    },
    mainFileCLDId: {
      notEmpty: {
        errorMessage: "mainFileCLDId can not be null!!",
      },
    },
  });
  DeleteCategoryAsync = checkSchema({
    id: {
      isNumeric: {
        errorMessage: "id code must be a number",
      },
      custom: {
        options: (value: number) => {
          if (value <= 0) {
            throw new Error("id code must be greater than 0");
          }
          return true;
        },
      },
    },
  });
  GetCategoriesByBannerCodeAsync = checkSchema({
    bannerCode: {
      notEmpty: {
        errorMessage: "bannerCode can not be null!!",
      },
    },
  });
  GetCategoryByCodeAsync = checkSchema({
    categoryCode: {
      notEmpty: {
        errorMessage: "categoryCode can not be null!!",
      },
    },
  });
}

export default CategoryValidator;
