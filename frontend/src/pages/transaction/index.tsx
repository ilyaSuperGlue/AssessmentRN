import { StyleSheet } from 'react-native-unistyles';
import Header from '../../components/Header';
import { FlatList, View } from 'react-native';
import useGetcolor from '../../lib/useGetColor';
import HomeRecentItem from '../home/components/HomeRecentItem';
import TrxSearch from './components/TrxSearch';
import TrxPagination from './components/TrxPagination';
import { useNavigation } from '@react-navigation/native';
import {
  EnumScreen,
  RootStackParamList,
} from '../../navigation/interface/rootstack';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const data = [
  {
    refId: '123ABC',
    transferDate: '2024-10-15T12:34:56Z',
    recipientName: 'John Doe',
    transferName: 'Salary Payment',
    amount: 1500.0,
  },
  {
    refId: '456DEF',
    transferDate: '2024-09-21T09:12:45Z',
    recipientName: 'Jane Smith',
    transferName: 'Invoice Payment',
    amount: 2300.0,
  },
  {
    refId: '789GHI',
    transferDate: '2024-10-05T16:18:30Z',
    recipientName: 'Robert Brown',
    transferName: 'Refund',
    amount: -500.0,
  },
  {
    refId: '101JKL',
    transferDate: '2024-08-30T11:47:22Z',
    recipientName: 'Emily Davis',
    transferName: 'Bonus Payment',
    amount: 1200.0,
  },
  {
    refId: '123ABCs',
    transferDate: '2024-10-15T12:34:56Z',
    recipientName: 'John Doe',
    transferName: 'Salary Payment',
    amount: -1500.0,
  },
];

const Transaction = () => {
  const { colors } = useGetcolor();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Header />
      <TrxSearch />
      <FlatList
        data={data}
        renderItem={({ item, index }) => (
          <HomeRecentItem
            {...item}
            index={index}
            isFull
            onPress={() =>
              navigation.navigate(EnumScreen.TRANSACTION_DETAIL, {
                transaction: item,
              })
            }
          />
        )}
        keyExtractor={({ refId }) => refId}
      />
      <TrxPagination />
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    padding: 20,
  },
}));
