const jwt = require("jsonwebtoken");

const nuevoJwt = (uid, nombre) => {
    return new Promise((resolve, reject) => {
        let payload={ uid, nombre }             //El campo payload de JSON Web Token contiene la información real que se transmitirá a la aplicación
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5h" },
            (error, token) => {
                if (error) {
                    reject("el token no pudo ser creado")
                }
                resolve(token)
            }
        )
    })
}

module.exports = {
    nuevoJwt,
}