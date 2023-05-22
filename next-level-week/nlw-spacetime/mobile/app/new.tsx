import { Link, useRouter } from "expo-router";
import { Switch, View, Text, TextInput, ScrollView, Image } from "react-native";
import Icon from "@expo/vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";

import NlwLogo from "../src/assets/nlw-spacetime-logo.svg";
import { api } from "../src/lib/api";

export default function NewMemory() {
  const { bottom, top } = useSafeAreaInsets();
  const router = useRouter();

  const [content, setContent] = useState<string>("");
  const [cover, setCover] = useState<string | null>(null);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  async function handleCreateMemory() {
    const token = await SecureStore.getItemAsync("token");

    let coverUrl = "";

    if (cover) {
      const uploadFormData = new FormData();
      uploadFormData.append("file", {
        name: "image.jpg",
        type: "image/jpg",
        uri: cover,
      } as any);

      const uploadResponse = await api.post("/upload", uploadFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      coverUrl = uploadResponse.data.fileUrl;
    }

    await api.post(
      "/memories",
      {
        content,
        isPublic,
        coverUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    router.push("/memories");
  }

  async function openImagePicker() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (result.assets[0]) {
        setCover(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView
      className="flex-1 px-8"
      contentContainerStyle={{ paddingBottom: bottom, paddingTop: top }}
    >
      <View className="mt-4 flex-row items-center justify-between">
        <NlwLogo />

        <Link href="/memories" asChild>
          <TouchableOpacity className="h-10 w-10 items-center justify-center rounded-full bg-purple-500">
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

        <TouchableOpacity
          className="bg-black/07 h-32 items-center justify-center rounded-lg border border-dashed border-gray-500"
          activeOpacity={0.7}
          onPress={openImagePicker}
        >
          {cover ? (
            <Image
              source={{ uri: cover }}
              className="h-full w-full rounded-lg object-cover"
            />
          ) : (
            <View className="flex-row items-center gap-2">
              <Icon name="image" color="#fff" />
              <Text className="font-body text-sm text-gray-200">
                Adicionar foto ou video de capa
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TextInput
          value={content}
          onChangeText={setContent}
          multiline
          className="p-0 font-body text-lg text-gray-50"
          placeholderTextColor="#56565a"
          placeholder="Fique livre para adicionar fotos, videos e relatos sobre essas experiencias"
        />

        <TouchableOpacity
          className="items-center self-end rounded-full bg-green-500 px-5 py-2"
          activeOpacity={0.7}
          onPress={handleCreateMemory}
        >
          <Text className="font-alt text-sm uppercase text-black">Salvar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
