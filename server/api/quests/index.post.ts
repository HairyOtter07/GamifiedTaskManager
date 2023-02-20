import { quests } from "../../dbModels";

interface IRequestBody {
  title: string;
  description: string;
  categories: string[];
  reward: number;
}

export default defineEventHandler(async (event) => {
  const { title, description, categories, reward } = await readBody<IRequestBody>(event);
  if (!title) {
    return {
      code: "TITLE_REQUIRED",
      message: "Body malformed: title is required.",
    };
  }

  if (title.length > 25) {
    return {
      code: "TITLE_TOO_LONG",
      message: "Title must not be longer than 25 characters.",
    };
  }

  if (categories.length > 4) {
    return {
      code: "TOO_MANY_CATEGORIES",
      message: "Categories must not contain more than 4 values.",
    };
  }

  try {
    const newQuestData = await quests.create({
      userId: event.context.session.userId,
      title,
      description,
      categories,
      reward,
      active: false,
      status: "unstarted",
    });
    return {
      id: newQuestData._id.toString(),
      title: newQuestData.title,
    };
  } catch (err) {
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
