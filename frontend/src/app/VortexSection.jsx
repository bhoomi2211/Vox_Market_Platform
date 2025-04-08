import { Vortex } from '@/components/ui/vortex'
import Link from 'next/link'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import React from 'react'

const VortexSection = () => {

    //   const {
    //     transcript,
    //     resetTranscript,
    //     interpretVoiceCommand,
    //     fillInputUsingVoice,
    //     performActionUsingVoice,
    //     finalTranscript,
    //     voiceResponse,
    //     voices,
    //     triggerModal,
    //     checkExistenceInTranscript
    //   } = useVoiceContext();

  return (
    <div className="w-[calc(100%-4rem)] mx-auto rounded-md h-screen overflow-hidden">
      <Vortex
        backgroundColor="black"
        rangeY={500}
        particleCount={200}
        baseHue={120}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          Shop Smarter with Your Voice
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-2xl mt-6 text-center">
          Experience the future of shopping with VOX Market. Browse, search, and buy products 
          using just your voice. It's shopping reimagined for the digital age.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <button
            onClick={() => {
                SpeechRecognition.startListening();
            }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-200 rounded-lg text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
            </svg>
            Try Voice Shopping
          </button>
          <Link href="/productView" className="px-6 py-3 text-white border border-white/30 rounded-lg hover:bg-white/10 transition duration-200">
            Browse Products
          </Link>
        </div>
        <p className="text-gray-400 text-sm mt-6">
          Tap the Mic and Say "Hello" to get Started
        </p>
      </Vortex>
    </div>
  )
}

export default VortexSection