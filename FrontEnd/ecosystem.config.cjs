module.exports = {
    apps: [
      {
        name: "frontend",               // Name of the PM2 process
        script: "npm",                  // Run the npm command
        args: "run preview",            // Pass arguments to npm (in this case, "run preview")
        watch: false,                   // Disable watching to prevent auto-restarts on file changes
        env: {
          NODE_ENV: "production"        // Set the environment to production
        }
      }
    ]
  };
  