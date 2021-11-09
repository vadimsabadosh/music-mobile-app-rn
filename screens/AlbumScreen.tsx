import { useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import AlbumHeader from "../components/AlbumHeader";
import SongListItem from "../components/SongListItem";
import { API, graphqlOperation } from "aws-amplify";
import { getAlbum } from "../src/graphql/queries";
const AlbumScreen = () => {
  const [data, setData] = useState<any>([]);
  const route = useRoute();
  const albumId = route.params.id;

  useEffect(() => {
    const fetchAlbumCategories = async () => {
      try {
        const data = await API.graphql(
          graphqlOperation(getAlbum, { id: albumId })
        );
        setData(data.data.getAlbum);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAlbumCategories();
  }, []);

  if (!data.songs) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={data.songs.items}
        renderItem={({ item }) => <SongListItem song={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => <AlbumHeader album={data} />}
      />
    </View>
  );
};
export default AlbumScreen;
