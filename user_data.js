const users =[
    {
        user_mail: "mohit@1.com",
        user_pswd: "1234",
        user_name: "mohit",
        total_points:12,
        coupons_uploaded:{
           count:2,
           coupons:[3,4]
        },
        coupons_received:{
            count:3,
           coupons:[2,3,5]  
        },
        liked_coupons:[2,4]
    },
    {
        user_mail: "mohit@2.com",
        user_pswd: "2345",
        user_name: "mohit2",
        total_points:60,
        coupons_uploaded:{
           count:4,
           coupons:[5,6,1,2]
        },
        coupons_received:{
            count:3,
           coupons:[1,3,4]      
    },
        liked_coupons:[2,4]
    },
    {
        user_mail: "mohit@3.com",
        user_pswd: "3456",
        user_name: "mohit3",
        total_points:0,
        coupons_uploaded:{
           count:0,
           coupons:[]
        },
        coupons_received:{
            count:0,
           coupons:[]
        },
        liked_coupons:[2]
    }

];

export default users