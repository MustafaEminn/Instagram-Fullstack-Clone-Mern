const axios = require("axios");

export async function postData(url = "", data = {}) {
  const response = await axios
    .post(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(async (res: any) => {
      return await res;
    })
    .catch((err: any) => {
      console.log(err);
    });
  return response;
}
export async function getData(url = "") {
  const response = await axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then(async (res: any) => {
      return await res;
    })
    .catch((err: any) => {
      console.log(err);
    });
  return response;
}

//Example
// postData('https://example.com/answer', { answer: 42 })
//   .then(data => {
//     console.log(data);
//   });
