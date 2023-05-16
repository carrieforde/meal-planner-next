import { Firestore } from "@google-cloud/firestore";

export enum FirestoreCollection {
  CATALOG = "catalog",
  LISTS = "lists",
  ITEMS = "items",
}

export const firestore = new Firestore();

type GetCollectionOptions = {
  field: string;
  orderBy?: "asc" | "desc";
};

export async function getCollection(
  collectionName: FirestoreCollection,
  { field, orderBy }: GetCollectionOptions = { field: "id", orderBy: "asc" }
) {
  const collection = await firestore
    .collection(collectionName)
    .orderBy(field, orderBy)
    .get();

  return collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}
