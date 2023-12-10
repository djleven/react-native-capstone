import { View, Text, Image, StyleSheet } from 'react-native';

const imgPath = (fileName) => `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${fileName}?raw=true`

const ItemCard = ({title, description, price, imageSrc}) => {
    
    
    return (

        <View style={styles.container}>
            <View style={styles.column1}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.description}>{description}</Text>
                <Text style={styles.price}>${price}</Text>
            </View>
            <View style={styles.column2}>
                <Image
                    source={{ uri: imgPath(imageSrc) }}
                    style={styles.image}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel={title}
                />
            </View>
           
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        gap: 10,
    },
    column1: {
        flex: 1.2,
        flexDirection: 'column'
    },
    column2: {
        flex: 0.8,
        flexDirection: 'column'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    image: {
        marginRight: 20,
      width: 150,
      height: 150,
    },

  });

export default ItemCard;
