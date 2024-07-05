import bcrypt from "bcrypt";

export const encryptPassword = async (
  password: string,
  saltRounds: number = 10
) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const verifyPassword = async (
  password: string,
  hashedPassword: string
) => {
  const result = await bcrypt.compare(password, hashedPassword);
  return result;
};
