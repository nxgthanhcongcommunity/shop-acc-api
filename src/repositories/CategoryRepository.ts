import { CategoryModel } from "../models";

export interface IGetCategoryByCodeReq {
    code: string;
}

class CategoryRepository {

    GetCategoryByCode = async (reqModel: IGetCategoryByCodeReq) => {
        const { code } = reqModel;

        const record = await CategoryModel.findOne({
            where: { code, },
        });

        return record;
    };

}

export default CategoryRepository;

