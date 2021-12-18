import { hassPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { email, password } = req.body;
  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim() === "" ||
    email.trim() === "" ||
    password.trim().length < 7
  ) {
    res.status(422).json({ message: "Invalid Creditionals   ..." });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const existingUser = await db.collection("users").findOne({ email });

  if (existingUser) {
    res.status(422).json({ message: "user exists already !" });
    client.close();
    return;
  }

  const hashedPassword = await hassPassword(password);

  await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "created user !" });
}

export default handler;
