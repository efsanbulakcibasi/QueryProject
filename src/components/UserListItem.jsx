import { useRemoveUserMutation } from "../store";
import AlbumList from "./AlbumList";
import ExpandablePanel from "./ExpandablePanel";
import { AiFillDelete } from "react-icons/ai";
import CircularProgress from "@mui/material/CircularProgress";

function UserListItem({ user }) {
  //ekleme işlemiyle benzer
  //tanımlamış olduğumuz fonksiyonun ismi,result içinde yüklendimi vs

  const [removeUser, result] = useRemoveUserMutation();

  const handleClick = () => {
    removeUser(user);
  };

  const header = (
    <>
      <button
        style={{ margin: "30px", border: "none", backgroundColor: "lightgray" }}
        onClick={handleClick}
      >
        {result.isLoading ? <CircularProgress style={{width:"20px",height:"20px"}} /> : <AiFillDelete />}
      </button>
      {user.name}
    </>
  );
  return (
    <div>
      <ExpandablePanel header={header}>
        <AlbumList user={user} />
      </ExpandablePanel>
    </div>
  );
}

export default UserListItem;
