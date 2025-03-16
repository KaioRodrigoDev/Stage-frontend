"use client";
import { postNewArea } from "@/service/api/area";
import { ModalNewAreaProps } from "@/types/home/areas";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function ModalArea({
  isModalOpen,
  setIsModalOpen,
  getAreas,
}: ModalNewAreaProps) {
  const [areaName, setAreaName] = useState("");
  const [areaDescription, setAreaDescription] = useState("");

  const handleCreateNewArea = useCallback(async () => {
    try {
      const response = await postNewArea(areaName, areaDescription);

      toast(response.message, {
        position: "bottom-left",
        type: "success",
      });
      await getAreas();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast("Error ao tentar criar area", {
        position: "bottom-left",
        type: "error",
      });
    }
  }, [areaDescription, areaName, getAreas, setIsModalOpen]);

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4 text-gray-600">
            Criar Nova Área
          </h2>

          <input
            type="text"
            placeholder="Nome da Área"
            onChange={(event) => setAreaName(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600"
          />

          <input
            type="text"
            placeholder="Descrição da Área"
            onChange={(event) => setAreaDescription(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600"
          />

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-[#6D23F8] text-white rounded"
              onClick={handleCreateNewArea}
            >
              Criar
            </button>
          </div>
        </div>
      </div>
    )
  );
}
