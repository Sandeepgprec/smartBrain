const Clarifai =require('clarifai');
const app=new Clarifai.App({
    apiKey : '519a25bca0ed49cab57e2c4e7143af19'
  });
 
 
  const handleApiCall=(req,res)=>{
  app.models
            .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
            .then(data=>{
                res.json(data)
            })
            .catch(err=>res.status(400).json('unable to work with api'))
    }

const handleImage=(req,res,db)=>{
    const {id}=req.body;
    db('users').where('id','=',id).increment('entries',1).returning('entries')
    .then(entries=>res.json(entries))
    .catch(err=>res.status(400).json('unable to count entries'));
}
module.exports={
    handleImage:handleImage,
    handleApiCall:handleApiCall
}