import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"]
        // if (!authHeader) {
        //     const error = new Error("مجوز کافی ندارید!")
        //     error.statusCode = 401
        //     throw err
        // }

        const token = authHeader && authHeader.split(" ")[1]
        if (token == null) {
            const error = new Error("لطفا ابتدا وارد شوید.")
            error.statusCode = 401
            throw error
        }

        await jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decode) => {
            if (err) {
                const error = new Error("توکن منقضی شده است.")
                error.statusCode = 401
                next(error)
            }
            req.userId = decode.userId
            req.firstName = decode.firstName
            req.isAdmin = decode.isAdmin

            next()
        })

    } catch (err) {
        next(err)
    }
}

