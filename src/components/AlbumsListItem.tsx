import Button from "./Button";
import ExpandablePanel from "./ExpandablePanel";
import {Album} from "../types/types";
import {GoTrash} from "react-icons/go";
import {useRemoveAlbumMutation} from "../store";
import PhotosList from "./PhotosList";


interface AlbumsListItemProps {
    album: Album
}

function AlbumsListItem({album} : AlbumsListItemProps) {
    const [deleteAlbum, deleteAlbumResults] = useRemoveAlbumMutation();

    const handleDeleteAlbum = () => {
        deleteAlbum(album);
    }

    let header = (
        <div className="flex flex-row gap-2">
            <Button loading={deleteAlbumResults.isLoading} onClick={handleDeleteAlbum} danger secondary
                    className="w-10 rounded-md">
                <GoTrash size={60} className="h-full w-full"/>
            </Button>

            <p>{album.title}</p>
        </div>)

    return <ExpandablePanel key={album.id} header={header}>
        <PhotosList album={album}/>
    </ExpandablePanel>
}

export default AlbumsListItem;