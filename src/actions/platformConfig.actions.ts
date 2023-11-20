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



/*
  Find all user platform configurations where the 'isDefault' property is not set to true.
  If no matching configuration is found, create a new one.
  If a matching configuration is found, update that configuration.
*/

export async function updateUserPlatformConfig(platform: string, characterCount: number, tone: string, emojiQuantity: string, emojiVibe:string, hashtagCount: number) {
    const { userId }  = auth();
    if (!userId) {
        throw new Error("Unauthorized");
    }
    
    try {
        const userWithPlatformConfigs = await prisma.user.findUnique({
            where: {
                clerkUserId: userId,
            },

            include: {
                userPlatformConfigs: {
                    include: {
                        platformConfig: true, 
                    }

                }
              }
        })

        if(!userWithPlatformConfigs){
            throw new Error("User not found!");
        }

        console.log(userWithPlatformConfigs)

        console.log("User platformConfigs", userWithPlatformConfigs.userPlatformConfigs)

        // TODO REFACTOR
        let nonDefaultConfigId: string | null = null;

        if(userWithPlatformConfigs.userPlatformConfigs.length === 2){
           for (const item of userWithPlatformConfigs.userPlatformConfigs){
            if(item.platformConfig.isDefault && item.platformConfig.name === platform){
                nonDefaultConfigId = item.platformConfig.id
            }
           }
        }

        if (nonDefaultConfigId){
            await prisma.platformConfig.update({
                where: {
                    id: nonDefaultConfigId,
                    name: platform,
                }, 
                data: {
                    characterCount: characterCount, 
                    tone: tone, 
                    emojiQuantity: emojiQuantity, 
                    emojiVibe: emojiVibe, 
                    hashtagCount: hashtagCount,
                },

            })
        }else{
           const newConfig =  await prisma.platformConfig.create({
                data: {
                    name: platform,
                    characterCount: characterCount, 
                    tone: tone, 
                    emojiQuantity: emojiQuantity, 
                    emojiVibe: emojiVibe, 
                    hashtagCount: hashtagCount,
                },
            })

            await prisma.userPlatformConfig.create({
                data: {
                    userId: userWithPlatformConfigs.id,
                    platformConfigId: newConfig.id,
                },
            })
        }
        
    
        revalidatePath(`/user/default-setting/${platform}`);
      } catch (error: any) {
        throw new Error(`Failed to update user platform config: ${error.message}`);
      }
    }
  
