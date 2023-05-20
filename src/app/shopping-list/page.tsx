import { Button, Check, Plus, Text } from "lib";
import { getClient } from "lib/graphql/client";
import {
  ShoppingCategories,
  shoppingCategoriesMap,
} from "utilities/types/shopping";
import cn from "classnames";
import { Units, unitMap } from "utilities/types/units";
import utilStyles from "lib/styles/utilities.module.css";
import { GET_SHOPPING_LIST } from "./gql";
import { GetShoppingListQuery } from "./gql.generated";

import s from "./page.module.css";
import { AddToCart } from "./internals/add-to-cart/add-to-cart";
import { getText } from "./internals/utilities";

export default async function ShoppingList() {
  const { data } = await getClient().query<GetShoppingListQuery>({
    query: GET_SHOPPING_LIST,
  });

  const listCategories = data?.list.items
    .reduce(
      (acc: string[], item) =>
        acc.includes(item.category) ? acc : [...acc, item.category],
      []
    )
    .sort((a, b) => a.localeCompare(b));

  return (
    <main>
      <header className={s.header}>
        <Text variant="title">Shopping List</Text>
      </header>

      <ul className={s.groupedList}>
        {listCategories.map((category) => (
          <li key={category}>
            <Text variant="subtitle">
              {shoppingCategoriesMap[category as ShoppingCategories]}
            </Text>
            <ul className={utilStyles.listReset}>
              {data.list.items
                .filter((item) => item.category === category)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(({ name, id, quantityNeeded, unit, inCart }) => (
                  <li key={id} className={s.listItem}>
                    <AddToCart id={id} inCart={inCart} />
                    <Text className={cn(inCart ? s.inCart : undefined)}>
                      {getText({ quantityNeeded, itemName: name, unit })}
                    </Text>
                  </li>
                ))}
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
