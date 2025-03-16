import { postNewSubProcess } from "@/service/api/process";
import { ModalCreateSubProcessProps } from "@/types/home/processes";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";

export default function ModalCreateSubProcess({
  infoModalProcess,
  setInfoModalProcess,
  getProcess,
}: ModalCreateSubProcessProps) {
  const [subProcessName, setSubProcessName] = useState("");
  const [subProcessDescription, setSubProcessDescription] = useState("");

  const handleCreateSubProcess = useCallback(async () => {
    try {
      const response = await postNewSubProcess(
        infoModalProcess?.id ?? 1,
        subProcessName,
        subProcessDescription
      );

      toast(response.message, {
        position: "bottom-left",
        type: "success",
      });
      await getProcess();
      setInfoModalProcess(null);
    } catch (error) {
      console.log(error);
      toast("Error ao tentar criar subprocesso", {
        position: "bottom-left",
        type: "error",
      });
    }
  }, [
    getProcess,
    infoModalProcess?.id,
    setInfoModalProcess,
    subProcessDescription,
    subProcessName,
  ]);

  return (
    infoModalProcess && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
          <h2 className="text-lg text-gray-600">Crie um subProcesso:</h2>
          <input
            type="text"
            placeholder="Nome do SubProcesso"
            onChange={(event) => setSubProcessName(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600"
          />

          <input
            type="text"
            placeholder="Descrição do SubProcesso"
            onChange={(event) => setSubProcessDescription(event.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-4 text-gray-600"
          />

          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
              onClick={() => setInfoModalProcess(null)}
            >
              Cancelar
            </button>

            <button
              className="px-4 py-2 bg-[#6D23F8] text-white rounded cursor-pointer"
              onClick={() => handleCreateSubProcess()}
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    )
  );
}
