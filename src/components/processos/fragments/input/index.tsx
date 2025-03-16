"use client";
import { useState } from "react";

export default function ToolInput({ onChange, inicialTools }) {
  const [tool, setTool] = useState("");
  const [tools, setTools] = useState<string[]>(inicialTools);

  const handleAddTool = () => {
    if (tool.trim() && !tools.includes(tool)) {
      const updatedTools = [...tools, tool.trim()];
      setTools(updatedTools);
      onChange(updatedTools); // Atualiza o estado no componente pai
      setTool(""); // Limpa o input
    }
  };

  const handleRemoveTool = (index) => {
    const updatedTools = tools.filter((_, i) => i !== index);
    setTools(updatedTools);
    onChange(updatedTools);
  };

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Adicionar ferramenta"
          value={tool}
          onChange={(e) => setTool(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTool()}
          className="w-full p-2 border border-gray-300 rounded text-gray-600"
        />
        <button
          type="button"
          onClick={handleAddTool}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Adicionar
        </button>
      </div>

      {/* Lista de ferramentas */}
      <div className="flex flex-wrap gap-2 mt-2">
        {tools.map((item, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded flex items-center gap-2"
          >
            {item}
            <button
              type="button"
              onClick={() => handleRemoveTool(index)}
              className="text-red-500"
            >
              ✖
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
