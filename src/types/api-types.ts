import { cartItem, order, orderItem, Product, ShippingInfo, User } from "./types";
// for users

export type MessageResponse =  {
    success : boolean; 
    message : string;
}
export type allUserResponse =  {
    success : boolean; 
    message : User[];
}
export type deleteUserResponse = {
    success : boolean;  
    message : string;
}
export type deleteUserRequest = {
    email : string; 
    userEmail : string;
}


// for products
export type allProductResponse = {
    success : boolean; 
    message : Product[];
}

export type categoriesResponse= {
    success : boolean; 
    message : string[];
}
export type customError= {
    status : number, 
    data :{success : boolean,  
        message : string}, 
    }
    
    export type searchProductResponse = {
        status : number; 
        message :  Product[];
        totalPages  : number;  
        
    } 
    export type searchProductRequest = {
        price : number;
        page : number;
        category : string;
        search : string;
        sort : string;
    } 
    export type newProductRequest = {
        email : string; 
        formdata  : FormData; 
    } 
    export type productDetailResponse = {
        success : boolean; 
        message  : Product; 
    } 
    
    export type updateProductRequest = {
        id : string; 
        email  :  string; 
        formdata : FormData; 
    }
    
    export type deleteProductRequest = {
        email  :  string; 
        id : string;
    }
    
    // for orders
    export type newOrderRequest = {
        shippingInfo :  ShippingInfo; 
        orderItems : cartItem[]; 
        user : string,
        subTotal : number , 
        tax : number ,
        shippingCharges : number,
        discount : number,
        total : number, 
}


export type allOrderResponse = {
    sucess : boolean; 
    message : order[]; 
} 

export type singleOrderResponse = {
    sucess : boolean; 
    message : order; 
} 


// export type updateOrderRequest = {
//     orderId :  string;
// }