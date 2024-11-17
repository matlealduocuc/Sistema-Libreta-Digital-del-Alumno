import { useAuth } from "@/hooks/useAuth";
import { BellOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface LibretaHeaderProps {
  title: string;
}

const LibretaHeader: React.FC<LibretaHeaderProps> = ({
  title,
}) => {
  const { data, isLoading } = useAuth();
  const navigate = useNavigate();

  let bgColorClass = "bg-black";
  let textColorClass = "text-white";
  if (!isLoading && data) {
    switch (data.rol) {
      case "apoderado":
        bgColorClass = "bg-figma-blue";
        textColorClass = "text-white";
        break;
      case "educador":
        bgColorClass = "bg-figma-green";
        textColorClass = "text-white";
        break;
      case "director":
        break;
      default:
        break;
    }
  }
  return (
    <header>
      <p className="fixed top-0 w-full z-10 text-md flex justify-center items-center">
        Libreta Digital Del Alumno
      </p>
      <div
        className={`fixed top-7 left-0 w-full z-10 ${bgColorClass} ${textColorClass} p-4 flex justify-between items-center`}
      >
        <ArrowLeftOutlined
          className="text-xl mr-4"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-xl font-bold">{title}</h1>
        <BellOutlined className="text-xl" />
      </div>
    </header>
  );
};

export default LibretaHeader;
