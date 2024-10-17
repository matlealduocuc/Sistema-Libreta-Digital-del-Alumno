import { useState } from "react";
import { Modal, Input } from "antd";
import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";
import { useNavigate } from "react-router-dom";

const PerfilUsuario = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storedUser = localStorage.getItem("AUTH_USER");
  const usuario: AuthorizedUserDto = storedUser ? JSON.parse(storedUser) : null;
  if (!usuario || !storedUser) {
    navigate("/login");
  }
  const persona = usuario.persona;
  const nombreCompletoLista = [];
  nombreCompletoLista.push(persona.primerNombre);
  if (persona.segundoNombre && persona.segundoNombre !== "") {
    nombreCompletoLista.push(persona.segundoNombre);
  }
  nombreCompletoLista.push(persona.apellidoP);

  if (persona.apellidoM && persona.apellidoM !== "") {
    nombreCompletoLista.push(persona.apellidoM);
  }

  const [user, setUser] = useState({
    name: nombreCompletoLista.join(" "),
    email: "mat.leal@example.com",
    phone: "+56 9 1234 5678",
    address: "Av. Siempre Viva 123, Santiago, Chile",
    rut: persona.run + "-" + persona.dv,
  });

  const [editData, setEditData] = useState(user); // Estado temporal para la edición

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setUser(editData); // Guardar los cambios
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setEditData(user); // Resetear los cambios si se cancela
    setIsModalOpen(false);
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("AUTH_USER");
    navigate("/login");
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-gray-300 rounded-full h-24 w-24 flex items-center justify-center">
          <span className="text-4xl font-bold text-gray-600">
            {user.name.charAt(0)} {/* Muestra la primera letra del nombre */}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Rut del usuario */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Rut</h2>
          <p className="text-gray-700">{user.rut}</p>
        </div>

        {/* Nombre del usuario */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Nombre</h2>
          <p className="text-gray-700">{user.name}</p>
        </div>

        {/* Email */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Correo Electrónico</h2>
          <p className="text-gray-700">{user.email}</p>
        </div>

        {/* Teléfono */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Teléfono</h2>
          <p className="text-gray-700">{user.phone}</p>
        </div>

        {/* Dirección */}
        <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <h2 className="font-semibold text-lg">Dirección</h2>
          <p className="text-gray-700">{user.address}</p>
        </div>
      </div>

      <div className="mt-6 text-center">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition"
          onClick={showModal}
        >
          Editar Perfil
        </button>
      </div>

      <div className="mt-6 text-center">
        <button
          className="bg-red-600 text-white py-2 px-6 rounded-full hover:bg-red-700 transition"
          onClick={handleCerrarSesion}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Modal de edición */}
      <Modal
        title="Editar Perfil"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Guardar"
        cancelText="Cancelar"
      >
        <div className="space-y-4">
          <div>
            <label className="block mb-1">Nombre</label>
            <Input
              name="name"
              value={editData.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-1">Correo Electrónico</label>
            <Input
              name="email"
              value={editData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-1">Teléfono</label>
            <Input
              name="phone"
              value={editData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label className="block mb-1">Dirección</label>
            <Input
              name="address"
              value={editData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PerfilUsuario;
