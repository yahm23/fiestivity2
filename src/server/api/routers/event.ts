import { clerkClient } from "@clerk/nextjs/server";
import type { User } from "@clerk/backend/dist/types/api/resources";

import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const filterUserForClient = (user: User) => {
  return {
    id: user.id,
    username: user.username,
    profilePicture: user.imageUrl
  }
}

export const eventsRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  
  // Get all events
  getAll: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.db.event.findMany({
      take: 100,
    });

    const users = (await clerkClient.users.getUserList({
      userId: events.map((event) => event.userId),
      limit: 100
    })).map(filterUserForClient)

    return events.map((event)=>({
      event,
      user: users.find((user)=>user.id === event.userId)
    }))
  }),
  
  // Get all user specific events
  getUserEventsFromUserId: publicProcedure
  .input(z.object({userId: z.string()}))
  .query(async ({ ctx, input }) =>{
    const events = await ctx.db.event.findMany({
        where: {
          userId: input.userId,
        },
        take: 100,
        orderBy: [{ createdAt: "desc" }],
      })
    return {
      events,
    };
  }),
  
  // Post new event form
  createUserEvent: publicProcedure
  .input(z.object({userId: z.string(), name: z.string(), content: z.string()}))
  .mutation(async ({ ctx, input }) => {

    const event = await ctx.db.event.create({
      data: {
        userId: input.userId,
        name: input.name,
        content: input.content,
      },
    });

    return event;
  }),
});
