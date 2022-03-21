const axios = require('axios')
const userDetail = async (req, res, next)=>{
    try {
        const user = await axios.get('http://localhost:3001/user/profile',
            {headers: {authorization: req.headers.authorization}}
        )
        req.user = user.data.data
        next()
    }catch (err){
        console.log(err.response, err)
        if(err.response)
            return res.status(err.response.status).json({err: err.response.data.err})
        return res.status(400).json({err: err.message})
    }

}

module.exports = userDetail