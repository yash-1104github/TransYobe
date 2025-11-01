import axios from "axios";
import { error } from "console";

export default async function findTranscript(videoId: any) {
  try {
    const res = await axios.get(
      "https://youtube-transcript3.p.rapidapi.com/api/transcript",
      {
        params: {
          videoId: videoId,
        },
        headers: {
          "x-rapidapi-key": "005d9ffa4bmsh4d534f6fa2e852bp1238b5jsn444c38d5b2c5",
          "x-rapidapi-host": "youtube-transcript3.p.rapidapi.com",
        },
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}