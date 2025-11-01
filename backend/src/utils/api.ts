import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY;

export default async function findTranscript(videoId: any) {
  try {
    const res = await axios.get(
      "https://youtube-transcript3.p.rapidapi.com/api/transcript",
      {
        params: {
          videoId: videoId,
        },
        headers: {
          "x-rapidapi-key": `${API_KEY}`,
          "x-rapidapi-host": "youtube-transcript3.p.rapidapi.com",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
