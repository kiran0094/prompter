import Link from "next/link"

const From = ({type,post,setpost,sumbitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-col flex-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient">
          {type} post          
          </span>
      </h1>
      <p className="pt-2">
        {type} and share engaging prompts effortlessly with our app—spark creativity, foster discussions, and enhance productivity in  seamless platforms.
      </p>

      <form
      onSubmit={handleSubmit}
      className="mt-8 w-full max-w-2xl gap-7 glassmorphism">
       <label className="">
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt}
            placeholder="write the prompt here "
            onChange={(e) => setpost({ ...post, prompt: e.target.value })}
            className='form_textarea pb-4 '
            required
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Tag {` `}
            <span>(#product,#idea,#web)</span>
          </span>
          <input 
          type="text"
          value={post.tag}
          placeholder="#tag"
          onChange={(e) => setpost({ ...post, tag: e.target.value })}
          className='form_input'
          required
           />                  
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href='/' className="text-gray-500 text-sm pt-2">
          cancel
          </Link>

          <button 
          type="submit"
          disabled={sumbitting}
          className="px-5 py-1.5 rounded-full bg-primary-orange text-sm mt-2 text-white">
            {sumbitting ? `${type}...`:type}
          </button>

        </div>


      </form>

    </section>
  )
}

export default From