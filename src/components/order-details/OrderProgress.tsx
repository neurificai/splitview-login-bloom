
import React from "react";

interface OrderProgressProps {
    order: any;
}

const OrderProgress: React.FC<OrderProgressProps> = ({ order }) => {
    return (
        <div className="mb-4 w-full">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Units Completed</span>
                <span className="text-sm font-medium text-green-600">{order.completed_qty}/{order.display_qty}</span>
            </div>
            <div className="w-[90%] mx-auto">
                <div className="h-1 bg-[#E0E4EA] rounded-full w-full relative">
                    <div
                        className="h-full bg-green-500 rounded-full absolute left-0 transition-all duration-500 ease-out"
                        style={{ width: `${order.progress}%` }}
                        aria-valuenow={order.progress}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        role="progressbar"
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default OrderProgress;
