import { BellOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface LibretaHeaderProps {
  title: string;
  bgColorClass?: string;
  textColorClass?: string;
}

const LibretaHeader: React.FC<LibretaHeaderProps> = ({
  title,
  bgColorClass = "black",
  textColorClass = "white",
}) => {
  const navigate = useNavigate();

  return (
    <header>
      <p className="text-md flex justify-center items-center">
        Libreta Digital Del Alumno
      </p>
      <div
        className={`fixed top-7 left-0 w-full z-10 bg-${bgColorClass} text-${textColorClass} p-4 flex justify-between items-center`}
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
