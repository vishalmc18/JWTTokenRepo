import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import MuiTable from '../../compnents/MuiTable';
import { GET_REGIONS } from '../../graphQL/query/RegionsQry';
import { CallApi } from "../../utilities/CallApi";
import { useRouter } from "next/router";
import { REGION_CREATED_SUBSCRIPTION,SIMPLE_TRIGGER_MUTATION,SIMPLE_TRIGGER_SUBSCRIPTION } from '../../graphQL/mutation/RegionMutation';
import { useSubscription } from "@apollo/client";

const RegionsList = () => {
  const [regionList, setRegionList] = useState([]);
  const [columnHeaders,setColumnHeaders] = useState([])
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  // ... your existing code

  // Listen for new regions
//   useSubscription(REGION_CREATED_SUBSCRIPTION, {
//   onSubscriptionData: ({ subscriptionData }) => {
//     console.log("Subscription fired! Data:", subscriptionData);
//     if (subscriptionData.data && subscriptionData.data.onRegionCreated) {
//       setRegionList(prev => [subscriptionData.data.onRegionCreated, ...prev]);
//     }
//   }
// });
useSubscription(SIMPLE_TRIGGER_SUBSCRIPTION, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log("Simple trigger subscription fired! Data:", subscriptionData);
      // You can handle the data as needed here
      // Example: alert or set some state
      if (subscriptionData.data && subscriptionData.data.onSimpleTrigger) {
        alert("Simple trigger received: " + subscriptionData.data.onSimpleTrigger);
        fetchRegions(); // Optionally refresh the regions list
      }
    }
  });

  useEffect(() => {
   fetchRegions();
  }, []);
  const fetchRegions = () => {
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
  }
 
  const onTriggerEventClick = () => {
    CallApi("mutation", SIMPLE_TRIGGER_MUTATION, {})
      .then(res => {
        console.log("Trigger event response:", res);
      })
      .catch(error => {
        console.error("Error triggering event:", error);
      });
  }

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
     
      <Button
        variant="contained"
        color="primary"
        onClick={onTriggerEventClick}
        
        >Trigger Event</Button>
     
      {!loading && regionList.length == 0 && <p>Loading... </p>}
      {!loading && regionList?.length>0&&<MuiTable columnHeaders={columnHeaders} dataList={regionList} />}
    </>
  );
};

export default RegionsList;