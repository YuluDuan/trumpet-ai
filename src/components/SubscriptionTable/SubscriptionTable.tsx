import { Table } from "@radix-ui/themes";

const SubscriptionTable = () => {
  return (
    <Table.Root variant="surface">
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
          <Table.Cell>danilo@example.com</Table.Cell>
          <Table.Cell>Developer</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>

        <Table.Row>
          <Table.RowHeaderCell>Zahra Ambessa</Table.RowHeaderCell>
          <Table.Cell>zahra@example.com</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default SubscriptionTable;
