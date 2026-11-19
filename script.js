
function convertToSpeech() {

    // Get the text entered by the user
    let text = document.getElementById("textInput").value;

    // Check if the text box is empty
    if (text.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    // Create a speech object
    let speech = new SpeechSynthesisUtterance(text);

    // Set voice properties
    speech.lang = "en-US";
    speech.rate = 1;
    speech.pitch = 1;

    // Stop any previous speech
    window.speechSynthesis.cancel();

    // Speak the entered text
    window.speechSynthesis.speak(speech);
}



// Speech-to-Text using the browser microphone

function stopSpeech() {
    window.speechSynthesis.cancel();
}

// Store the speech recognition object
let recognition = null;
let isRecording = false;

// START RECORDING
function startRecording() {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
        alert("Please use Google Chrome for Speech-to-Text.");
        return;
    }

    recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = true;
    recognition.interimResults = true;

    const status = document.getElementById("recordingStatus");
    const output = document.getElementById("speechOutput");
    const startButton = document.getElementById("recordButton");
    const stopButton = document.getElementById("stopRecordButton");

    output.value = "";

    recognition.onstart = function() {
        isRecording = true;
        status.innerText = "Recording... Speak now!";
        startButton.disabled = true;
        stopButton.disabled = false;
    };

    recognition.onresult = function(event) {
        let transcript = "";

        for (let i = 0; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        output.value = transcript;
    };

    recognition.onerror = function(event) {
        status.innerText = "Error: " + event.error;
    };

    recognition.onend = function() {
        isRecording = false;
        startButton.disabled = false;
        stopButton.disabled = true;

        if (status.innerText === "Recording... Speak now!" ||
            status.innerText === "Stopping recording...") {
            status.innerText = "Recording stopped.";
        }
    };

    try {
        recognition.start();
    } catch (error) {
        status.innerText = "Unable to start recording.";
        startButton.disabled = false;
        stopButton.disabled = true;
    }
}

// STOP RECORDING
function stopRecording() {

    if (recognition && isRecording) {
        recognition.stop();

        document.getElementById("recordingStatus").innerText =
            "Stopping recording...";
    }
}




