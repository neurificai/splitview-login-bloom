
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ActivityItem } from "@/services/orderService";
import { 
  Activity, 
  MessageSquare, 
  FileText, 
  Truck, 
  MapPin, 
  Car, 
  FileSignature, 
  CreditCard, 
  Clock, 
  Check, 
  ArrowRight, 
  Download,
  Mail,
  Edit 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/services/orderService";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

interface OrderDetailsTabsProps {
  activities: ActivityItem[];
  shippingAddresses?: string[];
  vehicleDetails?: {
    model?: string;
    year?: string;
    availabilityDate?: string;
  };
  installLocations?: string[];
  approvedDesigns?: string[];
  invoices?: {
    id: string;
    date: string;
    amount: number;
    status: "paid" | "pending";
  }[];
}

const OrderDetailsTabs: React.FC<OrderDetailsTabsProps> = ({
  activities,
  shippingAddresses,
  vehicleDetails,
  installLocations,
  approvedDesigns,
  invoices
}) => {
  // Filter activities by type
  const estimateActivities = activities.filter(a => a.type === "estimate");
  const designActivities = activities.filter(a => a.type === "design");
  const printActivities = activities.filter(a => a.type === "print");
  const installActivities = activities.filter(a => a.type === "install");
  const invoiceActivities = activities.filter(a => a.type === "invoice");
  
  // State for nested tabs
  const [activeSubTab, setActiveSubTab] = useState<Record<string, string>>({
    estimate: "activity",
    design: "activity",
    print: "activity",
    install: "activity",
    invoice: "activity",
  });
  
  // Handle nested tab changes
  const handleSubTabChange = (mainTab: string, subTab: string) => {
    setActiveSubTab(prev => ({
      ...prev,
      [mainTab]: subTab
    }));
  };
  
  // Subtle color variations for each section
  const tabColors = {
    estimate: {
      activity: "bg-[#F2FCE2]",
      collaborate: "bg-[#F2FCE2]",
      detail: "bg-[#F2FCE2]",
    },
    design: {
      activity: "bg-[#D3E4FD]",
      collaborate: "bg-[#D3E4FD]",
      detail: "bg-[#D3E4FD]",
    },
    print: {
      activity: "bg-[#FEF7CD]",
      collaborate: "bg-[#FEF7CD]",
      detail: "bg-[#FEF7CD]",
    },
    install: {
      activity: "bg-[#E5DEFF]",
      collaborate: "bg-[#E5DEFF]",
      detail: "bg-[#E5DEFF]",
    },
    invoice: {
      activity: "bg-[#FFDEE2]",
      collaborate: "bg-[#FFDEE2]",
      detail: "bg-[#FFDEE2]",
    },
  };
  
  // Render nested tabs for a main tab
  const renderNestedTabs = (mainTab: string, content: Record<string, React.ReactNode>) => {
    return (
      <div className="mb-6">
        <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-white border p-1 text-muted-foreground mb-4 w-full sm:w-auto">
          <TabsTrigger 
            value="activity" 
            onClick={() => handleSubTabChange(mainTab, "activity")}
            className={activeSubTab[mainTab] === "activity" ? `${tabColors[mainTab as keyof typeof tabColors].activity} text-gray-800` : ""}
            data-state={activeSubTab[mainTab] === "activity" ? "active" : ""}
          >
            Activity
          </TabsTrigger>
          <TabsTrigger 
            value="collaborate" 
            onClick={() => handleSubTabChange(mainTab, "collaborate")}
            className={activeSubTab[mainTab] === "collaborate" ? `${tabColors[mainTab as keyof typeof tabColors].collaborate} text-gray-800` : ""}
            data-state={activeSubTab[mainTab] === "collaborate" ? "active" : ""}
          >
            Collaborate
          </TabsTrigger>
          <TabsTrigger 
            value="detail" 
            onClick={() => handleSubTabChange(mainTab, "detail")}
            className={activeSubTab[mainTab] === "detail" ? `${tabColors[mainTab as keyof typeof tabColors].detail} text-gray-800` : ""}
            data-state={activeSubTab[mainTab] === "detail" ? "active" : ""}
          >
            Detail
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-4">
          {content[activeSubTab[mainTab]]}
        </div>
      </div>
    );
  };
  
  return (
    <Tabs defaultValue="estimate" className="w-full">
      <TabsList className="grid grid-cols-5 mb-8">
        <TabsTrigger value="estimate">Estimate</TabsTrigger>
        <TabsTrigger value="design">Design</TabsTrigger>
        <TabsTrigger value="print">Print</TabsTrigger>
        <TabsTrigger value="install">Install</TabsTrigger>
        <TabsTrigger value="invoice">Invoice</TabsTrigger>
      </TabsList>
      
      {/* ESTIMATE TAB */}
      <TabsContent value="estimate">
        {renderNestedTabs("estimate", {
          activity: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Activity size={18} className="text-green-500" />
                Activity
              </h3>
              
              <div className="space-y-6">
                {estimateActivities.length > 0 ? (
                  <div className="relative">
                    {estimateActivities.map((activity, index) => (
                      <div key={index} className="mb-6 relative">
                        {/* Timeline connector */}
                        {index < estimateActivities.length - 1 && (
                          <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200"></div>
                        )}
                        
                        <div className="flex items-start">
                          <div className="mr-4 bg-green-100 rounded-full p-1 z-10">
                            {activity.status === "completed" ? (
                              <Check className="h-6 w-6 text-green-500" />
                            ) : (
                              <Clock className="h-6 w-6 text-amber-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No estimate activities yet.</p>
                )}
                
                <div className="pt-4">
                  <h4 className="font-medium mb-2">Next Steps</h4>
                  {estimateActivities.some(a => a.status === "pending") ? (
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <ArrowRight size={16} className="text-green-500" />
                      <span>Pending estimate approval</span>
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No pending actions</p>
                  )}
                </div>
              </div>
            </div>
          ),
          collaborate: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-500" />
                Collaborate
              </h3>
              
              {!estimateActivities.some(a => a.title === "Estimate Signed") && (
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Pending Estimate</CardTitle>
                    <CardDescription>Please review and sign the estimate</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" className="w-full">
                      <FileSignature className="mr-2 h-4 w-4" />
                      Open DocuSign
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              <div className="text-sm text-gray-500">
                {estimateActivities.some(a => a.title === "Estimate Signed") 
                  ? "Estimate has been signed and approved."
                  : "Your signature is required to proceed."}
              </div>
            </div>
          ),
          detail: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                Detail
              </h3>
              
              <Button size="sm" variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Estimate PDF
              </Button>
            </div>
          )
        })}
      </TabsContent>
      
      {/* DESIGN TAB */}
      <TabsContent value="design">
        {renderNestedTabs("design", {
          activity: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Activity size={18} className="text-green-500" />
                Activity
              </h3>
              
              <div className="space-y-6">
                {designActivities.length > 0 ? (
                  <div className="relative">
                    {designActivities.map((activity, index) => (
                      <div key={index} className="mb-6 relative">
                        {/* Timeline connector */}
                        {index < designActivities.length - 1 && (
                          <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200"></div>
                        )}
                        
                        <div className="flex items-start">
                          <div className="mr-4 bg-green-100 rounded-full p-1 z-10">
                            {activity.status === "completed" ? (
                              <Check className="h-6 w-6 text-green-500" />
                            ) : (
                              <Clock className="h-6 w-6 text-amber-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No design activities yet.</p>
                )}
              </div>
            </div>
          ),
          collaborate: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-blue-500" />
                Collaborate
              </h3>
              
              {designActivities.some(a => a.status === "pending") && (
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Design Pending Approval</CardTitle>
                    <CardDescription>Please review the design</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" className="w-full">
                      Review Design
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              <div className="mt-4">
                <h4 className="font-medium text-sm mb-2">Comments</h4>
                <div className="flex gap-2 mb-4">
                  <input 
                    type="text" 
                    placeholder="Add your comment..." 
                    className="flex-1 rounded-md border px-3 py-2 text-sm"
                  />
                  <Button size="sm">
                    <Edit size={16} />
                  </Button>
                </div>
                
                <div className="text-sm text-gray-500">
                  No comments yet.
                </div>
              </div>
            </div>
          ),
          detail: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                Approved Designs
              </h3>
              
              {approvedDesigns && approvedDesigns.length > 0 ? (
                <div className="space-y-2">
                  {approvedDesigns.map((design, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <span className="text-sm">{design}</span>
                      <Button variant="ghost" size="sm">
                        <Download size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No approved designs yet.</p>
              )}
            </div>
          )
        })}
      </TabsContent>
      
      {/* PRINT TAB */}
      <TabsContent value="print">
        {renderNestedTabs("print", {
          activity: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Activity size={18} className="text-green-500" />
                Activity
              </h3>
              
              <div className="space-y-6">
                {printActivities.length > 0 ? (
                  <div className="relative">
                    {printActivities.map((activity, index) => (
                      <div key={index} className="mb-6 relative">
                        {/* Timeline connector */}
                        {index < printActivities.length - 1 && (
                          <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200"></div>
                        )}
                        
                        <div className="flex items-start">
                          <div className="mr-4 bg-green-100 rounded-full p-1 z-10">
                            {activity.status === "completed" ? (
                              <Check className="h-6 w-6 text-green-500" />
                            ) : (
                              <Clock className="h-6 w-6 text-amber-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No print activities yet.</p>
                )}
              </div>
            </div>
          ),
          collaborate: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Truck size={18} className="text-blue-500" />
                Shipping Addresses
              </h3>
              
              {shippingAddresses && shippingAddresses.length > 0 ? (
                <div className="space-y-3">
                  {shippingAddresses.map((address, idx) => (
                    <div key={idx} className="text-sm p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin size={16} className="text-gray-500 mt-0.5" />
                        <div>{address}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No shipping addresses provided.</p>
              )}
            </div>
          ),
          detail: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                Print Details
              </h3>
              
              <p className="text-sm text-gray-500 mb-2">Materials and specifications:</p>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Material:</div>
                <div>High-quality vinyl</div>
                
                <div className="font-medium">Finish:</div>
                <div>Matte</div>
                
                <div className="font-medium">Quantity:</div>
                <div>{(shippingAddresses?.length || 1) * 5} pieces</div>
              </div>
            </div>
          )
        })}
      </TabsContent>
      
      {/* INSTALL TAB */}
      <TabsContent value="install">
        {renderNestedTabs("install", {
          activity: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Activity size={18} className="text-green-500" />
                Activity
              </h3>
              
              <div className="space-y-6">
                {installActivities.length > 0 ? (
                  <div className="relative">
                    {installActivities.map((activity, index) => (
                      <div key={index} className="mb-6 relative">
                        {/* Timeline connector */}
                        {index < installActivities.length - 1 && (
                          <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200"></div>
                        )}
                        
                        <div className="flex items-start">
                          <div className="mr-4 bg-green-100 rounded-full p-1 z-10">
                            {activity.status === "completed" ? (
                              <Check className="h-6 w-6 text-green-500" />
                            ) : (
                              <Clock className="h-6 w-6 text-amber-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No installation activities yet.</p>
                )}
              </div>
            </div>
          ),
          collaborate: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Car size={18} className="text-blue-500" />
                Vehicle Details
              </h3>
              
              {vehicleDetails ? (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Model:</span>
                    <span>{vehicleDetails.model || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Year:</span>
                    <span>{vehicleDetails.year || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Available on:</span>
                    <span>{vehicleDetails.availabilityDate ? formatDate(vehicleDetails.availabilityDate) : "N/A"}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No vehicle details available.</p>
              )}
              
              <Separator className="my-4" />
              
              <h4 className="font-medium text-sm mb-2">Install Locations:</h4>
              {installLocations && installLocations.length > 0 ? (
                <div className="space-y-2">
                  {installLocations.map((location, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <MapPin size={16} className="text-gray-500" />
                      <span>{location}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No installation locations specified.</p>
              )}
            </div>
          ),
          detail: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                Installation Details
              </h3>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="font-medium">Installer:</div>
                <div>Pro Installation Team</div>
                
                <div className="font-medium">Est. Duration:</div>
                <div>3 hours per vehicle</div>
                
                <div className="font-medium">Special Notes:</div>
                <div>Weather-resistant application needed</div>
              </div>
            </div>
          )
        })}
      </TabsContent>
      
      {/* INVOICE TAB */}
      <TabsContent value="invoice">
        {renderNestedTabs("invoice", {
          activity: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Activity size={18} className="text-green-500" />
                Activity
              </h3>
              
              <div className="space-y-6">
                {invoiceActivities.length > 0 ? (
                  <div className="relative">
                    {invoiceActivities.map((activity, index) => (
                      <div key={index} className="mb-6 relative">
                        {/* Timeline connector */}
                        {index < invoiceActivities.length - 1 && (
                          <div className="absolute left-4 top-6 h-full w-0.5 bg-gray-200"></div>
                        )}
                        
                        <div className="flex items-start">
                          <div className="mr-4 bg-green-100 rounded-full p-1 z-10">
                            {activity.status === "completed" ? (
                              <Check className="h-6 w-6 text-green-500" />
                            ) : (
                              <Clock className="h-6 w-6 text-amber-500" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{activity.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                            <div className="text-xs text-gray-500 mt-1">{formatDate(activity.date)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No invoice activities yet.</p>
                )}
                
                {invoices && invoices.some(inv => inv.status === "pending") && (
                  <div className="pt-4">
                    <h4 className="font-medium mb-2">Next Steps</h4>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                      <ArrowRight size={16} className="text-green-500" />
                      <span>Complete payment for pending invoice</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ),
          collaborate: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CreditCard size={18} className="text-blue-500" />
                Online Payment
              </h3>
              
              {invoices && invoices.some(inv => inv.status === "pending") && (
                <Card className="mb-4">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Payment Due</CardTitle>
                    <CardDescription>
                      {invoices.filter(inv => inv.status === "pending").map(inv => (
                        <span key={inv.id}>Invoice #{inv.id}: ${inv.amount.toLocaleString()}</span>
                      ))}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button size="sm" className="w-full">
                      Make Payment
                    </Button>
                  </CardFooter>
                </Card>
              )}
              
              <div className="text-sm text-gray-500">
                {invoices && invoices.some(inv => inv.status === "pending") 
                  ? "Please complete payment for pending invoices." 
                  : "No payments due at this time."}
              </div>
            </div>
          ),
          detail: (
            <div className="bg-white rounded-xl border p-6 shadow-sm">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <FileText size={18} className="text-blue-500" />
                All Invoices
              </h3>
              
              {invoices && invoices.length > 0 ? (
                <div className="space-y-2">
                  {invoices.map((inv, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-0">
                      <div>
                        <div className="text-sm font-medium">{inv.id}</div>
                        <div className="text-xs text-gray-500">{formatDate(inv.date)}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={inv.status === "paid" ? "bg-green-500" : "bg-amber-500"}>
                          {inv.status === "paid" ? "Paid" : "Pending"}
                        </Badge>
                        <span className="text-sm font-medium">${inv.amount.toLocaleString()}</span>
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No invoices available.</p>
              )}
            </div>
          )
        })}
      </TabsContent>
    </Tabs>
  );
};

export default OrderDetailsTabs;
