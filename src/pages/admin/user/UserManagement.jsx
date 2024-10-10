import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase, SupabaseRpc } from "../../../lib/helper/supabase-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Pencil, Check, Trash, X } from "lucide-react";
import { DropdownPerPage } from "../components/DropdownPerPage";
import { Pagination } from "../components/Pagination";
import moment from "moment";
import { useState } from "react";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  async function getUsers() {
    const { data, error } = await supabase.rpc(SupabaseRpc.getUsers, {
      page_size: perPage,
      page_number: currentPage,
    });
    if (error) {
      toast.error(error.message);
    } else {
      setTotalPages(data.total_pages);
      setUsers(data);
    }
  }

  useEffect(() => {
    getUsers();
  }, [currentPage, perPage]);

  async function deleteUser(uid) {
    await supabase.auth.admin.deleteUser(uid);
    const { err } = await supabase
      .from("users")
      .delete()
      .match({ auth_uid: uid });
    if (!err) {
      toast.success(`Berhasil menghapus user`);
      getUsers();
    }
  }

  const confirmSwal = (uid) => {
    withReactContent(Swal).fire({
      title: "Hapus User",
      text: "Apakah anda yakin ingin menghapus user ini?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Hapus",
      cancelButtonText: "Batal",
      reverseButtons: true,
      preConfirm: () => deleteUser(uid),
    });
  };

  return (
    <div className="w-full rounded-lg border bg-white p-4">
      <div className="mb-6 flex justify-between">
        <h2 className="mb-4 flex text-left text-xl font-bold md:text-2xl">
          User management
        </h2>
        <button
          onClick={() => navigate("/admin/add-user")}
          className="cursor-pointer rounded-md bg-primary px-2 font-bold text-white hover:bg-blue-700 md:px-4"
        >
          <span className="text-xs md:text-base">Tambah User</span>
        </button>
      </div>
      <hr />

      <div className="relative overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Nama Lengkap
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Dibuat Tanggal
              </th>
              <th scope="col" className="px-6 py-3">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            {users.data?.map((user, index) => (
              <tr
                key={user.id}
                className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {index + 1}
                </th>
                <th
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                >
                  {user.name}
                </th>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">
                  {user.is_active ? (
                    <Check className="mr-4 h-8 w-8 rounded-full bg-green-600 p-2 text-white" />
                  ) : (
                    <X className="mr-4 h-8 w-8 rounded-full bg-red-600 p-2 text-white" />
                  )}
                </td>
                <td className="px-6 py-4">
                  {moment(user.created_at).format("D MMM YYYY")}
                </td>
                <td className="flex px-6 py-4">
                  <Pencil className="mr-4 h-8 w-8 cursor-pointer rounded-full bg-white p-2 text-blue-500" />
                  <Trash
                    className="h-8 w-8 cursor-pointer rounded-full bg-white p-2 text-red-500"
                    onClick={() => confirmSwal(user.auth_uid)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex flex-col items-center justify-between md:flex-row">
        <DropdownPerPage
          onChange={(e) => setPerPage(parseInt(e.target.value))}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage(currentPage - 1)}
          onNext={() => setCurrentPage(currentPage + 1)}
        />
      </div>
    </div>
  );
};
