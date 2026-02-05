export default interface Education {
    institucion: string;
    titulo: string;
    ubicacion?: string;
    fechaInicio: string; // Formato MM-AAAA
    fechaFin?: string;   // Formato MM-AAAA o "Presente"
    descripcion?: string;
}