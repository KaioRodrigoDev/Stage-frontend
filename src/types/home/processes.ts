export interface ProcessesProps {
  id: number;
  name: string;
  description: string;
  documentation: string;
  tools: string;
}

export interface ProcessesWithSubProcessProps {
  id: number;
  name: string;
  description: string;
  documentation: string;
  tools: string;
  subprocesses: SubProcessesProps[];
}

export interface SubProcessesProps {
  id: number;
  process_id: number;
  name: string;
  description: string;
}

export interface ModalNewProcessProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  getProcess: () => Promise<void>;
}

export interface ModalEditProcessProps {
  infoModalProcess: ProcessesWithSubProcessProps | null;
  setInfoModalProcess: (item: null) => void;
  getAreas: () => Promise<void>;
}

export interface ModalCreateSubProcessProps {
  infoModalProcess: ProcessesWithSubProcessProps | null;
  setInfoModalProcess: (item: null) => void;
  getProcess: () => Promise<void>;
}
