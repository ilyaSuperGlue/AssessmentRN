import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import Header from '../../components/Header';
import useGetcolor from '../../lib/useGetColor';
import Toggle from '../../components/Toggle';
import MoneyToggle from '../../components/MoneyToggle';
import { useNavigation } from '@react-navigation/native';
import { EnumScreen } from '../../navigation/interface/rootstack';

const Setting = () => {
  const { colors } = useGetcolor();
  const navigation = useNavigation();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <Header title="Setting" />
      <View style={styles.flex}>
        <View style={styles.row}>
          <Text
            style={[
              styles.txtLabel,
              {
                color: colors.primary,
              },
            ]}
          >
            Switch Theme
          </Text>
          <Toggle />
        </View>
        <View style={styles.row}>
          <Text
            style={[
              styles.txtLabel,
              {
                color: colors.primary,
              },
            ]}
          >
            Money visibility
          </Text>
          <MoneyToggle />
        </View>
      </View>
      <Pressable
        style={[styles.btnPrimary, { backgroundColor: colors.accent }]}
        onPress={() => {
          navigation.reset({
            routes: [
              {
                name: EnumScreen.WELCOME,
              },
            ],
          });
        }}
      >
        <Text style={styles.textBtn}>Logout</Text>
      </Pressable>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create(() => ({
  container: {
    flex: 1,
    padding: 20,
  },
  flex: { flex: 1 },
  row: {
    gap: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  txtLabel: { fontSize: 16, fontWeight: '600' },
  btnPrimary: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 15,
    alignSelf: 'center',
  },
  textBtn: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
}));
