import { TwitterApi } from "twitter-api-v2";

export const postTweet = async (text: string) => {
  const client = new TwitterApi({
    appKey: process.env.X_API_KEY,
    appSecret: process.env.X_API_SECRET,
    accessToken: process.env.X_ACCESS_TOKEN,
    accessSecret: process.env.X_ACCESS_TOKEN_SECRET,
  });

  await client.v2.tweet("Hello X from my app!");
};
