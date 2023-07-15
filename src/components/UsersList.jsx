import { useFetchUsersQuery,useAddUserMutation } from '../store';
import Skeleton from '@mui/material/Skeleton';
import UsersListItem from './UserListItem';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function UsersList() {
  const { data, isError, isFetching } = useFetchUsersQuery();
  //Eklemeyi sağlayacak fonksiyon,result döner(data içindeki şeyler ve yükleniyor durumu)
  //result döner,eklemeyi sağlayan method addUser
  const [addUser,result] = useAddUserMutation();
  const handleUserAdd = () => {
    addUser()
  }

  let content;
  if (isFetching) {
    content = (
      <Skeleton variant="rounded" sx={{ width: '100%', height: '850px' }} />
    );
  } else if (isError) {
    content = <div>Hata Var</div>;
  } else {
    content = data.map((user) => {
      return <UsersListItem key={user.id} user={user} />;
    });
  } 
  return <div>
    <div className='topArrangment'>
      <h1>Kişiler</h1>
      <Button variant='outlined' onClick={handleUserAdd}>
        {result.isLoading?(
          <CircularProgress/>
        )
        :
        (
          <span>Kişi Ekle+</span>
        )
      }
        </Button>
    </div>
    {content}
    </div>;
}

export default UsersList;
