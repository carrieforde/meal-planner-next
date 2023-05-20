"use client";

import { useMutation } from "@apollo/client";
import { ADD_ITEM_TO_LIST } from "app/catalog/gql";
import {
  Button,
  Dialog,
  Form,
  FormControl,
  Input,
  Plus,
  Select,
  useAlert,
  useForm,
  useOpenClose,
} from "lib";
import { noop } from "lodash";
import { useRef } from "react";
import { Units, unitMap } from "utilities/types/units";

interface AddItemToListFields {
  quantity: string;
  unit?: Units;
}

export default function AddToList({
  itemId,
  name,
  unit,
}: {
  itemId: string;
  name: string;
  unit?: Units;
}) {
  const { isOpen, open, close } = useOpenClose();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const alert = useAlert();

  const [mutation, { loading }] = useMutation(ADD_ITEM_TO_LIST);

  const { fields, ...form } = useForm<AddItemToListFields>({
    initialValues: {
      quantity: "0",
      unit,
    },
    onSubmit: async (values) => {
      await mutation({
        variables: {
          input: {
            itemId,
            quantityNeeded: parseInt(values.quantity, 10),
            ...(values.unit && { unit: values.unit }),
          },
        },
        onCompleted: () => alert.success(`${name} successfully added to list!`),
        onError: (error) => alert.error(error.message),
      });

      close();
    },
  });

  return (
    <>
      <Button
        type="button"
        variant="icon"
        onClick={open}
        ref={buttonRef}
        id="add-item-to-list"
      >
        <Plus />
      </Button>

      <Dialog
        id={`add-${name}-to-list`}
        ariaDescribedby={`add-${name}_title`}
        ariaLabelledby={`add-${name}_content`}
        isOpen={isOpen}
        onClose={close}
        buttonRef={buttonRef}
      >
        <Dialog.Title>Add {name} to list</Dialog.Title>
        <Form onSubmit={form.onSubmit}>
          <Dialog.Content>
            <Form.Fields>
              <FormControl {...fields.quantity} label="Quantity Needed">
                <Input inputMode="numeric" />
              </FormControl>

              <FormControl {...fields.unit} label="Unit">
                <Select>
                  {Object.entries(unitMap).map(([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Form.Fields>
          </Dialog.Content>

          <Dialog.Actions>
            <Form.Actions>
              <Button
                type="submit"
                variant="filled"
                color="primary"
                loading={loading}
              >
                Add {name} to list
              </Button>
            </Form.Actions>
          </Dialog.Actions>
        </Form>
      </Dialog>
    </>
  );
}
