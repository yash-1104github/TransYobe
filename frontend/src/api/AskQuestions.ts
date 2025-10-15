import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default async function AskQuestions({ userMessage}) {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    const userid = user?._id;
    const token = localStorage.getItem("token");

    const res = await axios.post(
      `${API_URL}/ask`,
      { question: userMessage, userId: userid },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (err) {
    console.log(err);
  }
}
