import React,{useEffect,useState} from "react";
import {CREATE_REGION,UPDATE_REGION,DELETE_REGION} from '../../../../graphQL/mutation/RegionMutation'
import { GET_REGION_BY_ID } from '../../../../graphQL/query/RegionsQry';
import { CallApi } from "../../../../utilities/CallApi";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@mui/material";

export default function AddEditRegion() {
    const [name, setName] = useState("");
    const [code, setCode] = useState("");
    const [regionImageUrl, setRegionImageUrl] = useState("");
    const router = useRouter();
     const { id } = router.query;

    useEffect(() => {
        router.isReady && id && id?.length > 0 && fetchRegionById(id);
    
    }, [router.isReady, id]);


    const fetchRegionById = (id) => {
        if(!id || id?.length<1){
            return}
        CallApi("query", GET_REGION_BY_ID, {id:id})
        .then((res)=>{
            return res;
        })
        .then((res)=>{
            if(res){
                console.log("Region data:", res.data.regionById);
                setName(res.data.regionById.name);
                setCode(res.data.regionById.code);
                setRegionImageUrl(res.data.regionById.regionImageUrl);
            }
        })
        .catch(error => {
            console.error("Error fetching region by ID:", error);
        });
    }
    const createRegion=()=>{
        const variable = {
            name:name,
            code:code,
            regionImageUrl:regionImageUrl
        }
        if(id && id?.length>1){
            try{
CallApi("mutation", UPDATE_REGION, {id:id, input:variable})
            .then((res)=>res)
            .then((res)=>{
                if(res){

                    router.push("/regions");
                    console.log("Region created successfully:", res.data.createRegion);
                }
            }).catch
            (error=>{
                console.log("eror while updating",error)
            })
            }
            catch{
                console.log("erro while updating")
            }
            
        }
        else{
        try{

            CallApi("mutation", CREATE_REGION, {input:variable})
            .then((res)=>{
                return res;}
            )
            .then((res)=>{
                if(res){
                    router.push("/regions");
                    console.log("Region created successfully:", res.data.createRegion);
                }
            })
            .catch(error => {
                console.error("Error creating region:", error);
            });
        }
        catch{
            console.log("erro while updating")
        }
    }
    }
    
    const deleteRegion=()=>{
        if(id && id?.length>0){
            try{
                CallApi("mutation", DELETE_REGION, {id:id})
                .then((res)=>res)
                .then((res)=>{
                    if(res){
                        router.push("/regions");
                        console.log("Region deleted successfully:", res.data.deleteRegion);
                    }
                }).catch
                (error=>{
                    console.log("eror while deleting",error)
                })
            }
            catch{
                console.log("erro while deleting")
            }
        }
    }


    return<>
   <h1>{id && id?.length>1 ? "Edit Region" : "Add Region"}</h1>
    <Link href="/regions">
         <Button variant="contained" color="primary">Back to Regions</Button>
   </Link>
            <div>
            <div style={{marginTop:'5px'}}>

       <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
             <div style={{marginTop:'5px'}}>

       <input type="text" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} required />
            </div>
            <div style={{marginTop:'5px'}}>   
       <input type="text" placeholder="Region Image URL" value={regionImageUrl} onChange={(e) => setRegionImageUrl(e.target.value)} required />
            </div>  
             <div style={{marginTop:'5px'}}>
                
       <Button
variant="contained" color="primary"
        onClick={createRegion} >{id && id?.length>1 ? "Update Region" : "Create Region"}

       </Button>
       <Button  sx={{marginLeft:'5px'}}
variant="contained" color="primary"
        onClick={deleteRegion} >Delete Region

       </Button>
            </div>
            </div>
   
    </>

}