export  const endpointUrl = "http://localhost:5000";

export const setHeaders = () => {
    const headers = {
        headers: {
            "x-auth-token": localStorage.getItem("onlineShope_token")
        },
    };
    return headers;
    
}