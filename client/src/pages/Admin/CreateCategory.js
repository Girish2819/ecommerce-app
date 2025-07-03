import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/form/CategoryForm';


const CreateCategory = () => {
  const[categories, setCategories] = useState([]);
  const[name,setName]=useState("");
  // handle form
  const handleSubmit=async(e)=>{
    e.preventDefault()
    try{
      const {data}=await axios.post('/api/v1/category/create-category', {name})
      if(data?.success){
        toast.success(`${name}is created`)
        getAllCategories();
      }else{
        toast.error(data.messaage);
      }
    }catch(error){
      console.log(error)
      toast.error("somthing went wrong in input form")

    }
  }


  // get all categories 
  const getAllCategories = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/get-category');
      if (data.success) {
        setCategories(data.categories);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching categories");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <Layout Title={"Dashboard - Create Category"}>
        <div className="container-fluid m-3 p-3">
     <div className="row">
            <div className="col-md-3">
                <AdminMenu/>
            </div>
            <div className="col-md-9">
                 <h1>manage Category</h1>
                <div className='p-3 w-50'>
                  <CategoryForm

                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                  />
                </div>
                 <div className='w-75'>
                  <table className="table">
              <thead>
               <tr>
                 <th scope="col">Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
  
                {categories?.map((c) => (
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td><button className="btn btn-primary">edit</button></td>
                  </tr>
                ))}
              </tbody>
            </table>

                 </div>
            </div>
        </div>   
        </div>
        </Layout> 
  )
}


export default CreateCategory