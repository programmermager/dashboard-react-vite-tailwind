import { useEffect } from "react";
import { toast } from "sonner";
import { supabase, SupabaseRpc } from "../../../lib/helper/supabase-client";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { Pencil, Check, Trash, X } from "lucide-react";
import { DropdownPerPage } from "../components/DropdownPerPage";
import { Pagination } from "../components/Pagination";
import moment from "moment";
import { useState } from "react";
import Modal from "../../../components/modal/ModalDialog";
import { EditUser } from "./components/EditUser";
import {
  getLocalUser,
  getUserById,
  signUpNewUser,
  uploadAvatar,
} from "../../../services/services";
import { AddUser } from "./components/AddUser";

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentUser, setUser] = useState({});
  const [activeEditUser, setActiveEditUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openModal = ({ user }) => {
    setIsModalOpen(true);
    setActiveEditUser(user);
  };
  const closeModal = () => setIsModalOpen(false);

  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  useEffect(() => {
    getLocalUser().then((user) => {
      setUser(user);
    });
  }, []);

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

  async function edit(e, uid) {
    if (e.photo.length === 0) {
      await updateUser(uid, { name: e.name });
      return;
    }

    const response = await uploadAvatar(e);

    if (!response.error) {
      const { data } = await supabase.storage
        .from("avatars")
        .getPublicUrl(response.data.path);
      console.log(`upload === ${data.publicUrl}`);

      updateUser(uid, { name: e.name, photo_profile: data.publicUrl });
    } else {
      toast.error(`Gagal upload avatar: ${response.error.message}`);
    }
  }

  async function updateUser(uid, data) {
    const body = { name: data.name };
    const bodyAuth = { name: data.name };
    if (data.photo_profile) {
      body.photo_profile = data.photo_profile;
      bodyAuth.image = data.photo_profile;
    }

    const { error } = await supabase
      .from("users")
      .update(body)
      .eq("auth_uid", uid);

    if (!error) {
      const { error } = await supabase.auth.updateUser({
        data: bodyAuth,
      });

      console.log(`error update auth ${error}`);
      toast.success(`Berhasil memperbarui data`);
      await getUsers();

      await getUserById(currentUser.auth_uid);
    } else {
      toast.error(`Gagal memperbarui data: ${error.message}`);
    }
  }

  return (
    <div className="w-full rounded-lg border bg-white p-4">
      <div className="mb-6 flex justify-between">
        <h2 className="mb-4 flex text-left text-xl font-bold md:text-2xl">
          User management
        </h2>
        <button
          onClick={openAddModal}
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
                  <Pencil
                    className="mr-4 h-8 w-8 cursor-pointer rounded-full bg-white p-2 text-blue-500"
                    onClick={() => openModal({ user })}
                  />
                  {currentUser.auth_uid !== user.auth_uid ? (
                    <Trash
                      className="h-8 w-8 cursor-pointer rounded-full bg-white p-2 text-red-500"
                      onClick={() => confirmSwal(user.auth_uid)}
                    />
                  ) : (
                    <div />
                  )}
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

      <Modal isOpen={isModalOpen} onClose={closeModal} title="Edit User">
        <EditUser
          user={activeEditUser}
          onClose={closeModal}
          onSubmit={async (e) => {
            console.log(e);
            await edit(e, activeEditUser.auth_uid);
            closeModal();
          }}
        />
      </Modal>

      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add User">
        <AddUser
          onClose={closeAddModal}
          onSubmit={async (e) => {
            console.log(e);
            const resp = await signUpNewUser({ body: e });

            closeAddModal();
            if (resp.error) {
              toast.error(`${resp.error.message}`);
            } else {
              toast.success(
                `Anda berhasil registrasi, silahkan verifikasi akun anda melalui email ${e.email}`,
              );
              await getUsers();
            }
          }}
        />
      </Modal>
    </div>
  );
};
