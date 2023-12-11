import { View, Text, Image, StyleSheet } from 'react-native';


const Hero = ({title, subtitle, description, imageSrc, action}) => {
    
    return (

        <View style={styles.container}>
            <View style={styles.column1}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.column2}>
                <Image
                    source={imageSrc}
                    style={styles.image}
                    resizeMode="contain"
                    accessible={true}
                    accessibilityLabel={title}
                />
            </View>
            {action}
           
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
        padding: 20,
        marginBottom: 30,
        backgroundColor:'#495E57'
    },
    column1: {
        flex: 1.2,
        flexDirection: 'column'
    },
    column2: {
        flex: 0.8,
        flexDirection: 'column',
    },
    title: {
        fontSize: 30,
        color: 'white',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#f4ce14',
        paddingBottom: 10
    },
    description: {
        color: 'white',
    },
    image: {
        marginRight: 20,
        width: 150,
        height: 150,
        paddingTop:20
    },

  });

export default Hero;
