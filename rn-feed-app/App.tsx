import { useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";

type Post = { id: string; author: string; title: string; body: string; likes: number };

const POSTS: Post[] = [
  { id: "1", author: "Mara", title: "Trail notes: the north loop", body: "Ran the north loop at dawn and the fog never lifted. Notes on pacing and what I'd pack differently next time.", likes: 12 },
  { id: "2", author: "Devin", title: "A quieter build setup", body: "Swapped my toolchain this week for something with far fewer moving parts. Faster feedback, less to break.", likes: 8 },
  { id: "3", author: "Priya", title: "On shipping smaller", body: "Small PRs changed how our team ships. Here's the workflow that made reviews painless.", likes: 21 },
  { id: "4", author: "Sam", title: "Coffee and cold starts", body: "A short piece on morning routines and why the first hour sets the tone for everything after.", likes: 5 },
];

export default function App() {
  const [screen, setScreen] = useState<"login" | "feed" | "detail">("login");
  const [email, setEmail] = useState("reader@feed.test");
  const [password, setPassword] = useState("password");
  const [active, setActive] = useState<Post | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({});

  function handleLogin() {
    // TODO: authenticate the user. On success:
    console.log("logged in", email);
    setScreen("feed");
  }
  function handleOpenItem(post: Post) {
    console.log("post opened", post.id);
    setActive(post);
    setScreen("detail");
  }
  function handleLike(post: Post) {
    console.log("post liked", post.id);
    setLikes((prev) => ({ ...prev, [post.id]: (prev[post.id] ?? post.likes) + 1 }));
  }
  function handleLogout() {
    console.log("logged out");
    setScreen("login");
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />

      {screen === "login" && (
        <View style={styles.center}>
          <Text style={styles.brand}>Feed</Text>
          <Text style={styles.muted}>Sign in to your reading feed</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            placeholderTextColor="#8a90a6"
          />
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Password"
            placeholderTextColor="#8a90a6"
          />
          <Pressable style={styles.primary} onPress={handleLogin}>
            <Text style={styles.primaryText}>Log in</Text>
          </Pressable>
        </View>
      )}

      {screen === "feed" && (
        <View style={styles.flex}>
          <View style={styles.header}>
            <Text style={styles.title}>Your feed</Text>
            <Pressable onPress={handleLogout}>
              <Text style={styles.link}>Log out</Text>
            </Pressable>
          </View>
          <FlatList
            data={POSTS}
            keyExtractor={(p) => p.id}
            contentContainerStyle={{ padding: 16 }}
            renderItem={({ item }) => (
              <Pressable style={styles.card} onPress={() => handleOpenItem(item)}>
                <Text style={styles.cardMeta}>{item.author}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLikes}>♥ {likes[item.id] ?? item.likes}</Text>
              </Pressable>
            )}
          />
        </View>
      )}

      {screen === "detail" && active && (
        <View style={styles.flex}>
          <View style={styles.header}>
            <Pressable onPress={() => setScreen("feed")}>
              <Text style={styles.link}>‹ Back</Text>
            </Pressable>
            <Text style={styles.title}>Post</Text>
            <View style={{ width: 44 }} />
          </View>
          <View style={{ padding: 20 }}>
            <Text style={styles.cardMeta}>{active.author}</Text>
            <Text style={styles.detailTitle}>{active.title}</Text>
            <Text style={styles.body}>{active.body}</Text>
            <Pressable style={styles.primary} onPress={() => handleLike(active)}>
              <Text style={styles.primaryText}>♥ Like ({likes[active.id] ?? active.likes})</Text>
            </Pressable>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0f1220" },
  flex: { flex: 1 },
  center: { flex: 1, justifyContent: "center", padding: 24 },
  brand: { color: "#e7e9f3", fontSize: 34, fontWeight: "800" },
  muted: { color: "#9aa0b5", marginBottom: 20 },
  input: { backgroundColor: "#181c2e", color: "#e7e9f3", borderRadius: 10, padding: 14, marginTop: 10, borderWidth: 1, borderColor: "#2a2f45" },
  primary: { backgroundColor: "#5b8cff", borderRadius: 10, padding: 15, alignItems: "center", marginTop: 18 },
  primaryText: { color: "#fff", fontWeight: "700" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16, borderBottomWidth: 1, borderBottomColor: "#2a2f45" },
  title: { color: "#e7e9f3", fontSize: 18, fontWeight: "700" },
  link: { color: "#5b8cff", fontWeight: "600", fontSize: 15 },
  card: { backgroundColor: "#181c2e", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#2a2f45" },
  cardMeta: { color: "#9aa0b5", fontSize: 12, marginBottom: 4 },
  cardTitle: { color: "#e7e9f3", fontSize: 16, fontWeight: "600" },
  cardLikes: { color: "#9aa0b5", fontSize: 13, marginTop: 8 },
  detailTitle: { color: "#e7e9f3", fontSize: 22, fontWeight: "700", marginVertical: 8 },
  body: { color: "#c7ccdd", fontSize: 15, lineHeight: 22, marginBottom: 20 },
});
