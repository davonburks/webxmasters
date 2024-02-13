import Image from "next/image";
import { redirect } from "next/navigation";
import router from "next/navigation";

const Logout = () => {

  return (
    <div className="uppercase">
      <button formAction="/auth/sign-up" className="w-full bg-gray-600  py-2 px-4 rounded hover:bg-accent-color">
        LOGOUT
      </button>
    </div>
  );
};

export default Logout;
