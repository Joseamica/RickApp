import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SearchBar } from "react-native-elements";
import CharBox from "./src/components/CharBox";

function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource and update FilteredDataSource
      const newData = data.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(data);
      setSearch(text);
    }
  };

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((json) => {
        setData(json.results);
        setFilteredDataSource(json.results);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const mergeUsers = async () => {
    console.log("run");
    try {
      const currentUser = await AsyncStorage.getItem("@MyApp_user");

      console.log(currentUser);

      // console.log result:
      // {
      //   name: 'Sarah',
      //   age: 21,
      //   traits: {
      //     eyes: 'green',
      //     hair: 'black'
      //   }
      // }
    } catch (e) {
      console.log("error" + e);
    }
  };
  return (
    <View>
      {!isLoading ? (
        <View>
          <SearchBar
            round
            searchIcon={{ size: 24 }}
            onChangeText={(text) => searchFilterFunction(text)}
            onClear={(text) => searchFilterFunction("")}
            placeholder="Type Here..."
            value={search}
          />
          <TouchableOpacity
            style={{
              width: 150,
              height: 50,
              backgroundColor: "red",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 100,
              margin: 20,
              alignSelf: "flex-end",
            }}
            onPress={mergeUsers}
          >
            <Text style={{ color: "white" }}>Filter</Text>
          </TouchableOpacity>
          <Button
            title="Favorites"
            onPress={() => navigation.navigate("Favorites")}
          />
          <FlatList
            data={filteredDataSource}
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
    </View>
  );
}

function DetailsScreen({ navigation, route }) {
  const { name, type, image, status, genre, specie } = route.params;
  console.log(image);
  return (
    <View style={{ margin: 20, justifyContent: "space-evenly", flex: 1 }}>
      <Image
        style={{
          height: 400,
          width: "100%",
          borderRadius: 10,
          resizeMode: "cover",
        }}
        source={{ uri: image }}
      />
      <View
        style={{
          flexDirection: "row",
          alignContent: "center",
        }}
      >
        <View
          style={{
            height: 15,
            width: 15,
            backgroundColor: "black",
            marginRight: 10,
          }}
        />

        <Text>{specie}</Text>
      </View>

      <Text style={{ fontSize: 26 }}>{name}</Text>
      <Text>{status}</Text>
      <Text>{genre}</Text>
    </View>
  );
}

function Favorites(props) {
  return (
    <>
      {props.n ? (
        <View>
          <CharBox />
        </View>
      ) : (
        <Text>null</Text>
      )}
    </>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Character" component={DetailsScreen} />
        <Stack.Screen name="Favorites" component={Favorites} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
