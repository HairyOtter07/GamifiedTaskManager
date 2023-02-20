import { quests } from "../../dbModels";

export default defineEventHandler(async (event) => {
  try {
    const questsData = await quests.find({
      userId: event.context.session.userId,
    });
    return questsData.map(quest => ({
      id: quest._id.toString(),
      title: quest.title,
      description: quest.description,
      categories: quest.categories,
      reward: quest.reward,
      active: quest.active,
      status: quest.status,
    }));
  } catch (err) {
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
