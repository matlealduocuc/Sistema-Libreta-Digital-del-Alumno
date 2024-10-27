import React, { useEffect, useState } from "react";
import { Modal, Input, message, Spin } from "antd";
import { AuthorizedUserDto } from "@/dtos/Auth/AuthorizedUserDto";
import { useNavigate } from "react-router-dom";
import { ObtenerNombreCompletoJoined } from "@/common/FuncionesComunesUsuario";
import { useAuth } from "@/hooks/useAuth";
import { PerfilController } from "@/controllers/PerfilController";
import { updatePerfilSchema } from "@/types/PerfilSchema";

const PerfilUsuario = () => {
  const { data, isLoading } = useAuth();
  const [loadingModal, setLoadingModal] = React.useState<boolean>(false);
  const [loadingFull, setLoadingFull] = React.useState<boolean>(true);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storedUser = localStorage.getItem("AUTH_USER");
  const usuario: AuthorizedUserDto = storedUser ? JSON.parse(storedUser) : null;
  const persona = usuario?.persona;
  const idPersona = persona?.idPersona;
  const perfilController = new PerfilController();

  const [user, setUser] = useState({
    name: "" as string | null,
    email: "" as string | null,
    phone: "" as string | null,
    address: "" as string | null,
    rut: "" as string | null,
  });

  const [editData, setEditData] = useState(user); // Estado temporal para la edición

  useEffect(() => {
    setLoadingFull(true);
    const fetchPerfil = async () => {
      if (idPersona) {
        try {
          const perfil = await perfilController.getPerfil(idPersona);
          const nombreCompleto = ObtenerNombreCompletoJoined(perfil);
          setUser({
            name: nombreCompleto,
            email: perfil.email ?? "",
            phone: perfil.telefono ?? "",
            address: perfil.direccion ?? "",
            rut: perfil.run + "-" + perfil.dv,
          });
          setEditData({
            name: nombreCompleto,
            email: perfil.email ?? "",
            phone: perfil.telefono ?? "",
            address: perfil.direccion ?? "",
            rut: perfil.run + "-" + perfil.dv,
          });
          setLoadingFull(false);
        } catch (error) {
          setLoadingFull(false);
          console.error("Error fetching perfil:", error);
        }
      }
    };

    fetchPerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idPersona]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setLoadingModal(true);
    console.log("editData", editData);
    console.log("user", user);
    const dataToSend = {
      email: editData.email ?? "",
      phone: editData.phone ?? "",
      address: editData.address ?? "",
    };
    const validatedData = updatePerfilSchema.parse(dataToSend);
    console.log("validatedData", validatedData);
    try {
      await perfilController.updatePerfil(idPersona!, validatedData);

      setUser({
        ...user,
        ...validatedData, // Actualizar la información visible sin tocar RUT o nombre
      });
      message.success("Perfil actualizado exitosamente");
      setIsModalOpen(false);
    } finally {
      setLoadingModal(false);
    }
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
    <Spin spinning={loadingFull}>
      <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-gray-300 rounded-full h-24 w-24 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-600">
              {user.name?.charAt(0) ?? "?"}{" "}
              {/* Muestra la primera letra del nombre */}
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

        {!isLoading && (data && data.rol.includes("admin")) && (
          <div className="mt-6">
            <hr />
            <div className="flex justify-center mt-6">
              <span>- Zona de Admin -</span>
            </div>
            <div className="mt-6 text-center">
              <button
                className="bg-white text-black border-2 border-gray-700 py-2 px-6 rounded-full hover:bg-gray-400 transition"
                onClick={() => navigate("/")}
              >
                Ir a sitio de administración
              </button>
            </div>
          </div>
        )}

        {/* Modal de edición */}
        <Modal
          title="Editar Perfil"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Guardar"
          okButtonProps={{ loading: loadingModal }}
          cancelText="Cancelar"
          cancelButtonProps={{ disabled: loadingModal }}
        >
          <Spin spinning={loadingModal}>
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Correo Electrónico</label>
                <Input
                  name="email"
                  value={editData.email || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1">Teléfono</label>
                <Input
                  name="phone"
                  value={editData.phone || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block mb-1">Dirección</label>
                <Input
                  name="address"
                  value={editData.address || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </Spin>
        </Modal>
      </div>
    </Spin>
  );
};

export default PerfilUsuario;
