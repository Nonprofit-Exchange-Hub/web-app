import { useParams } from 'react-router-dom';

function User() {
  const { id } = useParams<{ id: string }>();

  if (id) {
    return <div>{`User Profile ${id}`}</div>;
  } else {
    return <div>My Profile</div>;
  }
}

export default User;
