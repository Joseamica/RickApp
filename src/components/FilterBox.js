import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const FilterBox = (props) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);

  const items = data.map((item, index) => {
    return <Picker.Item key={index} label={item.name} value={item.name} />;
  });

  React.useEffect(() => {
    console.log(choosenLabel);
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((json) => {
        setData(json.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const [filter, setFilter] = React.useState(false);
  const [choosenLabel, setChoosenLabel] = useState("Native");
  const [choosenIndex, setChoosenIndex] = useState("2");
  const [all, allData] = useState([]);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={() => setFilter(!filter)}
      >
        <Text style={{ marginLeft: 50 }}>{props.text}</Text>
        <TouchableOpacity style={styles.downArrow}>
          <MaterialIcons name="keyboard-arrow-down" size={30} color="red" />
        </TouchableOpacity>
      </TouchableOpacity>
      {filter ? (
        <Picker
          selectedValue={choosenLabel}
          onValueChange={(itemValue, itemIndex) => {
            setChoosenLabel(itemValue);
            setChoosenIndex(itemIndex);
          }}
        >
          {items}
        </Picker>
      ) : null}
    </>
  );
};

export default FilterBox;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: "80%",
    borderRadius: 100,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#999",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  downArrow: { marginRight: 10 },
});
