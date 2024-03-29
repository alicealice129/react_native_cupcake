import React, { Component } from 'react';
import { View, FlatList, Text } from 'react-native';
// import { ListItem } from 'react-native-elements';
import { Tile } from 'react-native-elements';
import { DISHES } from '../shared/dishes';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes
    }
  }

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    static navigationOptions = {
        title: 'Menu'
    };

    render() {

        const renderMenuItem = ({item, index}) => {
            return(
                <Animatable.View animation="fadeInRightBig" duration={2000} >
                    <Tile
                        key={index}
                        title={item.name}
                        caption={item.description}
                        featured
                        onPress={() => navigate('Dishdetail', { dishId: item.id })}
                        imageSrc={{ uri: baseUrl + item.image}}
                        />
                </Animatable.View>
                // <ListItem
                //     key={index} 
                //     title={item.name} 
                //     subtitle={item.description} 
                //     hideChevron={true} 
                //     onPress={() => navigate('Dishdetail', { dishId: item.id })} 
                //     leftAvatar={{ source: require('./images/uthappizza.png')}}
                // />
            );
        }
        
        const { navigate } = this.props.navigation;

        if (this.props.dishes.isLoading) {
            return (
                <Loading />
            );
        } 
        else if (this.props.dishes.errMess) {
            return (
                <View>
                    <Text>{this.props.dishes.errMess}</Text>
                </View>
            );
        }
        else {
            return (
                <FlatList 
                        data={this.props.dishes.dishes}
                        renderItem={renderMenuItem}
                        keyExtractor={item => item.id.toString()}
                        />
                // <FlatList
                //     data={this.state.dishes} 
                //     renderItem={renderMenuItem} 
                //     keyExtractor={item => item.id.toString()}
                // />
            );
        }
    }

}

// export default Menu; 
export default connect(mapStateToProps)(Menu);