import { Checkbox, HStack, Radio } from "native-base";
import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import IconFont from "react-native-vector-icons/FontAwesome5";
import EStyleSheet from "react-native-extended-stylesheet";

type AccordionContentProps = {
  name?: string;
  icon?: string;
  id?: string;
  deleteHandle?: () => void
};

export function AccordionContact({ name, icon, id, deleteHandle }: AccordionContentProps) {
  return (
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        paddingHorizontal: 10,
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
        <IconFont name={"car-alt"} size={30} color={"black"} />
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
          }}
        >
          <Text style={{ color: "black", fontSize: 15 }}> {name} </Text>
        </View>
        <View>
          
        </View>
        <View style={styles.toogleStyle}>
          <HStack space={8}>
          <Radio value={id ?? ""} my={1} accessibilityLabel="checkbox" />
          </HStack>
          <TouchableOpacity onPress={() => deleteHandle && deleteHandle()}>
            <IconFont
              
              style={{
                marginLeft: 10
              }}
                  name="trash"
                  size={20}
                  color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  toogleStyle: {
    flex: 1,
    marginRight: 10,
    justifyContent: "flex-end",
    alignItems: 'center',
    flexDirection: 'row'
  },
});

export default AccordionContact;
