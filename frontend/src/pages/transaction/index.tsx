import { StyleSheet } from 'react-native-unistyles';
import Header from '../../components/Header';
import { FlatList, RefreshControl, View } from 'react-native';
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
import { useTransactionStore } from '../../store/useTransactionStore';
import useGetTransactionPage from '../../network/useGetTransactionPage';

const Transaction = () => {
  const { colors } = useGetcolor();
  const { currentPage, pageData, maxPage, search } = useTransactionStore();

  const data = pageData[currentPage];
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { loading, fetchApi } = useGetTransactionPage({
    currentPage,
    perPage: 10,
    search,
  });

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
      {maxPage && data?.data && <TrxSearch />}
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={fetchApi} />
        }
        data={data?.data}
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
        ListFooterComponent={<View style={styles.footer} />}
      />
      {maxPage && data?.data && <TrxPagination />}
    </View>
  );
};

export default Transaction;

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    padding: 20,
  },
  footer: { marginTop: 100 },
}));
