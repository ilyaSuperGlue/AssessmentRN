import { Pressable, TextInput } from 'react-native';
import useGetcolor from '../../../lib/useGetColor';
import { StyleSheet } from 'react-native-unistyles';
import { useState } from 'react';
import Animated, { JumpingTransition } from 'react-native-reanimated';
import { useTransactionStore } from '../../../store/useTransactionStore';

const TrxSearch = () => {
  const { colors } = useGetcolor();
  const [text, setText] = useState('');
  const { setSearch } = useTransactionStore();
  return (
    <Animated.View style={styles.container} layout={JumpingTransition}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="search"
        onSubmitEditing={txt => setSearch(txt.nativeEvent.text)}
        placeholderTextColor={colors.foreground + 'aa'}
        style={[
          styles.input,
          {
            color: colors.foreground,
            shadowColor: colors.foreground + 'aa',
            backgroundColor: colors.background + 'aa',
            borderColor: colors.foreground + '66',
          },
        ]}
      />
      {text.length > 0 && (
        <Pressable
          hitSlop={10}
          onPress={() => {
            setText('');
            setSearch('');
          }}
        >
          <TextInput
            style={[
              styles.txtClr,
              {
                color: colors.danger,
              },
            ]}
          >
            Clear
          </TextInput>
        </Pressable>
      )}
    </Animated.View>
  );
};

export default TrxSearch;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.5,
    elevation: 3,
  },
  txtClr: {
    marginLeft: 8,
    fontWeight: '600',
    width: '10%',
    fontSize: 12,
  },
});
