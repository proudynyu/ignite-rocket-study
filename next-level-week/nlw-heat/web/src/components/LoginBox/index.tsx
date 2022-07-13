import { VscGithubInverted } from "react-icons/vsc";
import { useAuthContext } from "../../context/AuthContext";

import styles from "./styles.module.scss";

export const LoginBox = () => {
  const { signInUrl } = useAuthContext()
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24} />
        Entra com Github
      </a>
    </div>
  );
};
