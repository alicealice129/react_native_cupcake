import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, StyleSheet, Button, Alert, PanResponder, Share } from 'react-native';
import { Card, Icon, Rating, Input } from 'react-native-elements';
import { render } from 'react-dom';
// import { DISHES } from '../shared/dishes';
// import { COMMENTS } from '../shared/comments';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';
import { postFavorite, postComment } from '../redux/ActionCreators';
import * as Animatable from 'react-native-animatable';

const mapStateToProps = state => {
    return {
      dishes: state.dishes,
      comments: state.comments,
      favorites: state.favorites
    }
  }

const mapDispatchToProps = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId)),
    addComment:(dishId, rating, comment, author) =>dispatch(addComment(dishId, rating, comment, author)),
    postComment:(dishId, rating, comment, author) => dispatch(postComment(dishId, rating, comment, author))
});

function RenderDish(props) {
    const dish = props.dish;

    handleViewRef = ref => this.view = ref;

    const recognizeDrag = ({ moveX, moveY, dx, dy}) => {
        if (dx < -200)      // right to left gesture
            return true;
        else
            return false;
    };

    const recognizeComment = ({ moveX, moveY, dx, dy}) => {
        if (dx > 200)      // left to right gesture
            return true;
        else
            return false;
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gestureState) => {
            return true;
        },
        onPanResponderGrant: () => {
            this.view.rubberBand(1000)
            .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
        },
        onPanResponderEnd: (e, gestureState) => {
            if (recognizeDrag(gestureState))
                Alert.alert(
                    'Add to Favorites?',
                    'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                    [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('Cancel pressed'),
                            style: 'cancel'
                        },
                        {
                            text: 'OK',
                            onPress: () => props.favorite ? console.log('Already favorite') : props.onPress()
                        }
                    ]
                );
            else if (recognizeComment(gestureState))
                props.openCommentForm()
            return true;
        }
    });

    const shareDish = (title, message, url) => {
        Share.share({
           title: title,
           message: title + ': ' + message + ' ' + url,
           url: url
        }, {
            dialogTitle: 'Share ' + title
        });
    }

    if (dish != null) {
        return(
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} 
                ref={handleViewRef} 
                {...panResponder.panHandlers}>
                <Card 
                    featuredTitle={dish.name} 
                    image={{uri: baseUrl + dish.image}}
                    >
                    <Text style={{margin: 10}}>
                        {dish.description}
                    </Text>
                    <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                        <Icon 
                            raised 
                            reverse 
                            name={ props.favorite ? 'heart' : 'heart-o'}
                            type='font-awesome' 
                            color='#f50' 
                            onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()} 
                            />
                        <Icon 
                            raised 
                            reverse 
                            name={'pencil'} 
                            type='font-awesome' 
                            color='#FF8C00' 
                            onPress={() => props.openCommentForm()}
                            />
                        <Icon 
                            raised 
                            reverse 
                            name='share' 
                            type='font-awesome' 
                            color='#51D2A8' 
                            onPress={() => shareDish(dish.name, dish.description, baseUrl + dish.image)}
                            />
                    </View>
                </Card>
            </Animatable.View>
        );
    }
    else {
        return(<View></View>);
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index }) => {
        return(
            <View key={index} style={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Animatable.View animation="fadeInUp" duration={2000} delay={1000} >
            <Card title="Comments">
                <FlatList 
                    data={comments} 
                    renderItem={renderCommentItem} 
                    keyExtractor={item => item.id.toString()} 
                    />
            </Card>
        </Animatable.View>
    );
}

// function Dishdetail(props) {
class Dishdetail extends Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         // dishes: DISHES,
    //         // comments: COMMENTS,
    //         // favorites: [],
    //         rating: 0,
    //         author: '',
    //         comment: '',
    //         showModal: false
    //     };
    // };

    constructor(props) {
        super(props);
        this.state = this.defaultState();
    };

    defaultState(){
        return({
            rating: 3,
            author: '',
            comment: '',
            showCommentForm: false
        })
    }

    resetCommentForm(){
        this.setState(this.defaultState());
    }

    openCommentForm(){
        this.setState({showCommentForm: true})
    }

    // toggleModal() {
    //     this.setState({showModal: !this.state.showModal})
    // }

    handleComments(dishId) {
        // this.toggleModal();
        this.props.postComment(dishId, this.state.rating, this.state.comment, this.state.author);
        this.resetCommentForm();
    }

    markFavorite(dishId) {
        // this.setState({ favorites: this.state.favorites.concat(dishId)})
        this.props.postFavorite(dishId);
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        const dishId = this.props.navigation.getParam('dishId','');

        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)} 
                    onPress={() => this.markFavorite(dishId)} 
                    openCommentForm={() => this.openCommentForm()}
                    // onSelect = {() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                    animationType={'slide'}
                    transparent={false}
                    visible={this.state.showCommentForm}
                    onDismiss={() => {this.resetCommentForm();}}
                    onRequestClose={() => {this.resetCommentForm();}}
                >
                    <View style = {styles.modal}>
                        <View>
                            <Rating showRating
                                    type = "star"
                                    fractions = {0}
                                    startingValue = {0}
                                    imageSize = {40}
                                    onFinishRating = {(rating) => this.setState({rating: rating})}
                                />
                            <Input
                                placeholder='Author'
                                leftIcon={
                                    <Icon
                                        name='user-o'
                                        type = 'font-awesome'
                                        size={24}
                                    />
                                }
                            onChangeText = {(value) => this.setState({author: value})}
                            />
                        </View>
                        <View>
                            <Input
                                placeholder = "Comment"
                                leftIcon = {
                                    <Icon
                                        name = 'comment-o'
                                        type = 'font-awesome'
                                        size = {24}
                                    />
                                }
                                onChangeText = {(value) => this.setState({comment: value})}
                            />
                        </View>
                        <View style={styles.marginBottom}>
                            <Button color = "#FF8C00"
                                    title = "SUBMIT"
                                    onPress = {() => this.handleComments(dishId)}
                                    />
                        </View>
                        <View style={styles.marginBottom}>
                            {/* <Button onPress = {() => this.toggleModal()} */}
                            <Button onPress = {() => this.resetCommentForm()}
                                    color = "#808080"
                                    title = "CLOSE"
                                    />
                        </View>     
                    </View>
                </Modal>
            </ScrollView>
            // <ScrollView>
            // <RenderDish dish={this.props.dishes.dishes[+dishId]}
            //     // favorite={this.state.favorites.some(el => el === dishId)}
            //     favorite={this.props.favorites.some(el => el === dishId)}
            //     onPress={() => this.markFavorite(dishId)} 
            //     />
            // <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            // </ScrollView>
            // <ScrollView>
            //     <RenderDish dish={this.state.dishes[+dishId]} 
            //         favorite={this.state.favorites.some(el => el === dishId)} 
            //         onPress={() => this.markFavorite(dishId)}
            //         />
            //     <RenderComments comments={this.state.comments.filter((comment) => comment.dishId === dishId)} />
            // </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 28
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#FF8C00',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    },
    marginBottom:{ 
        margin:10
    }
});

// export default Dishdetail; 
export default connect(mapStateToProps, mapDispatchToProps)(Dishdetail);