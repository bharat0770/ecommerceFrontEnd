import React from 'react'
import { useAllUsersQuery, useDeleteUserMutation } from '../../redux/api/user';
import { FaTrash } from 'react-icons/fa';
import { useDeleteOrderMutation } from '../../redux/api/order';
import { useSelector } from 'react-redux';
import { userReducerInitialState } from '../../types/reducer-types';
type props = {
    id  : string;
    name : string;
    photo :  string; 
    email : string;
    deleteHandler : (userEmail : string) => void; 
}

const  customers = () => {
    const {user} = useSelector((state : {userReducer : userReducerInitialState}) => state.userReducer)
    const {data} = useAllUsersQuery(user?.email!);
    const [deleteUser] = useDeleteUserMutation(); 
    const deleteHandler = (userEmail : string) => {
    let res  = deleteUser({userEmail, email : user?.email!})
    console.log(res); 
    }
    return (
        <>
        <div className="customers-all">
        {data?.message.map((i)=> (
            <UserCard
            id = {i._id}
            name = {i.name}
            photo = {i.photo}
            email = {i.email}
            deleteHandler={deleteHandler}
            />
        ))}
        </div>
        </>
)
}

export default customers; 


const UserCard= ({ id, name, photo, email, deleteHandler}: props) => {
    return (
        <>
            <div className="customer-info">
                <img
                    src={photo}
                    alt="user image"
                />
                <p>{name}</p>
                <p>{email}</p>
                <button className="del-customer-btn" onClick={() => {deleteHandler(email)}}><FaTrash/></button>
            </div>
        </>
    );
};