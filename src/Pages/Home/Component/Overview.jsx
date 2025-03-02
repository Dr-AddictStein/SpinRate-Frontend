const stats = [
    { value: "+350", text: "New Google Reviews per month" },
    { value: "x5", text: "Bring your customers back" },
    { value: "+75%", text: "Increase your customer database" },
    { value: "+9%", text: "Increase your revenue" },
];

export default function Overview() {
    return (
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-6 px-10 py-6">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="relative bg-white bg-opacity-30 backdrop-blur-md shadow-lg rounded-2xl p-6 h-[180px] w-full text-center border border-gray-300 hover:scale-105 transition-transform duration-300"
                >
                    <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-sm px-3 py-1 rounded-full shadow-md">
                        {index + 1}
                    </div>
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#2098F3] text-4xl font-extrabold drop-shadow-lg">
                        {stat.value}
                    </div>
                    <p className="text-gray-700 mt-3 font-medium">{stat.text}</p>
                </div>
            ))}
        </div>
    );
}
