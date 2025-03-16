"use client";
import API_SERVICE from "@/service/api";
import { AreasItem } from "@/types/home/areas";
import React, { useCallback, useEffect, useState } from "react";
import ModalArea from "./fragments/modalNewArea";
import ModalAddProcess from "./fragments/modalAddProcess";
import { removeArea } from "@/service/api/area";
import { toast } from "react-toastify";

export default function AreaComponent() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAreas, setOpenAreas] = useState<Record<number, boolean>>({});
  const [isModalAreaOpen, setIsModalAreaOpen] = useState(false);
  const [isModalAddProcessOpen, setIsModalAddProcessOpen] =
    useState<AreasItem | null>(null);

  const handleGetAllArea = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API_SERVICE("/area-by-user");

      setAreas(response.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetAllArea();
  }, [handleGetAllArea]);

  const toggleArea = (id: number) => {
    setOpenAreas((prev) => ({
      ...prev,
      [id]: !prev[id], // Inverte o estado apenas da área clicada
    }));
  };

  const handleDelete = useCallback(
    async (item: AreasItem) => {
      const isConfirmed = window.confirm(
        "Tem certeza que deseja deletar a área?"
      );

      if (isConfirmed) {
        await removeArea(item.id);
        await handleGetAllArea();

        toast("Area removido com sucesso", {
          position: "bottom-left",
          type: "success",
        });
      }
    },
    [handleGetAllArea]
  );

  return (
    <div className="overflow-y-auto">
      <ModalArea
        isModalOpen={isModalAreaOpen}
        setIsModalOpen={setIsModalAreaOpen}
        getAreas={handleGetAllArea}
      />

      <ModalAddProcess
        infoModalArea={isModalAddProcessOpen}
        setInfoModalArea={setIsModalAddProcessOpen}
        getAreas={handleGetAllArea}
      />

      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-gray-600">Áreas</h1>

        <div>
          <button
            onClick={() => setIsModalAreaOpen(true)}
            className="cursor-pointer bg-[#6D23F8] p-3 px-6 m-2 rounded-md"
          >
            Criar nova area
          </button>
        </div>
      </div>

      <div className="">
        {!loading ? (
          areas.map((item: AreasItem) => (
            <div
              key={item.id}
              className="border flex-1 rounded-lg shadow-md w-full  my-2 "
            >
              <div className="flex">
                {/* Cabeçalho do Acordeão */}
                <button
                  className="w-full flex justify-between items-center p-4 bg-gray-200 hover:bg-gray-300 transition"
                  onClick={() => toggleArea(item.id)} // 🔹 Alterna apenas esta área
                >
                  <div className=" text-left">
                    <span className="font-semibold text-lg text-[#6D23F8]">
                      {item.name}
                    </span>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>

                  <div className="flex space-x-4">
                    <span
                      className={`transform transition-transform text-[#6D23F8] ${
                        openAreas[item.id] ? "rotate-180 -mt-2" : "rotate-0"
                      }`}
                    >
                      ▼
                    </span>
                  </div>
                </button>

                <button
                  className="group px-2 bg-gray-200 cursor-pointer"
                  onClick={() => setIsModalAddProcessOpen(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="orange"
                    stroke="black" // Cor preta para destacar em fundo branco
                    strokeWidth="2.5" // Linha mais espessa para melhor visibilidade
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6" // Tamanho um pouco maior
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19H3v-4L16.5 3.5z" />
                  </svg>
                </button>
                <button
                  className="group px-2 bg-gray-200 cursor-pointer"
                  onClick={() => handleDelete(item)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black" // Cor preta para melhor contraste
                    strokeWidth="2.5" // Linha mais espessa para destaque
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6" // Tamanho um pouco maior
                  >
                    <path d="M3 6h18" />
                    <path d="M8 6V4h8v2" />
                    <path d="M10 11v6" />
                    <path d="M14 11v6" />
                    <path d="M5 6l1 14h12l1-14" />
                  </svg>
                </button>
              </div>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openAreas[item.id]
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <ul className="p-4 bg-white space-y-2">
                  {item?.processes?.length ? (
                    <div className="flex flex-col gap-3">
                      {item.processes.map((process) => (
                        <div
                          key={process.id}
                          className="bg-gray-100 p-4 rounded-md shadow-sm border border-gray-200"
                        >
                          <h3 className="font-semibold text-gray-700">
                            {process.name}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            {process.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="py-2 text-gray-500 text-center italic">
                      Nenhum processo encontrado
                    </p>
                  )}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
