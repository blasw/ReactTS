import { User } from "../types/types";
import { useFetchAlbumsQuery, useCreateAlbumMutation, useRemoveAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import Button from "./Button";
import { Album } from "../types/types";
import { GoTrash} from "react-icons/go";
import AlbumsListItem from "./AlbumsListItem";

interface AlbumsListProps {
    user: User,
}

function AlbumsList({user} : AlbumsListProps) {
    const {data, error, isLoading} = useFetchAlbumsQuery(user);
    const [createAlbum, createAlbumResults] = useCreateAlbumMutation();

    const handleCreateAlbum = () : void => {
        createAlbum(user);
    }

    let content;

    if(isLoading) {
        content = <Skeleton className={"w-full mb-4 h-10"} times={3}/>
    } else if ( error ) {
        content = <div>Error loading albums</div>
    } else {
        content = data.map((album : Album)=>{
            return <AlbumsListItem album={album} key={album.id}/>
        })
    }

    return(
        <div>
            <div className="flex flex-row justify-between items-center m-2">
                <h1 className="ml-10 font-bold text-black">Albums for {user.name}</h1>
                <Button loading={createAlbumResults.isLoading} onClick={handleCreateAlbum} className="mr-10" rounded secondary outline>
                    <h1 className="text-black flex items-center font-bold">
                        <span className="text-xl mr-[1px]">+</span>Add album
                    </h1>
                </Button>
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}

export default AlbumsList;

