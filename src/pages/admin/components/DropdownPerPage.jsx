export const DropdownPerPage = ({ onChange }) => {
  return (
    <>
      <select className="rounded-md border p-2 text-sm" onChange={onChange}>
        <option value="10">10 Per Halaman</option>
        <option value="20">20 Per Halaman</option>
        <option value="30">30 Per Halaman</option>
        <option value="40">40 Per Halaman</option>
        <option value="50">50 Per Halaman</option>
      </select>
    </>
  );
};
