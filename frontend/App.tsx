/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import './unistyles';
import RootStack from './src/navigation';
import { StyleSheet, useUnistyles } from 'react-native-unistyles';
import { ThemeEnum } from './src/constant/theme';

function App() {
  const {
    rt: { themeName },
  } = useUnistyles();
  return (
    <SafeAreaProvider>
      <StatusBar
        key={themeName}
        barStyle={
          themeName === ThemeEnum.DARK ? 'light-content' : 'dark-content'
        }
      />
      <SafeAreaView style={styles.container}>
        <RootStack />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;

const styles = StyleSheet.create(({ colors }) => {
  return {
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
  };
});
