import axios from "axios";

const login = {
  accessToken: (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return axios.post("/api/v1/login/access-token", params);
  }
};

const images = {
  create: file => {
    const formData = new FormData();
    formData.append("file", file);
    return {
      url: "/api/v1/images/",
      method: "post",
      data: formData,
      header: {
        "Content-Type": "multipart/form-data"
      }
    };
  }
};

export default { login, images };
