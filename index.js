const { google } = require("googleapis");
const { statSync, createReadStream } = require("fs");

const youtube = google.youtube({ version: "v3", apiKey: "Your_API_key" });

const pathToVideo = "./short.mp4";
const fileSize = statSync(pathToVideo).size;

const uploadParams = {
  part: "snippet,status",
  notifySubscribers: true,
  requestBody: {
    snippet: {
      title: "How to upload a video to YouTube using Node.js with ChatGPT",
      description: "This video is a sample video uploaded using the YouTube API with ChatGPT",
      tags: ["sample", "chatGPT"],
      categoryId: 22
    },
    status: { privacyStatus: "private" }
  },
  media: { body: createReadStream(pathToVideo) }
}

const options = {
  // Use the `onUploadProgress` property to track the progress of the upload.
  onUploadProgress(evt) {
    const progress = (evt.bytesRead / fileSize) * 100;

    console.log(`${progress}% completed`);
  }
}

const resumableUpload = youtube.videos.insert(uploadParams, options);
