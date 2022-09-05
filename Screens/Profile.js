/**
 * This is the Profile page to show the Github user's profile.
 * This component gets the "username" from the Home page TextInput and performs an API call to get the profile of the user
 */

import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Shimmer from "../components/SkeletonScreen";

const Profile = ({ navigation, route }) => {
  const [userProfile, setUserProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  //   Get the username from route's parameters.
  const username = route.params.username;

  //   React hook to fetch the profile data when the component is mounting.
  useEffect(() => {
    fetchUserProfile(username).then(() => {
      setLoading(false);
    });
  }, [username]);

  //   Send an API call to Github to get the profile of the user
  const fetchUserProfile = async (username) => {
    setLoading(true);
    await axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => setUserProfile(response.data))
      .catch((error) => setError(error.message));
  };

  //   Go to the FollowInfo page once user clicks the followers count,
  //   and pass the fetchType and username information to FollowInfo page.
  const onPressFollowersHandler = () => {
    navigation.navigate("Followers", {
      fetchType: "followers",
      username: username,
    });
  };

  const onPressFollowingHandler = () => {
    navigation.navigate("Following", {
      fetchType: "following",
      username: username,
    });
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  // Pull to refesh implementation. Paused sometime for visibility.
  const onRefresh = React.useCallback((username) => {
    fetchUserProfile(username);
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
        <View style={styles.profile}>
          {error ? (
            <View style={styles.textarea}>
              <Text style={styles.itemText}>Not Found!</Text>
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{ flex: 1, alignItems: "center" }}
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={onRefresh.bind(this, username)}
                />
                // PUll to refresh implementation
              }
            >
              <View style={styles.card}>
                <Image
                  source={{ uri: userProfile.avatar_url }}
                  style={styles.image}
                />

                <View style={styles.textarea}>
                  <Text style={styles.itemText}>
                    Username: {userProfile.login}
                  </Text>

                  <Text style={styles.itemText}>Name: {userProfile.name}</Text>

                  <Text style={styles.itemText}>
                    Description: {userProfile.bio}
                  </Text>

                  <View style={{ alignItems: "center" }}>
                    <Pressable
                      onPress={onPressFollowersHandler}
                      style={({ pressed }) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          backgroundColor: pressed ? "#5e0acc" : "#e4d0ff",
                        },
                        styles.button,
                      ]}
                    >
                      <Text
                        style={styles.buttonText}
                      >{`${userProfile.followers} Followers`}</Text>
                    </Pressable>

                    <Pressable
                      onPress={onPressFollowingHandler}
                      style={({ pressed }) => [
                        {
                          opacity: pressed ? 0.5 : 1,
                          backgroundColor: pressed ? "#5e0acc" : "#e4d0ff",
                        },
                        styles.button,
                      ]}
                    >
                      <Text
                        style={styles.buttonText}
                      >{`${userProfile.following} Following`}</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    alignItems: "center",
  },
  card: {
    margin: 10,
    width: 400,
    borderRadius: 6,
    backgroundColor: "#e4d0ff",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    margin: 20,
  },
  itemText: {
    padding: 6,
  },
  textarea: {
    margin: 20,
  },
  button: {
    margin: 5,
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    elevation: 6,
    shadowRadius: 15,
  },
  buttonText: {
    fontSize: 16,
    color: "#120438",
  },
  loadingContainer: {
    marginTop: 20,
    justifyContent: "space-between",
    flexDirection: "column",
  },
});
