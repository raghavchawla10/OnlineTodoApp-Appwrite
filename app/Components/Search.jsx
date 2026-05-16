import { Text, TextInput, View, StyleSheet } from "react-native";

export default function Search() {
  return (
    <View style={styles.container}>
      {/* Emoji before the input */}
      <Text style={styles.emoji}>🔍</Text>
      <TextInput
        style={styles.input}
        placeholder="Search for movie"
        // onPress={onPress}
        // value={value}
        // onChangeText={onChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",       // ✅ horizontal layout
    alignItems: "center",       // center vertically
    marginTop: 50,              // margin from top
    paddingHorizontal: 10,
  },
  emoji: {
    fontSize: 20,
    marginRight: 8,             // space between emoji and input
  },
  input: {
    flex: 1,                    // take remaining width
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});
