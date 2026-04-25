"use client";

import React, { useEffect, useState } from "react";
import InputField from "./Inputfield";
import SocialBtn from "./SocialBtn";
import PasswordStrength from "./Passwordstrength";
import { CiLock, CiMail, CiMobile3, CiUser } from "react-icons/ci";
import { FaFacebook } from "react-icons/fa";
import { GrGoogle } from "react-icons/gr";
import { validateName, validateEmail, validatePhone, validatePassword } from "@/src/lib/validators";
import { useAuthModalStore } from "@/src/store/authModal.store";
import { useAuthStore } from "@/src/store/auth.store";

interface RegisterPageProps {
    onSwitch: () => void;
}

interface RegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirm: string;
    agreed: boolean;

}
interface RegisterErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirm?: string;
    agreed?: string;
    api?: string;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ onSwitch }) => {
    const [step, setStep] = useState<number>(1);

    const [form, setForm] = useState<RegisterForm>({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirm: "",
        agreed: false,
    });
    const [errors, setErrors] = useState<Partial<RegisterErrors>>({});
    const [done, setDone] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState(false);
    const { register, loading, error: authError } = useAuthStore();
    const { close } = useAuthModalStore();


    const isStep1valid =
        !validateName(form.firstName) &&
        !validateName(form.lastName) &&
        !validateEmail(form.email) &&
        !validatePhone(form.phone);

    const step2Valid = form.password && form.confirm && form.password === form.confirm && form.agreed;

    
    // step1 validate
    const validateStep1 = () => {
        const newErrors: RegisterErrors = {
            firstName: validateName(form.firstName),
            lastName: validateName(form.lastName),
            email: validateEmail(form.email),
            phone: validatePhone(form.phone),
        };

        setErrors(newErrors);

        return !Object.values(newErrors).some(Boolean);
    };




    const validateStep2 = () => {
        const newErrors: RegisterErrors = {
            password: validatePassword(form.password),
            confirm:
                form.password !== form.confirm ? "Passwords do not match" : "",
            agreed: !form.agreed ? "You must accept terms" : "",
        };

        setErrors((prev: any) => ({ ...prev, ...newErrors }));
        return !Object.values(newErrors).some(Boolean);
    };

    const handleSubmit = async () => {
        if (!validateStep2()) return;
        setSubmitted(true)

        await register({
            first_name: form.firstName,
            last_name: form.lastName,
            email: form.email,
            phone: form.phone,
            password: form.password,
        })
    };

    useEffect(() => {
        if (!submitted) return

        if (authError) {
            setErrors({ api: authError });
            setSubmitted(false)
            return;
        }

        // success = user logged in
        if (!authError && !loading) {
            setDone(true);
            setTimeout(close, 1500);
        }
    }, [authError, loading]);


    const validateField = (name: keyof RegisterForm, value: string) => {
        let message = "";

        switch (name) {
            case "firstName":
                message = validateName(value);
                break;
            case "lastName":
                message = validateName(value);
                break;
            case "email":
                message = validateEmail(value);
                break;
            case "phone":
                message = validatePhone(value);
                break;
        }

        setErrors(prev => ({ ...prev, [name]: message }));
    };

    return (
        <div className="animate-[fadeIn_0.4s_ease] md:h-fit max-h-[80%] overflow-y-auto">
            <h2 className="text-[28px] font-black text-green-900 font-playfair mb-1">
                Join Satvik
            </h2>

            <p className="text-gray-500 text-sm mb-6 font-dmSans">
                Create your account and start living naturally
            </p>

            {errors.api && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
                    {errors.api}
                </div>
            )}

            {done ? (
                <div className="text-center py-6">
                    <div className="text-6xl mb-4 animate-bounce">🎉</div>

                    <h3 className="text-xl font-extrabold text-green-900 font-playfair mb-2">
                        Account Created!
                    </h3>

                    <p className="text-gray-500 text-sm font-dmSans mb-5">
                        Welcome to the Satvik family, {form.firstName.split(" ")[0]}!
                    </p>

                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <p className="text-sm text-green-800 font-dmSans">
                            We've sent a <strong>10% off coupon</strong> to your email.
                        </p>
                    </div>

                    <button
                        onClick={onSwitch}
                        className="mt-5 px-7 py-3 rounded-xl text-white font-bold bg-gradient-to-br from-green-500 to-green-700 hover:scale-[1.02] transition"
                    >
                        Sign In Now →
                    </button>
                </div>
            ) : (
                <>
                    {/* Step indicator */}
                    <div className="flex items-center mb-7">
                        {[1, 2].map((s, i) => (
                            <React.Fragment key={s}>
                                <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold transition    ${step >= s
                                        ? "bg-green-600 text-white"
                                        : "bg-gray-200 text-gray-400"
                                        }`}
                                >
                                    {step > s ? "✓" : s}
                                </div>

                                {i === 0 && (
                                    <div
                                        className={`flex-1 h-[3px] mx-2 rounded ${step > 1 ? "bg-green-600" : "bg-gray-200"}`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <p className="text-xs text-gray-400 mb-6 -mt-4 font-dmSans">
                        Step {step} of 2 — {step === 1 ? "Personal Details" : "Set Password"}
                    </p>

                    {step === 1 && (
                        <>
                            {/* Social Login */}
                            <div className="flex gap-2.5 mb-6">
                                <SocialBtn icon={<GrGoogle />} label="Google" />
                                <SocialBtn icon={<FaFacebook />} label="Facebook" />
                            </div>
                            {/* divider */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex-1 h-px bg-gray-200" />
                                <span className="text-xs text-gray-400 whitespace-nowrap font-dmSans">
                                    or sign up with email
                                </span>
                                <div className="flex-1 h-px bg-gray-200" />
                            </div>

                            <InputField
                                id="firstName"
                                name="firstName"
                                label="First Name"
                                placeholder="John"
                                icon={<CiUser />}
                                value={form.firstName}
                                autoComplete="given-name"
                                required
                                error={errors.firstName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setForm((f) => ({ ...f, firstName: value }));
                                    validateField("firstName", value);
                                }}
                            />


                            <InputField
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                placeholder="Doe"
                                icon={<CiUser />}
                                value={form.lastName}
                                autoComplete="family-name"
                                required
                                error={errors.lastName}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setForm((f) => ({ ...f, lastName: value }));
                                    validateField("lastName", value);
                                }}
                            />

                            <InputField
                                id="email"
                                name="email"
                                label="Email Address"
                                type="email"
                                placeholder="you@example.com"
                                icon={<CiMail />}
                                value={form.email}
                                autoComplete="email"
                                required
                                error={errors.email}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setForm((f) => ({ ...f, email: value }));
                                    validateField("email", value);
                                }}
                            />

                            <InputField
                                id="phone"
                                name="phone"
                                label="Mobile Number"
                                type="tel"
                                placeholder="9999999999"
                                icon={<CiMobile3 />}
                                hint="We'll send your order updates here"
                                value={form.phone}
                                maxlength={10}
                                autoComplete="tel"
                                required
                                error={errors.phone}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    setForm((f) => ({ ...f, phone: value }));
                                    validateField("phone", value);
                                }}
                            />


                            <button
                                onClick={() => { if (validateStep1()) setStep(2) }}
                                disabled={!isStep1valid}
                                className={`w-full py-3 rounded-xl text-white font-bold transition ${isStep1valid
                                    ? "bg-gradient-to-br from-green-500 to-green-700 shadow-lg hover:scale-[1.02]"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                    }`}
                            // className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-br from-green-500 to-green-700 shadow-lg hover:scale-[1.02]"
                            >
                                Continue →
                            </button>
                        </>
                    )}

                    {step === 2
                        &&
                        (
                            <>
                                {/* user preview */}
                                <div className="bg-green-50 rounded-lg p-3 flex items-center gap-3 mb-6">
                                    <span className="text-xl"><CiUser /></span>

                                    <div>
                                        <div className="font-bold text-sm">{form.firstName} {form.lastName}</div>
                                        <div className="text-xs text-gray-500">{form.email}</div>
                                        <div className="text-xs text-gray-500">{form.phone}</div>
                                    </div>

                                    <button
                                        onClick={() => setStep(1)}
                                        className="ml-auto text-green-600 text-xs font-semibold"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <InputField
                                    id="password"
                                    name="password"
                                    label="Create Password"
                                    type="password"
                                    placeholder="Min 8 characters"
                                    icon={<CiLock />}
                                    value={form.password}
                                    autoComplete="new-password"
                                    required
                                    error={errors.password}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, password: e.target.value }))
                                    }
                                />


                                <PasswordStrength password={form.password} />

                                <InputField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Repeat your password"
                                    icon={<CiLock />}
                                    value={form.confirm}
                                    autoComplete="new-password"
                                    required
                                    error={errors.confirm}
                                    onChange={(e) =>
                                        setForm((f) => ({ ...f, confirm: e.target.value }))
                                    }
                                />
                                {form.confirm && form.password !== form.confirm && (
                                    <p className="text-red-500 text-xs -mt-3 mb-4">
                                        ⚠️ Passwords don't match
                                    </p>
                                )}

                                {form.confirm && form.password === form.confirm && (
                                    <p className="text-green-600 text-xs -mt-3 mb-4">
                                        ✓ Passwords match
                                    </p>
                                )}

                                <label className="flex gap-3 mb-6 text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        checked={form.agreed}
                                        onChange={(e) =>
                                            setForm((f) => ({ ...f, agreed: e.target.checked }))
                                        }
                                        className="accent-green-600 mt-[3px]"
                                    />

                                    <span>
                                        I agree to Satvik's{" "}
                                        <a href="#" className="text-green-600 font-semibold">
                                            Terms
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-green-600 font-semibold">
                                            Privacy Policy
                                        </a>
                                    </span>
                                </label>
                                {errors.agreed && (
                                    <p className="text-red-500 text-xs -mt-3 mb-2">{errors.agreed}</p>
                                )}

                                <button
                                    onClick={handleSubmit}
                                    disabled={!step2Valid || loading}
                                    className={`w-full py-3 rounded-xl text-white font-bold transition ${step2Valid
                                        ? "bg-gradient-to-br from-green-500 to-green-700 shadow-lg hover:scale-[1.02]"
                                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                                        }`}
                                // className="w-full py-3 rounded-xl text-white font-bold bg-gradient-to-br from-green-500 to-green-700 shadow-lg hover:scale-[1.02] disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Creating account..." : "Create Account "}
                                </button>
                            </>
                        )}

                    <p className="text-center mt-5 text-sm text-gray-500">
                        Already have an account?{" "}
                        <button
                            onClick={onSwitch}
                            className="text-green-600 font-bold"
                        >
                            Sign in
                        </button>
                    </p>
                </>
            )}
        </div>
    );
};

export default RegisterPage;