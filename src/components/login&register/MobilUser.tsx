"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Leaf, ArrowRight, Phone, Shield, ChevronLeft, CheckCircle2 } from "lucide-react";
import Image from "next/image";

/* ── OTP Step type ── */
type Step = "phone" | "otp" | "success";

/* ── Floating label input ── */
function PhoneInput({
    value,
    onChange,
    disabled,
}: {
    value: string;
    onChange: (v: string) => void;
    disabled?: boolean;
}) {
    const [focused, setFocused] = useState(false);
    const floated = focused || value.length > 0;

    return (
        <div className="relative">
            {/* country code */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 z-10 pointer-events-none">
                <span className="text-base">🇮🇳</span>
                <span className="text-sm font-semibold text-brand-forest">+91</span>
                <span className="text-brand-earth/40 ml-1">|</span>
            </div>
            <input
                type="tel"
                inputMode="numeric"
                maxLength={10}
                value={value}
                onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disabled={disabled}
                placeholder="Mobile number"
                className="w-full pl-24 pr-4 py-4 rounded-xl border-2 transition-all duration-200 outline-none
          font-body text-[15px] text-brand-forest tracking-widest bg-white
          border-brand-earth/20 focus:border-brand-forest
          disabled:opacity-50 disabled:cursor-not-allowed
          placeholder:text-brand-earth/40 placeholder:tracking-normal"
            />
        </div>
    );
}

/* ── OTP boxes ── */
function OtpInput({
    value,
    onChange,
}: {
    value: string[];
    onChange: (v: string[]) => void;
}) {
    const refs = useRef<(HTMLInputElement | null)[]>([]);

    const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && !value[i] && i > 0) {
            refs.current[i - 1]?.focus();
        }
    };

    const handleChange = (i: number, char: string) => {
        const digit = char.replace(/\D/g, "").slice(-1);
        const next = [...value];
        next[i] = digit;
        onChange(next);
        if (digit && i < 5) refs.current[i + 1]?.focus();
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        if (pasted.length === 6) {
            onChange(pasted.split(""));
            refs.current[5]?.focus();
        }
        e.preventDefault();
    };

    return (
        <div className="flex gap-2 justify-center">
            {Array.from({ length: 6 }).map((_, i) => (
                <input
                    key={i}
                    ref={(el) => { refs.current[i] = el; }}
                    type="tel"
                    inputMode="numeric"
                    maxLength={1}
                    value={value[i] || ""}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKey(i, e)}
                    onPaste={handlePaste}
                    className={`w-11 h-12 text-center text-lg font-bold rounded-xl border-2 outline-none
            font-body text-brand-forest transition-all duration-150
            ${value[i]
                            ? "border-brand-forest bg-brand-forest/5"
                            : "border-brand-earth/20 bg-white focus:border-brand-forest"
                        }`}
                />
            ))}
        </div>
    );
}

