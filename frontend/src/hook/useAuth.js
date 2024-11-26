import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useAuth = ()=>{
  const { user } = useSelector((state) => state.auth);
  const [ auth, SetAuth ] = useState(false);
  const [ loading, SetLoading ] = useState(true);

  useEffect(()=>{
    if(user){
      SetAuth(true);
    }else{
      SetAuth(false);
    }
    SetLoading(false);
  }, [user])

  return { loading, auth };
}