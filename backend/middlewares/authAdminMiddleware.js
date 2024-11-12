import jwt from "jsonwebtoken"

//admin authentication middleware- 
const authAdmin = async(req,res,next) => {
    try {
        const {admintoken} = req.headers;
        if(!admintoken){
            res.json({success:false,message:"Not Authorized Login Again"})
        }

        // verify the token -
        // first - decode this admintoken i mean verify the admintoken via jwt secret key which is in .env file .
        const token_decode = jwt.verify(admintoken, process.env.JWT_SECRET_KEY)

        // second - compare the decoded token(token_decode) with admin email and password 
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            res.json({success:false,message:"Not Authorized Login Again"})
        }
        
        next() 

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export default authAdmin;
