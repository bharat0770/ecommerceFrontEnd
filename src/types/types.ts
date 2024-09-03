export type User = {
    name : string; 
    email : string; 
    photo : string;  
    gender : string; 
    role : string; 
    dob : string; 
    _id : string;   
}   
export type Product = {
    name : string; 
    price : number; 
    stock : number; 
    category : string; 
    photo : string; 
    _id : string;   
}   
    export type ShippingInfo = {
        address : string; 
        city : string; 
        state : string; 
        country : string; 
        pinCode : string; 
    }
export type cartItem = {
    productId : string; 
    price : number; 
    stock : any ;
    name : string; 
    photo : string; 
    quantity : number; 
}   


export type orderItem = {
    productId : string; 
    price : number; 
    name : string; 
    photo : string; 
    quantity : number; 
    _id : string; 
}
export type order = {
    _id : string; 
    shippingInfo : ShippingInfo; 
    orderItems : orderItem[]; 
    subTotal : number;
    tax : number; 
    shippingCharges : number; 
    discount : number; 
    total : number;
    status : string; 
    user :{
        _id :string; 
        name : string; 
    }; 
}

