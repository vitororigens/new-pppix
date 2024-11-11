import { HStack, Switch } from "native-base";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import IconFont from "react-native-vector-icons/FontAwesome5";
import EStyleSheet from "react-native-extended-stylesheet";

type AccordionContentProps = {
  name: string;
  subTitle: string;
  icon: string;
  cor: string;
  marca: string;
};

export function NofityCars({ name, icon, subTitle, cor, marca }: AccordionContentProps) {
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
        <IconFont name={"car"} size={30} color={"black"} />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "black", fontSize: 15 }}> {name} </Text>
          <Text
            style={{
              color: "black",
              fontSize: 12,
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            {subTitle}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 12,
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            {cor}
          </Text>
          <Text
            style={{
              color: "black",
              fontSize: 12,
              marginTop: 3,
              marginLeft: 5,
            }}
          >
            {marca}
          </Text>
        </View>
      </View>

      {/* <View>
        <TouchableOpacity>
          <IconFont name={"more-vertical"} size={20} color={"white"} />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = EStyleSheet.create({
  toogleStyle: {
    flex: 1,
    marginRight: 10,
    alignItems: "flex-end",
  },
});

export default NofityCars;
