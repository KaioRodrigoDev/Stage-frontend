import API_SERVICE from "@/service/api";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

interface DashboardData {
  area: number;
  process: number;
}

export default function DashboardComponent() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGetAllArea = useCallback(async () => {
    try {
      setLoading(true);
      const response = await API_SERVICE("/dashboard");

      setDashboard(response.data);
    } catch (erro) {
      console.log(erro);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetAllArea();
  }, [handleGetAllArea]);

  return (
    <div>
      <h1 className="font-bold text-xl text-gray-600">Dashboard</h1>
      {!loading ? (
        <div className="flex space-x-8">
          <div className="border-2 text-black border-[#CCCCCC] rounded-md w-1/3 h-52 flex flex-col justify-between">
            <div className="px-4 py-2">
              <h1>
                Áreas:{" "}
                <span className="text-xl font-bold text-[#6D23F8]">
                  {dashboard?.area}
                </span>
              </h1>
            </div>

            <Image
              src="/dashboard/graph.svg"
              alt="Gráfico"
              height={200}
              width={200}
              className="w-full object-cover"
            />
          </div>
          <div className="border-2 text-black border-[#CCCCCC] rounded-md w-1/3 h-52 flex flex-col justify-between">
            <div className="px-4 py-2">
              <h1>
                Processos:{" "}
                <span className="text-xl font-bold text-[#6D23F8]">
                  {dashboard?.process}
                </span>
              </h1>
            </div>

            <Image
              src="/dashboard/graph.svg"
              alt="Gráfico"
              height={200}
              width={200}
              className="w-full object-cover"
            />
          </div>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}
