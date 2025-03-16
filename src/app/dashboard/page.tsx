"use client";
import AreaComponent from "@/components/areas";
import DashboardComponent from "@/components/dashboard";
import ProcessosComponent from "@/components/processos";
import Image from "next/image";
import React, { useState } from "react";

export default function Dashboard() {
  const [selectedTab, setSelectedTab] = useState("dashboard");

  const renderContent = () => {
    switch (selectedTab) {
      case "dashboard":
        return <DashboardComponent />;
      case "areas":
        return <AreaComponent />;
      case "processos":
        return <ProcessosComponent />;
      default:
        return <div>Selecione uma aba</div>;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="bg-[#F6EEFF] w-full h-12 px-4 py-6 items-center flex">
        <Image
          src="/logo/ParsialVector.svg"
          alt="Background"
          height={30}
          width={30}
        />
      </div>

      <div className="flex flex-1 space-x-12 px-12 my-12 overflow-hidden">
        {/* Menu lateral */}
        <div className="w-1/5 h-full bg-[#F6EEFF] rounded-2xl overflow-hidden">
          <div className="mt-12 px-4 space-y-12">
            <div
              className="flex cursor-pointer"
              onClick={() => setSelectedTab("dashboard")}
            >
              <Image
                src="/dashboard/dashboard.svg"
                alt="Background"
                height={20}
                width={20}
              />
              <p className="ml-4 text-purple-600 font-semibold text-xl">
                Dashboard
              </p>
            </div>

            <div
              className="flex cursor-pointer"
              onClick={() => setSelectedTab("areas")}
            >
              <Image
                src="/dashboard/area.svg"
                alt="Background"
                height={20}
                width={20}
              />
              <p className="ml-4 text-purple-600 font-semibold text-xl">
                Áreas
              </p>
            </div>

            <div
              className="flex cursor-pointer"
              onClick={() => setSelectedTab("processos")}
            >
              <Image
                src="/dashboard/processos.svg"
                alt="Background"
                height={20}
                width={20}
              />
              <p className="ml-4 text-purple-600 font-semibold text-xl">
                Processos
              </p>
            </div>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex-1 bg-[#F6EEFF] rounded-2xl p-6 overflow-auto border border-gray-200">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
