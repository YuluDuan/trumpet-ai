"use severer"
import { prisma } from "@/lib/db";

export async function fetchNumOfUsers() {

    try {
        const numUsers = await prisma.user.count();
        return numUsers;
        
    } catch (error: any) {
      throw new Error(`Failed to count users: ${error.message}`);
    }
};