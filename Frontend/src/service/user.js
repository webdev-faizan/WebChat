import axiosInstance from "./axiosInstance";
export const updateUserProfile = async (profileUrl) => {
  axiosInstance.get("/user/update-profile", {
    params: {
      profileUrl,
    },
  });
};
export const uploadUserImage = async (e) => {
  const image = e.target.files[0];
  if (!image.type.startsWith("image/")) return;
  let formData = new FormData();
  formData.append("file", image);
  formData.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
  formData.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESENT);
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dkhgfsefj/upload",
    {
      method: "POST",
      body: formData,
    }
  );
  return await response.json();
};
