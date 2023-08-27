import React from "react";

const layout = ({ children }) => {
    return (
        <div className="min-h-[90vh] flex justify-center items-center">
            {children}
        </div>
    );
};

export default layout;
