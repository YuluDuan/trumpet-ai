import { Table } from "@radix-ui/themes";

const SubscriptionTable = () => {
  return (
    <Table.Root variant="surface" className="table">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>SUBSCRIPTION</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>STATUS</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>NEXT PAYMENT</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>TOTAL</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>Danilo Sousa</Table.RowHeaderCell>
          <Table.Cell>Active</Table.Cell>
          <Table.Cell>March 19, 2023</Table.Cell>
          <Table.Cell>$11.99</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
          <Table.Cell>Pass</Table.Cell>
          <Table.Cell>September 27, 2023</Table.Cell>
          <Table.Cell>$11.99</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default SubscriptionTable;
