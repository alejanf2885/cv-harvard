import { useState } from "react"
import type { PersonalInfo } from "../../types/PersonalInfo"

export default function PersonalForm() {

    const [personalInfo, setPersonalInfo] = useState<PersonalInfo>()


    return (
        <div className="">
            <p>Formulario Personal</p>
        </div>
    )
}