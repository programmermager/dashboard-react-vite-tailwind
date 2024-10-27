import { useState } from "react";

import Button from "../../components/Button";
import { FormName } from "../../lib/helper/form-name";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import Validators from "../../lib/helper/validators";
import { supabase } from "../../lib/helper/supabase-client";
import { toast } from "sonner";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ForgotPassPage = () => {
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
    resetPassword(data);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log(`event ${event} session ${session}`);
      if (event == "PASSWORD_RECOVERY") {
        const newPassword = prompt(
          "What would you like your new password to be?",
        );
        const { data, error } = await supabase.auth.updateUser({
          password: newPassword,
        });

        if (data) alert("Password updated successfully!");
        if (error) alert("There was an error updating your password.");
      }
    });
  }, []);

  async function resetPassword(data) {
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(data["email"]);

    if (error) {
      toast.error(`Gagal mengirim Email ${error.message}`);
      console.log(`error resend Email ${error}`);
    } else {
      toast.success(`Berhasil kirim email ke ${data.email}`);
    }
    setLoading(false);
  }

  return (
    <div className="m-auto md:w-1/2 lg:w-1/3">
      <div className="flex flex-col items-start px-5">
        <div className="mb-5 flex">
          <ArrowLeft onClick={() => navigate("/login")} className="mr-5" />
          <span className="font-bold">Kembali</span>
        </div>

        <p className="text-xl font-bold">Lupa Kata Sandi</p>
        <hr className="mt-2" />

        <form
          className="flex w-full flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            register={register}
            rules={{
              ...Validators.email(),
            }}
            name={FormName.EMAIL}
            error={errors.email?.message}
            className="my-5"
            label="Email"
            placeholder="Masukkan Email"
            type="email"
          />

          <Button type="submit" isLoading={isLoading} text="Kirim" />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassPage;

export const Footer = ({ isLogin }) => {
  return (
    <div className="flex flex-col">
      <p className="mt-2 text-center">
        {`Dengan menekan tombol ${isLogin ? `Masuk` : `Registrasi`}, Anda telah menyetujui`}
      </p>
      <div className="flex flex-row justify-center">
        <a
          href="https://id.wikipedia.org/wiki/Black_Panther:_Wakanda_Forever"
          target="blank"
          className="font-bold text-red-500"
        >
          Kebijakan Privasi
        </a>
        <p className="mx-2">&</p>
        <a
          href="https://www.imdb.com/title/tt9114286/"
          target="blank"
          className="font-bold text-red-500"
        >
          Ketentuan Cookies
        </a>
      </div>
    </div>
  );
};
