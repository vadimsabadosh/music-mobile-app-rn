import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { AlbumCategoryProps } from "../../types";
import Album from "../Album";

const AlbumCategory = ({ title, albums }: AlbumCategoryProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={albums}
        renderItem={({ item }) => <Album album={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default AlbumCategory;

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  title: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 26,
    color: "#fff",
  },
});
