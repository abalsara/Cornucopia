import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type ActionButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

/**
 * Renders a themed button that is used to handle primary user actions
 * @param props.label - The text that is shown within the button
 * @param props.onPress - Callback function for the button press event
 * @param props.disabled - expression that causes the button to be disabled
 */
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
