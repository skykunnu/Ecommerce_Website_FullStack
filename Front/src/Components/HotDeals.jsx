import { useEcom } from "../Context/EcomProvider"
import {useEffect} from "react"
import DisplayProduct from "../components/DisplayProduct";
import Loader from "../components/Loader";


function HotDeals() {
  const {fetchHotDeals,dealProduct, loading}=useEcom()

useEffect(()=>{
    fetchHotDeals()
},[])


return loading ? <Loader /> : <DisplayProduct product={dealProduct} />;

}

export default HotDeals