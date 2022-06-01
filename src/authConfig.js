/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { LogLevel } from "@azure/msal-browser";

export const b2cPolicies = {
    names: {
        signUpSignIn: "B2C_1_sign-in",
    },
    authorities: {
        signUpSignIn: {
            authority: "https://makuktestapiv2.b2clogin.com/makuktestapiv2.onmicrosoft.com/B2C_1_sign-in",
        },
    },
    authorityDomain: "https://makuktestapiv2.b2clogin.com"
}

export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_B2C_CLIENT_ID, // This is the ONLY mandatory field that you need to supply.
        clientSecret: process.env.REACT_APP_CLIENT_SECRET,
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Choose SUSI as your default authority.
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: process.env.REACT_APP_REDIRECT_URI, // You must register this URI on Azure Portal/App Registration. Defaults to window.location.origin
        postLogoutRedirectUri: "/", // Indicates the page to navigate after logout.
        navigateToLoginRequestUrl: false, // If "true", will navigate back to the original request location before processing the auth code response.
    },
    cache: {
        cacheLocation: "sessionStorage", // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        //
                }
            }
        }
    }
};

export const protectedResources = {
    apiHello: {
        endpoint: `${process.env.REACT_APP_API_URL}/hello`,
        scopes: ["https://makuktestapiv2.onmicrosoft.com/mankuk-api/api.read"], // e.g. api://xxxxxx/access_as_user
    },
};

export const loginRequest = {
    scopes: [...protectedResources.apiHello.scopes]
};