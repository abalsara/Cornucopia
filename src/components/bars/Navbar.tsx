import { useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

type NavbarProps = {
  title: string;
  backButtonShown?: boolean;
};

/**
 * renders a top navbar that displays the page's title and a back button if possible
 */
export default function Navbar(props: NavbarProps) {
  const router = useRouter();
  if (router.canGoBack() && props.backButtonShown !== false) {
    return (
      <Appbar.Header>
        <Appbar.BackAction onPress={() => router.back()} />
        <Appbar.Content title={props.title} />
      </Appbar.Header>
    );
  }
  return (
    <Appbar.Header>
      <Appbar.Content title={props.title} />
    </Appbar.Header>
  );
}
