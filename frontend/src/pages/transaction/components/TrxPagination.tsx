import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import useGetcolor from '../../../lib/useGetColor';

const TrxPagination = () => {
  const { colors } = useGetcolor();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.txtPagination, { color: colors.accent + '66' }]}>
          Prev
        </Text>
        <View style={styles.pages}>
          <View style={[styles.page, { backgroundColor: colors.accent }]}>
            <Text style={[styles.txtPage, { color: colors.white }]}>1</Text>
          </View>
          <Text style={[styles.txtPage, { color: colors.foreground }]}>2</Text>
          <Text style={[styles.txtPage, { color: colors.foreground }]}>3</Text>
          <Text style={[styles.txtPage, { color: colors.foreground }]}>4</Text>
        </View>
        <Text style={[styles.txtPagination, { color: colors.accent }]}>
          Next
        </Text>
      </View>
    </View>
  );
};

export default TrxPagination;

const styles = StyleSheet.create(() => ({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    minHeight: 68,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderTopColor: '#eaeaeaaa',
  },
  content: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 18,
  },
  pages: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  txtPagination: {
    fontSize: 15,
    fontWeight: '600',
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  page: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtPage: {
    fontSize: 15,
    fontWeight: '600',
  },
}));
