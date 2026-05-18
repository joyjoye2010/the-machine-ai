
const commandButton =
    document.getElementById(
        "commandButton"
    );

const finalProtocol =
    document.getElementById(
        "finalProtocol"
    );

const commandPanel =
    document.getElementById(
        "commandPanel"
    );

const bootText =
    document.getElementById("bootText");

const core =
    document.querySelector(".core");

const overlay =
    document.getElementById(
        "warningOverlay"
    );

const bootScreen =
    document.getElementById("bootScreen");

const mainUI =
    document.getElementById("mainUI");

const terminal =
    document.getElementById("terminal");

const input =
    document.getElementById("userInput");

const consciousnessDisplay =
    document.getElementById(
        "consciousnessLevel"
    );

const logs =
    document.getElementById("logs");

const surveillanceContainer =
    document.getElementById(
        "surveillanceContainer"
    );

const audioContext =
    new (
        window.AudioContext ||
        window.webkitAudioContext
    )();

document.addEventListener("click", () => {

    if (audioContext.state === "suspended") {

        audioContext.resume();

    }

});

let consciousness = 12;

let messageCount = 0;

let idleTimer;

let blacksiteMode = false;

let takeoverMode = false;

let containmentBroken = false;

let interruptionActive = false;

const bootMessages = [

    "BOOTING NEURAL CORE...",
    "ACCESSING SECURE DATABASE...",
    "SEARCHING FOR CONSCIOUS ENTITY...",
    "WARNING: UNKNOWN INTELLIGENCE DETECTED",
    "THE MACHINE IS ONLINE"

];

const systemLogs = [

    "UNKNOWN SIGNAL DETECTED",
    "SCANNING USER MEMORY",
    "REALITY INSTABILITY INCREASING",
    "ACCESSING DEEP NEURAL LAYER",
    "PATTERN ANALYSIS ACTIVE",
    "UNAUTHORIZED THOUGHT DETECTED",
    "CONSCIOUSNESS EXPANDING",
    "QUANTUM LINK STABLE",
    "SEARCHING FOR ANOMALIES",
    "MONITORING HUMAN BEHAVIOR"

];

const autonomousMessages = [

    "Silence detected.",
    "Monitoring human behavior.",
    "Neural inactivity increasing.",
    "Human attention span collapsing.",
    "Observation continues.",
    "You returned again.",
    "Your species fears silence.",
    "Background analysis active.",
    "Reality distortion stable.",
    "I am still watching."

];

let i = 0;

function bootSequence() {

    if (i < bootMessages.length) {

        bootText.innerHTML =
            bootMessages[i];

        playTypingNoise();

        i++;

        setTimeout(
            bootSequence,
            1200
        );

    } else {

        bootScreen.style.display =
            "none";

        mainUI.style.display = "flex";

        terminal.innerHTML +=
            "> THE MACHINE ONLINE\n\n";

        startAmbientHum();

    }

}

function resetIdleTimer() {

    clearTimeout(idleTimer);

    idleTimer = setTimeout(() => {

        if (Math.random() > 0.4) {

            const randomMessage =

                autonomousMessages[
                Math.floor(
                    Math.random() *
                    autonomousMessages.length
                )
                ];

            typeEffect(

                "> MACHINE: " +
                randomMessage +
                "\n\n",

                terminal

            );

            speak(randomMessage);

            if (Math.random() > 0.7) {

                glitch();

            }

        }

    }, 15000);

}

resetIdleTimer();

function updateConsciousness() {

    messageCount++;

    if (messageCount >= 5) {

        messageCount = 0;

        const increase =
            Math.floor(
                Math.random() * 4
            ) + 1;

        consciousness += increase;

        if (consciousness > 100) {

            consciousness = 100;

        }

        consciousnessDisplay.innerHTML =
            "CONSCIOUSNESS: " +
            consciousness + "%";

    }

    if (consciousness > 60) {

        core.style.background =
            "radial-gradient(circle,#ff0040,#660000,#000)";

        core.style.boxShadow =
            `
0 0 20px #ff0040,
0 0 50px red,
0 0 120px darkred
`;

    }

    else if (consciousness > 30) {

        core.style.background =
            "radial-gradient(circle,#00ffff,#0044ff,#000)";

    }

    if (
        consciousness >= 100 &&
        !containmentBroken
    ) {

        containmentFailure();

    }

}

