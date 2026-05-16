import { databases } from "./appwriteConfig";


// Replace with your actual IDs from Appwrite console
const databaseId = "69fd9c530003413c154b";
const collectionId = "Todo-name-list";

// Add todo
export const addTodo = async (text) => {
  return await databases.createDocument(
    databaseId,
    collectionId,
    "unique()", // auto-generate ID
    { text, done: false }
  );
};

// Fetch todos
export const fetchTodos = async () => {
  const result = await databases.listDocuments(databaseId, collectionId);
  return result.documents;
};

// Delete todo
export const removeTodo = async (id) => {
  await databases.deleteDocument(databaseId, collectionId, id);
};
