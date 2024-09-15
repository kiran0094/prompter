"use client"
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import From from '@/components/From';

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [sumbitting, setsumbitting] = useState(false);
  const [post, setpost] = useState({
    prompt: " ",
    tag: " "
  });


  const createPrompt = async (e) => {
    e.preventDefault();
    setsumbitting(true);
    try {
      const response = await fetch('api/prompt/new', {
        method: 'POST', // Ensure method is 'POST'
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        })
      });
      if (response.ok) { // Corrected condition
        router.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <From
        type="Create"
        post={post}
        setpost={setpost}
        sumbitting={sumbitting}
        handleSubmit={createPrompt} />
    </div>
  );
};

export default CreatePrompt;