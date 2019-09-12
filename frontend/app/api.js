import axios from "axios";

const login = {
  accessToken: (username, password) => {
    const params = new URLSearchParams();
    params.append("username", username);
    params.append("password", password);
    return axios.post("/api/v1/login/access-token", params);
  }
};

const user = {
  create: data =>
    axios.post("/api/v1/users/", {
      email: data.email,
      full_name: data.fullName,
      password: data.password,
      city: data.city
    })
};

export default { login, user };
