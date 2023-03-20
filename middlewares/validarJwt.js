const jwt = require ("jsonwebtoken");

const validarJwt=(req,res,next)=>{
    const token =req.header("x-token")

    if (!token){
        return res.status(401).json({
            ok:false,
            msg:"no hay token en la peticion",
        })
    }
    try{
        const payload= jwt.verify(token,process.env.JWT_SECRET_KEY)

        req.uid=payload.uid
        req.name=payload.name             //dependera tambien de la creacion de nuestro userSchema
    } catch(error){
        return res.status(500).son({
            ok:false,
            msg:"el token no es válido contacte con el administrador"
        })
    }

    next()
}

module.exports={
    validarJwt,
}