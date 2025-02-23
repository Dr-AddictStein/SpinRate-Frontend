import { Rocket, Pencil, Settings, Trophy, MessageCircle } from "lucide-react";

const sections = [
    {
        icon: Rocket,
        title: "Your clients scan the QR Code",
        description: "Provide your customers with stickers or flyers at your point of sale or in your delivery bags.",
        bgColor: "bg-blue-600 text-white",
        iconColor: "text-white"
    },
    {
        icon: Pencil,
        title: "Clients leave a Google Review",
        description: "Your customers should leave you a Google review. It’s a fun way to boost your Google Reviews.",
        bgColor: "bg-white text-black",
        iconColor: "text-blue-600"
    },
    {
        icon: Settings,
        title: "Let’s go, the wheel is turning!",
        description: "Once the Google review has been submitted, your customer will be able to spin the wheel and try to win a gift.",
        bgColor: "bg-white text-black",
        iconColor: "text-blue-600"
    },
    {
        icon: Trophy,
        title: "#1 on Google",
        description: "Boost your ranking on Google through Google Reviews from your clients.",
        bgColor: "bg-white text-black",
        iconColor: "text-blue-600"
    },
    {
        icon: MessageCircle,
        title: "Communicate",
        description: "Use your clients' database in order to promote your offers thanks to marketing data.",
        bgColor: "bg-white text-black",
        iconColor: "text-blue-600"
    }
];

const QRReviewSection = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 p-6 bg-gray-100">
            {sections.map((section, index) => (
                <div key={index} className={`p-6 border border-gray-500 shadow-lg h-[250px] flex flex-col items-start ${section.bgColor}`}>
                    <section.icon size={44} className={`mb-4 ${section.iconColor}`} />
                    <h3 className="text-xl font-semibold">{section.title}</h3>
                    <p className="text-lg mt-2 font-normal ">{section.description}</p>
                </div>
            ))}
        </div>
    );
};

export default QRReviewSection;
