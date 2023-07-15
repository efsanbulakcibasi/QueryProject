import { useAddAlbumsMutation, useFetchAlbumsQuery, useRemoveAlbumsMutation } from "../store";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Skeleton from '@mui/material/Skeleton';
import AlbumListItem from "./AlbumListItem";


function AlbumList({ user }) {
  const { data, isError, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, result] = useAddAlbumsMutation();

  const handleAlbumAdd = () => {
    addAlbum(user);
  };
  let content;
  if (isFetching) {
    content = (
      <Skeleton variant="rounded" sx={{ width: '100%', height: '100px' }} />
    );
  } else if (isError) {
    content = <div>Hata Var</div>;
  } else {
    content = data.map((album) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  } 
  return (
    <>
      <div>
        <div className="topArrangment">
          <h1>{user.name} Albümü</h1>
          <Button variant="outlined" onClick={handleAlbumAdd}>
            {result.isLoading ? <CircularProgress /> : <span>Albüm Ekle+</span>}
          </Button>
        </div>
      </div>
      <div>{content}</div>
    </>
  );
}

export default AlbumList;
