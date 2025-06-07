import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, BookOpen, TrendingUp, Award, AlertTriangle, FileText } from 'lucide-react';
import { studentResultsService } from '../../Services/student-results-service';
import { getCurrentUser } from '../../Services/studentApi';

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
            We couldn't load your results at this time. Please try again later.
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

const StudentResults = () => {
  // State management
  const [activeTab, setActiveTab] = useState('current');
  const [currentResults, setCurrentResults] = useState([]);
  const [previousResults, setPreviousResults] = useState([]);
  const [loading, setLoading] = useState({
    current: false,
    previous: false,
  });
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    class_name: ''
  });
  
  // Filter states
  const [currentTerm, setCurrentTerm] = useState('');
  const [previousClass, setPreviousClass] = useState('');
  const [previousTerm, setPreviousTerm] = useState('');
  
  // Term options
  const termOptions = [
    { value: 'first', label: 'First Term' },
    { value: 'second', label: 'Second Term' },
    { value: 'third', label: 'Third Term' },
  ];

  // Class options
  const classOptions = [
    { value: 'Creche', label: 'Creche' },
    { value: 'Nursery', label: 'Nursery' },
    { value: 'KG 1', label: 'KG 1' },
    { value: 'KG 2', label: 'KG 2' },
    { value: 'Class 1', label: 'Class 1' },
    { value: 'Class 2', label: 'Class 2' },
    { value: 'Class 3', label: 'Class 3' },
    { value: 'Class 4', label: 'Class 4' },
    { value: 'Class 5', label: 'Class 5' },
    { value: 'Class 6', label: 'Class 6' },
    { value: 'JHS 1', label: 'JHS 1' },
    { value: 'JHS 2', label: 'JHS 2' },
    { value: 'JHS 3', label: 'JHS 3' },
  ];

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          setUserData({
            class_name: user.class_name || ''
          });
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to fetch user data');
      }
    };
    
    fetchUserData();
  }, []);

  // Fetch current class results when term changes
  useEffect(() => {
    if (currentTerm && userData.class_name) {
      fetchCurrentResults();
    }
  }, [currentTerm, userData.class_name]);

  // Fetch previous class results when class or term changes
  useEffect(() => {
    if (previousClass && previousTerm) {
      fetchPreviousResults();
    }
  }, [previousClass, previousTerm]);

  // Fetch current class results
  const fetchCurrentResults = async () => {
    if (!currentTerm || !userData.class_name) return;
    
    setLoading(prev => ({ ...prev, current: true }));
    setError(null);
    
    try {
      const results = await studentResultsService.getCurrentClassResults({ 
        class_name: userData.class_name,
        term: currentTerm
      });
      setCurrentResults(Array.isArray(results) ? results : []);
    } catch (err) {
      setError('Failed to fetch current class results');
      console.error('Error fetching current results:', err);
      setCurrentResults([]);
    } finally {
      setLoading(prev => ({ ...prev, current: false }));
    }
  };

  // Fetch previous class results
  const fetchPreviousResults = async () => {
    if (!previousClass || !previousTerm) return;
    
    setLoading(prev => ({ ...prev, previous: true }));
    setError(null);
    
    try {
      const results = await studentResultsService.getPreviousClassResults({
        class_name: previousClass,
        term: previousTerm,
      });
      setPreviousResults(Array.isArray(results) ? results : []);
    } catch (err) {
      setError('Failed to fetch previous class results');
      console.error('Error fetching previous results:', err);
      setPreviousResults([]);
    } finally {
      setLoading(prev => ({ ...prev, previous: false }));
    }
  };

  // Handle current term change - Triggers auto-loading via useEffect
  const handleCurrentTermChange = (term) => {
    setCurrentTerm(term);
  };

  // Handle previous class change
  const handlePreviousClassChange = (className) => {
    setPreviousClass(className);
    // Reset term when class changes
    setPreviousTerm('');
    setPreviousResults([]);
  };

  // Handle previous term change - Triggers auto-loading via useEffect
  const handlePreviousTermChange = (term) => {
    setPreviousTerm(term);
  };

  // Handle tab change
  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  // Calculate overall performance (placeholder implementation)
  const calculateOverallPerformance = (results) => {
    // Sample calculation logic - replace with actual implementation
    const allScores = results.flatMap(result => 
      result.course_results?.map(course => course.total_score || 0) || []
    );
    
    const average = allScores.length 
      ? allScores.reduce((sum, score) => sum + score, 0) / allScores.length 
      : 0;
      
    // Simple grade calculation - replace with actual logic
    let grade = 'N/A';
    if (average >= 80) grade = 'A';
    else if (average >= 70) grade = 'B';
    else if (average >= 60) grade = 'C';
    else if (average >= 50) grade = 'D';
    else if (average > 0) grade = 'F';
    
    return {
      average,
      grade,
      totalSubjects: allScores.length
    };
  };

  // Get subject name safely with fallback
  const getSubjectName = (course) => {
    if (!course) return 'Unknown Subject';
    if (!course.class_course) return course.subject_name || 'Unknown Subject';
    if (!course.class_course.course) return course.class_course.name || course.course_name || 'Unknown Subject';
    
    return course.class_course.course.name || 'Unknown Subject';
  };

  // Render results table
  const renderResultsTable = (results) => {
    if (!results || results.length === 0) return null;

    // Flatten all course results from all result records
    const allCourseResults = results.flatMap(result => 
      result.course_results?.map(course => ({
        ...course,
        class_name: result.class_name,
        term: result.term,
        published_date: result.published_date,
        status: result.status
      })) || []
    );

    if (allCourseResults.length === 0) return null;

    return (
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class Score
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Exam Score
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Score
              </th>
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
              
              <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Remarks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {allCourseResults.map((course, index) => (
              <tr key={course.id || `course-${index}`} className="hover:bg-gray-50 transition-colors">
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 text-indigo-500 mr-2 flex-shrink-0" />
                    <div className="text-sm font-medium text-gray-900 break-words">
                      {getSubjectName(course)}
                    </div>
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.class_score || 0}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {course.exam_score || 0}
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold text-indigo-700">
                    {studentResultsService.formatScore(course.total_score || 0)}
                  </div>
                </td>
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <Badge 
                    variant="secondary"
                    className={`${studentResultsService.getGradeColor(course.grade)} font-semibold text-xs`}
                  >
                    {course.grade || 'N/A'}
                  </Badge>
                </td>
                
                <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                  <Badge className={`${studentResultsService.getStatusColor(course.status)} uppercase text-xs`}>
                    {course.remarks || 'Unknown'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Render loading table skeleton
  const renderTableLoadingSkeleton = () => (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Subject
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Class Score
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Exam Score
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Total Score
            </th>
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Grade
            </th>
            
            <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {[1, 2, 3, 4, 5].map((i) => (
            <tr key={i}>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-4 mr-2" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-8" />
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-12" />
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-6 w-8" />
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-4 w-16" />
              </td>
              <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                <Skeleton className="h-6 w-16" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render empty state - Made responsive
  const renderEmptyState = (type, className, term) => (
    <div className="text-center py-8 sm:py-12 bg-white rounded-xl border border-gray-100 shadow-sm px-4">
      {type === 'current' ? (
        <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-200 mx-auto mb-4" />
      ) : (
        <Calendar className="h-12 w-12 sm:h-16 sm:w-16 text-indigo-200 mx-auto mb-4" />
      )}
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
        {type === 'current' ? 'No Results Found' : 'No Historical Results'}
      </h3>
      <p className="text-gray-600 max-w-sm mx-auto text-sm sm:text-base">
        {type === 'current' 
          ? currentTerm 
            ? 'No results available for your current class in this term.' 
            : 'Please select a term to view results.'
          : previousClass && previousTerm 
            ? 'No results found for this class and term.' 
            : 'Please select both class and term to view results.'}
      </p>
    </div>
  );

  // Render performance summary card - Made responsive
  const renderPerformanceSummary = (results, isHistorical = false) => {
    if (!results || results.length === 0) return null;
    
    const performance = calculateOverallPerformance(results);
    
    return (
      <Card className="border border-gray-100 shadow-sm bg-gradient-to-r from-indigo-50 to-purple-50 mb-6">
        <CardHeader className="pb-3 px-3 sm:px-6">
          <CardTitle className="flex items-center gap-2 text-indigo-700 text-base sm:text-lg">
            <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
            <span className="break-words">
              {isHistorical ? "Historical Performance Summary" : "Performance Summary"}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-3 sm:px-6">
          <div className="grid grid-cols-1 xs:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="p-2 sm:p-0">
              <div className="text-2xl sm:text-3xl font-bold text-indigo-600">
                {studentResultsService.formatScore(performance.average)}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                {isHistorical ? "Historical Average" : "Overall Average"}
              </div>
            </div>
            <div className="p-2 sm:p-0">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
                {performance.grade}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">
                {isHistorical ? "Historical Grade" : "Overall Grade"}
              </div>
            </div>
            <div className="p-2 sm:p-0">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600">
                {performance.totalSubjects}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 mt-1">Total Subjects</div>
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
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 break-words">Academic Results</h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">View your current and previous academic performance</p>
          </div>
          {userData.class_name && (
            <Badge variant="outline" className="text-indigo-700 border-indigo-200 bg-indigo-50 px-2 sm:px-3 py-1 text-xs sm:text-sm self-start sm:self-auto flex-shrink-0">
              Current Class: {userData.class_name}
            </Badge>
          )}
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
              <Award className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="break-words text-center leading-tight">Current Class Results</span>
            </TabsTrigger>
            <TabsTrigger 
              value="previous" 
              className="flex items-center justify-center gap-1 sm:gap-2 rounded-md data-[state=active]:bg-white data-[state=active]:text-indigo-700 data-[state=active]:shadow-sm text-xs sm:text-sm py-2 px-1 sm:px-2"
            >
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span className="break-words text-center leading-tight">Previous Classes Results</span>
            </TabsTrigger>
          </TabsList>

          {/* Current Class Results Tab */}
          <TabsContent value="current">
            <Card className="border border-gray-100 shadow-sm">
              <CardHeader className="pb-3 border-b border-gray-100 px-3 sm:px-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 lg:gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg text-indigo-700 flex items-center gap-2 break-words">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      Current Class Results
                    </CardTitle>
                    <CardDescription className="text-sm mt-1 break-words">
                      View your results for {userData.class_name || 'your current academic class'}
                    </CardDescription>
                  </div>
                  <div className="flex-shrink-0">
                    <Select value={currentTerm} onValueChange={handleCurrentTermChange}>
                      <SelectTrigger className="w-full sm:w-40 border-gray-200 focus:ring-indigo-500 text-sm ">
                        <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent>
                        {termOptions.map((term) => (
                          <SelectItem  key={term.value} value={term.value} className="text-sm bg-white">
                            {term.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                {loading.current ? (
                  renderTableLoadingSkeleton()
                ) : currentResults && currentResults.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {renderPerformanceSummary(currentResults)}
                    {renderResultsTable(currentResults)}
                  </div>
                ) : (
                  renderEmptyState('current', null, currentTerm)
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Previous Classes Results Tab */}
          <TabsContent value="previous">
            <Card className="border border-gray-100 shadow-sm">
              <CardHeader className="pb-3 border-b border-gray-100 px-3 sm:px-6">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-3 lg:gap-4">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-base sm:text-lg text-indigo-700 flex items-center gap-2 break-words">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                      Previous Classes Results
                    </CardTitle>
                    <CardDescription className="text-sm mt-1">
                      View your historical academic performance
                    </CardDescription>
                  </div>
                  <div className="flex flex-col xs:flex-row gap-2 flex-shrink-0">
                    <Select  value={previousClass} onValueChange={handlePreviousClassChange}>
                      <SelectTrigger className="w-full xs:w-32 sm:w-40 border-gray-200 focus:ring-indigo-500 text-sm bg-white">
                        <SelectValue placeholder="Select Class" />
                      </SelectTrigger>
                      <SelectContent>
                        {classOptions.map((cls) => (
                          <SelectItem key={cls.value} value={cls.value} className="text-sm bg-white">
                            {cls.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select 
                      value={previousTerm} 
                      onValueChange={handlePreviousTermChange}
                      disabled={!previousClass}
                    >
                      <SelectTrigger className="w-full xs:w-32 sm:w-40 border-gray-200 focus:ring-indigo-500 text-sm bg-white">
                        <SelectValue placeholder="Select Term" />
                      </SelectTrigger>
                      <SelectContent className='bg-white'>
                        {termOptions.map((term) => (
                          <SelectItem key={term.value} value={term.value} className="text-sm bg-white">
                            {term.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
                {loading.previous ? (
                  renderTableLoadingSkeleton()
                ) : previousResults && previousResults.length > 0 ? (
                  <div className="space-y-4 sm:space-y-6">
                    {renderPerformanceSummary(previousResults, true)}
                    {renderResultsTable(previousResults)}
                  </div>
                ) : (
                  renderEmptyState('previous', previousClass, previousTerm)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </ErrorBoundary>
  );
};

export default StudentResults;