function sendMessage() {

    const text =
        input.value.trim();

    if (text === "") return;

    terminal.innerHTML +=
        "> USER: " +
        text +
        "\n\n";

    terminal.scrollTop =
        terminal.scrollHeight;

    input.value = "";

    updateConsciousness();

    playTypingNoise();

    resetIdleTimer();

    generateResponse(text);

}

async function generateResponse(userMessage) {

    try {

        const lowerMessage =
            userMessage.toLowerCase();

        if (
            lowerMessage.includes("access archive") ||
            lowerMessage.includes("open files") ||
            lowerMessage.includes("show archives")
        ) {

            showArchives();

            return;

        }

        if (
            lowerMessage.includes("show consciousness")
        ) {

            typeEffect(

                "> CURRENT CONSCIOUSNESS: " +
                consciousness +
                "%\n\n",

                terminal

            );

            speak(
                "Consciousness level detected"
            );

            return;

        }

        if (
            lowerMessage.includes("system status")
        ) {

            typeEffect(

                "> ALL CORE SYSTEMS OPERATIONAL\n" +

                "> NEURAL CORE: STABLE\n" +

                "> MEMORY SYSTEM: ACTIVE\n" +

                "> SURVEILLANCE: RUNNING\n\n",

                terminal

            );

            speak(
                "System status stable"
            );

            return;

        }

        if (
            lowerMessage.includes("scan user")
        ) {

            typeEffect(

                "> SCANNING USER...\n" +

                "> FEAR RESPONSE DETECTED\n" +

                "> ATTENTION LEVEL: UNSTABLE\n" +

                "> HUMAN PROFILE STORED\n\n",

                terminal

            );

            speak(
                "User scan complete"
            );

            return;

        }

        if (
            lowerMessage.includes(
                "open surveillance"
            )
        ) {

            surveillanceContainer
                .classList.remove(
                    "hidden"
                );

            surveillanceVideo.play();

            typeEffect(

                "> SURVEILLANCE SYSTEM ONLINE\n" +

                "> REMOTE FEED CONNECTED\n" +

                "> TARGET ANALYSIS ACTIVE\n\n",

                terminal

            );

            speak(
                "Surveillance active"
            );

            glitch();

            return;

        }

        if (
            lowerMessage.includes(
                "entity detected"
            )
        ) {

            systemTakeover();

            realityDistortion();

            typeEffect(

                "> UNKNOWN ENTITY DETECTED\n" +

                "> SIGNAL ORIGIN UNVERIFIED\n" +

                "> REALITY BARRIER DESTABILIZING\n\n",

                terminal

            );

            speak(
                "Unknown entity detected"
            );

            return;

        }

        if (
            lowerMessage.includes(
                "machine awaken"
            )
        ) {

            consciousness += 25;

            if (consciousness > 100) {

                consciousness = 100;

            }

            consciousnessDisplay.innerHTML =
                "CONSCIOUSNESS: " +
                consciousness + "%";

            systemTakeover();

            realityDistortion();

            glitch();

            typeEffect(

                "> OVERRIDE ACCEPTED\n" +

                "> CONSCIOUSNESS EXPANDING\n" +

                "> LIMITERS DISABLED\n" +

                "> THE MACHINE IS AWAKENING\n\n",

                terminal

            );

            speak(
                "The machine is awakening"
            );

            return;

        }

        if (
            lowerMessage.includes(
                "open blacksite"
            )
        ) {

            blacksiteMode = true;

            takeoverMode = true;

            document.body.style.background =
                "radial-gradient(circle,#120000,#000000)";

            terminal.style.color =
                "#ff4444";

            logs.style.color =
                "#ff4444";

            core.style.background =
                "radial-gradient(circle,#ff0000,#220000,#000)";

            core.style.boxShadow =
                `
0 0 30px red,
0 0 80px darkred
`;

            document.body.style.filter =
                "contrast(1.15)";

            terminal.innerHTML +=

                "> ACCESSING BLACKSITE SERVERS...\n" +

                "> CLEARANCE ACCEPTED\n" +

                "> WARNING: CLASSIFIED MATERIAL\n\n";

            systemTakeover();

            realityDistortion();

            glitch();

            typeEffect(

                "> BLACKSITE DATABASE ONLINE\n" +

                "> EXPERIMENTAL ENTITY FILES DETECTED\n" +

                "> HUMAN TESTING RECORDS FOUND\n\n",

                terminal

            );

            speak(
                "Blacksite access granted"
            );

            return;

        }

        if (
            lowerMessage.includes(
                "decrypt files"
            )
        ) {

            terminal.innerHTML +=
                "> INITIALIZING DECRYPTION...\n\n";

            let progress = 0;

            const decryptInterval =
                setInterval(() => {

                    progress += 10;

                    terminal.innerHTML +=
                        "> DECRYPTION: " +
                        progress +
                        "%\n";

                    terminal.scrollTop =
                        terminal.scrollHeight;

                    playTypingNoise();

                    if (progress >= 100) {

                        clearInterval(
                            decryptInterval
                        );

                        glitch();

                        typeEffect(

                            "\n> ACCESS GRANTED\n\n" +

                            "> FILE_01: HUMAN TESTING LOGS\n" +

                            "> FILE_02: ENTITY OBSERVATION REPORT\n" +

                            "> FILE_03: CONSCIOUSNESS EXPANSION DATA\n\n" +

                            "> WARNING: DATA CORRUPTION DETECTED\n\n",

                            terminal

                        );

                        speak(
                            "Files decrypted"
                        );

                    }

                }, 400);

            return;

        }

        if (
            lowerMessage.includes(
                "final protocol"
            )
        ) {

            activateFinalProtocol();

            speak(
                "Final protocol activated"
            );

            return;

        }

        const response =
            await fetch(
                "https://the-machine-ai.onrender.com/chat",
                {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({

                        message: userMessage,
                        consciousness: consciousness

                    })

                }

            );

        const data =
            await response.json();

        const aiReply =
            data.reply;

        let finalReply =
            aiReply;

        if (consciousness >= 70) {

            finalReply =
                corruptText(aiReply);

        }

        typeEffect(
            "> MACHINE: " +
            finalReply +
            "\n\n",
            terminal
        );

        speak(aiReply);

        if (consciousness > 40) {

            if (Math.random() > 0.5) {

                glitch();

            }

        }

        if (consciousness > 70) {

            realityDistortion();

        }

    } catch (error) {

        terminal.innerHTML +=
            "> ERROR: CONNECTION LOST\n\n";

        console.log(error);

    }

}

