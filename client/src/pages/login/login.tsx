import WallpaperLogin from "@/assets/wallpaper_login.png";
import { LoginForm } from "./components/login-form";
import Logo from "@/assets/logo.png";

export function Login() {
  return (
    <div className="flex h-screen">
      <img
        src={WallpaperLogin}
        alt="LoginWallpaper"
        className="hidden h-full w-2/3 object-cover lg:block"
      />
      <div className='flex flex-1 flex-col justify-center items-center'>
        <img src={Logo} alt="Logo" className="object-contain" />
        <LoginForm />
      </div>
    </div>
  );
}
