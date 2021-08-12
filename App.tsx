import React from 'react';
import {Alert, Button, Modal, SafeAreaView, Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import MapView, {Geojson, Marker} from 'react-native-maps';
import {ITodoItem} from './ITodoItem';
import TodoList from './TodoList';
import polygons from './geojson.json';
import Geolocation from '@react-native-community/geolocation';
import * as turf from '@turf/turf';
import BackgroundGeolocation from '@mauron85/react-native-background-geolocation';

interface Props {}

interface State {
  todoItems: {[key: string]: ITodoItem};
  showMap: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
}

export default class App extends React.Component<Props, State> {
  state: State = {
    todoItems: {
      first: {name: 'First', isDone: true},
      second: {name: 'Second', isDone: false},
    },
    showMap: false,
  };

  componentDidMount() {
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition((info) =>
      this.setState(
        {currentLocation: info.coords},
        //  () =>
        // Geolocation.watchPosition((r) =>
        //   this.setState({currentLocation: r.coords}, () => {
        //     if (this.state.currentLocation) {
        //       const point = turf.point([
        //         this.state.currentLocation?.longitude,
        //         this.state.currentLocation?.latitude,
        //       ]);
        //       const pointInPoly = turf.booleanPointInPolygon(
        //         point,
        //         polygons.features[0],
        //       );

        //       if (pointInPoly) {
        //         console.log(`position is in polygon`);
        //       }
        //     }
        //   }),
        // ),
      ),
    );

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider:
        Platform.OS === 'android'
          ? BackgroundGeolocation.ACTIVITY_PROVIDER
          : BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
      // url: 'http://192.168.81.15:3000/location',
      // httpHeaders: {
      //   'X-FOO': 'bar',
      // },
      // customize post properties
      // postTemplate: {
      //   lat: '@latitude',
      //   lon: '@longitude',
      //   foo: 'bar', // you can also add your own properties
      // },
    });

    BackgroundGeolocation.on('location', (location) => {
      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask((taskKey) => {
        if (location) {
          const point = turf.point([location.longitude, location.latitude]);
          const pointInPoly = turf.booleanPointInPolygon(
            point,
            polygons.features[0],
          );
          console.log(`Location is ${location.latitude}:${location.longitude}`);
          if (pointInPoly) {
            PushNotification.localNotification({
              /* Android Only Properties */
              channelId: 'your-channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
              ticker: 'My Notification Ticker', // (optional)
              showWhen: true, // (optional) default: true
              autoCancel: true, // (optional) default: true
              largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
              largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
              smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
              bigText:
                'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
              subText: 'This is a subText', // (optional) default: none
              bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
              bigLargeIcon: 'ic_launcher', // (optional) default: undefined
              bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
              color: 'red', // (optional) default: system default
              vibrate: true, // (optional) default: true
              vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
              tag: 'some_tag', // (optional) add tag to message
              group: 'group', // (optional) add group to message
              groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
              ongoing: false, // (optional) set whether this is an "ongoing" notification
              priority: 'high', // (optional) set notification priority, default: high
              visibility: 'private', // (optional) set notification visibility, default: private
              ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
              shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
              onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

              when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
              usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
              timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

              messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

              actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
              invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

              /* iOS only properties */
              category: '', // (optional) default: empty string
              subtitle: 'My Notification Subtitle', // (optional) smaller title below notification title

              /* iOS and Android properties */
              id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
              title: 'Location is in polygon', // (optional)
              message: `Location is ${location.latitude}:${location.longitude}`, // (required)
              userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
              playSound: false, // (optional) default: true
              soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
              number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
              repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
            });
          }
        }

        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on('stationary', (stationaryLocation) => {
      // handle stationary locations here
    });

    BackgroundGeolocation.on('error', (error) => {
      console.log('[ERROR] BackgroundGeolocation error:', error);
    });

    BackgroundGeolocation.on('start', () => {
      console.log('[INFO] BackgroundGeolocation service has been started');
    });

    BackgroundGeolocation.on('stop', () => {
      console.log('[INFO] BackgroundGeolocation service has been stopped');
    });

    BackgroundGeolocation.on('authorization', (status) => {
      console.log(
        '[INFO] BackgroundGeolocation authorization status: ' + status,
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              'App requires location tracking permission',
              'Would you like to open app settings?',
              [
                {
                  text: 'Yes',
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: 'No',
                  onPress: () => console.log('No Pressed'),
                  style: 'cancel',
                },
              ],
            ),
          1000,
        );
      }
    });

    BackgroundGeolocation.on('background', () => {
      console.log('[INFO] App is in background');
    });

    BackgroundGeolocation.on('foreground', () => {
      console.log('[INFO] App is in foreground');
    });

    BackgroundGeolocation.on('abort_requested', () => {
      console.log('[INFO] Server responded with 285 Updates Not Required');

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on('http_authorization', () => {
      console.log('[INFO] App needs to authorize the http requests');
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        '[INFO] BackgroundGeolocation service is running',
        status.isRunning,
      );
      console.log(
        '[INFO] BackgroundGeolocation services enabled',
        status.locationServicesEnabled,
      );
      console.log(
        '[INFO] BackgroundGeolocation auth status: ' + status.authorization,
      );

      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    // you can also just start without checking for status
    // BackgroundGeolocation.start();
  }

  componentWillUnmount() {
    // unregister all event listeners
    // BackgroundGeolocation.removeAllListeners();
    // Geolocation.stopObserving();
  }

  public render() {
    return (
      <>
        <SafeAreaView style={{flex: 1}}>
          <Modal visible={this.state.showMap} style={{flex: 1}}>
            <MapView
              style={{flex: 1}}
              initialRegion={{
                latitude: 47.47344546266993,
                latitudeDelta: 0.005,
                longitude: 19.060277165470204,
                longitudeDelta: 0.005,
              }}>
              {this.state.currentLocation ? (
                <Marker
                  title="Jelenlegi helyezete"
                  coordinate={{
                    latitude: this.state.currentLocation.latitude,
                    longitude: this.state.currentLocation.longitude,
                  }}
                />
              ) : null}
              <Marker
                title="BME Q épület"
                description="egyetemi épület"
                coordinate={{
                  latitude: 47.47344546266993,
                  longitude: 19.060277165470204,
                }}
              />
              <Geojson
                geojson={polygons as GeoJSON.GeoJSON}
                strokeColor="red"
                fillColor="#FF573350"
                strokeWidth={2}
              />
            </MapView>
            <Button
              title="Bezár"
              onPress={() => this.setState({showMap: false})}
            />
          </Modal>
          <TodoList
            todoItems={Object.values(this.state.todoItems)}
            setTodoItemToDone={(item) =>
              this.createOrUpdateTodoItem(item.name, true)
            }
            revertTodoItemFromDone={(item) =>
              this.createOrUpdateTodoItem(item.name, false)
            }
            addNewItem={(name) => this.createOrUpdateTodoItem(name, false)}
          />
          <Button
            title="Térkép"
            onPress={() => this.setState({showMap: true})}
          />
        </SafeAreaView>
      </>
    );
  }

  public createOrUpdateTodoItem(name: string, isDone: boolean) {
    const todoItems = {...this.state.todoItems};
    const todoItemKey = name.toLocaleLowerCase();
    const todoItem = todoItems[todoItemKey];

    console.log(JSON.stringify(todoItem));

    if (todoItem) {
      todoItems[todoItemKey] = {...todoItem, isDone: isDone};
    } else {
      todoItems[todoItemKey] = {name: name, isDone: isDone};
    }

    this.setState({todoItems});
  }
}
