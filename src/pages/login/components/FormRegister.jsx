import { useState } from "react";
import Button from "../../../components/Button";
import { supabase } from "../../../lib/helper/supabase-client";
import { toast } from "sonner";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form";
import Validators from "../../../lib/helper/validators";

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
    const { data } = await supabase.rpc("check_email_exists", {
      email_input: email,
    });
    return data;
  }

  async function signUpNewUser(body) {
    setLoading(true);
    const isExist = await checkUser(body["email"]);
    if (!isExist) {
      const { data, error } = await supabase.auth.signUp({
        email: body["email"],
        password: body["password"],
      });

      if (error) {
        toast.error(`${error.message}`);
      } else {
        await supabase.from("users").insert({
          email: data.user.email,
          name: body["name"],
        });

        toast.success(
          "Anda berhasil registrasi, silahkan verifikasi akun anda melalui email",
        );
        onSuccessRegister();
      }
    } else {
      toast.error(
        `Email ${body["email"]} sudah terdaftar, silahkan gunakan email lain`,
      );
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
        name="name"
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
        name="email"
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
        name="password"
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
          validate: (value) =>
            value === password || "The passwords do not match",
        }}
        error={errors.confirm_password?.message}
        name="confirm_password"
        label="Konfirmasi Kata Sandi"
        className="mt-5"
        placeholder="Masukkan Konfirmasi Kata Sandi"
        type="password"
      />

      <div className="my-5 flex w-full flex-row justify-between">
        <div className="flex flex-row items-center">
          <input type="checkbox" name="remember" id="" className="mr-2" />
          <p className="text-sm font-bold text-primary">Ingat Saya</p>
        </div>
        <p className="text-sm font-bold text-primary">Lupa Password</p>
      </div>
      <Button type="submit" isLoading={isLoading} text="Registrasi" />
    </form>
  );
};
