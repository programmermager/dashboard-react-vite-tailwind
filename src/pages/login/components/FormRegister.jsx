import { useState } from "react";
import Button from "../../../components/Button";
import { supabase, SupabaseRpc } from "../../../lib/helper/supabase-client";
import { toast } from "sonner";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form";
import Validators from "../../../lib/helper/validators";
import { FormName } from "../../../lib/helper/form-name";

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
    signUpNewUser(data);
  };

  async function checkUser(email) {
    const { data } = await supabase.rpc(SupabaseRpc.checkEmail, {
      email_input: email,
    });
    return data;
  }

  async function signUpNewUser(body) {
    setLoading(!isLoading);
    const isExist = await checkUser(body["email"]);
    if (!isExist) {
      const { data, error } = await supabase.auth.signUp({
        email: body["email"],
        password: body["password"],
        options: {
          data: {
            name: body["name"],
            role: "user",
            image: `https://avatar.iran.liara.run/username?username=${body["name"]}`,
          },
        },
      });

      if (error) {
        toast.error(`${error.message}`);
      } else {
        toast.success(
          `Anda berhasil registrasi, silahkan verifikasi akun anda melalui email ${data.user.email}`,
        );
        onSuccessRegister();
      }
    } else {
      toast.error(
        `Email ${body["email"]} sudah terdaftar, silahkan gunakan email lain`,
      );
    }

    setLoading(!isLoading);
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
