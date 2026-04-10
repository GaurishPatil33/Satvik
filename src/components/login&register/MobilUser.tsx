import React, { useState } from 'react'
import InputField from './Inputfield'

interface MobLogin {
    mobNum: string
    otp: string
}

interface MobilUserProps {
    close: () => void
}

const MobilUser = ({ close }: MobilUserProps) => {

    const [form, setForm] = useState<MobLogin>({
        mobNum: "",
        otp: "",
    });

    return (
        <div className="fixed inset-0 z-[999] flex items-center justify-center">

            {/* BACKDROP */}
            <div
                onClick={close}
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* MAIN */}
            <div className="relative w-[900px] h-screen md:h-fit max-w-[95%] pt-4 py-2 md:py-0 bg-white rounded-2xl overflow-hidden shadow-2xl flex">
                
                <button
                    onClick={close}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 z-10"
                >
                    ✕
                </button>

                <div className="flex items-center justify-center w-full">
                    <InputField
                        label=""
                        icon="+91"
                        placeholder="Enter your Mobile No"
                        value={form.mobNum}
                        onChange={(e) =>
                            setForm((prev) => ({
                                ...prev,
                                mobNum: e.target.value
                            }))
                        }
                    />
                </div>

            </div>
        </div>
    )
}

export default MobilUser