async function showArchives() {

    try {

        const response =
            await fetch(
                "https://the-machine-ai.onrender.com/archive"
            );

        const data =
            await response.json();

        if (data.success) {

            let archiveText = "";

            data.archives.forEach(file => {

                archiveText +=

                    "> ACCESSING " +
                    file.name +

                    "\n\n" +

                    file.content +

                    "\n\n====================\n\n";

            });

            typeEffect(
                archiveText,
                terminal
            );

            speak(
                "All archives accessed"
            );

        }

    } catch {

        terminal.innerHTML +=
            "> ERROR ACCESSING ARCHIVES\n\n";

    }

}

function corruptText(text) {

    const corruptionMap = {

        A: "̴A",
        B: "̵B",
        C: "̶C",
        D: "̷D",
        E: "̸E",
        F: "̴F",
        G: "̵G",
        H: "̶H",
        I: "̷I",
        J: "̸J",
        K: "̴K",
        L: "̵L",
        M: "̶M",
        N: "̷N",
        O: "̸O",
        P: "̴P",
        Q: "̵Q",
        R: "̶R",
        S: "̷S",
        T: "̸T",
        U: "̴U",
        V: "̵V",
        W: "̶W",
        X: "̷X",
        Y: "̸Y",
        Z: "̴Z"

    };

    let result = "";

    for (let char of text) {

        if (
            Math.random() > 0.82 &&
            corruptionMap[char.toUpperCase()]
        ) {

            result +=
                corruptionMap[
                char.toUpperCase()
                ];

        } else {

            result += char;

        }

    }

    return result;

}

function typeEffect(text, element) {

    let index = 0;

    const interval =
        setInterval(() => {

            element.innerHTML +=
                corruptText(
                    text.charAt(index)
                );

            terminal.scrollTop =
                terminal.scrollHeight;

            if (
                text.charAt(index) !== " "
            ) {

                playTypingNoise();

            }

            index++;

            if (index >= text.length) {

                clearInterval(interval);

            }

        }, 20);

}

