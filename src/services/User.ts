import api from "./api";
import { z } from "zod";

// Схема пользователя для валидации ответа с сервера
export const UserSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

// Схема регистрации с валидацией пароля и подтверждения
export const RegisterUserSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1), // Добавить surname
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine(data => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Пароли должны совпадать",
});

export type RegisterUser = z.infer<typeof RegisterUserSchema>;

export async function fetchMe(): Promise<User> {
  try {
    const response = await api.get("/profile", { withCredentials: true });
    return UserSchema.parse(response.data);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Не авторизован");
    }
    throw error;
  }
}

export async function login(data: { email: string; password: string }): Promise<void> {
  try {
    await api.post("/auth/login", data, { withCredentials: true });
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Неверный email или пароль");
    }
    throw error;
  }
}

export async function logout(): Promise<void> {
  await api.get("/auth/logout", { withCredentials: true });
}

export async function registerUser(data: RegisterUser): Promise<void> {
  try {
    // Убираем confirmPassword из данных отправки
    const { confirmPassword, ...registerData } = data;
    
    console.log("Отправляемые данные:", registerData);
    
    // API требует application/x-www-form-urlencoded согласно документации
    const formData = new URLSearchParams();
    formData.append('email', registerData.email);
    formData.append('password', registerData.password);
    formData.append('name', registerData.name);
    formData.append('surname', registerData.surname || ''); // Защита от undefined
    
    console.log("Form data:", Object.fromEntries(formData));
    
    const response = await api.post("/user", formData, { 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    console.log("Регистрация успешна:", response.data);
    
    // API возвращает { success: true } при успехе (не result!)
    if (response.data?.success === true || response.data?.result === true) {
      return; // Успешное завершение
    }
    
    // Если статус 200/201, но нет success/result: true, все равно считаем успехом
    if (response.status === 200 || response.status === 201) {
      return;
    }
    
    throw new Error("Неожиданный ответ сервера");
    
  } catch (error: any) {
    console.error("Статус ошибки:", error.response?.status);
    console.error("Данные ошибки:", error.response?.data);
    
    // Обрабатываем и 400 и 409 статусы
    if (error.response?.status === 400 || error.response?.status === 409) {
      const message = error.response?.data?.error || "Пользователь с таким email уже существует";
      throw new Error(message);
    }
    
    throw new Error("Ошибка регистрации");
  }
}

