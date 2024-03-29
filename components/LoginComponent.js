import React, { Component } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
// import { SecureStore } from 'expo';
// import { AsyncStorage } from 'react-native';
import * as SecureStore from 'expo-secure-store';   // for fix
// import { Permissions } from 'expo';
import * as Permissions from 'expo-permissions';    // for fix
// import { ImagePicker } from 'expo';
import * as ImagePicker from 'expo-image-picker';   // for fix
// import { Asset, ImageManipulator } from 'expo';
import * as ImageManipulator from 'expo-image-manipulator';   // for fix
import { createBottomTabNavigator } from 'react-navigation';
import { baseUrl } from '../shared/baseUrl';

class LoginTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    this.setState({username: userinfo.username});
                    this.setState({password: userinfo.password});
                    this.setState({remember: true});
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='sign-in' 
                type='font-awesome' 
                size={24} 
                iconStyle={{color: tintColor}}
                />
        )
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password})
            )
            .catch((error) => console.log('Could not save user info', error));
        } 
        else {
            SecureStore.deleteItemAsync('userinfo')
            .catch((error) => console.log('Could not delete user info', error));
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <Input 
                    placeholder='Username' 
                    leftIcon={{ type:'font-awesome', name: 'user-o'}} 
                    onChangeText={(username) => this.setState({username})} 
                    value={this.state.username} 
                    inputContainerStyle={styles.formInput}
                    />
                <Input 
                    placeholder='Password' 
                    leftIcon={{ type:'font-awesome', name: 'key'}} 
                    onChangeText={(password) => this.setState({password})} 
                    value={this.state.password} 
                    inputContainerStyle={styles.formInput}
                    />
                <CheckBox 
                    title='Remember Me' 
                    center 
                    checked={this.state.remember} 
                    onPress={() => this.setState({remember: !this.state.remember})} 
                    inputContainerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.handleLogin()} 
                        title='Login' 
                        icon={
                            <Icon 
                                name='sign-in' 
                                type='font-awesome' 
                                size={24}
                                color='white' 
                            />
                        } 
                        buttonStyle={{ backgroundColor: '#FF8C00' }}
                        />
                </View>
                <View style={styles.formButton}>
                    <Button 
                        onPress={() => this.props.navigation.navigate('Register')} 
                        title='Register' 
                        clear
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome' 
                                size={24}
                                color='white' 
                            />
                        } 
                        buttonStyle={{ backgroundColor: 'pink' }}
                        />
                </View>
            </View> 
        );
    }
}

class RegisterTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: '',
            remember: false,
            imageUrl: baseUrl + 'images/cupcakeicon1.png'
        }
    }

    getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted'){
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4,3]
            });

            if (!capturedImage.cancelled) {
                console.log(capturedImage);
                // this.setState({ imageUrl: capturedImage.uri });
                this.processImage(capturedImage.uri);
            }
        }
    }

    getImageFromGallery = async () => {
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraRollPermission.status === 'granted'){
            let launchedImage = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            });

            if (!launchedImage.cancelled) {
                console.log(launchedImage);
                this.processImage(launchedImage.uri);
                // setImage(launchedImage.uri);
            }
        }
    }

    processImage = async (imageUri) => {
        // let processedImage = await ImageManipulator.manipulate(
        let processedImage = await ImageManipulator.manipulateAsync(    // for fix
            imageUri,
            [
                { resize: { width: 400 }}
            ],
            { format: 'png'}
        );
        console.log(processedImage);
        this.setState({ imageUrl: processedImage.uri });
    }

    static navigationOptions = {
        title: 'Register',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
                name='user-plus' 
                type='font-awesome' 
                size={24} 
                iconStyle={{color: tintColor}}
                />
        )
    };

    handleRegister() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember) {
            SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: this.state.username, password: this.state.password})
            )
            .catch((error) => console.log('Could not save user info', error));
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container} >

                    <View style={styles.imageContainer}>
                        <Image 
                            source={{ uri: this.state.imageUrl}} 
                            loadingIndicatorSource={require('./images/cupcakeicon1.jpeg')} 
                            style={styles.image}
                            />
                        <Button 
                            title='Camera' 
                            onPress={this.getImageFromCamera}
                            />
                        <Button
                            title='Gallery' 
                            onPress={this.getImageFromGallery} 
                            />
                    </View>
                    <Input 
                        placeholder='Username' 
                        leftIcon={{ type:'font-awesome', name: 'user-o'}} 
                        onChangeText={(username) => this.setState({username})} 
                        value={this.state.username} 
                        // containerStyle={styles.formInput}
                        inputContainerStyle={styles.formInput}  // for fix
                        />
                    <Input 
                        placeholder='Password' 
                        leftIcon={{ type:'font-awesome', name: 'key'}} 
                        onChangeText={(password) => this.setState({password})} 
                        value={this.state.password} 
                        // containerStyle={styles.formInput}
                        inputContainerStyle={styles.formInput}  // for fix
                        />
                    <Input 
                        placeholder='First Name' 
                        leftIcon={{ type:'font-awesome', name: 'user-o'}} 
                        onChangeText={(firstname) => this.setState({firstname})} 
                        value={this.state.firstname} 
                        // containerStyle={styles.formInput}
                        inputContainerStyle={styles.formInput}  // for fix
                        />
                    <Input 
                        placeholder='Last Name' 
                        leftIcon={{ type:'font-awesome', name: 'user-o'}} 
                        onChangeText={(lastname) => this.setState({lastname})} 
                        value={this.state.lastname} 
                        // containerStyle={styles.formInput}
                        inputContainerStyle={styles.formInput}  // for fix
                        />
                    <Input 
                        placeholder='Email' 
                        leftIcon={{ type:'font-awesome', name: 'envelope-o'}} 
                        onChangeText={(email) => this.setState({email})} 
                        value={this.state.email} 
                        // containerStyle={styles.formInput}
                        inputContainerStyle={styles.formInput}  // for fix
                        />
                    <CheckBox 
                        title='Remember Me' 
                        center 
                        checked={this.state.remember} 
                        onPress={() => this.setState({remember: !this.state.remember})} 
                        // containerStyle={styles.formCheckbox}
                        inputContainerStyle={styles.formCheckbox}   // for fix
                        />
                    <View style={styles.formButton}>
                        <Button 
                            onPress={() => this.handleRegister()} 
                            title='Register' 
                            icon={
                                <Icon 
                                    name='user-plus' 
                                    type='font-awesome' 
                                    size={24}
                                    color='white' 
                                />
                            } 
                            buttonStyle={{ backgroundColor: '#FF8C00' }}
                            />
                    </View>
                </View> 
            </ScrollView>
        );
    }
}

const Login = createBottomTabNavigator({
    Login: LoginTab,
    Register: RegisterTab
}, {
    tabBarOptions: {
        activeBackgroundColor: '#FF8C00',
        inactiveBackgroundColor: '#FFD700',
        activeTintColor: 'white',
        inactiveTintColor: 'gray'
    }
});

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        // margin: 20
        margin: 10
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    image: {
        margin: 10,
        // width: 80,
        // height: 60
        width: 40,
        height: 30
    },
    formInput: {
        // margin: 40
        margin: 15
    },
    formCheckbox: {
        // margin: 40,
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        // margin: 60
        margin: 30
    }
});

export default Login;