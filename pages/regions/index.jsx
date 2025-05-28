import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import MuiTable from '../../compnents/MuiTable';
import { GET_REGIONS } from '../../graphQL/query/RegionsQry';
import { CallApi } from "../../utilities/CallApi";
import { useRouter } from "next/router";

const RegionsList = () => {
  const [regionList, setRegionList] = useState([]);
  const [columnHeaders,setColumnHeaders] = useState([])
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setColumnHeaders([
        {id:"id",
            header:"ID"
        },
        {
            id:"code",
            header:"Code"
        },
        {
            id:"name",
            header:"Name"
        },
        {
            id:"regionImageUrl",
            header:"Image photo"
        }
    ])
    setLoading(true)
    CallApi("query", GET_REGIONS, {})
      .then(res => res)
      .then(res => {
        if (res) {
            console.log("Regions data:", res.data.regions);
          setRegionList(res.data.regions);
          setLoading(false)
        }
    })
    .catch(error => {
        console.error("Error fetching regions:", error);
    });
    setLoading(false)
  }, []);

  const onCreateRegionClick = () => {
    router.push(`/regions/addEditRegions/0`);
  }

  if(loading){
   return <p>Loading..</p>
  }



  return (
    <>
    <h1>Regions List</h1>

      <Button
        variant="contained"
        color="primary"
        onClick={onCreateRegionClick}
        
        >Create Region</Button>
     
      {!loading && regionList.length == 0 && <p>Loading... </p>}
      {!loading && regionList?.length>0&&<MuiTable columnHeaders={columnHeaders} dataList={regionList} />}
    </>
  );
};

export default RegionsList;