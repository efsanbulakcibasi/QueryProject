import ExpandablePanel from "./ExpandablePanel";
import { AiFillDelete } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";
import { useRemoveAlbumsMutation } from "../store";
import PhotoList from "./PhotoList";



function AlbumListItem({album}) {

  const [removeAlbum, result] = useRemoveAlbumsMutation();

    const handleClick = () => {
        removeAlbum(album);
      };

    const header = (
        <>
          <button
            style={{ margin: "30px", border: "none", backgroundColor: "lightgray" }}
            onClick={handleClick}
          >
            {result.isLoading ? <CircularProgress style={{width:"20px",height:"20px"}} /> : <AiFillDelete />}
          </button>
          {album.title}
        </>
      );
  return (
    <div>
    <ExpandablePanel header={header}>
      <PhotoList album={album} />
    </ExpandablePanel>
  </div>
  )
}

export default AlbumListItem