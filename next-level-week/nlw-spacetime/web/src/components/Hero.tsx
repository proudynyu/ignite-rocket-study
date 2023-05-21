import NextImage from 'next/image'
import Link from 'next/link'

import nlwLogo from '../assets/nlw-spacetime-logo.svg'

export function Hero() {
    return (
        <div className="space-y-5">
            <NextImage src={nlwLogo} alt="logo" />

            <div className="max-w-[420px] space-y-4">
                <h1 className="mt-5 text-5xl font-bold leading-tight text-gray-50">Sua capsula do tempo</h1>
                <p className="text-lg leading-relaxed">
                    Colecion momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
                </p>
            </div>

            <Link className="inline-block rounder-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600" href="">
                CADASTRAR LEMBRANÇA
            </Link>
        </div>
    )
}
