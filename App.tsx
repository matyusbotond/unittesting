import React from 'react';
import {Button, Modal, SafeAreaView} from 'react-native';

import MapView, {Geojson, Marker, Polygon} from 'react-native-maps';
import {ITodoItem} from './ITodoItem';
import TodoList from './TodoList';
import polygons from './geojson.json';
import Geolocation from '@react-native-community/geolocation';
import * as turf from '@turf/turf';
import {Feature} from '@turf/turf';

function isInPolygon(
  point: {latitude: number; longitude: number},
  polygonArray: {latitude: number; longitude: number}[],
) {
  let x = point.latitude;
  let y = point.longitude;

  let inside = false;
  for (
    let i = 0, j = polygonArray.length - 1;
    i < polygonArray.length;
    j = i++
  ) {
    let xLat = polygonArray[i].latitude;
    let yLat = polygonArray[i].longitude;
    let xLon = polygonArray[j].latitude;
    let yLon = polygonArray[j].longitude;

    let intersect =
      yLat > y !== yLon > y &&
      x < ((xLon - xLat) * (y - yLat)) / (yLon - yLat) + xLat;
    if (intersect) inside = !inside;
  }
  return inside;
}

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
      this.setState({currentLocation: info.coords}, () =>
        Geolocation.watchPosition((r) =>
          this.setState({currentLocation: r.coords}, () => {
            if (this.state.currentLocation) {
              const point = turf.point([
                this.state.currentLocation?.longitude,
                this.state.currentLocation?.latitude,
              ]);
              const pointInPoly = turf.booleanPointInPolygon(
                point,
                polygons.features[0],
              );

              if (pointInPoly) {
                console.log(`position is in polygon`);
              }
            }
          }),
        ),
      ),
    );
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
