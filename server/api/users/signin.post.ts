import { users } from "../../dbModels";

interface IRequestBody {
  email: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody<IRequestBody>(event);
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

  try {
    const userData = await users.findOne({
      email: email.toLowerCase(),
    });
    if (userData) {
      const isPasswordValid = await userData.verifyPasswordSync(password);
      if (isPasswordValid) {
        return {
          id: userData._id,
          name: userData.name,
          xp: userData.xp,
        };
      } else {
        return {
          code: "USER_NOT_FOUND",
          message: "User with given email and password doesn't exist.",
        };
      }
    } else {
      return {
        code: "USER_NOT_FOUND",
        message: "User with given email and password doesn't exist.",
      };
    }
  } catch (err) {
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
