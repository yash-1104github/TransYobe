import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export default async function Transcript({ youtubeUrl }) {
  try {

    const token = localStorage.getItem("token");
    console.log("req sent to backend api transcript");
    const res = await axios.post(`${API_URL}/transcript`,
      {
        youtubeUrl,
      },
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
