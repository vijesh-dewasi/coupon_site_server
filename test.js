const coupon={
    coupon_id: 1,
    brand: "flipkart",
    isverified: 1,
    islimited: 1,
    coupon_title: "20% off on purchasing at the max mrp",
    coupon_desc: "we make u fool very efficiently without leeting u know anything that called tactics with our specialized cell called chutiya banao meme nhi",
    logo_url: "/images/demo.jpeg",
    coupon_code: "1425654",
    availability: "24 days",
    redirection_link: "www.amazon.com"
}

const category_name="mobile";
var dummy_coupon={};
dummy_coupon=coupon;
dummy_coupon.category=category_name;
console.log(dummy_coupon)
