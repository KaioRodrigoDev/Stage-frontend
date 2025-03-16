"use client";
import {
  ModalEditProcessProps,
  SubProcessesProps,
} from "@/types/home/processes";
import React, { useCallback, useState } from "react";
import { toast } from "react-toastify";
import ToolInput from "./input";
import { deleteSubProcess, postProcessTools } from "@/service/api/process";

export default function ModalEditSubProcess({
  infoModalProcess,
  setInfoModalProcess,
  getAreas,
}: ModalEditProcessProps) {
  const [tools, setTools] = useState(
    infoModalProcess?.tools ? JSON.parse(infoModalProcess.tools) : []
  );

  const handleDeleteSubProcess = useCallback(
    async (subProcessId: number) => {
      if (!infoModalProcess) return;
      try {
        const response = await deleteSubProcess(subProcessId);

        toast(response.message, {
          position: "bottom-left",
          type: "success",
        });
        await getAreas();
        setInfoModalProcess(null);
      } catch (error) {
        console.log(error);
        toast("Error ao tentar desvincular sub processo", {
          position: "bottom-left",
          type: "error",
        });
      }
    },
    [getAreas, infoModalProcess, setInfoModalProcess]
  );

  const handleChangeTools = useCallback(async () => {
    try {
      const response = await postProcessTools(infoModalProcess?.id ?? 1, tools);

      toast(response.message, {
        position: "bottom-left",
        type: "success",
      });
      await getAreas();
      setInfoModalProcess(null);
    } catch (error) {
      console.log(error);
      toast("Error ao tentar vincular ferramentas", {
        position: "bottom-left",
        type: "error",
      });
    }
  }, [getAreas, infoModalProcess?.id, setInfoModalProcess, tools]);

  return (
    infoModalProcess && (
      <div className="fixed inset-0 flex items-center justify-center space-x-4 bg-black/40 bg-opacity-50">
        <div className="w-1/4   h-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <h2 className="text-lg text-gray-600">
              Editar Subprocessos do Processo:
            </h2>
            <h2 className="text-[#6D23F8]  mb-4 font-bold text-xl">
              {infoModalProcess.name}
            </h2>

            <div className="space-y-2 my-4 h-80 overflow-y-auto">
              {infoModalProcess.subprocesses.map((item: SubProcessesProps) => {
                return (
                  <div
                    className={`p-2 bg-gray-500 flex justify-between items-center rounded-md`}
                    key={item.id}
                  >
                    <p className="font-bold">{item.name}</p>

                    <button
                      className="bg-[#6D23F8] p-2 rounded-md cursor-pointer"
                      onClick={() => handleDeleteSubProcess(item.id)}
                    >
                      Remover
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
                onClick={() => setInfoModalProcess(null)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/4  h-1/2">
          <div className="bg-white p-6 rounded-lg shadow-lg ">
            <ToolInput
              onChange={setTools}
              inicialTools={
                infoModalProcess.tools ? JSON.parse(infoModalProcess.tools) : []
              }
            />
            <button
              className="bg-[#6D23F8] p-2 rounded-md cursor-pointer mt-4"
              onClick={handleChangeTools}
            >
              Salvar
            </button>
          </div>
        </div>
      </div>
    )
  );
}
