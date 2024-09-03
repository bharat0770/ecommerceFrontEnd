import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
const TransactionsTable = ({ data }) => {
    return (_jsx(Paper, { children: _jsxs(Table, { children: [_jsx(TableHead, { children: _jsxs(TableRow, { children: [_jsx(TableCell, { children: "Transaction ID" }), _jsx(TableCell, { children: "Discount" }), _jsx(TableCell, { children: "Amount" }), _jsx(TableCell, { children: "Status" })] }) }), _jsx(TableBody, { children: data.map((transaction) => (_jsxs(TableRow, { children: [_jsx(TableCell, { children: transaction.id }), _jsx(TableCell, { children: transaction.discount }), _jsx(TableCell, { children: transaction.amount }), _jsx(TableCell, { children: transaction.status })] }, transaction.id))) })] }) }));
};
export default TransactionsTable;
