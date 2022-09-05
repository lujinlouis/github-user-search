/**
 * This is the Followers or Following page.
 * Depending on the "fetchType" parameter, it displays either followers or following.
 */

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Image,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import Shimmer from "../components/SkeletonScreen";

const FollowInfo = ({ navigation, route }) => {
  const [followInfo, setFollowInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const username = route.params.username;
  const fetchType = route.params.fetchType;

  //   React hook to fetch the followers or followibng data when the component is mounting.
  useEffect(() => {
    fetchFollowInfo(username, fetchType);
    setLoading(false);
  }, []);

  // Send API call to get the followers or followibng data
  const fetchFollowInfo = async (username, fetchType) => {
    setLoading(true);
    await axios
      .get(`https://api.github.com/users/${username}/${fetchType}`)
      .then((response) => setFollowInfo(response.data))
      .catch((err) => setError(err.message));
  };

  // Goes to the user profile name once user presses a specific username in the list.
  const pressUserHandler = (otherUserName) => {
    navigation.navigate("Profile", { username: otherUserName });
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  // Pull to refesh implementation. Paused sometime for visibility.
  const onRefresh = React.useCallback((username, fetchType) => {
    fetchFollowInfo(username, fetchType);
    wait(1000).then(() => setLoading(false));
  }, []);

  return (
    <View>
      {loading ? (
        // This is the implementation of the skeleton screen.
        <View style={styles.loadingContainer}>
          <Shimmer autoRun={true} visible={false}></Shimmer>
        </View>
      ) : (
        <View style={styles.listContainer}>
          {error ? (
            <Text>Not Found</Text>
          ) : (
            <FlatList
              data={followInfo}
              renderItem={(itemData) => {
                return (
                  <Pressable
                    onPress={pressUserHandler.bind(this, itemData.item.login)}
                    style={({ pressed }) => [
                      {
                        opacity: pressed ? 0.5 : 1,
                        backgroundColor: pressed ? "#5e0acc" : "#e4d0ff",
                      },
                      styles.button,
                    ]}
                  >
                    <View style={styles.userItem}>
                      <Image
                        source={{ uri: itemData.item.avatar_url }}
                        style={styles.image}
                      />

                      <Text style={styles.userText}>{itemData.item.login}</Text>
                    </View>
                  </Pressable>
                );
              }}
              keyExtractor={(item) => {
                return item.id;
              }}
              // PUll to refresh implementation
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={onRefresh.bind(this, username, fetchType)}
                />
              }
            />
          )}
        </View>
      )}
    </View>
  );
};

export default FollowInfo;

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  pressedItem: {
    opacity: 0.5,
  },
  userText: {
    padding: 8,
  },
  image: {
    width: 30,
    height: 30,
    margin: 5,
  },
  button: {
    margin: 5,
    padding: 6,
  },

  loadingContainer: {
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "column",
  },
});
