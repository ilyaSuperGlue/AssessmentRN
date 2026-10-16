import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import useGetcolor from '../../lib/useGetColor';
import HomeHeader from './components/HomeHeader';
import HomeMoneyToggle from './components/HomeMoneyToggle';
import HomeCard from './components/HomeCard';
import HomeRecentItem from './components/HomeRecentItem';
import { useCallback } from 'react';
import images from '../../assets/images';
import { useNavigation } from '@react-navigation/native';
import { EnumScreen } from '../../navigation/interface/rootstack';

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

const Home = () => {
  const { colors } = useGetcolor();
  const navigation = useNavigation();

  const ListHeaderComponent = useCallback(() => {
    return (
      <View>
        <HomeCard />
        <HomeMoneyToggle />
        <View style={styles.trxHead}>
          <Text
            style={[
              styles.txtRecentTrx,
              {
                color: colors.foreground,
              },
            ]}
          >
            Recent Transaction
          </Text>
          <Pressable
            onPress={() => navigation.navigate(EnumScreen.TRANSACTION)}
          >
            <Image source={images.arrow} />
          </Pressable>
        </View>
      </View>
    );
  }, [colors.foreground, navigation]);

  const ListFooterComponent = useCallback(() => {
    return (
      <Pressable
        style={styles.btnShow}
        onPress={() => navigation.navigate(EnumScreen.TRANSACTION)}
      >
        <Text
          style={{
            color: colors.secondary,
          }}
        >
          Show more
        </Text>
      </Pressable>
    );
  }, [colors.secondary, navigation]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <HomeHeader />
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        data={data}
        renderItem={({ item, index }) => (
          <HomeRecentItem
            {...item}
            index={index}
            isFull={false}
            onPress={() =>
              navigation.navigate(EnumScreen.TRANSACTION_DETAIL, {
                transaction: item,
              })
            }
          />
        )}
        keyExtractor={({ refId }) => refId}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    padding: 20,
  },
  txtRecentTrx: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.2,
  },
  trxHead: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    justifyContent: 'space-between',
  },
  txtShowMore: {
    fontWeight: '600',
    fontSize: 15,
  },
  btnShow: {
    alignSelf: 'flex-end',
    padding: 5,
  },
}));
