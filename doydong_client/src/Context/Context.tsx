import React, { createContext, useEffect, useState } from 'react'

export const userContext = createContext({});
export default function Context(props: any) {

    const [userObject, setUserObject] = useState<any>();

    useEffect(() => {
        fetch("http://localhost:8080/auth/getuser", {
            method: 'GET', credentials: 'include'
        }).then((res: any) => {
            console.log("Fetch response: ", res);
            res.json().then((parsed: any) => {
                if (parsed) {
                    console.log(parsed)
                    setUserObject(parsed)
                }
            })
        })
    }, [])
    return (
        <userContext.Provider value={userObject}>{props.children}</userContext.Provider>
    )
}