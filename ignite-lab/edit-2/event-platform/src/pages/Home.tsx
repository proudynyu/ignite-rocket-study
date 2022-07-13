import { gql } from "@apollo/client"
import { useMutation } from "@apollo/client"
import { Spinner } from "phosphor-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Logo } from "../components/Icons/Logo"

export const Home = () => {
  const navigate = useNavigate()

  const [userName, setUserName] = useState<string>("")
  const [userEmail, setUserEmail] = useState<string>("")

  const [createSub, { loading }] = useMutation<MutationResponse, MutationData>(
    CREATE_SUBSCRIBER
  )

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()

    if (!userName || !userEmail) return

    try {
      await createSub({
        variables: { name: userName, email: userEmail },
      })
    } catch (e) {
      console.error(e)
    }

    navigate("/event")
  }

  return (
    <div className='min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center'>
      <div className='flex items-center justify-between w-full max-w-[1100px] mt-20 mx-auto'>
        <div className='max-w-[640px]'>
          <Logo />
          <h1 className='mt-8 text-[2.5rem] leading-tight'>
            Construa uma{" "}
            <strong className='text-blue-500'>aplicação completa</strong>, do
            zero, com <strong className='text-blue-500'>React JS</strong>
          </h1>
          <p className='mt-4 text-gray-200 leading-relaxed'>
            Em apenas uma semana você vai dominar na prática uma das tecnologias
            mais utilizadas e com alta demanda para acessar as melhores
            oportunidades do mercado.
          </p>
        </div>

        <div className='p-8 bg-gray-700 border border-gray-500 rounded'>
          <strong className='text-2xl mb-6 block'>
            Inscreva gratuitamente
          </strong>

          <form
            className='flex flex-col gap-2 w-full'
            onSubmit={(e) => handleSubmit(e)}
          >
            <label htmlFor='userName' className='hidden'>
              Nome:
            </label>
            <input
              className='bg-gray-900 rounded px-5 h-14'
              type='text'
              placeholder='Seu nome completo'
              name='userName'
              id='userName'
              onChange={(e) => setUserName(e.target.value)}
            />
            <label htmlFor='userEmail' className='hidden'>
              Email:
            </label>
            <input
              className='bg-gray-900 rounded px-5 h-14'
              type='text'
              placeholder='Digite seu email'
              name='userEmail'
              id='userEmail'
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <button
              className='flex items-center justify-center gap-2 mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50'
              type='submit'
              disabled={loading}
            >
              Garantir minha vaga
              {loading && <Spinner size={12} color='#fff' />}
            </button>
          </form>
        </div>
      </div>

      <img
        src='/src/assets/bg-home-image.png'
        alt='React code'
        className='mt-10'
      />
    </div>
  )
}
