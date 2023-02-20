import { users } from "../../dbModels";

interface IRequestBody {
  email: string;
  password: string;
  name: string;
}

export default defineEventHandler(async (event) => {
  const { email, password, name } = await readBody<IRequestBody>(event);
  if (!email) {
    return {
      code: "EMAIL_REQUIRED",
      message: "Body malformed: email is required.",
    };
  }

  if (!password) {
    return {
      code: "PASSWORD_REQUIRED",
      message: "Body malformed: password is required.",
    };
  }

  if (!name) {
    return {
      code: "NAME_REQUIRED",
      message: "Body malformed: name is required.",
    };
  }

  try {
    const userData = await users.findOne({
      email,
    });

    if (userData) {
      return {
        code: "USER_EXISTS",
        message: "User with given email already exists.",
      };
    } else {
      const newUserData = await users.create({
        email: email.toLowerCase(),
        password,
        name,
        xp: 0,
      });
      return {
        id: newUserData._id,
        name: newUserData.name,
        xp: newUserData.xp,
      };
    }
  } catch (err) {
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
