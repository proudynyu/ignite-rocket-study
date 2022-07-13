import { io } from "../app";
import { prismaClient } from "../prisma";

export class CreateMessageService {
  async execute(text: string, user_id: string) {
    const message = await prismaClient.message.create({
      data: {
        text,
        user_id,
      },
      include: {
        user: true,
      },
    });

    const info = {
      text: message.text,
      user_id: message.user_id,
      user: {
        name: message.user.name,
        avatar: message.user.avatar_url
      }
    }

    io.emit("new_message", info)
    
    return message;
  }
}
