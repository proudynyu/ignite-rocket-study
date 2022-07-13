import { LoginBox } from "./components/LoginBox";
import { MessageList } from "./components/MessageList";
import { SendMessageForm } from "./components/SendMessageForm";
import { useAuthContext } from "./context/AuthContext";

import styles from "./styles/App.module.scss";

export const App = () => {
  const { user } = useAuthContext();
  return (
    <main className={styles.contentWrapper}>
      <MessageList />
      {!!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  );
};
