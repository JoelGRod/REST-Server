// Libraries
import path from "path";
import { v4 as uuidv4 } from "uuid";

export const saveFile = (
  files: any,
  validExtensions: string[] = ["png", "jpg", "jpeg", "gif"],
  folder: string = ""
) => {
  return new Promise((resolve, reject) => {
    const { file } = files;

    // Validate extension
    const [extension]: string[] = file.name.split(".").slice(-1);
    if (!validExtensions.includes(extension.toLowerCase()))
      return reject(
        `Invalid file extension. Extensions allowed: ${validExtensions}`
      );

    // Generate unique name for file - uuid
    const fileName = `${uuidv4()}.${extension}`;

    // Define save path
    const uploadPath = path.join(
        __dirname, "../repository", folder, fileName
    );

    // Save file
    file.mv(uploadPath, (err: any) => {
      if (err) return reject("Please, Contact the Administrator");

      return resolve(fileName);
    });
  });
};

