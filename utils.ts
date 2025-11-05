import { promises as fs } from "fs";

async function readTextFile(filePath: string): Promise<string> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

export { readTextFile };
