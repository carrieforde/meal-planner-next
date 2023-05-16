import { firestore } from "firestore/firestore";
import {
  ShoppingCategories,
  shoppingCategoriesMap,
} from "utilities/types/shopping";

import { Units, unitMap } from "utilities/types/units";
import s from "./page.module.css";

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
  const request = await getCatalog();

  return (
    <table className={s.table}>
      <thead>
        <th className={s.th}>Add</th>
        <th className={s.th}>Item Name</th>
        <th className={s.th}>Category</th>
        <th className={s.th}>Default Unit</th>
      </thead>

      <tbody>
        {(request as Array<CatalogItem & { id: string }>).map(
          ({ id, name, category, defaultUnit }) => (
            <tr key={id}>
              <td className={s.td}>Add</td>
              <td className={s.td}>{name}</td>
              <td className={s.td}>{shoppingCategoriesMap[category]}</td>
              <td className={s.td}>
                {defaultUnit ? unitMap[defaultUnit] : ""}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}
