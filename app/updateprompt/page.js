"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Suspense, useEffect, useState } from "react";
import From from "@/components/From";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sumbitting, setsumbitting] = useState(false);

  const promptId = searchParams.get("id");
  const [post, setpost] = useState({
    prompt: " ",
    tag: " ",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setpost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const UpdatePrompt = async (e) => {
    e.preventDefault();
    setsumbitting(true);
    if (!promptId) return alert("prompt is not found");
    try {
      const response = await fetch(`api/prompt/${promptId}`, {
        method: "PATCH", // Ensure method is 'PATCH'
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        // Corrected condition
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Suspense fallback={<div>Loading</div>}>

    <div>
      <From
        type='edit'
        post={post}
        setpost={setpost}
        sumbitting={sumbitting}
        handleSubmit={UpdatePrompt}
        />
    </div>
    </Suspense>
  
  );
};

export default UpdatePrompt;
