import React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";

const SearchComponent = (props) => {
  return (
    <View>
      <View style={styles.container}>
        <TextInput
          placeholder="Personaje"
          style={styles.formField}
          placeholderTextColor={"#888888"}
          onChangeText={(text) => props.function(text)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  formField: {
    width: 400,
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    backgroundColor: "white",
    borderColor: "#888888",
    fontSize: 18,
    height: 50,
  },
});

export default SearchComponent;
