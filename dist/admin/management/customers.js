import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useAllUsersQuery, useDeleteUserMutation } from '../../redux/api/user';
import { FaTrash } from 'react-icons/fa';
import { useSelector } from 'react-redux';
const customers = () => {
    const { user } = useSelector((state) => state.userReducer);
    const { data } = useAllUsersQuery(user?.email);
    const [deleteUser] = useDeleteUserMutation();
    const deleteHandler = (userEmail) => {
        let res = deleteUser({ userEmail, email: user?.email });
        console.log(res);
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "customers-all", children: data?.message.map((i) => (_jsx(UserCard, { id: i._id, name: i.name, photo: i.photo, email: i.email, deleteHandler: deleteHandler }))) }) }));
};
export default customers;
const UserCard = ({ id, name, photo, email, deleteHandler }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "customer-info", children: [_jsx("img", { src: photo, alt: "user image" }), _jsx("p", { children: name }), _jsx("p", { children: email }), _jsx("button", { className: "del-customer-btn", onClick: () => { deleteHandler(email); }, children: _jsx(FaTrash, {}) })] }) }));
};
