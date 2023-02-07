let config = {};
config.verbosity = "high";
const runtimeVerbosity = config.verbosity;

class Logger {
    static log(messageVerbosity, message) {
        if (!messageVerbosity || !message || !(messageVerbosity !== "High" || messageVerbosity !== "Medium" || messageVerbosity !== "Low")) {
            throw new Error("Missing logging arguments!");
            return;
        }
        messageVerbosity = messageVerbosity.toLowerCase();

        if (runtimeVerbosity === "high" && (messageVerbosity === "high" || messageVerbosity === "medium" || messageVerbosity === "low")) {
            console.log(message);
            return;
        } else if (runtimeVerbosity === "medium" && (messageVerbosity === "medium" || messageVerbosity === "low")) {
            console.log(message);
            return;
        } else if (runtimeVerbosity === "low" && (messageVerbosity === "low")) {
            console.log(message);
            return;
        }
    }
}

export default Logger;

