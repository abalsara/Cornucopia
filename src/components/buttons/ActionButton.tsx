import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function ActionButton(props: ActionButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={props.onPress}
      disabled={props.disabled}
      labelStyle={styles.buttonText}
      contentStyle={styles.buttonContent}>
      {props.label}
    </Button>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'light',
  },
  buttonContent: {
    height: 60,
  },
});
