export const uploadUserAssest = async (image) => {
  if (!image.type.startsWith("image/")) return;
  let formData = new FormData();
  formData.append("file", image);
  formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
  formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESENT);
  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  return await response.json();
};
