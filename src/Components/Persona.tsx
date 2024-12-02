import React, { FC } from 'react'
import { IPersona } from '../types/IPersona'

const Persona:FC <IPersona> = ({nombre,id,apellido}) => {
    return (
        <div style={styles.card}>
          <h3 style ={styles.title}>Información de la Persona</h3>
          <p><strong>ID:</strong> {id}</p>
          <p><strong>Nombre:</strong> {nombre}</p>
          <p><strong>Apellido:</strong> {apellido}</p>
        </div>
      );
    };
    
    const styles = {
      card: {
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        margin: '20px auto',
      },
      title: {
        textAlign: 'center',
        fontSize: '20px',
        marginBottom: '10px',
      },
    };

export default Persona