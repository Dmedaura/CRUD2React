export interface ITareas {
    id: number;
    nombre: string;
    prioridad: 'baja' | 'media' | 'alta';
    finalizada: boolean;
  }