import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 201 });

  } catch (error) {
    console.log(error);

    return new Response("Failed to fetch prompts.", { status: 500 });
  }
};
