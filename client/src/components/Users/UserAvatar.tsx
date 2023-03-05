import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';

export const UserAvatar = ({
  profileImageUrl,
  userFirstName,
}: {
  profileImageUrl: string;
  userFirstName: string;
}) => {
  if (profileImageUrl === '') {
    return <AccountCircleIcon />;
  } else {
    return <Avatar alt={userFirstName} src={profileImageUrl} />;
  }
};
