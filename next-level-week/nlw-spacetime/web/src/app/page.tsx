import { EmptyMemories } from "@/components/EmptyMemories";
import { api } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import { cookies } from 'next/headers'
import Image from "next/image";
import Link from "next/link";

interface Memory {
    coverUrl: string
    excerpt: string
    id: string
    createdAt: string
}

export default async function Home() {
  const isAuth = cookies().has('token')

    if(!isAuth) {
        return (
                <EmptyMemories />
       );
    }

    
    const token = cookies().get('token')?.value
    const response = await api.get('/memories', {
        headers: {
                Authorization: `Bearer ${token}`
            }
    })

    const memories = response.data as Memory[]
    
    if (memories.length === 0) {
        return <EmptyMemories />
    }

    return (
        <div className="flex flex-col gap-10 p-8">
            {memories.map(memory => (
                <div key={memory.id} className="space-y-4">
                   <time className="flex items-center gap-2 text-sm text-gray-100 -ml-8 before:h-px before:w-5 before:bg-gray-50">
                    {memory.createdAt}
                   </time> 
                   <Image src={memory.coverUrl} alt="" width={592} height={280} className="w-full aspect-video object-cover rounded-lg"/>
                   <p className="text-lg leading-relaxed text-gray-100">
                    {memory.excerpt}
                   </p>

                   <Link href={`/memories/${memory.id}`} className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100">
                        Ler Mais
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            ))}
        </div>
    )
}

