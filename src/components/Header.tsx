import DarkModeToggle from "./DarkModeToggle";

export default function Header() {
    return(
        <div className="flex items-center justify-between p-4 bg-gray-50 border-b border-gray-300
        dark:bg-gray-900 dark:border-gray-700">
            <div className="logo">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">My App</h1>
            </div>
            <div className="darkMode">
                <DarkModeToggle />
            </div>
        </div>
    )
}