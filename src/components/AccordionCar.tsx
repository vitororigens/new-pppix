import { HStack, Switch } from "native-base";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import IconFont from "react-native-vector-icons/Feather";
import EStyleSheet from "react-native-extended-stylesheet";
import * as Car from "../services/car.service";

// tipar o componente
type AccordionContentProps = {
  name: string;
  subTitle: string;
  plate: string;
  icon: string;
};

export function AccordionCar({
  name,
  icon,
  subTitle,
  plate,
}: AccordionContentProps) {
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
          <Text style={{ color: "white", fontSize: 15 }}>{name}</Text>
          <Text
            style={{
              color: "#ccdaff",
              fontSize: 12,
              // marginLeft: 2,
            }}
          >
            {subTitle} - {plate}
          </Text>
        </View>

        <View style={styles.toogleStyle}>
          <HStack space={8}>
            <Switch size="sm" offTrackColor="white" onTrackColor="#9900cc" />
          </HStack>
        </View>
      </View>

      <View>
        <TouchableOpacity>
          <IconFont name={"more-vertical"} size={20} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  toogleStyle: {
    flex: 1,
    // borderWidth: 1,
    marginRight: 10,
    // width: "30%",
    alignItems: "flex-end",
  },
});

export default AccordionCar;
