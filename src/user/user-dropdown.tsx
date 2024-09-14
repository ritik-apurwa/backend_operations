import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useConvexAuth } from "convex/react";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";

const UserDropDown = () => {
  const { signOut } = useAuthActions();
  const auth = useConvexAuth();

  const navigate = useNavigate();

  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to the authentication page after successful sign out
      navigate("/auth");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none relative">
        <Avatar>
          <AvatarImage />
          <AvatarFallback></AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="center" side="right">
        <DropdownMenuItem>
          {auth.isAuthenticated
            ? "you are signed in "
            : "you are not signed in "}
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="grid grid-cols-2 gap-4">
          <Button onClick={handleSignOut} className="text-xs" variant="outline">
            <LogOut className="size-3.5 mr-2" />
            Sign out
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="grid grid-cols-2 gap-4">
          <Button asChild className="text-xs" variant="outline">
            <Link to="/auth">
              <LogIn className="size-3.5 mr-2" />
              Sign out
            </Link>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropDown;
