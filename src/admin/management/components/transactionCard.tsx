import React from 'react'; 
type orderProps = {
id : string;
name : string;
amount : number;
discount : number;
status : string;
handler : (id) => void; 
}

const transactionCard = ({id, name, amount, discount, status, handler} : orderProps) => {
    return (
        <>
            <div className='transaction-items'>
            <span>orderId : {id}</span>
            <span>name : {name}</span>
            <span>amount : {amount}</span>
            <span>discount : {discount}</span>
            <span>
                status : 
            <span className={`${status==="processing"? "red" : status==="shipped"? "green":"purple"}`}>  {status}</span>
            </span>
            <span>
                <button className="transaction-manage" onClick={() => {
                console.log("handler with id", id); 
                handler(id)}}>manage</button>
            </span>
            </div>
        </>
    )
}; 
export default transactionCard;
