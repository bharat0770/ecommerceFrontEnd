import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
const transactionCard = ({ id, name, amount, discount, status, handler }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: 'transaction-items', children: [_jsxs("span", { children: ["orderId : ", id] }), _jsxs("span", { children: ["name : ", name] }), _jsxs("span", { children: ["amount : ", amount] }), _jsxs("span", { children: ["discount : ", discount] }), _jsxs("span", { children: ["status :", _jsxs("span", { className: `${status === "processing" ? "red" : status === "shipped" ? "green" : "purple"}`, children: ["  ", status] })] }), _jsx("span", { children: _jsx("button", { className: "transaction-manage", onClick: () => {
                            console.log("handler with id", id);
                            handler(id);
                        }, children: "manage" }) })] }) }));
};
export default transactionCard;
