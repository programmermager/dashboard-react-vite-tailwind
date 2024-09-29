import { useState } from "react";
import Button from "../../../components/button";
import Form from "../../../components/form-app";
import { supabase } from "../../../lib/helper/supabase-client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function FormLogin({ isRegister = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setValid] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function signUpNewUser() {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) {
      toast.error(`${error}`);
    } else {
      console.log(`data user => ${data}`);
      toast.success(
        `Anda berhasil registrasi, silahkan verifikasi akun anda melalui email`,
      );
    }
  }

  async function signInWithEmail() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) {
      toast.error(`${error}`);
    } else {
      localStorage.setItem("token", data.session.access_token);
      toast.success(`Anda berhasil login`);
      navigate("/", { replace: true });
    }
  }

  function checkValidity() {
    setValid(email !== "" && password !== "");
  }

  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-col items-start">
        <p className="mb-2 mt-4 text-sm">Email</p>
        <Form
          placeholder="Masukkan Email"
          type="email"
          onInput={(e) => {
            setEmail(e.target.value);
            checkValidity();
          }}
        />
      </div>
      <div className="flex flex-col items-start">
        <p className="mb-2 mt-4 text-sm">Password</p>
        <Form
          placeholder="Masukkan Kata Sandi"
          type="password"
          onInput={(e) => {
            setPassword(e.target.value);
            checkValidity();
          }}
        />
      </div>

      <div className="my-5 flex w-full flex-row justify-between">
        <div className="flex flex-row items-center">
          <input type="checkbox" name="remember" id="" className="mr-2" />
          <p className="text-primary text-sm font-bold">Ingat Saya</p>
        </div>
        <p className="text-primary text-sm font-bold">Lupa Password</p>
      </div>
      <Button
        isLoading={isLoading}
        disabled={!isValid}
        text={isRegister ? `Registrasi` : `Masuk`}
        onClick={isRegister ? signUpNewUser : signInWithEmail}
      />
    </div>
  );
}

export default FormLogin;
