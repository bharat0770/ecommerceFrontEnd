import { cartItem, ShippingInfo, User } from "./types";

export interface userReducerInitialState  {
    user :  User | null,     
    loading :  boolean, 
}   
export interface cartReducerInitialState{
    loading  : boolean, 
    cartItems : cartItem[], 
    subTotal  : number, 
    tax  : number, 
    discount :  number, 
    shippingCharges : number, 
    total : number, 
    shippingInfo : ShippingInfo,
    
}   