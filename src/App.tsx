import { useEffect, useState } from 'react';
import Tareas from './Components/Tareas';
import { ITareas } from './types/ITareas';

function App() {
  const [tareas, setTareas] = useState<ITareas[]>([]);
  const [nuevaTarea, setNuevaTarea] = useState({
    nombre: '',
    prioridad: '',
  });

  // Traer tareas iniciales
  const traerTareas = async () => {
    const res = await fetch('http://localhost:3000/tareas');
    const JSONres = await res.json();
    setTareas(JSONres);
  };

  useEffect(() => {
    traerTareas();
  }, []);

  // Marcar tarea como finalizada
  const toggleTarea = async (id: number) => {
    const tarea = tareas.find((t) => t.id === id);
    if (!tarea) return;

    const updatedTarea = { ...tarea, finalizada: !tarea.finalizada };

    await actualizarTarea(id, updatedTarea);
  };

  // Actualizar tarea
  const actualizarTarea = async (id: number, tareaActualizada: Partial<ITareas>) => {
    try {
      // Lógica para alternar entre las prioridades
      let nuevaPrioridad: string;
      switch (tareaActualizada.prioridad) {
        case 'baja':
          nuevaPrioridad = 'media';
          break;
        case 'media':
          nuevaPrioridad = 'alta';
          break;
        default:
          nuevaPrioridad = 'baja';
      }
  
      const tareaModificada = {
        ...tareaActualizada,
        prioridad: nuevaPrioridad,
      };
  
      // Hacer la solicitud PATCH para actualizar la tarea en el servidor
      const res = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tareaModificada),
      });
  
      if (!res.ok) throw new Error('Error al actualizar tarea');
  
      const tareaActualizadaResponse = await res.json();
  
      // Actualizar la tarea en el estado
      setTareas(
        tareas.map((tarea) => (tarea.id === id ? { ...tarea, ...tareaActualizadaResponse } : tarea))
      );
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al actualizar la tarea');
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Error al eliminar tarea');

      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al eliminar la tarea');
    }
  };

  // Agregar nueva tarea
  const agregarTarea = async () => {
    if (!nuevaTarea.nombre) return alert('Escribe un nombre para la tarea');

    const nueva = {
      nombre: nuevaTarea.nombre,
      prioridad: nuevaTarea.prioridad,
      finalizada: false,
    };

    try {
      const res = await fetch('http://localhost:3000/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nueva),
      });

      if (!res.ok) throw new Error('Error al agregar tarea');

      const tareaCreada = await res.json();
      setTareas([...tareas, tareaCreada]);
      setNuevaTarea({ nombre: '', prioridad: 'baja' }); // Limpiar el formulario
    } catch (error) {
      console.error(error);
      alert('Hubo un problema al agregar la tarea');
    }
  };

  return (
    <div className="p-4">
      {/* Formulario para agregar tareas */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Agregar Tarea</h2>
        <input
          type="text"
          value={nuevaTarea.nombre}
          onChange={(e) => setNuevaTarea({ ...nuevaTarea, nombre: e.target.value })}
          placeholder="Nombre de la tarea"
          className="border p-2 rounded w-full mb-3"
        />
        <select
          value={nuevaTarea.prioridad}
          onChange={(e) => setNuevaTarea({ ...nuevaTarea, prioridad: e.target.value })}
          className="border p-2 rounded w-full mb-3"
        >
          <option value="baja">Baja</option>
          <option value="media">Media</option>
          <option value="alta">Alta</option>
        </select>
        <button onClick={agregarTarea} className="bg-blue-500 text-white px-4 py-2 rounded">
          Agregar Tarea
        </button>
      </div>

      {/* Lista de tareas */}
      <div>
        {tareas.map((tarea) => (
          <Tareas
            key={tarea.id}
            id={tarea.id}
            nombre={tarea.nombre}
            prioridad={tarea.prioridad}
            finalizada={tarea.finalizada}
            onToggle={toggleTarea}
            onDelete={eliminarTarea}
            onUpdate={actualizarTarea}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

