import { Rocket, Pencil, Settings, Trophy, MessageCircle } from "lucide-react";

const sections = [
    {
        icon: Rocket,
        title: "Your clients scan the QR Code",
        description: "Provide your customers with stickers or flyers at your point of sale or in your delivery bags.",
    },
    {
        icon: Pencil,
        title: "Clients leave a Google Review",
        description: "Your customers should leave you a Google review. It’s a fun way to boost your Google Reviews.",
    },
    {
        icon: Settings,
        title: "Let’s go, the wheel is turning!",
        description: "Once the Google review has been submitted, your customer will be able to spin the wheel and try to win a gift.",
    },
    {
        icon: Trophy,
        title: "#1 on Google",
        description: "Boost your ranking on Google through Google Reviews from your clients.",
    },
    {
        icon: MessageCircle,
        title: "Communicate",
        description: "Use your clients' database in order to promote your offers thanks to marketing data.",
    }
];

const QRReviewSection = () => {
    return (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-8 p-8 bg-gray-100">
            {sections.map((section, index) => (
                <div
                    key={index}
                    className="relative p-8 h-[230px] border border-gray-300 rounded-3xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl bg-white hover:bg-[#2098F3] hover:text-white text-gray-900 ease-in-out duration-300"
                >
                    <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md">
                        <section.icon size={32} className="text-[#2098F3] group-hover:text-white" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3">{section.title}</h3>
                    <p className="text-lg font-medium opacity-90">{section.description}</p>
                </div>
            ))}
        </div>
    );
};

export default QRReviewSection;
