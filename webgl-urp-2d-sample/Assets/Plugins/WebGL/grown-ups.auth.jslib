mergeInto(LibraryManager.library, {
  RequestAuthToken: function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idToken = urlParams.get("id_token");
    if (!idToken) {
      throw new Error("Id token not found in query string.");
    }

    SendMessage("WebGlAuthenticator", "RequestSucceeded", idToken);
  },
  SignIn: function () {
    try {
      console.log("Attempting to sign in ...");

      let msalScript = document.createElement("script");
      msalScript.src = "https://cdn2.grown-ups.net/auth/msal-browser.min.js";
      msalScript.async = true;
      msalScript.addEventListener("load", () => {
        console.log("Script successfully loaded.");

        const tenantName = "gucustomerslocal";
        const policy = "B2C_1A_GrownUps_SignUpSignIn";
        const msalInstance = new msal.PublicClientApplication({
          auth: {
            clientId: "f02d23eb-1fa0-4ada-ae0e-f4c88877b252",
            authority: `https://${tenantName}.b2clogin.com/${tenantName}.onmicrosoft.com/${policy}`,
            redirectUri: "about:blank", // set to a blank page for handling auth code response via popups
          },
          cache: {
            cacheLocation: "localStorage", // set your cache location to local storage
          },
        });

        const urlParams = new URLSearchParams(window.location.search);
        const scopes = ["openid", "offline_access", "email"];
        const hint = urlParams.get("login_hint");
        if (!hint) {
          console.error("No login hint provided");
          return;
        }

        console.log("Attempting silent authentication ...");
        msalInstance
          .ssoSilent({
            scopes,
            loginHint: hint,
          })
          .then((response) => {
            console.log("Sign In successfully completed.");
            SendMessage("WebGlAuthenticator", "SignInSucceeded", response);
          })
          .catch((e) => {
            console.log("Sign In failed. " + e);
            SendMessage("WebGlAuthenticator", "SignInFailed", e.ToString());
          });
      });

      msalScript.addEventListener("error", (e) => {
        console.error(e);
      });

      document.body.appendChild(msalScript);
    } catch (e) {
      console.log("Sign In failed. " + e);
      SendMessage("WebGlAuthenticator", "SignInFailed", e.ToString());
    }
  },
});
