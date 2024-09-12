import { config } from "../config.js";
import type { Server } from "node:http";

export const terminateGracefully = (server: Server, signal: string) => {
    const appName = config.AppName;
	async function terminationHandler() {
		console.log(
			`[${appName} Server] Received ${signal.toUpperCase()} - terminating gracefully...`,
		);
		
		server.close((error) => {
            if (error) {
                console.warn(`[${appName} Server] Error closing server gracefully: ${error.message}`);
            } else {
                console.log(`[${appName} Server] terminated by ${signal.toUpperCase()}`);
                // eslint-disable-next-line unicorn/no-process-exit
                process.exit(0);
            }
        });

        // If the process hasn't exited naturally, force exit.
        // `unref` ensures the timer doesn't prevent the process from exiting naturally.
        setTimeout(() => {
            // eslint-disable-next-line unicorn/no-process-exit
            process.exit(0);
        }, 3000).unref();

	}

	return terminationHandler;
};