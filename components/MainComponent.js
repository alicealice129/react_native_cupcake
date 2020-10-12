import React, { Component } from 'react';
import Home from './HomeComponent';
import About from './AboutComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
// import { DISHES } from '../shared/dishes';
import Dishdetail from './DishdetailComponent';
import Reservation from './ReservationComponent';
import Favorites from './FavoriteComponent';
import Login from './LoginComponent';
// import { View, Platform, Image, StyleSheet, ScrollView, Text, NetInfo, ToastAndroid } from 'react-native';
import { View, Platform, Image, StyleSheet, ScrollView, Text, ToastAndroid } from 'react-native';   
import NetInfo from '@react-native-community/netinfo';     // for fix
import { createStackNavigator, createDrawerNavigator, DrawerItems, SafeAreaView } from 'react-navigation';
import { Icon } from 'react-native-elements';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import { connect } from 'react-redux';
import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      promotions: state.promotions,
      leaders: state.leaders
    }
  }

  const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders()),
  })
  

const HomeNavigator = createStackNavigator({
    Home: { screen: Home }, 
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#FF8C00'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} 
            color='white' 
            onPress={() => navigation.toggleDrawer()}
            />
    })
});

const AboutNavigator = createStackNavigator({
    About: { screen: About }, 
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#FF8C00'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} 
            color='white' 
            onPress={() => navigation.toggleDrawer()}
            />
    })
});

const MenuNavigator = createStackNavigator({
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24} 
                color='white' 
                onPress={() => navigation.toggleDrawer()}
                />
        }) 
    },
    Dishdetail: { screen: Dishdetail }
},
{
    initialRouteName: 'Menu',
    navigationOptions: {
        headerStyle: {
            backgroundColor: "#FF8C00"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: "#fff"            
        }
    }
}
);

const ContactNavigator = createStackNavigator({
    Contact: { screen: Contact }, 
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#FF8C00'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} 
            color='white' 
            onPress={() => navigation.toggleDrawer()}
            />
    })
});

const ReservationNavigator = createStackNavigator({
    Reservation: { screen: Reservation }, 
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#FF8C00'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} 
            color='white' 
            onPress={() => navigation.toggleDrawer()}
            />
    })
});

const FavoritesNavigator = createStackNavigator({
    Favorites: { screen: Favorites }, 
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#FF8C00'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} 
            color='white' 
            onPress={() => navigation.toggleDrawer()}
            />
    })
});

const LoginNavigator = createStackNavigator({
    Login: { screen: Login }, 
}, {
    navigationOptions: ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#FF8C00'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24} 
            color='white' 
            onPress={() => navigation.toggleDrawer()}
            />
    })
});
const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
            <View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('./images/cupcakeicon1.jpeg')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>Eat Fruit Cupcake</Text>
                </View>
            </View>
            <DrawerItems {...props} />
        </SafeAreaView>
    </ScrollView>
);

const MainNavigator = createDrawerNavigator({
    Login: { screen: LoginNavigator,
        navigationOptions: {
            title: 'Login',
            drawerLabel: 'Login',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='sign-in' 
                    type='font-awesome'
                    size={24}
                    color={tintColor} 
                />
            )
        }
      },
    Home: { screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='home' 
                    type='font-awesome'
                    size={24}
                    color={tintColor} 
                />
            )
        }
      },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About Us',
            drawerLabel: 'About Us',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='info-circle' 
                    type='font-awesome'
                    size={24}
                    color={tintColor} 
                />
            )
        }
    },
    Menu: { screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='list' 
                    type='font-awesome'
                    size={24}
                    color={tintColor} 
                />
            )
        }, 
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact Us',
            drawerLabel: 'Contact Us',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='address-card' 
                    type='font-awesome'
                    size={22}
                    color={tintColor} 
                />
            )
        }
    },
    Favorites: {
        screen: FavoritesNavigator,
        navigationOptions: {
            title: 'My Favorites',
            drawerLabel: 'My Favorites',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='heart' 
                    type='font-awesome'
                    size={24}
                    color={tintColor} 
                />
            )
        }
    },
    Reservation: {
        screen: ReservationNavigator,
        navigationOptions: {
            title: 'Reserve Table',
            drawerLabel: 'Reserve Table',
            drawerIcon: ({ tintColor }) => (
                <Icon 
                    name='cutlery' 
                    type='font-awesome'
                    size={24}
                    color={tintColor} 
                />
            )
        }
    },
}, {
    initialRouteName: 'Home',   // for Login
    drawerBackgroundColor: '#FFEFD5',
    contentComponent: CustomDrawerContentComponent
});

class Main extends Component {

    componentDidMount() {
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();

        NetInfo.fetch().then((connectionInfo) => {
            ToastAndroid.show('Initial Network Connectivity Type: '
                + connectionInfo.type, ToastAndroid.LONG)
        });
        
        NetInfo.addEventListener(connectionChange => this.handleConnectivityChange(connectionChange));
    }

    // for Network info for fix 
    componentWillUnmount() {
        NetInfo.removeEventListener(connectionChange => this.handleConnectivityChange(connectionChange));
    }
    
    handleConnectivityChange = (connectionInfo) => {
        switch(connectionInfo.type) {
            case 'none':
                ToastAndroid.show('You are now offline!', ToastAndroid.LONG);
                break;
            case 'wifi':
                ToastAndroid.show('You are now connected to WiFi!', ToastAndroid.LONG);
                break;
            case 'cellular':
                ToastAndroid.show('You are now connected to Cellular!',  ToastAndroid.LONG);
                break;
            case 'unknown':
                ToastAndroid.show('You now have an Unknown connection!',  ToastAndroid.LONG);
                break;
            default:
                break;
        }
    }

    render() {
        return(
            <View style={{flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
                <MainNavigator />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawerHeader: {
        backgroundColor: '#FF8C00',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
});


// export default Main;
export default connect(mapStateToProps, mapDispatchToProps)(Main);