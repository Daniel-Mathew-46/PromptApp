"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [prompts, setPrompts] = useState([]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt/?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    const hasConfirm = confirm("Are you sure you want to delete this post?");

    if (hasConfirm) {
      try {
        const response = await fetch(`api/prompt/${prompt._id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const filteredPrompts = prompts.filter(
            (_prompt) => _prompt.id !== prompt.id
          );
          console.log(filteredPrompts)
          setPrompts(filteredPrompts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchUserPrompts = async () => {
      const res = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await res.json();
      setPrompts(data);
    };
    if (session?.user.id) fetchUserPrompts();
  }, []);

  return (
    <Profile
      name={"My"}
      desc={"Welcome to your personalized profile page."}
      data={prompts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
