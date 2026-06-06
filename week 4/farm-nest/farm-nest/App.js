import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";

export default function App() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Logo */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/2909/2909763.png",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>FarmNest</Text>
        <Text style={styles.subtitle}>
          Fresh & Local Marketplace
        </Text>
      </View>

      {/* Search */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search products..."
      />

      {/* Banner */}
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200",
        }}
        style={styles.banner}
      />

      {/* Products */}
      <Text style={styles.sectionTitle}>Featured Products</Text>

      <View style={styles.productContainer}>
        <View style={styles.productCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500",
            }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Fresh Milk</Text>
          <Text>Rs.120/Liter</Text>
        </View>

        <View style={styles.productCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1546470427-e5ac89cd0b53?w=500",
            }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Tomatoes</Text>
          <Text>Rs.80/Kg</Text>
        </View>
      </View>

      <View style={styles.productContainer}>
        <View style={styles.productCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500",
            }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Apples</Text>
          <Text>Rs.150/Kg</Text>
        </View>

        <View style={styles.productCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1587049633312-d628ae50a8ae?w=500",
            }}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Pickles</Text>
          <Text>Rs.250/Jar</Text>
        </View>
      </View>

      {/* Categories */}
      <Text style={styles.sectionTitle}>Categories</Text>

      <View style={styles.categories}>
        <Text style={styles.category}>🥛 Dairy</Text>
        <Text style={styles.category}>🥬 Vegetables</Text>
        <Text style={styles.category}>🍎 Fruits</Text>
        <Text style={styles.category}>🏠 Homemade</Text>
      </View>

      {/* Stats */}
      <Text style={styles.sectionTitle}>Quick Stats</Text>

      <View style={styles.statsBox}>
        <Text>Products: 120</Text>
        <Text>Orders: 58</Text>
        <Text>Sellers: 35</Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7F2",
  },

  header: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },

  logo: {
    width: 100,
    height: 100,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2E7D32",
  },

  subtitle: {
    color: "#666",
  },

  searchBar: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  banner: {
    width: "92%",
    height: 180,
    alignSelf: "center",
    borderRadius: 15,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 15,
    color: "#2E7D32",
  },

  productContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },

  productCard: {
    width: "43%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },

  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 8,
  },

  productName: {
    fontWeight: "bold",
  },

  categories: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },

  category: {
    backgroundColor: "#E8F5E9",
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },

  statsBox: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
});