import React, { useState, useEffect } from 'react';
import { BookListService } from '../../Services/BookListService';
import { Book, Layers, Calendar, FileText, Clock, DollarSign, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

const BookListViewer = () => {
  const [currentBooklists, setCurrentBooklists] = useState([]);
  const [previousClassBooklists, setPreviousClassBooklists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [expandedList, setExpandedList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const currentListsResponse = await BookListService.getCurrentClassBooklists();
        setCurrentBooklists(currentListsResponse.data || []);
        
        const previousClassesResponse = await BookListService.getPreviousClassesBooklists();
        setPreviousClassBooklists(previousClassesResponse.data || []);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to load booklists. Please try again later.');
        setLoading(false);
        console.error('Error fetching booklists:', err);
      }
    };

    fetchData();
  }, []);

  const toggleExpandList = (id) => {
    if (expandedList === id) {
      setExpandedList(null);
    } else {
      setExpandedList(id);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mx-3 sm:mx-6 my-4">
        <p className="text-sm sm:text-base">{error}</p>
      </div>
    );
  }

  const renderBooklistItems = (items) => {
    if (!items || !Array.isArray(items)) {
      return (
        <div className="mt-4 bg-gray-50 p-4 rounded-md text-gray-500 text-sm">
          No items available
        </div>
      );
    }

    // Mobile Card View
    const MobileView = () => (
      <div className="mt-4 space-y-3 sm:hidden">
        {items.map((item) => (
          <div key={item.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm truncate">{item.name || 'Unnamed Item'}</h4>
                {item.description && (
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
              <div className="ml-2 flex-shrink-0">
                {item.is_required ? 
                  <Check className="text-green-500" size={16} /> : 
                  <X className="text-red-500" size={16} />
                }
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
              <div>
                <span className="block text-gray-400">Price</span>
                <span className="font-medium">{formatCurrency(item.price)}</span>
              </div>
              <div>
                <span className="block text-gray-400">Qty</span>
                <span className="font-medium">{item.quantity || 0}</span>
              </div>
              <div>
                <span className="block text-gray-400">Total</span>
                <span className="font-medium text-gray-900">{formatCurrency((item.price || 0) * (item.quantity || 0))}</span>
              </div>
            </div>
          </div>
        ))}
        <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-200">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Amount:</span>
            <span className="font-bold text-lg text-indigo-700">
              {formatCurrency(items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0))}
            </span>
          </div>
        </div>
      </div>
    );

    // Desktop Table View
    const DesktopView = () => (
      <div className="mt-4 hidden sm:block overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{item.name || 'Unnamed Item'}</div>
                    {item.description && <div className="text-sm text-gray-500 mt-1">{item.description}</div>}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatCurrency(item.price)}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{item.quantity || 0}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {formatCurrency((item.price || 0) * (item.quantity || 0))}
                  </td>
                  <td className="px-4 py-3">
                    {item.is_required ? 
                      <Check className="text-green-500" size={18} /> : 
                      <X className="text-red-500" size={18} />
                    }
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50">
              <tr>
                <td colSpan="3" className="px-4 py-3 text-right text-sm font-medium text-gray-500">Total:</td>
                <td className="px-4 py-3 text-sm font-bold text-gray-900">
                  {formatCurrency(items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0))}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    );

    return (
      <>
        <MobileView />
        <DesktopView />
      </>
    );
  };

  const renderBooklists = (lists) => {
    if (!lists || !Array.isArray(lists) || lists.length === 0) {
      return (
        <div className="text-center py-8 text-gray-500">
          <Book size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No booklists available.</p>
        </div>
      );
    }

    return lists.map((list) => (
      <div key={list.id} className="bg-white rounded-lg border border-gray-200 mb-4 overflow-hidden shadow-sm">
        <div 
          className="px-4 sm:px-6 py-4 cursor-pointer flex justify-between items-center hover:bg-gray-50 transition-colors" 
          onClick={() => toggleExpandList(list.id)}
        >
          <div className="flex items-center min-w-0 flex-1">
            <div className={`p-2 rounded-lg mr-3 sm:mr-4 flex-shrink-0 ${
              activeTab === 'current' ? 'bg-emerald-100 text-emerald-600' : 'bg-indigo-100 text-indigo-600'
            }`}>
              <Book size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                {list.title || 'Untitled Booklist'}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-500 mt-1 space-y-1 sm:space-y-0 sm:space-x-4">
                <span className="flex items-center">
                  <Calendar className="mr-1 flex-shrink-0" size={14} />
                  <span className="truncate">{list.academic_year || 'No academic year'}</span>
                </span>
                <span className="flex items-center">
                  <FileText className="mr-1 flex-shrink-0" size={14} />
                  <span className="truncate">Class {list.class_name_display || list.class_name || 'N/A'}</span>
                </span>
                {list.publish_date && (
                  <span className="flex items-center">
                    <Clock className="mr-1 flex-shrink-0" size={14} />
                    <span className="truncate">Published: {new Date(list.publish_date).toLocaleDateString()}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center flex-shrink-0 ml-3">
            <div className="text-sm sm:text-lg mr-2 sm:mr-4 flex items-center">
              <DollarSign size={14} className="text-green-600 mr-1" />
              <span className="font-medium text-green-700">
                {formatCurrency(list.calculated_total_price || list.total_price)}
              </span>
            </div>
            {expandedList === list.id ? (
              <ChevronUp className="text-gray-400" size={20} />
            ) : (
              <ChevronDown className="text-gray-400" size={20} />
            )}
          </div>
        </div>
        {expandedList === list.id && (
          <div className="border-t border-gray-200 px-4 sm:px-6 py-4 bg-gray-50">
            {list.description && (
              <div className="mb-4 text-sm sm:text-base text-gray-600">
                {list.description}
              </div>
            )}
            {renderBooklistItems(list.items)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="flex-1 overflow-auto p-3 sm:p-6 bg-gray-50">
      <div className="mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Book Lists</h2>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          {activeTab === 'current' 
            ? 'Required books and materials for your current class' 
            : 'Booklists from your previous classes'}
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-4 sm:mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`flex items-center px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              activeTab === 'current' 
                ? 'border-b-2 border-emerald-500 text-emerald-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('current')}
          >
            <Book className="mr-2" size={18} />
            Current Book Lists
          </button>
          <button
            className={`flex items-center px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap flex-shrink-0 ${
              activeTab === 'previous' 
                ? 'border-b-2 border-indigo-500 text-indigo-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('previous')}
          >
            <Layers className="mr-2" size={18} />
            Previous Classes
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === 'current' && (
            <>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Current Class Booklists</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  These are the required books and materials for your current class in the current academic year.
                </p>
              </div>
              {renderBooklists(currentBooklists)}
            </>
          )}
          
          {activeTab === 'previous' && (
            <>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Previous Classes Booklists</h3>
                <p className="text-xs sm:text-sm text-gray-500">
                  These are booklists from classes you were in before your current class.
                </p>
              </div>
              {renderBooklists(previousClassBooklists)}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookListViewer;