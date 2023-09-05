import { User } from "../types/types";
import { GoTrash } from 'react-icons/go';
import Button from "./Button";
import useThunk from "../hooks/useThunk";
import { removeUserThunk } from "../store";
import ExpandablePanel from "./ExpandablePanel";
import AlbumsList from "./AlbumsList";

interface UsersListItemProps {
    user: User,
}

function UsersListItem({ user }: UsersListItemProps) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUserThunk, user.id, 1000);

    const handleClick = () => {
        doRemoveUser(user);
    };

    const header = (
        <>
            <Button className="w-auto h-full rounded" danger loading={isLoading} onClick={handleClick}>
                <GoTrash size={20} />
            </Button>
            <h1 className="text-2xl ml-5">{user.name}</h1>
        </>)

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user}/>
        </ExpandablePanel>
    )
}

export default UsersListItem;