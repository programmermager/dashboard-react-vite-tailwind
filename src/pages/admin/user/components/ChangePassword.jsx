import { useForm } from "react-hook-form";
import { Input } from "../../../../components/Input";
import { FormName } from "../../../../lib/helper/form-name";
import Button from "../../../../components/Button";
import Validators from "../../../../lib/helper/validators";
import { useState } from "react";

export const ChangePassword = ({ onClose, onSubmit }) => {
  const [password, setPassword] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        rules={{
          ...Validators.password(),
        }}
        error={errors.password?.message}
        name={FormName.PASSWORD}
        label="Kata Sandi Baru"
        className="mt-5"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Masukkan Kata Sandi"
      />
      <Input
        register={register}
        name={FormName.CONFIRM_PASSWORD}
        error={errors.confirm_password?.message}
        rules={{
          ...Validators.password(),
          validate: (value) => value === password || "Kata Sandi tidak sama",
        }}
        label="Konfirmasi Kata Sandi Baru"
        placeholder="Masukkan Konfirmasi Kata Sandi"
        type="password"
        className="mt-5"
      />
      <div className="mt-5 flex">
        <Button text="Batal" className="bg-red-500" onClick={onClose} />
        <Button text="Perbarui" type="submit" className="ml-2" />
      </div>
    </form>
  );
};
