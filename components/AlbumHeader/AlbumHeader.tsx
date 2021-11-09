import React from "react";
import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Album } from "../../types";

type AlbumHeaderProps = {
  album: Album;
};
const AlbumHeader = (props: AlbumHeaderProps) => {
  const { album } = props;
  return (
    <View style={styles.container}>
      <Image source={{ uri: album.imageUri }} style={styles.image} />
      <Text style={styles.name}>{album.name}</Text>
      <View style={styles.creatorCont}>
        <Text style={styles.author}>By {album.author}</Text>
        <Text style={styles.likesNumber}>{album.likesNumber} Likes</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Play</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlbumHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
  },
  name: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    margin: 15,
  },
  image: {
    width: 200,
    height: 200,
  },
  author: {
    color: "#dddddd",
    margin: 5,
  },
  likesNumber: {
    color: "#ddd",
    margin: 5,
  },
  creatorCont: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#1cd05d",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    height: 50,
    borderRadius: 30,
    overflow: "hidden",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 17,
  },
});
