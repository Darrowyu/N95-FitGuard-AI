import React, { useRef, useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CameraViewProps {
  onCapture: (imageSrc: string) => void;
  onError: () => void;
  onUpload: () => void;
  lang: Language;
}

export const CameraView: React.FC<CameraViewProps> = ({ onCapture, onError, onUpload, lang }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreamReady, setIsStreamReady] = useState(false);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      try {
        // Request camera with preference for front-facing, but let OS decide best resolution
        // This prevents forcing landscape on portrait phones which can cause off-center cropping
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'user'
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setIsStreamReady(true);
            videoRef.current?.play();
          };
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        onError();
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onError]);

  const capture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Match canvas size to video stream size
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Mirror the capture to match the preview (WYSIWYG)
        // Translate to the right edge
        ctx.translate(canvas.width, 0);
        // Flip horizontally
        ctx.scale(-1, 1);
        // Draw image
        ctx.drawImage(video, 0, 0);
        
        const imageSrc = canvas.toDataURL('image/jpeg', 0.85);
        onCapture(imageSrc);
      }
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* 
        Video Element:
        - object-cover: Fills the screen, cropping edges if necessary
        - object-center: Ensures cropping happens equally from center (keeps face in middle)
        - scale-x-[-1]: Mirrors the preview for natural selfie feel
        - transform-origin-center: Ensures flip happens around center axis
      */}
      <video 
        ref={videoRef}
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover object-center transform scale-x-[-1] origin-center"
      />
      <canvas ref={canvasRef} className="hidden" />
      
      {/* AR Overlay Guide */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 opacity-80">
         {/* Face Guide SVG */}
         <svg viewBox="0 0 200 250" className="w-64 h-80 md:w-80 md:h-96 text-white/50 border-2 border-dashed border-white/30 rounded-full shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-pulse">
            <ellipse cx="100" cy="125" rx="70" ry="90" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M100 125 L100 160" stroke="currentColor" strokeWidth="2" />
            <path d="M80 180 Q100 200 120 180" stroke="currentColor" strokeWidth="2" />
         </svg>
         
         {/* Scan Line Effect */}
         <div className="scan-line"></div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 w-full flex flex-col items-center gap-6 z-20">
        <div className="bg-black/60 text-white px-6 py-3 rounded-full text-sm backdrop-blur-md flex flex-col items-center text-center border border-white/10 shadow-xl">
           <span className="font-semibold text-base">{t.alignFace}</span>
           <span className="text-xs text-teal-200 mt-1">{t.alignHint}</span>
        </div>
        
        <div className="flex items-center gap-10">
          {/* Spacer */}
          <div className="w-12"></div>

          {/* Shutter Button */}
          <button
            onClick={capture}
            disabled={!isStreamReady}
            className={`relative w-20 h-20 rounded-full border-4 border-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 ${isStreamReady ? 'cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'opacity-50 cursor-not-allowed'}`}
          >
             <div className={`w-16 h-16 rounded-full transition-colors duration-300 ${isStreamReady ? 'bg-teal-500 hover:bg-teal-400' : 'bg-gray-500'}`}></div>
          </button>

          {/* Upload Button */}
          <button
            onClick={onUpload}
            className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center hover:bg-black/60 transition-all border border-white/20 text-white active:scale-90"
            title={t.uploadPhoto}
          >
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
             </svg>
          </button>
        </div>
      </div>
    </div>
  );
};