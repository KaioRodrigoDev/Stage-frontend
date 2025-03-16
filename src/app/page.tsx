"use client";
import API_SERVICE from "@/service/api";
import Image from "next/image";
import { useCallback, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  const router = useRouter();
  const handleLogin = useCallback(async () => {
    try {
      console.log(email, password);

      const response = await API_SERVICE.post("/login", {
        email,
        password,
      });

      localStorage.setItem("authBearerToken", response.data);

      router.push("/dashboard");
      toast("Login realizado com sucesso!", {
        position: "bottom-left",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      toast("Erro ao realizar login!");
    }
  }, [email, password, router]);

  return (
    <div
      className=" min-h-screen bg-cover bg-center items-center justify-center flex relative"
      style={{
        backgroundImage:
          "url('https://stage.consulting/images/heros/HeroHome.webp')",
      }}
    >
      <div className=" absolute inset-0 bg-black/50" />
      <main className="z-10 min-w-1/4">
        <div className="bg-[#F6EEFF]  items-center flex-col flex py-12 rounded-lg">
          <Image
            src="/logo/FullVector.svg"
            alt="Background"
            height={200}
            width={200}
          />

          <div className="w-3/4 mt-20">
            <input
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              className="px-4 py-3 border-2 border-gray-200 bg-white rounded-md focus:outline-none text-gray-600 w-full"
              placeholder="Email"
            />

            <input
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              className="px-4 py-3 mt-4 border-2 border-gray-200 bg-white rounded-md focus:outline-none text-gray-600 w-full"
              placeholder="Senha"
            />
            <div className="">
              <p className="text-gray-500 text-xs">
                Não possui conta?
                <span className="text-[#6D23F8]"> Criar conta</span>
              </p>
            </div>

            <div className="flex justify-center mt-18">
              <button
                type="button"
                className="w-1/2 px-8 py-3 bg-[#6D23F8] rounded-md cursor-pointer"
                onClick={handleLogin}
              >
                <p className="text-white text-center">Entrar</p>
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </main>
    </div>
  );
}
