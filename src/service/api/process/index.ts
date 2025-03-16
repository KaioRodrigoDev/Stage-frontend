import API_SERVICE from "..";

export const postNewProcess = async (
  areaName: string,
  areaDescription: string,
  documentation: string
) => {
  try {
    const response = await API_SERVICE.post("/processes", {
      name: areaName,
      description: areaDescription,
      // tool:
      documentation: documentation,
    });

    return response.data;
  } catch (error) {
    console.error("Error posting new area:", error);
    throw error;
  }
};

export const removeProcess = async (processId: number) => {
  try {
    const response = await API_SERVICE.delete("/processes", {
      params: {
        processId: processId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error removing area:", error);
    throw error;
  }
};

export const postProcessTools = async (processId: number, tools: string) => {
  try {
    const response = await API_SERVICE.post("/processes-tools", {
      processId: processId,
      tools: tools,
    });

    return response.data;
  } catch (error) {
    console.error("Error attraching processes to area:", error);
    throw error;
  }
};

export const postNewSubProcess = async (
  processId: number,
  subProcessName: string,
  subProcessDescription: string
) => {
  try {
    const response = await API_SERVICE.post("/sub-process", {
      processId: processId,
      name: subProcessName,
      description: subProcessDescription,
    });

    return response.data;
  } catch (error) {
    console.error("Error attraching processes to area:", error);
    throw error;
  }
};

export const deleteSubProcess = async (subProcessId: number) => {
  try {
    const response = await API_SERVICE.delete("/sub-process", {
      params: {
        subProcessId: subProcessId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error attraching processes to area:", error);
    throw error;
  }
};
