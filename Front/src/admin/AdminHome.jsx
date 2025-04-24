import {Link} from "react-router-dom"
import {useEffect} from "react"
import { useAdminEcom } from "./Context/AdminEcomProvider"

function AdminHome() {
    const {count, getCount}=useAdminEcom();
    

    useEffect(()=>{
        getCount();
    },[])

  return (
   <div className='min-h-screen flex'>
    <aside className='w-1/5 ml-4 mt-4 px-2 bg-gray-200 rounded h-screen'>
        <h1 className='text-2xl font-bold text-center py-2'>Admin Panel</h1>
        <ul className='mt-4'>
            <li className='py-2'>
                <Link to='/admin/home'>Dashboard</Link>
            </li>
            <li className='py-2'>
                <Link to=''>Products</Link>
            </li>
            <li className="py-2">
                <Link to="">Orders</Link>
            </li>
            <li className='py-2'>
                <Link to=''>Users</Link>
            </li>
        </ul>
    </aside>
    <main className='w-4/5 p-4'>
        <div className='grid grid-cols-2 gap-4'>
            <div className='bg-gray-200 p-4 rounded-lg'>
                <h2 className='text-2xl font-bold'>Products</h2>
                <p className='text-xl font-bold'>{count.products}</p>
                <div className='flex gap-4'>
                    <Link to='/admin/products'>View Products</Link>
                    <Link to='/admin/AddProduct'>Add Product</Link>
                </div>
            </div>
            <div className='bg-gray-200 p-4 rounded-lg'>
                <h2 className='text-2xl font-bold'>Orders</h2>
                <p className='text-xl font-bold'>{count.orders}</p>
                <div className='flex gap-4'>
                    <Link to="">View Orders</Link>
                </div>
            </div>
            <div className='bg-gray-200 p-4 rounded-lg'>
                <div className='category flex gap-1 py-2'>
                <h2 className='text-2xl font-bold'>Categories :- </h2>
                <p className='text-2xl font-bold'>{count.categories}</p>
                </div>
                <div className='flex gap-4'>
                    <Link to="/admin/categories">View Categories</Link>
                    <Link to="/admin/addCategory">Add Category</Link>
                </div>
            </div>
            <div className='bg-gray-200 p-4 rounded-lg' >
                <h2 className='text-2xl font-bold'>Users</h2>
                <p className='text-xl font-bold'>{count.users}</p>
                <div className='flex gap-4'>
                    <Link to=''>View Users</Link>
                </div>
            </div>
        </div>
    </main>
   </div>
  );
}

export default AdminHome