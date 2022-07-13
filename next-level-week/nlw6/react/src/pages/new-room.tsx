import Image from 'next/image'
import Link from 'next/link'

import { Button } from '../components/Button'
import IlustrationImg from '../../public/images/illustration.svg'
import LogoImg from '../../public/images/logo.svg'

import styles from '../styles/Home.module.scss'

export default function Home() {
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
          <h2>Criar uma nova sala</h2>
          <form>
            <input type='text' placeholder='Nome da sala' />
            <Button type='submit'>Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?{' '}
            <Link href='/'>
              <a>clique aqui</a>
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}
