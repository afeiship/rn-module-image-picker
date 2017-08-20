/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  Image,
  CameraRoll,
  ScrollView,
  View
} from 'react-native';

import ImagePicker1 from 'react-native-image-picker';
import ImagePicker2 from 'react-native-image-crop-picker';

export default class RnImagePicker extends Component {
  state = {
    images: []
  };

  _onPress1 = e => {
    var options = {
      title: 'Select Avatar',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    // Open Image Library:
    ImagePicker1.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      alert(JSON.stringify(response))
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        let source = { uri: response.uri };
    
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source
        });
      }
    });
  };

  _onPress2 = e => {
    ImagePicker2.openPicker({
      width: 300,
      height: 400,
      maxFiles:8,
      multiple:true,
      cropping: true
    }).then(image => {
      this.setState({
        images: image
      })
    });
  };

  /**
   * @thanks to:
   * https://stackoverflow.com/questions/34085656/cannot-access-cameraroll-undefined-is-not-an-objectevaluating-rctcamerarollma
   */
  _onPress3 = e => {
    CameraRoll.getPhotos({
        first: 25,
        // assetType: 'Photos'
    }).then((data) => {
      const assets = data.edges;
      const images = assets.map((asset) => asset.node.image);
      this.setState({
        images: images
      });
    }).catch(alert);
  };

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images
    });
  }

  logImageError(err) {
    console.log(err);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Button title="SHOW PICKER[Normal]" onPress={this._onPress1} />
        <Button title="SHOW PICKER[Crop]" onPress={this._onPress2} />
        <Button title="SHOW PICKER[CameraRoll]" onPress={this._onPress3} />
        <View style={styles.imageGrid}>
          { this.state.images.map((image,key) => <Image key={key} style={styles.image} source={{ uri: image.path }} />) }
        </View>
        <Text style={styles.instructions}>
          { JSON.stringify(this.state.images)}
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  welcome: {
    fontSize: 20,
    margin: 10,
  },
  instructions: {
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('RnImagePicker', () => RnImagePicker);
