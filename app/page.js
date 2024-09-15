import Feed from "@/components/Feed";
export default function Home() {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center"> Discover & share
      <br className=""/>
      <span className='orange_gradient text-center'>AI-Powered prompts</span>
      </h1>
      <p className="desc text-center">Welcome to PromptShare! Discover and share creative prompts with a vibrant community. Let your imagination soar and find endless inspiration here.</p>
    <Feed/>
    </section>

  );
}