import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, BookOpen, TrendingUp, Award, AlertTriangle, FileText, Book, DollarSign, Check, X, Layers } from 'lucide-react';
import { BookListService } from '../../Services/BookListService';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in component:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 flex flex-col items-center justify-center text-center">
          <AlertTriangle className="h-16 w-16 text-amber-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">
            We couldn't load your book lists at this time. Please try again later.
          </p>
          <pre className="bg-gray-100 p-4 rounded text-xs text-left overflow-auto max-w-full mb-4">
            {this.state.error && this.state.error.toString()}
          </pre>
          <button 
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const BookListViewer = () => {
  // State management
  const [activeTab, setActiveTab] = useState('current');
  const [currentBooklists, setCurrentBooklists] = useState([]);
  const [previousClassBooklists, setPreviousClassBooklists] = useState([]);
  const [loading, setLoading] = useState({
    current: false,
    previous: false,
  });
  const [error, setError] = useState(null);

  // Load data on component mount
  useEffect(() => {
    fetchCurrentBooklists();
    fetchPreviousClassBooklists();
  }, []);

  // Fetch current class booklists
  const fetchCurrentBooklists = async () => {
    setLoading(prev => ({ ...prev, current: true }));
    setError(null);
    
    try {
      const response = await BookListService.getCurrentClassBooklists();
      setCurrentBooklists(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch current class book lists');
      console.error('Error fetching current booklists:', err);
      setCurrentBooklists([]);
    } finally {
      setLoading(prev => ({ ...prev, current: false }));
    }
  };

  // Fetch previous class booklists
  const fetchPreviousClassBooklists = async () => {
    setLoading(prev => ({ ...prev, previous: true }));
    setError(null);
    
    try {
      const response = await BookListService.getPreviousClassesBooklists();
      setPreviousClassBooklists(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch previous class book lists');
      console.error('Error fetching previous booklists:', err);
      setPreviousClassBooklists([]);
    } finally {
      setLoading(prev => ({ ...prev, previous: false }));
    }
  };

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount || 0);
  };

  // Calculate overall statistics (placeholder implementation)
  const calculateOverallStatistics = (booklists) => {
    const totalLists = booklists.length;
    const totalItems = booklists.reduce((sum, list) => sum + (list.items?.length || 0), 0);
    const totalCost = booklists.reduce((sum, list) => sum + (list.calculated_total_price || list.total_price || 0), 0);
    
    return {
      totalLists,
      totalItems,
      totalCost
    };
  };

  // Render booklist card - Made fully responsive
  const renderBooklistCard = (booklist) => {
    if (!booklist) return null;
    
    return (
      <Card key={booklist.id} className="mb-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="pb-3 px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base sm:text-lg font-semibold break-words">
                {booklist.title || 'Untitled Booklist'}
              </CardTitle>
              <CardDescription className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 mt-1 text-gray-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Academic Year: {booklist.academic_year || 'Not specified'}
                  </span>
                </div>
                <span className="hidden xs:inline text-gray-300">•</span>
                <div className="flex items-center gap-1">
                  <FileText className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span className="text-xs sm:text-sm">
                    Class: {booklist.class_name_display || booklist.class_name || 'N/A'}
                  </span>
                </div>
                {booklist.publish_date && (
                  <>
                    <span className="hidden xs:inline text-gray-300">•</span>
                    <span className="text-xs sm:text-sm">
                      Published: {new Date(booklist.publish_date).toLocaleDateString()}
                    </span>
                  </>
                )}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
              <Badge className="bg-green-100 text-green-800 uppercase text-xs px-2 sm:px-3 py-1">
                {formatCurrency(booklist.calculated_total_price || booklist.total_price || 0)}
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="space-y-4">
            {/* Description */}
            {booklist.description && (
              <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                {booklist.description}
              </div>
            )}

            {/* Book Items */}
            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2 text-indigo-700 text-sm sm:text-base">
                <BookOpen className="h-4 w-4 flex-shrink-0" />
                Book Items ({booklist.items?.length || 0})
              </h4>
              <div className="grid gap-2">
                {booklist.items && booklist.items.length > 0 ? (
                  booklist.items.map((item) => (
                    <div key={item.id || `item-${Math.random()}`} 
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors gap-2 sm:gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h5 className="font-medium text-sm sm:text-base break-words flex-1">
                            {item.name || 'Unnamed Item'}
                          </h5>
                          <div className="flex-shrink-0">
                            {item.is_required ? 
                              <Check className="text-green-500 h-4 w-4" /> : 
                              <X className="text-red-500 h-4 w-4" />
                            }
                          </div>
                        </div>
                        {item.description && (
                          <p className="text-xs sm:text-sm text-gray-600 mt-1 break-words">
                            {item.description}
                          </p>
                        )}
                        <div className="text-xs sm:text-sm text-gray-600 mt-1 flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2">
                          <span>Price: {formatCurrency(item.price || 0)}</span>
                          <span className="hidden xs:inline text-gray-300">•</span>
                          <span>Qty: {item.quantity || 0}</span>
                          <span className="hidden xs:inline text-gray-300">•</span>
                          <span className={item.is_required ? 'text-green-600 font-medium' : 'text-red-600'}>
                            {item.is_required ? 'Required' : 'Optional'}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end sm:flex-col sm:text-right gap-2 sm:gap-1">
                        <div className="font-bold text-lg sm:text-xl text-indigo-700">
                          {formatCurrency((item.price || 0) * (item.quantity || 0))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500 text-sm">
                    No items in this booklist
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render loading skeleton - Made responsive
  const renderLoadingSkeleton = () => (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <Card key={i} className="border border-gray-100 shadow-sm">
          <CardHeader className="px-3 sm:px-6">
            <Skeleton className="h-5 sm:h-6 w-32 sm:w-48" />
            <Skeleton className="h-3 sm:h-4 w-24 sm:w-32" />
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <div className="space-y-3">
              {[1, 2, 3].map((j) => (
                <div key={j} className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 bg-gray-50 rounded-lg gap-2 sm:gap-0">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-28 sm:w-32" />
                    <Skeleton className="h-3 w-20 sm:w-24" />
                  </div>
                  <div className="flex items-center justify-between sm:justify-end sm:flex-col gap-2 sm:gap-1">
                    <Skeleton className="h-5 sm:h-6 w-10 sm:w-12" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  // Render empty state - Made responsive
  const renderEmptyState = (type) => (
    <div className="text-center py-8 sm:py-12 bg-white rounded-xl border border-gray-100 shadow-sm px-4">
      {type === 'current' ? (
        <Book className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-200 mx-auto mb-4" />
      ) : (
        <Layers className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-200 mx-auto mb-4" />
      )}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
        {type === 'current' ? 'No Current Book Lists' : 'No Previous Book Lists'}
      </h3>
      <p className="text-gray-600 max-w-sm mx-auto text-sm sm:text-base">
        {type === 'current' 
          ? 'No book lists available for your current class.' 
          : 'No book lists found from your previous classes.'}
      </p>
    </div>
  );

  // Render statistics summary card - Made responsive
  const renderStatisticsSummary = (booklists, isHistorical = false) => {
    if (!booklists || booklists.length === 0) return null;
    
    const stats = calculateOverallStatistics(booklists);
    
    return (
      <Card className="border border-gray-100 shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50">
        <CardHeader className="pb-3 px-3 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-indigo-700 text-base sm:text-lg">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="break-words">
              {isHistorical ? "Historical Book Lists Summary" : "Book Lists Summary"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 text-center">
            
            <div className="p-2 sm:p-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
                {stats.totalItems}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Items</div>
            </div>
            <div className="p-2 sm:p-0">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600">
                {formatCurrency(stats.totalCost)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Cost</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <ErrorBoundary>
      <div className="space-y-4 sm:space-y-6 p-2 sm:p-4 lg:p-6">
        {/* Header - Made responsive */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">Book Lists</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">View your current and previous class book lists</p>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertDescription className="text-red-800 text-sm">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs - Made responsive */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4 sm:mb-6 bg-gray-100 p-1 rounded-lg h-auto">
            <TabsTrigger 
              value="current" 
              className="flex items-center justify-center gap-1 sm:gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              <Book className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="break-words text-center leading-tight">Current Book Lists</span>
            </TabsTrigger>
            <TabsTrigger 
              value="previous" 
              className="flex items-center justify-center gap-1 sm:gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              <Layers className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="break-words text-center leading-tight">Previous Classes Lists</span>
            </TabsTrigger>
          </TabsList>

          {/* Current Book Lists Tab */}
          <TabsContent value="current">
            <Card className="border border-gray-100 shadow-sm">
              <CardHeader className="pb-3 border-b border-gray-100 px-3 sm:px-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 lg:gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg text-indigo-700 flex items-center gap-2 break-words">
                      <Book className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      Current Class Book Lists
                    </CardTitle>
                    <CardDescription className="text-sm mt-1 break-words">
                      View book lists for your current academic class
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                {loading.current ? (
                  renderLoadingSkeleton()
                ) : currentBooklists && currentBooklists.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {renderStatisticsSummary(currentBooklists)}
                    <div className="space-y-4">
                      {currentBooklists.map(booklist => renderBooklistCard(booklist))}
                    </div>
                  </div>
                ) : (
                  renderEmptyState('current')
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Previous Classes Book Lists Tab */}
          <TabsContent value="previous">
            <Card className="border border-gray-100 shadow-sm">
              <CardHeader className="pb-3 border-b border-gray-100 px-3 sm:px-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 lg:gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg text-indigo-700 flex items-center gap-2 break-words">
                      <Layers className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      Previous Classes Book Lists
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      View your historical book lists from previous classes
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                {loading.previous ? (
                  renderLoadingSkeleton()
                ) : previousClassBooklists && previousClassBooklists.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {renderStatisticsSummary(previousClassBooklists, true)}
                    <div className="space-y-4">
                      {previousClassBooklists.map(booklist => renderBooklistCard(booklist))}
                    </div>
                  </div>
                ) : (
                  renderEmptyState('previous')
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default BookListViewer;