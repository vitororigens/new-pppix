import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EStyleSheet from "react-native-extended-stylesheet";
import { useNavigation } from "@react-navigation/native";
import AccordionContact from "../components/AccordionContact";

export function CreateGroup() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={{ marginTop: 10 }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>Novo Grupo</Text>
        </View>

        <View style={styles.formStyle}>
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <TextInput placeholder="Nome do grupo" style={styles.formSenha} />
          </View>
          <ScrollView
            style={{
              maxHeight: "65%",
              width: "100%",
              marginTop: 20,
            }}
          >
            <AccordionContact name={"Bruno"} icon={""} />
            <AccordionContact name={"Cristino"} icon={""} />
            <AccordionContact name={"Lucas"} icon={""} />
            <AccordionContact name={"Travis"} icon={""} />
            <AccordionContact name={"Curry"} icon={""} />
            <AccordionContact name={"Lebron"} icon={""} />
            <AccordionContact name={"a"} icon={""} />
          </ScrollView>
        </View>
      </View>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("Group")}
      >
        <View style={styles.containerButton}>
          <Text style={styles.textButton}>Confirmar</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5372ef",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    marginTop: "5rem",
    height: "25rem",
    width: "19.7rem",
    borderRadius: "2rem",
    backgroundColor: "#fff",
    padding: "1rem",
  },
  formStyle: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "1.5rem",
    width: "17rem",
  },
  formText: {
    fontSize: "1rem",
    color: "#C4BABA",
  },
  formSenha: {
    marginTop: "1rem",
    borderWidth: 1,
    borderColor: "#c0d3ff",
    borderRadius: 30,
    paddingHorizontal: "1.5rem",
    width: "100%",
    height: 50,
  },
  formEmail: {
    marginTop: "1rem",
    borderWidth: 1,
    borderColor: "#c0d3ff",
    borderRadius: 30,
    paddingHorizontal: "1.5rem",
    width: "100%",
    height: 50,
  },
  containerButton: {
    width: "19.7rem",
    borderRadius: 30,
    marginTop: "1.5rem",
    backgroundColor: "#7aa2ff",
    height: "4rem",
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CreateGroup;
