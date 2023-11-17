import React from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Path, Svg } from "react-native-svg";

const MARGIN = 10;
const viewBoxWidth = 559 + MARGIN;
const viewBoxHeight = 297 + MARGIN;
const width = Dimensions.get("window").width - 32;
const heigth = (width * viewBoxHeight) / viewBoxWidth
const paths = [
    "M159 0H400V136H159V0Z",
    "M159 161H400V297H159V161Z",
    "M421 54H559V242H421V54Z",
    "M0 54H138V242H0V54Z",
]

const ModulPinyesScreen = () => {

    function handleBoxPress(id: number) {
        console.log('Box tapped with id:', id);
    }

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
    
                    <View style={styles.layer}>
                        <Svg 
                            width={width} 
                            height={heigth} 
                            viewBox={[
                                -MARGIN/2, 
                                -MARGIN/2, 
                                viewBoxWidth + MARGIN/2, 
                                viewBoxHeight + MARGIN/2
                                ].join(" ")}>
                            {paths.map((path, index) => (
                                <Path 
                                    d={path}  
                                    key={index}
                                    onPress={() => handleBoxPress(index)}
                                    fill="#FEFEFE" stroke="black" strokeWidth={2}/>
                            ))}
                        </Svg>
                    </View>

               
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1, // Allows the content to take up the available space vertically
        alignItems: 'flex-start', // Align content to the left
    },

    container: {
        flex: 1,
        flexGrow: 1, // Allow the content to take up the available space horizontally
        backgroundColor: 'white',
        justifyContent: 'center',
        //minWidth: '100%', 
        paddingLeft: 16,
        paddingRight: 16,
    },

    layer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
});

export default ModulPinyesScreen