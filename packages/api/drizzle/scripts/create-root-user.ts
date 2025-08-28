import readline from "readline";
import bcrypt from "bcrypt";
import { db } from "../../src/db/connection";
import { usersSchema } from "../../src/db/schema";
import { eq } from "drizzle-orm";

async function askQuestion(query: string, hidden = false): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true,
  });

  if (!hidden) {
    return new Promise((resolve) =>
      rl.question(query, (answer) => {
        rl.close();
        resolve(answer);
      }),
    );
  }

  return new Promise((resolve) => {
    process.stdout.write(query);
    let input = "";

    const onDataHandler = (char: Buffer) => {
      char = char.slice(0, 1);
      if (char[0] === 10 || char[0] === 13) {
        // Enter pressed
        process.stdin.off("data", onDataHandler);
        process.stdout.write("\n");
        rl.close();
        resolve(input);
      } else if (char[0] === 127) {
        // Backspace
        input = input.slice(0, -1);
      } else {
        input += char.toString();
      }
    };

    process.stdin.on("data", onDataHandler);
  });
}


async function main() {
  console.log("🛠 Create ROOT user\n");

  const email = (await askQuestion("1. Email: ")).trim();

  let password: string;
  while (true) {
    const p1 = await askQuestion("2. Password: ", true);
    const p2 = await askQuestion("3. Repeat Password: ", true);
    if (p1 !== p2) {
      console.log("❌ Passwords do not match. Try again.\n");
      continue;
    }
    password = p1;
    break;
  }

  const name = (await askQuestion("4. Name: ")).trim();

  // hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // check if user exists
  const existing = await db.query.usersSchema.findFirst({
    where: eq(usersSchema.email, email),
  });

  if (existing) {
    console.log(`❌ User with email "${email}" already exists.`);
    process.exit(1);
  }

  // insert user
  await db.insert(usersSchema).values({
    email,
    password: passwordHash,
    name,
    role: "root",
  });

  console.log(`✅ ROOT user created: ${email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
