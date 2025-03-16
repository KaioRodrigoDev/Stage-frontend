"use client";
import { postNewProcess } from "@/service/api/process";
import { ModalNewProcessProps } from "@/types/home/processes";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function ModalNewProcess({
  isModalOpen,
  setIsModalOpen,
  getProcess,
}: ModalNewProcessProps) {
  const [processName, setProcessName] = useState("");
  const [processDescription, setProcessDescription] = useState("");
  const [processDocumentation, setProcessDocumentation] = useState("");

  const handleCreateNewArea = useCallback(async () => {
    try {
      const response = await postNewProcess(
        processName,
        processDescription,
        processDocumentation
      );

      toast(response.message, {
        position: "bottom-left",
        type: "success",
      });
      await getProcess();
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast("Error ao tentar criar area", {
        position: "bottom-left",
        type: "error",
      });
    }
  }, [
    getProcess,
    processDescription,
    processDocumentation,
    processName,
    setIsModalOpen,
  ]);

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4 text-gray-600">
            Criar Novo SubProcesso
          </h2>

          <input
            type="text"
            placeholder="Nome do Processo"
            onChange={(event) => setProcessName(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600"
          />

          <input
            type="text"
            placeholder="Descrição do Processo"
            onChange={(event) => setProcessDescription(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600"
          />

          <textarea
            placeholder="Documentação"
            onChange={(event) => setProcessDocumentation(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600 h-32 resize-none"
          />

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-[#6D23F8] text-white rounded cursor-pointer"
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