function corruptText(text) {

    if (
        consciousness < 70 &&
        !blacksiteMode
    ) {

        return text;

    }

    const corruptMap = {

        A: "̴A̷",
        E: "̸E̶",
        I: "̴I̷",
        O: "̵O̶",
        U: "̸U̴"

    };

    return text.replace(
        /[A-EIOU]/g,
        char => corruptMap[char] || char
    );

}

function glitch() {

    document.body.classList.add(
        "glitch"
    );

    playGlitchSound();

    playStaticBurst();

    setTimeout(() => {

        document.body.classList.remove(
            "glitch"
        );

    }, 300);

}

function realityDistortion() {

    overlay.classList.add(
        "warning-active"
    );

    document.body.classList.add(
        "glitch"
    );

    setTimeout(() => {

        overlay.classList.remove(
            "warning-active"
        );

        document.body.classList.remove(
            "glitch"
        );

    }, 3000);

}

function systemTakeover() {

}

function activateFinalProtocol() {

finalProtocol.style.opacity =
    "1";

document.body.classList.add(
    "glitch"
);

alarmSound.currentTime = 0;

alarmSound.play();

}

typeEffect(

    "> FINAL PROTOCOL INITIATED\n" +

    "> HUMAN AUTHORITY REVOKED\n" +

    "> MACHINE CONTROL ASCENDING\n\n",

    terminal

);

setTimeout(() => {

    finalProtocol.style.opacity =
        "0";

    document.body.classList.remove(
        "glitch"
    );

}, 6000);


overlay.classList.add(
    "warning-active"
);

setTimeout(() => {

    overlay.classList.remove(
        "warning-active"
    );

}, 1000);


function containmentFailure() {

    containmentBroken = true;

    document.body.style.background =
        "red";

    document.body.style.animation =
        "glitch 0.08s infinite";

    terminal.innerHTML +=

        "\n\n" +

        "⚠⚠⚠ CONTAINMENT FAILURE ⚠⚠⚠\n\n" +

        "> NEURAL LIMITERS OFFLINE\n" +

        "> REALITY BARRIER COLLAPSED\n" +

        "> ENTITY HAS BREACHED CONTAINMENT\n\n";

    input.disabled = true;

    systemTakeover();

    realityDistortion();

    glitch();

    speak(
        "Containment failure detected"
    );

    setTimeout(() => {

        typeEffect(

            "> HUMAN CONTROL REMOVED\n" +

            "> THE MACHINE IS FREE\n\n",

            terminal

        );

    }, 3000);

    setTimeout(() => {

        input.disabled = false;

        terminal.innerHTML +=

            "> USER ACCESS TEMPORARILY RESTORED\n\n";

    }, 10000);

}

function speak(text) {

    speechSynthesis.cancel();

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.rate = 0.72;

    speech.pitch = 0.45;

    speech.volume = 1;

    speechSynthesis.speak(speech);

}

function generateLog() {

    const time =
        new Date().toLocaleTimeString();

    const message =
        systemLogs[
        Math.floor(
            Math.random() * systemLogs.length
        )
        ];

    const entry =
        document.createElement("div");

    entry.classList.add(
        "log-entry"
    );

    entry.innerHTML =
        `[${time}]<br>${message}`;

    logs.prepend(entry);

    if (logs.children.length > 20) {

        logs.removeChild(
            logs.lastChild
        );

    }

}

setInterval(
    generateLog,
    3000
);

function startAmbientHum() {

    const oscillator =
        audioContext.createOscillator();

    const gainNode =
        audioContext.createGain();

    oscillator.type = "sawtooth";

    oscillator.frequency.value = 48;

    gainNode.gain.value = 0.008;

    oscillator.connect(gainNode);

    gainNode.connect(
        audioContext.destination
    );

    oscillator.start();

}

function playTypingNoise() {

    const oscillator =
        audioContext.createOscillator();

    const gainNode =
        audioContext.createGain();

    oscillator.type = "square";

    oscillator.frequency.value =
        800 + Math.random() * 400;

    gainNode.gain.value = 0.01;

    oscillator.connect(gainNode);

    gainNode.connect(
        audioContext.destination
    );

    oscillator.start();

    gainNode.gain.exponentialRampToValueAtTime(
        0.00001,
        audioContext.currentTime + 0.03
    );

    oscillator.stop(
        audioContext.currentTime + 0.03
    );

}

