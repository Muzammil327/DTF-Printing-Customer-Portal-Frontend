'use client';

import { useState, useCallback } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, X, Image, AlertCircle, CheckCircle, DollarSign } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { calculatePriceForCustomer, getPricingTiersForCustomer } from "@/utils/pricing";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: "processing" | "ready" | "error";
  dimensions?: string;
  dpi?: number;
  quantity?: number;
  price?: number;
  error?: string;
}

const UploadArtwork = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock current customer ID - in real app, this would come from authentication
  const currentCustomerId = 1;
  const pricingTiers = getPricingTiersForCustomer(currentCustomerId);

  const processFile = (file: File): Promise<UploadedFile> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement('img');
        img.onload = () => {
          setTimeout(() => {
            const dpi = 300 + Math.floor(Math.random() * 100);
            const dimensions = `${img.width} x ${img.height}px`;
            const quantity = Math.floor(Math.random() * 500) + 50; // Mock quantity
            const price = calculatePriceForCustomer(currentCustomerId, quantity);
            
            resolve({
              id: Math.random().toString(36).substr(2, 9),
              file,
              preview: reader.result as string,
              status: dpi >= 300 ? "ready" : "error",
              dimensions,
              dpi,
              quantity,
              price,
              error: dpi < 300 ? "DPI too low for quality printing" : undefined,
            });
          }, 1000);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsProcessing(true);
    
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: "",
      status: "processing" as const,
    }));
    
    setUploadedFiles(prev => [...prev, ...newFiles]);

    for (let i = 0; i < acceptedFiles.length; i++) {
      const processedFile = await processFile(acceptedFiles[i]);
      setUploadedFiles(prev => 
        prev.map(f => f.file === acceptedFiles[i] ? processedFile : f)
      );
    }
    
    setIsProcessing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/tiff': ['.tiff', '.tif'],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
  };

  const totalPrice = uploadedFiles
    .filter(f => f.status === "ready")
    .reduce((sum, f) => sum + (f.price || 0), 0);

  const readyFiles = uploadedFiles.filter(f => f.status === "ready").length;

  return (
    <Layout userType="customer">
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Upload Artwork</h1>
          <p className="text-slate-600">
            Upload your TIFF or PNG files for DTF printing. We&apos;ll automatically check quality and calculate pricing.
          </p>
        </div>

        {/* Pricing Tiers Display */}
        <Card className="border-0 shadow-lg mb-8">
          <CardHeader>
            <CardTitle>Your Pricing Tiers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {pricingTiers.map((tier, index) => (
                <div key={index} className="text-center p-4 border border-slate-200 rounded-lg">
                  <div className="text-sm text-slate-600 mb-1">
                    {tier.minQuantity}
                    {tier.maxQuantity ? `-${tier.maxQuantity}` : '+'} units
                  </div>
                  <div className="text-xl font-bold text-slate-900">
                    ${tier.pricePerUnit.toFixed(2)}
                  </div>
                  <div className="text-xs text-slate-500">per unit</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upload Area */}
        <Card className="border-0 shadow-lg mb-8">
          <CardContent className="p-8">
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? "border-blue-400 bg-blue-50" 
                  : "border-slate-300 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="h-8 w-8 text-blue-600" />
              </div>
              {isDragActive ? (
                <p className="text-blue-600 font-medium">Drop files here...</p>
              ) : (
                <>
                  <p className="text-slate-900 font-medium mb-2">
                    Drag & drop files here, or click to browse
                  </p>
                  <p className="text-slate-500 text-sm">
                    Supports PNG and TIFF files up to 10MB each
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <Card className="border-0 shadow-lg mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Uploaded Files ({uploadedFiles.length})</span>
                {isProcessing && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    Processing...
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {uploadedFiles.map((uploadedFile) => (
                  <div
                    key={uploadedFile.id}
                    className="flex items-center space-x-4 p-4 rounded-lg border border-slate-200"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {uploadedFile.preview ? (
                        <img
                          src={uploadedFile.preview}
                          alt={uploadedFile.file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Image className="h-6 w-6 text-slate-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <p className="text-sm font-medium text-slate-900 truncate">
                          {uploadedFile.file.name}
                        </p>
                        {uploadedFile.status === "ready" && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        {uploadedFile.status === "error" && (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>{(uploadedFile.file.size / 1024 / 1024).toFixed(1)} MB</span>
                        {uploadedFile.dimensions && <span>{uploadedFile.dimensions}</span>}
                        {uploadedFile.dpi && (
                          <span className={uploadedFile.dpi >= 300 ? "text-green-600" : "text-red-600"}>
                            {uploadedFile.dpi} DPI
                          </span>
                        )}
                        {uploadedFile.quantity && (
                          <span className="text-blue-600">
                            Qty: {uploadedFile.quantity}
                          </span>
                        )}
                      </div>
                      {uploadedFile.error && (
                        <p className="text-xs text-red-600 mt-1">{uploadedFile.error}</p>
                      )}
                    </div>

                    {uploadedFile.price && uploadedFile.status === "ready" && (
                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          ${uploadedFile.price.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      {uploadedFile.status === "processing" && (
                        <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(uploadedFile.id)}
                        className="text-slate-400 hover:text-red-600"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Order Summary */}
        {readyFiles > 0 && (
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-green-600" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Ready files:</span>
                  <span className="font-medium">{readyFiles} files</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Processing fee:</span>
                  <span className="font-medium">$5.00</span>
                </div>
                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-slate-900">Total:</span>
                    <span className="text-xl font-bold text-slate-900">
                      ${(totalPrice + 5).toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                  Submit Order ({readyFiles} files)
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default UploadArtwork;
