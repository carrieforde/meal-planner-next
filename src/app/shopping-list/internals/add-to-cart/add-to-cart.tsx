"use client";

import * as React from "react";
import cn from "classnames";
import { Button, Check, useAlert } from "lib";
import s from "./add-to-cart.module.css";
import { useAddItemToCartMutation } from "../../gql.generated";

type AddToCartProps = {
  id: string;
  inCart?: boolean | null;
};

export const AddToCart: React.FC<AddToCartProps> = ({ id, inCart }) => {
  const [cartState, setCartState] = React.useState(inCart);
  const alert = useAlert();

  const [mutation, { loading }] = useAddItemToCartMutation({
    variables: {
      itemId: id,
    },
    onCompleted: (data) => {
      alert.success(data.addItemToCart.message, { icon: "🛒" });
      setCartState(true);
    },
    onError: (error) => alert.error(error.message),
  });

  const handleClick = async () => {
    await mutation();
  };

  return (
    <Button
      type="button"
      className={cn(s.check, cartState ? s.checked : undefined)}
      onClick={handleClick}
      loading={loading}
    >
      <Check className={s.checkIcon} />
    </Button>
  );
};
