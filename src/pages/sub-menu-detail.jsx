import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import { Footer } from "@/widgets/layout";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from '@/api/axios';
import { useNavData } from "@/context/NavdataContext";

export function SubMenuDetail() {
  const navData = useNavData();
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState();
  const [error, setError] = useState("null");
  const {language} = useNavData();
  const id = searchParams.get('v');

  useEffect(()=> {
    const getData = async ()=>{
      const getUrl = language == "En" ? 
                    `/website/detail-e/${id}`
                    :`/website/detail-m/${id}`;

      axios.get(getUrl)
        .then(res => setData(res.data))
        .catch(err => setError(err)); 
    }
    getData();
  },[language, id])

  console.log(data);
  console.log(error);


  return (
    <>
      <section className="relative block h-[50vh]">
        <div className="bg-profile-background absolute top-0 h-full w-full bg-cover bg-center" style={{ backgroundImage: `url(${navData?.data?.banner.image})` }}/>
        <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
      </section>
      <section className="relative bg-blue-gray-50/50 py-16 px-4">
        <div className="container mx-auto">
          <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
            <div className="px-6">
              <div className="mb-10 border-t border-blue-gray-50 py-6">
                <div className="mt-2 flex flex-wrap">
                  
                  <div className="flex w-full flex-col items-center px-4">
                    <h4 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-800 md:text-3xl lg:text-3xl dark:text-white">
                      {data?.title}
                    </h4>
                    <br />
                    {
                      data == "noData" ? <Typography className="mb-8 font-normal text-blue-gray-500">
                                There is no Data
                              </Typography> :

                              <Typography
                              className="mb-8 font-normal text-blue-gray-500"
                              dangerouslySetInnerHTML={{
                                  __html:data?.description
                              }}
                              />
                    
                    }  
                    
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-blue-gray-50/50">
        <Footer />
      </div>
    </>
  );
}

export default SubMenuDetail;
