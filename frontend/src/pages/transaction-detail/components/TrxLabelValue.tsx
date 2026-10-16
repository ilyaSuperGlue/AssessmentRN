import { Text, View } from 'react-native';
import useGetcolor from '../../../lib/useGetColor';
import { StyleSheet } from 'react-native-unistyles';

const TrxLabelValue = ({ label, value }: { label: string; value: string }) => {
  const { colors } = useGetcolor();
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.txtLabel,
          {
            color: colors.foreground + 'aa',
          },
        ]}
      >
        {label}
      </Text>
      <Text
        style={[
          styles.txtValue,
          {
            color: colors.foreground,
          },
        ]}
      >
        {value}
      </Text>
    </View>
  );
};

export default TrxLabelValue;

const styles = StyleSheet.create(() => ({
  container: {
    marginBottom: 20,
    gap: 8,
  },
  txtLabel: {
    fontSize: 14,
    fontWeight: '300',
  },
  txtValue: {
    fontWeight: '500',
    fontSize: 16,
  },
}));
