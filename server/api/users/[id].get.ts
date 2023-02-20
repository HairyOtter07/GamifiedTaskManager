import { users } from "../../dbModels";

export default defineEventHandler(async (event) => {
  const userId = event.context.params?.id;
  try {
    const userData = await users.findOne({
      _id: userId,
    });

    if (userData) {
      return {
        id: userData._id,
        name: userData.name,
        xp: userData.xp,
      };
    } else {
      return {
        code: "USER_NOT_FOUND",
        message: `User with id ${userId} doesn't exist.`,
      };
    }
  } catch (err) {
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
