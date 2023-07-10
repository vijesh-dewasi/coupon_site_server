import mongoose from 'mongoose';
import coupon_object from './couponObject.js';

async function main() {
    await mongoose.connect('mongodb+srv://vijesh:Mohit%40123@couponsitecluster.hduf0ay.mongodb.net/coupon_base?retryWrites=true');
}

main().then(() => console.log("connection_success")).catch(err => console.log(err));



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

var new_coupon_list=[];
var dummy_coupon={};


coupon_object.categories.forEach(category=>{
    const coupon_list=category.coupons;
    const category_name=category.id;
     coupon_list.forEach(coupon=>{
      dummy_coupon=coupon;
      dummy_coupon.category=category_name;
      dummy_coupon.like_count=0
      new_coupon_list.push(dummy_coupon);
    })
})


new_coupon_list.forEach(coupon=>{
const our_data = new Coupon(coupon);
our_data.save();
}
)

export default couponsSchema