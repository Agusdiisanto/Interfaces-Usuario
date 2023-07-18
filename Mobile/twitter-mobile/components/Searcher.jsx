import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";

const Searcher = ({ onChangeText, onSearch }) => {
  const [searchText, setSearchText] = useState("");

  const handleChange = (text) => {
    setSearchText(text);
    onChangeText(text);
  };

  const handleEnter = () => {
    onSearch();
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <View style={styles.searchIconContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
          </View>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar en Twitter"
            placeholderTextColor="#909090" // Color del placeholder
            onChangeText={handleChange}
            onSubmitEditing={handleEnter}
            value={searchText}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#505050",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 50,
    width: 280,
    height: 48,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "#202327",
  },
  searchIconContainer: {
    marginRight: 10,
  },
  searchIcon: {
    color: "#00aaff",
    fontSize: 20,
  },
  searchInput: {
    flex: 1,
    color: "white",
    backgroundColor: "#202327",
    fontSize: 20,
  },
});

export default React.memo(Searcher);