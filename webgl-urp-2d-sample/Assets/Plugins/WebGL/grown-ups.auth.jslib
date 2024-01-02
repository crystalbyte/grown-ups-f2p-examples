mergeInto(LibraryManager.library, {
  SignIn: function () {
    try {
      console.log("SignIn called ...");
      console.log("Fetching msal script ...");
      var msal = document.createElement("script");
      msal.onload = function () {
        console.log("Script successfully fetched.");

        const tenantName = "gucustomerslocal";
        const policy = "B2C_1A_GrownUps_SignUpSignIn";
        const msalInstance = new msal.PublicClientApplication({
          auth: {
            clientId: "f02d23eb-1fa0-4ada-ae0e-f4c88877b252",
            authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policy}`,
            redirectUri: "/", // set to a blank page for handling auth code response via popups
          },
          cache: {
            cacheLocation: "localStorage", // set your cache location to local storage
          },
        });

        console.log("MSAL instance successfully created.");

        window.onload = () => {
          const urlParams = new URLSearchParams(window.location.search);
          const sid = urlParams.get("sid");

          console.log("Attempting silent authentication ...");
          msalInstance
            .ssoSilent({
              sid: sid,
            })
            .then((response) => {
              console.log("Sign In successfully completed.");
              SendMessage("WebGlAuthenticator", "SignInSucceeded", response);
            })
            .catch((e) => {
              console.log("Sign In failed. " + e);
              SendMessage("WebGlAuthenticator", "SignInFailed", e.ToString());
            });
        };
      };

      msal.src = "https://cdn2.grown-ups.net/auth/msal-browser.min.js";
    } catch (e) {
      console.log("Sign In failed. " + e);
      SendMessage("WebGlAuthenticator", "SignInFailed", e.ToString());
    }
  },
});
