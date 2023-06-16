import React from "react";

export default function (props) {
    return (
        <div>
            <div class="alert alert-danger" role="alert">
                {props.message};
            </div>
        </div>
    )
}