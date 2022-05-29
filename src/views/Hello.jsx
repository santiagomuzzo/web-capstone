import { useEffect, useState } from "react";

import { MsalAuthenticationTemplate, useMsal, useAccount } from "@azure/msal-react";
import { InteractionRequiredAuthError, InteractionType } from "@azure/msal-browser";
import { loginRequest, protectedResources } from "../authConfig";
import { HelloData } from "./HelloData";
import '../styles/Hello.css';

const callApiWithToken = async(accessToken, apiEndpoint) => { 
    const bearer = `Bearer ${accessToken}`;
    return fetch(apiEndpoint,{
        method: "GET",
        headers: {
            Authorization: bearer
        }
    })
        .then(response => response.json())
        .catch(error => console.log(error));
}
export const HelloContent = () => {
    /**
     * useMsal is hook that returns the PublicClientApplication instance, 
     * an array of all accounts currently signed in and an inProgress value 
     * that tells you what msal is currently doing. For more, visit: 
     * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
     */
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [helloData, setHelloData] = useState(null);
    console.log(protectedResources.apiHello.scopes);

    useEffect(() => {
        if (account && inProgress === "none" && !helloData) {
            instance.acquireTokenSilent({
                scopes: protectedResources.apiHello.scopes,
                account: account
            }).then((response) => {
                callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                    .then(response => setHelloData(response));
            }).catch((error) => {
                // in case if silent token acquisition fails, fallback to an interactive method
                if (error instanceof InteractionRequiredAuthError) {
                    if (account && inProgress === "none") {
                        instance.acquireTokenPopup({
                            scopes: protectedResources.apiHello.scopes,
                        }).then((response) => {
                            callApiWithToken(response.accessToken, protectedResources.apiHello.endpoint)
                                .then(response => setHelloData(response));
                        }).catch(error => console.log(error));
                    }
                }
            });
        }
    }, [account, helloData, inProgress, instance]);
  
    return (
        <>
            { helloData ? <HelloData helloData={helloData} /> : null }
        </>
    );
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated 
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use 
 * (redirect or popup) and optionally a [request object](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md)
 * to be passed to the login API, a component to display while authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const Hello = () => {
    const authRequest = {
        ...loginRequest
    };

    return (
        <MsalAuthenticationTemplate 
            interactionType={InteractionType.Redirect} 
            authenticationRequest={authRequest}
        >
            <div className="contenedor">
                <HelloContent />
            </div>
        </MsalAuthenticationTemplate>
      )
};
export default Hello;