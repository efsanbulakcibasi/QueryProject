import { useAddAlbumsMutation, useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import PhotoListItem from "./PhotoListItem";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from '@mui/material/Skeleton';
import Button from "@mui/material/Button";



function PhotoList({album}) {
  const { data, isError, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, result] = useAddPhotoMutation();

  const handlePhotoAdd = () => {
    addPhoto(album);
  };
  let content;
  if (isFetching) {
    content = (
      <Skeleton variant="rounded" sx={{ width: '150px', height: '150px' }} />
    );
  } else if (isError) {
    content = <div>Hata Var</div>;
  } else {
    content = data.map((photo) => {
      return <PhotoListItem key={photo.id} photo={photo} />;
    });
  } 
  return (
    <>
    <div>
      <div className="topArrangment">
        <h1>{album.name} Fotoğrafları</h1>
        <Button variant="outlined" onClick={handlePhotoAdd}>
          {result.isLoading ? <CircularProgress /> : <span>Fotoğraf Ekle+</span>}
        </Button>
      </div>
    </div>
    <div className="fotoDiv">{content}</div>
  </>
  )
}

export default PhotoList