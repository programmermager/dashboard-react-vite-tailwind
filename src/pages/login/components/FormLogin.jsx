import { useState } from "react";
import Button from "../../../components/Button";
import { supabase } from "../../../lib/helper/supabase-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/Input";
import { useForm } from "react-hook-form";
import Validators from "../../../lib/helper/validators";
import { FormName } from "../../../lib/helper/form-name";

export const FormLogin = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    criteriaMode: "all",
  });

  const onSubmit = (data) => {
    signInWithEmail(data);
  };

  const onResend = (data) => {
    resendEmail(data);
  };

  async function resendEmail(data) {
    setLoading(!isLoading);
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: data["email"],
    });
    console.log(error);
    setLoading(!isLoading);
  }

  async function signInWithEmail(body) {
    setLoading(!isLoading);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: body["email"],
      password: body["password"],
    });
    setLoading(!isLoading);

    if (error) {
      toast.error(`${error.message}`);
    } else {
      localStorage.setItem("token", data.session.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(`Anda berhasil login`);
      navigate("/", { replace: true });
    }
  }

  return (
    <form className="flex w-full flex-col" onSubmit={handleSubmit(onSubmit)}>
      <Input
        register={register}
        rules={{
          ...Validators.email(),
        }}
        name={FormName.EMAIL}
        error={errors.email?.message}
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
        name={FormName.PASSWORD}
        error={errors.password?.message}
        label="Kata Sandi"
        className="mt-5"
        placeholder="Masukkan Kata Sandi"
        type="password"
      />

      <div className="my-5 flex w-full flex-row justify-between">
        <div className="flex flex-row items-center">
          <input type="checkbox" name="remember" id="" className="mr-2" />
          <p className="text-sm font-bold text-primary">Ingat Saya</p>
        </div>
        <p
          className="cursor-pointer text-sm font-bold text-primary"
          onClick={handleSubmit(onResend)}
        >
          Lupa Password
        </p>
      </div>
      <Button type="submit" isLoading={isLoading} text="Masuk" />
    </form>
  );
};
