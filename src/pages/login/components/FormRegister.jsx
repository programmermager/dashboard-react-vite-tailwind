import { useState } from "react";
import Button from "../../../components/Button";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form";
import Validators from "../../../lib/helper/validators";
import { FormName } from "../../../lib/helper/form-name";
import { toast } from "sonner";
import { signUpNewUser } from "../../../services/services";

export const FormRegister = ({ onSuccessRegister }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const onSubmit = (data) => {
    signingUp(data);
  };

  async function signingUp(body) {
    setLoading(true);

    const resp = await signUpNewUser({ body: body });

    if (resp.error) {
      toast.error(`${resp.error.message}`);
    } else {
      toast.success(
        `Anda berhasil registrasi, silahkan verifikasi akun anda melalui email ${body.email}`,
      );
      onSuccessRegister();
    }

    setLoading(false);
  }

  return (
    <form className="flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        rules={{
          required: "Nama tidak boleh kosong",
        }}
        error={errors.name?.message}
        name={FormName.NAME}
        className="mt-5"
        label="Nama Lengkap"
        placeholder="Masukkan Nama Lengkap"
        type="text"
      />
      <Input
        register={register}
        rules={{
          ...Validators.email(),
        }}
        error={errors.email?.message}
        name={FormName.EMAIL}
        className="mt-5"
        label="Email"
        placeholder="Masukkan Email"
        type="email"
      />
      <Input
        register={register}
        rules={{
          ...Validators.password(),
        }}
        error={errors.password?.message}
        name={FormName.PASSWORD}
        label="Kata Sandi"
        className="mt-5"
        placeholder="Masukkan Kata Sandi"
        type="password"
        onInput={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Input
        register={register}
        rules={{
          required: "Kata Sandi tidak boleh kosong",
          minLength: {
            value: 8,
            message: "Minimal 8 Karakter",
          },
          validate: (value) => value === password || "Kata Sandi tidak sama",
        }}
        error={errors.confirm_password?.message}
        name="confirm_password"
        label="Konfirmasi Kata Sandi"
        className="my-5"
        placeholder="Masukkan Konfirmasi Kata Sandi"
        type="password"
      />

      <Button type="submit" isLoading={isLoading} text="Registrasi" />
    </form>
  );
};
