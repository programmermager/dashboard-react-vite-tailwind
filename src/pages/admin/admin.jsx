import { toast } from "sonner";
import Button from "../../components/button";
import { replace, useNavigate } from "react-router-dom";
import { Logo } from "../../components/logo";

function Admin(){
    const navigate = useNavigate();

    function logout(){
        localStorage.removeItem('token');
        navigate('/login', replace);
        toast.success('Berhasil Logout');
    }

    return (
       <div>
         <div className="fixed top-0 left-0 w-full">
            <div className="flex flex-row p-5 shadow-sm justify-between">
                <div className="flex items-center">
                    <Logo size='sm'/>
                    <p className="lg:text-xl hidden sm:block font-bold">Wakanda Foverer</p>
                </div>
                <Button text="Logout" onClick={logout}/>
            </div>
        </div>
        <div className="flex flex-row mt-28">
            <div className="bg-gray-700 p-20 rounded-md mx-4 static h-96">
            </div>
            <div className="bg-green-300 mx-10 px-10 w-full">
        <h1>Hai</h1>
            </div>
        </div>
       </div>
    );
}

export default Admin;