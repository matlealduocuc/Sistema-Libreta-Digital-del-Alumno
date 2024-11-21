import { useRef, useState } from "react";
import VacunaSvg from "../../../../assets/vacuna.svg";
import PaseoVisitaSvg from "../../../../assets/paseos-y-visitas.svg";
import ReunionApoderadosSvg from "../../../../assets/reunion-apoderados.svg";
import ActividadesDiariasSvf from "../../../../assets/actividades-diarias.svg";
import { useNavigate } from "react-router-dom";

const EducadorAvisosHome = () => {
  const initPathName: string = "/educador";
  const slides = [
    {
      title: "Vacunas",
      heading: "¡Autoriza y Protege!",
      description: `Aquí podrás conocer novedades acerca
      <br />
      de las próximas <strong>Vacunas</strong> y <strong>Recomendaciones</strong>
      <br />
      de la autoridad sanitaria.
      <br />
      <br />
      Haz click en <strong>"Continuar"</strong>
      <br />para ver el detalle y el Estado de Autorización.`,
      buttonText: "Solicitar",
      href: initPathName + "/avisos/vacunas/avisar-niveles-menores",
      isSecondButton: true,
      secondButtonText: "Revisar",
      secondButtonHref:
        initPathName + "/avisos/vacunas/revisar-niveles-menores",
      imgSrc: VacunaSvg,
    },
    {
      title: "Paseos y Visitas",
      heading: "¡Aprender Divertido!",
      description: `En esta sección encontrarás información
      <br />
      sobre los <strong>Paseos y Visitas</strong>.
      <br />
      <br />
      Haz clic en <strong>“Continuar”</strong>
      <br />
      para <strong>Revisar y Autorizar</strong>.`,
      buttonText: "Continuar",
      href: initPathName + "/avisos/paseos-visitas/listado-menores",
      isSecondButton: false,
      secondButtonText: "",
      secondButtonHref: "",
      imgSrc: PaseoVisitaSvg,
    },
    {
      title: "Reuniones de Apoderados",
      heading: "¡Participar es Clave!",
      description: `Descubre las fechas y temas
      <br />
      de las <strong>Próximas Reuniones</strong>
      <br />
      y Confirmar tu Asistencia.
      <br />
      <br />
      Haz clic en <strong>“Continuar”</strong>
      <br />para revisar.`,
      buttonText: "Continuar",
      href: initPathName + "/avisos/reuniones-apoderados/listado-menores",
      isSecondButton: false,
      secondButtonText: "",
      secondButtonHref: "",
      imgSrc: ReunionApoderadosSvg,
    },
    {
      title: "Itinerario de Jornada",
      heading: "¡Actividades Diarias!",
      description: `Conoce las <strong>Experiencias Educativas</strong>
        <br />
        y mantente al tanto de su evolución.
        <br />
        <br />
        Haz clic en <strong>“Continuar”</strong>
        <br />
        para ver las Actividades Diarias
        <br />
        y <strong>Confirmar tu Conocimiento</strong>.`,
      buttonText: "Continuar",
      href: initPathName + "/avisos/itinerario-jornada/listado-menores",
      isSecondButton: false,
      secondButtonText: "",
      secondButtonHref: "",
      imgSrc: ActividadesDiariasSvf,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const [translate, setTranslate] = useState(0);
  const navigate = useNavigate();

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragStart = (e: any) => {
    setIsDragging(true);
    startX.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrag = (e: any) => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = currentX - startX.current;

    setTranslate(delta);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDragEnd = (e: any) => {
    if (!isDragging) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = endX - startX.current;

    if (delta > 50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1
      );
    } else if (delta < -50) {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }

    setIsDragging(false);
    setTranslate(0);
  };

  return (
    <div
      className="flex flex-col items-center bg-white"
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDrag}
      onTouchEnd={handleDragEnd}
    >
      {/* Header */}
      <div className="fixed top-[24px] w-full py-3 flex items-center justify-between px-4 bg-figma-green text-white">
        <button onClick={goToPreviousSlide} className="font-bold text-2xl">
          {`<`}
        </button>
        <h1 className="text-xl font-bold">{slides[currentIndex].title}</h1>
        <button onClick={goToNextSlide} className="font-bold text-2xl">
          {`>`}
        </button>
      </div>

      {/* Slides Container */}
      <div className="relative w-full h-[66vh] overflow-hidden mt-24">
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(calc(-${
              currentIndex * 100
            }% + ${translate}px))`,
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full flex flex-col items-center justify-center px-6 text-center"
              style={{ minWidth: "100%" }}
            >
              <h2 className="text-xl font-bold text-blue-600 mb-4">
                {slide.heading}
              </h2>
              <p
                className="text-gray-700"
                dangerouslySetInnerHTML={{ __html: slide.description }}
              ></p>

              <div className="my-6 w-auto max-w-xs">
                <img
                  style={{ objectFit: "contain" }}
                  src={slide.imgSrc}
                  alt={slide.title}
                  className="w-full h-56 rounded-md"
                />
              </div>

              <div className="fixed -bottom-20 w-full flex flex-col justify-center">
                <div className="flex flex-row justify-center">
                  <button
                    className="bg-figma-blue-button text-white w-80 text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
                    onClick={() => {
                      navigate(slide.href);
                    }}
                  >
                    {slide.buttonText}
                  </button>
                </div>

                {slide.isSecondButton && (
                  <div className="flex flex-row justify-center mt-2">
                    <button
                      className="bg-figma-light-blue-button text-white w-80 text-lg font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700"
                      onClick={() => {
                        navigate(slide.secondButtonHref);
                      }}
                    >
                      {slide.secondButtonText}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center space-x-4 mb-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-5 h-5 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EducadorAvisosHome;
