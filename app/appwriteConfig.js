import { Client, Databases } from "react-native-appwrite";

const config = {
  endpoint: "https://fra.cloud.appwrite.io/v1",
  projectId: "ur id",
  db: "ur db", // database ID
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
