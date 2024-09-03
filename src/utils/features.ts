import moment from "moment"

export const getMonths  = () => {
    let currentDate = moment(); 
    currentDate.date(1); 
    const last6months : string[]= []; 
    const last12months : string[]= []; 
    for(let i = 0; i < 6; i++){
        const monthDate = currentDate.clone().subtract(i, "months"); 
        const monthName = monthDate.format("MMMM"); 
        last6months.unshift(monthName);
    }
    for(let i = 0; i < 12; i++){
        const monthDate = currentDate.clone().subtract(i, "months"); 
        const monthName = monthDate.format("MMMM"); 
        last12months.unshift(monthName);
    }


    return {
    last6months : last6months, 
    last12months : last12months
    }
}
