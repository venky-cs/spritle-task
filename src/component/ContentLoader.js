import React from "react";
import ContentLoader from "react-content-loader";

const Grid = (props) => {
    return (
        <ContentLoader viewBox="0 0 820 450" height={800} width={1200} {...props}>
            <rect x="10" y="10" rx="5" ry="5" width="260" height="140" />
            <rect x="280" y="10" rx="5" ry="5" width="260" height="180" />
            <rect x="550" y="10" rx="5" ry="5" width="260" height="140" />
            <rect x="10" y="160" rx="5" ry="5" width="260" height="180" />
            <rect x="280" y="200" rx="5" ry="5" width="260" height="140" />
            <rect x="550" y="160" rx="5" ry="5" width="260" height="180" />
        </ContentLoader>
    );
};

Grid.metadata = {
    name: "baptiste fkt",
    github: "baptistefkt",
    description: "Three column grid layout",
    filename: "Grid",
};

export default Grid;
