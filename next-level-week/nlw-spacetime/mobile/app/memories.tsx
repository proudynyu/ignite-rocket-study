import { useState } from "react";
import { Link, useRouter } from "expo-router";
import { View, ScrollView, Text, Image } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

import NlwLogo from "../src/assets/nlw-spacetime-logo.svg";
import { useEffect } from "react";
import { api } from "../src/lib/api";
import dayjs from "dayjs";

interface Memory {
  coverUrl: string;
  excerpt: string;
  id: string;
  createAt: string;
}

export default function Memories() {
  const [memories, setMemories] = useState<Memory[]>([]);

  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();

  async function signOut() {
    await SecureStore.deleteItemAsync("token");

    router.push("/");
  }

  async function getMemories() {
    const token = await SecureStore.getItemAsync("token");

    const response = await api.get("/memories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setMemories(response.data);
  }

  useEffect(() => {
    getMemories();
  }, []);

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NlwLogo />

        <View className="mt-4 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={signOut}
            className="h-10 w-10 items-center justify-center rounded-full bg-red-500 text-black"
          >
            <Icon name="log-out" size={16} color="#fff" />
          </TouchableOpacity>
          <Link href="/new" asChild>
            <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-green-500 text-black">
              <Icon name="plus" size={16} color="#fff" />
            </TouchableOpacity>
          </Link>
        </View>
      </View>

      <View className="mt-6 space-y-10">
        {memories.map((memory) => (
          <View className="space-y-4" key={memory.id}>
            <View className="flex-row items-center gap-2">
              <View className="h-px w-5 bg-gray-50" />
              <Text className="font-body text-xs text-gray-100">
                {dayjs(memory.createAt).format("D[ de ]MMMM[, ]YYYY")}
              </Text>
            </View>
            <View className="space-y-4 px-8">
              <Image
                source={{
                  uri: `${memory.coverUrl}`,
                }}
                className="aspect-video w-full rounded-lg"
                alt=""
              />
              <Text className="font-body text-base leading-relaxed text-gray-100">
                {memory.excerpt}
              </Text>
              <Link href="/memories/id" asChild>
                <TouchableOpacity className="flex-row items-center gap-2">
                  <Text className="font-body text-sm text-gray-200">
                    Ler mais
                  </Text>
                  <Icon name="arrow-right" size={16} color="#9e9ea0" />
                </TouchableOpacity>
              </Link>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
