import React from "react";
import { FileText } from "lucide-react";
import { ExternalLink } from "lucide-react";
const NS_API_URL = import.meta.env.VITE_APP_API_URL;

interface DesignsTabProps {
    designs: any[];
}

const DesignsTab: React.FC<DesignsTabProps> = ({ designs }) => {
    return (
        <>
            <div className="bg-white rounded-xl border p-6 shadow-sm">
                <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                    <FileText size={18} className="text-blue-500" />
                    All Designs
                </h3>

                {designs && designs.length > 0 ? (
                    <div className="space-y-3">
                        {designs.map((design, idx) => {
                            const hasPdf = !!design.pdf_from_designer;
                            if (!hasPdf) return null;
                            const isApproved = design.design_approved === true || (design.pdf_from_designer || '').toLowerCase().includes('docusign');

                            return (
                                <div key={idx} className="text-sm p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-start gap-2">
                                        <div>
                                            {design.pdf_from_designer}{' '}
                                            (
                                            {isApproved
                                                ? <strong>Proof Approved</strong>
                                                : design.rejection_approval_codes}
                                            )
                                            {design.design_id && (
                                                <button className="ml-2 text-blue-500 hover:text-blue-700 transition-colors"
                                                    title="View design PDF"
                                                    onClick={() =>
                                                        window.open(NS_API_URL + `/netsuite-api/get-entity-pdf-from-netsuite/${design.design_id}/design-comm`, '_blank')
                                                    }
                                                >
                                                    <ExternalLink size={15} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <p className="text-sm text-gray-500">No design available.</p>
                )}
            </div>
        </>
    );
};

export default DesignsTab;