/* ── Social button ── */
function SocialBtn({
    icon,
    label,
    onClick,
    color,
}: {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    color: string;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl border-2
        font-body text-sm font-semibold transition-all duration-150 active:scale-[0.98]
        ${color}`}
        >
            {icon}
            {label}
        </button>
    );
}

/* ── Main Login Page ── */
export default function LoginPage() {
    const [step, setStep] = useState<Step>("phone");
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(0);

    /* countdown timer for resend */
    useEffect(() => {
        if (resendTimer <= 0) return;
        const t = setTimeout(() => setResendTimer((v) => v - 1), 1000);
        return () => clearTimeout(t);
    }, [resendTimer]);

    const handleContinue = () => {
        if (phone.length !== 10) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep("otp");
            setResendTimer(30);
        }, 1200);
    };

    const handleVerifyOtp = () => {
        const code = otp.join("");
        if (code.length !== 6) return;
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep("success");
        }, 1200);
    };

    const handleResend = () => {
        if (resendTimer > 0) return;
        setOtp(["", "", "", "", "", ""]);
        setResendTimer(30);
    };

    return (
        <div className="min-h-screen bg-brand-cream flex items-center justify-center p-4">
            {/* Decorative blobs */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-gold/10 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-forest/8 blur-3xl" />
            </div>

            {/* Card — split layout */}
            <div className="relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl shadow-brand-forest/15 flex min-h-[580px]">

                {/* ── LEFT: Form panel ── */}
                <div className="flex-1 bg-brand-off-white flex flex-col px-8 sm:px-10 py-10">

                    {/* Back + Logo */}
                    <div className="flex items-center justify-between mb-8 relative pb-2">
                        {/* Left */}
                        {step !== "phone" ? (
                            <button
                                onClick={() => {
                                    setStep("phone");
                                    setOtp(["", "", "", "", "", ""]);
                                }}
                                className="flex items-center gap-1 text-sm text-brand-earth hover:text-brand-forest transition-colors font-body"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {/* Center */}
                        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                            <Link href="/" className="flex items-center gap-2 pointer-events-auto">
                                <div className="w-8 h-8 rounded-full bg-brand-forest flex items-center justify-center" />
                                <Image height={100} width={100} src="/logo.png" alt="logo" />
                            </Link>
                        </div>
                    </div>


                    {/* ── Step: Phone ── */}
                    {step === "phone" && (
                        <div className="flex flex-col flex-1 animate-fade-up">
                            <div className="mb-8">
                                <h1 className="font-display text-3xl font-bold text-brand-forest mb-2">
                                    Welcome back 
                                </h1>
                                <p className="font-body text-sm text-brand-earth">
                                    Enter your mobile number to continue shopping pure organic goodness.
                                </p>
                            </div>

                            <div className="space-y-4">
                                <PhoneInput value={phone} onChange={setPhone} disabled={loading} />

                                <button
                                    onClick={handleContinue}
                                    disabled={phone.length !== 10 || loading}
                                    className="w-full py-4 rounded-xl bg-brand-forest text-brand-cream font-body font-semibold text-[15px]
                    flex items-center justify-center gap-2 transition-all duration-200
                    hover:bg-brand-forest-light active:scale-[0.98]
                    disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Sending OTP…
                                        </span>
                                    ) : (
                                        <>Continue <ArrowRight size={16} /></>
                                    )}
                                </button>

                                {/* Divider */}
                                <div className="flex items-center gap-3 my-2">
                                    <div className="flex-1 h-px bg-brand-earth/15" />
                                    <span className="text-xs text-brand-earth/50 font-body">or sign in with</span>
                                    <div className="flex-1 h-px bg-brand-earth/15" />
                                </div>

                                {/* Social logins */}
                                <div className="grid grid-cols-2 gap-3">
                                    <SocialBtn
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        }
                                        label="Google"
                                        color="border-brand-earth/20 bg-white text-brand-forest hover:border-brand-forest/40 hover:bg-brand-ivory"
                                    />
                                    <SocialBtn
                                        icon={
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366">
                                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                            </svg>
                                        }
                                        label="WhatsApp"
                                        color="border-[#25D366]/30 bg-[#f0fff4] text-[#166534] hover:border-[#25D366]/60 hover:bg-[#dcfce7]"
                                    />
                                </div>
                            </div>

                            {/* Privacy policy */}
                            <p className="mt-auto pt-8 text-center text-[11px] text-brand-earth/60 font-body leading-relaxed">
                                By continuing, you agree to our{" "}
                                <Link href="/terms" className="underline underline-offset-2 hover:text-brand-forest transition-colors">
                                    Terms of Service
                                </Link>{" "}
                                &amp;{" "}
                                <Link href="/privacy" className="underline underline-offset-2 hover:text-brand-forest transition-colors">
                                    Privacy Policy
                                </Link>
                            </p>
                        </div>
                    )}

                    {/* ── Step: OTP ── */}
                    {step === "otp" && (
                        <div className="flex flex-col flex-1 animate-fade-up">
                            <div className="mb-8">
                                <div className="w-12 h-12 rounded-full bg-brand-gold/15 flex items-center justify-center mb-4">
                                    <Phone size={22} className="text-brand-gold" />
                                </div>
                                <h1 className="font-display text-3xl font-bold text-brand-forest mb-2">
                                    Verify OTP
                                </h1>
                                <p className="font-body text-sm text-brand-earth">
                                    We sent a 6-digit code to{" "}
                                    <span className="font-semibold text-brand-forest">+91 {phone}</span>
                                </p>
                            </div>

                            <div className="space-y-6">
                                <OtpInput value={otp} onChange={setOtp} />

                                <button
                                    onClick={handleVerifyOtp}
                                    disabled={otp.join("").length !== 6 || loading}
                                    className="w-full py-4 rounded-xl bg-brand-forest text-brand-cream font-body font-semibold text-[15px]
                    flex items-center justify-center gap-2 transition-all duration-200
                    hover:bg-brand-forest-light active:scale-[0.98]
                    disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                            Verifying…
                                        </span>
                                    ) : (
                                        <>Verify &amp; Login <ArrowRight size={16} /></>
                                    )}
                                </button>

                                <p className="text-center text-sm font-body text-brand-earth/70">
                                    {resendTimer > 0 ? (
                                        <>Resend OTP in <span className="font-semibold text-brand-forest">{resendTimer}s</span></>
                                    ) : (
                                        <button
                                            onClick={handleResend}
                                            className="text-brand-forest font-semibold hover:underline"
                                        >
                                            Resend OTP
                                        </button>
                                    )}
                                </p>
                            </div>

                            <div className="mt-auto pt-8 flex items-center justify-center gap-1.5">
                                <Shield size={12} className="text-brand-earth/40" />
                                <span className="text-[11px] text-brand-earth/50 font-body">
                                    Secured by 256-bit encryption
                                </span>
                            </div>
                        </div>
                    )}

                    {/* ── Step: Success ── */}
                    {step === "success" && (
                        <div className="flex flex-col flex-1 items-center justify-center text-center gap-5 animate-fade-up">
                            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircle2 size={40} className="text-green-600" />
                            </div>
                            <div>
                                <h1 className="font-display text-3xl font-bold text-brand-forest mb-2">
                                    You&apos;re in! 
                                </h1>
                                <p className="font-body text-sm text-brand-earth">
                                    Welcome back. Redirecting to your dashboard…
                                </p>
                            </div>
                            <Link
                                href="/"
                                className="mt-2 inline-flex items-center gap-2 bg-brand-forest text-brand-cream px-6 py-3 rounded-full font-body font-semibold text-sm hover:bg-brand-forest-light transition-colors"
                            >
                                Continue Shopping <ArrowRight size={15} />
                            </Link>
                        </div>
                    )}
                </div>

                {/* ── RIGHT: Video / Visual panel ── */}
                <div className="hidden lg:flex w-[420px] relative flex-col overflow-hidden bg-brand-forest-dark">
                    {/* Video background */}
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover opacity-40"
                        poster="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80"
                    >
                        {/* Fallback to poster if no video src */}
                    </video>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-forest-dark/80 via-brand-forest/60 to-brand-forest-dark/90" />

                    {/* Decorative circles */}
                    <div className="absolute top-12 right-12 w-32 h-32 rounded-full border border-brand-cream/10" />
                    <div className="absolute top-16 right-16 w-24 h-24 rounded-full border border-brand-cream/5" />
                    <div className="absolute bottom-16 left-10 w-40 h-40 rounded-full border border-brand-gold/15" />

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full p-10">
                        {/* Tag */}
                        <div className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs px-3 py-1.5 rounded-full w-fit font-body font-medium">
                            🌿 100% Cold-Pressed
                        </div>

                        {/* Center quote */}
                        <div className="flex-1 flex flex-col justify-center">
                            <p className="font-accent text-[13px] text-brand-cream/50 italic mb-4 tracking-widest uppercase">
                                The Satvik Promise
                            </p>
                            <h2 className="font-display text-4xl font-bold text-brand-cream leading-tight mb-6">
                                Pure oils,<br />
                                <span className="text-brand-gold-light italic">pure life.</span>
                            </h2>
                            <p className="font-body text-[13px] text-brand-cream/70 leading-relaxed max-w-xs">
                                Wood-pressed. Stone-crushed. No heat, no chemicals. Every drop retains nature's full goodness — just as your grandparents knew it.
                            </p>
                        </div>

                        {/* Trust stats */}
                        <div className="grid grid-cols-3 gap-4 border-t border-brand-cream/10 pt-6">
                            {[
                                { val: "12K+", label: "Happy Customers" },
                                { val: "4.9★", label: "Avg Rating" },
                                { val: "100%", label: "Organic" },
                            ].map((s) => (
                                <div key={s.label} className="text-center">
                                    <p className="font-display text-xl font-bold text-brand-gold">{s.val}</p>
                                    <p className="font-body text-[10px] text-brand-cream/50 mt-0.5">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}