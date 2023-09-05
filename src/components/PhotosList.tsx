import { Album } from "../types/types";
import Skeleton from "./Skeleton";
import { useFetchPhotosQuery, useCreatePhotoMutation } from "../store";
import { Photo } from "../types/types";
import Button from "./Button";
import PhotoItem from "./PhotoItem";

interface PhotosListProps {
    album: Album    
}

function PhotosList({album} : PhotosListProps) {
    const {data, error, isLoading} = useFetchPhotosQuery(album);
    const [createPhoto, createPhotosResults] = useCreatePhotoMutation();

    const handleCreatePhoto = () : void => {
        createPhoto(album);
    }

    let content;

    if(isLoading){
        content = (
            <h1>Loading</h1>
        )
    } else if (error) {
        content = (
            <h1>Error accured</h1>
        )
    } else {
        console.log(data);
        content = (
            data.map((photo : Photo)=>{
                return(
                    <PhotoItem key={photo.id} photo={photo}/>
                )
            })
        )
    }

    const header = (
        <Button loading={createPhotosResults.isLoading} className="mb-10" secondary rounded onClick={handleCreatePhoto}>ADD PHOTO</Button>
    )

    return(
        <div className="flex flex-col items-center">
            {header}
            <div className="flex flex-wrap">
                {content}
            </div>
            
        </div>
    )
}

export default PhotosList;