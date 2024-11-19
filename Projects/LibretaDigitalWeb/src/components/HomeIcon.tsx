import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon, SizeProp } from "@fortawesome/react-fontawesome";

interface HomeIconProps {
  color?: string;
  size?: SizeProp;
  className?: string;
}

const HomeIcon: React.FC<HomeIconProps> = ({
  color = "white",
  size = "lg",
  className = "p-1 w-6",
}) => {
  return (
    <FontAwesomeIcon
      icon={faHome}
      color={color}
      size={size}
      className={className}
    />
  );
};

export default HomeIcon;
