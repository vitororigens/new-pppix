import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import IconFont from "react-native-vector-icons/Feather";

type AccordionContentProps = {
  name?: string;
  color?: string;
  subTitle?: string;
  fontSize?: number;
  tag: string;
  phone: string;
};

export function AccordionContent({
  name,
  color,
  subTitle,
  fontSize,
  tag,
  phone
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
          <Text style={{ color: color || "white", fontSize: fontSize || 15 }}>
            {phone}
          </Text>

          <Text
            style={{
              color: "#ccdaff",
              fontSize: 12,
            }}
          >
            {name}({tag})
          </Text>
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

export default AccordionContent;
