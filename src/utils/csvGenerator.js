const { parse } = require("json2csv");

function csvGenerator(attendance) {
  const fields = [
    { label: "Date", value: "date" },
    { label: "Employee Name", value: "userId.name" },
    { label: "Check In", value: "checkIn" },
    { label: "Check Out", value: "checkOut" },
    { label: "Work Hours", value: "workHours" },
    { label: "Status", value: "status" },
  ];

  try {
    // Use `parse` from `json2csv`
    const csv = parse(attendance, { fields });
    return csv;
  } catch (error) {
    console.error("Error generating CSV:", error);
    throw new Error("CSV generation failed");
  }
}

module.exports = { csvGenerator };
