import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CharBox = (props) => {
  const navigation = useNavigation();
  const [icon, setIcon] = React.useState(false);
  const [charbox, setCharbox] = React.useState([]);

  //DELETe

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("Character", {
          name: props.name,
          image: props.imageSrc,
          status: props.status,
          type: props.type,
          genre: props.genre,
          specie: props.specie,
        })
      }
    >
      <Image
        source={{
          uri: props.imageSrc,
        }}
        style={styles.charImage}
      />
      <View style={styles.description}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              height: 5,
              width: 5,
              backgroundColor: "black",
              marginRight: 5,
            }}
          />
          <Text>{props.specie}</Text>
        </View>

        <Text style={{ fontSize: 18 }}>{props.name}</Text>
        <Text style={{ fontSize: 12 }}>{props.status}</Text>
        <Text style={{ fontSize: 12 }}>{props.type}</Text>
        <Text style={{ fontSize: 12 }}>{props.genre}</Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => setIcon(!icon)}
          onPressIn={() =>
            setCharbox({ name: props.name, image: props.imageSrc })
          }
        >
          <Ionicons
            name={icon ? "heart" : "heart-outline"}
            size={25}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CharBox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,

    shadowOffset: { height: 10, width: 0 },
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 10,
  },
  charImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
    resizeMode: "cover",
  },
  description: {
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
});
