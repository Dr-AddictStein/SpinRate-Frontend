import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, XCircle, MoreVertical, Check, X, Trash2, Gift, User, Calendar, Mail, Phone, Award, UserPlus, Eye } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useTranslation } from '../../hooks/useTranslation';

const DashboardCustomers = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation();
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [showEnrichModal, setShowEnrichModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [enrichData, setEnrichData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    address: ''
  });
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const fetchCustomers = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://spin-rate-backend.vercel.app/api/customer/getCustomerByUserId/${user?.user?._id}`);

      if (response.data && response.data.customers) {
        setCustomers(response.data.customers);
      } else {
        setError('No customers found');
        toast.error('No customers found');
      }
    } catch (err) {
      console.error('Error fetching customers:', err);
      setError('Failed to load customer data');
      toast.error('Failed to load customer data');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (user?.user?._id) {
      fetchCustomers();
    }
  }, [user?.user?._id]);

  // Format date to DD-MM-YYYY
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
  };

  // Toggle action menu
  const toggleMenu = (customerId, e) => {
    e.stopPropagation(); // Prevent event bubbling

    if (activeMenu === customerId) {
      setActiveMenu(null);
    } else {
      const rect = e.currentTarget.getBoundingClientRect();
      // Adjust position for mobile
      const isMobile = window.innerWidth < 640;
      setMenuPosition({
        top: rect.bottom + window.scrollY + 5,
        left: isMobile ? 
          Math.min(rect.left + window.scrollX - 80, window.innerWidth - 160) : 
          rect.left + window.scrollX - 120, // Offset to position menu better
      });
      setActiveMenu(customerId);
    }
  };

  // Mark prize as taken
  const handleMarkPrizeAsTaken = async (customerId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    try {
      // API call
      await axios.put(`https://spin-rate-backend.vercel.app/api/customer/updateStatus/${customerId}`);
      
      // Refresh customer data
      fetchCustomers();
      toast.success('Prize marked as taken');
      setActiveMenu(null);
    } catch (err) {
      console.error('Error updating status:', err);
      toast.error('Failed to update status');
    }
  };

  // Open enrich modal
  const handleOpenEnrichModal = (customer, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setCurrentCustomer(customer);
    
    // Pre-fill form if customer already has enriched data
    setEnrichData({
      firstName: customer.firstName || '',
      lastName: customer.lastName || '',
      birthdate: customer.birthDate || '',
      address: customer.address || ''
    });
    
    setShowEnrichModal(true);
    setActiveMenu(null);
  };

  // Open details modal
  const handleViewDetails = (customer, e) => {
    e.stopPropagation(); // Prevent event bubbling
    setCurrentCustomer(customer);
    setShowDetailsModal(true);
    setActiveMenu(null);
  };

  // Handle enrich form input changes
  const handleEnrichInputChange = (e) => {
    const { name, value } = e.target;
    setEnrichData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit enrich data
  const handleEnrichSubmit = async (e) => {
    e.preventDefault();
    try {
      // API call
      await axios.put(`https://spin-rate-backend.vercel.app/api/customer/enrichCustomer/${currentCustomer._id}`, {
        firstName: enrichData.firstName,
        lastName: enrichData.lastName,
        birthDate: enrichData.birthdate,
        address: enrichData.address
      });

      // Refresh data
      fetchCustomers();
      toast.success('Customer information enriched successfully');
      setShowEnrichModal(false);
    } catch (err) {
      console.error('Error enriching customer:', err);
      toast.error('Failed to enrich customer information');
    }
  };

  // Delete customer
  const handleDeleteCustomer = async (customerId, e) => {
    e.stopPropagation(); // Prevent event bubbling
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        // API call
        await axios.delete(`https://spin-rate-backend.vercel.app/api/customer/delete/${customerId}`);

        // Refresh data
        fetchCustomers();
        toast.success('Customer deleted successfully');
        setActiveMenu(null);
      } catch (err) {
        console.error('Error deleting customer:', err);
        toast.error('Failed to delete customer');
      }
    }
  };

  // Filter customers based on search
  const filteredCustomers = customers.filter(customer =>
    customer.email.toLowerCase().includes(searchEmail.toLowerCase()) && customer.phone.includes(searchPhone)
  );

  // Calculate pagination
  const indexOfLastCustomer = currentPage * rowsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - rowsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);

  // Handle CSV export
  const handleExportCSV = () => {
    const csvContent = [
      ['ID', 'User ID', 'Wheel ID', 'Email', 'Phone', 'Prize', 'Status', 'Enriched', 'Created At', 'Updated At', 'Address', 'Birth Date', 'First Name', 'Last Name'],
      ...customers.map(customer => [
        customer._id,
        customer.userId,
        customer.wheelId,
        customer.email,
        customer.phone,
        customer.prize,
        customer.status ? 'Taken' : 'Pending',
        customer.enriched ? 'Yes' : 'No',
        formatDate(customer.createdAt),
        formatDate(customer.updatedAt),
        customer.address,
        formatDate(customer.birthDate),
        customer.firstName,
        customer.lastName
      ])
    ].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'customers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 md:h-16 md:w-16 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg md:text-xl font-medium text-gray-700">{t('loading')}</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow-md" role="alert">
          <div className="flex items-center">
            <X className="h-5 w-5 md:h-6 md:w-6 mr-2 md:mr-3" />
            <p className="text-sm sm:text-base"><strong className="font-bold">{t('errorMessage')} </strong> {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-full mx-auto py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{t('customerManagement')}</h1>
              <p className="mt-1 text-xs sm:text-sm text-gray-500">{t('manageParticipants')}</p>
            </div>
            <div className="bg-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center">
              <span className="text-sm text-gray-700 font-medium mb-2 sm:mb-0 sm:mr-4">{t('totalCustomers')}: <span className="text-indigo-600 font-bold">{customers.length}</span></span>
              <button
                onClick={handleExportCSV}
                className="w-full sm:w-auto inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {t('exportToCSV')}
              </button>
            </div>
          </div>
        </div>

        {/* Search Inputs */}
        <div className="flex flex-col sm:flex-row gap-2 sm:space-x-4 mb-4">
          <input
            type="text"
            placeholder={t('searchByEmail')}
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <input
            type="text"
            placeholder={t('searchByPhone')}
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            className="w-full sm:w-auto border border-gray-300 rounded-md shadow-sm py-2 px-3 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-2 sm:gap-0">
          <div className="flex items-center space-x-2">
            <span className="text-sm">{t('rowsPerPage')}:</span>
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              {[10, 20, 50].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2 justify-end">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 focus:outline-none disabled:opacity-50"
            >
              {t('previous')}
            </button>
            <span className="text-xs sm:text-sm">{t('page')} {currentPage} {t('of')} {totalPages}</span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="text-xs sm:text-sm text-gray-500 hover:text-indigo-600 focus:outline-none disabled:opacity-50"
            >
              {t('next')}
            </button>
          </div>
        </div>

        {/* Customer Table */}
        {currentCustomers.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 text-center mt-4">
            <div className="flex flex-col items-center justify-center py-8 sm:py-12">
              <User className="h-12 w-12 sm:h-16 sm:w-16 text-gray-300 mb-4" />
              <h3 className="text-lg sm:text-xl font-medium text-gray-900">{t('noCustomersFound')}</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-500">{t('noCustomerData')}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{t('date')}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{t('email')}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{t('phone')}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center space-x-1">
                        <Award className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>{t('prize')}</span>
                      </div>
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t('enriched')}</th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-4 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCustomers.map((customer) => (
                    <tr key={customer._id} className="bg-white">
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900">{formatDate(customer.createdAt)}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{customer.email}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-600">{customer.phone}</td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs sm:text-sm leading-5 font-medium rounded-full bg-indigo-100 text-indigo-800">
                          {customer.prize.length > 10 ? `${customer.prize.substring(0, 10)}...` : customer.prize}
                        </span>
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        {customer.status ? (
                          <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="text-green-500 h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" /> <span className="hidden xs:inline">{t('taken')}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            <XCircle className="text-yellow-500 h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" /> <span className="hidden xs:inline">{t('pending')}</span>
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
                        {customer.enriched ? (
                          <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="text-green-500 h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" /> <span className="hidden xs:inline">{t('yes')}</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-1.5 sm:px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            <XCircle className="text-gray-500 h-3 w-3 sm:h-4 sm:w-4 mr-0.5 sm:mr-1" /> <span className="hidden xs:inline">{t('no')}</span>
                          </span>
                        )}
                      </td>
                      <td className="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={(e) => toggleMenu(customer._id, e)}
                          className="text-gray-500 hover:text-indigo-600 focus:outline-none"
                        >
                          <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Floating Menu - Positioned outside the table */}
        {activeMenu && (
          <div
            className="fixed z-50 w-40 sm:w-48 bg-white rounded-md shadow-lg border border-gray-200"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-1">
              {customers.find(c => c._id === activeMenu)?.status === false && (
                <button
                  onClick={(e) => handleMarkPrizeAsTaken(activeMenu, e)}
                  className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center"
                >
                  <Gift className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  {t('markPrizeAsTaken')}
                </button>
              )}
              
              {/* View Details option - always visible */}
              <button
                onClick={(e) => handleViewDetails(customers.find(c => c._id === activeMenu), e)}
                className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center"
              >
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                {t('viewDetails')}
              </button>
              
              {/* Enrich Client option - always visible, changes to "Update Client" if already enriched */}
              <button
                onClick={(e) => handleOpenEnrichModal(customers.find(c => c._id === activeMenu), e)}
                className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 flex items-center"
              >
                {customers.find(c => c._id === activeMenu)?.enriched ? (
                  <>
                    <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    {t('updateClientInfo')}
                  </>
                ) : (
                  <>
                    <UserPlus className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                    {t('enrichClient')}
                  </>
                )}
              </button>
              
              <button
                onClick={(e) => handleDeleteCustomer(activeMenu, e)}
                className="w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 flex items-center"
              >
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                {t('delete')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Enrich Customer Modal */}
      {showEnrichModal && currentCustomer && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-indigo-600 px-4 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base sm:text-lg font-medium text-white">
                  {currentCustomer.enriched ? t('updateCustomerInfo') : t('enrichCustomerInfo')}
                </h3>
                <button
                  onClick={() => setShowEnrichModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-4 p-3 bg-indigo-50 rounded-md">
                <p className="text-xs sm:text-sm text-indigo-800">
                  <span className="font-medium">{t('email')}:</span> {currentCustomer.email}
                </p>
                <p className="text-xs sm:text-sm text-indigo-800">
                  <span className="font-medium">{t('phone')}:</span> {currentCustomer.phone}
                </p>
                <p className="text-xs sm:text-sm text-indigo-800">
                  <span className="font-medium">{t('prize')}:</span> {currentCustomer.prize}
                </p>
              </div>

              <form onSubmit={handleEnrichSubmit}>
                <div className="space-y-3 sm:space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-xs sm:text-sm font-medium text-gray-700">{t('firstName')}</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={enrichData.firstName}
                        onChange={handleEnrichInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-xs sm:text-sm font-medium text-gray-700">{t('lastName')}</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={enrichData.lastName}
                        onChange={handleEnrichInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="birthdate" className="block text-xs sm:text-sm font-medium text-gray-700">{t('birthdate')}</label>
                    <input
                      type="date"
                      id="birthdate"
                      name="birthdate"
                      value={enrichData.birthdate}
                      onChange={handleEnrichInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-xs sm:text-sm font-medium text-gray-700">{t('address')}</label>
                    <textarea
                      id="address"
                      name="address"
                      value={enrichData.address}
                      onChange={handleEnrichInputChange}
                      rows="3"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 sm:py-2 px-2 sm:px-3 text-xs sm:text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    ></textarea>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 flex justify-end space-x-2 sm:space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowEnrichModal(false)}
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {currentCustomer.enriched ? t('updateInformation') : t('saveInformation')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Customer Details Modal */}
      {showDetailsModal && currentCustomer && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-white">{t('viewDetails')}</h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-white hover:text-gray-200"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 space-y-4">
                {/* Contact Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">{t('contactInformation')}</h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{t('email')}</p>
                      <p className="text-sm font-medium">{currentCustomer.email}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{t('phone')}</p>
                      <p className="text-sm font-medium">{currentCustomer.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Prize Information */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">{t('prizeInformation')}</h4>
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{t('prize')}</p>
                      <p className="text-sm font-medium">{currentCustomer.prize}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{t('status')}</p>
                      <p className="inline-flex items-center text-sm font-medium">
                        {currentCustomer.status ? (
                          <span className="inline-flex items-center text-green-600">
                            <CheckCircle className="h-4 w-4 mr-1" /> {t('taken')}
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-yellow-600">
                            <XCircle className="h-4 w-4 mr-1" /> {t('pending')}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Personal Information - only shown if enriched */}
                {currentCustomer.enriched && (
                  <div>
                    <h4 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">{t('personalInformation')}</h4>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">{t('firstName')}</p>
                        <p className="text-sm font-medium">{currentCustomer.firstName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-gray-500">{t('lastName')}</p>
                        <p className="text-sm font-medium">{currentCustomer.lastName}</p>
                      </div>
                    </div>
                    <div className="space-y-1 mb-2">
                      <p className="text-xs text-gray-500">{t('birthdate')}</p>
                      <p className="text-sm font-medium">{formatDate(currentCustomer.birthDate)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{t('address')}</p>
                      <p className="text-sm font-medium">{currentCustomer.address}</p>
                    </div>
                  </div>
                )}

                {/* Dates */}
                <div>
                  <h4 className="text-md font-semibold text-gray-800 mb-2 border-b pb-1">{t('dates')}</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{t('created')}</p>
                      <p className="text-sm font-medium">{formatDate(currentCustomer.createdAt)}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs text-gray-500">{t('lastUpdated')}</p>
                      <p className="text-sm font-medium">{formatDate(currentCustomer.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowDetailsModal(false)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {t('close')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardCustomers;
