import { connectTODB } from "@/utils/database";
import Prompt from "@/models/prompt";

//get read
export const GET = async (req, { params }) => {
  try {
    await connectTODB();
    const prompts = await Prompt.findById(params.id).populate("creator");
    if (!prompts) {
      return new Response("prompt is not found", { status: 404 });
    }
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response("error fetching the Posts", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();

  try {
    await connectTODB();

    const existingPrompts = await Prompt.findById(params.id);
    if (!existingPrompts) {
      return new Response("prompt is not found", { status: 404 });
    }
    existingPrompts.prompt = prompt;
    existingPrompts.tag = tag;

    await existingPrompts.save();
    return new Response(JSON.stringify(existingPrompts), { status: 200 });
  } catch (error) {
    return new Response("error in updating prompt", { status: 200 });
  }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectTODB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndDelete(params.id);

        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        return new Response(error, { status: 500 });
    }
};