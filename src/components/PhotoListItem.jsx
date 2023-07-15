import { useRemovePhotoMutation } from "../store";
import CircularProgress from "@mui/material/CircularProgress";
import { AiFillDelete } from "react-icons/ai";

function PhotoListItem({ photo }) {
  const [removePhoto, results] = useRemovePhotoMutation();

  const handleRemovePhoto = () => {
    removePhoto(photo)
  }

  return (
    <div
    style={{ margin: '20px', cursor: 'pointer', position: 'relative' }}
    onClick={handleRemovePhoto}
  >
    <img src={photo.url} alt="" />
    <div className="deleteCircularDiv">
      {results.isLoading ? (
        <CircularProgress style={{ width: '20px', height: '20px' }} />
      ) : (
        <AiFillDelete className="deleteImg" />
      )}
    </div>
  </div>
  );
}

export default PhotoListItem;
