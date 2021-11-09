import { AntDesign, FontAwesome5, Fontisto } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";
import { AppContext } from "../../AppContext";
import { API, graphqlOperation } from "aws-amplify";
import { getSong } from "../../src/graphql/queries";

const PlayerWidget = () => {
  const [song, setSong] = useState<any>(null);
  const [sound, setSound] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [duration, setDuration] = useState<number | null>(null);
  const [position, setPosition] = useState<number | null>(null);

  const { songId } = useContext(AppContext);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        if (songId) {
          const data = await API.graphql(
            graphqlOperation(getSong, {
              id: songId,
            })
          );
          setSong(data.data.getSong);
        }
      } catch (e) {
        console.log(e);
      }
    };
    fetchSong();
  }, [songId]);

  const onPlaybackStatusUpdate = (status: any) => {
    setIsPlaying(status.isPlaying);
    setDuration(status.durationMillis);
    setPosition(status.positionMillis);
  };

  const playCurrentSong = async () => {
    if (sound) {
      sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: song.uri },
      { shouldPlay: true },
      onPlaybackStatusUpdate
    );
    setSound(newSound);
  };

  const onPlayPauseAudio = async () => {
    if (!sound) {
      return;
    }
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  useEffect(() => {
    if (song) {
      playCurrentSong();
    }
  }, [song]);

  const getProgress = () => {
    if (sound === null || duration === null || position === null) {
      return 0;
    }
    return (position / duration) * 100;
  };

  const playIconName = isPlaying ? "pause" : "play";
  const likeIconName = isLiked ? "heart" : "hearto";

  if (!song) return null;
  return (
    <View style={styles.container}>
      <View style={[styles.progress, { width: `${getProgress()}%` }]} />
      <Image source={{ uri: song.imageUri }} style={styles.image} />
      <View>
        <Text style={styles.title}>{song.title}</Text>
        <Text style={styles.artist}>{song.artist}</Text>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={onPlayPauseAudio}>
          <AntDesign name={likeIconName} size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPlayPauseAudio}>
          <FontAwesome5
            name={playIconName}
            size={24}
            color="#fff"
            style={styles.rightIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PlayerWidget;

const styles = StyleSheet.create({
  progress: {
    height: 2,
    position: "absolute",
    top: 0,
    zIndex: 1,
    backgroundColor: "#e3e3e3",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: Platform.OS === "ios" ? 78 : 48,
    width: "100%",
    backgroundColor: "#131313",
    borderBottomColor: "#000",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  icons: {
    marginLeft: "auto",
    marginRight: 20,
    flexDirection: "row",
  },
  rightIcon: {
    marginLeft: 25,
  },
  image: {
    width: 68,
    height: 68,
    marginRight: 25,
  },
  title: {
    fontSize: 14,
    color: "#ffffff",
    lineHeight: 18,
    marginRight: 10,
  },
  artist: {
    fontSize: 12,
    lineHeight: 16,
    color: "#bebebe",
  },
});
