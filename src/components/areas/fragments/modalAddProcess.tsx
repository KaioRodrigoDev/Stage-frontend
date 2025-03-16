"use client";
import API_SERVICE from "@/service/api";
import {
  postAttrachProcessToArea,
  postDettrachProcessToArea,
} from "@/service/api/area";
import { ModalAttrachProcessProps } from "@/types/home/areas";
import { ProcessesProps } from "@/types/home/processes";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ModalAddProcess({
  infoModalArea,
  setInfoModalArea,
  getAreas,
}: ModalAttrachProcessProps) {
  const [loading, setLoading] = useState(true);
  const [process, setProcess] = useState([]);

  const handleAttrachNewArea = useCallback(
    async (processId: number) => {
      if (!infoModalArea) return;
      try {
        const response = await postAttrachProcessToArea(
          infoModalArea.id,
          processId
        );

        toast(response.message, {
          position: "bottom-left",
          type: "success",
        });
        await getAreas();
        setInfoModalArea(null);
      } catch (error) {
        console.log(error);
        toast("Error ao tentar criar area", {
          position: "bottom-left",
          type: "error",
        });
      }
    },
    [getAreas, infoModalArea, setInfoModalArea]
  );

  const handleDettrachArea = useCallback(
    async (processId: number) => {
      if (!infoModalArea) return;
      try {
        const response = await postDettrachProcessToArea(
          infoModalArea.id,
          processId
        );

        toast(response.message, {
          position: "bottom-left",
          type: "success",
        });
        await getAreas();
        setInfoModalArea(null);
      } catch (error) {
        console.log(error);
        toast("Error ao tentar desvincular processo", {
          position: "bottom-left",
          type: "error",
        });
      }
    },
    [getAreas, infoModalArea, setInfoModalArea]
  );

  const handleGetAllProcess = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API_SERVICE("/processes");

      setProcess(response.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetAllProcess();
  }, [handleGetAllProcess]);

  return (
    infoModalArea && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
          <h2 className="text-lg text-gray-600">
            Adicionar Processo a area de:
          </h2>
          <h2 className="text-[#6D23F8]  mb-4 font-bold text-xl">
            {infoModalArea.name}
          </h2>

          {!loading ? (
            <div className="space-y-2 my-4 h-80 overflow-y-auto">
              {process.map((item: ProcessesProps) => {
                const exists = infoModalArea.processes.some(
                  (processItem) => processItem.id === item.id
                );

                return (
                  <div
                    className={`p-2 bg-gray-500 flex justify-between items-center rounded-md `}
                    key={item.id}
                  >
                    <p className="font-bold">{item.name}</p>
                    {!exists ? (
                      <button
                        className="bg-[#6D23F8] p-2 rounded-md cursor-pointer"
                        onClick={() => handleAttrachNewArea(item.id)}
                      >
                        Adicionar
                      </button>
                    ) : (
                      <button
                        className="bg-[#6D23F8] p-2 rounded-md cursor-pointer"
                        onClick={() => handleDettrachArea(item.id)}
                      >
                        Remover
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <p>Carregando...</p>
          )}
          <div className="flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-gray-400 text-white rounded cursor-pointer"
              onClick={() => setInfoModalArea(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    )
  );
}
