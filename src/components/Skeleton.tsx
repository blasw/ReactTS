interface SkeletonProps {
    times: number,
    className?: string
}

function Skeleton({ times, className } : SkeletonProps) {
    const outerClassNames = "relative overflow-hidden bg-gray-300 rounded mb-2.5" + className;

    const innerClassNames = `animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 `;

    const boxes = Array(times).fill(0).map((_, i)=> {
        return <div className={outerClassNames} key={i}>
            <div className={innerClassNames}/>
        </div>;
    })


    return(
        <div>
            {boxes}
        </div>
    )
}

export default Skeleton;