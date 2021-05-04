import { createContext } from "react";

function emptyFunction (t : any, id : any, email : any) {};
function emptyFunction2 () {};

export const AuthContext = createContext({
    token : null,
    userId : 0,
    login : emptyFunction,
    logout : emptyFunction2,
    isAuthentificated : false,
    email : null
});
