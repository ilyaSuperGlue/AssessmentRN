import {
  FlatList,
  Image,
  Pressable,
  RefreshControl,
  Text,
  View,
} from 'react-native';
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
import useGetRecentTransaction from '../../network/useGetRecentTransaction';

const Home = () => {
  const { colors } = useGetcolor();
  const navigation = useNavigation();
  const { data, loading, fetchApi } = useGetRecentTransaction();

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
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchApi} />
        }
        ListHeaderComponent={ListHeaderComponent}
        data={data?.data}
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
