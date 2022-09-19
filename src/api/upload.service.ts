import axiosInstance from "./main";

// upload image
const uploadLogoImage = async (file:any ) => {
  let formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post("/user/customer/logo", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const UploadService = {
  uploadLogoImage,
};
export default UploadService;
