import { useEffect } from "react";
import { fetchUsersThunk, addUserThunk } from "../store";
import { useAppSelector } from "../hooks/reduxHooks";
import useThunk from "../hooks/useThunk";
import { useThunkTuple } from "../hooks/useThunk";
import Button from "./Button";
import Skeleton from "./Skeleton";
import UsersListItem from "./UsersListItem";
import { User } from "../types/types";

function UsersList() {
    const [doFetchUsers, isFetchingUsers, fetchUsersError] : useThunkTuple = useThunk(fetchUsersThunk);

    const [doCreateUser, isCreatingUser, createUserError] : useThunkTuple = useThunk(addUserThunk);

    const {data} = useAppSelector((state) => {
        return state.users;
    })

    useEffect(()=>{
        doFetchUsers();
    }, []);

    const handleUserAdd = () => {
        doCreateUser();
    };

    const skele = (<Skeleton times={5} className="w-full h-10 mt-2"/>);

    if (fetchUsersError || createUserError) {
        return <div>{fetchUsersError ? fetchUsersError.message : createUserError?.message}</div>
    }

    const renderedUsers = data.map((user : User)=>{
        return <UsersListItem key={user.id} user={user}/>;
    });

    return(
        <div>
            <div className="flex flex-row justify-between m-3">
                <h1 className="m-2 text-xl">Users</h1>
                <Button loading={isCreatingUser} secondary outline rounded onClick={handleUserAdd} className="flex justify-center items-center">
                    <h1 className="font-bold text-black"><span className="text-xl">+</span> Add User</h1>
                </Button>
            </div>
            {isFetchingUsers ? skele : renderedUsers}
        </div>
    )
}

export default UsersList;