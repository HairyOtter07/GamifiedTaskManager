import { users } from "../../dbModels";

export default defineEventHandler(async (_) => {
  try {
    const usersData = await users.find({});
    return usersData.map(user => ({
      id: user._id,
      name: user.name,
      xp: user.xp,
    }));
  } catch (err) {
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
