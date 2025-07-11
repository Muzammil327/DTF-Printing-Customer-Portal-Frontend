
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Package, Palette, Shield, Clock, Star, ArrowRight, Sparkles } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Easy Upload",
      description: "Drag and drop your TIFF/PNG files with automatic quality validation and instant price calculation.",
      color: "from-blue-500 to-blue-600",
      delay: "0ms"
    },
    {
      icon: Package,
      title: "Order Tracking",
      description: "Real-time updates on your orders from review to printing to shipping, all in one dashboard.",
      color: "from-green-500 to-green-600",
      delay: "100ms"
    },
    {
      icon: Palette,
      title: "Quality Control",
      description: "Professional review of every design with automated DPI and dimension checking for perfect prints.",
      color: "from-purple-500 to-purple-600",
      delay: "200ms"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Multiple payment options with secure processing and detailed invoice history for your records.",
      color: "from-orange-500 to-orange-600",
      delay: "300ms"
    },
    {
      icon: Clock,
      title: "Fast Turnaround",
      description: "Quick processing times with transparent timelines and delivery estimates for every order.",
      color: "from-red-500 to-red-600",
      delay: "400ms"
    },
    {
      icon: Star,
      title: "Expert Support",
      description: "Professional printing experts available to help optimize your designs and answer questions.",
      color: "from-yellow-500 to-yellow-600",
      delay: "500ms"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-modern">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3 slide-in-left">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-modern">
                <span className="text-white font-bold text-xl">D</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                DTF Print Hub
              </span>
            </div>
            <div className="flex items-center space-x-4 slide-in-right">
              <Link to="/login">
                <Button variant="ghost" className="text-slate-600 hover:text-slate-900 btn-modern">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button className="gradient-primary text-white shadow-modern btn-modern">
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2 icon-bounce" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-2 mb-8 shadow-modern">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">Professional DTF Printing Platform</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-transparent">
                Professional DTF Printing
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Made Simple
              </span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Upload your designs, place orders, and track everything in one place. 
              Our self-service portal makes professional DTF printing effortless with real-time updates and quality control.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link to="/register">
                <Button size="lg" className="gradient-primary text-white px-10 py-4 text-lg shadow-modern-lg btn-modern scale-in">
                  Start Printing Today
                  <ArrowRight className="h-5 w-5 ml-2 icon-bounce" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-10 py-4 text-lg bg-white/80 backdrop-blur-sm border-white/30 hover:bg-white/90 scale-in" style={{animationDelay: '200ms'}}>
                  Sign In to Portal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-up">
            <h2 className="text-4xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Everything You Need for DTF Printing
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              From artwork upload to order tracking, our platform handles every step 
              of your DTF printing workflow with professional precision.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="card-modern card-hover group fade-in-up" 
                  style={{animationDelay: feature.delay}}
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-modern group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-4">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="fade-in-up">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Next Print Project?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Join hundreds of satisfied customers who trust us with their DTF printing needs. 
              Experience professional quality with modern convenience.
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary" className="px-10 py-4 text-lg bg-white text-slate-900 hover:bg-white/90 shadow-modern-lg btn-modern scale-in">
                Create Your Account
                <ArrowRight className="h-5 w-5 ml-2 icon-bounce" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0 slide-in-left">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-modern">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <span className="text-xl font-bold">DTF Print Hub</span>
            </div>
            <p className="text-slate-400 text-center md:text-right slide-in-right">
              © 2024 DTF Print Hub. Professional printing solutions with modern technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
