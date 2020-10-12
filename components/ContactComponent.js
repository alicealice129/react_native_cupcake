import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
// import { MailComposer } from 'expo';
import * as MailComposer from 'expo-mail-composer'  // for fix

class Contact extends Component {

    sendMail() {
        MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern'
        });
    }

    static navigationOptions = {
        title: 'Contact Us'
    };

    render() {
        return(
            <View>
                <Animatable.View animation="fadeInDown" duration={2000} delay={1000} >
                    <Card title="Contact Information">
                        <Text style={{margin: 10}}>1-2-3</Text>
                        <Text style={{margin: 10}}>Harajuku, Tokyo</Text>
                        <Text style={{margin: 10}}>Japan</Text>
                        <Text style={{margin: 10}}>Tel: +80 1234 5678</Text>
                        <Text style={{margin: 10}}>Fax: +80 8765 4321</Text>
                        <Text style={{margin: 10}}>Email:fruitcupcake@abc.com</Text>
                        <Button 
                            title='Send Email' 
                            buttonStyle={{ backgroundColor: '#FF8C00'}} 
                            icon={<Icon name='envelope-o' type='font-awesome' color='white' />} 
                            onPress={this.sendMail}
                            />
                    </Card>
                </Animatable.View>
            </View>
        );
    }

}

export default Contact; 