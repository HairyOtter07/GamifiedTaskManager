import { quests } from "../../dbModels";

export default defineEventHandler(async (event) => {
  const questId = event.context.params?.id;

  try {
    const questData = await quests.findOne({
      _id: questId,
    });
    if (questData) {
      questData.delete();
      return {
        id: questData.id,
        title: questData.title,
      };
    } else {
      return {
        code: "QUEST_NOT_FOUND",
        message: `Quest with id ${questId} doesn't exist.`,
      };
    }
  } catch (err) {
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
