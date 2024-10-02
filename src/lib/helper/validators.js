const Validators = {
  required: (message = "Kolom wajib di isi") => ({
    required: message,
  }),

  minLength: (min, message = `Karakter minimal adalah ${min} karakter`) => ({
    minLength: {
      value: min,
      message: message,
    },
  }),

  maxLength: (max, message = `Karakter maksimal adalah ${max} karakter`) => ({
    maxLength: {
      value: max,
      message: message,
    },
  }),

  pattern: (pattern, message = "Format tidak valid") => ({
    pattern: {
      value: pattern,
      message: message,
    },
  }),

  isNumber: (message = "Inputan harus angka") => ({
    pattern: {
      value: /^\d+$/,
      message: message,
    },
  }),

  email: () => ({
    required: "Email tidak boleh kosong",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email yang anda masukkan tidak valid",
    },
  }),

  password: () => ({
    required: "Kata Sandi tidak boleh kosong",
    minLength: {
      value: 8,
      message: "Minimal 8 Karakter",
    },
  }),
};

export default Validators;
