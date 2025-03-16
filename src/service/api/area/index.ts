import { postNewAreaProps } from "@/types/home/areas";
import API_SERVICE from "..";

export const postNewArea = async (
  areaName: string,
  areaDescription: string
): Promise<postNewAreaProps> => {
  try {
    const response = await API_SERVICE.post("/area", {
      name: areaName,
      description: areaDescription,
    });

    return response.data;
  } catch (error) {
    console.error("Error posting new area:", error);
    throw error;
  }
};

export const postAttrachProcessToArea = async (
  areaId: number,
  processId: number
): Promise<postNewAreaProps> => {
  try {
    const response = await API_SERVICE.post("/assign-processes-to-area", {
      area_id: areaId,
      process_id: processId,
    });

    return response.data;
  } catch (error) {
    console.error("Error attraching processes to area:", error);
    throw error;
  }
};

export const postDettrachProcessToArea = async (
  areaId: number,
  processId: number
): Promise<postNewAreaProps> => {
  try {
    const response = await API_SERVICE.post("/unassign-processe-from-area", {
      area_id: areaId,
      process_id: processId,
    });

    return response.data;
  } catch (error) {
    console.error("Error dettraching processes from area:", error);
    throw error;
  }
};

export const removeArea = async (areaId: number): Promise<postNewAreaProps> => {
  try {
    const response = await API_SERVICE.delete("/area", {
      params: {
        area_id: areaId,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error removing area:", error);
    throw error;
  }
};
