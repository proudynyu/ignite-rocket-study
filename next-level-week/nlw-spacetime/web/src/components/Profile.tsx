import { getUser } from "@/lib/auth";
import NextImage from 'next/image'

export function Profile() {
    const { avatarUrl, name } = getUser()

    return (
        <div className="flex items-center gap-3 text-left">
            <NextImage src={avatarUrl} alt="avatar" width={40} height={40} className="w-10 h-10 rounded-full" />

            <p className="max-w-[140px] text-sm leading-snug">
                {name}
                <a href="/api/auth/logout" className="block text-red-400 hover:text-red-300">Quero sair</a>
            </p>
        </div>
    )
}
