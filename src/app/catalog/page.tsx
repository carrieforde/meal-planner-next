import {
  ShoppingCategories,
  shoppingCategoriesMap,
} from "utilities/types/shopping";

import { getClient } from "lib/graphql/client";
import { Units, unitMap } from "utilities/types/units";
import AddToList from "./components/add-item-to-list/add-item-to-list";
import { GET_CATALOG } from "./gql";
import s from "./page.module.css";

interface CatalogItem {
  defaultUnit: Units | null;
  name: string;
  category: ShoppingCategories;
}

export default async function CatalogPage() {
  const { data } = await getClient().query({ query: GET_CATALOG });

  console.log(data);

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
            <td className={s.td}>
              {/* Consider disabling button if item is already on list */}
              {/* A tooltip could be used to indicate item is on list. */}
              <AddToList itemId={id} name={name} unit={defaultUnit} />
            </td>
            <td className={s.td}>{name}</td>
            <td className={s.td}>{shoppingCategoriesMap[category]}</td>
            <td className={s.td}>{defaultUnit ? unitMap[defaultUnit] : ""}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
