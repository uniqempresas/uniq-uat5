"use client";

type StrengthLevel = "weak" | "medium" | "strong";

interface PasswordStrengthProps {
  password: string;
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (password: string): StrengthLevel => {
    if (password.length < 6) return "weak";
    if (password.length < 8 || !/[A-Z]/.test(password) || !/[^a-zA-Z0-9]/.test(password)) {
      return "medium";
    }
    return "strong";
  };

  const strength = getStrength(password);

  const getStrengthConfig = (strength: StrengthLevel) => {
    switch (strength) {
      case "weak":
        return {
          width: "33%",
          color: "bg-red-500",
          label: "Fraca",
          labelColor: "text-red-500",
        };
      case "medium":
        return {
          width: "66%",
          color: "bg-yellow-500",
          label: "Média",
          labelColor: "text-yellow-600",
        };
      case "strong":
        return {
          width: "100%",
          color: "bg-green-500",
          label: "Forte",
          labelColor: "text-green-600",
        };
    }
  };

  const config = getStrengthConfig(strength);

  if (!password) {
    return null;
  }

  return (
    <div className="mt-2 space-y-2">
      <div className="h-1.5 bg-uniq-platinum rounded-full overflow-hidden">
        <div
          className={`h-full ${config.color} transition-all duration-300`}
          style={{ width: config.width }}
        />
      </div>
      <p className={`text-xs font-medium ${config.labelColor}`}>
        Força da senha: {config.label}
      </p>
    </div>
  );
}
