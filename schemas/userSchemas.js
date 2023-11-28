import * as Yup from 'yup'

export const userRegisterSchema = Yup.object({
    firstName: Yup.string().required("نام الزامی است.").min(3, "نام حداقل باید سه کاراکتر باشد.").typeError("لطفا به حروف وارد کنید"),
    lastName: Yup.string().required("نام خانوادگی الزامی است.").min(3, "نام خانوادگی حداقل باید سه کاراکتر باشد."),
    email: Yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست.").min(5, "حداقل 5 کاراکتر"),
    password: Yup.string().required("گذرواژه الزامی است").min(4, "حداقل باید 4 کاراکتر باشد."),
    confPassword: Yup.string().required("تکرار گذرواژه الزامی است.")
        .oneOf([Yup.ref('password'), null], 'گذرواژه و تکرار آن یکسان نیست.'),
    isAdmin: Yup.number().required("نوع کاربر الزامی است.")
        .test('is boolean',
            'لطفا مقدار 0 یا 1 وارد کنید.',
            (value) => value === 0 || value === 1)
})

export const userLoginSchema = Yup.object({
    email: Yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست.").min(5, "حداقل 5 کاراکتر"),
    password: Yup.string().required("گذرواژه الزامی است").min(4, "حداقل باید 4 کاراکتر باشد.")
})
export const userUpdateSchema = Yup.object({
    email: Yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست.").min(5, "حداقل 5 کاراکتر"),
    firstName: Yup.string().required("نام الزامی است.").min(3, "نام حداقل باید سه کاراکتر باشد.").typeError("لطفا به حروف وارد کنید"),
    lastName: Yup.string().required("نام خانوادگی الزامی است.").min(3, "نام خانوادگی حداقل باید سه کاراکتر باشد."),
    isAdmin: Yup.number().required("نوع کاربر الزامی است.")
        .test('is boolean',
            'لطفا مقدار 0 یا 1 وارد کنید.',
            (value) => value === 0 || value === 1)
})