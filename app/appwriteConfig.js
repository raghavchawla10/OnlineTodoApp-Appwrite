import { Client, Databases } from "react-native-appwrite";

const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "69fd9b8e001c4f74d737",
  db: "69fd9c530003413c154b", // database ID
  col: {
    todo: "Todo-name-list" // copy actual collection ID from Appwrite console
  }
};

const client = new Client()
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform("com.raghav.todo");

const database = new Databases(client);

export { database, config, client };
