import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StyleSheet,ScrollView,Image, Text, View } from 'react-native';
//import Todo from './components/Todo';

export default class App extends React.Component {
  render() {
    return (
       
        <View style={styles.container}>
        <View style={{marginTop:35 ,alignItems:"center"}}>
      <ScrollView> 
          <View> 
                   <Image
          style={{width: 250, height: 100}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Text>This  is  info  about  Image ...</Text>
          </View>

          <View> 
                   <Image
          style={{width: 250, height: 100}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Text>This  is  info  about  Image  2...</Text>
          </View>


          <View> 
                   <Image
        style={{width: 250, height: 100}}
          source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
        />
        <Text>This  is  info  about  Image  3...</Text>
          </View>
    </ScrollView>
    </View>
        </View>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
});
