import { useRouter } from 'expo-router';
import { Appbar } from 'react-native-paper';

type NavbarProps = {
  title: string;
  backButtonShown?: boolean;
};

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
