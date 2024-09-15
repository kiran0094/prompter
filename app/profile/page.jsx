"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
useRouter;
import Profile from "@/components/Profile";

const ProfilePage = () => {
  const { data: session } = useSession();
  const [posts, setposts] = useState([]);
  const router = useRouter();
  console.log(session?.user.id);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/user/${session?.user.id}/post`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched posts:", data); // Corrected log statement
        setposts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error); // Added error handling
      }
    };

    if (session?.user.id) fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setposts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (post) => {
    router.push(`/updateprompt?id=${post._id}`);
  };

  return (
    <Profile
      name='my'
      desc=' welcome to your profile '
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
