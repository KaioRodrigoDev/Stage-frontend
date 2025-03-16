import { ProcessesProps } from "./processes";

export interface AreasItem {
  id: number;
  name: string;
  description: string;
  processes: ProcessesProps[];
}

export interface ModalNewAreaProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  getAreas: () => Promise<void>;
}

export interface ModalAttrachProcessProps {
  infoModalArea: AreasItem | null;
  setInfoModalArea: (item: null) => void;
  getAreas: () => Promise<void>;
}

export interface postNewAreaProps {
  message: string;
  area: AreasItem;
}
