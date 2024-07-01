export const generateEmployeeId = () => {
  const id = Math.floor(100000 + Math.random() * 900000);
  const employeeId = `VAM${id}`;
  return employeeId;
};
