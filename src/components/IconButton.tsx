import { TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface IIconButton {
  onClick?: () => void;
  bgColor?: string;
  color?: string;
  icon: string;
  marginLeft?: number;
  marginRight?: number;
}

const IconButton: React.FC<IIconButton> = ({
  onClick,
  bgColor,
  color,
  icon,
  marginLeft,
  marginRight,
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: bgColor || "#8257E5",
        width: 50,
        height: 50,
        borderRadius: 50,
        marginLeft: marginLeft || 10,
        marginRight: marginRight || 10,
      }}
    >
      <View
        style={{
          padding: 14,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name={icon} size={20} color={color || "white"} />
      </View>
    </TouchableOpacity>
  );
};

export default IconButton;
