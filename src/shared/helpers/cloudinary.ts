// Services
import cloudinary from "cloudinary";
cloudinary.v2.config(String(process.env.CLOUDINARY_URL));

export const removeImg = async (
  imgUrl: string,
  folder: string
): Promise<any> => {

  const [img] = imgUrl.split("/").slice(-1);
  const [name] = img.split(".");
  return await cloudinary.v2.uploader.destroy(`${folder}/${name}`);
};

export const uploadImg = async (
  imgPath: string,
  folder: string,
  resource_type: string = "image"
): Promise<string> => {

  const { secure_url } = await cloudinary.v2.uploader.upload(imgPath, {
    resource_type,
    folder,
  });
  return secure_url;
};
