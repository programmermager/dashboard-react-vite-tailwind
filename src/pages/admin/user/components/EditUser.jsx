import { useForm } from "react-hook-form";
import { Input } from "../../../../components/Input";
import { FormName } from "../../../../lib/helper/form-name";
import Button from "../../../../components/Button";
import { useState } from "react";
import { useEffect } from "react";
import Validators from "../../../../lib/helper/validators";

export const EditUser = ({ user, onClose, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  useEffect(() => {
    setImage(user.photo_profile);
  }, []);

  const [image, setImage] = useState();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <img
        src={image}
        className="h-20 w-20 rounded-full object-contain shadow-xl shadow-slate-300"
      />
      <Input
        register={register}
        name={FormName.PHOTO}
        label="Foto Profil"
        className="mt-5"
        placeholder="Masukkan Kata Sandi"
        type="file"
        accept="image/*"
        onChange={(e) => {
          setImage(URL.createObjectURL(e.target.files[0]));
        }}
      />
      <Input
        register={register}
        value={user.name}
        name={FormName.NAME}
        rules={{
          ...Validators.required(),
        }}
        error={errors.name?.message}
        label="Nama"
        className="mt-5"
        placeholder="Masukkan Kata Sandi"
      />
      <Input
        register={register}
        value={user.email}
        name={FormName.EMAIL}
        disabled={true}
        label="Email"
        className="mt-5"
      />
      <div className="mt-5 flex">
        <Button text="Batal" className="bg-red-500" onClick={onClose} />
        <Button text="Perbarui" type="submit" className="ml-2" />
      </div>
    </form>
  );
};
