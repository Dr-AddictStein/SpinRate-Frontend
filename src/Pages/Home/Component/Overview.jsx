const stats = [
    { value: "+350", text: "New Google Reviews per month" },
    { value: "x5", text: "Bring your customers back" },
    { value: "+75%", text: "Increase your customer database" },
    { value: "+9%", text: "Increase your revenue" },
];

export default function Overview() {
    return (
        <div className="grid  lg:grid-cols-4 grid-cols-1 gap-5 px-10">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="bg-white shadow-xl s rounded-lg p-6 h-[150px] w-full text-center border-2 border-gray-200"
                >

                    <div className="text-blue-600 text-3xl font-bold">{stat.value}</div>
                    <p className="text-gray-600 mt-2">{stat.text}</p>
                </div>
            ))}
        </div>
    );
}
