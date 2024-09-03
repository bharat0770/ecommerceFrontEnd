import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

const TransactionsTable = ({ data }) => {
    return (
        <Paper>
            <Table>
                <TableHead>
                    <TableRow  >
                        <TableCell>Transaction ID</TableCell>
                        <TableCell>Discount</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((transaction) => (
                        <TableRow key={transaction.id}>
                            <TableCell>{transaction.id}</TableCell>
                            <TableCell>{transaction.discount}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>{transaction.status}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default TransactionsTable;