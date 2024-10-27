import { useForm } from "react-hook-form";
import { Input } from "../../../../components/Input";
import { FormName } from "../../../../lib/helper/form-name";
import Button from "../../../../components/Button";
import { useState } from "react";
import Validators from "../../../../lib/helper/validators";

export const AddUser = ({ onClose, onSubmit }) => {
  const [image, setImage] = useState();
  const [password, setPassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)} //TODO gimana yak ini biar bisa kasih action lain}
      >
        <img
          src={image}
          className={`${image ? `block` : `hidden`} h-20 w-20 rounded-full object-contain`}
        />
        <Input
          register={register}
          name={FormName.PHOTO}
          accept="image/*"
          label="Foto Profil"
          className="mt-5"
          type="file"
          onChange={(e) => {
            setImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <Input
          register={register}
          name={FormName.NAME}
          rules={{
            ...Validators.required(),
          }}
          error={errors.name?.message}
          label="Nama Lengkap"
          className="mt-5"
          placeholder="Masukkan Nama Lengkap"
        />
        <Input
          register={register}
          name={FormName.EMAIL}
          rules={{
            ...Validators.email(),
          }}
          error={errors.email?.message}
          label="Email"
          className="mt-5"
          placeholder="Masukkan Email Valid"
        />
        <Input
          register={register}
          name={FormName.PASSWORD}
          rules={{
            ...Validators.password(),
          }}
          error={errors.password?.message}
          label="Kata Sandi"
          className="mt-5"
          placeholder="Masukkan Kata Sandi"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          register={register}
          name={FormName.CONFIRM_PASSWORD}
          rules={{
            ...Validators.password(),
            validate: (value) => value === password || "Kata Sandi tidak sama",
          }}
          error={errors.confirm_password?.message}
          type="password"
          label="Konfirmasi Kata Sandi"
          placeholder="Masukkan Konfirmasi Kata Sandi"
          className="mt-5"
        />
        <div className="mt-5 flex">
          <Button text="Batal" className="bg-red-500" onClick={onClose} />
          <Button text="Tambahkan" type="submit" className="ml-2" />
        </div>
      </form>
    </div>
  );
};
