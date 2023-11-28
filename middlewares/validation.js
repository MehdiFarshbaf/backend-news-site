export const validation = schema => async (req, res, next) => {
    const body = req.body
    try {
        await schema.validate(body, {
            abortEarly: false, // include all errors
            // allowUnknown: true, // ignore unknown props
            // stripUnknown: true // remove unknown props
        })
        next()
    } catch (err) {
        const errorArr = [];
        let names = [];
        err.inner.forEach((e) => {
            names.push(e.path)
            errorArr.push({
                name: e.path,
                message: e.message,
            });
        });
        const errorName = [...new Set(names)]

        let errors = {}
        errorName.map(item => {
            // const filterErrors = errorArr.filter(e => e.name === item )
            let message = []
            errorArr.map(e => {
                if (e.name === item) {
                    message.push(e.message)
                }
            })
            errors = {...errors, [item]: message}
        })
        const error = new Error("خطا در اعتبار سنجی")
        error.errors = errors
        error.statusCode = 422
        next(error)
    }

}