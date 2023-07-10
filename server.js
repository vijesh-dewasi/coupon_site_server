import json from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';


const app = express();
const port = process.env.PORT  

app.use(cors({
    origin: "*",
}));
app.use(express.json())

async function main() {
   const conn= await mongoose.connect('mongodb+srv://vijesh:Mohit%40123@couponsitecluster.hduf0ay.mongodb.net/coupon_base?retryWrites=true');
   
}

main().then(() =>{
     console.log("connection_success")
}).catch(err => console.log(err));
//couon_model
const couponsSchema = new mongoose.Schema(
    {
        coupon_id: { type: Number, required: true ,unique:true},
        brand: { type: String,default:"" },
        isverified: { type: Boolean, required: true },
        islimited: { type: Boolean, required: true },
        coupon_title: { type: String, required: true },
        coupon_desc: { type: String, required: true },
        logo_url: { type: String, required: true },
        coupon_code: { type: String, required: true },
        availability: { type: String, required: true },
        redirection_link: { type: String, required: true }, 
        coupon_code: {type: String , required: true},  
        category: {type: String,required:true},
        like_count:{type:Number,default:0}
    }
);



const Coupon = mongoose.model('Coupon',couponsSchema);


//user model

const userSchema = new mongoose.Schema(
    {
        user_mail: { type: String, required: true, unique: true },
        user_pswd: { type: String, required: true },
        user_name: { type: String, required: true },
        total_points: { type: Number, default: 0 },

        coupons_uploaded: {
            count: { type: Number, default: 0 },
            coupons:
            {
                type: [Number]
            }
        },
        coupons_received: {
            count: { type: Number, default: 0 },
            coupons: {
                type: [Number]
            }
        },
        liked_coupons: {
            type: [Number]
        }
    }
);

const user = mongoose.model('user', userSchema);


async function all_find(){
    await  Coupon.find({}).exec().then((res)=>{
        return res;
    });
}

async function find_most_liked(){
    await  Coupon.find({}).limit(3).sort({like_count : -1}).exec().then((res)=>{
        return res;
    });
}

async function find_limited(){
    await  Coupon.find({}).limit(3).where({islimited: 1}).exec().then((res)=>{        
        return res
    });
}


app.post('/addcoupon',function(req,res){
    
    const coupon_body=req.body;
    
    const coupon_to_upload={
        coupon_id: null,
        brand: coupon_body.company_name,
        isverified:coupon_body.isverified,
        islimited: coupon_body.islimited,
        coupon_title: coupon_body.coupon_title,
        coupon_desc: coupon_body.coupon_desc,
        logo_url: "/images/demo.jpeg",
        coupon_code: coupon_body.coupon_code,
        availability: coupon_body.validupto,
        redirection_link: coupon_body.redirection_link, 
        coupon_code: coupon_body.coupon_code,  
        category:"electronics"
    }

    console.log(coupon_body.user)
    
    Coupon.countDocuments().then((count)=>{
        coupon_to_upload.coupon_id=count+1;
        const our_data = new Coupon(coupon_to_upload);
        our_data.save();
      });
      
 res.send(JSON.stringify({status:"done"}))
    })
    

app.post('/login',function(req,res){

    const result={
     is_auth :0
    }
    const user_req=req.body

    const user_object={
        user_mail: user_req.mail,
        user_pswd: user_req.pass,
        user_name: user_req.mail
    }

    user.find().where(user_object).exec().then((resp)=>{
        console.log(resp)
        res.send(JSON.stringify(resp))
    });
   


})

app.post('/signup',function(req,res){
    
    const new_user =req.body
    
    const new_user_object={
        user_mail: new_user.mail,
        user_pswd: new_user.pass,
        user_name: new_user.mail
    }

    const our_data = new user(new_user_object);
    our_data.save();

    res.send(JSON.stringify({
        hello:"hello"
    }))   
})

app.post('/review',function(req,res){
    res.send(JSON.stringify({
        hello:"hello"
    }))
})

app.get('/categories', (req, res) => {
  const cat_list=["electronics","stores","furniture","mobile"];
  res.send(cat_list);
})

app.get('/categories/:category', async (req, res) => {
   const categort_name=req.params.category;
   
   await  Coupon.find({}).where({"category": categort_name}).exec().then((resp)=>{        
    res.send(resp)    
   });

})

app.get('/brandstore', async (req, res) => {
    await  Coupon.find({}).where({brand:{$ne :""}}).exec().then((resp)=>{        
        
        res.send(resp)
     });
})

app.get('/tab_filters/:filter_name', async (req, res) => {
    const filter_name = req.params.filter_name;
  
    if (filter_name === "limited") {
        await  Coupon.find({}).limit(3).where({islimited: 1}).exec().then((resp)=>{        
           res.send(resp)
        });
    }
    else if (filter_name === "mostLiked") {
      await  Coupon.find({}).limit(3).sort({like_count : -1}).exec().then((resp)=>{
        res.send(resp)
    });
    }
    else {
        await  Coupon.find({}).exec().then((resp)=>{
            res.send(resp)
        });
    }
   
})

app.listen(port || 5000, () => {
    console.log("server up and running")
})