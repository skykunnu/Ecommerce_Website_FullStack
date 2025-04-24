import { useEcom } from "../Context/EcomProvider"
import {useEffect} from "react"
import DisplayProduct from "../Components/DisplayProduct";
import Loader from "../Components/Loader";


function HotDeals() {
  const {fetchHotDeals,dealProduct, loading}=useEcom()

useEffect(()=>{
    fetchHotDeals()
},[])


return loading ? <Loader /> : <DisplayProduct product={dealProduct} />;

}

export default HotDeals