import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            onChange(index);
          }}
          style={[{
            flex: 1 / sections.length,
            backgroundColor: selections[index] ? '#495E57'  : 'lightgrey',
          
          }, styles.filter]}>
          <View>
            <Text style={{ color: selections[index] ? 'white' : 'black' }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginHorizontal: 20,
  },
  filter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 40,
  }
});

export default Filters;
