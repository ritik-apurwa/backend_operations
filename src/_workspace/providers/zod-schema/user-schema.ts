import { z } from "zod";

interface SelectOption {
  value: string;
  label: string;
}

export const MentalStateOption:SelectOption[] = [
  {value:"Depressed", label:"Depressed"},
  {value:"Anxious", label:"Anxious"},
  {value:"Stressed", label:"Stressed"},
  {value:"Happy", label:"Happy"},
]

const relationWithUser = z.enum(["self", "father", "mother", "brother","sister"]);

export type RelationType = z.infer<typeof relationWithUser>





export const RelationWithUserOption: SelectOption[] = [
  { value: "self", label: "Self" },
  { value: "father", label: "Father" },
  { value: "mother", label: "Mother" },
  { value: "brother", label: "Brother" },
  { value: "sister", label: "Sister" },
];

// Define the user family details schema
const userFamilyDetails = z.array(
  z.object({
    name: z.string(),
    city: z.string(),
    relationWithUser: relationWithUser,
  })
);




export const userSchema = z.object({
  name: z.string().min(4, "at least four character"),
  areYouReady:z.boolean().default(false),
  yourMentalState:z.enum(["Depressed" , "Anxious" , "Stressed" ,"Happy"]),
  description:z.string().min(10,"Write at Something"),
  userFamilyDetails:userFamilyDetails,
});

export type UserSchemaType = z.infer<typeof userSchema>;
