import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button, Modal, Alert } from 'react-native';
import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
// import { Permissions, Notifications } from 'expo';
import * as Permissions from 'expo-permissions'; 
import { PersistGate } from 'redux-persist/es/integration/react';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            guests:1,
            eatin: false,
            date: '',
            showModal: false,
        }
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal })
    }

    handleReservation() {
        Alert.alert(
            'Your Reservation OK?',
            'Number of Guests: ' + this.state.guests 
            + '\nEat in? ' + this.state.eatin 
            + '\nDate and Time' + this.state.date,
            [
                {
                    text: 'Cancel',
                    onPress: () => this.resetForm(),
                    // onPress: () => console.log('Cancel pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        // this.addReservationToCalendar(this.state.date);
                        // this.presentLocalNotification(this.state.date);
                        this.resetForm();
                    }
                    // onPress: () => console.log(JSON.stringify(this.state)),
                },
                { cancelable: false}
            ]
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            eatin: false,
            date: ''
        });
    }

    static async obtainNotificationPerimission() {
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if(permission.state !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    static async presentLocalNotification(date) {
        await this.obtainNotificationPerimission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation', 
            body: 'Reservation for ' + date + ' requested',
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#FF8C00'
            }
        });
    }

    static async obtainCalendarPermission() {
        let permission = await Permissions.getAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.CALENDAR);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to access the calendar');
            }
        }
        return permission;
      }


    async getDefaultCalendarId() {
        const calendars = await Calendar.getCalendarsAsync();
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        return defaultCalendars[0].id;
    }

    async addReservationToCalendar(date) {
        await this.obtainCalendarPermission();
        console.log("Date: " + date);
        const calendars = await Calendar.getCalendarsAsync();
        console.log({ calendars });
        const defaultCalendarId = await this.getDefaultCalendarId();
        console.log("Calendar Id: " + defaultCalendarId);
    
        Calendar.createEventAsync(defaultCalendarId, {
            title: 'Con Fusion Table Reservation',
            startDate: new Date(Date.parse(date)),
            endDate: new Date(Date.parse(date) + (2*60*60*1000)),
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        });
    }

    render() {
        const todayDate = new Date().toISOString().split('T')[0];
        return(
            <ScrollView>
                <Animatable.View animation="zoomInUp" >
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Number of Guests</Text>
                        <Picker 
                            style={styles.formItem} 
                            selectedValue={this.state.guests} 
                            onValueChange={(itemValue, itemIndex) => this.setState({ guests: itemValue })}
                            >
                            <Picker.Item label='1' value='1' />
                            <Picker.Item label='2' value='2' />
                            <Picker.Item label='3' value='3' />
                            <Picker.Item label='4' value='4' />
                            <Picker.Item label='5' value='5' />
                            <Picker.Item label='6' value='6' />    
                        </Picker>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Eat-in/Take out?</Text>
                        <Switch 
                            style={styles.formItem} 
                            value={this.state.eatin} 
                            trackColor='#FF8C00'
                            onValueChange={(value) => this.setState({ eatin: value})}
                            >
                        </Switch>
                    </View>
                    <View style={styles.formRow}>
                        <Text style={styles.formLabel}>Date and Time</Text>
                        <DatePicker
                            style={{flex: 2, marginRight: 20}}
                            date={this.state.date}
                            format=''
                            mode="datetime"
                            placeholder="select date and Time"
                            minDate="2017-01-01"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                            onDateChange={(date) => {this.setState({date: date})}}
                            />
                    </View>
                    <View style={styles.formRow}>
                        <Button 
                            title='Reserve' 
                            color='#FF8C00' 
                            onPress={() => this.handleReservation()} 
                            accessibilityLabel='Learn more about this purple button'
                            />
                    </View>
                    {/* <Modal 
                        animationType={'slide'} 
                        transparent={false} 
                        visible={this.state.showModal} 
                        onDismiss={() => {this.toggleModal(); this.resetForm()}} 
                        onRequestClose={() => {this.toggleModal(); this.resetForm()}}
                        >
                        <View style={styles.modal} >
                            <Text style={styles.modalTitle}>Your Reservation</Text>
                            <Text style={styles.modalText}>Number of Guests: {this.state.guests}</Text> */}
                            {/* <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'Yes' : 'No'}</Text> */}
                            {/* <Text style={styles.modalText}>Smoking? : {this.state.smoking ? 'No' : 'Yes'}</Text>
                            <Text style={styles.modalText}>Date and Time: {this.state.date}</Text>
                            <Button 
                                onPress={() => {this.toggleModal(); this.resetForm()}} 
                                color='#FF8C00' 
                                title='Close' 
                                />
                        </View>
                    </Modal> */}
                </Animatable.View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
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
        backgroundColor: '#512DAB',
        textAlign: 'center',
        color: 'white',
        marginBottom: 20
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})

export default Reservation;