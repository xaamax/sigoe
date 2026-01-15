import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authService from "@/core/services/auth-service";
import { PasswordInput } from "@/components/input-password";
import { setAuth } from "@/core/providers/auth-storage";

const formSchema = z.object({
  username: z.string().min(1, { message: "(*) Campo obrigatório" }),
  password: z
    .string()
    .min(1, {
      message: "(*) Campo obrigatório",
    })
    .min(4, {
      message: "A senha deve ter pelo menos 4 caracteres",
    }),
});

export function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    return await authService.login(data).then((response) => {
      if (response.status === 200) {
        window.location.href = "/home";
        setAuth(response.data);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="form-group">
        <input
          id="username"
          type="text"
          placeholder="Usuário"
          {...register("username")}
          className={errors.username ? "error" : ""}
        />
        {errors.username && (
          <div className="error-message">{errors.username.message}</div>
        )}
      </div>

      <div className="form-group">
        <PasswordInput
          {...register("password")}
          className={errors.password ? "error" : ""}
        />
        {errors.password && (
          <div className="error-message">{errors.password.message}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Acessando..." : "Acessar"}
      </button>
    </form>
  );
}
