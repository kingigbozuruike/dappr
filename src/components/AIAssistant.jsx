import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clothing from '../assets/clothing.png';
import hair from '../assets/hair.png';
import skincare from '../assets/skincare.png';
import makeup from '../assets/makeup.png';

const AIAssistant = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('initial'); // initial, category, input
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [showDrawingTool, setShowDrawingTool] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [canvasExpanded, setCanvasExpanded] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [isEraser, setIsEraser] = useState(false);
  const [designDescription, setDesignDescription] = useState('');
  const colorOptions = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const [isFaceIssue, setIsFaceIssue] = useState(null);
  const [showFaceScan, setShowFaceScan] = useState(false);
  const [skinAnalysis, setSkinAnalysis] = useState(null);
  const [stream, setStream] = useState(null);

  // Fake AI processing (since we're hardcoding responses)
  const processRequest = () => {
    let fakeRecommendations = [];
    
    switch (selectedCategory) {
      case 'clothing':
        fakeRecommendations = [
          { id: 1, name: 'Summer Dress', price: '$49.99', image: '../assets/products/product1.webp' },
          { id: 2, name: 'Casual Jeans', price: '$39.99', image: '../assets/products/product2.webp' },
          { id: 3, name: 'Elegant Blouse', price: '$29.99', image: '../assets/products/product3.webp' }
        ];
        break;
      case 'hair':
        fakeRecommendations = [
          { id: 4, name: 'Moisture Shampoo', price: '$12.99', image: '../assets/products/product4.jpg' },
          { id: 5, name: 'Repair Conditioner', price: '$14.99', image: '../assets/products/product5.webp' },
          { id: 6, name: 'Hair Mask', price: '$19.99', image: '../assets/products/product6.webp' }
        ];
        break;
      case 'skincare':
        fakeRecommendations = [
          { id: 7, name: 'Hydrating Serum', price: '$24.99', image: '../assets/products/product7.webp' },
          { id: 8, name: 'Facial Cleanser', price: '$18.99', image: '../assets/products/product8.webp' },
          { id: 9, name: 'Night Cream', price: '$34.99', image: '../assets/products/product9.jpg' }
        ];
        break;
      case 'makeup':
        fakeRecommendations = [
          { id: 10, name: 'Foundation', price: '$29.99', image: '../assets/products/product10.avif' },
          { id: 11, name: 'Eyeshadow Palette', price: '$39.99', image: '../assets/products/product11.jpg' },
          { id: 12, name: 'Lipstick Set', price: '$24.99', image: '../assets/products/product12.jpg' }
        ];
        break;
      default:
        break;
    }
    
    setRecommendations(fakeRecommendations);
    setStep('recommendations');
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      // Removed automatic processing - user now needs to click the button
    }
  };

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = isEraser ? '#FFFFFF' : selectedColor;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };
  
  // Handle canvas resize and setup
  useEffect(() => {
    if (showDrawingTool && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      // When toggling between sizes, preserve the drawing by copying to temp canvas
      if (canvas.width !== (canvasExpanded ? 500 : 350) || canvas.height !== (canvasExpanded ? 500 : 350)) {
        const tempCanvas = document.createElement('canvas');
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCanvas.width = canvas.width;
        tempCanvas.height = canvas.height;
        tempCtx.drawImage(canvas, 0, 0);
        
        canvas.width = canvasExpanded ? 500 : 350;
        canvas.height = canvasExpanded ? 500 : 350;
        
        // Clear and restore drawing, scaling if needed
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (tempCanvas.width > 0 && tempCanvas.height > 0) {
          ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        }
      }
      
      // Set up drawing styles
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';
      ctx.lineWidth = 3;
      ctx.strokeStyle = selectedColor;
    }
  }, [showDrawingTool, canvasExpanded, selectedColor]);

  const submitDrawing = () => {
    // Close the drawing tool first
    setShowDrawingTool(false);
    setCanvasExpanded(false);
    
    // Return to home page
    navigate('/');
    
    // Delay showing the notification so it appears after redirection
    setTimeout(() => {
      setShowSuccessNotification(true);
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowSuccessNotification(false);
      }, 3000);
    }, 100); // Small delay to ensure UI updates happen first
  };

  const handleStartCamera = () => {
    setShowCamera(true);
    setShowFaceScan(true);

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((mediaStream) => {
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          videoRef.current.play();
        }
      })
      .catch((error) => {
        console.error('Error accessing webcam:', error);
        setShowCamera(false);
        setShowFaceScan(false);
      });

    // Simulate face scan with a 10-second timer
    setTimeout(() => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      setShowCamera(false);
      setShowFaceScan(false);
      
      // Set fake skin analysis results
      setSkinAnalysis({
        skinType: "Combination",
        concerns: ["Mild dryness on cheeks", "Excess oil in T-zone", "Signs of early aging around eyes"],
        recommendation: "Your skin shows signs of dehydration in some areas while being oily in others. We recommend a balanced skincare routine with gentle cleansing and targeted hydration."
      });
      
      processRequest();
    }, 10000); // Extended to 10 seconds
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    
    switch (category) {
      case 'clothing':
        setStep('clothing');
        break;
      case 'hair':
        setStep('hair');
        break;
      case 'skincare':
        setStep('skincare');
        break;
      case 'makeup':
        setStep('makeup');
        break;
      default:
        setStep('initial');
    }
  };

  const handleSubmit = () => {
    if (userInput.trim() !== '') {
      processRequest();
    }
  };

  const resetAssistant = () => {
    setStep('initial');
    setSelectedCategory(null);
    setUserInput('');
    setShowDrawingTool(false);
    setShowCamera(false);
    setRecommendations([]);
    setUploadedImage(null);
    setIsFaceIssue(null);
    setShowFaceScan(false);
    setSkinAnalysis(null);
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <button onClick={goToHome} className="flex items-center text-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </button>
          <h1 className="text-2xl font-bold text-center flex-1">DapAI - Your Personal Stylist</h1>
          <div className="w-24"></div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4 max-w-5xl">
        {step === 'initial' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center">What are you shopping for today?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { id: 'clothing', name: 'Clothing', icon: clothing },
                { id: 'hair', name: 'Hair Products', icon: hair },
                { id: 'skincare', name: 'Skin Care', icon: skincare },
                { id: 'makeup', name: 'Makeup', icon: makeup }
              ].map((category) => (
                <button
                  key={category.id}
                  className="flex flex-col items-center p-6 border rounded-xl hover:bg-gray-50 hover:shadow-md transition duration-200 hover:cursor-pointer"
                  onClick={() => handleCategorySelect(category.id)}
                >
                  <img src={category.icon} alt={category.name} className="h-24 w-24 object-contain mb-4 rounded-xl" />
                  <span className="text-lg font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'clothing' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <button onClick={() => setStep('initial')} className="mb-6 flex items-center text-black hover:text-gray-400 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <h2 className="text-2xl font-semibold mb-6">Describe what you're looking for:</h2>
            <textarea
              className="w-full border rounded-lg p-4 mb-6 text-lg"
              rows="5"
              placeholder="Describe the clothing item you're looking for... (e.g., 'A blue summer dress with floral pattern')"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="bg-black text-white px-6 py-3 rounded-xl border border-gray-500 hover:bg-white hover:text-black transition duration-300 active:scale-95 cursor-pointer text-lg font-medium"
              >
                Find Recommendations
              </button>
            </div>
          </div>
        )}

        {showDrawingTool && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Design Your Own Clothing</h2>
              <button
                onClick={() => setStep('recommendations')}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="mb-6">
              <label htmlFor="designDescription" className="block text-lg font-medium mb-2">
                Describe your design:
              </label>
              <textarea
                id="designDescription"
                className="w-full border rounded-lg p-4 mb-2 text-lg"
                rows="3"
                placeholder="Add details about your design that may not be apparent from the drawing..."
                value={designDescription}
                onChange={(e) => setDesignDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-lg font-medium">Drawing Tools:</span>
                  <div className="flex space-x-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          setSelectedColor(color);
                          setIsEraser(false);
                        }}
                        className={`w-8 h-8 rounded-full ${selectedColor === color && !isEraser ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                        style={{ backgroundColor: color }}
                        title={color === '#000000' ? 'Black' : 
                               color === '#FF0000' ? 'Red' : 
                               color === '#00FF00' ? 'Green' : 
                               color === '#0000FF' ? 'Blue' : 
                               color === '#FFFF00' ? 'Yellow' : 
                               color === '#FF00FF' ? 'Pink' :
                               color === '#00FFFF' ? 'Cyan' : 'Orange'}
                      ></button>
                    ))}
                    <button
                      onClick={() => setIsEraser(true)}
                      className={`w-8 h-8 rounded-full border flex items-center justify-center bg-white ${isEraser ? 'ring-2 ring-offset-2 ring-black' : ''}`}
                      title="Eraser"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    const canvas = canvasRef.current;
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 px-4 rounded-md text-sm"
                >
                  Clear Canvas
                </button>
              </div>
              
              <div className="flex justify-center">
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={600}
                    className="bg-white cursor-crosshair touch-none"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                  ></canvas>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6">
              <button
                onClick={submitDrawing}
                className="bg-green-600 hover:bg-green-700 text-white py-3 px-8 rounded-lg text-lg font-medium"
              >
                Submit Design
              </button>
            </div>
          </div>
        )}

        {step === 'hair' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <button onClick={() => setStep('initial')} className="mb-6 flex items-center text-black hover:text-gray-400 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <h2 className="text-2xl font-semibold mb-6">Describe your hair concerns or upload a photo:</h2>
            <textarea
              className="w-full border rounded-lg p-4 mb-6 text-lg"
              rows="5"
              placeholder="Describe your hair issue or desired result..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
            
            {uploadedImage && (
              <div className="mb-6">
                <p className="text-lg font-medium mb-2">Uploaded image:</p>
                <img src={uploadedImage} alt="Uploaded" className="w-full max-h-80 object-contain rounded-lg border" />
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-lg font-medium"
              >
                Upload Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
              <button
                onClick={handleSubmit}
                className="bg-black text-white py-3 px-6 rounded-lg text-lg font-medium"
              >
                Get Recommendations
              </button>
            </div>
          </div>
        )}

        {step === 'skincare' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <button onClick={() => setStep('initial')} className="mb-6 flex items-center text-black hover:text-gray-400 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            
            {isFaceIssue === null && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-8">Is your skin care concern related to your face?</h2>
                <div className="flex justify-center space-x-6">
                  <button
                    onClick={() => setIsFaceIssue(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-xl text-lg font-medium"
                  >
                    Yes, it's facial
                  </button>
                  <button
                    onClick={() => setIsFaceIssue(false)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-12 py-4 rounded-xl text-lg font-medium"
                  >
                    No, it's not facial
                  </button>
                </div>
              </div>
            )}
            
            {isFaceIssue === true && !showFaceScan && !skinAnalysis && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-6">Face Analysis</h2>
                <p className="text-gray-600 mb-8">Our AI can analyze your facial skin and provide personalized recommendations.</p>
                <button
                  onClick={handleStartCamera}
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-xl text-lg font-medium mx-auto"
                >
                  Start Face Scan
                </button>
              </div>
            )}
            
            {showFaceScan && (
              <div className="text-center">
                <h2 className="text-2xl font-semibold mb-6">Scanning Your Face</h2>
                <div className="w-64 h-64 mx-auto bg-gray-800 rounded-full mb-6 relative flex items-center justify-center overflow-hidden">
                  <video ref={videoRef} className="w-full h-full rounded-full object-cover"></video>
                  {/* Scanning animation layer */}
                  <div className="absolute inset-0 pointer-events-none">
                    {/* Dotted scanning lines */}
                    <div className="absolute w-full h-4 top-1/4 flex justify-around animate-[scanDown_5s_linear_infinite]">
                      {Array(20).fill(0).map((_, i) => (
                        <div key={`dot-down-${i}`} className="w-1 h-1 rounded-full bg-green-400 opacity-80"></div>
                      ))}
                    </div>
                    <div className="absolute w-full h-4 top-3/4 flex justify-around animate-[scanUp_5s_linear_infinite]">
                      {Array(20).fill(0).map((_, i) => (
                        <div key={`dot-up-${i}`} className="w-1 h-1 rounded-full bg-green-400 opacity-80"></div>
                      ))}
                    </div>
                    
                    {/* Green dots */}
                    <div className="absolute w-2 h-2 rounded-full bg-green-500 left-1/4 animate-[scanVertical_3s_ease-in-out_infinite]"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-green-500 left-1/2 animate-[scanVertical_4s_ease-in-out_infinite_0.5s]"></div>
                    <div className="absolute w-2 h-2 rounded-full bg-green-500 left-3/4 animate-[scanVertical_3.5s_ease-in-out_infinite_1s]"></div>
                    
                    {/* Face outline */}
                    <div className="absolute w-48 h-56 border-2 border-dashed border-green-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
                </div>
                <p className="text-lg font-medium">Please keep your face centered and well-lit... <span className="animate-pulse">Scanning in progress</span></p>
                <div className="mt-4 w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full animate-[progress_10s_linear_1]"></div>
                </div>
              </div>
            )}
            
            {isFaceIssue === false && (
              <div>
                <h2 className="text-2xl font-semibold mb-6">Tell us about your skin concern:</h2>
                <textarea
                  className="w-full border rounded-lg p-4 mb-6 text-lg"
                  rows="5"
                  placeholder="Describe your skin concern or desired result..."
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                ></textarea>
                
                {uploadedImage && (
                  <div className="mb-6">
                    <p className="text-lg font-medium mb-2">Uploaded image:</p>
                    <img src={uploadedImage} alt="Uploaded" className="w-full max-h-80 object-contain rounded-lg border" />
                  </div>
                )}
                
                <div className="flex justify-between">
                  <button
                    onClick={() => fileInputRef.current.click()}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg text-lg font-medium"
                  >
                    Upload Photo
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                  />
                  <button
                    onClick={handleSubmit}
                    className="bg-black text-white py-3 px-6 rounded-lg text-lg font-medium"
                  >
                    Get Recommendations
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 'makeup' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <button onClick={() => setStep('initial')} className="mb-6 flex items-center text-black hover:text-gray-400 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            <h2 className="text-2xl font-semibold mb-6">Tell us about your makeup needs:</h2>
            <textarea
              className="w-full border rounded-lg p-4 mb-6 text-lg"
              rows="5"
              placeholder="Describe your makeup preferences, skin tone, or specific products you're looking for..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            ></textarea>
            
            {uploadedImage && (
              <div className="mb-6">
                <p className="text-lg font-medium mb-2">Uploaded image:</p>
                <img src={uploadedImage} alt="Uploaded" className="w-full max-h-80 object-contain rounded-lg border" />
              </div>
            )}
            
            <div className="flex justify-between">
              <button
                onClick={() => fileInputRef.current.click()}
                className="bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg text-lg font-medium"
              >
                Upload Photo
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileUpload}
              />
              <button
                onClick={handleSubmit}
                className="bg-black text-white py-3 px-6 rounded-lg text-lg font-medium"
              >
                Find Products
              </button>
            </div>
          </div>
        )}

        {step === 'recommendations' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <button onClick={() => setStep(selectedCategory)} className="mb-6 flex items-center text-black hover:text-gray-400 hover:cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back
            </button>
            
            {selectedCategory === 'skincare' && skinAnalysis && (
              <div className="mb-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h3 className="text-xl font-semibold text-blue-800 mb-4">Your Personalized Skin Analysis</h3>
                <div className="mb-3">
                  <p className="font-medium text-blue-700">Skin Type:</p>
                  <p className="text-gray-700">{skinAnalysis.skinType}</p>
                </div>
                <div className="mb-3">
                  <p className="font-medium text-blue-700">Detected Concerns:</p>
                  <ul className="list-disc pl-5 text-gray-700">
                    {skinAnalysis.concerns.map((concern, idx) => (
                      <li key={idx}>{concern}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-blue-700">Expert Recommendation:</p>
                  <p className="text-gray-700">{skinAnalysis.recommendation}</p>
                </div>
              </div>
            )}
            
            <h2 className="text-2xl font-semibold mb-6">Recommended Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {recommendations.map((product) => (
                <div key={product.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex">
                    <div className="w-32 h-32 bg-gray-100 rounded-lg overflow-hidden mr-4 flex-shrink-0">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-medium mb-2">{product.name}</h3>
                      <p className="text-blue-600 font-bold mb-3">{product.price}</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {selectedCategory === 'clothing' && (
              <div className="mt-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">Not what you're looking for?</h3>
                <p className="text-gray-600 mb-4">Suggest your dream clothing to our world-class designers!</p>
                <button
                  onClick={() => {
                    setShowDrawingTool(true);
                  }}
                  className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors text-lg font-medium"
                >
                  Design Your Own
                </button>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={resetAssistant}
                className="bg-gray-200 hover:bg-gray-300 py-3 px-6 rounded-lg text-gray-700 text-lg font-medium"
              >
                Start Over
              </button>
              <button
                onClick={goToHome}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-lg font-medium"
              >
                Return to Shop
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Success notification */}
      {showSuccessNotification && (
        <div className="fixed bottom-10 right-10 z-[9999] bg-green-500 text-white py-4 px-6 rounded-lg shadow-2xl flex items-center space-x-3 animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-lg font-medium">Design submitted successfully!</p>
            <p className="text-sm">Our designers will review your creation soon.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;