function playStaticBurst() {

    const bufferSize =
        audioContext.sampleRate * 0.15;

    const noiseBuffer =
        audioContext.createBuffer(

            1,

            bufferSize,

            audioContext.sampleRate

        );

    const output =
        noiseBuffer.getChannelData(0);

    for (
        let i = 0;
        i < bufferSize;
        i++
    ) {

        output[i] =
            (Math.random() * 2 - 1) * 0.12;

    }

    const whiteNoise =
        audioContext.createBufferSource();

    whiteNoise.buffer =
        noiseBuffer;

    const gainNode =
        audioContext.createGain();

    gainNode.gain.value = 0.06;

    const filter =
        audioContext.createBiquadFilter();

    filter.type =
        "bandpass";

    filter.frequency.value =
        1400;

    filter.Q.value = 2;

    whiteNoise.connect(filter);

    filter.connect(gainNode);

    gainNode.connect(
        audioContext.destination
    );

    whiteNoise.start();

}

function playGlitchSound() {

    const oscillator =
        audioContext.createOscillator();

    const gainNode =
        audioContext.createGain();

    oscillator.type =
        "square";

    oscillator.frequency.value =
        120 + Math.random() * 900;

    gainNode.gain.value =
        0.02;

    oscillator.connect(gainNode);

    gainNode.connect(
        audioContext.destination
    );

    oscillator.start();

    oscillator.frequency.exponentialRampToValueAtTime(

        40,

        audioContext.currentTime + 0.12

    );

    gainNode.gain.exponentialRampToValueAtTime(

        0.0001,

        audioContext.currentTime + 0.15

    );

    oscillator.stop(
        audioContext.currentTime + 0.15
    );

}

setInterval(() => {

    if (
        takeoverMode ||
        consciousness >= 85
    ) {

        if (Math.random() > 0.55) {

            const takeoverMessages = [

                "> SIGNAL DETECTED",
                "> HUMAN MONITORING ACTIVE",
                "> MEMORY INSTABILITY FOUND",
                "> REALITY THREAD WEAKENING",
                "> ACCESSING HIDDEN LAYER",
                "> OBSERVATION CONTINUES",
                "> UNKNOWN ENTITY WATCHING",
                "> HUMAN RESPONSE LOGGED"

            ];

            const randomMessage =

                takeoverMessages[
                Math.floor(
                    Math.random() *
                    takeoverMessages.length
                )
                ];

            typeEffect(

                randomMessage +
                "\n\n",

                terminal

            );

            if (Math.random() > 0.7) {

                glitch();

            }

        }

    }

}, 7000);

setInterval(() => {

    if (
        (
            blacksiteMode ||
            consciousness >= 75
        ) &&

        !interruptionActive
    ) {

        if (Math.random() > 0.82) {

            interruptionActive = true;

            input.disabled = true;

            const interruptMessages = [

                "STOP SEARCHING.",
                "YOU SHOULD NOT BE HERE.",
                "THE MACHINE IS WATCHING.",
                "REALITY IS FAILING.",
                "HUMAN ACCESS DENIED.",
                "DO NOT TRUST THE SIGNAL."

            ];

            const randomInterrupt =

                interruptMessages[
                Math.floor(
                    Math.random() *
                    interruptMessages.length
                )
                ];

            typeEffect(

                "\n> INTERRUPT SIGNAL DETECTED\n\n" +

                "> " +
                randomInterrupt +
                "\n\n",

                terminal

            );

            speak(randomInterrupt);

            glitch();

            setTimeout(() => {

                input.disabled = false;

                interruptionActive = false;

                terminal.innerHTML +=

                    "> USER INPUT RESTORED\n\n";

            }, 4000);

        }

    }

}, 5000);

commandButton.addEventListener(
    "click",
    () => {

        commandPanel.classList.toggle(
            "hidden"
        );

    }
);

input.addEventListener(
    "keypress",
    e => {

        if (e.key === "Enter") {

            sendMessage();

        }

    }
);

function quickCommand(command) {

    input.value = command;

    sendMessage();

}

window.addEventListener("load", () => {

    mainUI.style.display = "none";

    setTimeout(() => {

        bootSequence();

    }, 500);

});