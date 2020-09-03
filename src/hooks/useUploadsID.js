import { useEffect } from "react";

function useUploadsID() {
  useEffect(() => {});
  const link =
    "https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=[CHANNEL_ID]]key=[API_KEY]";
  const getID = fetch(link)
    .then((respone) => respone.json())
    .then((data) =>
      console.log(
        "Playlist ID:",
        data.items[0].contentDetails.relatedPlaylists.uploads
      )
    )
    .catch((err) => console.log(err));
}

export default useUploadsID;

const secondLink =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2C%20contentDetails&maxResults=20&playlistId=UU29ju8bIPH5as8OGnQzwJyA&key=AIzaSyBAZsPfEbYfMv2VaKgXy70LvGQ0cAFkirI";
const getUploadedVideos = fetch(secondLink)
  .then((response) => response.json())
  .then((data) => console.log("All videos fetched:", data))
  .catch((err) => console.log(err));
