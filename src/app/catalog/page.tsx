import { firestore } from "firestore/firestore";
import {
  ShoppingCategories,
  shoppingCategoriesMap,
} from "utilities/types/shopping";

import { Units, unitMap } from "utilities/types/units";
import { getClient } from "lib/graphql/apollo";
import s from "./page.module.css";
import { GET_CATALOG } from "./gql";

interface CatalogItem {
  defaultUnit: Units | null;
  name: string;
  category: ShoppingCategories;
}

async function getCatalog() {
  const collection = await firestore
    .collection("catalog")
    .orderBy("category", "asc")
    .get();

  return collection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export default async function CatalogPage() {
  // const request = await getCatalog();
  const { data } = await getClient().query({ query: GET_CATALOG });

  return (
    <table className={s.table}>
      <thead>
        <th className={s.th}>Add</th>
        <th className={s.th}>Item Name</th>
        <th className={s.th}>Category</th>
        <th className={s.th}>Default Unit</th>
      </thead>

      <tbody>
        {(
          data as unknown as { catalog: Array<CatalogItem & { id: string }> }
        ).catalog.map(({ id, name, category, defaultUnit }) => (
          <tr key={id}>
            <td className={s.td}>Add</td>
            <td className={s.td}>{name}</td>
            <td className={s.td}>{shoppingCategoriesMap[category]}</td>
            <td className={s.td}>{defaultUnit ? unitMap[defaultUnit] : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
