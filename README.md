## React Native アプリ (概要)
- このアプリは、下記の以前作成したPHPを使った架空のサイト(https://github.com/alicealice129/final01) に似せて作成したReact Nativeアプリです。オリジナルカップケーキのサイトです。　　
- Courseraで学んだことを元に作成しました。英語で学んだため英語で作成しています。

## スキル/ This app uses some skills of Native React as below.
- Components, Navigation, Icons and Buttons, Redux, Activity Indicator, Redux Adding Favorites, Forms, Modal, Deleting Favorite, Alert, Animation, Animatable, Gestures, Persist Redux Store, Secure Store, Local Notifications, Sending Email, Social Sharing, Picking an Image, Image Manuplator, Network Info  
- server: json-server  

## 詳細/ Description　(フロント側で実装したこと)
- ログイン、新規登録画面
- ホーム画面
- メニュー、商品の詳細、お気に入りの追加・削除、商品へのコメント追加、ソーシャルシェアリング  
- コンタクト画面、メール送信  
- 予約画面

## サイトのイメージ
<img src="https://github.com/alicealice129/react_native_cupcake/blob/master/screenshots/Screenshot_Expo_home.jpg" width="200px">
他の画像は以下より確認できます。<br>
https://github.com/alicealice129/react_native_cupcake/tree/master/screenshots  


## Initial Setup

- Getting Started with React Native
 - Installing Yarn
  - To install Yarn, you can find the instructions for your specific platform at https://yarnpkg.com/en/docs/install.

 - Setting up the create-react-native-app
 $ brew install yarn
 $ sudo yarn global add expo-cli
 $ expo init <project name>
 -  Then a project will be created under the name of
 $ cd <project name>
 $ yarn start


 - Setting up the create-react-native-app (old version)
 $ yarn global add create-react-native-app@1.0.0
  - This will make the command line tool for creating React Native applications. To learn more about the various commands that this CLI provides, type at the prompt:
  $ create-react-native-app --help
 - Generating and Serving a React Project using create-react-app
 $ create-react-native-app confusion
 - This should create a new folder named confusion within your ReactNative folder and create the React Native application in that folder.
 - Move to the confusion folder and type the following at the prompt:
 $ yarn start


##  Running your React Native application
- Install the Expo client app on your iOS or Android phone and connect to the same wireless network as your computer.
- On Android, use the Expo app to scan the QR code from your terminal to open your - project. On iOS, follow on-screen instructions to get a link.
- This provides the best experience for implementing and testing your application on a real device.  

- https://docs.expo.io/get-started/installation/
- https://docs.expo.io/workflow/ios-simulator/  


## Install
- for React Native Components Part 1
 - Install React Native Elements (RNE) into your project in order to make use of the UI components that is supported by it: 
$ yarn add react-native-elements@beta

- for React Native Navigation Part 1  
$ yarn add react-navigation@2.0.1

- for Setting up Redux
$ yarn add redux@4.0.0 
$ yarn add react-redux@5.0.7 
$ yarn add redux-thunk@2.2.0 
$ yarn add redux-logger@3.0.6 

- for Debugging
$ yarn global add react-devtools@3.2.3

- for Adding a Form (add a Date Picker module to our app as follows:)
$ yarn add react-native-datepicker@1.7.2

- for Swipeout and Deleting Favorites(Swipe Gesture) 
$ yarn add react-native-swipeout@2.3.3

- for Using react-native-animatable (Animatable)
$ yarn add react-native-animatable@1.2.4

- for Persist Redux Store
$ yarn add redux-persist@5.9.1

- for date time picker (https://github.com/react-native-community/datetimepicker)  
$ yarn add @react-native-community/datetimepicker

- for Login component  
$ expo install expo-secure-store  
import * as SecureStore from 'expo-secure-store';  
use prop inputContainerStyle instead of containerStyle.  

- for Local Notifications
$ expo install expo-permissions
import * as Permissions from 'expo-permissions'; 

- for Sending Email  
$ expo install expo-mail-composer   
import * as MailComposer from 'expo-mail-composer'; 

- for Picking Image  
$ expo install expo-image-picker  
import * as ImagePicker from 'expo-image-picker';

- for Image Manipulator  
$ expo install expo-image-manipulator  
// import { ImageManipulator } from 'expo';  
import * as ImageManipulator from 'expo-image-manipulator'; 

- for Network Info  
$ yarn add @react-native-community/netinfo  ( expo install @react-native-community/netinfo )
import { NetInfo } from '@react-native-community/react-native-netinfo';  

- for Callendar 
$ expo install expo-calendar  
import * as Calendar from 'expo-calendar';

## for using Redux we will need to change the port of the json-server and make sure that the json-server is running 
$ json-server --host 0.0.0.0 --port 8000 ./db.json --watch 

$ json-server --watch db.json -p 3001 -d 2000 