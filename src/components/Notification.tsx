import React from "react";
import { Text,  View } from "react-native";
import IconFont from "react-native-vector-icons/Feather";
import EStyleSheet from "react-native-extended-stylesheet";

type AccordionContentProps = {
  name: string;
  icon: string;
};

export function Notification({ name, icon }: AccordionContentProps) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 25,
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
        <IconFont name={"user"} size={30} color={"black"} />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "black", fontSize: 15 }}>
            {" "}
            {name} emitiu um SOS
          </Text>
        </View>
        <View style={styles.toogleStyle}>
          
        </View>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  toogleStyle: {
    marginRight: 10,
    alignItems: "flex-end",
  },
});

export default Notification;
