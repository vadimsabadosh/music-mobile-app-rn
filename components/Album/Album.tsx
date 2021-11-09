import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Album as AlbumProps } from "../../types";

type Album = { album: AlbumProps };

const Album = ({ album }: Album) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Album", { id: album.id });
  };
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.container}>
        <Image source={{ uri: album.imageUri }} style={styles.image} />
        <Text style={styles.title}>{album.headline}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Album;

const styles = StyleSheet.create({
  container: {
    width: 150,
    margin: 10,
  },
  title: {
    marginTop: 10,
    color: "#c5c5c5",
  },
  image: {
    width: "100%",
    height: 150,
  },
});
