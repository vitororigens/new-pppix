import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EStyleSheet from "react-native-extended-stylesheet";
import IconButton from "./IconButton";

export function Footer() {
  return (
    <SafeAreaView>
      <View style={styles.footer}>
        <View style={styles.hr} />
        <Text style={styles.or}>ou</Text>
      </View>

      <View style={styles.footerIcons}>
        <IconButton icon="facebook" />
        <IconButton icon="google" />
        <IconButton icon="twitter" />
      </View>
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  footer: {
    flex: 0,
    width: "100%",
  },
  hr: {
    position: "relative",
    top: 11,
    borderBottomColor: "#c1d4ff",
    borderBottomWidth: 1,
  },
  or: {
    width: 50,
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center",
    backgroundColor: "#f2f2f2",
  },
  footerIcons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "1rem",
  },
  iconsSpace: {
    marginHorizontal: 20,
  },
});
