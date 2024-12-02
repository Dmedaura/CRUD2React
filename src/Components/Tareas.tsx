import React from 'react';

interface ITareas {
  id: number;
  nombre: string;
  prioridad: string;
  finalizada: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, tarea: Partial<ITareas>) => void;
}

const Tareas: React.FC<ITareas> = ({ id, nombre, prioridad, finalizada, onToggle, onDelete, onUpdate }) => {
  return (
    <div className="border p-4 mb-3 flex justify-between items-center">
      <div>
        <h3 className={`font-bold ${finalizada ? 'line-through' : ''}`}>{nombre}</h3>
        <p>Prioridad: {prioridad}</p>
        <button onClick={() => onToggle(id)} className="bg-yellow-500 text-white p-2 rounded">
          {finalizada ? 'Reactivar' : 'Finalizar'}
        </button>
      </div>
      <div>
        <button onClick={() => onDelete(id)} className="bg-red-500 text-white p-2 rounded mr-2">
          Eliminar
        </button>
        <button 
          onClick={() => onUpdate(id, { prioridad })}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Cambiar Prioridad
        </button>
      </div>
    </div>
  );
};

export default Tareas;