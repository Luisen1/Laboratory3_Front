import React, { useState } from 'react'; // Importa React y el hook useState para manejar estados en el componente.

function App() {
  const projectId = 'tokyo-house-454522-g7'; // Valor fijo del ID del proyecto, no modificable por el usuario.
  const [replicaName, setReplicaName] = useState('database-replica-010'); // Estado para almacenar el nombre de la réplica.
  const [response, setResponse] = useState<any>(null); // Estado para almacenar la respuesta del backend.
  const [loading, setLoading] = useState(false); // Estado para manejar el estado de carga (loading).
  const [error, setError] = useState(''); // Estado para manejar mensajes de error.

  // Función para verificar la réplica en el backend.
  const checkReplica = async () => {
    setLoading(true); // Activa el estado de carga.
    setError(''); // Limpia cualquier mensaje de error previo.
    try {
      // Realiza una solicitud POST al backend con el projectId y replicaName.
      const res = await fetch('http://localhost:3000/api/replicas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Define el tipo de contenido como JSON.
        body: JSON.stringify({ projectId, replicaName }), // Envía los datos en el cuerpo de la solicitud.
      });
      const data = await res.json(); // Convierte la respuesta en JSON.
      setResponse(data); // Almacena la respuesta en el estado.
    } catch (err) {
      setError('Hubo un error al conectar con el backend'); // Maneja errores de conexión.
      console.error(err); // Muestra el error en la consola.
    } finally {
      setLoading(false); // Desactiva el estado de carga.
    }
  };

  // Función placeholder para crear una nueva réplica (aún no implementada).
  const createReplica = () => {
    console.log('Crear nueva instancia (placeholder)'); // Muestra un mensaje en la consola.
    alert('Crear nueva instancia (placeholder)'); // Muestra una alerta al usuario.
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}> {/* Contenedor principal con estilos en línea. */}
      <h1>Verificador de Réplicas</h1> {/* Título principal de la aplicación. */}

      <div style={{ marginBottom: 10 }}> {/* Contenedor para el campo de Project ID. */}
        <label>Project ID: </label> {/* Etiqueta para el campo de Project ID. */}
        <input type="text" value={projectId} disabled /> {/* Campo de entrada deshabilitado con el valor fijo de projectId. */}
      </div>

      <div style={{ marginBottom: 10 }}> {/* Contenedor para el campo de Replica Name. */}
        <label>Replica Name: </label> {/* Etiqueta para el campo de Replica Name. */}
        <input
          type="text"
          value={replicaName} // Muestra el valor actual de replicaName.
          onChange={(e) => setReplicaName(e.target.value)} // Actualiza el estado replicaName al cambiar el valor.
        />
      </div>

      <button onClick={checkReplica} disabled={loading}> {/* Botón para verificar la réplica. */}
        {loading ? 'Verificando...' : 'Verificar réplica'} {/* Cambia el texto según el estado de carga. */}
      </button>

      <button onClick={createReplica} style={{ marginLeft: 10 }}> {/* Botón para crear una nueva réplica. */}
        Crear nueva instancia
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Muestra un mensaje de error si existe. */}

      {response && ( // Muestra la respuesta del backend si está disponible.
        <div style={{ marginTop: 20 }}> {/* Contenedor para la respuesta del backend. */}
          <h3>Respuesta del backend:</h3> {/* Título para la respuesta. */}
          <pre>{JSON.stringify(response, null, 2)}</pre> {/* Muestra la respuesta en formato JSON con formato legible. */}
        </div>
      )}
    </div>
  );
}

export default App; // Exporta el componente App para que pueda ser usado en otros archivos.