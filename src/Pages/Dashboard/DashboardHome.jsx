import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  TrendingUp, 
  Users, 
  Star, 
  Calendar, 
  ArrowUp, 
  ArrowDown, 
  MoreHorizontal, 
  ChevronRight,
  MessageSquare,
  Clock
} from 'lucide-react';

// Sample data for charts and stats
const statsData = [
  { 
    title: "Total Reviews", 
    value: "1,284", 
    change: "+12.5%", 
    isPositive: true,
    icon: Star,
    color: "blue" 
  },
  { 
    title: "Active Users", 
    value: "892", 
    change: "+8.2%", 
    isPositive: true,
    icon: Users,
    color: "indigo" 
  },
  { 
    title: "Conversion Rate", 
    value: "24.8%", 
    change: "+2.4%", 
    isPositive: true,
    icon: TrendingUp,
    color: "green" 
  },
  { 
    title: "Avg. Response", 
    value: "1.2 days", 
    change: "-0.3 days", 
    isPositive: true,
    icon: Clock,
    color: "purple" 
  }
];

const recentReviews = [
  { 
    id: 1, 
    name: "John Smith", 
    rating: 5, 
    comment: "Amazing service! The wheel spin was fun and I won a great discount.",
    time: "2 hours ago",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  { 
    id: 2, 
    name: "Sarah Johnson", 
    rating: 4, 
    comment: "Very good experience overall. Would recommend to others.",
    time: "5 hours ago",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  { 
    id: 3, 
    name: "Michael Brown", 
    rating: 5, 
    comment: "Excellent customer service and the rewards program is fantastic!",
    time: "Yesterday",
    avatar: "https://randomuser.me/api/portraits/men/86.jpg"
  }
];

const upcomingEvents = [
  {
    id: 1,
    title: "Marketing Campaign Launch",
    date: "June 15, 2023",
    time: "10:00 AM",
    type: "campaign"
  },
  {
    id: 2,
    title: "Team Meeting",
    date: "June 18, 2023",
    time: "2:30 PM",
    type: "meeting"
  },
  {
    id: 3,
    title: "Quarterly Review",
    date: "June 30, 2023",
    time: "11:00 AM",
    type: "review"
  }
];

// Chart data (mock)
const monthlyReviewsData = [
  { month: 'Jan', reviews: 65 },
  { month: 'Feb', reviews: 80 },
  { month: 'Mar', reviews: 75 },
  { month: 'Apr', reviews: 90 },
  { month: 'May', reviews: 110 },
  { month: 'Jun', reviews: 130 },
  { month: 'Jul', reviews: 125 },
];

// Components
const StatCard = ({ stat }) => {
  const { title, value, change, isPositive, icon: Icon, color } = stat;
  
  const getColorClasses = (color) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      indigo: "from-indigo-500 to-indigo-600",
      green: "from-green-500 to-green-600",
      purple: "from-purple-500 to-purple-600"
    };
    return colors[color] || "from-blue-500 to-blue-600";
  };
  
  const getBgColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-50",
      indigo: "bg-indigo-50",
      green: "bg-green-50",
      purple: "bg-purple-50"
    };
    return colors[color] || "bg-blue-50";
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 border border-gray-100"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
          <div className="flex items-center mt-2">
            <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center`}>
              {isPositive ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
              {change}
            </span>
            <span className="text-xs text-gray-500 ml-2">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-lg ${getBgColorClasses(color)}`}>
          <Icon className={`text-gradient bg-gradient-to-r ${getColorClasses(color)} bg-clip-text`} size={20} />
        </div>
      </div>
    </motion.div>
  );
};

const ReviewCard = ({ review, delay }) => {
  const { name, rating, comment, time, avatar } = review;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className="p-4 border-b border-gray-100 last:border-0"
    >
      <div className="flex items-start">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full mr-3" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-gray-800">{name}</h4>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <div className="flex my-1">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={14} 
                className={i < rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
              />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{comment}</p>
        </div>
      </div>
    </motion.div>
  );
};

const EventCard = ({ event, delay }) => {
  const { title, date, time, type } = event;
  
  const getEventColor = (type) => {
    switch(type) {
      case 'campaign': return 'bg-blue-100 text-blue-800';
      case 'meeting': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className="p-4 border-b border-gray-100 last:border-0"
    >
      <div className="flex items-center">
        <div className="mr-4">
          <div className="w-12 h-12 rounded-lg bg-gray-100 flex flex-col items-center justify-center">
            <span className="text-xs font-medium text-gray-500">{date.split(',')[0].split(' ')[0]}</span>
            <span className="text-lg font-bold text-gray-800">{date.split(',')[0].split(' ')[1]}</span>
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-gray-800">{title}</h4>
          <div className="flex items-center mt-1">
            <Clock size={14} className="text-gray-400 mr-1" />
            <span className="text-xs text-gray-500">{time}</span>
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getEventColor(type)}`}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const BarChartComponent = () => {
  const maxValue = Math.max(...monthlyReviewsData.map(d => d.reviews));
  
  return (
    <div className="mt-4 h-64 flex items-end justify-between">
      {monthlyReviewsData.map((data, index) => (
        <div key={index} className="flex flex-col items-center">
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: `${(data.reviews / maxValue) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-10 bg-gradient-to-t from-blue-500 to-indigo-600 rounded-t-lg"
          ></motion.div>
          <span className="text-xs text-gray-500 mt-2">{data.month}</span>
        </div>
      ))}
    </div>
  );
};

const DashboardHome = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="pb-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your business today.</p>
      </div>
      
      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      
      {/* Charts and activity section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 lg:col-span-2"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-800">Monthly Reviews</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-md font-medium">Monthly</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-50 rounded-md">Weekly</button>
            </div>
          </div>
          <BarChartComponent />
        </motion.div>
        
        {/* Activity */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="flex border-b border-gray-100">
            <button 
              className={`flex-1 py-4 text-sm font-medium ${activeTab === 'overview' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Recent Reviews
            </button>
            <button 
              className={`flex-1 py-4 text-sm font-medium ${activeTab === 'analytics' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('analytics')}
            >
              Upcoming Events
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {activeTab === 'overview' ? (
              <div>
                {recentReviews.map((review, index) => (
                  <ReviewCard key={review.id} review={review} delay={index} />
                ))}
                <div className="p-4 text-center">
                  <button className="text-sm text-blue-600 font-medium flex items-center justify-center mx-auto">
                    View all reviews <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {upcomingEvents.map((event, index) => (
                  <EventCard key={event.id} event={event} delay={index} />
                ))}
                <div className="p-4 text-center">
                  <button className="text-sm text-blue-600 font-medium flex items-center justify-center mx-auto">
                    View calendar <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardHome;
