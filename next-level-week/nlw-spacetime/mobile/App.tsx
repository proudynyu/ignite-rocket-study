import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree'
import { styled } from 'nativewind';

import bgBlur from './src/assets/bg-blur.png'
import NlwLogo from './src/assets/nlw-spacetime-logo.svg'
import Stripes from './src/assets/stripes.svg'
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import { api } from './src/lib/api';

const StyledStripes = styled(Stripes);

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>'
}

export default function App() {
    const [request, response, signInWithGithub] = useAuthRequest(
        {
            clientId: "CLIENT_ID",
            scopes: ['identity'],
            redirectUri: makeRedirectUri({
                scheme: 'nlwspacetime'
            }),
        },
        discovery
    )

    const [hasLoadedFonts] = useFonts({
        Roboto_700Bold, Roboto_400Regular, BaiJamjuree_700Bold
    })

    useEffect(() => {
        if(response?.type === 'success') {
            const { code } = response.params

            api
                .post('/register', {
                    code,
                })
                .then(response => {
                    const { token } = response
                    console.log(token)
                })
        }
    }, [response])

    if (!hasLoadedFonts) return null

    return (
        <ImageBackground source={bgBlur} className="bg-gray-950 flex-1 items-center relative px-8 py-10"
            imageStyle={{ position: 'absolute', left: '-100%'}}
        >
            <StyledStripes className="absolute left-2"/>

            <View className="flex-1 items-center justify-center gap-6">
                <NlwLogo />

                <View className="space-y-2">
                    <Text className="text-center font-title text-2xl leading-tight text-gray-50">Sua capsula do tempo</Text>
                    <Text className="text-center font-body text-base leading-relaxed text-gray-100">
                        Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!
                    </Text>
                </View>

                <TouchableOpacity
                    className="rounded-full bg-green-500 px-5 py-2"
                    activeOpacity={0.7}
                    onPress={() => signInWithGithub()}
                >
                    <Text className="font-alt text-sm uppercase text-black">
                        Cadastrar Lembrança
                    </Text>
                </TouchableOpacity>
            </View>

            <Text className="text-center font-body text-sm leading-relaxed text-gray-200">Feito com ❤ no NLW da Rocketseat</Text>
            <StatusBar style="light" translucent />
        </ImageBackground>
   );
}
