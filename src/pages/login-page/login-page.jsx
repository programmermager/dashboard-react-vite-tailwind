import { useState } from "react";
import FormLogin from "./components/form-login";
import { Logo } from "../../components/logo";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-start px-5 lg:mr-20">
          <div className="flex flex-row items-center">
            <Logo />
            <div className="flex flex-col items-center">
              <p className="text-lg font-bold">Wakanda </p>
              <p className="text-lg font-bold">Forever </p>
            </div>
          </div>
          <p className="mt-5 text-xl font-bold">Masuk</p>
          <div className="flex flex-row">
            <p className="text-sm">
              {isLogin
                ? `Belum punya akun Wakanda Forever?`
                : `Sudah punya akun Wakanda Forever?`}{" "}
            </p>
            <p
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-sm font-bold text-blue-800"
            >
              {isLogin ? `Registrasi Disini` : `Login Disini`}
            </p>
          </div>
          <hr className="mt-2" />

          <FormLogin isRegister={!isLogin} />
          <Footer />
        </div>
        <img
          alt=""
          className="hidden h-[50rem] w-auto rounded-3xl lg:block"
          src="https://cdn.europosters.eu/image/1300/149853.jpg"
        />
      </div>
    </div>
  );
};

export default LoginPage;

export const Footer = () => {
  return (
    <div className="flex flex-col">
      <p className="mt-2 text-center">
        Dengan menekan tombol masuk, Anda telah menyetujui
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
