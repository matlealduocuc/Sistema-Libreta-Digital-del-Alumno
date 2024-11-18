import { useNavigate, useParams } from "react-router-dom";

const RevisarVacunaMenor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const menor = {
    nombre: "Antonella Ossio Soto",
    nivel: "Sala Cuna Mayor",
    vacuna: "Influenza 11.11.2024",
    apoderado: "Lisette Soto Pedraza",
    estado: "VACUNA NO AUTORIZADA",
  };

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col mt-9 w-full sm:px-32 md:px-40 lg:px-48 xl:px-56">
      <main className="flex-1 p-4">
        <div className="text-center space-y-6">
          <h2 className="text-xl font-bold mb-4">Estado de Autorización</h2>
          <p className="mb-4">
            En el recuadro se indica el nombre del menor,
            <br />
            la <strong>Vacuna Pendiente</strong>
            <br />y su <strong>Estado de Autorización</strong>.
          </p>
          <div className="border border-gray-300 rounded-lg p-4 mb-4 bg-white">
            <p>
              <strong>Menor:</strong> {menor.nombre}
            </p>
            <p>
              <strong>Nivel:</strong> {menor.nivel}
            </p>
            <p>
              <strong>Vacuna:</strong> {menor.vacuna}
            </p>
            <p>
              <strong>Apoderado:</strong> {menor.apoderado}
            </p>
            <p className="font-bold text-red-600">
              <strong>Estado:</strong> {menor.estado}
            </p>
          </div>
          <button
            onClick={handleClick}
            className="w-full bg-figma-blue-button text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-300 p-4 flex justify-around">
        <button className="text-blue-600">Inicio</button>
        <button className="text-blue-600">Avisos</button>
        <button className="text-blue-600">Mensaje</button>
        <button className="text-blue-600">Info</button>
      </footer>
    </div>
  );
};

export default RevisarVacunaMenor;
