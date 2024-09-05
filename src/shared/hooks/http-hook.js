import { useState, useCallback, useRef, useEffect } from "react";
import instance from "../../axiosorder";

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const activeHttpRequests = useRef([]);

    const baseUrl = process.env.REACT_APP_BASE_URL;

    const sendRequest = useCallback(
        async (url, method = "GET", body = null, headers = {}) => {
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);
            console.log(body);
            try {
              let response;
              const options = {
                mode: "cors",
                headers: {
                    ...headers,
                },
                signal: httpAbortCtrl.signal,
            }
                switch (method) {
                    case "GET" || "get":
                        response = await instance.get(url);
                        break;
                    case "POST" || "POST":
                        response = await instance.post(url, body, {
                            mode: "cors",
                            headers: {
                                ...headers,
                            },
                            signal: httpAbortCtrl.signal,
                        });
                        break;
                    case "PATCH" || "patch":
                        response = await instance.patch(url, body, options);
                        break;
                    case "DELETE" || "delete":
                        response = await instance.delete(url);
                        break;

                    default:
                        response = await instance.get(url, body, {
                            mode: "cors",
                            headers: {
                                ...headers,
                            },
                            signal: httpAbortCtrl.signal,
                        });
                        break;
                }

                const responseData = response.data;

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    (reqCtrl) => reqCtrl !== httpAbortCtrl
                );

                if (!response.statusText === "ok") {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                return responseData;
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach((abortCtrl) =>
                abortCtrl.abort()
            );
        };
    }, []);

    return { isLoading, error, sendRequest, clearError };
};
