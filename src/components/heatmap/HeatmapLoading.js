import React from 'react'
import SkeletonLoader from "tiny-skeleton-loader-react";

export const HeatmapLoading = () => {
    return (
        <div>
            <SkeletonLoader width="100%" height="7em"></SkeletonLoader>
        </div>
    )
}