import { Photo } from "../types/types";
import { useRemovePhotoMutation } from "../store";
import { GoSync } from "react-icons/go";

interface PhotoItemProps {
    photo: Photo,
}

function PhotoItem({ photo }: PhotoItemProps) {
    const [removePhoto, removePhotoResults] = useRemovePhotoMutation();

    const handleDeletePhoto = () => {
        removePhoto(photo);
    }

    return (
        <div className="relative group">
            <img
                className="m-5 w-[400px] h-[280px] group-hover:opacity-75"
                key={photo.id}
                src={photo.url}
                alt="Фото"
            />
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer" onClick={handleDeletePhoto}>
                <button
                    className="bg-red-500 text-white p-2 w-10 rounded-full"
                >
                    {removePhotoResults.isLoading ? <GoSync className="animate-backspin"/> : "X"}
                </button>
            </div>
        </div>
    )
}

export default PhotoItem;
