import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
//import { Path, Svg } from "react-native-svg";
import Svg, {Path, Text as SvgText} from "react-native-svg";
import * as PathProperties from 'svg-path-properties';
import { AppUser } from "../../models/User";
import { HStack, Spacer, VStack, ZStack } from "react-native-stacks";
import { useNavigation } from '@react-navigation/native';
import { typography } from "../../design/Typography";

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

const ModulPinyesScreen = ({ showSheet }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedBox, setSelectedBox] = useState(null);

    const testUsers = ["Lluis Armengol",
                       "Marta Marimon",
                       "Rosa Lleida",
                       "Alba Castells",
                       "Oriol Pasies"];
    
    const [stateUserList, setStateUserList] = useState(testUsers as string[]);

    // function getTextWidth(text: string) {
    //     textRef.current.measure((x, y, width, height, pageX, pageY) => {
    //         textWidth = width;
    //         console.log('Text width:', textWidth);
    //     });
    // }

    function getCenterX(pathString: string) {
        const properties = new PathProperties.svgPathProperties(pathString);
        const left = properties.getPointAtLength(properties.getTotalLength());
        const right = properties.getPointAtLength(properties.getTotalLength()/2);
        const center = (left.x + right.x)/2 //left.x + (right.x/2 - left.x)/2
        console.debug('\n======== X =========');
        console.debug('Get Total Length:', properties.getTotalLength());
        console.debug('Left:', left.x);
        console.debug('Right:', right.x);
        console.debug('Width:', right.x-left.x);
        console.debug('Center:', center);

        const textWidth = selectedUser.length * (9/2);
        console.debug('Text lenght:', textWidth);
        const x = center - textWidth
  
        return x;
    }

    function getCenterY(pathString: string) {
        const properties = new PathProperties.svgPathProperties(pathString);
        const top = properties.getPointAtLength(properties.getTotalLength());
        const bottom = properties.getPointAtLength(properties.getTotalLength()/2);
        const center = (top.y + bottom.y)/2
        console.debug('\n======== Y =========');
        console.debug('Get Total Length:', properties.getTotalLength());
        console.debug('Top:', top.y);
        console.debug('Bottom:', bottom.y);
        console.debug('Height:', bottom.y-top.y);
        console.debug('Center:', center);
        
        const textHeight = 9;
        const y = center + textHeight
        return y
    }

    function isVerticalBox(pathString: string) {
        const properties = new PathProperties.svgPathProperties(pathString);
        const center = properties.getPointAtLength(properties.getTotalLength() / 2);
        console.debug('Center in Y:', center.y);
    }

    function handleBoxPress(id: number, path: string) {
        console.log('Box tapped with id:', id);
        //if (selectedUser && selectedBox == null) {
            setSelectedBox(id)
            //console.log('Box selected:', id);
        //}
    }

    function handleUserPress(name: string) {
        console.log('User tapped:', name);
        if (selectedUser == name) {
            setSelectedUser('');
        } else {
            setSelectedUser(name);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss() } }>
            <View style={styles.container}>
            <TouchableOpacity onPress={() => showSheet(false)} style={{marginBottom: 30}}>
              <Text>Close</Text>
            </TouchableOpacity>
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
                            <React.Fragment key={index}>
                                <Path 
                                    d={path}  
                                    key={index}
                                    onPress={() => handleBoxPress(index, path)}
                                    fill={index === selectedBox ? "#b2d8d8" : "#FEFEFE"}
                                    stroke="black" 
                                    strokeWidth={index === selectedBox ? 4 : 1}
                                />

                                {index === selectedBox && (
                                    <SvgText
                                        x={getCenterX(path)} y={getCenterY(path)} fontSize={20}
                                    >
                                        {selectedUser ? selectedUser : ""}
                                    </SvgText>
                                )}
                                
                            </React.Fragment>
                        ))} 
                    </Svg>
                </View>
                
                <View style={styles.userList}>
                    {stateUserList.map((usr, index) => (
                        <TouchableOpacity onPress={() => handleUserPress(usr)}>
                            <HStack>
                                <Text 
                                    style={[
                                        usr === selectedUser && { fontWeight: 'bold' },
                                        usr === selectedUser && { color: 'green' },
                                    ]}
                                >{usr}</Text>
                            </HStack>
                        </TouchableOpacity>
                    ))}
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
        // flex: 1,
        // justifyContent: "center",
        alignItems: "center",
    },

    userList: {
        marginTop: 30,
    }
});

export default ModulPinyesScreen