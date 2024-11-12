import jwt from "jsonwebtoken"

//admin authentication middleware- 
const authUser = async(req,res,next) => {
    try {
        const {token} = req.headers;
        if(!token){
            res.json({success:false,message:"Not Authorized Login Again"})
        }

        // verify the token -
        // decode this token i mean verify the token via jwt secret key which is in .env file .
        const token_decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
         req.body.userId = token_decode.id;
        next() 

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authUser; 
 