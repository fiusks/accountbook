const knex = require("../../database/connection");

const listFilteredBills = async (req, res) => {
  const { search, status } = req.body.bills;

  const getBills = await knex("bills")
    .leftJoin("clients", "clients.id", "bills.client_id")
    .select(
      "clients.name",
      "bills.id",
      "bills.amount",
      "bills.description",
      "bills.bill_status",
      "bills.due_date"
    );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function filterBillByStatus() {
    if (status === "paid") {
      return getBills.filter((bill) => bill.bill_status === "paid");
    }
    if (status === "pending") {
      return getBills.filter(
        (bill) => bill.bill_status === "pending" && bill.due_date >= today
      );
    }
    if (status === "overdue") {
      return getBills.filter(
        (bill) => bill.bill_status === "pending" && bill.due_date < today
      );
    }
  }

  function filterBillBysearch() {
    return getBills.filter((bill) => {
      if (bill.name.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }
      if (String(bill.id) === search) {
        return true;
      }
    });
  }
  function filterTwoArrays(array1, array2) {
    return array1.filter((bill) => array2.indexOf(bill) !== -1);
  }

  function getFilteredList() {
    if (status && search) {
      const filteredBillsByStatus = filterBillByStatus();
      const filteredBillsBySearch = filterBillBysearch();
      const filteredList = filterTwoArrays(
        filteredBillsByStatus,
        filteredBillsBySearch
      );

      if (status === "overdue") {
        return filteredList.map((bill) => ({
          ...bill,
          bill_status: "overdue",
        }));
      }

      return filteredList;
    }
    if (search) {
      const filteredList = filterBillBysearch().slice(0, 10);

      return filteredList;
    }
    if (status) {
      const filteredList = filterBillByStatus();
      if (status === "overdue") {
        return filteredList.map((bill) => ({
          ...bill,
          bill_status: "overdue",
        }));
      }

      return filteredList;
    }
  }

  const filterdBillstList = getFilteredList();

  const data =
    filterdBillstList.length === 0
      ? "Nenhum resultado encontrado"
      : filterdBillstList;

  return res.status(200).json({ bills: data });
};

module.exports = listFilteredBills;
