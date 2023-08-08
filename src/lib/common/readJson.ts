import fs from "fs";
import path from "path";

export const readJson = <T>(jsonPath: string, defaultJsonData: T): T => {
  const _jsonPath = path.join(process.cwd(), jsonPath);
  try {
    const jsonContent = fs.readFileSync(_jsonPath, "utf8");
    const jsonData = JSON.parse(jsonContent) as T;
    return jsonData;
  } catch (err) {
    console.error(err);
    return defaultJsonData;
  }
};