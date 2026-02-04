import Header from "../components/Header";

export default function Home(){
    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center">
                <h2 className="text-2xl font-semibold text-gray-700">Crea un CV profesional con formato Harvard</h2>
            </div>
        </div>
    )
}