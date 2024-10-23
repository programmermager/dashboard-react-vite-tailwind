import { useForm } from "react-hook-form";
import { Input } from "../../../../components/Input";
import { FormName } from "../../../../lib/helper/form-name";
import Button from "../../../../components/Button";

export const ChangePassword = ({ onClose, onSubmit }) => {
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
        name={FormName.PASSWORD}
        rules={{
          required: "Nama tidak boleh kosong",
        }}
        error={errors.password?.message}
        label="Kata Sandi Baru"
        className="mt-5"
        placeholder="Masukkan Kata Sandi"
      />
      <Input
        register={register}
        name={FormName.CONFIRM_PASSWORD}
        error={errors.confirm_password?.message}
        label="Konfirmasi Kata Sandi Baru"
        placeholder="Masukkan Konfirmasi Kata Sandi"
        className="mt-5"
      />
      <div className="mt-5 flex">
        <Button text="Batal" className="bg-red-500" onClick={onClose} />
        <Button text="Perbarui" type="submit" className="ml-2" />
      </div>
    </form>
  );
};
