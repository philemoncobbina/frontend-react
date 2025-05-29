import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applyToJob, fetchJobDetails } from '../../Services/jobService';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, CheckCircle2, AlertCircle, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ApplyToJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    educational_level: 'HIGH_SCHOOL',
    resume: null,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState('');
  const [job, setJob] = useState(null);
  const [jobLoading, setJobLoading] = useState(true);
  const [jobLoadError, setJobLoadError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Load job details on component mount
  useEffect(() => {
    const loadJob = async () => {
      try {
        const jobData = await fetchJobDetails(Number(jobId));
        setJob(jobData);
        if (!jobData) {
          setJobLoadError(true);
        }
      } catch (err) {
        setJobLoadError(true);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setJobLoading(false);
      }
    };
    loadJob();
  }, [jobId]);

  // Form field change handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, educational_level: value }));
  };

  // File handling functions
  const validateFile = (file) => {
    if (!file) return false;
    if (!file.type.includes('pdf')) {
      setFileError('Please upload only PDF files');
      return false;
    }
    if (file.size > 10 * 1024 * 1024) {
      setFileError('File size must be less than 10MB');
      return false;
    }
    return true;
  };

  const processFile = (file) => {
    if (!validateFile(file)) return;
    
    setFileError(null);
    setFormData(prev => ({ ...prev, resume: file }));
    setFileName(file.name);
    setFileSize(formatFileSize(file.size));
    
    // Clear resume-related error
    if (error === 'Please upload a resume.') setError(null);
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    processFile(e.dataTransfer.files[0]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Form submission and reset
  const clearForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      educational_level: 'HIGH_SCHOOL',
      resume: null,
    });
    setFileName('');
    setFileSize('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      setError('Please upload a resume.');
      return;
    }
  
    setLoading(true);
    setError(null);
  
    try {
      await applyToJob(Number(jobId), formData);
      clearForm();
      setShowSuccessModal(true);
    } catch (err) {
      setError(err?.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (jobLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // Show error UI if job doesn't load
  if (jobLoadError || !job) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-16 pt-24">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-4">
              <AlertTriangle className="h-16 w-16 text-orange-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              {!job ? "Job Not Found" : "Something Went Wrong"}
            </h1>
            <p className="text-gray-600 mb-6 max-w-lg mx-auto">
              {!job 
                ? "The job you're looking for is no longer available or may have been removed. Please check the URL or browse our other open positions."
                : "We're having trouble loading this job's details. This could be due to a server error or network issue."}
            </p>
            <button
              onClick={() => navigate('/careers')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Back to Job Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ marginTop: '4.4rem' }} className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Apply to Job</CardTitle>
            {job && (
              <CardDescription className="text-center">
                <span className="text-lg font-semibold text-slate-800">{job.title}</span>
                <div className="flex justify-center gap-x-6 mt-2 text-sm text-slate-600">
                  {job.reference_number && <span>Ref: {job.reference_number}</span>}
                  {job.location && <span>Location: {job.location}</span>}
                </div>
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2 ">
                <Label htmlFor="educational_level">Educational Level</Label>
                <Select className="space-y-2 "
                  value={formData.educational_level}
                  onValueChange={handleSelectChange}
                >
                  <SelectTrigger className="bg-white text-black">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent className="bg-white ">
                    <SelectItem value="HIGH_SCHOOL">High School</SelectItem>
                    <SelectItem value="ASSOCIATE">Associate Degree</SelectItem>
                    <SelectItem value="BACHELOR">Bachelor's Degree</SelectItem>
                    <SelectItem value="MASTER">Master's Degree</SelectItem>
                    <SelectItem value="PHD">PhD</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Resume</Label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors duration-200 ease-in-out ${
                    fileError ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-300'
                  }`}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <Upload className="h-12 w-12 text-slate-400" />
                    <div className="text-center">
                      <Label
                        htmlFor="resume"
                        className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        Upload a file
                        <input
                          id="resume"
                          name="resume"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="sr-only"
                        />
                      </Label>
                      <p className="text-sm text-slate-500">or drag and drop</p>
                      <p className="text-xs text-slate-500 mt-1">PDF only, up to 10MB</p>
                    </div>
                  </div>
                </div>

                {fileName && !fileError && (
                  <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <div className="flex-1 truncate">
                        <p className="text-sm font-medium text-slate-900">{fileName}</p>
                        <p className="text-xs text-slate-500">{fileSize}</p>
                      </div>
                    </div>
                  </div>
                )}

                {fileError && (
                  <Alert variant="destructive" className="mt-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{fileError}</AlertDescription>
                  </Alert>
                )}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
          <DialogContent className="border border-black bg-white text-black">
            <DialogHeader>
              <DialogTitle>Application Submitted Successfully!</DialogTitle>
              <DialogDescription>
                Thank you for your application. We will review it and get back to you soon.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setShowSuccessModal(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => navigate('/careers')}
              >
                View All Jobs
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ApplyToJob;