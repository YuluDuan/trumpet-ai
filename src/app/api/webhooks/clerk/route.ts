import { prisma } from "@/lib/db";
import { IncomingHttpHeaders } from "http";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook, WebhookRequiredHeaders } from "svix";

type AuthUser = {
    id: string;
    first_name: string;
    last_name: string;
    email_addresses: { id: string; email_address: string }[];
  };
  
  type EventType = "user.created";
  
  type Event = {
    data: AuthUser;
    object: "event";
    type: EventType;
  };

const webhookSecret = process.env.WEBHOOK_SECRET || "";

async function handler(request: Request) {
  const payload = await request.json();
  const headersList = headers();
  const heads = {
    "svix-id": headersList.get("svix-id"),
    "svix-timestamp": headersList.get("svix-timestamp"),
    "svix-signature": headersList.get("svix-signature"),
  };
  const wh = new Webhook(webhookSecret);
  let evt: Event | null = null;

  try {
    evt = wh.verify(
      JSON.stringify(payload),
      heads as IncomingHttpHeaders & WebhookRequiredHeaders
    ) as Event;
  } catch (err) {
    console.error((err as Error).message);
    return NextResponse.json({}, { status: 400 });
  }

  const eventType: EventType = evt.type;
  if (eventType === "user.created") {
    try {
        const { id, email_addresses, first_name, last_name} = evt.data;
        // Create a new user
        const newUser = await prisma.user.create({
            data: {
                clerkUserId: id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
              },
        });

        // Get the IDs of the four default PlatformConfig records
        const defaultPlatformConfigIds = await prisma.platformConfig.findMany({
          where: { isDefault: true },
          select: { id: true },
        });

        // Create UserPlatformConfig records to associate the user with the default PlatformConfigs
        const userPlatformConfigs = defaultPlatformConfigIds.map((configId) => {
          return prisma.userPlatformConfig.create({
            data: {
              userId: newUser.id,
              platformConfigId: configId.id,
            },
          });
        });

        await Promise.all(userPlatformConfigs);

    } catch (error) {
        console.log(error, "Could not create your profile");
      }
  }

  return NextResponse.json({}, { status: 200 });
}

export const GET = handler;
export const POST = handler;