'use client';

import React, { useEffect, useState, useRef, RefObject } from 'react';
import Navbar from '../components/Navbar';

const Page = () => {
  let isRecording = false;
  let [responseToggle, setResponseToggle] = useState(true);
  let [apiCounter, setApiCounter] = useState(0);
  let [transcript, setTranscript] = useState('');
  let [response, setResponse] = useState('');
  const startButtonRef = useRef(null);
  const clearStorageButtonRef = useRef(null);
  const toggleResponseButtonRef = useRef(null);
  const circle1Ref = useRef(null);
  const circle2Ref = useRef(null);
  const transcriptRef = useRef(null);
  const responseRef = useRef(null);
  const hiddenTranscriptionRef = useRef(null);
  let socket: WebSocket | null = null;


  const navbarHeight = '70px';

  function toggleIsRecording() {
    isRecording = !isRecording;
  }


useEffect(() => {
  // Load stored transcript on page load
  const storedTranscript = localStorage.getItem('transcript');
  if (storedTranscript) {
    setTranscript(storedTranscript);
  }
}, []);

  useEffect(() => {
    // Save transcript to localStorage whenever it changes
    localStorage.setItem('transcript', transcript);
  }, [transcript]); // Triggered whenever transcript state changes

  const formatResponse = (responseText: string) => {
    // Define patterns to insert line breaks before
    const patterns = ["Name:", "Address:", "Reason for the call:", "Emergency status:", "Emergency department requested:", "Address/Location:"];

    // Replace patterns with themselves preceded by <br>, except for the first one
    let formattedResponse = responseText;
    patterns.forEach((pattern, index) => {
        if (index > 0) { // Skip the first pattern to avoid a leading <br>
            formattedResponse = formattedResponse.replace(pattern, `<br>${pattern}`);
        }
    });

    return formattedResponse;
  };

  let mediaRecorder: MediaRecorder;

  const manageWebSocketConnection = (shouldConnect: boolean) => {
    if (shouldConnect) {
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
          console.log({ stream });
          if (!MediaRecorder.isTypeSupported('audio/webm'))
            return alert('Browser not supported');
          mediaRecorder = new MediaRecorder(stream, {
            mimeType: 'audio/webm',
          });
          socket = new WebSocket('wss://api.deepgram.com/v1/listen?model=nova-2-general&language=en-US', [
            'token',
            '69bdc868a74205816a0617e7024be1fcb8ce3e95',
          ]);
          socket.onopen = () => {
            const connectionElement = document.querySelector('#connection');
            if (connectionElement) connectionElement.textContent = 'Connected';
            const circle2 = document.querySelector('#circle2');
            if (circle2) (circle2 as HTMLElement).style.backgroundColor = '#18E93E';
            console.log({ event: 'onopen' });
            mediaRecorder.addEventListener('dataavailable', async (event) => {
              if (event.data.size > 0 && socket && socket.readyState === WebSocket.OPEN) {
                socket.send(event.data);
              }
            });
            mediaRecorder.start(100);
          };
                  
          
          socket.onmessage = (message) => {
            
            try {
              const received = JSON.parse(message.data);
              if (received.channel && received.channel.alternatives && received.channel.alternatives.length > 0) {
                const transcript = received.channel.alternatives[0].transcript;
                if (transcript && received.is_final) {
                  console.log(transcript);
  
                  const now = new Date();
                  const year = now.getFullYear();
                  const month = String(now.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
                  const day = String(now.getDate()).padStart(2, '0');
                  const hour = String(now.getHours()).padStart(2, '0');
                  const minute = String(now.getMinutes()).padStart(2, '0');
                  const second = String(now.getSeconds()).padStart(2, '0');
                  const timestamp = `${year}/${month}/${day}/${hour}:${minute}:${second}`;

                  setTranscript(prevTranscript => prevTranscript + `${timestamp} > ${transcript}\n`);
                  
                  const existingTranscriptElement = document.querySelector('#transcript');
                  if (existingTranscriptElement) {
                    existingTranscriptElement.innerHTML += timestamp + '> ' + transcript + '<br>';
                  }
                  const hiddenTranscriptionElement = document.querySelector('#hiddenTranscription');
                  if (hiddenTranscriptionElement && existingTranscriptElement) {
                    hiddenTranscriptionElement.textContent = existingTranscriptElement.textContent ?? '';
                  }
                
                  const encodedTranscript = encodeURIComponent(document.querySelector('#transcript')?.textContent ?? '');
                  const url = `https://api.letssign.xyz/chat?prompt=${encodedTranscript}`;
                  
                  if (responseToggle) {
                  
                    const fetchAPI = (url: string) => {
                      fetch(url)
                        .then(response => {
                          if (!response.ok) {
                            throw new Error('Network response was not ok');
                          }
                          return response.text();
                        })
                        .then(data => {
                          console.log(data);
                          const responseElement = document.querySelector('#response');
                          if (responseElement) {
                            responseElement.textContent = data;
                          }
                        
                          apiCounter++;
                        })
                        .catch(error => {
                          console.error('There was a problem with your fetch operation:', error);
                        });
                    }

                    const fetchWithRateLimit = (url: string) => {
                      if (apiCounter >= 10) {
                        console.log('API rate limit reached. Setting cooldown to 2 seconds.');
                        setTimeout(() => {
                          fetchAPI(url);
                        }, 2000);
                      } else {
                        fetchAPI(url);
                      }
                    }

                    fetchWithRateLimit(url);
                  }
                }
              } else {
                console.log('Received message does not contain expected data.');
              }
            } catch (error) {
              console.error('Error processing message:', error);
            }
          };
          socket.onclose = () => {
            mediaRecorder.stop();
            console.log('WebSocket Disconnected');
            const connectionElement = document.querySelector('#connection');
            if (connectionElement) {
              connectionElement.textContent = 'Not Connected';
            }
          };
          socket.onerror = (error) => {
            console.error('WebSocket Error:', error);
          };
        }).catch(error => {
          console.error('Error getting user media:', error);
        });
      }
    } else {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
        socket = null;
        /*
        if (circle2) {
          circle2.style.backgroundColor = '#ff0000';
        }
        */
        console.log('WebSocket Disconnected');
        mediaRecorder.stop();
        console.log('MediaRecorder Stopped');
      }
    }
  };

  const handleStartButtonClick = () => {
    if (isRecording) {
      if (startButtonRef.current) {
        (startButtonRef.current! as HTMLElement).textContent = 'Start Voice Input';
        (startButtonRef.current as HTMLElement).style.backgroundColor = '#4CAF50';
        (startButtonRef.current as HTMLElement).style.color = '#ffffff';
        socket?.close();
        socket = null;
        console.log('WebSocket Disconnected');
        mediaRecorder.stop();
        console.log('MediaRecorder Stopped');
        isRecording = false;
        manageWebSocketConnection(isRecording);
      }
    } else {
      if (startButtonRef.current) {
        (startButtonRef.current as HTMLButtonElement).textContent = 'Stop Voice Input';
        (startButtonRef.current as HTMLButtonElement).style.backgroundColor = '#ff0000';
        (startButtonRef.current as HTMLButtonElement).style.color = '#ffffff';
        isRecording = true;
        manageWebSocketConnection(isRecording);
      }
    }

  };

  const handleClearStorageButtonClick = () => {
    localStorage.removeItem('transcript');
    localStorage.removeItem('response');
    setTranscript('');
    setResponse('');
    // Do we need more stuff...?
  };

  const handleToggleResponseButtonClick = () => {
    setResponseToggle(!responseToggle);
    // Update button text and styles...
  };

  const handleExportTranscriptButtonClick = () => {
    // Export transcript to a file...
    const blob = new Blob([transcript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <Navbar />
      <main className="flex w-full flex-col" style={{ backgroundColor: "rgb(238, 240, 241)", minHeight: `calc(100vh - ${navbarHeight})`, padding: "24px", overflow: "hidden" }}>
        <div className="flex w-full flex-1 justify-center gap-x-4">
          <div className="bg-white rounded-lg p-4 w-1/2 flex-1 border border-gray-300">
            <div className="left-block" id="container">
            <div className="button-container">
              <div className="sbtn flex justify-center items-center">
                <button className="btn circular-button bg-slate-500" id="startButton" ref={startButtonRef} onClick={handleStartButtonClick}>Start Voice Input</button>
              </div>
              <div className="button-row flex justify-center">
                <button className="csbtn rounded-outline-button" id="clearStorageButton" ref={clearStorageButtonRef} onClick={handleClearStorageButtonClick}>Clear Transcript</button>
                <button className="trbtn rounded-outline-button" id="toggleResponseButton" ref={toggleResponseButtonRef} onClick={handleToggleResponseButtonClick}>Toggle Response</button>
                <button className="etbtn rounded-outline-button" id="exportTranscriptButton" ref={transcriptRef} onClick={handleExportTranscriptButtonClick}>Export Transcript</button>
              </div>
            </div>
            </div>

            

            
          </div>
          <div className="bg-white rounded-lg p-4 w-1/2 flex flex-col border border-gray-300" style={{ minHeight: `calc(100vh - ${navbarHeight} - 48px)` }}>
            <div className="bg-white rounded-lg p-4 flex-grow border border-gray-300 mb-4" style={{ overflowY: 'auto' }}>
              <div className="transcription">
                <p>Transcription:</p>

                <p id="transcript">{transcript.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    
                    {index !== transcript.split('\n').length - 1 && <br />} {/* Render <br> except after the last line */}
                  </span>
                ))}</p>


              </div>
            </div>
            <div className="bg-white rounded-lg p-4 flex-grow border border-gray-300" style={{ overflowY: 'auto' }}>
              <div className="output" id="output"><p>Output:</p>
                <p id="response"></p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <style jsx>{`

        .button-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-bottom: 20px; /* Adjust spacing between the button groups */
        }

        .sbtn {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column; /* Added for better vertical alignment */
          margin-bottom: 20px; /* Adjust spacing between the circular button and smaller buttons */
        }
        
        .circular-button {
          width: 50vh;
          height: 50vh;
          background-color: #4CAF50;
          color: white;
          border: 4px solid #ccc;
          border-radius: 50%;
          font-size:calc(8px + 2.5vh);
          cursor: pointer;
          text-align: center;
          line-height: 100px; /* This aligns the text vertically */
        }

        .circular-button:hover {
          border-color: #007bff;
        }

        .rounded-outline-button {
          border-radius: 8px;
          border: 2px solid #ccc;
          padding: 8px 16px;
          margin: 4px;
          cursor: pointer;
          outline: none;
        }
        .rounded-outline-button:hover {
          border-color: #007bff;
        }
        .rounded-outline-button:focus {
          border-color: #0056b3;
        }
      `}</style>
    </>
  );
}

export default Page;