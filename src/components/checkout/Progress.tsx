"use client";

type Step = 1 | 2 | 3 | 4;

interface CheckoutProgressProps {
    steps: string[];
    currentStep: Step;
    onStepClick?: (step: Step) => void;
}

function StepCircle({ n, current }: { n: number; current: Step }) {
    const done = n < current;
    const active = n === current;

    return (
        <div
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 flex-shrink-0
      ${done ? "bg-forest/60 border-forest/40 text-white" : ""}
      ${active ? "bg-forest/80 border-forest text-white shadow-lg shadow-forest/25 ring-4 ring-forest/45" : ""}
      ${!done && !active ? "bg-white border-cream text-gray-300" : ""}`}
        >
            {done ? "✓" : n}
        </div>
    );
}

export default function CheckoutProgress({
    steps,
    currentStep,
    onStepClick,
}: CheckoutProgressProps) {
    return (
        <div className="bg-white border-b border-cream-200">
            <div className="max-w-4xl mx-auto px-5 flex items-center">
                {steps.map((label, i) => {
                    const n = (i + 1) as Step;

                    return (
                        <div key={label} className="flex items-center flex-1 last:flex-none">
                            <button
                                onClick={() => n < currentStep && onStepClick?.(n)}
                                className="flex flex-col items-center py-4 gap-1.5 min-w-[70px]"
                            >
                                <StepCircle n={n} current={currentStep} />

                                <span
                                    className={`text-[11px] font-dm font-semibold transition-colors
                                    ${n < currentStep
                                            ? "text-forest"
                                            : n === currentStep
                                                ? "text-forest"
                                                : "text-gray-300"
                                        }`}
                                >
                                    {label}
                                </span>
                            </button>

                            {i < steps.length - 1 && (
                                <div
                                    className={`flex-1 h-0.5 mx-1 mb-3 transition-colors duration-300
                                     ${n < currentStep ? "bg-forest" : "bg-cream"}`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}