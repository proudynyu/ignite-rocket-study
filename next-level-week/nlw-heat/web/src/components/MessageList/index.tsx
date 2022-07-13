import { useEffect, useState } from "react";
import { api } from "../../services/api";

import logoImg from "../../assets/logo.svg";
import styles from "./styles.module.scss";

interface MessagesResponse {
  created_at: string;
  id: string;
  text: string;
  user: {
    avatar_url: string;
    github_id: number;
    id: string;
    login: string;
    name: string;
  };
}

export const MessageList = () => {
  const [lastMessages, setLastMessages] = useState<MessagesResponse[]>(
    [] as MessagesResponse[]
  );

  useEffect(() => {
    api
      .get<MessagesResponse[]>("/messages/last-three")
      .then(({ data }) => setLastMessages(data));
  }, []);

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {lastMessages?.map(({ user, text }) => (
          <li className={styles.message}>
            <p className={styles.messageContent}>{text}</p>
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={user.avatar_url} alt="avatar" />
              </div>
              <span>{user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
