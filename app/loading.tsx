import loader from "@/assets/loader.gif";
import Image from "next/image";

const LoadingPage = () => {
    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <Image src={loader} height={100} width={100} alt="Loading..." unoptimized />
        </div>
    );
}

export default LoadingPage;