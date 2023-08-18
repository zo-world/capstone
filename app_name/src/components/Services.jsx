import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row items-center justify-start p-3 m-2 cursor-pointer white-glassmorphism hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="flex flex-col flex-1 ml-5">
      <h1 className="mt-2 text-lg text-white">{title}</h1>
      <p className="mt-2 text-sm text-white md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:test-5xl py-2">
            We wrap our arms around
            <br />
            maintaining premium quality!
          </h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start flex-1">
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security guaranteed"
          icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
          subtitle="Your security is our top priority. Benefit from cutting-edge encryption, multi-factor 
          authentication, and biometric login options that safeguard your assets and personal 
          information, offering you peace of mind while trading."
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Real-time market insights"
          icon={<BiSearchAlt fontSize={21} className="text-white" />}
          subtitle="Stay ahead with real-time market data, interactive charts, and personalized alerts. 
          Our app equips you with the information you need to make informed trading decisions, enhancing 
          your chances of success."
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Stellar customer support"
          icon={<RiHeart2Fill fontSize={21} className="text-white" />}
          subtitle="Join a community of traders who are supported by our responsive and knowledgeable 
          customer support team. We're here to assist you every step of the way, ensuring that your 
          experience with our app remains smooth and enjoyable."
        />
      </div>
    </div>
  );
};
export default Services;
