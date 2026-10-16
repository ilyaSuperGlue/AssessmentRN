import { Pressable, ScrollView, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import useGetcolor from '../../lib/useGetColor';
import Header from '../../components/Header';
import TrxIcon from './components/TrxIcon';
import formatMoney from '../../lib/formatMoney';
import TrxLabelValue from './components/TrxLabelValue';
import moment from 'moment';
import { DateEnum } from '../../constant/date';
import { useRoute } from '@react-navigation/native';
import { HomeRecentItemProp } from '../home/components/HomeRecentItem';

const TransactionDetail = () => {
  const params = useRoute().params as {
    transaction: Omit<HomeRecentItemProp, 'isFull' | 'onPress'>;
  };
  const data = params.transaction;
  const { colors } = useGetcolor();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header title="Transaction detail" />
      <ScrollView>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={[styles.txtTfName, { color: colors.foreground }]}>
              {data.transferName}
            </Text>
            <TrxIcon amount={data.amount} transferName={data.transferName} />
          </View>
          <View style={styles.divider} />
          <Text style={[styles.currency, { color: colors.foreground }]}>
            RM
          </Text>
          <Text
            style={[
              styles.txtMoney,
              {
                color:
                  Number(data.amount ?? 0) > 0 ? colors.success : colors.danger,
              },
            ]}
          >
            {formatMoney(data.amount)}
          </Text>
          <View style={styles.mt(5)} />
          <TrxLabelValue label="Ref Id" value={data.refId} />
          <TrxLabelValue label="From" value={data.recipientName} />
          <TrxLabelValue
            label="Date and time"
            value={moment(data.transferDate).format(DateEnum.FULL)}
          />
          <TrxLabelValue label="Note" value={'-'} />
        </View>
      </ScrollView>
      <View style={styles.spacer}>
        <Pressable style={styles.btnPrimary} onPress={() => {}}>
          <Text style={styles.textBtn}>Share</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default TransactionDetail;

const styles = StyleSheet.create(({ colors }) => ({
  container: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginTop: 30,
    borderWidth: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#eaeaeaaa',
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtTfName: {
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 1.2,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eaeaeaaa',
    marginVertical: 20,
  },
  currency: {
    fontWeight: '600',
  },
  txtMoney: {
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: 1.5,
    lineHeight: 20,
  },
  mt: (marginTop: number) => ({
    marginTop,
  }),
  btnPrimary: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 15,
    backgroundColor: colors.accent,
    alignSelf: 'center',
  },
  textBtn: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  spacer: { flex: 1, justifyContent: 'flex-end' },
}));
