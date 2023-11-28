import * as Yup from 'yup'

export const categorySchema = Yup.object({
    name: Yup.string().required("نام دسته بندی الزامی است.").min(3, "نام حداقل باید سه کاراکتر باشد.").typeError("لطفا به حروف وارد کنید"),
})