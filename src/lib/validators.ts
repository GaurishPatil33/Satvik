export const validateName = (name: string) => {
  if (!name.trim()) return "Required";
  if (name.length < 2) return "Must be at least 2 characters";
  if (!/^[A-Za-z]+$/.test(name)) return "Only letters allowed";
  return "";
};

export const validateEmail = (email: string) => {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return "Invalid email address";
  return "";
};

export const validatePhone = (phone: string) => {
  if (!phone) return "Phone is required";
  const regex = /^(\+91[\-\s]?)?[6-9]\d{9}$/;
  if (!regex.test(phone)) return "Invalid Indian mobile number";
  return "";
};

export const validatePassword = (password: string) => {
  if (!password) return "Password required";
  if (password.length < 8) return "Min 8 characters";
  if (!/[A-Z]/.test(password)) return "Add uppercase letter";
  if (!/[a-z]/.test(password)) return "Add lowercase letter";
  if (!/[0-9]/.test(password)) return "Add a number";
  if (!/[!@#$%^&*]/.test(password)) return "Add special character";
  return "";
};