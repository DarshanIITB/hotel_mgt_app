import { React, CSSProperties, useState } from "react";
import PropagateLoader from "react-spinners/PropagateLoader"

export default function () {
    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#000");
    const override = {
        display: "block",
        margin: "0 auto",
        borderColor: "red",
    };
    return (
        <div style={{marginTop: '300px'}}>
            <div className="sweet-loading text-center">
                <PropagateLoader
                    color={color}
                    loading={loading}
                    cssOverride=''
                    size={15}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}