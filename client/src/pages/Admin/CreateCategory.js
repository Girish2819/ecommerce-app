import React,{useEffect,useState} from 'react'
import Layout from '../../components/layout/Layout'
import AdminMenu from '../../components/layout/AdminMenu'
import toast from 'react-hot-toast';
import axios from 'axios';
import CategoryForm from '../../components/form/CategoryForm';
import { Modal } from 'antd';
import "../../Styles/DashboardShell.css";
import "../../Styles/CreateCategory.css";


const CreateCategory = () => {
  const[categories, setCategories] = useState([]);
  const[name,setName]=useState("");
  const[visible,setVisible]=useState(false);
  const[selected,setSelected]=useState(null);
  const[updatedName,setUpdatedName]=useState("");
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
  const { data } = await axios.get(
    `${process.env.REACT_APP_API}/api/v1/category/get-category`
  );
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

//update category
  const handleUpdate=async(e)=>{  
    e.preventDefault();
     if (!selected?._id) return;
    try{
      const {data}=await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updatedName})
      if(data?.success){
        toast.success(`${updatedName} is updated`)
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error("something went wrong while updating category")
    }
  };

  //delete category
  const handleDelete=async(pId)=>{  
    try{
      const {data}=await axios.delete(`/api/v1/category/delete-category/${pId}`)
      if(data?.success){
        toast.success(`category is deleted`)
        getAllCategories();
      }else{
        toast.error(data.message)
      }
    }catch(error){
      console.log(error)
      toast.error("something went wrong while updating category")
    }
  }
  return (
    <Layout Title={"Dashboard - Create Category"}>
      <div className="dashboard-shell">
        <div className="dashboard-hero-full">
          <div className="hero-inner">
            <h1>Admin Panel</h1>
          </div>
        </div>

        <div className="dashboard-body">
          <div className="dashboard-sidebar">
            <AdminMenu/>
          </div>

          <div className="dashboard-content">
            <h2 className="create-category-title">Manage Category</h2>

            <div className="create-category-formCard">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>

            <div className="create-category-tableWrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col" style={{ textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <div className="create-category-actions">
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              setSelected(c);
                              setVisible(true);
                              setUpdatedName(c.name);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="btn btn-danger"
                            onClick={() => { handleDelete(c._id); }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Modal
              open={visible}
              onCancel={()=>setVisible(false)}
              footer={null}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
        </Layout> 
  )
}


export default CreateCategory