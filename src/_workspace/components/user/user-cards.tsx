import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { Doc } from "@convex/_generated/dataModel";
import UserForm from "./create-user";
import { motion } from "framer-motion";


type UserCardProps = Doc<"user">;

export const UserCard = ({
  _id,
  name,
  userImages,
  _creationTime,
  areYouReady,
  description,
  userFamilyDetails,
  yourMentalState,
}: UserCardProps) => {
  return (
    <Card
      key={_id}
      className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-xl rounded-lg text-white"
    >
      <CardContent>
        {/* Header with user name and basic details */}
        <CardHeader className="flex flex-col items-start space-y-2">
          <CardTitle className="text-2xl font-bold">{name}</CardTitle>
          <CardDescription className="italic text-sm opacity-90">
            Account created: {new Date(_creationTime).toLocaleDateString()}
          </CardDescription>
        </CardHeader>

        {/* Carousel for user images */}
        <div className="relative w-full rounded-lg overflow-hidden mt-4">
          <Carousel>
            <CarouselContent>
              {userImages.length > 0 ? (
                userImages.map((userImage, index) => (
                  <CarouselItem className="relative py-8" key={index}>
                    <motion.img
                      src={userImage.userImageUrl}
                      height={200}
                      width={200}
                      className="min-h-48 min-w-full max-h-80 object-cover rounded-lg shadow-md"
                      alt={`Image ${index}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  </CarouselItem>
                ))
              ) : (
                <div className="text-center text-gray-300">
                  No images available
                </div>
              )}
            </CarouselContent>

            {userImages.length > 1 && (
              <>
                <CarouselNext className="bg-black/40" />
                <CarouselPrevious className="bg-black/40" />
              </>
            )}
          </Carousel>
        </div>

        {/* User details grid */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">About</h3>
            <p className="text-sm opacity-90">
              {description || "No description available."}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Family</h3>
            <div className="text-sm opacity-90">
              {userFamilyDetails.map((item, index) => (
                <div key={index}>
                  <span>{item.city} </span>
                  <span>{item.name} </span>
                  <span>{item.relationWithUser} </span>
                </div>
              )) || "No family details available."}
            </div>
          </div>
        </div>

        {/* Mental state and readiness */}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Mental State</h3>
            <p className="text-sm opacity-90">{yourMentalState || "Unknown"}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-lg">Are you ready?</h3>
            <p
              className={`text-sm font-semibold gap-x-4 flex flex-row ${areYouReady ? "text-green-400" : "text-red-400"}`}
            >
              <span>{name}</span>
              <span>{areYouReady ? "Yes" : "No"}</span>
            </p>
          </div>
        </div>

        {/* User actions */}
        <div className="mt-6 flex space-x-4">
          <UserForm type="update" userId={_id} />
          <UserForm type="delete" userId={_id} />
        </div>
      </CardContent>
    </Card>
  );
};

export const UserCardLoading = () => {
  return (
    <Card>
      <CardContent>
        <CardHeader>
          <CardTitle>
            <Skeleton className="w-1/4 h-5   " />
          </CardTitle>
          <CardDescription className="flex flex-col gap-3"></CardDescription>
        </CardHeader>

        <Carousel>
          <CarouselContent>
            <CarouselItem className="py-4">
              <Skeleton className="w-full min-h-48 max-h-48 " />
            </CarouselItem>
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
};

