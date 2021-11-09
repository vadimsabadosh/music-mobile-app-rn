import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Song } from "../../types";
import { AppContext } from "../../AppContext";

type SongListItemProps = {
  song: Song;
};
const SongListItem = (props: SongListItemProps) => {
  const { song } = props;
  const { setSongId } = useContext(AppContext);
  const onPlay = () => {
    setSongId(song.id);
  };
  return (
    <TouchableWithoutFeedback onPress={onPlay}>
      <View style={styles.container}>
        <Image source={{ uri: song.imageUri }} style={styles.image} />
        <View>
          <Text style={styles.title}>{song.title}</Text>
          <Text style={styles.artist}>{song.artist}</Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SongListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  image: {
    width: 75,
    height: 75,
    marginRight: 15,
  },
  title: {
    fontSize: 22,
    marginBottom: 10,
    color: "#ffffff",
  },
  artist: {
    fontSize: 18,
    color: "#bebebe",
  },
});
