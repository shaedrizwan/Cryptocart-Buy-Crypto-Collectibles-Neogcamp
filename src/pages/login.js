import { useAuth } from "../AuthContext"

export function Login(){

    const {login,loginUser,logoutUser} = useAuth();

    let username, password;

    const loginHandler = () =>{
        console.log(username,password)
        loginUser(username,password)
    }

    return(
        <div style={{display:"flex",flexFlow:"column wrap",alignItems:"center",justifyContent:"center"}}>
        <h3>Please Login</h3>
        <div>username</div>
        <input type="text" onChange={(e)=>username = e.target.value}/>
        <div>Password</div>
        <input type="password" onChange={(e)=>password = e.target.value}/>
        <button onClick={login?logoutUser:loginHandler}>{login?"Log Out":"Login"}</button>
        </div>
    )
}