import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import CharBox from "../components/CharBox";
import FilterBox from "../components/FilterBox";

const FilterScreen = (props) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(false);
  const [choosenLabel, setChoosenLabel] = useState("Native");
  const [choosenIndex, setChoosenIndex] = useState("2");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (choosenLabel) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource

      setFilteredDataSource(choosenLabel);
      setSearch(choosenLabel);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(choosenLabel);
    }
  };

  React.useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((json) => {
        setData(json.results);
        setFilteredDataSource(json.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const items = data.map((item, index) => {
    return <Picker.Item key={index} label={item.name} value={item.name} />;
  });

  return (
    <>
      {!isLoading ? (
        <View>
          <FilterBox text="Nombre" />
          <Picker
            selectedValue={choosenLabel}
            onValueChange={(itemValue, itemIndex) => {
              setChoosenLabel(itemValue);
              setChoosenIndex(itemIndex);
            }}
          >
            <Picker.Item label="Hello" value="Rick" />
            <Picker.Item label="React" value="React" />
            <Picker.Item label="Native" value="Native" />
            {items}
          </Picker>

          <FlatList
            data={data}
            keyExtractor={(id, index) => index.toString()}
            renderItem={({ item }) => (
              <CharBox
                imageSrc={item.image}
                name={item.name}
                specie={item.species}
                status={item.status}
                type={item.type}
                genre={item.gender}
              />
            )}
          />
        </View>
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

export default FilterScreen;
