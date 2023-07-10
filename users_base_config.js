import mongoose from 'mongoose';
import users_list from './user_data.js';

async function main() {
    await mongoose.connect('mongodb+srv://vijesh:Mohit%40123@couponsitecluster.hduf0ay.mongodb.net/coupon_base?retryWrites=true');
}

main().then(() => console.log("connection_success")).catch(err => console.log(err));



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

users_list.forEach(single_user => {
    const our_data = new user(single_user);
    our_data.save();
})


