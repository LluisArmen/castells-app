import React, { useEffect, useState } from "react";
import { View, Text, TouchableWithoutFeedback, Keyboard, ScrollView, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
//import { Path, Svg } from "react-native-svg";
import Svg, {Path, Text as SvgText, G} from "react-native-svg";
import * as PathProperties from 'svg-path-properties';
import { AppUser } from "../../models/User";
import { HStack, Spacer, VStack, ZStack } from "react-native-stacks";
import { useNavigation } from '@react-navigation/native';
import { typography } from "../../design/Typography";
import { NIL } from "uuid";

const MARGIN = 10;
const viewBoxWidth = 559 + MARGIN;
const viewBoxHeight = 517 + MARGIN;
const width = Dimensions.get("window").width - 32;
const heigth = (width * viewBoxHeight) / viewBoxWidth

const paths = [
    "M422.5 165.5H557.5V350.5H422.5V165.5Z",
    "M160.5 272.5H398.5V405.5H160.5V272.5Z",
    "M1.5 165.5H136.5V350.5H1.5V165.5Z",
    "M160.5 112.5H398.5V245.5H160.5V112.5Z",
]

const paths2 = [
    "M397.575 30.3947L410.431 15.0739C423.388 -0.368369 446.411 -2.38258 461.853 10.575L538.934 75.2539C554.377 88.2114 556.391 111.234 543.433 126.676L530.578 141.997C517.62 157.439 494.597 159.454 479.155 146.496L402.074 81.8171C386.632 68.8595 384.617 45.837 397.575 30.3947Z",
    "M25.575 390.395L38.4307 375.074C51.3883 359.632 74.4109 357.617 89.8531 370.575L166.934 435.254C182.377 448.211 184.391 471.234 171.433 486.676L158.578 501.997C145.62 517.439 122.597 519.454 107.155 506.496L30.0739 441.817C14.6316 428.86 12.6174 405.837 25.575 390.395Z",
    "M171.433 30.3947L158.578 15.0739C145.62 -0.368369 122.597 -2.38258 107.155 10.575L30.0738 75.2539C14.6316 88.2114 12.6174 111.234 25.575 126.676L38.4307 141.997C51.3883 157.439 74.4109 159.454 89.8531 146.496L166.934 81.8171C182.377 68.8595 184.391 45.837 171.433 30.3947Z",
    "M543.433 390.395L530.578 375.074C517.62 359.632 494.597 357.617 479.155 370.575L402.074 435.254C386.632 448.211 384.617 471.234 397.575 486.676L410.431 501.997C423.388 517.439 446.411 519.454 461.853 506.496L538.934 441.817C554.377 428.86 556.391 405.837 543.433 390.395Z",    
]

const ModulPinyesScreen = ({ showSheet }) => {
    const [selectedUser, setSelectedUser] = useState('');
    const [selectedBox, setSelectedBox] = useState(null);

    const testUsers = ["Lluis Armengol",
                       "Marta Marimon",
                       "Rosa Lleida",
                       "Alba Castells",
                       "Oriol Pasies"];
    
    const testUsersBox = {"Lluis Armengol": -1,
                        "Marta Marimon": -1,
                        "Rosa Lleida": -1,
                        "Alba Castells": -1,
                        "Oriol Pasies": -1};

    const [stateUserList, setStateUserList] = useState(testUsers as string[]);
    const [stateUserListBox, setStateUserListBox] = useState(testUsersBox);

    function setUserToBox() {
        const updatedTestUsersBox = stateUserListBox;
        updatedTestUsersBox[selectedUser] = selectedBox
        setStateUserListBox(updatedTestUsersBox);
        setSelectedUser('')
        setSelectedBox(null)
        console.debug(stateUserListBox);
    }

    function isUserAssigned(id: number) {
        console.debug("Box:", id)
        console.debug("Is user assigned:", Object.values(stateUserListBox).includes(id))
        return Object.values(stateUserListBox).includes(id);
    }

    function getNameForNumber(id: number) {
        for (const [name, value] of Object.entries(stateUserListBox)) {
          if (value === id) {
            console.debug("Name:", name)
            return name;
          }
        }
        return "";
    }

    function isStartPointOnLeft(path: string) {
        const properties = new PathProperties.svgPathProperties(path);
        const x = properties.getPointAtLength(properties.getTotalLength());
        const screenWidth = viewBoxWidth/2 //Dimensions.get('window').width / 2;
        //console.debug('screenWidth:', screenWidth);
        return x.x < screenWidth;
    }

    function isStartPointOnTop(path: string) {
        const properties = new PathProperties.svgPathProperties(path);
        const y = properties.getPointAtLength(properties.getTotalLength());
        const screenHeight = viewBoxHeight/2 //Dimensions.get('window').width / 2;
        //console.debug('screenHeight:', screenHeight);
        return y.y < screenHeight;
    }

    function getRectangleFlatOrientation(path: string) {
        const properties = new PathProperties.svgPathProperties(path);
        const left = properties.getPointAtLength(properties.getTotalLength());
        const right = properties.getPointAtLength(properties.getTotalLength()/2);
        const width = (right.x - left.x)
        //console.debug('width:', width);
    
        const top = properties.getPointAtLength(properties.getTotalLength());
        const bottom = properties.getPointAtLength(properties.getTotalLength()/2);
        const height = (bottom.y - top.y)
        //console.debug('height:', height);

        if (width > height) {
            return 0;
        } else {
            if (isStartPointOnLeft(path)) {
                return 270;
            } else {
                return 90;
            }
        }
    }

    function getRectangleOrientation(path: string) {
        if (isStartPointOnLeft(path)) {
            if (isStartPointOnTop(path)) {
                return 320;
            } else {
                return 40;
            }
        } else {
            if (isStartPointOnTop(path)) {
                return 40;
            } else {
                return 320;
            }
        }
    }

    function getCenterX(pathString: string, name: string, isRotation: boolean = false) {
        const properties = new PathProperties.svgPathProperties(pathString);
        const left = properties.getPointAtLength(properties.getTotalLength());
        const right = properties.getPointAtLength(properties.getTotalLength()/2);
        const center = (left.x + right.x)/2
        const textWidth = name ? name.length * (9/2) : 0;
        //onsole.debug('Text lenght:', textWidth);
        const x = center - (isRotation ? 0 : textWidth)
  
        return x;
    }

    function getCenterY(pathString: string, isRotation: boolean = false) {
        const properties = new PathProperties.svgPathProperties(pathString);
        const top = properties.getPointAtLength(properties.getTotalLength());
        const bottom = properties.getPointAtLength(properties.getTotalLength()/2);
        const center = (top.y + bottom.y)/2
        const textHeight = 9;
        const y = center + (isRotation ? 0 : textHeight)
        return y
    }

    function handleBoxPress(id: number, path: string) {
        console.log('Box tapped with id:', id);
        setSelectedBox(id)
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
                <HStack>
                    <TouchableOpacity onPress={() => showSheet(false)} style={{marginBottom: 30}}>
                        <Text>Close</Text>
                    </TouchableOpacity>
                    <Spacer/>
                    {(selectedUser != '' && selectedBox) && (
                        <TouchableOpacity onPress={() => setUserToBox()} style={{marginBottom: 30}}>
                            <Text>Confirm</Text>
                        </TouchableOpacity>
                    )}
                </HStack>
            
            
                <ZStack style={styles.layer}>
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

                                {isUserAssigned(index) && (
                                    <G rotation={getRectangleFlatOrientation(path)} origin={`${getCenterX(path, getNameForNumber(index), true)},${getCenterY(path, true)}`}>
                                        <SvgText
                                            x={getCenterX(path, getNameForNumber(index))} 
                                            y={getCenterY(path)} 
                                            fontSize={20}
                                        >
                                            {getNameForNumber(index)}
                                        </SvgText>
                                    </G>
                                )}
                                
                            </React.Fragment>
                        ))} 
                    </Svg>

                    <Svg 
                        width={width} 
                        height={heigth} 
                        viewBox={[
                            -MARGIN/2, 
                            -MARGIN/2, 
                            viewBoxWidth + MARGIN/2, 
                            viewBoxHeight + MARGIN/2
                            ].join(" ")}>
                        {paths2.map((path, index) => (
                            <React.Fragment key={index+paths.length}>
                                <Path 
                                    d={path}  
                                    key={index+paths.length}
                                    onPress={() => handleBoxPress(index+paths.length, path)}
                                    fill={index+paths.length === selectedBox ? "#b2d8d8" : "#FEFEFE"}
                                    stroke="black" 
                                    strokeWidth={index+paths.length === selectedBox ? 4 : 1}
                                />

                                {isUserAssigned(index+paths.length) && (
                                    <G rotation={getRectangleOrientation(path)} origin={`${getCenterX(path, getNameForNumber(index+paths.length), true)},${getCenterY(path, true)}`}>
                                        <SvgText
                                            x={getCenterX(path, getNameForNumber(index+paths.length))} 
                                            y={getCenterY(path)} 
                                            fontSize={20}
                                        >
                                            {getNameForNumber(index+paths.length)}
                                        </SvgText>
                                    </G>
                                )}
                                {/* {index+paths.length === selectedBox && (
                                    <G rotation={getRectangleOrientation(path)} origin={`${getCenterX(path, true)},${getCenterY(path, true)}`}>
                                        <SvgText
                                            x={getCenterX(path)} y={getCenterY(path)} fontSize={20}
                                        >
                                            {selectedUser ? selectedUser : ""}
                                        </SvgText>
                                    </G>
                                )} */}
                                
                            </React.Fragment>
                        ))} 
                    </Svg>
                </ZStack>
                
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