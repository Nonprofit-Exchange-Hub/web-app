import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar } from '@mui/material';

type UserAvatarProps = {
  profileImageUrl: string;
  userFirstName: string;
  style?: React.CSSProperties; // Added this line for the style prop
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  profileImageUrl,
  userFirstName,
  style = {}, // Default empty object if not provided
}) => {
  const defaultStyle = {
    backgroundColor: 'yourColorHere', // Replace 'yourColorHere' with your desired color
    ...style, // This will override the backgroundColor if provided in the style prop
  };

  if (profileImageUrl === '') {
    return <AccountCircleIcon style={defaultStyle} />;
  } else {
    return <Avatar alt={userFirstName} src={profileImageUrl} style={defaultStyle} />;
  }
};
