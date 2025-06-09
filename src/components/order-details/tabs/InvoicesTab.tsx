import React from "react";
import { FilePen, FileText, Eye } from "lucide-react";
const NS_API_URL = import.meta.env.VITE_APP_API_URL;

interface InvoicesTabProps {
    invoices: any[];
}

const InvoicesTab: React.FC<InvoicesTabProps> = ({ invoices }) => {
    return (
        <>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <FilePen size={18} className="text-blue-500" />
                    Invoices
                </h3>

                {invoices && invoices.length > 0 ? (
                    <div className="grid grid-cols-6 gap-2 text-sm">
                        {/* Label Row in One Full-Width Div */}
                        <div className="col-span-6 bg-gray-100 p-2 rounded-sm grid grid-cols-6 gap-2">
                            <div className="font-medium">View Invoice</div>
                            <div className="font-medium">Invoice #</div>
                            <div className="font-medium col-span-4">VIN</div>
                        </div>

                        {/* Data Rows */}
                        {invoices.map((spec, index) => (
                            <React.Fragment key={index}>
                                <div className="p-2">
                                    {spec.invoice_id && (
                                        <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                                            title="View invoice PDF"
                                            onClick={() =>
                                                window.open(NS_API_URL + `/netsuite-api/get-entity-pdf-from-netsuite/${spec.invoice_id}`, '_blank')
                                            }
                                        >
                                            <FileText size={15} className="text-blue-500" />
                                        </button>
                                    )}
                                </div>
                                <div className="p-2">{spec.invoice_number}</div>
                                <div className="col-span-4 p-2">{spec.vins}</div>

                                {/* Separator */}
                                <div className="col-span-6 border-t my-2"></div>
                            </React.Fragment>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No invoice available.</p>
                )}
            </div>
        </>
    );
};

export default InvoicesTab;