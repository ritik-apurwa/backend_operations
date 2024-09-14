import React, { useState } from "react";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { FaSortAlphaDown, FaSortAlphaUp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { api } from "@convex/_generated/api";
import { UserCard, UserCardLoading } from "./user-cards";
import UserForm from "./create-user";
import UseSelect, { MentalStateType } from "@/_workspace/global/use-select";
import { useAuthActions } from "@convex-dev/auth/react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 6;

export const UserSection = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filter, setFilter] = useState<MentalStateType>("all");

  const data = useQuery(api.user.getAllUsers);
  const isLoading = data === undefined;
  const filteredAndSortedData = React.useMemo(() => {
    if (!data) return [];
    return data
      .filter((user) => {
        if (filter === "all") return true;
        return user.yourMentalState === filter;
      })
      .filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortOrder === "asc") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
        }
      });
  }, [data, searchTerm, sortOrder, filter]);

  const paginatedData = filteredAndSortedData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredAndSortedData.length / ITEMS_PER_PAGE);
  const { signOut } = useAuthActions();
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <div className="prose prose-sm lg:prose-lg prose-headings:m-0">
          <h1>All Users</h1>

          <Button onClick={() => void signOut}>Sign out</Button>

          <Link to="/sign-in">
          Sign in </Link>
        </div>
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64"
          />
          <Button onClick={() => setSearchTerm("")}>
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2 w-full md:w-auto justify-end">
          <UserForm type="create" />

          <UseSelect setFilter={setFilter} />
          <Button
            variant="outline"
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          >
            {sortOrder === "asc" ? (
              <FaSortAlphaDown className="h-4 w-4 mr-2" />
            ) : (
              <FaSortAlphaUp className="h-4 w-4 mr-2" />
            )}
            Sort
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
              <UserCardLoading key={index} />
            ))
          : paginatedData.map((user) => (
              <motion.div
                key={user._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <UserCard {...user} />
              </motion.div>
            ))}
      </div>

      <div className="flex justify-center mt-6 space-x-2">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="py-2 px-4 bg-gray-100 rounded-md">
          {page} / {totalPages}
        </span>
        <Button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
