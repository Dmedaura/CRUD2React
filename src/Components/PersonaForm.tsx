import { ChangeEvent, useState } from "react";
import { POST } from "../services/Peticiones";
import { IPersona } from "../types/IPersona";

const PersonaForm = () => {

    const [values, setValues] = useState<IPersona>({ apellido: "", id: "", nombre: "" })

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {

        const { name, value } = e.target;

        setValues(prevValues => ({
            ...prevValues,
            [name]: value,
        }));

    };

    const handleSubmit = async () => {
        const res = await POST('http://localhost:3000/persona', values);
        console.log(res)
    }

    return (
        <div>
            <input type="text" onChange={handleChange} name='nombre' />
            <input type="text" onChange={handleChange} name='apellido' />
            <button onClick={handleSubmit}>CREAR PERSONA</button>
        </div>
    )
}

export default PersonaForm