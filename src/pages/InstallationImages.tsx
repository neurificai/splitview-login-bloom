import React, { useEffect, useState } from 'react';
import { fetchInstallationImages } from "../services/netSuiteOrderService";
import { useLocation } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/DashboardLayout";

const useQuery = () => new URLSearchParams(useLocation().search);

const InstallationImages = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errMsg, setErrMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const [isEmpty, setIsEmpty] = useState(false);

    const query = useQuery();
    const so_id = query.get('sid');
    const wo_id = query.get('wid');
    const isSubOrder = query.get('subord');
    var subord = (isSubOrder == 'true' || isSubOrder == 'T') ? true : false;
    console.log('isSubOrder');
    console.log(subord);

    useEffect(() => {
        fetchInstallationImages(so_id, wo_id, subord)
            .then((response) => {
                setLoading(true);
                if (response.success == true) {
                    if (response.result.installation_images.length > 0) {
                        setImages(response.result.installation_images);
                    } else {
                        setIsEmpty(true);
                    }
                    setLoading(false);
                } else {
                    setLoading(false);
                    setIsError(true);
                    setErrMsg(response.exception_message)
                }
            })
            .catch((err) => {
                setLoading(false);
                setIsError(true);
                setErrMsg(err)
            });
    }, []);
    return (
        <DashboardLayout>
            <div className="p-6">
                <h1 className="font-bold mb-4 text-center">Installation Images: {so_id}</h1>
                <Separator className="my-4" />

                {loading ? (
                    <p className="text-center">Loading images...</p>
                ) : isEmpty ? (
                    <p className="text-center text-red-500">Installation images not available.</p>
                ) : isError ? (
                    <p className="text-center text-red-500">{errMsg}</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <div key={index} className="rounded overflow-hidden shadow hover:shadow-lg transition">
                                <img
                                    src={img.image_url}
                                    alt={img.file_real_name || 'Installation Image'}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default InstallationImages;
