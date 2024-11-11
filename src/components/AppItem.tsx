import { View, Text, TouchableOpacity } from "react-native";
// import IconFont from "react-native-vector-icons/MaterialCommunityIcons";
import EStyleSheet from "react-native-extended-stylesheet";
import { Icon } from "native-base";

import Original from "../assets/original.svg";

export type AppItemProps = {
  icon: any;
  iconName: string;
  nameApp: string;
  lenghtApp: string;
  colorIcon?: string;
};

const AppItem = ({ iconName, nameApp, lenghtApp, colorIcon, icon }: any) => {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        // paddingHorizontal: 15,
        justifyContent: "space-between",
        marginVertical: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {/* <Original width={40} height={40} /> */}
        {icon}

        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "black", fontSize: 15 }}>{nameApp}</Text>

          <Text
            style={{
              color: "#adadad",
              fontSize: 12,
            }}
          >
            {lenghtApp} MB
          </Text>
        </View>
      </View>

      <View style={styles.addButton}>
        <TouchableOpacity>
          <View style={styles.styleButton}>
            <Text style={styles.addTextButton}>Copiar icone</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  addButton: {
    marginLeft: "2rem",
    borderColor: "#7aa2ff",
  },
  addTextButton: {
    color: "#7aa2ff",
    fontSize: 12,
  },
  styleButton: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    width: "5.6rem",
    height: "1.54rem",
    borderRadius: "2rem",
    borderColor: "#7aa2ff",
  },
});

export default AppItem;
