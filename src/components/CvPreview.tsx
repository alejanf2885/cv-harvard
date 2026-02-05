import { useEffect, useRef, useState } from "react";
import type { PersonalInfo } from "../types/PersonalInfo";
import type { Experience, Education, Skill, Certification } from "../types/CvData";
import { useDebounce } from "../hooks/useDebounce";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Check, Download, RotateCcw } from "lucide-react";

interface CvPreviewProps {
  personalInfo: PersonalInfo;
  experiencias?: Experience[];
  educaciones?: Education[];
  habilidadesTecnicas?: Skill[];
  idiomas?: Skill[];
  certificaciones?: Certification[];
}

export default function CvPreview({ 
  personalInfo,
  experiencias = [],
  educaciones = [],
  habilidadesTecnicas = [],
  idiomas = [],
  certificaciones = []
}: CvPreviewProps) {
  const cvRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Usar debounce para actualizar el PDF después de que el usuario deje de escribir
  const debouncedPersonalInfo = useDebounce(personalInfo, 1500);
  const debouncedExperiencias = useDebounce(experiencias, 1500);
  const debouncedEducaciones = useDebounce(educaciones, 1500);
  const debouncedHabilidades = useDebounce(habilidadesTecnicas, 1500);
  const debouncedIdiomas = useDebounce(idiomas, 1500);
  const debouncedCertificaciones = useDebounce(certificaciones, 1500);

  const generatePDF = async () => {
    if (!cvRef.current) return;

    setIsGenerating(true);
    try {
      // Esperar un momento para que el DOM se actualice
      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(cvRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        width: cvRef.current.scrollWidth,
        height: cvRef.current.scrollHeight,
        windowWidth: cvRef.current.scrollWidth,
        windowHeight: cvRef.current.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        format: "a4",
        unit: "mm",
        orientation: "portrait",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // Margen de 10mm
      const contentWidth = pdfWidth - (margin * 2);
      const contentHeight = pdfHeight - (margin * 2);
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = contentWidth / imgWidth;
      const imgScaledWidth = imgWidth * ratio;
      const imgScaledHeight = imgHeight * ratio;

      // Agregar la imagen completa
      // Si es más alta que una página, jsPDF la cortará automáticamente
      pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin,
        imgScaledWidth,
        imgScaledHeight,
        undefined,
        "FAST"
      );

      // Si el contenido es más alto que una página, agregar páginas adicionales
      let heightLeft = imgScaledHeight - contentHeight;
      let yOffset = -contentHeight;

      while (heightLeft > 0) {
        pdf.addPage();
        pdf.addImage(
          imgData,
          "PNG",
          margin,
          yOffset,
          imgScaledWidth,
          imgScaledHeight,
          undefined,
          "FAST"
        );
        heightLeft -= contentHeight;
        yOffset -= contentHeight;
      }
      
      // Guardar el PDF en el estado para descarga
      const pdfBlob = pdf.output("blob");
      const url = URL.createObjectURL(pdfBlob);
      
      // Limpiar URL anterior si existe
      if ((window as any).__currentPdfUrl) {
        URL.revokeObjectURL((window as any).__currentPdfUrl);
      }
      
      // Almacenar la nueva URL para descarga
      (window as any).__currentPdfUrl = url;
    } catch (error) {
      console.error("Error generando PDF:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadPDF = async () => {
    await generatePDF();
    
    // Esperar un momento para que se genere el PDF
    setTimeout(() => {
      const url = (window as any).__currentPdfUrl;
      if (url) {
        const link = document.createElement("a");
        link.href = url;
        link.download = `CV_${personalInfo.nombreCompleto || "Curriculum"}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 500);
  };

  // Actualizar PDF automáticamente cuando cambie la información (con debounce)
  useEffect(() => {
    generatePDF();
  }, [debouncedPersonalInfo, debouncedExperiencias, debouncedEducaciones, debouncedHabilidades, debouncedIdiomas, debouncedCertificaciones]);

  return (
    <div className="flex flex-col h-full">
      {/* Botón de descarga */}
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {isGenerating ? <RotateCcw size={16} className="inline-block mr-2 animate-spin" /> : <><Check size={16} className="inline-block mr-2" /> PDF actualizado</>}
        </div>
        <button
          onClick={downloadPDF}
          disabled={isGenerating}
          className="flex items-center gap-2 cursor-pointer px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Download size={16} />
          <span className="text-sm">Descargar PDF</span>
        </button>
      </div>

      {/* Vista previa del CV en formato Harvard */}
      <div className="flex-1 overflow-auto bg-white p-8 shadow-lg rounded-lg">
        <div
          ref={cvRef}
          className="cv-harvard bg-white text-black"
          style={{
            fontFamily: "Times New Roman, serif",
            fontSize: "11pt",
            lineHeight: "1.5",
            padding: "5mm",
            width: "220mm", 
            margin: "0 auto",
            color: "#000000",
          }}
        >
          {/* Encabezado - Formato exacto del PDF */}
          <div className="text-center mb-6" style={{ marginBottom: "16px" }}>
            <h1
              className="font-bold mb-2 uppercase"
              style={{ 
                fontFamily: "Times New Roman, serif",
                fontSize: "18pt",
                fontWeight: "bold",
                marginBottom: "8px"
              }}
            >
              {personalInfo.nombreCompleto || "Nombre Completo"}
            </h1>
            {personalInfo.tituloProfesional && (
              <p
                className="mb-3"
                style={{ 
                  fontFamily: "Times New Roman, serif",
                  fontSize: "11pt",
                  marginBottom: "12px"
                }}
              >
                {personalInfo.tituloProfesional}
              </p>
            )}
            <div 
              className="text-sm"
              style={{ 
                fontFamily: "Times New Roman, serif",
                fontSize: "11pt"
              }}
            >
              {[
                personalInfo.correo,
                personalInfo.telefono,
                personalInfo.ubicacion,
                personalInfo.linkedin,
                personalInfo.github,
                personalInfo.sitioWeb
              ].filter(Boolean).join(" • ")}
            </div>
          </div>

          {/* RESUMEN */}
          {personalInfo.resumenProfesional && (
            <div className="mb-6" style={{ marginBottom: "16px" }}>
              <h2
                className="font-bold mb-2"
                style={{ 
                  fontFamily: "Times New Roman, serif",
                  fontSize: "14pt",
                  fontWeight: "bold",
                  marginBottom: "8px"
                }}
              >
                 RESUMEN
              </h2>
              <hr />
              <p 
                style={{ 
                  fontFamily: "Times New Roman, serif",
                  fontSize: "11pt",
                  lineHeight: "1.5"
                }}
              >
                {personalInfo.resumenProfesional}
              </p>
            </div>
          )}

          {/* EXPERIENCIA */}
          {debouncedExperiencias.length > 0 && (
            <div className="mb-6" style={{ marginBottom: "16px" }}>
              <h2
                className="font-bold mb-3"
                style={{ 
                  fontFamily: "Times New Roman, serif",
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "12px"
                }}
              >
                EXPERIENCIA
              </h2>
              <hr className="my-2" />
              {debouncedExperiencias.map((exp, idx) => (
                <div key={exp.id || idx} className="mb-4" style={{ marginBottom: "16px" }}>
                  <div className="mb-1">
                    <span
                      className="font-bold"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontWeight: "bold"
                      }}
                    >
                      {exp.titulo}
                    </span>
                  </div>
                  <div className="mb-1">
                    <span
                      className="font-bold"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontWeight: "bold"
                      }}
                    >
                      {exp.fechaInicio} - {exp.fechaFin}
                    </span>
                    <span
                      className="italic ml-2"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontStyle: "italic"
                      }}
                    >
                      {exp.ubicacion}
                    </span>
                  </div>
                  <div className="mb-2">
                    <h3
                      className="font-bold"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontWeight: "bold",
                        marginBottom: "8px"
                      }}
                    >
                      {exp.empresa}
                    </h3>
                  </div>
                  <ul className="list-disc list-inside ml-4" style={{ marginLeft: "16px" }}>
                    {exp.logros.map((logro, logroIdx) => (
                      <li
                        key={logroIdx}
                        style={{ 
                          fontFamily: "Times New Roman, serif",
                          fontSize: "11pt",
                          lineHeight: "1.5",
                          marginBottom: "4px"
                        }}
                      >
                        {logro}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* EDUCACIÓN */}
          {debouncedEducaciones.length > 0 && (
            <div className="mb-6" style={{ marginBottom: "16px" }}>
              <h2
                className="font-bold mb-3"
                style={{ 
                  fontFamily: "Times New Roman, serif",
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "12px"
                }}
              >
                EDUCACIÓN
              </h2>
              <hr className="my-2" />
              {debouncedEducaciones.map((edu, idx) => (
                <div key={edu.id || idx} className="mb-3" style={{ marginBottom: "12px" }}>
                  <div className="mb-1">
                    <span
                      className="font-bold"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontWeight: "bold"
                      }}
                    >
                      {edu.institucion}
                    </span>
                  </div>
                  <div>
                    <span
                      className="italic"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontStyle: "italic"
                      }}
                    >
                      {edu.titulo}
                    </span>
                  </div>
                  <div>
                    <span
                      className="italic"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontStyle: "italic"
                      }}
                    >
                      {edu.fechaInicio} - {edu.fechaFin}
                    </span>
                  </div>
                  <div>
                    <span
                      className="italic"
                      style={{ 
                        fontFamily: "Times New Roman, serif",
                        fontSize: "11pt",
                        fontStyle: "italic"
                      }}
                    >
                      {edu.ubicacion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* HABILIDADES */}
          {(debouncedHabilidades.length > 0 || debouncedIdiomas.length > 0) && (
            <div className="mb-6" style={{ marginBottom: "16px" }}>
              <h2
                className="font-bold mb-3"
                style={{ 
                  fontFamily: "Times New Roman, serif",
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "12px"
                }}
              >
                HABILIDADES
              </h2>
              <hr className="my-2" />
              {debouncedHabilidades.length > 0 && (
                <div className="mb-2" style={{ marginBottom: "8px" }}>
                  <span
                    className="font-bold"
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      fontSize: "11pt",
                      fontWeight: "bold"
                    }}
                  >
                    Habilidades Técnicas:
                  </span>
                  <span
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      fontSize: "11pt"
                    }}
                  >
                    {" "}{debouncedHabilidades.map(s => s.nombre).join(", ")}
                  </span>
                </div>
              )}
              {debouncedIdiomas.length > 0 && (
                <div>
                  <span
                    className="font-bold"
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      fontSize: "11pt",
                      fontWeight: "bold"
                    }}
                  >
                    Idiomas:
                  </span>
                  <span
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      fontSize: "11pt"
                    }}
                  >
                    {" "}{debouncedIdiomas.map(s => s.nombre).join(", ")}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* CERTIFICACIONES */}
          {debouncedCertificaciones.length > 0 && (
            <div className="mb-6" style={{ marginBottom: "16px" }}>
              <h2
                className="font-bold mb-3"
                style={{ 
                  fontFamily: "Times New Roman, serif",
                  fontSize: "11pt",
                  fontWeight: "bold",
                  marginBottom: "12px"
                }}
              >
                CERTIFICACIONES
              </h2>
              <hr className="my-2" />
              {debouncedCertificaciones.map((cert, idx) => (
                <div key={cert.id || idx} className="mb-1" style={{ marginBottom: "4px" }}>
                  <span
                    style={{ 
                      fontFamily: "Times New Roman, serif",
                      fontSize: "11pt"
                    }}
                  >
                    - {cert.nombre}
                    {cert.fecha && ` - ${cert.fecha}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
