"use server"

import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function fetchUserPlatformConfig(platform: string) {
    const { userId }  = auth();
    if (!userId) {
        throw new Error("Unauthorized");
      }

    try {
        const user = await prisma.user.findUnique({
            where: {
                clerkUserId: userId,
            },
        })

        if(!user){
            throw new Error("User not found!");
        }

        //which may also include the non-default one TODO Every one for each platform only have 2 records
        const platformConfigs = await prisma.platformConfig.findMany({
            where: {
                name: platform,
            },
            include: {
                userPlatformConfigs: {
                    where: {
                        userId: user.id,
                    },
                },
            },
        })

        revalidatePath(`/user/default-setting/${platform}`);
        return platformConfigs;
        
    } catch (error: any) {
      throw new Error(`Failed to fetch platformConfigs: ${error.message}`);
    }
};
  
