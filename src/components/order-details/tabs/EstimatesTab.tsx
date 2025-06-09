import React from "react";
import { Calculator } from "lucide-react";
import { ExternalLink } from "lucide-react";
const NS_API_URL = import.meta.env.VITE_APP_API_URL;

interface EstimatesTabProps {
    estimates: any[];
}

const EstimatesTab: React.FC<EstimatesTabProps> = ({ estimates }) => {

    return (
        <>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <Calculator size={18} className="text-blue-500" />
                    Estimates
                </h3>

                {estimates && estimates.length > 0 ? (
                    <div className="space-y-3">
                        {estimates.map((estmt, idx) => (
                            <div key={idx} className="text-sm p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-start gap-2">
                                    {/* <MapPin size={16} className="text-gray-500 mt-0.5" /> */}
                                    <div>{estmt.estimate}</div>
                                    {estmt.estimate_id && (
                                        <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                                            title="View estimate PDF"
                                            onClick={() =>
                                                window.open(NS_API_URL + `/netsuite-api/get-entity-pdf-from-netsuite/${estmt.estimate_id}`, '_blank')
                                            }
                                        >
                                            <ExternalLink size={15} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No estimate available.</p>
                )}
            </div>
        </>
    );
};

export default EstimatesTab;