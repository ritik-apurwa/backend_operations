
import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";


// export const MentalState = v.union(
//   v.literal("Depressed"),
//   v.literal("Anxious"),
//   v.literal("Stressed"),
//   v.literal("Happy")
// );

// export const relationWithUser = v.union(
//   v.literal("self"),
//   v.literal("father"),
//   v.literal("mother"),
//   v.literal("brother"),
//   v.literal("sister")
// );

// export const userFamilyDetails = v.array(
//   v.object({
//     name: v.string(),
//     city: v.string(),
//     relationWithUser: relationWithUser,
//   })
// );

// export const userTable = defineTable({
//   name: v.string(),
//   userImages: v.array(
//     v.object({
//       userImageUrl: v.string(),
//       userImageStorageId: v.string(),
//     })
//   ),
//   areYouReady: v.boolean(),
//   yourMentalState: MentalState,
//   description: v.string(),
//   userFamilyDetails: userFamilyDetails,
// });

const schema = defineSchema({
  ...authTables,

});

export default schema;
