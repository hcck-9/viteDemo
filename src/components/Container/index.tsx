import { devDependencies } from "../../../package.json";
import image1 from "@assets/images/1.jpg";
import image2 from "@/assets/images/2.jpg";
import ViteLogo from "@assets/svgs/vite.svg?react";
import ReactLogo from "@assets/svgs/react.svg?react";

const Container = () => {
  return (
    <div className="p-20px text-center">
      <div className="text-2xl mb-2">vite version: {devDependencies.vite}</div>
      <div className="flex-center">
        <img className="w-50px h-50px mr-20px" src={image1} alt="" />
        <img className="w-50px h-50px" src={image2} alt="" />
      </div>
      <div className="flex-center mt-10px">
        <ViteLogo className="w-50px h-50px mr-20px" />
        <ReactLogo className="w-50px h-50px" />
      </div>
    </div>
  );
};
export default Container;
