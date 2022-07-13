import Image from 'next/image'
import { useRouter } from 'next/router'

import { Button } from '../components/Button'
import IlustrationImg from '../../public/images/illustration.svg'
import LogoImg from '../../public/images/logo.svg'
import GoogleImg from '../../public/images/google-icon.svg'

import styles from '../styles/Home.module.scss'

export default function Home() {
  const router = useRouter()

  const handleCreateNewRoom = () => {
    router.push('/new-room')
  }

  return (
    <div id={styles.pageAuth}>
      <aside>
        <Image
          src={IlustrationImg}
          alt='ilustração simbolizando perguntas e respostas'
          width={IlustrationImg.width}
          height={IlustrationImg.height}
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua aplicação em tempo real</p>
      </aside>
      <main>
        <div className={styles.mainContent}>
          <Image
            src={LogoImg}
            alt='let me ask'
            width={LogoImg.width}
            height={LogoImg.height}
          />
          <button className={styles.createRoom} onClick={handleCreateNewRoom}>
            <Image
              src={GoogleImg}
              alt='Logo do google'
              width={GoogleImg.width}
              height={GoogleImg.height}
            />
            <span>Crie sua sala com o Google</span>
          </button>
          <div className={styles.separator}>ou entre em uma sala</div>
          <form>
            <input type='text' placeholder='Digite o código da sala' />
            <Button type='submit'>Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  )
}
