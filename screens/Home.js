import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import debounce from 'lodash.debounce';
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterByQueryAndCategories,
} from '../storage/database';
import Filters from '../components/Filters';
import ItemCard from '../components/ItemCard';
import Hero from '../components/Hero'

import { useUpdateEffect } from '../storage/utils';

const sections = ['starters', 'mains', 'desserts'];

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [searchBarText, setSearchBarText] = useState('');
  const [query, setQuery] = useState('');
  const [filterSelections, setFilterSelections] = useState(
    sections.map(() => false)
  );

  const fetchData = async() => {
    // 1. Implement this function
    const API_URL =
    'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json';

    try {
      const response = await fetch(API_URL, {
        mode: "cors",
        headers: {
            'Content-type': 'application/json'
          }
      });
      const json = await response.json();
      return json.menu ?? [];
  
    } catch (error) {
      // TypeError: Failed to fetch
      console.log('There was an error', error);
    }
    return [];
  }

  const fetchMenuItems = async () => {
    let menuItems = await getMenuItems();

    // The application only fetches the menu data once from a remote URL
    // and then stores it into a SQLite database.
    // After that, every application restart loads the menu from the database
    if (!menuItems.length) {
      menuItems = await fetchData();
      saveMenuItems(menuItems);
    }

    return menuItems;

  } 

  useEffect(() => {
    (async () => {
      try {
        await createTable();
        const menuItems = await fetchMenuItems();
        setData(menuItems);
       
      } catch (e) {
        // Handle error
        Alert.alert(e.message ?? 'And error occured');
      }
    })();
  }, []);

  useUpdateEffect(() => {
    (async () => {
      const activeCategories = sections.filter((s, i) => {
        // If all filters are deselected, all categories are active
        if (filterSelections.every((item) => item === false)) {
          return true;
        }
        return filterSelections[i];
      });
      console.log(activeCategories, 'aciveree')
      try {
        const menuItems = await filterByQueryAndCategories(
          query,
          activeCategories
        );

        setData(menuItems);
      } catch (e) {
        Alert.alert(e.message ?? 'And error occured');
      }
    })();
  }, [filterSelections, query]);

  const lookup = useCallback((q) => {
    setQuery(q);
  }, []);

  const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

  const handleSearchChange = (text) => {
    setSearchBarText(text);
    debouncedLookup(text);
  };

  const handleFiltersChange = async (index) => {
    const arrayCopy = [...filterSelections];
    arrayCopy[index] = !filterSelections[index];
    console.log(arrayCopy, 'weewew')

    setFilterSelections(arrayCopy);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Hero
        title="Little Lemon"
        subtitle="Chicago"
        description="We are a family owned restaurant, focused on traditional recipes served with a modern twist."
        imageSrc={require("../assets/restaurantfood.jpg")}
      />
      <Text style={styles.cta}> Order online!</Text>
      <Searchbar
        placeholder="Search"
        placeholderTextColor="white"
        onChangeText={handleSearchChange}
        value={searchBarText}
        style={styles.searchBar}
        iconColor="white"
        inputStyle={{ color: 'white' }}
        elevation={0}
      />
      <Filters
        selections={filterSelections}
        onChange={handleFiltersChange}
        sections={sections}
      />
      <FlatList
        style={styles.sectionList}
        data={data}
        keyExtractor={(item, key) => key}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<Text style={styles.noResults}> There are no items matching your search query!</Text>}
        renderItem={({ item }) => (
          <ItemCard title={item.name} price={item.price} description={item.description} imageSrc={item.image} />
      
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
    backgroundColor: 'white',
  },
  sectionList: {
    paddingHorizontal: 16,
    marginHorizontal: 8,
    // backgroundColor: '#ee9972'
  },
  searchBar: {
    marginBottom: 24,
    marginHorizontal: 20,
    backgroundColor: '#495E57',
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  cta: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
    marginHorizontal: 20,
    color: 'black',
  },
  noResults: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 100
  }

});
