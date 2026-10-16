import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/home';
import Welcome from '../pages/welcome';
import Transaction from '../pages/transaction';
import TransactionDetail from '../pages/transaction-detail';
import { EnumScreen, RootStackParamList } from './interface/rootstack';
import Setting from '../pages/settings';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={EnumScreen.WELCOME} component={Welcome} />
        <Stack.Screen name={EnumScreen.HOME} component={Home} />
        <Stack.Screen name={EnumScreen.TRANSACTION} component={Transaction} />
        <Stack.Screen
          name={EnumScreen.TRANSACTION_DETAIL}
          component={TransactionDetail}
        />
        <Stack.Screen name={EnumScreen.SETTING} component={Setting} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
