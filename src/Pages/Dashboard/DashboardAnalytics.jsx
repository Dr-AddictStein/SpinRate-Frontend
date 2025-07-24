import axios from "axios";
import { motion } from "framer-motion";
import {
  ArrowUp,
  BarChart2,
  ExternalLink,
  Gift,
  PieChart,
  Scan,
  Search,
  User,
  UserCheck,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

// Translations object
const translations = {
  en: {
    pageTitle: "Analytics Dashboard",
    pageSubtitle: "Overview of your platform's performance and statistics.",
    totalUsers: "Total Users",
    totalWheels: "Total Wheels",
    totalScans: "Total Scans",
    prizesGiven: "Prizes Given",
    redemptionRate: "Prize Redemption Rate",
    redemptionDetails: "redeemed vs. total prizes won",
    customerDatabase: "Customer Database",
    enrichedProfiles: "Enriched Profiles",
    usersTab: "Users",
    wheelsTab: "Wheels",
    customersTab: "Customers",
    searchUsers: "Search users...",
    searchWheels: "Search wheels...",
    searchCustomers: "Search customers...",
    // Table headers - Users
    name: "Name",
    username: "Username",
    email: "Email",
    // Table headers - Wheels
    instructions: "Instructions",
    createdDate: "Created Date",
    scans: "Scans",
    lots: "Lots",
    reviewLink: "Review Link",
    // Table headers - Customers
    phone: "Phone",
    prize: "Prize",
    status: "Status",
    enriched: "Enriched",
    date: "Date",
    // Status labels
    claimed: "Claimed",
    pending: "Pending",
    yes: "Yes",
    no: "No",
  },
  fr: {
    pageTitle: "Tableau de Bord Analytique",
    pageSubtitle:
      "Aperçu des performances et statistiques de votre plateforme.",
    totalUsers: "Utilisateurs Totaux",
    totalWheels: "Roues Totales",
    totalScans: "Scans Totaux",
    prizesGiven: "Prix Attribués",
    redemptionRate: "Taux de Réclamation",
    redemptionDetails: "réclamés vs. total des prix gagnés",
    customerDatabase: "Base de Données Clients",
    enrichedProfiles: "Profils Enrichis",
    usersTab: "Utilisateurs",
    wheelsTab: "Roues",
    customersTab: "Clients",
    searchUsers: "Rechercher utilisateurs...",
    searchWheels: "Rechercher roues...",
    searchCustomers: "Rechercher clients...",
    // Table headers - Users
    name: "Nom",
    username: "Nom d'utilisateur",
    email: "Email",
    // Table headers - Wheels
    instructions: "Instructions",
    createdDate: "Date de Création",
    scans: "Scans",
    lots: "Lots",
    reviewLink: "Lien d'Avis",
    // Table headers - Customers
    phone: "Téléphone",
    prize: "Prix",
    status: "Statut",
    enriched: "Enrichi",
    date: "Date",
    // Status labels
    claimed: "Réclamé",
    pending: "En attente",
    yes: "Oui",
    no: "Non",
  },
};

const DashboardAnalytics = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  const [adminData, setAdminData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [userSearchTerm, setUserSearchTerm] = useState("");
  const [customerSearchTerm, setCustomerSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("users"); // 'users', 'wheels', 'customers'
  const [statsAnimated, setStatsAnimated] = useState(false);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          "https://api.revwheel.fr/api/adminData/adminData"
        );
        setAdminData(response.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
        setError("Failed to load admin data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Mark stats as animated once data is loaded
  useEffect(() => {
    if (!isLoading && adminData) {
      setStatsAnimated(true);
    }
  }, [isLoading, adminData]);

  // Filter wheels based on search term
  const filteredWheels =
    adminData?.wheels?.filter(
      (wheel) =>
        wheel._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wheel.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        wheel.customerInstruction
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    ) || [];

  // Filter users based on search term
  const filteredUsers =
    adminData?.users?.filter(
      (user) =>
        user.fullName.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.userName.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
    ) || [];

  // Filter customers based on search term
  const filteredCustomers =
    adminData?.customers?.filter(
      (customer) =>
        customer.email
          .toLowerCase()
          .includes(customerSearchTerm.toLowerCase()) ||
        customer.phone
          .toLowerCase()
          .includes(customerSearchTerm.toLowerCase()) ||
        customer.prize.toLowerCase().includes(customerSearchTerm.toLowerCase())
    ) || [];

  // Calculate prize redemption rate
  const calculateRedemptionRate = () => {
    if (!adminData?.customers || adminData.customers.length === 0) return 0;

    const redeemedCount = adminData.customers.filter(
      (customer) => customer.status
    ).length;
    return Math.round((redeemedCount / adminData.customers.length) * 100);
  };

  // Calculate enriched users count
  const getEnrichedCount = () => {
    if (!adminData?.customers) return 0;
    return adminData.customers.filter((customer) => customer.enriched).length;
  };

  const StatCard = ({ title, value, icon: Icon, color, subtext, id }) => {
    return (
      <motion.div
        key={`stat-card-${id}`}
        initial={statsAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-100"
      >
        <div className="flex justify-between items-start">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              {title}
            </p>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold mt-1 text-gray-800">
              {value}
            </h3>
            {subtext && (
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium text-green-600 flex items-center">
                  <ArrowUp size={12} className="mr-1" />
                  {subtext}
                </span>
              </div>
            )}
          </div>
          <div className={`p-2 sm:p-3 rounded-lg bg-${color}-50`}>
            <Icon className={`text-${color}-500`} size={18} />
          </div>
        </div>
      </motion.div>
    );
  };

  // Tab component
  const TabButton = ({ id, label, icon: Icon, active, onClick }) => {
    return (
      <button
        onClick={() => onClick(id)}
        className={`flex items-center px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-all duration-200 ${
          active
            ? "border-blue-500 text-blue-600"
            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
        }`}
      >
        <Icon size={16} className="mr-1 sm:mr-2" />
        <span className="hidden xs:inline">{label}</span>
        {id === "users" && (
          <span className="ml-1 sm:ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full">
            {adminData?.usersCount || 0}
          </span>
        )}
        {id === "wheels" && (
          <span className="ml-1 sm:ml-2 bg-indigo-100 text-indigo-800 text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full">
            {adminData?.wheelsCount || 0}
          </span>
        )}
        {id === "customers" && (
          <span className="ml-1 sm:ml-2 bg-green-100 text-green-800 text-xs font-medium px-1.5 sm:px-2 py-0.5 rounded-full">
            {adminData?.customersCount || 0}
          </span>
        )}
      </button>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800">
          {t.pageTitle}
        </h1>
        <p className="text-sm md:text-base text-gray-600 mt-1">
          {t.pageSubtitle}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <StatCard
          id="users-count"
          title={t.totalUsers}
          value={adminData?.usersCount || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          id="wheels-count"
          title={t.totalWheels}
          value={adminData?.wheelsCount || 0}
          icon={BarChart2}
          color="indigo"
        />
        <StatCard
          id="scans-count"
          title={t.totalScans}
          value={adminData?.scans || 0}
          icon={Scan}
          color="green"
        />
        <StatCard
          id="prizes-count"
          title={t.prizesGiven}
          value={adminData?.prizesGiven || 0}
          icon={Gift}
          color="purple"
        />
      </div>

      {/* Second row stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
        <StatCard
          id="redemption-rate"
          title={`${t.redemptionRate} (${t.redemptionDetails})`}
          value={`${calculateRedemptionRate()}%`}
          icon={PieChart}
          color="yellow"
        />
        <StatCard
          id="customer-count"
          title={t.customerDatabase}
          value={adminData?.customersCount || 0}
          icon={Users}
          color="red"
        />
        <StatCard
          id="enriched-count"
          title={t.enrichedProfiles}
          value={getEnrichedCount()}
          icon={UserCheck}
          color="emerald"
        />
      </div>

      {/* Tabs navigation */}
      <div className="bg-white rounded-t-xl shadow-sm border border-gray-100 p-0">
        <div className="flex flex-wrap md:flex-nowrap border-b border-gray-200">
          <TabButton
            id="users"
            label={t.usersTab}
            icon={User}
            active={activeTab === "users"}
            onClick={setActiveTab}
          />
          <TabButton
            id="wheels"
            label={t.wheelsTab}
            icon={BarChart2}
            active={activeTab === "wheels"}
            onClick={setActiveTab}
          />
          <TabButton
            id="customers"
            label={t.customersTab}
            icon={Users}
            active={activeTab === "customers"}
            onClick={setActiveTab}
          />

          {/* Search input - changes based on active tab */}
          <div className="w-full md:w-auto ml-0 md:ml-auto p-2">
            {activeTab === "users" && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.searchUsers}
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={userSearchTerm}
                  onChange={(e) => setUserSearchTerm(e.target.value)}
                />
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
            )}
            {activeTab === "wheels" && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.searchWheels}
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
            )}
            {activeTab === "customers" && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={t.searchCustomers}
                  className="w-full px-4 py-2 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  value={customerSearchTerm}
                  onChange={(e) => setCustomerSearchTerm(e.target.value)}
                />
                <Search
                  size={16}
                  className="absolute left-3 top-3 text-gray-400"
                />
              </div>
            )}
          </div>
        </div>

        {/* Users Table - only visible when activeTab is 'users' */}
        {activeTab === "users" && (
          <div className="p-2 sm:p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">#</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.name}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.username}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.email}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {index + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 sm:mr-3">
                            <User size={14} className="text-gray-500" />
                          </div>
                          <span className="font-medium text-gray-900 text-xs sm:text-sm">
                            {user.fullName}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {user.userName}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {user.email}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Wheels Table - only visible when activeTab is 'wheels' */}
        {activeTab === "wheels" && (
          <div className="p-2 sm:p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">#</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.instructions}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.createdDate}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                      {t.scans}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                      {t.lots}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                      {t.reviewLink}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredWheels.map((wheel, index) => (
                    <tr key={wheel._id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {index + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {wheel.customerInstruction.length > 30
                          ? `${wheel.customerInstruction.substring(0, 30)}...`
                          : wheel.customerInstruction}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {new Date(wheel.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {wheel.scans || 0}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center text-xs sm:text-sm">
                        {wheel.lots.length}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        {wheel.googleReviewLink ? (
                          <a
                            href={wheel.googleReviewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Table - only visible when activeTab is 'customers' */}
        {activeTab === "customers" && (
          <div className="p-2 sm:p-4 md:p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr className="text-xs text-gray-500 uppercase tracking-wider">
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">#</th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.email}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.phone}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-left">
                      {t.prize}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                      {t.status}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                      {t.enriched}
                    </th>
                    <th className="px-3 sm:px-6 py-2 sm:py-3 text-center">
                      {t.date}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCustomers.map((customer, index) => (
                    <tr key={customer._id} className="hover:bg-gray-50">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {index + 1}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {customer.email}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {customer.phone}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-gray-500 text-xs sm:text-sm">
                        {customer.prize.length > 20
                          ? `${customer.prize.substring(0, 20)}...`
                          : customer.prize}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            customer.status
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {customer.status ? t.claimed : t.pending}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        <span
                          className={`inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            customer.enriched
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {customer.enriched ? t.yes : t.no}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center text-gray-500 text-xs sm:text-sm">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardAnalytics;
