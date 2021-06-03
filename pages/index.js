import React, { useState, useEffect } from "react";
import { Link, Container, Button, Box } from "@chakra-ui/react";

let deferredPrompt;

export default function Home() {
  const [installable, setInstallable] = useState(true);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", e => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      // Update UI notify the user they can install the PWA
      setInstallable(true);
    });

    window.addEventListener("appinstalled", () => {
      // Log install to analytics
      console.log("INSTALL: Success");
    });
  }, []);

  const handleInstallClick = () => {
    // Hide the app provided install promotion
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      } else {
        console.log("User dismissed the install prompt");
      }
    });
  };
  return (
    <Container centerContent h="100vh" justifyContent="center">
      <Box
        mb={4}
        bg="orange.100"
        p={4}
        rounded={4}
        display="flex"
        flexDirection={["column", null, "row"]}
        alignItems="center"
      >
        <span>If this app can be installed, you will see a button:</span>{" "}
        {installable && (
          <Button
            colorScheme="orange"
            ml={[null, null, 2]}
            mt={[2, null, 0]}
            onClick={handleInstallClick}
          >
            Install Now
          </Button>
        )}
      </Box>
      <div>
        We could put this in a navbar or alert or something to invite users to
        install the &quot;app&quot;. (
        <Link
          href="https://github.com/dagoss/pwa-example"
          color="orange.800"
          fontWeight="bold"
        >
          This example
        </Link>{" "}
        is using React)
      </div>
    </Container>
  );
}
