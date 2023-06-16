import React from "react";

export default function Success(props) {
    return (
        <div>
            <div class="alert alert-success" role="alert">
                {props.message}
            </div>
        </div>
    )
}