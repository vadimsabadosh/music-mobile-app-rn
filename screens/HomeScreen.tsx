import React, { useState } from "react";
import { FlatList, View } from "react-native";
import AlbumCategory from "../components/AlbumCategory";
import { API, graphqlOperation } from "aws-amplify";
import { listAlbumCategorys } from "../src/graphql/queries";

export default function HomeScreen() {
  const [data, setData] = useState<any>([]);
  React.useEffect(() => {
    const fetchAlbumCategories = async () => {
      try {
        const data = await API.graphql(graphqlOperation(listAlbumCategorys));
        setData(data.data.listAlbumCategorys.items);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAlbumCategories();
  }, []);
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <AlbumCategory title={item.title} albums={item.albums.items} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
