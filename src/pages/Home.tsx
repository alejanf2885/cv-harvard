import FormCv from "../components/FormCv";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900">
      <Header />

      <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 p-6 flex-1">
        {/* Formulario */}
        <div className=" dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <FormCv />
        </div>

        {/* Vista previa */}
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg shadow-md flex items-center justify-center">
          <p className="text-gray-700 dark:text-gray-300 text-center">
            Vista previa del CV aparecerá aquí.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="grid place-items-center p-4 border-t border-gray-300 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          © 2026 Mi Aplicación. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}
