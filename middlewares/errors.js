export const errorHandler = (error, req, res, next) => {
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    const errors = error.errors || undefined

    res.status(status).json({
        message, data, success: false, errors
    })
}