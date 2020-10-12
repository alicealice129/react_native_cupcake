import React, { Component } from 'react';
import { ScrollView, View, Text, FlatList } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { LEADERS } from '../shared/leaders';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { Loading } from './LoadingComponent';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      leaders: state.leaders
    }
  }

function History() {
    return(
        <Card title="Our History">
            <Text style={{margin: 10}}>
                Started in 2010, Cupcake shop established in Harajuku, Tokyo. 

            </Text>
            <Text style={{margin: 10}}>
                The access to our shop is 5 minutes by walk from JR Harajuku Station. please see the page of Contact Us.
            </Text>
        </Card>
    );
}

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {
            leaders: LEADERS
        }
    }

    static navigationOptions = {
        title: 'About Us'
    };

    render() {

        const renderLeadersItem = ({item, index}) => {
            return(
                <ListItem
                    key={index} 
                    title={item.name} 
                    subtitle={item.description} 
                    hideChevron={true} 
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                    // leftAvatar={{ source: require('./images/abc.png')}}
                />
            );
        }

        const { navigate } = this.props.navigation;

        if (this.props.leaders.isLoading) {
            return (
                <ScrollView>
                    <History />
                    {/* <Leaders /> */}
                    <Card title="Corporate Leadership">
                        <Loading />
                    </Card>
                </ScrollView>
            );
        } 
        else if (this.props.leaders.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >
                        <History />
                        {/* <Leaders /> */}
                        {/* <Card title="Corporate Leadership">
                            <Text>{this.props.leaders.errMess}</Text>
                        </Card> */}
                    </Animatable.View>
                </ScrollView>
            );
        }
        else {
            return(
                <ScrollView>
                    <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >
                        <History />
                        {/* <Leaders /> */}
                        {/* <Card title="Corporate Leadership">
                            <FlatList
                                data={this.props.leaders.leaders} 
                                renderItem={renderLeadersItem} 
                                keyExtractor={item => item.id.toString()}
                            />
                        </Card> */}
                    </Animatable.View>
                </ScrollView>
            );
        }
    }
}

// export default About; 
export default connect(mapStateToProps)(About);
