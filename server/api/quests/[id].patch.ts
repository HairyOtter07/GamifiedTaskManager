import { quests } from "../../dbModels";

interface IRequestBody {
  title: string;
  description: string;
  categories: string[];
  reward: number;
  active: boolean;
  status: string;
}

export default defineEventHandler(async (event) => {
  const questId = event.context.params?.id;
  const { title, description, categories, reward, active, status } = await readBody<IRequestBody>(event);

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
    const questData = await quests.findOne({
      _id: questId,
    });
    if (questData) {
      questData.title = title;
      questData.description = description;
      questData.categories = categories;
      questData.reward = reward;
      questData.active = active;
      questData.status = status;
      questData.save();
      return {
        id: questData._id,
        title: questData.title,
      };
    } else {
      return {
        code: "QUEST_NOT_FOUND",
        message: `Quest with id ${questId} does not exist.`,
      };
    }
  } catch (err) {
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
