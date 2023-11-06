import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async () => {
  const { userId } = auth();

  if (!userId) {
    return false;
  }

  const currentUserDB = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });


  if (!currentUserDB || !currentUserDB.stripeCustomerId){
    return false;
  }else{
    const userSubscription = await prisma.userSubscription.findUnique({
        where: {
            stripeCustomerId: currentUserDB.stripeCustomerId,
        },
        select: {
          stripeSubscriptionId: true,
          stripeCurrentPeriodEnd: true,
          stripeCustomerId: true,
          stripePriceId: true,
        },
      })
    
      if (!userSubscription) {
        return false;
      }
    
      const isValid =
        userSubscription.stripePriceId &&
        userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
    
      return !!isValid;
  }
};