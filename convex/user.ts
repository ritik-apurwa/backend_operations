// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";
// import { Id } from "./_generated/dataModel";
// import { MentalState, userFamilyDetails } from "./schema";

// export const createUser = mutation({
//   args: {
//     name: v.string(),
//     userImages: v.array(
//       v.object({
//         userImageUrl: v.string(),
//         userImageStorageId: v.string(),
//       })
//     ),
//     areYouReady: v.boolean(),
//     yourMentalState: MentalState,
//     description: v.string(),
//     userFamilyDetails: userFamilyDetails,
//   },
//   handler: async (ctx, args) => {
//     const userId = await ctx.db.insert("user", args);
//     return userId;
//   },
// });

// export const updateUser = mutation({
//   args: {
//     id: v.id("user"),
//     name: v.string(),
//     userImages: v.array(
//       v.object({
//         userImageUrl: v.string(),
//         userImageStorageId: v.string(),
//       })
//     ),
//     areYouReady: v.boolean(),
//     yourMentalState: MentalState,
//     description: v.string(),
//     userFamilyDetails: userFamilyDetails,
//   },
//   handler: async (ctx, args) => {
//     const { id, ...updateData } = args;
//     const existingUser = await ctx.db.get(id);
//     if (!existingUser) {
//       throw new Error("User not found");
//     }
//     await ctx.db.patch(id, updateData);
//     return await ctx.db.get(id);
//   },
// });

// export const deleteUser = mutation({
//   args: { id: v.id("user") },
//   handler: async (ctx, args) => {
//     const user = await ctx.db.get(args.id);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     // Delete associated images from storage
//     for (const image of user.userImages) {
//       await ctx.storage.delete(image.userImageStorageId as Id<"_storage">);
//     }
//     await ctx.db.delete(args.id);
//     return { success: true };
//   },
// });

// export const deleteUserImage = mutation({
//   args: {
//     userId: v.id("user"),
//     imageUrl: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const { userId, imageUrl } = args;
//     const user = await ctx.db.get(userId);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     const updatedImages = user.userImages.filter(
//       (img) => img.userImageUrl !== imageUrl
//     );
//     if (updatedImages.length === user.userImages.length) {
//       throw new Error("Image not found for user");
//     }
//     const removedImage = user.userImages.find(
//       (img) => img.userImageUrl === imageUrl
//     );
//     if (removedImage) {
//       await ctx.storage.delete(
//         removedImage.userImageStorageId as Id<"_storage">
//       );
//     }
//     await ctx.db.patch(userId, { userImages: updatedImages });
//     return { success: true };
//   },
// });

// export const getUserById = query({
//   args: { id: v.id("user") },
//   handler: async (ctx, args) => {
//     const user = await ctx.db.get(args.id);
//     if (!user) {
//       throw new Error("User not found");
//     }
//     return user;
//   },
// });

// export const getAllUsers = query({
//   handler: async (ctx) => {
//     return await ctx.db.query("user").collect();
//   },
// });
