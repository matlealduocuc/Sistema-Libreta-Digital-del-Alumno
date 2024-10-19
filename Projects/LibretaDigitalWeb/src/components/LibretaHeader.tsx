import { BellOutlined } from "@ant-design/icons";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface LibretaHeaderProps {
  title: string;
}

const LibretaHeader: React.FC<LibretaHeaderProps> = ({ title }) => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 w-full z-10 bg-black text-white p-4 flex justify-between items-center">
      <ArrowLeftOutlined
        className="text-xl mr-4"
        onClick={() => navigate(-1)}
      />
      <h1 className="text-xl font-bold">{title}</h1>
      <BellOutlined className="text-xl" />
    </header>
  );
};

export default LibretaHeader;
