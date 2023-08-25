import logo from "../../images/kraken.png";
const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="flex justify-center items-center flex-col mt-5">
      <p className="text-white text-sm text-center">SBA-certified veteran-owned business</p>
    </div>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@kryptokraken 2023</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);
export default Footer;
