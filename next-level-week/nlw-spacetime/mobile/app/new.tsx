import { Link } from 'expo-router'
import { Switch, View, Text, TextInput, ScrollView } from 'react-native'
import Icon from '@expo/vector-icons/Feather'

import NlwLogo from '../src/assets/nlw-spacetime-logo.svg'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useState } from 'react'

export default function Memories() {
    const { bottom, top } = useSafeAreaInsets()
    const [isPublic, setIsPublic] = useState<boolean>(false)

    return (
        <ScrollView className="flex-1 px-8" contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}>
            <View className="flex-row mt-4 items-center justify-between">
                <NlwLogo />

                <Link 
                    href="/memories" 
                    asChild
                >
                    <TouchableOpacity
                        className="h-10 w-10 items-center justify-center rounded-full bg-purple-500"
                    >
                        <Icon name="arrow-left" size={16} color="#fff" />
                    </TouchableOpacity>
                </Link>
            </View>

            <View className="mt-6 space-y-6">
                <View className="flex-row items-center gap-2">
                    <Switch 
                        value={isPublic} 
                        onValueChange={setIsPublic} 
                        thumbColor={isPublic ? "#9b79ea" : "#9e9ea0"}
                        trackColor={{ false: "#767577", true: "#372560" }}
                    />
                    <Text className="font-body text-base text-gray-200">
                        Tornar memoria publica
                    </Text>
                </View>

                <TouchableOpacity className="h-32 items-center justify-center rounded-lg border border-dashed border-gray-500 bg-black/07">
                    <View className="flex-row items-center gap-2">
                        <Icon name="image" color="#fff" />
                        <Text className="font-body text-sm text-gray-200">
                            Adicionar foto ou video de capa
                        </Text>
                    </View>
                </TouchableOpacity>

                <TextInput
                    multiline
                    className="p-0 font-body text-lg text-gray-50"
                    placeholderTextColor="#56565a"
                    placeholder="Fique livre para adicionar fotos, videos e relatos sobre essas experiencias"
                />

                <TouchableOpacity
                    className="items-center self-end rounded-full bg-green-500 px-5 py-2"
                    activeOpacity={0.7}
                >
                    <Text className="font-alt text-sm uppercase text-black">
                        Salvar
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}
